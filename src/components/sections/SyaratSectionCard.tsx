import { ContactRound } from "lucide-react";
import type { SyaratSection } from "@/constants/syarat-lepas-kunci";

interface SyaratSectionCardProps {
  section: SyaratSection;
  sectionIndex: number;
}

export default function SyaratSectionCard({
  section,
  sectionIndex,
}: SyaratSectionCardProps) {
  const sectionNumber = String(sectionIndex + 1).padStart(2, "0");

  return (
    <article
      id={section.id}
      className="scroll-mt-28 w-full rounded-3xl border border-surface-container-high/40 bg-surface-container-lowest p-6 sm:p-8 shadow-sm transition-all"
    >
      {/* Header Section */}
      <div className="flex items-start gap-4 mb-6">
        {/* Icon Container */}
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100/70 text-emerald-800">
          <ContactRound className="size-6 text-emerald-700" />
        </div>

        <div className="flex flex-col items-start gap-1">
          {/* Eyebrow Badge */}
          <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-emerald-700">
            BAGIAN {sectionNumber}
          </span>
          {/* Section Heading */}
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
            {section.heading}
          </h2>
        </div>
      </div>

      {/* Content Groups */}
      <div className="space-y-6">
        {section.groups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-4">
            {/* Title / Subheading (jika ada) */}
            {group.title && (
              <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                {group.title}
              </h3>
            )}

            {/* Paragraphs */}
            {group.paragraphs?.map((text, pIdx) => (
              <p
                key={pIdx}
                className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed"
              >
                {text}
              </p>
            ))}

            {/* List Items dengan Style Pill / Box khusus */}
            {group.items && (
              <div className="flex flex-col gap-3">
                {group.items.map((itemText, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-start gap-3.5 rounded-2xl border border-surface-container-high/30 bg-surface-container-low/40 p-3.5 sm:p-4 transition-colors hover:bg-surface-container-low/70"
                  >
                    {/* Number Circle Badge */}
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                      {itemIdx + 1}
                    </span>

                    {/* Text */}
                    <p className="font-body-md text-sm sm:text-base text-on-surface leading-snug pt-0.5">
                      {itemText}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}