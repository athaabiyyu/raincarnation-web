import type { Metadata } from "next";
import BookingSteps from "@/components/sections/BookingSteps";
import CtaBanner from "@/components/sections/CtaBanner";
import Facilities from "@/components/sections/Facilities";
import FeaturedRoutes from "@/components/sections/FeaturedRoutes";
import TravelHero from "@/components/sections/TravelHero";
import FaqTravel from "@/components/sections/FaqTravel";
import { siteConfig } from "@/config/site";
import { getArmadaList } from "@/lib/wordpress/armada";
import { getSiteConfig } from "@/lib/wordpress/config";
import { getRoutes } from "@/lib/wordpress/routes";
import type { Armada } from "@/types/armada";
import type { Route } from "@/types/route";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import { getRoutePairs } from "@/utils/route-pairs";

export const metadata: Metadata = {
  title: "Travel Reguler Malang Surabaya, Batu & Juanda per Kursi | Raincarnation",
  description:
    "Layanan travel reguler per kursi untuk rute antar titik perkotaan Malang, Batu, Surabaya, Juanda, dan Pandaan. Cek jadwal, tarif, dan pesan via WhatsApp.",
  alternates: {
    canonical: "/travel-reguler",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: siteConfig.name,
    url: "/travel-reguler",
    title: "Travel Reguler Malang Surabaya, Batu & Juanda per Kursi | Raincarnation",
    description:
      "Layanan travel reguler per kursi untuk rute antar titik perkotaan Malang, Batu, Surabaya, Juanda, dan Pandaan. Cek jadwal, tarif, dan pesan via WhatsApp.",
    images: [
      {
        url: "/images/interior-armada.webp",
        alt: "Interior armada Raincarnation yang bersih dan nyaman",
      },
    ],
  },
};

async function loadRoutes(): Promise<Route[]> {
  try {
    return await getRoutes();
  } catch (error) {
    console.error(
      "[TravelRegulerPage] Gagal mengambil rute dari CMS:",
      error
    );
    return [];
  }
}

async function loadArmada(): Promise<Armada[]> {
  try {
    return await getArmadaList();
  } catch (error) {
    console.error(
      "[TravelRegulerPage] Gagal mengambil armada dari CMS:",
      error
    );
    return [];
  }
}

export default async function TravelRegulerPage() {
  const [config, routes, armadaList] = await Promise.all([
    getSiteConfig(),
    loadRoutes(),
    loadArmada(),
  ]);
  const whatsapp = config.contact?.whatsapp ?? "";
  const pairs = getRoutePairs(routes);

  // 1. Structured Data Utama (TransportationService / TravelAgency)
  const travelServiceLd = {
    "@context": "https://schema.org",
    "@type": "TransportationService",
    name: "Travel Reguler Antar Perkotaan - Raincarnation",
    description:
      "Layanan travel reguler per kursi untuk rute antar titik perkotaan Malang, Batu, Surabaya, Juanda, dan Pandaan.",
    url: `${siteConfig.url}/travel-reguler`,
    telephone: whatsapp,
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
      { "@type": "AdministrativeArea", name: "Sidoarjo (Juanda)" },
      { "@type": "AdministrativeArea", name: "Pandaan" },
    ],
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      image: `${siteConfig.url}/images/interior-armada.webp`,
    },
  };

  // 2. Structured Data BreadcrumbList
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
        name: "Travel Reguler",
        item: `${siteConfig.url}/travel-reguler`,
      },
    ],
  };

  // 3. Structured Data ItemList untuk daftar rute
  const routeListItems = routes
    .filter((route) => route.slug)
    .map((route, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: capitalizeFirst(decodeHtml(route.title)),
      url: `${siteConfig.url}/rute/${route.slug}`,
    }));

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Daftar Rute Travel Reguler",
    itemListElement: routeListItems,
  };

  return (
    <main className="w-full bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(travelServiceLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c"),
        }}
      />
      {routeListItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(itemListLd).replace(/</g, "\\u003c"),
          }}
        />
      )}

      {/* Hero & Form Pencarian Menyatu */}
      <TravelHero whatsapp={whatsapp} pairs={pairs} />

      {whatsapp && routes.length > 0 && (
        <FeaturedRoutes
          routes={routes}
          armadaList={armadaList}
          whatsapp={whatsapp}
        />
      )}

      <Facilities />

      <BookingSteps />

      <FaqTravel />

      {whatsapp && <CtaBanner whatsapp={whatsapp} />}
    </main>
  );
}