import Link from "next/link";
import {
     MessageSquareText,
     List,
     ShieldCheck,
     Handshake,
     Car,
     Headphones,
} from "lucide-react";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

export type FeatureItem = {
     icon: React.ReactNode;
     tag: string;
     title: string;
};

const defaultFeatures: FeatureItem[] = [
     {
          icon: <ShieldCheck className="size-5 text-primary" />,
          tag: "Verifikasi",
          title: "Proses Verifikasi Cepat",
     },
     {
          icon: <Handshake className="size-5 text-primary" />,
          tag: "Transparansi",
          title: "Tanpa Biaya Tersembunyi",
     },
     {
          icon: <Car className="size-5 text-primary" />,
          tag: "Garansi",
          title: "Unit Prima & Terawat",
     },
     {
          icon: <Headphones className="size-5 text-primary" />,
          tag: "CS Siaga",
          title: "Layanan Darurat 24 Jam",
     },
];

type SyaratLepasKunciHeroProps = {
     badge?: string;
     hero: {
          titleStart: string;
          titleHighlight: string;
          intro: string;
          whatsappLabel?: string;
          whatsappMessage: string;
     };
     whatsapp?: string;
     features?: FeatureItem[];
};

export default function SyaratLepasKunciHero({
     badge = "SYARAT & KETENTUAN LEPAS KUNCI",
     hero,
     whatsapp,
     features = defaultFeatures,
}: SyaratLepasKunciHeroProps) {
     return (
          <section className="relative w-full overflow-hidden border-b border-surface-container-high/30 bg-linear-to-b from-surface-container-high/50 via-surface to-surface pb-space-lg sm:pb-space-xl pt-space-md">
               <div className="mx-auto flex max-w-6xl flex-col items-start sm:items-center gap-space-md sm:gap-space-lg px-gutter pt-space-md text-left sm:text-center">
                    {/* Header Content */}
                    <div className="flex max-w-4xl flex-col items-start sm:items-center gap-space-md w-full">
                         {/* Eyebrow / Badge Pill */}
                         {badge && (
                              <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 font-label-sm text-xs font-semibold uppercase tracking-wider text-primary sm:mb-2">
                                   <span className="size-2 rounded-full bg-primary" />
                                   <span>{badge}</span>
                              </div>
                         )}

                         {/* Title */}
                         <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
                              {hero.titleStart}{" "}
                              {hero.titleHighlight && (
                                   <span className="text-primary-container inline">
                                        {hero.titleHighlight}
                                   </span>
                              )}
                         </h1>

                         {/* Deskripsi */}
                         <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                              {hero.intro}
                         </p>

                         {/* Action Buttons */}
                         <div className="mt-space-xs flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-space-md w-full">
                              {whatsapp && (
                                   <a
                                        href={buildWhatsAppUrl(whatsapp, hero.whatsappMessage)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full sm:w-[270px] whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-space-md py-3.5 font-label-md text-label-md font-bold text-on-primary shadow-md transition-all hover:bg-primary/90 active:scale-95"
                                   >
                                        <MessageSquareText size={18} aria-hidden="true" />
                                        <span>{hero.whatsappLabel ?? "Tanya Admin via WhatsApp"}</span>
                                   </a>
                              )}

                              {/* Tombol Lihat Syarat & Dokumen */}
                              <a
                                   href="#daftar-isi"
                                   className="w-full sm:w-[270px] whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-2xl border border-outline-variant/60 sm:border-gray-300 bg-surface-container-lowest px-space-md py-3.5 font-label-md text-label-md font-semibold text-on-surface shadow-xs transition-all hover:bg-surface-container-low hover:border-gray-400 active:scale-95"
                              >
                                   <List size={18} aria-hidden="true" />
                                   <span>Lihat Syarat & Dokumen</span>
                              </a>
                         </div>
                    </div>

                    {/* Feature Highlights Grid */}
                    <div className="w-full border-t border-surface-container-high/40 pt-space-md mt-2">
                         <div className="grid grid-cols-2 gap-space-xs sm:gap-space-sm lg:grid-cols-4">
                              {features.map((feat) => (
                                   <div
                                        key={feat.title}
                                        className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 rounded-2xl border border-surface-container-high/40 bg-surface-container-lowest/60 p-3 sm:p-3.5 text-center sm:text-left shadow-xs transition-all hover:border-primary/20"
                                   >
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                             {feat.icon}
                                        </div>
                                        <div className="flex min-w-0 flex-col items-center sm:items-start">
                                             <span className="font-label-sm text-[10px] sm:text-[11px] font-medium text-on-surface-variant">
                                                  {feat.tag}
                                             </span>
                                             <span className="font-body-md text-xs sm:text-sm font-bold leading-snug text-on-surface">
                                                  {feat.title}
                                             </span>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          </section>
     );
}