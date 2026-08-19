import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  FileText, 
  MessageSquare, 
  CheckCheck, 
  Clock, 
  ChevronRight, 
  AlertCircle, 
  ExternalLink,
  Filter,
  CheckCircle2
} from 'lucide-react';

export default function AdminNotificationDropdown({
  requestsList = [],
  complaintsList = [],
  onNavigateTab
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'requests', 'complaints'
  const [readIds, setReadIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('desa_admin_read_notifs') || '[]');
    } catch {
      return [];
    }
  });

  const dropdownRef = useRef(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Derive pending items
  const pendingRequests = requestsList.filter(r => r.status === 'MENUNGGU' || r.status === 'DIPROSES');
  const pendingComplaints = complaintsList.filter(c => c.status === 'MASUK' || c.status === 'DITINDAKLANJUTI');

  // Format all notifications
  const allNotifications = [
    ...pendingRequests.map(r => ({
      id: r.id || `req-${r.trackingCode}`,
      type: 'request',
      title: `Permohonan ${r.letterType || 'Surat'}: ${r.trackingCode || ''}`,
      subtitle: `${r.citizenName || r.name || 'Warga'} • ${r.phone || '-'}`,
      time: r.submittedAt || r.updatedAt || 'Baru saja',
      badge: r.status === 'MENUNGGU' ? 'Perlu Verifikasi' : 'Sedang Diproses',
      badgeColor: r.status === 'MENUNGGU' ? '#ef4444' : '#f59e0b',
      icon: FileText,
      iconBg: '#ecfdf5',
      iconColor: '#059669',
      targetTab: 'services',
      raw: r
    })),
    ...pendingComplaints.map(c => ({
      id: c.id || `cmp-${Date.now()}`,
      type: 'complaint',
      title: `Aduan: ${c.subject || c.category || 'Aspirasi Warga'}`,
      subtitle: `${c.reporterName || 'Warga'} (${c.category || 'Umum'})`,
      time: c.date || 'Baru saja',
      badge: c.status === 'MASUK' ? 'Aduan Baru' : 'Ditindaklanjuti',
      badgeColor: c.status === 'MASUK' ? '#dc2626' : '#3b82f6',
      icon: MessageSquare,
      iconBg: '#fef2f2',
      iconColor: '#dc2626',
      targetTab: 'complaints',
      raw: c
    }))
  ];

  const unreadCount = allNotifications.filter(n => !readIds.includes(n.id)).length;

  const filteredNotifications = allNotifications.filter(n => {
    if (filter === 'requests') return n.type === 'request';
    if (filter === 'complaints') return n.type === 'complaint';
    return true;
  });

  const handleMarkAllRead = () => {
    const allIds = allNotifications.map(n => n.id);
    setReadIds(allIds);
    try {
      localStorage.setItem('desa_admin_read_notifs', JSON.stringify(allIds));
    } catch (e) {
      console.error(e);
    }
  };

  const handleItemClick = (item) => {
    if (!readIds.includes(item.id)) {
      const updated = [...readIds, item.id];
      setReadIds(updated);
      try {
        localStorage.setItem('desa_admin_read_notifs', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
    setIsOpen(false);
    if (onNavigateTab && item.targetTab) {
      onNavigateTab(item.targetTab);
    }
  };

  return (
    <div className="admin-notif-dropdown-wrapper" ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        className="btn btn-sm btn-secondary"
        onClick={() => setIsOpen(!isOpen)}
        title="Pusat Notifikasi & Permohonan Masuk"
        aria-expanded={isOpen}
        aria-haspopup="true"
        style={{
          width: '36px',
          height: '36px',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--radius-full)',
          position: 'relative'
        }}
      >
        <Bell size={16} style={{ color: unreadCount > 0 ? '#ef4444' : 'var(--text-muted)' }} />
        {unreadCount > 0 && (
          <span 
            style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              background: '#ef4444',
              color: '#ffffff',
              fontSize: '0.65rem',
              fontWeight: 800,
              minWidth: '18px',
              height: '18px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 4px',
              boxShadow: '0 0 0 2px var(--bg-card, #ffffff)',
              animation: 'pulseDot 2s infinite'
            }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div 
          className="admin-notif-panel"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '380px',
            maxWidth: 'calc(100vw - 2rem)',
            background: 'var(--bg-card, #ffffff)',
            borderRadius: 'var(--radius-lg, 16px)',
            boxShadow: '0 20px 30px -10px rgba(0,0,0,0.2), 0 10px 15px -5px rgba(0,0,0,0.1)',
            border: '1px solid var(--light-border, #e2e8f0)',
            zIndex: 1100,
            overflow: 'hidden',
            animation: 'slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Panel Header */}
          <div 
            style={{
              padding: '1rem 1.15rem',
              borderBottom: '1px solid var(--light-border, #e2e8f0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--bg-card, #ffffff)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.12)',
                color: 'var(--primary, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bell size={15} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main, #0f172a)' }}>
                  Pusat Notifikasi
                </h4>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted, #64748b)' }}>
                  {allNotifications.length} antrean perlu ditindaklanjuti
                </span>
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="btn btn-sm btn-secondary"
                style={{
                  fontSize: '0.7rem',
                  padding: '0.2rem 0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  borderRadius: '6px'
                }}
                title="Tandai semua notifikasi telah dibaca"
              >
                <CheckCheck size={12} />
                <span>Baca Semua</span>
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div 
            style={{
              display: 'flex',
              gap: '0.4rem',
              padding: '0.6rem 1rem',
              background: 'var(--bg-main, #f8fafc)',
              borderBottom: '1px solid var(--light-border, #e2e8f0)',
              overflowX: 'auto'
            }}
          >
            <button
              type="button"
              onClick={() => setFilter('all')}
              style={{
                border: 'none',
                background: filter === 'all' ? 'var(--primary, #059669)' : 'transparent',
                color: filter === 'all' ? '#ffffff' : 'var(--text-muted, #64748b)',
                fontSize: '0.725rem',
                fontWeight: 700,
                padding: '0.25rem 0.65rem',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Semua ({allNotifications.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('requests')}
              style={{
                border: 'none',
                background: filter === 'requests' ? 'var(--primary, #059669)' : 'transparent',
                color: filter === 'requests' ? '#ffffff' : 'var(--text-muted, #64748b)',
                fontSize: '0.725rem',
                fontWeight: 700,
                padding: '0.25rem 0.65rem',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Surat Masuk ({pendingRequests.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('complaints')}
              style={{
                border: 'none',
                background: filter === 'complaints' ? 'var(--primary, #059669)' : 'transparent',
                color: filter === 'complaints' ? '#ffffff' : 'var(--text-muted, #64748b)',
                fontSize: '0.725rem',
                fontWeight: 700,
                padding: '0.25rem 0.65rem',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Pengaduan ({pendingComplaints.length})
            </button>
          </div>

          {/* Notifications List */}
          <div 
            style={{
              maxHeight: '340px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {filteredNotifications.length === 0 ? (
              <div 
                style={{
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: 'var(--text-muted, #64748b)'
                }}
              >
                <div 
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CheckCircle2 size={24} />
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main, #0f172a)' }}>
                  Semua Beres!
                </div>
                <p style={{ margin: 0, fontSize: '0.75rem', lineHeight: 1.4, maxWidth: '240px' }}>
                  Tidak ada permohonan surat atau pengaduan tertunda yang membutuhkan tindakan saat ini.
                </p>
              </div>
            ) : (
              filteredNotifications.map((notif) => {
                const IconComp = notif.icon;
                const isUnread = !readIds.includes(notif.id);

                return (
                  <div
                    key={notif.id}
                    onClick={() => handleItemClick(notif)}
                    style={{
                      padding: '0.85rem 1.15rem',
                      borderBottom: '1px solid var(--light-border, #f1f5f9)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      cursor: 'pointer',
                      background: isUnread ? 'rgba(16, 185, 129, 0.04)' : 'transparent',
                      transition: 'background 0.15s ease',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = isUnread ? 'rgba(16, 185, 129, 0.04)' : 'transparent'}
                  >
                    {isUnread && (
                      <div 
                        style={{
                          position: 'absolute',
                          left: '4px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '4px',
                          height: '24px',
                          borderRadius: '2px',
                          background: 'var(--primary, #059669)'
                        }} 
                      />
                    )}

                    <div 
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: notif.iconBg,
                        color: notif.iconColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      <IconComp size={16} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <h5 style={{ 
                          margin: 0, 
                          fontSize: '0.8rem', 
                          fontWeight: isUnread ? 800 : 700, 
                          color: 'var(--text-main, #0f172a)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {notif.title}
                        </h5>
                        <span 
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '0.1rem 0.45rem',
                            borderRadius: '4px',
                            background: `${notif.badgeColor}15`,
                            color: notif.badgeColor,
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {notif.badge}
                        </span>
                      </div>

                      <p style={{ margin: '0 0 0.35rem 0', fontSize: '0.725rem', color: 'var(--text-muted, #64748b)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {notif.subtitle}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.675rem', color: 'var(--text-muted, #94a3b8)' }}>
                        <Clock size={11} />
                        <span>{notif.time}</span>
                      </div>
                    </div>

                    <ChevronRight size={14} style={{ color: 'var(--text-muted, #cbd5e1)', marginTop: '8px', flexShrink: 0 }} />
                  </div>
                );
              })
            )}
          </div>

          {/* Panel Footer */}
          <div 
            style={{
              padding: '0.75rem 1rem',
              borderTop: '1px solid var(--light-border, #e2e8f0)',
              background: 'var(--bg-main, #f8fafc)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem'
            }}
          >
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => {
                setIsOpen(false);
                if (onNavigateTab) onNavigateTab('services');
              }}
              style={{ flex: 1, fontSize: '0.75rem', justifyContent: 'center' }}
            >
              <FileText size={13} /> Kelola Surat
            </button>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => {
                setIsOpen(false);
                if (onNavigateTab) onNavigateTab('complaints');
              }}
              style={{ flex: 1, fontSize: '0.75rem', justifyContent: 'center' }}
            >
              <MessageSquare size={13} /> Pengaduan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
