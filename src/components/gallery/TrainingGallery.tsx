"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import { trainingGallery, galleryCategories } from "@/content/gallery";
import { ImageAsset } from "@/types";
import Lightbox from "./Lightbox";
import Reveal from "@/components/ui/Reveal";

export default function TrainingGallery() {
  const [active, setActive] = useState<(typeof galleryCategories)[number]>("All");
  const [lightboxAsset, setLightboxAsset] = useState<ImageAsset | null>(null);

  const filtered = active === "All" ? trainingGallery : trainingGallery.filter((g) => g.category === active);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Training Gallery" title="Moments from the room" align="center" />

        <div className="mx-auto mt-8 flex flex-wrap justify-center gap-2">
          {galleryCategories.map((cat) => (
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

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <Reveal key={i} delay={(i % 8) * 60}>
              <button
                onClick={() => setLightboxAsset(item.image)}
                className="group relative aspect-square w-full overflow-hidden rounded-xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-glow"
              >
                <SmartImage
                  asset={item.image}
                  fill
                  sizes="(max-width: 640px) 50vw, 300px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      {lightboxAsset ? <Lightbox asset={lightboxAsset} onClose={() => setLightboxAsset(null)} /> : null}
    </section>
  );
}
