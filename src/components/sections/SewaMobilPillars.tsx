import { Clock, Lock, Route, Smile } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { sewaMobilPillars } from "@/constants/sewa-mobil";
import type { SewaMobilPillarIcon } from "@/constants/sewa-mobil";

const ICONS: Record<SewaMobilPillarIcon, LucideIcon> = {
     clock: Clock,
     route: Route,
     lock: Lock,
     smile: Smile,
};

export default function SewaMobilPillars() {
     // Memisahkan item "Rute Sesuai Rencana" dari 3 item lainnya agar posisinya bisa diatur persis di baris kedua
     const ruteItem = sewaMobilPillars.items.find((item) => item.icon === "route");
     const topItems = sewaMobilPillars.items.filter((item) => item.icon !== "route");

     return (
          <section className="w-full bg-surface-container-low py-space-xl">
               <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-gutter">
                    {/* Header Section: Align Center & Spacing Disamakan */}
                    <div className="mx-auto flex max-w-3xl flex-col items-center text-center space-y-2">
                         <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                              {sewaMobilPillars.eyebrow}
                         </span>
                         <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                              {sewaMobilPillars.title}
                         </h2>
                         <p className="font-body-md text-body-md text-on-surface-variant">
                              {sewaMobilPillars.description}
                         </p>
                    </div>

                    {/* Container Kartu */}
                    <div className="flex flex-col gap-gutter pt-space-xs">
                         {/* Baris 1: 3 Kartu di Desktop, 1 Kolom di Mobile */}
                         <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
                              {topItems.map((item) => {
                                   const Icon = ICONS[item.icon];
                                   return (
                                        <div
                                             key={item.title}
                                             className="flex flex-col gap-space-sm rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-space-lg shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                                        >
                                             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container-high text-primary shadow-xs">
                                                  <Icon size={24} aria-hidden="true" />
                                             </div>
                                             <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                                  {item.title}
                                             </h3>
                                             <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                                                  {item.description}
                                             </p>
                                        </div>
                                   );
                              })}
                         </div>

                         {/* Baris 2: Kartu "Rute Sesuai Rencana" Membentang Penuh di Desktop */}
                         {ruteItem && (() => {
                              const Icon = ICONS[ruteItem.icon];
                              return (
                                   <div
                                        key={ruteItem.title}
                                        className="flex flex-col gap-space-sm rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-space-lg shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl w-full"
                                   >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container-high text-primary shadow-xs">
                                             <Icon size={24} aria-hidden="true" />
                                        </div>
                                        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                             {ruteItem.title}
                                        </h3>
                                        <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                                             {ruteItem.description}
                                        </p>
                                   </div>
                              );
                         })()}
                    </div>
               </div>
          </section>
     );
}