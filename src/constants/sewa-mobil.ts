// BELUM DIKONFIRMASI BOS: semua klaim di file ini dipasang sementara dari desain Stitch.
// Isi kartu paket ada di CMS (CPT paket-sewa) dan juga harus dikonfirmasi bos sebelum rilis.
// Klaim katalog armada yang perlu dikonfirmasi: "inspeksi berkala pra-keberangkatan, interior
// higienis wangi, pendingin kabin optimal", "SUV 4x4 proyek, bus medium 30-35 seat",
// dan teks kartu "Butuh Alphard..." (Alphard sudah ada di CMS).
// Klaim 4 Pilar yang perlu dikonfirmasi: jadwal jemput 24 jam (subuh sampai larut malam),
// sopir menunggu di rest area, dan "driver terverifikasi catatan berkendara aman,
// tidak merokok di kabin" (berisiko).

export const sewaMobilHero = {
     badge: "Layanan Resmi Carter Privat Drop",
     tagline: "1 Armada Khusus Rombongan Anda",
     highlightChip: "100% Tanpa Penumpang Campuran",
     titleStart: "Perjalanan Eksklusif",
     titleHighlight: "Satu Mobil Penuh",
     titleEnd: ", Rute Suka-suka.",
     description:
          "Solusi transportasi bebas kompromi untuk keluarga tercinta, dinas eksekutif instansi, agenda ziarah, atau liburan wisata. Tanpa menunggu penumpang lain, bebas jam penjemputan dari depan teras rumah, dan fleksibel singgah di rest area mana pun.",
     stats: [
          { value: "100%", label: "Privat & Terjaga" },
          { value: "24 Jam", label: "Jadwal Bebas Pilih" },
          { value: "All-In", label: "Mobil + Sopir + BBM" },
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
     eyebrow: "Armada Penuh Bersih & Terawat",
     title: "Katalog Unit Carter Privat Raincarnation",
     description:
          "Setiap mobil telah melalui inspeksi berkala pra-keberangkatan, interior higienis wangi, dan pendingin kabin optimal.",
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
     eyebrow: "Jaminan Kualitas Eksklusif",
     title: "Kenapa Sewa 1 Mobil Penuh Lebih Menenangkan?",
     description:
          "Bebas dari kendala jadwal kaku dan rasakan kendali penuh atas ritme liburan maupun dinas kantor Anda.",
     items: [
          {
               icon: "clock" as SewaMobilPillarIcon,
               title: "Jadwal 100% Fleksibel",
               description:
                    "Tidak ada jam keberangkatan kaku. Anda yang tentukan sendiri waktu penjemputan dari depan pintu rumah, baik subuh, siang, maupun larut malam.",
          },
          {
               icon: "route" as SewaMobilPillarIcon,
               title: "Bebas Rute & Rest Area",
               description:
                    "Ingin istirahat di rest area favorit, mampir kulineran khas daerah, atau beli oleh-oleh di perjalanan? Supir siap menunggu dengan ramah.",
          },
          {
               icon: "lock" as SewaMobilPillarIcon,
               title: "Privasi 100% Terjaga",
               description:
                    "Satu mobil khusus rombongan Anda tanpa orang asing. Bebas ngobrol, tidur pulas, beristirahat santai, memutar musik kesukaan, atau meeting santai.",
          },
          {
               icon: "smile" as SewaMobilPillarIcon,
               title: "Sopir Sopan & Berpengalaman",
               description:
                    "Driver terverifikasi catatan berkendara aman, tidak ugal-ugalan di jalan tol, tidak merokok sembarangan di kabin, dan mengutamakan keselamatan penumpang.",
          },
     ],
};


export const sewaMobilForm = {
     eyebrow: "Kalkulator & Estimasi Langsung",
     title: "Simulasi Kebutuhan Carter Anda",
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
          packageType: "Jenis Paket Sewa",
          fleet: "Pilihan Unit Armada",
          origin: "Kota Asal / Titik Jemput",
          destination: "Kota Tujuan / Destinasi",
          date: "Tanggal Berangkat",
          time: "Jam Berangkat",
          passengers: "Jumlah Penumpang & Koper",
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
     submitLabel: "Kirim Rincian & Reservasi via WhatsApp",
     footnote:
          "Tanpa komitmen uang muka sebelum unit & driver dikonfirmasi oleh admin kami.",
};