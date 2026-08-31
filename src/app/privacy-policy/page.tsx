import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-20 sm:py-28">
      <h1 className="font-display text-3xl font-semibold text-white">Privacy Policy</h1>
      <p className="mt-6 max-w-2xl text-white/60">
        This page is a placeholder. Replace it with Athenix&apos;s actual privacy policy — covering what data is
        collected through webinar, corporate training and consultancy forms, how it is used and stored, and how
        users can request its removal — before launch.
      </p>
    </Container>
  );
}
