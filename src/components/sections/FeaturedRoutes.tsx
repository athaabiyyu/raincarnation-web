"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Search, ListFilter, Check } from "lucide-react";
import type { Route } from "@/types/route";
import { featuredRoutesContent } from "@/constants/travel-reguler";
import RouteCard from "@/components/sections/RouteCard";

const MAX_FEATURED = 3;
const INITIAL_PAGE_SIZE = 6;

const FILTER_CITIES = ["Semua", "Surabaya", "Malang", "Batu", "Juanda", "Pandaan"];

type FeaturedRoutesProps = {
     routes: Route[];
     whatsapp: string;
     onlyFeatured?: boolean;
     seeAllHref?: string;
};

export default function FeaturedRoutes({
     routes: allRoutes,
     whatsapp,
     onlyFeatured = false,
     seeAllHref,
}: FeaturedRoutesProps) {
     const [visibleCount, setVisibleCount] = useState<number>(INITIAL_PAGE_SIZE);
     const [searchQuery, setSearchQuery] = useState("");
     const [activeFilter, setActiveFilter] = useState("Semua");

     // State untuk membuka/menutup dropdown kustom
     const [isFilterOpen, setIsFilterOpen] = useState(false);

     const baseRoutes = useMemo(() => {
          if (!onlyFeatured) return allRoutes;
          const marked = allRoutes.filter((route) => route.acf?.unggulan === true);
          return (marked.length > 0 ? marked : allRoutes).slice(0, MAX_FEATURED);
     }, [allRoutes, onlyFeatured]);

     const filteredRoutes = useMemo(() => {
          if (onlyFeatured) return baseRoutes;

          return baseRoutes.filter((route) => {
               const titleStr = (route.title || "").toLowerCase();
               const matchesSearch = titleStr.includes(searchQuery.toLowerCase());
               const matchesFilter =
                    activeFilter === "Semua" || titleStr.includes(activeFilter.toLowerCase());
               return matchesSearch && matchesFilter;
          });
     }, [baseRoutes, searchQuery, activeFilter, onlyFeatured]);

     if (allRoutes.length === 0) return null;

     const displayedRoutes = filteredRoutes;

     const hasMoreInPage = !onlyFeatured && visibleCount < filteredRoutes.length;
     const hasMoreLink = Boolean(seeAllHref) && baseRoutes.length < allRoutes.length;

     const content = featuredRoutesContent;

     const handleLoadMore = () => {
          setVisibleCount((prev) => prev + INITIAL_PAGE_SIZE);
     };

     return (
          <section
               className={`w-full py-space-xl ${onlyFeatured ? "bg-surface" : "bg-surface-container-low"
                    }`}
          >
               <div className="mx-auto max-w-6xl space-y-space-lg px-gutter">
                    {/* Header Section */}
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

                         {hasMoreLink && seeAllHref && onlyFeatured ? (
                              <Link
                                   href={seeAllHref}
                                   /* Menggunakan styling warna tombol Lihat Detail (border primary/20, bg primary/10, teks primary, hover senada) */
                                   className="hidden shrink-0 items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-space-md py-2.5 font-label-md text-label-md font-bold text-primary transition-all hover:border-primary/40 hover:bg-primary/15 lg:inline-flex lg:self-auto"
                              >
                                   Lihat Semua Rute
                                   <ArrowRight className="h-4 w-4" aria-hidden />
                              </Link>
                         ) : null}
                    </div>

                    <div className="space-y-space-md md:space-y-space-lg">

                         {/* Filter & Search Section (Gaya "Pill" Terpadu) */}
                         {!onlyFeatured && (
                              <div className="relative w-full max-w-2xl">
                                   {/* Kapsul Utama */}
                                   <div className="flex w-full items-center rounded-full bg-surface-container-lowest p-1.5 pl-5 shadow-sm border border-surface-container-high/40 focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300 hover:shadow-md">

                                        <Search className="h-5 w-5 text-on-surface-variant/70 shrink-0" aria-hidden="true" />

                                        <input
                                             type="text"
                                             placeholder="Cari rute keberangkatan (misal: Malang)..."
                                             value={searchQuery}
                                             onChange={(e) => {
                                                  setSearchQuery(e.target.value);
                                                  setVisibleCount(INITIAL_PAGE_SIZE);
                                             }}
                                             className="flex-1 bg-transparent border-none py-2.5 px-3 md:px-4 font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-0"
                                        />

                                        <div className="relative shrink-0">
                                             <button
                                                  type="button"
                                                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                                                  className={`flex h-[44px] w-[44px] md:h-[48px] md:w-[48px] items-center justify-center rounded-full transition-all duration-200 ${activeFilter !== "Semua"
                                                       ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                                                       : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-primary"
                                                       }`}
                                                  aria-label="Filter kota"
                                             >
                                                  <ListFilter className="h-5 w-5" />
                                                  {activeFilter !== "Semua" && (
                                                       <span className="absolute right-2.5 top-2.5 md:right-3 md:top-3 h-2.5 w-2.5 rounded-full bg-surface-container-lowest ring-2 ring-primary" />
                                                  )}
                                             </button>

                                             {/* Custom Dropdown Menu */}
                                             {isFilterOpen && (
                                                  <>
                                                       <div
                                                            className="fixed inset-0 z-40"
                                                            onClick={() => setIsFilterOpen(false)}
                                                       />
                                                       <div className="absolute right-0 top-[56px] md:top-[60px] z-50 w-52 overflow-hidden rounded-xl border border-surface-container-high/50 bg-surface-container-lowest py-1.5 shadow-xl ring-1 ring-black/5">
                                                            {FILTER_CITIES.map((city) => (
                                                                 <button
                                                                      key={city}
                                                                      onClick={() => {
                                                                           setActiveFilter(city);
                                                                           setVisibleCount(INITIAL_PAGE_SIZE);
                                                                           setIsFilterOpen(false);
                                                                      }}
                                                                      className={`flex w-full items-center justify-between px-4 py-3 text-left font-body-sm md:font-body-md transition-colors ${activeFilter === city
                                                                           ? "bg-primary/10 font-bold text-primary"
                                                                           : "text-on-surface hover:bg-surface-container-low"
                                                                           }`}
                                                                 >
                                                                      <span>{city === "Semua" ? "Semua Kota" : city}</span>
                                                                      {activeFilter === city && (
                                                                           <Check className="h-4 w-4 md:h-5 md:w-5" />
                                                                      )}
                                                                 </button>
                                                            ))}
                                                       </div>
                                                  </>
                                             )}
                                        </div>
                                   </div>
                              </div>
                         )}

                         {/* Grid Cards Section */}
                         <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-3">
                              {displayedRoutes.length > 0 ? (
                                   displayedRoutes.map((route, index) => (
                                        <div
                                             key={route.id}
                                             className={`${!onlyFeatured && index >= visibleCount ? "hidden" : "flex"} [&>*]:w-full`}
                                        >
                                             <RouteCard
                                                  route={route}
                                                  whatsapp={whatsapp}
                                             />
                                        </div>
                                   ))
                              ) : (
                                   <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-surface-container-high py-16 text-center bg-surface-container-lowest/50">
                                        <div className="rounded-full bg-surface-container p-4 mb-4">
                                             <Search className="h-8 w-8 text-on-surface-variant/50" />
                                        </div>
                                        <p className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                             Rute tidak ditemukan
                                        </p>
                                        <p className="text-on-surface-variant font-body-md text-body-md mt-1">
                                             Coba gunakan kata kunci kota lain.
                                        </p>
                                        <button
                                             onClick={() => {
                                                  setSearchQuery("");
                                                  setActiveFilter("Semua");
                                             }}
                                             className="mt-4 text-primary font-bold hover:underline"
                                        >
                                             Reset Filter
                                        </button>
                                   </div>
                              )}
                         </div>
                    </div>

                    {/* Tombol Load More */}
                    {hasMoreInPage && (
                         <div className="flex justify-center pt-space-xs md:pt-space-sm">
                              <button
                                   type="button"
                                   onClick={handleLoadMore}
                                   className="inline-flex items-center gap-2 rounded-full bg-surface-container-lowest px-6 py-3 font-label-md text-label-md font-bold text-primary border border-surface-container-high/30 shadow-sm transition-all duration-200 hover:bg-primary hover:text-on-primary hover:border-primary hover:shadow-md"
                              >
                                   Tampilkan Rute Lainnya ({filteredRoutes.length - visibleCount})
                                   <ChevronDown className="h-5 w-5" />
                              </button>
                         </div>
                    )}

                    {hasMoreLink && seeAllHref && onlyFeatured ? (
                         <div className="lg:hidden">
                              <Link
                                   href={seeAllHref}
                                   /* Menggunakan styling warna tombol Lihat Detail versi mobile */
                                   className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/10 py-2.5 font-label-md text-label-md font-bold text-primary transition-all hover:border-primary/40 hover:bg-primary/15"
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