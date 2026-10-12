import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Armchair, Luggage, MessageSquareText } from "lucide-react";
import { armadaCatalog } from "@/constants/armada";
import type { Armada } from "@/types/armada";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import { formatPrice } from "@/utils/format-price";

// Jumlah kartu maksimal di Beranda (HP/tablet hanya 4 pertama yang terlihat).
const MAX_HOME = 8;
const VISIBLE_SMALL = 4;

// Teks sementara di komponen (nanti dipindah ke constants/)
const SEE_ALL_LABEL = "Lihat Semua Armada";
const PRICE_PREFIX = "Harga";

// Kelas ditulis utuh supaya terbaca Tailwind (tidak boleh dirakit dari angka).
const LG_COLS: Record<number, string> = {
     1: "lg:grid-cols-1",
     2: "lg:grid-cols-2",
     3: "lg:grid-cols-3",
     4: "lg:grid-cols-4",
};

type ArmadaCatalogProps = {
     armada: Armada[];
     whatsapp: string;
     /** "grid" = semua armada (default, /armada); "home" = maks 8 kartu, lebar mengikuti jumlah kartu, maks 4 kolom (Beranda) */
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
     const count = items.length;

     // Kolom laptop mengikuti jumlah kartu (maks 4). Beranda: HP/tablet hanya 4 pertama; /armada: semua.
     const lgCols = Math.min(count, 4);
     const visibleSmall = isHome ? Math.min(count, VISIBLE_SMALL) : count;
     const smallCols = visibleSmall === 1 ? "grid-cols-1" : "grid-cols-2";

     const imageSizes = `(min-width: 1024px) ${Math.round(1100 / lgCols)}px, 50vw`;

     const listClass = `grid ${smallCols} gap-space-sm ${LG_COLS[lgCols]}`;

          const imageWrapClass =
          "relative aspect-[4/3] w-full overflow-hidden bg-surface-dim md:aspect-[16/10]";

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

               <ul className={listClass}>
                    {items.map((item, index) => {
                         const name = capitalizeFirst(decodeHtml(item.title));
                         const label = capitalizeFirst(item.acf?.label ?? "");
                         const description = capitalizeFirst(
                              decodeHtml(item.excerpt ?? ""),
                         );
                         const seats = capitalizeFirst(
                              item.acf?.jumlah_penumpang ?? "",
                         );
                         const luggage = capitalizeFirst(item.acf?.koper ?? "");
                         const price = formatPrice(item.acf?.harga);
                         const imageUrl = item.featured_image?.url;
                         const whatsappUrl = whatsapp
                              ? buildWhatsAppUrl(
                                   whatsapp,
                                   `Halo Admin Raincarnation, saya tertarik carter armada ${name}.`,
                              )
                              : null;

                         // Beranda: kartu ke-5 dst. hanya tampil di laptop (tetap ada di HTML).
                         let itemClass = "flex";
                         if (isHome && index >= VISIBLE_SMALL) {
                              itemClass = "hidden lg:flex";
                         } else if (
                              visibleSmall > 1 &&
                              visibleSmall % 2 === 1 &&
                              index === visibleSmall - 1
                         ) {
                              // Jumlah ganjil di HP/tablet: kartu terakhir melebar penuh.
                              itemClass = "flex col-span-2 lg:col-span-1";
                         }

                         return (
                              <li key={item.id} className={itemClass}>
                                   <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-surface-container bg-surface-container-lowest shadow-sm transition-shadow hover:shadow-xl">
                                        {imageUrl && (
                                             <div className={imageWrapClass}>
                                                  <Image
                                                       src={imageUrl}
                                                       alt={item.featured_image?.alt || name}
                                                       fill
                                                       sizes={imageSizes}
                                                       className="object-cover object-center"
                                                  />
                                                  {label && (
                                                       <span className="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-full bg-primary px-2.5 py-1 font-label-sm text-label-sm font-semibold text-on-primary shadow-md">
                                                            {label}
                                                       </span>
                                                  )}
                                             </div>
                                        )}

                                        <div className="flex flex-1 flex-col gap-space-sm p-space-sm md:p-space-md">
                                             <div className="flex flex-col gap-1">
                                                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                                       {name}
                                                  </h3>
                                                  {(seats || luggage) && (
                                                       <ul className="flex flex-wrap gap-x-space-sm gap-y-1 font-label-sm text-label-sm text-on-surface-variant">
                                                            {seats && (
                                                                 <li className="inline-flex items-center gap-1">
                                                                      <Armchair
                                                                           size={14}
                                                                           className="shrink-0 text-primary"
                                                                           aria-hidden="true"
                                                                      />
                                                                      {seats}
                                                                 </li>
                                                            )}
                                                            {luggage && (
                                                                 <li className="inline-flex items-center gap-1">
                                                                      <Luggage
                                                                           size={14}
                                                                           className="shrink-0 text-primary"
                                                                           aria-hidden="true"
                                                                      />
                                                                      {luggage}
                                                                 </li>
                                                            )}
                                                       </ul>
                                                  )}
                                                  {!isHome && description && (
                                                       <p className="line-clamp-2 font-body-sm text-body-sm text-on-surface-variant">
                                                            {description}
                                                       </p>
                                                  )}
                                             </div>

                                             {(price || whatsappUrl) && (
                                                  <div className="mt-auto flex flex-col gap-space-sm border-t border-surface-container pt-space-sm">
                                                       {price && (
                                                            <p className="flex flex-col font-label-sm text-label-sm text-on-surface-variant sm:flex-row sm:items-baseline sm:justify-between sm:gap-space-xs">
                                                                 <span className="whitespace-nowrap">
                                                                      {PRICE_PREFIX} {armadaCatalog.priceLabel}
                                                                 </span>
                                                                 <span className="whitespace-nowrap font-label-lg text-label-lg font-bold text-primary">
                                                                      {price}
                                                                 </span>
                                                            </p>
                                                       )}
                                                       {whatsappUrl && (
                                                            <a
                                                                 href={whatsappUrl}
                                                                 target="_blank"
                                                                 rel="noopener noreferrer"
                                                                 aria-label={`${armadaCatalog.buttonLabel} ${name} lewat WhatsApp`}
                                                                 className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-whatsapp px-space-sm py-2.5 text-center font-label-md text-label-md font-semibold text-on-whatsapp transition-colors duration-150 hover:bg-whatsapp-hover"
                                                            >
                                                                 <MessageSquareText
                                                                      className="h-4 w-4 shrink-0"
                                                                      aria-hidden="true"
                                                                 />
                                                                 {armadaCatalog.buttonLabel}
                                                            </a>
                                                       )}
                                                  </div>
                                             )}
                                        </div>
                                   </article>
                              </li>
                         );
                    })}
               </ul>

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