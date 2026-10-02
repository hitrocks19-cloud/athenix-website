import { Trainer } from "@/types";
import { images } from "./images";

export const trainers: Trainer[] = [
  {
    slug: "hitesh-purohit",
    name: "Hitesh Purohit",
    role: "Corporate AI, Data Analytics & Business Intelligence Trainer · Founder, Athenix Learning",
    bio:
      "Hitesh Purohit brings 15+ years of business leadership experience to Athenix Learning. He trains professionals and corporate teams in Advanced Excel, Power Query, Power BI, Generative AI, AI automation and agentic AI, always starting from real use cases, dashboards and AI-driven workflows rather than theory. He has also delivered executive AI mentoring and training to senior leadership, including CXOs and academic faculty, at organizations he has worked with.",
    expertise: [
      "Advanced Excel",
      "Power BI & Business Intelligence",
      "Generative AI for Business",
      "Data Science",
      "Power Query (ETL)",
      "Dashboard Design & KPI Reporting",
      "Data Storytelling",
      "AI Prompt Engineering",
      "AI Automation & Agentic AI",
      "Microsoft Copilot for Business",
      "Executive AI Adoption",
      "Business Process Automation",
    ],
    experience: "15+ years of business leadership experience; 2,500+ students and professionals trained.",
    linkedin: "https://www.linkedin.com/in/-hitesh-purohit/",
    photo: images.trainerPortrait,
  },
];

export const leadTrainer = trainers[0];
