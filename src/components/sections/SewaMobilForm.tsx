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
     Timer,
     Users,
} from "lucide-react";
import { CarIcon } from "@/components/ui/BookingIcons";
import {
     sewaMobilForm,
     sewaMobilPackageConfig,
} from "@/constants/sewa-mobil";
import type { SewaMobilPackageKind } from "@/constants/sewa-mobil";
import type { RuteCarter } from "@/types/rute-carter";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { formatPrice } from "@/utils/format-price";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

export type FleetOption = {
     id: number;
     name: string;
     /** harga Lepas Kunci per 12 jam (dari CMS armada, string angka) */
     harga?: string;
     /** harga All In per hari */
     hargaAllIn?: string;
     /** harga Non All In per hari */
     hargaNonAllIn?: string;
     /** harga Lepas Kunci per bulan */
     hargaLepasKunciBulanan?: string;
     /** harga Lepas Kunci per tahun */
     hargaLepasKunciTahunan?: string;
     /** tambahan driver Lepas Kunci per hari */
     tambahanDriver?: string;
};

type SewaMobilFormProps = {
     routes: RuteCarter[];
     fleet: FleetOption[];
     whatsapp: string;
     /** true = hanya kartu form (tanpa section pembungkus), dipakai di tab Beranda */
     embedded?: boolean;
     /** tingkat judul form; bila kosong: embedded = h3, selain itu h2 */
     headingLevel?: "h2" | "h3";
};

type FormValues = {
     date: string;
     time: string;
     passengers: string;
     customRoute: string;
};

type RouteOption = {
     label: string;
     value?: string;
};

type DurationOption = {
     value: string;
     label: string;
     priceUnit: string;
};

type PackageConfig = {
     kind: SewaMobilPackageKind;
     name: string;
     duration?: string;
     priceUnit?: string;
     durations?: DurationOption[];
     routes?: RouteOption[];
     customRouteLabel?: string;
     includes?: string[];
     excludes?: string[];
};

// Nilai khusus untuk pilihan "Custom rute" / "Luar kota" (tidak punya entri CMS).
const CUSTOM_ROUTE = "__custom";

// Layanan sewa yang harganya berasal dari data armada.
const RENTAL_KINDS: SewaMobilPackageKind[] = [
     "all-in",
     "non-all-in",
     "lepas-kunci",
];

const selectClass =
     "[color-scheme:light] h-[2.75rem] w-full appearance-none cursor-pointer rounded-lg bg-surface-container-low px-3 pr-8 font-label-md text-base md:text-label-md text-on-surface transition-colors focus:bg-surface-container-high focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const inputClass =
     "h-[2.75rem] w-full min-w-0 appearance-none rounded-lg bg-surface-container-low px-3 text-left font-label-md text-base md:text-label-md text-on-surface transition-colors placeholder:text-on-surface-variant focus:bg-surface-container-high focus:outline-none [&::-webkit-date-and-time-value]:text-left";

const labelClass =
     "flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant";

const chevronClass =
     "pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant";

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

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

// Harga dari CMS berupa string angka; 0 = tidak ada harga.
function toPrice(value: string | number | undefined): number {
     const number = Number(value);
     return Number.isFinite(number) && number > 0 ? number : 0;
}

// Harga satu unit untuk satu layanan (Carter tidak lewat sini).
function fleetPrice(
     unit: FleetOption | undefined,
     kind: SewaMobilPackageKind | undefined,
     durationValue: string,
): number {
     if (!unit) return 0;
     if (kind === "all-in") return toPrice(unit.hargaAllIn);
     if (kind === "non-all-in") return toPrice(unit.hargaNonAllIn);
     if (kind === "lepas-kunci") {
          if (durationValue === "bulanan") {
               return toPrice(unit.hargaLepasKunciBulanan);
          }
          if (durationValue === "tahunan") {
               return toPrice(unit.hargaLepasKunciTahunan);
          }
          return toPrice(unit.harga);
     }
     return 0;
}

