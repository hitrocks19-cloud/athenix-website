"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageAsset } from "@/types";

type Props = {
  asset: ImageAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
};

/**
 * Renders the real photo if /public/<asset.src> exists, otherwise a
 * branded placeholder with the asset's label — so the site never shows a
 * broken image while real Athenix photography is still being added.
 *
 * Deliberately a client component using the browser's native image
 * `onError`, rather than a server-side fs check: this component is
 * rendered from inside many "use client" components (Navbar, galleries,
 * forms), and a server-only fs check there would get pulled into the
 * client bundle and fail at build time.
 */
export default function SmartImage({ asset, className = "", sizes, priority, fill, width, height }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center border border-white/10 bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900 text-center ${className}`}
        role="img"
        aria-label={asset.alt}
      >
        <div className="px-4">
          <div className="mx-auto mb-2 h-8 w-8 rounded-full bg-athenix-line opacity-70" />
          <p className="text-xs font-medium uppercase tracking-wide text-white/50">{asset.label}</p>
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={width ?? 800}
      height={height ?? 600}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
