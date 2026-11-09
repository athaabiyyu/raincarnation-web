export type BerandaServiceIcon = "armchair" | "car";
export type BerandaStepIcon = "layers" | "send" | "badge-check";
export type BerandaWhyIcon =
     | "badge-check"
     | "smile"
     | "shield-check"
     | "message-square-text";

export const berandaHero = {
     titleStart: "Sewa Mobil",
     titleHighlight: "Malang, Batu & Surabaya",
     titleEnd: "dan Travel Antar Kota",
     image: {
          src: "/images/og-sewa-mobil.jpg",
          alt: "Armada sewa mobil Raincarnation Indonesia",
     },
     imageCard: {
          tag: "PILIHAN SEWA FLEKSIBEL",
          title: "Sewa Mobil Sesuai Kebutuhan",
          description:
               "Dengan sopir di Malang, Batu, dan Surabaya; lepas kunci di Malang dan Batu. Rute bebas lewat pilihan rute custom.",
     },
     description:
          "Butuh kendaraan untuk wisata, perjalanan bisnis, atau keperluan keluarga? Temukan pilihan sewa mobil di Malang, Batu, dan Surabaya serta layanan travel antar kota untuk rencana perjalanan Anda.",
     unitLabel: "Armada siap digunakan",
     stats: [
          { value: "24 Jam", label: "Admin via WhatsApp" },
          { value: "600+", label: "Destinasi telah dilayani" },
     ],
};

export const berandaBooking = {
     regulerTab: "Travel",
     carterTab: "Sewa Mobil",
};

export const berandaServices = {
     title: "Sewa Mobil & Travel",
     description:
          "Rental mobil dengan sopir atau lepas kunci, dan travel. Pilih layanan kami sesuai kebutuhan Anda.",
     items: [
          {
               icon: "car",
               tag: "SEWA MOBIL",
               title: "Sewa Mobil Malang, Batu & Surabaya",
               description:
                    "Dengan sopir atau lepas kunci sesuai kebutuhan Anda.",
               points: [
                    "All In (BBM, driver, tol, parkir) atau Non All In",
                    "Lepas Kunci 12 jam, bulanan, atau tahunan (Malang dan Batu)",
                    {
                         text: "Syarat Lepas Kunci: KTP, SIM A, syarat tambahan, dan deposit",
                         href: "/syarat-sewa-mobil-lepas-kunci",
                    },
               ],
               button: "Lihat Pilihan Sewa Mobil",
               href: "/sewa-mobil",
               featured: true,
          },
          {
               icon: "armchair",
               tag: "TRAVEL",
               title: "Travel per Kursi",
               description:
                    "Perjalanan antarkota per kursi untuk rute tetap.",
               points: [
                    "Tarif per kursi, tol dan parkir sudah termasuk",
                    "Dijemput di titik tertentu di tiap kota",
                    "Rute tetap: Malang, Batu, Surabaya, Pandaan, Juanda",
               ],
               button: "Lihat Jadwal & Rute Travel",
               href: "#rute-travel",
               featured: false,
          },
     ] satisfies {
          icon: BerandaServiceIcon;
          tag: string;
          title: string;
          description: string;
          points: (string | { text: string; href: string })[];
          button: string;
          href: string;
          featured: boolean;
     }[],
};

export const berandaSteps = {
     eyebrow: "CARA PESAN",
     title: "3 Langkah Pesan Sewa Mobil dan Travel via WhatsApp",
     description:
          "Pemesanan dilakukan lewat WhatsApp bersama admin Raincarnation.",
     steps: [
          {
               icon: "layers",
               title: "Pilih Layanan",
               description:
                    "Tentukan sewa mobil atau travel per kursi sesuai kebutuhan perjalanan Anda.",
          },
          {
               icon: "send",
               title: "Kirim Kebutuhan Anda",
               description:
                    "Sebutkan tanggal, rute, serta armada atau jumlah kursi yang dibutuhkan lewat WhatsApp.",
          },
          {
               icon: "badge-check",
               title: "Admin Konfirmasi",
               description:
                    "Admin mengonfirmasi ketersediaan dan total biaya.",
          },
     ] satisfies {
          icon: BerandaStepIcon;
          title: string;
          description: string;
     }[],
};

