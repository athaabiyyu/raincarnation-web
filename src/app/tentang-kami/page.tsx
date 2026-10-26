import type { Metadata } from "next";
import Image from "next/image";
import {
     BadgeCheck,
     Building2,
     Car,
     CheckCircle2,
     Clock,
     Compass,
     Headset,
     HeartPulse,
     Home,
     IdCard,
     MessageSquare,
     MessageSquareText,
     ReceiptText,
     Route,
     Shield,
     Star,
     Users,
     Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CtaBanner from "@/components/sections/CtaBanner";
import { siteConfig } from "@/config/site";
import {
     tentangKamiCompany,
     tentangKamiHero,
     tentangKamiMeta,
     tentangKamiStats,
     tentangKamiStory,
     tentangKamiValues,
} from "@/constants/tentang-kami";
import type { TentangKamiIcon } from "@/constants/tentang-kami";
import { getSiteConfig } from "@/lib/wordpress/config";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

export const metadata: Metadata = {
     title: tentangKamiMeta.title,
     description: tentangKamiMeta.description,
     alternates: { canonical: "/tentang-kami" },
     openGraph: {
          type: "website",
          locale: "id_ID",
          siteName: siteConfig.name,
          url: "/tentang-kami",
          title: tentangKamiMeta.title,
          description: tentangKamiMeta.description,
          images: [
               { url: "/images/interior-armada.webp", alt: tentangKamiMeta.ogAlt },
          ],
     },
     // SEMENTARA: hapus baris robots ini saat isi halaman sudah dikonfirmasi bos.
     robots: { index: false, follow: true },
};

const icons: Record<TentangKamiIcon, LucideIcon> = {
     users: Users,
     route: Route,
     clock: Clock,
     headset: Headset,
     shield: Shield,
     receipt: ReceiptText,
     home: Home,
     message: MessageSquare,
     badge: BadgeCheck,
     heart: HeartPulse,
     wallet: Wallet,
     building: Building2,
     car: Car,
     idcard: IdCard,
};

function Icon({ name, size = 22 }: { name: TentangKamiIcon; size?: number }) {
     const Component = icons[name];
     return <Component size={size} aria-hidden="true" />;
}

const eyebrowClass =
     "font-label-md text-label-md font-bold uppercase tracking-widest text-primary";

const waButtonClass =
     "inline-flex items-center justify-center gap-space-sm rounded-lg bg-whatsapp px-space-md py-space-md font-label-lg text-label-lg text-on-whatsapp shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all duration-150 hover:bg-whatsapp-hover";

export default async function TentangKamiPage() {
     const config = await getSiteConfig();
     const whatsapp = config.contact?.whatsapp ?? "";
     const hero = tentangKamiHero;
     const story = tentangKamiStory;
     const company = tentangKamiCompany;

     const aboutJsonLd = {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: tentangKamiMeta.title,
          description: tentangKamiMeta.description,
          url: `${siteConfig.url}/tentang-kami`,
          inLanguage: "id-ID",
          about: { "@id": `${siteConfig.url}/#business` },
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
                    name: "Tentang Kami",
                    item: `${siteConfig.url}/tentang-kami`,
               },
          ],
     };

     return (
          <main className="w-full bg-surface">
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(aboutJsonLd).replace(/</g, "\\u003c"),
                    }}
               />
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                         __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
                    }}
               />
               {/* Hero */}
               <section className="w-full bg-surface-container-low py-space-xl">
                    <div className="mx-auto grid max-w-6xl items-center gap-space-xl px-gutter lg:grid-cols-12">
                         <div className="space-y-space-md lg:col-span-7">
                              <div className="inline-flex items-center gap-2 rounded-full bg-surface-container px-space-md py-1.5 font-label-md text-label-md text-primary">
                                   <span className="h-2 w-2 rounded-full bg-primary-container" />
                                   {hero.badge}
                              </div>
                              <h1 className="font-display text-display font-extrabold tracking-tight text-on-surface">
                                   {hero.titleStart}
                                   <span className="text-primary-container">
                                        {hero.titleHighlight}
                                   </span>
                                   {hero.titleEnd}
                              </h1>
                              <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
                                   {hero.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-space-md pt-2">
                                   {whatsapp && (
                                        <a
                                             href={buildWhatsAppUrl(whatsapp, hero.whatsappMessage)}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className={waButtonClass}
                                        >
                                             <MessageSquareText size={20} aria-hidden="true" />
                                             {hero.whatsappLabel}
                                        </a>
                                   )}
                                   <a
                                        href="#kisah"
                                        className="inline-flex items-center gap-2 rounded-lg bg-surface-container px-space-md py-space-md font-label-lg text-label-lg text-secondary transition-colors hover:bg-surface-container-high"
                                   >
                                        <Compass size={20} aria-hidden="true" />
                                        {hero.philosophyLabel}
                                   </a>
                              </div>
                              <ul className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-3">
                                   {hero.badges.map((item) => (
                                        <li
                                             key={item.label}
                                             className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant"
                                        >
                                             <span className="text-primary-container">
                                                  <Icon name={item.icon} size={20} />
                                             </span>
                                             {item.label}
                                        </li>
                                   ))}
                              </ul>
                         </div>

                         <div className="lg:col-span-5">
                              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-container-high shadow-xl">
                                   <Image
                                        src={hero.image.src}
                                        alt={hero.image.alt}
                                        fill
                                        priority
                                        sizes="(min-width: 1024px) 40vw, 100vw"
                                        className="object-cover"
                                   />
                                   <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/30 to-transparent" />
                                   <span className="absolute left-space-md top-space-md rounded-full bg-surface-container-lowest/90 px-3 py-1 font-label-sm text-label-sm text-primary">
                                        {hero.image.tag}
                                   </span>
                                   <div className="absolute inset-x-space-md bottom-space-md space-y-1 text-on-primary">
                                        <div className="flex items-center gap-1 text-tertiary-fixed">
                                             {[0, 1, 2, 3, 4].map((i) => (
                                                  <Star key={i} size={16} fill="currentColor" aria-hidden="true" />
                                             ))}
                                             <span className="ml-1 font-label-md text-label-md text-on-primary">
                                                  {hero.image.rating}
                                             </span>
                                        </div>
                                        <p className="font-headline-sm text-headline-sm font-bold">
                                             {hero.image.title}
                                        </p>
                                        <p className="font-body-sm text-body-sm text-on-primary/80">
                                             {hero.image.description}
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>

               {/* Angka */}
               <section className="w-full bg-surface-container-lowest py-space-xl">
                    <div className="mx-auto max-w-6xl px-gutter">
                         <div className="mx-auto mb-space-lg max-w-xl space-y-1 text-center">
                              <p className={eyebrowClass}>{tentangKamiStats.eyebrow}</p>
                              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                                   {tentangKamiStats.title}
                              </h2>
                         </div>
                         <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-4">
                              {tentangKamiStats.items.map((item) => (
                                   <div
                                        key={item.label}
                                        className="flex flex-col gap-2 rounded-2xl bg-surface-container-low p-space-lg shadow-sm"
                                   >
                                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container/15 text-primary-container">
                                             <Icon name={item.icon} size={26} />
                                        </span>
                                        <p className="font-display text-display font-extrabold leading-none text-primary">
                                             {item.value}
                                        </p>
                                        <h3 className="font-label-lg text-label-lg font-bold text-on-surface">
                                             {item.label}
                                        </h3>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                                             {item.description}
                                        </p>
                                   </div>
                              ))}
                         </div>
                    </div>
               </section>

               {/* Kisah */}
               <section id="kisah" className="w-full scroll-mt-32 bg-surface py-space-xl">
                    <div className="mx-auto grid max-w-6xl items-center gap-space-xl px-gutter lg:grid-cols-2">
                         <div className="grid grid-cols-2 gap-space-md">
                              <div className="space-y-space-md">
                                   <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md">
                                        <Image
                                             src={story.image.src}
                                             alt={story.image.alt}
                                             fill
                                             sizes="(min-width: 1024px) 20vw, 45vw"
                                             className="object-cover"
                                        />
                                   </div>
                                   <div className="rounded-2xl bg-surface-container-high p-space-md">
                                        <p className="font-headline-sm text-headline-sm font-bold text-primary">
                                             {story.highlights[0].title}
                                        </p>
                                        <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                                             {story.highlights[0].description}
                                        </p>
                                   </div>
                              </div>
                              <div className="space-y-space-md pt-6">
                                   <div className="rounded-2xl bg-primary-container p-space-md text-on-primary">
                                        <p className="font-headline-sm text-headline-sm font-bold">
                                             {story.highlights[1].title}
                                        </p>
                                        <p className="mt-1 font-body-sm text-body-sm text-on-primary/90">
                                             {story.highlights[1].description}
                                        </p>
                                   </div>
                                   <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md">
                                        <Image
                                             src={story.image.src}
                                             alt=""
                                             fill
                                             sizes="(min-width: 1024px) 20vw, 45vw"
                                             className="object-cover object-right"
                                        />
                                   </div>
                              </div>
                         </div>

                         <div className="space-y-space-md">
                              <p className={eyebrowClass}>{story.eyebrow}</p>
                              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                                   {story.title}
                              </h2>
                              <div className="space-y-4 font-body-md text-body-md text-on-surface-variant">
                                   {story.paragraphs.map((text) => (
                                        <p key={text}>{text}</p>
                                   ))}
                              </div>
                              <ul className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                                   {story.bullets.map((text) => (
                                        <li key={text} className="flex items-start gap-2.5">
                                             <span className="shrink-0 text-primary-container">
                                                  <CheckCircle2 size={22} aria-hidden="true" />
                                             </span>
                                             <span className="font-label-md text-label-md text-on-surface">
                                                  {text}
                                             </span>
                                        </li>
                                   ))}
                              </ul>
                         </div>
                    </div>
               </section>

               {/* 4 pilar */}
               <section className="w-full bg-surface-container-low py-space-xl">
                    <div className="mx-auto max-w-6xl px-gutter">
                         <div className="mb-space-lg flex flex-col justify-between gap-space-md md:flex-row md:items-end">
                              <div className="max-w-xl space-y-1">
                                   <p className={eyebrowClass}>{tentangKamiValues.eyebrow}</p>
                                   <h2 className="font-headline-lg text-headline-lg text-on-surface">
                                        {tentangKamiValues.title}
                                   </h2>
                              </div>
                              <p className="max-w-md font-body-md text-body-md text-on-surface-variant">
                                   {tentangKamiValues.description}
                              </p>
                         </div>
                         <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
                              {tentangKamiValues.items.map((item, index) => (
                                   <div
                                        key={item.title}
                                        className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm"
                                   >
                                        <div className="space-y-space-sm">
                                             <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container text-on-primary shadow-sm">
                                                  <Icon name={item.icon} size={26} />
                                             </span>
                                             <h3 className="font-headline-md text-headline-md text-on-surface">
                                                  {index + 1}. {item.title}
                                             </h3>
                                             <p className="font-body-md text-body-md text-on-surface-variant">
                                                  {item.description}
                                             </p>
                                        </div>
                                        <p className="pt-space-md font-label-md text-label-md text-primary">
                                             {item.footer}
                                        </p>
                                   </div>
                              ))}
                         </div>
                    </div>
               </section>

               {/* Profil perusahaan */}
               <section className="w-full bg-surface-container-lowest py-space-xl">
                    <div className="mx-auto max-w-6xl px-gutter">
                         <div className="grid items-center gap-space-xl rounded-3xl bg-surface-container p-space-lg lg:grid-cols-12 lg:p-space-xl">
                              <div className="space-y-space-md lg:col-span-7">
                                   <div className="inline-flex items-center gap-2 rounded-full bg-surface-container-lowest px-space-md py-1 font-label-sm text-label-sm text-primary">
                                        <Building2 size={18} aria-hidden="true" />
                                        {company.badge}
                                   </div>
                                   <h2 className="font-headline-lg text-headline-lg text-on-surface">
                                        {company.title}
                                   </h2>
                                   <p className="font-body-md text-body-md text-on-surface-variant">
                                        {company.description}
                                   </p>
                                   <div className="grid grid-cols-1 gap-space-md pt-2 sm:grid-cols-2">
                                        {company.items.map((item) => (
                                             <div
                                                  key={item.title}
                                                  className="flex items-start gap-3 rounded-xl bg-surface-container-lowest p-space-md shadow-sm"
                                             >
                                                  <span className="rounded-lg bg-primary-fixed/40 p-2 text-primary">
                                                       <Icon name={item.icon} />
                                                  </span>
                                                  <div>
                                                       <h3 className="font-label-md text-label-md font-bold text-on-surface">
                                                            {item.title}
                                                       </h3>
                                                       <p className="font-body-sm text-body-sm text-on-surface-variant">
                                                            {item.description}
                                                       </p>
                                                  </div>
                                             </div>
                                        ))}
                                   </div>
                              </div>

                              <div className="lg:col-span-5">
                                   <div className="space-y-space-md rounded-2xl bg-surface-container-lowest p-space-lg shadow-md">
                                        <div className="flex items-center gap-3">
                                             <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container text-on-primary">
                                                  <Car size={28} aria-hidden="true" />
                                             </span>
                                             <div>
                                                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                                       {company.summary.title}
                                                  </h3>
                                                  <p className="font-label-sm text-label-sm text-outline">
                                                       {company.summary.subtitle}
                                                  </p>
                                             </div>
                                        </div>
                                        <dl className="space-y-2 font-body-sm text-body-sm">
                                             {company.summary.rows.map((row) => (
                                                  <div
                                                       key={row.label}
                                                       className="flex items-start justify-between gap-space-md py-1.5"
                                                  >
                                                       <dt className="text-outline">{row.label}:</dt>
                                                       <dd className="text-right font-bold text-on-surface">
                                                            {row.value}
                                                       </dd>
                                                  </div>
                                             ))}
                                        </dl>
                                        {whatsapp && (
                                             <div className="space-y-space-sm rounded-xl bg-surface-container-low p-space-md">
                                                  <p className="font-label-sm text-label-sm text-outline">
                                                       {company.summary.contactLabel}
                                                  </p>
                                                  <a
                                                       href={buildWhatsAppUrl(
                                                            whatsapp,
                                                            company.summary.contactMessage,
                                                       )}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className={`${waButtonClass} w-full`}
                                                  >
                                                       <MessageSquareText size={20} aria-hidden="true" />
                                                       {company.summary.contactButton}
                                                  </a>
                                             </div>
                                        )}
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>

               {whatsapp && <CtaBanner whatsapp={whatsapp} />}
          </main>
     );
}