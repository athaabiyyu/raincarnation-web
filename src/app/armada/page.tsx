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

const title = "Daftar Armada Travel & Sewa Mobil | Raincarnation";
const description =
     "Lihat daftar armada Raincarnation untuk travel dan sewa mobil, lengkap dengan kapasitas kursi dan bagasi. Tanyakan tarif dan ketersediaan lewat WhatsApp.";

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
          })),
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
               <ArmadaHero whatsapp={whatsapp} />
               <ArmadaCatalog armada={armada} whatsapp={whatsapp} />
               <ArmadaMaintenance />
               <ArmadaAmenities />
               <ArmadaCta whatsapp={whatsapp} />
          </main>
     );
}