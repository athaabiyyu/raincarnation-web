import Link from "next/link";
import { Armchair, Car, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { berandaServices } from "@/constants/beranda";
import type { BerandaServiceIcon } from "@/constants/beranda";

const serviceIcons: Record<BerandaServiceIcon, LucideIcon> = {
     armchair: Armchair,
     car: Car,
};

export default function BerandaServices() {
     return (
          <section className="w-full bg-surface-container-low py-space-xl">
               <div className="mx-auto max-w-6xl px-gutter">
                    <div className="mb-space-lg space-y-space-xs md:mb-space-xl">
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
                                             {isSecondary && (
                                                                                                    <span className="absolute right-0 top-0 rounded-bl-lg bg-primary/10 px-space-md py-1 font-label-sm text-label-sm font-bold text-primary">
                                                       Paling Favorit
                                                  </span>
                                             )}

                                             <div>
                                                  <div className="mb-space-md flex items-center gap-space-sm">
                                                       <div
                                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl md:h-14 md:w-14 ${isSecondary
                                                                 ? "bg-secondary/15 text-secondary"
                                                                 : "bg-primary/10 text-primary"
                                                                 }`}
                                                       >
                                                            <Icon size={26} aria-hidden="true" />
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