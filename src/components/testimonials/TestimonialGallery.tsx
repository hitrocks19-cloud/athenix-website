"use client";

import { useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
import { testimonials, testimonialCategories } from "@/content/testimonials";

export default function TestimonialGallery() {
  const [active, setActive] = useState<(typeof testimonialCategories)[number]>("All");

  const filtered = active === "All" ? testimonials : testimonials.filter((t) => t.category === active);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {testimonialCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
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

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filtered.map((t, i) => (
          <div key={i} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/10">
            <SmartImage asset={t.image} width={500} height={700} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
