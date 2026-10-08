import { wpFetch } from "@/lib/wordpress/client";
import type { PaketSewa } from "@/types/paket-sewa";

function toTime(date?: string) {
     const time = date ? new Date(date).getTime() : 0;
     return Number.isNaN(time) ? 0 : time;
}

export async function getPaketSewaList(): Promise<PaketSewa[]> {
     const list = await wpFetch<PaketSewa[]>("/types/paket-sewa");
     return [...list].sort((a, b) => toTime(a.date) - toTime(b.date));
}