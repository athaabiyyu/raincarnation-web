import { CircleCheck } from "lucide-react";
import { armadaMaintenance } from "@/constants/armada";

export default function ArmadaMaintenance() {
     return (
          <section className="w-full border-y border-surface-variant bg-surface py-space-xl">
               <div className="mx-auto max-w-6xl px-gutter">
                    {/* Header: Ditambahkan eyebrow serta disamakan align center dan spacing-nya */}
                    <div className="mx-auto mb-space-lg flex max-w-3xl flex-col items-center text-center space-y-2">
                         {armadaMaintenance.eyebrow && (
                              <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                                   {armadaMaintenance.eyebrow}
                              </span>
                         )}
                         <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                              {armadaMaintenance.title}
                         </h2>
                         <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
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