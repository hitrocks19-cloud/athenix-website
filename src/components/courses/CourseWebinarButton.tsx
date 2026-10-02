"use client";

import Button from "@/components/ui/Button";
import { courseWebinarMap } from "@/content/webinars";
import { useWebinarModal } from "@/components/webinar/WebinarModalContext";
import { trackEvent } from "@/lib/analytics";

/**
 * "Explore Program" opens the webinar sign-up with this course already chosen
 * and the matching webinar preselected (Data Analytics / SQL / Data Science ->
 * Mastery in Excel + AI; AI Mentorship -> Mastery in Claude).
 */
export default function CourseWebinarButton({
  courseName,
  variant,
  children,
}: {
  courseName: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
}) {
  const { open } = useWebinarModal();
  return (
    <Button
      variant={variant}
      className="mt-6"
      onClick={() => {
        trackEvent("webinar_cta_click", { source: "course_card", course: courseName });
        open(courseWebinarMap[courseName], courseName);
      }}
    >
      {children}
    </Button>
  );
}
