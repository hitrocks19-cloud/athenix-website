import { Course } from "@/types";

export const courses: Course[] = [
  {
    slug: "data-analytics-ai",
    name: "Data Analytics + AI",
    description:
      "Learn to work with data while using modern AI capabilities to improve analysis, productivity and decision-making.",
    audience: "Professionals and analysts who want AI-assisted decision-making skills.",
    focus: "Analytics, AI tools, business insights, practical projects.",
    tags: ["Analytics", "AI Tools", "Business Insights", "Practical Projects"],
    ctaLabel: "Explore Program",
  },
  {
    slug: "data-analytics-sql-ai",
    name: "Data Analytics + SQL + AI",
    description:
      "Combine SQL fundamentals with AI-assisted analytics to query, interpret and present data with confidence.",
    audience: "Learners who want a stronger data foundation alongside AI fluency.",
    focus: "SQL, data querying, AI tools, dashboards.",
    tags: ["SQL", "AI Tools", "Dashboards", "Practical Projects"],
    ctaLabel: "Explore Program",
  },
  {
    slug: "data-science",
    name: "Data Science",
    description:
      "Build practical data science skills grounded in real projects, from data preparation to model-informed insight.",
    audience: "Learners moving from analytics into data science fundamentals.",
    focus: "Data preparation, modeling fundamentals, applied projects.",
    tags: ["Data Science", "Applied Projects", "Statistics", "AI Tools"],
    ctaLabel: "Explore Program",
  },
  {
    slug: "ai-mentorship",
    name: "AI Mentorship Program",
    description:
      "Practical AI mastery with guided implementation and professional application — Athenix's flagship program.",
    audience: "Professionals ready to apply AI directly to their work and career.",
    focus: "Guided implementation, professional application, mentorship.",
    tags: ["AI Mastery", "Mentorship", "Implementation", "Career Growth"],
    ctaLabel: "Learn About AI Mentorship",
    flagship: true,
  },
];

export const getCourseBySlug = (slug: string) =>
  courses.find((course) => course.slug === slug);
