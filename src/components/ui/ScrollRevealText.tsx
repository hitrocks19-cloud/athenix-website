type Props = {
  text: string;
  /** 0 to 1 — which fraction of the words should be "lit" (white). */
  progress: number;
  className?: string;
};

/**
 * Word-by-word scroll-scrubbed text reveal — the signature effect from
 * the reference site (specialforcesofai.framer.website): as the user
 * scrolls, each word lights up from dim to full white in sequence.
 * Purely presentational — `progress` is computed by the parent (see
 * ManifestoSection), since this component is meant to sit inside a
 * sticky-pinned wrapper whose own bounding rect freezes once pinned and
 * so can't drive the animation itself.
 */
export default function ScrollRevealText({ text, progress, className = "" }: Props) {
  const words = text.split(" ");

  return (
    <p className={className}>
      {words.map((word, i) => {
        const threshold = i / words.length;
        const active = progress >= threshold;
        return (
          <span key={i} className={`transition-colors duration-300 ${active ? "text-white" : "text-white/15"}`}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
