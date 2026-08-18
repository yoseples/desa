import React from 'react';
import { Building2, MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ profile, setActivePage, onOpenTracking }) {
  return (
    <footer className="footer-wrap">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #10b981, #0d9488)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <Building2 size={22} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>{profile?.name}</h2>
                <span style={{ fontSize: '0.75rem', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Smart Village System
                </span>
              </div>
            </div>
            <p>
              {profile?.tagline || 'Mewujudkan tata kelola desa yang transparan, pelayanan publik cepat, dan kesejahteraan warga berbasis teknologi digital.'}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                className="btn btn-sm btn-outline-white"
                onClick={() => { setActivePage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                Buat Surat Online <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div>
            <h4 className="footer-title">Navigasi Utama</h4>
            <ul className="footer-links">
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Beranda
                </a>
              </li>
              <li>
                <a href="#profile" onClick={(e) => { e.preventDefault(); setActivePage('profile'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Profil & Aparatur
                </a>
              </li>
              <li>
                <a href="#news" onClick={(e) => { e.preventDefault(); setActivePage('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Berita & Kegiatan
                </a>
              </li>
              <li>
                <a href="#umkm" onClick={(e) => { e.preventDefault(); setActivePage('umkm'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Katalog Produk UMKM
                </a>
              </li>
              <li>
                <a href="#tourism" onClick={(e) => { e.preventDefault(); setActivePage('tourism'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Destinasi Wisata Desa
                </a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => { e.preventDefault(); setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Galeri Foto Desa
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan Warga */}
          <div>
            <h4 className="footer-title">Layanan Warga</h4>
            <ul className="footer-links">
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); setActivePage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Surat Keterangan Usaha (SKU)
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); setActivePage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Surat Keterangan Tidak Mampu
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); setActivePage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Pengantar SKCK Kepolisian
                </a>
              </li>
              <li>
                <a href="#tracking" onClick={(e) => { e.preventDefault(); onOpenTracking(); }}>
                  Lacak Resi Pengajuan Surat
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Pengaduan & Aspirasi Warga
                </a>
              </li>
              <li>
                <a href="#admin" onClick={(e) => { e.preventDefault(); setActivePage('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#10b981' }}>
                    <ShieldCheck size={14} /> Login Admin Desa
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontak Kantor */}
          <div>
            <h4 className="footer-title">Kantor Pemerintah Desa</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                <span>{profile?.contact?.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                <span>{profile?.contact?.phone}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Mail size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                <span>{profile?.contact?.email}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Clock size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                <span>{profile?.contact?.openingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {profile?.name}. Hak Cipta Dilindungi Undang-Undang.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Dikembangkan untuk Transformasi Digital Desa Mandiri <Heart size={14} color="#ef4444" fill="#ef4444" />
          </p>
        </div>
      </div>
    </footer>
  );
}
