import React, { useState } from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  Search, 
  FileText, 
  User, 
  Image, 
  Newspaper, 
  ShoppingBag, 
  Palmtree, 
  Phone, 
  ShieldCheck, 
  LogIn,
  Layers,
  Sparkles
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenTracking, profile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Beranda' },
    { id: 'profile', label: 'Profil Desa' },
    { id: 'news', label: 'Kabar Desa' },
    { id: 'umkm', label: 'Produk UMKM' },
    { id: 'tourism', label: 'Wisata' },
    { id: 'gallery', label: 'Galeri' },
    { id: 'services', label: 'Layanan Mandiri' },
    { id: 'contact', label: 'Kontak & Bantuan' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Brand Logo & Name */}
        <div 
          className="navbar-brand" 
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer' }}
        >
          {profile?.logo ? (
            <img 
              src={profile.logo} 
              alt="Logo Desa" 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                objectFit: 'contain',
                flexShrink: 0
              }} 
            />
          ) : (
            <div className="navbar-logo-icon">
              <Building2 size={24} color="#ffffff" />
            </div>
          )}
          <div className="navbar-brand-text">
            <span className="navbar-title">{profile?.name || 'Desa Pintar'}</span>
            <span className="navbar-subtitle">{profile?.subtitle || 'Kabupaten Nusantara'}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className={`navbar-link ${activePage === link.id ? 'active' : ''}`}
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Action Buttons: Tracking & Admin Login */}
        <div className="navbar-actions">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onOpenTracking}
            title="Lacak Pengajuan Surat Berdasarkan Nomor Resi"
          >
            <Search size={14} />
            <span>Lacak Resi</span>
          </button>

          <button 
            className="btn btn-primary btn-sm"
            onClick={() => handleNavClick('login')}
            title="Masuk ke Panel Pengelolaan Desa"
          >
            <LogIn size={14} />
            <span>Admin</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className={`mobile-link ${activePage === link.id ? 'active' : ''}`}
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
            </button>
          ))}
          <div style={{ padding: '0.75rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                onOpenTracking();
                setMobileMenuOpen(false);
              }}
            >
              <Search size={14} /> Lacak Status Surat (Resi)
            </button>
            <button 
              className="btn btn-primary btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => handleNavClick('login')}
            >
              <LogIn size={14} /> Masuk Panel Admin (/login)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
