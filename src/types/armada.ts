export type ArmadaAcf = {
     harga_all_in?: string;
     harga_non_all_in?: string; 
     harga?: string; 
     harga_lepas_kunci_bulanan?: string; 
     harga_lepas_kunci_tahunan?: string; 
     tambahan_driver?: string;
     jumlah_penumpang?: string;
     koper?: string;
     label?: string;
     deskripsi_unit?: string;
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