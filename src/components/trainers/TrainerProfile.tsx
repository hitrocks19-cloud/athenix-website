import Container from "@/components/ui/Container";
import SmartImage from "@/components/ui/SmartImage";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";
import { leadTrainer } from "@/content/trainers";
import { images } from "@/content/images";
import { sitePhilosophy, siteStats } from "@/content/site";

const journey = [
  { label: "Expertise", value: leadTrainer.expertise.slice(0, 3).join(", ") },
  { label: "Experience", value: leadTrainer.experience },
  { label: "Training", value: "Live, trainer-led sessions across Excel, Power BI and AI." },
  { label: "Corporate Impact", value: `${siteStats.corporates} corporates trained.` },
  { label: "Learner Impact", value: `${siteStats.learners} learners, ${siteStats.rating} rating.` },
];

export default function TrainerProfile() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative row-span-2 overflow-hidden rounded-2xl border border-white/10 transition-transform duration-500 hover:scale-[1.02]">
                <SmartImage asset={leadTrainer.photo} fill className="object-cover" sizes="300px" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 transition-transform duration-500 hover:scale-[1.02]">
                <SmartImage asset={images.trainerStage2} fill className="object-cover" sizes="300px" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 transition-transform duration-500 hover:scale-[1.02]">
                <SmartImage asset={images.trainerStage3} fill className="object-cover" sizes="300px" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Founder &amp; Lead Trainer
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">{leadTrainer.name}</h2>
            <p className="mt-2 text-white/50">{leadTrainer.role}</p>
            <p className="mt-4 text-base italic text-white/70">&ldquo;{sitePhilosophy}&rdquo;</p>
            <p className="mt-4 text-sm text-white/60 sm:text-base">{leadTrainer.bio}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {leadTrainer.expertise.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>

            <ol className="mt-8 space-y-3 border-l border-white/10 pl-5">
              {journey.map((step) => (
                <li key={step.label}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-flare-400">{step.label}</p>
                  <p className="text-sm text-white/60">{step.value}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
