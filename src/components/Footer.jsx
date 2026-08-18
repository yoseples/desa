import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  Heart,
  ShieldCheck
} from 'lucide-react';

export default function Footer({ profile, setActivePage, onOpenTracking }) {
  const currentYear = new Date().getFullYear();

  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrap">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', cursor: 'pointer' }} onClick={() => handleNav('home')}>
              {profile?.logo ? (
                <img
                  src={profile.logo}
                  alt="Logo Desa"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    objectFit: 'contain',
                    background: '#ffffff',
                    padding: '2px'
                  }}
                />
              ) : (
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}>
                  <Building2 size={22} />
                </div>
              )}
              <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{profile?.name || 'Desa Sukamaju'}</h2>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              {profile?.tagline || 'Pusat pelayanan digital terpadu dan informasi publik resmi desa.'}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                ✓ Smart Village Terakreditasi
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-title">Jelajahi Portal</h3>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNav('home'); }}>Beranda Utama</a></li>
              <li><a href="#profile" onClick={(e) => { e.preventDefault(); handleNav('profile'); }}>Profil & Visi Misi</a></li>
              <li><a href="#news" onClick={(e) => { e.preventDefault(); handleNav('news'); }}>Kabar Berita Desa</a></li>
              <li><a href="#umkm" onClick={(e) => { e.preventDefault(); handleNav('umkm'); }}>Etalase Produk UMKM</a></li>
              <li><a href="#tourism" onClick={(e) => { e.preventDefault(); handleNav('tourism'); }}>Destinasi Wisata Alam</a></li>
              <li><a href="#gallery" onClick={(e) => { e.preventDefault(); handleNav('gallery'); }}>Dokumentasi Galeri</a></li>
            </ul>
          </div>

          {/* Citizen Services */}
          <div>
            <h3 className="footer-title">Layanan Warga</h3>
            <ul className="footer-links">
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>Pengajuan Surat Mandiri</a></li>
              <li><a href="#tracking" onClick={(e) => { e.preventDefault(); onOpenTracking(); }}>Lacak Nomor Resi Surat</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>Sampaikan Aspirasi / Laporan</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('contact'); }}>Kontak Darurat 24 Jam</a></li>
              <li><a href="#admin" onClick={(e) => { e.preventDefault(); handleNav('admin'); }}>Masuk Admin Panel</a></li>
            </ul>
          </div>

          {/* Office Contact Info */}
          <div>
            <h3 className="footer-title">Kantor Pemerintah Desa</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{profile?.contact?.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Clock size={16} color="#10b981" style={{ flexShrink: 0 }} />
                <span>{profile?.contact?.openingHours}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Phone size={16} color="#10b981" style={{ flexShrink: 0 }} />
                <span>{profile?.contact?.phone}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Mail size={16} color="#10b981" style={{ flexShrink: 0 }} />
                <span>{profile?.contact?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p style={{ margin: 0 }}>
            &copy; {currentYear} <strong>{profile?.name}</strong>. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <p style={{ margin: 0, color: '#64748b' }}>
            Dikembangkan untuk Transformasi Smart Village Nusantara
          </p>
        </div>
      </div>
    </footer>
  );
}
