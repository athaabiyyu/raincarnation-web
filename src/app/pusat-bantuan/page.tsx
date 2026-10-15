import type { Metadata } from "next";
import Link from "next/link";
import {
     CalendarDays,
     CarFront,
     LifeBuoy,
     MapPin,
     MessageSquareText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CtaBanner from "@/components/sections/CtaBanner";
import HelpQuickForm from "@/components/sections/HelpQuickForm";
import { siteConfig } from "@/config/site";
import {
     pusatBantuanAreas,
     pusatBantuanChannels,
     pusatBantuanCta,
     pusatBantuanFaq,
     pusatBantuanHero,
     pusatBantuanMeta,
} from "@/constants/pusat-bantuan";
import type { HelpChannelIcon } from "@/constants/pusat-bantuan";
import { getSiteConfig } from "@/lib/wordpress/config";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

export const metadata: Metadata = {
     title: pusatBantuanMeta.title,
     description: pusatBantuanMeta.description,
     alternates: { canonical: "/pusat-bantuan" },
     openGraph: {
          type: "website",
          locale: "id_ID",
          siteName: siteConfig.name,
          url: "/pusat-bantuan",
          title: pusatBantuanMeta.title,
          description: pusatBantuanMeta.description,
          images: [
               { url: "/images/interior-armada.webp", alt: pusatBantuanMeta.ogAlt },
          ],
     },
     // SEMENTARA: hapus baris robots ini saat isi halaman sudah dikonfirmasi bos.
     robots: { index: false, follow: true },
};

const channelIcons: Record<HelpChannelIcon, LucideIcon> = {
     chat: MessageSquareText,
     car: CarFront,
     calendar: CalendarDays,
};

const eyebrowClass =
     "font-label-md text-label-md font-bold uppercase tracking-wider text-primary";

const waButtonClass =
     "inline-flex w-full items-center justify-center gap-space-sm rounded-lg bg-whatsapp px-space-md py-3 font-label-md text-label-md text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all duration-150 hover:bg-whatsapp-hover";

export default async function PusatBantuanPage() {
     const config = await getSiteConfig();
     const whatsapp = config.contact?.whatsapp ?? "";

     return (
          <main className="w-full bg-surface">
               {/* Hero */}
               <section className="w-full bg-surface-container-low py-space-xl">
                    <div className="mx-auto flex max-w-3xl flex-col items-center gap-space-md px-gutter text-center">
                         <div className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-space-md py-1.5 font-label-sm text-label-sm text-primary shadow-sm">
                              <LifeBuoy size={16} aria-hidden="true" />
                              {pusatBantuanHero.badge}
                         </div>
                         <h1 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                              {pusatBantuanHero.title}
                         </h1>
                         <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
                              {pusatBantuanHero.description}
                         </p>
                    </div>
               </section>

               {/* Kanal bantuan */}
               <section className="mx-auto w-full max-w-6xl px-gutter pt-space-lg">
                    <h2 className="sr-only">{pusatBantuanChannels.srTitle}</h2>
                    <div className="grid grid-cols-1 gap-space-md md:grid-cols-3">
                         {pusatBantuanChannels.items.map((item) => {
                              const ChannelIcon = channelIcons[item.icon];
                              return (
                                   <div
                                        key={item.title}
                                        className="flex flex-col justify-between gap-space-md rounded-xl bg-surface-container-lowest p-space-lg shadow-md"
                                   >
                                        <div className="space-y-space-sm">
                                             <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container/15 text-primary">
                                                  <ChannelIcon size={26} aria-hidden="true" />
                                             </span>
                                             <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                                  {item.title}
                                             </h3>
                                             <p className="font-body-sm text-body-sm text-on-surface-variant">
                                                  {item.description}
                                             </p>
                                        </div>
                                        {"href" in item && item.href ? (
                                             <Link
                                                  href={item.href}
                                                  className="inline-flex w-full items-center justify-center rounded-lg bg-surface-container-highest px-space-md py-3 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container-high"
                                             >
                                                  {item.button}
                                             </Link>
                                        ) : (
                                             whatsapp &&
                                             "message" in item && (
                                                  <a
                                                       href={buildWhatsAppUrl(whatsapp, item.message)}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className={waButtonClass}
                                                  >
                                                       <MessageSquareText size={18} aria-hidden="true" />
                                                       {item.button}
                                                  </a>
                                             )
                                        )}
                                   </div>
                              );
                         })}
                    </div>
               </section>

               {/* FAQ + form */}
               <section className="mx-auto w-full max-w-6xl px-gutter py-space-xl">
                    <div className="grid items-start gap-space-xl lg:grid-cols-12">
                         <div className="space-y-space-lg lg:col-span-8">
                              <div className="space-y-1">
                                   <p className={eyebrowClass}>{pusatBantuanFaq.eyebrow}</p>
                                   <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                                        {pusatBantuanFaq.title}
                                   </h2>
                                   <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        {pusatBantuanFaq.description}
                                   </p>
                              </div>

                              {pusatBantuanFaq.groups.map((group) => (
                                   <div key={group.title} className="space-y-space-sm">
                                        <h3 className="font-label-lg text-label-lg font-bold text-primary">
                                             {group.title}
                                        </h3>
                                        <div className="flex flex-col gap-3">
                                             {group.items.map((item) => (
                                                  <details
                                                       key={item.question}
                                                       className="group rounded-xl bg-surface-container-lowest p-space-md shadow-sm"
                                                  >
                                                       <summary className="cursor-pointer list-none font-label-lg text-label-lg font-bold text-on-surface transition-colors group-open:text-primary">
                                                            {item.question}
                                                       </summary>
                                                       <p className="pt-space-sm font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                                                            {item.answer}
                                                       </p>
                                                  </details>
                                             ))}
                                        </div>
                                   </div>
                              ))}
                         </div>

                         {whatsapp && (
                              <div className="lg:col-span-4">
                                   <HelpQuickForm whatsapp={whatsapp} />
                              </div>
                         )}
                    </div>
               </section>

               {/* Area layanan */}
               <section className="w-full bg-surface-container-low py-space-xl">
                    <div className="mx-auto max-w-6xl space-y-space-lg px-gutter">
                         <div className="max-w-2xl space-y-1">
                              <p className={eyebrowClass}>{pusatBantuanAreas.eyebrow}</p>
                              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                                   {pusatBantuanAreas.title}
                              </h2>
                              <p className="font-body-md text-body-md text-on-surface-variant">
                                   {pusatBantuanAreas.description}
                              </p>
                         </div>
                         <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-5">
                              {pusatBantuanAreas.items.map((area) => (
                                   <div
                                        key={area.name}
                                        className="space-y-space-sm rounded-xl bg-surface-container-lowest p-space-lg shadow-sm"
                                   >
                                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                             <MapPin size={20} aria-hidden="true" />
                                        </span>
                                        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                             {area.name}
                                        </h3>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                                             {area.detail}
                                        </p>
                                   </div>
                              ))}
                         </div>
                    </div>
               </section>

               {/* Banner kendala */}
               {whatsapp && (
                    <section className="mx-auto w-full max-w-6xl px-gutter py-space-xl">
                         <div className="flex flex-col items-center justify-between gap-space-lg rounded-xl bg-gradient-to-r from-primary to-secondary p-space-lg text-on-primary shadow-xl md:flex-row md:p-space-xl">
                              <div className="max-w-xl space-y-2">
                                   <h2 className="font-headline-lg text-headline-lg font-extrabold leading-tight">
                                        {pusatBantuanCta.title}
                                   </h2>
                                   <p className="font-body-md text-body-md text-on-primary/90">
                                        {pusatBantuanCta.description}
                                   </p>
                              </div>
                              <a
                                   href={buildWhatsAppUrl(whatsapp, pusatBantuanCta.message)}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-surface-container-lowest px-space-lg py-3 font-label-md text-label-md font-bold text-secondary shadow-md transition-colors hover:bg-surface sm:w-auto"
                              >
                                   <MessageSquareText size={20} aria-hidden="true" />
                                   {pusatBantuanCta.button}
                              </a>
                         </div>
                    </section>
               )}

               {whatsapp && <CtaBanner whatsapp={whatsapp} />}
          </main>
     );
}