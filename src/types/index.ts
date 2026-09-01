export type ImageAsset = {
  /** Path relative to /public, e.g. "/images/trainer/hitesh-stage-1.jpg" */
  src: string;
  alt: string;
  /** Shown on the placeholder card until the real file exists at `src`. */
  label: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type Course = {
  slug: string;
  name: string;
  description: string;
  audience: string;
  focus: string;
  tags: string[];
  ctaLabel: string;
  flagship?: boolean;
};

export type Trainer = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  experience: string;
  linkedin?: string;
  photo: ImageAsset;
};

export type CorporateClient = {
  name: string;
};

export type CorporateGalleryItem = {
  image: ImageAsset;
  caption: string;
};

export type ConsultancyService = {
  slug: string;
  name: string;
  description: string;
  icon: "ai" | "dashboard" | "automation" | "workflow" | "web" | "voice" | "support" | "calendar" | "ops";
};

export type ConsultancyProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type Webinar = {
  slug: string;
  title: string;
  price: string;
  priceLabel: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
};

export type TestimonialCategory =
  | "Learner Reviews"
  | "Professional Training"
  | "Corporate Training"
  | "AI / Data Training";

export type Testimonial = {
  image: ImageAsset;
  category: TestimonialCategory;
  featured?: boolean;
};

export type GalleryItem = {
  image: ImageAsset;
  category: "Corporate" | "Workshop";
};

export type Faq = {
  question: string;
  answer: string;
};

export type CinematicVideoKey =
  | "hero"
  | "learning"
  | "consultancy"
  | "corporateTraining"
  | "aiMentorship";

export type CinematicVideoAsset = {
  poster: ImageAsset;
  /** Path relative to /public, e.g. "/videos/hero.mp4". Empty until produced. */
  mp4: string;
  webm?: string;
  title: string;
  description: string;
};
