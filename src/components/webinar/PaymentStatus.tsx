"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { companyInfo } from "@/content/company";

type State =
  | { kind: "checking" }
  | { kind: "paid"; paymentId: string }
  | { kind: "pending" }
  | { kind: "error"; message: string };

/**
 * Where Cashfree sends people after checkout (including when a UPI app hands
 * them back to the browser). It asks the server, which asks Cashfree, whether
 * the order was really paid, and never trusts the address bar.
 */
export default function PaymentStatus() {
  const orderId = useSearchParams().get("order_id") ?? "";
  const [state, setState] = useState<State>({ kind: "checking" });

  useEffect(() => {
    if (!orderId) {
      setState({ kind: "error", message: "We couldn't find a payment to check." });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        const json = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok) setState({ kind: "error", message: json.message ?? "We couldn't check your payment just now." });
        else if (json.paid) setState({ kind: "paid", paymentId: json.paymentId });
        else setState({ kind: "pending" });
      } catch {
        if (!cancelled) setState({ kind: "error", message: "We couldn't check your payment just now." });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  const box = "rounded-2xl border p-6 text-center";

  if (state.kind === "checking") {
    return (
      <div className={`${box} border-white/10 bg-white/[0.03]`} role="status">
        <p className="text-lg font-semibold text-white">Checking your payment…</p>
        <p className="mt-1 text-sm text-white/60">This takes a few seconds.</p>
      </div>
    );
  }

  if (state.kind === "paid") {
    return (
      <div className={`${box} border-amber-400/30 bg-amber-400/5`} role="status">
        <p className="text-lg font-semibold text-white">Payment received. You&apos;re registered!</p>
        <p className="mt-1 text-sm text-white/70">
          We&apos;ll send the joining details to your email and WhatsApp number. If you don&apos;t hear from us, write
          to {companyInfo.email}.
        </p>
        <p className="mt-3 text-xs text-white/50">Payment reference: {state.paymentId}</p>
        <ButtonLink href="/" variant="secondary" className="mt-5">
          Back to home
        </ButtonLink>
      </div>
    );
  }

  if (state.kind === "pending") {
    return (
      <div className={`${box} border-white/10 bg-white/[0.03]`} role="status">
        <p className="text-lg font-semibold text-white">We haven&apos;t received your payment yet.</p>
        <p className="mt-1 text-sm text-white/70">
          If you completed it a moment ago, it can take a few minutes to confirm, and your spot will be confirmed
          automatically. If money was deducted and you don&apos;t hear from us, write to {companyInfo.email} with your
          payment details. Otherwise you can try again from the webinar form.
        </p>
        <ButtonLink href="/courses#webinars" variant="secondary" className="mt-5">
          Back to the webinars
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className={`${box} border-red-400/30 bg-red-400/5`} role="alert">
      <p className="text-lg font-semibold text-white">Something went wrong</p>
      <p className="mt-1 text-sm text-white/70">
        {state.message} Please write to {companyInfo.email} and we&apos;ll sort it out.
      </p>
    </div>
  );
}
