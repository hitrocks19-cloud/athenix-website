import { NextRequest, NextResponse } from "next/server";
import { fetchOrder, fetchSuccessfulPaymentId, isCashfreeConfigured, ORDER_ID_PATTERN } from "@/lib/cashfree";
import { recordPaidOrder } from "@/lib/paymentRecords";
import { isRateLimited } from "@/lib/leadDelivery";

/**
 * Step 2: "was this order actually paid?" Nothing is trusted from the browser.
 * We ask Cashfree directly. Only if Cashfree says the order is PAID do we mark
 * the registration Paid. Calling this with any order id is harmless: it can
 * only ever report what Cashfree itself says.
 *
 * Used right after the checkout pop-up closes, and by the /payment-status page
 * that Cashfree sends people back to (for example after a UPI app).
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`verify:${ip}`, 30)) {
    return NextResponse.json({ message: "Too many attempts. Please wait a moment and try again." }, { status: 429 });
  }
  if (!isCashfreeConfigured()) {
    return NextResponse.json({ message: "Payments are not enabled." }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const orderId = typeof body?.orderId === "string" ? body.orderId : "";
  if (!ORDER_ID_PATTERN.test(orderId)) {
    return NextResponse.json({ message: "That payment reference doesn't look right." }, { status: 400 });
  }

  let order;
  try {
    order = await fetchOrder(orderId);
  } catch (err) {
    console.error("[payments/verify] Could not read the order from Cashfree:", err);
    return NextResponse.json(
      { message: "We couldn't check your payment just now. Please try again in a moment." },
      { status: 502 }
    );
  }

  if (order.order_status !== "PAID") {
    // ACTIVE = no successful payment yet (pending UPI, cancelled, or abandoned).
    return NextResponse.json({ paid: false, status: order.order_status }, { status: 200 });
  }

  const paymentId = (await fetchSuccessfulPaymentId(orderId)) ?? String(order.cf_order_id ?? orderId);
  await recordPaidOrder({
    orderId,
    paymentId,
    amountRupees: Number(order.order_amount),
    notes: order.order_tags ?? undefined,
  });

  // The payment is real whether or not the sheet write worked: Cashfree is the
  // record of truth and the webhook retries the sheet update.
  return NextResponse.json({ paid: true, paymentId }, { status: 200 });
}
