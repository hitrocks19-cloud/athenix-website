"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialLightbox from "./TestimonialLightbox";
import { testimonials } from "@/content/testimonials";

const AUTOPLAY_MS = 6000;

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay — pauses while the lightbox is open, the slide is hovered, or
  // the viewer prefers reduced motion.
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (paused || lightboxOpen || count <= 1) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, lightboxOpen, count]);

  if (count === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Testimonials" title="What learners and teams say" align="center" />

        <div
          className="relative mx-auto mt-12 max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-ink-900">
            {testimonials.map((t, i) => (
              <button
                key={i}
                type="button"
                aria-label="Open full-size testimonial"
                onClick={() => setLightboxOpen(true)}
                className={`absolute inset-0 h-full w-full cursor-zoom-in transition-opacity duration-700 ease-out ${
                  i === index ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <SmartImage asset={t.image} fill sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
              </button>
            ))}

            <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
              Click to read full size
            </div>
          </div>

          {count > 1 ? (
            <>
              <button
                aria-label="Previous testimonial"
                onClick={prev}
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-lg text-white/80 backdrop-blur transition hover:text-white sm:-left-5"
              >
                ‹
              </button>
              <button
                aria-label="Next testimonial"
                onClick={next}
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-lg text-white/80 backdrop-blur transition hover:text-white sm:-right-5"
              >
                ›
              </button>

              <div className="mt-5 flex justify-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-6 bg-flare-400" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </Container>

      {lightboxOpen ? (
        <TestimonialLightbox
          asset={testimonials[index].image}
          onClose={() => setLightboxOpen(false)}
          onPrev={count > 1 ? prev : undefined}
          onNext={count > 1 ? next : undefined}
        />
      ) : null}
    </section>
  );
}
