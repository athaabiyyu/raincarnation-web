import type { Metadata } from "next";
import ArmadaHero from "@/components/sections/ArmadaHero";
import ArmadaCatalog from "@/components/sections/ArmadaCatalog";
import ArmadaMaintenance from "@/components/sections/ArmadaMaintenance";
import ArmadaAmenities from "@/components/sections/ArmadaAmenities";
import ArmadaCta from "@/components/sections/ArmadaCta";
import { getArmadaList } from "@/lib/wordpress/armada";
import { getSiteConfig } from "@/lib/wordpress/config";
import { siteConfig } from "@/config/site";
import { decodeHtml } from "@/utils/decode-html";
import { capitalizeFirst } from "@/utils/capitalize-first";
import type { Armada } from "@/types/armada";

const title = "Armada Sewa Mobil Malang: Pilih Unit & Harga | Raincarnation";
const description =
     "Lihat pilihan armada sewa mobil Raincarnation di Malang, Batu, dan Surabaya, lengkap dengan harga per layanan. Pilih unit, lalu pesan via WhatsApp.";

export const metadata: Metadata = {
     title,
     description,
     alternates: { canonical: "/armada" },
     openGraph: {
          type: "website",
          locale: "id_ID",
          siteName: siteConfig.name,
          url: "/armada",
          title,
          description,
          images: [
               {
                    url: "/images/interior-armada.webp",
                    alt: "Interior armada Raincarnation",
               },
          ],
     },
};

async function loadArmada(): Promise<Armada[]> {
     try {
          return await getArmadaList();
     } catch (error) {
          console.error("getArmadaList gagal di halaman armada:", error);
          return [];
     }
}

export default async function ArmadaPage() {
     const [config, armada] = await Promise.all([
          getSiteConfig(),
          loadArmada(),
     ]);
     const whatsapp = config.contact?.whatsapp ?? "";

     const itemListJsonLd = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Daftar Armada Raincarnation",
          url: `${siteConfig.url}/armada`,
          numberOfItems: armada.length,
          itemListElement: armada.map((item, index) => ({
               "@type": "ListItem",
               position: index + 1,
               name: capitalizeFirst(decodeHtml(item.title)),
               url: `${siteConfig.url}/sewa-mobil/${item.slug}`,
          })),
     };

     const breadcrumbJsonLd = {
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
                    name: "Armada",
                    item: `${siteConfig.url}/armada`,
               },
          ],
     };

     return (
          <main className="w-full bg-surface">
               {armada.length > 0 && (
                    <script
                         type="application/ld+json"
                         dangerouslySetInnerHTML={{
                              __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c"),
                         }}
                    />
               )}
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
                    }}
               />
               <ArmadaHero whatsapp={whatsapp} />
               <ArmadaCatalog armada={armada} whatsapp={whatsapp} />
               <ArmadaMaintenance />
               <ArmadaAmenities />
               <ArmadaCta whatsapp={whatsapp} />
          </main>
     );
}