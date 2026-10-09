import {
     Armchair,
     BadgeCheck,
     CalendarCheck,
     Car,
     Fan,
     Smile,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { armadaHero } from "@/constants/armada";
import type { ArmadaStatIcon } from "@/constants/armada";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

type ArmadaHeroProps = {
     whatsapp: string;
};

const statIcons: Record<ArmadaStatIcon, LucideIcon> = {
     "badge-check": BadgeCheck,
     fan: Fan,
     smile: Smile,
     armchair: Armchair,
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
                    <div className="grid grid-cols-1 items-center gap-gutter lg:grid-cols-12">
                         <div className="flex flex-col gap-space-md lg:col-span-7">
                              <span className="inline-flex w-fit items-center gap-space-xs rounded-full border border-primary/20 bg-primary-container/15 px-space-sm py-1 font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                                   <BadgeCheck size={14} aria-hidden="true" />
                                   {armadaHero.badge}
                              </span>

                              <h1 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                                   {armadaHero.title}
                              </h1>

                              <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
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

                         <div className="lg:col-span-5">
                              <ul className="grid grid-cols-2 gap-space-sm">
                                   {armadaHero.stats.map((stat) => {
                                        const Icon = statIcons[stat.icon];
                                        return (
                                             <li
                                                  key={stat.label}
                                                  className="flex flex-col gap-1 rounded-2xl border border-surface-container bg-surface-container-lowest p-space-md shadow-sm transition-all hover:border-primary/40"
                                             >
                                                  <div className="flex items-center justify-between">
                                                       <Icon
                                                            size={28}
                                                            className="text-primary"
                                                            aria-hidden="true"
                                                       />
                                                       <span className="rounded bg-primary/10 px-1.5 py-0.5 font-label-sm text-label-sm font-bold uppercase tracking-wide text-primary">
                                                            {stat.tag}
                                                       </span>
                                                  </div>
                                                  <p className="font-display text-display font-extrabold leading-none tracking-tight text-primary">
                                                       {stat.value}
                                                  </p>
                                                  <p className="font-label-sm text-label-sm font-medium text-on-surface-variant">
                                                       {stat.label}
                                                  </p>
                                             </li>
                                        );
                                   })}
                              </ul>
                         </div>
                    </div>
               </div>
          </section>
     );
}