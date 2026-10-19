import Image from "next/image";
import { Armchair, Luggage, MessageSquareText } from "lucide-react";
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
     showAllInPrice = true,
}: ArmadaCardProps) {
     const name = capitalizeFirst(decodeHtml(item.title));
     const label = capitalizeFirst(decodeHtml(item.acf?.label ?? ""));
     const seats = capitalizeFirst(decodeHtml(item.acf?.jumlah_penumpang ?? ""));
     const luggage = capitalizeFirst(decodeHtml(item.acf?.koper ?? ""));
     const price = formatPrice(item.acf?.harga);
     const priceAllIn = formatPrice(item.acf?.harga_all_in);
     const rawImageUrl = item.featured_image?.url;
     const imageUrl = rawImageUrl ? rawImageUrl.replace(/^http:\/\//i, "https://") : undefined;

     // Teks label tombol dinamis menggunakan nama armada dari CMS
     const selectLabel = `Pilih Unit ${name}`;

     return (
          <article className="@container flex h-full flex-col overflow-hidden rounded-2xl border border-surface-container-high/60 bg-surface-container-lowest shadow-sm transition-all duration-300 hover:shadow-xl">
               {/* Gambar Armada */}
               {imageUrl ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                         <Image
                              src={imageUrl}
                              alt={item.featured_image?.alt || name}
                              fill
                              sizes={imageSizes}
                              className="object-cover transition-transform duration-500 hover:scale-105"
                         />
                         {label && (
                              <span className="absolute right-3 top-3 rounded-full bg-primary/90 backdrop-blur-md px-3 py-1 font-label-sm text-xs font-semibold text-on-primary shadow-sm">
                                   {label}
                              </span>
                         )}
                    </div>
               ) : null}

               {/* Konten Kartu */}
               <div className="flex flex-1 flex-col justify-between p-4 @xs:p-5">
                    <div className="flex flex-col gap-3">
                         {/* Judul Armada */}
                         <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                              {name}
                         </h3>

                         {/* Fasilitas / Fitur (Kapasitas & Koper) - Menyesuaikan Ukuran Teks */}
                         {(seats || luggage) && (
                              <div className="flex flex-wrap items-center gap-2">
                                   {seats && (
                                        <div className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100/70 px-3 py-1.5 text-xs font-medium text-slate-700">
                                             <Armchair size={15} className="shrink-0 text-slate-500" aria-hidden="true" />
                                             <span>{seats}</span>
                                        </div>
                                   )}
                                   {luggage && (
                                        <div className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100/70 px-3 py-1.5 text-xs font-medium text-slate-700">
                                             <Luggage size={15} className="shrink-0 text-slate-500" aria-hidden="true" />
                                             <span>{luggage}</span>
                                        </div>
                                   )}
                              </div>
                         )}
                    </div>

                    {/* Section Pilihan Paket Tarif */}
                    <div className="mt-5 flex flex-col gap-3">
                         {/* Label Header Paket */}
                         <div className="flex items-center justify-between text-[11px] font-bold tracking-wider">
                              <span className="text-on-surface-variant uppercase">PILIHAN PAKET TARIF</span>
                              <span className="text-emerald-600">Transparan &amp; Hemat</span>
                         </div>

                         {/* Card Opsi Harga (Grid Side-by-Side) */}
                         <div className="grid grid-cols-2 gap-2.5">
                              {/* Opsi 1: Lepas Kunci */}
                              <div className="relative flex flex-col justify-between rounded-2xl border border-surface-container-high/60 bg-surface-container-lowest p-3 shadow-sm">
                                   <div>
                                        <div className="flex items-center justify-between gap-1">
                                             <span className="text-xs font-bold text-on-surface">Lepas Kunci</span>
                                             <span className="rounded bg-surface-container-high/50 px-1.5 py-0.5 text-[9px] font-medium text-on-surface-variant">
                                                  Self Drive
                                             </span>
                                        </div>
                                        <div className="mt-2 text-base font-extrabold text-on-surface">
                                             {price || "Rp -"}
                                        </div>
                                   </div>
                                   <span className="mt-1 text-[10px] text-on-surface-variant">per 12 jam</span>
                              </div>

                              {/* Opsi 2: All In (Featured Card) */}
                              <div className="relative flex flex-col justify-between rounded-2xl border-2 border-emerald-500/80 bg-emerald-50/20 p-3 shadow-sm">
                                   {/* Floating Badge Praktis */}
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
                                             {priceAllIn || "Rp -"}
                                        </div>
                                   </div>
                                   <span className="mt-1 text-[10px] text-emerald-700/80">per hari (fullday)</span>
                              </div>
                         </div>

                         {/* Tombol WhatsApp dengan Teks Dinamis */}
                         {whatsapp && (
                              <a
                                   href={buildWhatsAppUrl(
                                        whatsapp,
                                        `Halo Admin Raincarnation, saya tertarik carter armada ${name}.`
                                   )}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   aria-label={`${selectLabel} via WhatsApp`}
                                   className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp py-2.5 text-sm font-bold text-on-whatsapp shadow-sm transition-all hover:bg-whatsapp-hover active:scale-[0.98]"
                              >
                                   <MessageSquareText size={18} aria-hidden="true" />
                                   <span className="truncate">{selectLabel}</span>
                              </a>
                         )}
                    </div>
               </div>
          </article>
     );
}