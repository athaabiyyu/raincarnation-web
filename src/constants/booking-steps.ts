export type BookingStepIcon = "route" | "location" | "chat" | "pickup";

export type BookingStep = {
     icon: BookingStepIcon;
     title: string;
     description: string;
     highlight: string;
};

export const bookingStepsContent = {
     eyebrow: "Mudah & Tanpa Aplikasi Tambahan",
     title: "4 Langkah Praktis Pemesanan via WhatsApp",
     description:
          "Tidak perlu install aplikasi baru atau registrasi akun yang rumit. Cukup kirim pesan singkat, tiket dan driver Anda langsung terkonfirmasi.",
     steps: [
          {
               icon: "route",
               title: "Pilih Rute & Jadwal",
               description:
                    "Tentukan kota keberangkatan, tujuan, tanggal, jam jemput yang diinginkan, serta jumlah kursi penumpang yang dibutuhkan.",
               highlight: "Cek jam keberangkatan",
          },
          {
               icon: "location",
               title: "Tentukan Titik Jemput",
               description:
                    "Sampaikan kota asal dan tujuan Anda lewat WhatsApp. Titik jemput dan titik antar dikonfirmasi oleh admin.",
               highlight: "Titik dikonfirmasi admin",
          },
          {
               icon: "chat",
               title: "Konfirmasi CS WhatsApp",
               description:
                    "Admin resmi kami akan menerbitkan format e-tiket, rincian biaya all-in, nomor kursi, dan data kontak driver yang bertugas.",
               highlight: "E-tiket diterbitkan resmi",
          },
          {
               icon: "pickup",
               title: "Driver Menjemput Anda",
               description:
                    "Driver menghubungi Anda sebelum jadwal penjemputan, lalu menjemput Anda di titik yang sudah disepakati.",
               highlight: "Tepat Waktu & Nyaman",
          },
     ] satisfies BookingStep[],
};