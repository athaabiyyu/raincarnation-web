import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CarFront, MessageSquareText } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
     blogArticles,
     blogCta,
     blogFeatured,
     blogHero,
     blogMeta,
     blogSidebar,
} from "@/constants/blog";
import { getSiteConfig } from "@/lib/wordpress/config";
import { getRoutes } from "@/lib/wordpress/routes";
import type { Route } from "@/types/route";
import { capitalizeFirst } from "@/utils/capitalize-first";
import { decodeHtml } from "@/utils/decode-html";
import { formatPrice } from "@/utils/format-price";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

export const metadata: Metadata = {
     title: blogMeta.title,
     description: blogMeta.description,
     alternates: { canonical: "/blog" },
     openGraph: {
          type: "website",
          locale: "id_ID",
          siteName: siteConfig.name,
          url: "/blog",
          title: blogMeta.title,
          description: blogMeta.description,
          images: [{ url: "/images/interior-armada.webp", alt: blogMeta.ogAlt }],
     },
     // SEMENTARA: hapus baris robots ini saat artikel asli dari CMS sudah ada.
     robots: { index: false, follow: true },
};

async function loadRoutes(): Promise<Route[]> {
     try {
          return await getRoutes();
     } catch (error) {
          console.error("[BlogPage] Gagal mengambil rute dari CMS:", error);
          return [];
     }
}

const eyebrowClass =
     "font-label-md text-label-md font-bold uppercase tracking-widest text-primary";

const waButtonClass =
     "inline-flex items-center justify-center gap-space-sm rounded-lg bg-whatsapp px-space-md py-space-md font-label-lg text-label-lg text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all duration-150 hover:bg-whatsapp-hover";

