import { CinematicVideoAsset, CinematicVideoKey } from "@/types";
import { images } from "./images";

/**
 * Cinematic video registry. Videos are produced separately (ElevenLabs
 * Image & Video / your production pipeline) and dropped into /public/videos.
 * Nothing in the app hardcodes a video URL outside this file — add a new
 * key here and reference it by key from any component.
 */
export const cinematicVideos: Record<CinematicVideoKey, CinematicVideoAsset> = {
  hero: {
    poster: images.heroVideoPoster,
    mp4: "/videos/hero.mp4",
    title: "Athenix — Build Skills. Apply AI. Create Impact.",
    description: "Real expertise, real tools and AI, brought together in live, practical learning.",
  },
  learning: {
    poster: images.learningVideoPoster,
    mp4: "/videos/learning.mp4",
    title: "Athenix Learning",
    description: "Live courses in AI and data, built around the work you do every day.",
  },
  consultancy: {
    poster: images.consultancyVideoPoster,
    mp4: "/videos/consultancy.mp4",
    title: "Athenix Consultancy",
    description: "AI, data and automation built around how your business actually runs.",
  },
  corporateTraining: {
    poster: images.corporateTrainingVideoPoster,
    mp4: "/videos/corporate-training.mp4",
    title: "Corporate AI & Data Training",
    description: "Hands-on AI and data training, delivered to real teams around their own workflows.",
  },
  aiMentorship: {
    poster: images.trainerPortrait,
    mp4: "",
    title: "AI Mentorship Program",
    description: "Guided, applied AI with a mentor beside you.",
  },
};
