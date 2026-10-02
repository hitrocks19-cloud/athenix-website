import { NextRequest, NextResponse } from "next/server";
import { webinarRegistrationSchema } from "@/lib/validation";
import { deliverLead, isLeadSaved, isRateLimited } from "@/lib/leadDelivery";
import { cashfreeMode, createOrder, isCashfreeConfigured, newOrderId } from "@/lib/cashfree";
import { getWebinarBySlug } from "@/content/webinars";
import { companyInfo } from "@/content/company";
import { siteUrl } from "@/lib/site";

/**
 * Step 1 of a paid webinar registration.
 *  - Validates the form and looks the price up on the SERVER (the browser never
 *    sets the amount).
 *  - Cashfree configured: creates an order, saves the person to the Training
 *    sheet as "Payment pending" (so abandoned payments stay follow-up leads),
 *    and returns what the checkout pop-up needs.
 *  - Cashfree not configured yet: saves the registration as "Registered
 *    (payment not collected)" so nothing is lost while payments are set up.
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
    { message: `We couldn't save your details just now. Please try again, or write to us at ${companyInfo.email}.` },
    { status: 502 }
  );

  // ---- Payments not set up yet: keep capturing registrations.
  if (!isCashfreeConfigured()) {
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
  const orderId = newOrderId();
  let order;
  try {
    order = await createOrder({
      orderId,
      amountRupees,
      customer: { // Cashfree wants an alphanumeric customer id (no underscores or dashes).
        id: `cust${orderId.replace(/[^A-Za-z0-9]/g, "").slice(0, 40)}`, name: data.fullName, email: data.email, phone: data.whatsapp },
      note: webinar.title,
      tags: {
        fullName: data.fullName,
        email: data.email,
        whatsapp: data.whatsapp,
        occupation: data.occupation,
        courseInterest: data.courseInterest,
        webinar: webinar.slug,
        webinarTitle: webinar.title,
      },
      // After checkout (including when a UPI app sends the customer back) Cashfree
      // returns them here; that page asks the server to confirm the payment.
      returnUrl: `${siteUrl}/payment-status?order_id={order_id}`,
      notifyUrl: siteUrl.startsWith("https://") ? `${siteUrl}/api/payments/webhook` : undefined,
    });
    if (!order.payment_session_id) throw new Error("Cashfree did not return a payment session.");
  } catch (err) {
    console.error("[payments/order] Cashfree order creation failed:", err);
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
    orderId,
    amount: amountRupees,
  });

  return NextResponse.json(
    {
      mode: "payment",
      orderId,
      paymentSessionId: order.payment_session_id,
      env: cashfreeMode(),
      webinarTitle: webinar.title,
    },
    { status: 200 }
  );
}
