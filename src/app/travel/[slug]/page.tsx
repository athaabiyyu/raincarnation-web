import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
     Car,
     ChevronRight,
     Clock,
     MessageCircle,
     Route as RouteIcon,
     MapPin,
     Info,
     CheckCircle2,
     ShieldCheck,
     RefreshCcw,
     Luggage,
     UserCheck,
     Headset
} from "lucide-react";
import { getRoutes, getRouteBySlug } from "@/lib/wordpress/routes";
import { decodeHtml } from "@/utils/decode-html";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { formatPrice } from "@/utils/format-price";
import { getArmadaList } from "@/lib/wordpress/armada";
import { matchArmada } from "@/utils/match-armada";
import { getSiteConfig } from "@/lib/wordpress/config";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { formatPhoneDisplay } from "@/utils/format-phone";
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
     const { slug } = await params;

     try {
          const route = await getRouteBySlug(slug);
          const from = capitalizeFirst(route.acf?.kota_asal ?? "");
          const to = capitalizeFirst(route.acf?.kota_tujuan ?? "");
          const name = from && to ? `${from} ke ${to}` : capitalizeFirst(decodeHtml(route.title));
          const tarifMeta = formatPrice(route.acf?.tarif);

          const parts = [
               `Travel per kursi rute ${name}, door to door.`,
               tarifMeta ? `Tarif ${tarifMeta} per kursi, sudah termasuk tol dan parkir.` : "",
               "Cek jadwal, pesan via WA.",
          ].filter(Boolean);

          const titleName = from && to ? `${from} ${to}` : name;
          const title = `Travel ${titleName}: Jadwal & Tarif | Raincarnation`;
          const description = route.acf?.deskripsi_singkat?.trim() || parts.join(" ");

          return {
               title,
               description,
               alternates: { canonical: `/travel/${slug}` },
               openGraph: {
                    type: "website",
                    locale: "id_ID",
                    siteName: siteConfig.name,
                    url: `/travel/${slug}`,
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

     // Menggabungkan kata "Travel" dan rute secara utuh dalam satu baris whitespace-nowrap
     const titleDisplay = from && to ? (
          <span className="whitespace-nowrap inline-flex items-center gap-2 md:gap-3">
               Travel {from} <span className="text-primary font-normal">→</span> {to}
          </span>
     ) : (
          <span className="whitespace-nowrap">Travel {capitalizeFirst(decodeHtml(route.title))}</span>
     );

     const rawTitle = from && to ? `${from} → ${to}` : capitalizeFirst(decodeHtml(route.title));

     const tarif = formatPrice(route.acf?.tarif);
     const tarifPp = formatPrice(route.acf?.tarif_pp);
     const deskripsiSingkat = route.acf?.deskripsi_singkat?.trim() ?? "";
     const label = capitalizeFirst(route.acf?.label ?? "");
     const jalur = capitalizeFirst(route.acf?.jalur ?? "");
     const content = (route.content ?? "").trim();
     const times = (route.acf?.jadwal ?? "")
          .split(",")
          .map((time) => time.trim())
          .filter(Boolean);

     const cmsConfig = await getSiteConfig();
     const whatsapp = cmsConfig.contact?.whatsapp ?? "";
     const whatsappUrl = whatsapp
          ? buildWhatsAppUrl(whatsapp, `Halo Admin, saya mau booking travel ${rawTitle}`)
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

     // Rute terkait: rute lain dengan kota asal atau tujuan yang sama (maks. 4)
     let relatedRoutes: Awaited<ReturnType<typeof getRoutes>> = [];
     try {
          const allRoutes = await getRoutes();
          const sameCity = (a?: string, b?: string) =>
               !!a && !!b && a.trim().toLowerCase() === b.trim().toLowerCase();
          relatedRoutes = allRoutes
               .filter(
                    (item) =>
                         item.slug !== slug &&
                         (sameCity(item.acf?.kota_asal, route.acf?.kota_asal) ||
                              sameCity(item.acf?.kota_tujuan, route.acf?.kota_tujuan)),
               )
               .slice(0, 4);
     } catch (error) {
          console.error("getRoutes gagal di halaman rute (rute terkait):", error);
     }

     // Structured Data utama menggunakan TransportationService selaras dengan halaman sewa mobil
     const travelServiceLd = {
          "@context": "https://schema.org",
          "@type": "TransportationService",
          name: `Travel ${rawTitle} - Raincarnation`,
          serviceType: "Travel per kursi",
          description: `Layanan travel per kursi rute ${rawTitle}, door to door kecuali titik di Pandaan dan Juanda.`, 
          url: `${siteConfig.url}/travel/${slug}`,
          telephone: whatsapp ? `+${whatsapp}` : undefined,
          address: {
               "@type": "PostalAddress",
               addressLocality: "Batu",
               addressRegion: "Jawa Timur",
               addressCountry: "ID",
          },
          areaServed: [from, to].filter(Boolean),
          provider: {
               "@type": "LocalBusiness",
               name: siteConfig.name,
               image: `${siteConfig.url}/images/interior-armada.webp`,
          },
          ...(route.acf?.tarif && Number(route.acf.tarif) > 0
               ? {
                    offers: {
                         "@type": "Offer",
                         price: String(Number(route.acf.tarif)),
                         priceCurrency: "IDR",
                         availability: "https://schema.org/InStock",
                    },
               }
               : {}),
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
                    name: "Travel",
                    item: `${siteConfig.url}/travel`,
               },
               {
                    "@type": "ListItem",
                    position: 3,
                    name: rawTitle,
                    item: `${siteConfig.url}/travel/${slug}`,
               },
          ],
     };

     return (
          <main className="w-full bg-[#F8F9FA] text-on-surface min-h-screen pb-space-2xl">
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(travelServiceLd).replace(/</g, "\\u003c") }}
               />
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c") }}
               />

               {/* === HEADER SECTION === */}
               <section className="w-full bg-white border-b border-surface-container-high/40 pb-space-lg pt-space-lg">
                    <div className="mx-auto max-w-7xl px-gutter">

                         {/* Breadcrumb - Disembunyikan di Mobile */}
                         <nav aria-label="Breadcrumb" className="hidden lg:flex mb-4 flex-wrap items-center gap-2 text-sm text-on-surface-variant">
                              <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
                              <ChevronRight size={14} />
                              <Link href="/travel" className="hover:text-primary transition-colors">Travel</Link>
                              <ChevronRight size={14} />
                              <span className="font-semibold text-on-surface">{rawTitle}</span>
                         </nav>

                         {/* Badges / Pills - Disembunyikan di Mobile */}
                         <div className="hidden lg:flex mb-3 flex-wrap items-center gap-2">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                                   <MapPin size={12} />
                                   Door to Door
                              </span>
                              {jalur && (
                                   <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-low border border-surface-container-high px-3 py-1 text-xs font-semibold text-on-surface-variant">
                                        <RouteIcon size={12} />
                                        Via Jalur {jalur}
                                   </span>
                              )}
                              {label && (
                                   <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                                        {label}
                                   </span>
                              )}
                         </div>

                         {/* Title & Deskripsi */}
                         <div className="max-w-4xl overflow-x-auto pb-2">
                              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
                                   {titleDisplay}
                              </h1>
                              <p className="mt-4 text-base md:text-lg text-on-surface-variant max-w-3xl leading-relaxed">
                                   {deskripsiSingkat ||
                                        `Travel per kursi rute ${rawTitle} door to door, dengan jadwal keberangkatan tetap.`}
                              </p>
                         </div>
                    </div>
               </section>

               {/* === KONTEN UTAMA & SIDEBAR === */}
               <section className="mx-auto max-w-7xl px-gutter pt-space-xl">
                    <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-12 lg:items-start">

                         {/* --- KOLOM KIRI (Konten Detail) --- */}
                         <div className="flex flex-col gap-space-md lg:col-span-8">

                              {/* 1. Card Jadwal */}
                              {times.length > 0 && (
                                   <div className="rounded-2xl border border-surface-container-high/60 bg-white p-6 md:p-8 shadow-sm">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                             <div className="flex items-start gap-4">
                                                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                       <Clock size={20} />
                                                  </div>
                                                  <div>
                                                       <h2 className="text-xl font-bold text-on-surface">Jadwal Keberangkatan</h2>
                                                       <p className="text-sm text-on-surface-variant mt-0.5">Pilih jam keberangkatan harian yang sesuai agenda Anda</p>
                                                  </div>
                                             </div>
                                             <span className="shrink-0 inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                                                  {times.length} Kali / Hari
                                             </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                                             {times.map((time, idx) => (
                                                  <div key={time} className={`relative flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-colors ${idx === 0 ? 'border-primary bg-primary/5' : 'border-surface-container-high hover:border-primary/50'}`}>
                                                       {idx === 0 && (
                                                            <span className="absolute -top-2.5 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Favorit</span>
                                                       )}
                                                       <span className="text-xl font-bold text-on-surface">{time}</span>
                                                       <span className="text-xs text-on-surface-variant mt-1">WIB</span>
                                                       <span className="text-[10px] font-bold text-primary mt-2">Tersedia</span>
                                                  </div>
                                             ))}
                                        </div>
                                        <div className="mt-5 flex items-center gap-2 text-xs text-on-surface-variant">
                                             <Info size={14} className="text-primary" />
                                             <p>Penjemputan dimulai 30-60 menit sebelum jam keberangkatan sesuai urutan lokasi Anda.</p>
                                        </div>
                                   </div>
                              )}

                              {/* 2. Card Armada */}
                              {armadaNames.length > 0 && (
                                   <div className="rounded-2xl border border-surface-container-high/60 bg-white p-6 md:p-8 shadow-sm">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                             <div className="flex items-start gap-4">
                                                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant">
                                                       <RefreshCcw size={20} />
                                                  </div>
                                                  <div>
                                                       <h2 className="text-xl font-bold text-on-surface">Armada Tersedia</h2>
                                                       <p className="text-sm text-on-surface-variant mt-0.5">Kenyamanan kendaraan eksekutif dengan standar kebersihan tinggi</p>
                                                  </div>
                                             </div>
                                             <span className="shrink-0 inline-block rounded-md bg-surface-container px-3 py-1 text-xs font-bold text-on-surface-variant">
                                                  Kapasitas Nyaman
                                             </span>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                             {armadaNames.map((name, idx) => (
                                                  <div key={name} className={`flex flex-col rounded-xl border p-5 ${idx === 0 ? 'border-primary/50 shadow-sm' : 'border-surface-container-high'}`}>
                                                       <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                            <Car size={24} />
                                                       </div>
                                                       <h3 className="font-bold text-on-surface">{name}</h3>
                                                       <p className="text-xs text-on-surface-variant mt-1 mb-4">VIP & Comfortable Ride</p>

                                                       <ul className="space-y-2 mb-4 mt-auto">
                                                            <li className="flex items-start gap-2 text-xs text-on-surface">
                                                                 <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /> Full AC & Audio
                                                            </li>
                                                            <li className="flex items-start gap-2 text-xs text-on-surface">
                                                                 <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /> Reclining Seat
                                                            </li>
                                                       </ul>
                                                       <div className="pt-3 border-t border-surface-container-high/50 flex justify-between items-center">
                                                            <span className="text-[11px] text-on-surface-variant">Per kursi</span>
                                                            <span className="text-xs font-bold text-on-surface">{tarif}/org</span>
                                                       </div>
                                                  </div>
                                             ))}
                                        </div>
                                   </div>
                              )}

                              {/* 3. Card Fasilitas Generic */}
                              <div className="rounded-2xl border border-surface-container-high/60 bg-white p-6 md:p-8 shadow-sm">
                                   <div className="mb-6">
                                        <h2 className="text-xl font-bold text-on-surface">Fasilitas Termasuk dalam Tiket</h2>
                                        <p className="text-sm text-on-surface-variant mt-1">Nikmati kenyamanan berstandar tinggi tanpa tambahan biaya tersembunyi</p>
                                   </div>
                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-start gap-4 rounded-xl bg-[#F8F9FA] p-4 border border-surface-container-high/30">
                                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                  <MapPin size={20} />
                                             </div>
                                             <div>
                                                  <h3 className="font-bold text-sm text-on-surface">Door to Door</h3>
                                                  <p className="text-xs text-on-surface-variant mt-1">Dijemput dan diantar sampai alamat, kecuali titik di Pandaan dan Juanda.</p>
                                             </div>
                                        </div>
                                        {jalur && (
                                             <div className="flex items-start gap-4 rounded-xl bg-[#F8F9FA] p-4 border border-surface-container-high/30">
                                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                       <RouteIcon size={20} />
                                                  </div>
                                                  <div>
                                                       <h3 className="font-bold text-sm text-on-surface">Lewat Jalur Cepat</h3>
                                                       <p className="text-xs text-on-surface-variant mt-1">Menggunakan jalur {jalur} agar waktu tempuh lebih singkat.</p>
                                                  </div>
                                             </div>
                                        )}
                                        <div className="flex items-start gap-4 rounded-xl bg-[#F8F9FA] p-4 border border-surface-container-high/30">
                                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                  <UserCheck size={20} />
                                             </div>
                                             <div>
                                                  <h3 className="font-bold text-sm text-on-surface">Driver Ramah & Berpengalaman</h3>
                                                  <p className="text-xs text-on-surface-variant mt-1">Driver profesional, berseragam, dan hapal rute perjalanan.</p>
                                             </div>
                                        </div>
                                        <div className="flex items-start gap-4 rounded-xl bg-[#F8F9FA] p-4 border border-surface-container-high/30">
                                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                  <Luggage size={20} />
                                             </div>
                                             <div>
                                                  <h3 className="font-bold text-sm text-on-surface">Bagasi Gratis</h3>
                                                  <p className="text-xs text-on-surface-variant mt-1">Gratis membawa 1 koper standar + 1 tas jinjing/ransel.</p>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              {/* 4. Card Tentang Rute (CMS Content) */}
                              {content && (
                                   <div className="rounded-2xl border border-surface-container-high/60 bg-white p-6 md:p-8 shadow-sm">
                                        <div className="flex items-start gap-4 mb-6">
                                             <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                  <MapPin size={20} />
                                             </div>
                                             <div>
                                                  <h2 className="text-xl font-bold text-on-surface">
                                                       Tentang Rute Travel {from && to ? `${from} ${to}` : rawTitle}
                                                  </h2>
                                                  <p className="text-sm text-on-surface-variant mt-0.5">Cakupan area penjemputan dan pengantaran</p>
                                             </div>
                                        </div>

                                        <div
                                             className="text-sm text-on-surface-variant leading-relaxed [&_p]:mb-4 last:[&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:mb-1 [&_strong]:text-on-surface"
                                             dangerouslySetInnerHTML={{ __html: content }}
                                        />

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-surface-container-high/40">
                                             <div className="rounded-xl border border-surface-container-high/50 p-4 bg-surface-container-lowest/50">
                                                  <h3 className="font-bold text-xs text-primary uppercase tracking-wider mb-2">Ketentuan Bagasi</h3>
                                                  <p className="text-xs text-on-surface-variant leading-relaxed">Setiap penumpang diperkenankan membawa 1 koper ukuran sedang dan 1 tas jinjing. Harap infokan admin jika membawa bagasi berlebih.</p>
                                             </div>
                                             <div className="rounded-xl border border-surface-container-high/50 p-4 bg-surface-container-lowest/50">
                                                  <h3 className="font-bold text-xs text-primary uppercase tracking-wider mb-2">Kebijakan Pembatalan</h3>
                                                  <p className="text-xs text-on-surface-variant leading-relaxed">Perubahan jadwal atau pembatalan dapat dilakukan tanpa biaya maksimal 12 jam sebelum waktu penjemputan melalui customer support.</p>
                                             </div>
                                        </div>
                                   </div>
                              )}

                                                            {/* 5. Rute Terkait + tautan ke Sewa Mobil */}
                              {relatedRoutes.length > 0 && (
                                   <div className="rounded-2xl border border-surface-container-high/60 bg-white p-6 md:p-8 shadow-sm">
                                        <h2 className="text-xl font-bold text-on-surface">Rute Travel Lainnya</h2>
                                        <p className="text-sm text-on-surface-variant mt-1">Rute lain dengan kota asal atau tujuan yang sama</p>
                                        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                             {relatedRoutes.map((item) => {
                                                  const itemFrom = capitalizeFirst(item.acf?.kota_asal ?? "");
                                                  const itemTo = capitalizeFirst(item.acf?.kota_tujuan ?? "");
                                                  const itemName =
                                                       itemFrom && itemTo
                                                            ? `${itemFrom} ke ${itemTo}`
                                                            : capitalizeFirst(decodeHtml(item.title));
                                                  const itemTarif = formatPrice(item.acf?.tarif);
                                                  return (
                                                       <li key={item.slug}>
                                                            <Link
                                                                 href={`/travel/${item.slug}`}
                                                                 className="flex items-center justify-between gap-3 rounded-xl border border-surface-container-high/50 bg-[#F8F9FA] p-4 text-sm font-semibold text-on-surface transition-colors hover:border-primary/50 hover:text-primary"
                                                            >
                                                                 <span>Travel {itemName}</span>
                                                                 {itemTarif && <span className="shrink-0 text-xs font-bold text-primary">{itemTarif}</span>}
                                                            </Link>
                                                       </li>
                                                  );
                                             })}
                                        </ul>
                                        <p className="mt-6 border-t border-surface-container-high/40 pt-5 text-sm text-on-surface-variant">
                                             Butuh satu mobil penuh untuk rombongan?{" "}
                                             <Link href="/sewa-mobil" className="font-bold text-primary hover:underline">
                                                  Lihat layanan Sewa Mobil
                                             </Link>
                                        </p>
                                   </div>
                              )}

                              {/* Back Link */}
                              <div className="pt-2 pb-6">
                                   <Link href="/travel" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                                        <ChevronRight className="h-4 w-4 rotate-180" />
                                        Kembali ke Semua Rute Travel
                                   </Link>
                              </div>
                         </div>

                         {/* --- KOLOM KANAN (Sidebar) --- */}
                         {(tarif || whatsappUrl) && (
                              <aside className="order-first lg:order-last lg:col-span-4 space-y-6">

                                   {/* Kartu Tarif Utama */}
                                   <div className="rounded-2xl border border-surface-container-high/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                                        {/* Garis Hijau Atas */}
                                        <div className="h-1.5 w-full bg-primary" />

                                        <div className="p-6 md:p-7">
                                             <div className="flex items-center justify-between mb-2">
                                                  <span className="text-xs font-bold tracking-wider text-on-surface-variant uppercase">Tarif Resmi</span>
                                                  <span className="rounded bg-[#F0FDF4] px-2 py-1 text-[10px] font-bold text-primary border border-primary/20">Termasuk Tol & Parkir</span>
                                             </div>

                                             <div className="mb-6 flex items-baseline gap-1">
                                                  <span className="text-4xl font-extrabold tracking-tight text-on-surface">{tarif}</span>
                                                  <span className="text-sm font-medium text-on-surface-variant">/ kursi</span>
                                             </div>

                                             {/* Mini Table Info */}
                                             <div className="space-y-3 mb-8 rounded-xl bg-[#F8F9FA] p-4 text-sm border border-surface-container-high/30">
                                                  <div className="flex justify-between">
                                                       <span className="text-on-surface-variant">Rute:</span>
                                                       <span className="font-semibold text-on-surface text-right max-w-[60%]" suppressHydrationWarning>{rawTitle}</span>
                                                  </div>
                                                  <div className="flex justify-between">
                                                       <span className="text-on-surface-variant">Layanan:</span>
                                                       <span className="font-semibold text-on-surface">Door to Door</span>
                                                  </div>
                                                  {tarifPp && (
                                                       <div className="flex justify-between border-t border-surface-container-high/40 pt-2 mt-2">
                                                            <span className="text-primary font-semibold">Tarif PP:</span>
                                                            <span className="font-bold text-primary">{tarifPp}</span>
                                                       </div>
                                                  )}
                                             </div>

                                             {/* CTA WhatsApp */}
                                             {whatsappUrl && (
                                                  <div className="flex flex-col gap-3">
                                                       <a
                                                            href={whatsappUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95"
                                                       >
                                                            <MessageCircle size={20} />
                                                            Pesan via WhatsApp
                                                       </a>
                                                       <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-on-surface-variant">
                                                            <ShieldCheck size={14} className="text-primary" />
                                                            Pesanan instan, aman, tanpa biaya tambahan
                                                       </p>
                                                  </div>
                                             )}

                                             {/* List Guarantees */}
                                             <ul className="mt-6 space-y-2.5">
                                                  <li className="flex items-center gap-2.5 text-xs text-on-surface">
                                                       <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                                            <CheckCircle2 size={12} className="text-primary" />
                                                       </div>
                                                       Garansi Tepat Waktu & Pasti Berangkat
                                                  </li>
                                                  <li className="flex items-center gap-2.5 text-xs text-on-surface">
                                                       <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                                            <CheckCircle2 size={12} className="text-primary" />
                                                       </div>
                                                       Pembayaran Fleksibel (Transfer / Tunai)
                                                  </li>
                                                  <li className="flex items-center gap-2.5 text-xs text-on-surface">
                                                       <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                                            <CheckCircle2 size={12} className="text-primary" />
                                                       </div>
                                                       Konfirmasi Cepat Kurang dari 5 Menit
                                                  </li>
                                             </ul>
                                        </div>
                                   </div>

                                   {/* Kotak Bantuan Cepat - Hidden di mobile, tampil di desktop dengan warna hijau tua */}
                                   <div className="hidden lg:block rounded-2xl bg-[#064E3B] text-white p-6 shadow-lg border border-[#047857]/50">
                                        <div className="flex items-start gap-4 mb-4">
                                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                                                  <Headset size={20} className="text-[#34D399]" />
                                             </div>
                                             <div>
                                                  <h3 className="font-bold text-sm">Butuh Bantuan Cepat?</h3>
                                                  <p className="text-xs text-emerald-100 mt-1">Tim kami online 24 jam non-stop.</p>
                                             </div>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-white/15 pt-4 mt-2">
                                             <span className="text-xs text-emerald-200">Hotline Pemesanan:</span>
                                             <span className="text-sm font-bold text-[#34D399]">{whatsapp ? formatPhoneDisplay(whatsapp) : "Hubungi Admin"}</span>
                                        </div>
                                   </div>

                              </aside>
                         )}
                    </div>
               </section>
          </main>
     );
}