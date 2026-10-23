import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import type { Route } from "@/types/route";
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
     whatsapp: string;
     className?: string;
     wideMode?: WideMode;
};

export default function RouteCard({ route, whatsapp }: RouteCardProps) {
     const content = featuredRoutesContent;

     const title = capitalizeFirst(decodeHtml(route.title));
     
     // Memecah teks rute berdasarkan pemisah panah agar bisa diberi jarak dengan aman
     const separator = title.includes(" – ") ? " – " : title.includes(" - ") ? " - " : title.includes("→") ? "→" : "->";
     const parts = title.split(separator);
     const origin = parts[0]?.trim() || "";
     const destination = parts[1]?.trim() || "";

     const times = parseSchedule(route.acf?.jadwal);
     
     const rawPrice = formatPrice(route.acf?.tarif);
     const price = rawPrice ? rawPrice.replace(/^Rp\s*/, "Rp. ") : "";

     const orderUrl = buildWhatsAppUrl(
          whatsapp,
          `Halo Admin, saya mau booking travel ${title}`,
     );

     return (
          <article
               className="flex h-full flex-col justify-between gap-3 sm:gap-space-sm rounded-xl p-4 sm:p-space-md transition-all duration-300 border border-surface-container-high/60 bg-surface-container-lowest shadow-[0_2px_12px_rgba(18,28,44,0.04)] hover:shadow-lg"
          >
               <div className="flex flex-1 flex-col gap-2 sm:gap-space-sm">
                    {/* Judul dengan pemisahan elemen agar spasi panah terdistribusi sempurna */}
                    <div className="mt-1 sm:mt-space-xs">
                         <h3 className="flex flex-wrap items-center justify-center text-center font-headline-md text-lg sm:text-xl font-bold tracking-tight text-on-surface">
                              {origin && destination ? (
                                   <>
                                        <span>{origin}</span>
                                        <span className="mx-3 text-primary font-normal">→</span>
                                        <span>{destination}</span>
                                   </>
                              ) : (
                                   title
                              )}
                         </h3>
                    </div>

                    {/* Jadwal Berangkat */}
                    {times.length > 0 && (
                         <div className="mt-auto pt-2 sm:pt-space-sm space-y-1.5 sm:space-y-space-xs">
                              <div className="flex items-center font-body-sm text-xs sm:text-body-sm text-on-surface-variant">
                                   <span className="font-bold text-on-surface">
                                        {SOFT_SCHEDULE_LABEL}
                                   </span>
                              </div>

                              {/* Kotak Jam */}
                              <div 
                                   className="grid gap-1.5 sm:gap-space-xs"
                                   style={{
                                        gridTemplateColumns: `repeat(${Math.min(times.length, 4)}, minmax(0, 1fr))`
                                   }}
                              >
                                   {times.map((time) => (
                                        <span
                                             key={time}
                                             className="flex items-center justify-center rounded-lg border border-surface-container-high bg-surface-container-low px-1.5 py-1 sm:px-2 sm:py-1.5 font-label-sm text-xs sm:text-label-sm font-bold text-on-surface text-center w-full shadow-2xs transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                                        >
                                             {time}
                                        </span>
                                   ))}
                              </div>
                         </div>
                    )}
               </div>

               {/* Bawah kartu: tarif & tombol */}
               <div className="space-y-4 sm:space-y-5 border-t border-surface-container-high/60 pt-3.5 sm:pt-4 mt-2 sm:mt-space-sm">
                    {price && (
                         <div className="flex items-baseline justify-between gap-2">
                              <span className="font-label-sm text-xs sm:text-label-sm font-medium text-on-surface-variant">
                                   Mulai Dari
                              </span>
                              <div className="flex items-baseline gap-1">
                                   <span className="font-headline-sm text-base sm:text-headline-sm font-extrabold tracking-tight text-primary">
                                        {price}
                                   </span>
                                   <span className="font-label-sm text-xs sm:text-label-sm font-medium text-on-surface-variant">
                                        / kursi
                                   </span>
                              </div>
                         </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 sm:gap-space-sm">
                         {route.slug ? (
                              <Link
                                   href={`/travel/${route.slug}`}
                                   aria-label={`Lihat detail travel ${origin} ke ${destination}`}
                                   className="flex items-center justify-center whitespace-nowrap rounded-lg border border-primary/20 bg-primary/10 px-2 py-1.5 sm:px-space-sm sm:py-2 font-label-md text-xs sm:text-label-md font-bold text-primary transition-all hover:border-primary/40 hover:bg-primary/15"
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
                              aria-label={`Pesan travel ${origin} ke ${destination} via WhatsApp`}
                              className="flex items-center justify-center gap-1 sm:gap-space-xs whitespace-nowrap rounded-lg bg-primary px-2 py-1.5 sm:px-space-sm sm:py-2 font-label-md text-xs sm:text-label-md font-bold text-on-primary shadow-sm transition-all hover:bg-primary/90 active:scale-95"
                         >
                              <MessageSquareText className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                              {content.orderLabel}
                         </a>
                    </div>
               </div>
          </article>
     );
}