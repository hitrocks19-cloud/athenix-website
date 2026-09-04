import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import LegalContent from "@/components/ui/LegalContent";
import { refundPolicySections } from "@/content/legal";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "Athenix Learning's refund and cancellation policy for courses, webinars, and training programs.",
};

export default function RefundPolicyPage() {
  return (
    <Container className="py-20 sm:py-28">
      <h1 className="font-display text-3xl font-semibold text-white">Refund & Cancellation Policy</h1>
      <div className="mt-6">
        <LegalContent sections={refundPolicySections} />
      </div>
    </Container>
  );
}
