"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { pusatBantuanForm } from "@/constants/pusat-bantuan";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

type HelpQuickFormProps = {
     whatsapp: string;
};

const fieldClass =
     "w-full rounded-lg bg-surface-container px-3 py-2.5 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant transition-colors focus:bg-surface-container-high focus:outline-none";

const labelClass =
     "mb-1 block font-label-sm text-label-sm font-bold text-on-surface";

export default function HelpQuickForm({ whatsapp }: HelpQuickFormProps) {
     const content = pusatBantuanForm;
     const [name, setName] = useState("");
     const [topic, setTopic] = useState(content.topics[0]);
     const [message, setMessage] = useState("");

     function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
          event.preventDefault();
          const text = [
               "Halo Admin Raincarnation,",
               "",
               `- Nama: ${name.trim()}`,
               `- Keperluan: ${topic}`,
               `- Pesan: ${message.trim()}`,
               "",
               "Mohon dibantu informasinya. Terima kasih!",
          ].join("\n");
          window.open(
               buildWhatsAppUrl(whatsapp, text),
               "_blank",
               "noopener,noreferrer",
          );
     }

     return (
          <div className="space-y-space-md rounded-xl bg-surface-container-lowest p-space-lg shadow-md lg:sticky lg:top-28">
               <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-on-primary">
                         <Send size={20} aria-hidden="true" />
                    </span>
                    <div>
                         <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                              {content.title}
                         </h3>
                         <p className="font-label-sm text-label-sm text-outline">
                              {content.subtitle}
                         </p>
                    </div>
               </div>

               <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div>
                         <label htmlFor="help-name" className={labelClass}>
                              {content.labels.name}
                         </label>
                         <input
                              id="help-name"
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder={content.placeholders.name}
                              className={fieldClass}
                         />
                    </div>
                    <div>
                         <label htmlFor="help-topic" className={labelClass}>
                              {content.labels.topic}
                         </label>
                         <select
                              id="help-topic"
                              value={topic}
                              onChange={(e) => setTopic(e.target.value)}
                              className={fieldClass}
                         >
                              {content.topics.map((option) => (
                                   <option key={option} value={option}>
                                        {option}
                                   </option>
                              ))}
                         </select>
                    </div>
                    <div>
                         <label htmlFor="help-message" className={labelClass}>
                              {content.labels.message}
                         </label>
                         <textarea
                              id="help-message"
                              required
                              rows={3}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder={content.placeholders.message}
                              className={`${fieldClass} resize-none`}
                         />
                    </div>
                    <button
                         type="submit"
                         className="inline-flex w-full items-center justify-center gap-space-sm rounded-lg bg-whatsapp px-space-md py-3 font-label-md text-label-md text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all duration-150 hover:bg-whatsapp-hover"
                    >
                         <Send size={18} aria-hidden="true" />
                         {content.submit}
                    </button>
               </form>

               <p className="rounded-lg bg-surface-container-low p-3 font-label-sm text-label-sm leading-tight text-outline">
                    {content.note}
               </p>
          </div>
     );
}