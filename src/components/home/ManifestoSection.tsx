import PinnedRevealSection from "@/components/ui/PinnedRevealSection";

const manifesto =
  "Athenix exists to create an impact by training, not just provide training. We turn AI and data into practical skills for individuals, and into working systems for businesses — taught live, applied immediately, built to actually get used.";

export default function ManifestoSection() {
  return <PinnedRevealSection text={manifesto} />;
}
