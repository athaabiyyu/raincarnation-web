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
          "Sewa mobil dengan sopir atau lepas kunci, tersedia 24 jam. Titik sewa di Malang, Batu, dan Surabaya, rute bebas lewat custom rute. Butuh kursi saja? Pilih travel door to door per kursi (travel reguler) mulai Rp100.000, sudah termasuk tol dan parkir.",
};

export const berandaBooking = {
     regulerTab: "Travel (Per Kursi)",
     carterTab: "Sewa Mobil (Satu Mobil Penuh)",
};

export const berandaServices = {
     title: "Sewa Mobil & Travel per Kursi",
     description:
          "Sewa mobil Malang (rental mobil) dengan sopir atau lepas kunci. Titik sewa di Malang, Batu, dan Surabaya, dengan rute bebas ke mana saja lewat custom rute. Butuh satu atau beberapa kursi saja? Pilih Travel per kursi untuk rute tetap antara Malang, Batu, Surabaya, Pandaan, dan Bandara Juanda.",
     items: [
          {
               icon: "car",
               tag: "SEWA MOBIL",
               title: "Sewa Mobil Malang, Batu & Surabaya",
               description:
                    "Pilih sewa mobil dengan sopir atau lepas kunci sesuai ketersediaan layanan dan kebutuhan perjalanan Anda.",
               points: [
                    "Empat paket: All In dan Non All In (per hari), Lepas Kunci (per 12 jam, bulanan, atau tahunan), Carter Drop Off (per rute)",
                    "All In sudah termasuk BBM, driver, makan driver, tol, dan parkir. Non All In termasuk BBM dan driver",
                    "Lepas Kunci: syarat KTP dan SIM A berlaku",
                    "Informasi armada dan pemesanan melalui WhatsApp",
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
                    "Pilihan perjalanan antarkota per kursi untuk rute tetap, tanpa menyewa satu mobil penuh.",
               points: [
                    "Biaya dihitung per kursi",
                    "Dijemput di alamat Anda (kecuali titik di Pandaan dan Juanda)",
                    "Tol dan parkir sudah termasuk",
                    "Tersedia untuk rute pilihan sesuai jadwal",
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
          "Rincian layanan kami tulis jelas sejak awal, jadi Anda tahu apa yang termasuk sebelum memesan sewa mobil atau travel per kursi.",
     button: "Hubungi Admin Reservasi",
     message: "Halo Admin Raincarnation, saya ingin tanya reservasi.",
     items: [
          {
               icon: "badge-check",
               title: "Rincian Tarif Jelas",
               description:
                    "All In sudah termasuk BBM, driver, makan driver, tol, dan parkir. Tarif travel per kursi juga sudah termasuk tol dan parkir.",
          },
          {
               icon: "smile",
               title: "Layanan 24 Jam",
               description:
                    "Admin siap dihubungi lewat WhatsApp kapan saja untuk menanyakan tarif, jadwal, dan ketersediaan.",
          },
          {
               icon: "shield-check",
               title: "Unit Dicek Sebelum Berangkat",
               description:
                    "Setiap unit kami cek terlebih dahulu sebelum digunakan, supaya perjalanan Anda lebih tenang.",
          },
          {
               icon: "message-square-text",
               title: "Pilihan Layanan Lengkap",
               description:
                    "Sewa mobil dengan sopir atau lepas kunci, carter satu arah, dan travel per kursi dalam satu tempat.",
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

