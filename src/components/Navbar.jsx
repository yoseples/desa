import React, { useState } from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  Search, 
  LogIn,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenTracking, profile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Beranda' },
    { id: 'profile', label: 'Profil' },
    { id: 'news', label: 'Berita' },
    { id: 'umkm', label: 'UMKM' },
    { id: 'tourism', label: 'Wisata' },
    { id: 'gallery', label: 'Galeri' },
    { id: 'services', label: 'Layanan' },
    { id: 'contact', label: 'Kontak' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        
        {/* 1. Brand Logo & Name (Compact & Crisp) */}
        <div 
          className="navbar-brand" 
          onClick={() => handleNavClick('home')}
          title="Ke Beranda Utama"
        >
          {profile?.logo ? (
            <img 
              src={profile.logo} 
              alt="Logo Desa" 
              className="navbar-logo-img"
            />
          ) : (
            <div className="navbar-logo-icon">
              <Building2 size={18} color="#ffffff" />
            </div>
          )}
          <div className="navbar-brand-text">
            <span className="navbar-title">{profile?.name || 'Desa Pintar'}</span>
            <span className="navbar-subtitle">{profile?.district || 'Kabupaten Nusantara'}</span>
          </div>
        </div>

        {/* 2. Desktop Navigation Links (Balanced & Symmetrical) */}
        <nav className="navbar-links" aria-label="Navigasi Utama">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className={`navbar-link ${activePage === link.id ? 'active' : ''}`}
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* 3. Action Buttons (Compact & Aligned) */}
        <div className="navbar-actions">
          <button 
            className="navbar-btn-secondary"
            onClick={onOpenTracking}
            title="Lacak Pengajuan Surat Berdasarkan Nomor Resi"
          >
            <Search size={13} />
            <span>Lacak</span>
          </button>

          <button 
            className="navbar-btn-primary"
            onClick={() => handleNavClick('login')}
            title="Masuk ke Panel Pengelolaan Desa"
          >
            <LogIn size={13} />
            <span>Admin</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu Navigasi"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-links-grid">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={`mobile-link ${activePage === link.id ? 'active' : ''}`}
                onClick={() => handleNavClick(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mobile-actions-row">
            <button 
              className="navbar-btn-secondary"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => {
                onOpenTracking();
                setMobileMenuOpen(false);
              }}
            >
              <Search size={14} /> Lacak Resi
            </button>
            <button 
              className="navbar-btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => handleNavClick('login')}
            >
              <LogIn size={14} /> Login Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
