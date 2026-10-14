import type { Metadata } from "next";
import Link from "next/link";

const title = "Tentang Kami | Raincarnation";
const description =
     "Tentang Raincarnation, layanan sewa mobil dan travel reguler di Malang, Batu, dan Surabaya.";

export const metadata: Metadata = {
     title,
     description,
     alternates: { canonical: "/tentang-kami" },
     // SEMENTARA: hapus baris robots ini saat halaman sudah berisi konten lengkap.
     robots: { index: false, follow: true },
};

export default function TentangKamiPage() {
     return (
          <main className="w-full bg-surface py-space-xl">
               <div className="mx-auto max-w-6xl space-y-space-md px-gutter">
                    <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
                         Tentang Kami
                    </h1>
                    <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant">
                         Raincarnation menyediakan layanan sewa mobil dengan sopir atau
                         lepas kunci di Malang, Batu, dan Surabaya, serta travel reguler
                         per kursi untuk rute tertentu. Halaman ini sedang kami lengkapi.
                    </p>
                    <Link
                         href="/"
                         className="inline-flex items-center rounded-lg bg-primary px-space-md py-space-sm font-label-md text-label-md text-on-primary shadow-sm transition-all hover:bg-on-primary-fixed-variant active:scale-95"
                    >
                         Kembali ke Beranda
                    </Link>
               </div>
          </main>
     );
}