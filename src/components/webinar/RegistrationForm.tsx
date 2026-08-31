"use client";

import { FormEvent, useState } from "react";
import { courseInterestOptions, occupationOptions, webinars } from "@/content/webinars";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

export default function RegistrationForm({ defaultWebinarSlug }: { defaultWebinarSlug?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setServerError(null);
    setErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
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

    trackEvent("webinar_registration_submit", { webinar: String(payload.webinar) });

    try {
      const res = await fetch("/api/leads", {
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

      setStatus("success");
      trackEvent("webinar_registration_success", { webinar: String(payload.webinar) });
      form.reset();
    } catch {
      setServerError("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-center" role="status">
        <p className="text-lg font-semibold text-white">You&apos;re registered.</p>
        <p className="mt-1 text-sm text-white/70">
          We&apos;ll send the webinar details to your registered contact.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* honeypot field — hidden from real users, visible to bots */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <Field label="Full Name" name="fullName" error={errors.fullName}>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          className={inputClass}
          autoComplete="name"
        />
      </Field>

      <Field label="Email ID" name="email" error={errors.email}>
        <input id="email" name="email" type="email" required className={inputClass} autoComplete="email" />
      </Field>

      <Field label="WhatsApp Number" name="whatsapp" error={errors.whatsapp}>
        <input id="whatsapp" name="whatsapp" type="tel" required className={inputClass} autoComplete="tel" />
      </Field>

      <Field label="Date of Birth" name="dob" error={errors.dob}>
        <input id="dob" name="dob" type="date" required className={inputClass} />
      </Field>

      <Field label="Occupation" name="occupation" error={errors.occupation}>
        <select id="occupation" name="occupation" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Select occupation
          </option>
          {occupationOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Course Interest" name="courseInterest" error={errors.courseInterest}>
        <select id="courseInterest" name="courseInterest" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Select course interest
          </option>
          {courseInterestOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Webinar" name="webinar" error={errors.webinar}>
        <select
          id="webinar"
          name="webinar"
          required
          defaultValue={defaultWebinarSlug ?? ""}
          className={inputClass}
        >
          <option value="" disabled>
            Select webinar
          </option>
          {webinars.map((w) => (
            <option key={w.slug} value={w.slug}>
              {w.title} — {w.priceLabel}
            </option>
          ))}
        </select>
      </Field>

      <label className="flex items-start gap-3 text-sm text-white/70">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 rounded border-white/30 bg-transparent"
        />
        <span>I agree to be contacted by Athenix about this webinar and related programs.</span>
      </label>
      {errors.consent ? <p className="text-sm text-red-400">{errors.consent}</p> : null}

      {serverError ? (
        <p role="alert" className="text-sm text-red-400">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-athenix-line-animated bg-[length:200%_200%] animate-gradientShift px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-glowAmber hover:brightness-110 disabled:opacity-60"
      >
        {status === "submitting" ? "Registering…" : "Register"}
      </button>
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
