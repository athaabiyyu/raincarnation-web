"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { CarIcon, SeatIcon } from "@/components/ui/BookingIcons";

type BerandaBookingTabsProps = {
     regulerLabel: string;
     carterLabel: string;
     regulerPanel: ReactNode;
     carterPanel: ReactNode;
};

type TabKey = "reguler" | "carter";

// Memecah "Sewa Mobil (Satu Mobil Penuh)" menjadi dua bagian.
// HP: hanya bagian depan ("Sewa Mobil"). Tablet ke atas: lengkap dengan kurung.
function renderLabel(label: string) {
     const index = label.indexOf("(");
     if (index === -1) return label;

     const main = label.slice(0, index).trim();
     const note = label.slice(index).trim();

     return (
          <>
               <span>{main}</span>
               <span className="hidden md:inline">{" "}{note}</span>
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
          `flex flex-1 items-center justify-center gap-space-xs rounded-lg px-space-md py-space-sm text-center font-label-md text-label-md transition-all ${active === key
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
                         <CarIcon />
                         <span>{renderLabel(carterLabel)}</span>
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
                         <SeatIcon />
                         <span>{renderLabel(regulerLabel)}</span>
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