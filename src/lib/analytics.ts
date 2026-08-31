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
  | "course_interest_click"
  | "corporate_enquiry_submit"
  | "consultancy_enquiry_submit"
  | "form_validation_error";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: AnalyticsEvent, properties: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...properties, timestamp: Date.now() });
}
