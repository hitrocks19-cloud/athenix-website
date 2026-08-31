import { Testimonial } from "@/types";
import { images } from "./images";

/**
 * These map to the real WhatsApp / poll screenshots supplied by the
 * Athenix team. Only visible information is used — no names, numbers or
 * identities are inferred from masked/obscured content.
 */
export const testimonials: Testimonial[] = [
  { image: images.testimonialPoll1, category: "AI / Data Training", featured: true },
  { image: images.testimonialPoll2, category: "AI / Data Training" },
  { image: images.testimonialScreenshot1, category: "Professional Training" },
  { image: images.testimonialScreenshot2, category: "Professional Training" },
  { image: images.testimonialScreenshot3, category: "Corporate Training" },
  { image: images.testimonialScreenshot4, category: "Learner Reviews" },
  { image: images.testimonialScreenshot5, category: "Learner Reviews" },
  { image: images.testimonialScreenshot6, category: "Professional Training" },
];

export const testimonialCategories = [
  "All",
  "Learner Reviews",
  "Professional Training",
  "Corporate Training",
  "AI / Data Training",
] as const;
