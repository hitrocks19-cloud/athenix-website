export type LeadPayload = {
  formType: "webinar" | "corporate-training" | "consultancy";
  submittedAt: string;
  data: Record<string, unknown>;
};

/**
 * Sends a lead to the configured Google Sheets webhook (e.g. an Apps
 * Script Web App that appends a row) and a notification email.
 *
 * Both deliveries are best-effort and independent: if one fails, the
 * other still runs, and the caller decides whether that's a hard error.
 * If an env var isn't configured, that channel is skipped (logged, not
 * thrown) so local development never breaks on missing secrets.
 */
export async function deliverLead(payload: LeadPayload): Promise<{
  sheets: "sent" | "skipped" | "failed";
  email: "sent" | "skipped" | "failed";
}> {
  const [sheets, email] = await Promise.all([sendToSheets(payload), sendNotificationEmail(payload)]);
  return { sheets, email };
}

async function sendToSheets(payload: LeadPayload): Promise<"sent" | "skipped" | "failed"> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) {
    console.warn("[leadDelivery] GOOGLE_SHEETS_WEBHOOK_URL not set — skipping Sheets delivery.");
    return "skipped";
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok ? "sent" : "failed";
  } catch (err) {
    console.error("[leadDelivery] Sheets webhook failed:", err);
    return "failed";
  }
}

async function sendNotificationEmail(payload: LeadPayload): Promise<"sent" | "skipped" | "failed"> {
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!to || !apiKey || !from) {
    console.warn("[leadDelivery] Email provider not configured — skipping email delivery.");
    return "skipped";
  }

  // Swap this block for your actual provider (Resend, Postmark, SES, SMTP…).
  // Isolated here so only this function needs to change.
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `New ${payload.formType} lead — Athenix`,
        text: JSON.stringify(payload.data, null, 2),
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
 * start and is not shared across instances — good enough to blunt basic
 * form spam, not a substitute for real infrastructure (e.g. Upstash
 * Ratelimit) in production.
 */
const submissionLog = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const timestamps = (submissionLog.get(identifier) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissionLog.set(identifier, timestamps);
  return timestamps.length > MAX_SUBMISSIONS_PER_WINDOW;
}
