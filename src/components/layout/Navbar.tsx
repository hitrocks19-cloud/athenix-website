"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { primaryNav, consultancyNav, bookWebinarLabel } from "@/content/nav";
import { images } from "@/content/images";
import SmartImage from "@/components/ui/SmartImage";
import { useWebinarModal } from "@/components/webinar/WebinarModalContext";
import { trackEvent } from "@/lib/analytics";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { open } = useWebinarModal();

  const handleBookWebinar = () => {
    trackEvent("webinar_cta_click", { source: "navbar" });
    setMobileOpen(false);
    open();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Athenix home">
          <SmartImage asset={images.logoMark} className="h-8 w-8 rounded" width={32} height={32} />
          <span className="font-display text-lg font-semibold tracking-wide text-white">ATHENIX</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition hover:text-white ${
                pathname === link.href ? "text-white" : "text-white/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={consultancyNav.href}
            className={`text-sm font-semibold transition hover:text-amber-400 ${
              pathname === consultancyNav.href ? "text-amber-400" : "text-amber-300/90"
            }`}
          >
            {consultancyNav.label}
          </Link>
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={handleBookWebinar}
            className="inline-flex items-center rounded-full bg-athenix-line-animated bg-[length:200%_200%] animate-gradientShift px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-glowAmber hover:brightness-110"
          >
            {bookWebinarLabel}
          </button>
        </div>

        <button
          className="flex items-center justify-center rounded-md p-2 text-white lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-ink-950 px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {[...primaryNav, consultancyNav].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-white/80 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={handleBookWebinar}
            className="mt-4 w-full rounded-full bg-athenix-line-animated bg-[length:200%_200%] animate-gradientShift px-5 py-3 text-sm font-semibold text-white shadow-glow"
          >
            {bookWebinarLabel}
          </button>
        </div>
      ) : null}
    </header>
  );
}
