"use client";

import { FormEvent, useRef, useState } from "react";
import { companyInfo } from "@/content/company";
import {
  courseInterestOptions,
  courseWebinarMap,
  getWebinarBySlug,
  occupationOptions,
  webinars,
} from "@/content/webinars";
import { trackEvent } from "@/lib/analytics";
import { useWebinarModal } from "./WebinarModalContext";

type Status = "idle" | "submitting" | "paying" | "verifying" | "success" | "error";

type OrderResponse = {
  mode: "payment" | "free";
  orderId: string;
  paymentSessionId: string;
  env: "sandbox" | "production";
  webinarTitle: string;
};

type CheckoutResult = { error?: { message?: string }; paymentDetails?: unknown; redirect?: boolean };
type CashfreeInstance = {
  checkout: (options: { paymentSessionId: string; redirectTarget: "_modal" }) => Promise<CheckoutResult>;
};
type CashfreeFactory = (config: { mode: "sandbox" | "production" }) => CashfreeInstance;

function loadCashfreeSdk(): Promise<CashfreeFactory | null> {
  const w = window as unknown as { Cashfree?: CashfreeFactory };
  if (w.Cashfree) return Promise.resolve(w.Cashfree);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => resolve(w.Cashfree ?? null);
    script.onerror = () => resolve(null);
    document.body.appendChild(script);
  });
}

