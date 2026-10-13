import type { Metadata } from "next";
import Link from "next/link";
import BookingSteps from "@/components/sections/BookingSteps";
import CtaBanner from "@/components/sections/CtaBanner";
import Facilities from "@/components/sections/Facilities";
import FeaturedRoutes from "@/components/sections/FeaturedRoutes";
import RouteSearchForm from "@/components/sections/RouteSearchForm";
import TravelHero from "@/components/sections/TravelHero";
import { heroContent } from "@/constants/travel-reguler";
import { getArmadaList } from "@/lib/wordpress/armada";
import { getSiteConfig } from "@/lib/wordpress/config";
import { getRoutes } from "@/lib/wordpress/routes";
import type { Armada } from "@/types/armada";
import type { Route } from "@/types/route";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import { getRoutePairs } from "@/utils/route-pairs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
     title: "Travel Malang Surabaya per Kursi, Jadwal & Tarif | Raincarnation",
     description:
          "Travel reguler per kursi untuk rute antara Malang, Batu, Surabaya, Juanda, dan Pandaan. Cek jadwal dan tarif per rute, lalu pesan lewat WhatsApp.",
     alternates: {
          canonical: "/travel-reguler",
     },
     openGraph: {
          type: "website",
          locale: "id_ID",
          siteName: siteConfig.name,
          url: "/travel-reguler",
          title: "Travel Malang Surabaya per Kursi, Jadwal & Tarif | Raincarnation",
          description:
               "Travel reguler per kursi untuk rute antara Malang, Batu, Surabaya, Juanda, dan Pandaan. Cek jadwal dan tarif per rute, lalu pesan lewat WhatsApp.",
          images: [
               {
                    url: "/images/interior-armada.webp",
                    alt: "Interior armada Raincarnation yang bersih dan nyaman",
               },
          ],
     },
};

const jsonLd = {
     "@context": "https://schema.org",
     "@type": "Service",
     name: "Travel Reguler per Kursi",
     serviceType: "Travel reguler per kursi",
     areaServed: ["Malang", "Batu", "Surabaya", "Juanda", "Pandaan"],
     url: `${siteConfig.url}/travel-reguler`,
};

async function loadRoutes(): Promise<Route[]> {
     try {
          return await getRoutes();
     } catch (error) {
          console.error("[TravelRegulerPage] Gagal mengambil rute dari CMS:", error);
          return [];
     }
}

async function loadArmada(): Promise<Armada[]> {
     try {
          return await getArmadaList();
     } catch (error) {
          console.error("[TravelRegulerPage] Gagal mengambil armada dari CMS:", error);
          return [];
     }
}

export default async function TravelRegulerPage() {
     const [config, routes, armadaList] = await Promise.all([
          getSiteConfig(),
          loadRoutes(),
          loadArmada(),
     ]);
     const whatsapp = config.contact?.whatsapp;
     const pairs = getRoutePairs(routes);
     const charterLink = heroContent.charterLink;

     const routeListItems = routes
          .filter((route) => route.slug)
          .map((route, index) => ({
               "@type": "ListItem",
               position: index + 1,
               name: capitalizeFirst(decodeHtml(route.title)),
               url: `${siteConfig.url}/rute/${route.slug}`,
          }));

     const itemListJsonLd = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Rute Travel Reguler",
          itemListElement: routeListItems,
     };

     return (
          <main className="w-full bg-surface">
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                    }}
               />
               {routeListItems.length > 0 && (
                    <script
                         type="application/ld+json"
                         dangerouslySetInnerHTML={{
                              __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c"),
                         }}
                    />
               )}
               <TravelHero />

               <section className="w-full bg-surface-container-low py-space-xl">
                    <div className="mx-auto max-w-6xl space-y-space-md px-gutter">
                         {whatsapp && pairs.length > 0 && (
                              <RouteSearchForm pairs={pairs} whatsapp={whatsapp} />
                         )}

                         <p className="pt-space-sm text-center font-body-md text-body-md text-on-surface-variant">
                              {charterLink.text}{" "}
                              <Link
                                   href={charterLink.href}
                                   className="font-bold text-primary underline underline-offset-4 hover:text-primary-container"
                              >
                                   {charterLink.label}
                              </Link>
                              .
                         </p>
                    </div>
               </section>

               {whatsapp && routes.length > 0 && (
                    <FeaturedRoutes
                         routes={routes}
                         armadaList={armadaList}
                         whatsapp={whatsapp}
                    />
               )}
               <Facilities />
               <BookingSteps />
               {whatsapp && <CtaBanner whatsapp={whatsapp} />}
          </main>
     );
}