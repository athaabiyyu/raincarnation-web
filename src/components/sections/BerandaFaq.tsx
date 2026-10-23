"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { berandaFaq } from "@/constants/beranda";

export default function BerandaFaq() {
     const [openIndex, setOpenIndex] = useState<number | null>(0);

     const toggleFaq = (index: number) => {
          setOpenIndex(openIndex === index ? null : index);
     };

     return (
          <section className="w-full bg-surface py-space-xl">
               <div className="mx-auto max-w-4xl px-gutter">
                    {/* Header: Rata Tengah (text-center) dengan ukuran font judul setara section lain */}
                    <div className="space-y-space-xs text-center pb-space-lg">
                         <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                              {berandaFaq.eyebrow}
                         </span>
                         <h2 className="font-display text-headline-lg font-extrabold tracking-tight text-on-surface">
                              {berandaFaq.title}
                         </h2>
                         <p className="mx-auto max-w-2xl font-body-md text-body-sm text-on-surface-variant leading-relaxed md:text-body-md">
                              {berandaFaq.description}
                         </p>
                    </div>

                    {/* Daftar Kartu FAQ */}
                    <div className="space-y-3 md:space-y-space-sm">
                         {berandaFaq.items.map((item, index) => {
                              const isOpen = openIndex === index;
                              return (
                                   <div
                                        key={index}
                                        className="overflow-hidden rounded-xl border border-surface-container-high/60 bg-surface-container-low shadow-2xs transition-all duration-200 md:rounded-2xl"
                                   >
                                        <button
                                             type="button"
                                             onClick={() => toggleFaq(index)}
                                             className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:text-primary md:p-space-md"
                                             aria-expanded={isOpen}
                                             aria-controls={`faq-answer-${index}`}
                                        >
                                             <div className="flex items-center gap-2.5">
                                                  <HelpCircle className="hidden sm:block h-5 w-5 shrink-0 text-primary/80" />
                                                  <span className="text-sm font-semibold text-on-surface leading-snug md:text-title-md">
                                                       {item.question}
                                                  </span>
                                             </div>
                                             <ChevronDown
                                                  className={`h-4 w-4 shrink-0 text-on-surface-variant transition-transform duration-200 md:h-5 md:w-5 ${isOpen ? "rotate-180 text-primary" : ""
                                                       }`}
                                             />
                                        </button>
                                        <div
                                             id={`faq-answer-${index}`}
                                             role="region"
                                             hidden={!isOpen}
                                             className="border-t border-surface-container-high/40 px-4 pb-4 pt-3 md:px-space-md md:pb-space-md md:pt-space-xs"
                                        >
                                             <p className="text-xs text-on-surface-variant leading-relaxed sm:pl-7 md:text-body-md">
                                                  {item.answer}
                                             </p>
                                        </div>
                                   </div>
                              );
                         })}
                    </div>
               </div>
          </section>
     );
}