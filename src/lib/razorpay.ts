import crypto from "node:crypto";

/**
 * Minimal Razorpay helpers (Orders API + signature checks) using plain fetch,
 * so no SDK is added to the bundle. Server-only: never import from a client
 * component. The key *secret* must never reach the browser.
 *
 * RAZORPAY_API_BASE exists only so the flow can be tested against a mock.
 */
const API_BASE = process.env.RAZORPAY_API_BASE ?? "https://api.razorpay.com/v1";

const keyId = () => process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";
const keySecret = () => process.env.RAZORPAY_KEY_SECRET ?? "";

export const getRazorpayKeyId = keyId;
export const isRazorpayConfigured = () => Boolean(keyId() && keySecret());

export type RazorpayOrder = {
  id: string;
  amount: number;
  amount_paid?: number;
  currency: string;
  status: string;
  notes?: Record<string, string>;
};

function authHeader() {
  return "Basic " + Buffer.from(`${keyId()}:${keySecret()}`).toString("base64");
}

async function razorpayFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { Authorization: authHeader(), "Content-Type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const reason = json?.error?.description ?? `HTTP ${res.status}`;
    throw new Error(`Razorpay request failed: ${reason}`);
  }
  return json as T;
}

export function createOrder(input: {
  amountPaise: number;
  receipt: string;
  notes: Record<string, string>;
}): Promise<RazorpayOrder> {
  return razorpayFetch<RazorpayOrder>("/orders", {
    method: "POST",
    body: JSON.stringify({
      amount: input.amountPaise,
      currency: "INR",
      receipt: input.receipt,
      notes: input.notes,
    }),
  });
}

export function fetchOrder(orderId: string): Promise<RazorpayOrder> {
  return razorpayFetch<RazorpayOrder>(`/orders/${encodeURIComponent(orderId)}`);
}

function safeEqualHex(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
}

/** Checkout success signature: HMAC_SHA256(order_id|payment_id, key_secret). */
export function verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
  if (!keySecret() || !orderId || !paymentId || !signature) return false;
  const expected = crypto.createHmac("sha256", keySecret()).update(`${orderId}|${paymentId}`).digest("hex");
  return safeEqualHex(expected, signature);
}

/** Webhook signature: HMAC_SHA256(raw request body, webhook_secret). */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET ?? "";
  if (!secret || !signature) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return safeEqualHex(expected, signature);
}

/** Price table is the only source of truth for what gets charged. */
export function priceToPaise(price: string): number {
  return Math.round(Number(price) * 100);
}
