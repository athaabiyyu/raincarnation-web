import Link from "next/link";
import { Check } from "lucide-react";
import { berandaServices } from "@/constants/beranda";
import type { BerandaServiceIcon } from "@/constants/beranda";

type IconProps = {
     className?: string;
};

const DEFAULT_CLASS = "h-6 w-6 shrink-0";

// Ikon mobil (Sewa Mobil). Warna mengikuti teks sekitarnya (currentColor).
function CarIcon({ className = DEFAULT_CLASS }: IconProps) {
     return (
          <svg
               aria-hidden="true"
               viewBox="0 0 24 24"
               fill="currentColor"
               className={className}
          >
               <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
               />
          </svg>
     );
}

// Ikon kursi penumpang (Travel Reguler).
function SeatIcon({ className = DEFAULT_CLASS }: IconProps) {
     return (
          <svg
               aria-hidden="true"
               viewBox="0 0 24 24"
               fill="currentColor"
               className={className}
          >
               <path d="M7.59 5.41c-.78-.78-.78-2.047 0-2.83.78-.78 2.05-.78 2.83 0 .78.78.78 2.05 0 2.83-.78.78-2.05.78-2.83 0zM6 16V7H4v9c0 2.76 2.24 5 5 5h6v-2H9c-1.66 0-3-1.34-3-3zm14 4.07L14.93 15H11.5v-3.68c1.4 1.15 3.4 2.01 5.5 2.01v-2c-1.62.01-3.5-.78-4.72-2.05l-1.3-1.45c-.19-.21-.43-.38-.69-.5-.29-.14-.62-.23-.96-.23h-.03C8.01 7 7 8.01 7 9.25V15c0 1.66 1.34 3 3 3h5.07l3.5 3.5L20 20.07z" />
          </svg>
     );
}

const serviceIcons: Record<BerandaServiceIcon, React.ComponentType<IconProps>> = {
     armchair: SeatIcon,
     car: CarIcon,
};

export default function BerandaServices() {
     return (
          <section className="w-full bg-surface-container-low py-space-xl">
               {/* Menggunakan gap-space-lg agar jarak antara header dan grid kartu lebih rapat */}
               <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-gutter">
                    {/* Header Section (Centered & Optimized Width) */}
                    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-space-sm text-center">
                         <span className="mb-0.5 font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                              PILIHAN SERVIS UTAMA
                         </span>
                         <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                              <span>Sewa Mobil &amp; Travel</span>
                              <span className="block sm:inline"> per Kursi</span>
                         </h2>
                         <p className="mx-auto w-full max-w-2xl font-body-md text-body-md leading-relaxed text-on-surface-variant pt-1 text-center md:max-w-3xl">
                              {berandaServices.description}
                         </p>
                    </div>

                    {/* Cards Grid */}
                    <ul className="grid grid-cols-1 gap-space-md md:grid-cols-2 md:gap-gutter">
                         {berandaServices.items.map((item) => {
                              const Icon = serviceIcons[item.icon];
                              const isSecondary = item.featured;
                              return (
                                   <li key={item.title} className="flex">
                                        <article
                                             className={`group relative flex h-full w-full flex-col justify-between gap-space-md rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-6 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-xl`}
                                        >
                                             <div className="flex flex-col gap-space-md">
                                                  <div className="flex items-center justify-between gap-3">
                                                       <div
                                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-xs transition-all duration-300 ${isSecondary
                                                                      ? "bg-secondary/15 text-secondary group-hover:bg-secondary group-hover:text-on-secondary"
                                                                      : "bg-surface-container-high text-primary group-hover:bg-primary-container group-hover:text-on-primary"
                                                                 }`}
                                                       >
                                                            <Icon className="h-6 w-6 shrink-0" />
                                                       </div>
                                                       <span
                                                            className={`inline-flex items-center rounded-full px-3 py-1 font-label-sm text-label-sm font-bold ring-1 ${isSecondary
                                                                      ? "bg-secondary/10 text-secondary ring-secondary/20"
                                                                      : "bg-surface-container text-primary ring-primary/20"
                                                                 }`}
                                                       >
                                                            {item.tag}
                                                       </span>
                                                  </div>

                                                  <div>
                                                       <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                                            {item.title}
                                                       </h3>
                                                       <p className="mt-1.5 font-body-sm text-body-sm text-on-surface-variant">
                                                            {item.description}
                                                       </p>
                                                  </div>

                                                  <ul className="space-y-2.5 pt-space-xs font-body-sm text-body-sm text-on-surface-variant">
                                                       {item.points.map((point) => (
                                                            <li key={point} className="flex items-start gap-2.5">
                                                                 <Check
                                                                      size={18}
                                                                      className={`mt-0.5 shrink-0 ${isSecondary ? "text-secondary" : "text-primary"
                                                                           }`}
                                                                      aria-hidden="true"
                                                                 />
                                                                 <span>{point}</span>
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>

                                             <div className="border-t border-surface-container-high pt-3">
                                                  <Link
                                                       href={item.href}
                                                       className="flex w-full items-center justify-center rounded-2xl bg-primary py-3 font-label-md text-label-md font-bold text-on-primary shadow-md transition-all hover:bg-primary/90 active:scale-95"
                                                  >
                                                       {item.button}
                                                  </Link>
                                             </div>
                                        </article>
                                   </li>
                              );
                         })}
                    </ul>
               </div>
          </section>
     );
}