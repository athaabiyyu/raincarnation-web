"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type BerandaBookingTabsProps = {
     regulerLabel: string;
     carterLabel: string;
     regulerPanel: ReactNode;
     carterPanel: ReactNode;
};

type TabKey = "reguler" | "carter";

// Memecah "Carter Drop (1 Mobil Penuh)" menjadi dua bagian.
// HP: bagian dalam kurung turun ke baris baru. Tablet ke atas: satu baris.
function renderLabel(label: string) {
     const index = label.indexOf("(");
     if (index === -1) return label;

     const main = label.slice(0, index).trim();
     const note = label.slice(index).trim();

     return (
          <>
               <span className="block md:inline">{main}</span>{" "}
               <span className="block md:inline">{note}</span>
          </>
     );
}

export default function BerandaBookingTabs({
     regulerLabel,
     carterLabel,
     regulerPanel,
     carterPanel,
}: BerandaBookingTabsProps) {
     const [active, setActive] = useState<TabKey>("carter");

     const tabClass = (key: TabKey) =>
          `flex-1 rounded-lg px-space-md py-space-sm text-center font-label-md text-label-md transition-all ${active === key
               ? "bg-surface-container-lowest font-bold text-primary shadow-sm"
               : "text-on-surface-variant hover:text-on-surface"
          }`;

     return (
          <div>
               <div
                    role="tablist"
                    aria-label="Pilih jenis layanan"
                    className="mb-space-md flex w-full items-center gap-space-xs rounded-lg bg-surface-container p-1"
               >
                    <button
                         type="button"
                         role="tab"
                         id="tab-carter"
                         aria-selected={active === "carter"}
                         aria-controls="panel-carter"
                         onClick={() => setActive("carter")}
                         className={tabClass("carter")}
                    >
                         {renderLabel(carterLabel)}
                    </button>
                    <button
                         type="button"
                         role="tab"
                         id="tab-reguler"
                         aria-selected={active === "reguler"}
                         aria-controls="panel-reguler"
                         onClick={() => setActive("reguler")}
                         className={tabClass("reguler")}
                    >
                         {renderLabel(regulerLabel)}
                    </button>
               </div>

               <div
                    role="tabpanel"
                    id="panel-carter"
                    aria-labelledby="tab-carter"
                    hidden={active !== "carter"}
               >
                    {carterPanel}
               </div>
               <div
                    role="tabpanel"
                    id="panel-reguler"
                    aria-labelledby="tab-reguler"
                    hidden={active !== "reguler"}
               >
                    {regulerPanel}
               </div>
          </div>
     );
}