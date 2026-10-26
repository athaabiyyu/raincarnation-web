import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import FloatingWhatsapp from "@/components/ui/FloatingWhatsapp";
import { siteConfig } from "@/config/site";
import { getSiteConfig } from "@/lib/wordpress/config";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Raincarnation",
  description: "Travel dan Sewa Mobil Malang, Surabaya, Pasuruan, dan Sekitarnya",
  // SEMENTARA: hapus baris robots ini saat domain asli dipasang dan siap rilis.
  robots: { index: false, follow: false },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const config = await getSiteConfig();
  const whatsapp = config.contact?.whatsapp ?? "";

  return (
    <html lang="id" className={jakarta.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsapp whatsapp={whatsapp} />
      </body>
    </html>
  );
}

