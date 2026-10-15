// BELUM DIKONFIRMASI BOS: seluruh teks halaman ini disalin dari desain Stitch lalu disesuaikan.
// Angka (120K+, 45+, 99,8%, rating 4,9, respon < 2 menit, 32 titik), izin Kemenhub, Jasa Raharja,
// GPS, SIM, "24 jam", dan nama PT belum punya dasar. Edit atau hapus sebelum deploy.
// Fakta terkonfirmasi: travel reguler door to door kecuali Pandaan (Juanda belum dijawab);
// sewa mobil bisa diantar, ongkos pengantaran belum termasuk.

export type TentangKamiIcon =
     | "users"
     | "route"
     | "clock"
     | "headset"
     | "shield"
     | "receipt"
     | "home"
     | "message"
     | "badge"
     | "heart"
     | "wallet"
     | "building"
     | "car"
     | "idcard";

export const tentangKamiMeta = {
     title: "Tentang Raincarnation | Sewa Mobil & Travel Malang",
     description:
          "Kenali Raincarnation: layanan travel reguler per kursi dan sewa mobil di Malang, Batu, dan Surabaya. Pesan lewat WhatsApp.",
     ogAlt: "Interior armada Raincarnation yang bersih dan nyaman",
};

export const tentangKamiHero = {
     badge: "Profil Resmi • PT Raincarnation Multi Solusi Transportasi",
     titleStart: "Menghubungkan Setiap Perjalanan dengan ",
     titleHighlight: "Kenyamanan",
     titleEnd: ", Keamanan, & Integritas.",
     description:
          "Layanan travel reguler per kursi dan sewa mobil di Malang, Batu, dan Surabaya. Travel reguler door to door (kecuali Pandaan), sewa mobil bisa diantar ke tempat Anda, dan semua pesanan diurus lewat WhatsApp.",
     whatsappLabel: "Hubungi Admin WhatsApp",
     whatsappMessage:
          "Halo Admin Raincarnation, saya ingin tanya layanan travel dan sewa mobil.",
     philosophyLabel: "Pelajari Filosofi Kami",
     badges: [
          { icon: "badge" as TentangKamiIcon, label: "Izin Resmi Kemenhub" },
          { icon: "heart" as TentangKamiIcon, label: "Proteksi Jasa Raharja" },
          { icon: "wallet" as TentangKamiIcon, label: "Tanpa Biaya Siluman" },
     ],
     image: {
          src: "/images/interior-armada.webp",
          alt: "Interior armada Raincarnation yang bersih dan nyaman",
          tag: "Standar Eksekutif",
          rating: "4.9 / 5.0",
          title: "Santai Sepanjang Jalan",
          description:
               "Kabin sejuk, kursi nyaman, dan titik jemput yang dikonfirmasi admin.",
     },
};

export const tentangKamiStats = {
     eyebrow: "Rekam Jejak Operasional",
     title: "Kepercayaan Nyata Seluruh Pelanggan",
     items: [
          {
               icon: "users" as TentangKamiIcon,
               value: "120K+",
               label: "Penumpang Bahagia",
               description:
                    "Terlayani untuk perjalanan dinas, wisuda, maupun liburan keluarga.",
          },
          {
               icon: "route" as TentangKamiIcon,
               value: "45+",
               label: "Rute Antarkota Aktif",
               description:
                    "Menghubungkan Malang, Batu, Surabaya, Juanda, dan Pandaan.",
          },
          {
               icon: "clock" as TentangKamiIcon,
               value: "99,8%",
               label: "Ketepatan Penjemputan",
               description:
                    "Koordinasi penjemputan bersama admin sebelum jadwal berangkat.",
          },
          {
               icon: "headset" as TentangKamiIcon,
               value: "24/7",
               label: "Admin Terpadu",
               description:
                    "Admin manusia yang siap mendampingi kebutuhan rute Anda.",
          },
     ],
};

