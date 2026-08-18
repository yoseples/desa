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

// Database Program Kerja & Transparansi APBDes Desa
export const initialWorkPrograms = [
  {
    id: "prog-1",
    title: "Pembangunan Jalan Usaha Tani & Saluran Irigasi Tersier",
    category: "Infrastruktur & Pertanian",
    budget: 185000000,
    fundingSource: "Dana Desa (DDS) T.A. 2026",
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
    fundingSource: "Dana Desa (DDS) T.A. 2026",
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
    fundingSource: "Bantuan Keuangan Provinsi (Banprov)",
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
    fundingSource: "Alokasi Dana Desa (ADD) & PADes",
    location: "Sentra Olahan Kopi Dusun Sukarame",
    schedule: "Agustus - Oktober 2026",
    status: "SEDANG_BERJALAN",
    progress: 50,
    pic: "Ahmad Fauzi, S.Kom & Pengurus BUMDes",
    description: "Pemberdayaan petani kopi lokal dengan fasilitas pengolahan pasca panen modern agar nilai jual produk olahan kopi meningkat di pasaran."
  }
];

export const initialFamiliesList = [
  {
    id: "kk-1",
    noKk: "3204150801120001",
    headName: "Bambang Sudrajat",
    address: "Kp. Pasir Salam No. 14",
    rt: "002",
    rw: "003",
    dusun: "Dusun Pasirjati",
    postalCode: "40375",
    economicStatus: "Desil 3 (Kurang Mampu)",
    bpjsStatus: "Aktif (PBI Pemerintah)",
    houseOwnership: "Milik Sendiri",
    electricity: "450 VA (Subsidi)",
    waterSource: "Sumur Gali",
    sanitation: "Jamban Sehat Pribadi",
    issueDate: "12 Januari 2020",
    members: [
      { id: "cit-1", nik: "3204151208850002", name: "Bambang Sudrajat", gender: "Laki-Laki", birthPlace: "Bandung", birthDate: "12-08-1985", religion: "Islam", education: "SMA / Sederajat", occupation: "Wiraswasta / Pemilik Warung", maritalStatus: "Kawin", relation: "Kepala Keluarga", bloodType: "O", fatherName: "Sudrajat", motherName: "Siti Aminah", phone: "081298765412" }
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
