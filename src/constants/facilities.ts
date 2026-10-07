export type FacilityIcon = "seat" | "fan" | "luggage" | "charger";

export type FacilityItem = {
     icon: FacilityIcon;
     title: string;
     description: string;
     highlight: string;
};

export const facilitiesContent = {
     eyebrow: "Kenyamanan Perjalanan",
     title: "Fasilitas Standar Layanan Kursi Reguler",
     description:
          "Walau berstatus travel reguler per kursi, standar kenyamanan tetap kami utamakan layaknya mobil pribadi berfasilitas eksekutif.",
     items: [
          {
               icon: "seat",
               title: "Reclining Seats",
               description:
                    "Sandaran kursi ergonomis yang dapat direbahkan sesuai kenyamanan Anda, lengkap dengan bantalan leher empuk agar tidak lelah selama perjalanan tol panjang.",
               highlight: "Jarak Kaki (Legroom) Luas",
          },
          {
               icon: "fan",
               title: "Kabin Wangi & Bebas Asap Rokok",
               description:
                    "AC double blower dingin merata ke seluruh baris. Komitmen ketat 100% No Smoking dalam kabin untuk menjaga udara tetap higienis dan harum.",
               highlight: "Sanitasi Rutin Sebelum Jalan",
          },
          {
               icon: "luggage",
               title: "Gratis Bagasi Penumpang",
               description:
                    "Setiap penumpang berhak membawa 1 koper ukuran sedang (maksimal 24 inch) ditambah 1 tas ransel / tas tangan tanpa dikenakan biaya bagasi tambahan.",
               highlight: "1 Koper + 1 Ransel Free",
          },
          {
               icon: "charger",
               title: "Port Charger Tiap Baris",
               description:
                    "Baterai ponsel tetap terisi penuh sepanjang rute. Tersedia colokan USB & port listrik di setiap jajaran baris tempat duduk penumpang.",
               highlight: "Fast USB Charging Port",
          },
     ] satisfies FacilityItem[],

     photo: {
          src: "/images/interior-armada.webp" as string | null,
          alt: "Interior armada travel Raincarnation",
          badge: "Standar Armada Resmi",
          title: "Interior Armada Terawat",
          description:
               "Pembersihan mendalam dan desinfeksi dilakukan setiap kali armada tiba di pangkalan pool transit.",
     },

     safety: {
          title: "Protokol Keamanan & Driver",
          points: [
               "Driver berlisensi resmi, berpengalaman di jalan tol lintas provinsi > 5 tahun.",
               "Driver tidak ugal-ugalan dan dilarang merokok aktif selama bertugas.",
               "Asuransi perjalanan Jasa Raharja untuk setiap penumpang terdaftar.",
          ],
          badge: "Standar Keselamatan 100%",
     },
};