"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import type { FormEvent } from "react";
import {
  CalendarDays,
  ChevronDown,
  Clock,
  LocateFixed,
  MapPin,
  MessageSquareText,
  Minus,
  Plus,
  Users,
  Check,
} from "lucide-react";
import { SeatIcon } from "@/components/ui/BookingIcons";
import { searchFormContent } from "@/constants/travel-reguler";
import { formatPrice } from "@/utils/format-price";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import type { RoutePair } from "@/utils/route-pairs";

type Props = {
  pairs: RoutePair[];
  whatsapp: string;
  /** Tingkat heading judul form. Beranda memakai "h3" (anak dari "Cari Perjalanan Anda"). */
  headingLevel?: "h2" | "h3";
  /** true = tanpa kartu luar (dipakai di dalam kartu tab Beranda). */
  bare?: boolean;
};

// Tanggal hari ini menurut zona waktu pengunjung, format YYYY-MM-DD.
function todayLocal(): string {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

const subscribe = () => () => {};

const selectClass =
  "[color-scheme:light] h-12 w-full appearance-none cursor-pointer rounded-xl border border-slate-200/90 bg-white px-4 pr-9 font-label-md text-base md:text-label-md text-on-surface invalid:text-on-surface-variant [&>option]:text-on-surface transition-all shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const inputClass =
  "h-12 w-full min-w-0 appearance-none rounded-xl border border-slate-200/90 bg-white px-4 text-left font-label-md text-base md:text-label-md text-on-surface transition-all placeholder:text-on-surface-variant shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none [&::-webkit-date-and-time-value]:text-left";

const labelClass =
  "mb-2 flex items-center gap-1.5 font-label-md text-label-md text-on-surface";

const chevronClass =
  "pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant";

export default function RouteSearchForm({
  pairs,
  whatsapp,
  headingLevel = "h2",
  bare = false,
}: Props) {
  const Heading = headingLevel;
  const origins = [...new Set(pairs.map((p) => p.from))];

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [time, setTime] = useState("");
  const [pickedDate, setPickedDate] = useState<string | null>(null);
  const [passengers, setPassengers] = useState("");

  // Auto-select Kota Asal & Tujuan default dari data CMS saat pertama kali dimuat
  useEffect(() => {
    if (origins.length > 0) {
      const defaultOrigin = origins[0];
      setOrigin(defaultOrigin);
      const availableDestinations = pairs
        .filter((p) => p.from === defaultOrigin)
        .map((p) => p.to);
      if (availableDestinations.length > 0) {
        setDestination(availableDestinations[0]);
      }
    }
  }, [pairs]);

  const today = useSyncExternalStore(subscribe, todayLocal, () => "");
  const date = pickedDate ?? today;

  const destinations = origin
    ? pairs.filter((p) => p.from === origin).map((p) => p.to)
    : [];
  const selectedDestination = destinations.includes(destination)
    ? destination
    : (destinations[0] ?? "");

  const selectedPair =
    origin && selectedDestination
      ? pairs.find((p) => p.from === origin && p.to === selectedDestination)
      : undefined;

  const times = selectedPair?.times ?? [];
  const selectedTime = times.includes(time) ? time : (times[0] ?? "");
  const timeRequired = times.length > 0;

  // Handler Stepper Penumpang Mobile
  const rawPassengerCount = parseInt(passengers, 10);
  const passengerCount = Number.isNaN(rawPassengerCount) ? 1 : rawPassengerCount;

  const handleDecrementPassengers = () => {
    if (passengerCount > 1) {
      setPassengers(`${passengerCount - 1} Orang`);
    }
  };

  const handleIncrementPassengers = () => {
    if (passengers === "") {
      setPassengers("1 Orang");
    } else {
      setPassengers(`${passengerCount + 1} Orang`);
    }
  };

  const allFilled =
    Boolean(selectedPair) &&
    Boolean(date) &&
    (!timeRequired || Boolean(selectedTime)) &&
    Boolean(passengers.trim());

  const priceText =
    allFilled && selectedPair?.price
      ? formatPrice(String(selectedPair.price))
      : null;

  function handleOriginChange(newOrigin: string) {
    setOrigin(newOrigin);
    const availableDestinations = pairs
      .filter((p) => p.from === newOrigin)
      .map((p) => p.to);
    if (availableDestinations.length > 0) {
      setDestination(availableDestinations[0]);
    } else {
      setDestination("");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!origin || !selectedDestination || !date) return;

    const dateText = new Date(`${date}T00:00:00`).toLocaleDateString(
      "id-ID",
      { day: "numeric", month: "long", year: "numeric" },
    );

    const lines = [
      "Halo Raincarnation, saya ingin pesan Travel:",
      `- Kota asal: ${origin}`,
      `- Kota tujuan: ${selectedDestination}`,
      `- Tanggal: ${dateText}`,
    ];
    if (selectedTime) lines.push(`- Jam: ${selectedTime}`);
    lines.push(
      `- Jumlah: ${passengers}`,
      "",
      "Mohon info ketersediaan kursi dan titik jemputnya. Terima kasih!",
    );

    window.open(
      buildWhatsAppUrl(whatsapp, lines.join("\n")),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div
      className={
        bare
          ? "relative z-20"
          : "relative z-20 rounded-2xl bg-surface-container-lowest p-5 shadow-xl lg:p-space-lg"
      }
    >
      {/* Header form */}
      <div
        className={`flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between ${
          bare
            ? "sm:mb-space-md lg:mb-space-lg"
            : "mb-space-lg border-b border-surface-container pb-space-md sm:mb-space-lg sm:border-b-0 sm:pb-0"
        }`}
      >
        <div className="flex min-w-0 items-start gap-space-sm">
          <span
            className={`mt-0.5 shrink-0 rounded-lg bg-primary-container/10 p-2 text-primary ${
              bare ? "hidden sm:block" : ""
            }`}
          >
            <SeatIcon className="h-[22px] w-[22px]" />
          </span>
          <div className="flex flex-col">
            <Heading
              className={`whitespace-nowrap font-label-lg text-label-lg text-on-surface ${
                bare ? "sr-only sm:not-sr-only" : ""
              }`}
            >
              Cari Jadwal Travel
            </Heading>
            <p className="hidden font-label-sm text-xs text-on-surface-variant sm:block md:text-label-sm">
              Pilih rute travel reguler terbaik dengan jadwal fleksibel dan keberangkatan tepat waktu.
            </p>
          </div>
        </div>

        {/* Badge Disamakan dengan Form Sewa Mobil */}
        <div className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-label-sm text-xs text-emerald-700 sm:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>Tarif & Reservasi</span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 items-end gap-x-space-md gap-y-6 lg:grid-cols-12 lg:gap-x-space-md"
      >
        {/* Asal */}
        <div className="col-span-2 min-w-0 space-y-1.5 lg:col-span-3">
          <label htmlFor="search-origin" className={labelClass}>
            <LocateFixed size={14} className="text-primary" aria-hidden />
            {searchFormContent.originLabel}
          </label>
          <div className="relative">
            <select
              id="search-origin"
              required
              value={origin}
              onChange={(e) => handleOriginChange(e.target.value)}
              className={selectClass}
            >
              <option value="">Pilih Kota Asal</option>
              {origins.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className={chevronClass} aria-hidden />
          </div>
        </div>

        {/* Tujuan */}
        <div className="col-span-2 min-w-0 space-y-1.5 lg:col-span-3">
          <label htmlFor="search-destination" className={labelClass}>
            <MapPin size={14} className="text-secondary" aria-hidden />
            {searchFormContent.destinationLabel}
          </label>
          <div className="relative">
            <select
              id="search-destination"
              required
              value={selectedDestination}
              onChange={(e) => setDestination(e.target.value)}
              className={selectClass}
            >
              <option value="">Pilih Tujuan</option>
              {destinations.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className={chevronClass} aria-hidden />
          </div>
        </div>

        {/* Tanggal */}
        <div className="col-span-1 min-w-0 space-y-1.5 lg:col-span-2">
          <label htmlFor="search-date" className={labelClass}>
            <CalendarDays size={14} className="text-primary" aria-hidden />
            {searchFormContent.dateLabel}
          </label>
          <input
            id="search-date"
            type="date"
            required
            min={today}
            value={date}
            onChange={(e) => setPickedDate(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Jam */}
        <div className="col-span-1 min-w-0 space-y-1.5 lg:col-span-2">
          <label htmlFor="search-time" className={labelClass}>
            <Clock size={14} className="text-primary" aria-hidden />
            {searchFormContent.timeLabel}
          </label>
          <div className="relative">
            <select
              id="search-time"
              required={timeRequired}
              value={selectedTime}
              onChange={(e) => setTime(e.target.value)}
              className={selectClass}
            >
              <option value="">Pilih Jam</option>
              {times.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className={chevronClass} aria-hidden />
          </div>
        </div>

        {/* Jumlah Penumpang */}
        <div className="col-span-2 min-w-0 space-y-1.5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <label htmlFor="search-passengers" className={labelClass}>
              <Users size={14} className="text-primary" aria-hidden />
              Jumlah Penumpang
            </label>
            <span className="mb-2 text-xs font-normal text-slate-500 sm:hidden">
              Kapasitas Armada Aman
            </span>
          </div>

          {/* Stepper Mobile */}
          <div className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200/90 bg-white px-3 shadow-sm sm:hidden">
            <button
              type="button"
              disabled={passengerCount <= 1 || passengers === ""}
              onClick={handleDecrementPassengers}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors disabled:opacity-40 active:bg-slate-100"
              aria-label="Kurangi Penumpang"
            >
              <Minus size={14} />
            </button>

            <span className="font-label-md text-base text-on-surface">
              {passengers === "" ? (
                <span className="text-slate-400">Contoh: 1 Orang</span>
              ) : (
                <>
                  <strong className="font-bold">{passengerCount}</strong> Orang
                </>
              )}
            </span>

            <button
              type="button"
              onClick={handleIncrementPassengers}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors active:bg-slate-100"
              aria-label="Tambah Penumpang"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Select Desktop */}
          <div className="hidden sm:block">
            <div className="relative">
              <select
                id="search-passengers"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className={selectClass}
              >
                <option value="">Pilih Penumpang</option>
                {searchFormContent.passengerOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className={chevronClass} aria-hidden />
            </div>
          </div>
        </div>

        {/* Tarif + Bottom Section */}
        <div className="col-span-2 flex flex-col gap-2.5 pt-0 sm:flex-row sm:items-center sm:justify-between sm:pt-space-md lg:col-span-12">
          {priceText ? (
            <div className="flex items-baseline justify-center gap-2 whitespace-nowrap rounded-xl bg-primary-container/10 px-4 py-2.5 sm:flex-col sm:items-start sm:justify-start sm:gap-0 sm:bg-transparent sm:px-0 sm:py-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Mulai
              </span>
              <span className="flex items-baseline gap-1">
                <span className="font-headline-sm text-headline-sm font-bold leading-none text-primary">
                  {priceText}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  / kursi
                </span>
              </span>
            </div>
          ) : (
            <div className="hidden flex-wrap items-center gap-3 text-xs font-medium text-slate-600 sm:flex sm:text-label-sm">
              <span className="flex items-center gap-1">
                <Check size={14} className="text-emerald-600" />
                Konfirmasi Cepat via WhatsApp
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <Check size={14} className="text-emerald-600" />
                Armada Bersih & Terawat
              </span>
            </div>
          )}

          {/* Tombol Disamakan Ukurannya dengan SewaMobilForm */}
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-center font-label-md text-label-md font-semibold text-on-primary shadow-md transition-all duration-150 hover:bg-primary/90 sm:ml-auto sm:w-auto"
          >
            <MessageSquareText className="h-4 w-4 shrink-0" aria-hidden />
            {searchFormContent.submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}