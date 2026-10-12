import type { Route } from "@/types/route";
import { capitalizeFirst } from "@/utils/capitalize-first";

export type RoutePair = {
     from: string;
     to: string;
     times: string[];
     price: number;
};

export function parseSchedule(jadwal?: string): string[] {
     if (!jadwal) return [];
     const times = jadwal
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
     return [...new Set(times)];
}

export function getRoutePairs(routes: Route[]): RoutePair[] {
     const seen = new Set<string>();
     const pairs: RoutePair[] = [];

     for (const route of routes) {
          const from = capitalizeFirst(route.acf?.kota_asal);
          const to = capitalizeFirst(route.acf?.kota_tujuan);
          if (!from || !to) continue;

          const key = `${from}|${to}`;
          if (seen.has(key)) continue;
          seen.add(key);

          const price = Number(route.acf?.tarif);

          pairs.push({
               from,
               to,
               times: parseSchedule(route.acf?.jadwal),
               price: Number.isFinite(price) && price > 0 ? price : 0,
          });
     }

     return pairs;
}