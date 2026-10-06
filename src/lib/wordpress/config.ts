import { wpFetch } from "./client";
import type { SiteConfig } from "@/types/site-config";

export async function getSiteConfig(): Promise<SiteConfig> {
     try {
          return await wpFetch<SiteConfig>("/config");
     } catch (error) {
          console.error("[getSiteConfig] Gagal mengambil config dari CMS:", error);
          return {};
     }
}