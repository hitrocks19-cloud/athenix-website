"use client";

import { ReactNode, useCallback, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. Default 10. */
  maxTilt?: number;
  /** Adds a subtle "lift toward viewer" scale on hover. Default true. */
  scaleOnHover?: boolean;
};

/**
 * Mouse-tracked 3D tilt — the card rotates in 3D space following the
 * cursor, like Vercel/Linear-style premium sites. Pure CSS transform,
 * no WebGL/Three.js needed. Falls back to a flat card (no tilt) for
 * prefers-reduced-motion and for touch devices, where there's no
 * hover/cursor to track.
 */
export default function TiltCard({ children, className = "", maxTilt = 10, scaleOnHover = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const reducedMotionRef = useRef(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotionRef.current) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1
      const rotateY = (px - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - py) * maxTilt * 2;
      setStyle({
        transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
          scaleOnHover ? "scale3d(1.02, 1.02, 1.02)" : ""
        }`,
      });
    },
    [maxTilt, scaleOnHover]
  );

  const handleMouseEnter = useCallback(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(hover: none)").matches;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)" });
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 200ms ease-out", transformStyle: "preserve-3d", ...style }}
      className={className}
    >
      {children}
    </div>
  );
}
