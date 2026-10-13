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
               <div className="mx-auto max-w-6xl px-gutter">
                    <div className="mb-space-lg space-y-space-xs md:mb-space-xl">
                         <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                              PILIHAN SERVIS UTAMA
                         </span>
                         <h2 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
                              {berandaServices.title}
                         </h2>
                         <p className="max-w-3xl font-body-md text-body-md text-on-surface-variant">
                              {berandaServices.description}
                         </p>
                    </div>

                    <ul className="grid grid-cols-1 gap-space-md md:grid-cols-2 md:gap-gutter">
                         {berandaServices.items.map((item) => {
                              const Icon = serviceIcons[item.icon];
                              const isSecondary = item.featured;
                              return (
                                   <li key={item.title} className="flex">
                                        <article
                                             className={`relative flex w-full flex-col justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-space-md transition-shadow md:p-space-lg ${isSecondary
                                                  ? "shadow-md hover:shadow-lg"
                                                  : "shadow-sm hover:shadow-md"
                                                  }`}
                                        >


                                             <div>
                                                  <div className="mb-space-md flex items-center justify-between gap-space-sm">
                                                       <div
                                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl md:h-14 md:w-14 ${isSecondary
                                                                 ? "bg-secondary/15 text-secondary"
                                                                 : "bg-primary/10 text-primary"
                                                                 }`}
                                                       >
                                                            <Icon className="h-6 w-6 shrink-0" />
                                                       </div>
                                                       <span
                                                            className={`inline-block rounded bg-surface-container px-space-xs py-0.5 font-label-sm text-label-sm font-bold ${isSecondary ? "text-secondary" : "text-primary"
                                                                 }`}
                                                       >
                                                            {item.tag}
                                                       </span>
                                                  </div>
                                                  <h3 className="mb-space-sm font-headline-md text-headline-md text-on-surface">
                                                       {item.title}
                                                  </h3>
                                                  <p className="mb-space-md font-body-sm text-body-sm text-on-surface-variant">
                                                       {item.description}
                                                  </p>
                                                  <ul className="mb-space-lg flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                                                       {item.points.map((point) => (
                                                            <li key={point} className="flex items-start gap-2">
                                                                 <Check
                                                                      size={16}
                                                                      className={`mt-0.5 shrink-0 ${isSecondary ? "text-secondary" : "text-primary"
                                                                           }`}
                                                                      aria-hidden="true"
                                                                 />
                                                                 {point}
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>

                                             <Link
                                                  href={item.href}
                                                  className="flex w-full items-center justify-center rounded-lg bg-primary py-space-sm text-center font-label-md text-label-md text-on-primary shadow-sm transition-all hover:bg-on-primary-fixed-variant active:scale-95"
                                             >
                                                  {item.button}
                                             </Link>
                                        </article>
                                   </li>
                              );
                         })}
                    </ul>
               </div>
          </section>
     );
}