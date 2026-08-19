import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-live="polite" aria-label="Notifikasi Sistem">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let typeClass = 'toast-success';
        let defaultTitle = 'Berhasil';
        let iconColor = '#10b981';

        if (toast.type === 'error' || toast.type === 'danger') {
          Icon = AlertCircle;
          typeClass = 'toast-danger';
          defaultTitle = 'Terjadi Kesalahan';
          iconColor = '#ef4444';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          typeClass = 'toast-warning';
          defaultTitle = 'Peringatan';
          iconColor = '#f59e0b';
        } else if (toast.type === 'info') {
          Icon = Info;
          typeClass = 'toast-info';
          defaultTitle = 'Informasi';
          iconColor = '#3b82f6';
        }

        const title = toast.title || defaultTitle;
        const message = toast.message || (typeof toast === 'string' ? toast : '');
        const duration = toast.duration || 4500;

        return (
          <div 
            key={toast.id} 
            className={`toast-item ${typeClass}`}
            style={{
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: `${iconColor}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: iconColor,
                flexShrink: 0
              }}
            >
              <Icon size={18} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {title && (
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.15rem' }}>
                  {title}
                </div>
              )}
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, wordBreak: 'break-word' }}>
                {message}
              </p>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="toast-close-btn"
              aria-label="Tutup Notifikasi"
              title="Tutup Notifikasi"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.15s ease'
              }}
            >
              <X size={16} />
            </button>

            {/* Countdown Progress Bar */}
            <div 
              className="toast-progress-bar"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '3px',
                width: '100%',
                background: iconColor,
                opacity: 0.85,
                animation: `toastProgress ${duration}ms linear forwards`,
                transformOrigin: 'left'
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
