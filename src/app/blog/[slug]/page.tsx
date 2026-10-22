import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getPosts } from "@/lib/wordpress/posts";
import type { Post } from "@/types/post";
import { decodeHtml } from "@/utils/decode-html";

type PageProps = {
     params: Promise<{ slug: string }>;
};

const FALLBACK_IMAGE = "/images/interior-armada.webp";

async function loadPosts(): Promise<Post[]> {
     try {
          return await getPosts();
     } catch (error) {
          console.error("[BlogDetail] Gagal mengambil artikel dari CMS:", error);
          return [];
     }
}

function postImage(post: Post): string {
     const raw = post.featured_image?.url;
     return raw ? raw.replace(/^http:\/\//i, "https://") : FALLBACK_IMAGE;
}

function formatDate(value?: string): string {
     if (!value) return "";
     const date = new Date(value);
     if (Number.isNaN(date.getTime())) return "";
     return date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "Asia/Jakarta",
     });
}

export async function generateStaticParams() {
     const posts = await loadPosts();
     return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
     const { slug } = await params;
     const posts = await loadPosts();
     const post = posts.find((item) => item.slug === slug);
     if (!post) return {};

     const title = decodeHtml(post.title);
     const description = post.excerpt ? decodeHtml(post.excerpt) : undefined;
     const image = postImage(post);

     return {
          title,
          description,
          alternates: { canonical: `/blog/${post.slug}` },
          openGraph: {
               type: "article",
               locale: "id_ID",
               siteName: siteConfig.name,
               url: `/blog/${post.slug}`,
               title,
               description,
               publishedTime: post.date,
               modifiedTime: post.modified,
               images: [{ url: image, alt: post.featured_image?.alt || title }],
          },
          // SEMENTARA: hapus baris robots ini saat artikel asli siap diindeks.
          robots: { index: false, follow: true },
     };
}

const contentClass =
     "font-body-md text-body-md leading-relaxed text-on-surface-variant " +
     "[&_h2]:mb-space-sm [&_h2]:mt-space-lg [&_h2]:font-headline-sm [&_h2]:text-headline-sm [&_h2]:font-bold [&_h2]:text-on-surface " +
     "[&_h3]:mb-space-sm [&_h3]:mt-space-md [&_h3]:font-label-lg [&_h3]:text-label-lg [&_h3]:font-bold [&_h3]:text-on-surface " +
     "[&_p]:mb-space-md [&_ul]:mb-space-md [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-space-md [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 " +
     "[&_a]:font-bold [&_a]:text-primary [&_a]:underline [&_strong]:text-on-surface";

export default async function BlogDetailPage({ params }: PageProps) {
     const { slug } = await params;
     const posts = await loadPosts();
     const post = posts.find((item) => item.slug === slug);
     if (!post) notFound();

     const title = decodeHtml(post.title);
     const category = decodeHtml(post.categories?.[0]?.name ?? "");
     const dateLabel = formatDate(post.date);
     const image = postImage(post);
     const businessId = `${siteConfig.url}/#business`;

     const articleJsonLd = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description: post.excerpt ? decodeHtml(post.excerpt) : undefined,
          image: [image],
          datePublished: post.date,
          dateModified: post.modified ?? post.date,
          mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
          author: {
               "@type": "LocalBusiness",
               "@id": businessId,
               name: siteConfig.name,
          },
          publisher: {
               "@type": "LocalBusiness",
               "@id": businessId,
               name: siteConfig.name,
          },
     };

     const breadcrumbJsonLd = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
               { "@type": "ListItem", position: 1, name: "Beranda", item: siteConfig.url },
               { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
               {
                    "@type": "ListItem",
                    position: 3,
                    name: title,
                    item: `${siteConfig.url}/blog/${post.slug}`,
               },
          ],
     };

     return (
          <main className="w-full bg-surface">
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
               />
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
               />

               <article className="w-full py-space-xl">
                    <div className="mx-auto max-w-3xl space-y-space-lg px-gutter">
                         <Link
                              href="/blog"
                              className="inline-flex items-center gap-1.5 font-label-md text-label-md font-bold text-primary hover:underline"
                         >
                              <ArrowLeft size={18} aria-hidden="true" />
                              Kembali ke Blog
                         </Link>

                         <header className="space-y-space-sm">
                              <div className="flex flex-wrap items-center gap-2">
                                   {category && (
                                        <span className="rounded-full bg-surface-container px-3 py-1 font-label-sm text-label-sm font-bold text-primary">
                                             {category}
                                        </span>
                                   )}
                                   {dateLabel && post.date && (
                                        <time
                                             dateTime={post.date}
                                             className="font-label-sm text-label-sm text-outline"
                                        >
                                             {dateLabel}
                                        </time>
                                   )}
                              </div>
                              <h1 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
                                   {title}
                              </h1>
                         </header>

                         <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-surface-container shadow-md">
                              <Image
                                   src={image}
                                   alt={post.featured_image?.alt || title}
                                   fill
                                   priority
                                   sizes="(min-width: 768px) 768px, 100vw"
                                   className="object-cover"
                              />
                         </div>

                         {post.content && (
                              <div
                                   className={contentClass}
                                   dangerouslySetInnerHTML={{ __html: post.content }}
                              />
                         )}
                    </div>
               </article>

               <section className="w-full bg-surface-container-highest py-space-xl">
                    <div className="mx-auto flex max-w-3xl flex-col gap-space-md px-gutter">
                         <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                              Butuh Bantuan Memilih Layanan?
                         </h2>
                         <p className="font-body-sm text-body-sm text-on-surface-variant">
                              Pilih Travel untuk perjalanan per kursi, atau Sewa Mobil bila Anda
                              butuh satu mobil untuk rombongan.
                         </p>
                         <div className="flex flex-col gap-space-sm sm:flex-row">
                              <Link
                                   href="/travel"
                                   className="rounded-xl bg-primary-container px-space-lg py-3.5 text-center font-label-lg text-label-lg font-bold text-on-primary shadow-md transition-all hover:bg-primary"
                              >
                                   Lihat Travel
                              </Link>
                              <Link
                                   href="/sewa-mobil"
                                   className="rounded-xl bg-surface-container-lowest px-space-lg py-3.5 text-center font-label-lg text-label-lg font-bold text-primary shadow-md transition-all hover:bg-surface-container-low"
                              >
                                   Lihat Sewa Mobil
                              </Link>
                         </div>
                    </div>
               </section>
          </main>
     );
}