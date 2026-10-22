import type { Armada } from "@/types/armada";

export type ArmadaStatIcon = "badge-check" | "fan" | "smile" | "armchair";

export type ArmadaAmenityIcon =
     | "shield-check"
     | "plug"
     | "headset"
     | "luggage"
     | "shield"
     | "fan";

export const armadaHero = {
     titleStart: "Armada Sewa Mobil Malang",
     titleHighlight: "Modern & Terawat",
     titleEnd: ", untuk Setiap Kilometer Perjalanan Anda.",
     description:
          "Dari perjalanan dinas antarkota, mudik keluarga, hingga tur rombongan. Pilih armada sesuai jumlah penumpang, lalu hubungi admin lewat WhatsApp untuk informasi tarif dan ketersediaan unit.",
     primaryButton: "Cek Ketersediaan Unit Hari Ini",
     primaryMessage:
          "Halo Admin Raincarnation, saya ingin cek ketersediaan armada hari ini.",
     secondaryButton: "Lihat Layanan Sewa Mobil",
};

export const armadaCatalog = {
     id: "katalog-armada",
     title: "Pilihan Armada untuk Sewa Mobil di Malang",
     pageTitle: "Daftar Armada Raincarnation",
     description:
          "Temukan pilihan kendaraan Raincarnation untuk perjalanan pribadi, keluarga, maupun kebutuhan dinas. Pilih armada yang sesuai dengan jumlah penumpang dan kebutuhan perjalanan Anda, lalu hubungi admin untuk informasi tarif dan ketersediaan unit.",
     priceLabel: "Mulai",
     buttonLabel: "Reservasi Unit",
};

export const armadaMaintenance = {
     title: "Perawatan Armada Berkala",
     description:
          "Setiap unit dirawat berkala sebelum dipakai melayani perjalanan Anda.",
     points: [
          {
               title: "Servis Mesin Berkala",
               description:
                    "Menjaga performa mesin tetap responsif dan halus.",
          },
          {
               title: "Pemeriksaan Ban & Rem",
               description:
                    "Kondisi ban dan rem diperiksa sebelum unit berangkat.",
          },
          {
               title: "Kabin Dibersihkan",
               description:
                    "Kabin dibersihkan supaya tetap segar dan nyaman.",
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
     title: "Butuh Rekomendasi Unit yang Paling Cocok?",
     description:
          "Konsultasikan jumlah penumpang, kota tujuan, dan jadwal perjalanan Anda. Admin kami akan membantu memilihkan unit yang sesuai dan mengonfirmasi ketersediaannya lewat WhatsApp.",
     checks: [
          "Konsultasi lewat WhatsApp",
          "Rute sesuai rencana Anda: Malang, Batu, Surabaya, atau lainnya",
          "Tarif dan ketersediaan dikonfirmasi admin",
     ],
     buttonLabel: "Hubungi Admin via WhatsApp",
     message:
          "Halo Admin Raincarnation, saya ingin cek ketersediaan armada hari ini.",
};