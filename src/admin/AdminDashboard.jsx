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
  Building
} from 'lucide-react';

export default function AdminDashboard({
  profile,
  newsList,
  umkmList,
  tourismList,
  requestsList,
  complaintsList,
  familiesList,
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

  const mampuCount = familiesList.length - (desil1Count + desil2Count + desil3Count);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* 1. TOP STATS CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem' }}>
        
        {/* Card 1: Total KK & Penduduk */}
        <div className="stat-card" onClick={() => setActiveTab('citizens')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
            <Users size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Kartu Keluarga (KK)</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {familiesList.length} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>({totalCitizens} Jiwa)</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
              Database Kependudukan BPS <ArrowRight size={12} />
            </span>
          </div>
        </div>

        {/* Card 2: Permohonan Surat */}
        <div className="stat-card" onClick={() => setActiveTab('services')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
            <FileText size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Permohonan Surat Masuk</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {requestsList.length} <span style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 700 }}>({pendingRequests.length} Perlu Respon)</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
              Layanan Mandiri Online <ArrowRight size={12} />
            </span>
          </div>
        </div>

        {/* Card 3: UMKM Desa */}
        <div className="stat-card" onClick={() => setActiveTab('umkm')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            <ShoppingBag size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Produk UMKM Terdaftar</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {umkmList.length} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Katalog</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
              Etalase BUMDes <ArrowRight size={12} />
            </span>
          </div>
        </div>

        {/* Card 4: Pengaduan / Aspirasi */}
        <div className="stat-card" onClick={() => setActiveTab('complaints')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: '#fee2e2', color: '#dc2626' }}>
            <MessageSquare size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Aspirasi & Laporan</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {complaintsList.length} <span style={{ fontSize: '0.85rem', color: '#dc2626', fontWeight: 700 }}>({pendingComplaints.length} Belum Dijawab)</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
              Pojok Aspirasi Warga <ArrowRight size={12} />
            </span>
          </div>
        </div>

      </div>

      {/* 2. BPS & DTKS SOCIOECONOMIC WIDGET */}
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--light-border)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingDown size={20} color="#059669" /> Klasifikasi Status Sosial Ekonomi Warga (Standar BPS & DTKS)
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Pemetaan kemiskinan dan kelayakan bantuan sosial untuk pemerataan Dana Desa.
            </span>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveTab('citizens')}
            style={{ color: '#059669', borderColor: '#86efac' }}
          >
            Lihat Analisis Detail Kependudukan <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem' }}>
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase' }}>Desil 1 (Sangat Miskin)</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#991b1b', margin: '4px 0' }}>{desil1Count} KK</div>
            <span style={{ fontSize: '0.75rem', color: '#b91c1c' }}>Prioritas PKH / BLT-DD</span>
          </div>

          <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }}>Desil 2 (Tidak Mampu)</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#92400e', margin: '4px 0' }}>{desil2Count} KK</div>
            <span style={{ fontSize: '0.75rem', color: '#b45309' }}>Program Sembako & KIP</span>
          </div>

          <div style={{ background: '#e0f2fe', border: '1px solid #bae6fd', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>Desil 3 (Kurang Mampu)</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#075985', margin: '4px 0' }}>{desil3Count} KK</div>
            <span style={{ fontSize: '0.75rem', color: '#0369a1' }}>Padat Karya & UMKM</span>
          </div>

          <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }}>Mampu / Sejahtera</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#14532d', margin: '4px 0' }}>{mampuCount > 0 ? mampuCount : 0} KK</div>
            <span style={{ fontSize: '0.75rem', color: '#15803d' }}>Mandiri / Non-Bansos</span>
          </div>
        </div>
      </div>

      {/* 3. PENDING REQUESTS & COMPLAINTS SUMMARY TABLE */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '1.5rem' }}>
        
        {/* Antrean Surat Masuk */}
        <div className="table-wrapper" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Antrean Permohonan Surat Online
            </h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('services')} style={{ fontSize: '0.75rem' }}>
              Kelola Semua
            </button>
          </div>

          {pendingRequests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              ✓ Semua permohonan surat warga telah selesai diproses!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {pendingRequests.slice(0, 4).map((req) => (
                <div
                  key={req.id}
                  style={{
                    background: '#f8fafc',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid var(--light-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.725rem', fontFamily: 'monospace', fontWeight: 800, color: '#059669' }}>
                      {req.trackingCode}
                    </span>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 700, margin: '2px 0' }}>
                      {req.letterName}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Pemohon: {req.citizenName} ({req.rtRw})
                    </span>
                  </div>

                  <button
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: '0.725rem', padding: '0.25rem 0.5rem' }}
                    onClick={() => onSelectRequestToPrint(req)}
                  >
                    Verifikasi
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Laporan & Aspirasi Masuk */}
        <div className="table-wrapper" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Laporan & Aspirasi Warga Terbaru
            </h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('complaints')} style={{ fontSize: '0.75rem' }}>
              Tanggapi Laporan
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {complaintsList.slice(0, 3).map((comp) => (
              <div
                key={comp.id}
                style={{
                  background: '#f8fafc',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid var(--light-border)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span className="badge badge-neutral" style={{ fontSize: '0.675rem' }}>{comp.category}</span>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{comp.date}</span>
                </div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: '3px 0' }}>
                  {comp.subject}
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  Oleh: {comp.reporterName} - {comp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
