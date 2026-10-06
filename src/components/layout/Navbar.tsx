import Link from "next/link";// import Image from "next/image"; // aktifkan lagi bersama blok <Image> saat logo siap
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
                    <div className="max-w-7xl mx-auto flex items-center justify-between font-label-sm text-label-sm">
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
                    <div className="h-20 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md">
                         <Link href="/" className="flex items-center gap-space-sm shrink-0">
                              {/* <Image
                                   src="/logo.webp"
                                   alt={`Logo ${siteConfig.name}`}
                                   width={40}
                                   height={40}
                                   priority
                                   className="w-10 h-10 rounded-xl object-cover shadow-[0_4px_12px_rgba(0,107,95,0.2)]"
                              /> */}
                              <div className="flex flex-col">
                                   <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-tight font-bold">
                                        {siteConfig.name}
                                   </span>
                                   <span className="hidden md:block font-label-sm text-label-sm text-on-surface-variant font-normal tracking-wide">
                                        {siteConfig.tagline}
                                   </span>
                              </div>
                         </Link>

                         <NavLinks />

                         <div className="flex items-center gap-space-sm shrink-0">
                              {waOrder && (
                                   <a
                                        href={waOrder}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hidden sm:inline-flex items-center justify-center gap-1 px-space-md py-space-sm rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-[0_4px_16px_rgba(0,168,150,0.35)] hover:bg-primary transition-all duration-150"
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