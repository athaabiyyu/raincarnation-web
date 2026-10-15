// BELUM DIKONFIRMASI BOS: kebijakan (pembayaran, bagasi, reschedule, pembatalan, jam balas admin)
// sengaja ditulis "dikonfirmasi admin" karena belum ada keputusan. Edit setelah bos menentukan.
// Fakta terkonfirmasi: travel reguler door to door kecuali Pandaan; sewa mobil bisa diantar (ongkos belum termasuk);
// All In: unit, BBM, driver, parkir (+ tol luar kota); Lepas Kunci: unit, biaya cuci, tanpa ongkos pengantaran.

export type HelpChannelIcon = "chat" | "car" | "calendar";

export const pusatBantuanMeta = {
     title: "Pusat Bantuan Travel & Sewa Mobil Malang | Raincarnation",
     description:
          "Jawaban seputar pemesanan, titik jemput, bagasi, dan perubahan jadwal travel reguler serta sewa mobil di Malang, Batu, dan Surabaya.",
     ogAlt: "Interior armada Raincarnation yang bersih dan nyaman",
};

export const pusatBantuanHero = {
     badge: "Bantuan via WhatsApp",
     title: "Pusat Bantuan & Layanan Pelanggan",
     description:
          "Ada pertanyaan seputar jadwal travel, titik jemput, sewa mobil, atau konfirmasi pemesanan? Tanyakan langsung ke admin lewat WhatsApp.",
};

export const pusatBantuanChannels = {
     srTitle: "Hubungi Kami",
     items: [
          {
               icon: "chat" as HelpChannelIcon,
               title: "Travel Reguler",
               description:
                    "Pemesanan kursi, cek ketersediaan, dan konfirmasi titik jemput.",
               button: "Chat WhatsApp Travel Reguler",
               message: "Halo Admin Raincarnation, saya ingin tanya travel reguler.",
          },
          {
               icon: "car" as HelpChannelIcon,
               title: "Sewa Mobil",
               description:
                    "Konsultasi paket All In, Lepas Kunci, atau Carter Drop Off 1 Arah.",
               button: "Chat WhatsApp Sewa Mobil",
               message: "Halo Admin Raincarnation, saya ingin tanya sewa mobil.",
          },
          {
               icon: "calendar" as HelpChannelIcon,
               title: "Jadwal & Tarif",
               description:
                    "Lihat daftar rute, jadwal keberangkatan, dan tarif travel reguler.",
               button: "Lihat Jadwal & Tarif",
               href: "/travel-reguler",
          },
     ],
};

export const pusatBantuanFaq = {
     eyebrow: "Tanya Jawab",
     title: "Pertanyaan yang Sering Diajukan",
     description: "Buka pertanyaan di bawah untuk melihat jawabannya.",
     groups: [
          {
               title: "Pemesanan & Tarif",
               items: [
                    {
                         question: "Bagaimana cara memesan?",
                         answer:
                              "Pilih rute atau paket di situs ini, isi tanggal dan jam, lalu lanjutkan lewat WhatsApp. Admin akan mengonfirmasi ketersediaan dan tarif sebelum Anda berangkat. Metode pembayaran dikonfirmasi admin saat pemesanan.",
                    },
                    {
                         question: "Apa saja yang termasuk dalam tarif sewa mobil?",
                         answer:
                              "Sewa Mobil All In (1 hari): unit, BBM, driver, dan parkir; untuk rute luar kota ditambah tol. Sewa Mobil Lepas Kunci (12 jam): unit dan biaya cuci, tidak termasuk ongkos pengantaran. Rincian Carter Drop Off 1 Arah dikonfirmasi admin.",
                    },
                    {
                         question: "Apa syarat sewa mobil Lepas Kunci?",
                         answer:
                              "Penyewa membawa KTP dan SIM A yang masih berlaku.",
                    },
               ],
          },
          {
               title: "Titik Jemput",
               items: [
                    {
                         question: "Apakah travel reguler dijemput ke alamat?",
                         answer:
                              "Travel reguler kami door to door, kecuali Pandaan. Titik jemput disepakati lewat admin WhatsApp.",
                    },
                    {
                         question: "Apakah mobil sewa bisa diantar ke tempat saya?",
                         answer:
                              "Bisa. Ongkos pengantaran belum termasuk dan dikonfirmasi admin.",
                    },
               ],
          },
          {
               title: "Bagasi & Muatan",
               items: [
                    {
                         question: "Berapa batas bagasi per penumpang?",
                         answer:
                              "Batas bagasi dikonfirmasi admin saat Anda memesan, karena bergantung pada armada dan jumlah penumpang.",
                    },
               ],
          },
          {
               title: "Ubah Jadwal & Pembatalan",
               items: [
                    {
                         question: "Bagaimana jika saya perlu mengubah atau membatalkan jadwal?",
                         answer:
                              "Hubungi admin lewat WhatsApp sesegera mungkin. Ketentuan perubahan jadwal dan pembatalan dikonfirmasi admin sesuai pesanan Anda.",
                    },
               ],
          },
     ],
};

export const pusatBantuanForm = {
     title: "Form Pesan Cepat",
     subtitle: "Terhubung ke WhatsApp admin",
     labels: {
          name: "Nama Lengkap",
          topic: "Kategori Keperluan",
          message: "Pesan / Rincian Kebutuhan",
     },
     placeholders: {
          name: "Nama Anda",
          message: "Tulis tanggal berangkat, rute, atau pertanyaan Anda",
     },
     topics: [
          "Pesan tiket travel reguler",
          "Sewa mobil",
          "Cek jadwal dan tarif",
          "Ubah jadwal atau pembatalan",
          "Kendala penjemputan",
     ],
     submit: "Kirim Pesan ke Admin",
     note: "Pesan akan dirapikan dan dibuka di aplikasi WhatsApp Anda. Kami tidak menyimpan isi formulir ini.",
};

export const pusatBantuanAreas = {
     eyebrow: "Area Layanan",
     title: "Wilayah yang Kami Layani",
     description:
          "Titik jemput dan antar disepakati lewat admin WhatsApp sebelum berangkat.",
     items: [
          { name: "Malang", detail: "Travel reguler door to door dan sewa mobil." },
          { name: "Batu", detail: "Travel reguler door to door dan sewa mobil." },
          { name: "Surabaya", detail: "Travel reguler door to door dan sewa mobil." },
          { name: "Juanda", detail: "Travel reguler, titik jemput dikonfirmasi admin." },
          { name: "Pandaan", detail: "Travel reguler, tidak door to door; titik dikonfirmasi admin." },
     ],
};

export const pusatBantuanCta = {
     title: "Ada Kendala dalam Perjalanan Anda?",
     description:
          "Hubungi admin lewat WhatsApp dan ceritakan kendalanya. Sertakan rute, tanggal, dan nama pemesan supaya lebih cepat dibantu.",
     button: "Hubungi Admin WhatsApp",
     message: "Halo Admin Raincarnation, saya ada kendala pada pesanan saya.",
};