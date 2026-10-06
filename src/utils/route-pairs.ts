import type { Route } from "@/types/route";

export type RoutePair = { from: string; to: string; times: string[] };

// "06.00, 08.00, 10.00" -> ["06.00", "08.00", "10.00"]
// Bagian kosong dibuang, duplikat dihapus.
function parseSchedule(jadwal?: string): string[] {
     if (!jadwal) return [];
     const times = jadwal
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
     return [...new Set(times)];
}

// Mengubah daftar rute CMS menjadi pasangan asal-tujuan yang unik.
// Rute yang kota asal atau tujuannya kosong dilewati.
export function getRoutePairs(routes: Route[]): RoutePair[] {
     const seen = new Set<string>();
     const pairs: RoutePair[] = [];

     for (const route of routes) {
          const from = route.acf?.kota_asal?.trim();
          const to = route.acf?.kota_tujuan?.trim();
          if (!from || !to) continue;

          const key = `${from}|${to}`;
          if (seen.has(key)) continue;
          seen.add(key);

          pairs.push({ from, to, times: parseSchedule(route.acf?.jadwal) });
     }

     return pairs;
}