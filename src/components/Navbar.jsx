import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Info, 
  Newspaper, 
  Image, 
  ShoppingBag, 
  Palmtree, 
  FileText, 
  PhoneCall, 
  ShieldCheck, 
  Search, 
  Menu, 
  X 
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenTracking, profile }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'profile', label: 'Profil Desa', icon: Info },
    { id: 'news', label: 'Berita', icon: Newspaper },
    { id: 'gallery', label: 'Galeri', icon: Image },
    { id: 'umkm', label: 'Produk UMKM', icon: ShoppingBag },
    { id: 'tourism', label: 'Wisata', icon: Palmtree },
    { id: 'services', label: 'Pelayanan', icon: FileText },
    { id: 'contact', label: 'Kontak', icon: PhoneCall },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar-wrapper">
      <div className="container navbar-container">
        {/* Brand */}
        <a 
          href="#home" 
          className="brand-logo" 
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
        >
          <div className="brand-icon">
            <Building2 size={24} />
          </div>
          <div className="brand-text">
            <h1>{profile?.name || 'Desa Pintar'}</h1>
            <span>Smart Village Portal</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <li key={item.id}>
                <button
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Action Buttons */}
        <div className="nav-actions">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onOpenTracking}
            title="Lacak Status Surat Anda"
          >
            <Search size={15} />
            <span>Lacak Surat</span>
          </button>

          <button 
            className="btn btn-primary btn-sm"
            onClick={() => handleNavClick('admin')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <ShieldCheck size={16} />
            <span>Admin</span>
          </button>

          <button 
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
