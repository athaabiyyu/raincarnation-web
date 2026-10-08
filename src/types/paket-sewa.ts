export type PaketSewaAcf = {
     harga?: string;
     satuan?: string;
     label?: string;
     deskripsi?: string;
     point?: string;
     text_harga?: string;
};

export type PaketSewa = {
     id: number;
     title: string;
     slug: string;
     date?: string;
     acf?: PaketSewaAcf;
};