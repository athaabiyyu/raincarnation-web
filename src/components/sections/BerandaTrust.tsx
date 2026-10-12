import { Car, MessageCircle, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { berandaTrust } from "@/constants/beranda";
import type { BerandaTrustIcon } from "@/constants/beranda";

const trustIcons: Record<BerandaTrustIcon, LucideIcon> = {
     car: Car,
     route: Route,
     "message-circle": MessageCircle,
};

export default function BerandaTrust() {
     return (
          <section className="mx-auto hidden w-full max-w-6xl px-gutter pb-space-xl md:block">
               <ul className="grid auto-rows-fr grid-cols-3 gap-space-sm lg:gap-space-md">
                    {berandaTrust.items.map((item) => {
                         const Icon = trustIcons[item.icon];
                         return (
                              <li
                                   key={item.title}
                                   className="flex items-center gap-space-sm rounded-xl bg-surface-container-lowest p-space-sm shadow-sm lg:gap-space-md lg:p-space-md"
                              >
                                   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-container/15 text-primary">
                                        <Icon size={24} aria-hidden="true" />
                                   </div>
                                   <div className="min-w-0">
                                        <p className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                             {item.title}
                                        </p>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                                             {item.description}
                                        </p>
                                   </div>
                              </li>
                         );
                    })}
               </ul>
          </section>
     );
}