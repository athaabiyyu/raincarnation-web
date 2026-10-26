import Image from "next/image";
import Link from "next/link";
import { Bus, Headset, MapPin, MessageSquareText } from "lucide-react";
import { footerContent, footerLocations } from "@/constants/footer";
import { getSiteConfig } from "@/lib/wordpress/config";
import { formatPhoneDisplay } from "@/utils/format-phone";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

const headingClass =
     "mb-space-md flex items-center gap-2 font-label-lg text-label-lg text-on-surface";

export default async function Footer() {
     const config = await getSiteConfig();
     const whatsapp = config.contact?.whatsapp;
     const year = new Date().getFullYear();
     const c = footerContent;

     return (
          <footer className="w-full bg-surface-container-low pb-space-lg pt-space-xl text-on-surface">
               <div className="mx-auto max-w-6xl px-gutter">
                    <div className="grid grid-cols-1 gap-x-gutter gap-y-space-lg pb-space-xl lg:grid-cols-12">
                         {/* Brand */}
                         <div className="space-y-space-md lg:col-span-5">
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
                              <div className="max-w-md">
                                   <h2 className={headingClass}>
                                        <MapPin
                                             size={16}
                                             className="shrink-0 text-primary"
                                             aria-hidden="true"
                                        />
                                        {footerLocations.title}
                                   </h2>
                                   <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
                                        {footerLocations.items.map((loc) => (
                                             <li key={loc.name}>
                                                  <p className="font-bold text-on-surface">{loc.name}</p>
                                                  <p>{loc.address}</p>
                                             </li>
                                        ))}
                                   </ul>
                              </div>
                         </div>

                         {/* Layanan & navigasi */}
                         <div className="lg:col-span-3">
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
                              <div className="space-y-space-md lg:col-span-4">
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
                                        <p className="whitespace-nowrap font-label-md text-label-md font-bold text-primary">
                                             {formatPhoneDisplay(whatsapp)}
                                        </p>
                                   </div>
                                   <a
                                        href={buildWhatsAppUrl(whatsapp, c.whatsappMessage)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-space-md py-space-sm text-center font-label-md text-label-md text-on-primary shadow-sm transition-all hover:bg-primary/90"
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

                    <p className="pt-space-md text-center font-body-sm text-body-sm text-on-surface-variant md:text-left">
                         © {year} {c.companyName}. {c.copyrightSuffix}
                    </p>
               </div>
          </footer>
     );
}