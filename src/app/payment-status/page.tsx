import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/ui/Container";
import PaymentStatus from "@/components/webinar/PaymentStatus";

export const metadata: Metadata = {
  title: "Payment status",
  robots: { index: false, follow: false },
};

export default function PaymentStatusPage() {
  return (
    <Container className="py-20 sm:py-28">
      <div className="mx-auto max-w-lg">
        <Suspense fallback={null}>
          <PaymentStatus />
        </Suspense>
      </div>
    </Container>
  );
}
