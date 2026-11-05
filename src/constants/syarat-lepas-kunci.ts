export const syaratLepasKunciMeta = {
     title: "Syarat Sewa Mobil Lepas Kunci & Ketentuan | Raincarnation",
     description:
          "Syarat sewa mobil lepas kunci: dokumen pribadi dan perusahaan, SIM A, deposit, uang muka, serta ketentuan harian, bulanan, dan tahunan.",
     ogAlt: "Armada sewa mobil Raincarnation Indonesia",
};

export const syaratLepasKunciHero = {
     titleStart: "Syarat Sewa Mobil",
     titleHighlight: "Lepas Kunci",
     intro:
          "Pelajari syarat sewa mobil lepas kunci di Raincarnation, mulai dari dokumen, uang muka, dan deposit hingga ketentuan sewa harian, bulanan, dan tahunan. Layanan tersedia untuk wilayah Malang dan Batu.",
     whatsappLabel: "Tanya Admin via WhatsApp",
     whatsappMessage:
          "Halo Admin Raincarnation, saya ingin tanya syarat sewa mobil lepas kunci.",
     backLabel: "Lihat Sewa Mobil Malang & Batu",
};

export type SyaratGroup = {
     title?: string;
     paragraphs?: string[];
     items?: string[];
     bulleted?: boolean;
};

export type SyaratSection = {
     id: string;
     heading: string;
     groups: SyaratGroup[];
};

