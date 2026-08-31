import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { webinars } from "@/content/webinars";
import WebinarCard from "./WebinarCard";

export default function WebinarsSection() {
  return (
    <section id="webinars" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Start Here"
            title="Book a Webinar"
            description="The easiest way to experience Athenix — live, practical, and low commitment."
            align="center"
          />
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {webinars.map((w, i) => (
            <Reveal key={w.slug} delay={i * 100}>
              <WebinarCard webinar={w} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
