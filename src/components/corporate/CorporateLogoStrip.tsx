import Container from "@/components/ui/Container";
import { corporateClients } from "@/content/corporate";

export default function CorporateLogoStrip() {
  const items = [...corporateClients.map((c) => c.name), "and many others"];
  const doubled = [...items, ...items];

  return (
    <section className="border-y border-white/10 bg-ink-900/40 py-10">
      <Container>
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
          Trusted by teams at
        </p>
      </Container>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {doubled.map((name, i) => (
            <span key={`${name}-${i}`} className="whitespace-nowrap text-base font-medium text-white/50">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
