"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { enquiryInterestOptions } from "@/content/webinars";
import { companyInfo } from "@/content/company";
import { trackEvent } from "@/lib/analytics";
import { useWebinarModal } from "@/components/webinar/WebinarModalContext";

/** Only these pages show the pop-up (not forms, payment or legal pages). */
const SHOW_ON = ["/", "/courses"];
const DELAY_MS = 8000;

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Lead-capture pop-up: appears 8 seconds after someone opens the home or courses
 * page, on every visit, even for the same browser. Within one visit it shows
 * only once (not again after being closed or submitted). Never shown while the
 * webinar sign-up is open.
 */
export default function EnquiryPopup() {
  const pathname = usePathname();
  const webinar = useWebinarModal();
  const webinarOpenRef = useRef(webinar.isOpen);
  webinarOpenRef.current = webinar.isOpen;

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  // True once the pop-up has been shown in this visit (a fresh page load resets it).
  const shownThisVisit = useRef(false);

  // Schedule it when someone lands on an eligible page.
  useEffect(() => {
    if (!SHOW_ON.includes(pathname)) {
      setOpen(false);
      return;
    }
    if (shownThisVisit.current) return;

    const timer = window.setTimeout(() => {
      if (webinarOpenRef.current) return; // don't interrupt a sign-up in progress
      shownThisVisit.current = true;
      setStatus("idle");
      setErrors({});
      setServerError(null);
      setOpen(true);
      trackEvent("enquiry_popup_shown", { page: pathname });
    }, DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  // If the webinar sign-up opens (e.g. from a button), step aside without counting it as a dismissal.
  useEffect(() => {
    if (webinar.isOpen) setOpen(false);
  }, [webinar.isOpen]);

  const close = useCallback(() => {
    setOpen(false);
    if (status !== "success") {
      trackEvent("enquiry_popup_closed", { page: pathname });
    }
  }, [status, pathname]);

  // Escape closes, page behind doesn't scroll, focus moves into the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setServerError(null);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: formData.get("fullName"),
      whatsapp: formData.get("whatsapp"),
      email: formData.get("email"),
      interest: formData.get("interest"),
      consent: formData.get("consent") === "on",
      page: pathname,
      company_website: formData.get("company_website") ?? "",
    };
    trackEvent("enquiry_submit", { interest: String(payload.interest ?? "") });

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.fieldErrors) {
          setErrors(json.fieldErrors);
          trackEvent("form_validation_error", { form: "enquiry" });
        } else {
          setServerError(json.message ?? "Something went wrong. Please try again.");
        }
        setStatus("error");
        return;
      }
      trackEvent("enquiry_success", { interest: String(payload.interest ?? "") });
      setStatus("success");
    } catch {
      setServerError(
        `Something went wrong on our side. Please check your connection and try again, or write to us at ${companyInfo.email}.`
      );
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={close}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-white/10 bg-ink-900 p-6 shadow-card outline-none sm:max-w-md sm:rounded-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="py-4 text-center" role="status">
            <p className="font-display text-2xl font-semibold text-white">Thank you!</p>
            <p className="mt-2 text-sm text-white/70">We&apos;ll message you on WhatsApp soon.</p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  webinar.open();
                }}
                className="inline-flex items-center justify-center rounded-full bg-athenix-line-animated bg-[length:200%_200%] animate-gradientShift px-6 py-3 text-sm font-semibold text-snow shadow-glow transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Book a Webinar
              </button>
              <button type="button" onClick={close} className="text-sm text-white/60 hover:text-white">
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 id="enquiry-title" className="pr-8 font-display text-2xl font-semibold text-white">
              Not sure which program fits you?
            </h2>
            <p className="mt-1 mb-5 text-sm text-white/60">
              Leave your details and we&apos;ll message you on WhatsApp with the right next step.
            </p>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
              {/* honeypot: hidden from real users, visible to bots */}
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <Field label="Name" name="enquiry-name" error={errors.fullName}>
                <input id="enquiry-name" name="fullName" type="text" required autoComplete="name" className={inputClass} />
              </Field>
              <Field label="WhatsApp Number" name="enquiry-whatsapp" error={errors.whatsapp}>
                <input
                  id="enquiry-whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  className={inputClass}
                />
              </Field>
              <Field label="Email Address" name="enquiry-email" error={errors.email}>
                <input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </Field>
              <Field label="Interested in" name="enquiry-interest" error={errors.interest}>
                <select id="enquiry-interest" name="interest" required defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    Choose one
                  </option>
                  {enquiryInterestOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>

              <label className="flex items-start gap-3 text-xs text-white/70">
                <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-white/30 bg-transparent" />
                <span>
                  I agree to be contacted by Athenix on WhatsApp, phone and email about my enquiry. See our{" "}
                  <Link href="/privacy-policy" target="_blank" className="underline hover:text-white">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {errors.consent ? <p className="-mt-2 text-xs text-red-400">{errors.consent}</p> : null}

              {serverError ? (
                <p role="alert" className="text-sm text-red-400">
                  {serverError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-1 inline-flex items-center justify-center rounded-full bg-athenix-line-animated bg-[length:200%_200%] animate-gradientShift px-6 py-3 text-sm font-semibold text-snow shadow-glow transition hover:-translate-y-0.5 hover:brightness-110 disabled:pointer-events-none disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send my details"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
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
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-white/80">
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
