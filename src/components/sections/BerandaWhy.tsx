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
          <section className="w-full bg-surface-container-low py-space-xl">
               <div className="mx-auto max-w-6xl px-gutter">
                    <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-md sm:p-space-lg lg:p-space-xl">
                         <div className="grid grid-cols-1 gap-space-md lg:grid-cols-12 lg:gap-x-space-lg lg:gap-y-space-md">

                              {/* Header Teks: Rata tengah di mobile, rata kiri di desktop (lg) */}
                              <div className="space-y-space-xs text-center lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:self-end lg:text-left">
                                   <span className="mb-0.5 font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                                        {berandaWhy.eyebrow}
                                   </span>
                                   <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                                        {berandaWhy.title}
                                   </h2>
                                   <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant pt-1">
                                        {berandaWhy.description}
                                   </p>
                              </div>

                              {/* Kartu Keunggulan: Rata tengah di mobile (items-center text-center), kembali ke kiri di desktop (items-start text-left) */}
                              <ul className="grid grid-cols-1 gap-space-sm sm:grid-cols-2 sm:gap-space-md lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-center">
                                   {berandaWhy.items.map((item) => {
                                        const Icon = whyIcons[item.icon];
                                        return (
                                             <li
                                                  key={item.title}
                                                  className="flex flex-col items-center text-center gap-space-sm rounded-xl bg-surface-container-low p-space-md lg:items-start lg:text-left"
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

                              {/* Tombol WhatsApp: Center di mobile, rata kiri di desktop */}
                              {whatsappUrl && (
                                   <div className="flex justify-center lg:justify-start lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:self-start">
                                        <a
                                             href={whatsappUrl}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-center font-label-md text-label-md font-bold text-on-primary shadow-md transition-all hover:bg-primary/90 active:scale-95"
                                        >
                                             <MessageSquareText size={18} aria-hidden="true" />
                                             {berandaWhy.button}
                                        </a>
                                   </div>
                              )}
                         </div>
                    </div>
               </div>
          </section>
     );
}