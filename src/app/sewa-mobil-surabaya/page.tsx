import type { Metadata } from "next";
import SewaMobilCityHero from "@/components/sections/SewaMobilCityHero";
import SewaMobilCityInfo, {
     type CityInfoBlock,
} from "@/components/sections/SewaMobilCityInfo";
import SewaMobilFleet from "@/components/sections/SewaMobilFleet";
import SewaMobilFaq, { type FaqItem } from "@/components/sections/SewaMobilFaq";
import { siteConfig } from "@/config/site";
import { getSiteConfig } from "@/lib/wordpress/config";
import { getArmadaList } from "@/lib/wordpress/armada";
import { lowestPrice, formatRupiah } from "@/utils/price";
import type { Armada } from "@/types/armada";

const title = "Sewa Mobil Surabaya dengan Sopir, Harian | Raincarnation";
const description =
     "Sewa mobil Surabaya dengan sopir, All In atau Non All In, harian. Diantar ke alamat atau diambil di Garasi Rungkut. Admin 24 jam via WhatsApp.";

export const metadata: Metadata = {
     title,
     description,
     alternates: { canonical: "/sewa-mobil-surabaya" },
     openGraph: {
          type: "website",
          locale: "id_ID",
          siteName: siteConfig.name,
          url: "/sewa-mobil-surabaya",
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
          console.error("Gagal memuat armada:", error);
          return [];
     }
}

function price(values: Array<string | undefined>): string {
     const lowest = lowestPrice(values);
     if (lowest === null || lowest <= 0) return "";
     return formatRupiah(lowest) ?? "";
}

function buildFaqs(armada: Armada[]): FaqItem[] {
     const allIn = price(armada.map((item) => item.acf?.harga_all_in));
     const nonAllIn = price(armada.map((item) => item.acf?.harga_non_all_in));

     const dayParts: string[] = [];
     if (allIn) dayParts.push(`All In per hari mulai ${allIn}.`);
     if (nonAllIn) dayParts.push(`Non All In per hari mulai ${nonAllIn}.`);
     dayParts.push(
          "Harga tergantung unit. Tanyakan tarif terbaru ke admin lewat WhatsApp.",
     );

     return [
          {
               question: "Sewa mobil Surabaya 1 hari berapa?",
               answer: dayParts.join(" "),
          },
          {
               question: "Sewa mobil dengan sopir berapa?",
               answer:
                    "Sopir sudah termasuk di All In dan Non All In. " +
                    dayParts.join(" "),
          },
          {
               question: "Apa beda All In dan Non All In?",
               answer:
                    "All In sudah termasuk unit, BBM, sopir, makan sopir, tol, dan parkir. Non All In hanya unit, BBM, dan sopir.",
          },
          {
               question: "Apakah mobil bisa diantar?",
               answer:
                    "Bisa, atau diambil di Garasi Rungkut. Biaya antar dikonfirmasi admin lewat WhatsApp.",
          },
          {
               question: "Apakah ada Lepas Kunci di Surabaya?",
               answer:
                    "Belum. Lepas Kunci tersedia di Malang dan Batu. Lihat halaman Sewa Mobil Malang & Batu untuk detailnya.",
          },
     ];
}

const serviceBlocks: CityInfoBlock[] = [
     {
          heading: "All In atau Non All In: Apa Bedanya?",
          items: [
               {
                    title: "All In",
                    text: "Harga per hari. Termasuk unit, BBM, sopir, makan sopir, tol, dan parkir.",
               },
               {
                    title: "Non All In",
                    text: "Harga per hari. Termasuk unit, BBM, dan sopir.",
               },
          ],
          paragraphs: [
               "Pada Non All In, tol dan parkir tidak termasuk dalam harga.",
          ],
     },
];

