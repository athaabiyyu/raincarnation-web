import Link from "next/link";
import Image from "next/image";
import { Zap, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { topbarMessages } from "@/constants/topbar";
import { getSiteConfig } from "@/lib/wordpress/config";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { formatPhoneDisplay } from "@/utils/format-phone";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
     const config = await getSiteConfig();
     const whatsapp = config.contact?.whatsapp;

     const waGeneral = whatsapp ? buildWhatsAppUrl(whatsapp) : null;
     const waOrder = whatsapp
          ? buildWhatsAppUrl(
               whatsapp,
               "Halo Raincarnation, saya ingin pesan layanan travel/carter",
          )
          : null;

     return (
          <header className="sticky top-0 z-50">
               {/* Top bar */}
               <div className="bg-primary text-on-primary py-space-xs px-gutter">
                    <div className="flex items-center justify-between font-label-sm text-label-sm">
                         <div className="flex min-w-0 items-center gap-space-sm overflow-hidden text-ellipsis whitespace-nowrap">
                              <span className="flex items-center gap-1">
                                   <Zap size={14} className="text-primary-fixed" aria-hidden />
                                   {topbarMessages[0]}
                              </span>
                              <span className="opacity-50 hidden sm:inline">|</span>
                              <span className="hidden md:inline">{topbarMessages[1]}</span>
                              <span className="opacity-50 hidden md:inline">|</span>
                              <span className="hidden lg:inline">{topbarMessages[2]}</span>
                         </div>

                         {waGeneral && whatsapp && (
                              <div className="hidden sm:flex items-center gap-space-md shrink-0">
                                   <a
                                        href={waGeneral}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-primary-fixed flex items-center gap-1 transition-colors"
                                   >
                                        <MessageCircle size={14} aria-hidden />
                                        Konsultasi WA 24 Jam: {formatPhoneDisplay(whatsapp)}
                                   </a>
                              </div>
                         )}
                    </div>
               </div>

               {/* Navbar utama */}
               <div className="bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,107,95,0.06)]">
                    <div className="h-16 md:h-20 px-gutter flex items-center gap-space-md">
                         {/* Kiri: logo */}
                         <div className="flex flex-1 justify-start">
                              <Link href="/" className="shrink-0">
                                   <Image
                                        src="/logo.webp"
                                        alt={`Logo ${siteConfig.name}`}
                                        width={240}
                                        height={80}
                                        priority
                                        className="h-9 md:h-12 w-auto object-contain"
                                   />
                              </Link>
                         </div>

                         {/* Tengah: menu */}
                         <NavLinks />

                         {/* Kanan: tombol */}
                         <div className="flex flex-1 items-center justify-end gap-space-sm">
                              {waOrder && (
                                   <a
                                        href={waOrder}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hidden sm:inline-flex items-center justify-center gap-1 px-space-md py-space-sm rounded-lg bg-whatsapp text-on-whatsapp font-label-md text-label-md shadow-[0_4px_16px_rgba(37,211,102,0.35)] hover:bg-whatsapp-hover transition-all duration-150"
                                   >
                                        <MessageCircle size={18} aria-hidden />
                                        Pesan via WhatsApp
                                   </a>
                              )}
                              <MobileMenu waOrder={waOrder} />
                         </div>
                    </div>
               </div>
          </header>
     );
}