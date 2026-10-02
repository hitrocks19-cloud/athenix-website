import PinnedRevealSection from "@/components/ui/PinnedRevealSection";

const manifesto =
  "Athenix exists to create an impact by training, not just provide training. We teach AI and data the way you will use them: live, on real work, ready to apply the same day. And for businesses, we build the automation your team will actually use.";

export default function ManifestoSection() {
  return <PinnedRevealSection text={manifesto} />;
}
