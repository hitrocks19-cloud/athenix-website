"use client";

import { useEffect, useState } from "react";
import { useWebinarModal } from "./WebinarModalContext";
import { trackEvent } from "@/lib/analytics";

export default function FloatingWebinarCTA() {
  const { isOpen, hasBeenOpened, open } = useWebinarModal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = scrolled && !isOpen;
  if (!visible) return null;

  return (
    <button
      onClick={() => {
        trackEvent("webinar_cta_click", { source: "floating" });
        open();
      }}
      className="fixed bottom-6 right-5 z-30 flex items-center gap-2 rounded-full bg-athenix-line-animated bg-[length:200%_200%] animate-gradientShift px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-glowAmber hover:brightness-110 sm:right-8"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      {hasBeenOpened ? "Book Your Webinar" : "Book a Webinar"}
    </button>
  );
}
