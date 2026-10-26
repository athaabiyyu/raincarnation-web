import Image from "next/image";
import { berandaHero } from "@/constants/beranda";

type BerandaHeroProps = {
     unitCount?: number;
};

export default function BerandaHero({ unitCount = 0 }: BerandaHeroProps) {
     const stats = [
          ...(unitCount > 0
               ? [{ value: `${unitCount} Unit`, label: berandaHero.unitLabel }]
               : []),
          ...berandaHero.stats,
     ];

     return (
          <section className="w-full bg-linear-to-b from-surface-container-high/40 via-surface to-surface pb-space-lg pt-space-md md:pt-space-xl lg:pb-space-xl">
               <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-gutter pt-space-md">
                    {/* Grid 2 kolom dengan perataan vertikal center */}
                    <div className="grid items-center gap-space-lg lg:grid-cols-2">

                         {/* Wadah Teks Kiri */}
                         <div className="flex flex-col gap-space-md lg:max-w-xl">
                              <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
                                   {berandaHero.titleStart}{" "}
                                   <span className="text-primary-container">
                                        {berandaHero.titleHighlight}
                                   </span>{" "}
                                   {berandaHero.titleEnd}
                              </h1>

                              <p className="font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
                                   {berandaHero.description}
                              </p>

                              {/* Kartu angka: fakta terkonfirmasi, bukan data contoh desain */}
                              <ul className="grid w-full grid-cols-3 gap-2 sm:gap-space-sm lg:w-fit">
                                   {stats.map((stat) => (
                                        <li
                                             key={stat.label}
                                             className="flex flex-col items-center gap-1 text-center rounded-xl bg-surface-container-lowest px-2 py-space-sm shadow-sm sm:px-space-md md:items-start md:gap-0 md:text-left"
                                        >
                                             <span className="text-lg font-bold leading-tight text-primary sm:text-xl md:text-2xl">
                                                  {stat.value}
                                             </span>
                                             <span className="text-[11px] leading-tight text-on-surface-variant sm:text-label-sm">
                                                  {stat.label}
                                             </span>
                                        </li>
                                   ))}
                              </ul>
                         </div>

                         {/* Foto Kanan: Aspect ratio sedang & mengisi penuh lebar kolomnya */}
                         <div className="relative hidden aspect-[16/11] w-full overflow-hidden rounded-3xl shadow-md lg:block">
                              <Image
                                   src={berandaHero.image.src}
                                   alt={berandaHero.image.alt}
                                   fill
                                   priority
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