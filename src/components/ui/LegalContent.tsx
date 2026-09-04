import { LegalSection } from "@/content/legal";

export default function LegalContent({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="max-w-2xl">
      {sections.map((section, i) => (
        <div key={i} className={`first:mt-0 ${section.heading ? "mt-10" : "mt-4"}`}>
          {section.heading ? (
            <h2 className="font-display text-lg font-semibold text-white">{section.heading}</h2>
          ) : null}
          {section.body?.map((p, j) => (
            <p key={j} className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
              {p}
            </p>
          ))}
          {section.bullets ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/60 sm:text-base">
              {section.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}
