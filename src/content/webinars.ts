import { Webinar } from "@/types";

export const webinars: Webinar[] = [
  {
    slug: "excel-webinar",
    title: "Excel Webinar",
    price: "199",
    priceLabel: "₹199",
    description:
      "A focused, practical session on getting more out of Excel — built for real work, not theory.",
    bullets: [
      "Practical Excel techniques you can use immediately",
      "Live session with Q&A",
      "Beginner-friendly, professional-focused",
    ],
    ctaLabel: "Register for ₹199",
  },
  {
    slug: "mastery-in-claude",
    title: "Mastery in Claude",
    price: "499",
    priceLabel: "₹499",
    description:
      "A hands-on session on working with Claude effectively for real professional tasks.",
    bullets: [
      "Practical, applied Claude workflows",
      "LinkedIn profile analysis",
      "Claude resource document",
      "GitHub resources & links",
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
