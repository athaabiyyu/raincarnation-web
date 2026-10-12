import type { Metadata } from "next";
import BerandaHero from "@/components/sections/BerandaHero";
import BerandaTrust from "@/components/sections/BerandaTrust";
import BerandaServices from "@/components/sections/BerandaServices";
import BerandaWhy from "@/components/sections/BerandaWhy";
import ArmadaCatalog from "@/components/sections/ArmadaCatalog";
import CtaBanner from "@/components/sections/CtaBanner";
import FeaturedRoutes from "@/components/sections/FeaturedRoutes";
import RouteSearchForm from "@/components/sections/RouteSearchForm";
import SewaMobilForm from "@/components/sections/SewaMobilForm";
import BerandaBookingTabs from "@/components/ui/BerandaBookingTabs";
import { berandaBooking, berandaBookingIntro } from "@/constants/beranda";
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

export const metadata: Metadata = {
     title: "Sewa Mobil Malang, Batu & Surabaya | Raincarnation",
     description:
          "Sewa mobil di Malang, Batu, dan Surabaya dengan pilihan mobil plus sopir atau lepas kunci. Hubungi Raincarnation melalui WhatsApp untuk informasi dan pemesanan.",
     alternates: { canonical: "/" },
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

     const regulerForm = <RouteSearchForm pairs={pairs} whatsapp={whatsapp} />;
     const carterForm = (
          <SewaMobilForm
               routes={ruteCarter}
               fleet={fleet}
               whatsapp={whatsapp}
               embedded
          />
     );

     return (
          <main className="w-full bg-surface">
               <BerandaHero whatsapp={whatsapp} />

               {(hasReguler || hasCarter) && (
                    <section className="w-full pb-space-xl">
                         <div className="mx-auto max-w-6xl px-gutter">
                              <div className="mb-space-md space-y-space-xs">
                                   <h2 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
                                        {berandaBookingIntro.title}
                                   </h2>
                                   <p className="max-w-3xl font-body-md text-body-md text-on-surface-variant">
                                        {berandaBookingIntro.description}
                                   </p>
                              </div>
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

               <div className="pb-space-xl">
                    <ArmadaCatalog
                         armada={armada}
                         whatsapp={whatsapp}
                         variant="home"
                         seeAllHref="/armada"
                    />
               </div>
               <BerandaWhy whatsapp={whatsapp} />
               {whatsapp && <CtaBanner whatsapp={whatsapp} />}
          </main>
     );
}