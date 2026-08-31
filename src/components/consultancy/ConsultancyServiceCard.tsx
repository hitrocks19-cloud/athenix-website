import { ConsultancyService } from "@/types";
import TiltCard from "@/components/ui/TiltCard";

const icons: Record<ConsultancyService["icon"], string> = {
  ai: "M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z",
  dashboard: "M4 4h7v9H4V4zm9 0h7v5h-7V4zm0 9h7v7h-7v-7zM4 17h7v3H4v-3z",
  automation: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 5v5l4 2",
  workflow: "M5 4h5v5H5V4zm9 0h5v5h-5V4zM5 15h5v5H5v-5zm9 0h5v5h-5v-5zM10 6.5h4M7.5 10v5M16.5 10v5M10 17.5h4",
  web: "M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18",
  voice: "M12 3a3 3 0 013 3v6a3 3 0 01-6 0V6a3 3 0 013-3zM5 11a7 7 0 0014 0M12 18v3",
  support: "M12 3a9 9 0 00-9 9v4a2 2 0 002 2h1v-6H5v-1a7 7 0 0114 0v1h-1v6h1a2 2 0 002-2v-4a9 9 0 00-9-9z",
  calendar: "M4 5h16v16H4V5zm0 5h16M8 3v4M16 3v4",
  ops: "M4 6h16M4 12h16M4 18h16",
};

export default function ConsultancyServiceCard({ service }: { service: ConsultancyService }) {
  return (
    <TiltCard>
      <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-magenta-400/30 hover:bg-white/[0.05] hover:shadow-glow">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-athenix-line/20 transition-transform duration-300 group-hover:scale-110">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d={icons[service.icon]}
              stroke="currentColor"
              className="text-amber-400"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="font-display text-base font-semibold text-white">{service.name}</h3>
        <p className="mt-2 text-sm text-white/60">{service.description}</p>
      </div>
    </TiltCard>
  );
}
