import type { Metadata } from "next";
import BookingSteps from "@/components/sections/BookingSteps";
import CtaBanner from "@/components/sections/CtaBanner";
import Facilities from "@/components/sections/Facilities";
import FeaturedRoutes from "@/components/sections/FeaturedRoutes";
import { slimRoutes } from "@/utils/slim-route";
import TravelHero from "@/components/sections/TravelHero";
import FaqTravel from "@/components/sections/FaqTravel";
import { siteConfig } from "@/config/site";
import { getSiteConfig } from "@/lib/wordpress/config";
import { getRoutes } from "@/lib/wordpress/routes";
import type { Route } from "@/types/route";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import { getRoutePairs } from "@/utils/route-pairs";

const title = "Travel Malang Door to Door: Jadwal & Tarif | Raincarnation";
const description =
  "Travel per kursi Malang, Batu, Surabaya, Juanda & Pandaan, door to door 24 jam. Tarif mulai Rp100.000, sudah termasuk tol dan parkir. Pesan via WA.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/travel",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: siteConfig.name,
    url: "/travel",
    title,
    description,
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

export default async function TravelRegulerPage() {
  const [config, routes] = await Promise.all([
    getSiteConfig(),
    loadRoutes(),
  ]);
  const whatsapp = config.contact?.whatsapp ?? "";
  const pairs = getRoutePairs(routes);

  // 1. Structured Data Utama (TransportationService / TravelAgency)
  const travelServiceLd = {
    "@context": "https://schema.org",
    "@type": "TransportationService",
    name: "Travel Malang Door to Door - Raincarnation",
    description,
    url: `${siteConfig.url}/travel`,
    telephone: whatsapp ? `+${whatsapp}` : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Batu",
      addressRegion: "Jawa Timur",
      addressCountry: "ID",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Kota Malang" },
      { "@type": "AdministrativeArea", name: "Kota Batu" },
      { "@type": "AdministrativeArea", name: "Kota Surabaya" },
      { "@type": "AdministrativeArea", name: "Pandaan, Pasuruan" },
      { "@type": "Place", name: "Bandara Juanda, Sidoarjo" },
    ],
    provider: {
      "@type": "LocalBusiness",
      "@id": `${siteConfig.url}/#business`,
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
        name: "Travel",
        item: `${siteConfig.url}/travel`,
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
      url: `${siteConfig.url}/travel/${route.slug}`,
    }));

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Daftar Rute Travel",
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
          routes={slimRoutes(routes)}
          whatsapp={whatsapp}
        />
      )}

      <Facilities />

      <BookingSteps />

      <FaqTravel whatsapp={whatsapp} />

      {whatsapp && <CtaBanner whatsapp={whatsapp} />}
    </main>
  );
}