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
    `flex flex-1 items-center justify-center gap-space-xs whitespace-nowrap rounded-xl px-space-sm py-2.5 text-center font-label-sm text-label-sm transition-all sm:py-3 sm:font-label-md sm:text-label-md ${
      active === key
        ? "bg-primary font-bold text-on-primary shadow-sm"
        : "border border-primary bg-white font-semibold text-primary hover:bg-slate-50"
    }`;

  return (
    <div className="relative z-20 overflow-hidden rounded-3xl bg-surface-container-lowest p-4 shadow-xl sm:rounded-2xl sm:p-6">
      {/* Garis handle mobile */}
      <span
        aria-hidden
        className="absolute left-1/2 top-3 h-1.5 w-12 -translate-x-1/2 rounded-full bg-primary sm:hidden"
      />

      <div className="mb-space-lg text-center sm:hidden mt-space-md">
        <p className="text-xl font-bold text-on-surface min-[400px]:text-2xl">
          Pilih Layanan Anda
        </p>
        <p className="mt-1 font-label-sm text-label-sm text-on-surface-variant">
          Satu mobil penuh atau per kursi
        </p>
      </div>

      {/* 2 Tombol Terpisah dengan Gap */}
      <div
        role="tablist"
        aria-label="Pilih jenis layanan"
        className="mb-space-lg flex w-full items-center gap-3"
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
          <CarIcon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
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
          <SeatIcon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
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