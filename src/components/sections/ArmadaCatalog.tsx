import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArmadaCard from "@/components/sections/ArmadaCard";
import ArmadaGridMore from "@/components/ui/ArmadaGridMore";
import FleetCarousel from "@/components/ui/FleetCarousel";
import { armadaCatalog } from "@/constants/armada";
import type { Armada } from "@/types/armada";

// Beranda: carousel dengan 3 kartu pertama + tombol "Lihat Semua Armada".
const MAX_HOME = 3;

// Teks sementara di komponen (nanti dipindah ke constants/)
const SEE_ALL_LABEL = "Lihat Semua Armada";

const HOME_IMAGE_SIZES =
     "(min-width: 1024px) 352px, (min-width: 768px) 50vw, 85vw";
const GRID_IMAGE_SIZES =
     "(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw";

type ArmadaCatalogProps = {
     armada: Armada[];
     whatsapp: string;
     /** "grid" = semua armada dalam grid + tombol tampilkan lebih banyak (default, /armada); "home" = carousel 3 kartu + tombol lihat semua (Beranda) */
     variant?: "grid" | "home";
     /** Tautan tombol "Lihat Semua Armada" (hanya varian home) */
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

     return (
          <section
               id={armadaCatalog.id}
               className={`mx-auto w-full max-w-6xl scroll-mt-32 px-gutter ${isHome ? "pt-space-md" : "pt-space-xl"}`}
          >
               <div className="space-y-space-xs pb-space-lg">
                    <h2 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
                         {armadaCatalog.title}
                    </h2>
                    <p className="max-w-3xl font-body-md text-body-md text-on-surface-variant">
                         {armadaCatalog.description}
                    </p>
               </div>

               {isHome ? (
                    <FleetCarousel>
                         {items.map((item) => (
                              <ArmadaCard
                                   key={item.id}
                                   item={item}
                                   whatsapp={whatsapp}
                                   imageSizes={HOME_IMAGE_SIZES}
                              />
                         ))}
                    </FleetCarousel>
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

               {isHome && seeAllHref && (
                    <Link
                         href={seeAllHref}
                         className="mt-space-lg flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-space-lg py-4 font-label-lg text-label-lg font-bold text-white transition-colors hover:bg-on-primary-fixed-variant"
                    >
                         {SEE_ALL_LABEL}
                         <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Link>
               )}
          </section>
     );
}