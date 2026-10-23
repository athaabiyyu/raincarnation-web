import { BadgeCheck, Layers, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { berandaSteps } from "@/constants/beranda";
import type { BerandaStepIcon } from "@/constants/beranda";

const stepIcons: Record<BerandaStepIcon, LucideIcon> = {
     layers: Layers,
     send: Send,
     "badge-check": BadgeCheck,
};

export default function BerandaSteps() {
     return (
          <section className="w-full bg-surface py-space-xl">
               <div className="mx-auto max-w-6xl space-y-space-lg px-gutter">
                    <div className="space-y-space-xs">
                         <span className="block font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                              {berandaSteps.eyebrow}
                         </span>
                         <h2 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
                              {berandaSteps.title}
                         </h2>
                         <p className="max-w-3xl font-body-md text-body-md text-on-surface-variant">
                              {berandaSteps.description}
                         </p>
                    </div>

                    <ol className="grid grid-cols-1 gap-space-md md:grid-cols-3">
                         {berandaSteps.steps.map((step, index) => {
                              const Icon = stepIcons[step.icon];
                              return (
                                   <li
                                        key={step.title}
                                        className="flex flex-col gap-space-sm rounded-xl border border-surface-container-high/60 bg-surface-container-lowest p-space-md shadow-sm"
                                   >
                                        <div className="flex items-center justify-between">
                                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                  <Icon size={20} aria-hidden="true" />
                                             </div>
                                             <span
                                                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-label-md text-label-md font-bold text-on-primary"
                                                  aria-hidden="true"
                                             >
                                                  {index + 1}
                                             </span>
                                        </div>
                                        <div className="space-y-1">
                                             <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                                  {step.title}
                                             </h3>
                                             <p className="font-body-sm text-body-sm text-on-surface-variant">
                                                  {step.description}
                                             </p>
                                        </div>
                                   </li>
                              );
                         })}
                    </ol>
               </div>
          </section>
     );
}