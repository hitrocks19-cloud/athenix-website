"use client";

import { useEffect, useRef } from "react";
import { useWebinarModal } from "./WebinarModalContext";
import RegistrationForm from "./RegistrationForm";

export default function WebinarModal() {
  const { isOpen, close, selectedWebinarSlug } = useWebinarModal();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="webinar-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-ink-900 p-6 shadow-card sm:p-8"
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <h2 id="webinar-modal-title" className="font-display text-2xl font-semibold text-white">
          Book Your Webinar
        </h2>
        <p className="mt-1 mb-6 text-sm text-white/60">
          A few details and you&apos;re in — we&apos;ll send the webinar link to your registered contact.
        </p>

        <RegistrationForm defaultWebinarSlug={selectedWebinarSlug} />
      </div>
    </div>
  );
}
