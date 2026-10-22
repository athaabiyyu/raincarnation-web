"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export type UnitFaqItem = {
     question: string;
     answer: string;
};

type SewaMobilUnitFaqProps = {
     unitName: string;
     faqs: UnitFaqItem[];
};

export default function SewaMobilUnitFaq({
     unitName,
     faqs,
}: SewaMobilUnitFaqProps) {
     const [openIndex, setOpenIndex] = useState<number | null>(0);

     if (faqs.length === 0) return null;

     const toggleFaq = (index: number) => {
          setOpenIndex(openIndex === index ? null : index);
     };

     const faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
               "@type": "Question",
               name: faq.question,
               acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
               },
          })),
     };

     return (
          <section className="w-full bg-surface py-space-xl">
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
                    }}
               />

               <div className="mx-auto max-w-4xl px-gutter">
                    <div className="space-y-space-xs pb-space-lg text-center">
                         <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                              PERTANYAAN UMUM
                         </span>
                         <h2 className="font-display text-headline-lg font-extrabold tracking-tight text-on-surface">
                              Pertanyaan Seputar Sewa {unitName} Malang
                         </h2>
                    </div>

                    <div className="space-y-3 md:space-y-space-sm">
                         {faqs.map((item, index) => {
                              const isOpen = openIndex === index;
                              return (
                                   <div
                                        key={item.question}
                                        className="overflow-hidden rounded-xl border border-surface-container-high/60 bg-surface-container-lowest shadow-2xs transition-all duration-200 md:rounded-2xl"
                                   >
                                        <button
                                             type="button"
                                             onClick={() => toggleFaq(index)}
                                             className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:text-primary md:p-space-md"
                                             aria-expanded={isOpen}
                                        >
                                             <div className="flex items-center gap-2.5">
                                                  <HelpCircle className="hidden h-5 w-5 shrink-0 text-primary/80 sm:block" />
                                                  <span className="text-sm font-semibold leading-snug text-on-surface md:text-title-md">
                                                       {item.question}
                                                  </span>
                                             </div>
                                             <ChevronDown
                                                  className={`h-4 w-4 shrink-0 text-on-surface-variant transition-transform duration-200 md:h-5 md:w-5 ${
                                                       isOpen ? "rotate-180 text-primary" : ""
                                                  }`}
                                             />
                                        </button>
                                        {isOpen && (
                                             <div className="border-t border-surface-container-high/40 px-4 pb-4 pt-3 md:px-space-md md:pb-space-md md:pt-space-xs">
                                                  <p className="text-xs leading-relaxed text-on-surface-variant sm:pl-7 md:text-body-md">
                                                       {item.answer}
                                                  </p>
                                             </div>
                                        )}
                                   </div>
                              );
                         })}
                    </div>
               </div>
          </section>
     );
}