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
    "Data Analytics + AI, Data Analytics + SQL + AI, Data Science and the AI Mentorship Program — practical Athenix Learning programs.",
};

export default function CoursesPage() {
  return (
    <>
      <section className="py-20 sm:pb-10 sm:pt-28">
        <Container>
          <SectionHeading
            eyebrow="Athenix Learning"
            title="Practical programs, not overloaded courseware"
            description="Every program is built around real application — analytics, AI tools and business context, taught live."
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
