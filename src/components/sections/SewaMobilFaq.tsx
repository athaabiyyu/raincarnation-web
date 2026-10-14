"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

type FaqItem = {
     question: string;
     answer: string;
};

const FAQS: FaqItem[] = [
     {
          question: "Apakah tarif sewa mobil sudah termasuk BBM dan jasa driver?",
          answer:
               "Untuk paket Sewa All-In dan Carter Drop, tarif yang tertera sudah mencakup jasa driver profesional dan BBM. Biaya tambahan seperti tol dan parkir disesuaikan dengan rute perjalanan Anda.",
     },
     {
          question: "Apakah tersedia opsi sewa mobil lepas kunci (tanpa driver) di Malang & Batu?",
          answer:
               "Ya, kami menyediakan layanan sewa mobil lepas kunci untuk unit tertentu dengan proses verifikasi dokumen identitas (KTP, SIM A aktif, dan akun media sosial) yang cepat dan mudah.",
     },
     {
          question: "Berapa harga sewa mobil per hari di Malang?",
          answer:
               "Tarif bergantung pada jenis armada, paket yang dipilih (All-In, Carter Drop, atau Lepas Kunci), dan rute perjalanan. Gunakan Simulasi & Cek Tarif di bagian atas halaman ini untuk estimasi, atau tanyakan langsung ke admin via WhatsApp.",
     },
     {
          question: "Area mana saja yang dilayani untuk sewa mobil?",
          answer:
               "Kami melayani sewa mobil di Malang, Batu, Surabaya, dan Pasuruan, termasuk penjemputan di Bandara Juanda. Untuk rute luar kota atau perjalanan multi-hari, konsultasikan dulu dengan admin via WhatsApp.",
     },
     {
          question: "Bagaimana sistem penjemputan untuk carter drop luar kota?",
          answer:
               "Layanan carter drop bersifat privat door-to-door. Driver kami akan menjemput rombongan Anda langsung di alamat asal (rumah, hotel, stasiun, atau Bandara Juanda/ABD Saleh) sesuai jam keberangkatan yang disepakati.",
     },
     {
          question: "Berapa lama durasi standar sewa mobil harian?",
          answer:
               "Durasi standar sewa mobil harian adalah 12 jam per hari atau per tanggal perjalanan. Jika membutuhkan durasi full day atau luar kota multi-hari, Anda dapat berkonsultasi langsung dengan admin via WhatsApp.",
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