"use client";

import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { finalCta } from "@/content/site";
import { useWebinarModal } from "@/components/webinar/WebinarModalContext";
import { trackEvent } from "@/lib/analytics";

export default function FinalCTA() {
  const { open } = useWebinarModal();

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-glow sm:p-10">
              <h3 className="font-display text-2xl font-semibold text-white">{finalCta.individuals.headline}</h3>
              <button
                onClick={() => {
                  trackEvent("webinar_cta_click", { source: "final_cta" });
                  open();
                }}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-athenix-line-animated bg-[length:200%_200%] animate-gradientShift px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-glowAmber hover:brightness-110"
              >
                {finalCta.individuals.cta.label}
              </button>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-glowAmber sm:p-10">
              <h3 className="font-display text-2xl font-semibold text-white">{finalCta.businesses.headline}</h3>
              <ButtonLink href={finalCta.businesses.cta.href} variant="secondary" className="mt-6">
                {finalCta.businesses.cta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
