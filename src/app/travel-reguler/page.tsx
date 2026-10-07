import type { Metadata } from "next";
import BookingSteps from "@/components/sections/BookingSteps";
import CtaBanner from "@/components/sections/CtaBanner";
import Facilities from "@/components/sections/Facilities";
import FeaturedRoutes from "@/components/sections/FeaturedRoutes";
import RouteSearchForm from "@/components/sections/RouteSearchForm";
import TravelHero from "@/components/sections/TravelHero";
import { getArmadaList } from "@/lib/wordpress/armada";
import { getSiteConfig } from "@/lib/wordpress/config";
import { getRoutes } from "@/lib/wordpress/routes";
import type { Armada } from "@/types/armada";
import type { Route } from "@/types/route";
import { getRoutePairs } from "@/utils/route-pairs";

export const metadata: Metadata = {
     title: "Travel Malang Surabaya Pasuruan | Jemput Door to Door | Raincarnation",
     description:
          "Travel reguler per kursi Malang, Surabaya, dan Pasuruan. Dijemput di depan rumah, sudah termasuk tol, BBM, dan driver. Pesan lewat WhatsApp.",
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

     return (
          <main className="w-full bg-surface">
               <TravelHero />

               {whatsapp && pairs.length > 0 && (
                    <section className="w-full bg-surface-container-low pb-space-xl">
                         <div className="mx-auto max-w-7xl px-gutter">
                              <RouteSearchForm pairs={pairs} whatsapp={whatsapp} />
                         </div>
                    </section>
               )}

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