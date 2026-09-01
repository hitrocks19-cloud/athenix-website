"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Lightbox from "@/components/gallery/Lightbox";
import { corporateGallery } from "@/content/corporate";

const AUTOPLAY_MS = 5500;

export default function CorporateExperience() {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const count = corporateGallery.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

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
        <SectionHeading eyebrow="Corporate Experience" title="Inside the training room" align="center" />

        <div
          className="relative mx-auto mt-12 max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-ink-900 sm:aspect-video">
            {corporateGallery.map((item, i) => (
              <button
                key={i}
                type="button"
                aria-label="Open full-size photo"
                onClick={() => setLightboxOpen(true)}
                className={`absolute inset-0 h-full w-full cursor-zoom-in transition-opacity duration-700 ease-out ${
                  i === index ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <SmartImage
                  asset={item.image}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-left text-sm font-medium text-white sm:text-base">
                  {item.caption}
                </p>
              </button>
            ))}
          </div>

          {count > 1 ? (
            <>
              <button
                aria-label="Previous photo"
                onClick={prev}
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-lg text-white/80 backdrop-blur transition hover:text-white sm:-left-5"
              >
                ‹
              </button>
              <button
                aria-label="Next photo"
                onClick={next}
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-lg text-white/80 backdrop-blur transition hover:text-white sm:-right-5"
              >
                ›
              </button>

              <div className="mt-5 flex justify-center gap-2">
                {corporateGallery.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to photo ${i + 1}`}
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
        <Lightbox
          asset={corporateGallery[index].image}
          onClose={() => setLightboxOpen(false)}
          onPrev={count > 1 ? prev : undefined}
          onNext={count > 1 ? next : undefined}
        />
      ) : null}
    </section>
  );
}
