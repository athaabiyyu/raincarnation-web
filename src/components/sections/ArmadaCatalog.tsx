import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArmadaCard from "@/components/sections/ArmadaCard";
import ArmadaGridMore from "@/components/ui/ArmadaGridMore";
import { armadaCatalog } from "@/constants/armada";
import type { Armada } from "@/types/armada";

// Beranda: 3 kartu pertama + tombol "Lihat Semua Unit Armada".
const MAX_HOME = 3;

const HOME_IMAGE_SIZES =
     "(min-width: 1024px) 352px, (min-width: 768px) 50vw, 100vw";
const GRID_IMAGE_SIZES =
     "(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw";

type ArmadaCatalogProps = {
     armada: Armada[];
     whatsapp: string;
     /** "grid" = semua armada dalam grid + tombol tampilkan lebih banyak (default, /armada); "home" = 3 kartu + tombol lihat semua (Beranda) */
     variant?: "grid" | "home";
     /** Tautan tombol "Lihat Semua Unit Armada" (hanya varian home) */
     seeAllHref?: string;
};

export default function ArmadaCatalog({
     armada,
     whatsapp,
     variant = "grid",
     seeAllHref,
}: ArmadaCatalogProps) {
     if (armada.length === 0) return null;

     const isHome = variant === "home";
     const items = isHome ? armada.slice(0, MAX_HOME) : armada;
     const heading = isHome ? armadaCatalog.title : armadaCatalog.pageTitle;

     return (
          <section
               id={armadaCatalog.id}
               className={`w-full scroll-mt-32 ${isHome ? "bg-surface-container-low py-space-xl" : "pt-space-xl"}`}
          >
               <div className="mx-auto max-w-6xl px-gutter">
                    <div className="flex flex-col gap-space-md pb-space-lg md:flex-row md:items-end md:justify-between">
                         <div className="space-y-space-xs">
                              <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                                   KENDARAAN NYAMAN & TERAWAT
                              </span>
                              <h2 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
                                   {heading}
                              </h2>
                              <p className="max-w-3xl font-body-md text-body-md text-on-surface-variant">
                                   {armadaCatalog.description}
                              </p>
                         </div>

                         {/* Tampil di desktop/laptop saja (1024px ke atas) */}
                         {isHome && seeAllHref && (
                              <Link
                                   href={seeAllHref}
                                   className="hidden shrink-0 items-center gap-2 rounded-full border border-surface-container-high/80 bg-surface-container-lowest px-space-md py-2.5 font-label-md text-label-md font-bold text-primary shadow-sm transition-all hover:border-primary/40 hover:bg-primary/5 lg:inline-flex lg:self-auto"
                              >
                                   Lihat Semua Unit Armada
                                   <ArrowRight className="h-4 w-4" aria-hidden="true" />
                              </Link>
                         )}
                    </div>

                    {isHome ? (
                         <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-3">
                              {items.map((item) => (
                                   <div key={item.id} className="flex [&>*]:w-full">
                                        <ArmadaCard
                                             item={item}
                                             whatsapp={whatsapp}
                                             imageSizes={HOME_IMAGE_SIZES}
                                        />
                                   </div>
                              ))}
                         </div>
                    ) : (
                         <ArmadaGridMore>
                              {items.map((item) => (
                                   <ArmadaCard
                                        key={item.id}
                                        item={item}
                                        whatsapp={whatsapp}
                                        imageSizes={GRID_IMAGE_SIZES}
                                   />
                              ))}
                         </ArmadaGridMore>
                    )}

                    {/* Tampil di bawah ukuran laptop penuh (layar di bawah 1024px) */}
                    {isHome && seeAllHref && (
                         <div className="mt-space-lg lg:hidden">
                              <Link
                                   href={seeAllHref}
                                   className="flex w-full items-center justify-center gap-2 rounded-xl border border-surface-container-high/80 bg-surface-container-lowest py-3 font-label-md text-label-md font-bold text-primary shadow-sm transition-all hover:border-primary/40 hover:bg-primary/5"
                              >
                                   Lihat Semua Unit Armada
                                   <ArrowRight className="h-4 w-4" aria-hidden="true" />
                              </Link>
                         </div>
                    )}
               </div>
          </section>
     );
}