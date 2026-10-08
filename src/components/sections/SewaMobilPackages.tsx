import {
     ArrowRight,
     Briefcase,
     Calendar,
     CircleCheck,
     MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { sewaMobilPackages } from "@/constants/sewa-mobil";
import type { PaketSewa } from "@/types/paket-sewa";
import PackagesCarousel from "@/components/sections/PackagesCarousel";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import { formatPrice } from "@/utils/format-price";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

const icons: LucideIcon[] = [ArrowRight, Calendar, Briefcase];

type SewaMobilPackagesProps = {
     prices: PaketSewa[];
     whatsapp: string;
};

function splitPoints(text?: string) {
     return (text ?? "")
          .split(/\r?\n/)
          .map((line) => decodeHtml(line).trim())
          .filter(Boolean);
}

export default function SewaMobilPackages({
     prices,
     whatsapp,
}: SewaMobilPackagesProps) {
     const content = sewaMobilPackages;

     if (prices.length === 0) return null;

     return (
          <section className="w-full border-b border-surface-container-high/40 bg-surface-container-low py-space-xl">
               <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-gutter">
                    <div className="flex flex-col justify-between gap-space-sm md:flex-row md:items-end">
                         <div className="flex flex-col">
                              <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-primary">
                                   {content.eyebrow}
                              </span>
                              <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                                   {content.title}
                              </h2>
                         </div>
                         <p className="max-w-md font-body-md text-body-md text-on-surface-variant">
                              {content.description}
                         </p>
                    </div>

                    <PackagesCarousel>
                         {prices.map((item, index) => {
                              const Icon = icons[index % icons.length];
                              const title = capitalizeFirst(decodeHtml(item.title));
                              const label = capitalizeFirst(decodeHtml(item.acf?.label ?? ""));
                              const description = capitalizeFirst(
                                   decodeHtml(item.acf?.deskripsi ?? ""),
                              );
                              const points = splitPoints(item.acf?.point);
                              const formatted = formatPrice(item.acf?.harga);
                              const priceText = capitalizeFirst(
                                   decodeHtml(item.acf?.text_harga ?? ""),
                              );
                              const unit = decodeHtml(item.acf?.satuan ?? "").trim();

                              return (
                                   <div
                                        key={item.id}
                                        className="group flex h-full flex-col justify-between rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-space-lg shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
                                   >
                                        <div className="flex flex-col gap-space-md">
                                             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container-high text-primary shadow-sm transition-all duration-300 group-hover:bg-primary-container group-hover:text-on-primary">
                                                  <Icon size={24} />
                                             </div>

                                             <div>
                                                  {label && (
                                                       <div className="mb-2.5 inline-flex items-center rounded-full bg-surface-container px-2.5 py-0.5 font-label-sm text-label-sm font-bold text-primary ring-1 ring-primary/20">
                                                            {label}
                                                       </div>
                                                  )}
                                                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                                       {title}
                                                  </h3>
                                                  {description && (
                                                       <p className="mt-1.5 font-body-sm text-body-sm text-on-surface-variant">
                                                            {description}
                                                       </p>
                                                  )}
                                             </div>

                                             {points.length > 0 && (
                                                  <ul className="space-y-2.5 pt-space-xs font-body-sm text-body-sm text-on-surface-variant">
                                                       {points.map((point) => (
                                                            <li key={point} className="flex items-start gap-2.5">
                                                                 <CircleCheck
                                                                      size={18}
                                                                      className="mt-0.5 shrink-0 text-primary"
                                                                 />
                                                                 <span>{capitalizeFirst(point)}</span>
                                                            </li>
                                                       ))}
                                                  </ul>
                                             )}
                                        </div>

                                        <div className="mt-space-md flex flex-col gap-space-sm">
                                             {(formatted || priceText) && (
                                                  <div className="flex items-center justify-between rounded-2xl border border-surface-container-high bg-surface-container-low/80 p-space-sm px-space-md">
                                                       <span className="font-label-sm text-label-sm font-medium text-on-surface-variant">
                                                            {formatted ? "Mulai dari" : "Penawaran"}
                                                       </span>
                                                       <div className="flex flex-col items-end text-right">
                                                            <span className="font-headline-sm text-headline-sm font-extrabold tracking-tight text-primary">
                                                                 {formatted ?? priceText}
                                                            </span>
                                                            {unit && (
                                                                 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">
                                                                      {unit}
                                                                 </span>
                                                            )}
                                                       </div>
                                                  </div>
                                             )}

                                             {whatsapp && (
                                                  <a
                                                       href={buildWhatsAppUrl(
                                                            whatsapp,
                                                            `Halo Admin Raincarnation, saya ingin tanya paket ${title}.`,
                                                       )}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-space-md py-3 font-label-lg text-label-lg text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all hover:bg-whatsapp-hover active:scale-95"
                                                  >
                                                       <MessageCircle size={20} />
                                                       Tanya via WhatsApp
                                                  </a>
                                             )}
                                        </div>
                                   </div>
                              );
                         })}
                    </PackagesCarousel>
               </div>
          </section>
     );
}