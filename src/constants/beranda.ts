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
     titleEnd: "dan Travel Door to Door",
     image: {
          src: "/images/interior-armada.webp",
          alt: "Kabin mobil Raincarnation yang bersih dan nyaman untuk sewa mobil di Malang",
     },
     imageCard: {
          tag: "PILIHAN SEWA FLEKSIBEL",
          title: "Sewa Mobil Sesuai Kebutuhan",
          description:
               "Dengan sopir atau lepas kunci. Titik sewa di Malang, Batu, dan Surabaya, rute bebas sesuai rencana Anda.",
     },
     description:
          "Sewa mobil dengan sopir atau lepas kunci di Malang, Batu, dan Surabaya, rute bebas lewat custom rute. Butuh kursi saja? Pilih travel door to door per kursi (travel reguler).",
     unitLabel: "Armada siap pakai",
     stats: [
          { value: "24 Jam", label: "Layanan admin" },
          { value: "600+", label: "Destinasi telah dilayani" },
     ],
};

export const berandaBooking = {
     regulerTab: "Travel (Per Kursi)",
     carterTab: "Sewa Mobil (Satu Mobil Penuh)",
};

export const berandaServices = {
     title: "Sewa Mobil & Travel per Kursi",
     description:
          "Rental mobil Malang dengan sopir atau lepas kunci, atau travel per kursi untuk rute tetap. Pilih sesuai kebutuhan perjalanan Anda.",
     items: [
          {
               icon: "car",
               tag: "SEWA MOBIL",
               title: "Sewa Mobil Malang, Batu & Surabaya",
               description:
                    "Dengan sopir atau lepas kunci sesuai kebutuhan Anda.",
               points: [
                    "All In (BBM, driver, tol, parkir) atau Non All In",
                    "Lepas Kunci 12 jam, bulanan, atau tahunan",
                    "Syarat lepas kunci: KTP dan SIM A",
               ],
               button: "Pilihan Unit & Sewa Mobil Malang",
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
                    "Dijemput di alamat Anda (kecuali Pandaan dan Juanda)",
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
          points: string[];
          button: string;
          href: string;
          featured: boolean;
     }[],
};

export const berandaSteps = {
     eyebrow: "CARA PESAN",
     title: "3 Langkah Pesan via WhatsApp",
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
     eyebrow: "Standar Kualitas Raincarnation",
     title: "Mengapa Memilih Raincarnation?",
     description:
          "Rincian layanan ditulis jelas sejak awal, jadi Anda tahu apa yang termasuk sebelum memesan.",
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
               title: "Layanan 24 Jam",
               description:
                    "Admin bisa dihubungi lewat WhatsApp kapan saja.",
          },
          {
               icon: "shield-check",
               title: "Unit Dicek Sebelum Berangkat",
               description:
                    "Setiap unit dicek dulu sebelum digunakan.",
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
     title: "Pertanyaan Sering Diajukan Seputar Sewa Mobil Malang",
     description:
          "Temukan jawaban cepat mengenai layanan sewa mobil, paket driver, lepas kunci, dan travel per kursi di Raincarnation.",
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
               question: "Apa bedanya sewa mobil All In, Non All In, Lepas Kunci, dan Carter Drop Off?",
               answer:
                    "All In adalah sewa mobil dengan sopir, tarif per hari, sudah termasuk BBM, driver, makan driver, tol, dan parkir. Non All In juga dengan sopir dan tarif per hari, tetapi hanya termasuk BBM dan driver. Lepas Kunci adalah sewa mobil tanpa sopir, dan penyewa membawa KTP serta SIM A yang masih berlaku. Carter Drop Off 1 Arah adalah satu mobil untuk satu rute dari kota asal ke kota tujuan, tarif per rute. Tanyakan rincian lengkapnya ke admin lewat WhatsApp.",
          },
          {
               question: "Berapa lama durasi sewa mobil yang tersedia?",
               answer:
                    "All In dan Non All In dihitung per hari. Lepas Kunci tersedia per 12 jam, bulanan, atau tahunan. Carter Drop Off dihitung per rute tanpa durasi. Butuh durasi lain, termasuk 24 jam? Tanyakan ke admin lewat WhatsApp.",
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

