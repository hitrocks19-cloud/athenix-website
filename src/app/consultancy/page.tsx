import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import CinematicVideo from "@/components/home/CinematicVideo";
import ConsultancyServiceCard from "@/components/consultancy/ConsultancyServiceCard";
import ConsultancyProcess from "@/components/consultancy/ConsultancyProcess";
import ConsultancyForm from "@/components/consultancy/ConsultancyForm";
import Reveal from "@/components/ui/Reveal";
import PinnedRevealSection from "@/components/ui/PinnedRevealSection";
import { consultancyServices, consultancyUseCases } from "@/content/services";
import { consultancyHeroCopy } from "@/content/site";

export const metadata: Metadata = {
  title: "Athenix Consultancy",
  description:
    "Athenix Consultancy helps businesses use AI, data and automation to reduce repetitive work, improve efficiency and build smarter customer experiences.",
};

export default function ConsultancyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-athenix-glow" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
              Athenix Consultancy
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {consultancyHeroCopy.headline}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/60 sm:text-lg">{consultancyHeroCopy.subhead}</p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="#consultancy-form">{consultancyHeroCopy.primaryCta.label}</ButtonLink>
              <ButtonLink href="#services" variant="secondary">
                {consultancyHeroCopy.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Container className="-mt-6 sm:-mt-10">
        <CinematicVideo videoKey="consultancy" allowUnmute />
      </Container>

      <PinnedRevealSection
        text={`${consultancyHeroCopy.banner} ${consultancyHeroCopy.subhead}`}
        heightVh={200}
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2">
            {consultancyHeroCopy.points.map((point) => (
              <span
                key={point}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/70"
              >
                {point}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section id="services" className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Services" title="What we build" align="center" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {consultancyServices.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 6) * 80}>
                <ConsultancyServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ConsultancyProcess />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Use Cases" title="Where AI creates leverage" align="center" />
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
            {consultancyUseCases.map((useCase) => (
              <span
                key={useCase}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/70"
              >
                {useCase}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section id="consultancy-form" className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Get Started"
            title="Get a Free Business Automation Consultation"
            description="Tell us what's slowing your team down — we'll follow up to talk through what's possible."
            align="center"
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <ConsultancyForm />
          </div>
        </Container>
      </section>
    </>
  );
}
