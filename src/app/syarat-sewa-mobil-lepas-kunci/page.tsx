import type { Metadata } from "next";
import CtaBanner from "@/components/sections/CtaBanner";
import SyaratLepasKunciHero from "@/components/sections/SyaratLepasKunciHero";
import SyaratSectionCard from "@/components/sections/SyaratSectionCard";
import { siteConfig } from "@/config/site";
import {
     syaratLepasKunciHero,
     syaratLepasKunciMeta,
     syaratLepasKunciSections,
} from "@/constants/syarat-lepas-kunci";
import { getSiteConfig } from "@/lib/wordpress/config";

const path = "/syarat-sewa-mobil-lepas-kunci";

export const metadata: Metadata = {
     title: syaratLepasKunciMeta.title,
     description: syaratLepasKunciMeta.description,
     alternates: { canonical: path },
     openGraph: {
          type: "website",
          locale: "id_ID",
          siteName: siteConfig.name,
          url: path,
          title: syaratLepasKunciMeta.title,
          description: syaratLepasKunciMeta.description,
          images: [
               {
                    url: "/images/og-sewa-mobil.jpg",
                    width: 1200,
                    height: 670,
                    alt: syaratLepasKunciMeta.ogAlt,
               },
          ],
     },
};

const eyebrowClass =
     "font-label-md text-label-md font-bold uppercase tracking-widest text-primary";

export default async function SyaratSewaMobilLepasKunciPage() {
     const config = await getSiteConfig();
     const whatsapp = config.contact?.whatsapp ?? "";
     const hero = syaratLepasKunciHero;
     const sections = syaratLepasKunciSections;

     const pageJsonLd = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: syaratLepasKunciMeta.title,
          description: syaratLepasKunciMeta.description,
          url: `${siteConfig.url}${path}`,
          inLanguage: "id-ID",
     };

     const breadcrumbJsonLd = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
               {
                    "@type": "ListItem",
                    position: 1,
                    name: "Beranda",
                    item: `${siteConfig.url}/`,
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
                    name: "Syarat Sewa Mobil Lepas Kunci",
                    item: `${siteConfig.url}${path}`,
               },
          ],
     };

     return (
          <main className="w-full bg-surface">
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(pageJsonLd).replace(/</g, "\\u003c"),
                    }}
               />
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
                    }}
               />

               {/* Hero Section */}
               <SyaratLepasKunciHero hero={hero} whatsapp={whatsapp} />

               {/* Content Sections */}
               <section id="daftar-isi" className="w-full bg-surface py-space-xl">
                    <div className="mx-auto max-w-4xl space-y-space-xl px-gutter">
                         {/* Navigation / Daftar Isi */}
                         <nav
                              aria-label="Daftar isi"
                              className="space-y-space-sm rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm"
                         >
                              <p className={eyebrowClass}>Daftar Isi</p>
                              <ol className="list-decimal space-y-1 pl-6 font-body-md text-body-md text-primary">
                                   {sections.map((section) => (
                                        <li key={section.id}>
                                             <a
                                                  href={`#${section.id}`}
                                                  className="underline underline-offset-4 transition-colors hover:text-primary-container"
                                             >
                                                  {section.heading}
                                             </a>
                                        </li>
                                   ))}
                              </ol>
                         </nav>

                         {/* Render Tiap Section Menggunakan SyaratSectionCard */}
                         {sections.map((section, idx) => (
                              <SyaratSectionCard
                                   key={section.id}
                                   section={section}
                                   sectionIndex={idx}
                              />
                         ))}
                    </div>
               </section>

               {whatsapp && <CtaBanner whatsapp={whatsapp} />}
          </main>
     );
}