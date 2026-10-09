import { Fan, Headset, Luggage, Plug, Shield, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { armadaAmenities } from "@/constants/armada";
import type { ArmadaAmenityIcon } from "@/constants/armada";

const amenityIcons: Record<ArmadaAmenityIcon, LucideIcon> = {
     "shield-check": ShieldCheck,
     plug: Plug,
     headset: Headset,
     luggage: Luggage,
     shield: Shield,
     fan: Fan,
};

export default function ArmadaAmenities() {
     return (
          <section className="mx-auto w-full max-w-6xl px-gutter pb-space-xl">
               <div className="mx-auto mb-space-xl flex max-w-2xl flex-col gap-space-xs text-center">
                    <p className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-primary">
                         {armadaAmenities.eyebrow}
                    </p>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                         {armadaAmenities.title}
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                         {armadaAmenities.description}
                    </p>
               </div>

               <ul className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
                    {armadaAmenities.items.map((item) => {
                         const Icon = amenityIcons[item.icon];
                         return (
                              <li
                                   key={item.title}
                                   className="flex flex-col gap-space-xs rounded-2xl border border-surface-container bg-surface-container-lowest p-space-lg shadow-sm transition-all hover:shadow-lg"
                              >
                                   <div className="mb-space-sm flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container/15 text-primary ring-1 ring-primary/20">
                                        <Icon size={24} aria-hidden="true" />
                                   </div>
                                   <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                        {item.title}
                                   </h3>
                                   <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        {item.description}
                                   </p>
                              </li>
                         );
                    })}
               </ul>
          </section>
     );
}