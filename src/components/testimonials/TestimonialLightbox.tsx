"use client";

import { useEffect } from "react";
import SmartImage from "@/components/ui/SmartImage";
import { ImageAsset } from "@/types";

type Props = {
  asset: ImageAsset;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
};

/**
 * Full-size testimonial viewer. Screenshots are dense with small text
 * (three WhatsApp threads side by side), so the carousel/gallery thumbnails
 * alone aren't readable — this is the "click to actually read it" escape
 * hatch, rendered at close to full viewport size with the source aspect
 * ratio preserved (never cropped or stretched).
 */
export default function TestimonialLightbox({ asset, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={asset.alt}
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur transition hover:bg-white/20"
      >
        ✕
      </button>

      {onPrev ? (
        <button
          aria-label="Previous"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur transition hover:bg-white/20 sm:left-6"
        >
          ‹
        </button>
      ) : null}

      {onNext ? (
        <button
          aria-label="Next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur transition hover:bg-white/20 sm:right-6"
        >
          ›
        </button>
      ) : null}

      <div
        className="relative max-h-[88vh] max-w-6xl overflow-hidden rounded-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <SmartImage
          asset={asset}
          width={1600}
          height={900}
          sizes="90vw"
          className="max-h-[88vh] w-auto object-contain"
        />
      </div>
    </div>
  );
}