export const tentangKamiStory = {
     eyebrow: "Filosofi & Semangat Kami",
     title:
          "Lahir dari Kebutuhan Akan Transportasi Antarkota yang Lebih Memanusiakan Penumpang",
     paragraphs: [
          "Kami memulai Raincarnation dari keresahan nyata para pelaju antarkota: jadwal penjemputan yang molor, kondisi mobil yang pengap, serta tarif tersembunyi yang ditagihkan mendadak di tengah perjalanan.",
          "Bagi kami, berpindah antarkota bukan sekadar sampai di titik tujuan. Perjalanan adalah ruang istirahat sebelum rapat penting, momen temu rindu bersama keluarga, atau awal dari liburan yang menyenangkan.",
          "Karena itu kami memadukan pemesanan cepat via WhatsApp, armada terawat, dan pengemudi yang mengutamakan kesopanan dan ketenangan berkendara.",
     ],
     highlights: [
          { title: "100% Bebas Rokok", description: "Kabin armada bebas aroma tembakau untuk kenyamanan balita dan lansia." },
          { title: "Lewat Jalur Tol", description: "Waktu tempuh efisien dengan prioritas jalan bebas hambatan bila rute memungkinkan." },
     ],
     bullets: [
          "Travel reguler door to door (kecuali Pandaan)",
          "Sewa mobil bisa diantar, ongkos pengantaran belum termasuk",
          "Tarif jelas per rute, rincian dikonfirmasi admin",
          "Bagasi untuk tiap penumpang, aturan dikonfirmasi admin",
     ],
     image: {
          src: "/images/interior-armada.webp",
          alt: "Kabin armada Raincarnation yang bersih",
     },
};

export const tentangKamiValues = {
     eyebrow: "Integritas Layanan",
     title: "4 Pilar Inti Komitmen Raincarnation",
     description:
          "Fondasi operasional yang kami jaga setiap hari demi rasa aman Anda dan keluarga.",
     items: [
          {
               icon: "shield" as TentangKamiIcon,
               title: "Keselamatan Tanpa Kompromi",
               description:
                    "Armada diservis rutin dan diperiksa sebelum berangkat, mulai dari ban, rem, hingga wiper. Pengemudi beristirahat berkala untuk mencegah kelelahan.",
               footer: "Inspeksi Standar 32 Titik Kendaraan",
          },
          {
               icon: "receipt" as TentangKamiIcon,
               title: "Transparansi & Kejujuran Harga",
               description:
                    "Tarif dan rincian yang termasuk dikonfirmasi admin sebelum Anda berangkat, sehingga tidak ada kejutan di tengah perjalanan.",
               footer: "Rincian Jelas Sebelum Berangkat",
          },
          {
               icon: "home" as TentangKamiIcon,
               title: "Kenyamanan Personal Door to Door",
               description:
                    "Travel reguler kami menjemput dan mengantar ke alamat Anda (kecuali Pandaan), tanpa perlu ke terminal atau stasiun. Titik jemput disepakati lewat admin.",
               footer: "Jemput dan Antar ke Alamat",
          },
          {
               icon: "message" as TentangKamiIcon,
               title: "Respon Cepat & Sentuhan Humanis",
               description:
                    "Reservasi ditangani tim admin lewat WhatsApp yang siap membantu memilih rute, menyesuaikan jam jemput, dan menangani kendala perjalanan.",
               footer: "Respon Cepat via WhatsApp",
          },
     ],
};

export const tentangKamiCompany = {
     badge: "Badan Hukum & Legalitas",
     title: "Beroperasi Resmi di Bawah PT Raincarnation Multi Solusi Transportasi",
     description:
          "Kepercayaan penumpang adalah prioritas kami. Operasional armada Raincarnation berjalan di bawah badan hukum Indonesia.",
     items: [
          { icon: "building" as TentangKamiIcon, title: "NIB & Izin Kemenhub", description: "Izin operasional angkutan sewa khusus dan antarprovinsi." },
          { icon: "heart" as TentangKamiIcon, title: "Jasa Raharja", description: "Perlindungan asuransi kecelakaan penumpang." },
          { icon: "car" as TentangKamiIcon, title: "Armada Terawat", description: "Armada terdata dan dipantau selama perjalanan." },
          { icon: "idcard" as TentangKamiIcon, title: "Sopir Tersertifikasi", description: "Memiliki SIM sesuai ketentuan dan berlatar belakang bersih." },
     ],
     summary: {
          title: "Raincarnation",
          subtitle: "Travel Reguler & Sewa Mobil",
          rows: [
               { label: "Entitas Resmi", value: "PT Raincarnation Multi Solusi Transportasi" },
               { label: "Cakupan Wilayah", value: "Malang, Batu, Surabaya, Juanda, Pandaan" },
               { label: "Jenis Layanan", value: "Per Kursi & Sewa Mobil" },
               { label: "Armada Pilihan", value: "Alphard, Avanza" },
          ],
          contactLabel: "Konsultasi Layanan",
          contactButton: "Chat WhatsApp Admin",
          contactMessage: "Halo Admin Raincarnation, saya ingin konsultasi layanan.",
     },
};