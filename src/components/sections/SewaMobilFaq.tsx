"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

type FaqItem = {
     question: string;
     answer: string;
};

export type FaqStartingPrices = {
     lepasKunci?: string;
     lepasKunciBulanan?: string;
     allIn?: string;
     nonAllIn?: string;
};

type SewaMobilFaqProps = {
     startingPrices?: FaqStartingPrices;
};

function buildPriceAnswer(prices?: FaqStartingPrices): string {
     const withDriver: string[] = [];
     if (prices?.allIn) {
          withDriver.push(`All In mulai ${prices.allIn} per hari`);
     }
     if (prices?.nonAllIn) {
          withDriver.push(`Non All In mulai ${prices.nonAllIn} per hari`);
     }

     const sentences: string[] = ["Tarif bergantung pada unit dan layanan."];

     if (withDriver.length > 0) {
          sentences.push(
               `Dengan sopir: ${withDriver.join(", ")}. Carter Drop Off dihitung per rute.`,
          );
     } else {
          sentences.push(
               "Dengan sopir: Carter Drop Off per rute, serta All In atau Non All In per hari.",
          );
     }

     if (prices?.lepasKunci) {
          sentences.push(
               `Tanpa sopir: Lepas Kunci mulai ${prices.lepasKunci} per 12 jam, juga tersedia bulanan dan tahunan.`,
          );
     } else {
          sentences.push(
               "Tanpa sopir: Lepas Kunci per 12 jam, bulanan, atau tahunan.",
          );
     }

     sentences.push(
          "Harga tiap unit tampil di bagian Pilihan Armada, dan tarif tiap layanan bisa dicek lewat form simulasi di bagian atas halaman. Untuk rute lain atau pertanyaan tarif, tanyakan ke admin lewat WhatsApp.",
     );

     return sentences.join(" ");
}

function buildLepasKunciDayAnswer(prices?: FaqStartingPrices): string {
     const priceText = prices?.lepasKunci
          ? `Lepas Kunci dihitung per 12 jam, mulai ${prices.lepasKunci}.`
          : "Lepas Kunci dihitung per 12 jam.";

     return `${priceText} Tersedia juga paket bulanan dan tahunan. Butuh durasi lain, termasuk 24 jam? Tanyakan ke admin lewat WhatsApp.`;
}

function buildLepasKunciMonthAnswer(prices?: FaqStartingPrices): string {
     const priceText = prices?.lepasKunciBulanan
          ? `Sewa mobil lepas kunci bulanan mulai ${prices.lepasKunciBulanan} per bulan, tergantung unit.`
          : "Sewa mobil lepas kunci tersedia dalam paket bulanan, tergantung unit.";

     return `${priceText} Paket tahunan juga tersedia. Cek tarif tiap unit lewat form simulasi: pilih Lepas Kunci, lalu durasi Bulanan atau Tahunan. Butuh durasi lain? Tanyakan ke admin lewat WhatsApp.`;
}

function buildFaqs(prices?: FaqStartingPrices): FaqItem[] {
     return [
          {
               question: "Apa saja yang sudah termasuk dalam tarif sewa mobil?",
               answer:
                    "Rincian berbeda tiap layanan. Sewa Mobil All In sudah termasuk unit, BBM, driver, makan driver, tol, dan parkir. Sewa Mobil Non All In sudah termasuk unit, BBM, dan driver. Carter Drop Off 1 Arah sudah termasuk unit, BBM, dan driver. Lepas Kunci sudah termasuk unit dan biaya cuci, belum termasuk ongkos pengantaran.",
          },
          {
               question: "Apa bedanya sewa mobil All In dan Non All In?",
               answer:
                    "Keduanya sewa mobil dengan sopir per hari dan sudah termasuk unit, BBM, dan driver. Bedanya, All In juga sudah termasuk makan driver, tol, dan parkir, sedangkan Non All In hanya unit, BBM, dan driver. Pilih sesuai kebutuhan perjalanan Anda, atau tanyakan ke admin lewat WhatsApp.",
          },
          {
               question: "Apa syarat sewa mobil lepas kunci di Malang dan Batu?",
               answer:
                    "Penyewa membawa KTP dan SIM A yang masih berlaku. Durasi sewa tersedia 12 jam, bulanan, atau tahunan, dengan rute dalam kota (Malang, Batu). Rute luar kota tarifnya ditanyakan ke admin.",
          },
          {
               question: "Bagaimana sistem sewa mobil lepas kunci?",
               answer:
                    "Pilih unit dan durasi (12 jam, bulanan, atau tahunan) lewat form simulasi atau kartu armada, siapkan KTP dan SIM A yang masih berlaku, lalu konfirmasi lewat WhatsApp. Harga sudah termasuk unit dan biaya cuci, belum termasuk ongkos pengantaran. Rute dalam kota (Malang, Batu), sedangkan rute luar kota tarifnya ditanyakan ke admin.",
          },
          {
               question: "Sewa mobil lepas kunci 1 hari berapa?",
               answer: buildLepasKunciDayAnswer(prices),
          },
          {
               question: "Sewa mobil 1 bulan berapa?",
               answer: buildLepasKunciMonthAnswer(prices),
          },
          {
               question: "Berapa harga sewa mobil Malang tanpa sopir dan dengan sopir?",
               answer: buildPriceAnswer(prices),
          },
          {
               question: "Area mana saja yang dilayani untuk sewa mobil?",
               answer:
                    "Carter Drop Off, All In, dan Non All In melayani rute standar Malang, Batu, dan Surabaya. Khusus All In dan Non All In, tujuan lain termasuk Pasuruan bisa lewat custom rute, tarifnya ditanyakan ke admin. Lepas Kunci melayani rute dalam kota (Malang, Batu), sedangkan rute luar kota tarifnya ditanyakan ke admin.",
          },
          {
               question: "Bagaimana sistem sewa mobil Surabaya Malang dengan Carter Drop Off?",
               answer:
                    "Carter Drop Off 1 Arah adalah sewa mobil dengan sopir untuk antar satu arah dari titik jemput ke tujuan di Malang, Batu, atau Surabaya, dengan harga per rute. Titik jemput dan jam berangkat diatur bersama admin.",
          },
          {
               question: "Berapa lama durasi sewa mobil: 12 jam atau sehari?",
               answer:
                    "Lepas Kunci tersedia per 12 jam, bulanan, atau tahunan. Sewa Mobil All In dan Non All In per hari (1 hari). Carter Drop Off dihitung per rute, tanpa durasi. Butuh durasi lain? Konsultasikan dengan admin lewat WhatsApp.",
          },
     ];
}

export default function SewaMobilFaq({ startingPrices }: SewaMobilFaqProps) {
     const [openIndex, setOpenIndex] = useState<number | null>(0);
     const faqs = buildFaqs(startingPrices);

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
                         {faqs.map((item, index) => {
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