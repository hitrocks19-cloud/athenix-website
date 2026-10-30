type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Use "h1" for the one main heading of a page; everything else stays h2. */
  as?: "h1" | "h2";
};

export default function SectionHeading({ eyebrow, title, description, align = "left", as: Heading = "h2" }: Props) {
  const alignment = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">{eyebrow}</span>
      ) : null}
      <Heading className="font-display text-3xl font-semibold text-white sm:text-4xl">{title}</Heading>
      {description ? <p className="text-base text-white/60 sm:text-lg">{description}</p> : null}
    </div>
  );
}
