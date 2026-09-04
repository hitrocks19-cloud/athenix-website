import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WebinarModalProvider } from "@/components/webinar/WebinarModalContext";
import WebinarModal from "@/components/webinar/WebinarModal";
import FloatingWebinarCTA from "@/components/webinar/FloatingWebinarCTA";
import { companyInfo } from "@/content/company";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const siteUrl = "https://www.athenixlearning.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Athenix — AI, Data Analytics & Automation Training + Consultancy",
    template: "%s | Athenix",
  },
  description:
    "Athenix helps professionals, learners and businesses turn AI and data into practical skills, smarter workflows and measurable business value. Athenix Learning trains individuals in Data Analytics, Data Science and AI. Athenix Consultancy builds AI automation for businesses.",
  keywords: [
    "AI training",
    "Data Analytics training",
    "AI mentorship",
    "Data Science training",
    "Corporate AI training",
    "Generative AI training",
    "AI automation",
    "Business automation",
    "Power BI training",
    "Excel training",
    "AI consultancy",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Athenix",
    title: "Athenix — AI, Data Analytics & Automation Training + Consultancy",
    description:
      "Build skills. Apply AI. Create impact. Practical AI and data training for individuals, and AI automation consultancy for businesses.",
    images: ["/images/logo/athenix-logo-wordmark.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Athenix — AI, Data Analytics & Automation Training + Consultancy",
    description: "Build skills. Apply AI. Create impact.",
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Athenix",
  url: siteUrl,
  description:
    "Athenix Learning trains individuals and professionals in Data Analytics, Data Science and AI. Athenix Consultancy builds AI and automation solutions for businesses.",
  sameAs: [companyInfo.social.linkedinCompany, companyInfo.social.trustpilot],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <WebinarModalProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink-950"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <WebinarModal />
          <FloatingWebinarCTA />
        </WebinarModalProvider>
      </body>
    </html>
  );
}
