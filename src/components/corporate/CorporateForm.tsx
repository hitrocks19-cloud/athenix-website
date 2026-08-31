"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const teamSizes = ["1–10", "11–50", "51–200", "201–500", "500+"];
const formats = ["In-person", "Virtual", "Hybrid", "Not sure yet"];

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-flare-400 focus:ring-1 focus:ring-flare-400";

type Status = "idle" | "submitting" | "success" | "error";

export default function CorporateForm() {
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
      workEmail: formData.get("workEmail"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      designation: formData.get("designation"),
      teamSize: formData.get("teamSize"),
      trainingRequirement: formData.get("trainingRequirement"),
      preferredFormat: formData.get("preferredFormat"),
      message: formData.get("message") ?? "",
      company_website: formData.get("company_website") ?? "",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "corporate-training", ...payload }),
      });
      const json = await res.json();

      if (!res.ok) {
        if (json.fieldErrors) setErrors(json.fieldErrors);
        else setServerError(json.message ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      trackEvent("corporate_enquiry_submit", {});
      form.reset();
    } catch {
      setServerError("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-center" role="status">
        <p className="text-lg font-semibold text-white">Thank you.</p>
        <p className="mt-1 text-sm text-white/70">The Athenix team will reach out to discuss your team&apos;s training.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <F label="Name" name="fullName" error={errors.fullName}>
        <input id="fullName" name="fullName" required className={inputClass} autoComplete="name" />
      </F>
      <F label="Work Email" name="workEmail" error={errors.workEmail}>
        <input id="workEmail" name="workEmail" type="email" required className={inputClass} autoComplete="email" />
      </F>
      <F label="Phone / WhatsApp" name="phone" error={errors.phone}>
        <input id="phone" name="phone" type="tel" required className={inputClass} autoComplete="tel" />
      </F>
      <F label="Company" name="company" error={errors.company}>
        <input id="company" name="company" required className={inputClass} autoComplete="organization" />
      </F>
      <F label="Designation" name="designation" error={errors.designation}>
        <input id="designation" name="designation" required className={inputClass} />
      </F>
      <F label="Team Size" name="teamSize" error={errors.teamSize}>
        <select id="teamSize" name="teamSize" required defaultValue="" className={inputClass}>
          <option value="" disabled>Select team size</option>
          {teamSizes.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </F>
      <F label="Preferred Format" name="preferredFormat" error={errors.preferredFormat}>
        <select id="preferredFormat" name="preferredFormat" required defaultValue="" className={inputClass}>
          <option value="" disabled>Select format</option>
          {formats.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </F>
      <div className="sm:col-span-2">
        <F label="Training Requirement" name="trainingRequirement" error={errors.trainingRequirement}>
          <input id="trainingRequirement" name="trainingRequirement" required className={inputClass} placeholder="e.g. Power BI for the analytics team" />
        </F>
      </div>
      <div className="sm:col-span-2">
        <F label="Message (optional)" name="message" error={errors.message}>
          <textarea id="message" name="message" rows={4} className={inputClass} />
        </F>
      </div>

      {serverError ? <p role="alert" className="text-sm text-red-400 sm:col-span-2">{serverError}</p> : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-athenix-line-animated bg-[length:200%_200%] animate-gradientShift px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-glowAmber hover:brightness-110 disabled:opacity-60 sm:col-span-2"
      >
        {status === "submitting" ? "Sending…" : "Discuss Corporate Training"}
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
