import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import RouteSearchForm from "@/components/sections/RouteSearchForm";
import { heroContent } from "@/constants/travel-reguler";
import type { RoutePair } from "@/utils/route-pairs";

type TravelHeroProps = {
  whatsapp?: string;
  pairs?: RoutePair[];
  lowestFare?: string;
  badge?: string;
};

export default function TravelHero({
  whatsapp,
  pairs = [],
  lowestFare,
  badge = "LAYANAN TRAVEL REGULER TERBAIK",
}: TravelHeroProps) {
  const content = heroContent;

  const stats = [
    {
      value: "5 Titik",
      label: "Malang, Batu, Surabaya, Pandaan, Juanda",
    },
    {
      value: "Titik Jemput",
      label: "Naik dan turun di lokasi yang telah ditentukan",
    },
    lowestFare
      ? {
        value: `Mulai ${lowestFare}`,
        label: "per kursi, sudah termasuk tol dan parkir",
      }
      : {
        value: "Per Kursi",
        label: "Jadwal tetap, tarif sudah termasuk tol dan parkir",
      },
  ];

  return (
    <section className="relative w-full overflow-hidden border-b border-surface-container-high/30 bg-linear-to-b from-surface-container-high/50 via-surface to-surface pb-space-xl pt-space-md">
      <div className="mx-auto flex max-w-6xl flex-col items-start sm:items-center gap-space-lg px-gutter pt-space-md text-left sm:text-center">

        {/* Header Content (Eyebrow, Title & Description) */}
        <div className="flex max-w-4xl flex-col items-start sm:items-center gap-space-md w-full">
          {/* Eyebrow / Badge Pill */}
          {badge && (
            <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 font-label-sm text-xs font-semibold uppercase tracking-wider text-primary sm:mb-2">
              <span className="size-2 rounded-full bg-primary" />
              <span>{badge}</span>
            </div>
          )}

          {/* Title */}
          <h1 className="w-full font-display text-display font-extrabold tracking-tight text-on-surface">
            Travel Malang{" "}
            <span className="text-primary-container">
              Murah per Kursi
            </span>{" "}
            Berangkat dari Titik Jemput
          </h1>

          {/* Deskripsi */}
          <p className="max-w-none font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
            {content.description}
          </p>
        </div>

        {/* Stats Card */}
        <div className="grid w-full grid-cols-2 gap-space-sm sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-start sm:items-center justify-center rounded-2xl border border-surface-container-high/60 bg-surface-container-lowest p-space-md shadow-[0_4px_16px_rgba(18,28,44,0.04)] ${index === 2 ? "col-span-2 sm:col-span-1" : ""
                }`}
            >
              <span className="font-headline-md text-headline-md font-extrabold tracking-tight text-primary">
                {stat.value}
              </span>
              <span className="mt-0.5 font-label-sm text-label-sm font-medium text-on-surface-variant text-left sm:text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form Cari Jadwal Travel + Teks Charter Rombongan */}
        {whatsapp && pairs.length > 0 && (
          <div className="flex w-full flex-col gap-space-md pt-space-xs text-left">
            <RouteSearchForm pairs={pairs} whatsapp={whatsapp} />

            <p className="text-center font-body-md text-body-md text-on-surface-variant sm:pt-space-sm">
              {content.charterLink.text}{" "}
              <br className="sm:hidden" />
              <Link
                href={content.charterLink.href}
                className="inline-flex items-center gap-1 font-bold text-primary transition-colors hover:text-primary-container group"
              >
                <span className="underline underline-offset-4">
                  {content.charterLink.label}
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 no-underline transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}