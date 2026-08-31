import { ConsultancyProcessStep, ConsultancyService } from "@/types";

export const consultancyServices: ConsultancyService[] = [
  {
    slug: "ai-business-solutions",
    name: "AI Business Solutions",
    description: "Practical AI systems designed around how your business actually operates.",
    icon: "ai",
  },
  {
    slug: "data-dashboards",
    name: "Data Analytics Dashboards",
    description: "Turn scattered data into clear, decision-ready dashboards.",
    icon: "dashboard",
  },
  {
    slug: "data-automation",
    name: "Data Automation",
    description: "Automate the reporting and data-entry work that eats your team's time.",
    icon: "automation",
  },
  {
    slug: "ai-workflow-automation",
    name: "AI Workflow Automation",
    description: "Connect tools and AI into workflows that run without manual handoffs.",
    icon: "workflow",
  },
  {
    slug: "website-development",
    name: "Website Development",
    description: "Fast, modern websites built to convert visitors into conversations.",
    icon: "web",
  },
  {
    slug: "ai-voice-agents",
    name: "AI Voice Agents",
    description: "Voice-based AI assistants that handle real conversations for your business.",
    icon: "voice",
  },
  {
    slug: "customer-support-automation",
    name: "Customer Support Automation",
    description: "AI-assisted support that resolves common questions instantly.",
    icon: "support",
  },
  {
    slug: "appointment-booking-automation",
    name: "Appointment Booking Automation",
    description: "Let customers book, reschedule and confirm without back-and-forth.",
    icon: "calendar",
  },
  {
    slug: "everyday-business-automation",
    name: "Everyday Business Automation",
    description: "Remove the small repetitive tasks that quietly slow your team down.",
    icon: "ops",
  },
];

export const consultancyProcess: ConsultancyProcessStep[] = [
  { step: "01", title: "Understand", description: "We learn how your business and teams actually work." },
  { step: "02", title: "Identify Opportunities", description: "We find where AI and automation create the most value." },
  { step: "03", title: "Design the Solution", description: "We design a solution fit to your workflows, not a generic template." },
  { step: "04", title: "Build & Automate", description: "We build, connect and test the system end-to-end." },
  { step: "05", title: "Improve Efficiency", description: "We refine the system as your business and needs evolve." },
];

export const consultancyUseCases: string[] = [
  "Automated reporting",
  "Sales automation",
  "Customer support automation",
  "Appointment systems",
  "AI assistants",
  "Voice agents",
  "Data dashboards",
  "Internal knowledge systems",
  "AI websites",
  "Business workflow automation",
];
