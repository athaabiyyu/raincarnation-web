export type PostAcf = {
     kata_kunci_utama?: string;
};

export type PostCategory = {
     id: number;
     slug: string;
     name: string;
};

export type Post = {
     id: number;
     slug: string;
     title: string;
     excerpt?: string;
     content?: string;
     date?: string;
     modified?: string;
     featured_image?: {
          url?: string;
          alt?: string;
     };
     categories?: PostCategory[];
     acf?: PostAcf;
};