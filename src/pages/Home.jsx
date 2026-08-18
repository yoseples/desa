import React, { useState } from 'react';
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
  Activity,
  Briefcase,
  DollarSign,
  Calendar,
  Layers,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function Home({ 
  profile, 
  workProgramsList = [],
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
  const [programFilter, setProgramFilter] = useState('ALL'); // 'ALL', 'PRIORITAS', 'SEDANG_BERJALAN', 'WAKTU_DEKAT', 'RENCANA_SELANJUTNYA'

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

  // Work Programs stats & filters
  const prioritasCount = workProgramsList.filter(p => p.status === 'PRIORITAS').length;
  const sedangBerjalanCount = workProgramsList.filter(p => p.status === 'SEDANG_BERJALAN').length;
  const waktuDekatCount = workProgramsList.filter(p => p.status === 'WAKTU_DEKAT').length;
  const rencanaNantiCount = workProgramsList.filter(p => p.status === 'RENCANA_SELANJUTNYA').length;

  const filteredPrograms = workProgramsList.filter(p => {
    if (programFilter === 'ALL') return true;
    return p.status === programFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PRIORITAS':
        return <span className="badge badge-danger" style={{ fontSize: '0.725rem', padding: '0.2rem 0.55rem', whiteSpace: 'nowrap' }}>🌟 Prioritas Utama</span>;
      case 'SEDANG_BERJALAN':
        return <span className="badge badge-success" style={{ fontSize: '0.725rem', padding: '0.2rem 0.55rem', whiteSpace: 'nowrap' }}>⏳ Sedang Dikerjakan</span>;
      case 'WAKTU_DEKAT':
        return <span className="badge badge-warning" style={{ fontSize: '0.725rem', padding: '0.2rem 0.55rem', whiteSpace: 'nowrap' }}>🗓️ Waktu Dekat</span>;
      case 'RENCANA_SELANJUTNYA':
      default:
        return <span className="badge badge-neutral" style={{ fontSize: '0.725rem', padding: '0.2rem 0.55rem', whiteSpace: 'nowrap' }}>📋 Rencana Selanjutnya</span>;
    }
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
                <span>Layanan Mandiri 24 Jam • Smart Village v2.0 • Desa Digital</span>
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
                  style={{ fontSize: '0.925rem', fontWeight: 700, padding: '0.75rem 1.35rem' }}
                >
                  <FileText size={18} /> Ajukan Surat Mandiri
                </button>
                <button 
                  className="btn btn-outline-white btn-lg"
                  onClick={onOpenTracking}
                  style={{ fontSize: '0.925rem', fontWeight: 700, padding: '0.75rem 1.35rem' }}
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
                  <span>Transparansi Anggaran APBDes</span>
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

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.35rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#a7f3d0', fontWeight: 600 }}>
                      {profile?.name || 'Pemerintah Desa Sukamaju'}
                    </span>
                    <button 
                      className="btn btn-sm btn-secondary"
                      onClick={() => setActivePage('profile')}
                      style={{ fontSize: '0.775rem', padding: '0.35rem 0.85rem', background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', fontWeight: 600 }}
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

      {/* 3. TRANSPARANSI PROGRAM KERJA & APBDes DESA */}
      <section className="section" style={{ background: 'var(--light-surface)', borderBottom: '1px solid var(--light-border)' }}>
        <div className="container">
          
          <div className="section-title-wrap" style={{ marginBottom: '1.75rem' }}>
            <span className="section-badge">
              <Briefcase size={13} /> Transparansi APBDes T.A. 2026
            </span>
            <h2 className="section-title">Program Kerja & Pembangunan Desa</h2>
            <p className="section-subtitle">
              Publikasi terbuka realisasi fisik dan alokasi anggaran Dana Desa untuk pengawasan bersama seluruh warga.
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <button
              className={`btn btn-sm ${programFilter === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
              onClick={() => setProgramFilter('ALL')}
            >
              Semua ({workProgramsList.length})
            </button>
            <button
              className={`btn btn-sm ${programFilter === 'PRIORITAS' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
              onClick={() => setProgramFilter('PRIORITAS')}
            >
              🌟 Prioritas Utama ({prioritasCount})
            </button>
            <button
              className={`btn btn-sm ${programFilter === 'SEDANG_BERJALAN' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
              onClick={() => setProgramFilter('SEDANG_BERJALAN')}
            >
              ⏳ Sedang Dikerjakan ({sedangBerjalanCount})
            </button>
            <button
              className={`btn btn-sm ${programFilter === 'WAKTU_DEKAT' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
              onClick={() => setProgramFilter('WAKTU_DEKAT')}
            >
              🗓️ Waktu Dekat ({waktuDekatCount})
            </button>
            <button
              className={`btn btn-sm ${programFilter === 'RENCANA_SELANJUTNYA' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
              onClick={() => setProgramFilter('RENCANA_SELANJUTNYA')}
            >
              📋 Rencana Selanjutnya ({rencanaNantiCount})
            </button>
          </div>

          {/* Program Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '1.25rem' }}>
            {filteredPrograms.map((prog) => (
              <div 
                key={prog.id} 
                className="card"
                style={{
                  padding: '1.35rem',
                  border: '1px solid var(--light-border)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--light-surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}
              >
                {/* Top Row: Status Badge & Category */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {getStatusBadge(prog.status)}
                  <span className="badge badge-neutral" style={{ fontSize: '0.725rem' }}>
                    {prog.category}
                  </span>
                </div>

                {/* Title */}
                <h4 style={{
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  margin: 0,
                  lineHeight: 1.38
                }}>
                  {prog.title}
                </h4>

                {/* Details List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <MapPin size={14} color="#059669" />
                    <span>Lokasi: <strong style={{ color: 'var(--text-main)' }}>{prog.location}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Calendar size={14} color="#2563eb" />
                    <span>Jadwal: <strong style={{ color: 'var(--text-main)' }}>{prog.schedule}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Layers size={14} color="#d97706" />
                    <span>Sumber: <strong style={{ color: 'var(--text-main)' }}>{prog.fundingSource}</strong></span>
                  </div>
                </div>

                {/* Bottom Row: Budget & Progress */}
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--light-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'block' }}>Alokasi Dana:</span>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: 900 }}>
                      {formatRupiah(prog.budget)}
                    </strong>
                  </div>

                  {prog.status === 'SEDANG_BERJALAN' || prog.progress > 0 ? (
                    <div style={{ width: '120px', textAlign: 'right' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16a34a' }}>
                        Fisik: {prog.progress}%
                      </span>
                      <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', marginTop: '3px' }}>
                        <div style={{ width: `${prog.progress}%`, height: '100%', background: '#10b981', borderRadius: '3px' }}></div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. DEMOGRAFI & STATISTIK SECTION */}
      <section className="section" style={{ background: 'var(--light-bg)', borderBottom: '1px solid var(--light-border)' }}>
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
                <h3>{profile?.stats?.umkmActive || (umkmList || []).length || 42}+</h3>
                <p>Pelaku Usaha UMKM</p>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon" style={{ background: '#fce7f3', color: '#db2777' }}>
                <Palmtree size={24} />
              </div>
              <div className="stat-data">
                <h3>{profile?.stats?.tourismSpots || (tourismList || []).length || 5}</h3>
                <p>Destinasi Unggulan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BERITA & PENGUMUMAN TERKINI */}
      <section className="section" style={{ background: 'var(--light-surface)', borderBottom: '1px solid var(--light-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-badge">Warta Desa</span>
              <h2 className="section-title" style={{ margin: '0.25rem 0 0 0' }}>Berita & Transparansi Kegiatan</h2>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setActivePage('news')}
              style={{ fontSize: '0.825rem', fontWeight: 600 }}
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
                  <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Baca Selengkapnya <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ETALASE PRODUK UMKM DESA */}
      <section className="section" style={{ background: 'var(--light-bg)', borderBottom: '1px solid var(--light-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-badge">Ekonomi Kreatif</span>
              <h2 className="section-title" style={{ margin: '0.25rem 0 0 0' }}>Produk Unggulan UMKM Desa</h2>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setActivePage('umkm')}
              style={{ fontSize: '0.825rem', fontWeight: 600 }}
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
                    <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Harga:</span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {formatRupiah(umkm.price)}
                    </div>
                  </div>
                  <button 
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.35rem 0.75rem' }}
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

      {/* 7. PESONA WISATA DESA */}
      <section className="section" style={{ background: 'var(--light-surface)', borderBottom: '1px solid var(--light-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-badge">Pesona Alam</span>
              <h2 className="section-title" style={{ margin: '0.25rem 0 0 0' }}>Destinasi Wisata Favorit</h2>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setActivePage('tourism')}
              style={{ fontSize: '0.825rem', fontWeight: 600 }}
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
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
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
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                      {tour.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#d97706', fontWeight: 700, fontSize: '0.875rem' }}>
                      <Star size={16} fill="#d97706" /> {tour.rating}
                    </div>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.62, margin: 0 }}>
                    {tour.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                    <MapPin size={15} color="#059669" /> <span>{tour.location}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.85rem', borderTop: '1px solid var(--light-border)' }}>
                    <div>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Tiket Masuk:</span>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)' }}>
                        {formatRupiah(tour.ticketPrice)}
                      </div>
                    </div>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setActivePage('tourism')}
                      style={{ fontSize: '0.8rem', fontWeight: 600 }}
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

      {/* 8. CALL TO ACTION */}
      <section className="section" style={{ padding: '3rem 0 5rem 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #064e3b, #047857)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(2rem, 4vw, 3rem)',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <div style={{ maxWidth: '580px' }}>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#a7f3d0', marginBottom: '0.65rem', fontSize: '0.775rem' }}>
                Layanan Desa Mandiri 24 Jam
              </span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#fff', lineHeight: 1.28 }}>
                Butuh Surat Keterangan Cepat Tanpa Antre di Balai Desa?
              </h2>
              <p style={{ fontSize: 'clamp(0.875rem, 1.4vw, 0.975rem)', color: '#cbd5e1', lineHeight: 1.65, margin: 0 }}>
                Gunakan layanan permohonan surat mandiri online. Cukup isi NIK Anda dan pantau nomor resi penerbitan secara langsung.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: 'min(100%, 240px)' }}>
              <button 
                className="btn btn-accent"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.925rem', fontWeight: 700, padding: '0.75rem 1rem' }}
                onClick={() => onOpenServiceModal('SKU')}
              >
                Buat Surat Sekarang
              </button>
              <button 
                className="btn btn-outline-white"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.925rem', fontWeight: 600, padding: '0.75rem 1rem' }}
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
