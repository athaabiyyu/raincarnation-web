import Image from "next/image";
import { Armchair, ArrowRight, Luggage, MessageCircle } from "lucide-react";
import FleetCarousel from "@/components/ui/FleetCarousel";
import { sewaMobilFleet } from "@/constants/sewa-mobil";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import { formatPrice } from "@/utils/format-price";
import type { Armada } from "@/types/armada";

type SewaMobilFleetProps = {
     armada: Armada[];
     whatsapp: string;
};

export default function SewaMobilFleet({
     armada,
     whatsapp,
}: SewaMobilFleetProps) {
     if (armada.length === 0) return null;

     const { customCard } = sewaMobilFleet;

     return (
          <section className="w-full bg-surface py-space-xl">
               <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-gutter">
                    <div className="flex flex-col gap-1">
                         <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-primary">
                              {sewaMobilFleet.eyebrow}
                         </span>
                         <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                              {sewaMobilFleet.title}
                         </h2>
                         <p className="max-w-2xl font-body-md text-body-md leading-relaxed text-on-surface-variant">
                              {sewaMobilFleet.description}
                         </p>
                    </div>

                    <FleetCarousel>
                         {armada.map((item) => {
                              const name = capitalizeFirst(decodeHtml(item.title));
                              const label = capitalizeFirst(
                                   decodeHtml(item.acf?.label ?? ""),
                              );
                              const seats = capitalizeFirst(
                                   decodeHtml(item.acf?.jumlah_penumpang ?? ""),
                              );
                              const luggage = capitalizeFirst(
                                   decodeHtml(item.acf?.koper ?? ""),
                              );
                              const description = capitalizeFirst(
                                   decodeHtml(item.excerpt ?? ""),
                              );
                              const price = formatPrice(item.acf?.harga);
                              const imageUrl = item.featured_image?.url;

                              return (
                                   <article
                                        key={item.id}
                                        className="flex flex-col overflow-hidden rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest shadow-[0_4px_20px_rgba(18,28,44,0.06)] transition-all duration-300 hover:shadow-2xl"
                                   >
                                        {imageUrl ? (
                                             <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                                                  <Image
                                                       src={imageUrl}
                                                       alt={item.featured_image?.alt || name}
                                                       fill
                                                       sizes="(min-width: 1024px) 352px, (min-width: 768px) 50vw, 85vw"
                                                       className="object-cover"
                                                  />
                                                  {label && (
                                                       <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 font-label-sm text-label-sm font-bold tracking-wide text-on-primary shadow-md">
                                                            {label}
                                                       </span>
                                                  )}
                                             </div>
                                        ) : null}

                                        <div className="flex flex-1 flex-col justify-between p-space-lg">
                                             <div className="flex flex-col gap-space-xs">
                                                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                                       {name}
                                                  </h3>
                                                  {description && (
                                                       <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                                                            {description}
                                                       </p>
                                                  )}
                                                  {(seats || luggage) && (
                                                       <div className="grid grid-cols-2 gap-2.5 pt-2">
                                                            {seats && (
                                                                 <div className="flex items-center gap-2.5 rounded-xl border border-surface-container-high/50 bg-surface-container-low p-2.5">
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
                                                                 <div className="flex items-center gap-2.5 rounded-xl border border-surface-container-high/50 bg-surface-container-low p-2.5">
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
                                                  <div className="mt-space-md flex items-center justify-between gap-space-sm border-t border-surface-container-high/60 pt-space-md">
                                                       {price ? (
                                                            <div>
                                                                 <span className="block font-label-sm text-label-sm font-medium text-on-surface-variant">
                                                                      Mulai
                                                                 </span>
                                                                 <span className="font-headline-sm text-headline-sm font-extrabold tracking-tight text-primary">
                                                                      {price}
                                                                 </span>
                                                            </div>
                                                       ) : (
                                                            <span />
                                                       )}
                                                       {whatsapp && (
                                                            <a
                                                                 href={buildWhatsAppUrl(
                                                                      whatsapp,
                                                                      `Halo Admin Raincarnation, saya tertarik carter armada ${name}.`,
                                                                 )}
                                                                 target="_blank"
                                                                 rel="noopener noreferrer"
                                                                 aria-label={`Pilih unit ${name} via WhatsApp`}
                                                                 className="inline-flex items-center gap-1.5 rounded-xl bg-whatsapp px-space-md py-2.5 font-label-sm text-label-sm font-bold text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all hover:bg-whatsapp-hover"
                                                            >
                                                                 {sewaMobilFleet.selectLabel}
                                                                 <ArrowRight size={16} aria-hidden="true" />
                                                            </a>
                                                       )}
                                                  </div>
                                             )}
                                        </div>
                                   </article>
                              );
                         })}

                         <div className="flex flex-col justify-between rounded-3xl bg-linear-to-br from-primary via-primary to-primary-container p-space-lg text-on-primary shadow-xl ring-1 ring-primary-container/30">
                              <div className="flex flex-col gap-space-xs">
                                   <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest opacity-85">
                                        {customCard.eyebrow}
                                   </span>
                                   <h3 className="font-headline-sm text-headline-sm font-extrabold tracking-tight text-on-primary">
                                        {customCard.title}
                                   </h3>
                                   <p className="font-body-sm text-body-sm leading-relaxed opacity-90">
                                        {customCard.description}
                                   </p>
                              </div>
                              {whatsapp && (
                                   <a
                                        href={buildWhatsAppUrl(whatsapp, customCard.message)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-space-md inline-flex w-full items-center justify-center gap-2 rounded-xl bg-surface-container-lowest px-space-md py-3 font-label-md text-label-md font-bold text-primary shadow-lg transition-all hover:bg-surface-container-high"
                                   >
                                        <MessageCircle size={18} aria-hidden="true" />
                                        {customCard.buttonLabel}
                                   </a>
                              )}
                         </div>
                    </FleetCarousel>
               </div>
          </section>
     );
}