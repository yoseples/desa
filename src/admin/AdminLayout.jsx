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
  Building2 
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

  const menuItems = [
    { id: 'dashboard', label: 'Ringkasan & Statistik', icon: LayoutDashboard },
    { id: 'programs', label: 'Program Kerja & APBDes', icon: Briefcase, badge: programCount },
    { id: 'citizens', label: 'Database KK & Warga', icon: Users, badge: familyCount },
    { id: 'services', label: 'Permohonan Masuk', icon: FileText, badge: pendingCount },
    { id: 'letter-templates', label: 'Template & Cetak Surat', icon: Printer },
    { id: 'complaints', label: 'Aspirasi & Pengaduan', icon: MessageSquare, badge: complaintCount },
    { id: 'news', label: 'Kelola Berita Desa', icon: Newspaper },
    { id: 'umkm', label: 'Kelola Produk UMKM', icon: ShoppingBag },
    { id: 'tourism', label: 'Kelola Wisata Desa', icon: Palmtree },
    { id: 'gallery', label: 'Kelola Galeri Foto', icon: Image },
    { id: 'settings', label: 'Pengaturan Profil & Logo', icon: Settings },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Sidebar Header */}
        <div className="admin-sidebar-header">
          {profile?.logo ? (
            <img
              src={profile.logo}
              alt="Logo Desa"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                objectFit: 'contain',
                background: '#ffffff',
                padding: '2px',
                flexShrink: 0
              }}
            />
          ) : (
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              flexShrink: 0
            }}>
              <ShieldCheck size={20} />
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {profile?.name || 'Admin Panel Desa'}
            </h3>
            <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600 }}>
              Smart CMS v2.0
            </span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="admin-nav">
          {menuItems.map((item) => {
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
                    background: item.id === 'citizens' ? '#0d9488' : item.id === 'programs' ? '#059669' : '#ef4444',
                    color: '#fff',
                    borderRadius: '9999px',
                    padding: '0.1rem 0.45rem',
                    fontSize: '0.7rem',
                    fontWeight: 800
                  }}>
                    {item.badge}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: '0.85rem', borderTop: '1px solid var(--dark-border)' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={onBackToPublic}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)',
              justifyContent: 'flex-start',
              fontSize: '0.8rem'
            }}
          >
            <ExternalLink size={14} /> Keluar ke Portal Warga
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              className="mobile-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ display: 'none' }}
            >
              <Menu size={20} />
            </button>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              {menuItems.find(m => m.id === activeTab)?.label || 'Dashboard'}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <img
                src={profile?.headOfVillage?.photo}
                alt="Admin"
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #10b981' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Administrator
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {profile?.name}
                </span>
              </div>
            </div>

            <button
              className="btn btn-sm btn-secondary"
              onClick={onBackToPublic}
              title="Keluar ke Portal Warga"
              style={{ height: '32px', padding: '0 0.65rem' }}
            >
              <LogOut size={13} /> Keluar
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
