"use client";

import { Children, useState } from "react";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

const SMALL_STEP = 4; // HP dan tablet
const LG_STEP = 9; // laptop: 3 kolom x 3 baris

// Kelas ditulis utuh supaya terbaca Tailwind (tidak boleh dirakit dari angka).
const LG_COLS: Record<number, string> = {
     1: "lg:grid-cols-1",
     2: "lg:grid-cols-2",
     3: "lg:grid-cols-3",
};

// Teks sementara di komponen (nanti dipindah ke constants/)
const MORE_LABEL = "Tampilkan lebih banyak";

type ArmadaGridMoreProps = {
     children: ReactNode;
};

export default function ArmadaGridMore({ children }: ArmadaGridMoreProps) {
     const [pages, setPages] = useState(0);
     const items = Children.toArray(children);
     const count = items.length;

     const smallLimit = SMALL_STEP * (pages + 1);
     const lgLimit = LG_STEP * (pages + 1);

     const lgCols = Math.min(count, 3);
     const mdCols = count === 1 ? "md:grid-cols-1" : "md:grid-cols-2";
     const listClass = `grid grid-cols-1 gap-space-md ${mdCols} ${LG_COLS[lgCols]}`;

     const buttonClass = `${smallLimit < count ? "flex" : "hidden"} ${lgLimit < count ? "lg:flex" : "lg:hidden"}`;

     return (
          <>
               <ul className={listClass}>
                    {items.map((child, index) => {
                         const smallClass = index < smallLimit ? "block" : "hidden";
                         const lgClass = index < lgLimit ? "lg:block" : "lg:hidden";
                         const spanClass =
                              count > 1 && count % 2 === 1 && index === count - 1
                                   ? "md:col-span-2 lg:col-span-1"
                                   : "";

                         return (
                              <li
                                   key={index}
                                   className={`${smallClass} ${lgClass} ${spanClass}`}
                              >
                                   {child}
                              </li>
                         );
                    })}
               </ul>

               <button
                    type="button"
                    onClick={() => setPages((prev) => prev + 1)}
                    className={`${buttonClass} mt-space-lg w-full items-center justify-center gap-2 rounded-xl bg-primary px-space-lg py-4 font-label-lg text-label-lg font-bold text-white transition-colors hover:bg-on-primary-fixed-variant`}
               >
                    {MORE_LABEL}
                    <ChevronDown className="h-5 w-5" aria-hidden="true" />
               </button>
          </>
     );
}