import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import LegalContent from "@/components/ui/LegalContent";
import { privacyPolicySections } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Athenix Learning collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-20 sm:py-28">
      <h1 className="font-display text-3xl font-semibold text-white">Privacy Policy</h1>
      <div className="mt-6">
        <LegalContent sections={privacyPolicySections} />
      </div>
    </Container>
  );
}
