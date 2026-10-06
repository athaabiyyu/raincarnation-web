import { ChevronRight, BadgeCheck } from "lucide-react";
import { heroContent } from "@/constants/travel-reguler";

export default function TravelHero() {
     return (
          <section className="relative w-full overflow-hidden bg-surface-container-low pb-space-xl">
               <div
                    className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
                    aria-hidden
               />
               <div
                    className="pointer-events-none absolute -bottom-10 left-1/4 h-80 w-80 rounded-full bg-secondary-container/20 blur-2xl"
                    aria-hidden
               />

               <div className="relative mx-auto max-w-7xl px-gutter pt-space-lg">
                    {/* Breadcrumb + badge */}
                    <div className="mt-space-md mb-space-md hidden flex-wrap items-center justify-between gap-space-sm md:flex">
                         <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
                              <span>{heroContent.breadcrumbParent}</span>
                              <ChevronRight size={14} aria-hidden />
                              <span className="font-bold text-primary">
                                   {heroContent.breadcrumbCurrent}
                              </span>
                         </div>
                         <div className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-1 font-label-sm text-label-sm text-primary shadow-sm">
                              <span
                                   className="h-2 w-2 animate-pulse rounded-full bg-primary-container"
                                   aria-hidden
                              />
                              {heroContent.badge}
                         </div>
                    </div>

                    {/* Judul + kartu garansi */}
                    <div className="grid grid-cols-1 items-end gap-space-lg lg:grid-cols-12">
                         <div className="space-y-space-xs lg:col-span-8">
                              <span className="font-label-lg text-label-lg uppercase tracking-wider text-primary">
                                   {heroContent.eyebrow}
                              </span>
                              <h1 className="font-headline-lg text-headline-lg leading-tight tracking-tight text-on-surface">
                                   {heroContent.title}
                              </h1>
                              <p className="hidden max-w-2xl pt-space-xs font-body-lg text-body-lg text-on-surface-variant md:block">
                                   {heroContent.description}
                              </p>
                         </div>

                         <div className="flex lg:col-span-4 lg:justify-end">
                              <div className="flex w-full items-center gap-space-md rounded-xl bg-surface-container-lowest p-space-md shadow-sm sm:w-auto">
                                   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface-container text-primary">
                                        <BadgeCheck size={26} aria-hidden />
                                   </div>
                                   <div>
                                        <div className="font-label-lg text-label-lg text-on-surface">
                                             {heroContent.guaranteeTitle}
                                        </div>
                                        <div className="font-body-sm text-body-sm text-on-surface-variant">
                                             {heroContent.guaranteeText}
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}