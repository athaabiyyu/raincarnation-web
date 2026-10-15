import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getRoutes } from "@/lib/wordpress/routes";
import type { Route } from "@/types/route";

const STATIC_PATHS = ["/", "/travel-reguler", "/sewa-mobil", "/armada"];

async function loadRoutes(): Promise<Route[]> {
     try {
          return await getRoutes();
     } catch (error) {
          console.error("getRoutes gagal di sitemap:", error);
          return [];
     }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
     const routes = await loadRoutes();

     const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
          url: `${siteConfig.url}${path === "/" ? "" : path}`,
     }));

     const routeEntries: MetadataRoute.Sitemap = routes.map((route) => ({
          url: `${siteConfig.url}/travel-reguler/${route.slug}`,
     }));

     return [...staticEntries, ...routeEntries];
}