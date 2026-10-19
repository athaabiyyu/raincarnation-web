import Image from "next/image";
import { berandaHero } from "@/constants/beranda";

export default function BerandaHero() {
     return (
          <section className="w-full bg-linear-to-b from-surface-container-high/40 via-surface to-surface pt-space-md pb-space-md md:pt-space-xl lg:pb-space-xl">
               <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-gutter pt-space-md">
                    {/* Grid 2 kolom dengan tinggi yang selaras */}
                    <div className="grid items-stretch gap-space-lg lg:grid-cols-2">
                         
                         {/* Wadah Utama Kiri */}
                         <div className="flex flex-col justify-between lg:self-stretch">
                              {/* Bagian Atas: Title H1 */}
                              <div>
                                   <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
                                        {berandaHero.titleStart}{" "}
                                        <span className="text-primary-container">
                                             {berandaHero.titleHighlight}
                                        </span>{" "}
                                        {berandaHero.titleEnd}
                                   </h1>
                              </div>

                              {/* Bagian Bawah: Deskripsi selalu tampil, sedangkan fitur keunggulan hanya muncul di layar lg */}
                              <div className="mt-4 flex flex-col gap-space-md lg:mt-0">
                                   {/* Deskripsi (Kini muncul di mobile maupun desktop) */}
                                   <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                                        {berandaHero.description}
                                   </p>
                              </div>
                         </div>

                         {/* Foto Kanan (Tetap tersembunyi di mobile, tampil di lg) */}
                         <div className="hidden lg:block relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lg">
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