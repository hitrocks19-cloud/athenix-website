import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CinematicVideo from "@/components/home/CinematicVideo";
import CourseGrid from "@/components/courses/CourseGrid";
import WebinarsSection from "@/components/webinar/WebinarsSection";
import ClipReveal from "@/components/ui/ClipReveal";
import JsonLd from "@/components/JsonLd";
import { courseListJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI, Data Analytics & Data Science Courses",
  description:
    "Live, trainer-led courses in Data Analytics, SQL, Data Science and AI, plus the AI Mentorship Program. Practical and built around real work.",
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  return (
    <>
      <JsonLd data={courseListJsonLd()} />
      <section className="py-20 sm:pb-10 sm:pt-28">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Athenix Learning"
            title="Learn AI and data by doing the work"
            description="Every Athenix program is taught live and built around real analytics tasks, AI tools and business context. Pick a path, or start with a webinar."
          />
        </Container>
      </section>
      <Container className="pb-4">
        <ClipReveal shape="circle">
          <CinematicVideo videoKey="learning" allowUnmute />
        </ClipReveal>
      </Container>
      <CourseGrid />
      <WebinarsSection />
    </>
  );
}
