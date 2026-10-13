// BELUM DIKONFIRMASI BOS: semua klaim di file ini dipasang sementara dari desain Stitch.
// Isi kartu paket ada di CMS (CPT paket-sewa) dan juga harus dikonfirmasi bos sebelum rilis.
// Klaim katalog armada yang perlu dikonfirmasi: "inspeksi berkala pra-keberangkatan, interior
// higienis wangi, pendingin kabin optimal", "SUV 4x4 proyek, bus medium 30-35 seat",
// dan teks kartu "Butuh Alphard..." (Alphard sudah ada di CMS).
// Klaim 4 Pilar yang perlu dikonfirmasi: jadwal jemput 24 jam (subuh sampai larut malam),
// sopir menunggu di rest area, dan "driver terverifikasi catatan berkendara aman,
// tidak merokok di kabin" (berisiko).
export const sewaMobilHero = {
     badge: "Sewa Mobil dengan Sopir atau Lepas Kunci",
     tagline: "Satu Armada Khusus Rombongan Anda",
     highlightChip: "Tanpa Penumpang Campuran",
     titleStart: "Sewa Mobil Malang dengan",
     titleHighlight: "Sopir atau Lepas Kunci",
     titleEnd: ", Rute Sesuai Rencana Anda.",
     description:
          "Sewa mobil Malang, Batu, dan Surabaya dengan sopir atau lepas kunci, durasi sewa 12 jam. Tarif menyesuaikan komponen biaya seperti BBM dan parkir. Tanyakan rinciannya lewat WhatsApp.",
     stats: [
          { value: "12 Jam", label: "Durasi Sewa" },
          { value: "1 Mobil", label: "Khusus Rombongan Anda" },
          { value: "2 Opsi", label: "Dengan Sopir atau Lepas Kunci" },
     ],
     primaryCta: {
          label: "Simulasi & Cek Tarif",
          href: "#simulasi-carter",
     },
     whatsappCta: {
          label: "Chat WhatsApp Admin",
          message:
               "Halo Admin Raincarnation, saya ingin konsultasi sewa 1 mobil penuh carter drop.",
     },
     regularLink: {
          text: "Tidak butuh satu mobil penuh?",
          label: "Lihat Travel Reguler per kursi",
          href: "/travel-reguler",
     },
};

export const sewaMobilPackages = {
     eyebrow: "Kategori Fleksibel",
     title: "Pilihan Paket Sewa & Drop Penuh",
     description:
          "Sesuaikan skenario mobilitas Anda, mulai dari sekali antar antarprovinsi hingga pemakaian berhari-hari.",
};

export const sewaMobilFleet = {
     eyebrow: "Katalog Armada",
     title: "Pilihan Armada untuk Sewa Mobil",
     description:
          "Pilih unit yang sesuai jumlah penumpang dan kebutuhan perjalanan Anda, lalu tanyakan ketersediaan dan tarifnya lewat WhatsApp.",
     selectLabel: "Pilih Unit",
     customCard: {
          eyebrow: "Armada Spesifik Lainnya",
          title: "Butuh Alphard, Fortuner, atau Medium Bus?",
          description:
               "Kami siap menyediakan kendaraan VIP premium, SUV 4x4 proyek, hingga bus medium 30-35 seat untuk rombongan skala besar. Hubungi admin untuk ketersediaan garasi terdekat.",
          buttonLabel: "Tanyakan Unit Khusus",
          message:
               "Halo Admin Raincarnation, saya butuh ketersediaan armada khusus (Alphard/Bus/Fortuner).",
     },
};

export type SewaMobilPillarIcon = "clock" | "route" | "lock" | "smile";

export const sewaMobilPillars = {
     eyebrow: "Keunggulan Layanan",
     title: "Keuntungan Sewa Satu Mobil Penuh",
     description:
          "Satu mobil khusus untuk rombongan Anda, dengan jadwal dan rute yang bisa disesuaikan dengan rencana perjalanan.",
     items: [
          {
               icon: "clock" as SewaMobilPillarIcon,
               title: "Jadwal Fleksibel",
               description:
                    "Tidak ada jam keberangkatan kaku. Anda yang menentukan waktu penjemputan, sesuai kesepakatan dengan admin.",
          },
          {
               icon: "route" as SewaMobilPillarIcon,
               title: "Rute Sesuai Rencana",
               description:
                    "Ingin istirahat di rest area favorit, mampir kulineran khas daerah, atau beli oleh-oleh di perjalanan? Rute bisa disesuaikan.",
          },
          {
               icon: "lock" as SewaMobilPillarIcon,
               title: "Privasi Terjaga",
               description:
                    "Satu mobil khusus rombongan Anda tanpa penumpang lain. Bebas ngobrol, beristirahat, memutar musik, atau meeting santai.",
          },
          {
               icon: "smile" as SewaMobilPillarIcon,
               title: "Sopir Berpengalaman",
               description:
                    "Sopir mengutamakan keselamatan dan kenyamanan penumpang selama perjalanan.",
          },
     ],
};


export const sewaMobilForm = {
     eyebrow: "Cek Tarif & Reservasi",
     title: "Detail Sewa Mobil",
     description:
          "Isi form sederhana di samping. Rincian pesanan akan dirapikan otomatis sehingga langsung terbaca jelas oleh Admin WhatsApp Raincarnation untuk konfirmasi.",
     trustItems: [
          {
               title: "Harga All-In Transparan",
               description:
                    "Termasuk BBM dan jasa driver. Biaya tol dan parkir dapat disesuaikan sesuai kebutuhan rute Anda.",
          },
          {
               title: "Garansi Unit Pengganti",
               description:
                    "Bila unit mengalami kendala teknis, armada cadangan sekelas langsung diberangkatkan.",
          },
     ],
     emergency: {
          question: "Butuh Penanganan Cepat Hari Ini?",
          linkLabel: "Telepon / WhatsApp Admin 24 Jam",
          message: "Halo Admin Raincarnation, saya butuh penanganan cepat hari ini.",
     },
     labels: {
          packageType: "Jenis layanan",
          fleet: "Pilihan Armada",
          origin: "Kota Asal / Titik Jemput",
          destination: "Kota Tujuan",
          date: "Tanggal Berangkat",
          time: "Jam Berangkat",
          passengers: "Jumlah Penumpang dan Koper",
          notes: "Catatan Rute / Permintaan Khusus (Opsional)",
     },
     placeholders: {
          origin: "Kota atau alamat penjemputan",
          destination: "Kota atau tempat tujuan",
          passengers: "Jumlah orang dan jumlah koper",
          notes: "Tulis permintaan khusus bila ada",
     },
     otherOption: "Lainnya / Belum yakin",
     previewLabel: "Format Reservasi WhatsApp Otomatis:",
     submitLabel: "Reservasi Sekarang",
     footnote:
          "Tanpa komitmen uang muka sebelum unit & driver dikonfirmasi oleh admin kami.",
};

export const sewaMobilFormIntro = {
     eyebrow: "Simulasi Tarif",
     title: "Cek Tarif Sewa Mobil Anda",
     description:
          "Pilih paket sewa, armada, dan rute perjalanan, lalu isi tanggal dan jam untuk melihat estimasi tarif dan melanjutkan pemesanan melalui WhatsApp.",
} as const;