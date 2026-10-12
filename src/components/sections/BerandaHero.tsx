import Image from "next/image";
import Link from "next/link";
import {
     ArrowRight,
     BadgeCheck,
     CircleCheck,
     MessageCircle,
     Users,
} from "lucide-react";
import { berandaHero } from "@/constants/beranda";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

type BerandaHeroProps = {
     whatsapp: string;
};

export default function BerandaHero({ whatsapp }: BerandaHeroProps) {
     const whatsappUrl = whatsapp
          ? buildWhatsAppUrl(whatsapp, berandaHero.whatsappMessage)
          : null;

     return (
          <section className="w-full bg-linear-to-b from-surface-container-high/40 via-surface to-surface pt-space-md pb-space-xl md:pt-space-xl">
               <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-gutter">
                    <div className="grid gap-space-lg lg:grid-cols-2 lg:content-center lg:gap-y-space-md">
                         {/* Blok A: badge + H1 (laptop: kolom kiri, baris atas) */}
                         <div className="flex flex-col gap-space-md lg:self-end">
                              <span className="inline-flex w-fit max-w-full items-start gap-space-xs rounded-2xl bg-primary-container/15 px-space-md py-1.5 font-label-sm text-label-sm font-bold uppercase tracking-wide text-primary sm:items-center sm:rounded-full sm:py-1">
                                   <BadgeCheck size={14} className="mt-0.5 shrink-0 sm:mt-0" aria-hidden="true" />
                                   {berandaHero.badge}
                              </span>

                              <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
                                   {berandaHero.titleStart}{" "}
                                   <span className="text-primary-container">
                                        {berandaHero.titleHighlight}
                                   </span>{" "}
                                   {berandaHero.titleEnd}
                              </h1>
                         </div>

                         {/* Foto: HP di antara H1 dan deskripsi; laptop di kanan, membentang 2 baris */}
                         <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lg lg:col-start-2 lg:row-span-2 lg:row-start-1">
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

                         {/* Blok B: deskripsi (laptop: kolom kiri, baris bawah) */}
                         <div className="flex flex-col gap-space-md lg:col-start-1 lg:row-start-2 lg:self-start">
                              <p className="font-body-lg text-body-lg text-on-surface-variant">
                                   {berandaHero.description}
                              </p>

                              {/* <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                                   <Link
                                        href={berandaHero.travelButton.href}
                                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-space-lg py-space-sm font-label-md text-label-md text-on-primary shadow-md transition-all hover:bg-on-primary-fixed-variant active:scale-95"
                                   >
                                        {berandaHero.travelButton.label}
                                        <ArrowRight size={18} aria-hidden="true" />
                                   </Link>
                                   <Link
                                        href={berandaHero.charterButton.href}
                                        className="inline-flex items-center gap-2 rounded-xl border border-surface-container bg-surface-container-lowest px-space-md py-space-sm font-label-md text-label-md text-primary shadow-sm transition-all hover:bg-surface-container"
                                   >
                                        <Users size={18} aria-hidden="true" />
                                        {berandaHero.charterButton.label}
                                   </Link>
                                   {whatsappUrl && (
                                        <a
                                             href={whatsappUrl}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className="inline-flex items-center gap-2 rounded-xl bg-whatsapp px-space-md py-space-sm font-label-md text-label-md text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all hover:bg-whatsapp-hover active:scale-95"
                                        >
                                             <MessageCircle size={18} aria-hidden="true" />
                                             {berandaHero.whatsappButton}
                                        </a>
                                   )}
                              </div> */}
                         </div>
                    </div>

                    <ul className="mt-space-md hidden flex-wrap justify-center gap-space-sm px-space-md font-label-md text-label-md font-semibold text-primary md:flex lg:justify-between lg:px-0">
                         {berandaHero.checks.map((check) => (
                              <li
                                   key={check}
                                   className="flex max-w-full items-center gap-2 rounded-full bg-primary-container/15 px-space-md py-space-xs"
                              >
                                   <CircleCheck
                                        size={16}
                                        className="shrink-0 text-primary"
                                        aria-hidden="true"
                                   />
                                   {check}
                              </li>
                         ))}
                    </ul>
               </div>
          </section>
     );
}