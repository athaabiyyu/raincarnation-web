import type { Metadata } from "next";
import BerandaHero from "@/components/sections/BerandaHero";
import BerandaServices from "@/components/sections/BerandaServices";
import BerandaSteps from "@/components/sections/BerandaSteps";
import BerandaWhy from "@/components/sections/BerandaWhy";
import BerandaFaq from "@/components/sections/BerandaFaq";
import ArmadaCatalog from "@/components/sections/ArmadaCatalog";
import CtaBanner from "@/components/sections/CtaBanner";
import FeaturedRoutes from "@/components/sections/FeaturedRoutes";
import RouteSearchForm from "@/components/sections/RouteSearchForm";
import SewaMobilForm from "@/components/sections/SewaMobilForm";
import { slimRoutes } from "@/utils/slim-route";
import { slimRuteCarter } from "@/utils/slim-rute-carter";
import BerandaBookingTabs from "@/components/ui/BerandaBookingTabs";
import { berandaBooking, berandaFaq } from "@/constants/beranda";
import { siteConfig } from "@/config/site";
import { getArmadaList } from "@/lib/wordpress/armada";
import { getSiteConfig } from "@/lib/wordpress/config";
import { getRuteCarterList } from "@/lib/wordpress/rute-carter";
import { getRoutes } from "@/lib/wordpress/routes";
import type { Armada } from "@/types/armada";
import type { Route } from "@/types/route";
import type { SiteConfig } from "@/types/site-config";
import type { RuteCarter } from "@/types/rute-carter";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import { getRoutePairs } from "@/utils/route-pairs";

const title = "Raincarnation: Sewa Mobil & Travel Malang, Batu, Surabaya";
const description =
     "Sewa mobil dengan sopir di Malang, Batu, dan Surabaya; lepas kunci di Malang dan Batu. Travel per kursi antar kota. Pesan lewat admin WhatsApp.";

export const metadata: Metadata = {
     title,
     description,
     alternates: { canonical: "/" },
     openGraph: {
          type: "website",
          locale: "id_ID",
          siteName: siteConfig.name,
          url: "/",
          title,
          description,
          images: [
               {
                    url: "/images/og-sewa-mobil.jpg",
                    width: 1200,
                    height: 670,
                    type: "image/jpeg",
                    alt: "Raincarnation Indonesia - sewa mobil dan travel di Malang, Batu, dan Surabaya",
               },
          ],
     },
};

function buildAutoRentalJsonLd(config: SiteConfig) {
     const { contact, address, social } = config;
     const latitude = Number(address?.latitude);
     const longitude = Number(address?.longitude);
     const hasGeo =
          Boolean(address?.latitude) &&
          Boolean(address?.longitude) &&
          Number.isFinite(latitude) &&
          Number.isFinite(longitude);
     const sameAs = [
          social?.instagram,
          social?.tiktok,
          social?.facebook,
          social?.youtube,
          "https://www.threads.com/@raincarnation.indonesia",
     ].filter(Boolean);

     return {
          "@context": "https://schema.org",
          "@type": "AutoRental",
          "@id": `${siteConfig.url}/#business`,
          name: siteConfig.name,
          url: siteConfig.url,
          logo: `${siteConfig.url}/logo.webp`,
          image: `${siteConfig.url}/images/og-sewa-mobil.jpg`,
          description,
          ...(contact?.whatsapp ? { telephone: `+${contact.whatsapp}` } : {}),
          address: {
               "@type": "PostalAddress",
               ...(address?.full ? { streetAddress: address.full } : {}),
               addressLocality: address?.city || "Batu",
               addressRegion: address?.province || "Jawa Timur",
               ...(address?.postal_code ? { postalCode: address.postal_code } : {}),
               addressCountry: "ID",
          },
          ...(hasGeo
               ? {
                    geo: {
                         "@type": "GeoCoordinates",
                         latitude,
                         longitude,
                    },
               }
               : {}),
          ...(sameAs.length > 0 ? { sameAs } : {}),
          openingHoursSpecification: {
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
          department: {
               "@type": "AutoRental",
               name: `${siteConfig.name} - Garasi Surabaya`,
               address: {
                    "@type": "PostalAddress",
                    streetAddress:
                         "Jl. Baruk Barat VIII No.A-103, Kedung Baruk, Kec. Rungkut",
                    addressLocality: "Kota Surabaya",
                    addressRegion: "Jawa Timur",
                    postalCode: "60298",
                    addressCountry: "ID",
               },
               geo: {
                    "@type": "GeoCoordinates",
                    latitude: -7.319755451312836,
                    longitude: 112.77812394232852,
               },
               openingHoursSpecification: {
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
          },
          areaServed: [
               { "@type": "AdministrativeArea", name: "Kota Malang" },
               { "@type": "AdministrativeArea", name: "Kota Batu" },
               { "@type": "AdministrativeArea", name: "Kota Surabaya" },
               { "@type": "Place", name: "Bandara Juanda" },
          ],
     };
}

const webSiteJsonLd = {
     "@context": "https://schema.org",
     "@type": "WebSite",
     "@id": `${siteConfig.url}/#website`,
     name: siteConfig.name,
     alternateName: "Raincarnation Indonesia",
     url: siteConfig.url,
     publisher: { "@id": `${siteConfig.url}/#business` },
};

const faqJsonLd = {
     "@context": "https://schema.org",
     "@type": "FAQPage",
     mainEntity: berandaFaq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
               "@type": "Answer",
               text: item.answer,
          },
     })),
};

