import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getRoutes } from "@/lib/wordpress/routes";
import { getArmadaList } from "@/lib/wordpress/armada";
import { getPosts } from "@/lib/wordpress/posts";
import type { Route } from "@/types/route";
import type { Armada } from "@/types/armada";
import type { Post } from "@/types/post";

const STATIC_PATHS = ["/", "/travel", "/sewa-mobil", "/armada", "/blog"];

async function loadRoutes(): Promise<Route[]> {
     try {
          return await getRoutes();
     } catch (error) {
          console.error("getRoutes gagal di sitemap:", error);
          return [];
     }
}

async function loadArmada(): Promise<Armada[]> {
     try {
          return await getArmadaList();
     } catch (error) {
          console.error("getArmadaList gagal di sitemap:", error);
          return [];
     }
}

async function loadPosts(): Promise<Post[]> {
     try {
          return await getPosts();
     } catch (error) {
          console.error("getPosts gagal di sitemap:", error);
          return [];
     }
}

function toDate(value?: string): Date | undefined {
     if (!value) return undefined;
     const date = new Date(value);
     return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
     const [routes, armada, posts] = await Promise.all([
          loadRoutes(),
          loadArmada(),
          loadPosts(),
     ]);

     const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
          url: `${siteConfig.url}${path === "/" ? "" : path}`,
     }));

     const routeEntries: MetadataRoute.Sitemap = routes.map((route) => ({
          url: `${siteConfig.url}/travel/${route.slug}`,
     }));

     const unitEntries: MetadataRoute.Sitemap = armada.map((item) => ({
          url: `${siteConfig.url}/sewa-mobil/${item.slug}`,
     }));

     const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
          url: `${siteConfig.url}/blog/${post.slug}`,
          lastModified: toDate(post.modified),
     }));

     return [...staticEntries, ...routeEntries, ...unitEntries, ...postEntries];
}