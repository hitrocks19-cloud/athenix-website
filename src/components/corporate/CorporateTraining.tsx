import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { corporateFocusAreas } from "@/content/corporate";

export default function CorporateTraining() {
  return (
    <section id="corporate-training" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="For Businesses"
          title="Corporate AI & Data Training"
          description="Training shaped around your team's roles and tools, so people learn what they will actually use, not generic slides."
        />
        <div className="mt-8 flex flex-wrap gap-2">
          {corporateFocusAreas.map((area) => (
            <Badge key={area}>{area}</Badge>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/corporate-training#corporate-form" variant="primary">
            Discuss Corporate Training
          </ButtonLink>
          <ButtonLink href="/corporate-training#corporate-form" variant="secondary">
            Tell Us What Your Team Needs
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
