import { NextRequest, NextResponse } from "next/server";
import { webinarRegistrationSchema } from "@/lib/validation";
import { deliverLead, isLeadSaved, isRateLimited } from "@/lib/leadDelivery";
import { createOrder, getRazorpayKeyId, isRazorpayConfigured, priceToPaise } from "@/lib/razorpay";
import { getWebinarBySlug } from "@/content/webinars";
import { companyInfo } from "@/content/company";

/**
 * Step 1 of a paid webinar registration.
 *  - Validates the form and looks the price up on the SERVER (the browser never
 *    sets the amount).
 *  - Razorpay configured: creates an order, saves the person to the Training
 *    sheet as "Payment pending" (so abandoned payments stay follow-up leads),
 *    and returns what Checkout needs.
 *  - Razorpay not configured yet: saves the registration as "Registered
 *    (payment not collected)" so nothing is lost while payments are being set up.
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`order:${ip}`)) {
    return NextResponse.json(
      { message: "You've sent a few requests in a row. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json(
      { message: "We couldn't read that request. Please refresh the page and try again." },
      { status: 400 }
    );
  }

  // Honeypot: a filled hidden field means a bot. Pretend success, do nothing.
  if (body.company_website) {
    return NextResponse.json({ mode: "free" }, { status: 200 });
  }

  const parsed = webinarRegistrationSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ message: "Please check the highlighted fields.", fieldErrors }, { status: 400 });
  }

  const data = parsed.data;
  const webinar = getWebinarBySlug(data.webinar);
  if (!webinar) {
    return NextResponse.json(
      { message: "Please check the highlighted fields.", fieldErrors: { webinar: "Please choose a webinar." } },
      { status: 400 }
    );
  }
  const amountRupees = Number(webinar.price);
  const submittedAt = new Date().toISOString();
  const leadData = { ...data, webinarTitle: webinar.title };

  const saveFailed = NextResponse.json(
    {
      message: `We couldn't save your details just now. Please try again, or write to us at ${companyInfo.email}.`,
    },
    { status: 502 }
  );

  // ---- Payments not set up yet: keep capturing registrations.
  if (!isRazorpayConfigured()) {
    const result = await deliverLead({
      formType: "webinar",
      submittedAt,
      data: leadData,
      status: "Registered (payment not collected)",
      amount: amountRupees,
    });
    return isLeadSaved(result) ? NextResponse.json({ mode: "free" }, { status: 200 }) : saveFailed;
  }

  // ---- Payments live: create the order, then record the pending row.
  let order;
  try {
    order = await createOrder({
      amountPaise: priceToPaise(webinar.price),
      receipt: `ath_${Date.now().toString(36)}`,
      notes: {
        fullName: data.fullName,
        email: data.email,
        whatsapp: data.whatsapp,
        occupation: data.occupation,
        courseInterest: data.courseInterest,
        webinar: webinar.slug,
        webinarTitle: webinar.title,
      },
    });
  } catch (err) {
    console.error("[payments/order] Razorpay order creation failed:", err);
    // Still keep the lead so it can be followed up manually.
    await deliverLead({
      formType: "webinar",
      submittedAt,
      data: leadData,
      status: "Payment could not start",
      amount: amountRupees,
    });
    return NextResponse.json(
      {
        message: `We couldn't start the payment just now, but we've saved your details. Please try again in a moment, or write to us at ${companyInfo.email}.`,
      },
      { status: 502 }
    );
  }

  await deliverLead({
    formType: "webinar",
    submittedAt,
    data: leadData,
    status: "Payment pending",
    orderId: order.id,
    amount: amountRupees,
  });

  return NextResponse.json(
    {
      mode: "payment",
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: getRazorpayKeyId(),
      webinarTitle: webinar.title,
      prefill: { name: data.fullName, email: data.email, contact: data.whatsapp },
    },
    { status: 200 }
  );
}
