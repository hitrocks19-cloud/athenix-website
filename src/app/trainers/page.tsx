import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TrainerCard from "@/components/trainers/TrainerCard";
import { trainers } from "@/content/trainers";

export const metadata: Metadata = {
  title: "Trainers",
  description: "Meet the Athenix training team.",
};

export default function TrainersPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Trainers" title="Learn directly from practitioners" align="center" />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.slug} trainer={trainer} />
          ))}
        </div>
      </Container>
    </section>
  );
}
