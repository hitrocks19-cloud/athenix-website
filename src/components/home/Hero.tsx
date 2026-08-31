"use client";

import { useCallback, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { heroCopy, siteStats } from "@/content/site";
import { useWebinarModal } from "@/components/webinar/WebinarModalContext";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const { open } = useWebinarModal();
  const sectionRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Depth-parallax: background orbs drift opposite the cursor, giving the
  // hero a sense of 3D depth. Small magnitude — this is meant to be felt,
  // not noticed as a gimmick.
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(hover: none)").matches) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x, y });
  }, []);

  return (
    <section ref={sectionRef} onMouseMove={handleMouseMove} className="relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-athenix-glow" />
      <div
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 animate-floatY rounded-full bg-magenta-500/20 blur-[100px] transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(${parallax.x * -30}px, ${parallax.y * -30}px, 0)` }}
      />
      <div
        className="pointer-events-none absolute -right-24 top-32 h-80 w-80 animate-floatY rounded-full bg-flare-500/20 blur-[110px] transition-transform duration-300 ease-out"
        style={{ animationDelay: "1.5s", transform: `translate3d(${parallax.x * 40}px, ${parallax.y * 40}px, 0)` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.03]" />

      <Container className="relative py-24 sm:py-32">
        <div
          className="mx-auto max-w-3xl text-center transition-transform duration-300 ease-out"
          style={{ transform: `translate3d(${parallax.x * -8}px, ${parallax.y * -8}px, 0)` }}
        >
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
