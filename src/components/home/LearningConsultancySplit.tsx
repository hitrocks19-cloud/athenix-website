import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function LearningConsultancySplit() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="group relative overflow-hidden rounded-3xl border border-flare-500/20 bg-gradient-to-br from-flare-600/20 via-ink-900 to-ink-950 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-flare-400/40 sm:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 animate-floatY rounded-full bg-flare-500/20 blur-3xl transition group-hover:bg-flare-500/35" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-flare-400">
                Athenix Learning
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
                Learn AI. Master Data. Build Your Future.
              </h3>
              <p className="mt-3 max-w-md text-sm text-white/60 sm:text-base">
                Practical Data Analytics, Data Science and applied AI training for individuals and professionals.
              </p>
              <ButtonLink href="/courses" variant="secondary" className="relative mt-6">
                Explore Learning
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="group relative overflow-hidden rounded-3xl border border-magenta-500/20 bg-gradient-to-br from-magenta-600/20 via-ink-900 to-ink-950 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 sm:p-10">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 animate-floatY rounded-full bg-amber-500/20 blur-3xl transition group-hover:bg-amber-500/35"
                style={{ animationDelay: "1s" }}
              />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                Athenix Consultancy
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
                Automate Work. Unlock Efficiency. Build Smarter.
              </h3>
              <p className="mt-3 max-w-md text-sm text-white/60 sm:text-base">
                AI, data and automation solutions that help businesses run more efficiently.
              </p>
              <ButtonLink href="/consultancy" variant="secondary" className="relative mt-6">
                Explore Consultancy
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
