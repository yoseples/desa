import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldAlert, 
  Send, 
  ExternalLink, 
  CheckCircle2
} from 'lucide-react';

export default function Contact({ profile, onSubmitComplaint }) {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) return;

    if (onSubmitComplaint) {
      onSubmitComplaint({
        reporterName: contactForm.name,
        phone: contactForm.phone || '-',
        category: 'Pesan Kontak Umum',
        subject: `Pesan dari ${contactForm.name}`,
        description: contactForm.message
      });
    }

    setSent(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', phone: '', message: '' });
      setSent(false);
    }, 4000);
  };

  return (
    <div>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b, #0f172a)',
        color: '#fff',
        padding: 'clamp(3rem, 5vw, 4rem) 0 clamp(2.5rem, 4vw, 3.5rem)',
        textAlign: 'center'
      }}>
        <div className="container">
          <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#6ee7b7' }}>
            Hubungi Kami
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, margin: '0.5rem 0 1rem' }}>
            Kontak & Lokasi Kantor Desa
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', maxWidth: '600px', margin: '0 auto' }}>
            Informasi alamat resmi, jadwal pelayanan, nomor kontak siaga darurat 24 jam, dan peta lokasi kantor.
          </p>
        </div>
      </div>

      <div className="container section">
        {/* EMERGENCY CONTACTS SPEED DIAL */}
        <div style={{ marginBottom: '3rem' }}>
          <div className="section-title-wrap">
            <span className="section-badge" style={{ background: '#fee2e2', color: '#991b1b', borderColor: '#fca5a5' }}>
              <ShieldAlert size={14} /> Tanggap Cepat
            </span>
            <h2 className="section-title">Nomor Kontak Darurat Desa (Siaga 24 Jam)</h2>
            <p className="section-subtitle">Hubungi nomor-nomor berikut untuk penanganan keadaan mendesak / darurat di wilayah desa.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1.25rem' }}>
            {profile?.contact?.emergencyContacts?.map((em, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '0.85rem'
                }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#fee2e2',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Phone size={20} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase' }}>
                    {em.role}
                  </span>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.1rem 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {em.name}
                  </h4>
                  <a
                    href={`tel:${em.phone}`}
                    style={{ fontSize: '0.85rem', fontWeight: 700, color: '#059669', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    {em.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CONTACT INFO & FORM GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '2rem', alignItems: 'start' }}>
          {/* Left: Office Details & Map */}
          <div>
            <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '1.75rem', border: '1px solid var(--light-border)', marginBottom: '1.5rem', boxShadow: 'var(--shadow-card)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
                Kantor Pemerintah Desa Sukamaju Mandiri
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <MapPin size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-main)' }}>Alamat Kantor:</strong>
                    <span style={{ color: 'var(--text-muted)' }}>{profile?.contact?.address}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <Clock size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-main)' }}>Jam Pelayanan Kantor:</strong>
                    <span style={{ color: 'var(--text-muted)' }}>{profile?.contact?.openingHours}</span>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.75rem', color: '#16a34a' }}>*Layanan mandiri surat online tetap aktif 24 jam</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                  <Phone size={20} color="#059669" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-main)' }}>Telepon Kantor:</strong>
                    <span style={{ color: 'var(--text-muted)' }}>{profile?.contact?.phone}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                  <Mail size={20} color="#059669" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-main)' }}>Email Resmi:</strong>
                    <span style={{ color: 'var(--text-muted)' }}>{profile?.contact?.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Frame Card */}
            <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--light-border)', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ padding: '0.85rem 1.25rem', background: '#f8fafc', borderBottom: '1px solid var(--light-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>
                  Peta Lokasi Kantor Desa
                </span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile?.name || 'Desa Sukamaju')}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: '0.775rem', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  Google Maps <ExternalLink size={12} />
                </a>
              </div>
              <div style={{ height: '200px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <iframe
                  title="Peta Kantor Desa"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798511757689!2d107.6165!3d-6.9175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTUnMDIuOCJTIDEwN8KwMzYnNTkuNCJF!5e0!3m2!1sid!2sid!4v1600000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right: Direct Message Form */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '1.75rem', border: '1px solid var(--light-border)', boxShadow: 'var(--shadow-card)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
              Kirim Pesan Langsung
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Ada pertanyaan, kerjasama, atau informasi yang Anda butuhkan? Silakan isi formulir di bawah.
            </p>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle2 size={40} color="#059669" style={{ margin: '0 auto 0.75rem' }} />
                <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>Pesan Terkirim!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>
                  Pesan Anda telah diterima oleh sekretariat desa dan akan segera kami balas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda"
                    className="form-control"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nomor WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="0812..."
                      className="form-control"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Alamat Email</label>
                    <input
                      type="email"
                      placeholder="email@domain.com"
                      className="form-control"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Isi Pesan *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan pesan atau pertanyaan Anda..."
                    className="form-control"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Send size={16} /> Kirim Pesan
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
