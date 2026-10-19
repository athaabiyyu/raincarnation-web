import Link from "next/link";
import SewaMobilForm, {
     type FleetOption,
} from "@/components/sections/SewaMobilForm";
import { sewaMobilHero } from "@/constants/sewa-mobil";
import type { RuteCarter } from "@/types/rute-carter";

type SewaMobilHeroProps = {
     whatsapp?: string;
     routes?: RuteCarter[];
     fleet?: FleetOption[];
};

export default function SewaMobilHero({
     whatsapp,
     routes = [],
     fleet = [],
}: SewaMobilHeroProps) {
     const content = sewaMobilHero;

     return (
          <section className="relative w-full overflow-hidden border-b border-surface-container-high/30 bg-linear-to-b from-surface-container-high/50 via-surface to-surface pb-space-xl pt-space-md">
               <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-gutter pt-space-md">
                    {/* Judul & Deskripsi */}
                    <div className="flex max-w-3xl flex-col gap-space-md">
                         <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
                              {content.titleStart}{" "}
                              <span className="text-primary underline decoration-primary-fixed decoration-[5px] underline-offset-8">
                                   {content.titleHighlight}
                              </span>
                              {content.titleEnd}
                         </h1>

                         <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
                              {content.description}
                         </p>

                         <p className="font-body-md text-body-md text-on-surface-variant">
                              {content.regularLink.text}{" "}
                              <Link
                                   href={content.regularLink.href}
                                   className="font-bold text-primary underline underline-offset-4 transition-colors hover:text-primary-container"
                              >
                                   {content.regularLink.label}
                              </Link>
                         </p>
                    </div>

                    {/* Stats Card */}
                    <div className="grid grid-cols-2 gap-space-sm sm:grid-cols-3">
                         {content.stats.map((stat, index) => (
                              <div
                                   key={stat.label}
                                   className={`flex flex-col rounded-2xl border border-surface-container-high/60 bg-surface-container-lowest p-space-md shadow-[0_4px_16px_rgba(18,28,44,0.04)] ${index === 2 ? "col-span-2 sm:col-span-1" : ""
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

                    {/* Form Sewa Mobil Menyatu di Hero */}
                    {whatsapp && (
                         <div className="pt-space-xs">
                              <SewaMobilForm
                                   routes={routes}
                                   fleet={fleet}
                                   whatsapp={whatsapp}
                                   embedded
                                   headingLevel="h2"
                              />
                         </div>
                    )}
               </div>
          </section>
     );
}