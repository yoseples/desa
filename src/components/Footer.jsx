import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Heart, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Footer({ profile, setActivePage, onOpenTracking }) {
  const currentYear = new Date().getFullYear();

  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-grid">
          
          {/* Col 1: Identity & Description */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              {profile?.logo ? (
                <img
                  src={profile.logo}
                  alt="Logo Desa"
                  style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'contain' }}
                />
              ) : (
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}>
                  <Building2 size={24} />
                </div>
              )}
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  {profile?.name || 'Desa Sukamaju'}
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                  Smart Village System v2.0
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {profile?.tagline || 'Maju Bersama Teknologi, Harmoni Bersama Tradisi Menuju Desa Berdaya & Sejahtera.'}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.8rem' }}>
              <span className="badge badge-success" style={{ padding: '0.2rem 0.6rem' }}>Desa Digital Mandiri</span>
              <span>Kode: {profile?.code}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Jelajahi Portal</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => handleNav('home')}>
                  <ChevronRight size={14} /> Beranda
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('profile')}>
                  <ChevronRight size={14} /> Profil & Struktur Desa
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('news')}>
                  <ChevronRight size={14} /> Berita & Pengumuman
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('umkm')}>
                  <ChevronRight size={14} /> Produk UMKM Desa
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('tourism')}>
                  <ChevronRight size={14} /> Destinasi Wisata
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')}>
                  <ChevronRight size={14} /> Galeri Foto Kegiatan
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Public Services */}
          <div className="footer-col">
            <h4 className="footer-title">Layanan Warga</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => handleNav('services')}>
                  <ChevronRight size={14} /> Pengajuan Surat Online
                </button>
              </li>
              <li>
                <button onClick={onOpenTracking}>
                  <ChevronRight size={14} /> Cek Status Resi Surat
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')}>
                  <ChevronRight size={14} /> Pojok Aspirasi & Pengaduan
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('login')}>
                  <ChevronRight size={14} /> Dashboard Admin (/login)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="footer-col">
            <h4 className="footer-title">Kantor Balai Desa</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <MapPin size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{profile?.contact?.address || 'Jl. Raya Desa Sukamaju No. 01'}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <Phone size={18} color="#10b981" style={{ flexShrink: 0 }} />
                <span>{profile?.contact?.phone || '(022) 8765-4321'}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <Mail size={18} color="#10b981" style={{ flexShrink: 0 }} />
                <span>{profile?.contact?.email || 'pemdes@desasukamaju.id'}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <Clock size={18} color="#10b981" style={{ flexShrink: 0 }} />
                <span>{profile?.contact?.openingHours || 'Senin - Jumat: 08.00 - 15.30 WIB'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
            &copy; {currentYear} <strong>{profile?.name || 'Pemerintah Desa Sukamaju Mandiri'}</strong>. Seluruh Hak Cipta Dilindungi.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
            <span>Kecamatan {profile?.district}</span>
            <span>•</span>
            <button 
              onClick={() => handleNav('login')}
              style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', padding: 0, fontWeight: 700 }}
            >
              Login Admin (/login)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
