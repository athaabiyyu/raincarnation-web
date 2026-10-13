import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Route } from "@/types/route";
import type { Armada } from "@/types/armada";
import { featuredRoutesContent } from "@/constants/travel-reguler";
import RouteCard from "@/components/sections/RouteCard";

const MAX_FEATURED = 3;

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

     return (
          <section className="w-full bg-surface py-space-xl">
               <div className="mx-auto max-w-6xl space-y-space-lg px-gutter">
                    <div className="flex flex-col gap-space-md md:flex-row md:items-end md:justify-between">
                         <div className="space-y-space-xs">
                              <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                                   JADWAL DAN TARIF TERBUKA
                              </span>
                              <h2 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
                                   {content.title}
                              </h2>
                              <p className="max-w-3xl font-body-md text-body-md text-on-surface-variant">
                                   {content.description}
                              </p>
                         </div>

                         {/* Tampil di desktop/laptop saja (1024px ke atas) */}
                         {hasMore && seeAllHref ? (
                              <Link
                                   href={seeAllHref}
                                   className="hidden shrink-0 items-center gap-2 rounded-full bg-surface-container px-space-md py-2.5 font-label-md text-label-md font-bold text-primary transition-colors hover:bg-primary/10 lg:inline-flex lg:self-auto"
                              >
                                   Lihat Semua Rute
                                   <ArrowRight className="h-4 w-4" aria-hidden />
                              </Link>
                         ) : null}
                    </div>

                    {/* HP: kartu bertumpuk ke bawah. md: 2 kolom, lg: 3 kolom. */}
                    <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-3">
                         {routes.map((route) => (
                              <div key={route.id} className="flex [&>*]:w-full">
                                   <RouteCard
                                        route={route}
                                        armadaList={armadaList}
                                        whatsapp={whatsapp}
                                        soft={onlyFeatured}
                                   />
                              </div>
                         ))}
                    </div>

                    {/* Tampil di bawah ukuran laptop penuh (layar di bawah 1024px): diletakkan setelah kartu rute */}
                    {hasMore && seeAllHref ? (
                         <div className="lg:hidden">
                              <Link
                                   href={seeAllHref}
                                   className="flex w-full items-center justify-center gap-2 rounded-xl bg-surface-container py-3 font-label-md text-label-md font-bold text-primary transition-colors hover:bg-primary/10"
                              >
                                   Lihat Semua Rute
                                   <ArrowRight className="h-4 w-4" aria-hidden />
                              </Link>
                         </div>
                    ) : null}
               </div>
          </section>
     );
}