async function loadRoutes(): Promise<Route[]> {
     try {
          return await getRoutes();
     } catch (error) {
          console.error("getRoutes gagal di Beranda:", error);
          return [];
     }
}

async function loadArmada(): Promise<Armada[]> {
     try {
          return await getArmadaList();
     } catch (error) {
          console.error("getArmadaList gagal di Beranda:", error);
          return [];
     }
}

async function loadRuteCarter(): Promise<RuteCarter[]> {
     try {
          return await getRuteCarterList();
     } catch (error) {
          console.error("getRuteCarterList gagal di Beranda:", error);
          return [];
     }
}

export default async function HomePage() {
     const [config, routes, armada, ruteCarter] = await Promise.all([
          getSiteConfig(),
          loadRoutes(),
          loadArmada(),
          loadRuteCarter(),
     ]);
     const whatsapp = config.contact?.whatsapp ?? "";
     const autoRentalJsonLd = buildAutoRentalJsonLd(config);
     const pairs = getRoutePairs(routes);

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

     const hasReguler = Boolean(whatsapp) && pairs.length > 0;
     const hasCarter =
          Boolean(whatsapp) &&
          (ruteCarter.length > 0 ||
               fleet.some(
                    (item) => item.harga || item.hargaAllIn || item.hargaNonAllIn,
               ));

     const regulerForm = (
          <RouteSearchForm
               pairs={pairs}
               whatsapp={whatsapp}
               headingLevel="h2"
               bare
          />
     );
     const carterForm = (
          <SewaMobilForm
               routes={slimRuteCarter(ruteCarter)}
               fleet={fleet}
               whatsapp={whatsapp}
               embedded
               bare
               headingLevel="h2"
          />
     );

     return (
          <main className="w-full bg-surface">
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(autoRentalJsonLd).replace(/</g, "\\u003c"),
                    }}
               />
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(webSiteJsonLd).replace(/</g, "\\u003c"),
                    }}
               />
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
                    }}
               />

               <BerandaHero unitCount={armada.length} />

               {(hasReguler || hasCarter) && (
                    <section className="w-full pb-space-xl">
                         <div className="mx-auto max-w-6xl px-gutter">
                              {hasReguler && hasCarter ? (
                                   <BerandaBookingTabs
                                        regulerLabel={berandaBooking.regulerTab}
                                        carterLabel={berandaBooking.carterTab}
                                        regulerPanel={regulerForm}
                                        carterPanel={carterForm}
                                   />
                              ) : hasReguler ? (
                                   regulerForm
                              ) : (
                                   carterForm
                              )}
                         </div>
                    </section>
               )}

               <BerandaServices />

               <ArmadaCatalog
                    armada={armada}
                    whatsapp={whatsapp}
                    variant="home"
                    seeAllHref="/armada"
               />


               {whatsapp && routes.length > 0 && (
                    <FeaturedRoutes
                         routes={slimRoutes(routes)}
                         whatsapp={whatsapp}
                         onlyFeatured
                         seeAllHref="/travel"
                    />
               )}

               <BerandaSteps />

               <BerandaWhy whatsapp={whatsapp} />
               <BerandaFaq />
               {whatsapp && <CtaBanner whatsapp={whatsapp} />}
          </main>
     );
}