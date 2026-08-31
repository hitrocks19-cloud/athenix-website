import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CorporateTraining from "@/components/corporate/CorporateTraining";
import CorporateLogoStrip from "@/components/corporate/CorporateLogoStrip";
import CorporateExperience from "@/components/corporate/CorporateExperience";
import CorporateForm from "@/components/corporate/CorporateForm";

export const metadata: Metadata = {
  title: "Corporate Training",
  description:
    "Practical corporate AI and data training — Generative AI, Prompt Engineering, Excel, Power BI and Data Analytics for real teams.",
};

export default function CorporateTrainingPage() {
  return (
    <>
      <CorporateTraining />
      <CorporateLogoStrip />
      <CorporateExperience />
      <section id="corporate-form" className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Get Started"
            title="Discuss Corporate Training"
            description="Tell us about your team and we'll get back to you with a fit for your goals."
            align="center"
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <CorporateForm />
          </div>
        </Container>
      </section>
    </>
  );
}
