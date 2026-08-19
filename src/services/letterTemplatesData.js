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
  // =========================================================================
  // 1. KEPENDUDUKAN & IDENTITAS (KTP, KK, KIA, DOMISILI, PINDAH/DATANG)
  // =========================================================================
  {
    id: "SP_KTP_BARU",
    code: "470/SP-KTP",
    name: "Surat Pengantar Pembuatan KTP Baru / Perekaman KTP-el",
    category: "Kependudukan & KTP/KK",
    description: "Pengantar permohonan penerbitan KTP-el baru bagi warga yang telah berusia 17 tahun atau baru pertama kali melakukan perekaman biometrik di Disdukcapil/Kecamatan.",
    fields: [
      { key: "reason", label: "Alasan Permohonan", placeholder: "Pemula (Memasuki Usia 17 Tahun)" },
      { key: "noKk", label: "Nomor Kartu Keluarga", placeholder: "3204150801120005" },
      { key: "targetOffice", label: "Instansi Tujuan Perekaman", placeholder: "Kantor Pelayanan Disdukcapil / Kantor Kecamatan Harapan Makmur" }
    ],
    openingText: "Yang bertanda tangan di bawah ini Kepala Desa Sukamaju Mandiri menerangkan bahwa:",
    bodyParagraph: "Nama tersebut di atas adalah benar warga penduduk Desa Sukamaju Mandiri yang belum pernah melakukan perekaman KTP-el dan bermaksud mengajukan permohonan perekaman serta pencetakan KTP Elektronik Baru.",
    closingText: "Demikian surat pengantar ini kami berikan kepada yang bersangkutan untuk dapat dipergunakan sebagaimana mestinya."
  },
  {
    id: "SP_KTP_UBAH",
    code: "470/SP-KTP-UBAH",
    name: "Surat Pengantar Perubahan Data KTP-el",
    category: "Kependudukan & KTP/KK",
    description: "Pengantar perbaikan atau perubahan elemen data pada KTP-el (status perkawinan, pekerjaan, alamat, agama, golongan darah, gelar).",
    fields: [
      { key: "changedElements", label: "Elemen Data yang Diubah", placeholder: "Status Perkawinan (Belum Kawin -> Kawin) & Pekerjaan (Pelajar -> Karyawan Swasta)" },
      { key: "supportingDoc", label: "Dokumen Dasar Perubahan", placeholder: "Buku Nikah No. 012/04/VIII/2026 & Ijazah S1" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Berdasarkan berkas pendukung yang sah, pemohon bermaksud mengajukan permohonan perubahan elemen data pada Kartu Tanda Penduduk Elektronik (KTP-el) sebagai berikut:",
    closingText: "Surat pengantar ini diterbitkan guna melengkapi persyaratan permohonan cetak ulang KTP-el dengan data terbaru di Disdukcapil."
  },
  {
    id: "SP_KTP_HILANG",
    code: "470/SP-KTP-RUSAK",
    name: "Surat Pengantar Penggantian KTP-el Rusak atau Hilang",
    category: "Kependudukan & KTP/KK",
    description: "Pengantar pencetakan ulang KTP-el karena fisik kartu patah/rusak/terkelupas atau hilang dengan lampiran surat tanda kehilangan kepolisian.",
    fields: [
      { key: "damageType", label: "Kondisi Fisik / Alasan", placeholder: "Hilang / Rusak Fisik Terkelupas Chip Tidak Terbaca" },
      { key: "policeReportNo", label: "Nomor Surat Kehilangan Kepolisian (Jika Hilang)", placeholder: "SKTLK/124/VIII/2026/Polsek Harapan Makmur" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri dengan ini menerangkan bahwa:",
    bodyParagraph: "Nama tersebut di atas adalah benar warga kami yang mengalami kehilangan/kerusakan fisik KTP-el dan bermaksud mengajukan pencetakan ulang KTP-el pengganti.",
    closingText: "Demikian surat pengantar ini dibuat dengan sebenarnya agar dapat dipergunakan sebagai persyaratan penggantian KTP-el di Dinas Dukcapil."
  },
  {
    id: "SP_KIA",
    code: "470/SP-KIA",
    name: "Surat Pengantar Pembuatan Kartu Identitas Anak (KIA)",
    category: "Kependudukan & KTP/KK",
    description: "Pengantar penerbitan identitas resmi anak usia 0 s.d. 17 tahun kurang satu hari untuk perlindungan dan pemenuhan hak anak.",
    fields: [
      { key: "childName", label: "Nama Lengkap Anak", placeholder: "Muhammad Rizki Pratama" },
      { key: "childNik", label: "NIK Anak", placeholder: "3204151406180003" },
      { key: "childBirth", label: "Tempat, Tanggal Lahir Anak", placeholder: "Bandung, 14 Juni 2018" },
      { key: "birthCertNo", label: "Nomor Akta Kelahiran", placeholder: "3204-LT-15072018-0042" },
      { key: "fatherName", label: "Nama Kepala Keluarga / Orang Tua", placeholder: "Bambang Sudrajat" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan dengan sebenarnya bahwa:",
    bodyParagraph: "Anak tersebut di atas adalah benar anak kandung dari warga penduduk Desa Sukamaju Mandiri yang mengajukan penerbitan Kartu Identitas Anak (KIA) di Disdukcapil.",
    closingText: "Surat pengantar ini dibuat untuk kelengkapan berkas permohonan KIA sebagaimana ketentuan yang berlaku."
  },
  {
    id: "SP_KK_BARU",
    code: "470/SP-KK-BARU",
    name: "Surat Pengantar Pembuatan Kartu Keluarga (KK) Baru",
    category: "Kependudukan & KTP/KK",
    description: "Pengantar pembentukan Kartu Keluarga baru akibat pernikahan baru, pemecahan KK dalam satu alamat, atau mandiri.",
    fields: [
      { key: "kkReason", label: "Alasan Pembentukan KK", placeholder: "Membentuk Keluarga Baru Pasca Pernikahan / Pemecahan KK" },
      { key: "oldKkNo", label: "Nomor KK Asal / Induk", placeholder: "3204150801120005" },
      { key: "spouseName", label: "Nama Pasangan / Istri", placeholder: "Siti Rahmawati" },
      { key: "marriageBookNo", label: "Nomor Buku Nikah / Akta Perkawinan", placeholder: "0412/054/VIII/2026 KUA Harapan Makmur" }
    ],
    openingText: "Yang bertanda tangan di bawah ini Kepala Desa Sukamaju Mandiri menerangkan bahwa:",
    bodyParagraph: "Nama tersebut di atas adalah benar warga kami yang mengajukan penerbitan Kartu Keluarga (KK) Baru untuk membentuk rumah tangga mandiri di Desa Sukamaju Mandiri.",
    closingText: "Demikian surat pengantar ini dibuat untuk dipergunakan sebagai dasar permohonan penerbitan KK Baru di Disdukcapil."
  },
  {
    id: "SP_KK_ANGGOTA",
    code: "470/SP-KK-MEMBER",
    name: "Surat Pengantar Penambahan / Pengurangan Anggota Kartu Keluarga",
    category: "Kependudukan & KTP/KK",
    description: "Pengantar perubahan susunan anggota keluarga dalam KK karena kelahiran anak, kepindahan anggota keluarga, atau kematian.",
    fields: [
      { key: "changeType", label: "Jenis Perubahan Anggota", placeholder: "Penambahan Anggota (Kelahiran Bayi) / Pengurangan (Pindah / Meninggal)" },
      { key: "personName", label: "Nama Anggota yang Bersangkutan", placeholder: "Aisyah Putri Sudrajat" },
      { key: "relationType", label: "Hubungan dalam Keluarga", placeholder: "Anak Kandung" },
      { key: "referenceDoc", label: "Dasar Surat / Akta", placeholder: "Surat Keterangan Kelahiran No. 474.1/014/VIII/2026" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa:",
    bodyParagraph: "Berdasarkan data kependudukan dan bukti pendukung resmi, pemohon mengajukan perubahan susunan anggota Kartu Keluarga (KK) di wilayah Desa Sukamaju Mandiri.",
    closingText: "Surat pengantar ini diterbitkan sebagai kelengkapan administrasi pemutakhiran data KK di Disdukcapil."
  },
  {
    id: "SP_KK_UBAH",
    code: "470/SP-KK-UBAH",
    name: "Surat Pengantar Perubahan Data Kartu Keluarga",
    category: "Kependudukan & KTP/KK",
    description: "Pengantar revisi kesalahan penulisan nama, tanggal lahir, nama orang tua, pendidikan, atau pekerjaan seluruh anggota KK.",
    fields: [
      { key: "changeDetails", label: "Rincian Data yang Diperbaiki", placeholder: "Perbaikan Tanggal Lahir Kepala Keluarga & Penyesuaian Pendidikan Terakhir" },
      { key: "basisDocument", label: "Dokumen Dasar Perbaikan", placeholder: "Ijazah Terakhir & Akta Kelahiran Asli" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri dengan ini menerangkan:",
    bodyParagraph: "Bahwa pemohon di atas mengajukan perbaikan dan penyesuaian elemen data pada Kartu Keluarga (KK) sesuai dengan dokumen autentik yang terlampir.",
    closingText: "Demikian surat pengantar perbaikan data KK ini dibuat untuk ditindaklanjuti oleh instansi berwenang."
  },
  {
    id: "SP_KK_HILANG",
    code: "470/SP-KK-HILANG",
    name: "Surat Pengantar Penggantian Kartu Keluarga Rusak atau Hilang",
    category: "Kependudukan & KTP/KK",
    description: "Pengantar cetak ulang blangko Kartu Keluarga yang hilang, robek, basah, atau tidak terbaca.",
    fields: [
      { key: "kkDamageReason", label: "Keterangan Kondisi", placeholder: "Kartu Keluarga Hilang / Rusak Fisik Akibat Bencana / Lapuk" },
      { key: "policeReportNo", label: "No. Surat Tanda Kehilangan (Jika Hilang)", placeholder: "STPLK/089/VIII/2026/Polsek Harapan Makmur" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Kartu Keluarga atas nama kepala keluarga tersebut di atas telah mengalami kerusakan/kehilangan, dan pemohon bermaksud memohon pencetakan kembali Kartu Keluarga Pengganti.",
    closingText: "Surat pengantar ini dibuat dengan sebenarnya untuk melengkapi berkas permohonan KK pengganti di Dinas Kependudukan dan Pencatatan Sipil."
  },
  {
    id: "SKD",
    code: "470/SKD",
    name: "Surat Keterangan Domisili Warga / Tempat Tinggal",
    category: "Kependudukan & KTP/KK",
    description: "Keterangan resmi tempat tinggal atau keberadaan warga sementara/menetap di wilayah desa.",
    fields: [
      { key: "domicileAddress", label: "Alamat Domisili Lengkap", placeholder: "Kp. Pasir Salam RT 02 RW 03 Desa Sukamaju" },
      { key: "domicileSince", label: "Tinggal Sejak Tanggal/Tahun", placeholder: "Sejak Januari 2020 (± 4 Tahun)" },
      { key: "domicilePurpose", label: "Keperluan Surat", placeholder: "Persyaratan Pembukaan Rekening Bank / Melamar Kerja / Domisili Tinggal" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa:",
    bodyParagraph: "Nama tersebut di atas adalah benar berdomisili dan bertempat tinggal resmi di wilayah hukum Desa Sukamaju Mandiri pada alamat yang tercantum di atas.",
    closingText: "Demikian surat keterangan domisili ini dibuat atas permintaan yang bersangkutan untuk memenuhi keperluan administrasi."
  },
  {
    id: "SKD_USAHA",
    code: "503/SKD-DU",
    name: "Surat Keterangan Domisili Perusahaan / Usaha / Lembaga / Yayasan",
    category: "Kependudukan & KTP/KK",
    description: "Keterangan domisili dan keberadaan kantor badan usaha, CV, PT, yayasan, ormas, atau lembaga di wilayah desa.",
    fields: [
      { key: "companyName", label: "Nama Perusahaan / Lembaga / Yayasan", placeholder: "PT. Sukamaju Agro Mandiri Sejahtera" },
      { key: "businessField", label: "Bidang Usaha / Kegiatan", placeholder: "Perdagangan Komoditas Pertanian & Pengolahan Hasil Bumi" },
      { key: "leaderName", label: "Nama Pimpinan / Direktur / Ketua", placeholder: "Hendra Wijaya, S.E" },
      { key: "officeAddress", label: "Alamat Kantor / Sekretariat", placeholder: "Jl. Raya Industri Desa Sukamaju No. 88 RT 04 RW 02" },
      { key: "deedNumber", label: "Nomor Akta Notaris / Kemenkumham", placeholder: "Akta Notaris No. 24 Tanggal 10 Januari 2023 Notaris Rahardjo, S.H" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa:",
    bodyParagraph: "Badan Usaha / Lembaga / Yayasan tersebut di atas adalah benar berkedudukan dan membuka kantor operasional di wilayah hukum Desa Sukamaju Mandiri.",
    closingText: "Surat keterangan domisili perusahaan/lembaga ini diberikan untuk keperluan kelengkapan legalitas dan perizinan usaha."
  },
  {
    id: "SKPWNI",
    code: "475/SKPWNI",
    name: "Surat Keterangan Pindah Domisili Keluar Desa (SKPWNI)",
    category: "Kependudukan & KTP/KK",
    description: "Surat pengantar perpindahan penduduk antar desa, kecamatan, kabupaten, atau antar provinsi bagi warga yang pindah tempat tinggal.",
    fields: [
      { key: "destinationAddress", label: "Alamat Lengkap Tujuan Pindah", placeholder: "Jl. Melati No. 12 RT 03 RW 05 Kelurahan Bojongsoang, Kab. Bandung" },
      { key: "moveReason", label: "Alasan Pindah", placeholder: "Pekerjaan / Mengikuti Suami / Pendidikan / Perumahan Baru" },
      { key: "familyMembersCount", label: "Jumlah Anggota Keluarga yang Pindah", placeholder: "3 (Tiga) Orang" },
      { key: "moveClassification", label: "Klasifikasi Pindah", placeholder: "Antar Kabupaten / Antar Provinsi" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa yang bersangkutan:",
    bodyParagraph: "Bermaksud mengajukan Surat Keterangan Pindah Warga Negara Indonesia (SKPWNI) dari Desa Sukamaju Mandiri menuju alamat tujuan yang tercantum di atas.",
    closingText: "Demikian surat keterangan pindah ini diterbitkan untuk dipergunakan dalam pengurusan surat pindah di Disdukcapil tujuan."
  },
  {
    id: "SKPD",
    code: "475/SKPD-DATANG",
    name: "Surat Keterangan Pindah Datang / Warga Baru",
    category: "Kependudukan & KTP/KK",
    description: "Keterangan penerimaan kedatangan warga baru di desa berdasarkan SKPWNI dari daerah asal untuk pendaftaran KK dan KTP desa setempat.",
    fields: [
      { key: "originAddress", label: "Alamat Asal Sebelumnya", placeholder: "Kelurahan Cibadak RT 02 RW 04 Kec. Astanaanyar Kota Bandung" },
      { key: "skpwniNo", label: "Nomor SKPWNI dari Daerah Asal", placeholder: "475/082/SKPWNI/2026 Disdukcapil Kota Bandung" },
      { key: "newLocalAddress", label: "Alamat Menetap di Desa Ini", placeholder: "Dusun Pasirjati RT 01 RW 04 Desa Sukamaju Mandiri" },
      { key: "moveInReason", label: "Alasan Pindah Datang", placeholder: "Membeli Rumah / Bertani / Mengikuti Keluarga" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri dengan ini menerangkan:",
    bodyParagraph: "Bahwa nama tersebut di atas benar telah melapor dan diterima sebagai warga penduduk baru yang menetap di wilayah Desa Sukamaju Mandiri dengan membawa surat pindah resmi.",
    closingText: "Surat keterangan ini dibuat sebagai bukti penerimaan warga baru dan dasar penerbitan Kartu Keluarga di Disdukcapil setempat."
  },
  {
    id: "SK_BEDA_NAMA",
    code: "470/SK-BN",
    name: "Surat Keterangan Beda Nama / Identitas pada Dokumen Resmi",
    category: "Kependudukan & KTP/KK",
    description: "Keterangan sinkronisasi perbedaan penulisan nama atau tanggal lahir antara KTP, Kartu Keluarga, Ijazah, Buku Nikah, Paspor, atau Rekening Bank.",
    fields: [
      { key: "nameInKtp", label: "Nama Tertulis di KTP / KK", placeholder: "BAMBANG SUDRAJAT (NIK: 3204151208850002)" },
      { key: "nameInDocument", label: "Nama Tertulis di Ijazah / Dokumen Lain", placeholder: "BAMBANG S. (No. Dokumen: DN-02/12345/2004)" },
      { key: "correctIdentity", label: "Penegasan Fakta", placeholder: "Adalah benar-benar SATU ORANG YANG SAMA" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Bahwa perbedaan penulisan nama/identitas yang tercantum pada dokumen KTP/KK dan dokumen Ijazah/Sertifikat tersebut di atas adalah benar-benar SATU ORANG YANG SAMA dan warga kami.",
    closingText: "Surat keterangan beda nama ini dibuat untuk meluruskan perbedaan pencatatan administrasi kependudukan."
  },

  // =========================================================================
  // 2. KELAHIRAN, KEMATIAN & CATATAN SIPIL
  // =========================================================================
  {
    id: "SK_KELAHIRAN",
    code: "474.1/SK-LAHIR",
    name: "Surat Keterangan Kelahiran (Pengantar Akta Kelahiran)",
    category: "Kelahiran & Kematian",
    description: "Keterangan peristiwa kelahiran anak untuk dasar penerbitan Akta Kelahiran dan penambahan anggota Kartu Keluarga di Disdukcapil.",
    fields: [
      { key: "childName", label: "Nama Bayi / Anak", placeholder: "Aisyah Putri Sudrajat" },
      { key: "childGender", label: "Jenis Kelamin Bayi", placeholder: "Perempuan" },
      { key: "birthDateTime", label: "Hari, Tanggal & Jam Lahir", placeholder: "Senin, 20 September 2024 Pukul 06.30 WIB" },
      { key: "birthHospital", label: "Tempat Bersalin / Penolong", placeholder: "Puskesmas Harapan Makmur / Bidan Nurlaela" },
      { key: "birthOrder", label: "Kelahiran Anak Ke-", placeholder: "Anak Ke-2 (Dua)" },
      { key: "motherName", label: "Nama Ibu Kandung", placeholder: "Iis Aisyah" },
      { key: "fatherName", label: "Nama Ayah Kandung", placeholder: "Bambang Sudrajat" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa di wilayah kami telah lahir seorang anak:",
    bodyParagraph: "Telah lahir dengan selamat anak dari pasangan suami istri yang sah sebagaimana data tercantum di atas.",
    closingText: "Surat keterangan kelahiran ini dibuat atas dasar pelaporan orang tua untuk keperluan pengurusan Akta Kelahiran di Disdukcapil."
  },
  {
    id: "SK_KEMATIAN",
    code: "474.3/SK-MATI",
    name: "Surat Keterangan Kematian (Pengantar Akta Kematian)",
    category: "Kelahiran & Kematian",
    description: "Keterangan peristiwa meninggal dunia warga untuk penerbitan Akta Kematian, klaim asuransi jiwa, Taspen, atau penetapan waris.",
    fields: [
      { key: "deceasedName", label: "Nama Almarhum / Almarhumah", placeholder: "Alm. Bapak Dede Suparman" },
      { key: "deceasedNik", label: "NIK Almarhum", placeholder: "3204151102500001" },
      { key: "deathDateTime", label: "Hari, Tanggal & Pukul Meninggal", placeholder: "Jumat, 15 Juli 2024 Pukul 14.00 WIB" },
      { key: "deathPlace", label: "Tempat Meninggal Dunia", placeholder: "Rumah Kediaman / RSUD" },
      { key: "deathCause", label: "Penyebab Kematian", placeholder: "Sakit Usia Lanjut" },
      { key: "cemeteryPlace", label: "Tempat Pemakaman", placeholder: "TPU Pasirjati Desa Sukamaju" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan dengan sebenarnya bahwa:",
    bodyParagraph: "Orang tersebut di atas telah meninggal dunia pada waktu dan tempat yang tercatat di atas dan tercatat sebagai warga penduduk kami.",
    closingText: "Surat keterangan kematian ini diterbitkan untuk melengkapi berkas administrasi dan penerbitan Akta Kematian di Disdukcapil."
  },

  // =========================================================================
  // 3. PERNIKAHAN, KUA & KELUARGA
  // =========================================================================
  {
    id: "SK_NIKAH_N1",
    code: "474.2/N-1",
    name: "Surat Keterangan Pengantar Nikah (Formulir Model N1)",
    category: "Pernikahan & KUA",
    description: "Formulir standar Model N-1 pengantar pernikahan dari desa ke Kantor Urusan Agama (KUA) / Pencatatan Sipil.",
    fields: [
      { key: "candidateStatus", label: "Status Pernikahan Calon", placeholder: "Jejaka / Perawan / Duda / Janda" },
      { key: "fatherName", label: "Nama Ayah Kandung", placeholder: "H. Suparman" },
      { key: "motherName", label: "Nama Ibu Kandung", placeholder: "Hj. Siti Maryam" },
      { key: "kuaTarget", label: "KUA Kecamatan Tujuan", placeholder: "KUA Kecamatan Harapan Makmur" }
    ],
    openingText: "Yang bertanda tangan di bawah ini Kepala Desa Sukamaju Mandiri menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Nama tersebut di atas adalah benar warga kami yang memenuhi syarat dan bermaksud melangsungkan akad pernikahan di KUA Kecamatan.",
    closingText: "Surat pengantar nikah (Model N1) ini dibuat untuk dipergunakan sebagai kelengkapan pendaftaran kehendak nikah di KUA."
  },
  {
    id: "SK_NIKAH_N2",
    code: "474.2/N-2",
    name: "Surat Keterangan Asal-Usul Pernikahan (Formulir Model N2)",
    category: "Pernikahan & KUA",
    description: "Formulir Model N-2 yang memuat keterangan identitas lengkap kedua orang tua calon mempelai.",
    fields: [
      { key: "fatherFull", label: "Identitas Lengkap Ayah (Nama, NIK, Tempat/Tgl Lahir, Pekerjaan)", placeholder: "H. Suparman, NIK: 3204151004550001, Bandung 10-04-1955, Petani" },
      { key: "motherFull", label: "Identitas Lengkap Ibu (Nama, NIK, Tempat/Tgl Lahir, Pekerjaan)", placeholder: "Hj. Siti Maryam, NIK: 3204155008600002, Bandung 10-08-1960, IRT" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan dengan sesungguhnya bahwa orang tua dari pemohon adalah:",
    bodyParagraph: "Nama-nama orang tua tersebut di atas adalah benar orang tua kandung dari calon mempelai yang akan melangsungkan pernikahan.",
    closingText: "Demikian Surat Keterangan Asal-Usul (Model N2) ini dibuat untuk melengkapi berkas pernikahan di KUA."
  },
  {
    id: "SK_NIKAH_N3",
    code: "474.2/N-3",
    name: "Surat Persetujuan Mempelai (Formulir Model N3)",
    category: "Pernikahan & KUA",
    description: "Pernyataan persetujuan suka sama suka antara calon suami dan calon istri tanpa paksaan dari pihak manapun.",
    fields: [
      { key: "groomName", label: "Nama Calon Suami", placeholder: "Ahmad Fauzi, S.Kom" },
      { key: "brideName", label: "Nama Calon Istri", placeholder: "Nurul Hidayah, S.Pd" },
      { key: "consentStatement", label: "Pernyataan Persetujuan", placeholder: "Menyatakan setuju melangsungkan pernikahan atas dasar suka sama suka tanpa paksaan" }
    ],
    openingText: "Kami yang bertanda tangan di bawah ini calon mempelai menyatakan bahwa:",
    bodyParagraph: "Menyatakan dengan sesungguhnya bahwa kami berdua bersepakat dan saling menyetujui untuk melangsungkan pernikahan atas dasar keikhlasan hati tanpa paksaan dari pihak manapun.",
    closingText: "Surat Persetujuan Mempelai (Model N3) ini dibuat dengan penuh kesadaran dan disaksikan oleh Pemerintah Desa Sukamaju Mandiri."
  },
  {
    id: "SK_NIKAH_N4",
    code: "474.2/N-4",
    name: "Surat Izin Orang Tua untuk Menikah (Formulir Model N4)",
    category: "Pernikahan & KUA",
    description: "Surat pemberian izin resmi dari orang tua/wali bagi calon mempelai yang hendak melangsungkan pernikahan.",
    fields: [
      { key: "parentName", label: "Nama Orang Tua / Wali Pemberi Izin", placeholder: "H. Suparman & Hj. Siti Maryam" },
      { key: "childCandidate", label: "Nama Anak yang Diberi Izin Menikah", placeholder: "Ahmad Fauzi, S.Kom" },
      { key: "futureSpouse", label: "Menikah dengan Calon Pasangan", placeholder: "Nurul Hidayah, S.Pd binti Bpk. H. Mahmud" }
    ],
    openingText: "Kami orang tua / wali yang bertanda tangan di bawah ini menerangkan:",
    bodyParagraph: "Dengan ini memberikan izin sepenuhnya dan restu kepada anak kami untuk melangsungkan pernikahan dengan calon pasangannya.",
    closingText: "Surat izin orang tua (Model N4) ini dibuat untuk melengkapi administrasi persyaratan nikah di KUA."
  },
  {
    id: "SK_BELUM_MENIKAH",
    code: "474.2/SK-BM",
    name: "Surat Keterangan Belum Menikah / Masih Lajang",
    category: "Pernikahan & KUA",
    description: "Keterangan status lajang / bujang / perawan untuk persyaratan administrasi KPR perumahan, pendaftaran TNI/Polri, beasiswa, atau pernikahan.",
    fields: [
      { key: "singlePurpose", label: "Tujuan Pembuatan Surat", placeholder: "Persyaratan Pendaftaran KPR BTN / Seleksi CPNS / Rekrutmen BUMN" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri dengan ini menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Nama tersebut di atas sepanjang pengetahuan kami hingga saat diterbitkannya surat ini berstatus BELUM PERNAH MENIKAH (Gadis / Jejaka) dengan siapapun baik secara hukum agama maupun hukum negara.",
    closingText: "Demikian surat keterangan belum menikah ini kami buat dengan sebenarnya agar dapat digunakan sebagaimana mestinya."
  },
  {
    id: "SK_DUDA_JANDA",
    code: "474.2/SK-DJ",
    name: "Surat Keterangan Duda / Janda",
    category: "Pernikahan & KUA",
    description: "Keterangan status perkawinan duda/janda akibat pasangan meninggal dunia (cerai mati) atau perceraian pengadilan (cerai hidup).",
    fields: [
      { key: "maritalStatusType", label: "Status (Duda / Janda)", placeholder: "Duda / Janda (Cerai Mati / Cerai Hidup)" },
      { key: "exSpouseName", label: "Nama Mantan Suami / Istri", placeholder: "Almh. Siti Fatimah / Mantan Istri" },
      { key: "divorceLegalBasis", label: "Dasar Hukum / Akta Cerai / Akta Kematian", placeholder: "Akta Kematian No. 474.3/021/2023 / Akta Cerai No. 0412/AC/2024/PA.Bdg" },
      { key: "statusPurpose", label: "Keperluan Surat", placeholder: "Persyaratan Pendaftaran Pernikahan Kembali / Pengurusan Hak Asuh" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Nama tersebut di atas adalah benar warga kami yang saat ini berstatus DUDA / JANDA dan belum pernah menikah kembali dengan orang lain sejak status tersebut ditetapkan.",
    closingText: "Surat keterangan duda/janda ini dibuat dengan sebenarnya untuk digunakan sesuai keperluannya."
  },
  {
    id: "SK_NIKAH_SIRI",
    code: "474.2/SK-SIRI",
    name: "Surat Keterangan Menikah Siri / Pernikahan Adat",
    category: "Pernikahan & KUA",
    description: "Keterangan pengakuan pernikahan sah secara hukum agama/adat bagi pasangan yang mengajukan permohonan Isbat Nikah di Pengadilan Agama.",
    fields: [
      { key: "husbandName", label: "Nama Suami", placeholder: "Ujang Suherman" },
      { key: "wifeName", label: "Nama Istri", placeholder: "Eneng Rohayati" },
      { key: "marriageDate", label: "Tanggal & Tempat Nikah Agama/Adat", placeholder: "10 Mei 2018 di Kp. Pasir Salam Desa Sukamaju" },
      { key: "marriageWitness", label: "Nama Wali & Saksi Nikah", placeholder: "Wali: Bpk. H. Syarifudin | Saksi: Bpk. Ust. Abdullah" },
      { key: "purposeIsbat", label: "Tujuan Pengajuan", placeholder: "Persyaratan Permohonan Sidang Isbat Nikah Terpadu di Pengadilan Agama" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa pasangan tersebut di atas:",
    bodyParagraph: "Adalah benar telah melangsungkan pernikahan secara sah menurut syariat hukum agama Islam / adat dan saat ini hidup rukun bersama serta bermaksud mencatatkan pernikahannya melalui Isbat Nikah.",
    closingText: "Surat keterangan ini diberikan sebagai pengantar pengajuan Isbat Nikah di Pengadilan Agama."
  },
  {
    id: "SK_NIKAH_NONMUSLIM",
    code: "474.2/SK-NONMUSLIM",
    name: "Surat Keterangan Pernikahan untuk Non-Muslim (Pencatatan Sipil)",
    category: "Pernikahan & KUA",
    description: "Pengantar pencatatan perkawinan bagi warga non-muslim setelah pemberkatan di tempat ibadah untuk diterbitkan Akta Perkawinan Disdukcapil.",
    fields: [
      { key: "groomName", label: "Nama Mempelai Pria", placeholder: "Yohanes Kristanto" },
      { key: "brideName", label: "Nama Mempelai Wanita", placeholder: "Maria Fransiska" },
      { key: "churchBlessingDate", label: "Tanggal & Tempat Pemberkatan Nikah", placeholder: "12 Agustus 2026 di Gereja Santo Yosef" },
      { key: "pastorName", label: "Pemuka Agama / Pendeta / Pastor", placeholder: "Pastor Antonius, Pr" },
      { key: "churchCertNo", label: "Nomor Surat Pemberkatan Gereja", placeholder: "S-NIK/044/G-SY/VIII/2026" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa:",
    bodyParagraph: "Kedua mempelai tersebut di atas adalah benar warga kami yang telah melangsungkan pernikahan secara sah menurut agama dan mengajukan pencatatan perkawinan di Disdukcapil.",
    closingText: "Surat keterangan ini dibuat sebagai kelengkapan penerbitan Akta Perkawinan resmi di Dinas Dukcapil."
  },
  {
    id: "SK_WALI_NIKAH",
    code: "474.2/SK-WALI",
    name: "Surat Keterangan Wali Nikah / Wali Hakim",
    category: "Pernikahan & KUA",
    description: "Keterangan silsilah dan keberadaan wali nikah (wali nasab terdekat) atau rekomendasi permohonan wali hakim ke KUA.",
    fields: [
      { key: "brideName", label: "Nama Calon Pengantin Wanita", placeholder: "Siti Rahmawati" },
      { key: "guardianName", label: "Nama Wali Nikah yang Berhak", placeholder: "Drs. Subagja (Paman Kandung Se-Ayah)" },
      { key: "guardianRelationship", label: "Hubungan Kekerabatan Wali", placeholder: "Saudara Kandung Laki-laki dari Ayah Almarhum" },
      { key: "guardianStatusReason", label: "Alasan Penetapan / Kendala Wali", placeholder: "Ayah Kandung telah Meninggal Dunia & Tidak Memiliki Saudara Laki-laki Kandung" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Berdasarkan silsilah keluarga calon pengantin wanita tersebut di atas, orang yang berhak bertindak sebagai wali nasab nikah adalah nama yang tercantum di atas.",
    closingText: "Demikian surat keterangan wali nikah ini dibuat untuk dipergunakan dalam pendaftaran pernikahan di Kantor Urusan Agama (KUA)."
  },

  // =========================================================================
  // 4. SOSIAL, EKONOMI & BANTUAN (SKTM, SKU, PENGHASILAN, RUMAH)
  // =========================================================================
  {
    id: "SKTM_BEROBAT",
    code: "400/SKTM-KES",
    name: "Surat Keterangan Tidak Mampu (SKTM) untuk Bantuan Biaya Berobat / Rumah Sakit",
    category: "Sosial & Kesejahteraan",
    description: "Keterangan kondisi ekonomi prasejahtera untuk permohonan keringanan biaya rumah sakit, Jamkesda, atau pendaftaran BPJS PBI.",
    fields: [
      { key: "patientName", label: "Nama Pasien / Yang Sakit", placeholder: "Bpk. Dede Suparman" },
      { key: "hospitalName", label: "Rumah Sakit / Faskes Rujukan", placeholder: "RSUD Harapan Makmur / RSUP Dr. Hasan Sadikin" },
      { key: "diseaseType", label: "Keluhan / Penyakit", placeholder: "Perawatan Rawat Inap & Operasi Jantung" },
      { key: "dtksNumber", label: "Nomor DTKS (Jika Ada)", placeholder: "DTKS-320415080112-01" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri dengan ini menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Berdasarkan data kependudukan dan peninjauan langsung, keluarga tersebut tergolong dalam keluarga PRASEJAHTERA / TIDAK MAMPU dan memerlukan bantuan keringanan biaya pengobatan di fasilitas kesehatan.",
    closingText: "Surat keterangan ini diberikan agar dapat dipergunakan sebagai persyaratan keringanan biaya medis / pendaftaran jaminan kesehatan bersubsidi."
  },
  {
    id: "SKTM_BEASISWA",
    code: "400/SKTM-EDU",
    name: "Surat Keterangan Tidak Mampu (SKTM) untuk Beasiswa / Sekolah / Kuliah",
    category: "Sosial & Kesejahteraan",
    description: "Keterangan prasejahtera untuk pengajuan beasiswa KIP-Kuliah, bantuan UKT, Kartu Indonesia Pintar (KIP), atau pembebasan SPP.",
    fields: [
      { key: "studentName", label: "Nama Siswa / Mahasiswa", placeholder: "Rizky Pratama Sudrajat" },
      { key: "schoolCampusName", label: "Nama Sekolah / Universitas", placeholder: "Institut Teknologi Bandung (ITB)" },
      { key: "studyProgram", label: "Fakultas / Program Studi", placeholder: "Fakultas Teknik Pertanian" },
      { key: "scholarshipType", label: "Program Beasiswa yang Diajukan", placeholder: "KIP Kuliah Merdeka / Beasiswa Pemkab" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Siswa/Mahasiswa tersebut di atas adalah benar anak kandung dari warga berpenghasilan rendah di desa kami dan layak menerima bantuan beasiswa pendidikan.",
    closingText: "Surat keterangan ini diterbitkan sebagai kelengkapan administrasi pengajuan beasiswa pendidikan."
  },
  {
    id: "SKTM_BANSOS",
    code: "400/SKTM-SOS",
    name: "Surat Keterangan Tidak Mampu (SKTM) untuk Pengajuan Bantuan Sosial (PKH, BPNT, KIP)",
    category: "Sosial & Kesejahteraan",
    description: "Keterangan keluarga ekonomi lemah untuk usulan masuk Data Terpadu Kesejahteraan Sosial (DTKS) dan program bansos PKH / Sembako / BLT.",
    fields: [
      { key: "headFamilyName", label: "Nama Kepala Rumah Tangga", placeholder: "Bambang Sudrajat" },
      { key: "dependentsCount", label: "Jumlah Anggota Keluarga", placeholder: "5 (Lima) Jiwa" },
      { key: "houseCondition", label: "Kondisi Rumah & Ekonomi", placeholder: "Lantai Semen, Dinding Semi Permanen, Penghasilan Buruh Harian Lepas" },
      { key: "proposedProgram", label: "Usulan Program Bansos", placeholder: "Usulan DTKS / PKH / Bantuan Sembako Pangan" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa:",
    bodyParagraph: "Keluarga tersebut di atas adalah benar warga berpenghasilan tidak tetap yang memenuhi kriteria sosial ekonomi untuk diusulkan menerima bantuan sosial pemerintah.",
    closingText: "Demikian surat keterangan ini kami buat untuk digunakan dalam verifikasi dan validasi data terpadu kesejahteraan sosial."
  },
  {
    id: "SKU",
    code: "500/SKU",
    name: "Surat Keterangan Usaha (SKU) / UMKM",
    category: "Perekonomian & Usaha",
    description: "Surat keterangan resmi kepemilikan usaha aktif warga untuk pengajuan kredit KUR, pembukaan rekening usaha di Bank, atau legalitas UMKM.",
    fields: [
      { key: "businessName", label: "Nama Usaha / Toko", placeholder: "Warung Kopi & Makanan Sunda Rasa Raos" },
      { key: "businessType", label: "Jenis / Bidang Usaha", placeholder: "Kuliner & Warung Kopi" },
      { key: "businessAddress", label: "Alamat Lokasi Usaha", placeholder: "Jl. Raya Desa Sukamaju No. 45 RT 02 RW 03" },
      { key: "businessDuration", label: "Lama Usaha Berdiri", placeholder: "Sejak Tahun 2019 (± 5 Tahun)" },
      { key: "purpose", label: "Keperluan Pengajuan", placeholder: "Persyaratan Pengajuan KUR Bank BRI" }
    ],
    openingText: "Yang bertanda tangan di bawah ini Kepala Desa Sukamaju Mandiri menerangkan dengan sebenarnya bahwa:",
    bodyParagraph: "Nama tersebut di atas adalah benar warga penduduk Desa Sukamaju Mandiri yang memiliki dan menjalankan kegiatan usaha aktif di wilayah kami sebagai berikut:",
    closingText: "Demikian Surat Keterangan Usaha ini kami buat dengan sebenarnya agar dapat dipergunakan sebagai persyaratan pengajuan permodalan / perbankan sebagaimana mestinya."
  },
  {
    id: "SK_PENGHASILAN",
    code: "510/SK-PENG",
    name: "Surat Keterangan Penghasilan / Pendapatan Tidak Tetap",
    category: "Perekonomian & Usaha",
    description: "Keterangan estimasi rata-rata penghasilan per bulan bagi pekerja sektor informal, wiraswasta, petani, atau buruh harian lepas.",
    fields: [
      { key: "jobTitle", label: "Profesi / Pekerjaan Utama", placeholder: "Petani Sayuran & Buruh Tani Harian" },
      { key: "monthlyIncome", label: "Rata-rata Penghasilan Bersih / Bulan", placeholder: "Rp 1.800.000,- (Satu Juta Delapan Ratus Ribu Rupiah)" },
      { key: "dependentsNumber", label: "Jumlah Tanggungan Keluarga", placeholder: "3 (Tiga) Orang" },
      { key: "incomePurpose", label: "Keperluan Surat", placeholder: "Persyaratan Pengajuan KPR Rumah Subsidi / Beasiswa Anak" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa:",
    bodyParagraph: "Berdasarkan keterangan yang bersangkutan dan catatan di desa, yang bersangkutan bekerja di sektor informal dengan rata-rata penghasilan sebagaimana tercantum di atas.",
    closingText: "Demikian surat keterangan penghasilan ini diberikan untuk dipergunakan sebagaimana mestinya."
  },
  {
    id: "SK_TANGGUNGAN",
    code: "400/SK-TG",
    name: "Surat Keterangan Tanggungan Keluarga",
    category: "Sosial & Kesejahteraan",
    description: "Keterangan rincian jumlah anggota keluarga yang menjadi beban nafkah hidup kepala keluarga (anak sekolah, lansia, orang tua).",
    fields: [
      { key: "totalDependents", label: "Jumlah Tanggungan (Jiwa)", placeholder: "4 (Empat) Orang Tanggungan" },
      { key: "dependentsList", label: "Rincian Nama & Status Tanggungan", placeholder: "1. Istri (IRT), 2. Anak 1 (Kuliah), 3. Anak 2 (SMA), 4. Orang Tua (Lansia)" },
      { key: "tanggunganPurpose", label: "Keperluan Surat", placeholder: "Keringanan Biaya Uang Kuliah Tunggal (UKT) / Pajak Penghasilan (PTKP)" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Nama tersebut di atas memiliki tanggungan keluarga yang sah dan menjadi beban nafkah sepenuhnya dalam satu susunan keluarga.",
    closingText: "Surat keterangan tanggungan keluarga ini dibuat dengan sebenarnya untuk digunakan sesuai keperluannya."
  },
  {
    id: "SK_BELUM_RUMAH",
    code: "640/SK-BR",
    name: "Surat Keterangan Belum Memiliki Rumah",
    category: "Sosial & Kesejahteraan",
    description: "Keterangan bahwa pemohon belum memiliki aset tempat tinggal/rumah pribadi untuk persyaratan pengajuan KPR Bersubsidi (FLPP).",
    fields: [
      { key: "currentLivingStatus", label: "Status Tempat Tinggal Saat Ini", placeholder: "Menumpang di Rumah Orang Tua / Mengontrak Rumah Warga" },
      { key: "kprDeveloper", label: "Tujuan Pengajuan KPR / Bank", placeholder: "Pengajuan KPR FLPP Rumah Bersubsidi Bank BTN" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri dengan ini menerangkan:",
    bodyParagraph: "Bahwa nama tersebut di atas hingga saat surat ini dikeluarkan BENAR BELUM MEMILIKI RUMAH TINGGAL PRIBADI di wilayah Desa Sukamaju Mandiri maupun di tempat lain.",
    closingText: "Surat keterangan ini dibuat sebagai persyaratan pengajuan bantuan kepemilikan perumahan bersubsidi dari pemerintah."
  },

  // =========================================================================
  // 5. PERTANAHAN, PROPERTI & WARIS
  // =========================================================================
  {
    id: "SK_RIWAYAT_TANAH",
    code: "593/SK-RT",
    name: "Surat Keterangan Riwayat Kepemilikan Tanah",
    category: "Pertanahan & Properti",
    description: "Keterangan runtutan sejarah kepemilikan dan peralihan hak sebidang tanah adat/girik/letter C sebelum diajukan sertifikasi PTSL ke BPN.",
    fields: [
      { key: "persilKohir", label: "Nomor Persil / Kohir / Letter C", placeholder: "Persil No. 32 Blok Pasirjati Kohir No. C.412" },
      { key: "landArea", label: "Luas Bidang Tanah (m²)", placeholder: "± 850 m² (Delapan Ratus Lima Puluh Meter Persegi)" },
      { key: "landHistory", label: "Riwayat Perolehan Hak", placeholder: "Berasal dari warisan Alm. H. Sanusi sejak tahun 1995 tanpa ada sengketa" },
      { key: "landBorders", label: "Batas-Batas Bidang Tanah", placeholder: "Utara: Jalan Desa | Timur: Bpk. Rohim | Selatan: Saluran Air | Barat: Bpk. Maman" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Berdasarkan Buku Letter C Desa dan kesaksian para tetangga batas, riwayat kepemilikan tanah tersebut adalah benar sebagaimana terurai di atas.",
    closingText: "Surat keterangan riwayat tanah ini dibuat sebagai kelengkapan permohonan sertifikat hak milik di Kantor Pertanahan (BPN)."
  },
  {
    id: "SK_TANAH_TIDAK_SENGKETA",
    code: "593/SK-TTS",
    name: "Surat Keterangan Tanah Tidak Sengketa",
    category: "Pertanahan & Properti",
    description: "Pernyataan resmi pemerintah desa bahwa sebidang tanah tidak sedang digugat, disita, atau menjadi objek sengketa dengan pihak lain.",
    fields: [
      { key: "landLocation", label: "Letak & Nomor Objek Tanah", placeholder: "Dusun Sukarame Persil No. 18 Kohir No. 205" },
      { key: "landArea", label: "Luas Tanah", placeholder: "± 1.200 m²" },
      { key: "ownerName", label: "Nama Pemilik / Pemegang Hak", placeholder: "Bambang Sudrajat" },
      { key: "landBorders", label: "Batas Tanah (U, T, S, B)", placeholder: "Utara: Bpk. Yayat | Timur: Jalan | Selatan: Bpk. Ujang | Barat: Sungai" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa sebidang tanah milik:",
    bodyParagraph: "Hingga saat surat ini dikeluarkan TIDAK PERNAH MENJADI AGUNAN / JAMINAN BANK secara ilegal, TIDAK DALAM KEADAAN SENGKETA / PERKARA, dan TIDAK DALAM SITA JAMINAN pihak manapun.",
    closingText: "Demikian surat keterangan tanah tidak sengketa ini dibuat dengan sebenar-benarnya untuk dijadikan bukti hukum."
  },
  {
    id: "SK_SPORADIK",
    code: "593/SPORADIK",
    name: "Surat Keterangan Penguasaan Fisik Bidang Tanah (Sporadik)",
    category: "Pertanahan & Properti",
    description: "Surat pernyataan penguasaan fisik tanah secara nyata dan terus menerus dengan itikad baik untuk pendaftaran tanah pertama kali ke BPN.",
    fields: [
      { key: "landLocation", label: "Letak Tanah (Blok / RT / RW)", placeholder: "Blok Pasirjati RT 03 RW 04" },
      { key: "landArea", label: "Luas Tanah (m²)", placeholder: "650 m²" },
      { key: "possessionSince", label: "Dikuasai Secara Fisik Sejak", placeholder: "Sejak Tahun 2002 Secara Terus-Menerus (± 24 Tahun)" },
      { key: "landUsage", label: "Penggunaan Tanah Saat Ini", placeholder: "Pekarangan & Rumah Tinggal Keluarga" },
      { key: "witnessList", label: "Saksi Batas & Tokoh Tetangga", placeholder: "1. Bpk. Hendra (Tetangga Utara), 2. Bpk. Supriatna (Tetangga Barat)" }
    ],
    openingText: "Yang bertanda tangan di bawah ini menerangkan penguasaan fisik tanah:",
    bodyParagraph: "Bahwa bidang tanah tersebut benar-benar dikuasai secara fisik dengan itikad baik secara terus menerus oleh pemohon tanpa adanya keberatan dari pihak manapun.",
    closingText: "Surat pernyataan sporadik ini dibuat dengan penuh tanggung jawab demi hukum untuk keperluan penerbitan sertifikat hak atas tanah."
  },
  {
    id: "SK_JUAL_BELI",
    code: "593/SK-JB",
    name: "Surat Pengantar Jual Beli / Hibah / Waris Tanah",
    category: "Pertanahan & Properti",
    description: "Surat keterangan kesepakatan transaksi peralihan hak tanah/bangunan di hadapan saksi dan diketahui Pemerintah Desa.",
    fields: [
      { key: "sellerName", label: "Nama Pihak I (Penjual / Pemberi)", placeholder: "Ujang Suherman" },
      { key: "sellerNik", label: "NIK Pihak I", placeholder: "3204151505750001" },
      { key: "sellerAddress", label: "Alamat Pihak I", placeholder: "Dusun Sukarame RT 03 RW 02" },
      { key: "buyerName", label: "Nama Pihak II (Pembeli / Penerima)", placeholder: "Bambang Sudrajat" },
      { key: "buyerNik", label: "NIK Pihak II", placeholder: "3204151208850002" },
      { key: "buyerAddress", label: "Alamat Pihak II", placeholder: "Kp. Pasir Salam RT 02 RW 03" },
      { key: "itemType", label: "Objek Transaksi", placeholder: "Sebidang Tanah Kebun Kopi & Tanaman Produktif" },
      { key: "itemLocation", label: "Lokasi / Nomor Persil / Kohir", placeholder: "Blok Sukarame Persil No. 24 Kohir No. 118" },
      { key: "itemSize", label: "Luas Objek Transaksi", placeholder: "Luas ± 650 m² (Enam Ratus Lima Puluh Meter Persegi)" },
      { key: "itemBorders", label: "Batas-Batas Objek", placeholder: "Utara: Bpk. H. Supriatna | Timur: Jalan | Selatan: Saluran | Barat: Bpk. Hendra" },
      { key: "transactionPrice", label: "Nilai Kesepakatan Transaksi (Rp)", placeholder: "Rp 150.000.000,- (Seratus Lima Puluh Juta Rupiah)" },
      { key: "witnessNames", label: "Nama Saksi-Saksi", placeholder: "1. Drs. Subagja (Ketua RW), 2. Ahmad Fauzi (Tokoh Warga)" }
    ],
    openingText: "Yang bertanda tangan di bawah ini menerangkan bahwa telah terjadi kesepakatan peralihan hak yang sah antara para pihak:",
    bodyParagraph: "PIHAK I telah menyerahkan dan melepaskan hak kepemilikannya atas objek tersebut kepada PIHAK II dengan kesepakatan yang telah diselesaikan lunas tanpa paksaan.",
    closingText: "Surat keterangan ini dibuat dalam keadaan sadar dan sehat jasmani rohani, serta diketahui oleh Pemerintah Desa untuk dijadikan pegangan hukum."
  },
  {
    id: "SK_AHLI_WARIS",
    code: "470/SK-AW",
    name: "Surat Keterangan Ahli Waris / Penetapan Waris",
    category: "Pertanahan & Properti",
    description: "Surat keterangan daftar sah para ahli waris dari almarhum/almarhumah untuk pengurusan peralihan hak waris tanah, tabungan bank, atau kendaraan.",
    fields: [
      { key: "deceasedName", label: "Nama Pewaris (Almarhum/Almarhumah)", placeholder: "Alm. Bapak H. Sanusi bin Karta" },
      { key: "deathDate", label: "Tanggal Wafat Pewaris", placeholder: "14 Mei 2024 di Desa Sukamaju Mandiri" },
      { key: "heirsList", label: "Daftar Nama Seluruh Ahli Waris", placeholder: "1. Hj. Maimunah (Istri), 2. Bambang Sudrajat (Anak Kandung), 3. Siti Aisyah (Anak Kandung)" },
      { key: "heritageObject", label: "Objek Harta Peninggalan", placeholder: "Sebidang Tanah Hak Milik & Rekening Bank BRI atas nama Almarhum" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Nama-nama yang tercantum di atas adalah benar-benar seluruh ahli waris yang sah dan berhak menurut hukum dari Almarhum/Almarhumah tersebut.",
    closingText: "Surat keterangan ahli waris ini dibuat dengan sebenarnya untuk dapat dipergunakan dalam proses administrasi balik nama waris."
  },
  {
    id: "SK_KUASA_WARIS",
    code: "470/SK-KW",
    name: "Surat Keterangan Kuasa Waris",
    category: "Pertanahan & Properti",
    description: "Surat pelimpahan kuasa penuh dari seluruh ahli waris kepada salah satu perwakilan ahli waris untuk mengurus dokumen atau transaksi.",
    fields: [
      { key: "grantorNames", label: "Nama-Nama Pemberi Kuasa (Seluruh Ahli Waris)", placeholder: "1. Hj. Maimunah, 2. Siti Aisyah" },
      { key: "attorneyName", label: "Nama Penerima Kuasa (Perwakilan Waris)", placeholder: "Bambang Sudrajat (Anak Tertua)" },
      { key: "attorneyNik", label: "NIK Penerima Kuasa", placeholder: "3204151208850002" },
      { key: "powerScope", label: "Hal yang Dikuasakan", placeholder: "Mengurus proses balik nama sertifikat tanah dan menandatangani akta jual beli di hadapan Notaris/PPAT" }
    ],
    openingText: "Kami para ahli waris dengan ini memberikan kuasa penuh kepada:",
    bodyParagraph: "Untuk mewakili seluruh ahli waris dalam mengurus, menandatangani, dan menyelesaikan urusan administrasi atas objek waris yang dimaksud.",
    closingText: "Surat kuasa waris ini dibuat secara sadar dan disahkan oleh Pemerintah Desa Sukamaju Mandiri."
  },
  {
    id: "SK_PBG_DESA",
    code: "640/SK-PBG",
    name: "Surat Keterangan Izin Mendirikan Bangunan (Persetujuan Bangunan Gedung / PBG Desa)",
    category: "Pertanahan & Properti",
    description: "Keterangan rekomendasi persetujuan lingkungan dan desa untuk pendirian bangunan gedung, renovasi rumah, atau ruko warga.",
    fields: [
      { key: "buildingType", label: "Jenis & Fungsi Bangunan", placeholder: "Rumah Tinggal 2 Lantai / Toko Ruko Sembako" },
      { key: "buildingSize", label: "Ukuran & Luas Bangunan", placeholder: "Luas Bangunan 120 m² di atas Lahan 200 m²" },
      { key: "buildingAddress", label: "Alamat Lokasi Pembangunan", placeholder: "Kp. Pasir Salam RT 02 RW 03 Desa Sukamaju" },
      { key: "neighborConsent", label: "Persetujuan Warga Tetangga Sekitar", placeholder: "Telah disetujui oleh seluruh tetangga batas kanan, kiri, depan, dan belakang" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri dengan ini menerangkan:",
    bodyParagraph: "Bahwa rencana pendirian bangunan tersebut di atas tidak melanggar tata ruang desa, telah mendapatkan izin persetujuan tetangga lingkungan sekitar, dan layak direkomendasikan.",
    closingText: "Surat keterangan rekomendasi ini diterbitkan untuk melengkapi permohonan Persetujuan Bangunan Gedung (PBG) di Dinas PUPR Kabupaten."
  },

  // =========================================================================
  // 6. KEAMANAN, KETERTIBAN & KEPOLISIAN
  // =========================================================================
  {
    id: "SKCK",
    code: "300/SKCK",
    name: "Surat Pengantar Pembuatan Catatan Kepolisian (SKCK)",
    category: "Keamanan & Kepolisian",
    description: "Surat pengantar permohonan penerbitan Surat Keterangan Catatan Kepolisian ke Polsek / Polres setempat.",
    fields: [
      { key: "skckPurpose", label: "Keperluan Pengajuan SKCK", placeholder: "Persyaratan Melamar Pekerjaan di BUMN / Rekrutmen CPNS / BUMN" }
    ],
    openingText: "Yang bertanda tangan di bawah ini Kepala Desa Sukamaju Mandiri menerangkan bahwa:",
    bodyParagraph: "Orang tersebut di atas selama bertempat tinggal di desa kami memiliki kelakuan baik, tidak sedang menjalani proses hukum pidana, serta tidak pernah terlibat organisasi terlarang.",
    closingText: "Surat pengantar ini diterbitkan sebagai pengantar pembuatan SKCK di Polsek / Polres setempat."
  },
  {
    id: "SK_BERKELAKUAN_BAIK",
    code: "300/SK-KB",
    name: "Surat Keterangan Berkelakuan Baik dari Kepala Desa",
    category: "Keamanan & Kepolisian",
    description: "Keterangan resmi reputasi akhlak dan rekam jejak moral baik warga di lingkungan kemasyarakatan desa.",
    fields: [
      { key: "goodConductPurpose", label: "Tujuan Penggunaan Surat", placeholder: "Persyaratan Pendaftaran Calon Kepala Dusun / Anggota BPD / Beasiswa Pendidikan" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Nama tersebut di atas dalam pergaulan hidup bermasyarakat di lingkungan desa kami dikenal sebagai pribadi yang BERKELAKUAN BAIK, jujur, sopan, dan taat pada norma hukum serta adat istiadat.",
    closingText: "Demikian surat keterangan berkelakuan baik ini diberikan untuk digunakan sebagaimana mestinya."
  },
  {
    id: "SK_KEHILANGAN",
    code: "300/SK-HILANG",
    name: "Surat Keterangan Kehilangan dari Desa",
    category: "Keamanan & Kepolisian",
    description: "Keterangan pengantar laporan kehilangan barang berharga, dokumen sertifikat, buku tabungan, ijazah, atau kuitansi untuk diteruskan ke Polsek.",
    fields: [
      { key: "lostItemName", label: "Nama Barang / Dokumen yang Hilang", placeholder: "1 (Satu) Buah Buku Tabungan Bank BRI No. Rekening: 1234-01-004321-50-8" },
      { key: "lossTimePlace", label: "Waktu & Perkiraan Lokasi Kehilangan", placeholder: "Rabu, 12 Agustus 2026 sekitar Pukul 10.00 WIB di Perjalanan Pasar Desa" },
      { key: "lossChronology", label: "Kronologi Singkat", placeholder: "Tercecer dari dalam saku tas dan telah dicari di sekitar lokasi namun tidak ditemukan" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa warga kami telah melapor kehilangan:",
    bodyParagraph: "Berdasarkan laporan pengaduan pemohon, barang/dokumen tersebut benar telah hilang dan surat ini dibuat sebagai pengantar laporan kehilangan ke Kepolisian.",
    closingText: "Surat pengantar kehilangan ini dibuat untuk kelengkapan pengurusan surat tanda kehilangan di Polsek terdekat."
  },
  {
    id: "SURAT_IZIN_KERAMAIAN",
    code: "300/SI-KERAMAIAN",
    name: "Surat Izin / Pemberitahuan Keramaian dan Hiburan Warga",
    category: "Keamanan & Kepolisian",
    description: "Pemberitahuan dan izin penyelenggaraan acara hajatan, resepsi pernikahan, panggung musik, atau pentas seni warga.",
    fields: [
      { key: "eventTheme", label: "Nama Acara / Kegiatan", placeholder: "Resepsi Pernikahan & Hiburan Musik Seni Sunda Tradisional" },
      { key: "eventTime", label: "Hari, Tanggal & Pukul Acara", placeholder: "Minggu, 30 Agustus 2026 Pukul 09.00 s.d. 22.00 WIB" },
      { key: "eventLocation", label: "Tempat / Lokasi Acara", placeholder: "Halaman Rumah Bpk. Bambang Sudrajat Kp. Pasir Salam RT 02 RW 03" },
      { key: "eventGuestsEstimate", label: "Perkiraan Jumlah Tamu / Undangan", placeholder: "± 300 Orang Tamu Undangan" },
      { key: "securityCommitment", label: "Komitmen Keamanan", placeholder: "Menjaga ketertiban, tidak menyediakan minuman keras, dan mematuhi batas waktu izin" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri dengan ini memberikan izin / rekomendasi keramaian kepada:",
    bodyParagraph: "Untuk menyelenggarakan kegiatan keramaian warga dengan ketentuan wajib menjaga keamanan, ketertiban umum, dan berkoordinasi dengan Bhabinkamtibmas/Babinsa.",
    closingText: "Surat izin keramaian ini diterbitkan sebagai rujukan penerbitan izin keramaian di Polsek Harapan Makmur."
  },
  {
    id: "SURAT_REKOM_FASUM",
    code: "005/REK-FASUM",
    name: "Surat Rekomendasi Penggunaan Lapangan / Balai / Fasilitas Umum Desa",
    category: "Keamanan & Kepolisian",
    description: "Rekomendasi pinjam pakai lapangan olahraga, aula balai desa, posyandu, atau fasilitas umum desa untuk kegiatan kemasyarakatan.",
    fields: [
      { key: "facilityName", label: "Nama Fasilitas Umum yang Dipinjam", placeholder: "Lapangan Sepakbola Gelora Desa Sukamaju / Aula Balai Desa" },
      { key: "usageDate", label: "Tanggal & Durasi Penggunaan", placeholder: "Sabtu - Minggu, 22-23 Agustus 2026 Pukul 08.00 s.d. 17.00 WIB" },
      { key: "activityPurpose", label: "Tujuan Kegiatan", placeholder: "Turnamen Sepakbola Antar RW dalam rangka Peringatan HUT Kemerdekaan RI" },
      { key: "picName", label: "Nama Penanggung Jawab Kegiatan", placeholder: "Ketua Karang Taruna (Ahmad Fauzi)" }
    ],
    openingText: "Pemerintah Desa Sukamaju Mandiri memberikan rekomendasi izin pemakaian fasilitas desa kepada:",
    bodyParagraph: "Dengan ketentuan pihak peminjam wajib menjaga kebersihan, memelihara fasilitas aset desa, dan mengembalikan dalam keadaan rapi dan baik pasca acara.",
    closingText: "Demikian surat rekomendasi penggunaan fasilitas umum desa ini diterbitkan untuk ditaati."
  },
  {
    id: "SURAT_TUTUP_JALAN",
    code: "551/SI-JALAN",
    name: "Surat Izin Tutup Jalan Sementara untuk Acara Warga",
    category: "Keamanan & Kepolisian",
    description: "Izin pengalihan arus lalu lintas dan penutupan jalan lingkungan sementara waktu untuk tenda pernikahan atau kegiatan duka.",
    fields: [
      { key: "streetName", label: "Nama Ruas Jalan yang Ditutup", placeholder: "Jl. Kampung Pasir Salam RT 02 RW 03" },
      { key: "closureDuration", label: "Waktu & Durasi Penutupan", placeholder: "Sabtu, 29 Agustus 2026 Pukul 06.00 s.d. Minggu, 30 Agustus 2026 Pukul 23.00 WIB" },
      { key: "alternateRoute", label: "Jalur Alternatif / Pengalihan Arus", placeholder: "Dialihkan melalui Gang Murai & Jalan Poros Dusun Sukarame" },
      { key: "eventReason", label: "Alasan Penutupan Jalan", placeholder: "Pemasangan Tenda Resepsi Pernikahan Warga" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri memberikan izin penutupan jalan sementara kepada:",
    bodyParagraph: "Dengan kewajiban memasang rambu petunjuk jalan alternatif, menugaskan petugas pengatur lalu lintas dari pemuda setempat, dan tidak mengganggu akses darurat warga.",
    closingText: "Surat izin tutup jalan sementara ini diberikan untuk dipergunakan sesuai ketentuan."
  },
  {
    id: "SK_BEBAS_NARKOBA",
    code: "300/SK-BN",
    name: "Surat Keterangan Bersih Diri / Bebas Narkoba (Rekomendasi Lingkungan)",
    category: "Keamanan & Kepolisian",
    description: "Rekomendasi keterangan lingkungan bahwa warga tidak pernah terlibat tindak pidana peredaran/penyalahgunaan narkoba atau miras.",
    fields: [
      { key: "cleanPurpose", label: "Keperluan Pengajuan", placeholder: "Persyaratan Pendaftaran Calon Aparatur Sipil Negara / Beasiswa Luar Negeri" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan dengan sesungguhnya bahwa:",
    bodyParagraph: "Nama tersebut di atas sepanjang pemantauan kami di lingkungan desa tidak pernah terlibat penyalahgunaan narkotika, psikotropika, zat adiktif, maupun minuman keras.",
    closingText: "Surat rekomendasi lingkungan ini dibuat sebagai pendukung surat bebas narkoba dari rumah sakit/laboratorium resmi."
  },

  // =========================================================================
  // 7. PEKERJAAN, PERIZINAN, FASILITAS & REKOMENDASI
  // =========================================================================
  {
    id: "SK_RIWAYAT_HIDUP",
    code: "470/SK-RH",
    name: "Surat Keterangan Riwayat Hidup / Rekomendasi Lamaran Pekerjaan",
    category: "Ketenagakerjaan & Rekomendasi",
    description: "Surat rekomendasi resmi kepala desa untuk warga berprestasi atau pencari kerja yang melamar pekerjaan ke instansi/perusahaan.",
    fields: [
      { key: "jobTargetCompany", label: "Nama Perusahaan / Instansi Tujuan", placeholder: "PT. Industri Nusantara Abadi / Dinas Kesehatan" },
      { key: "appliedPosition", label: "Posisi yang Dilamar", placeholder: "Staff Administrasi & Keuangan" },
      { key: "recommendationNotes", label: "Catatan Prestasi & Karakter", placeholder: "Memiliki integritas tinggi, rajin, disiplin, dan aktif dalam kegiatan kemasyarakatan desa" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri dengan ini memberikan rekomendasi kepada:",
    bodyParagraph: "Bahwa nama tersebut di atas adalah benar warga kami yang memiliki kepribadian bertanggung jawab, berintegritas, dan kami rekomendasikan untuk melamar pekerjaan pada posisi tersebut.",
    closingText: "Demikian surat rekomendasi ini kami buat dengan sebenarnya agar dapat menjadi bahan pertimbangan."
  },
  {
    id: "SURAT_IZIN_PMI",
    code: "560/SI-PMI",
    name: "Surat Izin Suami/Istri/Orang Tua untuk Bekerja ke Luar Negeri (PMI / TKI)",
    category: "Ketenagakerjaan & Rekomendasi",
    description: "Surat persetujuan resmi dan izin dari suami/istri/orang tua bagi calon Pekerja Migran Indonesia (PMI) yang berangkat ke luar negeri.",
    fields: [
      { key: "grantorName", label: "Nama Pemberi Izin (Orang Tua / Pasangan)", placeholder: "Bambang Sudrajat" },
      { key: "pmiCandidateName", label: "Nama Calon Pekerja Migran (PMI)", placeholder: "Iis Aisyah" },
      { key: "relationshipType", label: "Hubungan Pemberi Izin", placeholder: "Suami Sah / Orang Tua Kandung" },
      { key: "destinationCountry", label: "Negara Tujuan Penempatan", placeholder: "Taiwan / Jepang / Korea Selatan" },
      { key: "recruitmentAgency", label: "Nama Lembaga Penyalur (P3MI / BP2MI)", placeholder: "PT. Sukses Mandiri Tenaga Kerja Global" }
    ],
    openingText: "Yang bertanda tangan di bawah ini menerangkan:",
    bodyParagraph: "Dengan ini menyatakan memberikan IZIN DAN PERSETUJUAN SEPENUHNYA kepada istri/anak/suami kami untuk bekerja ke luar negeri secara resmi melalui jalur penempatan yang sah.",
    closingText: "Surat izin ini dibuat dengan penuh kesadaran dan disahkan oleh Kepala Desa Sukamaju Mandiri."
  },
  {
    id: "SURAT_JALAN",
    code: "500/SK-JLN",
    name: "Surat Keterangan Bepergian / Jalan",
    category: "Kependudukan & KTP/KK",
    description: "Surat keterangan perjalanan bagi warga yang bepergian dalam rangka tugas keluarga, dagang antarpulau, atau perjalanan dinas sementara.",
    fields: [
      { key: "destinationCity", label: "Kota / Daerah Tujuan Perjalanan", placeholder: "Surabaya, Jawa Timur / Denpasar, Bali" },
      { key: "tripPurpose", label: "Tujuan Bepergian", placeholder: "Urusan Usaha Dagang / Menjenguk Keluarga Sakit" },
      { key: "tripDuration", label: "Lama Perjalanan / Tanggal Berangkat", placeholder: "Berangkat 25 Agustus 2026 s.d. 10 September 2026 (± 15 Hari)" },
      { key: "carriedGoods", label: "Barang Bawaan Khusus (Jika Ada)", placeholder: "Komoditas Kerajinan Tangan UMKM Desa" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa:",
    bodyParagraph: "Orang tersebut di atas adalah benar warga kami yang bermaksud melakukan perjalanan ke daerah tujuan sebagaimana tercantum di atas.",
    closingText: "Surat keterangan jalan ini diberikan kepada yang bersangkutan agar diperlakukan sebagaimana mestinya."
  },
  {
    id: "SP_PASPOR_HAJI",
    code: "470/SP-PASPOR",
    name: "Surat Pengantar Pembuatan Paspor / Ibadah Umrah & Haji",
    category: "Kependudukan & KTP/KK",
    description: "Pengantar permohonan paspor RI di Kantor Imigrasi untuk keperluan ibadah Umrah, Haji, atau perjalanan wisata luar negeri.",
    fields: [
      { key: "travelPurpose", label: "Tujuan Pembuatan Paspor", placeholder: "Ibadah Umrah ke Tanah Suci / Ibadah Haji Khusus" },
      { key: "travelAgency", label: "Nama Travel Umrah / Haji (Jika Ada)", placeholder: "PT. Al-Mabroor Travel Haji & Umrah" },
      { key: "immigrationOffice", label: "Kantor Imigrasi Tujuan", placeholder: "Kantor Imigrasi Kelas I TPI Bandung" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri dengan ini menerangkan:",
    bodyParagraph: "Bahwa nama tersebut di atas adalah benar warga penduduk Desa Sukamaju Mandiri yang bermaksud mengajukan pembuatan Paspor Republik Indonesia untuk keperluan perjalanan ibadah.",
    closingText: "Demikian surat pengantar paspor ini dibuat untuk dipergunakan sebagai persyaratan di Kantor Imigrasi."
  },
  {
    id: "SK_TERNAK",
    code: "524/SK-TRK",
    name: "Surat Keterangan Kepemilikan Hewan Ternak / Pengangkutan Ternak",
    category: "Perekonomian & Usaha",
    description: "Keterangan kepemilikan hewan ternak sapi/kambing/domba dan izin pengangkutan/lalu lintas hewan bebas penyakit menular (PMK).",
    fields: [
      { key: "livestockType", label: "Jenis & Jumlah Hewan Ternak", placeholder: "5 (Lima) Ekor Sapi Potong / 10 Ekor Domba" },
      { key: "livestockCiri", label: "Ciri-Ciri Hewan / No. Eartag", placeholder: "Warna Coklat Putih, Bertanduk, Eartag No. 3204-0012 s.d. 0016" },
      { key: "destinationMarket", label: "Tujuan Pengangkutan / Penjualan", placeholder: "Pasar Hewan Tanjungsari / Pengiriman ke Jakarta" },
      { key: "healthStatus", label: "Status Kesehatan Hewan", placeholder: "Sehat, Bebas Gejala Penyakit Mulut dan Kuku (PMK)" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri menerangkan bahwa hewan ternak milik:",
    bodyParagraph: "Adalah benar hasil peternakan sendiri yang sah, dalam kondisi sehat, dan tidak berasal dari tindak kejahatan pencurian hewan.",
    closingText: "Surat keterangan kepemilikan ternak ini diterbitkan sebagai surat jalan lalu lintas ternak yang sah."
  },
  {
    id: "SURAT_REKOM_BBM",
    code: "510/REK-BBM",
    name: "Surat Rekomendasi Pengambilan Solar / BBM Bersubsidi untuk Petani dan Nelayan",
    category: "Perekonomian & Usaha",
    description: "Surat rekomendasi pembelian solar/pertalite bersubsidi di SPBU menggunakan jeriken untuk operasional traktor, pompa air irigasi, atau mesin giling padi.",
    fields: [
      { key: "machineryType", label: "Jenis Mesin / Alat Pertanian", placeholder: "1 Unit Traktor Tangan (Hand Tractor) & 1 Unit Mesin Pompa Air Irigasi 6.5 PK" },
      { key: "fuelTypeVolume", label: "Jenis BBM & Kuota Alokasi", placeholder: "Solar Bersubsidi (Biosolar) - 30 Liter / Minggu" },
      { key: "farmingLocation", label: "Lokasi Lahan Pertanian", placeholder: "Blok Sawah Pasirjati Seluas ± 1.5 Hektar" },
      { key: "targetSpbu", label: "Nomor SPBU Pembelian", placeholder: "SPBU No. 34.403.12 Harapan Makmur" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri memberikan rekomendasi pembelian BBM bersubsidi kepada:",
    bodyParagraph: "BBM tersebut benar-benar dipergunakan semata-mata untuk operasional mesin pertanian milik petani/kelompok tani dan DILARANG KERAS diperjualbelikan kembali.",
    closingText: "Surat rekomendasi ini berlaku selama masa tanam dan panen untuk ditunjukkan kepada petugas SPBU."
  },

  // =========================================================================
  // 8. KEDINASAN & PEMERINTAHAN DESA
  // =========================================================================
  {
    id: "SURAT_UNDANGAN",
    code: "005/UND-DESA",
    name: "Surat Undangan Resmi Musyawarah Desa / Rapat",
    category: "Pemerintahan & Kedinasan",
    description: "Surat undangan resmi rapat pleno, musyawarah rencana kerja pembangunan desa (Musrenbangdes), atau pertemuan kelembagaan ber-Kop Pemdes.",
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
    id: "SURAT_TUGAS",
    code: "090/ST-DESA",
    name: "Surat Perintah Tugas (SPT) Desa",
    category: "Pemerintahan & Kedinasan",
    description: "Surat penugasan resmi perangkat desa, ketua RW/RT, atau kader dalam rangka rapat koordinasi, pelatihan dinas, atau peninjauan lapangan.",
    fields: [
      { key: "assignedPerson", label: "Aparatur yang Ditugaskan", placeholder: "Ahmad Fauzi, S.Kom (Kasi Pelayanan)" },
      { key: "assignmentTask", label: "Uraian Tugas / Kegiatan", placeholder: "Mengikuti Bimbingan Teknis Sistem Informasi Desa di Kantor Camat" },
      { key: "assignmentDate", label: "Waktu & Tempat Pelaksanaan", placeholder: "Kamis, 25 Agustus 2026 di Aula Kecamatan Harapan Makmur" }
    ],
    openingText: "Kepala Desa Sukamaju Mandiri dengan ini MENUGASKAN kepada:",
    bodyParagraph: "Untuk melaksanakan tugas kedinasan sebagaimana tercantum di atas dengan penuh tanggung jawab dan melaporkan hasil pelaksanaannya kepada Kepala Desa.",
    closingText: "Surat perintah tugas ini diberikan agar dilaksanakan dengan sebaik-baiknya."  },
  {
    id: "SURAT_CUSTOM",
    code: "500/SK-KUS",
    name: "Surat Keterangan Kustom (Format Bebas & Fleksibel)",
    category: "Surat Kustom / Bebas",
    description: "Format surat resmi fleksibel ber-Kop Desa yang dapat diedit bebas mulai dari judul surat, nomor klasifikasi, paragraf pembuka, poin-poin keterangan, hingga penutupnya.",
    fields: [
      { key: "customTitle", label: "Judul / Nama Surat Resmi", placeholder: "SURAT KETERANGAN KHUSUS" },
      { key: "customPurpose", label: "Tujuan / Keperluan Surat", placeholder: "Persyaratan permohonan khusus..." }
    ],
    openingText: "Yang bertanda tangan di bawah ini Kepala Desa Sukamaju Mandiri, Kecamatan Harapan Makmur, Kabupaten Nusantara dengan ini menerangkan bahwa:",
    bodyParagraph: "Adalah benar yang bersangkutan merupakan warga penduduk desa kami dan surat keterangan ini diterbitkan guna keperluan sebagaimana tersebut di atas.",
    closingText: "Demikian surat keterangan ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya oleh pihak yang berkepentingan."
  }
];
