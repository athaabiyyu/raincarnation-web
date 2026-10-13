import type { Metadata } from "next";
import SewaMobilHero from "@/components/sections/SewaMobilHero";
import SewaMobilPackages from "@/components/sections/SewaMobilPackages";
import SewaMobilFleet from "@/components/sections/SewaMobilFleet";
import SewaMobilPillars from "@/components/sections/SewaMobilPillars";
import SewaMobilFaq from "@/components/sections/SewaMobilFaq";
import { siteConfig } from "@/config/site";
import { getSiteConfig } from "@/lib/wordpress/config";
import { getPaketSewaList } from "@/lib/wordpress/paket-sewa";
import { getArmadaList } from "@/lib/wordpress/armada";
import { getRuteCarterList } from "@/lib/wordpress/rute-carter";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import type { PaketSewa } from "@/types/paket-sewa";
import type { Armada } from "@/types/armada";
import type { RuteCarter } from "@/types/rute-carter";

export const metadata: Metadata = {
     title: "Sewa Mobil Malang dengan Sopir atau Lepas Kunci | Raincarnation",
     description:
          "Sewa mobil Malang, Batu, dan Surabaya dengan sopir atau lepas kunci, durasi sewa 12 jam. Tarif menyesuaikan komponen biaya seperti BBM dan parkir. Tanyakan rinciannya lewat WhatsApp.",
     alternates: { canonical: "/sewa-mobil" },
     openGraph: {
          type: "website",
          locale: "id_ID",
          siteName: siteConfig.name,
          url: "/sewa-mobil",
          title: "Sewa Mobil Malang dengan Sopir atau Lepas Kunci | Raincarnation",
          description:
               "Sewa mobil Malang, Batu, dan Surabaya dengan sopir atau lepas kunci, durasi sewa 12 jam. Tarif menyesuaikan komponen biaya seperti BBM dan parkir. Tanyakan rinciannya lewat WhatsApp.",
          images: [
               {
                    url: "/images/interior-armada.webp",
                    alt: "Interior armada Raincarnation yang bersih dan nyaman",
               },
          ],
     },
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

async function loadRuteCarter(): Promise<RuteCarter[]> {
     try {
          return await getRuteCarterList();
     } catch (error) {
          console.error("Gagal memuat rute carter:", error);
          return [];
     }
}

export default async function SewaMobilPage() {
     const [config, prices, armada, ruteCarter] = await Promise.all([
          getSiteConfig(),
          loadPrices(),
          loadArmada(),
          loadRuteCarter(),
     ]);
     const whatsapp = config.contact?.whatsapp ?? "";

     const autoRentalLd = {
          "@context": "https://schema.org",
          "@type": "AutoRental",
          name: "Sewa Mobil Malang dengan Sopir atau Lepas Kunci - Raincarnation",
          description:
               "Layanan sewa mobil Malang, Batu, dan Surabaya dengan sopir atau lepas kunci, durasi 12 jam. Layanan carter drop privat tanpa penumpang campuran.",
          url: `${siteConfig.url}/sewa-mobil`,
          telephone: whatsapp,
          priceRange: "Rp 150.000 - Rp 3.500.000",
          address: {
               "@type": "PostalAddress",
               addressLocality: "Malang",
               addressRegion: "Jawa Timur",
               addressCountry: "ID",
          },
          areaServed: [
               { "@type": "AdministrativeArea", name: "Kota Malang" },
               { "@type": "AdministrativeArea", name: "Kabupaten Malang" },
               { "@type": "AdministrativeArea", name: "Kota Batu" },
               { "@type": "AdministrativeArea", name: "Kota Surabaya" },
          ],
          provider: {
               "@type": "LocalBusiness",
               name: siteConfig.name,
               image: `${siteConfig.url}/images/interior-armada.webp`,
          },
     };

     const breadcrumbLd = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
               {
                    "@type": "ListItem",
                    position: 1,
                    name: "Beranda",
                    item: siteConfig.url,
               },
               {
                    "@type": "ListItem",
                    position: 2,
                    name: "Sewa Mobil",
                    item: `${siteConfig.url}/sewa-mobil`,
               },
          ],
     };

     const fleet = armada.map((item) => ({
          id: item.id,
          name: capitalizeFirst(decodeHtml(item.title)),
     }));

     return (
          <main className="w-full bg-surface">
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(autoRentalLd).replace(/</g, "\\u003c"),
                    }}
               />
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c"),
                    }}
               />

               <SewaMobilHero
                    whatsapp={whatsapp}
                    routes={ruteCarter}
                    fleet={fleet}
               />

               <SewaMobilPackages prices={prices} whatsapp={whatsapp} />
               <SewaMobilFleet armada={armada} whatsapp={whatsapp} />
               <SewaMobilPillars />
               <SewaMobilFaq />
          </main>
     );
}