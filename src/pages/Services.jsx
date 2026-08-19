import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare, 
  Send, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { letterTypes } from '../services/initialData';
import confetti from 'canvas-confetti';

export const slug = '/layanan';
export default function Services({ onOpenServiceModal, onOpenTracking, onSubmitComplaint }) {
  const [complaintForm, setComplaintForm] = useState({
    reporterName: '',
    phone: '',
    category: 'Infrastruktur & Fasilitas Umum',
    subject: '',
    description: ''
  });
  const [complaintSent, setComplaintSent] = useState(false);

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    if (!complaintForm.reporterName || !complaintForm.subject || !complaintForm.description) {
      alert('Mohon lengkapi formulir pengaduan!');
      return;
    }

    onSubmitComplaint(complaintForm);
    setComplaintSent(true);

    try {
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
    } catch (err) {}

    setTimeout(() => {
      setComplaintForm({
        reporterName: '',
        phone: '',
        category: 'Infrastruktur & Fasilitas Umum',
        subject: '',
        description: ''
      });
      setComplaintSent(false);
    }, 5000);
  };

  return (
    <div>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b, #0f172a)',
        color: '#fff',
        padding: '4rem 0 3.5rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#6ee7b7' }}>
            Pelayanan Publik Terpadu
          </span>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, margin: '0.5rem 0 1rem' }}>
            Layanan Mandiri Warga & Surat Online
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
            Proses pengurusan administrasi kependudukan yang cepat, mudah, transparan, dan dapat dipantau langsung dari rumah.
          </p>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-accent btn-lg" onClick={() => onOpenServiceModal('SKU')}>
              <FileText size={18} /> Ajukan Surat Keterangan
            </button>
            <button className="btn btn-outline-white btn-lg" onClick={onOpenTracking}>
              <Search size={18} /> Cek Status Resi Surat
            </button>
          </div>
        </div>
      </div>

      {/* 1. KATALOG SURAT ONLINE */}
      <div className="container section">
        <div className="section-title-wrap">
          <span className="section-badge">Daftar Formulir</span>
          <h2 className="section-title">Pilihan Surat Administrasi Desa</h2>
          <p className="section-subtitle">Pilih jenis permohonan surat yang Anda perlukan di bawah ini</p>
        </div>

        <div className="card-grid">
          {letterTypes.map((letter) => (
            <div key={letter.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div className="card-body">
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <FileText size={24} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="badge badge-info">{letter.id}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} /> {letter.processingDays}
                  </span>
                </div>

                <h3 className="card-title" style={{ fontSize: '1.15rem' }}>{letter.name}</h3>
                <p className="card-desc">{letter.description}</p>

                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.8rem' }}>
                  <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.25rem' }}>
                    Syarat Berkas yang Disiapkan:
                  </strong>
                  <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'var(--text-muted)' }}>
                    {letter.requirements.map((req, rIdx) => (
                      <li key={rIdx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card-footer" style={{ padding: '1.25rem 1.5rem', background: '#f8fafc' }}>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => onOpenServiceModal(letter.id)}
                >
                  Ajukan Sekarang <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. ALUR PENGAJUAN SURAT (HOW IT WORKS) */}
      <section className="section" style={{ background: 'var(--light-bg)', borderTop: '1px solid var(--light-border)', borderBottom: '1px solid var(--light-border)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-badge">Panduan Praktis</span>
            <h2 className="section-title">4 Langkah Mudah Pengajuan Surat</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#d1fae5', color: '#059669', fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Isi Formulir Online</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Pilih jenis surat dan masukkan data identitas diri NIK serta keperluan Anda.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ccfbf1', color: '#0d9488', fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Dapatkan Resi Tracking</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Simpan kode unik resi permohonan untuk melacak status verifikasi dokumen.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Verifikasi Petugas</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Pamong & Kasi Pelayanan desa memeriksa keabsahan berkas permohonan Anda.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ede9fe', color: '#7c3aed', fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                4
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Surat Terbit & Cetak</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Surat resmi siap dicetak langsung ber-barcode atau diambil di kantor desa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FORM PENGADUAN & ASPIRASI */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-title-wrap">
            <span className="section-badge">Suara Warga</span>
            <h2 className="section-title">Form Aspirasi & Pengaduan Warga</h2>
            <p className="section-subtitle">Sampaikan saran, keluhan jalan/infrastruktur, atau aspirasi pembangunan langsung ke Pemdes.</p>
          </div>

          <div style={{ background: 'var(--light-surface)', borderRadius: '20px', padding: '2.5rem', border: '1px solid var(--light-border)', boxShadow: 'var(--shadow-md)' }}>
            {complaintSent ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ width: '64px', height: '64px', background: '#d1fae5', color: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  Aspirasi / Laporan Berhasil Dikirim!
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  Terima kasih atas kepedulian Anda. Laporan Anda telah masuk ke panel admin dan segera ditindaklanjuti oleh aparat desa terkait.
                </p>
              </div>
            ) : (
              <form onSubmit={handleComplaintSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nama Pelapor *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama lengkap Anda"
                      className="form-control"
                      value={complaintForm.reporterName}
                      onChange={(e) => setComplaintForm({ ...complaintForm, reporterName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nomor WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      className="form-control"
                      value={complaintForm.phone}
                      onChange={(e) => setComplaintForm({ ...complaintForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Kategori Laporan *</label>
                  <select
                    className="form-control"
                    value={complaintForm.category}
                    onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value })}
                  >
                    <option value="Infrastruktur & Fasilitas Umum">Infrastruktur & Fasilitas Umum (Jalan, Jembatan, PJU, Irigasi)</option>
                    <option value="Kebersihan & Lingkungan">Kebersihan & Lingkungan Hidup</option>
                    <option value="Pelayanan Aparatur Desa">Pelayanan Aparatur Desa</option>
                    <option value="Bantuan Sosial & Kesejahteraan">Bantuan Sosial (Bansos, PKH, BLT)</option>
                    <option value="Keamanan & Ketertiban">Keamanan & Ketertiban Warga</option>
                    <option value="Lainnya">Usulan & Ide Lainnya</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Judul / Pokok Laporan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Lubang jalan di jembatan penghubung Dusun Pasirjati"
                    className="form-control"
                    value={complaintForm.subject}
                    onChange={(e) => setComplaintForm({ ...complaintForm, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Uraian Rinci Pengaduan / Aspirasi *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Jelaskan secara detail lokasi kejadian, kronologi, atau usulan solusi yang Anda harapkan..."
                    className="form-control"
                    value={complaintForm.description}
                    onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  <Send size={18} /> Kirim Pengaduan ke Pemerintah Desa
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
