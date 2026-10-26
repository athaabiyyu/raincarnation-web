import Link from "next/link";
import { ChevronRight, Clock, MessageSquareText } from "lucide-react";
import type { Route } from "@/types/route";
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

     const title = capitalizeFirst(decodeHtml(route.title));

     // Memecah teks rute berdasarkan pemisah panah agar bisa diberi jarak dengan aman
     const separator = title.includes(" – ") ? " – " : title.includes(" - ") ? " - " : title.includes("→") ? "→" : "->";
     const parts = title.split(separator);
     const origin = parts[0]?.trim() || "";
     const destination = parts[1]?.trim() || "";

     const times = parseSchedule(route.acf?.jadwal);

     const rawPrice = formatPrice(route.acf?.tarif);
     const price = rawPrice ? rawPrice.replace(/^Rp\s*/, "Rp. ") : "";

     const orderText =
          origin && destination
               ? `Pesan Travel ${origin}-${destination}`
               : `Pesan Travel ${title}`;

     const orderUrl = buildWhatsAppUrl(
          whatsapp,
          `Halo Admin, saya mau booking travel ${title}`,
     );

     return (
          <article
               className="flex h-full flex-col justify-between gap-4 sm:gap-space-md rounded-xl p-5 sm:p-space-md transition-all duration-300 border border-surface-container-high/60 bg-surface-container-lowest shadow-[0_2px_12px_rgba(18,28,44,0.04)] hover:shadow-lg"
          >
               <div className="flex flex-1 flex-col gap-4 sm:gap-space-md">
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
                         <div className="space-y-3">
                              <p className="flex items-center gap-1.5 font-label-sm text-xs font-bold text-on-surface sm:text-label-sm">
                                   <Clock size={14} className="shrink-0 text-primary" aria-hidden />
                                   {SOFT_SCHEDULE_LABEL}
                              </p>

                                                            {/* Kotak jam: satu baris, bisa digeser bila banyak */}
                              <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:gap-2 [&::-webkit-scrollbar]:hidden">
                                   {times.map((time) => (
                                        <span
                                             key={time}
                                             className="flex w-[72px] shrink-0 items-center justify-center rounded-lg border border-surface-container-high bg-surface-container-low py-1.5 text-center font-label-sm text-xs font-bold text-on-surface sm:text-label-sm"
                                        >
                                             {time}
                                        </span>
                                   ))}
                              </div>
                         </div>
                    )}
               </div>

               {/* Bawah kartu: tarif & tombol */}
               <div className="space-y-4 sm:space-y-5 border-t border-surface-container-high/60 pt-4 sm:pt-5 mt-2 sm:mt-space-sm">
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

                    <div className="flex flex-col gap-2">
                         <a
                              href={orderUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${orderText} via WhatsApp`}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-on-primary shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]"
                         >
                              <MessageSquareText size={18} className="shrink-0" aria-hidden />
                              <span className="truncate">{orderText}</span>
                         </a>
                         {route.slug && (
                              <Link
                                   href={`/travel/${route.slug}`}
                                   aria-label={`Lihat detail travel ${origin} ke ${destination}`}
                                   className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-outline-variant/60 bg-surface-container-low py-2.5 text-xs font-bold text-on-surface-variant transition-all hover:border-primary hover:bg-surface-container-high hover:text-primary active:scale-[0.98]"
                              >
                                   <span>{DETAIL_LABEL}</span>
                                   <ChevronRight size={14} aria-hidden />
                              </Link>
                         )}
                    </div>
               </div>
          </article>
     );
}