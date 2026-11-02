import Link from "next/link";
import {
     MessageSquareText,
     ChevronDown,
     CheckCircle,
     UserCheck,
     Clock,
     ShieldCheck,
} from "lucide-react";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

type FeatureItem = {
     icon: React.ReactNode;
     tag: string;
     title: string;
};

const defaultFeatures: FeatureItem[] = [
     {
          icon: <CheckCircle className="size-5 text-primary" />,
          tag: "Garansi",
          title: "Unit Bersih & Terawat",
     },
     {
          icon: <UserCheck className="size-5 text-primary" />,
          tag: "Layanan Sopir",
          title: "Ramah & Paham Rute",
     },
     {
          icon: <Clock className="size-5 text-primary" />,
          tag: "CS Siaga",
          title: "Fast Response 24 Jam",
     },
     {
          icon: <ShieldCheck className="size-5 text-primary" />,
          tag: "Transparansi",
          title: "Tanpa Biaya Tersembunyi",
     },
];

type SewaMobilCityHeroProps = {
     badge?: string;
     titleStart?: string;
     titleHighlight?: string;
     titleEnd?: string;
     intro: string;
     note?: {
          before: string;
          linkLabel: string;
          href: string;
          after?: string;
     };
     whatsapp?: string;
     whatsappMessage: string;
     fleetAnchorId?: string;
};

export default function SewaMobilCityHero({
     badge = "RENTAL MOBIL TERPERCAYA DI JAWA TIMUR",
     titleStart = "Sewa Mobil Malang & Batu",
     titleHighlight = "Lepas Kunci atau dengan Sopir",
     titleEnd = "",
     intro,
     note,
     whatsapp,
     whatsappMessage,
     fleetAnchorId = "#pilihan-armada",
}: SewaMobilCityHeroProps) {
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
                              {titleStart}{" "}
                              {titleHighlight && (
                                   <span className="text-primary-container inline">
                                        {titleHighlight}
                                   </span>
                              )}
                              {titleEnd && <span> {titleEnd}</span>}
                         </h1>

                         {/* Deskripsi */}
                         <p className="max-w-none font-body-lg text-body-lg text-on-surface-variant">
                              {intro}
                         </p>

                         {/* Catatan / Note (jika ada) */}
                         {note && (
                              <p className="max-w-none font-body-md text-body-md text-on-surface-variant">
                                   {note.before}{" "}
                                   <Link
                                        href={note.href}
                                        className="font-bold text-primary underline underline-offset-4 transition-colors hover:text-primary-container"
                                   >
                                        {note.linkLabel}
                                   </Link>
                                   {note.after}
                              </p>
                         )}

                         {/* Action Buttons */}
                         <div className="mt-space-xs flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-space-md w-full">
                              {whatsapp && (
                                   <a
                                        href={buildWhatsAppUrl(whatsapp, whatsappMessage)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full sm:w-[270px] whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-space-md py-3.5 font-label-md text-label-md font-bold text-on-primary shadow-md transition-all hover:bg-primary/90 active:scale-95"
                                   >
                                        <MessageSquareText size={18} aria-hidden="true" />
                                        <span>Tanya Admin via WhatsApp</span>
                                   </a>
                              )}

                              {/* Tombol Lihat Pilihan Mobil */}
                              <a
                                   href={fleetAnchorId}
                                   className="w-full sm:w-[270px] whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-2xl border border-outline-variant/60 sm:border-gray-300 bg-surface-container-lowest px-space-md py-3.5 font-label-md text-label-md font-semibold text-on-surface shadow-xs transition-all hover:bg-surface-container-low hover:border-gray-400 active:scale-95"
                              >
                                   <span>Lihat Pilihan Mobil</span>
                                   <ChevronDown size={18} aria-hidden="true" />
                              </a>
                         </div>
                    </div>

                    {/* Feature Highlights Grid */}
                    <div className="w-full border-t border-surface-container-high/40 pt-space-xs sm:pt-space-md">
                         <div className="grid grid-cols-2 gap-space-xs sm:gap-space-sm lg:grid-cols-4">
                              {defaultFeatures.map((feat) => (
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