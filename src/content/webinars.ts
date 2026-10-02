import { Webinar } from "@/types";

export const webinars: Webinar[] = [
  {
    slug: "excel-webinar",
    title: "Mastery in Excel + AI",
    price: "199",
    priceLabel: "₹199",
    description:
      "A live, hands-on session on mastering Excel with AI, built for real work, not theory. Learn techniques you can use on your own files the same day.",
    bullets: [
      "Practical Excel and AI techniques you can apply straight away",
      "Live Q&A so you can ask what is holding you up",
      "Beginner-friendly and built for working professionals",
    ],
    ctaLabel: "Register for ₹199",
  },
  {
    slug: "mastery-in-claude",
    title: "Mastery in Claude",
    price: "499",
    priceLabel: "₹499",
    description:
      "A hands-on session on using Claude for real professional tasks, with workflows you can reuse long after the session ends.",
    bullets: [
      "Practical Claude workflows you can reuse",
      "LinkedIn profile analysis",
      "Claude resource document",
      "GitHub resources and links",
    ],
    ctaLabel: "Register for ₹499",
  },
];

export const courseInterestOptions = [
  "Data Analytics + AI",
  "Data Analytics + SQL + AI",
  "Data Science",
  "AI Mentorship Program",
  "Not Sure Yet",
];

export const occupationOptions = [
  "Student",
  "Working Professional",
  "Business Owner",
  "Freelancer",
  "Job Seeker",
  "Educator",
  "Other",
];
