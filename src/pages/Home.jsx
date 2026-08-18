import React from 'react';
import { 
  Building2, 
  Users, 
  FileText, 
  ShoppingBag, 
  Palmtree, 
  Newspaper, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  HeartHandshake,
  TrendingUp,
  Search,
  ExternalLink,
  Star,
  MapPin,
  Clock,
  Sun,
  Activity
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function Home({ 
  profile, 
  newsList = [], 
  umkmList = [], 
  tourismList = [], 
  galleryList = [], 
  setActivePage, 
  onOpenServiceModal, 
  onOpenTracking, 
  onSelectNews, 
  onSelectUmkm 
}) {
  const featuredNews = Array.isArray(newsList) ? newsList.slice(0, 3) : [];
  const featuredUmkm = Array.isArray(umkmList) ? umkmList.slice(0, 3) : [];
  const featuredTourism = Array.isArray(tourismList) ? tourismList.slice(0, 2) : [];

  const allCitizens = StorageService.getAllCitizens() || [];
  const families = StorageService.getFamilies() || [];

  const totalCitizensCount = allCitizens.length > 0 ? allCitizens.length : (profile?.stats?.population || 4850);
  const totalFamiliesCount = families.length > 0 ? families.length : (profile?.stats?.households || 1320);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num || 0);
  };

  return (
    <div>
      {/* 1. HERO SECTION WITH MODERN AURORA EFFECT */}
      <section className="hero-wrapper">
        <div className="hero-pattern"></div>
        <div className="aurora-orb-1"></div>
        <div className="aurora-orb-2"></div>

        <div className="container">
          <div className="hero-grid">
            {/* Left Col: Main Pitch */}
            <div>
              {/* Live Status Ticker */}
              <div className="status-ticker">
                <span className="pulsing-dot"></span>
                <span>Kantor Buka • Layanan Mandiri 24 Jam • Smart Village v2.0</span>
              </div>

              <h1 className="hero-title">
                Selamat Datang di <span>{profile?.name || 'Desa Sukamaju Mandiri'}</span>
              </h1>

              <p className="hero-desc">
                {profile?.tagline || 'Maju Bersama Teknologi, Harmoni Bersama Tradisi Menuju Desa Berdaya & Sejahtera'}
              </p>

              <div className="hero-cta">
                <button 
                  className="btn btn-accent btn-lg"
                  onClick={() => onOpenServiceModal('SKU')}
                >
                  <FileText size={18} /> Ajukan Surat Mandiri
                </button>
                <button 
                  className="btn btn-outline-white btn-lg"
                  onClick={onOpenTracking}
                >
                  <Search size={18} /> Lacak Status Resi
                </button>
              </div>

              {/* Quick Checklist */}
              <div className="hero-quick-features">
                <div className="quick-feature-item">
                  <div className="quick-feature-icon">✓</div>
                  <span>Layanan Online 24 Jam</span>
                </div>
                <div className="quick-feature-item">
                  <div className="quick-feature-icon">✓</div>
                  <span>TTE Surat Sah Terverifikasi</span>
                </div>
                <div className="quick-feature-item">
                  <div className="quick-feature-icon">✓</div>
                  <span>Transparansi Kependudukan</span>
                </div>
              </div>
            </div>

            {/* Right Col: Head of Village Glassmorphic Card */}
            <div>
              <div className="hero-card-preview">
                <div className="head-speech-card">
                  <div className="head-avatar-wrap">
                    <img 
                      src={profile?.headOfVillage?.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'} 
                      alt={profile?.headOfVillage?.name || 'Kepala Desa'} 
                      className="head-avatar"
                    />
                    <div className="head-info">
                      <h3>{profile?.headOfVillage?.name || 'H. Budi Santoso, S.AP'}</h3>
                      <p>{profile?.headOfVillage?.title || 'Kepala Desa'} ({profile?.headOfVillage?.period || '2021 - 2027'})</p>
                    </div>
                  </div>

                  <div className="head-quote">
                    "{profile?.headOfVillage?.welcomeSpeech || 'Selamat datang di portal pelayanan mandiri Desa Pintar Sukamaju Mandiri.'}"
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#a7f3d0', fontWeight: 600 }}>
                      {profile?.name || 'Pemerintah Desa Sukamaju'}
                    </span>
                    <button 
                      className="btn btn-sm btn-secondary"
                      onClick={() => setActivePage('profile')}
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}
                    >
                      Lihat Visi & Misi →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK ACTION BAR (FLOATING CARDS) */}
      <div className="container">
        <div className="quick-action-bar">
          <div className="quick-action-grid">
            <div className="quick-action-card" onClick={() => onOpenServiceModal('SKU')}>
              <div className="quick-icon-wrap icon-green">
                <FileText size={22} />
              </div>
              <div className="quick-action-text">
                <h4>Surat Keterangan</h4>
                <p>SKU, SKTM, Jual Beli, dll.</p>
              </div>
            </div>

            <div className="quick-action-card" onClick={onOpenTracking}>
              <div className="quick-icon-wrap icon-blue">
                <Search size={22} />
              </div>
              <div className="quick-action-text">
                <h4>Lacak Permohonan</h4>
                <p>Cek resi surat real-time</p>
              </div>
            </div>

            <div className="quick-action-card" onClick={() => setActivePage('umkm')}>
              <div className="quick-icon-wrap icon-amber">
                <ShoppingBag size={22} />
              </div>
              <div className="quick-action-text">
                <h4>Produk UMKM</h4>
                <p>Belanja produk lokal desa</p>
              </div>
            </div>

            <div className="quick-action-card" onClick={() => setActivePage('tourism')}>
              <div className="quick-icon-wrap icon-purple">
                <Palmtree size={22} />
              </div>
              <div className="quick-action-text">
                <h4>Destinasi Wisata</h4>
                <p>Jelajahi keindahan alam</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DEMOGRAFI & STATISTIK SECTION */}
      <section className="section" style={{ background: '#ffffff', borderBottom: '1px solid var(--light-border)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-badge">
              <Activity size={13} /> Data Desa Terkini
            </span>
            <h2 className="section-title">Statistik & Kependudukan Wilayah</h2>
            <p className="section-subtitle">
              Transparansi data demografi kependudukan, potensi ekonomi warga, dan luas wilayah Desa Sukamaju Mandiri.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-icon" style={{ background: '#d1fae5', color: '#059669' }}>
                <Users size={24} />
              </div>
              <div className="stat-data">
                <h3>{totalCitizensCount?.toLocaleString('id-ID')}</h3>
                <p>Jiwa Penduduk Terdata</p>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon" style={{ background: '#e0e7ff', color: '#4338ca' }}>
                <Building2 size={24} />
              </div>
              <div className="stat-data">
                <h3>{totalFamiliesCount?.toLocaleString('id-ID')}</h3>
                <p>Kepala Keluarga (KK)</p>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
                <ShoppingBag size={24} />
              </div>
              <div className="stat-data">
                <h3>{profile?.stats?.umkmActive || umkmList?.length || 42}+</h3>
                <p>Pelaku Usaha UMKM</p>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon" style={{ background: '#fce7f3', color: '#db2777' }}>
                <Palmtree size={24} />
              </div>
              <div className="stat-data">
                <h3>{profile?.stats?.tourismSpots || tourismList?.length || 5}</h3>
                <p>Destinasi Unggulan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BERITA & PENGUMUMAN TERKINI */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-badge">Warta Desa</span>
              <h2 className="section-title" style={{ margin: '0.25rem 0 0 0' }}>Berita & Transparansi Kegiatan</h2>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setActivePage('news')}
            >
              Lihat Semua Berita <ArrowRight size={14} />
            </button>
          </div>

          <div className="card-grid">
            {featuredNews.map((news) => (
              <div 
                key={news.id} 
                className="card" 
                onClick={() => onSelectNews(news)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-img-wrap">
                  <img src={news.image} alt={news.title} />
                  <span className="badge badge-success" style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                    {news.category}
                  </span>
                </div>
                <div className="card-body">
                  <div className="card-meta">
                    <span>{news.date}</span>
                    <span>•</span>
                    <span>{news.author}</span>
                  </div>
                  <h3 className="card-title">{news.title}</h3>
                  <p className="card-desc">{news.summary}</p>
                </div>
                <div className="card-footer">
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Baca Selengkapnya <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ETALASE PRODUK UMKM DESA */}
      <section className="section" style={{ background: '#ffffff', borderTop: '1px solid var(--light-border)', borderBottom: '1px solid var(--light-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-badge">Ekonomi Kreatif</span>
              <h2 className="section-title" style={{ margin: '0.25rem 0 0 0' }}>Produk Unggulan UMKM Desa</h2>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setActivePage('umkm')}
            >
              Lihat Semua Produk <ArrowRight size={14} />
            </button>
          </div>

          <div className="card-grid">
            {featuredUmkm.map((umkm) => (
              <div 
                key={umkm.id} 
                className="card"
                onClick={() => onSelectUmkm(umkm)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-img-wrap">
                  <img src={umkm.image} alt={umkm.name} />
                  {umkm.badge && (
                    <span className="badge badge-warning" style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                      ★ {umkm.badge}
                    </span>
                  )}
                </div>
                <div className="card-body">
                  <span className="badge badge-neutral" style={{ alignSelf: 'flex-start', marginBottom: '0.5rem' }}>
                    {umkm.category}
                  </span>
                  <h3 className="card-title">{umkm.name}</h3>
                  <p className="card-desc">{umkm.description}</p>
                </div>
                <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Harga:</span>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {formatRupiah(umkm.price)}
                    </div>
                  </div>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      const text = encodeURIComponent(`Halo, saya tertarik dengan produk ${umkm.name} di website Desa Sukamaju.`);
                      window.open(`https://wa.me/${umkm.phone}?text=${text}`, '_blank');
                    }}
                  >
                    Beli via WA
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PESONA WISATA DESA */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-badge">Pesona Alam</span>
              <h2 className="section-title" style={{ margin: '0.25rem 0 0 0' }}>Destinasi Wisata Favorit</h2>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setActivePage('tourism')}
            >
              Jelajahi Wisata <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '2rem' }}>
            {featuredTourism.map((tour) => (
              <div 
                key={tour.id} 
                className="card" 
                style={{ overflow: 'hidden' }}
              >
                <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={tour.image} 
                    alt={tour.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <span className="badge badge-success" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                    {tour.highlight || tour.category}
                  </span>
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                      {tour.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#d97706', fontWeight: 700 }}>
                      <Star size={16} fill="#d97706" /> {tour.rating}
                    </div>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                    {tour.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#475569' }}>
                    <MapPin size={15} color="#059669" /> {tour.location}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--light-border)' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tiket Masuk:</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                        {formatRupiah(tour.ticketPrice)}
                      </div>
                    </div>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setActivePage('tourism')}
                    >
                      Detail Info Wisata →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION / LAYANAN MANDIRI PROMPT */}
      <section className="section" style={{ padding: '0 0 5rem 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #064e3b, #047857)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <div style={{ maxWidth: '580px' }}>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#a7f3d0', marginBottom: '0.75rem' }}>
                Layanan Desa Mandiri 24 Jam
              </span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, margin: '0 0 0.75rem 0', color: '#fff' }}>
                Butuh Surat Keterangan Tanpa Perlu Antre di Kantor Balai Desa?
              </h2>
              <p style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Gunakan layanan permohonan surat online mandiri. Cukup siapkan NIK Anda, isi data, dan pantau proses verifikasi dokumen secara langsung dari ponsel Anda.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: 'min(100%, 260px)' }}>
              <button 
                className="btn btn-accent btn-lg"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => onOpenServiceModal('SKU')}
              >
                Buat Surat Sekarang
              </button>
              <button 
                className="btn btn-outline-white btn-lg"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={onOpenTracking}
              >
                Cek Nomor Resi
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
