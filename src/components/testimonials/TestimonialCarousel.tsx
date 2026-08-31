"use client";

import { useEffect, useRef } from "react";
import SmartImage from "@/components/ui/SmartImage";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/testimonials";

export default function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  useEffect(() => {}, []);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Testimonials" title="What learners and teams say" />
          <div className="hidden gap-2 sm:flex">
            <button
              aria-label="Previous"
              onClick={() => scrollBy(-1)}
              className="rounded-full border border-white/15 p-2 text-white/70 hover:text-white"
            >
              ‹
            </button>
            <button
              aria-label="Next"
              onClick={() => scrollBy(1)}
              className="rounded-full border border-white/15 p-2 text-white/70 hover:text-white"
            >
              ›
            </button>
          </div>
        </div>

        <div ref={trackRef} className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="w-64 flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 sm:w-80"
            >
              <SmartImage asset={t.image} width={400} height={560} className="w-full" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
