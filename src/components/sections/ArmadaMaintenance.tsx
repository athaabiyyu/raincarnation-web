import { CircleCheck, ShieldCheck } from "lucide-react";
import { armadaMaintenance } from "@/constants/armada";

export default function ArmadaMaintenance() {
     return (
          <section className="mt-space-xl w-full border-y border-surface-variant bg-surface-container py-space-xl">
               <div className="mx-auto max-w-6xl px-gutter">
                    <div className="flex max-w-3xl flex-col gap-space-md">
                         <span className="inline-flex w-fit items-center gap-space-xs rounded-full border border-primary/20 bg-surface-container-lowest px-space-sm py-1 font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary shadow-sm">
                              <ShieldCheck size={16} aria-hidden="true" />
                              {armadaMaintenance.badge}
                         </span>
                         <h2 className="font-headline-lg text-headline-lg font-bold tracking-tight text-on-surface">
                              {armadaMaintenance.title}
                         </h2>
                         <p className="font-body-md text-body-md text-on-surface-variant">
                              {armadaMaintenance.description}
                         </p>
                    </div>

                    <ul className="mt-space-lg grid grid-cols-1 gap-space-md md:grid-cols-3">
                         {armadaMaintenance.points.map((point) => (
                              <li
                                   key={point.title}
                                   className="flex items-start gap-space-sm rounded-xl border border-surface-container bg-surface-container-lowest/60 p-space-md"
                              >
                                   <CircleCheck
                                        size={22}
                                        className="mt-0.5 shrink-0 text-primary"
                                        aria-hidden="true"
                                   />
                                   <div>
                                        <h3 className="font-label-md text-label-md font-bold text-on-surface">
                                             {point.title}
                                        </h3>
                                        <p className="mt-space-xs font-body-sm text-body-sm text-on-surface-variant">
                                             {point.description}
                                        </p>
                                   </div>
                              </li>
                         ))}
                    </ul>
               </div>
          </section>
     );
}