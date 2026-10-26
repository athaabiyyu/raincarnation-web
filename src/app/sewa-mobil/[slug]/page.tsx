     import type { Metadata } from "next";
     import Image from "next/image";
     import Link from "next/link";
     import { notFound } from "next/navigation";
     import { Armchair, ChevronRight, Luggage, MessageSquareText } from "lucide-react";
     import ArmadaCard from "@/components/sections/ArmadaCard";
     import SewaMobilUnitFaq, {
          type UnitFaqItem,
     } from "@/components/sections/SewaMobilUnitFaq";
     import { siteConfig } from "@/config/site";
     import { sewaMobilPackageConfig } from "@/constants/sewa-mobil";
     import { getArmadaList } from "@/lib/wordpress/armada";
     import { getSiteConfig } from "@/lib/wordpress/config";
     import { capitalizeFirst } from "@/utils/capitalize-first";
     import { decodeHtml } from "@/utils/decode-html";
     import { lowestPrice, formatRupiah } from "@/utils/price";
     import { buildWhatsAppUrl } from "@/utils/whatsapp";
     import type { Armada } from "@/types/armada";

     type PageProps = {
          params: Promise<{ slug: string }>;
     };

     const OTHER_UNITS_LIMIT = 3;
     const OTHER_IMAGE_SIZES =
          "(min-width: 1024px) 352px, (min-width: 768px) 50vw, 90vw";

     async function loadArmada(): Promise<Armada[]> {
          try {
               return await getArmadaList();
          } catch (error) {
               console.error("Gagal memuat armada (halaman unit):", error);
               return [];
          }
     }

     // Harga terisi (> 0) diubah jadi teks "Rp ...". Kosong atau 0 = null (layanan tidak tampil).
     function priceText(value?: string): string | null {
          const number = Number(value);
          if (!Number.isFinite(number) || number <= 0) return null;
          return formatRupiah(number) ?? null;
     }

     function getPackage(kind: string) {
          const found = sewaMobilPackageConfig.packages.find(
               (item) => item.kind === kind,
          );
          return {
               includes: (found?.includes ?? []) as readonly string[],
               excludes: ((found && "excludes" in found ? found.excludes : []) ??
                    []) as readonly string[],
          };
     }

     function joinList(items: readonly string[]): string {
          return items.join(", ");
     }

     export async function generateStaticParams() {
          const armada = await loadArmada();
          return armada.map((item) => ({ slug: item.slug }));
     }

     export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
          const { slug } = await params;
          const armada = await loadArmada();
          const unit = armada.find((item) => item.slug === slug);
          if (!unit) return {};

          const name = capitalizeFirst(decodeHtml(unit.title));
          const rawImageUrl = unit.featured_image?.url;
          const ogImage = rawImageUrl
               ? rawImageUrl.replace(/^http:\/\//i, "https://")
               : undefined;
          const lowest = formatRupiah(
               lowestPrice([
                    unit.acf?.harga,
                    unit.acf?.harga_all_in,
                    unit.acf?.harga_non_all_in,
               ]),
          );
          const hasLepasKunci = Boolean(priceText(unit.acf?.harga));

          const first = lowest
               ? `Sewa ${name} Malang mulai ${lowest}.`
               : `Sewa ${name} Malang.`;
          const second = hasLepasKunci
               ? "Pilih dengan sopir atau lepas kunci, cek tarif dan pesan via WhatsApp."
               : "Pilih All In atau Non All In dengan sopir, cek tarif dan pesan via WhatsApp.";

          const title = `Sewa ${name} Malang, Harga & Tarif | Raincarnation`;
          const description = `${first} ${second}`;

          return {
               title,
               description,
               alternates: { canonical: `/sewa-mobil/${slug}` },
               openGraph: {
                    type: "website",
                    locale: "id_ID",
                    siteName: siteConfig.name,
                    url: `/sewa-mobil/${slug}`,
                    title,
                    description,
                    images: [
                         ogImage
                              ? {
                                   url: ogImage,
                                   alt: unit.featured_image?.alt || `Sewa ${name} Malang`,
                              }
                              : {
                                   url: "/images/interior-armada.webp",
                                   alt: "Interior armada Raincarnation",
                              },
                    ],
               },
          };
     }

     export default async function SewaMobilUnitPage({ params }: PageProps) {
          const { slug } = await params;

          const [config, armada] = await Promise.all([getSiteConfig(), loadArmada()]);
          const unit = armada.find((item) => item.slug === slug);
          if (!unit) notFound();

          const whatsapp = config.contact?.whatsapp ?? "";
          const name = capitalizeFirst(decodeHtml(unit.title));
          const label = capitalizeFirst(decodeHtml(unit.acf?.label ?? ""));
          const seats = capitalizeFirst(decodeHtml(unit.acf?.jumlah_penumpang ?? ""));
          const luggage = capitalizeFirst(decodeHtml(unit.acf?.koper ?? ""));
          const rawImageUrl = unit.featured_image?.url;
          const imageUrl = rawImageUrl
               ? rawImageUrl.replace(/^http:\/\//i, "https://")
               : undefined;

          const allIn = priceText(unit.acf?.harga_all_in);
          const nonAllIn = priceText(unit.acf?.harga_non_all_in);
          const lepasKunci = priceText(unit.acf?.harga);
          const bulanan = priceText(unit.acf?.harga_lepas_kunci_bulanan);
          const tahunan = priceText(unit.acf?.harga_lepas_kunci_tahunan);
          const tambahanDriver = priceText(unit.acf?.tambahan_driver);

          const lowest = formatRupiah(
               lowestPrice([
                    unit.acf?.harga,
                    unit.acf?.harga_all_in,
                    unit.acf?.harga_non_all_in,
               ]),
          );

          const description = (unit.acf?.deskripsi_unit ?? "")
               .split(/\r?\n\s*\r?\n/)
               .map((paragraph) => paragraph.trim())
               .filter(Boolean);

          const pkgAllIn = getPackage("all-in");
          const pkgNonAllIn = getPackage("non-all-in");
          const pkgLepasKunci = getPackage("lepas-kunci");

          // Layanan yang tampil: hanya yang harganya terisi.
          const services: {
               key: string;
               title: string;
               rows: { label: string; price: string }[];
               includes: readonly string[];
               excludes: readonly string[];
               note?: string;
          }[] = [];

          if (allIn) {
               services.push({
                    key: "all-in",
                    title: "Sewa Mobil All In",
                    rows: [{ label: "Per hari", price: allIn }],
                    includes: pkgAllIn?.includes ?? [],
                    excludes: [],
               });
          }
          if (nonAllIn) {
               services.push({
                    key: "non-all-in",
                    title: "Sewa Mobil Non All In",
                    rows: [{ label: "Per hari", price: nonAllIn }],
                    includes: pkgNonAllIn?.includes ?? [],
                    excludes: [],
               });
          }
          if (lepasKunci) {
               const rows = [{ label: "Per 12 jam", price: lepasKunci }];
               if (bulanan) rows.push({ label: "Per bulan", price: bulanan });
               if (tahunan) rows.push({ label: "Per tahun", price: tahunan });
               services.push({
                    key: "lepas-kunci",
                    title: "Sewa Mobil Lepas Kunci",
                    rows,
                    includes: pkgLepasKunci?.includes ?? [],
                    excludes: pkgLepasKunci?.excludes ?? [],
                    note: tambahanDriver
                         ? `Tambahan driver ${tambahanDriver} per hari. Rute dalam kota (Malang, Batu); luar kota tarifnya ditanyakan ke admin.`
                         : "Rute dalam kota (Malang, Batu); luar kota tarifnya ditanyakan ke admin.",
               });
          }

          // FAQ unit: dibangun dari data unit. Butir yang datanya kosong tidak dibuat.
          const faqs: UnitFaqItem[] = [];

          if (allIn || nonAllIn) {
               const parts: string[] = [];
               if (allIn) parts.push(`All In ${allIn} per hari`);
               if (nonAllIn) parts.push(`Non All In ${nonAllIn} per hari`);
               let answer = `Sewa ${name} dengan sopir: ${parts.join(", ")}.`;
               if (lepasKunci) {
                    answer += ` Tanpa sopir: Lepas Kunci ${lepasKunci} per 12 jam.`;
               }
               answer += " Tanyakan ketersediaan unit lewat WhatsApp.";
               faqs.push({ question: `Sewa ${name} 1 hari berapa?`, answer });
          }

          if (lepasKunci) {
               const parts = [`${lepasKunci} per 12 jam`];
               if (bulanan) parts.push(`${bulanan} per bulan`);
               if (tahunan) parts.push(`${tahunan} per tahun`);
               let answer = `Sewa ${name} lepas kunci: ${parts.join(", ")}. Penyewa membawa KTP dan SIM A yang masih berlaku.`;
               if (tambahanDriver) {
                    answer += ` Butuh sopir? Tambahan driver ${tambahanDriver} per hari.`;
               }
               faqs.push({ question: `Sewa ${name} lepas kunci berapa?`, answer });
          }

          if (allIn && nonAllIn && pkgAllIn && pkgNonAllIn) {
               faqs.push({
                    question: `Apa bedanya ${name} All In dan Non All In?`,
                    answer: `Keduanya dengan sopir per hari. All In (${allIn}) sudah termasuk ${joinList(pkgAllIn.includes).toLowerCase().replace("bbm", "BBM")}. Non All In (${nonAllIn}) sudah termasuk ${joinList(pkgNonAllIn.includes).toLowerCase().replace("bbm", "BBM")}.`,
               });
          }

          if (seats || luggage) {
               const parts: string[] = [];
               if (seats) parts.push(`Kapasitas ${name}: ${seats}.`);
               if (luggage) parts.push(`Bagasi: ${luggage}.`);
               faqs.push({
                    question: `Berapa penumpang dan koper ${name}?`,
                    answer: parts.join(" "),
               });
          }

          const others = armada
               .filter((item) => item.slug !== slug)
               .slice(0, OTHER_UNITS_LIMIT);

          const telephone = whatsapp
               ? whatsapp.startsWith("+")
                    ? whatsapp
                    : `+${whatsapp}`
               : undefined;

          const metaDescription = lowest
               ? `Sewa ${name} Malang mulai ${lowest}.`
               : `Sewa ${name} Malang.`;

          const serviceLd = {
               "@context": "https://schema.org",
               "@type": "Service",
               name: `Sewa ${name} Malang - Raincarnation`,
               serviceType: "Sewa mobil",
               description: metaDescription,
               url: `${siteConfig.url}/sewa-mobil/${slug}`,
               areaServed: [
                    { "@type": "AdministrativeArea", name: "Kota Malang" },
                    { "@type": "AdministrativeArea", name: "Kota Batu" },
                    { "@type": "AdministrativeArea", name: "Kota Surabaya" },
               ],
               provider: {
                    "@type": "LocalBusiness",
                    "@id": `${siteConfig.url}/#business`,
                    name: siteConfig.name,
                    image: `${siteConfig.url}/images/interior-armada.webp`,
                    telephone,
                    address: {
                         "@type": "PostalAddress",
                         addressLocality: "Batu",
                         addressRegion: "Jawa Timur",
                         addressCountry: "ID",
                    },
               },
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
                         name: "Sewa Mobil",
                         item: `${siteConfig.url}/sewa-mobil`,
                    },
                    {
                         "@type": "ListItem",
                         position: 3,
                         name,
                         item: `${siteConfig.url}/sewa-mobil/${slug}`,
                    },
               ],
          };

          const whatsappUrl = whatsapp
               ? buildWhatsAppUrl(
                    whatsapp,
                    `Halo Admin Raincarnation, saya tertarik menyewa ${name}. Mohon info ketersediaan dan tarifnya.`,
               )
               : null;

          return (
               <main className="w-full bg-surface">
                    <script
                         type="application/ld+json"
                         dangerouslySetInnerHTML={{
                              __html: JSON.stringify(serviceLd).replace(/</g, "\\u003c"),
                         }}
                    />
                    <script
                         type="application/ld+json"
                         dangerouslySetInnerHTML={{
                              __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c"),
                         }}
                    />

                    {/* 1. Hero unit */}
                    <section className="w-full bg-surface py-space-xl">
                         <div className="mx-auto grid max-w-6xl items-center gap-space-lg px-gutter md:grid-cols-2">
                              <div className="flex flex-col gap-space-sm">
                                   {label && (
                                        <span className="w-fit rounded-full bg-primary/10 px-3 py-1 font-label-sm text-xs font-bold uppercase tracking-wider text-primary">
                                             {label}
                                        </span>
                                   )}
                                   <h1 className="font-display text-headline-lg font-extrabold tracking-tight text-on-surface">
                                        Sewa {name} Malang
                                   </h1>
                                   <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
                                        Sewa {name} dengan titik sewa di Malang, Batu, dan Surabaya.
                                        Cek layanan dan harga di bawah, lalu pesan lewat WhatsApp.
                                   </p>

                                   {(seats || luggage) && (
                                        <div className="flex flex-wrap items-center gap-2">
                                             {seats && (
                                                  <div className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100/70 px-3 py-1.5 text-xs font-medium text-slate-700">
                                                       <Armchair size={15} className="shrink-0 text-slate-500" aria-hidden="true" />
                                                       <span>{seats}</span>
                                                  </div>
                                             )}
                                             {luggage && (
                                                  <div className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100/70 px-3 py-1.5 text-xs font-medium text-slate-700">
                                                       <Luggage size={15} className="shrink-0 text-slate-500" aria-hidden="true" />
                                                       <span>{luggage}</span>
                                                  </div>
                                             )}
                                        </div>
                                   )}

                                   {whatsappUrl && (
                                        <a
                                             href={whatsappUrl}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-space-md py-3 text-sm font-bold text-on-whatsapp shadow-sm transition-all hover:bg-whatsapp-hover active:scale-[0.98] sm:w-fit"
                                        >
                                             <MessageSquareText size={18} aria-hidden="true" />
                                             <span>Pesan {name} via WhatsApp</span>
                                        </a>
                                   )}
                              </div>

                              {imageUrl && (
                                   <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-container">
                                        <Image
                                             src={imageUrl}
                                             alt={unit.featured_image?.alt || name}
                                             fill
                                             priority
                                             sizes="(min-width: 768px) 50vw, 100vw"
                                             className="object-cover"
                                        />
                                   </div>
                              )}
                         </div>
                    </section>

                    {/* 2. Layanan dan harga */}
                    {services.length > 0 && (
                         <section className="w-full bg-surface pb-space-xl">
                              <div className="mx-auto flex max-w-6xl flex-col gap-space-md px-gutter">
                                   <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                                        Layanan dan Harga {name}
                                   </h2>
                                   <div className="grid gap-space-md md:grid-cols-2 lg:grid-cols-3">
                                        {services.map((service) => (
                                             <div
                                                  key={service.key}
                                                  className="flex flex-col gap-3 rounded-2xl border border-surface-container-high/60 bg-surface-container-lowest p-space-md shadow-sm"
                                             >
                                                  <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                                                       {service.title}
                                                  </h3>
                                                  <ul className="flex flex-col gap-1.5">
                                                       {service.rows.map((row) => (
                                                            <li
                                                                 key={row.label}
                                                                 className="flex items-baseline justify-between gap-3"
                                                            >
                                                                 <span className="text-xs text-on-surface-variant">
                                                                      {row.label}
                                                                 </span>
                                                                 <span className="text-base font-extrabold text-on-surface">
                                                                      {row.price}
                                                                 </span>
                                                            </li>
                                                       ))}
                                                  </ul>
                                                  {service.includes.length > 0 && (
                                                       <p className="text-xs leading-relaxed text-on-surface-variant">
                                                            <span className="font-semibold text-on-surface">
                                                                 Sudah termasuk:
                                                            </span>{" "}
                                                            {joinList(service.includes)}.
                                                       </p>
                                                  )}
                                                  {service.excludes.length > 0 && (
                                                       <p className="text-xs leading-relaxed text-on-surface-variant">
                                                            <span className="font-semibold text-on-surface">
                                                                 Belum termasuk:
                                                            </span>{" "}
                                                            {joinList(service.excludes)}.
                                                       </p>
                                                  )}
                                                  {service.note && (
                                                       <p className="text-xs leading-relaxed text-on-surface-variant">
                                                            {service.note}
                                                       </p>
                                                  )}
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </section>
                    )}

                    {/* 3. Deskripsi unit (dari CMS; kosong = tidak tampil) */}
                    {description.length > 0 && (
                         <section className="w-full bg-surface pb-space-xl">
                              <div className="mx-auto flex max-w-4xl flex-col gap-space-sm px-gutter">
                                   <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                                        Tentang {name}
                                   </h2>
                                   {description.map((paragraph, index) => (
                                        <p
                                             key={index}
                                             className="whitespace-pre-line font-body-md text-body-md leading-relaxed text-on-surface-variant"
                                        >
                                             {paragraph}
                                        </p>
                                   ))}
                              </div>
                         </section>
                    )}

                    {/* 4. Tautan ke form simulasi di /sewa-mobil */}
                    <section className="w-full bg-surface pb-space-xl">
                         <div className="mx-auto max-w-4xl px-gutter">
                              <div className="flex flex-col items-start gap-3 rounded-2xl border border-primary/20 bg-surface-container p-space-md md:flex-row md:items-center md:justify-between">
                                   <p className="font-body-md text-body-md text-on-surface">
                                        Ingin hitung estimasi tarif sesuai tanggal, rute, dan durasi?
                                   </p>
                                   <Link
                                        href="/sewa-mobil#simulasi-carter"
                                        className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-space-md py-2 font-label-md text-label-md font-bold text-on-primary transition-colors hover:opacity-90"
                                   >
                                        Cek tarif lengkap
                                        <ChevronRight size={16} aria-hidden="true" />
                                   </Link>
                              </div>
                         </div>
                    </section>

                    {/* 5. FAQ unit */}
                    <SewaMobilUnitFaq unitName={name} faqs={faqs} />

                    {/* 6. Unit lain + tautan balik */}
                    <section className="w-full bg-surface pb-space-xl">
                         <div className="mx-auto flex max-w-6xl flex-col gap-space-md px-gutter">
                              {others.length > 0 && (
                                   <>
                                        <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                                             Unit Sewa Mobil Lainnya
                                        </h2>
                                        <div className="grid gap-space-md md:grid-cols-2 lg:grid-cols-3">
                                             {others.map((item) => (
                                                  <ArmadaCard
                                                       key={item.id}
                                                       item={item}
                                                       whatsapp={whatsapp}
                                                       imageSizes={OTHER_IMAGE_SIZES}
                                                  />
                                             ))}
                                        </div>
                                   </>
                              )}
                              <Link
                                   href="/sewa-mobil"
                                   className="inline-flex w-fit items-center gap-2 text-sm font-bold text-primary hover:underline"
                              >
                                   <ChevronRight className="h-4 w-4 rotate-180" aria-hidden="true" />
                                   Kembali ke Sewa Mobil
                              </Link>
                         </div>
                    </section>
               </main>
          );
     }