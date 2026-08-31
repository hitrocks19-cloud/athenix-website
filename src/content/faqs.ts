import { Faq } from "@/types";

/**
 * Public-facing FAQs only. This file doubles as part of the approved
 * knowledge surfaced to the "Talk to Athenix AI" assistant — nothing
 * here should reference internal funnels, pricing beyond the two public
 * webinars, or unverified claims.
 */
export const faqs: Faq[] = [
  {
    question: "What does Athenix do?",
    answer:
      "Athenix has two parts: Athenix Learning, which trains individuals and professionals in Data Analytics, Data Science and applied AI, and Athenix Consultancy, which helps businesses use AI, data and automation to work more efficiently.",
  },
  {
    question: "Who is the training for?",
    answer:
      "Students, working professionals, business owners, freelancers, job seekers and educators — anyone who wants practical, applied AI and data skills.",
  },
  {
    question: "Do you offer corporate training?",
    answer:
      "Yes. Athenix has trained teams at 50+ corporates on Generative AI, Prompt Engineering, Excel, Power BI, Data Analytics and AI automation.",
  },
  {
    question: "How do I get started?",
    answer:
      "The easiest first step is booking a webinar, or reaching out directly if you're exploring corporate training or consultancy.",
  },
  {
    question: "Does Athenix offer AI consultancy for businesses?",
    answer:
      "Yes — Athenix Consultancy builds AI business solutions, data dashboards, automation and AI-powered websites and assistants for businesses.",
  },
];
