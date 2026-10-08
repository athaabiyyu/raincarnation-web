import Image from "next/image";
import Link from "next/link";
import {
     Bus,
     Headset,
     MessageSquareText,
     Route as RouteIcon,
     ShieldCheck,
     Star,
} from "lucide-react";
import { footerContent } from "@/constants/footer";
import { getSiteConfig } from "@/lib/wordpress/config";
import { getRoutes } from "@/lib/wordpress/routes";
import type { Route } from "@/types/route";
import { formatPhoneDisplay } from "@/utils/format-phone";
import { getRoutePairs } from "@/utils/route-pairs";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

// getRoutes tidak tahan error di lib, jadi dijaga di sini.
async function loadRoutes(): Promise<Route[]> {
     try {
          return await getRoutes();
     } catch (error) {
          console.error("[Footer] Gagal mengambil rute dari CMS:", error);
          return [];
     }
}

const headingClass =
     "mb-space-md flex items-center gap-2 font-label-lg text-label-lg text-on-surface";

export default async function Footer() {
     const [config, routes] = await Promise.all([getSiteConfig(), loadRoutes()]);
     const whatsapp = config.contact?.whatsapp;
     const popularRoutes = getRoutePairs(routes).slice(0, 6);
     const year = new Date().getFullYear();
     const c = footerContent;

     return (
          <footer className="w-full bg-surface-container-low pb-space-lg pt-space-xl text-on-surface">
               <div className="mx-auto max-w-6xl px-gutter">
                    <div className="grid grid-cols-1 gap-gutter pb-space-xl sm:grid-cols-2 lg:grid-cols-5">
                         {/* Brand */}
                         <div className="space-y-space-md sm:col-span-2">
                              <Image
                                   src="/logo.webp"
                                   alt="Raincarnation"
                                   width={240}
                                   height={80}
                                   className="h-12 w-auto rounded-lg object-contain"
                              />
                              <p className="max-w-md font-body-sm text-body-sm text-on-surface-variant">
                                   {c.description}
                              </p>

                              <div className="inline-flex items-center gap-space-md rounded-xl bg-surface-container-lowest p-space-sm shadow-sm">
                                   <div className="flex items-center gap-1 rounded-lg bg-surface-container-high px-space-sm py-1 text-primary">
                                        <Star
                                             size={16}
                                             className="shrink-0 fill-current text-primary-container"
                                             aria-hidden="true"
                                        />
                                        <span className="font-label-lg text-label-lg font-bold">
                                             {c.rating.score}
                                        </span>
                                   </div>
                                   <div className="flex flex-col">
                                        <span className="font-label-sm text-label-sm font-bold text-on-surface">
                                             {c.rating.title}
                                        </span>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                                             {c.rating.subtitle}
                                        </span>
                                   </div>
                              </div>

                              <div className="flex items-center gap-space-sm text-on-surface-variant">
                                   <ShieldCheck
                                        size={20}
                                        className="shrink-0 text-primary-container"
                                        aria-hidden="true"
                                   />
                                   <span className="font-label-sm text-label-sm">{c.guarantee}</span>
                              </div>
                         </div>

                         {/* Rute populer, hanya bila ada nomor WA dan data rute */}
                         {whatsapp && popularRoutes.length > 0 && (
                              <div>
                                   <h2 className={headingClass}>
                                        <RouteIcon
                                             size={16}
                                             className="shrink-0 text-primary"
                                             aria-hidden="true"
                                        />
                                        {c.popularRoutesTitle}
                                   </h2>
                                   <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
                                        {popularRoutes.map((pair) => (
                                             <li key={`${pair.from}-${pair.to}`}>
                                                  <a
                                                       href={buildWhatsAppUrl(
                                                            whatsapp,
                                                            `Halo Admin, saya mau tanya info rute ${pair.from} ${pair.to}`,
                                                       )}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="transition-colors hover:text-primary"
                                                  >
                                                       {pair.from} - {pair.to}
                                                  </a>
                                             </li>
                                        ))}
                                   </ul>
                              </div>
                         )}

                         {/* Layanan & navigasi */}
                         <div>
                              <h2 className={headingClass}>
                                   <Bus
                                        size={16}
                                        className="shrink-0 text-primary"
                                        aria-hidden="true"
                                   />
                                   {c.servicesTitle}
                              </h2>
                              <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
                                   {c.serviceLinks.map((link) => (
                                        <li key={link.href}>
                                             <Link
                                                  href={link.href}
                                                  className="transition-colors hover:text-primary"
                                             >
                                                  {link.label}
                                             </Link>
                                        </li>
                                   ))}
                              </ul>
                         </div>

                         {/* Pusat dukungan, hanya bila ada nomor WA */}
                         {whatsapp && (
                              <div className="space-y-space-md">
                                   <h2 className={headingClass}>
                                        <Headset
                                             size={16}
                                             className="shrink-0 text-primary"
                                             aria-hidden="true"
                                        />
                                        {c.supportTitle}
                                   </h2>
                                   <div className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                                        <p className="font-bold text-on-surface">{c.whatsappLabel}</p>
                                        <p className="font-label-md text-label-md font-bold text-primary">
                                             <span className="whitespace-nowrap">
                                                  {formatPhoneDisplay(whatsapp)}
                                             </span>{" "}
                                             <span className="whitespace-nowrap">{c.whatsappNote}</span>
                                        </p>
                                   </div>
                                   <a
                                        href={buildWhatsAppUrl(whatsapp, c.whatsappMessage)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-whatsapp px-space-md py-space-sm text-center font-label-md text-label-md text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all hover:bg-whatsapp-hover"
                                   >
                                        <MessageSquareText
                                             size={18}
                                             className="shrink-0"
                                             aria-hidden="true"
                                        />
                                        {c.whatsappButton}
                                   </a>
                              </div>
                         )}
                    </div>

                    {/* Kotak kemudahan reservasi */}
                    <div className="mb-space-lg rounded-xl bg-surface-container p-space-md md:px-space-lg">
                         <div className="flex flex-col justify-between gap-space-md lg:flex-row lg:items-center">
                              <div className="flex items-center gap-space-sm">
                                   <MessageSquareText
                                        size={20}
                                        className="shrink-0 text-primary"
                                        aria-hidden="true"
                                   />
                                   <span className="font-label-md text-label-md font-bold text-on-surface">
                                        {c.reservationTitle}
                                   </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-space-sm font-label-sm text-label-sm font-bold text-primary">
                                   {c.reservationChips.map((chip) => (
                                        <span
                                             key={chip}
                                             className="rounded bg-surface-container-lowest px-space-sm py-1 shadow-sm"
                                        >
                                             {chip}
                                        </span>
                                   ))}
                              </div>
                         </div>
                    </div>

                    <p className="pt-space-md text-center font-body-sm text-body-sm text-on-surface-variant md:text-left">
                         © {year} {c.companyName}. {c.copyrightSuffix}
                    </p>
               </div>
          </footer>
     );
}