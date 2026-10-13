import { CalendarCheck, Car } from "lucide-react";
import { armadaHero } from "@/constants/armada";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

type ArmadaHeroProps = {
     whatsapp: string;
};

export default function ArmadaHero({ whatsapp }: ArmadaHeroProps) {
     const whatsappUrl = whatsapp
          ? buildWhatsAppUrl(whatsapp, armadaHero.primaryMessage)
          : null;

     return (
          <section className="relative w-full overflow-hidden border-b border-surface-container bg-surface-container-low py-space-xl">
               <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-container/10 blur-3xl"
               />
               <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-secondary-fixed/30 blur-2xl"
               />

               <div className="relative z-10 mx-auto max-w-6xl px-gutter">
                    <div className="flex max-w-3xl flex-col gap-space-md">
                         <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
                              {armadaHero.title}
                         </h1>

                         <p className="font-body-lg text-body-lg text-on-surface-variant">
                              {armadaHero.description}
                         </p>

                         <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                              {whatsappUrl && (
                                   <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl bg-whatsapp px-space-lg py-space-sm font-label-md text-label-md text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all hover:bg-whatsapp-hover active:scale-95"
                                   >
                                        <CalendarCheck size={18} aria-hidden="true" />
                                        {armadaHero.primaryButton}
                                   </a>
                              )}
                              <a
                                   href="#katalog-armada"
                                   className="inline-flex items-center gap-2 rounded-xl border border-surface-container bg-surface-container-lowest px-space-md py-space-sm font-label-md text-label-md text-primary shadow-sm transition-all hover:bg-surface-container"
                              >
                                   <Car size={18} aria-hidden="true" />
                                   {armadaHero.secondaryButton}
                              </a>
                         </div>
                    </div>
               </div>
          </section>
     );
}