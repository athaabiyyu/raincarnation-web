import type { Metadata } from "next";
import SewaMobilHero from "@/components/sections/SewaMobilHero";
import SewaMobilPackages from "@/components/sections/SewaMobilPackages";
import { getSiteConfig } from "@/lib/wordpress/config";
import { getPaketSewaList } from "@/lib/wordpress/paket-sewa";
import type { PaketSewa } from "@/types/paket-sewa";

export const metadata: Metadata = {
     title: "Sewa Mobil Carter dengan Driver | Raincarnation",
     description:
          "Sewa mobil carter dengan driver, satu mobil khusus rombongan Anda. Sudah termasuk mobil, sopir, dan BBM. Pesan lewat WhatsApp.",
     alternates: { canonical: "/sewa-mobil" },
};

async function loadPrices(): Promise<PaketSewa[]> {
     try {
          return await getPaketSewaList();
     } catch (error) {
          console.error("Gagal memuat paket sewa:", error);
          return [];
     }
}

export default async function SewaMobilPage() {
     const [config, prices] = await Promise.all([getSiteConfig(), loadPrices()]);
     const whatsapp = config.contact?.whatsapp ?? "";

     return (
          <main className="w-full bg-surface">
               <SewaMobilHero whatsapp={whatsapp} />
               <SewaMobilPackages prices={prices} whatsapp={whatsapp} />
          </main>
     );
}