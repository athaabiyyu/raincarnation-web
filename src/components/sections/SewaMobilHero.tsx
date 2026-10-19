import Image from "next/image";
import Link from "next/link";
import SewaMobilForm, {
     type FleetOption,
} from "@/components/sections/SewaMobilForm";
import { berandaHero } from "@/constants/beranda";
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
                    {/* Grid 2 Kolom dengan Perataan Vertikal Center */}
                    <div className="grid items-center gap-space-lg lg:grid-cols-2">
                         {/* Sisi Kiri: Judul & Deskripsi */}
                         <div className="flex flex-col gap-space-md lg:max-w-xl">
                              <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
                                   {content.titleStart}{" "}
                                   <span className="text-primary underline decoration-primary-fixed decoration-[5px] underline-offset-8">
                                        {content.titleHighlight}
                                   </span>{" "}
                                   {content.titleEnd}
                              </h1>

                              <p className="font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
                                   {content.description}
                              </p>
                         </div>

                         {/* Sisi Kanan: Foto Kartu Hero */}
                         <div className="relative hidden aspect-[16/11] w-full overflow-hidden rounded-3xl shadow-md lg:block">
                              <Image
                                   src={berandaHero.image.src}
                                   alt={berandaHero.image.alt}
                                   fill
                                   sizes="(min-width: 1024px) 560px, 100vw"
                                   className="object-cover"
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
                              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-space-md pb-space-lg md:pb-space-md">
                                   <p className="font-label-sm text-label-sm font-bold uppercase tracking-wide text-teal-300">
                                        {berandaHero.imageCard.tag}
                                   </p>
                                   <p className="font-headline-sm text-headline-sm font-bold text-white">
                                        {berandaHero.imageCard.title}
                                   </p>
                                   <p className="hidden font-body-sm text-body-sm text-white/85 md:block">
                                        {berandaHero.imageCard.description}
                                   </p>
                              </div>
                         </div>
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

                    {/* Form Sewa Mobil + Teks Link di Bawah Form */}
                    {whatsapp && (
                         <div className="flex flex-col gap-space-md pt-space-xs">
                              <SewaMobilForm
                                   routes={routes}
                                   fleet={fleet}
                                   whatsapp={whatsapp}
                                   embedded
                                   headingLevel="h2"
                              />

                              {/* Teks Link Travel Per Kursi di Bawah Form */}
                              <p className="text-center font-body-md text-body-md text-on-surface-variant">
                                   {content.regularLink.text}{" "}
                                   <br className="sm:hidden" />
                                   <Link
                                        href={content.regularLink.href}
                                        className="font-bold text-primary underline underline-offset-4 transition-colors hover:text-primary-container"
                                   >
                                        {content.regularLink.label}
                                   </Link>
                              </p>
                         </div>
                    )}
               </div>
          </section>
     );
}