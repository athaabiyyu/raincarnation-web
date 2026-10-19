import Image from "next/image";
import { armadaHero } from "@/constants/armada";
import { berandaHero } from "@/constants/beranda";

export default function ArmadaHero() {
     return (
          <section className="relative w-full overflow-hidden border-b border-surface-container-high/30 bg-linear-to-b from-surface-container-high/50 via-surface to-surface pb-space-xl pt-space-md">
               <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-gutter pt-space-md">
                    {/* Grid 2 Kolom dengan Perataan Vertikal Center */}
                    <div className="grid items-center gap-space-lg lg:grid-cols-2">
                         {/* Sisi Kiri: Judul & Deskripsi */}
                         <div className="flex flex-col gap-space-md lg:max-w-xl">
                              <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
                                   {armadaHero.title}
                              </h1>

                              <p className="font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
                                   {armadaHero.description}
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
               </div>
          </section>
     );
}