"use client";

import { useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
import TestimonialLightbox from "./TestimonialLightbox";
import { testimonials, testimonialCategories } from "@/content/testimonials";

export default function TestimonialGallery() {
  const [active, setActive] = useState<(typeof testimonialCategories)[number]>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = active === "All" ? testimonials : testimonials.filter((t) => t.category === active);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {testimonialCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActive(cat);
              setOpenIndex(null);
            }}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              active === cat
                ? "border-flare-400 bg-flare-400/10 text-white"
                : "border-white/15 text-white/60 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {filtered.map((t, i) => (
          <button
            key={i}
            type="button"
            aria-label="Open full-size testimonial"
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-video cursor-zoom-in overflow-hidden rounded-2xl border border-white/10"
          >
            <SmartImage
              asset={t.image}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white/80 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              Click to read full size
            </div>
          </button>
        ))}
      </div>

      {openIndex !== null ? (
        <TestimonialLightbox
          asset={filtered[openIndex].image}
          onClose={() => setOpenIndex(null)}
          onPrev={filtered.length > 1 ? () => setOpenIndex((i) => ((i! - 1 + filtered.length) % filtered.length)) : undefined}
          onNext={filtered.length > 1 ? () => setOpenIndex((i) => (i! + 1) % filtered.length) : undefined}
        />
      ) : null}
    </div>
  );
}
