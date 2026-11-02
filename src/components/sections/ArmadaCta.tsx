import { Check, MessageCircle } from "lucide-react";
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

                         {/* Konten Teks: Align center di mobile, kembali rata kiri di lg */}
                         <div className="flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left gap-space-sm">
                              <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight">
                                   {armadaCta.title}
                              </h2>
                              <p className="font-body-lg text-body-lg text-surface-container-high">
                                   {armadaCta.description}
                              </p>

                              {/* Daftar Check / Poin: Align center di mobile */}
                              <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-space-md pt-2 font-label-sm text-label-sm font-medium text-surface-container">
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

                         {/* Tombol Aksi: Background putih, teks hijau (primary), align center di mobile */}
                         <div className="flex w-full shrink-0 flex-col items-center lg:items-end gap-space-sm lg:w-auto">
                              <a
                                   href={whatsappUrl}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-space-xl py-space-md text-center font-label-lg text-label-lg font-bold text-primary shadow-md transition-all hover:bg-white/90 active:scale-95"
                              >
                                   <MessageCircle size={22} aria-hidden="true" />
                                   <span>{armadaCta.buttonLabel}</span>
                              </a>
                         </div>

                    </div>
               </div>
          </section>
     );
}