"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

type FaqItem = {
     question: string;
     answer: string;
};

const FAQS: FaqItem[] = [
     {
          question: "Apa saja yang sudah termasuk dalam tarif sewa mobil?",
          answer:
               "Sewa Mobil All In rute dalam kota (Malang, Batu) sudah termasuk unit, BBM, driver, dan parkir. Untuk rute luar kota, tol juga termasuk. Lepas Kunci sudah termasuk unit dan biaya cuci, belum termasuk ongkos pengantaran. Rincian Carter Drop Off dikonfirmasi admin.",
     },
     {
          question: "Apa syarat sewa mobil lepas kunci di Malang dan Batu?",
          answer:
               "Penyewa membawa KTP dan SIM A yang masih berlaku. Durasi sewa 12 jam, rute dalam kota untuk Malang dan Batu. Rute luar kota tarifnya ditanyakan ke admin.",
     },
     {
          question: "Berapa harga sewa mobil Malang tanpa sopir dan dengan sopir?",
          answer:
               "Tarif bergantung pada unit dan paket: Carter Drop Off per rute, All In per hari, Lepas Kunci per 12 jam. Harga tiap unit tampil di bagian Pilihan Armada di halaman ini. Untuk rute lain atau pertanyaan tarif, tanyakan ke admin lewat WhatsApp.",
     },
     {
          question: "Area mana saja yang dilayani untuk sewa mobil?",
          answer:
               "Rute standar kami Malang, Batu, dan Surabaya. Tujuan lain termasuk Pasuruan bisa lewat custom rute, tarifnya ditanyakan ke admin. Untuk Lepas Kunci, rute dalam kota berlaku di Malang dan Batu.",
     },
     {
          question: "Bagaimana sistem sewa mobil Surabaya Malang dengan Carter Drop Off?",
          answer:
               "Carter Drop Off 1 Arah adalah sewa mobil dengan sopir untuk antar satu arah dari titik jemput ke tujuan di Malang, Batu, atau Surabaya, dengan harga per rute. Titik jemput dan jam berangkat diatur bersama admin.",
     },
     {
          question: "Berapa lama durasi sewa mobil: 12 jam atau sehari?",
          answer:
               "Lepas Kunci per 12 jam. Sewa Mobil All In per hari (1 hari). Carter Drop Off dihitung per rute, tanpa durasi. Butuh durasi lain? Konsultasikan dengan admin lewat WhatsApp.",
     },
];

export default function SewaMobilFaq() {
     const [openIndex, setOpenIndex] = useState<number | null>(0);

     const toggleFaq = (index: number) => {
          setOpenIndex(openIndex === index ? null : index);
     };

     const faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((faq) => ({
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
               {/* Schema FAQPage untuk Google Rich Results */}
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
                    }}
               />

               <div className="mx-auto max-w-4xl px-gutter">
                    {/* Header Section */}
                    <div className="space-y-space-xs text-center pb-space-lg">
                         <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                              PERTANYAAN UMUM
                         </span>
                         <h2 className="font-display text-headline-lg font-extrabold tracking-tight text-on-surface">
                              Pertanyaan Seputar Sewa Mobil Malang Lepas Kunci & Dengan Sopir
                         </h2>
                         <p className="mx-auto max-w-2xl font-body-md text-body-sm text-on-surface-variant leading-relaxed md:text-body-md">
                              Punya pertanyaan seputar sewa mobil, paket lepas kunci, atau carter drop? Cek jawaban lengkapnya di bawah ini.
                         </p>
                    </div>

                    {/* Daftar Kartu FAQ Accordion */}
                    <div className="space-y-3 md:space-y-space-sm">
                         {FAQS.map((item, index) => {
                              const isOpen = openIndex === index;
                              return (
                                   <div
                                        key={index}
                                        className="overflow-hidden rounded-xl border border-surface-container-high/60 bg-surface-container-lowest shadow-2xs transition-all duration-200 md:rounded-2xl"
                                   >
                                        <button
                                             type="button"
                                             onClick={() => toggleFaq(index)}
                                             className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:text-primary md:p-space-md"
                                             aria-expanded={isOpen}
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
                                        {isOpen && (
                                             <div className="border-t border-surface-container-high/40 px-4 pb-4 pt-3 md:px-space-md md:pb-space-md md:pt-space-xs">
                                                  <p className="text-xs text-on-surface-variant leading-relaxed sm:pl-7 md:text-body-md">
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