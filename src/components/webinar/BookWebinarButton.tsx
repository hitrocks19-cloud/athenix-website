"use client";

import { useWebinarModal } from "./WebinarModalContext";
import { trackEvent } from "@/lib/analytics";

export default function BookWebinarButton({ source, className }: { source: string; className?: string }) {
  const { open } = useWebinarModal();
  return (
    <button
      onClick={() => {
        trackEvent("webinar_cta_click", { source });
        open();
      }}
      className={className ?? "inline-flex items-center justify-center rounded-full bg-athenix-line-animated bg-[length:200%_200%] animate-gradientShift px-5 py-2.5 text-sm font-semibold text-white shadow-glow"}
    >
      Book a Webinar
    </button>
  );
}
