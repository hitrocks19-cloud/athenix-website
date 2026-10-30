import { companyInfo } from "@/content/company";
import { courses } from "@/content/courses";
import { faqs } from "@/content/faqs";
import { siteUrl } from "@/lib/site";
import type { Trainer } from "@/types";

/** Structured data (schema.org) so Google can show Athenix accurately. Only facts already on the site. */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${siteUrl}/#organization`,
    name: "Athenix Learning",
    alternateName: ["Athenix", "Athenix Consultancy"],
    url: siteUrl,
    logo: `${siteUrl}/images/logo/athenix-logo-wordmark.png`,
    description:
      "Athenix Learning trains individuals and professionals in Data Analytics, Data Science and AI. Athenix Consultancy builds AI and automation solutions for businesses.",
    email: companyInfo.email,
    telephone: companyInfo.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "701, Parijat Arcade, Vikram Nagar, Kalwa West",
      addressLocality: "Thane",
      addressRegion: "Maharashtra",
      postalCode: "400605",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: companyInfo.email,
      telephone: companyInfo.phone,
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [companyInfo.social.linkedinCompany, companyInfo.social.trustpilot],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Athenix",
    url: siteUrl,
    inLanguage: "en-IN",
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function courseListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: c.name,
        description: c.description,
        url: `${siteUrl}/courses`,
        provider: { "@type": "Organization", name: "Athenix Learning", sameAs: siteUrl },
      },
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function trainerJsonLd(t: Trainer) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t.name,
    jobTitle: t.role,
    description: t.bio,
    knowsAbout: t.expertise,
    image: t.photo.src.startsWith("http") ? t.photo.src : `${siteUrl}${t.photo.src}`,
    worksFor: { "@id": `${siteUrl}/#organization` },
    ...(t.linkedin ? { sameAs: [t.linkedin] } : {}),
  };
}