export const berandaWhy = {
     eyebrow: "Sewa Mobil & Travel yang Transparan",
     title: "Mengapa Memilih Raincarnation?",
          description:
          "Rincian layanan sewa mobil dan travel ditulis jelas sejak awal, jadi Anda tahu apa yang termasuk sebelum memesan.",
     button: "Hubungi Admin Reservasi",
     message: "Halo Admin Raincarnation, saya ingin tanya reservasi.",
     items: [
          {
               icon: "badge-check",
               title: "Rincian Tarif Jelas",
               description:
                    "Rincian yang termasuk ditulis jelas. Tarif travel sudah termasuk tol dan parkir.",
          },
          {
               icon: "smile",
               title: "Chat Admin 24 Jam",
               description:
                    "Admin bisa dihubungi lewat WhatsApp kapan saja.",
          },
          {
               icon: "shield-check",
               title: "Armada Sesuai Kebutuhan",
               description:
                    "Pilih unit sesuai kapasitas penumpang dan koper, lalu cek ketersediaannya ke admin.",
          },
          {
               icon: "message-square-text",
               title: "Pilihan Layanan Lengkap",
               description:
                    "Sewa mobil dengan sopir, lepas kunci, carter satu arah, dan travel per kursi.",
          },
     ] satisfies {
          icon: BerandaWhyIcon;
          title: string;
          description: string;
     }[],
};

export const berandaFaq = {
     eyebrow: "PERTANYAAN UMUM",
     title: "Pertanyaan Seputar Sewa Mobil dan Travel",
     description:
          "Temukan jawaban cepat mengenai layanan sewa mobil, paket driver, lepas kunci, dan travel per kursi di Raincarnation.",
     items: [
          {
               question: "Apakah Raincarnation menyediakan layanan sewa mobil dengan driver?",
               answer:
                    "Ya, kami menyediakan paket sewa mobil dengan driver untuk area Malang, Batu, Surabaya, dan bisa custom rute sesuai keinginan Anda. Hubungi admin lewat WhatsApp untuk menanyakan ketersediaan dan rincian layanan.",
          },
          {
               question: "Apakah tersedia sewa mobil lepas kunci (tanpa driver)?",
               answer:
                    "Tersedia di Malang dan Batu, belum di Surabaya. Mobil dikemudikan sendiri, per 12 jam, bulanan, atau tahunan. Dokumen utama KTP dan SIM A, ada syarat tambahan dan deposit. Tanyakan ketersediaan unit ke admin lewat WhatsApp.",
          },
          {
               question: "Apa bedanya sewa mobil All In, Non All In, Lepas Kunci, dan Carter Drop Off?",
               answer:
                    "All In adalah sewa mobil dengan sopir, tarif per hari, sudah termasuk BBM, driver, makan driver, tol, dan parkir. Non All In juga dengan sopir dan tarif per hari, tetapi hanya termasuk BBM dan driver. Lepas Kunci adalah sewa mobil tanpa sopir, dan penyewa membawa KTP serta SIM A yang masih berlaku. Carter Drop Off 1 Arah adalah satu mobil untuk satu rute dari kota asal ke kota tujuan, tarif per rute. Tanyakan rincian lengkapnya ke admin lewat WhatsApp.",
          },
          {
               question: "Berapa lama durasi sewa mobil yang tersedia?",
               answer:
                    "All In dan Non All In dihitung per hari. Lepas Kunci tersedia per 12 jam, bulanan, atau tahunan. Carter Drop Off dihitung per rute tanpa durasi. Butuh durasi lain? Tanyakan ke admin lewat WhatsApp.",
          },
          {
               question: "Berapa harga sewa mobil per hari?",
               answer:
                    "Tarif bergantung pada jenis armada, durasi, dan paket yang dipilih. Gunakan form di bagian atas halaman ini atau tanyakan ke admin lewat WhatsApp.",
          },
          {
               question: "Apa saja jenis armada yang tersedia untuk disewa?",
               answer:
                    "Pilihan armada kami tersedia di halaman Armada, lengkap dengan kapasitas penumpang dan koper. Hubungi admin lewat WhatsApp untuk menanyakan ketersediaan unit.",
          },
          {
               question: "Apakah ada travel dari dan ke Bandara Juanda?",
               answer:
                    "Ada. Rute travel dari dan ke Bandara Juanda tersedia untuk Malang, Batu, dan Pandaan. Titik jemput dikonfirmasi admin lewat WhatsApp.",
          },
          {
               question: "Apakah travel bisa dijemput sampai rumah?",
               answer:
     "Tidak. Travel dijemput di titik tertentu, bukan di alamat rumah. Malang: bundaran SMPN 5 dan Suhat. Batu: alun-alun Batu. Pandaan: area bypass atau perempatan Pandaan. Surabaya: barat area Pakuwon, tengah Tunjungan, timur Rungkut. Juanda: Bandara Juanda. Titik pastinya dikonfirmasi admin lewat WhatsApp.",
          },
          {
               question: "Bagaimana cara melakukan pemesanan sewa mobil di Raincarnation?",
               answer:
                    "Klik tombol WhatsApp yang tersedia, sebutkan tanggal, rute, dan jenis armada yang Anda butuhkan, lalu admin kami akan mengonfirmasi ketersediaan dan total biaya.",
          },
     ],
};

