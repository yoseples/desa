import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Printer, 
  Edit, 
  Eye, 
  User, 
  Phone, 
  MapPin, 
  X 
} from 'lucide-react';

export default function AdminServices({ 
  requestsList, 
  onUpdateStatus, 
  onSelectPrint 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [selectedReq, setSelectedReq] = useState(null);
  const [editStatusModal, setEditStatusModal] = useState(null);
  const [statusForm, setStatusForm] = useState({ status: 'MENUNGGU', adminNotes: '' });

  const filteredRequests = requestsList.filter((r) => {
    const matchesStatus = filterStatus === 'Semua' || r.status === filterStatus;
    const matchesSearch = r.trackingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.nik.includes(searchQuery) ||
                          r.letterName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenEdit = (req) => {
    setEditStatusModal(req);
    setStatusForm({
      status: req.status || 'MENUNGGU',
      adminNotes: req.adminNotes || ''
    });
  };

  const handleSaveStatus = (e) => {
    e.preventDefault();
    if (!editStatusModal) return;
    onUpdateStatus(editStatusModal.id, statusForm.status, statusForm.adminNotes);
    setEditStatusModal(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SELESAI':
        return <span className="badge badge-success">✓ Selesai</span>;
      case 'DISETUJUI':
        return <span className="badge badge-success">✓ Disetujui</span>;
      case 'DIPROSES':
        return <span className="badge badge-info">⏳ Diproses</span>;
      case 'DITOLAK':
        return <span className="badge badge-danger">✕ Ditolak</span>;
      default:
        return <span className="badge badge-warning">🕒 Menunggu</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Filter Bar */}
      <div className="table-wrapper">
        <div className="table-toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', flex: 1 }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Cari nomor resi, NIK, nama pemohon..."
                className="form-control"
                style={{ paddingLeft: '2.5rem' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="form-control"
              style={{ width: 'auto' }}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Semua">Semua Status</option>
              <option value="MENUNGGU">Menunggu Verifikasi</option>
              <option value="DIPROSES">Sedang Diproses</option>
              <option value="DISETUJUI">Disetujui</option>
              <option value="SELESAI">Selesai</option>
              <option value="DITOLAK">Ditolak</option>
            </select>
          </div>

          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Total: {filteredRequests.length} permohonan
          </span>
        </div>

        {/* Requests Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>No. Resi & Tanggal</th>
                <th>Nama Pemohon & NIK</th>
                <th>Jenis Surat</th>
                <th>Keperluan</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    Tidak ada data pengajuan surat yang cocok.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id}>
                    <td>
                      <strong style={{ color: '#059669', fontSize: '0.95rem' }}>{req.trackingCode}</strong>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {req.submittedAt}
                      </span>
                    </td>
                    <td>
                      <strong style={{ display: 'block' }}>{req.citizenName}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>NIK: {req.nik}</span>
                    </td>
                    <td>
                      <span className="badge badge-neutral">{req.letterType}</span>
                    </td>
                    <td style={{ maxWidth: '200px', fontSize: '0.85rem' }}>
                      {req.purpose}
                    </td>
                    <td>{getStatusBadge(req.status)}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => setSelectedReq(req)}
                          title="Lihat Detail Permohonan"
                        >
                          <Eye size={14} /> Detail
                        </button>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleOpenEdit(req)}
                          title="Ubah Status & Catatan"
                        >
                          <Edit size={14} /> Proses
                        </button>
                        {req.status === 'SELESAI' && (
                          <button
                            className="btn btn-sm btn-accent"
                            onClick={() => onSelectPrint(req)}
                            title="Cetak Surat Resmi Desa"
                          >
                            <Printer size={14} /> Cetak
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedReq && (
        <div className="modal-backdrop" onClick={() => setSelectedReq(null)}>
          <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} color="#059669" />
                <h3 className="modal-title" style={{ fontSize: '1.2rem', margin: 0 }}>
                  Detail Permohonan {selectedReq.trackingCode}
                </h3>
              </div>
              <button className="modal-close" onClick={() => setSelectedReq(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Jenis Surat:</span>
                  <strong>{selectedReq.letterName} ({selectedReq.letterType})</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Status Saat Ini:</span>
                  <div>{getStatusBadge(selectedReq.status)}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Nama Pemohon:</span>
                  <strong>{selectedReq.citizenName}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>NIK (Nomor KTP):</span>
                  <strong>{selectedReq.nik}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Nomor Telepon / WhatsApp:</span>
                  <a href={`https://wa.me/${selectedReq.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" style={{ color: '#059669', fontWeight: 700 }}>
                    {selectedReq.phone}
                  </a>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Wilayah RT / RW:</span>
                  <strong>{selectedReq.rtRw || '-'}</strong>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Alamat Lengkap Pemohon:</span>
                <strong>{selectedReq.address || '-'}</strong>
              </div>

              {selectedReq.businessName && selectedReq.businessName !== '-' && (
                <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
                  <span style={{ color: '#166534', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Informasi Usaha (SKU):</span>
                  <div style={{ fontSize: '0.875rem' }}>
                    <div>Nama Usaha: <strong>{selectedReq.businessName}</strong></div>
                    <div>Bidang Usaha: <strong>{selectedReq.businessType}</strong></div>
                    <div>Alamat Usaha: <strong>{selectedReq.businessAddress}</strong></div>
                  </div>
                </div>
              )}

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Keperluan Pengajuan:</span>
                <p style={{ margin: '0.25rem 0 0 0', fontWeight: 600 }}>{selectedReq.purpose}</p>
              </div>

              {selectedReq.adminNotes && (
                <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '8px', border: '1px solid #fde68a' }}>
                  <span style={{ color: '#92400e', fontWeight: 700, display: 'block', fontSize: '0.8rem' }}>Catatan Verifikasi Admin:</span>
                  <p style={{ margin: '0.25rem 0 0 0', color: '#78350f' }}>{selectedReq.adminNotes}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedReq(null)}>Tutup</button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  const req = selectedReq;
                  setSelectedReq(null);
                  handleOpenEdit(req);
                }}
              >
                Ubah Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT STATUS MODAL */}
      {editStatusModal && (
        <div className="modal-backdrop" onClick={() => setEditStatusModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.15rem' }}>
                Perbarui Status Permohonan: {editStatusModal.trackingCode}
              </h3>
              <button className="modal-close" onClick={() => setEditStatusModal(null)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveStatus}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Ubah Status Pemrosesan *</label>
                  <select
                    className="form-control"
                    value={statusForm.status}
                    onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}
                  >
                    <option value="MENUNGGU">MENUNGGU (Masuk Antrean)</option>
                    <option value="DIPROSES">DIPROSES (Verifikasi Berkas)</option>
                    <option value="DISETUJUI">DISETUJUI (Disetujui Kepala Desa)</option>
                    <option value="SELESAI">SELESAI (Dokumen Resmi Terbit & Siap Cetak)</option>
                    <option value="DITOLAK">DITOLAK (Syarat Tidak Terpenuhi)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Catatan untuk Warga Pemohon</label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Berkas telah diverifikasi lengkap dan surat telah ditandatangani."
                    className="form-control"
                    value={statusForm.adminNotes}
                    onChange={(e) => setStatusForm({ ...statusForm, adminNotes: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditStatusModal(null)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
