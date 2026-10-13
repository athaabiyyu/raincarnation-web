import Image from "next/image";
import { Armchair, Luggage, MessageSquareText } from "lucide-react";
import type { Armada } from "@/types/armada";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import { formatPrice } from "@/utils/format-price";

// Teks sementara di komponen (nanti dipindah ke constants/)
const PRICE_LABEL = "Mulai";
const SELECT_LABEL = "Pilih Unit";

type ArmadaCardProps = {
     item: Armada;
     whatsapp: string;
     imageSizes: string;
};

export default function ArmadaCard({
     item,
     whatsapp,
     imageSizes,
}: ArmadaCardProps) {
     const name = capitalizeFirst(decodeHtml(item.title));
     const label = capitalizeFirst(decodeHtml(item.acf?.label ?? ""));
     const seats = capitalizeFirst(decodeHtml(item.acf?.jumlah_penumpang ?? ""));
     const luggage = capitalizeFirst(decodeHtml(item.acf?.koper ?? ""));
     const price = formatPrice(item.acf?.harga);
     const imageUrl = item.featured_image?.url;

     return (
          <article className="@container flex h-full flex-col overflow-hidden rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest shadow-[0_4px_20px_rgba(18,28,44,0.06)] transition-all duration-300 hover:shadow-2xl">
               {imageUrl ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                         <Image
                              src={imageUrl}
                              alt={item.featured_image?.alt || name}
                              fill
                              sizes={imageSizes}
                              className="object-cover"
                         />
                         {label && (
                              <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 font-label-sm text-label-sm font-bold tracking-wide text-on-primary shadow-md">
                                   {label}
                              </span>
                         )}
                    </div>
               ) : null}

               <div className="flex flex-1 flex-col justify-between p-space-md @xs:p-space-lg">
                    <div className="flex flex-col gap-space-xs">
                         <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                              {name}
                         </h3>
                         {(seats || luggage) && (
                              <div className="grid grid-cols-2 gap-2 pt-2 md:gap-2.5">
                                   {seats && (
                                        <div className="flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xl border border-surface-container-high/50 bg-surface-container-low p-2.5">
                                             <Armchair
                                                  size={18}
                                                  className="shrink-0 text-primary"
                                                  aria-hidden="true"
                                             />
                                             <span className="font-label-sm text-label-sm font-bold text-on-surface">
                                                  {seats}
                                             </span>
                                        </div>
                                   )}
                                   {luggage && (
                                        <div className="flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xl border border-surface-container-high/50 bg-surface-container-low p-2.5">
                                             <Luggage
                                                  size={18}
                                                  className="shrink-0 text-primary"
                                                  aria-hidden="true"
                                             />
                                             <span className="font-label-sm text-label-sm font-bold text-on-surface">
                                                  {luggage}
                                             </span>
                                        </div>
                                   )}
                              </div>
                         )}
                    </div>

                    {(price || whatsapp) && (
                         <div className="mt-space-md flex flex-col gap-space-sm border-t border-surface-container-high/60 pt-space-md @xs:flex-row @xs:items-center @xs:justify-between">
                              {price ? (
                                   <div>
                                        <span className="block font-label-sm text-label-sm font-medium text-on-surface-variant">
                                             {PRICE_LABEL}
                                        </span>
                                        <span className="whitespace-nowrap font-headline-sm text-headline-sm font-extrabold tracking-tight text-primary">
                                             {price}
                                        </span>
                                   </div>
                              ) : null}
                              {whatsapp && (
                                   <a
                                        href={buildWhatsAppUrl(
                                             whatsapp,
                                             `Halo Admin Raincarnation, saya tertarik carter armada ${name}.`,
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Pilih unit ${name} via WhatsApp`}
                                        className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-whatsapp px-space-lg py-3 font-label-md text-label-md font-bold text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all hover:bg-whatsapp-hover @xs:ml-auto @xs:w-auto"
                                   >
                                        <MessageSquareText size={18} aria-hidden="true" />
                                        {SELECT_LABEL}
                                   </a>
                              )}
                         </div>
                    )}
               </div>
          </article>
     );
}