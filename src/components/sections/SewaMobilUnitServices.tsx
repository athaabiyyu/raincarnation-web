import Link from "next/link";
import { Calculator, CheckCircle2, ChevronRight, X } from "lucide-react";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

export type UnitService = {
     key: string;
     title: string;
     rows: { label: string; price: string }[];
     includes: readonly string[];
     excludes: readonly string[];
     note?: string;
     subtitle?: string;
     badge?: string;
     popularBadge?: string;
     isPopular?: boolean;
};

type SewaMobilUnitServicesProps = {
     name: string;
     services: UnitService[];
     whatsapp?: string;
};

const SHORT_NAME: Record<string, string> = {
     "all-in": "All In",
     "non-all-in": "Non All In",
     "lepas-kunci": "Lepas Kunci",
};

export default function SewaMobilUnitServices({
     name,
     services,
     whatsapp,
}: SewaMobilUnitServicesProps) {
     if (services.length === 0) return null;

     // Responsif grid: 1 kolom di mobile, 2 kolom di tablet/desktop jika 2 kartu, 3 kolom di desktop jika >= 3 kartu
     const gridClass =
          services.length >= 3
               ? "max-w-6xl md:grid-cols-2 lg:grid-cols-3"
               : "max-w-4xl md:grid-cols-2";

     return (
          <section className="w-full bg-surface-container-low py-12 md:py-16">
               <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:gap-10">

                    {/* Header Section */}
                    <div className="mx-auto flex max-w-2xl flex-col items-center gap-2.5 text-center sm:gap-3">
                         <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold tracking-wider text-emerald-800 uppercase">
                              Transparan & Terbaik
                         </span>
                         <h2 className="text-2xl font-extrabold tracking-tight text-on-surface sm:text-3xl md:text-4xl">
                              Layanan dan Harga {name}
                         </h2>
                         <p className="text-xs text-on-surface-variant sm:text-sm md:text-base">
                              Pilihan paket fleksibel untuk perjalanan dalam kota Malang, wisata Batu, maupun antar kota Jawa Timur.
                         </p>
                    </div>

                    {/* Cards Grid */}
                    <div className={`mx-auto grid w-full gap-6 ${gridClass}`}>
                         {services.map((service) => {
                              const [main, ...extra] = service.rows;
                              const shortName = SHORT_NAME[service.key] ?? service.title;
                              const isAllIn = service.key === "all-in";

                              // Metadata visual
                              const isPopular = service.isPopular ?? isAllIn;
                              const topBadge = isPopular ? (service.popularBadge ?? "PALING POPULER & BEBAS REPOT") : null;
                              const statusTag = service.badge ?? (isAllIn ? "Praktis" : "Reguler");
                              const subtitleText = service.subtitle ?? (isAllIn ? "Sudah termasuk seluruh operasional dasar" : "Fleksibel untuk operasional mandiri");

                              return (
                                   <div
                                        key={service.key}
                                        className={`relative flex flex-col justify-between rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 transition-all duration-200 ${isPopular
                                                  ? "border-2 border-emerald-700 bg-surface-container-lowest shadow-xl shadow-emerald-950/5 mt-3 sm:mt-0"
                                                  : "border border-surface-container-high/60 bg-surface-container-lowest shadow-sm hover:shadow-md"
                                             }`}
                                   >
                                        {/* Badge Mengambang Atas (Jika Paket Populer/All In) */}
                                        {topBadge && (
                                             <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-700 px-3.5 py-1 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-sm whitespace-nowrap">
                                                  {topBadge}
                                             </div>
                                        )}

                                        <div>
                                             {/* Title & Tag */}
                                             <div className="flex items-start justify-between gap-2">
                                                  <div>
                                                       <h3 className="text-lg font-bold text-on-surface sm:text-xl">
                                                            {service.title}
                                                       </h3>
                                                       <p className="mt-0.5 text-xs text-on-surface-variant">
                                                            {subtitleText}
                                                       </p>
                                                  </div>
                                                  <span
                                                       className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold ${isPopular
                                                                 ? "bg-emerald-100 text-emerald-800"
                                                                 : "bg-surface-container-high text-on-surface-variant"
                                                            }`}
                                                  >
                                                       {statusTag}
                                                  </span>
                                             </div>

                                             {/* Pricing */}
                                             <div className="my-5 border-b border-surface-container pb-5 sm:my-6 sm:pb-6">
                                                  <p className="text-[11px] font-bold tracking-wider text-on-surface-variant uppercase">
                                                       Tarif Sewa Per Hari:
                                                  </p>
                                                  <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
                                                       <span className="text-2xl font-black tracking-tight text-emerald-700 sm:text-3xl md:text-4xl">
                                                            {main.price}
                                                       </span>
                                                       <span className="text-xs font-medium text-on-surface-variant">
                                                            / fullday
                                                       </span>
                                                  </div>

                                                  {extra.length > 0 && (
                                                       <ul className="mt-3 flex flex-col gap-1.5 pt-2">
                                                            {extra.map((row) => (
                                                                 <li
                                                                      key={row.label}
                                                                      className="flex items-center justify-between gap-3 text-xs text-on-surface-variant"
                                                                 >
                                                                      <span>{row.label}</span>
                                                                      <span className="font-bold text-on-surface">
                                                                           {row.price}
                                                                      </span>
                                                                 </li>
                                                            ))}
                                                       </ul>
                                                  )}
                                             </div>

                                             {/* List Includes & Excludes */}
                                             <div className="space-y-4">
                                                  <p className="text-[11px] font-bold tracking-wider text-on-surface-variant uppercase">
                                                       {service.excludes.length > 0 ? "Rincian Paket:" : "Sudah Termasuk:"}
                                                  </p>

                                                  <ul className="space-y-2.5">
                                                       {/* Included Items */}
                                                       {service.includes.map((item) => (
                                                            <li
                                                                 key={item}
                                                                 className="flex items-start gap-2.5 text-xs text-on-surface"
                                                            >
                                                                 <CheckCircle2
                                                                      size={16}
                                                                      className="mt-0.5 shrink-0 text-emerald-600 fill-emerald-100"
                                                                 />
                                                                 <span>{item}</span>
                                                            </li>
                                                       ))}

                                                       {/* Excluded Items */}
                                                       {service.excludes.map((item) => (
                                                            <li
                                                                 key={item}
                                                                 className="flex items-start gap-2.5 text-xs text-on-surface-variant/70"
                                                            >
                                                                 <X
                                                                      size={16}
                                                                      className="mt-0.5 shrink-0 text-outline/60"
                                                                 />
                                                                 <span>{item}</span>
                                                            </li>
                                                       ))}
                                                  </ul>

                                                  {service.note && (
                                                       <p className="mt-3 text-[11px] leading-relaxed text-on-surface-variant italic">
                                                            *{service.note}
                                                       </p>
                                                  )}
                                             </div>
                                        </div>

                                        {/* CTA Button */}
                                        <div className="mt-6 sm:mt-8">
                                             {whatsapp && (
                                                  <a
                                                       href={buildWhatsAppUrl(
                                                            whatsapp,
                                                            `Halo Admin Raincarnation, saya tertarik menyewa ${name} (${service.title}). Mohon info ketersediaan dan tarifnya.`
                                                       )}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all active:scale-[0.98] ${isPopular
                                                                 ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/20 hover:bg-emerald-800"
                                                                 : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                                                            }`}
                                                  >
                                                       <span>Pilih Paket {shortName}</span>
                                                       <ChevronRight size={16} />
                                                  </a>
                                             )}
                                        </div>
                                   </div>
                              );
                         })}
                    </div>

                    {/* Bottom Banner (Estimasi Tarif) */}
                    <div className="mx-auto flex w-full max-w-4xl flex-col items-start gap-4 rounded-2xl border border-emerald-200/60 bg-surface-container-lowest p-4 sm:p-5 md:flex-row md:items-center md:justify-between md:p-6 shadow-sm">
                         <div className="flex items-start gap-3 sm:gap-3.5">
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-200/60 bg-emerald-50 text-emerald-700 shadow-sm sm:h-11 sm:w-11">
                                   <Calculator size={20} className="sm:hidden" />
                                   <Calculator size={22} className="hidden sm:block" />
                              </span>
                              <div>
                                   <p className="font-bold text-on-surface text-sm sm:text-base">
                                        Ingin hitung estimasi tarif sesuai tanggal, rute, dan durasi?
                                   </p>
                                   <p className="text-xs text-on-surface-variant mt-0.5">
                                        Dapatkan penawaran khusus untuk pemakaian mingguan atau carter drop off bandara.
                                   </p>
                              </div>
                         </div>
                         <Link
                              href="/sewa-mobil#simulasi-carter"
                              className="inline-flex w-full sm:w-auto justify-center shrink-0 items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-emerald-800 shadow-sm"
                         >
                              <span>Cek tarif lengkap</span>
                              <ChevronRight size={16} />
                         </Link>
                    </div>

               </div>
          </section>
     );
}