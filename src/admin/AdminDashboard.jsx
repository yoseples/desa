import React from 'react';
import { 
  Users, 
  FileText, 
  ShoppingBag, 
  Palmtree, 
  Newspaper, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Building,
  Briefcase,
  Printer,
  Sparkles,
  ChevronRight,
  Calendar,
  Layers
} from 'lucide-react';

export default function AdminDashboard({
  profile,
  newsList = [],
  umkmList = [],
  tourismList = [],
  requestsList = [],
  complaintsList = [],
  familiesList = [],
  setActiveTab,
  onSelectRequestToPrint
}) {
  const pendingRequests = requestsList.filter((r) => r.status === 'MENUNGGU' || r.status === 'DIPROSES');
  const completedRequests = requestsList.filter((r) => r.status === 'SELESAI');
  const pendingComplaints = complaintsList.filter((c) => c.status === 'MASUK');

  // Count total citizens souls
  const totalCitizens = familiesList.reduce((acc, kk) => acc + (kk.members ? kk.members.length : 0), 0);

  // BPS Socioeconomic Breakdown
  const desil1Count = familiesList.filter(f => {
    const s = (f.economicStatus || '').toLowerCase();
    return s.includes('desil 1') || s.includes('sangat') || s.includes('ekstrem');
  }).length;

  const desil2Count = familiesList.filter(f => {
    const s = (f.economicStatus || '').toLowerCase();
    return (s.includes('desil 2') || s.includes('tidak mampu') || s.includes('prasejahtera') || s.includes('dtks')) && !s.includes('sangat') && !s.includes('kurang');
  }).length;

  const desil3Count = familiesList.filter(f => {
    const s = (f.economicStatus || '').toLowerCase();
    return s.includes('desil 3') || s.includes('kurang');
  }).length;

  const mampuCount = Math.max(0, familiesList.length - (desil1Count + desil2Count + desil3Count));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* 1. WELCOME BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #091024 0%, #1e293b 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem 1.75rem',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ maxWidth: '650px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.65rem', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', borderRadius: '9999px', fontSize: '0.725rem', fontWeight: 700, color: '#6ee7b7', marginBottom: '0.5rem' }}>
            <Sparkles size={12} /> Dashboard Administrasi Terpadu
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.35rem 0', color: '#ffffff' }}>
            Pusat Kendali & Layanan Digital {profile?.name || 'Desa Sukamaju'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
            Data kependudukan terpadu, validasi permohonan surat warga secara real-time, transparansi APBDes, dan integrasi BUMDes.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setActiveTab('letter-templates')}
            style={{ fontWeight: 700, padding: '0.5rem 0.85rem' }}
          >
            <Printer size={14} /> Buat Surat Baru
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveTab('settings')}
            style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)', fontWeight: 600 }}
          >
            Pengaturan
          </button>
        </div>
      </div>

      {/* 2. TOP STATS CARDS */}
      <div className="stat-card-grid">
        
        {/* Card 1: Total KK & Penduduk */}
        <div className="stat-card" onClick={() => setActiveTab('citizens')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
            <Users size={24} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Kartu Keluarga (KK)</span>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.15, margin: '2px 0' }}>
              {familiesList.length} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>({totalCitizens} Jiwa)</span>
            </div>
            <span style={{ fontSize: '0.725rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
              Database Kependudukan BPS <ChevronRight size={12} />
            </span>
          </div>
        </div>

        {/* Card 2: Permohonan Surat */}
        <div className="stat-card" onClick={() => setActiveTab('services')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
            <FileText size={24} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', fontWeight: 600 }}>Permohonan Surat Masuk</span>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.15, margin: '2px 0' }}>
              {requestsList.length} <span style={{ fontSize: '0.85rem', color: pendingRequests.length > 0 ? '#ef4444' : '#10b981', fontWeight: 700 }}>({pendingRequests.length} Perlu Respon)</span>
            </div>
            <span style={{ fontSize: '0.725rem', color: '#2563eb', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
              Layanan Mandiri Online <ChevronRight size={12} />
            </span>
          </div>
        </div>

        {/* Card 3: UMKM Desa */}
        <div className="stat-card" onClick={() => setActiveTab('umkm')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            <ShoppingBag size={24} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', fontWeight: 600 }}>Produk UMKM & BUMDes</span>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.15, margin: '2px 0' }}>
              {umkmList.length} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Katalog Produk</span>
            </div>
            <span style={{ fontSize: '0.725rem', color: '#d97706', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
              Etalase Pasar Digital <ChevronRight size={12} />
            </span>
          </div>
        </div>

        {/* Card 4: Pengaduan / Aspirasi */}
        <div className="stat-card" onClick={() => setActiveTab('complaints')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: '#fee2e2', color: '#dc2626' }}>
            <MessageSquare size={24} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', fontWeight: 600 }}>Aspirasi & Laporan Warga</span>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.15, margin: '2px 0' }}>
              {complaintsList.length} <span style={{ fontSize: '0.85rem', color: pendingComplaints.length > 0 ? '#dc2626' : '#10b981', fontWeight: 700 }}>({pendingComplaints.length} Belum Dijawab)</span>
            </div>
            <span style={{ fontSize: '0.725rem', color: '#dc2626', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
              Pojok Aspirasi Warga <ChevronRight size={12} />
            </span>
          </div>
        </div>

      </div>

      {/* 3. BPS & DTKS SOCIOECONOMIC WIDGET */}
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--light-border)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.15rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingDown size={18} color="#059669" /> Klasifikasi Status Sosial Ekonomi Warga (Standar BPS & DTKS)
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Pemetaan kemiskinan dan kelayakan bantuan sosial untuk ketepatan sasaran alokasi Dana Desa.
            </span>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveTab('citizens')}
            style={{ color: '#059669', borderColor: '#86efac', fontWeight: 700 }}
          >
            Lihat Analisis Detail Kependudukan <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '1rem' }}>
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase' }}>Desil 1 (Sangat Miskin)</span>
              <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>Ekstrem</span>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#991b1b', margin: '6px 0 2px 0' }}>{desil1Count} KK</div>
            <span style={{ fontSize: '0.75rem', color: '#b91c1c', fontWeight: 600 }}>Prioritas PKH / BLT-DD</span>
          </div>

          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }}>Desil 2 (Tidak Mampu)</span>
              <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>Miskin</span>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#92400e', margin: '6px 0 2px 0' }}>{desil2Count} KK</div>
            <span style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 600 }}>Program Sembako & KIP</span>
          </div>

          <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>Desil 3 (Kurang Mampu)</span>
              <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>Rentan</span>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#075985', margin: '6px 0 2px 0' }}>{desil3Count} KK</div>
            <span style={{ fontSize: '0.75rem', color: '#0369a1', fontWeight: 600 }}>Padat Karya & UMKM</span>
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }}>Mampu / Sejahtera</span>
              <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Mandiri</span>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#14532d', margin: '6px 0 2px 0' }}>{mampuCount} KK</div>
            <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 600 }}>Non-Bansos / Donatur</span>
          </div>
        </div>
      </div>

      {/* 4. PENDING REQUESTS & COMPLAINTS SUMMARY TABLES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: '1.5rem' }}>
        
        {/* Antrean Surat Masuk */}
        <div className="table-wrapper">
          <div className="table-toolbar">
            <h3 className="table-toolbar-title" style={{ fontSize: '0.95rem' }}>
              <FileText size={16} color="#2563eb" /> Antrean Permohonan Surat Online
            </h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('services')} style={{ fontSize: '0.75rem' }}>
              Lihat Semua ({requestsList.length})
            </button>
          </div>

          <div style={{ padding: '1rem 1.25rem' }}>
            {pendingRequests.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <CheckCircle2 size={32} color="#10b981" style={{ margin: '0 auto 0.5rem' }} />
                Semua permohonan surat warga telah selesai diproses!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {pendingRequests.slice(0, 4).map((req) => (
                  <div
                    key={req.id}
                    style={{
                      background: '#f8fafc',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--light-border)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: '0.725rem', fontFamily: 'monospace', fontWeight: 800, color: '#059669' }}>
                        {req.trackingCode}
                      </span>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 800, margin: '2px 0', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {req.letterName}
                      </h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Pemohon: {req.citizenName} ({req.rtRw})
                      </span>
                    </div>

                    <button
                      className="btn btn-primary btn-sm"
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem', flexShrink: 0 }}
                      onClick={() => onSelectRequestToPrint(req)}
                    >
                      Verifikasi
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Laporan & Aspirasi Masuk */}
        <div className="table-wrapper">
          <div className="table-toolbar">
            <h3 className="table-toolbar-title" style={{ fontSize: '0.95rem' }}>
              <MessageSquare size={16} color="#dc2626" /> Laporan & Aspirasi Warga Terbaru
            </h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('complaints')} style={{ fontSize: '0.75rem' }}>
              Tanggapi Laporan ({complaintsList.length})
            </button>
          </div>

          <div style={{ padding: '1rem 1.25rem' }}>
            {complaintsList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <CheckCircle2 size={32} color="#10b981" style={{ margin: '0 auto 0.5rem' }} />
                Belum ada laporan atau keluhan warga yang masuk.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {complaintsList.slice(0, 3).map((comp) => (
                  <div
                    key={comp.id}
                    style={{
                      background: '#f8fafc',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--light-border)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span className="badge badge-neutral" style={{ fontSize: '0.675rem' }}>{comp.category}</span>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{comp.date}</span>
                    </div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 800, margin: '2px 0', color: 'var(--text-main)' }}>
                      {comp.subject}
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      Oleh: {comp.reporterName} - {comp.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
