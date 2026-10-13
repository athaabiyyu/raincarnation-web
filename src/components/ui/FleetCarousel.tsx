"use client";

import { Children, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FleetCarouselProps = {
  children: ReactNode;
};

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
      setCanPrev(scroller.scrollLeft > 5);
      setCanNext(
        scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 5
      );

      const firstCard = scroller.firstElementChild as HTMLElement | null;
      const step = (firstCard?.offsetWidth ?? 300) + GAP_PX;
      setActiveIndex(
        Math.min(count - 1, Math.max(0, Math.round(scroller.scrollLeft / step)))
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
      "(prefers-reduced-motion: reduce)"
    ).matches;

    scroller.scrollBy({
      left: direction * step,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  const showControls = canPrev || canNext;

  return (
    <div className="relative w-full">
      {/* Container Scroll Snap */}
      <div
        ref={scrollerRef}
        className="-my-4 flex snap-x snap-mandatory gap-gutter overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child) => (
          <div className="flex w-[85vw] shrink-0 snap-start sm:w-[320px] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] [&>*]:w-full">
            {child}
          </div>
        ))}
      </div>

      {/* Tombol Panah Kiri & Kanan Berwarna Hijau Tua di Desktop */}
      {showControls && (
        <>
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Armada sebelumnya"
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg transition-all hover:bg-primary-container active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-30 md:flex"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Armada berikutnya"
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg transition-all hover:bg-primary-container active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-30 md:flex"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </>
      )}

      {/* Indikator Posisi Halaman di Mobile */}
      {count > 1 && (
        <div className="mt-space-sm flex items-center justify-center gap-2 md:hidden">
          <p className="font-label-md text-label-md tabular-nums text-on-surface-variant">
            {activeIndex + 1} / {count}
          </p>
        </div>
      )}
    </div>
  );
}