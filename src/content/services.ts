import { ConsultancyProcessStep, ConsultancyService } from "@/types";

export const consultancyServices: ConsultancyService[] = [
  {
    slug: "ai-business-solutions",
    name: "AI Business Solutions",
    description: "AI systems designed around how your business actually works, not off-the-shelf templates.",
    icon: "ai",
  },
  {
    slug: "data-dashboards",
    name: "Data Analytics Dashboards",
    description: "Turn scattered spreadsheets into one clear dashboard your team can decide from.",
    icon: "dashboard",
  },
  {
    slug: "data-automation",
    name: "Data Automation",
    description: "Stop retyping and re-exporting. We automate the reports and data entry that eat your team's hours.",
    icon: "automation",
  },
  {
    slug: "ai-workflow-automation",
    name: "AI Workflow Automation",
    description: "Connect your tools and AI so work moves from step to step without manual handoffs.",
    icon: "workflow",
  },
  {
    slug: "website-development",
    name: "Website Development",
    description: "Fast, modern websites designed to turn visitors into enquiries.",
    icon: "web",
  },
  {
    slug: "ai-voice-agents",
    name: "AI Voice Agents",
    description: "Voice assistants that handle real customer conversations for your business.",
    icon: "voice",
  },
  {
    slug: "customer-support-automation",
    name: "Customer Support Automation",
    description: "AI-assisted support that answers common questions instantly, so your team can focus on the ones that need a person.",
    icon: "support",
  },
  {
    slug: "appointment-booking-automation",
    name: "Appointment Booking Automation",
    description: "Customers book, reschedule and confirm on their own, with no back-and-forth.",
    icon: "calendar",
  },
  {
    slug: "everyday-business-automation",
    name: "Everyday Business Automation",
    description: "Remove the small repetitive tasks that quietly slow your team down every day.",
    icon: "ops",
  },
];

export const consultancyProcess: ConsultancyProcessStep[] = [
  { step: "01", title: "Understand", description: "We learn how your business and teams actually work." },
  { step: "02", title: "Identify Opportunities", description: "We pinpoint where AI and automation will save the most time and effort." },
  { step: "03", title: "Design the Solution", description: "We design around your workflows, never a generic template." },
  { step: "04", title: "Build & Automate", description: "We build, connect and test the system from end to end." },
  { step: "05", title: "Refine & Improve", description: "We keep refining the system as your business grows and changes." },
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
