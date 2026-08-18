import React from 'react';
import { 
  Users, 
  FileText, 
  ShoppingBag, 
  Palmtree, 
  Newspaper, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function AdminDashboard({ 
  profile, 
  newsList, 
  umkmList, 
  tourismList, 
  requestsList, 
  complaintsList, 
  setActiveTab,
  onSelectRequestToPrint 
}) {
  const pendingRequests = requestsList.filter(r => r.status === 'MENUNGGU' || r.status === 'DIPROSES');
  const finishedRequests = requestsList.filter(r => r.status === 'SELESAI' || r.status === 'DISETUJUI');
  const recentRequests = requestsList.slice(0, 5);
  const recentComplaints = complaintsList.slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #059669, #065f46)',
        color: '#fff',
        borderRadius: '20px',
        padding: '2rem 2.5rem',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div>
          <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontWeight: 600 }}>
            Panel Kontrol Terpadu
          </span>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0.5rem 0 0.25rem' }}>
            Selamat Datang di Pusat Manajemen Desa Pintar
          </h2>
          <p style={{ margin: 0, color: '#d1fae5', fontSize: '0.95rem' }}>
            Kelola data profil desa, berita, produk UMKM, destinasi wisata, dan proses permohonan surat warga secara real-time.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-accent" onClick={() => setActiveTab('services')}>
            <FileText size={16} /> Proses Surat ({pendingRequests.length})
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        <div className="stat-box">
          <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            <Clock size={28} />
          </div>
          <div className="stat-data">
            <h3>{pendingRequests.length}</h3>
            <p>Surat Masuk (Pending)</p>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon" style={{ background: '#d1fae5', color: '#059669' }}>
            <CheckCircle2 size={28} />
          </div>
          <div className="stat-data">
            <h3>{finishedRequests.length}</h3>
            <p>Surat Selesai</p>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon" style={{ background: '#e0e7ff', color: '#4338ca' }}>
            <MessageSquare size={28} />
          </div>
          <div className="stat-data">
            <h3>{complaintsList.length}</h3>
            <p>Total Aspirasi / Laporan</p>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon" style={{ background: '#ccfbf1', color: '#0f766e' }}>
            <ShoppingBag size={28} />
          </div>
          <div className="stat-data">
            <h3>{umkmList.length}</h3>
            <p>Produk UMKM Terdaftar</p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Requests & Recent Complaints */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
        {/* Recent Service Requests Table */}
        <div className="table-wrapper">
          <div className="table-toolbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} color="#059669" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Pengajuan Surat Terbaru</h3>
            </div>
            <button className="btn btn-sm btn-secondary" onClick={() => setActiveTab('services')}>
              Kelola Semua <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>No. Resi</th>
                  <th>Pemohon</th>
                  <th>Jenis Surat</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req.id}>
                    <td>
                      <strong style={{ color: '#059669' }}>{req.trackingCode}</strong>
                    </td>
                    <td>
                      <div>
                        <strong>{req.citizenName}</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{req.phone}</span>
                      </div>
                    </td>
                    <td>{req.letterType}</td>
                    <td>
                      {req.status === 'SELESAI' ? (
                        <span className="badge badge-success">Selesai</span>
                      ) : req.status === 'DIPROSES' ? (
                        <span className="badge badge-info">Diproses</span>
                      ) : (
                        <span className="badge badge-warning">Menunggu</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Complaints / Aspirations */}
        <div className="table-wrapper">
          <div className="table-toolbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={20} color="#059669" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Aspirasi & Laporan Warga</h3>
            </div>
            <button className="btn btn-sm btn-secondary" onClick={() => setActiveTab('complaints')}>
              Semua <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentComplaints.map((c) => (
              <div
                key={c.id}
                style={{
                  background: '#f8fafc',
                  border: '1px solid var(--light-border)',
                  borderRadius: '12px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>{c.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.date}</span>
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{c.subject}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  Dari: <strong>{c.reporterName}</strong> ({c.phone})
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
