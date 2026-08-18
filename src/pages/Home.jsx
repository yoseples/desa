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
  const featuredTourism = tourismList.slice(0, 2);

  const allCitizens = StorageService.getAllCitizens();
  const families = StorageService.getFamilies();

  const totalCitizensCount = allCitizens.length > 0 ? allCitizens.length : profile?.stats?.population;
  const totalFamiliesCount = families.length > 0 ? families.length : profile?.stats?.households;

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
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

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#a7f3d0', fontWeight: 600 }}>
                      Pemerintah Desa Sukamaju Mandiri
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
                <p>SKU, SKTM, Domisili, dll.</p>
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
                <h3>{profile?.stats?.umkmActive || 42}</h3>
                <p>Unit UMKM Binaan</p>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon" style={{ background: '#ccfbf1', color: '#0f766e' }}>
                <Palmtree size={24} />
              </div>
              <div className="stat-data">
                <h3>{profile?.stats?.tourismSpots || 4}</h3>
                <p>Destinasi Wisata</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BERITA TERBARU DESA */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-badge">
                <Newspaper size={13} /> Warta Desa
              </span>
              <h2 className="section-title" style={{ margin: 0 }}>Kabar & Informasi Terkini</h2>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setActivePage('news')}
            >
              Lihat Semua Berita <ArrowRight size={15} />
            </button>
          </div>

          <div className="card-grid">
            {featuredNews.map((article) => (
              <div 
                key={article.id} 
                className="card"
                onClick={() => onSelectNews(article)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-img-wrap">
                  <img src={article.image} alt={article.title} className="card-img" />
                  <div className="card-badge-top">
                    <span className="badge badge-success">{article.category}</span>
                  </div>
                </div>

                <div className="card-body">
                  <div className="card-meta">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.author}</span>
                  </div>
                  <h3 className="card-title">{article.title}</h3>
                  <p className="card-desc">{article.summary}</p>
                  <div className="card-footer">
                    <span style={{ fontSize: '0.825rem', color: 'var(--primary)', fontWeight: 700 }}>
                      Baca Selengkapnya →
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      👁 {article.views} pembaca
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ETALASE PRODUK UMKM UNGGULAN */}
      <section className="section" style={{ background: '#ffffff', borderTop: '1px solid var(--light-border)', borderBottom: '1px solid var(--light-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-badge">
                <ShoppingBag size={13} /> Potensi Ekonomi
              </span>
              <h2 className="section-title" style={{ margin: 0 }}>Produk Unggulan UMKM Desa</h2>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setActivePage('umkm')}
            >
              Katalog Lengkap UMKM <ArrowRight size={15} />
            </button>
          </div>

          <div className="card-grid">
            {featuredUmkm.map((product) => (
              <div 
                key={product.id} 
                className="card"
                onClick={() => onSelectUmkm(product)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-img-wrap">
                  <img src={product.image} alt={product.name} className="card-img" />
                  {product.badge && (
                    <div className="card-badge-top">
                      <span className="badge badge-warning">★ {product.badge}</span>
                    </div>
                  )}
                </div>

                <div className="card-body">
                  <span className="badge badge-neutral" style={{ alignSelf: 'flex-start', marginBottom: '0.5rem' }}>
                    {product.category}
                  </span>
                  <h3 className="card-title">{product.name}</h3>
                  <p className="card-desc">{product.description}</p>
                  
                  <div className="card-footer">
                    <div className="price-tag">
                      {formatRupiah(product.price)}
                      <span> / {product.unit}</span>
                    </div>
                    <span style={{ fontSize: '0.825rem', color: '#059669', fontWeight: 700 }}>
                      Pesan Sekarang →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BANNER CALL TO ACTION - PELAYANAN SURAT */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #044332, #065f46)', color: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <span style={{ background: 'rgba(255,255,255,0.18)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700 }}>
                Pelayanan Mandiri Tanpa Antre
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)', fontWeight: 800, margin: '0.85rem 0 1rem', lineHeight: 1.25 }}>
                Urus Surat Keterangan Desa Kapan Saja & Di Mana Saja
              </h2>
              <p style={{ color: '#d1fae5', fontSize: '1rem', lineHeight: 1.65, marginBottom: '1.75rem' }}>
                Warga tidak perlu repot mengantre di kantor desa. Cukup isi formulir online, pantau statusnya lewat nomor resi, dan cetak surat resmi ber-Tanda Tangan Elektronik (TTE).
              </p>
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <button 
                  className="btn btn-accent btn-lg"
                  onClick={() => onOpenServiceModal('SKU')}
                >
                  <FileText size={18} /> Buat Surat Sekarang
                </button>
                <button 
                  className="btn btn-outline-white btn-lg"
                  onClick={() => setActivePage('services')}
                >
                  Lihat Semua Layanan →
                </button>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.09)', padding: '2rem', borderRadius: 'var(--radius-xl)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.18)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>Langkah Pengajuan Mandiri:</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>1</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Pilih Jenis Surat</h4>
                    <p style={{ fontSize: '0.825rem', color: '#d1fae5', margin: 0 }}>Pilih SKU, SKTM, Domisili, SKCK, atau Keterangan lainnya.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>2</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Masukkan NIK & Data Diri</h4>
                    <p style={{ fontSize: '0.825rem', color: '#d1fae5', margin: 0 }}>Ketik NIK untuk auto-fill otomatis data kependudukan Anda.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>3</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Dapatkan Resi & Pantau Proses</h4>
                    <p style={{ fontSize: '0.825rem', color: '#d1fae5', margin: 0 }}>Petugas desa memverifikasi dan menerbitkan surat resmi ber-TTE.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
