import Link from "next/link";
import RouteSearchForm from "@/components/sections/RouteSearchForm";
import { heroContent } from "@/constants/travel-reguler";
import type { RoutePair } from "@/utils/route-pairs";

type TravelHeroProps = {
  whatsapp?: string;
  pairs?: RoutePair[];
  lowestFare?: string;
};

export default function TravelHero({
  whatsapp,
  pairs = [],
  lowestFare,
}: TravelHeroProps) {
  const content = heroContent;

  const stats = [
    {
      value: "5 Titik",
      label: "Malang, Batu, Surabaya, Pandaan, Juanda",
    },
    {
      value: "Door to Door",
      label: "Kecuali titik di Pandaan dan Juanda",
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
      <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-gutter pt-space-md">
        {/* Judul & Deskripsi */}
        <div className="flex max-w-3xl flex-col gap-space-md">
          <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
            {content.titleStart}{" "}
            <span className="text-primary-container">
              {content.titleHighlight}
            </span>{" "}
            <span className="whitespace-nowrap">{content.titleEnd}</span>
          </h1>

          <p className="font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
            {content.description}
          </p>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-2 gap-space-sm sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col rounded-2xl border border-surface-container-high/60 bg-surface-container-lowest p-space-md shadow-[0_4px_16px_rgba(18,28,44,0.04)] ${index === 2 ? "col-span-2 sm:col-span-1" : ""
                }`}
            >
              <span className="font-headline-md text-headline-md font-extrabold tracking-tight text-primary">
                {stat.value}
              </span>
              <span className="mt-0.5 font-label-sm text-label-sm font-medium text-on-surface-variant">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form Cari Jadwal Travel + Teks Charter Rombongan */}
        {whatsapp && pairs.length > 0 && (
          <div className="flex flex-col gap-space-md pt-space-xs">
            <RouteSearchForm pairs={pairs} whatsapp={whatsapp} />

            <p className="text-center font-body-md text-body-md text-on-surface-variant sm:pt-space-sm">
              {content.charterLink.text}{" "}
              <br className="sm:hidden" />
              <Link
                href={content.charterLink.href}
                className="font-bold text-primary underline underline-offset-4 hover:text-primary-container"
              >
                {content.charterLink.label}
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}