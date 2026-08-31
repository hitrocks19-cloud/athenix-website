import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { consultancyProcess } from "@/content/services";

export default function ConsultancyProcess() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Process" title="How we work" align="center" />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {consultancyProcess.map((step, i) => (
            <Reveal key={step.step} delay={i * 90}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05]">
                <span className="bg-athenix-line bg-clip-text font-display text-3xl font-bold text-transparent opacity-40">
                  {step.step}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-white/60">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
