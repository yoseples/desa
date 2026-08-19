export const defaultThemeSettings = {
  // Styling & Theme
  primaryColor: "#059669",
  secondaryColor: "#0d9488",
  accentColor: "#f59e0b",
  colorMode: "light", // 'light', 'dark-slate', 'emerald-twilight'
  borderRadius: "12px", // '4px', '8px', '12px', '18px', '24px'
  shadowIntensity: "soft", // 'none', 'subtle', 'soft', 'elevated'

  // Layout
  containerWidth: "1200px", // '1140px', '1200px', '1280px', '1360px', '100%'
  navbarPosition: "sticky", // 'sticky', 'fixed', 'static'
  navbarHeight: "60px", // '54px', '60px', '66px', '72px'
  cardDensity: "comfortable", // 'compact', 'comfortable', 'spacious'

  // Typography
  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", // 'Plus Jakarta Sans', 'Inter', 'Outfit', 'Poppins', 'Roboto', 'Montserrat'
  baseFontSize: "16px", // '14px', '15px', '16px', '17px'
  headingWeight: "800", // '600', '700', '800', '900'
  letterSpacing: "-0.01em" // '0px', '-0.01em', '-0.02em', '0.02em'
};

export const initialVillageProfile = {
  name: "Desa Sukamaju Mandiri",
  tagline: "Maju Bersama Teknologi, Harmoni Bersama Tradisi Menuju Desa Berdaya & Sejahtera",
  subtitle: "Kecamatan Harapan Makmur, Kabupaten Nusantara",
  code: "32.04.15.2001",
  district: "Harapan Makmur",
  regency: "Kabupaten Nusantara",
  province: "Jawa Barat",
  logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80",
  favicon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23059669' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect width='16' height='20' x='4' y='2' rx='2' ry='2'/><path d='M9 22v-4h6v4'/><path d='M8 6h.01'/><path d='M16 6h.01'/><path d='M8 10h.01'/><path d='M16 10h.01'/><path d='M8 14h.01'/><path d='M16 14h.01'/><path d='M8 18h.01'/><path d='M16 18h.01'/></svg>",
  bannerImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
  officePhoto: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
  seo: {
    metaTitle: "Desa Sukamaju Mandiri - Portal Informasi & Layanan Digital Desa",
    metaDescription: "Portal Resmi Desa Sukamaju Mandiri. Layanan permohonan surat online 24 jam, cek resi, direktori UMKM warga, transparansi APBDes, dan pesona wisata desa.",
    metaKeywords: "desa pintar, smart village, sukamaju mandiri, surat online, apbdes, umkm desa, wisata desa, transparansi desa",
    author: "Pemerintah Desa Sukamaju Mandiri",
    ogTitle: "Portal Resmi Desa Sukamaju Mandiri",
    ogDescription: "Portal Informasi & Layanan Mandiri 24 Jam Desa Sukamaju Mandiri. Buat surat online, lacak resi, etalase UMKM, transparansi APBDes, dan informasi wisata desa.",
    ogImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
    ogType: "website"
  },
  theme: defaultThemeSettings,
  headOfVillage: {
    name: "H. Budi Santoso, S.AP",
    title: "Kepala Desa Sukamaju Mandiri",
    period: "2021 - 2027",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    welcomeSpeech: "Selamat datang di Portal Resmi Desa Pintar Sukamaju Mandiri. Platform digital ini dibangun sebagai wujud komitmen kami dalam mewujudkan keterbukaan informasi publik, kemudahan pelayanan administrasi mandiri bagi warga, serta etalase digital untuk mempromosikan potensi UMKM dan pesona wisata desa kita tercinta ke tingkat nasional maupun global."
  },
  stats: {
    population: 4850,
    malePopulation: 2460,
    femalePopulation: 2390,
    households: 1320,
    rtCount: 20,
    rwCount: 10,
    areaSize: "14.8 km²",
    umkmActive: 42,
    tourismSpots: 5
  },
  history: "Desa Sukamaju didirikan pada tahun 1968 berawal dari sebuah perkampungan asri di lereng perbukitan yang subur. Dengan semangat gotong royong yang diwariskan turun-temurun, desa ini terus bertransformasi. Pada tahun 2023, Desa Sukamaju resmi ditetapkan sebagai Desa Percontohan Digital (Smart Village) berkat keberhasilan integrasi layanan publik online, modernisasi pertanian, dan digitalisasi UMKM desa.",
  vision: "Terwujudnya Desa Sukamaju Mandiri yang Religius, Transparan, Cerdas Berbasis Digital, serta Sejahtera Melalui Penguatan Ekonomi Kreatif dan Pertanian Berkelanjutan pada Tahun 2027.",
  missions: [
    "Meningkatkan tata kelola pemerintahan desa yang bersih, transparan, dan akuntabel berbasis sistem digital terpadu.",
    "Memberikan pelayanan administrasi kependudukan yang cepat, mudah, dan bebas pungutan liar melalui layanan online 24 jam.",
    "Mengembangkan potensi ekonomi warga melalui digitalisasi UMKM, BUMDes, dan pemberdayaan agrowisata berbasis kearifan lokal.",
    "Meningkatkan kualitas sumber daya manusia melalui literasi digital, pendidikan vokasi desa, dan jaminan kesehatan keluarga.",
    "Menjaga kelestarian lingkungan hidup, keasrian alam desa, dan memperkokoh kerukunan sosial berbudaya."
  ],
  apparatus: [
    { id: "app-1", category: "Pemerintah Desa", name: "H. Budi Santoso, S.AP", position: "Kepala Desa", nip: "19780415 200501 1 003", phone: "081234567890", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80", area: "Seluruh Wilayah Desa" },
    { id: "app-2", category: "Pemerintah Desa", name: "Rahmat Hidayat, S.IP", position: "Sekretaris Desa (Sekdes)", nip: "19830820 200902 1 002", phone: "081398765432", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", area: "Sekretariat Desa" },
    { id: "app-3", category: "Pemerintah Desa", name: "Siti Rahmawati, S.E", position: "Kaur Keuangan / Bendahara Desa", nip: "19900312 201503 2 004", phone: "082145678910", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80", area: "Bidang Anggaran & Keuangan" },
    { id: "app-4", category: "Pemerintah Desa", name: "Ahmad Fauzi, S.Kom", position: "Kasi Pelayanan & TI Desa", nip: "19940510 201901 1 001", phone: "085211223344", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", area: "Loket Pelayanan Mandiri Online" },
    { id: "app-5", category: "Pemerintah Desa", name: "Endang Supriatna, S.T", position: "Kaur Perencanaan & Pembangunan", nip: "19871104 201402 1 005", phone: "087899001122", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", area: "Bidang Infrastruktur & Fisik" },
    { id: "app-6", category: "Pemerintah Desa", name: "Dewi Lestari, S.Sos", position: "Kasi Kesejahteraan Rakyat (Kesra)", nip: "19920718 201803 2 002", phone: "089677889900", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80", area: "Bidang Bansos & Kesehatan" },
    { id: "app-7", category: "Pemerintah Desa", name: "Kapten (Purn) Sutrisno, S.H", position: "Kasi Pemerintahan & Ketentraman", nip: "19800214 200801 1 004", phone: "081255667788", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80", area: "Trantibum & Perlindungan Masyarakat" },
    { id: "app-8", category: "Pemerintah Desa", name: "Fitri Handayani, A.Md", position: "Kaur Tata Usaha & Umum", nip: "19961125 202102 2 003", phone: "085388990011", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80", area: "Kearsipan & Rumah Tangga Desa" },

    // KEPALA DUSUN
    { id: "kadus-1", category: "Kepala Dusun (Kadus)", name: "Bpk. Deden Koswara, S.Pd", position: "Kepala Dusun I (Pasirjati)", nip: "SK. Bupati/Kadus 01/2021", phone: "081299881101", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80", area: "Dusun Pasirjati (RW 01, RW 02, RW 03)" },
    { id: "kadus-2", category: "Kepala Dusun (Kadus)", name: "Bpk. Hendra Gunawan", position: "Kepala Dusun II (Sukarame)", nip: "SK. Bupati/Kadus 02/2021", phone: "081299881102", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", area: "Dusun Sukarame (RW 04, RW 05)" },
    { id: "kadus-3", category: "Kepala Dusun (Kadus)", name: "Bpk. Syarif Hidayatullah", position: "Kepala Dusun III (Cikembar)", nip: "SK. Bupati/Kadus 03/2021", phone: "081299881103", photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80", area: "Dusun Cikembar (RW 06, RW 07, RW 08)" },
    { id: "kadus-4", category: "Kepala Dusun (Kadus)", name: "Bpk. Mulyadi Saputra", position: "Kepala Dusun IV (Mekar)", nip: "SK. Bupati/Kadus 04/2021", phone: "081299881104", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", area: "Dusun Mekar (RW 09, RW 10)" },

    // 10 KETUA RW
    { id: "rw-1", category: "Rukun Warga (RW)", name: "Bpk. H. Supriatna, S.Pd", position: "Ketua RW 01", nip: "SK. Kades 01/RW/2023", phone: "081311010001", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80", area: "Dusun Pasirjati (RT 01, RT 02)" },
    { id: "rw-2", category: "Rukun Warga (RW)", name: "Bpk. Drs. Subagja", position: "Ketua RW 02", nip: "SK. Kades 02/RW/2023", phone: "081311010002", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80", area: "Dusun Pasirjati (RT 03, RT 04)" },
    { id: "rw-3", category: "Rukun Warga (RW)", name: "Bpk. Maman Surahman", position: "Ketua RW 03", nip: "SK. Kades 03/RW/2023", phone: "081311010003", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80", area: "Dusun Pasirjati (RT 05, RT 06)" },
    { id: "rw-4", category: "Rukun Warga (RW)", name: "Bpk. Wahyu Hidayat", position: "Ketua RW 04", nip: "SK. Kades 04/RW/2023", phone: "081311010004", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80", area: "Dusun Sukarame (RT 07, RT 08)" },
    { id: "rw-5", category: "Rukun Warga (RW)", name: "Bpk. Agus Salim, S.Pd", position: "Ketua RW 05", nip: "SK. Kades 05/RW/2023", phone: "081311010005", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80", area: "Dusun Sukarame (RT 09, RT 10)" },
    { id: "rw-6", category: "Rukun Warga (RW)", name: "Bpk. Cecep Sunandar", position: "Ketua RW 06", nip: "SK. Kades 06/RW/2023", phone: "081311010006", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80", area: "Dusun Cikembar (RT 11, RT 12)" },
    { id: "rw-7", category: "Rukun Warga (RW)", name: "Bpk. Nanang Sujana", position: "Ketua RW 07", nip: "SK. Kades 07/RW/2023", phone: "081311010007", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80", area: "Dusun Cikembar (RT 13, RT 14)" },
    { id: "rw-8", category: "Rukun Warga (RW)", name: "Bpk. Dudung Durahman", position: "Ketua RW 08", nip: "SK. Kades 08/RW/2023", phone: "081311010008", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80", area: "Dusun Cikembar (RT 15, RT 16)" },
    { id: "rw-9", category: "Rukun Warga (RW)", name: "Bpk. Iwan Setiawan", position: "Ketua RW 09", nip: "SK. Kades 09/RW/2023", phone: "081311010009", photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80", area: "Dusun Mekar (RT 17, RT 18)" },
    { id: "rw-10", category: "Rukun Warga (RW)", name: "Bpk. Tatang Sumpena", position: "Ketua RW 10", nip: "SK. Kades 10/RW/2023", phone: "081311010010", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80", area: "Dusun Mekar (RT 19, RT 20)" }
  ],
  contact: {
    address: "Jl. Raya Desa Sukamaju Mandiri No. 01, Kec. Harapan Makmur",
    email: "pemdes@desasukamaju.id",
    phone: "(022) 8765-4321",
    whatsapp: "6281234567890",
    openingHours: "Senin - Jumat: 08.00 - 15.30 WIB",
    emergencyContacts: [
      { role: "Puskesmas / Bidan Desa", name: "Ibu Bidan Nurlaela", phone: "0812-9988-7766" },
      { role: "Babinsa Desa (TNI)", name: "Sertu Hendra Gunawan", phone: "0813-1122-4455" },
      { role: "Bhabinkamtibmas (Polri)", name: "Aipda Dedi Prasetyo", phone: "0852-6677-8899" },
      { role: "Mobil Siaga / Ambulans Desa", name: "Call Center 24 Jam", phone: "0821-3344-5566" }
    ],
    mapCoordinates: "-6.9175, 107.6191"
  }
};

// Daftar Sumber Dana APBDes Resmi
export const APBDES_FUNDING_SOURCES = [
  "Sumber APBDes (Dana Desa / DDS)",
  "Sumber APBDes (Alokasi Dana Desa / ADD)",
  "Sumber APBDes (Pendapatan Asli Desa / PADes)",
  "Sumber APBDes (Bantuan Keuangan Provinsi / Banprov)",
  "Sumber APBDes (Bagi Hasil Pajak & Retribusi Daerah / PBH)",
  "Sumber APBDes (APBDes Murni T.A. 2026)",
  "Sumber APBDes (Rencana Musrenbangdes T.A. 2027)",
  "Sumber APBDes (Swadaya / Partisipasi Masyarakat)"
];

// Database Program Kerja & Transparansi APBDes Desa
export const initialWorkPrograms = [
  {
    id: "prog-1",
    title: "Pembangunan Jalan Usaha Tani & Saluran Irigasi Tersier",
    category: "Infrastruktur & Pertanian",
    budget: 185000000,
    fundingSource: "Sumber APBDes (Dana Desa / DDS)",
    location: "Dusun Sukarame (RW 04 & RW 05)",
    schedule: "Juli - September 2026",
    status: "SEDANG_BERJALAN",
    progress: 75,
    pic: "Endang Supriatna, S.T (Kaur Pembangunan / TPK)",
    description: "Pengecoran jalan usaha tani sepanjang 650 meter dan normalisasi saluran irigasi guna memperlancar distribusi hasil panen padi dan sayuran warga."
  },
  {
    id: "prog-2",
    title: "Pengadaan 50 Titik Lampu Penerangan Jalan Umum (PJU) Tenaga Surya",
    category: "Fasilitas Publik & Keamanan",
    budget: 75000000,
    fundingSource: "Sumber APBDes (Dana Desa / DDS)",
    location: "Dusun Pasirjati (RW 01 s/d RW 03) & Dusun Cikembar",
    schedule: "Agustus - September 2026",
    status: "PRIORITAS",
    progress: 25,
    pic: "Kapten (Purn) Sutrisno, S.H (Kasi Pemerintahan)",
    description: "Pemasangan lampu jalan solar cell hemat energi di sepanjang jalur tikungan rawan dan jalan penghubung antar-dusun demi keselamatan warga."
  },
  {
    id: "prog-3",
    title: "Pembangunan Gedung Serbaguna & Balai Pertemuan RW Ramah Lansia",
    category: "Pemberdayaan & Kemasyarakatan",
    budget: 250000000,
    fundingSource: "Sumber APBDes (Bantuan Keuangan Provinsi / Banprov)",
    location: "Kawasan Balai RW 07 Dusun Cikembar",
    schedule: "Oktober - Desember 2026",
    status: "WAKTU_DEKAT",
    progress: 0,
    pic: "Endang Supriatna, S.T & Ketua RW 07",
    description: "Pembangunan balai serbaguna untuk kegiatan Posyandu lansia, pertemuan warga, pembinaan pemuda karang taruna, dan olahraga bulutangkis."
  },
  {
    id: "prog-4",
    title: "Pengadaan Mesin Roasting Kopi Modern & Pelatihan Barista BUMDes",
    category: "Ekonomi Kreatif & BUMDes",
    budget: 65000000,
    fundingSource: "Sumber APBDes (Alokasi Dana Desa / ADD)",
    location: "Sentra Olahan Kopi Dusun Sukarame",
    schedule: "Agustus - Oktober 2026",
    status: "SEDANG_BERJALAN",
    progress: 50,
    pic: "Ahmad Fauzi, S.Kom & Pengurus BUMDes",
    description: "Pemberdayaan petani kopi lokal dengan fasilitas pengolahan pasca panen modern agar nilai jual produk olahan kopi meningkat di pasaran."
  }
];

export const initialFamiliesList = [
  // DUSUN 1: PASIRJATI (RW 01, RW 02, RW 03 -> RT 01 s/d RT 06)
  {
    id: "kk-01-01",
    noKk: "3204150801120001",
    headName: "Bambang Sudrajat",
    address: "Kp. Pasirjati No. 12",
    rt: "001",
    rw: "001",
    dusun: "Dusun Pasirjati",
    postalCode: "40375",
    economicStatus: "Desil 3 (Kurang Mampu)",
    bpjsStatus: "Aktif (PBI Pemerintah)",
    houseOwnership: "Milik Sendiri",
    electricity: "900 VA (Subsidi)",
    waterSource: "Sumur Gali / Mata Air",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: ["BPNT", "BLT Dana Desa"],
    issueDate: "10 Januari 2021",
    members: [
      { id: "cit-01-01-1", nik: "3204151208850001", name: "Bambang Sudrajat", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "12-08-1985", religion: "Islam", education: "SMA / Sederajat", occupation: "Wiraswasta / Toko Kelontong", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "O", fatherName: "Sudrajat", motherName: "Siti Aminah", phone: "081298765401" },
      { id: "cit-01-01-2", nik: "3204155503880001", name: "Iis Aisyah", gender: "Perempuan", birthPlace: "Bandung", birthDate: "15-03-1988", religion: "Islam", education: "SMP / Sederajat", occupation: "Mengurus Rumah Tangga", maritalStatus: "Kawin", relation: "Istri", bloodType: "A", fatherName: "Ahmad", motherName: "Rokayah", phone: "081298765402" },
      { id: "cit-01-01-3", nik: "3204152005100001", name: "Rizky Pratama", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "20-05-2010", religion: "Islam", education: "SMP / Sederajat", occupation: "Pelajar / Mahasiswa", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "O", fatherName: "Bambang Sudrajat", motherName: "Iis Aisyah", phone: "-" }
    ]
  },
  {
    id: "kk-01-02",
    noKk: "3204150801120002",
    headName: "Asep Hidayat",
    address: "Kp. Pasirjati No. 28",
    rt: "002",
    rw: "001",
    dusun: "Dusun Pasirjati",
    postalCode: "40375",
    economicStatus: "Desil 4 (Menengah)",
    bpjsStatus: "Aktif (Mandiri)",
    houseOwnership: "Milik Sendiri",
    electricity: "1300 VA (Non-Subsidi)",
    waterSource: "PDAM / Sumur Bor",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: [],
    issueDate: "14 Februari 2020",
    members: [
      { id: "cit-01-02-1", nik: "3204151402830001", name: "Asep Hidayat", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "14-02-1983", religion: "Islam", education: "Diploma / Sarjana", occupation: "Guru / Pendidik", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "B", fatherName: "Hidayat", motherName: "Euis", phone: "081298765403" },
      { id: "cit-01-02-2", nik: "3204155106860001", name: "Nining Ratnasari", gender: "Perempuan", birthPlace: "Garut", birthDate: "11-06-1986", religion: "Islam", education: "SMA / Sederajat", occupation: "Wiraswasta", maritalStatus: "Kawin", relation: "Istri", bloodType: "B", fatherName: "Sutisna", motherName: "Mariam", phone: "081298765404" },
      { id: "cit-01-02-3", nik: "3204152509120001", name: "Dinda Kirana", gender: "Perempuan", birthPlace: "Bandung", birthDate: "25-09-2012", religion: "Islam", education: "SD / Sederajat", occupation: "Pelajar / Mahasiswa", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "B", fatherName: "Asep Hidayat", motherName: "Nining Ratnasari", phone: "-" }
    ]
  },
  {
    id: "kk-02-03",
    noKk: "3204150802120001",
    headName: "Cecep Supriadi",
    address: "Kp. Pasir Salam RT 03 No. 05",
    rt: "003",
    rw: "002",
    dusun: "Dusun Pasirjati",
    postalCode: "40375",
    economicStatus: "Desil 2 (Tidak Mampu)",
    bpjsStatus: "Aktif (PBI Pemerintah)",
    houseOwnership: "Milik Sendiri",
    electricity: "450 VA (Subsidi)",
    waterSource: "Sumur Gali",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: ["PKH", "BPNT"],
    issueDate: "21 Maret 2019",
    members: [
      { id: "cit-02-03-1", nik: "3204152103780001", name: "Cecep Supriadi", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "21-03-1978", religion: "Islam", education: "SD / Sederajat", occupation: "Petani / Pekebun", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "AB", fatherName: "Supriadi", motherName: "Enung", phone: "081298765405" },
      { id: "cit-02-03-2", nik: "3204156207820001", name: "Dewi Sartika", gender: "Perempuan", birthPlace: "Sumedang", birthDate: "22-07-1982", religion: "Islam", education: "SD / Sederajat", occupation: "Buruh Harian Lepas", maritalStatus: "Kawin", relation: "Istri", bloodType: "O", fatherName: "Darma", motherName: "Kartini", phone: "-" },
      { id: "cit-02-03-3", nik: "3204150508080001", name: "Fajar Ramadhan", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "05-08-2008", religion: "Islam", education: "SMA / Sederajat", occupation: "Pelajar / Mahasiswa", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "AB", fatherName: "Cecep Supriadi", motherName: "Dewi Sartika", phone: "-" }
    ]
  },
  {
    id: "kk-02-04",
    noKk: "3204150802120002",
    headName: "Hendra Gunawan",
    address: "Kp. Pasir Salam RT 04 No. 19",
    rt: "004",
    rw: "002",
    dusun: "Dusun Pasirjati",
    postalCode: "40375",
    economicStatus: "Desil 4 (Menengah)",
    bpjsStatus: "Aktif (Mandiri)",
    houseOwnership: "Milik Sendiri",
    electricity: "1300 VA (Non-Subsidi)",
    waterSource: "Sumur Bor",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: [],
    issueDate: "05 Mei 2020",
    members: [
      { id: "cit-02-04-1", nik: "3204150505800001", name: "Hendra Gunawan", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "05-05-1980", religion: "Islam", education: "SMA / Sederajat", occupation: "Karyawan Swasta", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "A", fatherName: "Gunawan", motherName: "Teti", phone: "081298765406" },
      { id: "cit-02-04-2", nik: "3204154808840001", name: "Rina Agustina", gender: "Perempuan", birthPlace: "Cimahi", birthDate: "08-08-1984", religion: "Islam", education: "SMA / Sederajat", occupation: "Pedagang", maritalStatus: "Kawin", relation: "Istri", bloodType: "A", fatherName: "Agus", motherName: "Cicih", phone: "081298765407" },
      { id: "cit-02-04-3", nik: "3204151211110001", name: "Bayu Saputra", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "12-11-2011", religion: "Islam", education: "SD / Sederajat", occupation: "Pelajar / Mahasiswa", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "A", fatherName: "Hendra Gunawan", motherName: "Rina Agustina", phone: "-" }
    ]
  },
  {
    id: "kk-03-05",
    noKk: "3204150803120001",
    headName: "Dudung Suherman",
    address: "Kp. Pasir Luhur RT 05 No. 08",
    rt: "005",
    rw: "003",
    dusun: "Dusun Pasirjati",
    postalCode: "40375",
    economicStatus: "Desil 1 (Sangat Tidak Mampu / Ekstrem)",
    bpjsStatus: "Aktif (PBI Pemerintah)",
    houseOwnership: "Menumpang / Keluarga",
    electricity: "450 VA (Subsidi)",
    waterSource: "Mata Air Desa",
    sanitation: "Jamban Sehat Bersama",
    bansosTypes: ["PKH", "BPNT", "BLT Dana Desa"],
    issueDate: "18 Juni 2018",
    members: [
      { id: "cit-03-05-1", nik: "3204151806750001", name: "Dudung Suherman", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "18-06-1975", religion: "Islam", education: "Tidak / Belum Sekolah", occupation: "Buruh Tani", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "O", fatherName: "Suherman", motherName: "Karsih", phone: "081298765408" },
      { id: "cit-03-05-2", nik: "3204155909790001", name: "Siti Rokayah", gender: "Perempuan", birthPlace: "Bandung", birthDate: "19-09-1979", religion: "Islam", education: "SD / Sederajat", occupation: "Buruh Harian Lepas", maritalStatus: "Kawin", relation: "Istri", bloodType: "O", fatherName: "Oman", motherName: "Aminah", phone: "-" },
      { id: "cit-03-05-3", nik: "3204150201050001", name: "Gilang Permana", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "02-01-2005", religion: "Islam", education: "SMA / Sederajat", occupation: "Belum / Tidak Bekerja", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "O", fatherName: "Dudung Suherman", motherName: "Siti Rokayah", phone: "081298765409" }
    ]
  },
  {
    id: "kk-03-06",
    noKk: "3204150803120002",
    headName: "Agus Kurniawan",
    address: "Kp. Pasir Luhur RT 06 No. 22",
    rt: "006",
    rw: "003",
    dusun: "Dusun Pasirjati",
    postalCode: "40375",
    economicStatus: "Desil 4 (Menengah)",
    bpjsStatus: "Aktif (Mandiri)",
    houseOwnership: "Milik Sendiri",
    electricity: "1300 VA (Non-Subsidi)",
    waterSource: "Sumur Bor",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: [],
    issueDate: "27 Juli 2021",
    members: [
      { id: "cit-03-06-1", nik: "3204152707840001", name: "Agus Kurniawan", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "27-07-1984", religion: "Islam", education: "Diploma / Sarjana", occupation: "Perangkat Desa / Staf", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "B", fatherName: "Kurniawan", motherName: "Lia", phone: "081298765410" },
      { id: "cit-03-06-2", nik: "3204154404870001", name: "Yanti Mulyani", gender: "Perempuan", birthPlace: "Bandung", birthDate: "04-04-1987", religion: "Islam", education: "SMA / Sederajat", occupation: "Bidan / Nakes Desa", maritalStatus: "Kawin", relation: "Istri", bloodType: "AB", fatherName: "Mulyadi", motherName: "Sri", phone: "081298765411" },
      { id: "cit-03-06-3", nik: "3204151708150001", name: "Putri Maharani", gender: "Perempuan", birthPlace: "Bandung", birthDate: "17-08-2015", religion: "Islam", education: "SD / Sederajat", occupation: "Pelajar / Mahasiswa", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "B", fatherName: "Agus Kurniawan", motherName: "Yanti Mulyani", phone: "-" }
    ]
  },

  // DUSUN 2: SUKAMUKTI (RW 04, RW 05, RW 06 -> RT 07 s/d RT 12)
  {
    id: "kk-04-07",
    noKk: "3204150804120001",
    headName: "Nanang Koswara",
    address: "Kp. Sukamukti RT 07 No. 11",
    rt: "007",
    rw: "04",
    dusun: "Dusun Sukamukti",
    postalCode: "40375",
    economicStatus: "Desil 2 (Tidak Mampu)",
    bpjsStatus: "Aktif (PBI Pemerintah)",
    houseOwnership: "Milik Sendiri",
    electricity: "450 VA (Subsidi)",
    waterSource: "Sumur Gali",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: ["PKH", "BPNT"],
    issueDate: "11 Agustus 2019",
    members: [
      { id: "cit-04-07-1", nik: "3204151108760001", name: "Nanang Koswara", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "11-08-1976", religion: "Islam", education: "SMP / Sederajat", occupation: "Petani Padi Organik", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "O", fatherName: "Koswara", motherName: "Mimin", phone: "081298765412" },
      { id: "cit-04-07-2", nik: "3204155010800001", name: "Kokom Komalasari", gender: "Perempuan", birthPlace: "Bandung", birthDate: "10-10-1980", religion: "Islam", education: "SD / Sederajat", occupation: "Petani / Pengrajin Bambu", maritalStatus: "Kawin", relation: "Istri", bloodType: "O", fatherName: "Juhana", motherName: "Komala", phone: "-" },
      { id: "cit-04-07-3", nik: "3204151503060001", name: "Sandi Kurnia", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "15-03-2006", religion: "Islam", education: "SMA / Sederajat", occupation: "Pelajar / Mahasiswa", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "O", fatherName: "Nanang Koswara", motherName: "Kokom Komalasari", phone: "-" }
    ]
  },
  {
    id: "kk-04-08",
    noKk: "3204150804120002",
    headName: "Tatang Sulaeman",
    address: "Kp. Sukamukti RT 08 No. 35",
    rt: "008",
    rw: "04",
    dusun: "Dusun Sukamukti",
    postalCode: "40375",
    economicStatus: "Desil 3 (Kurang Mampu)",
    bpjsStatus: "Aktif (PBI Pemerintah)",
    houseOwnership: "Milik Sendiri",
    electricity: "900 VA (Subsidi)",
    waterSource: "Sumur Gali",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: ["BPNT"],
    issueDate: "19 September 2020",
    members: [
      { id: "cit-04-08-1", nik: "3204151909730001", name: "Tatang Sulaeman", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "19-09-1973", religion: "Islam", education: "SMA / Sederajat", occupation: "Montir / Bengkel Motor", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "B", fatherName: "Sulaeman", motherName: "Neneng", phone: "081298765413" },
      { id: "cit-04-08-2", nik: "3204154512770001", name: "Eni Maryani", gender: "Perempuan", birthPlace: "Tasikmalaya", birthDate: "05-12-1977", religion: "Islam", education: "SMA / Sederajat", occupation: "Penjahit Pakaian", maritalStatus: "Kawin", relation: "Istri", bloodType: "A", fatherName: "Maryadi", motherName: "Enok", phone: "-" },
      { id: "cit-04-08-3", nik: "3204152001090001", name: "Bagas Wicaksono", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "20-01-2009", religion: "Islam", education: "SMP / Sederajat", occupation: "Pelajar / Mahasiswa", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "B", fatherName: "Tatang Sulaeman", motherName: "Eni Maryani", phone: "-" }
    ]
  },
  {
    id: "kk-05-09",
    noKk: "3204150805120001",
    headName: "Eko Prasetyo",
    address: "Kp. Sukaluyu RT 09 No. 17",
    rt: "009",
    rw: "05",
    dusun: "Dusun Sukamukti",
    postalCode: "40375",
    economicStatus: "Desil 4 (Menengah)",
    bpjsStatus: "Aktif (Mandiri)",
    houseOwnership: "Milik Sendiri",
    electricity: "1300 VA (Non-Subsidi)",
    waterSource: "PDAM Desa",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: [],
    issueDate: "03 Oktober 2021",
    members: [
      { id: "cit-05-09-1", nik: "3204150310820001", name: "Eko Prasetyo", gender: "Laki-Laki", birthPlace: "Kebumen", birthDate: "03-10-1982", religion: "Islam", education: "Diploma / Sarjana", occupation: "Peternak Sapi Perah", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "O", fatherName: "Prasetyo", motherName: "Siti", phone: "081298765414" },
      { id: "cit-05-09-2", nik: "3204154904850001", name: "Sri Wahyuni", gender: "Perempuan", birthPlace: "Bandung", birthDate: "09-04-1985", religion: "Islam", education: "SMA / Sederajat", occupation: "Pelaku UMKM Olahan Susu", maritalStatus: "Kawin", relation: "Istri", bloodType: "O", fatherName: "Wahyu", motherName: "Yayah", phone: "081298765415" },
      { id: "cit-05-09-3", nik: "3204151408130001", name: "Annisa Rahma", gender: "Perempuan", birthPlace: "Bandung", birthDate: "14-08-2013", religion: "Islam", education: "SD / Sederajat", occupation: "Pelajar / Mahasiswa", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "O", fatherName: "Eko Prasetyo", motherName: "Sri Wahyuni", phone: "-" }
    ]
  },
  {
    id: "kk-05-10",
    noKk: "3204150805120002",
    headName: "Rudi Hermawan",
    address: "Kp. Sukaluyu RT 10 No. 42",
    rt: "010",
    rw: "05",
    dusun: "Dusun Sukamukti",
    postalCode: "40375",
    economicStatus: "Desil 3 (Kurang Mampu)",
    bpjsStatus: "Aktif (PBI Pemerintah)",
    houseOwnership: "Milik Sendiri",
    electricity: "900 VA (Subsidi)",
    waterSource: "Sumur Gali",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: ["BPNT"],
    issueDate: "12 November 2019",
    members: [
      { id: "cit-05-10-1", nik: "3204151211790001", name: "Rudi Hermawan", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "12-11-1979", religion: "Islam", education: "SMA / Sederajat", occupation: "Sopir Angkutan Desa", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "AB", fatherName: "Hermawan", motherName: "Oneng", phone: "081298765416" },
      { id: "cit-05-10-2", nik: "3204156608830001", name: "Maya Novita", gender: "Perempuan", birthPlace: "Bogor", birthDate: "26-08-1983", religion: "Islam", education: "SMP / Sederajat", occupation: "Pedagang Makanan", maritalStatus: "Kawin", relation: "Istri", bloodType: "B", fatherName: "Novi", motherName: "Rita", phone: "-" },
      { id: "cit-05-10-3", nik: "3204151802070001", name: "Aditya Nugraha", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "18-02-2007", religion: "Islam", education: "SMA / Sederajat", occupation: "Pelajar / Mahasiswa", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "AB", fatherName: "Rudi Hermawan", motherName: "Maya Novita", phone: "-" }
    ]
  },
  {
    id: "kk-06-11",
    noKk: "3204150806120001",
    headName: "Iwan Setiawan",
    address: "Kp. Sukasari RT 11 No. 03",
    rt: "011",
    rw: "06",
    dusun: "Dusun Sukamukti",
    postalCode: "40375",
    economicStatus: "Desil 2 (Tidak Mampu)",
    bpjsStatus: "Aktif (PBI Pemerintah)",
    houseOwnership: "Milik Sendiri",
    electricity: "450 VA (Subsidi)",
    waterSource: "Sumur Gali",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: ["PKH", "BPNT"],
    issueDate: "25 Desember 2018",
    members: [
      { id: "cit-06-11-1", nik: "3204152512770001", name: "Iwan Setiawan", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "25-12-1977", religion: "Islam", education: "SD / Sederajat", occupation: "Kuli Bangunan", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "O", fatherName: "Setiawan", motherName: "Rohani", phone: "081298765417" },
      { id: "cit-06-11-2", nik: "3204154101810001", name: "Lilis Suryani", gender: "Perempuan", birthPlace: "Cianjur", birthDate: "01-01-1981", religion: "Islam", education: "SD / Sederajat", occupation: "Buruh Cuci", maritalStatus: "Kawin", relation: "Istri", bloodType: "O", fatherName: "Surya", motherName: "Anih", phone: "-" },
      { id: "cit-06-11-3", nik: "3204150909040001", name: "Tegar Maulana", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "09-09-2004", religion: "Islam", education: "SMA / Sederajat", occupation: "Buruh Pabrik", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "O", fatherName: "Iwan Setiawan", motherName: "Lilis Suryani", phone: "081298765418" }
    ]
  },
  {
    id: "kk-06-12",
    noKk: "3204150806120002",
    headName: "Deden Iskandar",
    address: "Kp. Sukasari RT 12 No. 20",
    rt: "012",
    rw: "06",
    dusun: "Dusun Sukamukti",
    postalCode: "40375",
    economicStatus: "Desil 4 (Menengah)",
    bpjsStatus: "Aktif (Mandiri)",
    houseOwnership: "Milik Sendiri",
    electricity: "1300 VA (Non-Subsidi)",
    waterSource: "Sumur Bor",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: [],
    issueDate: "16 Januari 2022",
    members: [
      { id: "cit-06-12-1", nik: "3204151601860001", name: "Deden Iskandar", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "16-01-1986", religion: "Islam", education: "SMA / Sederajat", occupation: "Pengelola Objek Wisata", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "A", fatherName: "Iskandar", motherName: "Ai", phone: "081298765419" },
      { id: "cit-06-12-2", nik: "3204155205890001", name: "Imas Masitoh", gender: "Perempuan", birthPlace: "Bandung", birthDate: "12-05-1989", religion: "Islam", education: "SMA / Sederajat", occupation: "Pengrajin Souvenir", maritalStatus: "Kawin", relation: "Istri", bloodType: "B", fatherName: "Masit", motherName: "Eha", phone: "-" },
      { id: "cit-06-12-3", nik: "3204152803170001", name: "Bella Cantika", gender: "Perempuan", birthPlace: "Bandung", birthDate: "28-03-2017", religion: "Islam", education: "Belum / Tidak Sekolah", occupation: "Belum Bekerja", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "A", fatherName: "Deden Iskandar", motherName: "Imas Masitoh", phone: "-" }
    ]
  },

  // DUSUN 3: MEKARWANGI (RW 07, RW 08, RW 09, RW 10 -> RT 13 s/d RT 20)
  {
    id: "kk-07-13",
    noKk: "3204150807120001",
    headName: "Ujang Saepudin",
    address: "Kp. Mekar Jaya RT 13 No. 04",
    rt: "013",
    rw: "07",
    dusun: "Dusun Mekarwangi",
    postalCode: "40375",
    economicStatus: "Desil 1 (Sangat Tidak Mampu / Ekstrem)",
    bpjsStatus: "Aktif (PBI Pemerintah)",
    houseOwnership: "Milik Sendiri (Bantuan Rutilahu)",
    electricity: "450 VA (Subsidi)",
    waterSource: "Mata Air Desa",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: ["PKH", "BPNT", "BLT Dana Desa"],
    issueDate: "08 Februari 2017",
    members: [
      { id: "cit-07-13-1", nik: "3204150802710001", name: "Ujang Saepudin", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "08-02-1971", religion: "Islam", education: "SD / Sederajat", occupation: "Buruh Tani Cengkeh", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "O", fatherName: "Saepudin", motherName: "Titin", phone: "081298765420" },
      { id: "cit-07-13-2", nik: "3204154406750001", name: "Rohayati", gender: "Perempuan", birthPlace: "Bandung", birthDate: "04-06-1975", religion: "Islam", education: "SD / Sederajat", occupation: "Buruh Harian", maritalStatus: "Kawin", relation: "Istri", bloodType: "O", fatherName: "Kohar", motherName: "Iyah", phone: "-" },
      { id: "cit-07-13-3", nik: "3204151010030001", name: "Ilham Fauzi", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "10-10-2003", religion: "Islam", education: "SMA / Sederajat", occupation: "Karyawan Honorer", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "O", fatherName: "Ujang Saepudin", motherName: "Rohayati", phone: "081298765421" }
    ]
  },
  {
    id: "kk-07-14",
    noKk: "3204150807120002",
    headName: "Wawan Darmawan",
    address: "Kp. Mekar Jaya RT 14 No. 18",
    rt: "014",
    rw: "07",
    dusun: "Dusun Mekarwangi",
    postalCode: "40375",
    economicStatus: "Desil 3 (Kurang Mampu)",
    bpjsStatus: "Aktif (PBI Pemerintah)",
    houseOwnership: "Milik Sendiri",
    electricity: "900 VA (Subsidi)",
    waterSource: "Sumur Gali",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: ["BPNT"],
    issueDate: "20 Maret 2020",
    members: [
      { id: "cit-07-14-1", nik: "3204152003780001", name: "Wawan Darmawan", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "20-03-1978", religion: "Islam", education: "SMA / Sederajat", occupation: "Petani Kopi Robusta", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "B", fatherName: "Darmawan", motherName: "Mulyati", phone: "081298765422" },
      { id: "cit-07-14-2", nik: "3204155107810001", name: "Titin Sumarni", gender: "Perempuan", birthPlace: "Subang", birthDate: "11-07-1981", religion: "Islam", education: "SMP / Sederajat", occupation: "Penjual Hasil Bumi", maritalStatus: "Kawin", relation: "Istri", bloodType: "A", fatherName: "Sumarna", motherName: "Emi", phone: "-" },
      { id: "cit-07-14-3", nik: "3204151904100001", name: "Cindy Claudia", gender: "Perempuan", birthPlace: "Bandung", birthDate: "19-04-2010", religion: "Islam", education: "SMP / Sederajat", occupation: "Pelajar / Mahasiswa", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "B", fatherName: "Wawan Darmawan", motherName: "Titin Sumarni", phone: "-" }
    ]
  },
  {
    id: "kk-08-15",
    noKk: "3204150808120001",
    headName: "Mulyadi",
    address: "Kp. Mekar Bakti RT 15 No. 09",
    rt: "015",
    rw: "08",
    dusun: "Dusun Mekarwangi",
    postalCode: "40375",
    economicStatus: "Desil 4 (Menengah)",
    bpjsStatus: "Aktif (Mandiri)",
    houseOwnership: "Milik Sendiri",
    electricity: "1300 VA (Non-Subsidi)",
    waterSource: "Sumur Bor",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: [],
    issueDate: "14 April 2021",
    members: [
      { id: "cit-08-15-1", nik: "3204151404800001", name: "Mulyadi", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "14-04-1980", religion: "Islam", education: "SMA / Sederajat", occupation: "Pedagang Grosir Sembako", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "O", fatherName: "Mulyana", motherName: "Rohanah", phone: "081298765423" },
      { id: "cit-08-15-2", nik: "3204154809830001", name: "Nurul Hasanah", gender: "Perempuan", birthPlace: "Cirebon", birthDate: "08-09-1983", religion: "Islam", education: "SMA / Sederajat", occupation: "Wiraswasta", maritalStatus: "Kawin", relation: "Istri", bloodType: "AB", fatherName: "Hasan", motherName: "Nurbaeti", phone: "081298765424" },
      { id: "cit-08-15-3", nik: "3204151206080001", name: "Farhan Alfarizi", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "12-06-2008", religion: "Islam", education: "SMA / Sederajat", occupation: "Pelajar / Mahasiswa", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "O", fatherName: "Mulyadi", motherName: "Nurul Hasanah", phone: "-" }
    ]
  },
  {
    id: "kk-08-16",
    noKk: "3204150808120002",
    headName: "Jajang Nurjaman",
    address: "Kp. Mekar Bakti RT 16 No. 27",
    rt: "016",
    rw: "08",
    dusun: "Dusun Mekarwangi",
    postalCode: "40375",
    economicStatus: "Desil 2 (Tidak Mampu)",
    bpjsStatus: "Aktif (PBI Pemerintah)",
    houseOwnership: "Milik Sendiri",
    electricity: "450 VA (Subsidi)",
    waterSource: "Sumur Gali",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: ["PKH", "BPNT"],
    issueDate: "29 Mei 2019",
    members: [
      { id: "cit-08-16-1", nik: "3204152905770001", name: "Jajang Nurjaman", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "29-05-1977", religion: "Islam", education: "SMP / Sederajat", occupation: "Pengrajin Anyaman Bambu", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "A", fatherName: "Nurjaman", motherName: "Onih", phone: "081298765425" },
      { id: "cit-08-16-2", nik: "3204154101820001", name: "Ade Irma", gender: "Perempuan", birthPlace: "Bandung", birthDate: "01-01-1982", religion: "Islam", education: "SMP / Sederajat", occupation: "Mengurus Rumah Tangga", maritalStatus: "Kawin", relation: "Istri", bloodType: "O", fatherName: "Solihin", motherName: "Kokom", phone: "-" },
      { id: "cit-08-16-3", nik: "3204151703140001", name: "Zahra Khairunnisa", gender: "Perempuan", birthPlace: "Bandung", birthDate: "17-03-2014", religion: "Islam", education: "SD / Sederajat", occupation: "Pelajar / Mahasiswa", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "A", fatherName: "Jajang Nurjaman", motherName: "Ade Irma", phone: "-" }
    ]
  },
  {
    id: "kk-09-17",
    noKk: "3204150809120001",
    headName: "Supardi",
    address: "Kp. Mekar Asih RT 17 No. 06",
    rt: "017",
    rw: "09",
    dusun: "Dusun Mekarwangi",
    postalCode: "40375",
    economicStatus: "Desil 3 (Kurang Mampu)",
    bpjsStatus: "Aktif (PBI Pemerintah)",
    houseOwnership: "Milik Sendiri",
    electricity: "900 VA (Subsidi)",
    waterSource: "Sumur Gali",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: ["BPNT"],
    issueDate: "17 Juli 2020",
    members: [
      { id: "cit-09-17-1", nik: "3204151707740001", name: "Supardi", gender: "Laki-Laki", birthPlace: "Kebumen", birthDate: "17-07-1974", religion: "Islam", education: "SMA / Sederajat", occupation: "Petani Jagung & Palawija", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "O", fatherName: "Pardi", motherName: "Sutini", phone: "081298765426" },
      { id: "cit-09-17-2", nik: "3204155508780001", name: "Sumiati", gender: "Perempuan", birthPlace: "Bandung", birthDate: "15-08-1978", religion: "Islam", education: "SMP / Sederajat", occupation: "Pedagang Sayur", maritalStatus: "Kawin", relation: "Istri", bloodType: "O", fatherName: "Mamat", motherName: "Eni", phone: "-" },
      { id: "cit-09-17-3", nik: "3204151002060001", name: "Rio Febrian", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "10-02-2006", religion: "Islam", education: "SMA / Sederajat", occupation: "Pelajar / Mahasiswa", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "O", fatherName: "Supardi", motherName: "Sumiati", phone: "-" }
    ]
  },
  {
    id: "kk-09-18",
    noKk: "3204150809120002",
    headName: "Gunawan",
    address: "Kp. Mekar Asih RT 18 No. 31",
    rt: "018",
    rw: "09",
    dusun: "Dusun Mekarwangi",
    postalCode: "40375",
    economicStatus: "Desil 4 (Menengah)",
    bpjsStatus: "Aktif (Mandiri)",
    houseOwnership: "Milik Sendiri",
    electricity: "1300 VA (Non-Subsidi)",
    waterSource: "Sumur Bor",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: [],
    issueDate: "09 Agustus 2021",
    members: [
      { id: "cit-09-18-1", nik: "3204150908810001", name: "Gunawan", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "09-08-1981", religion: "Islam", education: "SMA / Sederajat", occupation: "Pengusaha Kayu Olahan", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "B", fatherName: "Subrata", motherName: "Cicih", phone: "081298765427" },
      { id: "cit-09-18-2", nik: "3204154911840001", name: "Ratna Juwita", gender: "Perempuan", birthPlace: "Bandung", birthDate: "09-11-1984", religion: "Islam", education: "SMA / Sederajat", occupation: "Wiraswasta", maritalStatus: "Kawin", relation: "Istri", bloodType: "B", fatherName: "Juhana", motherName: "Rita", phone: "081298765428" },
      { id: "cit-09-18-3", nik: "3204151605120001", name: "Tiara Andini", gender: "Perempuan", birthPlace: "Bandung", birthDate: "16-05-2012", religion: "Islam", education: "SD / Sederajat", occupation: "Pelajar / Mahasiswa", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "B", fatherName: "Gunawan", motherName: "Ratna Juwita", phone: "-" }
    ]
  },
  {
    id: "kk-10-19",
    noKk: "3204150810120001",
    headName: "Rohmat Hidayat",
    address: "Kp. Mekar Wangi RT 19 No. 02",
    rt: "019",
    rw: "10",
    dusun: "Dusun Mekarwangi",
    postalCode: "40375",
    economicStatus: "Desil 2 (Tidak Mampu)",
    bpjsStatus: "Aktif (PBI Pemerintah)",
    houseOwnership: "Milik Sendiri",
    electricity: "450 VA (Subsidi)",
    waterSource: "Sumur Gali",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: ["PKH", "BPNT"],
    issueDate: "15 September 2018",
    members: [
      { id: "cit-10-19-1", nik: "3204151509750001", name: "Rohmat Hidayat", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "15-09-1975", religion: "Islam", education: "SD / Sederajat", occupation: "Buruh Kebun Teh", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "O", fatherName: "Hidayat", motherName: "Epon", phone: "081298765429" },
      { id: "cit-10-19-2", nik: "3204156003800001", name: "Wiwin Winarti", gender: "Perempuan", birthPlace: "Garut", birthDate: "20-03-1980", religion: "Islam", education: "SMP / Sederajat", occupation: "Pemetik Teh", maritalStatus: "Kawin", relation: "Istri", bloodType: "A", fatherName: "Winata", motherName: "Karni", phone: "-" },
      { id: "cit-10-19-3", nik: "3204150407050001", name: "Dimas Anggara", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "04-07-2005", religion: "Islam", education: "SMA / Sederajat", occupation: "Belum Bekerja", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "O", fatherName: "Rohmat Hidayat", motherName: "Wiwin Winarti", phone: "-" }
    ]
  },
  {
    id: "kk-10-20",
    noKk: "3204150810120002",
    headName: "Dedi Mulyadi",
    address: "Kp. Mekar Wangi RT 20 No. 44",
    rt: "020",
    rw: "10",
    dusun: "Dusun Mekarwangi",
    postalCode: "40375",
    economicStatus: "Desil 3 (Kurang Mampu)",
    bpjsStatus: "Aktif (PBI Pemerintah)",
    houseOwnership: "Milik Sendiri",
    electricity: "900 VA (Subsidi)",
    waterSource: "Sumur Gali",
    sanitation: "Jamban Sehat Pribadi",
    bansosTypes: ["BPNT", "BLT Dana Desa"],
    issueDate: "28 Oktober 2020",
    members: [
      { id: "cit-10-20-1", nik: "3204152810780001", name: "Dedi Mulyadi", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "28-10-1978", religion: "Islam", education: "SMA / Sederajat", occupation: "Peternak Domba Garut", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "AB", fatherName: "Mulyadi", motherName: "Neni", phone: "081298765430" },
      { id: "cit-10-20-2", nik: "3204154902820001", name: "Cucu Nurhayati", gender: "Perempuan", birthPlace: "Bandung", birthDate: "09-02-1982", religion: "Islam", education: "SMP / Sederajat", occupation: "Mengurus Rumah Tangga", maritalStatus: "Kawin", relation: "Istri", bloodType: "B", fatherName: "Nurhadi", motherName: "Sukaesih", phone: "-" },
      { id: "cit-10-20-3", nik: "3204151111100001", name: "Alfi Syahrin", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "11-11-2010", religion: "Islam", education: "SMP / Sederajat", occupation: "Pelajar / Mahasiswa", maritalStatus: "Belum Kawin", relation: "Anak", bloodType: "AB", fatherName: "Dedi Mulyadi", motherName: "Cucu Nurhayati", phone: "-" }
    ]
  }
];

export const letterTypes = [
  {
    id: "SKU",
    name: "Surat Keterangan Usaha (SKU)",
    description: "Surat pengantar untuk keperluan pengajuan kredit usaha, izin operasional, atau bantuan modal UMKM.",
    requirements: ["KTP Pemohon", "KK (Kartu Keluarga)", "Foto Tempat Usaha / Produk", "Surat Pengantar RT/RW"],
    processingDays: "1 Hari Kerja"
  }
];

export const initialNewsList = [
  {
    id: "news-1",
    title: "Pemerintah Desa Sukamaju Salurkan Bantuan Bibit Padi Organik dan Pupuk Ramah Lingkungan",
    slug: "penyaluran-bibit-padi-organik-2026",
    category: "Pemberdayaan",
    author: "Tim Kominfo Desa",
    date: "16 Agustus 2026",
    summary: "Sebanyak 350 petani dari 4 gabungan kelompok tani menerima alokasi bibit varietas unggul bersertifikat.",
    content: "Sebagai bagian dari program ketahanan pangan desa tahun anggaran 2026, Pemerintah Desa Sukamaju Mandiri menyalurkan 2,5 ton bibit padi organik.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80",
    views: 342,
    isFeatured: true
  }
];

export const initialUmkmList = [
  {
    id: "umkm-1",
    name: "Kopi Arabika Lereng Sukamaju",
    category: "Minuman",
    price: 45000,
    unit: "Bungkus 200gr",
    owner: "Pak Ujang & BUMDes Sukamaju",
    phone: "6281234567890",
    description: "Kopi arabika single origin hasil petik merah petani lokal di ketinggian 1.300 mdpl.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    soldCount: 840,
    badge: "Terlaris"
  }
];

export const initialTourismList = [
  {
    id: "tour-1",
    name: "Wisata Curug Bening & Sungai Batu Karang",
    category: "Wisata Alam",
    ticketPrice: 15000,
    openHours: "Setiap Hari | 07.30 - 17.00 WIB",
    location: "Dusun Pasirjati, RW 04 Desa Sukamaju",
    description: "Air terjun alami setinggi 25 meter dengan air jernih menyegarkan yang mengalir langsung dari mata air pegunungan.",
    facilities: ["Spot Foto Bambu", "Gazebo Istirahat", "Warung Kuliner Desa", "Toilet & Mushola"],
    image: "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    highlight: "Favorit Wisatawan"
  }
];

export const initialGalleryList = [
  {
    id: "gal-1",
    title: "Upacara Peringatan Hari Kemerdekaan RI di Lapangan Desa",
    category: "Kegiatan",
    date: "17 Agustus 2026",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80",
    description: "Khidmatnya upacara pengibaran bendera merah putih."
  }
];

export const initialServiceRequests = [
  {
    id: "REQ-20260818-001",
    trackingCode: "DS-SKU-9821",
    letterType: "SKU",
    letterName: "Surat Keterangan Usaha (SKU)",
    citizenName: "Bambang Sudrajat",
    nik: "3204151208850002",
    phone: "081298765412",
    rtRw: "RT 02 / RW 03",
    address: "Kp. Pasir Salam No. 14, Desa Sukamaju",
    purpose: "Persyaratan Pengajuan KUR Bank BRI",
    status: "SELESAI",
    submittedAt: "17 Agustus 2026 09:30 WIB",
    updatedAt: "17 Agustus 2026 14:15 WIB",
    adminNotes: "Berkas lengkap dan telah diverifikasi oleh Kasi Pelayanan."
  }
];

export const initialComplaints = [
  {
    id: "ASP-001",
    reporterName: "Wawan Kurniawan",
    phone: "081344556677",
    category: "Infrastruktur & Fasilitas Umum",
    subject: "Lampu Penerangan Jalan Umum (PJU) Mati",
    description: "Mohon izin melapor, lampu PJU di tikungan tajam Dusun Pasirjati RW 04 mati.",
    status: "DITINDAKLANJUTI",
    date: "16 Agustus 2026",
    adminResponse: "Tim teknisi PJU desa sudah melakukan perbaikan."
  }
];

export const USER_ROLES = {
  SUPER_ADMIN: {
    key: "SUPER_ADMIN",
    label: "Super Administrator",
    badgeColor: "#dc2626",
    badgeBg: "#fee2e2",
    description: "Akses penuh seluruh fitur, pengaturan sistem, dan hak kuasa penuh atas semua data desa."
  },
  OPERATOR_LAYANAN: {
    key: "OPERATOR_LAYANAN",
    label: "Operator Layanan & Surat",
    badgeColor: "#2563eb",
    badgeBg: "#dbeafe",
    description: "Mengelola verifikasi permohonan surat warga, arsip buku register, database kependudukan & respon pengaduan."
  },
  OPERATOR_MEDIA: {
    key: "OPERATOR_MEDIA",
    label: "Redaksi & Pengelola Media",
    badgeColor: "#059669",
    badgeBg: "#d1fae5",
    description: "Mengelola publikasi berita desa, direktori etalase UMKM, informasi wisata dan galeri dokumentasi kegiatan."
  },
  OPERATOR_KEUANGAN: {
    key: "OPERATOR_KEUANGAN",
    label: "Kaur Keuangan & APBDes",
    badgeColor: "#d97706",
    badgeBg: "#fef3c7",
    description: "Mengelola transparansi anggaran pendapatan & belanja desa (APBDes) serta pelacakan realisasi program kerja."
  },
  STAFF_ADMIN: {
    key: "STAFF_ADMIN",
    label: "Staf Administrasi",
    badgeColor: "#4f46e5",
    badgeBg: "#e0e7ff",
    description: "Staf operasional pelayanan harian dan operasional umum kantor desa."
  }
};

export const AVAILABLE_PERMISSIONS = [
  { id: 'dashboard', label: 'Ringkasan Dashboard', category: 'Utama' },
  { id: 'profile', label: 'Profil & Identitas Desa', category: 'Utama' },
  { id: 'programs', label: 'RAPBDes & Program Kerja', category: 'Utama' },
  { id: 'citizens', label: 'Database Kependudukan (KK & NIK)', category: 'Utama' },
  { id: 'bansos', label: 'Bantuan Sosial & BLT-DD', category: 'Layanan' },
  { id: 'health', label: 'e-Posyandu & Stunting', category: 'Layanan' },
  { id: 'services', label: 'Permohonan Surat Warga', category: 'Layanan' },
  { id: 'letter-templates', label: 'Cetak & Template Surat', category: 'Layanan' },
  { id: 'complaints', label: 'Pengaduan & Aspirasi Warga', category: 'Layanan' },
  { id: 'agriculture', label: 'Pertanian & Ketahanan Pangan', category: 'Informasi' },
  { id: 'bumdes', label: 'BUMDes & Unit Usaha Desa', category: 'Informasi' },
  { id: 'news', label: 'Publikasi Berita Desa', category: 'Informasi' },
  { id: 'umkm', label: 'Etalase Produk UMKM', category: 'Informasi' },
  { id: 'tourism', label: 'Destinasi Wisata Desa', category: 'Informasi' },
  { id: 'gallery', label: 'Galeri Foto Kegiatan', category: 'Informasi' },
  { id: 'reports', label: 'Buku Administrasi Permendagri', category: 'Sistem' },
  { id: 'settings', label: 'Pengaturan & Tema Portal', category: 'Sistem' },
  { id: 'users', label: 'Manajemen Pengguna & Operator', category: 'Sistem' }
];

export const initialAdminUsers = [
  {
    id: "usr-1",
    username: "admin",
    name: "H. Budi Santoso, S.AP",
    email: "admin@desasukamaju.id",
    role: "SUPER_ADMIN",
    position: "Kepala Desa / Super Administrator",
    password: "admin123",
    phone: "0812-3456-7890",
    status: "ACTIVE",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    lastLogin: "18 Agu 2026, 23:15 WIB",
    permissions: ["all"]
  },
  {
    id: "usr-2",
    username: "pelayanan",
    name: "Siti Nurhaliza, S.Sos",
    email: "pelayanan@desasukamaju.id",
    role: "OPERATOR_LAYANAN",
    position: "Kasi Pelayanan Masyarakat",
    password: "pelayanan123",
    phone: "0813-8899-7711",
    status: "ACTIVE",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    lastLogin: "18 Agu 2026, 14:20 WIB",
    permissions: ["dashboard", "services", "letter-templates", "citizens", "complaints", "bansos", "health"]
  },
  {
    id: "usr-3",
    username: "redaksi",
    name: "Ahmad Fauzi",
    email: "redaksi@desasukamaju.id",
    role: "OPERATOR_MEDIA",
    position: "Kaur Umum & Pengelola Media",
    password: "redaksi123",
    phone: "0856-1122-3344",
    status: "ACTIVE",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    lastLogin: "17 Agu 2026, 10:05 WIB",
    permissions: ["dashboard", "news", "gallery", "umkm", "tourism", "agriculture", "bumdes"]
  },
  {
    id: "usr-4",
    username: "keuangan",
    name: "Ratna Kusuma, S.E",
    email: "keuangan@desasukamaju.id",
    role: "OPERATOR_KEUANGAN",
    position: "Kaur Keuangan & Perencanaan",
    password: "keuangan123",
    phone: "0819-4455-6677",
    status: "ACTIVE",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    lastLogin: "16 Agu 2026, 16:45 WIB",
    permissions: ["dashboard", "programs", "bansos", "bumdes", "reports"]
  }
];

// ==========================================
// 1. DATA BANSOS & BLT DANA DESA (KPM)
// ==========================================
export const initialBansosKPM = [
  {
    id: "kpm-1",
    nik: "3201121504820001",
    nokk: "3201120101200001",
    name: "Asep Suryana",
    dusun: "Dusun Pasirjati",
    rt: "02",
    rw: "01",
    desil: "Desil 1 (Sangat Miskin)",
    program: "BLT Dana Desa (BLT-DD)",
    amount: 300000,
    status: "TERVERIFIKASI",
    period: "Tahap 3 (Juli - September 2026)",
    bankAccount: "Tunai di Balai Desa",
    notes: "Keluarga lansia tunggal tanpa penghasilan tetap",
    phone: "081234567890"
  },
  {
    id: "kpm-2",
    nik: "3201122008750002",
    nokk: "3201120101200002",
    name: "Ujang Suherman",
    dusun: "Dusun Sukarame",
    rt: "04",
    rw: "02",
    desil: "Desil 1 (Sangat Miskin)",
    program: "BLT Dana Desa (BLT-DD)",
    amount: 300000,
    status: "TERVERIFIKASI",
    period: "Tahap 3 (Juli - September 2026)",
    bankAccount: "Tunai di Balai Desa",
    notes: "Kepala keluarga sakit menahun, tanggungan 3 anak",
    phone: "081399881122"
  },
  {
    id: "kpm-3",
    nik: "3201120509800003",
    nokk: "3201120101200003",
    name: "Maman Firmansyah",
    dusun: "Dusun Pasirjati",
    rt: "01",
    rw: "01",
    desil: "Desil 2 (Tidak Mampu)",
    program: "Program Keluarga Harapan (PKH)",
    amount: 750000,
    status: "TERVERIFIKASI",
    period: "Tahap 3 T.A. 2026",
    bankAccount: "Bank Himbara (BNI)",
    notes: "Memiliki komponen anak sekolah SD & Balita",
    phone: "085277889900"
  },
  {
    id: "kpm-4",
    nik: "3201121111900004",
    nokk: "3201120101200004",
    name: "Dedih Sunandar",
    dusun: "Dusun Cikembar",
    rt: "07",
    rw: "03",
    desil: "Desil 2 (Tidak Mampu)",
    program: "Bantuan Pangan Non Tunai (BPNT / Sembako)",
    amount: 200000,
    status: "TERVERIFIKASI",
    period: "Agustus 2026",
    bankAccount: "E-Warong Desa",
    notes: "Penyaluran komoditas beras & telur di e-Warong BUMDes",
    phone: "087811223344"
  },
  {
    id: "kpm-5",
    nik: "3201122512880005",
    nokk: "3201120101200005",
    name: "Kosasih Pratama",
    dusun: "Dusun Mekar",
    rt: "09",
    rw: "04",
    desil: "Desil 3 (Kurang Mampu)",
    program: "Beras Cadangan Pangan Pemerintah (CPP 10 Kg)",
    amount: 0,
    status: "TERVERIFIKASI",
    period: "Agustus 2026",
    bankAccount: "Beras Fisik 10 Kg",
    notes: "Penyaluran beras Bulog di Balai Desa",
    phone: "089655667788"
  }
];

// ==========================================
// 2. DATA e-POSYANDU & STUNTING
// ==========================================
export const initialPosyanduData = {
  schedules: [
    {
      id: "sch-1",
      posyanduName: "Posyandu Melati 1",
      dusun: "Dusun Pasirjati (RW 01 & RW 02)",
      date: "2026-08-25",
      time: "08:30 - 11:30 WIB",
      location: "Balai RW 01 Pasirjati",
      agenda: "Penimbangan BB/TB Balita, Imunisasi Polio/DPT, & PMT Biskuit Gizi",
      cadreLeader: "Ibu Nurul Aini",
      phone: "0812-8877-6655"
    },
    {
      id: "sch-2",
      posyanduName: "Posyandu Mawar 2",
      dusun: "Dusun Sukarame (RW 04 & RW 05)",
      date: "2026-08-27",
      time: "08:30 - 11:30 WIB",
      location: "Posyandu Mawar Sukarame",
      agenda: "Pemeriksaan Ibu Hamil, Timbang Balita, & Vitamin A Merah/Biru",
      cadreLeader: "Ibu Siti Fatimah",
      phone: "0813-2233-4455"
    },
    {
      id: "sch-3",
      posyanduName: "Posyandu Anggrek 3",
      dusun: "Dusun Cikembar (RW 06 & RW 07)",
      date: "2026-09-02",
      time: "09:00 - 12:00 WIB",
      location: "Aula Madrasah Dusun Cikembar",
      agenda: "Pemeriksaan Kesehatan Lansia & Penimbangan Balita Rutin",
      cadreLeader: "Ibu Dewi Kurnia",
      phone: "0852-9988-1122"
    }
  ],
  toddlers: [
    {
      id: "tod-1",
      nik: "3201125501240001",
      name: "Muhammad Rizky Pratama",
      gender: "Laki-laki",
      birthDate: "2024-01-15",
      parentName: "Asep Suryana & Nurhasanah",
      dusun: "Dusun Pasirjati",
      rt: "02",
      rw: "01",
      weight: 12.4, // kg
      height: 88.5, // cm
      status: "GIZI_BAIK", // GIZI_BAIK, BERISIKO_STUNTING, STUNTING, GIZI_LEBIH
      headCircumference: 47.0,
      vitA: true,
      immunization: "Lengkap",
      lastCheck: "2026-08-10",
      notes: "Pertumbuhan sangat baik, nafsu makan stabil"
    },
    {
      id: "tod-2",
      nik: "3201126005230002",
      name: "Aisyah Putri Azzahra",
      gender: "Perempuan",
      birthDate: "2023-05-20",
      parentName: "Ujang Suherman & Rina",
      dusun: "Dusun Sukarame",
      rt: "04",
      rw: "02",
      weight: 9.8,
      height: 79.2,
      status: "BERISIKO_STUNTING",
      headCircumference: 44.5,
      vitA: true,
      immunization: "Lengkap",
      lastCheck: "2026-08-12",
      notes: "Tinggi badan di bawah kurva standar WHO, diberikan PMT telur & susu harian"
    },
    {
      id: "tod-3",
      nik: "3201124211240003",
      name: "Kenzo Alfarizi",
      gender: "Laki-laki",
      birthDate: "2024-11-02",
      parentName: "Maman Firmansyah & Eni",
      dusun: "Dusun Pasirjati",
      rt: "01",
      rw: "01",
      weight: 10.2,
      height: 77.0,
      status: "GIZI_BAIK",
      headCircumference: 45.2,
      vitA: true,
      immunization: "Lengkap",
      lastCheck: "2026-08-10",
      notes: "Perkembangan motorik lancar"
    }
  ],
  pregnantMothers: [
    {
      id: "preg-1",
      nik: "3201126508980001",
      name: "Ibu Lilis Suryani",
      husbandName: "Hendra Gunawan",
      dusun: "Dusun Sukarame",
      gestationalAge: "28 Minggu (Trimester 3)",
      hbLevel: "11.8 g/dL (Normal)",
      riskStatus: "NORMAL",
      phone: "0812-7788-9900",
      notes: "Rutin minum tablet tambah darah (TTD)"
    },
    {
      id: "preg-2",
      nik: "3201124403010002",
      name: "Ibu Siti Maimunah",
      husbandName: "Dedi Wahyudi",
      dusun: "Dusun Cikembar",
      gestationalAge: "14 Minggu (Trimester 2)",
      hbLevel: "9.5 g/dL (Anemia Ringan)",
      riskStatus: "RESTI (Risiko Tinggi)",
      phone: "0853-4455-6677",
      notes: "Diberikan suplemen zat besi ekstra dan pendampingan bidan desa"
    }
  ]
};

// ==========================================
// 3. DATA PERTANIAN & POKTAN
// ==========================================
export const initialAgricultureData = {
  poktanList: [
    {
      id: "pok-1",
      name: "Kelompok Tani 'Maju Bersama'",
      leader: "H. Sukirman",
      dusun: "Dusun Pasirjati",
      membersCount: 48,
      areaHectares: 32.5,
      mainCrop: "Padi Sawah (Ciherang & Inpari 32)",
      fertilizerQuota: {
        urea: "16.2 Ton",
        npk: "12.0 Ton",
        organik: "8.5 Ton"
      },
      phone: "0812-3344-5566"
    },
    {
      id: "pok-2",
      name: "Kelompok Tani 'Tani Makmur'",
      leader: "Bpk. Dadan Ramdani",
      dusun: "Dusun Sukarame",
      membersCount: 36,
      areaHectares: 24.0,
      mainCrop: "Hortikultura (Cabai Merah & Tomat)",
      fertilizerQuota: {
        urea: "8.5 Ton",
        npk: "14.2 Ton",
        organik: "10.0 Ton"
      },
      phone: "0813-7788-9900"
    },
    {
      id: "pok-3",
      name: "Kelompok Tani 'Sumber Rezeki'",
      leader: "Bpk. Wahidin",
      dusun: "Dusun Cikembar",
      membersCount: 29,
      areaHectares: 18.5,
      mainCrop: "Palawija (Jagung Hibrida & Kedelai)",
      fertilizerQuota: {
        urea: "7.0 Ton",
        npk: "9.0 Ton",
        organik: "6.0 Ton"
      },
      phone: "0852-1144-7788"
    }
  ],
  marketPrices: [
    { id: "prc-1", commodity: "Gabah Kering Panen (GKP)", price: 7200, unit: "Kg", trend: "up", change: "+Rp 200", lastUpdate: "18 Agu 2026" },
    { id: "prc-2", commodity: "Beras Medium IR64", price: 13500, unit: "Kg", trend: "stable", change: "Rp 0", lastUpdate: "18 Agu 2026" },
    { id: "prc-3", commodity: "Cabai Merah Keriting", price: 42000, unit: "Kg", trend: "down", change: "-Rp 3.000", lastUpdate: "18 Agu 2026" },
    { id: "prc-4", commodity: "Bawang Merah Lokal", price: 32000, unit: "Kg", trend: "stable", change: "Rp 0", lastUpdate: "18 Agu 2026" },
    { id: "prc-5", commodity: "Jagung Pipil Kering", price: 5800, unit: "Kg", trend: "up", change: "+Rp 300", lastUpdate: "18 Agu 2026" },
    { id: "prc-6", commodity: "Telur Ayam Ras", price: 28500, unit: "Kg", trend: "stable", change: "Rp 0", lastUpdate: "18 Agu 2026" }
  ]
};

// ==========================================
// 4. DATA BUMDES & UNIT USAHA DESA
// ==========================================
export const initialBumdesData = {
  name: "BUMDes 'Sukamaju Sejahtera'",
  director: "Drs. Hendra Setiawan, M.M",
  establishedYear: 2021,
  totalCapital: 350000000,
  netProfitYTD: 68500000,
  padesContribution: 45000000,
  units: [
    {
      id: "bu-1",
      name: "Unit Air Bersih Desa (PAMSIMAS Tirta Mandiri)",
      category: "Jasa Air Bersih & Sanitasi",
      customersCount: 420,
      monthlyRevenue: 18500000,
      monthlyExpenses: 8200000,
      netProfit: 10300000,
      status: "AKTIF_PRODUKTIF",
      description: "Menyalurkan air bersih layak konsumsi dengan sistem meteran digital ke 420 rumah tangga di Dusun Pasirjati dan Sukarame."
    },
    {
      id: "bu-2",
      name: "Unit Pengelolaan Sampah & Bank Sampah 'Resik Berkah'",
      category: "Lingkungan & Daur Ulang",
      customersCount: 310,
      monthlyRevenue: 9200000,
      monthlyExpenses: 5400000,
      netProfit: 3800000,
      status: "AKTIF_PRODUKTIF",
      description: "Layanan angkutan sampah terjadwal dan pengolahan pupuk kompos organik dari limbah rumah tangga."
    },
    {
      id: "bu-3",
      name: "Unit Kios Sarana Pertanian & Pupuk Desa",
      category: "Perdagangan Saprotan",
      customersCount: 115,
      monthlyRevenue: 24000000,
      monthlyExpenses: 19500000,
      netProfit: 4500000,
      status: "AKTIF_PRODUKTIF",
      description: "Penyedia benih unggul, obat pertanian, dan penyaluran pupuk resmi kelompok tani."
    },
    {
      id: "bu-4",
      name: "Unit Pengelolaan Wisata Curug Luhur & Balai Pertemuan",
      category: "Pariwisata & Jasa Sewa",
      customersCount: 850,
      monthlyRevenue: 15800000,
      monthlyExpenses: 6900000,
      netProfit: 8900000,
      status: "AKTIF_PRODUKTIF",
      description: "Tiket wisata alam air terjun, sewa gazebo, dan penyewaan gedung serbaguna desa untuk hajatan."
    }
  ]
};

// ==========================================
// 5. DATA PETA INTERAKTIF DESA (WebGIS)
// ==========================================
export const initialVillageAmenities = [
  { id: "gis-1", name: "Kantor Balai Desa Sukamaju Mandiri", category: "Pemerintahan", x: 50, y: 48, dusun: "Dusun Pasirjati", icon: "Building", description: "Pusat pelayanan administrasi & kantor kepala desa" },
  { id: "gis-2", name: "Puskesmas Pembantu (Pustu / Poskesdes)", category: "Kesehatan", x: 47, y: 53, dusun: "Dusun Pasirjati", icon: "HeartPulse", description: "Pelayanan rawat jalan, imunisasi, dan persalinan 24 jam" },
  { id: "gis-3", name: "SD Negeri 01 Sukamaju", category: "Pendidikan", x: 42, y: 40, dusun: "Dusun Pasirjati", icon: "GraduationCap", description: "Sekolah Dasar Negeri akreditasi A" },
  { id: "gis-4", name: "SMP Negeri 2 Satu Atap", category: "Pendidikan", x: 72, y: 35, dusun: "Dusun Sukarame", icon: "GraduationCap", description: "Pendidikan menengah pertama desa" },
  { id: "gis-5", name: "Masjid Jami' Al-Hidayah", category: "Ibadah", x: 53, y: 44, dusun: "Dusun Pasirjati", icon: "Moon", description: "Masjid agung pusat kegiatan keagamaan warga" },
  { id: "gis-6", name: "Pasar Tradisional & Lapak BUMDes", category: "Ekonomi", x: 55, y: 58, dusun: "Dusun Pasirjati", icon: "ShoppingBag", description: "Pasar desa buka setiap Selasa & Jumat" },
  { id: "gis-7", name: "Destinasi Wisata Curug Luhur", category: "Wisata", x: 82, y: 78, dusun: "Dusun Cikembar", icon: "Palmtree", description: "Air terjun alami dengan pemandian air dingin & camping ground" },
  { id: "gis-8", name: "Gedung Olahraga & Lapangan Sepakbola", category: "Fasilitas Umum", x: 38, y: 62, dusun: "Dusun Pasirjati", icon: "Award", description: "Fasilitas olahraga dan pusat peringatan HUT RI" },
  { id: "gis-9", name: "Pos Kamling & Gardu Ronda Dusun Mekar", category: "Keamanan", x: 22, y: 30, dusun: "Dusun Mekar", icon: "ShieldCheck", description: "Pos ronda siaga trantibum warga" },
  { id: "gis-10", name: "Unit Pengolahan Sampah BUMDes", category: "Lingkungan", x: 78, y: 22, dusun: "Dusun Cikembar", icon: "RefreshCw", description: "Pusat daur ulang sampah & pupuk organik" }
];

// ==========================================
// 6. DATA LOG PANGGILAN DARURAT (PANIC BUTTON)
// ==========================================
export const initialEmergencyLogs = [
  {
    id: "emg-1",
    callerName: "Bpk. Wahyudi",
    phone: "0812-9900-1122",
    emergencyType: "MEDIS_AMBULANS",
    location: "Dusun Pasirjati RW 02 RT 03",
    description: "Warga lansia sesak nafas mendadak, membutuhkan ambulans desa ke RSUD.",
    timestamp: "18 Agu 2026, 21:40 WIB",
    status: "SELESAI_TERTANGANI",
    handledBy: "Bidan Nurlaela & Driver Mobil Siaga"
  },
  {
    id: "emg-2",
    callerName: "Ibu Kartini",
    phone: "0852-3344-5566",
    emergencyType: "POHON_TUMBANG",
    location: "Jalan Dusun Cikembar RW 07",
    description: "Pohon kelapa roboh menutupi jalan desa akibat hujan angin.",
    timestamp: "17 Agu 2026, 17:15 WIB",
    status: "SELESAI_TERTANGANI",
    handledBy: "Linmas Desa & Warga Gotong Royong"
  }
];

// ==========================================
// 7. DATA PERTANAHAN & BUKU LETTER C (OPENSID)
// ==========================================
export const initialLandData = {
  letterCList: [
    {
      id: "c-001",
      kohirNumber: "1042",
      ownerName: "H. Abdul Wahab",
      currentOwner: "H. Abdul Wahab",
      persilNumber: "24",
      block: "Blok Pasir 1",
      areaM2: 2450,
      landClass: "S.I (Sawah Kelas I)",
      taxNumber: "32.04.150.002.024-0012.0",
      status: "Hak Milik (Letter C Asli)",
      mutations: [
        { date: "12 Januari 1998", cause: "Waris dari alm. H. Abdullah", luasM2: 2450, noBAP: "BAP-01/1998" }
      ]
    },
    {
      id: "c-002",
      kohirNumber: "1158",
      ownerName: "Siti Masitoh",
      currentOwner: "Dadan Ramdani (Beli)",
      persilNumber: "36",
      block: "Blok Babakan",
      areaM2: 1200,
      landClass: "D.II (Darat Kelas II / Pekarangan)",
      taxNumber: "32.04.150.002.036-0045.0",
      status: "Akta Jual Beli (AJB PPAT)",
      mutations: [
        { date: "15 Mei 2018", cause: "Jual Beli ke Dadan Ramdani", luasM2: 1200, noBAP: "AJB No. 44/2018" }
      ]
    },
    {
      id: "c-003",
      kohirNumber: "0890",
      ownerName: "Wawan Hermawan",
      currentOwner: "Wawan Hermawan",
      persilNumber: "18",
      block: "Blok Sawah Lega",
      areaM2: 3600,
      landClass: "S.II (Sawah Kelas II)",
      taxNumber: "32.04.150.002.018-0099.0",
      status: "Sertifikat Hak Milik (SHM No. 412)",
      mutations: [
        { date: "20 Agustus 2005", cause: "Konversi Letter C ke SHM", luasM2: 3600, noBAP: "BPN-08/2005" }
      ]
    },
    {
      id: "c-004",
      kohirNumber: "1420",
      ownerName: "Ujang Koswara",
      currentOwner: "Ujang Koswara",
      persilNumber: "52",
      block: "Blok Cikembar Hilir",
      areaM2: 850,
      landClass: "D.I (Darat Kelas I)",
      taxNumber: "32.04.150.002.052-0018.0",
      status: "Hak Milik Adat (Girik)",
      mutations: []
    }
  ],
  kasDesaList: [
    {
      id: "tkd-1",
      name: "Tanah Bengkok Kepala Desa",
      location: "Dusun Pasirjati Blok 01",
      areaM2: 15000,
      peruntukan: "Bengkok Kades / Pertanian Padi",
      certificate: "Hak Pakai Pemdes No. 01/Sukamaju",
      annualIncome: "Rp 18.000.000 (Sewa Musim)",
      manager: "Pemerintah Desa"
    },
    {
      id: "tkd-2",
      name: "Tanah Lapangan Olahraga & Gedung Serbaguna",
      location: "Dusun Pasirjati RW 02",
      areaM2: 8000,
      peruntukan: "Fasilitas Publik & Olahraga Desa",
      certificate: "Sertifikat Hak Pakai No. 04",
      annualIncome: "Fasilitas Gratis Masyarakat",
      manager: "BUMDes Unit Pariwisata"
    },
    {
      id: "tkd-3",
      name: "Tanah Makam Umum Desa (TPU)",
      location: "Dusun Cikembar RW 08",
      areaM2: 6500,
      peruntukan: "Tempat Pemakaman Umum",
      certificate: "Tanah Kas Desa Register No. 12",
      annualIncome: "Sosial Keagamaan",
      manager: "Lembaga LPMD"
    }
  ]
};

// ==========================================
// 8. DATA LEMBAGA KEMASYARAKATAN DESA (OPENSID LKD)
// ==========================================
export const initialLembagaData = [
  {
    id: "lkd-1",
    name: "Badan Permusyawaratan Desa (BPD)",
    code: "BPD",
    leader: "Drs. M. Taufik Hidayat",
    secretary: "Ahmad Suhendar, S.Pd",
    membersCount: 9,
    address: "Sekretariat BPD Kantor Balai Desa",
    legalBasis: "SK Bupati No. 140/Kep.88-DPMD/2021",
    description: "Lembaga legislatif dan penampung aspirasi masyarakat desa."
  },
  {
    id: "lkd-2",
    name: "Lembaga Pemberdayaan Masyarakat Desa (LPMD)",
    code: "LPMD",
    leader: "Ir. H. Gunawan",
    secretary: "Yusuf Maulana",
    membersCount: 15,
    address: "Balai Pertemuan Warga Pasirjati",
    legalBasis: "SK Kades No. 141/04/DS/2022",
    description: "Mitra pemerintah desa dalam perencanaan dan pelaksanaan pembangunan fisik gotong royong."
  },
  {
    id: "lkd-3",
    name: "Pemberdayaan Kesejahteraan Keluarga (PKK)",
    code: "TP-PKK",
    leader: "Hj. Endang Rahmawati",
    secretary: "Siti Maryam, S.Tr.Keb",
    membersCount: 35,
    address: "Gedung Posyandu Melati Indah",
    legalBasis: "SK Kades No. 141/08/DS/2021",
    description: "Gerakan pemberdayaan perempuan, kesehatan keluarga, dan penanggulangan stunting balita."
  },
  {
    id: "lkd-4",
    name: "Karang Taruna 'Kusuma Bangsa'",
    code: "KARANG_TARUNA",
    leader: "Rian Firmansyah, S.Kom",
    secretary: "Dimas Anggara",
    membersCount: 42,
    address: "Sekretariat Pemuda Balai RW 02",
    legalBasis: "SK Kades No. 141/12/DS/2023",
    description: "Wadah kepemudaan, inovasi digital desa, olahraga, dan tanggap bencana sosial."
  },
  {
    id: "lkd-5",
    name: "Satuan Perlindungan Masyarakat (Satlinmas)",
    code: "SATLINMAS",
    leader: "Komandan Regu: Endang Suherman",
    secretary: "Dede Suryadi",
    membersCount: 24,
    address: "Posko Linmas Kantor Desa",
    legalBasis: "SK Kades No. 141/15/DS/2022",
    description: "Pengamanan ketertiban masyarakat, pos ronda 24 jam, dan siaga evakuasi kebencanaan."
  }
];
