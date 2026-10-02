import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { recordPaidOrder } from "@/lib/paymentRecords";

/**
 * Safety net for the case where someone pays and then closes the tab before
 * the browser can call /verify. Razorpay calls this URL itself, signed with
 * RAZORPAY_WEBHOOK_SECRET. Set it up in the Razorpay dashboard for the events
 * `payment.captured` and `order.paid`.
 */
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";

  if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Webhook is not configured." }, { status: 503 });
  }
  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ message: "Invalid signature." }, { status: 400 });
  }

  let event: {
    event?: string;
    payload?: { payment?: { entity?: { id?: string; order_id?: string; amount?: number; notes?: unknown } } };
  };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: "Bad payload." }, { status: 400 });
  }

  if (event.event !== "payment.captured" && event.event !== "order.paid") {
    // Other events are acknowledged and ignored.
    return NextResponse.json({ ok: true, ignored: true }, { status: 200 });
  }

  const payment = event.payload?.payment?.entity;
  if (!payment?.id || !payment.order_id) {
    return NextResponse.json({ ok: true, ignored: true }, { status: 200 });
  }

  const rawNotes = payment.notes;
  const notes: Record<string, string> | undefined =
    rawNotes && typeof rawNotes === "object" && !Array.isArray(rawNotes)
      ? Object.fromEntries(Object.entries(rawNotes as Record<string, unknown>).map(([k, v]) => [k, String(v)]))
      : undefined;

  await recordPaidOrder({
    orderId: payment.order_id,
    paymentId: payment.id,
    amountPaise: payment.amount ?? 0,
    notes,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
