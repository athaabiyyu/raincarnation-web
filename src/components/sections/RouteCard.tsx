import Link from "next/link";
import { Clock, MessageSquareText, Route as RouteIcon } from "lucide-react";
import type { Route } from "@/types/route";
import type { Armada } from "@/types/armada";
import { featuredRoutesContent } from "@/constants/travel-reguler";
import { decodeHtml } from "@/utils/decode-html";
import { formatPrice } from "@/utils/format-price";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { parseSchedule } from "@/utils/route-pairs";

// Masih diekspor sementara karena FeaturedRoutes.tsx mengimpornya.
// Akan dihapus saat FeaturedRoutes disederhanakan.
export type WideMode = "md" | "lg" | "md-only";

// Teks sementara di komponen (nanti dipindah ke constants/)
const DETAIL_LABEL = "Lihat Detail";
const DETAIL_NOTE = "Detail lengkap ada di halaman detail.";

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

     const orderUrl = buildWhatsAppUrl(
          whatsapp,
          `Halo Admin, saya mau booking travel reguler ${title}`,
     );

     return (
          <article className="flex flex-col gap-space-md rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all duration-200 hover:shadow-md">
               <div className="flex flex-col gap-space-sm">
                    {/* Header: label kiri, jalur kanan */}
                    {(label || jalur) && (
                         <div className="flex flex-wrap items-center justify-between gap-x-space-xs gap-y-1">
                              {label && (
                                   <span className="rounded-full bg-primary/10 px-2.5 py-1 font-label-sm text-label-sm font-bold text-primary">
                                        {label}
                                   </span>
                              )}
                              {jalur && (
                                   <span className="ml-auto inline-flex items-center gap-1 text-right font-label-sm text-label-sm text-on-surface-variant">
                                        <RouteIcon className="h-3.5 w-3.5" aria-hidden />
                                        {jalur}
                                   </span>
                              )}
                         </div>
                    )}

                    <div className="space-y-space-sm">
                         <h3 className="break-words font-headline-sm text-headline-sm font-bold text-on-surface">
                              {displayTitle}
                         </h3>

                         {times.length > 0 && (
                              <div className="space-y-space-xs">
                                   <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                                        <Clock
                                             className="h-4 w-4 shrink-0 text-primary"
                                             aria-hidden
                                        />
                                        <span className="font-semibold">
                                             {content.scheduleLabel}
                                        </span>
                                   </div>
                                   <div className="flex flex-wrap gap-space-xs">
                                        {times.map((time) => (
                                             <span
                                                  key={time}
                                                  className="rounded bg-surface-container px-2 py-0.5 font-label-sm text-label-sm text-on-surface"
                                             >
                                                  {time}
                                             </span>
                                        ))}
                                   </div>
                              </div>
                         )}
                    </div>
               </div>

               {/* Bawah kartu: tarif, teks pendek, dua tombol (menempel ke dasar) */}
               <div className="mt-auto space-y-space-sm border-t border-on-surface/10 pt-space-md">
                    <div className="space-y-1">
                         {price && (
                              <div>
                                   <div className="font-label-sm text-label-sm text-on-surface-variant">
                                        {content.fareLabel}
                                   </div>
                                   <div className="font-headline-sm text-headline-sm font-bold text-primary">
                                        {price}
                                   </div>
                              </div>
                         )}
                         <p className="font-body-sm text-body-sm text-on-surface-variant">
                              {DETAIL_NOTE}
                         </p>
                    </div>

                    <div className="grid grid-cols-2 gap-space-sm">
                         {route.slug ? (
                              <Link
                                   href={`/rute/${route.slug}`}
                                   aria-label={`Lihat detail travel ${displayTitle}`}
                                                                      className="flex items-center justify-center whitespace-nowrap rounded-lg bg-primary/10 px-space-sm py-2.5 font-label-md text-label-md font-bold text-primary transition-colors hover:bg-primary/15"
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
                                                            className="flex items-center justify-center gap-space-xs whitespace-nowrap rounded-lg bg-whatsapp px-space-sm py-2.5 font-label-md text-label-md font-bold text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-colors hover:bg-whatsapp-hover"
                         >
                              <MessageSquareText className="h-4 w-4" aria-hidden />
                              {content.orderLabel}
                         </a>
                    </div>
               </div>
          </article>
     );
}