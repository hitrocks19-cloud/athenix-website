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
