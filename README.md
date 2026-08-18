# 🌾 Desa Pintar (Smart Village) Portal & CMS Admin

Aplikasi Web Modern **Desa Pintar** (Smart Village) untuk tata kelola pemerintahan desa yang transparan, pelayanan administrasi kependudukan online mandiri, etalase promosi Produk UMKM & Potensi Wisata Desa, serta Dashboard Admin CMS terpadu.

Dikembangkan dan tersimpan di repository: [https://github.com/yoseples/desa](https://github.com/yoseples/desa)

---

## ✨ Fitur Utama

### 🏛️ 1. Portal Publik Warga & Wisatawan
- **Beranda (Home)**:
  - Hero banner interaktif & sambutan resmi Kepala Desa.
  - Quick actions: Pengajuan Surat, Cek Resi, Katalog UMKM, dan Pengaduan Warga.
  - Statistik desa interaktif (Total Penduduk, Kepala Keluarga, UMKM aktif, Destinasi wisata).
  - Sorotan Berita, Produk Unggulan, Wisata Favorit, dan Galeri Foto kegiatan.
- **Profil Desa**:
  - Visi & Misi Pembangunan Desa.
  - Struktur Aparatur & Pamong Desa lengkap dengan foto & kontak.
  - Sejarah singkat berdirinya desa.
  - Data Demografi & batas-batas wilayah administratif.
- **Berita & Pengumuman**:
  - Filter kategori (*Pemberdayaan, Teknologi, Kegiatan, Pengumuman, Pembangunan, Kesehatan*).
  - Pencarian artikel dan modal baca lengkap (*Full Article Reader*).
- **Galeri Desa**:
  - Album foto kegiatan gotong royong, pembangunan desa, seni budaya Sunda/Nusantara dengan fitur *Lightbox Viewer Zoom*.
- **Produk UMKM Desa**:
  - Katalog produk olahan makanan/minuman, kerajinan bambu, batik tulis, madu hutan, dll.
  - Filter kategori & sorting harga termurah/tertinggi.
  - **Direct WhatsApp Order**: Tombol pesan langsung via WhatsApp dengan pesan template otomatis terisi format pemesanan.
- **Wisata Desa**:
  - Daftar destinasi wisata alam, perkemahan sunset, agrowisata edukatif, kolam mata air alami.
  - Jam buka, harga tiket masuk, fasilitas lengkap, dan tautan rute Google Maps.
- **Layanan Mandiri & Surat Online**:
  - Formulir pengajuan Surat Keterangan Usaha (SKU), SKTM, Domisili, Pengantar SKCK, Kelahiran, Surat Pindah, dll.
  - Generator nomor resi pelacakan unik (Tracking Code, contoh: `DS-SKU-9821`).
  - Modal **Lacak Resi Surat** real-time dengan status (*Menunggu, Diproses, Disetujui, Selesai*).
  - Formulir **Aspirasi & Pengaduan Warga** langsung terkirim ke Pemdes.
- **Kontak & Lokasi**:
  - Nomor Kontak Darurat Siaga 24 Jam (*Bidan Desa, Babinsa TNI, Bhabinkamtibmas Polri, Ambulans Siaga Desa*).
  - Alamat kantor desa, jam pelayanan, form pesan kontak, dan peta Google Maps terintegrasi.

---

### 🛡️ 2. Dashboard Admin (CMS Terpadu)
- **Ringkasan & KPI Analytics**:
  - Metrik total pengajuan surat pending & selesai, jumlah laporan warga, produk UMKM, dan ringkasan aktivitas.
- **Kelola Pelayanan Surat**:
  - Tinjau seluruh permohonan surat masuk warga.
  - Ubah status (*MENUNGGU, DIPROSES, DISETUJUI, SELESAI, DITOLAK*) disertai catatan admin ke warga.
  - **Pratinjau & Cetak Surat Resmi**: Format surat keterangan resmi lengkap dengan Kop Pemda & Desa, nomor registrasi, QR Code verifikasi TTE, tanda tangan Kades, dan stempel siap cetak / simpan PDF.
- **Kelola Aspirasi & Pengaduan**:
  - Tinjau laporan masalah infrastruktur/lingkungan dari warga, ubah status, dan kirimkan respon resmi Pemdes.
- **Kelola Berita & Pengumuman**:
  - Tambah, edit, dan hapus artikel berita desa.
- **Kelola Produk UMKM**:
  - Tambah produk baru, ubah harga, nama penjual, kontak WhatsApp, deskripsi, dan foto produk.
- **Kelola Destinasi Wisata**:
  - Tambah dan edit data tempat wisata desa, fasilitas, harga tiket, dan jam buka.
- **Kelola Galeri Foto**:
  - Tambah foto dokumentasi kegiatan desa dan kelola album.
- **Pengaturan Profil Desa**:
  - Ubah nama desa, tagline, alamat, kontak, data Kepala Desa, sambutan, visi & misi, serta statistik kependudukan.

---

## 🚀 Cara Menjalankan Project

1. **Clone repository**:
   ```bash
   git clone https://github.com/yoseples/desa.git
   cd desa
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Jalankan local development server**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`.

4. **Build untuk Production**:
   ```bash
   npm run build
   ```

---

## 🛠️ Teknologi yang Digunakan
- **Frontend**: React 18, Vite
- **Icons**: Lucide React
- **Styling**: Vanilla Modern CSS (Design Tokens, Glassmorphism, Animations, Emerald Village Palette)
- **Effects**: Canvas Confetti
- **Storage**: LocalStorage State Persistence dengan Synchronous Event Dispatcher
