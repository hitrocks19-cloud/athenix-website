import Link from "next/link";
import { primaryNav, consultancyNav } from "@/content/nav";
import { images } from "@/content/images";
import { companyInfo } from "@/content/company";
import SmartImage from "@/components/ui/SmartImage";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <SmartImage asset={images.logoMark} className="h-8 w-8 rounded" width={32} height={32} />
              <span className="font-display text-lg font-semibold text-white">ATHENIX</span>
            </div>
            <p className="text-sm text-white/50">
              Learn AI. Master Data. Build Your Future. Automate Work. Unlock Efficiency. Build Smarter.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-white/50">
              <li>
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white">
                  {companyInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${companyInfo.phoneHref}`} className="hover:text-white">
                  {companyInfo.phone}
                </a>
              </li>
              <li className="text-white/40">
                {companyInfo.address.line1} {companyInfo.address.line2} {companyInfo.address.line3}
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              <a
                href={companyInfo.social.linkedinCompany}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Athenix Learning on LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-white/30 hover:text-white"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
                </svg>
              </a>
              <a
                href={companyInfo.social.trustpilot}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Athenix Learning reviews on Trustpilot"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-white/30 hover:text-white"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l2.6 7.36H22l-6 4.5 2.3 7.14L12 16.5l-6.3 4.5L8 13.86 2 9.36h7.4L12 2Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Athenix Learning</h3>
            <ul className="space-y-2 text-sm text-white/60">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Athenix Consultancy</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href={consultancyNav.href} className="hover:text-white">
                  Explore Consultancy
                </Link>
              </li>
              <li>
                <Link href="/consultancy#consultancy-form" className="hover:text-white">
                  Get a Free Consultation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Athenix. All rights reserved.</p>
          <p>Athenix Learning · Athenix Consultancy</p>
          <div className="flex items-center gap-4">
            <a
              href="https://elevenlabs.io/startup-grants"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 opacity-70 transition hover:opacity-100"
            >
              <span className="whitespace-nowrap text-white/40">Backed by</span>
              <SmartImage asset={images.elevenlabsGrantsBadge} width={140} height={12} className="h-auto w-[140px]" />
            </a>
            <SmartImage
              asset={images.msmeBadge}
              width={64}
              height={35}
              className="h-[26px] w-[47px] opacity-90"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
