export type RouteAcf = {
  kota_asal?: string;
  kota_tujuan?: string;
  tarif?: string;
  tarif_pp?: string;
  jadwal?: string;
  jalur?: string;
  armada?: number[];
  deskripsi_singkat?: string;
  label?: string;
};

export type Route = {
  id: number;
  slug: string;
  title: string;
  status?: string;
  modified?: string;
  content?: string;
  acf?: RouteAcf;
};