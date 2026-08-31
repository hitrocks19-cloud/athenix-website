"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks 0→1 scroll progress through a tall section meant to be used
 * with a `sticky top-0 h-screen` inner wrapper (the pinned-text
 * technique from the reference site). Progress is computed from the
 * OUTER section's position, not the sticky inner element's — a sticky
 * element's own getBoundingClientRect() freezes once it becomes pinned,
 * so it can't drive the animation itself.
 *
 * Respects prefers-reduced-motion: reports progress=1 immediately
 * instead of animating, so reduced-motion visitors see the final state
 * with no motion.
 */
export function usePinnedScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      const p = scrollable > 0 ? -rect.top / scrollable : 0;
      setProgress(Math.min(Math.max(p, 0), 1));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, progress };
}
