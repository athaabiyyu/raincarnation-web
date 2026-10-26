import Image from "next/image";
import {
     Armchair,
     Crown,
     Luggage,
     MessageSquareText,
     ShieldCheck,
     Sparkles,
     Star,
     Zap,
} from "lucide-react";

type SewaMobilUnitHeroProps = {
     name: string;
     label?: string;
     seats?: string;
     luggage?: string;
     imageUrl?: string;
     imageAlt?: string;
     whatsappUrl?: string | null;
};

// Aturan ikon disalin dari ArmadaCard supaya badge-nya sama.
function renderLabelBadge(label: string) {
     if (!label) return null;

     const lower = label.toLowerCase();

     let IconComponent = Star;

     if (lower.includes("premium")) {
          IconComponent = Crown;
     } else if (lower.includes("medium")) {
          IconComponent = Sparkles;
     } else if (lower.includes("standart") || lower.includes("standard")) {
          IconComponent = ShieldCheck;
     } else if (lower.includes("ekonomi")) {
          IconComponent = Zap;
     }

     return (
          <span className="flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
               <IconComponent
                    className="h-3.5 w-3.5 fill-primary text-primary"
                    aria-hidden="true"
               />
               <span>{label}</span>
          </span>
     );
}

export default function SewaMobilUnitHero({
     name,
     label,
     seats,
     luggage,
     imageUrl,
     imageAlt,
     whatsappUrl,
}: SewaMobilUnitHeroProps) {
     return (
          <section className="w-full bg-surface py-space-xl">
               <div className="mx-auto grid max-w-6xl gap-space-md px-gutter md:grid-cols-2 md:gap-x-space-lg">
                    {/* Judul: badge + H1 (HP urutan 1) */}
                    <div className="flex flex-col gap-space-md md:col-start-1 md:row-start-1 md:self-end">
                         {label && renderLabelBadge(label)}
                         <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
                              Sewa{" "}
                              <span className="text-primary-container">{name}</span>{" "}
                              Malang
                         </h1> 
                    </div>

                    {/* Gambar (HP urutan 2; desktop di kanan, setinggi dua baris) */}
                    {imageUrl && (
                         <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-container md:col-start-2 md:row-span-2 md:row-start-1 md:self-center">
                              <Image
                                   src={imageUrl}
                                   alt={imageAlt || name}
                                   fill
                                   priority
                                   sizes="(min-width: 768px) 50vw, 100vw"
                                   className="object-cover"
                              />
                         </div>
                    )}

                    {/* Isi: deskripsi, kapasitas, tombol (HP urutan 3) */}
                    <div className="flex flex-col gap-space-md md:col-start-1 md:row-start-2 md:self-start">
                         <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
                              Sewa {name} dengan titik sewa di Malang, Batu, dan Surabaya.
                              Cek layanan dan harga di bawah, lalu pesan lewat WhatsApp.
                         </p>

                         {(seats || luggage) && (
                              <ul className="grid grid-cols-2 gap-space-sm">
                                   {seats && (
                                        <li className="flex items-center gap-3 rounded-xl border border-surface-container-high/60 bg-surface-container-lowest p-space-sm">
                                             <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                  <Armchair size={20} aria-hidden="true" />
                                             </span>
                                             <div className="min-w-0">
                                                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                                                       Kapasitas
                                                  </p>
                                                  <p className="font-label-md text-label-md font-bold text-on-surface">
                                                       {seats}
                                                  </p>
                                             </div>
                                        </li>
                                   )}
                                   {luggage && (
                                        <li className="flex items-center gap-3 rounded-xl border border-surface-container-high/60 bg-surface-container-lowest p-space-sm">
                                             <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                  <Luggage size={20} aria-hidden="true" />
                                             </span>
                                             <div className="min-w-0">
                                                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                                                       Bagasi Koper
                                                  </p>
                                                  <p className="font-label-md text-label-md font-bold text-on-surface">
                                                       {luggage}
                                                  </p>
                                             </div>
                                        </li>
                                   )}
                              </ul>
                         )}

                         {whatsappUrl && (
                              <a
                                   href={whatsappUrl}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-space-md py-3 text-sm font-bold text-on-primary shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98] sm:w-fit"
                              >
                                   <MessageSquareText size={18} aria-hidden="true" />
                                   <span>Pesan {name} via WhatsApp</span>
                              </a>
                         )}
                    </div>
               </div>
          </section>
     );
}