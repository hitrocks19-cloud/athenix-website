import Link from "next/link";
import { primaryNav, consultancyNav } from "@/content/nav";
import { images } from "@/content/images";
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
                  Terms
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

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Athenix. All rights reserved.</p>
          <p>Athenix Learning · Athenix Consultancy</p>
        </div>
      </div>
    </footer>
  );
}
