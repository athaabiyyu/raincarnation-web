export type PaketSewaAcf = {
     satuan?: string;
     label?: string;
     deskripsi?: string;
     point?: string;
};

export type PaketSewa = {
     id: number;
     title: string;
     slug: string;
     date?: string;
     acf?: PaketSewaAcf;
};