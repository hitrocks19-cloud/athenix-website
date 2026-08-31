"use client";

import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { heroCopy, siteStats } from "@/content/site";
import { useWebinarModal } from "@/components/webinar/WebinarModalContext";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const { open } = useWebinarModal();

  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-athenix-glow" />
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 animate-floatY rounded-full bg-magenta-500/20 blur-[100px]" />
      <div
        className="pointer-events-none absolute -right-24 top-32 h-80 w-80 animate-floatY rounded-full bg-flare-500/20 blur-[110px]"
        style={{ animationDelay: "1.5s" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.03]" />

      <Container className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-flex origin-top animate-fadeInUp items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 opacity-0">
            Athenix Learning · Athenix Consultancy
          </span>

          <h1
            className="animate-fadeInUp font-display text-4xl font-bold leading-tight text-white opacity-0 sm:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {heroCopy.headline}
          </h1>

          <p
            className="mx-auto mt-6 max-w-xl animate-fadeInUp text-base text-white/60 opacity-0 sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {heroCopy.subhead}
          </p>

          <div
            className="mt-10 flex animate-fadeInUp flex-col items-center justify-center gap-3 opacity-0 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <ButtonLink href={heroCopy.primaryCta.href} variant="primary">
              {heroCopy.primaryCta.label}
            </ButtonLink>
            <button
              onClick={() => {
                trackEvent("webinar_cta_click", { source: "hero" });
                open();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/10"
            >
              {heroCopy.secondaryCta.label}
            </button>
          </div>

          <div
            className="mt-14 flex animate-fadeInUp flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/50 opacity-0"
            style={{ animationDelay: "320ms" }}
          >
            <span>
              <strong className="text-white">{siteStats.learners}</strong> Learners
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:inline-block" />
            <span>
              <strong className="text-white">{siteStats.corporates}</strong> Corporates
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:inline-block" />
            <span>
              <strong className="text-white">{siteStats.rating}</strong> Rating
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
