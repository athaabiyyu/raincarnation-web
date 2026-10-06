"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import { mainNav } from "@/config/navigation";

type Props = {
     waOrder: string | null;
};

export default function MobileMenu({ waOrder }: Props) {
     const [open, setOpen] = useState(false);
     const pathname = usePathname();

     return (
          <div className="xl:hidden">
               <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label={open ? "Tutup menu" : "Buka menu"}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors"
               >
                    {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
               </button>

               {open && (
                    <div
                         id="mobile-menu"
                         className="absolute left-0 right-0 top-full bg-surface-container-lowest shadow-[0_8px_24px_rgba(0,107,95,0.12)]"
                    >
                         <nav className="max-w-7xl mx-auto px-gutter py-space-md flex flex-col gap-space-xs font-label-md text-label-md">
                              {mainNav.map((item) => {
                                   const isActive = pathname === item.href;
                                   return (
                                        <Link
                                             key={item.href}
                                             href={item.href}
                                             onClick={() => setOpen(false)}
                                             aria-current={isActive ? "page" : undefined}
                                             className={
                                                  isActive
                                                       ? "px-space-md py-space-sm rounded-lg bg-surface-container text-primary font-bold"
                                                       : "px-space-md py-space-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
                                             }
                                        >
                                             {item.label}
                                        </Link>
                                   );
                              })}

                              {waOrder && (
                                   <a
                                        href={waOrder}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="sm:hidden mt-space-sm inline-flex items-center justify-center gap-1 px-space-md py-space-sm rounded-lg bg-whatsapp text-on-whatsapp font-label-md text-label-md hover:bg-whatsapp-hover transition-all"
                                   >
                                        <MessageCircle size={18} aria-hidden />
                                        Pesan via WhatsApp
                                   </a>
                              )}
                         </nav>
                    </div>
               )}
          </div>
     );
}