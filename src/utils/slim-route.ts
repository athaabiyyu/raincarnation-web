import type { Route } from "@/types/route";

export function slimRoutes(routes: Route[]): Route[] {
     return routes.map((route) => ({
          id: route.id,
          slug: route.slug,
          title: route.title,
          acf: {
               jadwal: route.acf?.jadwal,
               tarif: route.acf?.tarif,
               unggulan: route.acf?.unggulan,
          },
     }));
}