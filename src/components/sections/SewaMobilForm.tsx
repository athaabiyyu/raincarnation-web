"use client";

import { useState, useEffect } from "react";
import {
     Briefcase,
     CalendarDays,
     Car,
     ChevronDown,
     Clock,
     LocateFixed,
     MapPin,
     MessageSquareText,
     Minus,
     Plus,
     Timer,
     Users,
     Check,
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
     harga?: string;
     hargaAllIn?: string;
     hargaNonAllIn?: string;
     hargaLepasKunciBulanan?: string;
     hargaLepasKunciTahunan?: string;
     tambahanDriver?: string;
};

type SewaMobilFormProps = {
     routes: RuteCarter[];
     fleet: FleetOption[];
     whatsapp: string;
     embedded?: boolean;
     headingLevel?: "h2" | "h3";
     bare?: boolean;
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

const CUSTOM_ROUTE = "__custom";

const RENTAL_KINDS: SewaMobilPackageKind[] = [
     "all-in",
     "non-all-in",
     "lepas-kunci",
];

const selectClass =
     "[color-scheme:light] h-12 w-full appearance-none cursor-pointer rounded-xl border border-slate-200/90 bg-white px-4 pr-9 font-label-md text-base md:text-label-md text-on-surface invalid:text-on-surface-variant [&>option]:text-on-surface transition-all shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const inputClass =
     "h-12 w-full min-w-0 appearance-none rounded-xl border border-slate-200/90 bg-white px-4 pr-10 text-left font-label-md text-base md:text-label-md text-on-surface transition-all placeholder:text-on-surface-variant shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none [&::-webkit-date-and-time-value]:text-left [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer";

const labelClass =
     "mb-2 flex items-center gap-1.5 font-label-md text-label-md text-on-surface";

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

function toPrice(value: string | number | undefined): number {
     const number = Number(value);
     return Number.isFinite(number) && number > 0 ? number : 0;
}

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
          routeText && `- Rute: ${routeText}`,
          customRouteText && `- Rute yang diinginkan: ${customRouteText}`,
          origin && `- Penjemputan: ${origin}`,
          destination && `- Tujuan: ${destination}`,
          values.date && `- Tanggal: ${formatDate(values.date)}`,
          values.time && `- Jam: ${values.time}`,
          values.passengers.trim() && `- Penumpang: ${values.passengers.trim()}`,
          driverText && `- Tambahan driver: ${driverText}`,
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
     bare = false,
}: SewaMobilFormProps) {
     const content = sewaMobilForm;
     const config = sewaMobilPackageConfig;

     const packageConfigs: PackageConfig[] = config.packages;
     const packages = packageConfigs.filter((p) => {
          if (RENTAL_KINDS.includes(p.kind)) {
               return fleet.some((f) => fleetPrice(f, p.kind, "12-jam") > 0);
          }
          return routes.some((r) => r.acf?.paket_sewa === p.name);
     });

     const defaultPackageConfig =
          packages.find((p) => p.kind === "all-in") ?? packages[0];
     const defaultPackageName = defaultPackageConfig?.name ?? "";

     const defaultFleet =
          fleet.find((f) => f.name.toLowerCase().includes("innova reborn")) ?? fleet[0];

     const [packageType, setPackageType] = useState(defaultPackageName);
     const [fleetId, setFleetId] = useState(
          defaultFleet ? String(defaultFleet.id) : "",
     );
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

     const applyDefaultsForPackage = (pkgName: string, selectedFleetObj?: FleetOption) => {
          const targetConfig = packages.find((p) => p.name === pkgName);
          if (!targetConfig) return;

          const targetKind = targetConfig.kind;
          const targetIsSimple =
               targetKind !== undefined && RENTAL_KINDS.includes(targetKind);

          if (targetKind === "lepas-kunci") {
               const currentFleet = selectedFleetObj ?? defaultFleet;
               const validDurations = (targetConfig.durations ?? []).filter(
                    (d) => fleetPrice(currentFleet, targetKind, d.value) > 0,
               );
               if (validDurations.length > 0) {
                    setDurationValue(validDurations[0].value);
               }
          } else {
               setDurationValue("");
          }

          if (targetIsSimple) {
               const targetRoutes = targetConfig.routes ?? [];
               if (targetRoutes.length > 0) {
                    setRouteValue(targetRoutes[0].value ?? targetRoutes[0].label);
               }
          } else {
               const availableRoutes = routes.filter(
                    (r) => r.acf?.paket_sewa === pkgName,
               );
               const availableOrigins = unique(
                    availableRoutes.map((r) => capitalizeFirst(r.acf?.kota_asal)),
               );
               if (availableOrigins.length > 0) {
                    setOrigin(availableOrigins[0]);
                    const availableDestinations = unique(
                         availableRoutes
                              .filter(
                                   (r) => capitalizeFirst(r.acf?.kota_asal) === availableOrigins[0],
                              )
                              .map((r) => capitalizeFirst(r.acf?.kota_tujuan)),
                    );
                    if (availableDestinations.length > 0) {
                         setDestination(availableDestinations[0]);
                    }
               }
          }
     };

     useEffect(() => {
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, "0");
          const day = String(now.getDate()).padStart(2, "0");
          const hours = String(now.getHours()).padStart(2, "0");
          const minutes = String(now.getMinutes()).padStart(2, "0");

          setValues((prev) => ({
               ...prev,
               date: `${year}-${month}-${day}`,
               time: `${hours}:${minutes}`,
          }));

          if (defaultPackageName) {
               applyDefaultsForPackage(defaultPackageName);
          }
     }, []);

     if (!whatsapp || packages.length === 0) return null;

     function update(field: keyof FormValues, value: string) {
          setValues((prev) => ({ ...prev, [field]: value }));
     }

     const rawPassengerCount = parseInt(values.passengers, 10);
     const passengerCount = Number.isNaN(rawPassengerCount) ? 1 : rawPassengerCount;

     const handleDecrementPassengers = () => {
          if (passengerCount > 1) {
               update("passengers", `${passengerCount - 1} Orang`);
          }
     };

     const handleIncrementPassengers = () => {
          if (values.passengers === "") {
               update("passengers", "1 Orang");
          } else {
               update("passengers", `${passengerCount + 1} Orang`);
          }
     };

     const selectedConfig = packages.find((p) => p.name === packageType);
     const selectedPackage = selectedConfig?.name ?? "";
     const kind = selectedConfig?.kind;
     const isSimplePackage = kind !== undefined && RENTAL_KINDS.includes(kind);
     const isLepasKunci = kind === "lepas-kunci";

     const topSpan = isSimplePackage ? "lg:col-span-4" : "lg:col-span-3";

     const packageRoutes = selectedPackage
          ? routes.filter((r) => r.acf?.paket_sewa === selectedPackage)
          : routes;

     const fleetOptions = fleet.filter((f) => {
          if (isSimplePackage) return fleetPrice(f, kind, "12-jam") > 0;
          if (kind === "drop-off") {
               return packageRoutes.some((r) =>
                    r.acf?.armada?.some((a) => a.ID === f.id),
               );
          }
          return (
               RENTAL_KINDS.some((k) => fleetPrice(f, k, "12-jam") > 0) ||
               routes.some((r) => r.acf?.armada?.some((a) => a.ID === f.id))
          );
     });
     const selectedFleet = fleetOptions.find((f) => String(f.id) === fleetId);

     const durationOptions: DurationOption[] =
          isLepasKunci && selectedFleet
               ? (selectedConfig?.durations ?? []).filter(
                    (d) => fleetPrice(selectedFleet, kind, d.value) > 0,
               )
               : [];
     const selectedDuration = durationOptions.find(
          (d) => d.value === durationValue,
     );

     const driverAmount = isLepasKunci
          ? toPrice(selectedFleet?.tambahanDriver)
          : 0;
     const driverAvailable = driverAmount > 0;
     const useDriver = driverAvailable && withDriver;
     const driverText = useDriver
          ? `${formatPrice(String(driverAmount)) ?? ""}/hari`
          : "";

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

     const origins = unique(
          packageRoutes.map((r) => capitalizeFirst(r.acf?.kota_asal)),
     );
     const selectedOrigin = origins.includes(origin) ? origin : (origins[0] ?? "");

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
          : (destinations[0] ?? "");

     const handlePackageChange = (newPackage: string) => {
          setPackageType(newPackage);
          const targetConfig = packages.find((p) => p.name === newPackage);
          const targetKind = targetConfig?.kind;
          const targetIsSimple =
               targetKind !== undefined && RENTAL_KINDS.includes(targetKind);

          const availableFleets = fleet.filter((f) => {
               if (targetIsSimple) return fleetPrice(f, targetKind, "12-jam") > 0;
               return true;
          });

          let newFleet = selectedFleet;
          if (availableFleets.length > 0) {
               newFleet =
                    availableFleets.find((f) =>
                         f.name.toLowerCase().includes("innova reborn"),
                    ) ?? availableFleets[0];
               setFleetId(String(newFleet.id));
          }

          applyDefaultsForPackage(newPackage, newFleet);
     };

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

     function resolvePrice(): number {
          if (kind === "drop-off") return toPrice(match?.acf?.harga);
          if (isCustomRoute) return 0;
          return fleetPrice(selectedFleet, kind, selectedDuration?.value ?? "12-jam");
     }

     const price = allFilled ? resolvePrice() : 0;
     const priceText = price > 0 ? formatPrice(String(price)) : null;

     const askAdmin = allFilled && !priceText;
     const priceUnit =
          selectedDuration?.priceUnit ?? selectedConfig?.priceUnit ?? "/rute";
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
          <div
               className={
                    bare
                         ? ""
                         : "rounded-2xl bg-surface-container-lowest p-5 shadow-xl lg:p-space-lg"
               }
          >
               {/* Header form */}
               <div
                    className={`flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between ${bare
                              ? "sm:mb-space-md lg:mb-space-lg"
                              : "mb-space-lg border-b border-surface-container pb-space-md sm:mb-space-lg sm:border-b-0 sm:pb-0"
                         }`}
               >
                    <div className="flex min-w-0 items-center gap-space-sm">
                         <span
                              className={`shrink-0 rounded-lg bg-primary-container/10 p-2 text-primary ${bare ? "hidden sm:block" : ""
                                   }`}
                         >
                              <CarIcon className="h-[22px] w-[22px]" />
                         </span>
                         <div className="flex flex-col">
                              <Heading
                                   className={`whitespace-nowrap font-label-lg text-label-lg text-on-surface ${bare ? "sr-only sm:not-sr-only" : ""
                                        }`}
                              >
                                   {/* Teks responsif: Versi pendek di mobile, versi lengkap di desktop */}
                                   <span className="sm:hidden">Cek Tarif & Mobil Disini</span>
                                   <span className="hidden sm:inline">{content.title}</span>
                              </Heading>
                              <p className="hidden font-label-sm text-xs text-on-surface-variant sm:block md:text-label-sm">
                                   Pilih layanan dan unit, lalu kirim kebutuhan Anda ke admin lewat WhatsApp.
                              </p>
                         </div>
                    </div>

                    <div className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-label-sm text-xs text-emerald-700 sm:inline-flex">
                         <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                         <span>{content.eyebrow}</span>
                    </div>
               </div>

               <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 items-end gap-x-space-md gap-y-6 lg:grid-cols-12 lg:gap-x-space-md"
               >
                    {/* Layanan */}
                    <div className={`col-span-2 min-w-0 space-y-1.5 ${topSpan}`}>
                         <label htmlFor="sm-package" className={labelClass}>
                              <Briefcase size={14} className="text-primary" aria-hidden />
                              {content.labels.packageType}
                         </label>
                         <div className="relative">
                              <select
                                   id="sm-package"
                                   required
                                   value={selectedPackage}
                                   onChange={(e) => handlePackageChange(e.target.value)}
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
                    <div className={`col-span-2 min-w-0 space-y-1.5 ${topSpan}`}>
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
                              <div
                                   className={`col-span-2 min-w-0 space-y-1.5 ${isLepasKunci ? "lg:col-span-12" : "lg:col-span-4"
                                        }`}
                              >
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

                              {/* Rute kustom */}
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
                                             <option value="">Pilih Asal</option>
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
                    <div className="col-span-2 min-w-0 space-y-1.5 lg:col-span-4">
                         <label htmlFor="sm-date" className={labelClass}>
                              <CalendarDays size={14} className="text-primary" aria-hidden />
                              {content.labels.date}
                         </label>
                         <div className="relative">
                              <input
                                   id="sm-date"
                                   type="date"
                                   required
                                   value={values.date}
                                   onChange={(e) => update("date", e.target.value)}
                                   className={inputClass}
                              />
                              <CalendarDays
                                   size={16}
                                   className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                                   aria-hidden
                              />
                         </div>
                    </div>

                    {/* Jam */}
                    <div className="col-span-2 min-w-0 space-y-1.5 lg:col-span-4">
                         <label htmlFor="sm-time" className={labelClass}>
                              <Clock size={14} className="text-primary" aria-hidden />
                              {content.labels.time}
                         </label>
                         <div className="relative">
                              <input
                                   id="sm-time"
                                   type="time"
                                   required
                                   value={values.time}
                                   onChange={(e) => update("time", e.target.value)}
                                   className={inputClass}
                              />
                              <Clock
                                   size={16}
                                   className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                                   aria-hidden
                              />
                         </div>
                    </div>

                    {/* Jumlah Penumpang */}
                    <div className="col-span-2 min-w-0 space-y-1.5 lg:col-span-4">
                         <div className="flex items-center justify-between">
                              <label htmlFor="sm-passengers" className={labelClass}>
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
                                   disabled={passengerCount <= 1 || values.passengers === ""}
                                   onClick={handleDecrementPassengers}
                                   className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors disabled:opacity-40 active:bg-slate-100"
                                   aria-label="Kurangi Penumpang"
                              >
                                   <Minus size={14} />
                              </button>

                              <span className="font-label-md text-base text-on-surface">
                                   {values.passengers === "" ? (
                                        <span className="text-slate-600">Contoh: 4 Orang</span>
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

                         {/* Input Desktop (PERBAIKAN: Gunakan required={false} pada perangkat mobile atau 
         hilangkan atribut required mutlak yang menjebak validasi tersembunyi) */}
                         <div className="hidden sm:block">
                              {isSimplePackage ? (
                                   <input
                                        id="sm-passengers"
                                        type="number"
                                        inputMode="numeric"
                                        min={1}
                                        required={false} // <--- Mencegah blokir validasi tersembunyi di mobile
                                        value={parseInt(values.passengers, 10) || ""}
                                        onChange={(e) => update("passengers", e.target.value ? `${e.target.value} Orang` : "")}
                                        placeholder="Contoh: 4"
                                        className={inputClass}
                                   />
                              ) : (
                                   <input
                                        id="sm-passengers"
                                        type="text"
                                        required={false} // <--- Mencegah blokir validasi tersembunyi di mobile
                                        value={values.passengers}
                                        onChange={(e) => update("passengers", e.target.value)}
                                        placeholder="Contoh: 4 Orang"
                                        className={inputClass}
                                   />
                              )}
                         </div>
                    </div>

                    {/* Dengan sopir (hanya Lepas Kunci) */}
                    {driverAvailable && (
                         <div className="col-span-2 min-w-0 lg:col-span-12">
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

                    {/* Rincian termasuk */}
                    {priceText &&
                         (includes.length > 0 || excludes.length > 0 || useDriver) && (
                              <div className="-mb-2 col-span-2 space-y-1 lg:col-span-12">
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

                    {/* Bottom Section */}
                    <div className="col-span-2 flex flex-col gap-2.5 pt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-space-sm sm:pt-space-md lg:col-span-12">
                         {priceText ? (
                              <div className="flex items-baseline justify-center gap-2 whitespace-nowrap rounded-xl bg-primary-container/10 px-4 py-3 sm:flex-col sm:items-start sm:justify-start sm:gap-0 sm:bg-transparent sm:px-0 sm:py-0">
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

                         {askAdmin && (
                              <div className="flex items-center justify-center rounded-lg bg-primary-container/10 px-space-md py-2 font-label-md text-label-md text-primary sm:bg-transparent sm:px-0 sm:py-0">
                                   {config.askAdminText}
                              </div>
                         )}

                         <button
                              type="submit"
                              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-center font-label-md text-label-md font-semibold text-on-primary shadow-md transition-all duration-150 hover:bg-primary/90 sm:ml-auto sm:w-auto sm:py-2.5"
                         >
                              <MessageSquareText className="h-4 w-4 shrink-0" aria-hidden />
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