"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** e.g. "2,500+", "50+", "4.8★" — parsed for its leading number, rest kept as suffix/format. */
  value: string;
  durationMs?: number;
  className?: string;
};

/**
 * Animates from 0 up to the numeric value parsed out of `value` once it
 * scrolls into view, preserving the original formatting (commas,
 * decimals, trailing "+"/"★"). Falls back to rendering the static value
 * immediately if it can't parse a number, or if reduced motion is set.
 */
export default function CountUp({ value, durationMs = 1400, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/[\d,]+(\.\d+)?/);
    if (!match) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = parseFloat(match[0].replace(/,/g, ""));
    const decimals = match[1] ? match[1].length - 1 : 0;
    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index ?? 0) + match[0].length);

    if (reduceMotion || Number.isNaN(target)) {
      setDisplay(value);
      return;
    }

    setDisplay(`${prefix}0${suffix}`);

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;
          const formatted =
            decimals > 0
              ? current.toFixed(decimals)
              : Math.round(current).toLocaleString("en-IN");
          setDisplay(`${prefix}${formatted}${suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
