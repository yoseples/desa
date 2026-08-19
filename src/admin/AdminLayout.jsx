import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase,
  Newspaper, 
  ShoppingBag, 
  Palmtree, 
  Image, 
  FileText, 
  Printer,
  MessageSquare, 
  Settings, 
  ExternalLink, 
  LogOut, 
  ShieldCheck, 
  Menu, 
  X,
  Building2,
  ChevronRight,
  Globe,
  UserCheck,
  Shield,
  Sun,
  Moon,
  Monitor,
  HeartPulse,
  Tractor,
  Store,
  BookOpen
} from 'lucide-react';
import { USER_ROLES } from '../services/initialData';
import { initColorMode, applyColorMode } from '../services/themeHelper';
import AdminNotificationDropdown from './AdminNotificationDropdown';

export default function AdminLayout({ 
  activeTab, 
  setActiveTab, 
  onBackToPublic, 
  profile, 
  currentUser,
  userCount,
  pendingCount, 
  complaintCount, 
  familyCount,
  programCount,
  requestsList = [],
  complaintsList = [],
  children 
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [colorMode, setColorMode] = useState('auto');

  useEffect(() => {
    const initial = initColorMode();
    setColorMode(initial);

    const handleThemeChange = (e) => {
      if (e.detail?.mode) {
        setColorMode(e.detail.mode);
      }
    };

    window.addEventListener('desa-colormode-changed', handleThemeChange);
    return () => window.removeEventListener('desa-colormode-changed', handleThemeChange);
  }, []);

  const handleCycleTheme = () => {
    let next = 'auto';
    if (colorMode === 'auto') next = 'dark';
    else if (colorMode === 'dark') next = 'light';
    else if (colorMode === 'light') next = 'auto';

    setColorMode(next);
    applyColorMode(next);
  };

  const menuSections = [
    {
      title: 'Info Desa & Keuangan',
      items: [
        { id: 'dashboard', label: 'Dashboard Siteman', icon: LayoutDashboard },
        { id: 'profile', label: 'Identitas & Pamong', icon: Building2 },
        { id: 'programs', label: 'Keuangan APBDes', icon: Briefcase, badge: programCount, badgeColor: '#059669' },
      ]
    },
    {
      title: 'Administrasi Kependudukan',
      items: [
        { id: 'citizens', label: 'Data Penduduk & KK', icon: Users, badge: familyCount, badgeColor: '#0d9488' },
        { id: 'statistics', label: 'Statistik & Piramida', icon: Sun, badgeColor: '#2563eb' },
      ]
    },
    {
      title: 'Layanan Administrasi',
      items: [
        { id: 'services', label: 'Permohonan Surat', icon: FileText, badge: pendingCount, badgeColor: '#2563eb' },
        { id: 'letter-templates', label: 'Template & Cetak Surat', icon: Printer },
        { id: 'complaints', label: 'Pengaduan Warga', icon: MessageSquare, badge: complaintCount, badgeColor: '#dc2626' },
      ]
    },
    {
      title: 'Bansos & Pertanahan',
      items: [
        { id: 'bansos', label: 'Bansos & DTKS', icon: ShieldCheck, badgeColor: '#059669' },
        { id: 'land', label: 'Buku Letter C & TKD', icon: BookOpen, badgeColor: '#d97706' },
      ]
    },
    {
      title: 'Kesehatan & Ekonomi',
      items: [
        { id: 'health', label: 'e-Posyandu & Stunting', icon: HeartPulse, badgeColor: '#db2777' },
        { id: 'agriculture', label: 'Pertanian & Poktan', icon: Tractor },
        { id: 'bumdes', label: 'BUMDes & Pasar', icon: Store },
      ]
    },
    {
      title: 'Informasi & Publikasi',
      items: [
        { id: 'news', label: 'Berita & Pengumuman', icon: Newspaper },
        { id: 'umkm', label: 'Katalog UMKM', icon: ShoppingBag },
        { id: 'tourism', label: 'Pariwisata Desa', icon: Palmtree },
      ]
    },
    {
      title: 'Sistem & Pelaporan',
      items: [
        { id: 'reports', label: 'Buku Administrasi 47/2016', icon: BookOpen },
        { id: 'users', label: 'Pengguna & Hak Akses', icon: UserCheck, badge: userCount, badgeColor: '#10b981' },
        { id: 'settings', label: 'Pengaturan Sistem', icon: Settings },
      ]
    }
  ];

  const allItems = menuSections.flatMap(s => s.items);
  const activeItem = allItems.find(m => m.id === activeTab);

  return (
    <div className="admin-layout">
      {/* Mobile Drawer Backdrop */}
      <div 
        className={`admin-backdrop ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-label="Tutup Menu"
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Sidebar Header */}
        <div className="admin-sidebar-header">
          {profile?.logo ? (
            <img
              src={profile.logo}
              alt="Logo Desa"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                objectFit: 'contain',
                background: '#ffffff',
                padding: '2px',
                flexShrink: 0
              }}
            />
          ) : (
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              flexShrink: 0
            }}>
              <ShieldCheck size={22} />
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {profile?.name || 'Admin Panel Desa'}
            </h3>
            <span style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 700, letterSpacing: '0.02em' }}>
              Portal Administrasi v2.0
            </span>
          </div>

          <button
            className="mobile-toggle"
            onClick={() => setSidebarOpen(false)}
            style={{ color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="admin-nav">
          {menuSections.map((section, sIdx) => (
            <div key={sIdx}>
              <div className="admin-nav-section-title">{section.title}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <div
                    key={item.id}
                    className={`admin-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                  >
                    <div className="admin-nav-icon-label">
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span style={{
                        background: item.badgeColor || '#ef4444',
                        color: '#fff',
                        borderRadius: '9999px',
                        padding: '0.1rem 0.5rem',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        minWidth: '20px',
                        textAlign: 'center'
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: '0.85rem 1rem', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={onBackToPublic}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.07)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.15)',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 700
            }}
          >
            <ExternalLink size={14} /> Lihat Portal Warga
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
            <button
              className="mobile-toggle btn btn-sm btn-secondary"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Buka Menu Sidebar"
              style={{ padding: '0.4rem', height: '36px', width: '36px' }}
            >
              <Menu size={18} />
            </button>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>CMS Desa</span>
                <ChevronRight size={12} />
                <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{activeItem?.label || 'Dashboard'}</span>
              </div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, lineHeight: 1.2 }}>
                {activeItem?.label || 'Dashboard'}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            {/* Notification Bell Dropdown */}
            <AdminNotificationDropdown
              requestsList={requestsList}
              complaintsList={complaintsList}
              onNavigateTab={setActiveTab}
            />

            {/* Quick Dark / Light Mode Switcher */}
            <button 
              className="btn btn-sm btn-secondary"
              onClick={handleCycleTheme}
              title={`Mode Tampilan: ${colorMode === 'auto' ? 'Otomatis (Sesuai Sistem & Malam)' : colorMode === 'dark' ? 'Mode Gelap (Nyaman Mata)' : 'Mode Terang'} (Klik untuk ganti)`}
              style={{ width: '34px', height: '34px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-full)' }}
            >
              {colorMode === 'auto' ? (
                <Monitor size={15} style={{ color: 'var(--primary)' }} />
              ) : colorMode === 'dark' ? (
                <Moon size={15} style={{ color: '#fbbf24' }} />
              ) : (
                <Sun size={15} style={{ color: '#f59e0b' }} />
              )}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <img
                src={currentUser?.avatar || profile?.headOfVillage?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={currentUser?.name || "Admin"}
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #10b981', background: '#e2e8f0' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }} className="d-none-mobile">
                <span style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {currentUser?.name || 'Administrator'}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentUser ? (USER_ROLES[currentUser.role]?.label || currentUser.position) : (profile?.name || 'Admin Panel')}
                </span>
              </div>
            </div>

            <button
              className="btn btn-sm btn-secondary"
              onClick={onBackToPublic}
              title="Keluar ke Portal Warga"
              style={{ height: '34px', padding: '0 0.75rem', fontSize: '0.8rem', fontWeight: 600 }}
            >
              <LogOut size={14} /> <span style={{ marginLeft: '4px' }}>Keluar</span>
            </button>
          </div>
        </header>

        {/* Content View */}
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
