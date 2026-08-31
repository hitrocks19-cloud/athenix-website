"use client";

import Container from "@/components/ui/Container";
import ScrollRevealText from "@/components/ui/ScrollRevealText";
import { usePinnedScrollProgress } from "@/hooks/usePinnedScrollProgress";

type Props = {
  text: string;
  /** Extra scroll distance the section occupies while pinned — taller = slower reveal. Default 220vh. */
  heightVh?: number;
  className?: string;
};

/**
 * Reusable pinned word-by-word scroll reveal (see ManifestoSection for
 * the original). Drop this anywhere a flowing statement should light up
 * word-by-word as the visitor scrolls, matching the reference site's
 * signature text technique.
 */
export default function PinnedRevealSection({ text, heightVh = 220, className = "" }: Props) {
  const { ref, progress } = usePinnedScrollProgress<HTMLElement>();

  return (
    <section ref={ref} className="relative bg-ink-950" style={{ height: `${heightVh}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-athenix-glow opacity-50" />
        <Container className="relative">
          <ScrollRevealText
            text={text}
            progress={progress}
            className={`mx-auto max-w-4xl text-center font-display text-2xl font-semibold leading-snug sm:text-4xl sm:leading-snug ${className}`}
          />
        </Container>
      </div>
    </section>
  );
}
