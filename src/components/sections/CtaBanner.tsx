import { Bus, MessageSquareText, Zap } from "lucide-react";
import { ctaBannerContent } from "@/constants/cta-banner";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

type CtaBannerProps = {
     whatsapp: string;
};

export default function CtaBanner({ whatsapp }: CtaBannerProps) {
     const { badge, title, description, buttonLabel, whatsappMessage } =
          ctaBannerContent;

     return (
          <section className="w-full bg-surface pb-space-lg md:pb-space-xl">
               <div className="mx-auto max-w-6xl px-gutter">
                    <div className="relative overflow-hidden rounded-xl bg-linear-to-r from-primary via-tertiary to-primary-container p-space-lg text-on-primary shadow-xl lg:p-space-xl">
                         <Bus
                              size={160}
                              className="pointer-events-none absolute -bottom-4 right-0 opacity-10"
                              aria-hidden="true"
                         />

                         <div className="relative z-10 flex max-w-3xl flex-col items-start gap-space-md">
                              <div className="inline-flex items-center gap-1 rounded-full bg-on-primary/10 px-3 py-1 font-label-sm text-label-sm text-primary-fixed backdrop-blur-md">
                                   <Zap size={14} className="shrink-0" aria-hidden="true" />
                                   {badge}
                              </div>
                              <h2 className="font-headline-lg text-[1.625rem] leading-tight font-bold tracking-tight text-on-primary md:text-headline-lg">
                                   {title}
                              </h2>
                              <p className="font-body-md text-body-md text-surface-container-low md:font-body-lg md:text-body-lg">
                                   {description}
                              </p>
                              <a
                                   href={buildWhatsAppUrl(whatsapp, whatsappMessage)}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="mt-space-sm inline-flex w-full items-center justify-center gap-space-xs rounded-lg bg-whatsapp px-space-md py-space-md text-center font-label-lg text-label-lg text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all duration-150 hover:bg-whatsapp-hover sm:w-auto"
                              >
                                   <MessageSquareText
                                        size={22}
                                        className="shrink-0"
                                        aria-hidden="true"
                                   />
                                   {buttonLabel}
                              </a>
                         </div>
                    </div>
               </div>
          </section>
     );
}