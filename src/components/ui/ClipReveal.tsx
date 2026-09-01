"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Shape = "circle" | "wipe-right" | "wipe-left" | "wipe-up";

const CLIP_PATHS: Record<Shape, { hidden: string; shown: string }> = {
  circle: { hidden: "circle(0% at 50% 50%)", shown: "circle(145% at 50% 50%)" },
  "wipe-right": { hidden: "inset(0 100% 0 0)", shown: "inset(0 0% 0 0)" },
  "wipe-left": { hidden: "inset(0 0 0 100%)", shown: "inset(0 0 0 0%)" },
  "wipe-up": { hidden: "inset(100% 0 0 0)", shown: "inset(0% 0 0 0)" },
};

type Props = {
  children: ReactNode;
  /** Reveal mask shape. "circle" unmasks outward from center; the wipes sweep in from one edge. */
  shape?: Shape;
  /** Stagger delay in ms — pass index * 90 from a .map() for cascading reveals. */
  delay?: number;
  className?: string;
};

/**
 * Clip-path scroll reveal — content (typically an image or video block)
 * unmasks into view the first time it scrolls into the viewport, paired
 * with a slight scale-settle for polish. One-shot (IntersectionObserver
 * triggered), not continuously scroll-scrubbed.
 *
 * Deliberately two nested elements: the OUTER one (unstyled, full box)
 * is what gets observed, and the INNER one carries the clip-path/scale.
 * Observing the clipped element directly is unreliable — a
 * `clip-path: circle(0%)` element paints zero pixels, and at least one
 * tested environment's IntersectionObserver never fired a callback on
 * such a node even when it was well within the viewport (confirmed via
 * a fresh observer that fired instantly on an unclipped element but
 * never fired at all on the clipped one). Keeping the observed node
 * always fully painted sidesteps that entirely.
 */
export default function ClipReveal({ children, shape = "circle", delay = 0, className = "" }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSkip(true);
      setVisible(true);
      return;
    }
    const node = outerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const cp = CLIP_PATHS[shape];

  return (
    <div ref={outerRef} className={className}>
      <div
        className={skip ? "" : "transition-[clip-path,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"}
        style={{
          clipPath: visible ? cp.shown : cp.hidden,
          transform: visible ? "scale(1)" : "scale(1.08)",
          transitionDelay: visible && !skip ? `${delay}ms` : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}
