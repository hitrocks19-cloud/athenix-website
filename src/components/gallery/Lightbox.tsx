"use client";

import { useEffect } from "react";
import SmartImage from "@/components/ui/SmartImage";
import { ImageAsset } from "@/types";

export default function Lightbox({ asset, onClose }: { asset: ImageAsset; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={asset.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div className="max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}>
        <SmartImage asset={asset} width={1000} height={750} className="max-h-[85vh] w-auto" />
      </div>
    </div>
  );
}
