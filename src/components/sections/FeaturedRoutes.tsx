import { Info, ArrowRight } from "lucide-react";
import type { Route } from "@/types/route";
import type { Armada } from "@/types/armada";
import { featuredRoutesContent } from "@/constants/travel-reguler";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { formatPrice } from "@/utils/format-price";
import RouteCard, { type WideMode } from "@/components/sections/RouteCard";

type FeaturedRoutesProps = {
     routes: Route[];
     armadaList: Armada[];
     whatsapp: string;
};

function hasRoundTrip(route: Route): boolean {
     return Boolean(formatPrice(route.acf?.tarif_pp));
}

export default function FeaturedRoutes({
     routes,
     armadaList,
     whatsapp,
}: FeaturedRoutesProps) {
     if (routes.length === 0) return null;

     const content = featuredRoutesContent;
     const helpUrl = buildWhatsAppUrl(
          whatsapp,
          "Halo Admin, saya mau tanya ketersediaan rute travel lain",
     );

     const total = routes.length;
     // Kartu terakhir sendirian di barisnya?
     const aloneOn2Cols = total % 2 === 1; // layar md (2 kolom)
     const aloneOn3Cols = total % 3 === 1; // layar lg (3 kolom)

     // Kalau ada kartu yang bakal sendirian, pindahkan satu kartu PP ke posisi terakhir
     let sortedRoutes = routes;
     if (aloneOn2Cols || aloneOn3Cols) {
          let ppIndex = -1;
          for (let i = routes.length - 1; i >= 0; i--) {
               if (hasRoundTrip(routes[i])) {
                    ppIndex = i;
                    break;
               }
          }
          if (ppIndex !== -1 && ppIndex !== routes.length - 1) {
               sortedRoutes = [
                    ...routes.slice(0, ppIndex),
                    ...routes.slice(ppIndex + 1),
                    routes[ppIndex],
               ];
          }
     }

     const lastIndex = sortedRoutes.length - 1;

     // Kartu lebar = grid 2 kolom x 2 baris:
     // baris 1 = header (label + jalur, membentang penuh)
     // baris 2 = info (kiri) + harga (kanan)
     function getSpanClass(route: Route, index: number): string {
          if (index !== lastIndex) return "";
          if (!hasRoundTrip(route)) return "";

          if (aloneOn2Cols && aloneOn3Cols) {
               return "md:col-span-2 md:grid md:grid-cols-2 md:gap-x-space-lg md:gap-y-space-sm md:[&>div:last-child]:self-center lg:col-span-3";
          }
          if (aloneOn3Cols) {
               return "lg:col-span-3 lg:grid lg:grid-cols-2 lg:gap-x-space-lg lg:gap-y-space-sm lg:[&>div:last-child]:self-center";
          }
          if (aloneOn2Cols) {
               return "md:col-span-2 md:grid md:grid-cols-2 md:gap-x-space-lg md:gap-y-space-sm md:[&>div:last-child]:self-center lg:col-span-1 lg:flex lg:gap-space-md lg:[&>div:last-child]:self-auto";
          }
          return "";
     }

     function getWideMode(route: Route, index: number): WideMode | undefined {
          if (index !== lastIndex) return undefined;
          if (!hasRoundTrip(route)) return undefined;
          if (aloneOn2Cols && aloneOn3Cols) return "md";
          if (aloneOn3Cols) return "lg";
          if (aloneOn2Cols) return "md-only";
          return undefined;
     }

     return (
          <section className="w-full py-space-xl px-gutter bg-surface">
               <div className="max-w-6xl mx-auto space-y-space-lg">
                    <div className="space-y-space-xs">
                         <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                              {content.title}
                         </h2>
                         <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                              {content.description}
                         </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
                         {sortedRoutes.map((route, index) => (
                              <RouteCard
                                   key={route.id}
                                   route={route}
                                   armadaList={armadaList}
                                   whatsapp={whatsapp}
                                   className={getSpanClass(route, index)}
                                   wideMode={getWideMode(route, index)}
                              />
                         ))}
                    </div>

                    <div className="p-space-md rounded-xl bg-surface-container flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
                         <div className="flex items-center gap-space-sm">
                              <Info className="w-6 h-6 shrink-0 text-primary" />
                              <p className="font-body-sm text-body-sm text-on-surface">
                                   {content.helpText}
                              </p>
                         </div>
                         <a
                              href={helpUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="whitespace-nowrap font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors flex items-center gap-1 font-bold"
                         >
                              {content.helpLinkLabel}
                              <ArrowRight className="w-4 h-4" />
                         </a>
                    </div>
               </div>
          </section>
     );
}