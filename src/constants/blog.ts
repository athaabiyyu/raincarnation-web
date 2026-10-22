// Artikel blog kini diambil dari CMS (tipe bawaan "Pos"), bukan dari file ini.
// File ini hanya memuat teks halaman: meta, hero, sidebar, dan CTA.
// BELUM DIKONFIRMASI BOS: teks "reguler" di sini menunggu Tahap B.

export const blogMeta = {
     title: "Blog Perjalanan Malang, Batu & Surabaya | Raincarnation",
     description:
          "Tips dan panduan perjalanan di Malang, Batu, dan Surabaya: memilih travel per kursi, sewa mobil, dan armada yang sesuai rencana Anda.",
     ogAlt: "Interior armada Raincarnation yang bersih dan nyaman",
};

export const blogHero = {
     badge: "Raincarnation Insight",
     title: "Panduan Perjalanan Malang, Batu & Surabaya",
     description:
          "Tips memilih travel reguler, sewa mobil, dan armada yang sesuai dengan rencana perjalanan Anda.",
     categories: [
          "Semua Artikel",
          "Panduan Rute",
          "Tips & Wisata",
          "Seputar Armada",
          "Sewa Mobil",
     ],
};

export const blogSidebar = {
     whatsapp: {
          eyebrow: "Konsultasi",
          title: "Mau Berangkat Segera?",
          description:
               "Tanyakan jadwal dan sisa kursi travel reguler, atau ketersediaan armada sewa mobil, langsung ke admin.",
          button: "Cek Kursi via WhatsApp",
          message: "Halo Admin Raincarnation, saya mau cek ketersediaan kursi.",
     },
     tariff: {
          title: "Tarif Travel Reguler",
          subtitle: "per kursi",
          linkLabel: "Lihat Semua Jadwal & Rute",
          linkHref: "/travel",
     },
     faq: {
          title: "FAQ Cepat",
          items: [
               {
                    question: "Apakah travel reguler dijemput ke alamat?",
                    answer:
                         "Travel reguler kami door to door, kecuali Pandaan. Titik jemput disepakati lewat admin WhatsApp.",
               },
               {
                    question: "Apakah mobil sewa bisa diantar?",
                    answer:
                         "Bisa. Ongkos pengantaran belum termasuk dan dikonfirmasi admin.",
               },
               {
                    question: "Bagaimana cara memesan?",
                    answer:
                         "Pilih rute atau paket di situs ini, lalu lanjutkan lewat WhatsApp. Admin akan mengonfirmasi ketersediaan dan tarif.",
               },
          ],
     },
};

export const blogCta = {
     title: "Butuh Satu Mobil Khusus untuk Rombongan?",
     description:
          "Pilih sewa mobil All In, Lepas Kunci, atau Carter Drop Off 1 Arah sesuai rencana perjalanan Anda.",
     button: "Lihat Sewa Mobil",
     href: "/sewa-mobil",
};