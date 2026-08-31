"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const businessSizes = ["Solo / Freelance", "2–10", "11–50", "51–200", "200+"];
const contactMethods = ["Email", "WhatsApp", "Phone Call"];

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-magenta-400 focus:ring-1 focus:ring-magenta-400";

type Status = "idle" | "submitting" | "success" | "error";

export default function ConsultancyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setServerError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      fullName: formData.get("fullName"),
      businessEmail: formData.get("businessEmail"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      industry: formData.get("industry"),
      businessSize: formData.get("businessSize"),
      improvementGoal: formData.get("improvementGoal"),
      currentChallenges: formData.get("currentChallenges") ?? "",
      preferredContact: formData.get("preferredContact"),
      company_website: formData.get("company_website") ?? "",
    };

    try {
      const res = await fetch("/api/consultancy-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok) {
        if (json.fieldErrors) setErrors(json.fieldErrors);
        else setServerError(json.message ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      trackEvent("consultancy_enquiry_submit", {});
      form.reset();
    } catch {
      setServerError("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-magenta-400/30 bg-magenta-400/5 p-6 text-center" role="status">
        <p className="text-lg font-semibold text-white">Thank you.</p>
        <p className="mt-1 text-sm text-white/70">The Athenix Consultancy team will reach out to schedule a conversation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <F label="Name" name="fullName" error={errors.fullName}>
        <input id="fullName" name="fullName" required className={inputClass} autoComplete="name" />
      </F>
      <F label="Business Email" name="businessEmail" error={errors.businessEmail}>
        <input id="businessEmail" name="businessEmail" type="email" required className={inputClass} autoComplete="email" />
      </F>
      <F label="Phone / WhatsApp" name="phone" error={errors.phone}>
        <input id="phone" name="phone" type="tel" required className={inputClass} autoComplete="tel" />
      </F>
      <F label="Company" name="company" error={errors.company}>
        <input id="company" name="company" required className={inputClass} autoComplete="organization" />
      </F>
      <F label="Industry" name="industry" error={errors.industry}>
        <input id="industry" name="industry" required className={inputClass} />
      </F>
      <F label="Business Size" name="businessSize" error={errors.businessSize}>
        <select id="businessSize" name="businessSize" required defaultValue="" className={inputClass}>
          <option value="" disabled>Select business size</option>
          {businessSizes.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </F>
      <F label="Preferred Contact Method" name="preferredContact" error={errors.preferredContact}>
        <select id="preferredContact" name="preferredContact" required defaultValue="" className={inputClass}>
          <option value="" disabled>Select method</option>
          {contactMethods.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </F>
      <div className="sm:col-span-2">
        <F label="What do you want to improve?" name="improvementGoal" error={errors.improvementGoal}>
          <input id="improvementGoal" name="improvementGoal" required className={inputClass} placeholder="e.g. Automate our weekly sales reporting" />
        </F>
      </div>
      <div className="sm:col-span-2">
        <F label="Current Challenges (optional)" name="currentChallenges" error={errors.currentChallenges}>
          <textarea id="currentChallenges" name="currentChallenges" rows={4} className={inputClass} />
        </F>
      </div>

      {serverError ? <p role="alert" className="text-sm text-red-400 sm:col-span-2">{serverError}</p> : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-magenta-500 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110 disabled:opacity-60 sm:col-span-2"
      >
        {status === "submitting" ? "Sending…" : "Get My Free Consultation"}
      </button>
    </form>
  );
}

function F({ label, name, error, children }: { label: string; name: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-white/80">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-400" role="alert">{error}</p> : null}
    </div>
  );
}
