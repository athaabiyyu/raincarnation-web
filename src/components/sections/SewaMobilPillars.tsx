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
     return (
                    <section className="w-full bg-surface py-space-xl">
               <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-gutter">
                                        <div className="flex flex-col gap-space-xs">
                         <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                              {sewaMobilPillars.title}
                         </h2>
                         <p className="max-w-3xl font-body-md text-body-md text-on-surface-variant">
                              {sewaMobilPillars.description}
                         </p>
                    </div>

                    <div className="grid grid-cols-1 gap-gutter pt-space-xs sm:grid-cols-2 lg:grid-cols-4">
                         {sewaMobilPillars.items.map((item) => {
                              const Icon = ICONS[item.icon];

                              return (
                                   <div
                                        key={item.title}
                                        className="flex flex-col gap-space-sm rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-space-lg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                                   >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container-high text-primary shadow-sm">
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
               </div>
          </section>
     );
}