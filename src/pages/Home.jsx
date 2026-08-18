import React from 'react';
import { 
  ArrowRight, 
  FileText, 
  ShoppingBag, 
  Palmtree, 
  MessageSquare, 
  Users, 
  Building, 
  MapPin, 
  Sparkles, 
  Calendar, 
  Star, 
  Phone, 
  ChevronRight 
} from 'lucide-react';

export default function Home({ 
  profile, 
  newsList, 
  umkmList, 
  tourismList, 
  galleryList, 
  setActivePage, 
  onOpenServiceModal, 
  onOpenTracking, 
  onSelectNews, 
  onSelectUmkm 
}) {
  const featuredNews = newsList.slice(0, 3);
  const featuredUmkm = umkmList.slice(0, 3);
  const featuredTourism = tourismList.slice(0, 3);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="hero-wrapper">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-badge">
                <Sparkles size={16} color="#6ee7b7" />
                <span>Portal Resmi Smart Village</span>
              </div>
              <h1 className="hero-title">
                Membangun Desa Pintar, <span>Sejahtera & Berdaya</span>
              </h1>
              <p className="hero-desc">
                {profile?.tagline || 'Selamat datang di pusat layanan digital terpadu Desa Sukamaju Mandiri. Nikmati kemudahan pembuatan surat administrasi online, jelajahi produk unggulan UMKM lokal, dan temukan pesona wisata asri desa kami.'}
              </p>

              <div className="hero-cta">
                <button 
                  className="btn btn-accent btn-lg"
                  onClick={() => onOpenServiceModal('SKU')}
                >
                  <FileText size={18} /> Layanan Surat Online
                </button>
                <button 
                  className="btn btn-outline-white btn-lg"
                  onClick={() => { setActivePage('umkm'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  <ShoppingBag size={18} /> Produk UMKM Desa
                </button>
              </div>

              <div className="hero-quick-features">
                <div className="quick-feature-item">
                  <span className="quick-feature-icon">✓</span> Layanan Online 24 Jam
                </div>
                <div className="quick-feature-item">
                  <span className="quick-feature-icon">✓</span> Transparansi Informasi
                </div>
                <div className="quick-feature-item">
                  <span className="quick-feature-icon">✓</span> Bebas Pungutan Liar
                </div>
              </div>
            </div>

            {/* Right Card: Sambutan Kepala Desa */}
            <div>
              <div className="hero-card-preview">
                <div className="head-speech-card">
                  <div className="head-avatar-wrap">
                    <img 
                      src={profile?.headOfVillage?.photo} 
                      alt={profile?.headOfVillage?.name} 
                      className="head-avatar"
                    />
                    <div className="head-info">
                      <h3>{profile?.headOfVillage?.name}</h3>
                      <p>{profile?.headOfVillage?.title} ({profile?.headOfVillage?.period})</p>
                    </div>
                  </div>
                  <div className="head-quote">
                    "{profile?.headOfVillage?.welcomeSpeech}"
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      className="btn btn-sm btn-outline-white"
                      onClick={() => { setActivePage('profile'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    >
                      Profil Selengkapnya <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK ACTION BAR */}
      <div className="container quick-action-bar">
        <div className="quick-action-grid">
          <div className="quick-action-card" onClick={() => onOpenServiceModal('SKU')}>
            <div className="quick-icon-wrap icon-green">
              <FileText size={24} />
            </div>
            <div className="quick-action-text">
              <h4>Layanan Mandiri</h4>
              <p>Ajukan surat keterangan online</p>
            </div>
          </div>

          <div className="quick-action-card" onClick={onOpenTracking}>
            <div className="quick-icon-wrap icon-blue">
              <Sparkles size={24} />
            </div>
            <div className="quick-action-text">
              <h4>Lacak Resi Surat</h4>
              <p>Cek progres surat real-time</p>
            </div>
          </div>

          <div className="quick-action-card" onClick={() => { setActivePage('umkm'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="quick-icon-wrap icon-amber">
              <ShoppingBag size={24} />
            </div>
            <div className="quick-action-text">
              <h4>Katalog UMKM</h4>
              <p>Dukung ekonomi warga lokal</p>
            </div>
          </div>

          <div className="quick-action-card" onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="quick-icon-wrap icon-purple">
              <MessageSquare size={24} />
            </div>
            <div className="quick-action-text">
              <h4>Aspirasi & Lapor</h4>
              <p>Kirim masukan ke Pemdes</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DESA STATISTICS */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-badge">Statistik & Data Wilayah</span>
            <h2 className="section-title">Desa Sukamaju Mandiri Dalam Angka</h2>
            <p className="section-subtitle">Data kependudukan dan potensi terkini yang selalu diperbarui secara transparan</p>
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-icon"><Users size={28} /></div>
              <div className="stat-data">
                <h3>{profile?.stats?.population?.toLocaleString('id-ID')}</h3>
                <p>Total Penduduk Jiwa</p>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon" style={{ background: '#ccfbf1', color: '#0f766e' }}><Building size={28} /></div>
              <div className="stat-data">
                <h3>{profile?.stats?.households?.toLocaleString('id-ID')}</h3>
                <p>Kepala Keluarga (KK)</p>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}><ShoppingBag size={28} /></div>
              <div className="stat-data">
                <h3>{profile?.stats?.umkmActive}</h3>
                <p>UMKM Aktif Desa</p>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon" style={{ background: '#ede9fe', color: '#7c3aed' }}><Palmtree size={28} /></div>
              <div className="stat-data">
                <h3>{profile?.stats?.tourismSpots}</h3>
                <p>Destinasi Wisata</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BERITA & KEGIATAN TERBARU */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-badge">Kabar & Informasi</span>
              <h2 className="section-title" style={{ margin: 0 }}>Berita & Pengumuman Desa</h2>
            </div>
            <button 
              className="btn btn-secondary"
              onClick={() => { setActivePage('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              Lihat Semua Berita <ArrowRight size={16} />
            </button>
          </div>

          <div className="card-grid">
            {featuredNews.map((item) => (
              <div key={item.id} className="card" onClick={() => onSelectNews(item)} style={{ cursor: 'pointer' }}>
                <div className="card-img-wrap">
                  <img src={item.image} alt={item.title} className="card-img" />
                  <div className="card-badge-top">
                    <span className="badge badge-info">{item.category}</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-meta">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={14} /> {item.date}
                    </span>
                    <span>•</span>
                    <span>{item.author}</span>
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.summary}</p>
                  <div className="card-footer" style={{ border: 'none', padding: 0 }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      Baca Selengkapnya <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRODUK UMKM UNGGULAN */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-badge">Ekonomi Kreatif</span>
              <h2 className="section-title" style={{ margin: 0 }}>Produk Unggulan UMKM Desa</h2>
            </div>
            <button 
              className="btn btn-secondary"
              onClick={() => { setActivePage('umkm'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              Katalog Lengkap UMKM <ArrowRight size={16} />
            </button>
          </div>

          <div className="card-grid">
            {featuredUmkm.map((item) => (
              <div key={item.id} className="card" onClick={() => onSelectUmkm(item)} style={{ cursor: 'pointer' }}>
                <div className="card-img-wrap">
                  <img src={item.image} alt={item.name} className="card-img" />
                  {item.badge && (
                    <div className="card-badge-top">
                      <span className="badge badge-warning">★ {item.badge}</span>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <span className="badge badge-neutral" style={{ alignSelf: 'flex-start', marginBottom: '0.5rem' }}>
                    {item.category}
                  </span>
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-desc">{item.description}</p>
                  
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    Penjual: <strong>{item.owner}</strong>
                  </div>

                  <div className="card-footer">
                    <div className="price-tag">
                      {formatRupiah(item.price)}
                      <span>/{item.unit || 'pcs'}</span>
                    </div>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={(e) => { e.stopPropagation(); onSelectUmkm(item); }}
                    >
                      Detail & Pesan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WISATA DESA HIGHLIGHT */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-badge">Pesona Alam</span>
              <h2 className="section-title" style={{ margin: 0 }}>Destinasi Wisata Pilihan</h2>
            </div>
            <button 
              className="btn btn-secondary"
              onClick={() => { setActivePage('tourism'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              Semua Tempat Wisata <ArrowRight size={16} />
            </button>
          </div>

          <div className="card-grid">
            {featuredTourism.map((item) => (
              <div key={item.id} className="card">
                <div className="card-img-wrap">
                  <img src={item.image} alt={item.name} className="card-img" />
                  {item.highlight && (
                    <div className="card-badge-top">
                      <span className="badge badge-success">🌿 {item.highlight}</span>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge badge-info">{item.category}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 700, fontSize: '0.85rem', color: '#d97706' }}>
                      <Star size={14} fill="#d97706" /> {item.rating}
                    </span>
                  </div>
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-desc">{item.description}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <MapPin size={14} color="#059669" /> {item.location}
                  </div>

                  <div className="card-footer">
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Tiket Masuk:</span>
                      <strong style={{ color: '#059669', fontSize: '1.1rem' }}>
                        {item.ticketPrice === 0 ? 'Gratis' : formatRupiah(item.ticketPrice)}
                      </strong>
                    </div>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => { setActivePage('tourism'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    >
                      Info Lengkap
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA PENGADUAN & LAYANAN MANDIRI */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #064e3b, #0f172a)', color: '#fff' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <span className="badge badge-warning" style={{ marginBottom: '1rem' }}>
            Pelayanan Cepat & Transparan
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
            Butuh Surat Keterangan atau Ingin Menyampaikan Aspirasi?
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Hemat waktu Anda tanpa perlu mengantre lama di kantor desa. Ajukan surat pengantar secara mandiri atau laporkan kendala fasilitas di lingkungan Anda secara langsung ke perangkat desa.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-accent btn-lg" onClick={() => onOpenServiceModal('SKU')}>
              <FileText size={18} /> Buat Surat Sekarang
            </button>
            <button className="btn btn-outline-white btn-lg" onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <MessageSquare size={18} /> Kirim Aspirasi Warga
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
