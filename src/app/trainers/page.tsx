import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TrainerCard from "@/components/trainers/TrainerCard";
import { trainers } from "@/content/trainers";
import JsonLd from "@/components/JsonLd";
import { trainerJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hitesh Purohit: AI & Data Analytics Trainer",
  description:
    "Meet Hitesh Purohit, founder and lead trainer at Athenix Learning: Advanced Excel, Power BI, Generative AI and AI automation, with 15+ years of business experience.",
  alternates: { canonical: "/trainers" },
};

export default function TrainersPage() {
  return (
    <section className="py-20 sm:py-28">
      {trainers.map((t) => (
        <JsonLd key={t.slug} data={trainerJsonLd(t)} />
      ))}
      <Container>
        <SectionHeading as="h1" eyebrow="Trainers" title="Learn from someone who has done the work" align="center" />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.slug} trainer={trainer} />
          ))}
        </div>
      </Container>
    </section>
  );
}
