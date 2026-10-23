// BELUM DIKONFIRMASI BOS: klaim di file ini bersifat sementara.
export const footerContent = {
     description:
          "Raincarnation menyediakan layanan sewa mobil dengan sopir atau lepas kunci di Malang, Batu, dan Surabaya, serta travel reguler per kursi untuk rute tertentu. Hubungi admin kami melalui WhatsApp untuk informasi tarif, jadwal keberangkatan, dan ketersediaan layanan.",

     servicesTitle: "Layanan & Navigasi",
     serviceLinks: [
          { label: "Travel Reguler", href: "/travel" },
          { label: "Carter Drop Satu Arah (One Way)", href: "/sewa-mobil" },
          { label: "Pilihan Armada & Spesifikasi", href: "/armada" },
          { label: "Profil Perusahaan & Driver", href: "/tentang-kami" },
          { label: "Info Rute, Tips & Berita", href: "/blog" },
          { label: "FAQ & Hubungi Layanan Bantuan", href: "/pusat-bantuan" },
     ],

     supportTitle: "Pusat Bantuan & Pemesanan",
     addressLabel: "Operasional Dispatcher & Pemesanan:",
     whatsappLabel: "WhatsApp Layanan Pelanggan:",
     whatsappButton: "Pesan via WhatsApp",
     whatsappMessage: "Halo Admin Raincarnation, saya butuh bantuan booking travel",

     reservationTitle: "Kemudahan Reservasi & Konfirmasi WhatsApp:",
     reservationChips: ["Pilihan Kursi Bebas", "Titik Jemput via Admin", "Konfirmasi Cepat"],

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