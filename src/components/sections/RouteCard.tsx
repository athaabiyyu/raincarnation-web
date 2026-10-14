import Link from "next/link";
import { Clock, MessageSquareText } from "lucide-react";
import type { Route } from "@/types/route";
import type { Armada } from "@/types/armada";
import { featuredRoutesContent } from "@/constants/travel-reguler";
import { decodeHtml } from "@/utils/decode-html";
import { formatPrice } from "@/utils/format-price";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { parseSchedule } from "@/utils/route-pairs";

export type WideMode = "md" | "lg" | "md-only";

const DETAIL_LABEL = "Lihat Detail";
const SOFT_SCHEDULE_LABEL = "Jadwal Berangkat:";

type RouteCardProps = {
     route: Route;
     armadaList: Armada[];
     whatsapp: string;
     className?: string;
     wideMode?: WideMode;
};

export default function RouteCard({ route, whatsapp }: RouteCardProps) {
     const content = featuredRoutesContent;

     const title = capitalizeFirst(decodeHtml(route.title));
     const displayTitle = title.replace(" – ", " → ");
     const label = capitalizeFirst(route.acf?.label);
     const jalur = capitalizeFirst(route.acf?.jalur);
     const times = parseSchedule(route.acf?.jadwal);
     const price = formatPrice(route.acf?.tarif);
     const description = decodeHtml(route.acf?.deskripsi_singkat ?? "").trim();

     const orderUrl = buildWhatsAppUrl(
          whatsapp,
          `Halo Admin, saya mau booking travel reguler ${title}`,
     );

     return (
          <article
               className="flex h-full flex-col justify-between gap-space-sm rounded-xl p-space-md transition-all duration-300 border border-surface-container-high/60 bg-surface-container-lowest shadow-[0_2px_12px_rgba(18,28,44,0.04)] hover:shadow-lg"
          >
               <div className="flex flex-1 flex-col gap-space-sm">
                    {/* Header: label kiri, jalur kanan */}
                    {(label || jalur) && (
                         <div className="flex flex-wrap items-center justify-between gap-x-space-xs gap-y-1">
                              {label && (
                                   <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-label-sm text-label-sm font-bold text-primary">
                                        {label}
                                   </span>
                              )}
                              {jalur && (
                                   <span className="ml-auto inline-flex items-center gap-1 text-right font-label-sm text-label-sm font-semibold text-on-surface-variant">
                                        {jalur}
                                   </span>
                              )}
                         </div>
                    )}

                    {/* Judul & Deskripsi Singkat */}
                    <div className="space-y-space-xs">
                         <h3 className="break-words font-headline-sm text-headline-sm font-bold text-on-surface">
                              {displayTitle}
                         </h3>

                         {description && (
                              <p className="pt-space-xs break-words font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                                   {description}
                              </p>
                         )}
                    </div>

                    {/* Jadwal Berangkat */}
                    {times.length > 0 && (
                         <div className="mt-auto mb-space-xs pt-space-sm space-y-space-xs">
                              <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                                   <Clock
                                        className="h-3.5 w-3.5 shrink-0 text-primary"
                                        aria-hidden
                                   />
                                   <span className="font-bold text-on-surface">
                                        {SOFT_SCHEDULE_LABEL}
                                   </span>
                              </div>
                              <div className="flex flex-wrap gap-space-xs">
                                   {times.map((time) => (
                                        <span
                                             key={time}
                                             className="rounded-md border border-surface-container-high/50 bg-surface-container-low/80 px-2.5 py-1 font-label-sm text-label-sm font-semibold text-on-surface"
                                        >
                                             {time}
                                        </span>
                                   ))}
                              </div>
                         </div>
                    )}
               </div>

               {/* Bawah kartu: tarif & tombol */}
               <div className="space-y-space-sm border-t border-surface-container-high/60 pt-space-sm">
                    {price && (
                         <div className="flex items-baseline justify-between gap-space-sm">
                              <span className="font-label-sm text-label-sm font-medium text-on-surface-variant">
                                   {content.fareLabel}
                              </span>
                              <span className="font-headline-sm text-headline-sm font-extrabold tracking-tight text-primary">
                                   {price}
                              </span>
                         </div>
                    )}

                    <div className="grid grid-cols-2 gap-space-sm">
                         {route.slug ? (
                              <Link
                                   href={`/rute/${route.slug}`}
                                   aria-label={`Lihat detail travel ${displayTitle}`}
                                   className="flex items-center justify-center whitespace-nowrap rounded-lg border border-primary/20 bg-primary/10 px-space-sm py-2 font-label-md text-label-md font-bold text-primary transition-all hover:border-primary/40 hover:bg-primary/15"
                              >
                                   {DETAIL_LABEL}
                              </Link>
                         ) : (
                              <span />
                         )}
                         <a
                              href={orderUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Pesan travel ${displayTitle} via WhatsApp`}
                              className="flex items-center justify-center gap-space-xs whitespace-nowrap rounded-lg bg-whatsapp px-space-sm py-2 font-label-md text-label-md font-bold text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.3)] transition-all hover:bg-whatsapp-hover"
                         >
                              <MessageSquareText className="h-4 w-4" aria-hidden />
                              {content.orderLabel}
                         </a>
                    </div>
               </div>
          </article>
     );
}