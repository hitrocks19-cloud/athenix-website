import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// [path, priority]. Money pages first; legal pages matter least.
const routes: [string, number][] = [
  ["", 1],
  ["/courses", 0.9],
  ["/corporate-training", 0.9],
  ["/consultancy", 0.9],
  ["/about", 0.7],
  ["/trainers", 0.7],
  ["/testimonials", 0.6],
  ["/contact", 0.6],
  ["/privacy-policy", 0.2],
  ["/terms", 0.2],
  ["/refund-policy", 0.2],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(([route, priority]) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority,
  }));
}
