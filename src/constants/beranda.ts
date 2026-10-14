// BELUM DIKONFIRMASI BOS: klaim paket sewa (All In, Carter Drop Off 1 Arah, Lepas Kunci) dan durasi sewa 12 jam di file ini dipasang sementara.
export type BerandaTrustIcon = "car" | "route" | "message-circle";
export type BerandaServiceIcon = "armchair" | "car";
export type BerandaWhyIcon =
     | "badge-check"
     | "smile"
     | "shield-check"
     | "message-square-text";

export const berandaHero = {
     titleStart: "Sewa Mobil",
     titleHighlight: "Malang, Batu & Surabaya",
     titleEnd: "Plus Driver & Lepas Kunci",
     image: {
          src: "/images/interior-armada.webp",
          alt: "Kabin mobil Raincarnation yang bersih dan nyaman untuk sewa mobil di Malang",
     },
     imageCard: {
          tag: "PILIHAN SEWA FLEKSIBEL",
          title: "Sewa Mobil Sesuai Kebutuhan",
          description:
               "Pilih layanan mobil dengan sopir atau lepas kunci untuk perjalanan di Malang, Batu, dan Surabaya.",
     },
     description:
          "Sewa mobil dengan sopir atau lepas kunci di Malang, Batu, Surabaya, dan Pasuruan. Raincarnation juga melayani travel reguler per kursi untuk rute tertentu. Hubungi admin kami melalui WhatsApp untuk informasi dan pemesanan.",
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
               description: "Layanan di Malang, Batu, Surabaya dan Pasuruan",
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
     title: "Layanan Sewa Mobil Malang dan Travel Reguler",
     description:
          "Sewa mobil Malang (sering disebut rental mobil Malang) dengan sopir atau lepas kunci untuk perjalanan di Malang, Batu, Surabaya, dan Pasuruan. Butuh kursi saja untuk rute tertentu? Pilih travel reguler per kursi.",
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
               button: "Lihat Jadwal & Rute Travel Reguler",
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
                    "Tiga paket: All In, Carter Drop Off 1 Arah, dan Lepas Kunci",
                    "Durasi sewa 12 jam",
                    "Informasi armada dan pemesanan melalui WhatsApp",
               ],
               button: "Pilihan Unit & Sewa Mobil Malang",
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

export const berandaFaq = {
     eyebrow: "PERTANYAAN UMUM",
     title: "Pertanyaan Sering Diajukan Seputar Sewa Mobil Malang",
     description:
          "Temukan jawaban cepat mengenai layanan sewa mobil, paket driver, lepas kunci, dan travel reguler di Raincarnation.",
     items: [
          {
               question: "Apakah Raincarnation menyediakan layanan sewa mobil Malang plus driver?",
               answer:
                    "Ya, kami menyediakan paket sewa mobil plus driver untuk area Malang, Batu, Surabaya, dan Pasuruan. Hubungi admin lewat WhatsApp untuk menanyakan ketersediaan dan rincian layanan.",
          },
          {
               question: "Apakah tersedia sewa mobil lepas kunci (tanpa driver) di Malang?",
               answer:
                    "Tersedia untuk unit dan kriteria tertentu. Anda dapat menghubungi admin reservasi kami via WhatsApp untuk mengetahui syarat dan ketentuan sewa mobil lepas kunci.",
          },
          {
               question: "Berapa harga sewa mobil per hari di Malang?",
               answer:
                    "Tarif sewa mobil bergantung pada jenis armada, durasi, dan paket yang dipilih. Gunakan simulasi tarif di halaman Sewa Mobil atau tanyakan langsung ke admin via WhatsApp untuk harga sesuai kebutuhan Anda.",
          },
          {
               question: "Apa saja jenis armada yang tersedia untuk disewa?",
               answer:
                    "Pilihan armada kami tersedia di halaman Armada, lengkap dengan kapasitas penumpang dan koper. Hubungi admin lewat WhatsApp untuk menanyakan ketersediaan unit.",
          },
          {
               question: "Apakah melayani penjemputan dari Bandara Juanda?",
               answer:
                    "Ya, kami melayani layanan dari dan menuju Bandara Juanda. Titik jemput dikonfirmasi oleh admin lewat WhatsApp sesuai kota dan kebutuhan perjalanan Anda.",
          },
          {
               question: "Bagaimana cara melakukan pemesanan sewa mobil di Raincarnation?",
               answer:
                    "Klik tombol WhatsApp yang tersedia, sebutkan tanggal, rute, dan jenis armada yang Anda butuhkan, lalu admin kami akan mengonfirmasi ketersediaan dan total biaya.",
          },
     ],
};

