"use client";

import { useState, useSyncExternalStore } from "react";
import type { FormEvent } from "react";
import {
     CalendarDays,
     ChevronDown,
     Clock,
     LocateFixed,
     MapPin,
     MessageSquareText,
     Users,
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

const subscribe = () => () => { };

const selectClass =
     "[color-scheme:light] h-12 w-full appearance-none cursor-pointer rounded-xl border border-surface-container-high/60 bg-surface-container-low px-4 pr-9 font-label-md text-base md:text-label-md text-on-surface invalid:text-on-surface-variant [&>option]:text-on-surface transition-colors focus:bg-surface-container-high focus:outline-none";

const labelClass =
     "mb-0.5 flex items-center gap-1 font-label-md text-label-md text-on-surface";

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

     // Asal, tujuan, dan jam mulai kosong supaya tarif tidak langsung tampil.
     const [origin, setOrigin] = useState("");
     const [destination, setDestination] = useState("");
     const [time, setTime] = useState("");
     const [pickedDate, setPickedDate] = useState<string | null>(null);
     const [passengers, setPassengers] = useState(
          searchFormContent.passengerOptions[0],
     );

     // "" di server, tanggal hari ini di browser (aman dari hydration mismatch)
     const today = useSyncExternalStore(subscribe, todayLocal, () => "");
     const date = pickedDate ?? today;

     const destinations = origin
          ? pairs.filter((p) => p.from === origin).map((p) => p.to)
          : [];
     const selectedDestination = destinations.includes(destination)
          ? destination
          : "";

     // Rute (asal + tujuan) yang terpilih: sumber jam dan tarif.
     const selectedPair =
          origin && selectedDestination
               ? pairs.find((p) => p.from === origin && p.to === selectedDestination)
               : undefined;

     // Jam mengikuti rute yang terpilih. Mulai kosong sampai dipilih.
     const times = selectedPair?.times ?? [];
     const selectedTime = times.includes(time) ? time : "";

     // Jam wajib diisi hanya bila rute punya jadwal.
     const timeRequired = times.length > 0;

     // Harga hanya tampil bila SEMUA isian sudah terisi.
     const allFilled =
          Boolean(selectedPair) &&
          Boolean(date) &&
          (!timeRequired || Boolean(selectedTime)) &&
          Boolean(passengers);

     // Tarif per kursi dari CMS. Kosong atau 0 = kotak tarif disembunyikan.
     const priceText =
          allFilled && selectedPair?.price
               ? formatPrice(String(selectedPair.price))
               : null;

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
                         : "relative z-20 rounded-2xl bg-surface-container-lowest p-space-md shadow-xl sm:p-5 lg:p-space-lg"
               }
          >
               {/* Header form */}
               <div
     className={`flex items-center justify-between gap-space-sm ${bare ? "sm:mb-space-md lg:mb-space-lg" : "mb-space-lg"
          }`}
>
                    <div className="flex min-w-0 items-center gap-space-sm">
                         <span
     className={`shrink-0 rounded-lg bg-primary-container/10 p-2 text-primary ${bare ? "hidden sm:block" : ""
          }`}
>
                              <SeatIcon className="h-[22px] w-[22px]" />
                         </span>
                         <Heading
     className={`whitespace-nowrap font-label-lg text-label-lg text-on-surface ${bare ? "sr-only sm:not-sr-only" : ""
          }`}
>
                              Cari Jadwal Travel
                         </Heading>
                    </div>

                    <div className="hidden shrink-0 items-center whitespace-nowrap rounded-lg bg-surface-container-low px-3 py-1.5 font-label-sm text-label-sm text-primary">
                         Tarif per Kursi
                    </div>
               </div>

               <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 items-end gap-x-space-md gap-y-6 lg:grid-cols-12 lg:gap-x-space-md"
               >
                    {/* Asal */}
                    <div className="col-span-1 min-w-0 space-y-1.5 lg:col-span-3">
                         <label htmlFor="search-origin" className={labelClass}>
                              <LocateFixed size={14} className="text-primary" aria-hidden />
                              {searchFormContent.originLabel}
                         </label>
                         <div className="relative">
                              <select
                                   id="search-origin"
                                   required
                                   value={origin}
                                   onChange={(e) => setOrigin(e.target.value)}
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
                    <div className="col-span-1 min-w-0 space-y-1.5 lg:col-span-3">
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
                              className="h-12 w-full min-w-0 appearance-none rounded-xl border border-surface-container-high/60 bg-surface-container-low px-4 text-left font-label-md text-base md:text-label-md text-on-surface transition-colors focus:bg-surface-container-high focus:outline-none [&::-webkit-date-and-time-value]:text-left"
                         />
                    </div>

                    {/* Jam (selalu tampil, mulai kosong) */}
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

                    {/* Penumpang */}
                    <div className="col-span-2 min-w-0 space-y-1.5 lg:col-span-2">
                         <label htmlFor="search-passengers" className={labelClass}>
                              <Users size={14} className="text-primary" aria-hidden />
                              {searchFormContent.passengerLabel}
                         </label>
                         <div className="relative">
                              <select
                                   id="search-passengers"
                                   value={passengers}
                                   onChange={(e) => setPassengers(e.target.value)}
                                   className={selectClass}
                              >
                                   {searchFormContent.passengerOptions.map((option) => (
                                        <option key={option} value={option}>
                                             {option}
                                        </option>
                                   ))}
                              </select>
                              <ChevronDown size={16} className={chevronClass} aria-hidden />
                         </div>
                    </div>

                    {/* Tarif (kiri) + Tombol (kanan) */}
                    <div className="col-span-2 flex flex-col gap-space-md pt-space-xs sm:flex-row sm:items-center sm:justify-between sm:border-t sm:border-surface-container sm:pt-space-md lg:col-span-12">
                         {priceText && (
                              <div className="flex items-baseline justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-container/10 px-space-md py-2 sm:flex-col sm:items-start sm:justify-start sm:gap-0 sm:bg-transparent sm:px-0 sm:py-0">
                                   <span className="font-label-sm text-label-lg text-on-surface-variant">
                                        Mulai
                                   </span>
                                   <span className="flex items-baseline gap-1">
                                        <span className=" font-headline-sm text-headline-sm font-bold leading-none text-primary">
                                             {priceText}
                                        </span>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                                             / kursi
                                        </span>
                                   </span>
                              </div>
                         )}

                         <button
                              type="submit"
                              className="inline-flex w-full items-center justify-center gap-space-sm rounded-xl bg-primary px-space-md py-3.5 text-center font-label-md text-label-md text-on-primary shadow-md transition-all duration-150 hover:bg-primary/90 sm:ml-auto sm:w-auto sm:gap-space-md sm:px-space-lg sm:py-3 sm:font-label-lg sm:text-label-lg"
                         >
                              <MessageSquareText className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden />
                              {searchFormContent.submitLabel}
                         </button>
                    </div>
               </form>
          </div>
     );
}