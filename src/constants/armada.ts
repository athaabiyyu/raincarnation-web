

export type ArmadaStatIcon = "badge-check" | "fan" | "smile" | "armchair";

export type ArmadaAmenityIcon =
     | "shield-check"
     | "plug"
     | "headset"
     | "luggage"
     | "shield"
     | "fan";

export const armadaHero = {
     badge: "Standar Eksekutif Raincarnation",
     title: "Armada Modern, Terawat untuk Setiap Kilometer Perjalanan Anda",
     description:
          "Dari perjalanan dinas cepat antarkota, mudik keluarga nyaman, hingga tur rombongan. Seluruh armada kami melalui pembersihan kabin dan servis berkala tiap 5.000 km.",
     primaryButton: "Cek Ketersediaan Unit Hari Ini",
     primaryMessage:
          "Halo Admin Raincarnation, saya ingin cek ketersediaan armada hari ini.",
     secondaryButton: "Lihat Spesifikasi Unit",
     stats: [
          {
               icon: "badge-check",
               tag: "ATPM",
               value: "5.000",
               label: "Km Servis Rutin Resmi ATPM",
          },
          {
               icon: "fan",
               tag: "Dingin",
               value: "100%",
               label: "Double Blower AC Dingin Segar",
          },
          {
               icon: "smile",
               tag: "Steril",
               value: "Zero",
               label: "Bebas Bau Asap & Steril Debu",
          },
          {
               icon: "armchair",
               tag: "Fleksibel",
               value: "4 - 19",
               label: "Kapasitas Kursi Sesuai Kebutuhan",
          },
     ] satisfies {
          icon: ArmadaStatIcon;
          tag: string;
          value: string;
          label: string;
     }[],
};

export const armadaCatalog = {
     id: "katalog-armada",
     eyebrow: "Pilihan Lengkap",
     title: "Koleksi Kendaraan Siap Jalan",
     priceLabel: "Mulai",
     buttonLabel: "Reservasi Unit",
};

export const armadaMaintenance = {
     badge: "Protokol Keselamatan Terjadwal",
     title: "Standar Perawatan Preventif Tanpa Kompromi",
     description:
          "Kami tidak menunggu armada mengalami kendala di jalan raya. Setiap unit dirawat berkala sebelum dipakai melayani perjalanan Anda.",
     points: [
          {
               title: "Ganti Oli Mesin & Filter Berkala 5.000 KM",
               description:
                    "Menjaga performa mesin tetap responsif, halus, dan ramah lingkungan.",
          },
          {
               title: "Inspeksi Sistem Pengereman & Ban Harian",
               description:
                    "Kondisi ban dan rem diperiksa sebelum unit berangkat.",
          },
          {
               title: "Fogging Antibakteri & Cuci Steam",
               description:
                    "Dibersihkan setelah setiap trip supaya kabin tetap segar dan higienis.",
          },
     ],
};

export const armadaAmenities = {
     eyebrow: "Standar Layanan Unggulan",
     title: "Fasilitas Lengkap di Setiap Mobil",
     description:
          "Apa pun unit yang Anda pesan, fasilitas di bawah ini disiapkan untuk menemani perjalanan Anda.",
     items: [
          {
               icon: "shield-check",
               title: "P3K, Sanitizer & Obat Perjalanan",
               description:
                    "Kotak pertolongan pertama, minyak aromaterapi pencegah mabuk darat, kantong higienis, dan hand sanitizer.",
          },
          {
               icon: "plug",
               title: "Port Pengisian Daya USB & Type-C",
               description:
                    "Jaga baterai smartphone, tablet, atau laptop Anda tetap terisi sepanjang perjalanan.",
          },
          {
               icon: "headset",
               title: "Audio & Hiburan Nyaman",
               description:
                    "Pilihan musik yang rileks dan koneksi Bluetooth untuk perangkat pribadi Anda.",
          },
          {
               icon: "luggage",
               title: "Kompartemen Bagasi Aman & Rapi",
               description:
                    "Barang bawaan ditata driver supaya tidak mengganggu ruang kaki dan tempat duduk penumpang.",
          },
          {
               icon: "shield",
               title: "Ban & Rem Diperiksa Rutin",
               description:
                    "Ban dan rem dicek sebelum unit berangkat demi keamanan di jalan tol basah maupun kering.",
          },
          {
               icon: "fan",
               title: "AC Dingin & Kabin Bersih",
               description:
                    "AC dirawat berkala untuk menjaga udara kabin tetap segar di seluruh deret kursi.",
          },
     ] satisfies {
          icon: ArmadaAmenityIcon;
          title: string;
          description: string;
     }[],
};

export const armadaCta = {
     badge: "Customer Service 24 Jam Siaga",
     title: "Butuh Rekomendasi Unit yang Paling Cocok?",
     description:
          "Konsultasikan jumlah rombongan, kota tujuan, dan jadwal perjalanan Anda. Admin kami akan mengirimkan ketersediaan unit beserta foto armada lewat WhatsApp.",
     checks: [
          "Tanpa Biaya Tersembunyi",
          "Driver Sopan & Berpengalaman",
          "Jemput Depan Rumah",
     ],
     buttonLabel: "Hubungi CS WhatsApp Sekarang",
     note: "Respon Cepat Rata-rata < 2 Menit",
     message:
          "Halo Admin Raincarnation, saya ingin cek ketersediaan armada hari ini.",
};