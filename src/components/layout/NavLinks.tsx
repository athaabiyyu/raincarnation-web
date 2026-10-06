"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/config/navigation";

export default function NavLinks() {
     const pathname = usePathname();

     return (
          <nav className="hidden xl:flex items-center gap-1 font-label-md text-label-md">
               {mainNav.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                         <Link
                              key={item.href}
                              href={item.href}
                              aria-current={isActive ? "page" : undefined}
                              className={
                                   isActive
                                        ? "px-space-sm py-space-xs transition-colors whitespace-nowrap bg-surface-container text-primary font-bold rounded-lg"
                                        : "px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors whitespace-nowrap"
                              }
                         >
                              {item.label}
                         </Link>
                    );
               })}
          </nav>
     );
}