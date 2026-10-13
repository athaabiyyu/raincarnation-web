"use client";

import { MessageSquareText } from "lucide-react";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

type FloatingWhatsappProps = {
  whatsapp?: string;
};

export default function FloatingWhatsapp({ whatsapp }: FloatingWhatsappProps) {
  const targetNumber = whatsapp?.trim();

  if (!targetNumber) return null;

  const formattedNumber = targetNumber.startsWith("0")
    ? `62${targetNumber.slice(1)}`
    : targetNumber;

  const message = [
    "Halo Admin Raincarnation,",
    "Saya ingin menanyakan informasi sewa mobil & travel reguler. Terima kasih!",
  ].join("\n");

  const whatsappUrl = buildWhatsAppUrl(formattedNumber, message);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pesan Tiket Cepat via WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-2.5 text-xs font-bold text-black shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-[#20ba5a] active:scale-95 sm:bottom-5 sm:right-5 sm:px-4 sm:py-3 sm:text-sm"
    >
      <MessageSquareText className="h-4 w-4 shrink-0 text-black sm:h-5 sm:w-5" aria-hidden />
      <span>Pesan Tiket Cepat</span>
    </a>
  );
}