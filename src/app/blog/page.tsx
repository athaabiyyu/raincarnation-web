import type { Metadata } from "next";
import Link from "next/link";

const title = "Blog | Raincarnation";
const description =
     "Blog Raincarnation: info rute, tips perjalanan, dan berita seputar sewa mobil dan travel reguler.";

export const metadata: Metadata = {
     title,
     description,
     alternates: { canonical: "/blog" },
     // SEMENTARA: hapus baris robots ini saat blog sudah berisi artikel.
     robots: { index: false, follow: true },
};

export default function BlogPage() {
     return (
          <main className="w-full bg-surface py-space-xl">
               <div className="mx-auto max-w-6xl space-y-space-md px-gutter">
                    <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
                         Blog
                    </h1>
                    <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant">
                         Info rute, tips perjalanan, dan berita dari Raincarnation akan
                         hadir di sini. Halaman ini sedang kami lengkapi.
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