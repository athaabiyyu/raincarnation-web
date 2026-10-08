"use client";

import { useState } from "react";
import {
     CalendarCheck,
     Headset,
     MessageSquareText,
     PhoneCall,
     Send,
     Wallet,
} from "lucide-react";
import { sewaMobilForm } from "@/constants/sewa-mobil";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

type SewaMobilFormProps = {
     packageOptions: string[];
     fleetOptions: string[];
     whatsapp: string;
};

type FormValues = {
     packageType: string;
     fleet: string;
     origin: string;
     destination: string;
     date: string;
     time: string;
     passengers: string;
     notes: string;
};

const INPUT_CLASS =
     "w-full rounded-xl border border-surface-container-high bg-surface-container-lowest p-3 font-body-lg text-body-lg text-on-surface shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary";
const LABEL_CLASS =
     "mb-1.5 block font-label-md text-label-md font-bold text-on-surface";

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

function buildMessage(values: FormValues): string {
     const details = [
          `- Layanan: ${values.packageType}`,
          `- Unit: ${values.fleet}`,
          values.origin.trim() && `- Penjemputan: ${values.origin.trim()}`,
          values.destination.trim() && `- Tujuan: ${values.destination.trim()}`,
          values.date && `- Tanggal: ${formatDate(values.date)}`,
          values.time && `- Jam: ${values.time}`,
          values.passengers.trim() &&
          `- Penumpang & koper: ${values.passengers.trim()}`,
          values.notes.trim() && `- Catatan: ${values.notes.trim()}`,
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
     packageOptions,
     fleetOptions,
     whatsapp,
}: SewaMobilFormProps) {
     const content = sewaMobilForm;
     const packages = [...packageOptions, content.otherOption];
     const fleet = [...fleetOptions, content.otherOption];

     const [values, setValues] = useState<FormValues>({
          packageType: packages[0],
          fleet: fleet[0],
          origin: "",
          destination: "",
          date: "",
          time: "",
          passengers: "",
          notes: "",
     });

     if (!whatsapp) return null;

     function update(field: keyof FormValues, value: string) {
          setValues((prev) => ({ ...prev, [field]: value }));
     }

     const message = buildMessage(values);

     function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
          event.preventDefault();
          window.open(
               buildWhatsAppUrl(whatsapp, message),
               "_blank",
               "noopener,noreferrer",
          );
     }

     const trustIcons = [Wallet, CalendarCheck];

     return (
          <section
               id="simulasi-carter"
               className="w-full scroll-mt-32 bg-surface py-space-xl"
          >
               <div className="mx-auto max-w-6xl px-gutter">
                    <div className="rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-gutter shadow-2xl lg:p-space-xl">
                         <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
                              <div className="flex flex-col gap-space-lg lg:col-span-5">
                                   <div className="flex flex-col gap-space-sm">
                                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-surface-container px-3.5 py-1 font-label-sm text-label-sm font-bold text-primary ring-1 ring-primary/20">
                                             <Headset size={14} aria-hidden="true" />
                                             {content.eyebrow}
                                        </span>
                                        <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                                             {content.title}
                                        </h2>
                                        <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
                                             {content.description}
                                        </p>
                                   </div>

                                   <div className="flex flex-col gap-space-sm">
                                        {content.trustItems.map((item, index) => {
                                             const Icon = trustIcons[index % trustIcons.length];
                                             return (
                                                  <div
                                                       key={item.title}
                                                       className="flex items-start gap-3.5 rounded-2xl border border-surface-container-high/60 bg-surface-container-low p-space-md"
                                                  >
                                                       <Icon
                                                            size={24}
                                                            className="mt-0.5 shrink-0 text-primary-container"
                                                            aria-hidden="true"
                                                       />
                                                       <div>
                                                            <span className="block font-label-md text-label-md font-bold text-on-surface">
                                                                 {item.title}
                                                            </span>
                                                            <span className="mt-0.5 block font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                                                                 {item.description}
                                                            </span>
                                                       </div>
                                                  </div>
                                             );
                                        })}
                                   </div>

                                   <div className="flex items-center gap-3.5 rounded-2xl border border-surface-container-high bg-surface-container p-space-md">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container-lowest text-primary shadow-sm">
                                             <PhoneCall size={20} aria-hidden="true" />
                                        </div>
                                        <div className="flex flex-col">
                                             <span className="font-label-sm text-label-sm font-medium text-on-surface-variant">
                                                  {content.emergency.question}
                                             </span>
                                             <a
                                                  href={buildWhatsAppUrl(
                                                       whatsapp,
                                                       content.emergency.message,
                                                  )}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="font-label-md text-label-md font-bold text-primary hover:underline"
                                             >
                                                  {content.emergency.linkLabel}
                                             </a>
                                        </div>
                                   </div>
                              </div>

                              <div className="rounded-3xl border border-surface-container-high bg-surface-container-low/70 p-space-md shadow-inner sm:p-space-lg lg:col-span-7">
                                   <form
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-space-md"
                                   >
                                        <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2">
                                             <div>
                                                  <label htmlFor="sm-package" className={LABEL_CLASS}>
                                                       {content.labels.packageType}
                                                  </label>
                                                  <select
                                                       id="sm-package"
                                                       value={values.packageType}
                                                       onChange={(e) => update("packageType", e.target.value)}
                                                       className={INPUT_CLASS}
                                                  >
                                                       {packages.map((option) => (
                                                            <option key={option} value={option}>
                                                                 {option}
                                                            </option>
                                                       ))}
                                                  </select>
                                             </div>
                                             <div>
                                                  <label htmlFor="sm-fleet" className={LABEL_CLASS}>
                                                       {content.labels.fleet}
                                                  </label>
                                                  <select
                                                       id="sm-fleet"
                                                       value={values.fleet}
                                                       onChange={(e) => update("fleet", e.target.value)}
                                                       className={INPUT_CLASS}
                                                  >
                                                       {fleet.map((option) => (
                                                            <option key={option} value={option}>
                                                                 {option}
                                                            </option>
                                                       ))}
                                                  </select>
                                             </div>
                                             <div>
                                                  <label htmlFor="sm-origin" className={LABEL_CLASS}>
                                                       {content.labels.origin}
                                                  </label>
                                                  <input
                                                       id="sm-origin"
                                                       type="text"
                                                       required
                                                       value={values.origin}
                                                       onChange={(e) => update("origin", e.target.value)}
                                                       placeholder={content.placeholders.origin}
                                                       className={INPUT_CLASS}
                                                  />
                                             </div>
                                             <div>
                                                  <label htmlFor="sm-destination" className={LABEL_CLASS}>
                                                       {content.labels.destination}
                                                  </label>
                                                  <input
                                                       id="sm-destination"
                                                       type="text"
                                                       required
                                                       value={values.destination}
                                                       onChange={(e) => update("destination", e.target.value)}
                                                       placeholder={content.placeholders.destination}
                                                       className={INPUT_CLASS}
                                                  />
                                             </div>
                                             <div>
                                                  <label htmlFor="sm-date" className={LABEL_CLASS}>
                                                       {content.labels.date}
                                                  </label>
                                                  <input
                                                       id="sm-date"
                                                       type="date"
                                                       required
                                                       value={values.date}
                                                       onChange={(e) => update("date", e.target.value)}
                                                       className={INPUT_CLASS}
                                                  />
                                             </div>
                                             <div>
                                                  <label htmlFor="sm-time" className={LABEL_CLASS}>
                                                       {content.labels.time}
                                                  </label>
                                                  <input
                                                       id="sm-time"
                                                       type="time"
                                                       value={values.time}
                                                       onChange={(e) => update("time", e.target.value)}
                                                       className={INPUT_CLASS}
                                                  />
                                             </div>
                                             <div className="sm:col-span-2">
                                                  <label htmlFor="sm-passengers" className={LABEL_CLASS}>
                                                       {content.labels.passengers}
                                                  </label>
                                                  <input
                                                       id="sm-passengers"
                                                       type="text"
                                                       value={values.passengers}
                                                       onChange={(e) => update("passengers", e.target.value)}
                                                       placeholder={content.placeholders.passengers}
                                                       className={INPUT_CLASS}
                                                  />
                                             </div>
                                        </div>

                                        <div>
                                             <label htmlFor="sm-notes" className={LABEL_CLASS}>
                                                  {content.labels.notes}
                                             </label>
                                             <textarea
                                                  id="sm-notes"
                                                  rows={2}
                                                  value={values.notes}
                                                  onChange={(e) => update("notes", e.target.value)}
                                                  placeholder={content.placeholders.notes}
                                                  className={`${INPUT_CLASS} resize-none`}
                                             />
                                        </div>

                                        <div className="flex flex-col gap-1.5 rounded-2xl border border-surface-container-high bg-surface-container p-space-md">
                                             <span className="flex items-center gap-1.5 font-label-sm text-label-sm font-bold text-on-surface-variant">
                                                  <MessageSquareText
                                                       size={16}
                                                       className="text-primary"
                                                       aria-hidden="true"
                                                  />
                                                  {content.previewLabel}
                                             </span>
                                             <p className="whitespace-pre-line font-body-sm text-body-sm italic leading-relaxed text-on-surface">
                                                  {message}
                                             </p>
                                        </div>

                                        <button
                                             type="submit"
                                             className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-space-md py-3.5 font-label-lg text-label-lg text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all hover:bg-whatsapp-hover active:scale-[0.98]"
                                        >
                                             <Send size={20} aria-hidden="true" />
                                             {content.submitLabel}
                                        </button>
                                        <p className="text-center font-label-sm text-label-sm font-medium text-on-surface-variant">
                                             {content.footnote}
                                        </p>
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}