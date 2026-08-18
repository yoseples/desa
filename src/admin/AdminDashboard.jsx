import React from 'react';
import { 
  Users, 
  Home,
  FileText, 
  ShoppingBag, 
  Palmtree, 
  Newspaper, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  HeartHandshake
} from 'lucide-react';
import { StorageService } from '../services/storageService';

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
  const pendingRequests = requestsList.filter(r => r.status === 'MENUNGGU' || r.status === 'DIPROSES');
  const finishedRequests = requestsList.filter(r => r.status === 'SELESAI' || r.status === 'DISETUJUI');
  const recentRequests = requestsList.slice(0, 5);
  const recentComplaints = complaintsList.slice(0, 4);

  const allCitizens = StorageService.getAllCitizens();
  const totalFamilies = familiesList ? familiesList.length : 0;
  const totalCitizens = allCitizens.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #059669, #065f46)',
        color: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(1.5rem, 3vw, 2.25rem)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}>
        <div>
          <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.18)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
            Panel Kontrol Terpadu
          </span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 800, margin: '0.4rem 0 0.2rem' }}>
            Selamat Datang di Pusat Manajemen Desa Pintar
          </h2>
          <p style={{ margin: 0, color: '#d1fae5', fontSize: '0.9rem', maxWidth: '640px' }}>
            Kelola data Kartu Keluarga & warga, pelayanan surat online, aspirasi warga, UMKM, wisata, dan berita desa.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('citizens')}>
            <Home size={15} /> Data KK ({totalFamilies})
          </button>
          <button className="btn btn-accent btn-sm" onClick={() => setActiveTab('services')}>
            <FileText size={15} /> Proses Surat ({pendingRequests.length})
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1.1rem' }}>
        <div className="stat-box" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('citizens')}>
          <div className="stat-icon" style={{ background: '#d1fae5', color: '#059669' }}>
            <Home size={24} />
          </div>
          <div className="stat-data">
            <h3>{totalFamilies}</h3>
            <p>Kartu Keluarga (KK)</p>
          </div>
        </div>

        <div className="stat-box" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('citizens')}>
          <div className="stat-icon" style={{ background: '#ccfbf1', color: '#0f766e' }}>
            <Users size={24} />
          </div>
          <div className="stat-data">
            <h3>{totalCitizens}</h3>
            <p>Jiwa Penduduk</p>
          </div>
        </div>

        <div className="stat-box" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('services')}>
          <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            <Clock size={24} />
          </div>
          <div className="stat-data">
            <h3>{pendingRequests.length}</h3>
            <p>Surat Masuk (Pending)</p>
          </div>
        </div>

        <div className="stat-box" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('complaints')}>
          <div className="stat-icon" style={{ background: '#e0e7ff', color: '#4338ca' }}>
            <MessageSquare size={24} />
          </div>
          <div className="stat-data">
            <h3>{complaintsList.length}</h3>
            <p>Aspirasi / Pengaduan</p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Requests & Recent Complaints */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '1.5rem' }}>
        {/* Recent Service Requests Table */}
        <div className="table-wrapper">
          <div className="table-toolbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={18} color="#059669" />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Pengajuan Surat Terbaru</h3>
            </div>
            <button className="btn btn-sm btn-secondary" onClick={() => setActiveTab('services')}>
              Kelola Semua <ArrowRight size={13} />
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
                      <strong style={{ color: '#059669', fontSize: '0.85rem' }}>{req.trackingCode}</strong>
                    </td>
                    <td>
                      <div>
                        <strong>{req.citizenName}</strong>
                        <span style={{ display: 'block', fontSize: '0.725rem', color: 'var(--text-muted)' }}>{req.phone}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-neutral">{req.letterType}</span></td>
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
              <MessageSquare size={18} color="#059669" />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Aspirasi & Laporan Warga</h3>
            </div>
            <button className="btn btn-sm btn-secondary" onClick={() => setActiveTab('complaints')}>
              Semua <ArrowRight size={13} />
            </button>
          </div>

          <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {recentComplaints.map((c) => (
              <div
                key={c.id}
                style={{
                  background: '#f8fafc',
                  border: '1px solid var(--light-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>{c.category}</span>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{c.date}</span>
                </div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>{c.subject}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
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
