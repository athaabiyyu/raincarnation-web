import Link from "next/link";
import RouteSearchForm from "@/components/sections/RouteSearchForm";
import { heroContent } from "@/constants/travel-reguler";
import type { RoutePair } from "@/utils/route-pairs";

type TravelHeroProps = {
  whatsapp?: string;
  pairs?: RoutePair[];
};

export default function TravelHero({ whatsapp, pairs = [] }: TravelHeroProps) {
  const content = heroContent;

  return (
    <section className="relative w-full overflow-hidden border-b border-surface-container-high/30 bg-linear-to-b from-surface-container-high/50 via-surface to-surface pb-space-xl pt-space-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-gutter pt-space-md">
        {/* Judul & Deskripsi Hero */}
        <div className="flex max-w-3xl flex-col gap-space-md">
          <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
            {content.titleStart}{" "}
            <span className="text-primary underline decoration-primary-fixed decoration-[5px] underline-offset-8">
              {content.titleHighlight}
            </span>{" "}
            {content.titleEnd}
          </h1>

          <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            {content.description}
          </p>
        </div>

        {/* Form Cari Jadwal Travel Menyatu di Hero */}
        {whatsapp && pairs.length > 0 && (
          <div className="flex flex-col gap-space-md pt-space-xs">
            <RouteSearchForm pairs={pairs} whatsapp={whatsapp} />

            <p className="text-center font-body-md text-body-md text-on-surface-variant">
              {content.charterLink.text}{" "}
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