export default async function BlogPage() {
     const [config, routes] = await Promise.all([getSiteConfig(), loadRoutes()]);
     const whatsapp = config.contact?.whatsapp ?? "";
     const sidebar = blogSidebar;
     const featured = blogFeatured;

     // Tarif asli dari CMS: empat rute pertama yang punya tarif.
     const tariffRoutes = routes
          .filter((route) => route.slug && Number(route.acf?.tarif) > 0)
          .slice(0, 4);

     return (
          <main className="w-full bg-surface">
               {/* Hero */}
               <section className="w-full py-space-xl">
                    <div className="mx-auto max-w-6xl space-y-space-md px-gutter">
                         <div className="inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1 font-label-sm text-label-sm text-primary">
                              <BookOpen size={16} aria-hidden="true" />
                              {blogHero.badge}
                         </div>
                         <h1 className="max-w-3xl font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                              {blogHero.title}
                         </h1>
                         <p className="max-w-2xl font-body-md text-body-md text-on-surface-variant">
                              {blogHero.description}
                         </p>
                         <ul className="flex flex-wrap gap-2 pt-2">
                              {blogHero.categories.map((label, index) => (
                                   <li
                                        key={label}
                                        className={
                                             index === 0
                                                  ? "rounded-full bg-primary-container px-4 py-2 font-label-md text-label-md text-on-primary shadow-sm"
                                                  : "rounded-full bg-surface-container px-4 py-2 font-label-md text-label-md text-on-surface-variant"
                                        }
                                   >
                                        {label}
                                   </li>
                              ))}
                         </ul>
                    </div>
               </section>

               {/* Artikel unggulan */}
               <section className="w-full pb-space-xl">
                    <div className="mx-auto max-w-6xl px-gutter">
                         <div className="grid overflow-hidden rounded-2xl bg-surface-container-lowest shadow-md lg:grid-cols-12">
                              <div className="relative min-h-[260px] lg:col-span-7 lg:min-h-[400px]">
                                   <Image
                                        src={featured.image.src}
                                        alt={featured.image.alt}
                                        fill
                                        priority
                                        sizes="(min-width: 1024px) 55vw, 100vw"
                                        className="object-cover"
                                   />
                                   <div className="absolute left-4 top-4 flex items-center gap-2">
                                        <span className="rounded-full bg-primary-container px-3 py-1 font-label-sm text-label-sm font-bold text-on-primary shadow-md">
                                             {featured.badge}
                                        </span>
                                        <span className="rounded-full bg-surface-container-lowest/90 px-3 py-1 font-label-sm text-label-sm font-bold text-secondary">
                                             {featured.category}
                                        </span>
                                   </div>
                              </div>
                              <div className="flex flex-col justify-between gap-space-md p-space-lg lg:col-span-5 lg:p-space-xl">
                                   <div className="space-y-space-sm">
                                        <h2 className="font-headline-md text-headline-md font-bold leading-tight text-on-surface">
                                             {featured.title}
                                        </h2>
                                        <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                                             {featured.excerpt}
                                        </p>
                                        <ul className="flex flex-wrap gap-2 pt-2">
                                             {featured.tags.map((tag) => (
                                                  <li
                                                       key={tag}
                                                       className="rounded-md bg-surface-container px-2.5 py-1 font-label-sm text-label-sm text-secondary"
                                                  >
                                                       {tag}
                                                  </li>
                                             ))}
                                        </ul>
                                   </div>
                                   {whatsapp && (
                                        <a
                                             href={buildWhatsAppUrl(whatsapp, featured.whatsappMessage)}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 font-label-md text-label-md text-on-primary shadow-sm transition-all hover:bg-on-primary-fixed-variant"
                                        >
                                             {featured.buttonLabel}
                                             <ArrowRight size={18} aria-hidden="true" />
                                        </a>
                                   )}
                              </div>
                         </div>
                    </div>
               </section>

               {/* Daftar artikel + sidebar */}
               <section className="w-full pb-space-xl">
                    <div className="mx-auto grid max-w-6xl gap-space-lg px-gutter lg:grid-cols-12">
                         <div className="space-y-space-lg lg:col-span-8">
                              <div className="flex items-center justify-between gap-space-md">
                                   <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                        {blogArticles.title}
                                   </h2>
                                   <span className="font-label-sm text-label-sm text-outline">
                                        {blogArticles.previewNote}
                                   </span>
                              </div>
                              <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
                                   {blogArticles.items.map((item) => (
                                        <article
                                             key={item.title}
                                             className="flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm"
                                        >
                                             <div className="relative h-44 w-full">
                                                  <Image
                                                       src="/images/interior-armada.webp"
                                                       alt=""
                                                       fill
                                                       sizes="(min-width: 768px) 30vw, 100vw"
                                                       className="object-cover"
                                                  />
                                                  <span className="absolute left-3 top-3 rounded bg-surface-container-lowest/90 px-2.5 py-1 font-label-sm text-label-sm font-bold text-primary">
                                                       {item.category}
                                                  </span>
                                             </div>
                                             <div className="flex flex-1 flex-col gap-2 p-space-md">
                                                  <h3 className="line-clamp-3 font-headline-sm text-headline-sm font-bold text-on-surface">
                                                       {item.title}
                                                  </h3>
                                                  <p className="line-clamp-3 font-body-sm text-body-sm text-on-surface-variant">
                                                       {item.excerpt}
                                                  </p>
                                             </div>
                                        </article>
                                   ))}
                              </div>
                         </div>

                         <aside className="space-y-space-lg lg:col-span-4">
                              {/* WhatsApp */}
                              {whatsapp && (
                                   <div className="space-y-space-md rounded-2xl bg-primary-container p-space-lg text-on-primary shadow-lg">
                                        <div>
                                             <p className="font-label-sm text-label-sm uppercase tracking-wider text-surface-container-highest">
                                                  {sidebar.whatsapp.eyebrow}
                                             </p>
                                             <h3 className="font-headline-sm text-headline-sm font-bold">
                                                  {sidebar.whatsapp.title}
                                             </h3>
                                        </div>
                                        <p className="font-body-sm text-body-sm leading-relaxed">
                                             {sidebar.whatsapp.description}
                                        </p>
                                        <a
                                             href={buildWhatsAppUrl(whatsapp, sidebar.whatsapp.message)}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className="flex w-full items-center justify-center gap-2 rounded-xl bg-surface-container-lowest px-space-md py-3 font-label-lg text-label-lg font-bold text-primary shadow-md transition-all hover:bg-surface-container-low"
                                        >
                                             <MessageSquareText size={20} aria-hidden="true" />
                                             {sidebar.whatsapp.button}
                                        </a>
                                   </div>
                              )}

                              {/* Tarif dari CMS */}
                              {tariffRoutes.length > 0 && (
                                   <div className="space-y-space-sm rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm">
                                        <div className="flex items-center justify-between pb-2">
                                             <h3 className="font-label-lg text-label-lg font-bold text-on-surface">
                                                  {sidebar.tariff.title}
                                             </h3>
                                             <span className="font-label-sm text-label-sm font-bold text-primary">
                                                  {sidebar.tariff.subtitle}
                                             </span>
                                        </div>
                                        <ul className="flex flex-col gap-2.5">
                                             {tariffRoutes.map((route) => (
                                                  <li key={route.id}>
                                                       <Link
                                                            href={`/rute/${route.slug}`}
                                                            className="flex items-center justify-between gap-space-sm rounded-xl bg-surface-container-low p-2.5 transition-colors hover:bg-surface-container"
                                                       >
                                                            <span className="font-label-md text-label-md font-bold text-on-surface">
                                                                 {capitalizeFirst(decodeHtml(route.title))}
                                                            </span>
                                                            <span className="shrink-0 font-label-md text-label-md font-extrabold text-primary">
                                                                 {formatPrice(String(route.acf?.tarif))}
                                                            </span>
                                                       </Link>
                                                  </li>
                                             ))}
                                        </ul>
                                        <Link
                                             href={sidebar.tariff.linkHref}
                                             className="block pt-2 text-center font-label-sm text-label-sm font-bold text-primary hover:underline"
                                        >
                                             {sidebar.tariff.linkLabel} →
                                        </Link>
                                   </div>
                              )}

                              {/* FAQ */}
                              <div className="space-y-space-sm rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm">
                                   <h3 className="font-label-lg text-label-lg font-bold text-on-surface">
                                        {sidebar.faq.title}
                                   </h3>
                                   <div className="flex flex-col gap-2">
                                        {sidebar.faq.items.map((item) => (
                                             <details
                                                  key={item.question}
                                                  className="rounded-xl bg-surface-container-low p-3"
                                             >
                                                  <summary className="cursor-pointer font-label-md text-label-md font-bold text-on-surface">
                                                       {item.question}
                                                  </summary>
                                                  <p className="pt-2 font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                                                       {item.answer}
                                                  </p>
                                             </details>
                                        ))}
                                   </div>
                              </div>
                         </aside>
                    </div>
               </section>

               {/* CTA sewa mobil */}
               <section className="w-full bg-surface-container-highest py-space-xl">
                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-space-lg px-gutter md:flex-row">
                         <div className="flex items-center gap-space-md">
                              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-container text-on-primary shadow-md">
                                   <CarFront size={30} aria-hidden="true" />
                              </span>
                              <div>
                                   <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                        {blogCta.title}
                                   </h2>
                                   <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        {blogCta.description}
                                   </p>
                              </div>
                         </div>
                         <Link
                              href={blogCta.href}
                              className="shrink-0 rounded-xl bg-primary-container px-space-lg py-3.5 font-label-lg text-label-lg font-bold text-on-primary shadow-md transition-all hover:bg-primary"
                         >
                              {blogCta.button}
                         </Link>
                    </div>
               </section>
          </main>
     );
}