type MessageInput = {
     packageType: string;
     fleetName: string;
     duration: string;
     routeText: string;
     customRouteText: string;
     origin: string;
     destination: string;
     priceText: string;
     driverText: string;
     values: FormValues;
};

function buildMessage(input: MessageInput): string {
     const {
          packageType,
          fleetName,
          duration,
          routeText,
          customRouteText,
          origin,
          destination,
          priceText,
          driverText,
          values,
     } = input;
     const details = [
          packageType && `- Layanan: ${packageType}`,
          fleetName && `- Unit: ${fleetName}`,
          duration && `- Durasi: ${duration}`,
          routeText && `- Rute: ${routeText}`,
          customRouteText && `- Rute yang diinginkan: ${customRouteText}`,
          origin && `- Penjemputan: ${origin}`,
          destination && `- Tujuan: ${destination}`,
          values.date && `- Tanggal: ${formatDate(values.date)}`,
          values.time && `- Jam: ${values.time}`,
          values.passengers.trim() && `- Penumpang: ${values.passengers.trim()}`,
          driverText && `- Tambahan driver: ${driverText}`,
          priceText && `- Estimasi tarif: ${priceText}`,
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
     headingLevel,
}: SewaMobilFormProps) {
     const content = sewaMobilForm;
     const config = sewaMobilPackageConfig;

     const [packageType, setPackageType] = useState("");
     const [fleetId, setFleetId] = useState("");
     const [durationValue, setDurationValue] = useState("");
     const [routeValue, setRouteValue] = useState("");
     const [origin, setOrigin] = useState("");
     const [destination, setDestination] = useState("");
     const [withDriver, setWithDriver] = useState(false);
     const [values, setValues] = useState<FormValues>({
          date: "",
          time: "",
          passengers: "",
          customRoute: "",
     });

     if (!whatsapp) return null;

     function update(field: keyof FormValues, value: string) {
          setValues((prev) => ({ ...prev, [field]: value }));
     }

     // Layanan sewa muncul bila ada armada berharga untuk layanan itu;
     // Carter Drop Off muncul bila ada entri rute-carter miliknya.
     const packageConfigs: PackageConfig[] = config.packages;
     const packages = packageConfigs.filter((p) => {
          if (RENTAL_KINDS.includes(p.kind)) {
               return fleet.some((f) => fleetPrice(f, p.kind, "12-jam") > 0);
          }
          return routes.some((r) => r.acf?.paket_sewa === p.name);
     });
     if (packages.length === 0) return null;

     const selectedConfig = packages.find((p) => p.name === packageType);
     const selectedPackage = selectedConfig?.name ?? "";
     const kind = selectedConfig?.kind;
     const isSimplePackage = kind !== undefined && RENTAL_KINDS.includes(kind);
     const isLepasKunci = kind === "lepas-kunci";

     // Lebar kolom di laptop: layanan sewa = 3 kolom sejajar (4+4+4),
     // Carter Drop Off = pola lama (3+3+3+3).
     const thirdSpan = isSimplePackage ? "lg:col-span-4" : "lg:col-span-3";

     // Entri CMS milik paket terpilih (hanya dipakai Carter Drop Off).
     const packageRoutes = selectedPackage
          ? routes.filter((r) => r.acf?.paket_sewa === selectedPackage)
          : routes;

     // Armada mengikuti layanan terpilih: layanan sewa dari harga armada
     // (kosong = unit tidak muncul), Carter Drop Off dari entri rute-carter.
     const fleetOptions = fleet.filter((f) => {
          if (isSimplePackage) return fleetPrice(f, kind, "12-jam") > 0;
          if (kind === "drop-off") {
               return packageRoutes.some((r) =>
                    r.acf?.armada?.some((a) => a.ID === f.id),
               );
          }
          // Belum memilih layanan: unit yang bisa dipakai layanan mana pun.
          return (
               RENTAL_KINDS.some((k) => fleetPrice(f, k, "12-jam") > 0) ||
               routes.some((r) => r.acf?.armada?.some((a) => a.ID === f.id))
          );
     });
     const selectedFleet = fleetOptions.find((f) => String(f.id) === fleetId);

     // Durasi (hanya Lepas Kunci): hanya durasi yang harganya terisi di unit itu.
     const durationOptions: DurationOption[] =
          isLepasKunci && selectedFleet
               ? (selectedConfig?.durations ?? []).filter(
                    (d) => fleetPrice(selectedFleet, kind, d.value) > 0,
               )
               : [];
     const selectedDuration = durationOptions.find(
          (d) => d.value === durationValue,
     );

     // Tambahan driver (hanya Lepas Kunci, bila unit punya nilainya).
     const driverAmount = isLepasKunci
          ? toPrice(selectedFleet?.tambahanDriver)
          : 0;
     const driverAvailable = driverAmount > 0;
     const useDriver = driverAvailable && withDriver;
     const driverText = useDriver
          ? `${formatPrice(String(driverAmount)) ?? ""}/hari`
          : "";

     // Rute layanan sewa: dari konfigurasi + satu pilihan custom.
     const routeOptions: RouteOption[] = isSimplePackage
          ? [
               ...(selectedConfig?.routes ?? []).map((r) => ({
                    label: r.label,
                    value: r.value ?? r.label,
               })),
               {
                    label: selectedConfig?.customRouteLabel ?? "Custom",
                    value: CUSTOM_ROUTE,
               },
          ]
          : [];
     const selectedRoute = routeOptions.find((o) => o.value === routeValue);
     const isCustomRoute = selectedRoute?.value === CUSTOM_ROUTE;

     // Asal dan tujuan hanya untuk Carter Drop Off (pola lama).
     const origins = unique(
          packageRoutes.map((r) => capitalizeFirst(r.acf?.kota_asal)),
     );
     const selectedOrigin = origins.includes(origin) ? origin : "";
     const destinations = selectedOrigin
          ? unique(
               packageRoutes
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
     const placeFilled = isSimplePackage
          ? Boolean(selectedRoute)
          : Boolean(selectedOrigin) && Boolean(selectedDestination);
     const allFilled =
          Boolean(selectedConfig) &&
          selectedFleet !== undefined &&
          (!isLepasKunci || selectedDuration !== undefined) &&
          placeFilled &&
          Boolean(values.date) &&
          Boolean(values.time) &&
          Boolean(values.passengers.trim()) &&
          (!isCustomRoute || Boolean(values.customRoute.trim()));

     // Carter Drop Off: satu entri CMS = satu kombinasi armada + asal + tujuan.
     const match =
          allFilled && kind === "drop-off"
               ? routes.find(
                    (r) =>
                         r.acf?.paket_sewa === selectedPackage &&
                         r.acf?.armada?.some((a) => a.ID === selectedFleet?.id) &&
                         capitalizeFirst(r.acf?.kota_asal) === selectedOrigin &&
                         capitalizeFirst(r.acf?.kota_tujuan) === selectedDestination,
               )
               : undefined;

     // Sumber harga: Carter dari rute-carter; layanan sewa dari armada.
     // Custom rute / Luar kota tidak punya harga (tanya admin).
     function resolvePrice(): number {
          if (kind === "drop-off") return toPrice(match?.acf?.harga);
          if (isCustomRoute) return 0;
          return fleetPrice(selectedFleet, kind, selectedDuration?.value ?? "12-jam");
     }
     const price = allFilled ? resolvePrice() : 0;
     const priceText = price > 0 ? formatPrice(String(price)) : null;

     // Custom rute atau kombinasi tanpa harga: arahkan ke admin.
     const askAdmin = allFilled && !priceText;
     const priceUnit = selectedDuration?.priceUnit ?? selectedConfig?.priceUnit ?? "/rute";
     const includes = priceText ? (selectedConfig?.includes ?? []) : [];
     const excludes = priceText ? (selectedConfig?.excludes ?? []) : [];

     function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
          event.preventDefault();
          const message = buildMessage({
               packageType: selectedPackage,
               fleetName: selectedFleet?.name ?? "",
               duration: selectedDuration?.label ?? selectedConfig?.duration ?? "",
               routeText: selectedRoute?.label ?? "",
               customRouteText: isCustomRoute ? values.customRoute.trim() : "",
               origin: selectedOrigin,
               destination: selectedDestination,
               priceText: priceText ? `${priceText}${priceUnit}` : "",
               driverText,
               values,
          });
          window.open(
               buildWhatsAppUrl(whatsapp, message),
               "_blank",
               "noopener,noreferrer",
          );
     }

     const Heading = headingLevel ?? (embedded ? "h3" : "h2");

     const card = (
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-xl lg:p-space-lg">
               {/* Header form */}
               <div className="mb-space-md flex items-center justify-between gap-space-sm">
                    <div className="flex min-w-0 items-center gap-space-sm">
                         <span className="shrink-0 rounded-lg bg-primary-container/10 p-2 text-primary">
                              <CarIcon className="h-[22px] w-[22px]" />
                         </span>
                         <Heading className="whitespace-nowrap font-label-lg text-label-lg text-on-surface">
                              {content.title}
                         </Heading>
                    </div>

                    <div className="inline-flex shrink-0 items-center whitespace-nowrap rounded-lg bg-surface-container-low px-3 py-1.5 font-label-sm text-label-sm text-primary">
                         <span className="sm:hidden">Tarif & Reservasi</span>
                         <span className="hidden sm:inline">{content.eyebrow}</span>
                    </div>
               </div>

               <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 items-end gap-x-space-sm gap-y-space-md lg:grid-cols-12 lg:gap-x-space-md"
               >
                    {/* Layanan */}
                    <div className={`col-span-2 min-w-0 space-y-1.5 ${thirdSpan}`}>
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
                                   <option value="">Pilih Jenis Layanan</option>
                                   {packages.map((option) => (
                                        <option key={option.name} value={option.name}>
                                             {option.name}
                                        </option>
                                   ))}
                              </select>
                              <ChevronDown size={16} className={chevronClass} aria-hidden />
                         </div>
                    </div>

                    {/* Armada */}
                    <div className={`col-span-2 min-w-0 space-y-1.5 ${thirdSpan}`}>
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
                                   <option value="">Pilih Armada</option>
                                   {fleetOptions.map((option) => (
                                        <option key={option.id} value={String(option.id)}>
                                             {option.name}
                                        </option>
                                   ))}
                              </select>
                              <ChevronDown size={16} className={chevronClass} aria-hidden />
                         </div>
                    </div>

                    {/* Durasi (hanya Lepas Kunci) */}
                    {isLepasKunci && (
                         <div className="col-span-2 min-w-0 space-y-1.5 lg:col-span-4">
                              <label htmlFor="sm-duration" className={labelClass}>
                                   <Timer size={14} className="text-primary" aria-hidden />
                                   {config.labels.duration}
                              </label>
                              <div className="relative">
                                   <select
                                        id="sm-duration"
                                        required
                                        disabled={!selectedFleet}
                                        value={selectedDuration?.value ?? ""}
                                        onChange={(e) => setDurationValue(e.target.value)}
                                        className={selectClass}
                                   >
                                        <option value="">Pilih Durasi</option>
                                        {durationOptions.map((option) => (
                                             <option key={option.value} value={option.value}>
                                                  {option.label}
                                             </option>
                                        ))}
                                   </select>
                                   <ChevronDown
                                        size={16}
                                        className={chevronClass}
                                        aria-hidden
                                   />
                              </div>
                         </div>
                    )}

                    {isSimplePackage ? (
                         <>
                              {/* Rute */}
                              <div className="col-span-2 min-w-0 space-y-1.5 lg:col-span-4">
                                   <label htmlFor="sm-route" className={labelClass}>
                                        <MapPin
                                             size={14}
                                             className="text-secondary"
                                             aria-hidden
                                        />
                                        {config.labels.route}
                                   </label>
                                   <div className="relative">
                                        <select
                                             id="sm-route"
                                             required
                                             value={selectedRoute?.value ?? ""}
                                             onChange={(e) => setRouteValue(e.target.value)}
                                             className={selectClass}
                                        >
                                             <option value="">Pilih Rute</option>
                                             {routeOptions.map((option) => (
                                                  <option key={option.value} value={option.value}>
                                                       {option.label}
                                                  </option>
                                             ))}
                                        </select>
                                        <ChevronDown
                                             size={16}
                                             className={chevronClass}
                                             aria-hidden
                                        />
                                   </div>
                              </div>

                              {/* Rute kustom (Custom rute / Luar kota): satu baris penuh */}
                              {isCustomRoute && (
                                   <div className="col-span-2 min-w-0 space-y-1.5 lg:col-span-12">
                                        <label htmlFor="sm-custom-route" className={labelClass}>
                                             <MapPin
                                                  size={14}
                                                  className="text-secondary"
                                                  aria-hidden
                                             />
                                             {config.labels.customRoute}
                                        </label>
                                        <input
                                             id="sm-custom-route"
                                             type="text"
                                             required
                                             value={values.customRoute}
                                             onChange={(e) => update("customRoute", e.target.value)}
                                             placeholder={config.placeholders.customRoute}
                                             className={inputClass}
                                        />
                                   </div>
                              )}
                         </>
                    ) : (
                         <>
                              {/* Asal */}
                              <div className="col-span-1 min-w-0 space-y-1.5 lg:col-span-3">
                                   <label htmlFor="sm-origin" className={labelClass}>
                                        <LocateFixed
                                             size={14}
                                             className="text-primary"
                                             aria-hidden
                                        />
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
                                             <option value="">Pilih Kota Asal</option>
                                             {origins.map((option) => (
                                                  <option key={option} value={option}>
                                                       {option}
                                                  </option>
                                             ))}
                                        </select>
                                        <ChevronDown
                                             size={16}
                                             className={chevronClass}
                                             aria-hidden
                                        />
                                   </div>
                              </div>

                              {/* Tujuan */}
                              <div className="col-span-1 min-w-0 space-y-1.5 lg:col-span-3">
                                   <label htmlFor="sm-destination" className={labelClass}>
                                        <MapPin
                                             size={14}
                                             className="text-secondary"
                                             aria-hidden
                                        />
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
                                             <option value="">Pilih Tujuan</option>
                                             {destinations.map((option) => (
                                                  <option key={option} value={option}>
                                                       {option}
                                                  </option>
                                             ))}
                                        </select>
                                        <ChevronDown
                                             size={16}
                                             className={chevronClass}
                                             aria-hidden
                                        />
                                   </div>
                              </div>
                         </>
                    )}

                    {/* Tanggal */}
                    <div className={`col-span-1 min-w-0 space-y-1.5 ${thirdSpan}`}>
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
                    <div className={`col-span-1 min-w-0 space-y-1.5 ${thirdSpan}`}>
                         <label htmlFor="sm-time" className={labelClass}>
                              <Clock size={14} className="text-primary" aria-hidden />
                              {content.labels.time}
                         </label>
                         <div className="grid grid-cols-2 gap-space-xs">
                              <div className="relative">
                                   <select
                                        id="sm-time"
                                        required
                                        aria-label="Jam"
                                        value={values.time.slice(0, 2)}
                                        onChange={(e) =>
                                             update(
                                                  "time",
                                                  e.target.value
                                                       ? `${e.target.value}:${values.time.slice(3, 5) || "00"}`
                                                       : "",
                                             )
                                        }
                                        className={selectClass}
                                   >
                                        <option value="">Jam</option>
                                        {HOURS.map((h) => (
                                             <option key={h} value={h}>
                                                  {h}
                                             </option>
                                        ))}
                                   </select>
                                   <ChevronDown size={16} className={chevronClass} aria-hidden />
                              </div>
                              <div className="relative">
                                   <select
                                        aria-label="Menit"
                                        disabled={!values.time}
                                        value={values.time.slice(3, 5)}
                                        onChange={(e) =>
                                             update("time", `${values.time.slice(0, 2)}:${e.target.value}`)
                                        }
                                        className={selectClass}
                                   >
                                        {MINUTES.map((m) => (
                                             <option key={m} value={m}>
                                                  {m}
                                             </option>
                                        ))}
                                   </select>
                                   <ChevronDown size={16} className={chevronClass} aria-hidden />
                              </div>
                         </div>
                    </div>

                    {/* Penumpang */}
                    <div
                         className={`col-span-2 min-w-0 space-y-1.5 ${isSimplePackage ? "lg:col-span-4" : "lg:col-span-6"
                              }`}
                    >
                         <label htmlFor="sm-passengers" className={labelClass}>
                              <Users size={14} className="text-primary" aria-hidden />
                              {isSimplePackage
                                   ? config.labels.passengers
                                   : content.labels.passengers}
                         </label>
                         {isSimplePackage ? (
                              <input
                                   id="sm-passengers"
                                   type="number"
                                   inputMode="numeric"
                                   min={1}
                                   required
                                   value={values.passengers}
                                   onChange={(e) => update("passengers", e.target.value)}
                                   placeholder={config.placeholders.passengers}
                                   className={inputClass}
                              />
                         ) : (
                              <input
                                   id="sm-passengers"
                                   type="text"
                                   required
                                   value={values.passengers}
                                   onChange={(e) => update("passengers", e.target.value)}
                                   placeholder={content.placeholders.passengers}
                                   className={inputClass}
                              />
                         )}
                    </div>

                    {/* Dengan sopir (hanya Lepas Kunci, bila unit punya tambahan driver) */}
                    {driverAvailable && (
                         <div className="col-span-2 min-w-0 lg:col-span-8">
                              <label
                                   htmlFor="sm-driver"
                                   className="flex cursor-pointer items-center gap-2 font-label-md text-label-md text-on-surface"
                              >
                                   <input
                                        id="sm-driver"
                                        type="checkbox"
                                        checked={withDriver}
                                        onChange={(e) => setWithDriver(e.target.checked)}
                                        className="h-4 w-4 accent-primary"
                                   />
                                   {config.labels.withDriver} (+{" "}
                                   {formatPrice(String(driverAmount)) ?? ""}/hari)
                              </label>
                         </div>
                    )}

                    {/* Rincian termasuk (hanya bila harga tampil) */}
                    {priceText &&
                         (includes.length > 0 || excludes.length > 0 || useDriver) && (
                              <div className="col-span-2 space-y-1.5 lg:col-span-12">
                                   {includes.length > 0 && (
                                        <p className="font-label-sm text-label-sm text-on-surface-variant">
                                             <span className="font-bold text-on-surface">
                                                  {config.labels.includes}:
                                             </span>{" "}
                                             {includes.join(", ")}
                                        </p>
                                   )}
                                   {excludes.length > 0 && (
                                        <p className="font-label-sm text-label-sm text-on-surface-variant">
                                             <span className="font-bold text-on-surface">
                                                  {config.labels.excludes}:
                                             </span>{" "}
                                             {excludes.join(", ")}
                                        </p>
                                   )}
                                   {useDriver && (
                                        <p className="font-label-sm text-label-sm text-on-surface-variant">
                                             <span className="font-bold text-on-surface">
                                                  {config.labels.driverAddOn}:
                                             </span>{" "}
                                             {driverText}
                                        </p>
                                   )}
                              </div>
                         )}

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
                                             {priceUnit}
                                        </span>
                                   </span>
                              </div>
                         )}

                         {askAdmin && (
                              <div className="flex items-center justify-center rounded-lg bg-primary-container/10 px-space-md py-2 font-label-md text-label-md text-primary sm:bg-transparent sm:px-0 sm:py-0">
                                   {config.askAdminText}
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