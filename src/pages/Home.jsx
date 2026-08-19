import React, { useState, useEffect } from 'react';
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
  ChevronRight, 
  Compass, 
  AlertTriangle, 
  UserCheck,
  Megaphone,
  Radio,
  Image as ImageIcon,
  BookOpen,
  Award,
  PhoneCall,
  Mail,
  Map as MapIcon
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function Home({ 
  profile, 
  workProgramsList = [],
  newsList = [], 
  umkmList = [], 
  tourismList = [], 
  galleryList = [], 
  setActivePage = () => {}, 
  onOpenServiceModal = () => {}, 
  onOpenTracking = () => {}, 
  onOpenBansos = () => {}, 
  onOpenPanic = () => {}, 
  onOpenMap = () => {}, 
  onOpenSelfService = () => {}, 
  onSelectNews = () => {}, 
  onSelectUmkm = () => {} 
}) {
  const [newsCategoryFilter, setNewsCategoryFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Clock ticker for prayer times & live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const allCitizens = StorageService.getAllCitizens() || [];
  const families = StorageService.getFamilies() || [];

  const totalCitizensCount = allCitizens.length > 0 ? allCitizens.length : (profile?.stats?.population || 4850);
  const maleCount = allCitizens.length > 0 
    ? allCitizens.filter(c => (c.gender || '').toLowerCase().startsWith('l')).length 
    : 2460;
  const femaleCount = allCitizens.length > 0 
    ? allCitizens.filter(c => (c.gender || '').toLowerCase().startsWith('p')).length 
    : 2390;
  const totalFamiliesCount = families.length > 0 ? families.length : (profile?.stats?.households || 1320);

  const featuredNews = Array.isArray(newsList) ? newsList : [];
  const filteredNews = featuredNews.filter(n => {
    const matchCat = newsCategoryFilter === 'ALL' || n.category === newsCategoryFilter;
    const matchSearch = !searchQuery || n.title?.toLowerCase().includes(searchQuery.toLowerCase()) || n.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featuredUmkm = Array.isArray(umkmList) ? umkmList.slice(0, 4) : [];
  const featuredTourism = Array.isArray(tourismList) ? tourismList.slice(0, 3) : [];

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num || 0);
  };

  // APBDes summary
  const totalApbdesBudget = workProgramsList.reduce((acc, p) => acc + (p.budget || 0), 0) || 2850000000;
  const totalRealized = Math.round(totalApbdesBudget * 0.765); // 76.5% realisasi berjalan

  // Pamong Aparatur Desa List
  const aparaturList = [
    { name: profile?.headOfVillage?.name || "H. Budi Santoso, S.AP", role: "Kepala Desa", photo: profile?.headOfVillage?.photo || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" },
    { name: "Ahmad Suhendar, S.Sos", role: "Sekretaris Desa", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
    { name: "Dadan Ramdani, S.Pd", role: "Kaur Pemerintahan", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" },
    { name: "Siti Maryam, S.E", role: "Kaur Keuangan", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
    { name: "Wawan Hermawan", role: "Kaur Perencanaan & Umum", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
    { name: "Endang Suherman", role: "Kasi Kesejahteraan & Pelayanan", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
    { name: "Ujang Koswara", role: "Kepala Dusun Pasirjati", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <div className="page-wrapper animate-fade-in" style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
      
      {/* =========================================================================
          1. HERO HEADER WITH SILIR OVERLAY & 9 SHORTCUT CARDS (COMPACT & RESPONSIVE)
          ========================================================================= */}
      <section style={{
        position: 'relative',
        minHeight: 'auto',
        backgroundImage: `linear-gradient(rgba(10, 20, 35, 0.78), rgba(15, 23, 42, 0.90)), url(${profile?.bannerImage || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 1rem 2.25rem 1rem',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          
          {/* Logo & Village Name */}
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0.85rem' }}>
            <img 
              src={profile?.logo || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80'} 
              alt="Logo Desa"
              style={{ width: '240px', height: '240px', maxWidth: '90vw', maxHeight: '240px', objectFit: 'contain', marginBottom: '1rem', filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.6))' }}
            />
            <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6ee7b7', background: 'rgba(16, 185, 129, 0.2)', padding: '0.2rem 0.65rem', borderRadius: '9999px', border: '1px solid rgba(52, 211, 153, 0.35)', marginBottom: '0.35rem' }}>
              Sistem Informasi Desa Pintar
            </span>
            <h1 style={{ fontSize: 'clamp(1.25rem, 2.8vw, 1.85rem)', fontWeight: 900, color: '#ffffff', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              {profile?.name || 'Desa Sukamaju Mandiri'}
            </h1>
            <p style={{ fontSize: '0.825rem', color: '#cbd5e1', margin: '0.25rem 0 0 0', fontWeight: 500 }}>
              Kecamatan {profile?.district || 'Harapan Makmur'}, {profile?.regency || 'Kabupaten Nusantara'} • Provinsi {profile?.province || 'Jawa Barat'}
            </p>
          </div>

          {/* Quick Search Bar (Compact) */}
          <div style={{ maxWidth: '440px', margin: '0 auto 1.25rem auto', position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Cari layanan, berita, atau informasi desa..."
              className="form-control"
              style={{
                width: '100%',
                padding: '0.45rem 1rem 0.45rem 2.4rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.96)',
                color: '#0f172a',
                fontSize: '0.825rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                border: 'none',
                height: '36px'
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* 6 SHORTCUT CARDS GRID (COMPACT & PROPORTIONAL) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '0.65rem',
            maxWidth: '850px',
            margin: '0 auto'
          }}>
            
            {/* 1. 51 Template Surat */}
            <div 
              onClick={() => onOpenServiceModal('SKU')}
              style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '10px', padding: '0.65rem 0.4rem', cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'rgba(16, 185, 129, 0.45)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'; }}
            >
              <FileText size={22} color="#34d399" style={{ margin: '0 auto 4px auto' }} />
              <span style={{ fontSize: '0.725rem', fontWeight: 700, display: 'block', color: '#fff', lineHeight: 1.2 }}>Cetak Surat</span>
            </div>

            {/* 2. Cek Bansos */}
            <div 
              onClick={onOpenBansos}
              style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '10px', padding: '0.65rem 0.4rem', cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'rgba(245, 158, 11, 0.45)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'; }}
            >
              <ShieldCheck size={22} color="#fbbf24" style={{ margin: '0 auto 4px auto' }} />
              <span style={{ fontSize: '0.725rem', fontWeight: 700, display: 'block', color: '#fff', lineHeight: 1.2 }}>Cek Bansos</span>
            </div>

            {/* 3. Lapak UMKM */}
            <div 
              onClick={() => setActivePage('umkm')}
              style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '10px', padding: '0.65rem 0.4rem', cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'rgba(236, 72, 153, 0.45)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'; }}
            >
              <ShoppingBag size={22} color="#f472b6" style={{ margin: '0 auto 4px auto' }} />
              <span style={{ fontSize: '0.725rem', fontWeight: 700, display: 'block', color: '#fff', lineHeight: 1.2 }}>Lapak UMKM</span>
            </div>

            {/* 4. Transparansi APBDes */}
            <div 
              onClick={() => {
                const el = document.getElementById('apbdes-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '10px', padding: '0.65rem 0.4rem', cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'rgba(16, 185, 129, 0.45)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'; }}
            >
              <DollarSign size={22} color="#34d399" style={{ margin: '0 auto 4px auto' }} />
              <span style={{ fontSize: '0.725rem', fontWeight: 700, display: 'block', color: '#fff', lineHeight: 1.2 }}>APBDes 2026</span>
            </div>

            {/* 5. Pengaduan Warga */}
            <div 
              onClick={() => setActivePage('contact')}
              style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '10px', padding: '0.65rem 0.4rem', cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'rgba(168, 85, 247, 0.45)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'; }}
            >
              <Megaphone size={22} color="#c084fc" style={{ margin: '0 auto 4px auto' }} />
              <span style={{ fontSize: '0.725rem', fontWeight: 700, display: 'block', color: '#fff', lineHeight: 1.2 }}>Pengaduan</span>
            </div>

            {/* 6. Lacak Surat */}
            <div 
              onClick={onOpenTracking}
              style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '10px', padding: '0.65rem 0.4rem', cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'rgba(59, 130, 246, 0.45)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'; }}
            >
              <Search size={22} color="#60a5fa" style={{ margin: '0 auto 4px auto' }} />
              <span style={{ fontSize: '0.725rem', fontWeight: 700, display: 'block', color: '#fff', lineHeight: 1.2 }}>Lacak Resi</span>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          2. SAMBUTAN KEPALA DESA & STATISTIK PENDUDUK (COMPACT & CLEAN)
          ========================================================================= */}
      <div className="container" style={{ marginTop: '1.25rem' }}>
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          
          {/* Left Column: Sambutan Kades */}
          <div style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            color: '#ffffff',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <img 
              src={profile?.headOfVillage?.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'} 
              alt="Kepala Desa"
              style={{ width: '75px', height: '90px', borderRadius: '10px', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.4)', flexShrink: 0 }}
            />
            <div>
              <span style={{ fontSize: '0.675rem', fontWeight: 800, textTransform: 'uppercase', color: '#a7f3d0', letterSpacing: '0.05em' }}>
                Pemerintah Desa Sukamaju
              </span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 900, margin: '2px 0 4px 0', color: '#ffffff' }}>
                Sambutan Kepala Desa
              </h3>
              <p style={{ fontSize: '0.775rem', fontStyle: 'italic', margin: '0 0 6px 0', lineHeight: 1.35, color: '#f0fdf4' }}>
                "{profile?.headOfVillage?.welcomeSpeech || 'Selamat datang di portal informasi resmi Desa Sukamaju Mandiri. Semoga aplikasi ini mempermudah urusan administrasi dan transparansi masyarakat.'}"
              </p>
              <strong style={{ fontSize: '0.775rem', color: '#ffffff' }}>
                — {profile?.headOfVillage?.name || 'H. Budi Santoso, S.AP'}
              </strong>
            </div>
          </div>

          {/* Right Column: Statistik Penduduk Counter */}
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--card-bg)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', textAlign: 'center', margin: '0 0 0.75rem 0' }}>
              Statistik Kependudukan Desa
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
              <div style={{ background: 'var(--light-surface)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '1.1rem', display: 'block' }}>👦</span>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#2563eb', margin: '2px 0' }}>
                  {maleCount.toLocaleString('id-ID')}
                </div>
                <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)', fontWeight: 700 }}>Laki-laki</span>
              </div>

              <div style={{ background: 'var(--light-surface)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '1.1rem', display: 'block' }}>👧</span>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#db2777', margin: '2px 0' }}>
                  {femaleCount.toLocaleString('id-ID')}
                </div>
                <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)', fontWeight: 700 }}>Perempuan</span>
              </div>

              <div style={{ background: 'var(--light-surface)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '1.1rem', display: 'block' }}>👨‍👩‍👧‍👦</span>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#059669', margin: '2px 0' }}>
                  {totalCitizensCount.toLocaleString('id-ID')}
                </div>
                <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)', fontWeight: 700 }}>Total Jiwa</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          3. RUNNING TICKER SEKILAS INFO DESA
          ========================================================================= */}
      <div className="container" style={{ marginTop: '1.25rem' }}>
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '0.65rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#059669', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>
            <Radio size={14} className="animate-pulse" /> Sekilas Info
          </div>
          <marquee style={{ fontSize: '0.825rem', color: 'var(--text-main)', fontWeight: 600 }}>
            🔔 Selamat datang di Portal Resmi Sistem Informasi Desa Sukamaju Mandiri • Pengajuan surat pengantar & TTE dapat dilakukan secara online • Penyaluran BLT Dana Desa tahap berikutnya dijadwalkan akhir bulan ini.
          </marquee>
        </div>
      </div>

      {/* =========================================================================
          4. 3-WIDGET INTERACTIVE GRID (JADWAL SHOLAT, STATUS IDM, JAM KERJA)
          ========================================================================= */}
      <div className="container" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          
          {/* Widget 1: Jadwal Sholat Warga */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🕌 Jadwal Sholat Hari Ini
              </strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 800 }}>
                {currentTime.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
              </span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.35rem', textAlign: 'center', fontSize: '0.725rem' }}>
              <div style={{ background: 'var(--light-surface)', padding: '0.5rem 0.2rem', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Subuh</span>
                <strong style={{ color: '#059669', fontSize: '0.8rem' }}>04:42</strong>
              </div>
              <div style={{ background: 'var(--light-surface)', padding: '0.5rem 0.2rem', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Dzuhur</span>
                <strong style={{ color: '#059669', fontSize: '0.8rem' }}>12:02</strong>
              </div>
              <div style={{ background: 'var(--light-surface)', padding: '0.5rem 0.2rem', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Ashar</span>
                <strong style={{ color: '#059669', fontSize: '0.8rem' }}>15:21</strong>
              </div>
              <div style={{ background: 'var(--light-surface)', padding: '0.5rem 0.2rem', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Maghrib</span>
                <strong style={{ color: '#059669', fontSize: '0.8rem' }}>18:01</strong>
              </div>
              <div style={{ background: 'var(--light-surface)', padding: '0.5rem 0.2rem', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Isya</span>
                <strong style={{ color: '#059669', fontSize: '0.8rem' }}>19:11</strong>
              </div>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.5rem', textAlign: 'center' }}>
              Waktu Indonesia Barat (WIB) • Berdasarkan Koordinat Desa
            </span>
          </div>

          {/* Widget 2: Status IDM (Indeks Desa Membangun) */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Award size={16} color="#059669" /> Status IDM Desa
              </strong>
              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Desa Mandiri</span>
            </div>
            
            <div style={{ fontSize: '0.775rem', color: 'var(--text-body)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Skor IDM Terkini</span>
                <strong style={{ color: '#059669', fontSize: '0.85rem' }}>0.9238</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>IKS (Sosial) / IKE (Ekonomi)</span>
                <strong>0.914 / 0.892</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Target SDGs Desa</span>
                <strong style={{ color: '#2563eb' }}>18 Indikator Terpenuhi</strong>
              </div>
            </div>
          </div>

          {/* Widget 3: Jam Kerja Pelayanan */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={16} color="#d97706" /> Jam Pelayanan Kantor
              </strong>
              <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Buka Hari Ini</span>
            </div>
            
            <div style={{ fontSize: '0.775rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px dashed var(--border-color)' }}>
                <span>Senin - Kamis</span>
                <strong>08:00 - 15:30 WIB</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px dashed var(--border-color)' }}>
                <span>Jumat</span>
                <strong>08:00 - 14:30 WIB</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', color: '#dc2626' }}>
                <span>Sabtu - Minggu</span>
                <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>Libur Pelayanan Fisik</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          5. COUNTDOWN AGENDA DESA (SILIR COUNTDOWN WIDGET)
          ========================================================================= */}
      <div className="container" style={{ marginTop: '1.5rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          border: '1px solid rgba(16, 185, 129, 0.3)'
        }}>
          <div>
            <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#6ee7b7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              🗓️ Agenda & Kegiatan Desa Terdekat
            </span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, margin: '2px 0', color: '#ffffff' }}>
              Penyaluran BLT-DD Tahap III & Musrenbangdes 2026
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
              Pelaksanaan: 30 Agustus 2026 • Lokasi: Gedung Balai Desa
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.12)', padding: '0.5rem 0.85rem', borderRadius: '8px', textAlign: 'center', minWidth: '55px' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#34d399' }}>11</div>
              <span style={{ fontSize: '0.65rem', color: '#e2e8f0', textTransform: 'uppercase' }}>Hari</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.12)', padding: '0.5rem 0.85rem', borderRadius: '8px', textAlign: 'center', minWidth: '55px' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#34d399' }}>14</div>
              <span style={{ fontSize: '0.65rem', color: '#e2e8f0', textTransform: 'uppercase' }}>Jam</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.12)', padding: '0.5rem 0.85rem', borderRadius: '8px', textAlign: 'center', minWidth: '55px' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#34d399' }}>28</div>
              <span style={{ fontSize: '0.65rem', color: '#e2e8f0', textTransform: 'uppercase' }}>Menit</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          6. BERITA DESA TERKINI & TAB KATEGORI (SILIR ARTICLE GRID)
          ========================================================================= */}
      <section className="section" style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div className="section-badge"><Newspaper size={13} /> Warta Informasi</div>
              <h2 className="section-title" style={{ textAlign: 'left', margin: '4px 0 0 0' }}>Berita & Kabar Desa Terbaru</h2>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {['ALL', 'Pemerintahan', 'Pembangunan', 'Sosial & Bantuan', 'Ekonomi'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setNewsCategoryFilter(cat)}
                  className={`btn btn-sm ${newsCategoryFilter === cat ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.75rem', fontWeight: 700 }}
                >
                  {cat === 'ALL' ? 'Semua Berita' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* News Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {filteredNews.slice(0, 3).map((item) => (
              <article 
                key={item.id} 
                className="card"
                style={{ cursor: 'pointer', overflow: 'hidden' }}
                onClick={() => onSelectNews(item)}
              >
                <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={item.image || 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80'} 
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <span className="badge badge-success" style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '0.7rem' }}>
                    {item.category || 'Berita Desa'}
                  </span>
                </div>

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.725rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      <span><Calendar size={12} style={{ display: 'inline', marginRight: '3px' }} /> {item.date}</span>
                      <span>•</span>
                      <span>Oleh: {item.author || 'Pemerintah Desa'}</span>
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.5rem 0', lineHeight: 1.35 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.excerpt || item.content}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>
                      Baca Selengkapnya →
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.views || 142}x dibaca</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setActivePage('news')}
              style={{ fontWeight: 700 }}
            >
              Lihat Semua Arsip Berita Desa ({featuredNews.length}) <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. APARATUR PEMERINTAH DESA (SILIR PAMONG CAROUSEL - VERTICAL CARDS)
          ========================================================================= */}
      <section className="section" style={{ background: 'var(--card-bg)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '3rem 0' }}>
        <div className="container">
          <div className="section-title-wrap">
            <div className="section-badge"><Users size={13} /> Pamong Desa</div>
            <h2 className="section-title">Aparatur Pemerintah Desa</h2>
            <p className="section-desc">Mengenal perangkat dan pamong yang siap memberikan pelayanan prima bagi masyarakat Desa Sukamaju Mandiri.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.25rem'
          }}>
            {aparaturList.map((pamong, idx) => (
              <div 
                key={idx}
                className="card"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  background: 'var(--light-surface)',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                  e.currentTarget.style.borderColor = 'var(--primary-border)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                {/* Vertical Portrait Image Container */}
                <div style={{ position: 'relative', width: '100%', height: '230px', overflow: 'hidden', background: '#0f172a' }}>
                  <img 
                    src={pamong.photo} 
                    alt={pamong.name}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      objectPosition: 'top center',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  
                  {/* Role Badge Overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)',
                    padding: '1.5rem 0.75rem 0.5rem 0.75rem',
                    color: '#ffffff'
                  }}>
                    <span className="badge badge-success" style={{ fontSize: '0.675rem', fontWeight: 800 }}>
                      {pamong.role}
                    </span>
                  </div>
                </div>

                {/* Bottom Details */}
                <div style={{ padding: '0.85rem 0.75rem', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 2px 0', lineHeight: 1.3 }}>
                      {pamong.name}
                    </h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>
                      NIPD: {3204012000 + idx}
                    </span>
                  </div>

                  <div style={{ marginTop: '0.65rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                    <span style={{ fontSize: '0.675rem', fontWeight: 700, color: '#059669' }}>Perangkat Aktif</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. TRANSPARANSI APBDES (SILIR APBDES REALISASI BARS)
          ========================================================================= */}
      <section id="apbdes-section" className="section" style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <div className="section-title-wrap">
            <div className="section-badge"><DollarSign size={13} /> Siskeudes & APBDes 2026</div>
            <h2 className="section-title">Transparansi Pelaksanaan APBDes</h2>
            <p className="section-desc">Akuntabilitas pengelolaan Anggaran Pendapatan dan Belanja Desa demi kesejahteraan masyarakat.</p>
          </div>

          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              
              {/* Pendapatan Desa */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>💰 Pendapatan Desa</strong>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#059669' }}>88.4%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  <span>Realisasi: {formatRupiah(2520000000)}</span>
                  <span>Pagu: {formatRupiah(2850000000)}</span>
                </div>
                <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '88.4%', height: '100%', background: '#059669', borderRadius: '9999px' }}></div>
                </div>
              </div>

              {/* Belanja Bidang Pembangunan */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>🏗️ Belanja Pembangunan Fisik</strong>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#2563eb' }}>74.2%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  <span>Realisasi: {formatRupiah(1150000000)}</span>
                  <span>Pagu: {formatRupiah(1550000000)}</span>
                </div>
                <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '74.2%', height: '100%', background: '#2563eb', borderRadius: '9999px' }}></div>
                </div>
              </div>

              {/* Pemberdayaan & BLT-DD */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>🛡️ Pemberdayaan & Bantuan Sosial</strong>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#d97706' }}>92.0%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  <span>Realisasi: {formatRupiah(690000000)}</span>
                  <span>Pagu: {formatRupiah(750000000)}</span>
                </div>
                <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '92%', height: '100%', background: '#d97706', borderRadius: '9999px' }}></div>
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                💡 Sumber Dana: <strong>Dana Desa (DDS)</strong>, <strong>Alokasi Dana Desa (ADD)</strong>, <strong>PADes</strong>, dan <strong>Bagi Hasil Pajak</strong>.
              </span>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => setActivePage('profile')}
                style={{ fontWeight: 700 }}
              >
                Detail Anggaran APBDes →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. LAPAK PRODUK UMKM WARGA & BUMDES
          ========================================================================= */}
      <section className="section" style={{ background: 'var(--card-bg)', borderTop: '1px solid var(--border-color)', padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div className="section-badge"><ShoppingBag size={13} /> Lapak Desa</div>
              <h2 className="section-title" style={{ textAlign: 'left', margin: '4px 0 0 0' }}>Etalase Produk UMKM & BUMDes</h2>
            </div>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={() => setActivePage('umkm')}
              style={{ fontWeight: 700 }}
            >
              Lihat Semua Produk ({umkmList.length}) <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem' }}>
            {featuredUmkm.map((item) => (
              <div 
                key={item.id} 
                className="card"
                style={{ cursor: 'pointer', overflow: 'hidden' }}
                onClick={() => onSelectUmkm(item)}
              >
                <img 
                  src={item.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80'} 
                  alt={item.name}
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
                <div style={{ padding: '1rem' }}>
                  <span className="badge badge-warning" style={{ fontSize: '0.65rem', marginBottom: '4px' }}>
                    {item.category || 'Kuliner'}
                  </span>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', margin: '2px 0 4px 0' }}>
                    {item.name}
                  </h4>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#059669', marginBottom: '4px' }}>
                    {formatRupiah(item.price)}
                  </div>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    Penjual: <strong>{item.owner}</strong> ({item.dusun})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
