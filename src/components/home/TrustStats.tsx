import Container from "@/components/ui/Container";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import { siteStats } from "@/content/site";

export default function TrustStats() {
  const stats = [
    { value: siteStats.learners, label: siteStats.learnersLabel },
    { value: siteStats.corporates, label: siteStats.corporatesLabel },
    { value: siteStats.rating, label: siteStats.ratingLabel },
  ];

  return (
    <section className="border-y border-white/10 bg-ink-900/60 py-10">
      <Container>
        <div className="grid grid-cols-3 gap-6 text-center">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <p className="bg-athenix-line bg-clip-text font-display text-3xl font-bold text-transparent sm:text-4xl">
                <CountUp value={s.value} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-white/50 sm:text-sm">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
