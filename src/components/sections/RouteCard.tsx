import Link from "next/link";
import { Clock, Car, MessageSquareText, Route as RouteIcon } from "lucide-react";
import type { Route } from "@/types/route";
import type { Armada } from "@/types/armada";
import { featuredRoutesContent } from "@/constants/travel-reguler";
import { decodeHtml } from "@/utils/decode-html";
import { formatPrice } from "@/utils/format-price";
import { matchArmada } from "@/utils/match-armada";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { parseSchedule } from "@/utils/route-pairs";

export type WideMode = "md" | "lg" | "md-only";

type RouteCardProps = {
     route: Route;
     armadaList: Armada[];
     whatsapp: string;
     className?: string;
     wideMode?: WideMode;
};

// Ambil angka murni dari tarif (mis. "300.000" -> 300000)
function toNumber(value: unknown): number {
     if (typeof value === "number") return value;
     const digits = String(value ?? "").replace(/\D/g, "");
     return digits ? Number(digits) : 0;
}

// Gaya tambahan saat kartu melebar satu baris penuh.
// Tanpa wideMode, semua string kosong (kartu tampil biasa).
const wideStyles = {
     hover: {
          md: "md:hover:-translate-y-0.5",
          lg: "lg:hover:-translate-y-0.5",
          "md-only": "md:hover:-translate-y-0.5 lg:hover:translate-y-0",
     },
     // Pembungkus header + info: "menghilang" dari layout (display: contents)
     // supaya header dan info menjadi anak langsung grid kartu.
     wrapper: {
          md: "md:contents",
          lg: "lg:contents",
          "md-only": "md:contents lg:flex",
     },
     // Header (label + jalur) membentang penuh di baris pertama grid
     header: {
          md: "md:col-span-2",
          lg: "lg:col-span-2",
          "md-only": "md:col-span-2 lg:col-span-1",
     },
     jalur: {
          md: "md:rounded-full md:bg-surface-container md:px-2.5 md:py-1",
          lg: "lg:rounded-full lg:bg-surface-container lg:px-2.5 lg:py-1",
          "md-only":
               "md:rounded-full md:bg-surface-container md:px-2.5 md:py-1 lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0",
     },
     desc: {
          md: "md:text-on-surface-variant/80",
          lg: "lg:text-on-surface-variant/80",
          "md-only": "md:text-on-surface-variant/80 lg:text-on-surface-variant",
     },
     timeLabel: {
          md: "md:font-label-md md:text-label-md",
          lg: "lg:font-label-md lg:text-label-md",
          "md-only":
               "md:font-label-md md:text-label-md lg:font-body-sm lg:text-body-sm",
     },
     chip: {
          md: "md:rounded-md md:px-2.5 md:py-1 md:font-semibold",
          lg: "lg:rounded-md lg:px-2.5 lg:py-1 lg:font-semibold",
          "md-only":
               "md:rounded-md md:px-2.5 md:py-1 md:font-semibold lg:rounded lg:px-2 lg:py-0.5 lg:font-normal",
     },
     price: {
          md: "md:font-headline-lg md:text-headline-lg md:leading-tight",
          lg: "lg:font-headline-lg lg:text-headline-lg lg:leading-tight",
          "md-only":
               "md:font-headline-lg md:text-headline-lg md:leading-tight lg:font-headline-sm lg:text-headline-sm lg:leading-normal",
     },
     button: {
          md: "md:py-2.5 md:font-label-md md:text-label-md md:font-bold",
          lg: "lg:py-2.5 lg:font-label-md lg:text-label-md lg:font-bold",
          "md-only":
               "md:py-2.5 md:font-label-md md:text-label-md md:font-bold lg:py-2 lg:font-label-sm lg:text-label-sm lg:font-normal",
     },
     saving: {
          md: "hidden md:inline-block",
          lg: "hidden lg:inline-block",
          "md-only": "hidden md:inline-block lg:hidden",
     },
};

