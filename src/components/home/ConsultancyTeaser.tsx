import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { consultancyServices } from "@/content/services";
import { consultancyHeroCopy } from "@/content/site";

export default function ConsultancyTeaser() {
  const featured = consultancyServices.slice(0, 4);

  return (
    <section className="border-y border-magenta-500/10 bg-gradient-to-b from-magenta-600/10 via-ink-950 to-ink-950 py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Athenix Consultancy
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
              {consultancyHeroCopy.banner}
            </h2>
            <p className="mt-4 max-w-lg text-base text-white/60">{consultancyHeroCopy.subhead}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/consultancy#consultancy-form">
                {consultancyHeroCopy.primaryCta.label}
              </ButtonLink>
              <ButtonLink href="/consultancy" variant="secondary">
                {consultancyHeroCopy.secondaryCta.label}
              </ButtonLink>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {featured.map((s, i) => (
              <Reveal key={s.slug} delay={i * 90}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05]">
                  <h3 className="font-display text-sm font-semibold text-white">{s.name}</h3>
                  <p className="mt-1.5 text-xs text-white/50">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
