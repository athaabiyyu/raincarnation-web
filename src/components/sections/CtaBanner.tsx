import { BadgeCheck, Bus, MessageSquareText, Zap } from "lucide-react";
import { ctaBannerContent } from "@/constants/cta-banner";
import { formatPhoneDisplay } from "@/utils/format-phone";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

type CtaBannerProps = {
     whatsapp: string;
};

export default function CtaBanner({ whatsapp }: CtaBannerProps) {
     const {
          badge,
          title,
          description,
          perks,
          buttonLabel,
          whatsappMessage,
          numberLabel,
          numberNote,
     } = ctaBannerContent;

     return (
          <section className="w-full bg-surface px-gutter pb-space-lg md:pb-space-xl">
               <div className="mx-auto max-w-6xl">
                    <div className="relative overflow-hidden rounded-xl bg-linear-to-r from-primary via-tertiary to-primary-container p-space-md text-on-primary shadow-xl md:p-space-lg lg:p-space-xl">
                         <Bus
                              size={160}
                              className="pointer-events-none absolute -bottom-4 right-0 opacity-10"
                              aria-hidden="true"
                         />

                         <div className="relative z-10 grid grid-cols-1 items-center gap-space-lg lg:grid-cols-12">
                              <div className="space-y-space-sm lg:col-span-8">
                                   <div className="inline-flex items-center gap-1 rounded-full bg-on-primary/10 px-3 py-1 font-label-sm text-label-sm text-primary-fixed backdrop-blur-md">
                                        <Zap size={14} className="shrink-0" aria-hidden="true" />
                                        {badge}
                                   </div>
                                   <h2 className="font-headline-lg text-headline-lg font-bold tracking-tight text-on-primary">
                                        {title}
                                   </h2>
                                   <p className="max-w-2xl font-body-lg text-body-lg text-surface-container-low">
                                        {description}
                                   </p>
                                   <div className="flex flex-wrap items-center gap-x-space-md gap-y-space-xs pt-space-xs font-label-sm text-label-sm text-surface-container-high">
                                        {perks.map((perk) => (
                                             <span key={perk} className="flex items-center gap-1">
                                                  <BadgeCheck
                                                       size={16}
                                                       className="shrink-0 text-primary-fixed"
                                                       aria-hidden="true"
                                                  />
                                                  {perk}
                                             </span>
                                        ))}
                                   </div>
                              </div>

                              <div className="flex flex-col gap-space-sm lg:col-span-4 lg:items-end">
                                   <a
                                        href={buildWhatsAppUrl(whatsapp, whatsappMessage)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-space-xs rounded-lg bg-whatsapp px-space-md py-space-md text-center font-label-lg text-label-lg text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all duration-150 hover:bg-whatsapp-hover sm:w-auto"
                                   >
                                        <MessageSquareText
                                             size={22}
                                             className="shrink-0"
                                             aria-hidden="true"
                                        />
                                        {buttonLabel}
                                   </a>
                                   <div className="text-center font-label-sm text-label-sm text-surface-container-low lg:text-right">
                                        {numberLabel} <strong>{formatPhoneDisplay(whatsapp)}</strong>{" "}
                                        {numberNote}
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}