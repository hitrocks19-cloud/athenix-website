"use client";

import { useEffect, useRef, useState } from "react";
import { CinematicVideoKey } from "@/types";
import { cinematicVideos } from "@/content/videos";
import SmartImage from "@/components/ui/SmartImage";

/**
 * Poster-first, lazy-loaded cinematic video. Never blocks initial render:
 * the poster image paints immediately, the <video> element (and its
 * network request) is only mounted once the section scrolls into view,
 * and prefers-reduced-motion skips autoplay entirely in favor of the
 * poster + a manual play control.
 */
export default function CinematicVideo({ videoKey, className = "" }: { videoKey: CinematicVideoKey; className?: string }) {
  const asset = cinematicVideos[videoKey];
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const hasVideo = Boolean(asset.mp4) && inView;

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded-3xl border border-white/10 ${className}`}>
      <div className="relative aspect-video w-full">
        <SmartImage
          asset={asset.poster}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className={`object-cover transition-opacity duration-500 ${playing ? "opacity-0" : "opacity-100"}`}
        />

        {hasVideo && !reducedMotion ? (
          <video
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
            poster={asset.poster.src}
            muted
            playsInline
            loop
            autoPlay
            onPlaying={() => setPlaying(true)}
          >
            <source src={asset.mp4} type="video/mp4" />
            {asset.webm ? <source src={asset.webm} type="video/webm" /> : null}
          </video>
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
          <p className="font-display text-lg font-semibold text-white sm:text-2xl">{asset.title}</p>
          <p className="mt-1 max-w-xl text-sm text-white/70 sm:text-base">{asset.description}</p>
        </div>

        {!asset.mp4 ? (
          <span className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur">
            Cinematic video coming soon
          </span>
        ) : null}
      </div>
    </div>
  );
}
