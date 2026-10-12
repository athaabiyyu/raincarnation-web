export type RuteCarterAcf = {
     kota_asal?: string;
     kota_tujuan?: string;
     paket_sewa?: string;
     armada?: { ID: number }[];
     harga?: number | string;
};

export type RuteCarter = {
     id: number;
     slug: string;
     title: string;
     acf?: RuteCarterAcf;
};