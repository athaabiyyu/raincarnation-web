import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
     Car,
     ChevronRight,
     Clock,
     MessageCircle,
     Route as RouteIcon,
} from "lucide-react";
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
               "Tersedia layanan antar-jemput sesuai area. Pesan lewat WhatsApp.",
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
     const content = (route.content ?? "").trim();
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

               {/* Header rute */}
               <section className="w-full border-b border-surface-container-high/30 bg-linear-to-b from-surface-container-high/50 via-surface to-surface pb-space-lg pt-space-lg">
                    <div className="mx-auto max-w-6xl px-gutter">
                         <nav
                              aria-label="Breadcrumb"
                              className="flex flex-wrap items-center gap-space-xs font-label-md text-label-md text-on-surface-variant"
                         >
                              <Link
                                   href="/travel-reguler"
                                   className="transition-colors hover:text-primary"
                              >
                                   Travel Reguler
                              </Link>
                              <ChevronRight size={14} aria-hidden="true" />
                              <span className="font-bold text-primary">{title}</span>
                         </nav>

                         <h1 className="mt-space-md font-display text-display font-extrabold tracking-tight text-on-surface">
                              Travel {title}
                         </h1>

                         {(label || jalur) && (
                              <ul className="mt-space-sm flex flex-wrap items-center gap-space-sm">
                                   {label && (
                                        <li className="rounded-full bg-surface-container-lowest px-space-md py-space-xs font-label-md text-label-md font-bold text-primary shadow-sm ring-1 ring-primary/20">
                                             {label}
                                        </li>
                                   )}
                                   {jalur && (
                                        <li className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-space-md py-space-xs font-label-md text-label-md font-bold text-on-surface-variant">
                                             <RouteIcon
                                                  size={14}
                                                  className="shrink-0 text-primary"
                                                  aria-hidden="true"
                                             />
                                             {jalur}
                                        </li>
                                   )}
                              </ul>
                         )}

                         {content && (
                              <div
                                   className="mt-space-md max-w-3xl font-body-lg text-body-lg text-on-surface-variant [&_a]:text-primary [&_a]:underline [&_li]:mt-space-xs [&_ol]:list-decimal [&_ol]:pl-6 [&_p:first-child]:mt-0 [&_p]:mt-space-sm [&_ul]:list-disc [&_ul]:pl-6"
                                   dangerouslySetInnerHTML={{ __html: content }}
                              />
                         )}
                    </div>
               </section>

               {/* Isi: kolom utama + kartu tarif */}
               <section className="mx-auto max-w-6xl px-gutter py-space-xl">
                    <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
                         {/* Kartu tarif: di HP tampil lebih dulu, di desktop di kanan */}
                         {(tarif || whatsappUrl) && (
                              <aside className="order-first lg:order-last lg:col-span-1">
                                   <div className="flex flex-col gap-space-md rounded-3xl border border-surface-container-high/80 bg-surface-container-lowest p-space-lg shadow-[0_4px_20px_rgba(18,28,44,0.06)] lg:sticky lg:top-32">
                                        {tarif && (
                                             <div className="flex flex-col">
                                                  <span className="font-label-md text-label-md font-medium text-on-surface-variant">
                                                       Tarif per kursi
                                                  </span>
                                                  <span className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-primary">
                                                       {tarif}
                                                  </span>
                                             </div>
                                        )}

                                        {tarifPp && (
                                             <div className="flex items-center justify-between rounded-2xl border border-surface-container-high bg-surface-container-low/80 px-space-md py-space-sm">
                                                  <span className="font-label-md text-label-md font-medium text-on-surface-variant">
                                                       Pulang pergi
                                                  </span>
                                                  <span className="font-label-lg text-label-lg font-bold text-on-surface">
                                                       {tarifPp}
                                                  </span>
                                             </div>
                                        )}

                                        {whatsappUrl && (
                                             <a
                                                  href={whatsappUrl}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-space-md py-3 font-label-lg text-label-lg text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all hover:bg-whatsapp-hover active:scale-95"
                                             >
                                                  <MessageCircle size={20} aria-hidden="true" />
                                                  Pesan via WhatsApp
                                             </a>
                                        )}
                                   </div>
                              </aside>
                         )}

                         {/* Kolom utama */}
                         <div className="flex flex-col gap-space-xl lg:col-span-2">
                              {times.length > 0 && (
                                   <div>
                                        <h2 className="font-headline-md text-headline-md font-extrabold tracking-tight text-on-surface">
                                             Jadwal Keberangkatan
                                        </h2>
                                        <ul className="mt-space-sm flex flex-wrap gap-space-sm">
                                             {times.map((time) => (
                                                  <li
                                                       key={time}
                                                       className="inline-flex items-center gap-2 rounded-xl border border-surface-container-high/80 bg-surface-container-lowest px-space-md py-space-sm font-label-lg text-label-lg font-bold text-on-surface shadow-sm"
                                                  >
                                                       <Clock
                                                            size={16}
                                                            className="shrink-0 text-primary"
                                                            aria-hidden="true"
                                                       />
                                                       {time}
                                                  </li>
                                             ))}
                                        </ul>
                                   </div>
                              )}

                              {armadaNames.length > 0 && (
                                   <div>
                                        <h2 className="font-headline-md text-headline-md font-extrabold tracking-tight text-on-surface">
                                             Armada
                                        </h2>
                                        <ul className="mt-space-sm flex flex-wrap gap-space-sm">
                                             {armadaNames.map((name) => (
                                                  <li
                                                       key={name}
                                                       className="inline-flex items-center gap-2 rounded-xl border border-surface-container-high/80 bg-surface-container-lowest px-space-md py-space-sm font-label-lg text-label-lg font-bold text-on-surface shadow-sm"
                                                  >
                                                       <Car
                                                            size={18}
                                                            className="shrink-0 text-primary"
                                                            aria-hidden="true"
                                                       />
                                                       {name}
                                                  </li>
                                             ))}
                                        </ul>
                                   </div>
                              )}

                              <Link
                                   href="/travel-reguler"
                                   className="font-label-lg text-label-lg font-bold text-primary underline-offset-4 hover:underline"
                              >
                                   ← Kembali ke Travel Reguler
                              </Link>
                         </div>
                    </div>
               </section>
          </main>
     );
}