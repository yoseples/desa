import React, { useState } from 'react';
import { X, Search, Clock, CheckCircle, AlertCircle, FileText, User, Printer } from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function TrackingModal({ isOpen, onClose, onPrintLetter }) {
  const [trackingCode, setTrackingCode] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;

    const allReqs = StorageService.getRequests();
    const found = allReqs.find(
      r => r.trackingCode.toLowerCase() === trackingCode.trim().toLowerCase()
    );

    setResult(found || null);
    setSearched(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SELESAI':
        return <span className="badge badge-success">✓ Selesai & Terverifikasi</span>;
      case 'DISETUJUI':
        return <span className="badge badge-success">✓ Disetujui</span>;
      case 'DIPROSES':
        return <span className="badge badge-info">⏳ Sedang Diproses</span>;
      case 'DITOLAK':
        return <span className="badge badge-danger">✕ Ditolak</span>;
      default:
        return <span className="badge badge-warning">🕒 Menunggu Verifikasi</span>;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: '#ccfbf1',
              color: '#0f766e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Search size={20} />
            </div>
            <div>
              <h3 className="modal-title" style={{ fontSize: '1.2rem', margin: 0 }}>
                Lacak Status Pengajuan Surat
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Cek progres permohonan surat secara real-time
              </p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSearch} style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Masukkan Nomor Resi / Tracking Code</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                required
                placeholder="Contoh: DS-SKU-9821"
                className="form-control"
                style={{ textTransform: 'uppercase', fontWeight: 700 }}
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>
                <Search size={16} /> Lacak
              </button>
            </div>
          </form>

          {searched && !result && (
            <div style={{
              textAlign: 'center',
              padding: '2rem 1rem',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '12px'
            }}>
              <AlertCircle size={36} color="#ef4444" style={{ margin: '0 auto 0.75rem' }} />
              <h4 style={{ color: '#991b1b', marginBottom: '0.25rem' }}>Nomor Resi Tidak Ditemukan</h4>
              <p style={{ color: '#b91c1c', fontSize: '0.875rem' }}>
                Pastikan kode tracking yang Anda masukkan sesuai format (Contoh: DS-SKU-9821).
              </p>
            </div>
          )}

          {result && (
            <div style={{
              background: '#f8fafc',
              border: '1px solid var(--light-border)',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', borderBottom: '1px solid var(--light-border)', paddingBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Jenis Surat
                  </span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {result.letterName}
                  </h4>
                </div>
                <div>{getStatusBadge(result.status)}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Nama Pemohon</span>
                  <strong>{result.citizenName}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>NIK</span>
                  <strong>{result.nik}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Waktu Pengajuan</span>
                  <span>{result.submittedAt}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Terakhir Diperbarui</span>
                  <span>{result.updatedAt || result.submittedAt}</span>
                </div>
              </div>

              {result.adminNotes && (
                <div style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '8px',
                  padding: '0.85rem 1rem',
                  fontSize: '0.85rem',
                  color: '#166534',
                  marginBottom: '1rem'
                }}>
                  <strong>Catatan Petugas Desa:</strong>
                  <p style={{ margin: '0.25rem 0 0 0' }}>{result.adminNotes}</p>
                </div>
              )}

              {result.status === 'SELESAI' && (
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      onPrintLetter(result);
                      onClose();
                    }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <Printer size={16} /> Preview / Cetak Surat Resmi
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