export default function RegistrationForm({
  defaultWebinarSlug,
  defaultCourseInterest,
}: {
  defaultWebinarSlug?: string;
  defaultCourseInterest?: string;
}) {
  const { paymentsEnabled } = useWebinarModal();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [paymentRef, setPaymentRef] = useState<string | null>(null);

  // Selects are controlled so choosing a program can point to the right webinar.
  const initialCourse = defaultCourseInterest ?? "";
  const [courseInterest, setCourseInterest] = useState(initialCourse);
  const [webinarSlug, setWebinarSlug] = useState(
    defaultWebinarSlug ?? (initialCourse ? courseWebinarMap[initialCourse] ?? "" : "")
  );
  const selectedWebinar = getWebinarBySlug(webinarSlug);

  // A retry with unchanged details reuses the same order instead of creating a
  // duplicate order (and a duplicate "Payment pending" row).
  const orderCache = useRef<{ key: string; order: OrderResponse } | null>(null);

  function onCourseChange(value: string) {
    setCourseInterest(value);
    const match = courseWebinarMap[value];
    if (match) setWebinarSlug(match);
  }

  /** Ask the server (which asks Cashfree) whether the order was really paid. */
  async function confirmPayment(order: OrderResponse) {
    setStatus("verifying");
    try {
      const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.orderId }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.paid) {
        setPaymentRef(json.paymentId ?? null);
        trackEvent("webinar_payment_success", { webinar: order.webinarTitle });
        orderCache.current = null;
        setStatus("success");
        return;
      }
      trackEvent("webinar_payment_failed", { webinar: order.webinarTitle });
      setServerError(
        res.ok
          ? `Your payment wasn't completed, so your spot isn't confirmed yet. Your details are saved. Press the button to try again. If money was deducted, your spot will be confirmed automatically, or write to us at ${companyInfo.email}.`
          : json.message ?? `We couldn't confirm your payment just now. If money was deducted, please write to us at ${companyInfo.email}.`
      );
      setStatus("error");
    } catch {
      setServerError(
        `We couldn't confirm your payment on screen. If money was deducted, please write to us at ${companyInfo.email} and we'll confirm your spot.`
      );
      setStatus("error");
    }
  }

  async function openCheckout(order: OrderResponse) {
    const Cashfree = await loadCashfreeSdk();
    if (!Cashfree) {
      setServerError("We couldn't load the secure payment window. Please check your connection and try again.");
      setStatus("error");
      return;
    }
    setStatus("paying");
    try {
      await Cashfree({ mode: order.env }).checkout({
        paymentSessionId: order.paymentSessionId,
        redirectTarget: "_modal",
      });
    } catch {
      // A closed or failed window is handled by the server check below.
    }
    // Whatever the pop-up reports, the server checks with Cashfree before anyone is marked Paid.
    await confirmPayment(order);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setServerError(null);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      whatsapp: formData.get("whatsapp"),
      dob: formData.get("dob"),
      occupation: formData.get("occupation"),
      courseInterest: formData.get("courseInterest"),
      webinar: formData.get("webinar"),
      consent: formData.get("consent") === "on",
      company_website: formData.get("company_website") ?? "",
    };
    const key = JSON.stringify(payload);

    trackEvent("webinar_registration_submit", { webinar: String(payload.webinar) });

    try {
      let order: OrderResponse;
      if (orderCache.current?.key === key) {
        order = orderCache.current.order;
      } else {
        const res = await fetch("/api/payments/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok) {
          if (json.fieldErrors) {
            setErrors(json.fieldErrors);
            trackEvent("form_validation_error", { form: "webinar" });
          } else {
            setServerError(json.message ?? "Something went wrong. Please try again.");
          }
          setStatus("error");
          return;
        }
        order = json as OrderResponse;
        if (order.mode === "payment") orderCache.current = { key, order };
      }

      if (order.mode === "free") {
        trackEvent("webinar_registration_success", { webinar: String(payload.webinar) });
        setPaymentRef(null);
        setStatus("success");
        return;
      }

      await openCheckout(order);
    } catch {
      setServerError(
        `Something went wrong on our side. Please check your connection and try again, or write to us at ${companyInfo.email}.`
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    const paid = Boolean(paymentRef);
    return (
      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-center" role="status">
        <p className="text-lg font-semibold text-white">
          {paid ? "Payment received. You're registered!" : "You're registered. Thank you!"}
        </p>
        <p className="mt-1 text-sm text-white/70">
          We&apos;ll send the joining details to your email and WhatsApp number. If you don&apos;t hear from us, write
          to {companyInfo.email}.
        </p>
        {paid ? <p className="mt-3 text-xs text-white/50">Payment reference: {paymentRef}</p> : null}
      </div>
    );
  }

  const busy = status === "submitting" || status === "paying" || status === "verifying";
  const price = selectedWebinar?.priceLabel;
  const buttonLabel = paymentsEnabled
    ? {
        idle: price ? `Pay ${price} & Register` : "Pay & Register",
        error: price ? `Pay ${price} & Register` : "Pay & Register",
        submitting: "Preparing secure payment…",
        paying: "Complete the payment in the pop-up…",
        verifying: "Confirming your payment…",
        success: "",
      }[status]
    : status === "submitting"
      ? "Reserving your spot…"
      : "Reserve My Spot";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* honeypot field: hidden from real users, visible to bots */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <Field label="Full Name" name="fullName" error={errors.fullName}>
        <input id="fullName" name="fullName" type="text" required className={inputClass} autoComplete="name" />
      </Field>

      <Field label="Email Address" name="email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
          autoComplete="email"
          placeholder="you@example.com"
        />
      </Field>

      <Field label="WhatsApp Number" name="whatsapp" error={errors.whatsapp}>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          required
          className={inputClass}
          autoComplete="tel"
          placeholder="+91 98765 43210"
        />
      </Field>

      <Field label="Date of Birth" name="dob" error={errors.dob}>
        <input id="dob" name="dob" type="date" required className={inputClass} />
      </Field>

      <Field label="Occupation" name="occupation" error={errors.occupation}>
        <select id="occupation" name="occupation" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Choose your occupation
          </option>
          {occupationOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Which program interests you?" name="courseInterest" error={errors.courseInterest}>
        <select
          id="courseInterest"
          name="courseInterest"
          required
          value={courseInterest}
          onChange={(e) => onCourseChange(e.target.value)}
          className={inputClass}
        >
          <option value="" disabled>
            Choose a program
          </option>
          {courseInterestOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Which webinar?" name="webinar" error={errors.webinar}>
        <select
          id="webinar"
          name="webinar"
          required
          value={webinarSlug}
          onChange={(e) => setWebinarSlug(e.target.value)}
          className={inputClass}
        >
          <option value="" disabled>
            Choose a webinar
          </option>
          {webinars.map((w) => (
            <option key={w.slug} value={w.slug}>
              {w.title} — {w.priceLabel}
            </option>
          ))}
        </select>
        {selectedWebinar ? (
          <p className="mt-1.5 text-xs text-white/50">
            Offer price {selectedWebinar.priceLabel}{" "}
            <span className="line-through">{selectedWebinar.originalPriceLabel}</span>
          </p>
        ) : null}
      </Field>

      <label className="flex items-start gap-3 text-sm text-white/70">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 rounded border-white/30 bg-transparent"
        />
        <span>I&apos;m happy for Athenix to contact me about this webinar and related programs.</span>
      </label>
      {errors.consent ? <p className="text-sm text-red-400">{errors.consent}</p> : null}

      {serverError ? (
        <p role="alert" className="text-sm text-red-400">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-athenix-line-animated bg-[length:200%_200%] animate-gradientShift px-6 py-3 text-sm font-semibold text-snow shadow-glow transition hover:-translate-y-0.5 hover:shadow-glowAmber hover:brightness-110 disabled:pointer-events-none disabled:opacity-60"
      >
        {buttonLabel}
      </button>

      {paymentsEnabled ? (
        <p className="text-center text-xs text-white/50">
          Secure payment by Cashfree (UPI, cards and netbanking). See our{" "}
          <a href="/refund-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
            Refund &amp; Cancellation Policy
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-flare-400 focus:ring-1 focus:ring-flare-400";

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-white/80">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