export default function RouteCard({
     route,
     armadaList,
     whatsapp,
     className = "",
     wideMode,
}: RouteCardProps) {
     const content = featuredRoutesContent;

     const title = capitalizeFirst(decodeHtml(route.title));
     const displayTitle = title.replace(" – ", " → ");
     const label = capitalizeFirst(route.acf?.label);
     const jalur = capitalizeFirst(route.acf?.jalur);
     const description = capitalizeFirst(route.acf?.deskripsi_singkat);
     const times = parseSchedule(route.acf?.jadwal);
     const fleetNames = matchArmada(route.acf?.armada, armadaList)
          .map((a) => capitalizeFirst(decodeHtml(a.title)))
          .filter(Boolean);
     const price = formatPrice(route.acf?.tarif);
     const roundTripPrice = formatPrice(route.acf?.tarif_pp);

     // Hemat = 2 x tarif satu arah - tarif pulang-pergi (hanya untuk kartu lebar)
     const saving =
          toNumber(route.acf?.tarif) * 2 - toNumber(route.acf?.tarif_pp);
     const showSaving = Boolean(wideMode) && Boolean(roundTripPrice) && saving > 0;

     const orderUrl = buildWhatsAppUrl(
          whatsapp,
          `Halo Admin, saya mau booking travel reguler ${title}`,
     );

     // Ambil gaya sesuai mode; kosong kalau kartu tidak melebar
     const w = (key: keyof typeof wideStyles): string =>
          wideMode ? wideStyles[key][wideMode] : "";

     return (
          <article
               className={`flex flex-col justify-between gap-space-md rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all duration-200 hover:shadow-md ${w("hover")} ${className}`}
          >
               {/* Pembungkus header + info.
                   Kartu biasa: kolom vertikal.
                   Kartu lebar: display: contents (anak-anaknya jadi item grid kartu). */}
               <div className={`flex flex-col gap-space-sm ${w("wrapper")}`}>
                    {/* Header: label kiri, jalur kanan (selalu selebar kartu) */}
                    {(label || jalur) && (
                         <div
                              className={`flex flex-wrap items-center justify-between gap-x-space-xs gap-y-1 ${w("header")}`}
                         >
                              {label && (
                                   <span className="rounded-full bg-primary/10 px-2.5 py-1 font-label-sm text-label-sm font-bold text-primary">
                                        {label}
                                   </span>
                              )}
                              {jalur && (
                                   <span
                                        className={`ml-auto inline-flex items-center gap-1 text-right font-label-sm text-label-sm text-on-surface-variant ${w("jalur")}`}
                                   >
                                        <RouteIcon className="h-3.5 w-3.5" aria-hidden />
                                        {jalur}
                                   </span>
                              )}
                         </div>
                    )}

                    {/* Bagian info */}
                    <div className="space-y-space-sm">
                         <div className="space-y-space-xs">
                              <h3 className="break-words font-headline-sm text-headline-sm font-bold text-on-surface">
                                   {displayTitle}
                              </h3>
                              {description && (
                                   <p
                                        className={`font-body-sm text-body-sm text-on-surface-variant ${w("desc")}`}
                                   >
                                        {description}
                                   </p>
                              )}
                         </div>

                         {times.length > 0 && (
                              <div className="space-y-space-xs">
                                   <div
                                        className={`flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant ${w("timeLabel")}`}
                                   >
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
                                                  className={`rounded bg-surface-container px-2 py-0.5 font-label-sm text-label-sm text-on-surface ${w("chip")}`}
                                             >
                                                  {time}
                                             </span>
                                        ))}
                                   </div>
                              </div>
                         )}

                         {fleetNames.length > 0 && (
                              <div className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                                   <Car
                                        className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                                        aria-hidden
                                   />
                                   <span className="min-w-0 break-words">
                                        <span className="font-semibold">
                                             {content.fleetLabel}
                                        </span>{" "}
                                        {fleetNames.join(", ")}
                                   </span>
                              </div>
                         )}

                         {route.slug && (
                              <Link
                                   href={`/rute/${route.slug}`}
                                   aria-label={`Lihat detail travel ${displayTitle}`}
                                   className="inline-block font-label-md text-label-md font-bold text-primary hover:underline"
                              >
                                   Lihat detail →
                              </Link>
                         )}
                    </div>
               </div>

               {/* Bagian harga + tombol (tetap anak langsung terakhir dari article) */}
               <div className="space-y-space-md rounded-lg bg-surface-container-low p-space-sm">
                    <div className="flex flex-col gap-space-sm sm:flex-row sm:items-end sm:justify-between">
                         <div>
                              {price && (
                                   <>
                                        <div className="font-label-sm text-label-sm text-on-surface-variant">
                                             {content.fareLabel}
                                        </div>
                                        <div
                                             className={`font-headline-sm text-headline-sm font-bold text-primary ${w("price")}`}
                                        >
                                             {price}
                                        </div>
                                   </>
                              )}
                         </div>
                         <a
                              href={orderUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex w-full items-center justify-center gap-space-sm whitespace-nowrap rounded-lg bg-primary-container px-space-md py-2.5 font-label-sm text-label-sm text-on-primary shadow-[0_4px_16px_rgba(0,168,150,0.35)] transition-colors hover:bg-primary sm:ml-auto sm:w-auto sm:py-2 ${w("button")}`}
                         >
                              <MessageSquareText className="h-4 w-4" aria-hidden />
                              {content.orderLabel}
                         </a>
                    </div>

                    {roundTripPrice && (
                         <div className="space-y-1 border-t border-on-surface/10 pt-space-sm">
                              <div className="flex items-center justify-between gap-space-sm font-label-sm text-label-sm">
                                   <span className="text-on-surface-variant">
                                        {content.roundTripLabel}
                                   </span>
                                   <span className="font-bold text-on-surface">
                                        {roundTripPrice}
                                   </span>
                              </div>
                              {showSaving && (
                                   <div
                                        className={`rounded-full bg-primary/10 px-2.5 py-0.5 font-label-sm text-label-sm font-bold text-primary ${w("saving")}`}
                                   >
                                        Hemat Rp {saving.toLocaleString("id-ID")}
                                   </div>
                              )}
                         </div>
                    )}
               </div>
          </article>
     );
}