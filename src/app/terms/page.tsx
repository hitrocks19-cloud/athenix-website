import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <Container className="py-20 sm:py-28">
      <h1 className="font-display text-3xl font-semibold text-white">Terms</h1>
      <p className="mt-6 max-w-2xl text-white/60">
        This page is a placeholder. Replace it with Athenix&apos;s actual terms of service before launch.
      </p>
    </Container>
  );
}
