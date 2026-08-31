"use client";

import { Webinar } from "@/types";
import { useWebinarModal } from "./WebinarModalContext";
import { trackEvent } from "@/lib/analytics";
import TiltCard from "@/components/ui/TiltCard";

export default function WebinarCard({ webinar }: { webinar: Webinar }) {
  const { open } = useWebinarModal();

  return (
    <TiltCard>
      <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 transition-colors duration-300 hover:border-white/20 hover:shadow-glow sm:p-8">
        <div>
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="font-display text-xl font-semibold text-white">{webinar.title}</h3>
            <span className="font-display text-2xl font-bold text-amber-400">{webinar.priceLabel}</span>
          </div>
          <p className="text-sm text-white/60">{webinar.description}</p>
          <ul className="mt-4 space-y-2">
            {webinar.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-white/70">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-flare-400" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => {
            trackEvent("webinar_cta_click", { source: "card", webinar: webinar.slug });
            open(webinar.slug);
          }}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-athenix-line-animated bg-[length:200%_200%] animate-gradientShift px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-glowAmber hover:brightness-110"
        >
          {webinar.ctaLabel}
        </button>
      </div>
    </TiltCard>
  );
}
