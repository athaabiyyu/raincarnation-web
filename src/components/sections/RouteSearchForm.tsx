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
     Search,
     Timer,
     Users,
} from "lucide-react";
import { quickRoutes, searchFormContent } from "@/constants/travel-reguler";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import type { RoutePair } from "@/utils/route-pairs";

type Props = {
     pairs: RoutePair[];
     whatsapp: string;
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
     "h-[2.75rem] w-full appearance-none cursor-pointer rounded-lg bg-surface-container-low px-3 pr-8 font-label-md text-label-md text-on-surface transition-colors focus:bg-surface-container-high focus:outline-none";

const labelClass =
     "flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant";

const chevronClass =
     "pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant";

export default function RouteSearchForm({ pairs, whatsapp }: Props) {
     const origins = [...new Set(pairs.map((p) => p.from))];

     const [origin, setOrigin] = useState(origins[0] ?? "");
     const [destination, setDestination] = useState("");
     const [time, setTime] = useState("");
     const [pickedDate, setPickedDate] = useState<string | null>(null);
     const [passengers, setPassengers] = useState(
          searchFormContent.passengerOptions[0],
     );

     // "" di server, tanggal hari ini di browser (aman dari hydration mismatch)
     const today = useSyncExternalStore(subscribe, todayLocal, () => "");
     const date = pickedDate ?? today;

     const destinations = pairs.filter((p) => p.from === origin).map((p) => p.to);
     const selectedDestination = destinations.includes(destination)
          ? destination
          : (destinations[0] ?? "");

     // Jam mengikuti rute (asal + tujuan) yang terpilih.
     const times =
          pairs.find((p) => p.from === origin && p.to === selectedDestination)
               ?.times ?? [];
     const selectedTime = times.includes(time) ? time : (times[0] ?? "");

     // Rute Cepat hanya tampil kalau rutenya ada di CMS.
     const availableQuickRoutes = quickRoutes.filter((q) =>
          pairs.some((p) => p.from === q.from && p.to === q.to),
     );

     function pickQuickRoute(from: string, to: string) {
          setOrigin(from);
          setDestination(to);
          setTime("");
     }

     function handleSubmit(event: FormEvent<HTMLFormElement>) {
          event.preventDefault();
          if (!origin || !selectedDestination || !date) return;

          const dateText = new Date(`${date}T00:00:00`).toLocaleDateString(
               "id-ID",
               { day: "numeric", month: "long", year: "numeric" },
          );

          const lines = [
               "Halo Raincarnation, saya ingin pesan Travel Reguler (Door to Door):",
               `- Asal (jemput): ${origin}`,
               `- Tujuan (antar): ${selectedDestination}`,
               `- Tanggal: ${dateText}`,
          ];
          if (selectedTime) lines.push(`- Jam: ${selectedTime}`);
          lines.push(
               `- Jumlah: ${passengers}`,
               "",
               "Mohon info ketersediaan kursi dan detail penjemputan. Terima kasih!",
          );

          window.open(
               buildWhatsAppUrl(whatsapp, lines.join("\n")),
               "_blank",
               "noopener,noreferrer",
          );
     }

     return (
          <div className="relative z-20 rounded-xl bg-surface-container-lowest p-space-md shadow-xl lg:p-space-lg">
               {/* Header form */}
               <div className="mb-space-md flex flex-col gap-space-sm sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-space-sm">
                         <span className="shrink-0 rounded-lg bg-primary-container/10 p-2 text-primary">
                              <Search size={22} aria-hidden />
                         </span>
                         <div>
                              <h2 className="font-label-lg text-label-lg text-on-surface">
                                   {searchFormContent.title}
                              </h2>
                              <p className="font-body-sm text-body-sm text-on-surface-variant">
                                   <span className="sm:hidden">Pilih rute antar kota</span>
                                   <span className="hidden sm:inline">{searchFormContent.subtitle}</span>
                              </p>
                         </div>
                    </div>

                    <div className="inline-flex shrink-0 items-center gap-space-xs self-start rounded-lg bg-surface-container-low px-3 py-1.5 font-label-sm text-label-sm text-primary sm:self-auto">
                         <Timer size={16} aria-hidden />
                         {searchFormContent.responseBadge}
                    </div>
               </div>

               <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 items-end gap-x-space-sm gap-y-space-md lg:grid-cols-12 lg:gap-x-space-md"
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
                                   value={origin}
                                   onChange={(e) => setOrigin(e.target.value)}
                                   className={selectClass}
                              >
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
                                   value={selectedDestination}
                                   onChange={(e) => setDestination(e.target.value)}
                                   className={selectClass}
                              >
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
                              className="h-[2.75rem] w-full min-w-0 appearance-none rounded-lg bg-surface-container-low px-3 text-left font-label-md text-label-md text-on-surface transition-colors focus:bg-surface-container-high focus:outline-none [&::-webkit-date-and-time-value]:text-left"
                         />
                    </div>

                    {/* Jam (hanya tampil kalau rute punya jadwal) */}
                    {times.length > 0 && (
                         <div className="col-span-1 min-w-0 space-y-1.5 lg:col-span-2">
                              <label htmlFor="search-time" className={labelClass}>
                                   <Clock size={14} className="text-primary" aria-hidden />
                                   {searchFormContent.timeLabel}
                              </label>
                              <div className="relative">
                                   <select
                                        id="search-time"
                                        value={selectedTime}
                                        onChange={(e) => setTime(e.target.value)}
                                        className={selectClass}
                                   >
                                        {times.map((t) => (
                                             <option key={t} value={t}>
                                                  {t}
                                             </option>
                                        ))}
                                   </select>
                                   <ChevronDown size={16} className={chevronClass} aria-hidden />
                              </div>
                         </div>
                    )}

                    {/* Penumpang (selebar layar kalau ada kolom jam, sebaris dengan tanggal kalau tidak) */}
                    <div
                         className={`min-w-0 space-y-1.5 lg:col-span-2 ${times.length > 0 ? "col-span-2" : "col-span-1"
                              }`}
                    >
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

                    {/* Rute Cepat + Tombol */}
                    <div className="col-span-2 flex flex-col gap-space-md pt-space-xs sm:flex-row sm:items-center sm:justify-between lg:col-span-12">
                         {availableQuickRoutes.length > 0 && (
                              <div className="min-w-0 space-y-space-xs font-label-sm text-label-sm text-on-surface-variant sm:flex sm:flex-wrap sm:items-center sm:gap-space-xs sm:space-y-0">
                                   <span className="block font-bold text-on-surface">
                                        {searchFormContent.quickRoutesLabel}
                                   </span>
                                   <div className="flex flex-wrap gap-space-xs">
                                        {availableQuickRoutes.map((q) => (
                                             <button
                                                  key={`${q.from}|${q.to}`}
                                                  type="button"
                                                  onClick={() => pickQuickRoute(q.from, q.to)}
                                                  className="whitespace-nowrap rounded-lg bg-surface-container px-2.5 py-1.5 transition-colors hover:bg-surface-container-high"
                                             >
                                                  {q.from} - {q.to}
                                             </button>
                                        ))}
                                   </div>
                              </div>
                         )}

                         <button
                              type="submit"
                              className="inline-flex w-full items-center justify-center gap-space-sm rounded-lg bg-primary-container px-space-md py-2.5 text-center font-label-md text-label-md text-on-primary shadow-md transition-all duration-150 hover:bg-primary sm:ml-auto sm:w-auto sm:gap-space-md sm:px-space-lg sm:py-3 sm:font-label-lg sm:text-label-lg"
                         >
                              <MessageSquareText className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden />
                              {searchFormContent.submitLabel}
                         </button>
                    </div>
               </form>
          </div>
     );
}