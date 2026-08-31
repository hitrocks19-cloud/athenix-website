import { Trainer } from "@/types";
import SmartImage from "@/components/ui/SmartImage";
import Badge from "@/components/ui/Badge";
import TiltCard from "@/components/ui/TiltCard";

export default function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <TiltCard maxTilt={6}>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-shadow duration-300 hover:shadow-glow">
        <div className="relative aspect-[4/3] w-full">
          <SmartImage asset={trainer.photo} fill sizes="(max-width: 640px) 100vw, 400px" className="object-cover" />
        </div>
        <div className="p-6">
          <h3 className="font-display text-lg font-semibold text-white">{trainer.name}</h3>
          <p className="text-sm text-amber-400">{trainer.role}</p>
          <p className="mt-3 text-sm text-white/60">{trainer.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {trainer.expertise.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
          {trainer.linkedin ? (
            <a
              href={trainer.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-flare-400 hover:text-flare-300"
            >
              View LinkedIn →
            </a>
          ) : null}
        </div>
      </div>
    </TiltCard>
  );
}
