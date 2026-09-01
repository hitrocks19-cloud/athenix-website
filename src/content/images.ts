import { ImageAsset } from "@/types";

/**
 * Single source of truth for every real photo the site wants to use.
 * Nothing here is invented — each entry corresponds to a real asset you
 * (or the Athenix team) supply. Until the file exists at `src`,
 * <SmartImage> renders a labeled placeholder instead of a broken image.
 *
 * See /public/images/MANIFEST.md for the drop-in checklist.
 */
export const images = {
  logoWordmark: {
    src: "/images/logo/athenix-logo-wordmark.png",
    alt: "Athenix Learning logo",
    label: "Athenix wordmark logo",
  },
  logoMark: {
    src: "/images/logo/athenix-logo-mark.png",
    alt: "Athenix logo mark",
    label: "Athenix logo mark",
  },

  trainerPortrait: {
    src: "/images/trainer/hitesh-portrait.jpg",
    alt: "Hitesh Purohit, Athenix founder and lead trainer",
    label: "Trainer portrait",
  },
  trainerStage1: {
    src: "/images/trainer/hitesh-stage-1.jpg",
    alt: "Hitesh Purohit speaking on stage at Ira Skills Hall of Fame",
    label: "Trainer on stage — speaking",
  },
  trainerStage2: {
    src: "/images/trainer/hitesh-stage-2.jpg",
    alt: "Hitesh Purohit presenting at Ira Skills Hall of Fame",
    label: "Trainer on stage — presenting",
  },
  trainerStage3: {
    src: "/images/trainer/hitesh-stage-3.jpg",
    alt: "Hitesh Purohit speaking on stage at Ira Skills — Rebuild Your Life, The F1 Racer Edition",
    label: "Trainer on stage — Rebuild Your Life",
  },

  // Posters below are extracted first frames of their matching cinematic
  // video, not a generic photo — this keeps the poster-to-video swap
  // seamless (no visible "jump" to a different scene) once the video
  // loads and crossfades in.
  heroVideoPoster: {
    src: "/images/trainer/hero-poster.jpg",
    alt: "Hitesh Purohit, Athenix founder and lead trainer",
    label: "Hero video poster frame",
  },
  learningVideoPoster: {
    src: "/images/trainer/learning-poster.jpg",
    alt: "Hitesh Purohit, Athenix founder and lead trainer",
    label: "Learning video poster frame",
  },
  consultancyVideoPoster: {
    src: "/images/trainer/consultancy-poster.jpg",
    alt: "Hitesh Purohit, Athenix founder and lead trainer",
    label: "Consultancy video poster frame",
  },

  corporateTeamOffice: {
    src: "/images/corporate/team-office-1.jpg",
    alt: "Athenix training team in a corporate office",
    label: "Team — office session",
  },
  corporateGreatwhiteBoardroom: {
    src: "/images/corporate/greatwhite-boardroom.jpg",
    alt: "Corporate training session in a boardroom",
    label: "Corporate training — boardroom",
  },
  corporateGreatwhiteLobby: {
    src: "/images/corporate/greatwhite-lobby-group.jpg",
    alt: "Group photo after a corporate training session",
    label: "Corporate training — group photo",
  },
  corporateAnchorGroup: {
    src: "/images/corporate/anchor-group-training.jpg",
    alt: "Group photo after corporate training",
    label: "Corporate training — group photo",
  },
  liveSessionCall: {
    src: "/images/gallery/live-session-call.jpg",
    alt: "Live online training session with participants",
    label: "Live training session",
  },

  testimonialPoll1: {
    src: "/images/testimonials/poll-results-1.png",
    alt: "Live learner poll results after a training session",
    label: "Poll results",
  },
  testimonialPoll2: {
    src: "/images/testimonials/poll-results-2.png",
    alt: "Live learner poll results after a training session",
    label: "Poll results",
  },
  testimonialScreenshot1: {
    src: "/images/testimonials/screenshot-1.png",
    alt: "Learner testimonial screenshot",
    label: "Testimonial screenshot",
  },
  testimonialScreenshot2: {
    src: "/images/testimonials/screenshot-2.png",
    alt: "Learner testimonial screenshot",
    label: "Testimonial screenshot",
  },
  testimonialScreenshot3: {
    src: "/images/testimonials/screenshot-3.png",
    alt: "Learner testimonial screenshot",
    label: "Testimonial screenshot",
  },
  testimonialScreenshot4: {
    src: "/images/testimonials/screenshot-4.png",
    alt: "Learner testimonial screenshot",
    label: "Testimonial screenshot",
  },
  testimonialScreenshot5: {
    src: "/images/testimonials/screenshot-5.png",
    alt: "Learner testimonial screenshot",
    label: "Testimonial screenshot",
  },
  testimonialScreenshot6: {
    src: "/images/testimonials/screenshot-6.png",
    alt: "Learner testimonial screenshot",
    label: "Testimonial screenshot",
  },
} as const satisfies Record<string, ImageAsset>;
