"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  /** Stagger delay in ms — pass index * 80 from a .map() for cascading reveals. */
  delay?: number;
  className?: string;
};

/**
 * Fades + slides content up into place the first time it scrolls into
 * view. Pure CSS transition driven by an IntersectionObserver toggle —
 * no animation library. Respects prefers-reduced-motion by skipping the
 * initial hidden state entirely (renders visible immediately).
 */
export default function Reveal({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSkip(true);
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${skip ? "" : "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: visible && !skip ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
