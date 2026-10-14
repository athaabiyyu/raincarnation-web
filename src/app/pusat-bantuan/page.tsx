import type { Metadata } from "next";
import Link from "next/link";
import { getSiteConfig } from "@/lib/wordpress/config";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

const title = "Pusat Bantuan | Raincarnation";
const description =
     "Pusat bantuan Raincarnation untuk pertanyaan seputar sewa mobil dan travel reguler.";

export const metadata: Metadata = {
     title,
     description,
     alternates: { canonical: "/pusat-bantuan" },
     // SEMENTARA: hapus baris robots ini saat halaman sudah berisi konten lengkap.
     robots: { index: false, follow: true },
};

export default async function PusatBantuanPage() {
     const config = await getSiteConfig();
     const whatsapp = config.contact?.whatsapp ?? "";

     return (
          <main className="w-full bg-surface py-space-xl">
               <div className="mx-auto max-w-6xl space-y-space-md px-gutter">
                    <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
                         Pusat Bantuan
                    </h1>
                    <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant">
                         Ada pertanyaan seputar sewa mobil atau travel reguler? Hubungi
                         admin kami melalui WhatsApp untuk informasi tarif, jadwal
                         keberangkatan, dan ketersediaan layanan. Halaman ini sedang kami
                         lengkapi.
                    </p>
                    <div className="flex flex-wrap gap-space-sm">
                         {whatsapp ? (
                              <a
                                   href={buildWhatsAppUrl(
                                        whatsapp,
                                        "Halo Admin Raincarnation, saya butuh bantuan.",
                                   )}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="inline-flex items-center rounded-lg bg-whatsapp px-space-md py-space-sm font-label-md text-label-md text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all hover:bg-whatsapp-hover active:scale-95"
                              >
                                   Hubungi Admin via WhatsApp
                              </a>
                         ) : null}
                         <Link
                              href="/"
                              className="inline-flex items-center rounded-lg bg-primary px-space-md py-space-sm font-label-md text-label-md text-on-primary shadow-sm transition-all hover:bg-on-primary-fixed-variant active:scale-95"
                         >
                              Kembali ke Beranda
                         </Link>
                    </div>
               </div>
          </main>
     );
}