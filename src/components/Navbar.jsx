import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Info, 
  Newspaper, 
  ShoppingBag, 
  Palmtree, 
  Image, 
  FileText, 
  Phone, 
  ShieldCheck, 
  Search,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenTracking, profile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'profile', label: 'Profil Desa', icon: Info },
    { id: 'news', label: 'Berita', icon: Newspaper },
    { id: 'umkm', label: 'Produk UMKM', icon: ShoppingBag },
    { id: 'tourism', label: 'Wisata', icon: Palmtree },
    { id: 'gallery', label: 'Galeri', icon: Image },
    { id: 'services', label: 'Pelayanan', icon: FileText },
    { id: 'contact', label: 'Kontak', icon: Phone },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <div 
          className="brand-logo" 
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer' }}
        >
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
                border: '1px solid var(--light-border)',
                padding: '2px'
              }}
            />
          ) : (
            <div className="brand-icon">
              <Building2 size={22} />
            </div>
          )}
          <div className="brand-text">
            <h1>{profile?.name || 'Desa Sukamaju'}</h1>
            <span>Smart Village Portal</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Buttons: Tracking & Admin */}
        <div className="nav-actions">
          <button
            className="btn btn-secondary btn-sm"
            onClick={onOpenTracking}
            title="Lacak status pengajuan surat warga"
          >
            <Search size={15} />
            <span className="hide-mobile">Lacak Surat</span>
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleNavClick('admin')}
            title="Masuk ke Dashboard Admin"
          >
            <ShieldCheck size={15} />
            <span>Admin</span>
          </button>

          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
