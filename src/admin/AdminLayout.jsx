import React, { useState } from 'react';
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
  Globe
} from 'lucide-react';

export default function AdminLayout({ 
  activeTab, 
  setActiveTab, 
  onBackToPublic, 
  profile, 
  pendingCount, 
  complaintCount, 
  familyCount,
  programCount,
  children 
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuSections = [
    {
      title: 'Menu Utama',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'programs', label: 'RAPBDes', icon: Briefcase, badge: programCount, badgeColor: '#059669' },
        { id: 'citizens', label: 'Database', icon: Users, badge: familyCount, badgeColor: '#0d9488' },
      ]
    },
    {
      title: 'Pelayanan & Aspirasi',
      items: [
        { id: 'services', label: 'Permohonan', icon: FileText, badge: pendingCount, badgeColor: '#2563eb' },
        { id: 'letter-templates', label: 'Template Surat', icon: Printer },
        { id: 'complaints', label: 'Pengaduan', icon: MessageSquare, badge: complaintCount, badgeColor: '#dc2626' },
      ]
    },
    {
      title: 'Publikasi & Potensi',
      items: [
        { id: 'news', label: 'Berita Desa', icon: Newspaper },
        { id: 'umkm', label: 'Produk UMKM', icon: ShoppingBag },
        { id: 'tourism', label: 'Wisata Desa', icon: Palmtree },
        { id: 'gallery', label: 'Galeri Foto', icon: Image },
      ]
    },
    {
      title: 'Sistem & Identitas',
      items: [
        { id: 'settings', label: 'Pengaturan', icon: Settings },
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <img
                src={profile?.headOfVillage?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt="Admin"
                style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #10b981', background: '#e2e8f0' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }} className="d-none-mobile">
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Administrator
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {profile?.name}
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
