import type { Metadata } from "next";
import ArmadaHero from "@/components/sections/ArmadaHero";
import ArmadaCatalog from "@/components/sections/ArmadaCatalog";
import ArmadaMaintenance from "@/components/sections/ArmadaMaintenance";
import ArmadaAmenities from "@/components/sections/ArmadaAmenities";
import ArmadaCta from "@/components/sections/ArmadaCta";
import { getArmadaList } from "@/lib/wordpress/armada";
import { getSiteConfig } from "@/lib/wordpress/config";
import type { Armada } from "@/types/armada";

export const metadata: Metadata = {
     title: "Pilihan Armada Travel dan Sewa Mobil | Raincarnation",
     description:
          "Lihat pilihan armada Raincarnation untuk travel dan sewa mobil dengan driver, lengkap dengan kapasitas kursi dan bagasi. Pesan lewat WhatsApp.",
     alternates: { canonical: "/armada" },
};

async function loadArmada(): Promise<Armada[]> {
     try {
          return await getArmadaList();
     } catch (error) {
          console.error("getArmadaList gagal di halaman armada:", error);
          return [];
     }
}

export default async function ArmadaPage() {
     const [config, armada] = await Promise.all([
          getSiteConfig(),
          loadArmada(),
     ]);
     const whatsapp = config.contact?.whatsapp ?? "";

     return (
          <main className="w-full bg-surface">
               <ArmadaHero whatsapp={whatsapp} />
               <ArmadaCatalog armada={armada} whatsapp={whatsapp} />
               <ArmadaMaintenance />
               <ArmadaAmenities />
               <ArmadaCta whatsapp={whatsapp} />
          </main>
     );
}