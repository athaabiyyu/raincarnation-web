import type { Armada } from "@/types/armada";

export const sewaMobilHero = {
     badge: "Sewa Mobil dengan Sopir atau Lepas Kunci",
     tagline: "Satu Armada Khusus Rombongan Anda",
     highlightChip: "Tanpa Penumpang Campuran",
     titleStart: "Sewa Mobil Malang",
     titleHighlight: "Lepas Kunci atau dengan Sopir",
     titleEnd: ", Rute Sesuai Rencana Anda.",
     description:
          "Sewa mobil Malang lepas kunci atau dengan sopir untuk perjalanan di Malang, Batu, Surabaya, dan Pasuruan. Pilih paket dan armada sesuai kebutuhan, cek simulasi tarif, lalu pesan lewat WhatsApp.",
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
          "Pilih paket sewa mobil dengan sopir atau lepas kunci, durasi sewa 12 jam, untuk perjalanan di Malang, Batu, dan Surabaya.",
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
     eyebrow: "Tarif & Reservasi",
     title: "Cari Sewa Mobil",
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

// BELUM DIKONFIRMASI BOS: Surabaya dianggap luar kota (tol) di All In; nama paket harus sama persis dengan paket_sewa di CMS.
export type SewaMobilPackageKind = "drop-off" | "all-in" | "lepas-kunci";

export type SewaMobilRouteScope = "dalam-kota" | "luar-kota";

export const sewaMobilPackageConfig = {
     askAdminText: "Tanyakan harga ke admin",
     packages: [
          {
               kind: "drop-off" as SewaMobilPackageKind,
               name: "Carter Drop Off 1 Arah",
          },
          {
               kind: "all-in" as SewaMobilPackageKind,
               name: "Sewa Mobil All In",
               duration: "1 hari",
               priceUnit: "/hari",
               routes: [
                    { label: "Malang", scope: "dalam-kota" as SewaMobilRouteScope },
                    { label: "Batu", scope: "dalam-kota" as SewaMobilRouteScope },
                    { label: "Surabaya", scope: "luar-kota" as SewaMobilRouteScope },
               ],
               customRouteLabel: "Custom rute",
               includes: {
                    "dalam-kota": ["Unit", "BBM", "Driver", "Parkir"],
                    "luar-kota": ["Unit", "BBM", "Driver", "Tol", "Parkir"],
               },
               excludes: [] as string[],
          },
          {
               kind: "lepas-kunci" as SewaMobilPackageKind,
               name: "Sewa Mobil Lepas Kunci",
               duration: "12 jam",
               priceUnit: "/12 jam",
               routes: [
                    {
                         label: "Dalam kota (Malang, Batu)",
                         value: "Dalam kota",
                    },
               ],
               customRouteLabel: "Luar kota",
               includes: ["Unit", "Biaya cuci"],
               excludes: ["Ongkos pengantaran"],
          },
     ],
     labels: {
          fleet: "Armada",
          duration: "Durasi",
          route: "Rute",
          passengers: "Jumlah Penumpang",
          customRoute: "Rute yang diinginkan",
          includes: "Sudah termasuk",
          excludes: "Tidak termasuk",
     },
     placeholders: {
          passengers: "Jumlah penumpang",
          customRoute: "Contoh: Malang - Bromo - Malang",
     },
};

// 15 DATA DUMMY ARMADA UNTUK TESTING LAYOUT UI
export const dummyArmadaList: Armada[] = [
     {
          id: 1,
          slug: "toyota-alphard-transformer",
          title: "Toyota Alphard Transformer",
          featured_image: {
               url: "/images/interior-armada.webp",
               alt: "Toyota Alphard Transformer Raincarnation",
          },
          acf: {
               label: "Executive Class",
               jumlah_penumpang: "5 penumpang",
               koper: "4-5 koper",
               harga: "2500000",
               bbm: "Termasuk BBM",
               kata_kunci_utama: "Sewa Alphard Malang",
          },
     },
     {
          id: 2,
          slug: "all-new-avanza",
          title: "All New Avanza",
          featured_image: {
               url: "/images/interior-armada.webp",
               alt: "All New Avanza Raincarnation",
          },
          acf: {
               label: "Keluarga / Dinas",
               jumlah_penumpang: "6 penumpang",
               koper: "2-3 koper",
               harga: "450000",
               bbm: "Termasuk BBM",
               kata_kunci_utama: "Sewa Avanza Malang",
          },
     },
     {
          id: 3,
          slug: "innova-zenix-hybrid",
          title: "Toyota Innova Zenix Hybrid",
          featured_image: {
               url: "/images/interior-armada.webp",
               alt: "Innova Zenix Hybrid Raincarnation",
          },
          acf: {
               label: "Premium Comfort",
               jumlah_penumpang: "6 penumpang",
               koper: "4 koper",
               harga: "850000",
               bbm: "Termasuk BBM",
               kata_kunci_utama: "Sewa Innova Zenix Malang",
          },
     },
     {
          id: 4,
          slug: "innova-reborn",
          title: "Toyota Innova Reborn",
          featured_image: {
               url: "/images/interior-armada.webp",
               alt: "Toyota Innova Reborn Raincarnation",
          },
          acf: {
               label: "Favorit Keluarga",
               jumlah_penumpang: "6 penumpang",
               koper: "3-4 koper",
               harga: "650000",
               bbm: "Termasuk BBM",
               kata_kunci_utama: "Sewa Innova Reborn Malang",
          },
     },
     {
          id: 5,
          slug: "xpander-cross",
          title: "Mitsubishi Xpander Cross",
          featured_image: {
               url: "/images/interior-armada.webp",
               alt: "Xpander Cross Raincarnation",
          },
          acf: {
               label: "MPV Crossover",
               jumlah_penumpang: "6 penumpang",
               koper: "3 koper",
               harga: "500000",
               bbm: "Termasuk BBM",
          },
     },
     {
          id: 6,
          slug: "fortuner-gr-sport",
          title: "Toyota Fortuner GR Sport",
          featured_image: {
               url: "/images/interior-armada.webp",
               alt: "Toyota Fortuner GR Sport Raincarnation",
          },
          acf: {
               label: "SUV Premium",
               jumlah_penumpang: "5 penumpang",
               koper: "4 koper",
               harga: "1400000",
               bbm: "Termasuk BBM",
          },
     },
     {
          id: 7,
          slug: "pajero-sport-dakar",
          title: "Mitsubishi Pajero Sport Dakar",
          featured_image: {
               url: "/images/interior-armada.webp",
               alt: "Pajero Sport Dakar Raincarnation",
          },
          acf: {
               label: "SUV Tough",
               jumlah_penumpang: "5 penumpang",
               koper: "4 koper",
               harga: "1400000",
               bbm: "Termasuk BBM",
          },
     },
     {
          id: 8,
          slug: "hiace-commuter",
          title: "Toyota Hiace Commuter",
          featured_image: {
               url: "/images/interior-armada.webp",
               alt: "Toyota Hiace Commuter Raincarnation",
          },
          acf: {
               label: "Rombongan Sedang",
               jumlah_penumpang: "14 penumpang",
               koper: "6 koper",
               harga: "1100000",
               bbm: "Termasuk BBM",
          },
     },
     {
          id: 9,
          slug: "hiace-premio-luxury",
          title: "Toyota Hiace Premio Luxury",
          featured_image: {
               url: "/images/interior-armada.webp",
               alt: "Hiace Premio Luxury Raincarnation",
          },
          acf: {
               label: "VIP Group Class",
               jumlah_penumpang: "8 penumpang",
               koper: "6 koper",
               harga: "1600000",
               bbm: "Termasuk BBM",
          },
     },
     {
          id: 10,
          slug: "elf-long-coaster",
          title: "Isuzu ELF Long Coaster",
          featured_image: {
               url: "/images/interior-armada.webp",
               alt: "Isuzu ELF Long Coaster Raincarnation",
          },
          acf: {
               label: "Rombongan Besar",
               jumlah_penumpang: "19 penumpang",
               koper: "8 koper",
               harga: "1300000",
               bbm: "Termasuk BBM",
          },
     },
     {
          id: 11,
          slug: "gran-max-bv",
          title: "Daihatsu Gran Max BV",
          featured_image: {
               url: "/images/interior-armada.webp",
               alt: "Daihatsu Gran Max Raincarnation",
          },
          acf: {
               label: "Ekonomis",
               jumlah_penumpang: "7 penumpang",
               koper: "3 koper",
               harga: "350000",
               bbm: "Termasuk BBM",
          },
     },
     {
          id: 12,
          slug: "ertiga-hybrid",
          title: "Suzuki Ertiga Hybrid",
          featured_image: {
               url: "/images/interior-armada.webp",
               alt: "Suzuki Ertiga Hybrid Raincarnation",
          },
          acf: {
               label: "Hemat BBM",
               jumlah_penumpang: "6 penumpang",
               koper: "3 koper",
               harga: "450000",
               bbm: "Termasuk BBM",
          },
     },
     {
          id: 13,
          slug: "crv-turbo-prestige",
          title: "Honda CR-V Turbo Prestige",
          featured_image: {
               url: "/images/interior-armada.webp",
               alt: "Honda CR-V Turbo Raincarnation",
          },
          acf: {
               label: "Executive SUV",
               jumlah_penumpang: "5 penumpang",
               koper: "3 koper",
               harga: "1200000",
               bbm: "Termasuk BBM",
          },
     },
     {
          id: 14,
          slug: "medium-bus-pariwisata",
          title: "Medium Bus Pariwisata",
          featured_image: {
               url: "/images/interior-armada.webp",
               alt: "Medium Bus Pariwisata Raincarnation",
          },
          acf: {
               label: "Group Bus Class",
               jumlah_penumpang: "33 penumpang",
               koper: "15 koper",
               harga: "2200000",
               bbm: "Termasuk BBM",
          },
     },
     {
          id: 15,
          slug: "big-bus-jetbus-5",
          title: "Big Bus Luxury Jetbus 5",
          featured_image: {
               url: "/images/interior-armada.webp",
               alt: "Big Bus Luxury Jetbus 5 Raincarnation",
          },
          acf: {
               label: "Corporate & Tour",
               jumlah_penumpang: "50 penumpang",
               koper: "25 koper",
               harga: "3500000",
               bbm: "Termasuk BBM",
          },
     },
];