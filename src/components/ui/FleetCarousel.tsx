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
     const [activeIndex, setActiveIndex] = useState(0);
     const count = Children.count(children);

     useEffect(() => {
          const scroller = scrollerRef.current;
          if (!scroller) return;

          const update = () => {
               setCanPrev(scroller.scrollLeft > 1);
               setCanNext(
                    scroller.scrollLeft + scroller.clientWidth <
                    scroller.scrollWidth - 1,
               );
               const firstCard = scroller.firstElementChild as HTMLElement | null;
               const step = (firstCard?.offsetWidth ?? 300) + GAP_PX;
               setActiveIndex(
                    Math.min(count - 1, Math.max(0, Math.round(scroller.scrollLeft / step))),
               );
          };

          update();
          scroller.addEventListener("scroll", update, { passive: true });
          const observer = new ResizeObserver(update);
          observer.observe(scroller);

          return () => {
               scroller.removeEventListener("scroll", update);
               observer.disconnect();
          };
     }, [count]);

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

     const showControls = canPrev || canNext;
     const buttonClass =
          "absolute top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-on-primary shadow-md transition-colors hover:bg-on-primary-fixed-variant focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary md:h-10 md:w-10";

     return (
          <div>
               <div className="relative">
                    <div
                         ref={scrollerRef}
                         className="-my-8 flex snap-x snap-mandatory gap-gutter overflow-x-auto py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                         {Children.map(children, (child) => (
                              <div className="flex w-full shrink-0 snap-start md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] [&>*]:w-full">
                                   {child}
                              </div>
                         ))}
                    </div>

                    {showControls && (
                         <>
                              <button
                                   type="button"
                                   onClick={() => scrollByCard(-1)}
                                   disabled={!canPrev}
                                   aria-label="Armada sebelumnya"
                                   className={`${buttonClass} -left-3 md:-left-5`}
                              >
                                   <ChevronLeft size={20} aria-hidden="true" />
                              </button>

                              <button
                                   type="button"
                                   onClick={() => scrollByCard(1)}
                                   disabled={!canNext}
                                   aria-label="Armada berikutnya"
                                   className={`${buttonClass} -right-3 md:-right-5`}
                              >
                                   <ChevronRight size={20} aria-hidden="true" />
                              </button>
                         </>
                    )}
               </div>

               {showControls && count > 1 && (
                    <p
                         className="mt-space-md text-center font-label-md text-label-md tabular-nums text-on-surface-variant md:hidden"
                         aria-live="polite"
                    >
                         {activeIndex + 1} / {count}
                    </p>
               )}
          </div>
     );
}