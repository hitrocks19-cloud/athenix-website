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
    poster: images.trainerStage1,
    mp4: "",
    title: "Athenix — Build Skills. Apply AI. Create Impact.",
    description: "Human expertise, AI and data, brought together in practical learning.",
  },
  learning: {
    poster: images.trainerStage2,
    mp4: "",
    title: "Athenix Learning",
    description: "Practical AI and data learning built for real professional impact.",
  },
  consultancy: {
    poster: images.corporateGreatwhiteBoardroom,
    mp4: "",
    title: "Athenix Consultancy",
    description: "AI, data and automation systems built for how your business runs.",
  },
  corporateTraining: {
    poster: images.corporateGreatwhiteLobby,
    mp4: "",
    title: "Corporate AI & Data Training",
    description: "Hands-on AI and data training delivered inside real teams.",
  },
  aiMentorship: {
    poster: images.trainerPortrait,
    mp4: "",
    title: "AI Mentorship Program",
    description: "Guided, applied AI mastery with ongoing mentorship.",
  },
};
