import { wpFetch } from "./client";
import type { SiteConfig } from "@/types/site-config";

export function getSiteConfig() {
     return wpFetch<SiteConfig>("/config");
}