import type { Metadata } from "next";
import TravelHero from "@/components/sections/TravelHero";

export const metadata: Metadata = {
  title: "Travel Malang Surabaya Pasuruan | Jemput Door to Door | Raincarnation",
  description:
    "Travel reguler per kursi Malang, Surabaya, dan Pasuruan. Dijemput di depan rumah, sudah termasuk tol, BBM, dan driver. Pesan lewat WhatsApp.",
};

export default function TravelRegulerPage() {
     return (
          <main className="w-full bg-surface">
               <TravelHero />
          </main>
     );
}