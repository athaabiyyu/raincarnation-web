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
     titleEnd: "dan Travel Door to Door",
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
          "Jasa sewa mobil dengan driver atau lepas kunci yang tersedia 24 jam di Malang, Batu, dan Surabaya, serta bisa custom rute apabila ingin rute yang lain. Tersedia juga travel door to door per kursi (travel reguler) untuk rute Malang, Batu, Surabaya, Pandaan, dan Bandara Juanda, mulai Rp100.000 dan sudah termasuk tol dan parkir.",
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
               description: "Malang, Batu, Surabaya, dan custom rute",
          },
          {
               icon: "message-circle",
               title: "Pesan via WhatsApp",
               description: "Hubungi admin untuk informasi dan pemesanan",
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
          "Sewa mobil Malang (sering disebut rental mobil Malang) dengan sopir atau lepas kunci untuk perjalanan di Malang, Batu, Surabaya, dan Pasuruan. Butuh satu atau beberapa kursi saja untuk rute tertentu? Pilih saja layanan travel reguler kami.",
     items: [
          {
               icon: "car",
               tag: "SEWA MOBIL",
               title: "Sewa Mobil Malang, Batu & Surabaya",
               description:
                    "Pilih sewa mobil dengan sopir atau lepas kunci sesuai ketersediaan layanan dan kebutuhan perjalanan Anda.",
               points: [
                    "Tiga paket: All In (per hari), Lepas Kunci (per 12 jam), Carter Drop Off (per rute)",
                    "Lepas Kunci: syarat KTP dan SIM A berlaku",
                    "Informasi armada dan pemesanan melalui WhatsApp",
               ],
               button: "Pilihan Unit & Sewa Mobil Malang",
               href: "/sewa-mobil",
               featured: true,
          },
          {
               icon: "armchair",
               tag: "TRAVEL REGULER",
               title: "Travel Reguler per Kursi",
               description:
                    "Pilihan perjalanan antarkota bagi Anda yang ingin memesan kursi tanpa menyewa satu mobil penuh.",
               points: [
                    "Pembayaran berdasarkan jumlah kursi",
                    "Antar jemput door to door (kecuali titik di Pandaan dan Juanda)",
                    "Tarif sudah termasuk tol dan parkir",
                    "Tersedia rute tertentu sesuai jadwal",
               ],
               button: "Lihat Jadwal & Rute Travel Reguler",
               href: "/travel",
               featured: false,
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
               question: "Apakah Raincarnation menyediakan layanan sewa mobil Malang dengan driver?",
               answer:
                    "Ya, kami menyediakan paket sewa mobil dengan driver untuk area Malang, Batu, Surabaya, dan bisa custom rute sesuai keinginan Anda. Hubungi admin lewat WhatsApp untuk menanyakan ketersediaan dan rincian layanan.",
          },
          {
               question: "Apakah tersedia sewa mobil lepas kunci (tanpa driver) di Malang?",
               answer:
                    "Tersedia untuk unit dan kriteria tertentu. Anda dapat menghubungi admin reservasi kami via WhatsApp untuk mengetahui syarat dan ketentuan sewa mobil lepas kunci.",
          },
          {
               question: "Apa bedanya sewa mobil All In, Lepas Kunci, dan Carter Drop Off?",
               answer:
                    "All In adalah sewa mobil dengan sopir, tarif per hari. Lepas Kunci adalah sewa mobil tanpa sopir, tarif per 12 jam, dan penyewa membawa KTP serta SIM A yang masih berlaku. Carter Drop Off 1 Arah adalah satu mobil untuk satu rute dari kota asal ke kota tujuan, tarif per rute. Tanyakan rincian lengkapnya ke admin lewat WhatsApp.",
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
               question: "Apakah travel bisa dijemput sampai rumah?",
               answer:
                    "Bisa. Travel kami door to door, jadi Anda dijemput di alamat Anda, kecuali titik di Pandaan dan Juanda. Contohnya dari Malang ke Juanda, Anda dijemput di alamat Anda. Dari Juanda, Anda dijemput di Juanda. Titik pastinya dikonfirmasi admin lewat WhatsApp.",
          },
          {
               question: "Bagaimana cara melakukan pemesanan sewa mobil di Raincarnation?",
               answer:
                    "Klik tombol WhatsApp yang tersedia, sebutkan tanggal, rute, dan jenis armada yang Anda butuhkan, lalu admin kami akan mengonfirmasi ketersediaan dan total biaya.",
          },
     ],
};

