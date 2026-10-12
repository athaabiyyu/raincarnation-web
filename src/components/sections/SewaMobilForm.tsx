"use client";

import { useState } from "react";
import {
     Briefcase,
     CalendarDays,
     Car,
     ChevronDown,
     Clock,
     LocateFixed,
     MapPin,
     MessageSquareText,
     Users,
} from "lucide-react";
import { sewaMobilForm } from "@/constants/sewa-mobil";
import type { RuteCarter } from "@/types/rute-carter";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { formatPrice } from "@/utils/format-price";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

type FleetOption = { id: number; name: string };

type SewaMobilFormProps = {
     routes: RuteCarter[];
     fleet: FleetOption[];
     whatsapp: string;
     /** true = hanya kartu form (tanpa section pembungkus), dipakai di tab Beranda */
     embedded?: boolean;
};

type FormValues = {
     date: string;
     time: string;
     passengers: string;
};

const selectClass =
     "h-[2.75rem] w-full appearance-none cursor-pointer rounded-lg bg-surface-container-low px-3 pr-8 font-label-md text-label-md text-on-surface transition-colors focus:bg-surface-container-high focus:outline-none";

const inputClass =
     "h-[2.75rem] w-full min-w-0 appearance-none rounded-lg bg-surface-container-low px-3 text-left font-label-md text-label-md text-on-surface transition-colors placeholder:text-on-surface-variant focus:bg-surface-container-high focus:outline-none [&::-webkit-date-and-time-value]:text-left";

const labelClass =
     "flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant";

const chevronClass =
     "pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant";

function formatDate(value: string): string {
     if (!value) return "";
     const date = new Date(`${value}T00:00:00`);
     if (Number.isNaN(date.getTime())) return value;
     return date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
     });
}

function unique(items: string[]): string[] {
     return [...new Set(items.filter(Boolean))];
}

type MessageInput = {
     packageType: string;
     fleetName: string;
     origin: string;
     destination: string;
     values: FormValues;
};

function buildMessage(input: MessageInput): string {
     const { packageType, fleetName, origin, destination, values } = input;
     const details = [
          packageType && `- Layanan: ${packageType}`,
          fleetName && `- Unit: ${fleetName}`,
          origin && `- Penjemputan: ${origin}`,
          destination && `- Tujuan: ${destination}`,
          values.date && `- Tanggal: ${formatDate(values.date)}`,
          values.time && `- Jam: ${values.time}`,
          values.passengers.trim() &&
          `- Penumpang & koper: ${values.passengers.trim()}`,
     ].filter(Boolean);

     return [
          "Halo Admin Raincarnation,",
          "Saya ingin menanyakan ketersediaan & tarif sewa 1 mobil penuh:",
          "",
          ...details,
          "",
          "Mohon informasi total harga & konfirmasi armadanya. Terima kasih!",
     ].join("\n");
}

