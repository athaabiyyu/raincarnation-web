import { MessageCircle } from "lucide-react";
import ArmadaCard from "@/components/sections/ArmadaCard";
import FleetCarousel from "@/components/ui/FleetCarousel";
import { sewaMobilFleet } from "@/constants/sewa-mobil";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import type { Armada } from "@/types/armada";

const IMAGE_SIZES =
     "(min-width: 1024px) 352px, (min-width: 768px) 50vw, 85vw";

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
          <section className="w-full bg-surface-container-low py-space-xl">
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
                         {armada.map((item) => (
                              <ArmadaCard
                                   key={item.id}
                                   item={item}
                                   whatsapp={whatsapp}
                                   imageSizes={IMAGE_SIZES}
                              />
                         ))}

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