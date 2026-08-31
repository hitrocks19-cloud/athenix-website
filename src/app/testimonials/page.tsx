import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialGallery from "@/components/testimonials/TestimonialGallery";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Learner and corporate testimonials from Athenix training sessions.",
};

export default function TestimonialsPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Testimonials" title="What learners and teams say" align="center" />
        <div className="mt-12">
          <TestimonialGallery />
        </div>
      </Container>
    </section>
  );
}
