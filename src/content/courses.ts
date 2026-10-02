import { Course } from "@/types";

export const courses: Course[] = [
  {
    slug: "data-analytics-ai",
    name: "Data Analytics + AI",
    description:
      "Turn raw data into clear insight, faster. Learn analytics fundamentals and how to use AI tools to analyse, summarise and present what you find.",
    audience: "Professionals and analysts who want to make better decisions with data.",
    focus: "Analytics, AI tools, business insights, practical projects.",
    tags: ["Analytics", "AI Tools", "Business Insights", "Practical Projects"],
    ctaLabel: "Explore Program",
  },
  {
    slug: "data-analytics-sql-ai",
    name: "Data Analytics + SQL + AI",
    description:
      "Learn to pull the data yourself. Build a solid SQL foundation, then use AI to query, interpret and present your findings with confidence.",
    audience: "Learners who want a stronger data foundation alongside AI skills.",
    focus: "SQL, data querying, AI tools, dashboards.",
    tags: ["SQL", "AI Tools", "Dashboards", "Practical Projects"],
    ctaLabel: "Explore Program",
  },
  {
    slug: "data-science",
    name: "Data Science",
    description:
      "Go beyond reporting. Work on real projects, from preparing messy data to applying modeling fundamentals that inform decisions.",
    audience: "Learners moving from analytics into data science.",
    focus: "Data preparation, modeling fundamentals, applied projects.",
    tags: ["Data Science", "Applied Projects", "Statistics", "AI Tools"],
    ctaLabel: "Explore Program",
  },
  {
    slug: "ai-mentorship",
    name: "AI Mentorship Program",
    description:
      "Our flagship program. Work with a mentor to apply AI to your own job, with guided implementation from first idea to finished work.",
    audience: "Professionals ready to put AI to work in their role and career.",
    focus: "Guided implementation, professional application, mentorship.",
    tags: ["AI Mastery", "Mentorship", "Implementation", "Career Growth"],
    ctaLabel: "Learn About AI Mentorship",
    flagship: true,
  },
];

export const getCourseBySlug = (slug: string) =>
  courses.find((course) => course.slug === slug);
