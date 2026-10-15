"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
     {
          question: "Apa itu travel reguler dan apa bedanya dengan sewa mobil?",
          answer: "Travel reguler adalah layanan perjalanan antar kota yang dipesan per kursi dengan jadwal keberangkatan tetap, sehingga Anda berbagi mobil dengan penumpang lain dan membayar sesuai jumlah kursi. Kalau Anda butuh satu mobil penuh untuk rombongan, pilih layanan Sewa Mobil."
     },
     {
          question: "Di mana titik penjemputan travel reguler?",
          answer: "Penjemputan dilakukan di titik yang sudah ditentukan di setiap kota, bukan di alamat rumah. Titik jemput dan titik antar untuk rute Anda dikonfirmasi oleh admin lewat WhatsApp setelah Anda memesan."
     },
     {
          question: "Berapa tarif travel reguler per kursi?",
          answer: "Tarif dihitung per kursi dan berbeda untuk tiap rute. Lihat tarif resmi di halaman masing-masing rute pada daftar di atas, atau tanyakan langsung ke admin via WhatsApp."
     },
     {
          question: "Berapa batas maksimal barang bawaan penumpang?",
          answer: "Setiap penumpang mendapatkan jatah gratis membawa 1 koper/tas ukuran sedang dan 1 tas kabin/ransel kecil yang bisa dipangku. Jika membawa barang melebihi kapasitas (seperti kardus besar atau hewan peliharaan), harap konfirmasi ke admin terlebih dahulu karena mungkin ada biaya bagasi tambahan."
     },
     {
          question: "Apakah anak kecil atau balita dikenakan biaya tiket penuh?",
          answer: "Anak usia di bawah 3 tahun yang dipangku selama perjalanan tidak dikenakan biaya (gratis). Namun, jika anak membutuhkan kursi sendiri demi kenyamanan dan ruang yang lebih lega, maka akan dikenakan tarif tiket 1 kursi penuh."
     },
     {
          question: "Bagaimana kebijakan pembatalan atau perubahan jadwal (reschedule)?",
          answer: "Perubahan jadwal (reschedule) dapat dilakukan maksimal 12 jam sebelum jam keberangkatan tanpa biaya tambahan, menyesuaikan ketersediaan kursi di jadwal baru. Untuk pembatalan di bawah 6 jam sebelum keberangkatan, tiket yang sudah dibayar tidak dapat dikembalikan (hangus)."
     },
     {
          question: "Apakah armada travel berhenti untuk istirahat atau makan?",
          answer: "Tentu. Untuk kenyamanan penumpang, driver kami akan berhenti di rest area atau rumah makan yang sudah ditentukan (biasanya 1 kali pemberhentian) agar penumpang dapat ke toilet, beribadah, atau makan. Anda juga bisa me-request berhenti sejenak untuk ke toilet jika keadaan mendesak."
     }
];

export default function FaqTravel({ whatsapp }: { whatsapp?: string }) {
     const [openIndex, setOpenIndex] = useState<number | null>(0);

     const toggleFaq = (index: number) => {
          setOpenIndex(openIndex === index ? null : index);
     };

     return (
          <section className="w-full bg-surface py-space-xl">
               <div className="mx-auto max-w-4xl px-gutter">

                    {/* Header: Rata Tengah dengan ukuran font setara BerandaFaq */}
                    <div className="space-y-space-xs text-center pb-space-lg">
                         <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                              Pusat Bantuan
                         </span>
                         <h2 className="font-display text-headline-lg font-extrabold tracking-tight text-on-surface">
                              Pertanyaan Seputar Travel Reguler Malang
                         </h2>
                         <p className="mx-auto max-w-2xl font-body-md text-body-sm text-on-surface-variant leading-relaxed md:text-body-md">
                              Temukan jawaban untuk pertanyaan yang paling sering diajukan oleh calon penumpang sebelum melakukan pemesanan tiket.
                         </p>
                    </div>

                    {/* Daftar Kartu FAQ */}
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
                                             aria-controls={`faq-travel-answer-${index}`}
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

                                        {/* Jawaban selalu dirender agar terbaca mesin pencari; yang tertutup memakai atribut hidden */}
                                        <div
                                             id={`faq-travel-answer-${index}`}
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

                    {/* Info Tambahan (Contact Admin) */}
                    <div className="mt-space-lg rounded-2xl border border-surface-container-high/50 bg-surface-container-lowest p-6 text-center shadow-2xs">
                         <p className="font-body-md text-body-md text-on-surface">
                              Masih punya pertanyaan lain? Jangan ragu untuk{" "}
                              {whatsapp && (
                                   <a
                                        href={`https://wa.me/${whatsapp}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-bold text-primary transition-colors hover:text-primary/80 hover:underline"
                                   >
                                        menghubungi Admin kami via WhatsApp
                                   </a>
                              )}
                         </p>
                    </div>

               </div>
          </section>
     );
}