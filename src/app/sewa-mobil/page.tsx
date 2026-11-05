import type { Metadata } from "next";
import SewaMobilHero from "@/components/sections/SewaMobilHero";
import SewaMobilPackages from "@/components/sections/SewaMobilPackages";
import SewaMobilFleet from "@/components/sections/SewaMobilFleet";
import SewaMobilPillars from "@/components/sections/SewaMobilPillars";
import SewaMobilFaq from "@/components/sections/SewaMobilFaq";
import { siteConfig } from "@/config/site";
import { sewaMobilPackageConfig } from "@/constants/sewa-mobil";
import { getSiteConfig } from "@/lib/wordpress/config";
import { getPaketSewaList } from "@/lib/wordpress/paket-sewa";
import { getArmadaList } from "@/lib/wordpress/armada";
import { getRuteCarterList } from "@/lib/wordpress/rute-carter";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import { lowestPrice, formatRupiah } from "@/utils/price";
import type { PaketSewa } from "@/types/paket-sewa";
import type { Armada } from "@/types/armada";
import type { RuteCarter } from "@/types/rute-carter";

const title = "Sewa Mobil dengan Sopir & Lepas Kunci | Raincarnation";
const description =
     "Sewa mobil dengan sopir atau lepas kunci di Malang, Batu, Surabaya. Admin 24 jam via WhatsApp.";

export const metadata: Metadata = {
     title,
     description,
     alternates: { canonical: "/sewa-mobil" },
     openGraph: {
          type: "website",
          locale: "id_ID",
          siteName: siteConfig.name,
          url: "/sewa-mobil",
          title,
          description,
          images: [
               {
                    url: "/images/og-sewa-mobil.jpg",
                    width: 1200,
                    height: 670,
                    alt: "Armada sewa mobil Raincarnation Indonesia",
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
     const telephone = whatsapp
          ? whatsapp.startsWith("+")
               ? whatsapp
               : `+${whatsapp}`
          : undefined;

     const serviceLd = {
          "@context": "https://schema.org",
          "@type": "TransportationService",
          name: "Sewa Mobil dengan Sopir atau Lepas Kunci - Raincarnation",
          serviceType: "Sewa mobil dengan sopir dan lepas kunci",
          description,
          url: `${siteConfig.url}/sewa-mobil`,
          areaServed: [
               { "@type": "AdministrativeArea", name: "Kota Malang" },
               { "@type": "AdministrativeArea", name: "Kota Batu" },
               { "@type": "AdministrativeArea", name: "Kota Surabaya" },
          ],
          hasOfferCatalog: {
               "@type": "OfferCatalog",
               name: "Layanan Sewa Mobil Raincarnation",
               itemListElement: sewaMobilPackageConfig.packages.map((item) => ({
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: item.name },
               })),
          },
          provider: {
               "@type": "AutoRental",
               "@id": `${siteConfig.url}/#business`,
               name: siteConfig.name,
               image: `${siteConfig.url}/images/og-sewa-mobil.jpg`,
               telephone,
               address: {
                    "@type": "PostalAddress",
                    streetAddress: "Jl. Torongrejo, Torongrejo, Kec. Junrejo",
                    addressLocality: "Kota Batu",
                    addressRegion: "Jawa Timur",
                    postalCode: "65325",
                    addressCountry: "ID",
               },
               location: [
                    {
                         "@type": "Place",
                         name: "Garasi Surabaya",
                         address: {
                              "@type": "PostalAddress",
                              streetAddress:
                                   "Jl. Baruk Barat VIII No.A-103, Kedung Baruk, Kec. Rungkut",
                              addressLocality: "Kota Surabaya",
                              addressRegion: "Jawa Timur",
                              postalCode: "60298",
                              addressCountry: "ID",
                         },
                    },
               ],
               openingHoursSpecification: [
                    {
                         "@type": "OpeningHoursSpecification",
                         dayOfWeek: [
                              "Monday",
                              "Tuesday",
                              "Wednesday",
                              "Thursday",
                              "Friday",
                              "Saturday",
                              "Sunday",
                         ],
                         opens: "05:00",
                         closes: "22:00",
                    },
               ],
               sameAs: [
                    "https://www.instagram.com/raincar_nation.indonesia",
                    "https://www.tiktok.com/@raincar.nation_indonesia",
                    "https://www.threads.com/@raincarnation.indonesia",
               ],
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
          harga: item.acf?.harga,
          hargaAllIn: item.acf?.harga_all_in,
          hargaNonAllIn: item.acf?.harga_non_all_in,
          hargaLepasKunciBulanan: item.acf?.harga_lepas_kunci_bulanan,
          hargaLepasKunciTahunan: item.acf?.harga_lepas_kunci_tahunan,
          tambahanDriver: item.acf?.tambahan_driver,
     }));

     const startingPrices = {
          lepasKunci: formatRupiah(lowestPrice(armada.map((item) => item.acf?.harga))),
          lepasKunciBulanan: formatRupiah(
               lowestPrice(armada.map((item) => item.acf?.harga_lepas_kunci_bulanan)),
          ),
          allIn: formatRupiah(lowestPrice(armada.map((item) => item.acf?.harga_all_in))),
          nonAllIn: formatRupiah(
               lowestPrice(armada.map((item) => item.acf?.harga_non_all_in)),
          ),
     };

     return (
          <main className="w-full bg-surface">
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(serviceLd).replace(/</g, "\\u003c"),
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

               <SewaMobilPackages
                    prices={prices}
                    armada={armada}
                    ruteCarter={ruteCarter}
                    whatsapp={whatsapp}
               />
               <SewaMobilFleet armada={armada} whatsapp={whatsapp} />
               <SewaMobilPillars />
               <SewaMobilFaq startingPrices={startingPrices} />
          </main>
     );
}