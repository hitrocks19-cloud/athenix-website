export type FormType = "webinar" | "corporate-training" | "consultancy";

export type LeadPayload = {
  formType: FormType;
  submittedAt: string;
  data: Record<string, unknown>;
  /** "append" adds a row; "update" finds the row by orderId and updates its payment fields. */
  action?: "append" | "update";
  /** Webinar rows: Payment pending | Paid | Registered (payment not collected) | Payment could not start */
  status?: string;
  orderId?: string;
  paymentId?: string;
  /** Rupees (not paise). */
  amount?: number;
  paidAt?: string;
};

export type ChannelState = "sent" | "skipped" | "failed";

export type DeliveryResult = {
  sheets: ChannelState;
  email: ChannelState;
  /** Set by the sheet script on an update: this order was already marked Paid. */
  alreadyPaid: boolean;
};

/**
 * Training (webinars + corporate training) and Consultancy go to two separate
 * Google Sheets. Each has its own Apps Script web-app URL; the old single
 * GOOGLE_SHEETS_WEBHOOK_URL is still honoured as a fallback for both.
 */
function sheetUrlFor(formType: FormType): string | undefined {
  const specific =
    formType === "consultancy"
      ? process.env.GOOGLE_SHEETS_CONSULTANCY_WEBHOOK_URL
      : process.env.GOOGLE_SHEETS_TRAINING_WEBHOOK_URL;
  return specific || process.env.GOOGLE_SHEETS_WEBHOOK_URL || undefined;
}

/**
 * Delivers a lead to the right Google Sheet and sends a notification email.
 * The two channels are independent: if one fails the other still runs.
 * Use `isLeadSaved` to decide whether the visitor should see success.
 */
export async function deliverLead(payload: LeadPayload): Promise<DeliveryResult> {
  // Sheet first: its answer tells us whether this order was already marked
  // Paid by the other path (browser verify vs webhook), so we don't email twice.
  const sheets = await sendToSheets(payload);
  const email: ChannelState = sheets.alreadyPaid ? "skipped" : await sendNotificationEmail(payload);
  return { sheets: sheets.state, email, alreadyPaid: sheets.alreadyPaid };
}

/**
 * True when the lead reached at least one place we read. In development, with
 * nothing configured, it counts as saved so local work is never blocked. In
 * production a lead that reached nowhere is NOT saved: the visitor must be
 * told, instead of seeing a false "Success".
 */
export function isLeadSaved(result: DeliveryResult): boolean {
  if (result.sheets === "sent" || result.email === "sent") return true;
  const nothingConfigured = result.sheets === "skipped" && result.email === "skipped";
  return nothingConfigured && process.env.NODE_ENV !== "production";
}

async function sendToSheets(payload: LeadPayload): Promise<{ state: ChannelState; alreadyPaid: boolean }> {
  const url = sheetUrlFor(payload.formType);
  if (!url) {
    console.warn(`[leadDelivery] No Google Sheets webhook set for "${payload.formType}", skipping.`);
    return { state: "skipped", alreadyPaid: false };
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...payload, secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET || undefined }),
      cache: "no-store",
    });
    const text = await res.text();
    let json: { ok?: boolean; result?: string; alreadyPaid?: boolean; error?: string } | null = null;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }

    // A sign-in page or error page can come back as HTTP 200, so a bare 200 is
    // not proof the row was written. Accept the new script's {ok:true}, a
    // legacy {result:"success"}, or a plain non-HTML body.
    const accepted =
      res.ok &&
      (json?.ok === true ||
        json?.result === "success" ||
        (json === null && !text.trimStart().startsWith("<")));
    if (!accepted) {
      console.error(`[leadDelivery] Sheets webhook rejected (HTTP ${res.status}): ${json?.error ?? text.slice(0, 160)}`);
      return { state: "failed", alreadyPaid: false };
    }
    return { state: "sent", alreadyPaid: Boolean(json?.alreadyPaid) };
  } catch (err) {
    console.error("[leadDelivery] Sheets webhook failed:", err);
    return { state: "failed", alreadyPaid: false };
  }
}

async function sendNotificationEmail(payload: LeadPayload): Promise<ChannelState> {
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!to || !apiKey || !from) {
    console.warn("[leadDelivery] Email provider not configured, skipping email delivery.");
    return "skipped";
  }
  // Only the payment update from a webhook/verify is worth an email; the
  // "Payment pending" row is just a lead to follow up, still emailed once.
  const label = payload.status ? ` (${payload.status})` : "";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: `New ${payload.formType} lead${label} - Athenix`,
        text: JSON.stringify(
          {
            status: payload.status,
            orderId: payload.orderId,
            paymentId: payload.paymentId,
            amount: payload.amount,
            ...payload.data,
          },
          null,
          2
        ),
      }),
    });
    return res.ok ? "sent" : "failed";
  } catch (err) {
    console.error("[leadDelivery] Email delivery failed:", err);
    return "failed";
  }
}

/**
 * Very small in-memory rate limiter. This resets on server restart / cold
 * start and is not shared across instances: good enough to blunt basic
 * form spam, not a substitute for real infrastructure (e.g. Upstash
 * Ratelimit) in production.
 */
const submissionLog = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;

export function isRateLimited(identifier: string, max = MAX_SUBMISSIONS_PER_WINDOW): boolean {
  const now = Date.now();
  const timestamps = (submissionLog.get(identifier) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissionLog.set(identifier, timestamps);
  return timestamps.length > max;
}
