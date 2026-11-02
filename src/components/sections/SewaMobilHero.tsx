import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SewaMobilForm, {
     type FleetOption,
} from "@/components/sections/SewaMobilForm";
import { sewaMobilHero } from "@/constants/sewa-mobil";
import type { RuteCarter } from "@/types/rute-carter";

type SewaMobilHeroProps = {
     whatsapp?: string;
     routes?: RuteCarter[];
     fleet?: FleetOption[];
     badge?: string;
};

export default function SewaMobilHero({
     whatsapp,
     routes = [],
     fleet = [],
     badge = "RENTAL MOBIL TERPERCAYA DI JAWA TIMUR",
}: SewaMobilHeroProps) {
     const content = sewaMobilHero;

     return (
          <section className="relative w-full overflow-hidden border-b border-surface-container-high/30 bg-linear-to-b from-surface-container-high/50 via-surface to-surface pb-space-xl pt-space-md">
               <div className="mx-auto flex max-w-6xl flex-col items-start sm:items-center gap-space-lg px-gutter pt-space-md text-left sm:text-center">
                    {/* Header Content (Eyebrow, Title & Description) */}
                    <div className="flex max-w-4xl flex-col items-start sm:items-center gap-space-md w-full">
                         {/* Eyebrow / Badge Pill */}
                         {badge && (
                              <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 font-label-sm text-xs font-semibold uppercase tracking-wider text-primary sm:mb-2">
                                   <span className="size-2 rounded-full bg-primary" />
                                   <span>{badge}</span>
                              </div>
                         )}

                         {/* Title */}
                         <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
                              Sewa Mobil dengan{" "}
                              <span className="text-primary-container">Sopir</span>{" "}
                              <br className="hidden sm:inline" />
                              atau{" "}
                              <span className="text-primary-container">Lepas Kunci</span>
                         </h1>

                         {/* Deskripsi */}
                         <p className="max-w-none font-body-lg text-body-lg text-on-surface-variant">
                              {content.description}
                         </p>
                    </div>

                    {/* Stats Card */}
                    <div className="grid w-full grid-cols-2 gap-space-sm sm:grid-cols-3">
                         {content.stats.map((stat, index) => (
                              <div
                                   key={stat.label}
                                   className={`flex flex-col items-start sm:items-center justify-center rounded-2xl border border-surface-container-high/60 bg-surface-container-lowest p-space-md shadow-[0_4px_16px_rgba(18,28,44,0.04)] ${
                                        index === 2 ? "col-span-2 sm:col-span-1" : ""
                                   }`}
                              >
                                   <span className="font-headline-md text-headline-md font-extrabold tracking-tight text-primary">
                                        {stat.value}
                                   </span>
                                   <span className="mt-0.5 font-label-sm text-label-sm font-medium text-on-surface-variant">
                                        {stat.label}
                                   </span>
                              </div>
                         ))}
                    </div>

                    {/* Form Sewa Mobil + Teks Link di Bawah Form */}
                    {whatsapp && (
                         <div
                              id="simulasi-carter"
                              className="flex w-full scroll-mt-32 flex-col gap-space-md pt-space-xs text-left"
                         >
                              <SewaMobilForm
                                   routes={routes}
                                   fleet={fleet}
                                   whatsapp={whatsapp}
                                   embedded
                                   headingLevel="h2"
                              />

                              {/* Teks Link Travel Per Kursi di Bawah Form */}
                              <p className="text-center font-body-md text-body-md text-on-surface-variant sm:pt-space-sm">
                                   {content.regularLink.text}{" "}
                                   <br className="sm:hidden" />
                                   <Link
                                        href={content.regularLink.href}
                                        className="inline-flex items-center gap-1 font-bold text-primary transition-colors hover:text-primary-container group"
                                   >
                                        <span className="underline underline-offset-4">
                                             {content.regularLink.label}
                                        </span>
                                        <ArrowUpRight
                                             className="size-4 shrink-0 no-underline transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                             strokeWidth={2.5}
                                             aria-hidden="true"
                                        />
                                   </Link>
                              </p>
                         </div>
                    )}
               </div>
          </section>
     );
}