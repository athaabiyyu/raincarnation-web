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
               title: "Share Lokasi Jemput",
               description:
                    "Kirimkan alamat lengkap penjemputan atau share live-location WhatsApp rumah / hotel Anda beserta alamat tujuan yang jelas.",
               highlight: "Akurat sampai gang rumah",
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
                    "Driver menghubungi Anda 30 menit sebelum jadwal penjemputan dan meluncur langsung menjemput Anda di depan pintu rumah.",
               highlight: "Tepat Waktu & Nyaman",
          },
     ] satisfies BookingStep[],
};