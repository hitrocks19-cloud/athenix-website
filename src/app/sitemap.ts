import type { MetadataRoute } from "next";

const siteUrl = "https://www.athenixlearning.com";

const routes = [
  "",
  "/about",
  "/courses",
  "/trainers",
  "/testimonials",
  "/corporate-training",
  "/consultancy",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
