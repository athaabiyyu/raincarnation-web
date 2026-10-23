import Link from "next/link";
import { ArrowRight, Bus } from "lucide-react";
import ArmadaCard from "@/components/sections/ArmadaCard";
import ArmadaGridMore from "@/components/ui/ArmadaGridMore";
import { armadaCatalog } from "@/constants/armada";
import type { Armada } from "@/types/armada";

// Beranda: 3 kartu pertama + banner promo di bawahnya
const MAX_HOME = 3;

const HOME_IMAGE_SIZES =
     "(min-width: 1024px) 352px, (min-width: 768px) 50vw, 100vw";
const GRID_IMAGE_SIZES =
     "(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw";

type ArmadaCatalogProps = {
     armada: Armada[];
     whatsapp: string;
     /** "grid" = semua armada dalam grid + tombol tampilkan lebih banyak (default, /armada); "home" = 3 kartu + banner promo (Beranda) */
     variant?: "grid" | "home";
     /** Tautan tombol "Lihat Semua Unit" (hanya varian home) */
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

     // Beranda: hanya unit dengan dua harga (Lepas Kunci dan All In). /armada: semua unit.
     const candidates = isHome
          ? armada.filter(
               (item) =>
                    Number(item.acf?.harga) > 0 && Number(item.acf?.harga_all_in) > 0
          )
          : armada;

     if (candidates.length === 0) return null;

     const items = isHome ? candidates.slice(0, MAX_HOME) : candidates;
     const heading = isHome ? armadaCatalog.title : armadaCatalog.pageTitle;

     return (
          <section
               id={armadaCatalog.id}
               className={`w-full scroll-mt-32 ${isHome ? "bg-surface py-space-xl" : "pt-space-xl"
                    }`}
          >
               <div className="mx-auto max-w-6xl px-gutter">
                    {/* Section Header */}
                    <div className="flex flex-col gap-space-md pb-space-lg">
                         <div className="space-y-space-xs">
                              <span className="block font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                                   KENDARAAN NYAMAN &amp; TERAWAT
                              </span>
                              <h2 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
                                   {heading}
                              </h2>
                              <p className="max-w-3xl font-body-md text-body-md text-on-surface-variant">
                                   {armadaCatalog.description}
                              </p>
                         </div>
                    </div>

                    {/* Grid Kartu Armada */}
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

                    {/* Banner Promo Desain Baru (Hanya varian home) */}
                    {isHome && (
                         <div className="mt-space-lg flex flex-col items-center justify-between gap-space-md rounded-2xl bg-surface-container-lowest p-space-md shadow-sm lg:flex-row lg:p-space-lg">
                              {/* Kiri: Ikon + Teks */}
                              <div className="flex w-full items-center gap-space-md lg:w-auto">
                                   <div className="flex shrink-0 items-center justify-center rounded-2xl bg-primary-container/10 p-3.5 text-primary">
                                        <Bus className="h-6 w-6" aria-hidden="true" />
                                   </div>
                                   <div className="space-y-0.5">
                                        <h3 className="font-label-lg text-label-lg font-bold text-on-surface">
                                             Mencari Pilihan Unit Lain?
                                        </h3>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                                             Lihat semua unit armada kami dengan menekan tombol disamping.
                                        </p>
                                   </div>
                              </div>

                              {/* Kanan: Tombol Aksi */}
                              <div className="flex w-full shrink-0 flex-col gap-space-xs sm:flex-row lg:w-auto">
                                   {seeAllHref && (
                                        <Link
                                             href={seeAllHref}
                                             className="flex items-center justify-center gap-2 rounded-xl bg-primary px-space-md py-2.5 text-center font-label-md text-label-md font-bold text-on-primary shadow-sm transition-all hover:bg-primary/90 active:scale-95"
                                        >
                                             Lihat Semua Unit
                                             <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                        </Link>
                                   )}
                              </div>
                         </div>
                    )}
               </div>
          </section>
     );
}