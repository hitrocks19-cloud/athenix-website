import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import ClipReveal from "@/components/ui/ClipReveal";
import { corporateGallery } from "@/content/corporate";

export default function CorporateExperience() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Corporate Experience" title="Inside the training room" align="center" />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {corporateGallery.map((item, i) => (
            <ClipReveal key={i} shape="circle" delay={i * 90}>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                <SmartImage
                  asset={item.image}
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                  <p className="text-sm text-white">{item.caption}</p>
                </div>
              </div>
            </ClipReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
