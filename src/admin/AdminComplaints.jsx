import React, { useState } from 'react';
import { MessageSquare, CheckCircle, Clock, AlertCircle, Send, X, Phone, User } from 'lucide-react';

export default function AdminComplaints({ complaintsList, onUpdateComplaint }) {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [responseModal, setResponseModal] = useState(null);
  const [formResponse, setFormResponse] = useState({ status: 'DITINDAKLANJUTI', adminResponse: '' });

  const handleOpenResponse = (c) => {
    setResponseModal(c);
    setFormResponse({
      status: c.status || 'DITINDAKLANJUTI',
      adminResponse: c.adminResponse || ''
    });
  };

  const handleSaveResponse = (e) => {
    e.preventDefault();
    if (!responseModal) return;
    onUpdateComplaint(responseModal.id, formResponse.status, formResponse.adminResponse);
    setResponseModal(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SELESAI':
        return <span className="badge badge-success">✓ Selesai Ditangani</span>;
      case 'DITINDAKLANJUTI':
        return <span className="badge badge-info">⏳ Ditindaklanjuti</span>;
      default:
        return <span className="badge badge-warning">📬 Masuk / Baru</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="table-wrapper">
        <div className="table-toolbar">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
            Daftar Aspirasi & Laporan Pengaduan Warga ({complaintsList.length})
          </h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Pelapor & Tanggal</th>
                <th>Kategori & Judul Laporan</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {complaintsList.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    Belum ada pengaduan atau aspirasi masuk.
                  </td>
                </tr>
              ) : (
                complaintsList.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <strong>{c.reporterName}</strong>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.phone}</span>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748b' }}>{c.date}</span>
                    </td>
                    <td style={{ maxWidth: '400px' }}>
                      <span className="badge badge-neutral" style={{ fontSize: '0.7rem', marginBottom: '0.25rem' }}>{c.category}</span>
                      <strong style={{ display: 'block', fontSize: '0.95rem' }}>{c.subject}</strong>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.description}
                      </p>
                    </td>
                    <td>{getStatusBadge(c.status)}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleOpenResponse(c)}
                      >
                        Tanggapi / Update
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RESPONSE MODAL */}
      {responseModal && (
        <div className="modal-backdrop" onClick={() => setResponseModal(null)}>
          <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.2rem' }}>
                Tanggapi Laporan Warga
              </h3>
              <button className="modal-close" onClick={() => setResponseModal(null)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveResponse}>
              <div className="modal-body">
                <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '12px', marginBottom: '1.25rem', border: '1px solid var(--light-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className="badge badge-neutral">{responseModal.category}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{responseModal.date}</span>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.25rem 0' }}>{responseModal.subject}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6, margin: '0 0 0.75rem 0' }}>
                    {responseModal.description}
                  </p>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Pelapor: <strong>{responseModal.reporterName}</strong> ({responseModal.phone})
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Status Penanganan *</label>
                  <select
                    className="form-control"
                    value={formResponse.status}
                    onChange={(e) => setFormResponse({ ...formResponse, status: e.target.value })}
                  >
                    <option value="MASUK">MASUK (Baru Diterima)</option>
                    <option value="DITINDAKLANJUTI">DITINDAKLANJUTI (Sedang Dikerjakan Pemdes)</option>
                    <option value="SELESAI">SELESAI (Telah Tuntas)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Tanggapan / Solusi Resmi Pemerintah Desa *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan tindakan yang telah diambil atau respon untuk warga pelapor..."
                    className="form-control"
                    value={formResponse.adminResponse}
                    onChange={(e) => setFormResponse({ ...formResponse, adminResponse: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setResponseModal(null)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Kirim Tanggapan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
