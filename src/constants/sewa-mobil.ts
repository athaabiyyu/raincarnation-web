import type { Armada } from "@/types/armada";

export const sewaMobilHero = {
     badge: "Sewa Mobil dengan Sopir atau Lepas Kunci",
     tagline: "Satu Armada Khusus Rombongan Anda",
     highlightChip: "Tanpa Penumpang Campuran",
     titleStart: "Sewa Mobil Malang",
     titleHighlight: "Lepas Kunci atau dengan Sopir",
     titleEnd: ", Rute Sesuai Rencana Anda.",
     description:
          "Melayani sewa mobil dengan sopir di Malang, Batu, dan Surabaya: paket harian atau carter drop off 1 arah. Lepas kunci tersedia di Malang dan Batu per 12 jam, bulanan, atau tahunan. Pesan lewat WhatsApp.",
     stats: [
          { value: "4 Paket", label: "Carter Drop Off, All In, Non All In, Lepas Kunci" },
          { value: "24 Jam", label: "Layanan, Pesan via WhatsApp" },
          { value: "Rute Fleksibel", label: "Malang, Batu, Surabaya, atau rute lain" },
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
          label: "Lihat Travel per kursi",
          href: "/travel",
     },
};

export const sewaMobilPackages = {
     eyebrow: "Kategori Fleksibel",
     title: "Pilihan Paket Sewa Mobil Malang",
     description:
          "Pilih skema sewa yang paling pas untuk kebutuhanmu, mulai dari perjalanan harian, carter sekali jalan, hingga sewa lepas kunci jangka pendek maupun jangka panjang. Titik sewa kami ada di Malang, Batu, dan Surabaya, dengan rute yang bisa disesuaikan."
};

export const sewaMobilFleet = {
     eyebrow: "Katalog Armada",
     title: "Pilihan Armada Sewa Mobil Malang",
     description:
          "Pilih unit sesuai jumlah penumpang dan bagasi, untuk sewa lepas kunci maupun dengan sopir. Tanyakan ketersediaan dan tarifnya lewat WhatsApp.",
     selectLabel: "Pilih Unit",
     seeAll: {
          label: "Lihat Semua Unit Armada",
          href: "/armada",
     },
     customCard: {
          eyebrow: "Unit Lainnya",
          title: "Butuh Unit yang Belum Tampil?",
          description:
               "Tidak menemukan unit yang Anda cari? Sebutkan jumlah penumpang dan kebutuhan perjalanan Anda, admin akan cek unit yang tersedia.",
          buttonLabel: "Tanyakan Unit Lain",
          message:
               "Halo Admin Raincarnation, saya butuh ketersediaan unit lain di luar katalog.",
     },
};

export type SewaMobilPillarIcon = "clock" | "route" | "lock" | "smile";

export const sewaMobilPillars = {
     eyebrow: "Keunggulan Layanan",
     title: "Keuntungan Sewa Mobil di Raincarnation",
     description:
          "Satu mobil khusus untuk Anda, dengan sopir atau lepas kunci, dan rute yang bisa disesuaikan dengan rencana perjalanan.",
     items: [
          {
               icon: "clock" as SewaMobilPillarIcon,
               title: "Jadwal Fleksibel",
               description:
                    "Waktu penjemputan atau pengambilan unit diatur sesuai kebutuhan Anda, lalu dikonfirmasi bersama admin.",
          },
          {
               icon: "route" as SewaMobilPillarIcon,
               title: "Rute Sesuai Rencana",
               description:
                    "Carter Drop Off, All In, dan Non All In melayani Malang, Batu, dan Surabaya. Lepas Kunci melayani dalam kota (Malang, Batu), sedangkan luar kota tarifnya ditanyakan ke admin. Butuh tujuan lain? All In dan Non All In bisa lewat custom rute. Mampir ke kota lain dikenakan biaya tambahan.",
          },
          {
               icon: "lock" as SewaMobilPillarIcon,
               title: "Privasi Terjaga",
               description:
                    "Satu mobil khusus rombongan Anda tanpa penumpang lain. Bebas ngobrol, beristirahat, memutar musik, atau meeting santai.",
          },
          {
               icon: "smile" as SewaMobilPillarIcon,
               title: "Dengan Sopir atau Lepas Kunci",
               description:
                    "Butuh sopir? Pilih Carter Drop Off, All In, atau Non All In. Ingin menyetir sendiri? Pilih Lepas Kunci dengan KTP dan SIM A yang masih berlaku.",
          },
     ],
};

export const sewaMobilForm = {
     eyebrow: "Tarif & Reservasi",
     title: "Cari Sewa Mobil",
     description:
          "Isi form sederhana di samping. Rincian pesanan akan dirapikan otomatis sehingga langsung terbaca jelas oleh Admin WhatsApp Raincarnation untuk konfirmasi.",
     emergency: {
          question: "Butuh Penanganan Cepat Hari Ini?",
          linkLabel: "Telepon / WhatsApp Admin 24 Jam",
          message: "Halo Admin Raincarnation, saya butuh penanganan cepat hari ini.",
     },
     labels: {
          packageType: "Jenis layanan",
          fleet: "Pilihan Armada",
          origin: "Kota Asal",
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

// BELUM DIKONFIRMASI BOS: rincian "termasuk" mengikuti informasi bos sesi 18; nama paket Carter harus sama persis dengan paket_sewa di CMS (rute-carter).
export type SewaMobilPackageKind =
     | "drop-off"
     | "all-in"
     | "non-all-in"
     | "lepas-kunci";

export type SewaMobilRouteScope = "dalam-kota" | "luar-kota";

const sewaMobilCityRoutes = [
     { label: "Malang" },
     { label: "Batu" },
     { label: "Surabaya" },
];

export const sewaMobilPackageConfig = {
     askAdminText: "Tanyakan harga ke admin",
     packages: [
          {
               kind: "drop-off" as SewaMobilPackageKind,
               name: "Carter Drop Off 1 Arah",
               includes: ["Unit", "BBM", "Driver"],
          },
          {
               kind: "all-in" as SewaMobilPackageKind,
               name: "Sewa Mobil All In",
               duration: "1 hari",
               priceUnit: "/hari",
               routes: sewaMobilCityRoutes,
               customRouteLabel: "Custom rute",
               includes: [
                    "Unit",
                    "BBM",
                    "Driver",
                    "Makan driver",
                    "Tol",
                    "Parkir",
               ],
               excludes: [] as string[],
          },
          {
               kind: "non-all-in" as SewaMobilPackageKind,
               name: "Sewa Mobil Non All In",
               duration: "1 hari",
               priceUnit: "/hari",
               routes: sewaMobilCityRoutes,
               customRouteLabel: "Custom rute",
               includes: ["Unit", "BBM", "Driver"],
               excludes: [] as string[],
          },
          {
               kind: "lepas-kunci" as SewaMobilPackageKind,
               name: "Sewa Mobil Lepas Kunci",
               durations: [
                    { value: "12-jam", label: "12 jam", priceUnit: "/12 jam" },
                    { value: "bulanan", label: "Bulanan", priceUnit: "/bulan" },
                    { value: "tahunan", label: "Tahunan", priceUnit: "/tahun" },
               ],
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
          withDriver: "Dengan sopir",
          driverAddOn: "Tambahan driver",
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
          },
     },
];