import { BadgeCheck, Calculator, MessageCircle } from "lucide-react";
import { sewaMobilHero } from "@/constants/sewa-mobil";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

type SewaMobilHeroProps = {
     whatsapp: string;
};

export default function SewaMobilHero({ whatsapp }: SewaMobilHeroProps) {
     const content = sewaMobilHero;

     return (
          <section className="relative w-full overflow-hidden border-b border-surface-container-high/30 bg-linear-to-b from-surface-container-high/50 via-surface to-surface pb-space-xl pt-space-md">
               <div className="mx-auto max-w-6xl px-gutter pt-space-lg">
                    <div className="mb-space-md flex flex-wrap items-center gap-space-xs text-on-surface-variant">
                         <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-lowest px-3 py-1 font-label-sm text-label-sm font-bold text-primary shadow-sm ring-1 ring-primary/20">
                              <BadgeCheck size={14} className="text-primary" />
                              {content.badge}
                         </span>
                         <span className="text-outline-variant">•</span>
                         <span className="font-label-sm text-label-sm font-medium text-on-surface-variant">
                              {content.tagline}
                         </span>
                         <span className="text-outline-variant">•</span>
                         <span className="rounded-full bg-primary-container/10 px-2 py-0.5 font-label-sm text-label-sm font-bold text-primary-container">
                              {content.highlightChip}
                         </span>
                    </div>

                    <div className="flex max-w-3xl flex-col gap-space-md">
                         <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
                              {content.titleStart}{" "}
                              <span className="text-primary underline decoration-primary-fixed decoration-[5px] underline-offset-8">
                                   {content.titleHighlight}
                              </span>
                              {content.titleEnd}
                         </h1>

                         <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
                              {content.description}
                         </p>

                         <div className="grid grid-cols-2 gap-space-sm pt-space-xs sm:grid-cols-3">
                              {content.stats.map((stat, index) => (
                                   <div
                                        key={stat.label}
                                        className={`flex flex-col rounded-2xl border border-surface-container-high/60 bg-surface-container-lowest p-space-md shadow-[0_4px_16px_rgba(18,28,44,0.04)] ${index === 2 ? "col-span-2 sm:col-span-1" : ""
                                             }`}
                                   >
                                        <span className="font-headline-md text-headline-md font-extrabold tracking-tight text-primary">
                                             {stat.value}
                                        </span>
                                        <span className="mt-0.5 font-label-sm text-label-sm font-medium text-on-surface-variant">
                                             {stat.label}
                                        </span>
                                   </div>
                              ))}
                         </div>

                         <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                              <a
                                   href={content.primaryCta.href}
                                   className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-space-lg py-3 font-label-lg text-label-lg text-on-primary shadow-md transition-all hover:bg-primary-container hover:shadow-lg active:scale-95"
                              >
                                   <Calculator size={20} />
                                   {content.primaryCta.label}
                              </a>

                              {whatsapp && (
                                   <a
                                        href={buildWhatsAppUrl(whatsapp, content.whatsappCta.message)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-space-lg py-3 font-label-lg text-label-lg text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all hover:bg-whatsapp-hover active:scale-95"
                                   >
                                        <MessageCircle size={20} />
                                        {content.whatsappCta.label}
                                   </a>
                              )}
                         </div>
                    </div>
               </div>
          </section>
     );
}