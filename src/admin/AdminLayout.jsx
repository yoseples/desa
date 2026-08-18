import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Newspaper, 
  ShoppingBag, 
  Palmtree, 
  Image, 
  FileText, 
  MessageSquare, 
  Settings, 
  ExternalLink, 
  LogOut, 
  ShieldCheck, 
  Menu, 
  X,
  Bell,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({ 
  activeTab, 
  setActiveTab, 
  onBackToPublic, 
  profile, 
  pendingCount, 
  complaintCount,
  children 
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Ringkasan & Statistik', icon: LayoutDashboard },
    { id: 'services', label: 'Pelayanan Surat Online', icon: FileText, badge: pendingCount },
    { id: 'complaints', label: 'Aspirasi & Pengaduan', icon: MessageSquare, badge: complaintCount },
    { id: 'news', label: 'Kelola Berita Desa', icon: Newspaper },
    { id: 'umkm', label: 'Kelola Produk UMKM', icon: ShoppingBag },
    { id: 'tourism', label: 'Kelola Wisata Desa', icon: Palmtree },
    { id: 'gallery', label: 'Kelola Galeri Foto', icon: Image },
    { id: 'settings', label: 'Pengaturan Profil Desa', icon: Settings },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`} style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 1000
      }}>
        {/* Sidebar Header */}
        <div className="admin-sidebar-header">
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <ShieldCheck size={22} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Admin Panel Desa
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
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
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span style={{
                    background: '#ef4444',
                    color: '#fff',
                    borderRadius: '9999px',
                    padding: '0.15rem 0.5rem',
                    fontSize: '0.75rem',
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
        <div style={{ padding: '1rem', borderTop: '1px solid var(--dark-border)' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={onBackToPublic}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)',
              justifyContent: 'flex-start'
            }}
          >
            <ExternalLink size={16} /> Lihat Portal Publik
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className="mobile-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ display: 'none' }}
            >
              <Menu size={22} />
            </button>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              {menuItems.find(m => m.id === activeTab)?.label || 'Dashboard'}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src={profile?.headOfVillage?.photo}
                alt="Admin"
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #10b981' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Administrator
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {profile?.name}
                </span>
              </div>
            </div>

            <button
              className="btn btn-sm btn-secondary"
              onClick={onBackToPublic}
              title="Keluar ke Portal Warga"
            >
              <LogOut size={15} /> Keluar
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
