import type { Metadata } from "next";
import BerandaHero from "@/components/sections/BerandaHero";
import BerandaTrust from "@/components/sections/BerandaTrust";
import BerandaServices from "@/components/sections/BerandaServices";
import BerandaWhy from "@/components/sections/BerandaWhy";
import BerandaFaq from "@/components/sections/BerandaFaq";
import ArmadaCatalog from "@/components/sections/ArmadaCatalog";
import CtaBanner from "@/components/sections/CtaBanner";
import FeaturedRoutes from "@/components/sections/FeaturedRoutes";
import RouteSearchForm from "@/components/sections/RouteSearchForm";
import SewaMobilForm from "@/components/sections/SewaMobilForm";
import BerandaBookingTabs from "@/components/ui/BerandaBookingTabs";
import { berandaBooking, berandaFaq } from "@/constants/beranda";
import { siteConfig } from "@/config/site";
import { getArmadaList } from "@/lib/wordpress/armada";
import { getSiteConfig } from "@/lib/wordpress/config";
import { getRuteCarterList } from "@/lib/wordpress/rute-carter";
import { getRoutes } from "@/lib/wordpress/routes";
import type { Armada } from "@/types/armada";
import type { Route } from "@/types/route";
import type { RuteCarter } from "@/types/rute-carter";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import { getRoutePairs } from "@/utils/route-pairs";

const title = "Sewa Mobil Malang, Batu & Surabaya Murah | Raincarnation";
const description =
     "Sewa mobil di Malang, Batu, dan Surabaya (termasuk Bandara Juanda) plus driver atau lepas kunci. Pilihan armada lengkap & terawat. Hubungi kami via WhatsApp!";

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
                    url: "/images/interior-armada.webp",
                    alt: "Interior bersih dan nyaman armada sewa mobil Malang Raincarnation",
               },
          ],
     },
};

const autoRentalJsonLd = {
     "@context": "https://schema.org",
     "@type": "AutoRental",
     name: siteConfig.name,
     url: siteConfig.url,
     logo: `${siteConfig.url}/logo.webp`,
     image: `${siteConfig.url}/images/interior-armada.webp`,
     description,
     priceRange: "$$",
     address: {
          "@type": "PostalAddress",
          addressLocality: "Malang",
          addressRegion: "Jawa Timur",
          addressCountry: "ID",
     },
     areaServed: [
          {
               "@type": "AdministrativeArea",
               name: "Malang",
          },
          {
               "@type": "AdministrativeArea",
               name: "Batu",
          },
          {
               "@type": "AdministrativeArea",
               name: "Surabaya",
          },
          {
               "@type": "Place",
               name: "Bandara Juanda",
          },
     ],
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
          opens: "00:00",
          closes: "23:59",
     },
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
     const pairs = getRoutePairs(routes);

     const fleet = armada.map((item) => ({
          id: item.id,
          name: capitalizeFirst(decodeHtml(item.title)),
     }));

     const hasReguler = Boolean(whatsapp) && pairs.length > 0;
     const hasCarter = Boolean(whatsapp) && ruteCarter.length > 0;

     const regulerForm = (
          <RouteSearchForm
               pairs={pairs}
               whatsapp={whatsapp}
               headingLevel="h2"
          />
     );
     const carterForm = (
          <SewaMobilForm
               routes={ruteCarter}
               fleet={fleet}
               whatsapp={whatsapp}
               embedded
               headingLevel="h2"
          />
     );

     return (
          <main className="w-full bg-surface">
               {/* Preload Gambar LCP Hero agar terdeteksi instan oleh browser */}
               <link
                    rel="preload"
                    href="/images/interior-armada.webp"
                    as="image"
                    type="image/webp"
               />

               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(autoRentalJsonLd).replace(/</g, "\\u003c"),
                    }}
               />
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
                    }}
               />

               <BerandaHero />

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

               <BerandaTrust />
               <BerandaServices />

               {whatsapp && routes.length > 0 && (
                    <FeaturedRoutes
                         routes={routes}
                         armadaList={armada}
                         whatsapp={whatsapp}
                         onlyFeatured
                         seeAllHref="/travel-reguler"
                    />
               )}

               <ArmadaCatalog
                    armada={armada}
                    whatsapp={whatsapp}
                    variant="home"
                    seeAllHref="/armada"
               />

               <BerandaWhy whatsapp={whatsapp} />
               <BerandaFaq />
               {whatsapp && <CtaBanner whatsapp={whatsapp} />}
          </main>
     );
}