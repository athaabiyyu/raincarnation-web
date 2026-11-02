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
          <section className="relative w-full overflow-hidden bg-linear-to-r from-primary via-tertiary to-primary-container text-on-primary">
               <div className="relative mx-auto max-w-6xl px-gutter py-space-lg sm:py-space-xl">
                    <Bus
                         size={160}
                         className="pointer-events-none absolute -bottom-3 right-6 h-24 w-24 opacity-10 sm:-bottom-4 sm:h-40 sm:w-40"
                         aria-hidden="true"
                    />

                    {/* Diubah menjadi items-center dan text-center agar rata tengah */}
                    <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center gap-space-sm sm:gap-space-md">
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
                              // Perubahan pada tombol: bg-white (putih), text-emerald-800 (hijau tua), px-5 py-2.5 (lebih ramping/kecil)
                              className="mt-space-xs inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-center font-label-md text-label-md font-semibold text-emerald-800 shadow-md transition-all duration-150 hover:bg-slate-100 sm:mt-space-sm sm:w-auto"
                         >
                              <MessageSquareText
                                   size={18}
                                   className="shrink-0"
                                   aria-hidden="true"
                              />
                              {buttonLabel}
                         </a>
                    </div>
               </div>
          </section>
     );
}