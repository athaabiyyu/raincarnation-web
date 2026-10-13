import Image from "next/image";
import {
     Armchair,
     BadgeCheck,
     CircleCheck,
     Fan,
     Luggage,
     Plug,
     Shield,
     ShieldCheck,
     type LucideIcon,
} from "lucide-react";
import { facilitiesContent, type FacilityIcon } from "@/constants/facilities";

// Menghubungkan nama ikon di constants dengan komponen ikon lucide.
const icons: Record<FacilityIcon, LucideIcon> = {
     seat: Armchair,
     fan: Fan,
     luggage: Luggage,
     charger: Plug,
};

export default function Facilities() {
     const { title, description, items, photo, safety } = facilitiesContent;

     return (
          <section className="w-full bg-surface-container-low py-space-lg md:py-space-xl">
               <div className="mx-auto max-w-6xl space-y-space-lg px-gutter">
                    <div className="space-y-space-xs">
                         <h2 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
                              {title}
                         </h2>
                         <p className="max-w-3xl font-body-md text-body-md text-on-surface-variant">
                              {description}
                         </p>
                    </div>

                    <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 xl:grid-cols-4">
                         {items.map((item) => {
                              const Icon = icons[item.icon];
                              return (
                                   <div
                                        key={item.title}
                                        className="flex flex-col justify-between space-y-space-sm rounded-xl bg-surface-container-lowest p-space-md shadow-sm md:p-space-lg"
                                   >
                                        <div className="space-y-space-sm">
                                             <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container text-primary">
                                                  <Icon size={24} aria-hidden="true" />
                                             </div>
                                             <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                                  {item.title}
                                             </h3>
                                             <p className="font-body-sm text-body-sm text-on-surface-variant">
                                                  {item.description}
                                             </p>
                                        </div>
                                        {item.highlight && (
                                             <div className="flex items-center gap-1 pt-space-xs font-label-sm text-label-sm font-bold text-primary">
                                                  <CircleCheck
                                                       size={16}
                                                       className="shrink-0"
                                                       aria-hidden="true"
                                                  />
                                                  {item.highlight}
                                             </div>
                                        )}
                                   </div>
                              );
                         })}
                    </div>

                    <div
                         className={`grid grid-cols-1 gap-space-md pt-space-sm ${photo.src ? "lg:grid-cols-3" : ""
                              }`}
                    >
                         {photo.src && (
                              <div className="relative h-56 overflow-hidden rounded-xl shadow-sm sm:h-72 lg:col-span-2 lg:h-80">
                                   <Image
                                        src={photo.src}
                                        alt={photo.alt}
                                        fill
                                        sizes="(min-width: 1024px) 66vw, 100vw"
                                        className="object-cover"
                                   />
                                   <div className="absolute inset-0 flex items-end bg-linear-to-t from-on-surface/80 via-transparent to-transparent p-space-md md:p-space-lg">
                                        <div className="space-y-1">
                                             <span className="inline-block rounded bg-primary px-2.5 py-0.5 font-label-sm text-label-sm text-on-primary">
                                                  {photo.badge}
                                             </span>
                                             <h3 className="font-headline-sm text-headline-sm font-bold text-on-primary">
                                                  {photo.title}
                                             </h3>
                                             <p className="max-w-lg font-body-sm text-body-sm text-surface-container-low">
                                                  {photo.description}
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         )}

                         <div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-md shadow-sm md:p-space-lg">
                              <div className="space-y-space-md">
                                   <div className="flex items-center gap-space-sm">
                                        <ShieldCheck
                                             size={24}
                                             className="shrink-0 text-primary"
                                             aria-hidden="true"
                                        />
                                        <h3 className="font-label-lg text-label-lg text-on-surface">
                                             {safety.title}
                                        </h3>
                                   </div>
                                   <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
                                        {safety.points.map((point) => (
                                             <li key={point} className="flex items-start gap-2">
                                                  <BadgeCheck
                                                       size={16}
                                                       className="mt-0.5 shrink-0 text-primary"
                                                       aria-hidden="true"
                                                  />
                                                  <span>{point}</span>
                                             </li>
                                        ))}
                                   </ul>
                              </div>
                              {safety.badge && (
                                   <div className="mt-space-md flex items-center justify-between gap-space-sm rounded-lg bg-surface-container p-space-sm font-label-sm text-label-sm text-primary">
                                        <span>{safety.badge}</span>
                                        <Shield size={16} className="shrink-0" aria-hidden="true" />
                                   </div>
                              )}
                         </div>
                    </div>
               </div>
          </section>
     );
}