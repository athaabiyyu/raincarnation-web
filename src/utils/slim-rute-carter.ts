import type { RuteCarter } from "@/types/rute-carter";

export function slimRuteCarter(list: RuteCarter[]): RuteCarter[] {
  return list.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    acf: {
      kota_asal: item.acf?.kota_asal,
      kota_tujuan: item.acf?.kota_tujuan,
      paket_sewa: item.acf?.paket_sewa,
      rute: item.acf?.rute,
      rute_lepas_kunci: item.acf?.rute_lepas_kunci,
      armada: item.acf?.armada?.map((a) => ({ ID: a.ID })),
      harga: item.acf?.harga,
    },
  }));
}