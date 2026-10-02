import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { courses } from "@/content/courses";
import CourseCard from "./CourseCard";

export default function CourseGrid() {
  return (
    <section id="courses" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Athenix Learning"
            title="Choose your program"
            description="Four programs, one approach: live teaching, real files and real projects, without overloaded curriculums."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, i) => (
            <Reveal key={course.slug} delay={i * 90}>
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
