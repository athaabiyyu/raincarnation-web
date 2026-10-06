import { wpFetch } from "./client";
import type { Armada } from "@/types/armada";

export function getArmadaList() {
  return wpFetch<Armada[]>("/types/armada?per_page=100");
}