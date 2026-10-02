import { NextRequest, NextResponse } from "next/server";
import { isCashfreeConfigured, verifyWebhookSignature } from "@/lib/cashfree";
import { recordPaidOrder } from "@/lib/paymentRecords";

/**
 * Safety net for the case where someone pays and then closes the tab before
 * the browser can confirm. Cashfree calls this URL itself (we set it as the
 * order's notify_url, so no dashboard setup is needed), signed with your
 * Secret Key. Only successful payments are acted on.
 */
export async function POST(req: NextRequest) {
  if (!isCashfreeConfigured()) {
    return NextResponse.json({ message: "Payments are not enabled." }, { status: 503 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-webhook-signature") ?? "";
  const timestamp = req.headers.get("x-webhook-timestamp") ?? "";
  if (!verifyWebhookSignature(rawBody, timestamp, signature)) {
    return NextResponse.json({ message: "Invalid signature." }, { status: 400 });
  }

  let event: {
    type?: string;
    data?: {
      order?: { order_id?: string; order_amount?: number; order_tags?: Record<string, unknown> | null };
      payment?: { cf_payment_id?: string | number; payment_status?: string; payment_amount?: number };
    };
  };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: "Bad payload." }, { status: 400 });
  }

  const order = event.data?.order;
  const payment = event.data?.payment;
  const isSuccess =
    (event.type === "PAYMENT_SUCCESS_WEBHOOK" || event.type === "PAYMENT_SUCCESS") &&
    payment?.payment_status === "SUCCESS";

  if (!isSuccess || !order?.order_id || payment?.cf_payment_id == null) {
    // Failed payments, dashboard test pings and other events are acknowledged and ignored.
    return NextResponse.json({ ok: true, ignored: true }, { status: 200 });
  }

  const tags = order.order_tags;
  const notes: Record<string, string> | undefined =
    tags && typeof tags === "object"
      ? Object.fromEntries(Object.entries(tags).map(([k, v]) => [k, String(v)]))
      : undefined;

  await recordPaidOrder({
    orderId: order.order_id,
    paymentId: String(payment.cf_payment_id),
    amountRupees: Number(payment.payment_amount ?? order.order_amount ?? 0),
    notes,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
