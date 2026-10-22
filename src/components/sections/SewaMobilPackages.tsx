import {
     Car,
     CircleCheck,
     KeyRound,
     MessageSquareText,
     Route,
     UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { sewaMobilPackages } from "@/constants/sewa-mobil";
import type { Armada } from "@/types/armada";
import type { PaketSewa } from "@/types/paket-sewa";
import type { RuteCarter } from "@/types/rute-carter";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import { formatPrice } from "@/utils/format-price";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

// Urutan ikon mengikuti urutan kartu: All In, Non All In, Lepas Kunci, Carter.
const icons: LucideIcon[] = [Car, UserRound, KeyRound, Route];

type SewaMobilPackagesProps = {
     prices: PaketSewa[];
     armada: Armada[];
     ruteCarter: RuteCarter[];
     whatsapp: string;
};

function splitPoints(text?: string) {
     return (text ?? "")
          .split(/\r?\n/)
          .map((line) => decodeHtml(line).trim())
          .filter(Boolean);
}

function toPrice(value: string | number | undefined) {
     const number = Number(value);
     return Number.isFinite(number) && number > 0 ? number : 0;
}

function lowestPrice(values: Array<string | number | undefined>) {
     const prices = values.map(toPrice).filter((price) => price > 0);
     return prices.length > 0 ? Math.min(...prices) : 0;
}

// Urutan kartu: All In, Non All In, Lepas Kunci, Carter. Judul tak dikenal di akhir.
// "non all in" dicek sebelum "all in" karena judulnya memuat kata "all in".
function getPackageRank(title: string) {
     const name = title.toLowerCase();
     if (name.includes("non all in")) return 1;
     if (name.includes("all in")) return 0;
     if (name.includes("lepas kunci")) return 2;
     if (name.includes("carter")) return 3;
     return 4;
}

// Harga "Mulai dari" per kartu, diambil dari data Armada / rute-carter.
// Jenis kartu dikenali dari judul entri Paket Sewa di CMS.
function getStartingPrice(
     title: string,
     armada: Armada[],
     ruteCarter: RuteCarter[],
) {
     const name = title.toLowerCase();

     if (name.includes("non all in")) {
          return lowestPrice(armada.map((item) => item.acf?.harga_non_all_in));
     }
     if (name.includes("all in")) {
          return lowestPrice(armada.map((item) => item.acf?.harga_all_in));
     }
     if (name.includes("lepas kunci")) {
          return lowestPrice(armada.map((item) => item.acf?.harga));
     }
     if (name.includes("carter")) {
          return lowestPrice(
               ruteCarter
                    .filter((item) => decodeHtml(item.acf?.paket_sewa ?? "").trim() === title)
                    .map((item) => item.acf?.harga),
          );
     }
     return 0;
}

export default function SewaMobilPackages({
     prices,
     armada,
     ruteCarter,
     whatsapp,
}: SewaMobilPackagesProps) {
     const content = sewaMobilPackages;

     if (prices.length === 0) return null;

     const orderedPrices = [...prices].sort(
          (a, b) =>
               getPackageRank(decodeHtml(a.title)) -
               getPackageRank(decodeHtml(b.title)),
     );

     // 1 kolom di HP, 2 kolom di tablet dan laptop (empat kartu = 2 + 2).
     const listClass = `grid grid-cols-1 gap-space-md ${
          orderedPrices.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"
     }`;

     return (
          <section className="w-full bg-surface-container-low py-space-xl">
               <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-gutter">
                    {/* Section Header */}
                    <div className="flex flex-col gap-1.5">
                         <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                              PILIHAN SEWA FLEKSIBEL
                         </span>
                         <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                              {content.title}
                         </h2>
                         <p className="max-w-3xl font-body-md text-body-md text-on-surface-variant">
                              {content.description}
                         </p>
                    </div>

                    <div className={listClass}>
                         {orderedPrices.map((item, index) => {
                              const Icon = icons[index % icons.length];
                              const title = capitalizeFirst(decodeHtml(item.title));
                              const label = capitalizeFirst(decodeHtml(item.acf?.label ?? ""));
                              const description = capitalizeFirst(
                                   decodeHtml(item.acf?.deskripsi ?? ""),
                              );
                              const points = splitPoints(item.acf?.point);
                              const startingPrice = getStartingPrice(
                                   decodeHtml(item.title).trim(),
                                   armada,
                                   ruteCarter,
                              );
                              const formatted =
                                   startingPrice > 0 ? formatPrice(String(startingPrice)) : null;
                              const unit = decodeHtml(item.acf?.satuan ?? "").trim();

                              return (
                                   <div
                                        key={item.id}
                                        className="group flex h-full flex-col justify-between gap-space-md rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-6 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
                                   >
                                        <div className="flex flex-col gap-space-md">
                                             {/* Header Card: Icon & Label Sejajar di Kanan */}
                                             <div className="flex items-center justify-between gap-3">
                                                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface-container-high text-primary shadow-xs transition-all duration-300 group-hover:bg-primary-container group-hover:text-on-primary">
                                                       <Icon size={24} />
                                                  </div>

                                                  {label && (
                                                       <span className="inline-flex items-center rounded-full bg-surface-container px-3 py-1 font-label-sm text-label-sm font-bold text-primary ring-1 ring-primary/20">
                                                            {label}
                                                       </span>
                                                  )}
                                             </div>

                                             <div>
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
                                                       {points.map((point, pointIndex) => (
                                                            <li key={`${pointIndex}-${point}`} className="flex items-start gap-2.5">
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

                                        {/* Footer Card: Tarif & Tombol, selalu menempel di bawah kartu */}
                                        <div className="flex flex-col gap-1.5 border-t border-surface-container-high pt-3">
                                             {formatted && (
                                                  <div className="flex items-baseline justify-between gap-2">
                                                       <span className="font-label-sm text-label-sm font-medium text-on-surface-variant">
                                                            Mulai dari
                                                       </span>
                                                       <p className="flex items-baseline gap-1">
                                                            <span className="font-headline-sm text-headline-sm font-extrabold tracking-tight text-primary">
                                                                 {formatted}
                                                            </span>
                                                            {unit && (
                                                                 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">
                                                                      /{unit.replace(/^\//, "")}
                                                                 </span>
                                                            )}
                                                       </p>
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
                                                       className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 font-label-md text-label-md font-bold text-on-whatsapp shadow-xs transition-all hover:bg-whatsapp-hover active:scale-95"
                                                  >
                                                       <MessageSquareText size={18} />
                                                       <span>Tanya via WhatsApp</span>
                                                  </a>
                                             )}
                                        </div>
                                   </div>
                              );
                         })}
                    </div>
               </div>
          </section>
     );
}