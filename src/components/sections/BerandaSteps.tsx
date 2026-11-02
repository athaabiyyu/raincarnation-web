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
               <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-gutter">
                    {/* Header Section (Centered & Optimized Width) */}
                    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-space-sm text-center">
                         <span className="mb-0.5 font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                              {berandaSteps.eyebrow}
                         </span>
                         <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                              {berandaSteps.title}
                         </h2>
                         <p className="mx-auto w-full max-w-2xl font-body-md text-body-md leading-relaxed text-on-surface-variant pt-1 text-center md:max-w-3xl">
                              {berandaSteps.description}
                         </p>
                    </div>

                    {/* Steps Grid */}
                    <ol className="grid grid-cols-1 gap-space-md md:grid-cols-3">
                         {berandaSteps.steps.map((step, index) => {
                              const Icon = stepIcons[step.icon];
                              return (
                                   <li
                                        key={step.title}
                                        className="group relative flex flex-col justify-between gap-space-md rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-6 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
                                   >
                                        <div className="flex items-center justify-between">
                                             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface-container-high text-primary shadow-xs transition-all duration-300 group-hover:bg-primary-container group-hover:text-on-primary">
                                                  <Icon size={24} aria-hidden="true" />
                                             </div>
                                             <span
                                                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-label-md text-label-md font-bold text-on-primary shadow-xs"
                                                  aria-hidden="true"
                                             >
                                                  {index + 1}
                                             </span>
                                        </div>
                                        <div className="space-y-1.5">
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