import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WebinarModalProvider } from "@/components/webinar/WebinarModalContext";
import WebinarModal from "@/components/webinar/WebinarModal";
import FloatingWebinarCTA from "@/components/webinar/FloatingWebinarCTA";
import EnquiryPopup from "@/components/enquiry/EnquiryPopup";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { companyInfo } from "@/content/company";
import { siteUrl } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { isCashfreeConfigured } from "@/lib/cashfree";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Athenix — AI, Data Analytics & Automation Training + Consultancy",
    template: "%s | Athenix",
  },
  description:
    "Live, hands-on AI and data training for professionals and teams, and practical AI automation for businesses. Athenix Learning teaches Data Analytics, Data Science and applied AI. Athenix Consultancy builds the systems that cut manual work.",
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
    locale: "en_IN",
    title: "Athenix — AI, Data Analytics & Automation Training + Consultancy",
    description:
      "Build skills. Apply AI. Create impact. Live AI and data training for professionals and teams, and AI automation for businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Athenix — AI, Data Analytics & Automation Training + Consultancy",
    description: "Build skills. Apply AI. Create impact.",
  },
  robots: { index: true, follow: true },
};

// Runs before first paint so a returning visitor never sees a flash of the wrong theme.
const themeInitScript = `(function(){try{var t=localStorage.getItem("athenix-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark";}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <GoogleAnalytics />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <WebinarModalProvider paymentsEnabled={isCashfreeConfigured()}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink-950"
          >
            Skip to content
          </a>
          <Navbar />
          {/* overflow-x-clip: the reveal animations start slightly scaled up and would otherwise add a sideways scroll bar. `clip` (unlike `hidden`) does not create a scroll container, so sticky sections keep working. */}
          <main id="main-content" className="overflow-x-clip">{children}</main>
          <Footer />
          <WebinarModal />
          <FloatingWebinarCTA />
          <EnquiryPopup />
        </WebinarModalProvider>
      </body>
    </html>
  );
}
