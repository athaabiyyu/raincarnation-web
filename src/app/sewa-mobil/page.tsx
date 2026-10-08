import type { Metadata } from "next";
import SewaMobilHero from "@/components/sections/SewaMobilHero";
import SewaMobilPackages from "@/components/sections/SewaMobilPackages";
import SewaMobilFleet from "@/components/sections/SewaMobilFleet";
import SewaMobilPillars from "@/components/sections/SewaMobilPillars";
import SewaMobilForm from "@/components/sections/SewaMobilForm";
import { siteConfig } from "@/config/site";
import { getSiteConfig } from "@/lib/wordpress/config";
import { getPaketSewaList } from "@/lib/wordpress/paket-sewa";
import { getArmadaList } from "@/lib/wordpress/armada";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import type { PaketSewa } from "@/types/paket-sewa";
import type { Armada } from "@/types/armada";

export const metadata: Metadata = {
     title: "Sewa Mobil Carter dengan Driver | Raincarnation",
     description:
          "Sewa mobil carter dengan driver, satu mobil khusus rombongan Anda. Sudah termasuk mobil, sopir, dan BBM. Pesan lewat WhatsApp.",
     alternates: { canonical: "/sewa-mobil" },
};

// Data terstruktur untuk Google. Sengaja tanpa provider, rating, alamat,
// telepon, dan harga sampai bos mengonfirmasi data aslinya.
const jsonLd = {
     "@context": "https://schema.org",
     "@type": "Service",
     name: "Sewa Mobil Carter dengan Driver",
     serviceType: "Sewa mobil carter dengan driver",
     areaServed: ["Malang", "Surabaya", "Pasuruan"],
     url: `${siteConfig.url}/sewa-mobil`,
};

async function loadPrices(): Promise<PaketSewa[]> {
     try {
          return await getPaketSewaList();
     } catch (error) {
          console.error("Gagal memuat paket sewa:", error);
          return [];
     }
}

async function loadArmada(): Promise<Armada[]> {
     try {
          return await getArmadaList();
     } catch (error) {
          console.error("Gagal memuat armada:", error);
          return [];
     }
}

export default async function SewaMobilPage() {
     const [config, prices, armada] = await Promise.all([
          getSiteConfig(),
          loadPrices(),
          loadArmada(),
     ]);
     const whatsapp = config.contact?.whatsapp ?? "";

     const packageOptions = prices.map((item) =>
          capitalizeFirst(decodeHtml(item.title)),
     );
     const fleetOptions = armada.map((item) =>
          capitalizeFirst(decodeHtml(item.title)),
     );

     return (
          <main className="w-full bg-surface">
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                    }}
               />
               <SewaMobilHero whatsapp={whatsapp} />
               <SewaMobilPackages prices={prices} whatsapp={whatsapp} />
               <SewaMobilFleet armada={armada} whatsapp={whatsapp} />
               <SewaMobilPillars />
               <SewaMobilForm
                    packageOptions={packageOptions}
                    fleetOptions={fleetOptions}
                    whatsapp={whatsapp}
               />
          </main>
     );
}