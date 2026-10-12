import Link from "next/link";
import { Info, ArrowRight } from "lucide-react";
import type { Route } from "@/types/route";
import type { Armada } from "@/types/armada";
import { featuredRoutesContent } from "@/constants/travel-reguler";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import RouteCard from "@/components/sections/RouteCard";

const MAX_FEATURED = 3;
const SEE_ALL_LABEL = "Lihat Semua Rute";

type FeaturedRoutesProps = {
     routes: Route[];
     armadaList: Armada[];
     whatsapp: string;
     onlyFeatured?: boolean;
     seeAllHref?: string;
};

export default function FeaturedRoutes({
     routes: allRoutes,
     armadaList,
     whatsapp,
     onlyFeatured = false,
     seeAllHref,
}: FeaturedRoutesProps) {
     if (allRoutes.length === 0) return null;

     // Mode Beranda: hanya rute bertanda "unggulan" (maks. 3).
     // Kalau belum ada yang ditandai, pakai rute pertama.
     let routes = allRoutes;
     if (onlyFeatured) {
          const marked = allRoutes.filter((route) => route.acf?.unggulan === true);
          routes = (marked.length > 0 ? marked : allRoutes).slice(0, MAX_FEATURED);
     }
     const hasMore = Boolean(seeAllHref) && routes.length < allRoutes.length;

     const content = featuredRoutesContent;
     const helpUrl = buildWhatsAppUrl(
          whatsapp,
          "Halo Admin, saya mau tanya ketersediaan rute travel lain",
     );

     return (
          <section className="w-full bg-surface py-space-xl">
               <div className="mx-auto max-w-6xl space-y-space-lg px-gutter">
                    <div className="space-y-space-xs">
                         <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                              {content.title}
                         </h2>
                         <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                              {content.description}
                         </p>
                    </div>

                    {/* HP: kartu bertumpuk ke bawah. md: 2 kolom, lg: 3 kolom. */}
                    <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-3">
                         {routes.map((route) => (
                              <div key={route.id} className="flex [&>*]:w-full">
                                   <RouteCard
                                        route={route}
                                        armadaList={armadaList}
                                        whatsapp={whatsapp}
                                   />
                              </div>
                         ))}
                    </div>

                    {hasMore && seeAllHref ? (
                         <Link
                              href={seeAllHref}
                                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-space-lg py-4 font-label-lg text-label-lg font-bold text-white transition-colors hover:bg-on-primary-fixed-variant"
                         >
                              {SEE_ALL_LABEL}
                              <ArrowRight className="h-5 w-5" aria-hidden />
                         </Link>
                    ) : null}

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