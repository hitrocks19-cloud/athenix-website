import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import LegalContent from "@/components/ui/LegalContent";
import { termsSections } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions governing the use of Athenix Learning's services.",
};

export default function TermsPage() {
  return (
    <Container className="py-20 sm:py-28">
      <h1 className="font-display text-3xl font-semibold text-white">Terms & Conditions</h1>
      <div className="mt-6">
        <LegalContent sections={termsSections} />
      </div>
      <p className="mt-10 max-w-2xl text-sm text-white/50">
        For refunds and cancellations, see our{" "}
        <Link href="/refund-policy" className="text-flare-400 hover:text-flare-300">
          Refund & Cancellation Policy
        </Link>
        .
      </p>
    </Container>
  );
}
