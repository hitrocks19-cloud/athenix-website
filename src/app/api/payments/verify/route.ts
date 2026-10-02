import { NextRequest, NextResponse } from "next/server";
import { fetchOrder, isRazorpayConfigured, verifyPaymentSignature } from "@/lib/razorpay";
import { recordPaidOrder } from "@/lib/paymentRecords";
import { isRateLimited } from "@/lib/leadDelivery";
import { companyInfo } from "@/content/company";

/**
 * Step 2: the browser reports a finished Checkout. Nothing is trusted from the
 * browser except the three values Razorpay signed. We check the signature with
 * the key secret, then read the order back from Razorpay (amount + notes)
 * before marking the registration Paid.
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`verify:${ip}`)) {
    return NextResponse.json({ message: "Too many attempts. Please wait a moment and try again." }, { status: 429 });
  }
  if (!isRazorpayConfigured()) {
    return NextResponse.json({ message: "Payments are not enabled." }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const orderId = typeof body?.orderId === "string" ? body.orderId : "";
  const paymentId = typeof body?.paymentId === "string" ? body.paymentId : "";
  const signature = typeof body?.signature === "string" ? body.signature : "";

  if (!verifyPaymentSignature(orderId, paymentId, signature)) {
    return NextResponse.json(
      {
        message: `We couldn't confirm that payment automatically. If money was deducted, please write to us at ${companyInfo.email} with payment ID ${paymentId || "(not available)"}.`,
      },
      { status: 400 }
    );
  }

  // Signature is genuine, so the payment exists. Read the order for amount and notes.
  let amountPaise = 0;
  let notes: Record<string, string> | undefined;
  try {
    const order = await fetchOrder(orderId);
    amountPaise = order.amount_paid || order.amount;
    notes = order.notes;
  } catch (err) {
    console.error("[payments/verify] Could not read order back (payment is still valid):", err);
  }

  await recordPaidOrder({ orderId, paymentId, amountPaise, notes });

  // The payment is real whether or not the sheet write worked; Razorpay is the
  // record of truth and the webhook will retry the sheet update.
  return NextResponse.json({ ok: true, paymentId }, { status: 200 });
}
