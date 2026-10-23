import {
     BadgeCheck,
     MessageSquareText,
     ShieldCheck,
     Smile,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { berandaWhy } from "@/constants/beranda";
import type { BerandaWhyIcon } from "@/constants/beranda";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

type BerandaWhyProps = {
     whatsapp: string;
};

const whyIcons: Record<BerandaWhyIcon, LucideIcon> = {
     "badge-check": BadgeCheck,
     smile: Smile,
     "shield-check": ShieldCheck,
     "message-square-text": MessageSquareText,
};

export default function BerandaWhy({ whatsapp }: BerandaWhyProps) {
     const whatsappUrl = whatsapp
          ? buildWhatsAppUrl(whatsapp, berandaWhy.message)
          : null;

     return (
          <section className="w-full bg-surface py-space-xl">
               <div className="mx-auto max-w-6xl px-gutter">
                    <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-md lg:p-space-xl">
                         <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-12 lg:gap-y-space-md">
                              <div className="space-y-space-xs lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:self-end">
                                   <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                                        STANDAR KUALITAS TERTINGGI
                                   </span>
                                   <h2 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
                                        {berandaWhy.title}
                                   </h2>
                                   <p className="font-body-md text-body-md text-on-surface-variant">
                                        {berandaWhy.description}
                                   </p>
                              </div>

                              <ul className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-center">
                                   {berandaWhy.items.map((item) => {
                                        const Icon = whyIcons[item.icon];
                                        return (
                                             <li
                                                  key={item.title}
                                                  className="flex flex-row items-start gap-space-sm rounded-xl bg-surface-container-low p-space-md sm:flex-col"
                                             >
                                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                       <Icon size={20} aria-hidden="true" />
                                                  </div>
                                                  <div className="space-y-1">
                                                       <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                                            {item.title}
                                                       </h3>
                                                       <p className="font-body-sm text-body-sm text-on-surface-variant">
                                                            {item.description}
                                                       </p>
                                                  </div>
                                             </li>
                                        );
                                   })}
                              </ul>

                              {whatsappUrl && (
                                   <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-space-md py-space-sm font-label-md text-label-md text-on-primary shadow-sm transition-all hover:bg-primary/90 active:scale-95 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:w-auto lg:justify-self-start lg:self-start"
                                   >
                                        <MessageSquareText size={18} aria-hidden="true" />
                                        {berandaWhy.button}
                                   </a>
                              )}
                         </div>
                    </div>
               </div>
          </section>
     );
}