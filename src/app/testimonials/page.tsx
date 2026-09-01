import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialGallery from "@/components/testimonials/TestimonialGallery";
import { testimonialStat } from "@/content/site";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Learner and corporate testimonials from Athenix training sessions.",
};

export default function TestimonialsPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-flare-400/30 bg-flare-400/10 px-4 py-1.5 text-sm font-semibold text-white">
            <span className="text-base">⭐</span>
            {testimonialStat.value} <span className="font-normal text-white/70">{testimonialStat.label}</span>
          </span>
          <SectionHeading eyebrow="Testimonials" title="What learners and teams say" align="center" />
        </div>
        <div className="mt-12">
          <TestimonialGallery />
        </div>
      </Container>
    </section>
  );
}
