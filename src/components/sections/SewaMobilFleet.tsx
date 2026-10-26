import Link from "next/link";
import { ArrowRight, Bus, MessageCircle } from "lucide-react";
import ArmadaCard from "@/components/sections/ArmadaCard";
import FleetCarousel from "@/components/ui/FleetCarousel";
import { sewaMobilFleet } from "@/constants/sewa-mobil";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import type { Armada } from "@/types/armada";

const IMAGE_SIZES =
     "(min-width: 1024px) 352px, (min-width: 768px) 50vw, 85vw";

type SewaMobilFleetProps = {
     armada: Armada[];
     whatsapp: string;
};

export default function SewaMobilFleet({
     armada,
     whatsapp,
}: SewaMobilFleetProps) {
     if (armada.length === 0) return null;

     const { customCard } = sewaMobilFleet;

     return (
          <section className="w-full bg-surface py-space-xl">
               <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-gutter">
                    {/* Header Section dengan Eyebrow Hijau */}
                    <div className="flex flex-col gap-space-md md:flex-row md:items-end md:justify-between">
                         <div className="flex flex-col gap-1.5">
                              <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                                   {sewaMobilFleet.eyebrow}
                              </span>
                              <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                                   {sewaMobilFleet.title}
                              </h2>
                              <p className="max-w-2xl font-body-md text-body-md leading-relaxed text-on-surface-variant">
                                   {sewaMobilFleet.description}
                              </p>
                         </div>
                    </div>

                    <FleetCarousel>
                         {armada.map((item) => (
                              <ArmadaCard
                                   key={item.id}
                                   item={item}
                                   whatsapp={whatsapp}
                                   imageSizes={IMAGE_SIZES}
                              />
                         ))}

                         {/* Custom Card untuk Armada Khusus */}
                         <div className="flex flex-col justify-between rounded-3xl bg-linear-to-br from-primary via-primary to-primary-container p-space-lg text-on-primary shadow-xl ring-1 ring-primary-container/30">
                              <div className="flex flex-col gap-space-xs">
                                   <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest opacity-85">
                                        {customCard.eyebrow}
                                   </span>
                                   <h3 className="font-headline-sm text-headline-sm font-extrabold tracking-tight text-on-primary">
                                        {customCard.title}
                                   </h3>
                                   <p className="font-body-sm text-body-sm leading-relaxed opacity-90">
                                        {customCard.description}
                                   </p>
                              </div>
                              {whatsapp && (
                                   <a
                                        href={buildWhatsAppUrl(whatsapp, customCard.message)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-space-md inline-flex w-full items-center justify-center gap-2 rounded-xl bg-surface-container-lowest px-space-md py-3 font-label-md text-label-md font-bold text-primary shadow-lg transition-all hover:bg-surface-container-high"
                                   >
                                        <MessageCircle size={18} aria-hidden="true" />
                                        {customCard.buttonLabel}
                                   </a>
                              )}
                         </div>
                    </FleetCarousel>

                    {/* Banner Unit Lain */}
                    <div className="flex flex-col items-center justify-between gap-space-md rounded-2xl bg-surface-container-lowest p-space-md shadow-sm lg:flex-row lg:p-space-lg">
                         <div className="flex w-full items-center gap-space-md lg:w-auto">
                              <div className="flex shrink-0 items-center justify-center rounded-2xl bg-primary-container/10 p-3 text-primary sm:p-3.5">
                                   <Bus className="h-6 w-6" aria-hidden="true" />
                              </div>
                              <div className="space-y-0.5">
                                   <p className="font-label-lg text-label-lg font-bold text-on-surface">
                                        Mencari Pilihan Unit Lain?
                                   </p>
                                   <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        <span className="sm:hidden">Lihat semua unit armada kami.</span>
                                        <span className="hidden sm:inline">
                                             Lihat semua unit armada kami dengan menekan tombol disamping.
                                        </span>
                                   </p>
                              </div>
                         </div>
                         <div className="flex w-full shrink-0 flex-col gap-space-xs sm:flex-row lg:w-auto">
                              <Link
                                   href={sewaMobilFleet.seeAll.href}
                                   className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-space-md py-2.5 text-center font-label-md text-label-md font-bold text-on-primary shadow-sm transition-all hover:bg-primary/90 active:scale-95 lg:w-auto"
                              >
                                   Lihat Semua Unit
                                   <ArrowRight className="h-4 w-4" aria-hidden="true" />
                              </Link>
                         </div>
                    </div>
               </div>
          </section>
     );
}