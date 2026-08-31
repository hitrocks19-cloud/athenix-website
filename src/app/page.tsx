import Container from "@/components/ui/Container";
import Hero from "@/components/home/Hero";
import CinematicVideo from "@/components/home/CinematicVideo";
import TrustStats from "@/components/home/TrustStats";
import LearningConsultancySplit from "@/components/home/LearningConsultancySplit";
import WhyAthenix from "@/components/home/WhyAthenix";
import CourseGrid from "@/components/courses/CourseGrid";
import TrainerProfile from "@/components/trainers/TrainerProfile";
import CorporateTraining from "@/components/corporate/CorporateTraining";
import CorporateExperience from "@/components/corporate/CorporateExperience";
import CorporateLogoStrip from "@/components/corporate/CorporateLogoStrip";
import TestimonialCarousel from "@/components/testimonials/TestimonialCarousel";
import TrainingGallery from "@/components/gallery/TrainingGallery";
import WebinarsSection from "@/components/webinar/WebinarsSection";
import ConsultancyTeaser from "@/components/home/ConsultancyTeaser";
import FinalCTA from "@/components/home/FinalCTA";
import ManifestoSection from "@/components/home/ManifestoSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Container className="-mt-8 sm:-mt-12">
        <CinematicVideo videoKey="hero" />
      </Container>
      <TrustStats />
      <ManifestoSection />
      <LearningConsultancySplit />
      <WhyAthenix />
      <CourseGrid />
      <TrainerProfile />
      <CorporateTraining />
      <CorporateLogoStrip />
      <CorporateExperience />
      <TestimonialCarousel />
      <TrainingGallery />
      <WebinarsSection />
      <ConsultancyTeaser />
      <FinalCTA />
    </>
  );
}
