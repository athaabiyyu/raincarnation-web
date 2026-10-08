"use client";

import { Children, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FleetCarouselProps = {
     children: ReactNode;
};

// Jarak antar kartu = gutter (1.5rem) = 24px. Ubah juga bila gutter di globals.css berubah.
const GAP_PX = 24;

export default function FleetCarousel({ children }: FleetCarouselProps) {
     const scrollerRef = useRef<HTMLDivElement>(null);
     const [canPrev, setCanPrev] = useState(false);
     const [canNext, setCanNext] = useState(false);

     useEffect(() => {
          const scroller = scrollerRef.current;
          if (!scroller) return;

          const update = () => {
               setCanPrev(scroller.scrollLeft > 1);
               setCanNext(
                    scroller.scrollLeft + scroller.clientWidth <
                    scroller.scrollWidth - 1,
               );
          };

          scroller.addEventListener("scroll", update, { passive: true });
          const observer = new ResizeObserver(update);
          observer.observe(scroller);

          return () => {
               scroller.removeEventListener("scroll", update);
               observer.disconnect();
          };
     }, []);

     function scrollByCard(direction: 1 | -1) {
          const scroller = scrollerRef.current;
          if (!scroller) return;
          const firstCard = scroller.firstElementChild as HTMLElement | null;
          const step = (firstCard?.offsetWidth ?? 300) + GAP_PX;
          const reduceMotion = window.matchMedia(
               "(prefers-reduced-motion: reduce)",
          ).matches;
          scroller.scrollBy({
               left: direction * step,
               behavior: reduceMotion ? "auto" : "smooth",
          });
     }

     const showButtons = canPrev || canNext;
     const buttonClass =
          "absolute top-[7.5rem] z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg ring-2 ring-surface-container-lowest transition-all hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary md:top-1/2 md:h-11 md:w-11";
     return (
          <div className="relative">
               {showButtons && (
                    <>
                         <button
                              type="button"
                              onClick={() => scrollByCard(-1)}
                              disabled={!canPrev}
                              aria-label="Armada sebelumnya"
                              className={`${buttonClass} left-1 md:left-0 md:-translate-x-1/2`}
                         >
                              <ChevronLeft size={22} aria-hidden="true" />
                         </button>
                         <button
                              type="button"
                              onClick={() => scrollByCard(1)}
                              disabled={!canNext}
                              aria-label="Armada berikutnya"
                              className={`${buttonClass} right-1 md:right-0 md:translate-x-1/2`}
                         >
                              <ChevronRight size={22} aria-hidden="true" />
                         </button>
                    </>
               )}

               <div
                    ref={scrollerRef}
                    className="-my-4 flex snap-x snap-mandatory gap-gutter overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
               >
                    {Children.map(children, (child) => (
                         <div className="flex w-full shrink-0 snap-start md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] [&>*]:w-full">
                              {child}
                         </div>
                    ))}
               </div>
          </div>
     );
}