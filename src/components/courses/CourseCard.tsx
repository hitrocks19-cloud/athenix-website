import { Course } from "@/types";
import Badge from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div
      className={`group flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7 ${
        course.flagship
          ? "border-magenta-400/40 bg-gradient-to-b from-magenta-500/10 to-transparent hover:shadow-glow"
          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
      }`}
    >
      <div>
        {course.flagship ? (
          <span className="mb-3 inline-block rounded-full bg-magenta-500/20 px-3 py-1 text-xs font-semibold text-magenta-300">
            Flagship Program
          </span>
        ) : null}
        <h3 className="font-display text-xl font-semibold text-white">{course.name}</h3>
        <p className="mt-2 text-sm text-white/60">{course.description}</p>

        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-white/40">Who it&apos;s for</p>
        <p className="mt-1 text-sm text-white/60">{course.audience}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {course.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>

      <ButtonLink href="#webinars" variant={course.flagship ? "primary" : "secondary"} className="mt-6">
        {course.ctaLabel}
      </ButtonLink>
    </div>
  );
}
