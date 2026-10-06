import { wpFetch } from "./client";
import type { Route } from "@/types/route";

export function getRoutes() {
  return wpFetch<Route[]>("/types/rute?per_page=100");
}

export function getRouteBySlug(slug: string) {
  return wpFetch<Route>(`/types/rute/${slug}`);
}