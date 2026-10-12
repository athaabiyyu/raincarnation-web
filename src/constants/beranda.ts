export type BerandaTrustIcon = "car" | "route" | "message-circle";
export type BerandaServiceIcon = "armchair" | "car";
export type BerandaWhyIcon =
     | "badge-check"
     | "smile"
     | "shield-check"
     | "message-square-text";

export const berandaHero = {
     badge: "Jasa Travel Reguler & Sewa Mobil",
     titleStart: "Sewa Mobil",
     titleHighlight: "Malang, Batu & Surabaya",
     titleEnd: "untuk Berbagai Kebutuhan Perjalanan",
     image: {
          src: "/images/interior-armada.webp",
          alt: "Interior armada Raincarnation yang bersih dan nyaman",
     },
     imageCard: {
          tag: "PILIHAN SEWA FLEKSIBEL",
          title: "Sewa Mobil Sesuai Kebutuhan",
          description:
               "Pilih layanan mobil dengan sopir atau lepas kunci untuk perjalanan di Malang, Batu, dan Surabaya.",
     },
     description:
          "Sewa mobil dengan sopir atau lepas kunci di Malang, Batu, dan Surabaya. Raincarnation juga melayani travel reguler per kursi untuk rute tertentu. Hubungi admin kami melalui WhatsApp untuk informasi dan pemesanan.",
     checks: [
          "Pilihan Sewa dengan Sopir atau Lepas Kunci",
          "Layanan di Malang, Batu & Surabaya",
          "Informasi dan Pemesanan via WhatsApp",
     ],
     travelButton: {
          label: "Lihat Travel Reguler",
          href: "/travel-reguler",
     },
     charterButton: {
          label: "Lihat Sewa Mobil",
          href: "/sewa-mobil",
     },
     whatsappButton: "Chat WhatsApp Admin",
     whatsappMessage:
          "Halo Admin Raincarnation, saya ingin bertanya tentang layanan travel reguler atau sewa mobil.",
};


export const berandaTrust = {
     items: [
          {
               icon: "car",
               title: "Pilihan Layanan",
               description: "Sewa Mobil & Travel Reguler",
          },
          {
               icon: "route",
               title: "Pilihan Rute",
               description: "Layanan di Malang, Batu dan Surabaya",
          },
          {
               icon: "message-circle",
               title: "Pesan via WhatsApp",
               description: "Hubungi admin untuk informasi dan Pemesanan",
          },
     ] satisfies {
          icon: BerandaTrustIcon;
          title: string;
          description: string;
     }[],
};

export const berandaBooking = {
     regulerTab: "Travel Reguler (Per Kursi)",
     carterTab: "Sewa Mobil (Satu Mobil Penuh)",

     carter: {
          title: "Sewa Satu Mobil Penuh",
          description:
               "Cocok untuk keluarga, rombongan, atau perjalanan pribadi yang membutuhkan satu mobil khusus. Pilih layanan sewa mobil dengan sopir atau lepas kunci sesuai kebutuhan. Cek simulasi tarif atau hubungi admin Raincarnation melalui WhatsApp.",
          simulateButton: {
               label: "Simulasi & Cek Tarif",
               href: "/sewa-mobil#simulasi-carter",
          },

          whatsappButton: "Tanya Admin via WhatsApp",
          whatsappMessage:
               "Halo Admin Raincarnation, saya ingin bertanya tentang layanan sewa mobil.",
     },
};


export const berandaServices = {
     title: "Pilih Layanan Perjalanan Sesuai Kebutuhan Anda",
     description:
          "Tersedia layanan sewa mobil di Malang, Batu, dan Surabaya, serta travel reguler per kursi untuk rute tertentu. Pilih layanan yang sesuai dengan kebutuhan perjalanan Anda.",
     items: [
          {
               icon: "armchair",
               tag: "TRAVEL REGULER",
               title: "Travel Reguler per Kursi",
               description:
                    "Pilihan perjalanan antarkota bagi Anda yang ingin memesan kursi tanpa menyewa satu mobil penuh.",
               points: [
                    "Pembayaran berdasarkan jumlah kursi",
                    "Tersedia rute tertentu sesuai jadwal",
                    "Cek rute dan informasi keberangkatan",
               ],
               button: "Lihat Travel Reguler",
               href: "/travel-reguler",
               featured: false,
          },
          {
               icon: "car",
               tag: "SEWA MOBIL",
               title: "Sewa Mobil Malang, Batu & Surabaya",
               description:
                    "Pilih sewa mobil dengan sopir atau lepas kunci sesuai ketersediaan layanan dan kebutuhan perjalanan Anda.",
               points: [
                    "Pilihan layanan sesuai kebutuhan",
                    "Tersedia area layanan Malang, Batu, dan Surabaya",
                    "Informasi armada dan pemesanan melalui WhatsApp",
               ],
               button: "Lihat Sewa Mobil",
               href: "/sewa-mobil",
               featured: true,
          },
     ] satisfies {
          icon: BerandaServiceIcon;
          tag: string;
          title: string;
          description: string;
          points: string[];
          button: string;
          href: string;
          featured: boolean;
     }[],
};

export const berandaWhy = {
     eyebrow: "Standar Kualitas Raincarnation",
     title: "Mengapa Memilih Raincarnation?",
     description:
          "Kami menyediakan layanan sewa mobil dan travel reguler dengan informasi layanan yang jelas untuk membantu Anda mempersiapkan perjalanan.",
     button: "Hubungi Admin Reservasi",
     message: "Halo Admin Raincarnation, saya ingin tanya reservasi.",
     items: [
          {
               icon: "badge-check",
               title: "Driver Profesional",
               description:
                    "Driver yang mengutamakan keselamatan, kenyamanan, dan etika dalam melayani penumpang.",
          },
          {
               icon: "smile",
               title: "Kabin Bersih dan Nyaman",
               description:
                    "Kabin kendaraan dijaga kebersihannya untuk mendukung kenyamanan selama perjalanan.",
          },
          {
               icon: "shield-check",
               title: "Perawatan Kendaraan Berkala",
               description:
                    "Kendaraan dirawat secara berkala sesuai kebutuhan perawatan dan kondisi unit.",
          },
          {
               icon: "message-square-text",
               title: "Reservasi via WhatsApp",
               description:
                    "Tanyakan tarif, ketersediaan armada, dan detail perjalanan langsung kepada admin.",
          },
     ] satisfies {
          icon: BerandaWhyIcon;
          title: string;
          description: string;
     }[],
};

export const berandaBookingIntro = {
     title: "Cari Perjalanan Anda",
     description:
          "Pilih layanan sewa mobil atau travel reguler, lalu masukkan detail perjalanan untuk melihat estimasi tarif dan melanjutkan pemesanan melalui WhatsApp.",
};