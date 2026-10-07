import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoutes, getRouteBySlug } from "@/lib/wordpress/routes";
import { decodeHtml } from "@/utils/decode-html";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { formatPrice } from "@/utils/format-price";
import { getArmadaList } from "@/lib/wordpress/armada";
import { matchArmada } from "@/utils/match-armada";
import { getSiteConfig } from "@/lib/wordpress/config";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { siteConfig } from "@/config/site";

type PageProps = {
     params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
     try {
          const routes = await getRoutes();
          return routes.map((route) => ({ slug: route.slug }));
     } catch (error) {
          console.error("generateStaticParams rute gagal:", error);
          return [];
     }
}

export async function generateMetadata({
     params,
}: PageProps): Promise<Metadata> {
     const { slug } = await params;

     try {
          const route = await getRouteBySlug(slug);
          const from = capitalizeFirst(route.acf?.kota_asal ?? "");
          const to = capitalizeFirst(route.acf?.kota_tujuan ?? "");
          const name =
               from && to
                    ? `${from} ${to}`
                    : capitalizeFirst(decodeHtml(route.title));
          const jalur = capitalizeFirst(route.acf?.jalur ?? "");
          const tarif = formatPrice(route.acf?.tarif);

          const parts = [
               `Travel reguler per kursi ${name}.`,
               jalur ? `Lewat jalur ${jalur}.` : "",
               tarif ? `Tarif mulai ${tarif}.` : "",
               "Dijemput di depan rumah. Pesan lewat WhatsApp.",
          ].filter(Boolean);

          return {
               title: `Travel ${name} | Raincarnation`,
               description: parts.join(" "),
               alternates: { canonical: `/rute/${slug}` },
          };
     } catch {
          return {};
     }
}

export default async function RoutePage({ params }: PageProps) {
     const { slug } = await params;

     let route;
     try {
          route = await getRouteBySlug(slug);
     } catch (error) {
          console.error("getRouteBySlug gagal untuk slug:", slug, error);
          notFound();
     }

     const from = capitalizeFirst(route.acf?.kota_asal ?? "");
     const to = capitalizeFirst(route.acf?.kota_tujuan ?? "");
     const title =
          from && to
               ? `${from} → ${to}`
               : capitalizeFirst(decodeHtml(route.title));
     const tarif = formatPrice(route.acf?.tarif);
     const tarifPp = formatPrice(route.acf?.tarif_pp);
     const label = capitalizeFirst(route.acf?.label ?? "");
     const jalur = capitalizeFirst(route.acf?.jalur ?? "");
     const deskripsi = capitalizeFirst(route.acf?.deskripsi_singkat ?? "");
     const times = (route.acf?.jadwal ?? "")
          .split(",")
          .map((time) => time.trim())
          .filter(Boolean);

     const cmsConfig = await getSiteConfig();
     const whatsapp = cmsConfig.contact?.whatsapp;
     const whatsappUrl = whatsapp
          ? buildWhatsAppUrl(
               whatsapp,
               `Halo Admin, saya mau booking travel reguler ${title}`,
          )
          : null;

     let armadaNames: string[] = [];
     try {
          const armadaList = await getArmadaList();
          armadaNames = matchArmada(route.acf?.armada ?? [], armadaList).map(
               (item) => capitalizeFirst(decodeHtml(item.title)),
          );
     } catch (error) {
          console.error("getArmadaList gagal di halaman rute:", error);
     }

     const jsonLd = {
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Travel ${title}`,
          serviceType: "Travel reguler per kursi",
          areaServed: [from, to].filter(Boolean),
          url: `${siteConfig.url}/rute/${slug}`,
          ...(route.acf?.tarif && Number(route.acf.tarif) > 0
               ? {
                    offers: {
                         "@type": "Offer",
                         price: String(Number(route.acf.tarif)),
                         priceCurrency: "IDR",
                    },
               }
               : {}),
     };

     return (
          <main className="w-full bg-surface">
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                    }}
               />
               <section className="mx-auto max-w-6xl px-gutter py-space-xl">
                    <nav aria-label="Breadcrumb" className="font-label-md text-label-md">
                         <Link href="/travel-reguler">Travel Reguler</Link>
                         <span> / </span>
                         <span>{title}</span>
                    </nav>

                    <h1 className="mt-space-md font-display text-display">
                         Travel {title}
                    </h1>

                    {(label || jalur) && (
                         <ul className="mt-space-sm flex flex-wrap gap-space-sm">
                              {label && (
                                   <li className="rounded-full bg-surface-container-low px-space-md py-space-xs font-label-md text-label-md">
                                        {label}
                                   </li>
                              )}
                              {jalur && (
                                   <li className="rounded-full bg-surface-container-low px-space-md py-space-xs font-label-md text-label-md">
                                        {jalur}
                                   </li>
                              )}
                         </ul>
                    )}

                    {tarif && (
                         <p className="mt-space-md font-headline-md text-headline-md">
                              {tarif}
                         </p>
                    )}

                    {tarifPp && (
                         <p className="mt-space-xs font-body-lg text-body-lg">
                              Pulang pergi: {tarifPp}
                         </p>
                    )}

                    {deskripsi && (
                         <p className="mt-space-md font-body-lg text-body-lg">
                              {deskripsi}
                         </p>
                    )}

                    {whatsappUrl && (
                         <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-space-lg inline-block rounded-lg bg-whatsapp px-space-lg py-space-sm font-label-lg text-label-lg text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] hover:bg-whatsapp-hover"
                         >
                              Pesan via WhatsApp
                         </a>
                    )}

                    {times.length > 0 && (
                         <div className="mt-space-lg">
                              <h2 className="font-headline-sm text-headline-sm">
                                   Jadwal Keberangkatan
                              </h2>
                              <ul className="mt-space-sm flex flex-wrap gap-space-sm">
                                   {times.map((time) => (
                                        <li
                                             key={time}
                                             className="rounded-full bg-surface-container-low px-space-md py-space-xs font-label-lg text-label-lg"
                                        >
                                             {time}
                                        </li>
                                   ))}
                              </ul>
                         </div>
                    )}

                    {armadaNames.length > 0 && (
                         <div className="mt-space-lg">
                              <h2 className="font-headline-sm text-headline-sm">Armada</h2>
                              <ul className="mt-space-sm flex flex-wrap gap-space-sm">
                                   {armadaNames.map((name) => (
                                        <li
                                             key={name}
                                             className="rounded-full bg-surface-container-low px-space-md py-space-xs font-label-lg text-label-lg"
                                        >
                                             {name}
                                        </li>
                                   ))}
                              </ul>
                         </div>
                    )}

                    <Link
                         href="/travel-reguler"
                         className="mt-space-lg inline-block font-label-lg text-label-lg"
                    >
                         ← Kembali ke Travel Reguler
                    </Link>
               </section>
          </main>
     );
}