export default function SewaMobilForm({
     routes,
     fleet,
     whatsapp,
     embedded = false,
}: SewaMobilFormProps) {
     const content = sewaMobilForm;

     const [packageType, setPackageType] = useState("");
     const [fleetId, setFleetId] = useState("");
     const [origin, setOrigin] = useState("");
     const [destination, setDestination] = useState("");
     const [values, setValues] = useState<FormValues>({
          date: "",
          time: "",
          passengers: "",
     });

     if (!whatsapp || routes.length === 0) return null;

     function update(field: keyof FormValues, value: string) {
          setValues((prev) => ({ ...prev, [field]: value }));
     }

     // Pilihan diambil dari data CMS. Semua pilihan mulai kosong.
     const packages = unique(routes.map((r) => r.acf?.paket_sewa ?? ""));
     const fleetOptions = fleet.filter((f) =>
          routes.some((r) => r.acf?.armada?.some((a) => a.ID === f.id)),
     );
     const origins = unique(
          routes.map((r) => capitalizeFirst(r.acf?.kota_asal)),
     );

     const selectedPackage = packages.includes(packageType) ? packageType : "";
     const selectedFleet = fleetOptions.find((f) => String(f.id) === fleetId);
     const selectedOrigin = origins.includes(origin) ? origin : "";

     // Tujuan hanya yang punya rute dari kota asal terpilih.
     const destinations = selectedOrigin
          ? unique(
               routes
                    .filter(
                         (r) => capitalizeFirst(r.acf?.kota_asal) === selectedOrigin,
                    )
                    .map((r) => capitalizeFirst(r.acf?.kota_tujuan)),
          )
          : [];
     const selectedDestination = destinations.includes(destination)
          ? destination
          : "";

     // Harga hanya dihitung bila SEMUA isian sudah terisi.
     const allFilled =
          Boolean(selectedPackage) &&
          selectedFleet !== undefined &&
          Boolean(selectedOrigin) &&
          Boolean(selectedDestination) &&
          Boolean(values.date) &&
          Boolean(values.time) &&
          Boolean(values.passengers.trim());

     // Satu entri CMS = satu kombinasi paket + armada + rute.
     const match = allFilled
          ? routes.find(
               (r) =>
                    r.acf?.paket_sewa === selectedPackage &&
                    r.acf?.armada?.some((a) => a.ID === selectedFleet?.id) &&
                    capitalizeFirst(r.acf?.kota_asal) === selectedOrigin &&
                    capitalizeFirst(r.acf?.kota_tujuan) === selectedDestination,
          )
          : undefined;
     const price = Number(match?.acf?.harga);
     const priceText =
          Number.isFinite(price) && price > 0 ? formatPrice(String(price)) : null;

     function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
          event.preventDefault();
          const message = buildMessage({
               packageType: selectedPackage,
               fleetName: selectedFleet?.name ?? "",
               origin: selectedOrigin,
               destination: selectedDestination,
               values,
          });
          window.open(
               buildWhatsAppUrl(whatsapp, message),
               "_blank",
               "noopener,noreferrer",
          );
     }

     const card = (
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-xl lg:p-space-lg">
               {/* Header form */}
               <div className="mb-space-md flex items-center justify-between gap-space-sm">
                    <div className="flex min-w-0 items-center gap-space-sm">
                         <span className="shrink-0 rounded-lg bg-primary-container/10 p-2 text-primary">
                              <Car size={22} aria-hidden />
                         </span>
                                                  <h2 className="whitespace-nowrap font-label-lg text-label-lg text-on-surface">
                              {content.title}
                         </h2>
                    </div>

                    <div className="inline-flex shrink-0 items-center whitespace-nowrap rounded-lg bg-surface-container-low px-3 py-1.5 font-label-sm text-label-sm text-primary">
                         <span className="sm:hidden">Cek Tarif</span>
                         <span className="hidden sm:inline">{content.eyebrow}</span>
                    </div>
               </div>

               <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 items-end gap-x-space-sm gap-y-space-md lg:grid-cols-12 lg:gap-x-space-md"
               >
                    {/* Paket */}
                    <div className="col-span-2 min-w-0 space-y-1.5 lg:col-span-3">
                         <label htmlFor="sm-package" className={labelClass}>
                              <Briefcase size={14} className="text-primary" aria-hidden />
                              {content.labels.packageType}
                         </label>
                         <div className="relative">
                              <select
                                   id="sm-package"
                                   required
                                   value={selectedPackage}
                                   onChange={(e) => setPackageType(e.target.value)}
                                   className={selectClass}
                              >
                                   <option value="">Pilih</option>
                                   {packages.map((option) => (
                                        <option key={option} value={option}>
                                             {option}
                                        </option>
                                   ))}
                              </select>
                              <ChevronDown size={16} className={chevronClass} aria-hidden />
                         </div>
                    </div>

                    {/* Armada */}
                    <div className="col-span-2 min-w-0 space-y-1.5 lg:col-span-3">
                         <label htmlFor="sm-fleet" className={labelClass}>
                              <Car size={14} className="text-primary" aria-hidden />
                              {content.labels.fleet}
                         </label>
                         <div className="relative">
                              <select
                                   id="sm-fleet"
                                   required
                                   value={selectedFleet ? String(selectedFleet.id) : ""}
                                   onChange={(e) => setFleetId(e.target.value)}
                                   className={selectClass}
                              >
                                   <option value="">Pilih</option>
                                   {fleetOptions.map((option) => (
                                        <option key={option.id} value={String(option.id)}>
                                             {option.name}
                                        </option>
                                   ))}
                              </select>
                              <ChevronDown size={16} className={chevronClass} aria-hidden />
                         </div>
                    </div>

                    {/* Asal */}
                    <div className="col-span-1 min-w-0 space-y-1.5 lg:col-span-3">
                         <label htmlFor="sm-origin" className={labelClass}>
                              <LocateFixed size={14} className="text-primary" aria-hidden />
                              {content.labels.origin}
                         </label>
                         <div className="relative">
                              <select
                                   id="sm-origin"
                                   required
                                   value={selectedOrigin}
                                   onChange={(e) => setOrigin(e.target.value)}
                                   className={selectClass}
                              >
                                   <option value="">Pilih</option>
                                   {origins.map((option) => (
                                        <option key={option} value={option}>
                                             {option}
                                        </option>
                                   ))}
                              </select>
                              <ChevronDown size={16} className={chevronClass} aria-hidden />
                         </div>
                    </div>

                    {/* Tujuan */}
                    <div className="col-span-1 min-w-0 space-y-1.5 lg:col-span-3">
                         <label htmlFor="sm-destination" className={labelClass}>
                              <MapPin size={14} className="text-secondary" aria-hidden />
                              {content.labels.destination}
                         </label>
                         <div className="relative">
                              <select
                                   id="sm-destination"
                                   required
                                   value={selectedDestination}
                                   onChange={(e) => setDestination(e.target.value)}
                                   className={selectClass}
                              >
                                   <option value="">Pilih</option>
                                   {destinations.map((option) => (
                                        <option key={option} value={option}>
                                             {option}
                                        </option>
                                   ))}
                              </select>
                              <ChevronDown size={16} className={chevronClass} aria-hidden />
                         </div>
                    </div>

                    {/* Tanggal */}
                    <div className="col-span-1 min-w-0 space-y-1.5 lg:col-span-3">
                         <label htmlFor="sm-date" className={labelClass}>
                              <CalendarDays size={14} className="text-primary" aria-hidden />
                              {content.labels.date}
                         </label>
                         <input
                              id="sm-date"
                              type="date"
                              required
                              value={values.date}
                              onChange={(e) => update("date", e.target.value)}
                              className={inputClass}
                         />
                    </div>

                    {/* Jam */}
                    <div className="col-span-1 min-w-0 space-y-1.5 lg:col-span-3">
                         <label htmlFor="sm-time" className={labelClass}>
                              <Clock size={14} className="text-primary" aria-hidden />
                              {content.labels.time}
                         </label>
                         <input
                              id="sm-time"
                              type="time"
                              required
                              value={values.time}
                              onChange={(e) => update("time", e.target.value)}
                              className={inputClass}
                         />
                    </div>

                    {/* Penumpang */}
                    <div className="col-span-2 min-w-0 space-y-1.5 lg:col-span-6">
                         <label htmlFor="sm-passengers" className={labelClass}>
                              <Users size={14} className="text-primary" aria-hidden />
                              {content.labels.passengers}
                         </label>
                         <input
                              id="sm-passengers"
                              type="text"
                              required
                              value={values.passengers}
                              onChange={(e) => update("passengers", e.target.value)}
                              placeholder={content.placeholders.passengers}
                              className={inputClass}
                         />
                    </div>

                    {/* Harga (kiri) + Tombol (kanan) */}
                    <div className="col-span-2 flex flex-col gap-space-md pt-space-xs sm:flex-row sm:items-center sm:justify-between sm:border-t sm:border-surface-container sm:pt-space-md lg:col-span-12">
                         {priceText && (
                              <div className="flex items-baseline justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-container/10 px-space-md py-2 sm:flex-col sm:items-start sm:justify-start sm:gap-0 sm:bg-transparent sm:px-0 sm:py-0">
                                   <span className="font-label-sm text-label-sm text-on-surface-variant">
                                        Harga mulai
                                   </span>
                                   <span className="flex items-baseline gap-1">
                                        <span className="font-headline-sm text-headline-sm font-bold leading-none text-primary">
                                             {priceText}
                                        </span>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                                             /hari
                                        </span>
                                   </span>
                              </div>
                         )}

                         <button
                              type="submit"
                                                       className="inline-flex w-full items-center justify-center gap-space-sm rounded-lg bg-whatsapp px-space-md py-2.5 text-center font-label-md text-label-md text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all duration-150 hover:bg-whatsapp-hover sm:ml-auto sm:w-auto sm:gap-space-md sm:px-space-lg sm:py-3 sm:font-label-lg sm:text-label-lg"
                         >
                              <MessageSquareText className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden />
                              {content.submitLabel}
                         </button>
                    </div>
               </form>
          </div>
     );

     if (embedded) return card;

     return (
          <section
               id="simulasi-carter"
               className="w-full scroll-mt-32 bg-surface py-space-xl"
          >
               <div className="mx-auto max-w-6xl px-gutter">{card}</div>
          </section>
     );
}