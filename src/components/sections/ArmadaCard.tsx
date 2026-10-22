import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MessageSquareText } from "lucide-react";
import type { Armada } from "@/types/armada";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import { formatPrice } from "@/utils/format-price";

type ArmadaCardProps = {
     item: Armada;
     whatsapp: string;
     imageSizes: string;
     showAllInPrice?: boolean;
};

export default function ArmadaCard({
     item,
     whatsapp,
     imageSizes,
}: ArmadaCardProps) {
     const name = capitalizeFirst(decodeHtml(item.title));
     const label = capitalizeFirst(decodeHtml(item.acf?.label ?? ""));

     const hasLepasKunci = Number(item.acf?.harga) > 0;
     const hasAllIn = Number(item.acf?.harga_all_in) > 0;
     const price = hasLepasKunci ? formatPrice(item.acf?.harga) : null;
     const priceAllIn = hasAllIn ? formatPrice(item.acf?.harga_all_in) : null;
     const showLepasKunci = Boolean(price);
     const showAllIn = Boolean(priceAllIn);
     const hasAnyPrice = showLepasKunci || showAllIn;
     const rawImageUrl = item.featured_image?.url;
     const imageUrl = rawImageUrl ? rawImageUrl.replace(/^http:\/\//i, "https://") : undefined;

     const selectLabel = `Pilih Unit ${name}`;

     return (
          <article className="@container flex h-full flex-col overflow-hidden rounded-2xl border border-surface-container-high/60 bg-surface-container-lowest shadow-sm transition-all duration-300 hover:shadow-xl">
               {/* Gambar Armada - Klik Gambar langsung ke Detail */}
               {imageUrl ? (
                    <Link href={`/sewa-mobil/${item.slug}`} className="relative aspect-[16/10] overflow-hidden bg-surface-container block group">
                         <Image
                              src={imageUrl}
                              alt={item.featured_image?.alt || name}
                              fill
                              sizes={imageSizes}
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                         />
                         {label && (
                              <span className="absolute right-3 top-3 rounded-full bg-primary/90 backdrop-blur-md px-3 py-1 font-label-sm text-xs font-semibold text-on-primary shadow-sm">
                                   {label}
                              </span>
                         )}
                    </Link>
               ) : null}

               {/* Konten Kartu */}
               <div className="flex flex-1 flex-col justify-between p-4 @xs:p-5">
                    <div className="flex flex-col gap-3">
                         {/* Judul Armada */}
                         <Link href={`/sewa-mobil/${item.slug}`} className="group">
                              <h3 className="font-headline-sm text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                                   {name}
                              </h3>
                         </Link>
                    </div>

                    {/* Section Pilihan Paket Tarif */}
                    <div className="mt-4 flex flex-col gap-3">
                         {hasAnyPrice && (
                              <>
                                   {/* Label Header Paket */}
                                   <div className="flex items-center justify-between text-[11px] font-bold tracking-wider">
                                        <span className="text-on-surface-variant uppercase">PILIHAN PAKET TARIF</span>
                                        <span className="text-emerald-600">Transparan &amp; Hemat</span>
                                   </div>

                                   {/* Grid Opsi Harga */}
                                   <div
                                        className={`grid gap-2.5 ${showLepasKunci && showAllIn ? "grid-cols-2" : "grid-cols-1"
                                             }`}
                                   >
                                        {/* Opsi 1: Lepas Kunci */}
                                        {/* Opsi 1: Lepas Kunci */}
                                        {showLepasKunci && (
                                             <div className="relative flex flex-col justify-between rounded-2xl border border-surface-container-high/60 bg-surface-container-lowest p-3 shadow-sm">
                                                  <div>
                                                       <div className="flex items-center justify-between">
                                                            <span className="text-xs font-bold text-on-surface">Lepas Kunci</span>
                                                       </div>
                                                       <div className="mt-2 text-base font-extrabold text-on-surface">
                                                            {price}
                                                       </div>
                                                  </div>
                                                  <span className="mt-1 text-[10px] text-on-surface-variant">per 12 jam</span>
                                             </div>
                                        )}

                                        {/* Opsi 2: All In */}
                                        {showAllIn && (
                                             <div className="relative flex flex-col justify-between rounded-2xl border-2 border-emerald-500/80 bg-emerald-50/20 p-3 shadow-sm">
                                                  <span className="absolute -top-2.5 right-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[9px] font-bold text-white shadow-xs">
                                                       PRAKTIS
                                                  </span>
                                                  <div>
                                                       <div className="flex items-center justify-between gap-1">
                                                            <span className="text-xs font-bold text-emerald-950">All In</span>
                                                            <span className="rounded bg-emerald-100/80 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">
                                                                 + Driver
                                                            </span>
                                                       </div>
                                                       <div className="mt-2 text-base font-extrabold text-emerald-700">
                                                            {priceAllIn}
                                                       </div>
                                                  </div>
                                                  <span className="mt-1 text-[10px] text-emerald-700/80">per hari (fullday)</span>
                                             </div>
                                        )}
                                   </div>
                              </>
                         )}

                         {/* Grouping Action Buttons */}
                         <div className="mt-2 flex flex-col gap-2">
                              {/* 1. Primary Action: Pesan via WA */}
                              {whatsapp && (
                                   <a
                                        href={buildWhatsAppUrl(
                                             whatsapp,
                                             `Halo Admin Raincarnation, saya tertarik menyewa ${name}. Mohon info ketersediaan dan tarifnya.`
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${selectLabel} via WhatsApp`}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp py-2.5 text-sm font-bold text-on-whatsapp shadow-sm transition-all hover:bg-whatsapp-hover active:scale-[0.98]"
                                   >
                                        <MessageSquareText size={18} aria-hidden="true" />
                                        <span className="truncate">{selectLabel}</span>
                                   </a>
                              )}

                              {/* 2. Secondary Action: Tombol Outlined Detail Unit */}
                              <Link
                                   href={`/sewa-mobil/${item.slug}`}
                                   className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-surface-container-high bg-transparent py-2 text-xs font-bold text-on-surface-variant transition-all hover:border-primary hover:bg-primary/5 hover:text-primary active:scale-[0.98]"
                              >
                                   <span>Detail &amp; Spesifikasi Unit</span>
                                   <ChevronRight size={14} aria-hidden="true" />
                              </Link>
                         </div>
                    </div>
               </div>
          </article>
     );
}