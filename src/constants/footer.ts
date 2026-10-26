// BELUM DIKONFIRMASI BOS: klaim di file ini bersifat sementara.
export const footerContent = {
     description:
          "Raincarnation melayani sewa mobil dengan sopir di Malang, Batu, dan Surabaya, sewa mobil lepas kunci di Malang dan Batu, serta travel per kursi untuk rute Malang, Batu, Surabaya, Pandaan, dan Bandara Juanda. Admin bisa dihubungi lewat WhatsApp 24\u00A0jam.",

     servicesTitle: "Layanan & Navigasi",
     serviceLinks: [
          { label: "Sewa Mobil", href: "/sewa-mobil" },
          { label: "Travel (per kursi)", href: "/travel" },
          { label: "Pilihan Armada", href: "/armada" },
          { label: "Info Rute & Tips", href: "/blog" },
          { label: "Pusat Bantuan", href: "/pusat-bantuan" },
          { label: "Tentang Kami", href: "/tentang-kami" },
     ],

     supportTitle: "Pusat Bantuan & Pemesanan",
     addressLabel: "Operasional Dispatcher & Pemesanan:",
     whatsappLabel: "WhatsApp Layanan Pelanggan:",
     whatsappButton: "Pesan via WhatsApp",
     whatsappMessage: "Halo Admin Raincarnation, saya butuh bantuan booking",
     companyName: "PT Raincarnation Indonesia",
     copyrightSuffix: "Hak Cipta Dilindungi Undang-Undang.",
};

export const footerLocations = {
     title: "Lokasi Garasi",
     items: [
          {
               name: "Garasi Batu",
               address:
                    "Jl. Torongrejo, Torongrejo, Kec. Junrejo, Kota Batu, Jawa Timur 65325",
          },
          {
               name: "Garasi Surabaya",
               address:
                    "Jl. Baruk Barat VIII No.A-103, Kedung Baruk, Kec. Rungkut, Kota Surabaya, Jawa Timur 60298",
          },
     ] satisfies { name: string; address: string; mapsUrl?: string }[],
};