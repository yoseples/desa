export const defaultLetterheadConfig = {
  provinceName: "PEMERINTAH DAERAH PROVINSI JAWA BARAT",
  regencyName: "PEMERINTAH KABUPATEN NUSANTARA",
  districtName: "KECAMATAN HARAPAN MAKMUR",
  villageName: "KANTOR KEPALA DESA SUKAMAJU MANDIRI",
  address: "Jl. Raya Desa Sukamaju Mandiri No. 01",
  postalCode: "40375",
  phone: "(022) 8765-4321",
  email: "pemdes@desasukamaju.id",
  website: "www.desasukamaju.id",
  lineStyle: "double", // 'double', 'single-thick', 'modern'
  showQrVerification: true,
  signatoryRole: "KEPALA DESA SUKAMAJU MANDIRI",
  signatoryName: "H. BUDI SANTOSO, S.AP",
  signatoryNip: "19780415 200501 1 003"
};

export const officialLetterTemplates = [
  {
    id: "SKU",
    code: "500/SKU",
    name: "Surat Keterangan Usaha (SKU)",
    category: "Perekonomian & BUMDes",
    description: "Surat keterangan resmi kepemilikan usaha aktif warga untuk pengajuan kredit KUR, pembukaan rekening usaha, atau izin operasional.",
    fields: [
      { key: "businessName", label: "Nama Usaha / Toko", placeholder: "Warung Kopi & Makanan Sunda Rasa Raos" },
      { key: "businessType", label: "Jenis / Bidang Usaha", placeholder: "Kuliner & Warung Kopi" },
      { key: "businessAddress", label: "Alamat Lokasi Usaha", placeholder: "Jl. Raya Desa Sukamaju No. 45" },
      { key: "businessDuration", label: "Lama Usaha Berdiri", placeholder: "Sejak Tahun 2019 (± 5 Tahun)" }
    ],
    openingText: "Yang bertanda tangan di bawah ini Kepala Desa Sukamaju Mandiri menerangkan dengan sebenarnya bahwa:",
    bodyParagraph: "Nama tersebut di atas adalah benar warga penduduk Desa Sukamaju Mandiri yang memiliki dan menjalankan kegiatan usaha aktif di wilayah kami sebagai berikut:",
    closingText: "Demikian Surat Keterangan Usaha ini kami buat dengan sebenarnya agar dapat dipergunakan sebagai persyaratan pengajuan bantuan permodalan / perbankan sebagaimana mestinya."
  },
  {
    id: "SK_JUAL_BELI",
    code: "593/SK-JB",
    name: "Surat Keterangan Jual Beli (Tanah / Bangunan / Barang)",
    category: "Pertanahan & Transaksi",
    description: "Surat perjanjian dan keterangan resmi transaksi jual beli tanah darat, sawah, bangunan, kendaraan bermotor, atau aset berharga di hadapan saksi dan diketahui Pemerintah Desa.",
    fields: [
      { key: "sellerName", label: "Nama Pihak I (Penjual)", placeholder: "Ujang Suherman" },
      { key: "sellerNik", label: "NIK Pihak I (Penjual)", placeholder: "3204151505750001" },
      { key: "sellerAddress", label: "Alamat Pihak I (Penjual)", placeholder: "Dusun Sukarame RT 03 RW 02" },
      { key: "buyerName", label: "Nama Pihak II (Pembeli)", placeholder: "Bambang Sudrajat" },
      { key: "buyerNik", label: "NIK Pihak II (Pembeli)", placeholder: "3204151208850002" },
      { key: "buyerAddress", label: "Alamat Pihak II (Pembeli)", placeholder: "Kp. Pasir Salam RT 02 RW 03" },
      { key: "itemType", label: "Objek Transaksi (Tanah/Bangunan/Barang)", placeholder: "Sebidang Tanah Kebun Kopi & Tanaman Produktif" },
      { key: "itemLocation", label: "Lokasi / Nomor Persil / Kohir / SPPT", placeholder: "Blok Sukarame Persil No. 24 Kohir No. 118" },
      { key: "itemSize", label: "Luas / Ukuran Objek Transaksi", placeholder: "Luas ± 650 m² (Enam Ratus Lima Puluh Meter Persegi)" },
      { key: "itemBorders", label: "Batas-Batas Objek (Utara, Timur, Selatan, Barat)", placeholder: "Utara: Tanah Bpk. H. Supriatna | Timur: Jalan Desa | Selatan: Saluran Irigasi | Barat: Tanah Bpk. Hendra" },
      { key: "transactionPrice", label: "Harga Kesepakatan Transaksi (Rp)", placeholder: "Rp 150.000.000,- (Seratus Lima Puluh Juta Rupiah)" },
      { key: "witnessNames", label: "Nama Saksi-Saksi", placeholder: "1. Ketua RW 02 (Drs. Subagja), 2. Tokoh Masyarakat (Ahmad Fauzi)" }
    ],
    openingText: "Yang bertanda tangan di bawah ini menerangkan bahwa pada hari ini telah terjadi kesepakatan jual beli yang sah antara para pihak sebagai berikut:",
    bodyParagraph: "PIHAK I (PENJUAL) telah menjual dan melepaskan hak kepemilikannya atas objek tersebut kepada PIHAK II (PEMBELI) dengan harga yang telah disepakati dan dibayar lunas tanpa ada paksaan dari pihak manapun.",
    closingText: "Surat Keterangan Jual Beli ini dibuat dalam keadaan sadar dan sehat jasmani rohani, serta diketahui dan disahkan oleh Pemerintah Desa Sukamaju Mandiri untuk dijadikan pegangan hukum bagi kedua belah pihak."
  },
  {
    id: "SURAT_UNDANGAN",
    code: "005/UND-DESA",
    name: "Surat Undangan Resmi Musyawarah Desa / Rapat",
    category: "Pemerintahan & Partisipasi",
    description: "Surat undangan resmi rapat pleno, musyawarah pembangunan desa (Musrenbangdes), atau pertemuan kelembagaan ber-Kop Pemdes.",
    fields: [
      { key: "meetingSubject", label: "Perihal / Hal Undangan", placeholder: "Undangan Musyawarah Rencana Kerja Pemerintah Desa (Musrenbangdes) T.A. 2027" },
      { key: "meetingNature", label: "Sifat Surat", placeholder: "Penting / Undangan Resmi" },
      { key: "meetingAttachment", label: "Lampiran Berkas", placeholder: "1 (Satu) Lembar Susunan Acara" },
      { key: "meetingRecipient", label: "Kepada Yth. (Tujuan Undangan)", placeholder: "Ketua BPD, Ketua LPMD, Seluruh Ketua RW (01 s.d. 10), Seluruh Ketua RT (01 s.d. 20), dan Tokoh Masyarakat" },
      { key: "meetingDateTime", label: "Hari, Tanggal & Pukul", placeholder: "Senin, 25 Agustus 2026 Pukul 08.30 WIB s.d. Selesai" },
      { key: "meetingLocation", label: "Tempat / Lokasi Acara", placeholder: "Aula Balai Desa Sukamaju Mandiri" },
      { key: "meetingAgenda", label: "Agenda Utama Musyawarah", placeholder: "Pembahasan Prioritas Dana Desa 2027 & Penetapan Program Ketahanan Pangan" },
      { key: "meetingNotes", label: "Catatan / Pakaian", placeholder: "Pakaian Batik / Rapi, dimohon hadir 15 menit sebelum acara dimulai" }
    ],
    openingText: "Dengan hormat, sehubungan dengan agenda tahunan perencanaan pembangunan partisipatif masyarakat desa, Pemerintah Desa Sukamaju Mandiri mengundang kehadiran Bapak/Ibu/Saudara pada:",
    bodyParagraph: "Mengingat arti penting dan strategisnya agenda musyawarah ini bagi kemajuan pembangunan desa kita, kami sangat mengharapkan kehadiran Bapak/Ibu tepat pada waktunya.",
    closingText: "Demikian surat undangan ini kami sampaikan. Atas perhatian, kehadiran, dan kerjasamanya kami ucapkan terima kasih."
  },
  {
    id: "SKTM",
    code: "400/SKTM",
    name: "Surat Keterangan Tidak Mampu (SKTM)",
    category: "Sosial & Kesejahteraan",
    description: "Keterangan kondisi ekonomi prasejahtera untuk permohonan beasiswa kuliah/sekolah (KIP-K), keringanan biaya rumah sakit, atau bantuan sosial.",
    fields: [
      { key: "beneficiaryName", label: "Nama Anak / Penerima Manfaat", placeholder: "Rizky Pratama Sudrajat" },
      { key: "schoolName", label: "Nama Sekolah / Kampus / RS", placeholder: "Universitas Negeri Padjadjaran" },
      { key: "dtksNumber", label: "Nomor ID DTKS (Jika Ada)", placeholder: "DTKS-320415080112-01" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri dengan ini menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Berdasarkan pengamatan dan data kependudukan kami, keluarga tersebut tergolong dalam keluarga PRASEJAHTERA / TIDAK MAMPU dan memerlukan bantuan dalam rangka:",
    closingText: "Surat keterangan ini diberikan kepada yang bersangkutan untuk dipergunakan sebagai kelengkapan administrasi keringanan biaya pendidikan / jaminan kesehatan."
  },
  {
    id: "SKD",
    code: "470/SKD",
    name: "Surat Keterangan Domisili Warga / Lembaga",
    category: "Kependudukan",
    description: "Keterangan resmi tempat tinggal atau keberadaan sekretariat lembaga di wilayah desa.",
    fields: [
      { key: "domicileAddress", label: "Alamat Domisili Lengkap", placeholder: "Kp. Pasir Salam RT 02 RW 03" },
      { key: "domicileSince", label: "Tinggal Sejak Tanggal/Tahun", placeholder: "Sejak Januari 2020" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa:",
    bodyParagraph: "Nama tersebut di atas adalah benar berdomisili dan bertempat tinggal resmi di wilayah hukum Desa Sukamaju Mandiri pada alamat:",
    closingText: "Demikian surat keterangan domisili ini dibuat atas permintaan yang bersangkutan untuk memenuhi keperluan administrasi."
  },
  {
    id: "SKCK",
    code: "300/SKCK",
    name: "Surat Pengantar SKCK (Kepolisian)",
    category: "Pemerintahan & Trantib",
    description: "Surat pengantar permohonan penerbitan Surat Keterangan Catatan Kepolisian ke Polsek / Polres setempat.",
    fields: [
      { key: "skckPurpose", label: "Keperluan Pengajuan SKCK", placeholder: "Persyaratan Melamar Pekerjaan di BUMN / CPNS" }
    ],
    openingText: "Yang bertanda tangan di bawah ini Kepala Desa Sukamaju Mandiri menerangkan bahwa:",
    bodyParagraph: "Orang tersebut di atas selama bertempat tinggal di desa kami memiliki kelakuan baik, tidak sedang menjalani proses hukum pidana, serta tidak pernah terlibat organisasi terlarang.",
    closingText: "Surat pengantar ini diterbitkan sebagai pengantar pembuatan SKCK di Polsek / Polres setempat."
  },
  {
    id: "SK_KELAHIRAN",
    code: "474.1/SK-LAHIR",
    name: "Surat Keterangan Kelahiran (Kenal Lahir)",
    category: "Kependudukan & Catatan Sipil",
    description: "Keterangan peristiwa kelahiran anak untuk dasar penerbitan Akta Kelahiran dan penambahan anggota Kartu Keluarga di Disdukcapil.",
    fields: [
      { key: "childName", label: "Nama Bayi / Anak", placeholder: "Aisyah Putri Sudrajat" },
      { key: "childGender", label: "Jenis Kelamin Bayi", placeholder: "Perempuan" },
      { key: "birthDateTime", label: "Hari, Tanggal & Jam Lahir", placeholder: "Senin, 20 September 2024 Pukul 06.30 WIB" },
      { key: "birthHospital", label: "Tempat Bersalin / Penolong", placeholder: "Puskesmas Harapan Makmur / Bidan Nurlaela" },
      { key: "birthOrder", label: "Kelahiran Anak Ke-", placeholder: "Anak Ke-2 (Dua)" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa di desa kami telah lahir seorang anak:",
    bodyParagraph: "Telah lahir dengan selamat anak dari pasangan suami istri yang sah:",
    closingText: "Surat keterangan ini dibuat atas dasar pelaporan orang tua untuk keperluan pengurusan Akta Kelahiran di Dinas Kependudukan dan Pencatatan Sipil."
  },
  {
    id: "SK_KEMATIAN",
    code: "474.3/SK-MATI",
    name: "Surat Keterangan Kematian",
    category: "Kependudukan & Catatan Sipil",
    description: "Keterangan peristiwa meninggal dunia warga untuk penerbitan Akta Kematian, klaim asuransi jiwa, atau penetapan waris.",
    fields: [
      { key: "deceasedName", label: "Nama Almarhum / Almarhumah", placeholder: "Alm. Bapak Dede Suparman" },
      { key: "deceasedNik", label: "NIK Almarhum", placeholder: "3204151102500001" },
      { key: "deathDateTime", label: "Hari & Tanggal Meninggal", placeholder: "Jumat, 15 Juli 2024 Pukul 14.00 WIB" },
      { key: "deathPlace", label: "Tempat Meninggal Dunia", placeholder: "Rumah Kediaman / RSUD" },
      { key: "deathCause", label: "Penyebab Meninggal", placeholder: "Sakit Usia Lanjut" },
      { key: "cemeteryPlace", label: "Tempat Pemakaman", placeholder: "TPU Pasirjati Desa Sukamaju" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa:",
    bodyParagraph: "Orang tersebut di atas telah meninggal dunia pada waktu dan tempat yang tercatat di atas.",
    closingText: "Surat keterangan kematian ini diterbitkan untuk melengkapi berkas administrasi dan pelaporan ke Disdukcapil."
  },
  {
    id: "SK_BELUM_MENIKAH",
    code: "474.2/SK-BM",
    name: "Surat Keterangan Belum Pernah Menikah",
    category: "Kependudukan & Pernikahan",
    description: "Keterangan status lajang / bujang / perawan untuk persyaratan administrasi KPR perumahan, pendaftaran TNI/Polri, atau pernikahan.",
    fields: [
      { key: "singlePurpose", label: "Tujuan Pembuatan Surat", placeholder: "Persyaratan Pendaftaran Seleksi Calon Prajurit TNI" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri dengan ini menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Nama tersebut di atas sepanjang pengetahuan kami hingga saat diterbitkannya surat ini berstatus BELUM PERNAH MENIKAH (Gadis / Jejaka) dengan siapapun baik secara hukum agama maupun hukum negara.",
    closingText: "Demikian surat keterangan ini kami buat dengan sebenarnya agar dapat digunakan sebagaimana mestinya."
  },
  {
    id: "SK_PENGHASILAN",
    code: "510/SK-PENG",
    name: "Surat Keterangan Rincian Penghasilan Orang Tua",
    category: "Perekonomian & Beasiswa",
    description: "Keterangan estimasi rata-rata penghasilan per bulan bagi orang tua/wali yang bekerja di sektor informal / wiraswasta / petani.",
    fields: [
      { key: "fatherJob", label: "Pekerjaan Ayah & Penghasilan/Bln", placeholder: "Petani - Rp 1.500.000 / bulan" },
      { key: "motherJob", label: "Pekerjaan Ibu & Penghasilan/Bln", placeholder: "Ibu Rumah Tangga - Rp 0" },
      { key: "dependentsCount", label: "Jumlah Tanggungan Keluarga", placeholder: "3 (Tiga) Orang Anak" },
      { key: "incomePurpose", label: "Tujuan Pengajuan", placeholder: "Persyaratan Beasiswa KIP Kuliah di ITB" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa:",
    bodyParagraph: "Berdasarkan data kependudukan dan keterangan pemohon, jumlah rata-rata penghasilan kotor gabungan orang tua pemohon adalah sebesar yang tercatat di atas.",
    closingText: "Demikian surat keterangan penghasilan ini diberikan untuk dipergunakan sebagaimana mestinya."
  },
  {
    id: "SK_BEDA_NAMA",
    code: "470/SK-BN",
    name: "Surat Keterangan Beda Identitas / Nama",
    category: "Catatan Sipil & Kependudukan",
    description: "Keterangan sinkronisasi perbedaan penulisan nama atau tanggal lahir antara KTP, Kartu Keluarga, Ijazah, atau Buku Rekening Bank.",
    fields: [
      { key: "nameInKtp", label: "Nama Tertulis di KTP/KK", placeholder: "BAMBANG SUDRAJAT (NIK: 3204151208850002)" },
      { key: "nameInDocument", label: "Nama Tertulis di Ijazah/Sertifikat", placeholder: "BAMBANG S. (No. Ijazah: DN-02/12345)" },
      { key: "correctIdentity", label: "Penegasan Identitas yang Benar", placeholder: "Adalah ORANG YANG SATU DAN SAMA" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Bahwa nama yang tertulis pada dokumen KTP/KK dan nama yang tertulis pada dokumen Ijazah/Sertifikat tersebut di atas adalah benar-benar SATU ORANG YANG SAMA.",
    closingText: "Surat keterangan beda nama ini dibuat untuk meluruskan perbedaan pencatatan administrasi kependudukan."
  },
  {
    id: "SURAT_TUGAS",
    code: "090/ST-DESA",
    name: "Surat Perintah Tugas (SPT) Desa",
    category: "Kedinasan & Pemerintahan",
    description: "Surat penugasan resmi perangkat desa, ketua RW/RT, atau kader dalam rangka rapat koordinasi, pelatihan dinas, atau peninjauan lapangan.",
    fields: [
      { key: "assignedPerson", label: "Aparatur yang Ditugaskan", placeholder: "Ahmad Fauzi, S.Kom (Kasi Pelayanan)" },
      { key: "assignmentTask", label: "Uraian Tugas / Kegiatan", placeholder: "Mengikuti Bimbingan Teknis Sistem Informasi Desa di Kantor Camat" },
      { key: "assignmentDate", label: "Waktu & Tempat Pelaksanaan", placeholder: "Kamis, 25 Agustus 2026 di Aula Kecamatan Harapan Makmur" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri dengan ini MENUGASKAN kepada:",
    bodyParagraph: "Untuk melaksanakan tugas kedinasan sebagaimana tercantum di atas dengan penuh tanggung jawab dan melaporkan hasil pelaksanaannya kepada Kepala Desa.",
    closingText: "Surat perintah tugas ini diberikan agar dilaksanakan dengan sebaik-baiknya."
  }
];
