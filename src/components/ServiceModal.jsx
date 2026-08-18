import React, { useState } from 'react';
import { X, CheckCircle, FileText, Send, User, MapPin, Phone, Briefcase, Info } from 'lucide-react';
import confetti from 'canvas-confetti';
import { letterTypes } from '../services/initialData';

export default function ServiceModal({ isOpen, onClose, selectedLetterType, onSubmitSuccess }) {
  const [selectedType, setSelectedType] = useState(selectedLetterType || 'SKU');
  const [formData, setFormData] = useState({
    citizenName: '',
    nik: '',
    phone: '',
    rtRw: '',
    address: '',
    businessName: '',
    businessType: '',
    businessAddress: '',
    purpose: '',
    extraNotes: ''
  });
  const [submittedResult, setSubmittedResult] = useState(null);

  if (!isOpen) return null;

  const currentLetter = letterTypes.find(l => l.id === selectedType) || letterTypes[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.citizenName || !formData.nik || !formData.phone || !formData.purpose) {
      alert('Mohon lengkapi data wajib pemohon!');
      return;
    }

    const newReq = {
      letterType: selectedType,
      letterName: currentLetter.name,
      citizenName: formData.citizenName,
      nik: formData.nik,
      phone: formData.phone,
      rtRw: formData.rtRw || 'RT 01 / RW 01',
      address: formData.address,
      businessName: formData.businessName || '-',
      businessType: formData.businessType || '-',
      businessAddress: formData.businessAddress || '-',
      purpose: formData.purpose,
      notes: formData.extraNotes || '-'
    };

    const created = onSubmitSuccess(newReq);
    setSubmittedResult(created);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('confetti:', err);
    }
  };

  const handleClose = () => {
    setSubmittedResult(null);
    setFormData({
      citizenName: '',
      nik: '',
      phone: '',
      rtRw: '',
      address: '',
      businessName: '',
      businessType: '',
      businessAddress: '',
      purpose: '',
      extraNotes: ''
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: '#d1fae5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={20} />
            </div>
            <div>
              <h3 className="modal-title" style={{ fontSize: '1.2rem', margin: 0 }}>
                {submittedResult ? 'Pengajuan Berhasil Dikirim' : 'Form Pengajuan Surat Online'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Layanan Mandiri Warga Desa Sukamaju
              </p>
            </div>
          </div>
          <button className="modal-close" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {submittedResult ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{
                width: '72px',
                height: '72px',
                background: '#d1fae5',
                color: '#059669',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem'
              }}>
                <CheckCircle size={40} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Pengajuan Berhasil Diterima!
              </h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
                Permohonan surat Anda telah masuk ke sistem antrean pelayanan desa. Simpan nomor resi pelacakan di bawah ini untuk memeriksa status pengajuan Anda.
              </p>

              <div style={{
                background: '#f8fafc',
                border: '2px dashed #059669',
                borderRadius: '12px',
                padding: '1.25rem',
                maxWidth: '400px',
                margin: '0 auto 1.5rem'
              }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Nomor Resi Pelacakan (Tracking Code)
                </span>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669', letterSpacing: '0.05em', margin: '0.25rem 0' }}>
                  {submittedResult.trackingCode}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Jenis Surat: <strong>{submittedResult.letterName}</strong>
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigator.clipboard.writeText(submittedResult.trackingCode);
                    alert('Nomor Resi ' + submittedResult.trackingCode + ' berhasil disalin ke clipboard!');
                  }}
                >
                  Salin Nomor Resi
                </button>
                <button className="btn btn-secondary" onClick={handleClose}>
                  Tutup
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Letter Type Picker */}
              <div className="form-group">
                <label className="form-label">Pilih Jenis Surat Keterangan *</label>
                <select
                  className="form-control"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={{ fontWeight: 600 }}
                >
                  {letterTypes.map((lt) => (
                    <option key={lt.id} value={lt.id}>
                      {lt.name} (Estimasi: {lt.processingDays})
                    </option>
                  ))}
                </select>
              </div>

              {/* Requirement Alert */}
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                padding: '0.85rem 1rem',
                marginBottom: '1.5rem',
                display: 'flex',
                gap: '0.75rem'
              }}>
                <Info size={20} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.825rem', color: '#166534' }}>
                  <strong>Syarat Berkas:</strong> {currentLetter.requirements.join(', ')}.
                  <div style={{ marginTop: '0.2rem', color: '#15803d' }}>{currentLetter.description}</div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nama Lengkap Sesuai KTP *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bambang Sudrajat"
                    className="form-control"
                    value={formData.citizenName}
                    onChange={(e) => setFormData({ ...formData, citizenName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Nomor Induk Kependudukan (NIK 16 Digit) *</label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="Contoh: 3204151208850002"
                    className="form-control"
                    value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    className="form-control"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">RT / RW</label>
                  <input
                    type="text"
                    placeholder="Contoh: RT 02 / RW 03"
                    className="form-control"
                    value={formData.rtRw}
                    onChange={(e) => setFormData({ ...formData, rtRw: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Alamat Lengkap Pemohon</label>
                <input
                  type="text"
                  placeholder="Nama Kampung / Dusun / Jalan / No. Rumah"
                  className="form-control"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              {/* Conditional business fields for SKU */}
              {selectedType === 'SKU' && (
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid var(--light-border)' }}>
                  <h4 style={{ fontSize: '0.9rem', color: '#059669', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Briefcase size={16} /> Data Usaha Pemohon (Khusus SKU)
                  </h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Nama Usaha / Toko</label>
                      <input
                        type="text"
                        placeholder="Contoh: Toko Berkah Tani"
                        className="form-control"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Bidang / Jenis Usaha</label>
                      <input
                        type="text"
                        placeholder="Contoh: Kuliner, Sembako, Pertanian"
                        className="form-control"
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Alamat Lokasi Usaha</label>
                    <input
                      type="text"
                      placeholder="Contoh: Jl. Raya Sukamaju No. 12"
                      className="form-control"
                      value={formData.businessAddress}
                      onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Keperluan / Tujuan Pembuatan Surat *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jelaskan secara singkat tujuan pengajuan surat ini (Contoh: Pengajuan pinjaman KUR BRI, Pendaftaran beasiswa kuliah, dll.)"
                  className="form-control"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                />
              </div>

              <div className="modal-footer" style={{ padding: '1rem 0 0 0', background: 'transparent' }}>
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send size={16} /> Kirim Pengajuan Surat
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
