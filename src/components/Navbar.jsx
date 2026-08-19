import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  Search, 
  Sun,
  Moon,
  Monitor,
  User,
  ShieldCheck,
  Compass,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { initColorMode, applyColorMode } from '../services/themeHelper';

export default function Navbar({ 
  activePage, 
  setActivePage, 
  onOpenTracking, 
  onOpenBansos,
  onOpenPanic,
  onOpenMap,
  onOpenSelfService,
  profile, 
  isAdminLoggedIn = false 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [colorMode, setColorMode] = useState('auto'); // 'auto', 'dark', 'light'

  useEffect(() => {
    const initialMode = initColorMode();
    setColorMode(initialMode);

    const handleThemeChange = (e) => {
      if (e.detail?.mode) {
        setColorMode(e.detail.mode);
      }
    };

    window.addEventListener('desa-colormode-changed', handleThemeChange);
    return () => window.removeEventListener('desa-colormode-changed', handleThemeChange);
  }, []);

  const handleCycleTheme = () => {
    let nextMode = 'auto';
    if (colorMode === 'auto') nextMode = 'dark';
    else if (colorMode === 'dark') nextMode = 'light';
    else if (colorMode === 'light') nextMode = 'auto';

    setColorMode(nextMode);
    applyColorMode(nextMode);
  };

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
        
        {/* 1. Brand Logo & Name */}
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

        {/* 2. Desktop Navigation Links */}
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

        {/* 3. Action Buttons & Quick Controls */}
        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          
          {/* Cek Bansos Button */}
          {onOpenBansos && (
            <button
              type="button"
              className="navbar-btn-secondary d-none-mobile"
              onClick={onOpenBansos}
              title="Cek Kepesertaan Bansos & BLT Dana Desa"
              style={{ color: '#059669', borderColor: '#86efac', fontWeight: 700 }}
            >
              <ShieldCheck size={13} />
              <span>Cek Bansos</span>
            </button>
          )}

          {/* Lacak Surat Button */}
          <button 
            type="button" 
            className="navbar-btn-secondary d-none-mobile"
            onClick={onOpenTracking}
            title="Lacak Surat Masuk / Keluar Online"
          >
            <Search size={13} />
            <span>Lacak</span>
          </button>

          {/* Automatic / Dark / Light Mode Switcher */}
          <button 
            className="navbar-btn-secondary navbar-theme-btn"
            onClick={handleCycleTheme}
            title={`Mode Tampilan: ${colorMode === 'auto' ? 'Otomatis (Sesuai Sistem)' : colorMode === 'dark' ? 'Mode Gelap' : 'Mode Terang'} (Klik untuk ganti)`}
            aria-label="Ganti Mode Tampilan"
            style={{ 
              width: '34px', 
              height: '34px', 
              padding: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: 'var(--radius-full)'
            }}
          >
            {colorMode === 'auto' ? (
              <Monitor size={15} style={{ color: 'var(--primary)' }} />
            ) : colorMode === 'dark' ? (
              <Moon size={15} style={{ color: '#38bdf8' }} />
            ) : (
              <Sun size={15} style={{ color: '#f59e0b' }} />
            )}
          </button>

          {/* Duplicate Lacak button removed */}

          {/* SVG Profil Orang / Admin Avatar Button */}
          <button 
            className="navbar-admin-avatar-btn"
            onClick={() => handleNavClick(isAdminLoggedIn ? 'dashboard' : 'login')}
            title={isAdminLoggedIn ? "Masuk ke Dashboard Admin" : "Login Akun Petugas Desa"}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
              color: '#ffffff',
              border: 'none',
              padding: '0.35rem 0.75rem 0.35rem 0.45rem',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              boxShadow: '0 2px 8px var(--primary-border)',
              transition: 'var(--transition)'
            }}
          >
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {/* SVG Profile Avatar */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {isAdminLoggedIn && (
                <span style={{
                  position: 'absolute',
                  top: '-1px',
                  right: '-1px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  border: '1.5px solid #ffffff'
                }}></span>
              )}
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>
              {isAdminLoggedIn ? 'Panel' : 'Admin'}
            </span>
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

          <div className="mobile-actions-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.75rem' }}>
            {onOpenBansos && (
              <button 
                className="navbar-btn-secondary"
                style={{ justifyContent: 'center', color: '#059669', borderColor: '#86efac', fontWeight: 700 }}
                onClick={() => { onOpenBansos(); setMobileMenuOpen(false); }}
              >
                <ShieldCheck size={14} /> Cek Bansos
              </button>
            )}

            <button 
              className="navbar-btn-secondary"
              style={{ justifyContent: 'center' }}
              onClick={() => {
                onOpenTracking();
                setMobileMenuOpen(false);
              }}
            >
              <Search size={14} /> Lacak Resi
            </button>

            <button 
              className="navbar-btn-secondary"
              style={{ justifyContent: 'center', gridColumn: 'span 2' }}
              onClick={handleCycleTheme}
              title={`Mode: ${colorMode}`}
            >
              {colorMode === 'dark' ? <Moon size={14} style={{ color: '#38bdf8' }} /> : <Sun size={14} style={{ color: '#f59e0b' }} />} {colorMode === 'auto' ? 'Tema Otomatis' : colorMode === 'dark' ? 'Tema Gelap' : 'Tema Terang'}
            </button>
          </div>

          <div style={{ marginTop: '0.75rem' }}>
            <button 
              className="navbar-btn-primary"
              style={{ width: '100%', justifyContent: 'center', gap: '0.5rem', height: '38px' }}
              onClick={() => handleNavClick(isAdminLoggedIn ? 'dashboard' : 'login')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>{isAdminLoggedIn ? 'Masuk Dashboard Admin' : 'Login Petugas Desa'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
