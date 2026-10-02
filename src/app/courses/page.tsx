import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CinematicVideo from "@/components/home/CinematicVideo";
import CourseGrid from "@/components/courses/CourseGrid";
import WebinarsSection from "@/components/webinar/WebinarsSection";
import ClipReveal from "@/components/ui/ClipReveal";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Live courses in Data Analytics, SQL, Data Science and AI, plus the AI Mentorship Program. Practical, trainer-led and built around real work.",
};

export default function CoursesPage() {
  return (
    <>
      <section className="py-20 sm:pb-10 sm:pt-28">
        <Container>
          <SectionHeading
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