export const syaratLepasKunciSections: SyaratSection[] = [
     {
          id: "dokumen-pribadi",
          heading: "Dokumen untuk Penyewa Pribadi",
          groups: [
               {
                    paragraphs: ["Penyewa wajib menyerahkan dokumen berikut:"],
                    items: [
                         "Fotokopi atau foto KTP yang masih berlaku.",
                         "Fotokopi SIM A aktif untuk penyewaan lepas kunci.",
                         "Kartu Keluarga (KK).",
                         "NPWP (jika tersedia, khususnya untuk kontrak bulanan dan tahunan).",
                         "Bukti alamat domisili berupa tagihan listrik, air, PBB, atau dokumen pendukung lainnya.",
                         "Nomor telepon aktif dan WhatsApp.",
                         "Akun media sosial aktif sebagai informasi pendukung verifikasi.",
                         "Alamat tempat tinggal dan alamat penggunaan kendaraan.",
                         "Kontak keluarga atau kerabat yang dapat dihubungi sebagai kontak darurat.",
                    ],
               },
          ],
     },
     {
          id: "syarat-tambahan",
          heading: "Syarat Tambahan Sewa Lepas Kunci",
          groups: [
               {
                    items: [
                         "Penyewa wajib memiliki SIM A yang masih berlaku dan sesuai dengan kendaraan yang digunakan.",
                         "Usia minimal penyewa disarankan 21 tahun, dengan pengalaman mengemudi yang memadai.",
                         "Penyewa wajib mengikuti proses verifikasi identitas dan domisili.",
                         "Penyewa wajib membayar uang sewa di muka.",
                         "Penyewa wajib memberikan uang deposit atau jaminan sesuai kebijakan Raincarnation.",
                         "Kendaraan tidak boleh dipindahtangankan kepada orang lain tanpa persetujuan tertulis.",
                         "Hanya pengemudi yang telah didaftarkan dan disetujui Raincarnation yang boleh mengoperasikan kendaraan.",
                         "Raincarnation dapat meminta dokumen tambahan atau penjamin apabila diperlukan berdasarkan hasil verifikasi.",
                    ],
               },
          ],
     },
     {
          id: "dokumen-perusahaan",
          heading: "Dokumen untuk Penyewa Perusahaan",
          groups: [
               {
                    paragraphs: [
                         "Persyaratan ini berlaku untuk PT, CV, koperasi, yayasan, lembaga, instansi pemerintah, maupun badan usaha lainnya.",
                    ],
               },
               {
                    title: "Persyaratan administrasi perusahaan",
                    items: [
                         "Fotokopi akta pendirian perusahaan.",
                         "Fotokopi SK pengesahan Kemenkumham apabila dipersyaratkan.",
                         "Fotokopi NIB (Nomor Induk Berusaha).",
                         "NPWP perusahaan.",
                         "Fotokopi KTP direktur atau penanggung jawab perusahaan.",
                         "Surat kuasa apabila proses penyewaan diwakilkan kepada staf atau karyawan.",
                         "Identitas PIC (Person in Charge) yang bertanggung jawab terhadap kendaraan.",
                         "Alamat kantor dan alamat operasional perusahaan.",
                         "Nomor telepon kantor dan PIC.",
                         "Purchase Order (PO) atau Surat Perintah Kerja (SPK), khususnya untuk penyewaan kontrak.",
                         "Surat permohonan penyewaan kendaraan menggunakan kop surat perusahaan.",
                         "Dokumen pendukung lainnya apabila diperlukan untuk proses penilaian kredit atau kelayakan kontrak.",
                    ],
               },
               {
                    title: "Ketentuan untuk perusahaan baru",
                    paragraphs: [
                         "Bagi perusahaan yang belum memiliki riwayat kerja sama dengan Raincarnation, berlaku ketentuan:",
                    ],
                    items: [
                         "Pembayaran dilakukan di muka sesuai periode yang disepakati.",
                         "Deposit atau jaminan wajib disediakan sesuai jenis kendaraan dan durasi sewa.",
                         "Raincarnation berhak melakukan verifikasi legalitas perusahaan.",
                         "Perusahaan wajib menunjuk PIC yang bertanggung jawab terhadap kendaraan.",
                         "Fasilitas pembayaran tempo hanya dapat diberikan setelah mendapatkan persetujuan manajemen Raincarnation.",
                    ],
               },
               {
                    title: "Ketentuan perusahaan dengan sistem pembayaran tempo",
                    paragraphs: [
                         "Untuk perusahaan yang mengajukan pembayaran secara termin atau tempo:",
                    ],
                    items: [
                         "Wajib mengajukan permohonan kredit secara tertulis.",
                         "Melampirkan PO atau SPK.",
                         "Menyetujui batas plafon transaksi yang diberikan.",
                         "Menyetujui jangka waktu pembayaran, misalnya 14 atau 30 hari kalender.",
                         "Menunjuk PIC bagian keuangan dan operasional.",
                         "Bersedia menerima invoice dan dokumen penagihan resmi.",
                         "Keterlambatan pembayaran dapat dikenakan konsekuensi sesuai perjanjian.",
                         "Raincarnation berhak menangguhkan layanan apabila terdapat tagihan jatuh tempo yang belum diselesaikan.",
                    ],
               },
          ],
     },
     {
          id: "sewa-harian",
          heading: "Ketentuan Sewa Harian",
          groups: [
               {
                    title: "Sewa harian untuk pribadi (sistem lepas kunci)",
                    items: [
                         "Sewa Lepas Kunci per 12 jam. Untuk durasi lain, tanyakan ke admin.",
                         "Melengkapi seluruh dokumen identitas pribadi.",
                         "Menyerahkan SIM A aktif.",
                         "Membayar uang sewa sesuai tarif yang disepakati.",
                         "Membayar deposit atau jaminan kendaraan.",
                         "Mengisi dan menandatangani formulir serah terima kendaraan.",
                         "Kendaraan digunakan sesuai wilayah dan tujuan yang telah disetujui.",
                         "Kendaraan wajib dikembalikan tepat waktu.",
                         "Biaya keterlambatan dikenakan sesuai ketentuan kontrak.",
                         "BBM, parkir, tol, dan biaya operasional menjadi tanggung jawab penyewa, kecuali dinyatakan termasuk dalam paket.",
                    ],
               },
               {
                    title: "Sewa harian untuk perusahaan",
                    items: [
                         "Melengkapi dokumen legalitas perusahaan.",
                         "Melampirkan surat pemesanan atau PO apabila diperlukan.",
                         "Menunjuk PIC perusahaan.",
                         "Memberikan informasi tanggal, waktu, rute, dan tujuan penggunaan.",
                         "Melakukan pembayaran sesuai kesepakatan.",
                         "Memastikan kendaraan digunakan oleh karyawan atau pihak yang telah mendapatkan izin.",
                         "Menanggung biaya tambahan di luar kesepakatan awal.",
                    ],
               },
               {
                    title: "Pembayaran sewa harian untuk perusahaan",
                    bulleted: true,
                    items: [
                         "Perusahaan baru: pembayaran di muka.",
                         "Perusahaan rekanan: dapat menggunakan sistem invoice.",
                         "Perusahaan dengan kontrak khusus: pembayaran mengikuti PO/SPK dan perjanjian kerja sama.",
                    ],
               },
          ],
     },
     {
          id: "sewa-bulanan",
          heading: "Ketentuan Sewa Bulanan",
          groups: [
               {
                    paragraphs: [
                         "Sewa bulanan diperuntukkan bagi kebutuhan kendaraan operasional, kegiatan proyek, penempatan karyawan, perjalanan dinas, dan kebutuhan pribadi.",
                    ],
               },
               {
                    title: "Pribadi: dokumen yang wajib disiapkan",
                    items: [
                         "KTP.",
                         "KK.",
                         "SIM A aktif untuk lepas kunci.",
                         "NPWP jika tersedia.",
                         "Bukti alamat domisili.",
                         "Nomor kontak darurat.",
                         "Surat pernyataan tanggung jawab penggunaan kendaraan.",
                         "Dokumen tambahan apabila diperlukan untuk verifikasi.",
                    ],
               },
               {
                    title: "Pribadi: ketentuan sewa bulanan lepas kunci",
                    items: [
                         "Minimal masa sewa satu bulan.",
                         "Pembayaran dilakukan di muka untuk periode pertama.",
                         "Deposit dibayarkan sebelum kendaraan diserahkan.",
                         "Kendaraan hanya digunakan oleh penyewa dan pengemudi yang disetujui.",
                         "Tidak diperkenankan menyewakan kembali kendaraan kepada pihak ketiga.",
                         "Penyewa wajib menjaga kondisi kendaraan.",
                         "Penggunaan kendaraan untuk perjalanan luar kota atau luar provinsi wajib mendapatkan persetujuan Raincarnation.",
                         "Kendaraan tidak boleh digunakan untuk balapan, kegiatan ilegal, atau aktivitas yang membahayakan.",
                         "Kilometer penggunaan dapat dibatasi sesuai kesepakatan kontrak.",
                         "Penyewa wajib melakukan pengecekan rutin kendaraan.",
                         "Pajak kendaraan dan perawatan berkala yang menjadi kewajiban pemilik ditanggung Raincarnation.",
                         "Biaya BBM, parkir, tol, pencucian, dan kebutuhan operasional menjadi tanggungan penyewa, kecuali disepakati berbeda.",
                    ],
               },
               {
                    title: "Perusahaan: dokumen administrasi",
                    items: [
                         "Akta pendirian perusahaan.",
                         "SK pengesahan Kemenkumham apabila berlaku.",
                         "NIB.",
                         "NPWP perusahaan.",
                         "KTP direktur.",
                         "Surat permohonan sewa kendaraan.",
                         "PO/SPK atau surat penunjukan vendor.",
                         "Surat kuasa apabila pengurusan dilakukan oleh staf.",
                         "Data PIC operasional.",
                         "Data PIC keuangan.",
                         "Alamat kantor dan lokasi operasional kendaraan.",
                    ],
               },
               {
                    title: "Perusahaan: ketentuan pembayaran",
                    items: [
                         "Pembayaran bulan pertama dilakukan sebelum kendaraan diserahkan.",
                         "Deposit dibayarkan sesuai ketentuan.",
                         "Pembayaran bulan berikutnya dilakukan sesuai tanggal jatuh tempo.",
                         "Perusahaan wajib memberikan kepastian jadwal pembayaran.",
                         "Sistem tempo dapat diberikan kepada perusahaan yang telah lolos evaluasi.",
                         "Invoice dan faktur pajak diterbitkan sesuai ketentuan perpajakan dan status perpajakan Raincarnation.",
                    ],
               },
               {
                    title: "Perusahaan: ketentuan operasional",
                    items: [
                         "Perusahaan wajib menunjuk satu PIC utama.",
                         "Kendaraan hanya digunakan untuk kepentingan perusahaan yang disepakati.",
                         "Perubahan lokasi penempatan kendaraan harus diinformasikan kepada Raincarnation.",
                         "Pengemudi tambahan harus mendapatkan persetujuan tertulis.",
                         "Perusahaan bertanggung jawab atas penggunaan kendaraan oleh karyawan atau pihak yang ditunjuknya sepanjang sesuai ketentuan perjanjian.",
                         "Pemeriksaan kondisi kendaraan dilakukan secara berkala.",
                         "Jadwal servis berkala ditentukan bersama.",
                         "Kerusakan akibat kelalaian atau kesalahan penggunaan menjadi tanggung jawab pihak yang menyebabkan kerusakan sesuai hasil pemeriksaan.",
                         "Kendaraan wajib tersedia untuk pemeriksaan dan perawatan yang telah dijadwalkan.",
                    ],
               },
          ],
     },
     {
          id: "sewa-tahunan",
          heading: "Ketentuan Sewa Tahunan",
          groups: [
               {
                    paragraphs: [
                         "Sewa tahunan merupakan kerja sama jangka panjang dengan sistem kontrak resmi antara Raincarnation dan penyewa.",
                    ],
               },
               {
                    title: "Pribadi: dokumen administrasi",
                    items: [
                         "KTP.",
                         "KK.",
                         "SIM A aktif.",
                         "NPWP apabila tersedia.",
                         "Bukti alamat domisili.",
                         "Kontak darurat keluarga.",
                         "Surat pernyataan kesanggupan pembayaran.",
                         "Dokumen pendukung penghasilan atau kemampuan finansial apabila diperlukan.",
                    ],
               },
               {
                    title: "Pribadi: ketentuan kontrak",
                    items: [
                         "Masa kontrak minimal 12 bulan.",
                         "Pembayaran dapat dilakukan bulanan, triwulanan, semesteran, atau tahunan sesuai kesepakatan.",
                         "Deposit wajib dibayarkan sebelum kendaraan diserahkan.",
                         "Perjanjian sewa wajib ditandatangani kedua belah pihak.",
                         "Penyewa dilarang mengalihkan hak penggunaan kepada pihak lain tanpa persetujuan.",
                         "Penyewa wajib menjaga kondisi kendaraan.",
                         "Penggunaan kendaraan di luar wilayah yang disepakati harus memperoleh izin.",
                         "Perpanjangan kontrak harus diajukan minimal 30 hari sebelum masa kontrak berakhir.",
                         "Pengakhiran kontrak lebih awal mengikuti ketentuan penalti dan penyelesaian kewajiban dalam perjanjian.",
                         "Penyesuaian harga pada masa perpanjangan dapat dilakukan berdasarkan kesepakatan baru.",
                    ],
               },
               {
                    title: "Perusahaan: dokumen wajib",
                    items: [
                         "Akta pendirian dan perubahan terakhir.",
                         "SK pengesahan Kemenkumham.",
                         "NIB.",
                         "NPWP perusahaan.",
                         "KTP direktur atau pejabat berwenang.",
                         "Surat permohonan kerja sama.",
                         "PO/SPK atau surat penunjukan.",
                         "Surat kuasa penandatangan apabila diwakilkan.",
                         "Data PIC operasional.",
                         "Data PIC keuangan.",
                         "Alamat kantor dan lokasi penempatan kendaraan.",
                         "Dokumen pendukung keuangan atau referensi perusahaan jika diminta dalam evaluasi kerja sama.",
                    ],
               },
               {
                    title: "Perusahaan: ketentuan kontrak tahunan",
                    items: [
                         "Kontrak berlaku minimal 12 bulan.",
                         "Pembayaran mengikuti skema yang telah disepakati.",
                         "Deposit atau jaminan kontrak wajib disediakan.",
                         "Perusahaan wajib menjamin kendaraan digunakan untuk kegiatan yang sah dan sesuai peruntukan.",
                         "Perusahaan wajib menunjuk PIC yang bertanggung jawab atas kendaraan.",
                         "Raincarnation berhak melakukan pemeriksaan kendaraan secara berkala dengan pemberitahuan sebelumnya.",
                         "Servis berkala mengikuti jadwal dan rekomendasi pabrikan.",
                         "Perusahaan wajib menginformasikan apabila kendaraan mengalami kecelakaan, kerusakan, atau kehilangan.",
                         "Perusahaan dilarang mengalihkan kendaraan kepada pihak ketiga tanpa izin tertulis.",
                         "Perpanjangan kontrak diajukan paling lambat 30 hari sebelum masa kontrak berakhir.",
                         "Ketentuan pengakhiran kontrak, penggantian kendaraan, dan penyelesaian kewajiban dituangkan secara tertulis.",
                    ],
               },
          ],
     },
     {
          id: "uang-muka-deposit",
          heading: "Uang Muka dan Deposit",
          groups: [
               {
                    title: "Uang muka (DP)",
                    bulleted: true,
                    items: [
                         "Pemesanan bulanan: pembayaran periode pertama sebelum kendaraan diserahkan.",
                         "Pemesanan tahunan: mengikuti termin pembayaran dalam kontrak.",
                         "Reservasi dianggap sah setelah pembayaran diterima dan dikonfirmasi Raincarnation.",
                    ],
               },
               {
                    title: "Deposit kendaraan",
                    paragraphs: [
                         "Deposit merupakan uang jaminan untuk mengantisipasi kewajiban penyewa yang belum diselesaikan, seperti kerusakan akibat kelalaian, kehilangan perlengkapan, denda, atau biaya lainnya yang menjadi tanggung jawab penyewa.",
                    ],
               },
               {
                    title: "Besaran deposit",
                    paragraphs: ["Besaran deposit ditentukan berdasarkan:"],
                    bulleted: true,
                    items: [
                         "Jenis kendaraan.",
                         "Durasi sewa.",
                         "Sistem lepas kunci atau dengan pengemudi.",
                         "Hasil verifikasi penyewa.",
                         "Wilayah penggunaan.",
                         "Risiko operasional.",
                    ],
               },
               {
                    title: "Pengembalian deposit",
                    paragraphs: [
                         "Deposit dikembalikan setelah pemeriksaan kendaraan dan penyelesaian seluruh kewajiban penyewa. Jika terdapat potongan, Raincarnation wajib memberikan rincian dan bukti pendukung.",
                    ],
               },
          ],
     },
     {
          id: "tanggung-jawab-kendaraan",
          heading: "Tanggung Jawab dan Ketentuan Kendaraan",
          groups: [
               {
                    title: "Tanggung jawab penyewa",
                    items: [
                         "Menggunakan kendaraan dengan baik dan sesuai peraturan lalu lintas.",
                         "Menjaga kebersihan dan kelengkapan kendaraan.",
                         "Tidak mengemudikan kendaraan dalam kondisi mabuk atau di bawah pengaruh narkotika.",
                         "Tidak menggunakan kendaraan untuk tindakan kriminal.",
                         "Tidak mengangkut barang terlarang.",
                         "Tidak membawa muatan melebihi kapasitas.",
                         "Tidak memindahtangankan kendaraan tanpa persetujuan.",
                         "Tidak melakukan modifikasi kendaraan tanpa persetujuan.",
                         "Tidak meninggalkan kendaraan dalam kondisi yang berisiko kehilangan.",
                         "Segera melaporkan apabila terjadi kerusakan, kecelakaan, atau kehilangan.",
                    ],
               },
               {
                    title: "Tanggung jawab Raincarnation",
                    items: [
                         "Menyediakan kendaraan yang layak jalan.",
                         "Memastikan kelengkapan administrasi kendaraan.",
                         "Memberikan informasi mengenai kondisi dan penggunaan kendaraan.",
                         "Menyediakan layanan bantuan apabila terjadi kendala teknis sesuai ketentuan kontrak.",
                         "Menjalankan perawatan berkala yang menjadi kewajiban pemilik.",
                         "Memberikan penggantian kendaraan apabila diperlukan dan tersedia, sesuai kesepakatan kontrak.",
                    ],
               },
               {
                    title: "Ketentuan kecelakaan dan kerusakan",
                    items: [
                         "Penyewa wajib segera menghubungi Raincarnation apabila terjadi kecelakaan.",
                         "Penyewa tidak diperkenankan meninggalkan lokasi kejadian tanpa mengikuti prosedur hukum yang berlaku.",
                         "Penyewa wajib membantu proses pelaporan kepada kepolisian dan perusahaan asuransi apabila diperlukan.",
                         "Kerusakan akibat kelalaian, penyalahgunaan, atau pelanggaran kontrak menjadi tanggung jawab penyewa sesuai hasil pemeriksaan.",
                         "Kerusakan akibat keausan normal dan kegagalan teknis bukan karena kesalahan penyewa menjadi tanggung jawab Raincarnation.",
                         "Jika kendaraan diasuransikan, penyelesaian klaim mengikuti ketentuan polis, termasuk risiko sendiri (own risk), pengecualian, dan kewajiban pelaporan.",
                         "Kehilangan kendaraan akibat kelalaian atau pelanggaran ketentuan oleh penyewa diselesaikan berdasarkan hasil investigasi, ketentuan asuransi, dan perjanjian.",
                    ],
               },
          ],
     },
     {
          id: "larangan-penyewa",
          heading: "Larangan bagi Penyewa",
          groups: [
               {
                    paragraphs: ["Penyewa dilarang:"],
                    items: [
                         "Menyewakan kembali kendaraan kepada pihak lain.",
                         "Menggadaikan atau menjaminkan kendaraan.",
                         "Menggunakan kendaraan untuk kegiatan balapan atau uji kecepatan.",
                         "Menggunakan kendaraan untuk kegiatan ilegal.",
                         "Membawa kendaraan ke luar negeri tanpa persetujuan tertulis.",
                         "Mengubah spesifikasi kendaraan.",
                         "Menggunakan kendaraan di luar batas kapasitas.",
                         "Mengemudikan kendaraan tanpa SIM yang sah.",
                         "Menggunakan kendaraan untuk kegiatan yang tidak sesuai peruntukan.",
                         "Menyembunyikan atau memindahkan kendaraan untuk menghindari pemeriksaan atau pengambilan kembali secara sah.",
                    ],
               },
          ],
     },
     {
          id: "keterlambatan-pembatalan",
          heading: "Keterlambatan, Pembatalan, dan Pengakhiran Sewa",
          groups: [
               {
                    title: "Keterlambatan pengembalian",
                    bulleted: true,
                    items: [
                         "Sewa harian: keterlambatan dikenakan biaya overtime sesuai tarif yang disepakati.",
                         "Sewa bulanan: keterlambatan pembayaran dikenakan konsekuensi sesuai kontrak.",
                         "Sewa tahunan: keterlambatan pembayaran mengikuti ketentuan denda atau mekanisme penagihan dalam kontrak.",
                    ],
               },
               {
                    title: "Pembatalan sewa",
                    items: [
                         "Pembatalan wajib disampaikan secara tertulis.",
                         "DP dan biaya pembatalan mengikuti kebijakan yang telah diinformasikan sebelum transaksi.",
                         "Jika pembatalan terjadi karena kesalahan Raincarnation, pembayaran yang telah diterima dikembalikan sesuai penyelesaian yang disepakati.",
                         "Untuk kontrak bulanan dan tahunan, ketentuan pembatalan mengacu pada klausul pengakhiran kontrak.",
                    ],
               },
               {
                    title: "Pengakhiran kontrak oleh Raincarnation",
                    paragraphs: [
                         "Raincarnation berhak mengakhiri atau menangguhkan layanan apabila:",
                    ],
                    items: [
                         "Penyewa melanggar perjanjian.",
                         "Pembayaran tidak dilakukan setelah jatuh tempo dan teguran.",
                         "Kendaraan digunakan untuk aktivitas ilegal.",
                         "Identitas atau dokumen yang diberikan terbukti tidak benar.",
                         "Kendaraan dipindahtangankan tanpa izin.",
                         "Terdapat risiko keselamatan atau keamanan yang serius.",
                    ],
               },
               {
                    title: "Prosedur pengakhiran",
                    paragraphs: [
                         "Pengakhiran dilakukan melalui prosedur pemberitahuan dan penyelesaian hak serta kewajiban kedua belah pihak sesuai kontrak dan hukum yang berlaku.",
                    ],
               },
          ],
     },
     {
          id: "serah-terima-kendaraan",
          heading: "Prosedur Serah Terima Kendaraan",
          groups: [
               {
                    paragraphs: [
                         "Sebelum kendaraan diserahkan, kedua belah pihak wajib melakukan:",
                    ],
                    items: [
                         "Pemeriksaan kondisi eksterior.",
                         "Pemeriksaan kondisi interior.",
                         "Pemeriksaan ban dan tekanan angin.",
                         "Pemeriksaan lampu, rem, dan kelengkapan keselamatan.",
                         "Pemeriksaan bahan bakar.",
                         "Pemeriksaan odometer.",
                         "Pemeriksaan STNK dan perlengkapan kendaraan.",
                         "Dokumentasi foto atau video kendaraan.",
                         "Penandatanganan berita acara serah terima.",
                    ],
               },
               {
                    title: "Saat kendaraan dikembalikan",
                    paragraphs: [
                         "Pada saat kendaraan dikembalikan, dilakukan pemeriksaan ulang dengan membandingkan kondisi kendaraan pada saat penyerahan.",
                    ],
               },
          ],
     },
     {
          id: "penyelesaian-perselisihan",
          heading: "Penyelesaian Perselisihan",
          groups: [
               {
                    items: [
                         "Setiap perselisihan diselesaikan terlebih dahulu melalui musyawarah.",
                         "Apabila tidak tercapai kesepakatan, penyelesaian dilakukan melalui mekanisme hukum yang berlaku di Indonesia.",
                         "Setiap perjanjian tunduk pada hukum Republik Indonesia.",
                         "Perjanjian dibuat dalam rangkap yang disepakati dan memiliki kekuatan hukum sesuai ketentuan yang berlaku.",
                    ],
               },
          ],
     },
     {
          id: "pernyataan-persetujuan",
          heading: "Pernyataan Persetujuan",
          groups: [
               {
                    paragraphs: [
                         "Dengan melakukan pemesanan dan/atau menandatangani perjanjian sewa, penyewa menyatakan:",
                    ],
                    items: [
                         "Telah membaca dan memahami seluruh syarat dan ketentuan.",
                         "Bersedia memenuhi seluruh kewajiban pembayaran.",
                         "Bertanggung jawab atas penggunaan kendaraan sesuai perjanjian.",
                         "Bersedia menyelesaikan kewajiban apabila terjadi kerusakan atau pelanggaran yang menjadi tanggung jawab penyewa.",
                         "Menyetujui seluruh ketentuan yang telah disepakati bersama.",
                    ],
               },
          ],
     },
];