const detailBlocks: CityInfoBlock[] = [
     {
          heading: "Sewa Mobil Surabaya ke Malang",
          paragraphs: [
               "Perjalanan dari Surabaya ke Malang atau kota lain bisa memakai pilihan rute custom pada All In dan Non All In. Rute bebas, dan admin akan mengonfirmasi tarif serta ketersediaan unit via WhatsApp.",
          ],
          link: {
               before: "Untuk kursi per orang, lihat",
               label: "Travel Surabaya Malang",
               href: "/travel/surabaya-malang",
          },
     },
     {
          heading: "Diantar ke Alamat atau Ambil di Garasi Rungkut",
          paragraphs: [
               "Unit bisa diantar ke alamat pelanggan di area layanan, atau diambil langsung di Garasi Surabaya, Jl. Baruk Barat VIII No.A-103, Kedung Baruk, Rungkut. Biaya antar dikonfirmasi admin lewat WhatsApp.",
          ],
          link: {
               before: "Butuh lepas kunci?",
               label: "Lihat layanan di Malang & Batu",
               href: "/sewa-mobil-malang",
          },
     },
];

export default async function SewaMobilSurabayaPage() {
     const [config, armada] = await Promise.all([
          getSiteConfig(),
          loadArmada(),
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
          name: "Sewa Mobil Surabaya dengan Sopir - Raincarnation",
          serviceType: "Sewa mobil dengan sopir",
          description,
          url: `${siteConfig.url}/sewa-mobil-surabaya`,
          areaServed: [{ "@type": "AdministrativeArea", name: "Kota Surabaya" }],
          hasOfferCatalog: {
               "@type": "OfferCatalog",
               name: "Layanan Sewa Mobil Surabaya",
               itemListElement: [
                    {
                         "@type": "Offer",
                         itemOffered: { "@type": "Service", name: "Sewa Mobil All In" },
                    },
                    {
                         "@type": "Offer",
                         itemOffered: {
                              "@type": "Service",
                              name: "Sewa Mobil Non All In",
                         },
                    },
               ],
          },
          provider: {
               "@type": "LocalBusiness",
               "@id": `${siteConfig.url}/#business`,
               name: siteConfig.name,
               image: `${siteConfig.url}/images/interior-armada.webp`,
               telephone,
               address: {
                    "@type": "PostalAddress",
                    addressLocality: "Batu",
                    addressRegion: "Jawa Timur",
                    addressCountry: "ID",
               },
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
               {
                    "@type": "ListItem",
                    position: 3,
                    name: "Sewa Mobil Surabaya",
                    item: `${siteConfig.url}/sewa-mobil-surabaya`,
               },
          ],
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

               <SewaMobilCityHero
                    badge="RENTAL MOBIL TERPERCAYA DI SURABAYA"
                    titleStart="Sewa Mobil Surabaya"
                    titleHighlight="dengan Sopir"
                    intro="Raincarnation melayani sewa mobil dengan sopir di Surabaya, harian, dengan pilihan All In atau Non All In. Garasi kami ada di Rungkut, Kota Surabaya. Unit matic tersedia, dan setiap unit dicek sebelum berangkat. Admin bisa dihubungi 24 jam lewat WhatsApp."
                    whatsapp={whatsapp}
                    whatsappMessage="Halo Admin Raincarnation, saya ingin tanya sewa mobil di Surabaya."
                    fleetAnchorId="#pilihan-armada"
               />

               <SewaMobilCityInfo blocks={serviceBlocks} tone="low" />
               <SewaMobilFleet
                    armada={armada}
                    whatsapp={whatsapp}
                    title="Pilihan Unit Sewa Mobil Surabaya"
                    description="Pilih unit sesuai jumlah penumpang dan bagasi, dengan sopir. Tanyakan ketersediaan dan tarifnya lewat WhatsApp."
               />
               <SewaMobilCityInfo blocks={detailBlocks} tone="low" />

               <SewaMobilFaq
                    items={buildFaqs(armada)}
                    heading="Pertanyaan Seputar Sewa Mobil Surabaya"
                    intro="Jawaban singkat seputar harga, perbedaan paket, dan pengantaran sewa mobil di Surabaya."
               />
          </main>
     );
}