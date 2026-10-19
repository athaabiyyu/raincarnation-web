// BELUM DIKONFIRMASI BOS: seluruh artikel di sini hanya CONTOH untuk preview tampilan.
// Nanti diganti artikel dari CMS (tipe "artikel"). Tanpa tanggal, waktu baca, dan penulis karena belum ada artikel asli.

export type BlogCategory =
     | "Panduan Rute"
     | "Tips & Wisata"
     | "Seputar Armada"
     | "Sewa Mobil";

export const blogMeta = {
     title: "Blog & Panduan Perjalanan Malang, Batu, Surabaya | Raincarnation",
     description:
          "Panduan memilih travel reguler, sewa mobil, dan armada untuk perjalanan di Malang, Batu, Surabaya, Juanda, dan Pandaan.",
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

export const blogFeatured = {
     category: "Panduan Rute" as BlogCategory,
     title:
          "Panduan Naik Travel Reguler Malang – Surabaya: Memilih Jadwal dan Titik Jemput",
     excerpt:
          "Cara membaca jadwal keberangkatan, memilih kursi, dan menyepakati titik jemput bersama admin sebelum berangkat.",
     tags: ["#TravelMalang", "#MalangSurabaya", "#TravelReguler"],
     image: {
          src: "/images/interior-armada.webp",
          alt: "Interior armada Raincarnation yang bersih dan nyaman",
     },
     badge: "Pilihan Editor",
     buttonLabel: "Tanya via WhatsApp",
     whatsappMessage:
          "Halo Admin Raincarnation, saya ingin tanya travel reguler Malang - Surabaya.",
};

export const blogArticles = {
     title: "Artikel Populer",
     previewNote: "Contoh tampilan",
     items: [
          {
               category: "Sewa Mobil" as BlogCategory,
               title: "Carter Malang – Batu untuk Liburan Keluarga: Apa yang Perlu Disiapkan",
               excerpt:
                    "Menentukan jam berangkat, jumlah penumpang, dan rute bersama admin supaya liburan keluarga lebih tenang.",
          },
          {
               category: "Panduan Rute" as BlogCategory,
               title: "Dari Batu ke Surabaya: Rute, Tarif, dan Cara Memesan Travel",
               excerpt:
                    "Gambaran singkat memesan travel reguler Batu – Surabaya lewat WhatsApp, dari memilih jadwal sampai konfirmasi.",
          },
          {
               category: "Seputar Armada" as BlogCategory,
               title: "Avanza atau Alphard? Memilih Armada Sesuai Jumlah Penumpang",
               excerpt:
                    "Membandingkan kebutuhan penumpang dan barang bawaan agar armada yang dipilih terasa pas.",
          },
          {
               category: "Sewa Mobil" as BlogCategory,
               title: "Lepas Kunci atau dengan Sopir: Mana yang Cocok untuk Perjalanan Anda",
               excerpt:
                    "Perbedaan paket All In dan Lepas Kunci, serta hal yang perlu dipertimbangkan sebelum memilih.",
          },
          {
               category: "Panduan Rute" as BlogCategory,
               title: "Menuju Bandara Juanda dari Malang dan Batu: Tips Mengatur Jadwal",
               excerpt:
                    "Menyiapkan waktu berangkat yang aman untuk penerbangan Anda dan memastikan titik jemput dengan admin.",
          },
          {
               category: "Tips & Wisata" as BlogCategory,
               title: "Tips Menyiapkan Barang Bawaan Sebelum Naik Travel",
               excerpt:
                    "Cara menata barang bawaan agar perjalanan nyaman. Aturan bagasi dikonfirmasi admin saat memesan.",
          },
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