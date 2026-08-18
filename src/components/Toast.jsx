import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let typeClass = 'toast-success';
        if (toast.type === 'error') {
          Icon = AlertCircle;
          typeClass = 'toast-danger';
        } else if (toast.type === 'info') {
          Icon = Info;
          typeClass = 'toast-info';
        }

        return (
          <div key={toast.id} className={`toast ${typeClass}`}>
            <Icon size={20} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>{toast.message}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
