import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import { images } from "@/content/images";
import { sitePhilosophy, siteStats, whyAthenix } from "@/content/site";
import TrainerProfile from "@/components/trainers/TrainerProfile";
import CorporateLogoStrip from "@/components/corporate/CorporateLogoStrip";

export const metadata: Metadata = {
  title: "About",
  description:
    "Athenix exists to create impact through practical, relevant and application-driven AI and data learning.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-athenix-glow" />
        <Container className="relative">
          <SectionHeading eyebrow="About Athenix" title="Create an impact by training" align="center" />
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg italic text-white/70">&ldquo;{sitePhilosophy}&rdquo;</p>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-6 text-center">
            <Stat value={siteStats.learners} label={siteStats.learnersLabel} />
            <Stat value={siteStats.corporates} label={siteStats.corporatesLabel} />
            <Stat value={siteStats.rating} label={siteStats.ratingLabel} />
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="https://elevenlabs.io/startup-grants"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 transition hover:border-white/25 hover:bg-white/10"
            >
              <span className="whitespace-nowrap text-xs uppercase tracking-wide text-white/50">Backed by</span>
              <SmartImage
                asset={images.elevenlabsGrantsBadge}
                width={170}
                height={15}
                className="h-auto w-[170px]"
              />
            </a>
            <a
              href="https://udyamregistration.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              title="Registered under Ministry of MSME, Government of India"
              className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 transition hover:border-white/25 hover:bg-white/10"
            >
              <span className="whitespace-nowrap text-xs uppercase tracking-wide text-white/50">Registered under</span>
              <div className="rounded bg-white p-1">
                <SmartImage asset={images.msmeBadge} width={64} height={35} className="h-[26px] w-[47px]" />
              </div>
            </a>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {whyAthenix.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <TrainerProfile />
      <CorporateLogoStrip />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="In the Room" title="Training, up close" align="center" />
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-video overflow-hidden rounded-2xl border border-white/10">
              <SmartImage asset={images.corporateGreatwhiteLobby} fill className="object-cover" sizes="900px" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
              <SmartImage asset={images.corporateAnchorGroup} fill className="object-cover" sizes="450px" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
              <SmartImage asset={images.corporateTeamOffice} fill className="object-cover" sizes="450px" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-white/50">{label}</p>
    </div>
  );
}
