export type RuteCarterAcf = {
     kota_asal?: string;
     kota_tujuan?: string;
     paket_sewa?: string;
     /** Nama rute untuk paket Sewa Mobil All In (Malang, Batu, Surabaya) */
     rute?: string;
     /** Nama rute untuk paket Sewa Mobil Lepas Kunci ("Dalam kota") */
     rute_lepas_kunci?: string;
     armada?: { ID: number }[];
     harga?: number | string;
};

export type RuteCarter = {
     id: number;
     slug: string;
     title: string;
     acf?: RuteCarterAcf;
};