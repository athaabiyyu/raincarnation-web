import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArmadaCard from "@/components/sections/ArmadaCard";
import SewaMobilUnitHero from "@/components/sections/SewaMobilUnitHero";
import SewaMobilUnitServices, {
     type UnitService,
} from "@/components/sections/SewaMobilUnitServices";
import SewaMobilUnitFaq, {
     type UnitFaqItem,
} from "@/components/sections/SewaMobilUnitFaq";
import SewaMobilUnitAbout from "@/components/sections/SewaMobilUnitAbout";
import SewaMobilUnitOthers from "@/components/sections/SewaMobilUnitOthers";
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

     const aboutHtml = (unit.content ?? "").trim();

     const pkgAllIn = getPackage("all-in");
     const pkgNonAllIn = getPackage("non-all-in");
     const pkgLepasKunci = getPackage("lepas-kunci");

     const services: UnitService[] = [];

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
               <SewaMobilUnitHero
                    name={name}
                    label={label}
                    seats={seats}
                    luggage={luggage}
                    imageUrl={imageUrl}
                    imageAlt={unit.featured_image?.alt}
                    whatsappUrl={whatsappUrl}
               />

               {/* 2. Layanan dan harga (+ tautan simulasi) */}
               <SewaMobilUnitServices
                    name={name}
                    services={services}
                    whatsapp={whatsapp}
               />

               {/* 3. Deskripsi unit */}
                     <SewaMobilUnitAbout name={name} html={aboutHtml} />

               {/* 4. FAQ unit */}
               <SewaMobilUnitFaq unitName={name} faqs={faqs} />

               {/* 5. Unit lain + tautan balik */}
               <SewaMobilUnitOthers
                    others={others}
                    whatsapp={whatsapp}
                    imageSizes={OTHER_IMAGE_SIZES}
               />
          </main>
     );
}