import crypto from "node:crypto";

/**
 * Minimal Cashfree Payment Gateway helpers (Orders API + webhook signature)
 * using plain fetch, so no SDK is added to the bundle. Server-only: never
 * import from a client component. The secret key must never reach the browser.
 *
 * Env:
 *   CASHFREE_APP_ID      Cashfree "App ID"   (Developers > API Keys)
 *   CASHFREE_SECRET_KEY  Cashfree "Secret Key"
 *   CASHFREE_ENV         "sandbox" (default, safe) or "production"
 *   CASHFREE_API_BASE / CASHFREE_API_VERSION only exist to allow testing and overrides.
 */
const API_VERSION = process.env.CASHFREE_API_VERSION ?? "2025-01-01";

const appId = () => process.env.CASHFREE_APP_ID ?? "";
const secretKey = () => process.env.CASHFREE_SECRET_KEY ?? "";

export const cashfreeMode = (): "sandbox" | "production" =>
  process.env.CASHFREE_ENV === "production" ? "production" : "sandbox";

const apiBase = () =>
  process.env.CASHFREE_API_BASE ??
  (cashfreeMode() === "production" ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg");

export const isCashfreeConfigured = () => Boolean(appId() && secretKey());

export type CashfreeOrder = {
  order_id: string;
  cf_order_id?: string | number;
  order_amount: number;
  order_status: string; // ACTIVE | PAID | EXPIRED | TERMINATED
  payment_session_id?: string;
  order_tags?: Record<string, string> | null;
};

async function cashfreeFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${apiBase()}${path}`, {
    ...init,
    headers: {
      "x-client-id": appId(),
      "x-client-secret": secretKey(),
      "x-api-version": API_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const reason = json?.message ?? json?.error_description ?? `HTTP ${res.status}`;
    throw new Error(`Cashfree request failed: ${reason}`);
  }
  return json as T;
}

/** Cashfree wants a 10-digit Indian number, or "+" and the country code. */
export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return `+${digits}`;
}

export function createOrder(input: {
  orderId: string;
  amountRupees: number;
  customer: { id: string; name: string; email: string; phone: string };
  note: string;
  tags: Record<string, string>;
  returnUrl: string;
  notifyUrl?: string;
}): Promise<CashfreeOrder> {
  return cashfreeFetch<CashfreeOrder>("/orders", {
    method: "POST",
    body: JSON.stringify({
      order_id: input.orderId,
      order_amount: input.amountRupees,
      order_currency: "INR",
      customer_details: {
        customer_id: input.customer.id,
        customer_phone: normalizePhone(input.customer.phone),
        customer_email: input.customer.email,
        // Cashfree requires 3+ characters for a name; omit it rather than fail.
        ...(input.customer.name.length >= 3 ? { customer_name: input.customer.name.slice(0, 100) } : {}),
      },
      order_meta: {
        return_url: input.returnUrl,
        ...(input.notifyUrl ? { notify_url: input.notifyUrl } : {}),
      },
      order_note: input.note.slice(0, 200),
      order_tags: input.tags,
    }),
  });
}

/** The authority on whether a payment happened: ask Cashfree, never the browser. */
export function fetchOrder(orderId: string): Promise<CashfreeOrder> {
  return cashfreeFetch<CashfreeOrder>(`/orders/${encodeURIComponent(orderId)}`);
}

/** The reference of the successful payment, for the sheet. Best effort. */
export async function fetchSuccessfulPaymentId(orderId: string): Promise<string | null> {
  try {
    const payments = await cashfreeFetch<
      { cf_payment_id?: string | number; payment_status?: string }[]
    >(`/orders/${encodeURIComponent(orderId)}/payments`);
    const ok = Array.isArray(payments) ? payments.find((p) => p.payment_status === "SUCCESS") : undefined;
    return ok?.cf_payment_id != null ? String(ok.cf_payment_id) : null;
  } catch (err) {
    console.error("[cashfree] Could not read payment id (payment itself is still valid):", err);
    return null;
  }
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
}

/**
 * Webhook signature per Cashfree docs:
 * base64( HMAC-SHA256( x-webhook-timestamp + rawBody, secret key ) )
 */
export function verifyWebhookSignature(rawBody: string, timestamp: string, signature: string): boolean {
  if (!secretKey() || !timestamp || !signature) return false;
  const expected = crypto.createHmac("sha256", secretKey()).update(timestamp + rawBody).digest("base64");
  return safeEqual(expected, signature);
}

/** Order ids we generate; also used to reject junk before calling Cashfree. */
export const ORDER_ID_PATTERN = /^[A-Za-z0-9_-]{3,45}$/;

export function newOrderId(): string {
  return `ath_${Date.now().toString(36)}_${crypto.randomBytes(4).toString("hex")}`;
}
