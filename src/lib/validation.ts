import { z } from "zod";

const required = (message: string) =>
  z.string({ required_error: message, invalid_type_error: message }).trim().min(1, message);

const name = z.string().trim().min(2, "Please tell us your full name.").max(120);
const email = z.string().trim().email("That email address doesn't look right. Please check it and try again.");
const whatsapp = z
  .string()
  .trim()
  .min(8, "Please enter a WhatsApp number we can reach you on.")
  .max(20)
  .regex(/^[0-9+\-\s()]+$/, "Please use digits only, with an optional + for the country code.");

export const webinarRegistrationSchema = z.object({
  fullName: name,
  email,
  whatsapp,
  dob: required("Please add your date of birth."),
  occupation: required("Please choose your occupation."),
  courseInterest: required("Please choose a program, or pick \"Not Sure Yet\"."),
  webinar: required("Please choose a webinar."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please tick the box so we can contact you about this webinar." }),
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
  designation: z.string().trim().min(2, "Please add your role or designation."),
  teamSize: required("Please choose your team size."),
  trainingRequirement: z.string().trim().min(2, "Please tell us what you'd like your team to learn."),
  preferredFormat: required("Please choose a preferred format."),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type CorporateTrainingLead = z.infer<typeof corporateTrainingSchema>;

export const consultancySchema = z.object({
  fullName: name,
  businessEmail: email,
  phone: whatsapp,
  company: z.string().trim().min(2, "Please enter your company name."),
  industry: required("Please tell us your industry."),
  businessSize: required("Please choose your business size."),
  improvementGoal: z.string().trim().min(2, "Please tell us what you'd like to improve."),
  currentChallenges: z.string().trim().max(2000).optional().or(z.literal("")),
  preferredContact: required("Please choose how you'd like us to contact you."),
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type ConsultancyLead = z.infer<typeof consultancySchema>;
