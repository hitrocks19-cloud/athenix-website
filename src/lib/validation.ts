import { z } from "zod";

const name = z.string().trim().min(2, "Please enter your full name.").max(120);
const email = z.string().trim().email("Please enter a valid email address.");
const whatsapp = z
  .string()
  .trim()
  .min(8, "Please enter a valid WhatsApp number.")
  .max(20)
  .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number.");

export const webinarRegistrationSchema = z.object({
  fullName: name,
  email,
  whatsapp,
  dob: z.string().trim().min(1, "Please enter your date of birth."),
  occupation: z.string().trim().min(1, "Please select your occupation."),
  courseInterest: z.string().trim().min(1, "Please select a course of interest."),
  webinar: z.string().trim().min(1, "Please select a webinar."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm you agree to be contacted." }),
  }),
  /** honeypot — bots fill this, humans never see it */
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type WebinarRegistration = z.infer<typeof webinarRegistrationSchema>;

export const corporateTrainingSchema = z.object({
  fullName: name,
  workEmail: email,
  phone: whatsapp,
  company: z.string().trim().min(2, "Please enter your company name."),
  designation: z.string().trim().min(2, "Please enter your designation."),
  teamSize: z.string().trim().min(1, "Please select a team size."),
  trainingRequirement: z.string().trim().min(2, "Please describe your training requirement."),
  preferredFormat: z.string().trim().min(1, "Please select a preferred format."),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type CorporateTrainingLead = z.infer<typeof corporateTrainingSchema>;

export const consultancySchema = z.object({
  fullName: name,
  businessEmail: email,
  phone: whatsapp,
  company: z.string().trim().min(2, "Please enter your company name."),
  industry: z.string().trim().min(1, "Please enter your industry."),
  businessSize: z.string().trim().min(1, "Please select a business size."),
  improvementGoal: z.string().trim().min(2, "Please tell us what you'd like to improve."),
  currentChallenges: z.string().trim().max(2000).optional().or(z.literal("")),
  preferredContact: z.string().trim().min(1, "Please select a preferred contact method."),
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type ConsultancyLead = z.infer<typeof consultancySchema>;
