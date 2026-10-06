export type ArmadaAcf = {
     harga?: string;
     jumlah_penumpang?: string;
     bbm?: string;
     kata_kunci_utama?: string;
};

export type Armada = {
     id: number;
     slug: string;
     title: string;
     excerpt?: string;
     featured_image?: {
          url?: string;
          alt?: string;
     };
     acf?: ArmadaAcf;
};