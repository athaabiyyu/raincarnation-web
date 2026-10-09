import Image from "next/image";
import { Armchair, Luggage } from "lucide-react";
import { armadaCatalog } from "@/constants/armada";
import type { Armada } from "@/types/armada";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import { formatPrice } from "@/utils/format-price";

type ArmadaCatalogProps = {
     armada: Armada[];
     whatsapp: string;
};

export default function ArmadaCatalog({
     armada,
     whatsapp,
}: ArmadaCatalogProps) {
     if (armada.length === 0) return null;

     return (
          <section
               id={armadaCatalog.id}
               className="mx-auto w-full max-w-6xl scroll-mt-32 px-gutter pt-space-xl"
          >
               <div className="pb-space-lg">
                    <p className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-primary">
                         {armadaCatalog.eyebrow}
                    </p>
                    <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                         {armadaCatalog.title}
                    </h2>
               </div>

               <ul className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
                    {armada.map((item) => {
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

                         return (
                              <li key={item.id} className="flex">
                                   <article className="flex w-full flex-col overflow-hidden rounded-2xl border border-surface-container bg-surface-container-lowest shadow-sm transition-shadow hover:shadow-xl">
                                        {imageUrl && (
                                             <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-dim">
                                                  <Image
                                                       src={imageUrl}
                                                       alt={item.featured_image?.alt || name}
                                                       fill
                                                       sizes="(min-width: 1024px) 560px, 100vw"
                                                       className="object-cover object-center"
                                                  />
                                                  <div
                                                       aria-hidden="true"
                                                       className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20"
                                                  />
                                                  {label && (
                                                       <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 font-label-sm text-label-sm font-semibold text-on-primary shadow-md">
                                                            {label}
                                                       </span>
                                                  )}
                                                  {(seats || luggage) && (
                                                       <div className="absolute bottom-4 right-4 flex flex-wrap items-center justify-end gap-2">
                                                            {seats && (
                                                                 <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-inverse-surface/90 px-3 py-1.5 font-label-sm text-label-sm font-bold text-inverse-on-surface shadow-md">
                                                                      <Armchair
                                                                           size={14}
                                                                           className="text-primary-fixed"
                                                                           aria-hidden="true"
                                                                      />
                                                                      {seats}
                                                                 </span>
                                                            )}
                                                            {luggage && (
                                                                 <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-inverse-surface/90 px-3 py-1.5 font-label-sm text-label-sm font-bold text-inverse-on-surface shadow-md">
                                                                      <Luggage
                                                                           size={14}
                                                                           className="text-primary-fixed"
                                                                           aria-hidden="true"
                                                                      />
                                                                      {luggage}
                                                                 </span>
                                                            )}
                                                       </div>
                                                  )}
                                             </div>
                                        )}

                                        <div className="flex flex-1 flex-col justify-between gap-space-md p-space-lg">
                                             <div className="flex flex-col gap-space-xs">
                                                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                                       {name}
                                                  </h3>
                                                  {description && (
                                                       <p className="font-body-sm text-body-sm text-on-surface-variant">
                                                            {description}
                                                       </p>
                                                  )}
                                             </div>

                                             {(price || whatsappUrl) && (
                                                  <div className="flex items-center justify-between gap-space-md border-t border-surface-container pt-space-sm">
                                                       {price ? (
                                                            <div>
                                                                 <p className="font-label-sm text-label-sm font-bold uppercase tracking-wide text-on-surface-variant">
                                                                      {armadaCatalog.priceLabel}
                                                                 </p>
                                                                 <p className="font-label-lg text-label-lg font-bold text-primary">
                                                                      {price}
                                                                 </p>
                                                            </div>
                                                       ) : (
                                                            <span />
                                                       )}
                                                       {whatsappUrl && (
                                                            <a
                                                                 href={whatsappUrl}
                                                                 target="_blank"
                                                                 rel="noopener noreferrer"
                                                                 className="inline-flex items-center justify-center rounded-xl bg-whatsapp px-space-md py-space-xs font-label-md text-label-md font-semibold text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all hover:bg-whatsapp-hover active:scale-95"
                                                            >
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
          </section>
     );
}