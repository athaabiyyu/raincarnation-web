import { Check, Headset, MessageCircle } from "lucide-react";
import { armadaCta } from "@/constants/armada";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

type ArmadaCtaProps = {
     whatsapp: string;
};

export default function ArmadaCta({ whatsapp }: ArmadaCtaProps) {
     if (!whatsapp) return null;

     const whatsappUrl = buildWhatsAppUrl(whatsapp, armadaCta.message);

     return (
          <section className="w-full bg-linear-to-br from-primary via-primary to-on-primary-fixed-variant py-space-xl text-on-primary">
               <div className="mx-auto max-w-6xl px-gutter">
                    <div className="flex flex-col items-center justify-between gap-space-xl rounded-3xl border border-white/15 bg-surface-container-lowest/10 p-space-xl shadow-xl backdrop-blur-xl lg:flex-row">
                         <div className="flex max-w-2xl flex-col gap-space-sm">
                              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-1 font-label-sm text-label-sm font-bold text-on-primary-fixed shadow-sm">
                                   <Headset size={16} aria-hidden="true" />
                                   {armadaCta.badge}
                              </span>
                              <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight">
                                   {armadaCta.title}
                              </h2>
                              <p className="font-body-lg text-body-lg text-surface-container-high">
                                   {armadaCta.description}
                              </p>
                              <ul className="flex flex-wrap items-center gap-space-md pt-2 font-label-sm text-label-sm font-medium text-surface-container">
                                   {armadaCta.checks.map((check) => (
                                        <li key={check} className="flex items-center gap-1">
                                             <Check
                                                  size={14}
                                                  className="text-primary-fixed"
                                                  aria-hidden="true"
                                             />
                                             {check}
                                        </li>
                                   ))}
                              </ul>
                         </div>

                         <div className="flex w-full shrink-0 flex-col gap-space-sm sm:flex-row lg:w-auto lg:flex-col">
                              <a
                                   href={whatsappUrl}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-space-xl py-space-md text-center font-label-lg text-label-lg font-bold text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all hover:bg-whatsapp-hover active:scale-95"
                              >
                                   <MessageCircle size={22} aria-hidden="true" />
                                   {armadaCta.buttonLabel}
                              </a>
                              <p className="text-center font-label-sm text-label-sm text-surface-container-high">
                                   {armadaCta.note}
                              </p>
                         </div>
                    </div>
               </div>
          </section>
     );
}