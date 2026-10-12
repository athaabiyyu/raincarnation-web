import { wpFetch } from "./client";
import type { RuteCarter } from "@/types/rute-carter";

export async function getRuteCarterList(): Promise<RuteCarter[]> {
     return wpFetch<RuteCarter[]>("/types/rute-carter?per_page=100");
}