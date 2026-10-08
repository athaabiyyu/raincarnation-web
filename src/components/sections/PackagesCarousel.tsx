"use client";

import { Children, useEffect, useRef } from "react";
import type { ReactNode } from "react";

type PackagesCarouselProps = {
     children: ReactNode;
     speedPxPerSec?: number;
};

function getItemClass(count: number) {
     if (count <= 1) return "basis-full";
     if (count === 2) {
          return "basis-[85%] md:basis-[calc((100%_-_1.5rem)/2)]";
     }
     return "basis-[85%] md:basis-[calc((100%_-_3rem)/3)]";
}

export default function PackagesCarousel({
     children,
     speedPxPerSec = 30,
}: PackagesCarouselProps) {
     const trackRef = useRef<HTMLDivElement>(null);
     const pausedRef = useRef(false);
     const resumeTimerRef = useRef<number | null>(null);
     const count = Children.count(children);

     useEffect(() => {
          const track = trackRef.current;
          if (!track) return;

          const reduceMotion = window.matchMedia(
               "(prefers-reduced-motion: reduce)",
          );
          if (reduceMotion.matches) return;

          let frame = 0;
          let last = performance.now();
          let pos = track.scrollLeft;
          let direction = 1;

          const step = (now: number) => {
               const delta = Math.min(now - last, 50) / 1000;
               last = now;

               if (pausedRef.current) {
                    pos = track.scrollLeft;
               } else {
                    const max = track.scrollWidth - track.clientWidth;
                    if (max > 4) {
                         pos += direction * speedPxPerSec * delta;
                         if (pos >= max) {
                              pos = max;
                              direction = -1;
                         } else if (pos <= 0) {
                              pos = 0;
                              direction = 1;
                         }
                         track.scrollLeft = pos;
                    }
               }

               frame = requestAnimationFrame(step);
          };

          frame = requestAnimationFrame(step);
          return () => cancelAnimationFrame(frame);
     }, [speedPxPerSec]);

     function pause() {
          if (resumeTimerRef.current !== null) {
               window.clearTimeout(resumeTimerRef.current);
               resumeTimerRef.current = null;
          }
          pausedRef.current = true;
     }

     function resume() {
          pausedRef.current = false;
     }

     function resumeAfterTouch() {
          resumeTimerRef.current = window.setTimeout(resume, 2000);
     }

     return (
          <div
               role="region"
               aria-label="Daftar paket sewa"
               onMouseEnter={pause}
               onMouseLeave={resume}
               onTouchStart={pause}
               onTouchEnd={resumeAfterTouch}
               onFocus={pause}
               onBlur={resume}
          >
               <div
                    ref={trackRef}
                    className="flex gap-gutter overflow-x-auto py-space-md"
               >
                    {Children.map(children, (child) => (
                         <div className={`shrink-0 ${getItemClass(count)}`}>
                              {child}
                         </div>
                    ))}
               </div>
          </div>
     );
}