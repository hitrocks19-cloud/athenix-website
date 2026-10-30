"use client";

/**
 * Minimal analytics event bus. Wire `window.dataLayer` up to GA4 / any
 * tag manager later — every call site in the app already fires through
 * here, so no component changes are needed when a real provider is added.
 * Never pass personal data (name, email, phone) as an event property.
 */
export type AnalyticsEvent =
  | "webinar_cta_click"
  | "webinar_popup_open"
  | "webinar_registration_submit"
  | "webinar_registration_success"
  | "webinar_payment_success"
  | "webinar_payment_failed"
  | "course_interest_click"
  | "corporate_enquiry_submit"
  | "consultancy_enquiry_submit"
  | "enquiry_popup_shown"
  | "enquiry_popup_closed"
  | "enquiry_submit"
  | "enquiry_success"
  | "form_validation_error";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (command: "event", name: string, params?: Record<string, unknown>) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, properties: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  // GA4 (when switched on) gets the event directly; otherwise it stays on the dataLayer for any other tool.
  if (typeof window.gtag === "function") {
    window.gtag("event", event, properties);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...properties, timestamp: Date.now() });
}

/**
 * A paid order can be confirmed on two paths (inside the pop-up, or on the page
 * Cashfree sends people back to). Count each order once per browser.
 */
export function trackPaymentOnce(orderId: string, webinar: string) {
  const key = `athenix-paid-tracked-${orderId}`;
  try {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, "1");
  } catch {
    /* storage blocked: fall through and track anyway */
  }
  trackEvent("webinar_payment_success", { webinar, transaction_id: orderId });
}
