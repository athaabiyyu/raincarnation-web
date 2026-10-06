export type SiteConfig = {
     api_version?: string;
     site?: {
          name?: string;
          description?: string;
          logo?: { id?: number; url?: string; alt?: string };
     };
     contact?: {
          phone?: string;
          whatsapp?: string;
          email?: string;
     };
     address?: {
          full?: string;
          city?: string;
          province?: string;
          postal_code?: string;
          latitude?: string;
          longitude?: string;
     };
     social?: {
          facebook?: string;
          instagram?: string;
          youtube?: string;
          tiktok?: string;
     };
};