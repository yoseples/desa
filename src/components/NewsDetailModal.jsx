import React from 'react';
import { X, Calendar, User, Eye, Tag, Share2 } from 'lucide-react';

export default function NewsDetailModal({ isOpen, onClose, article, profile }) {
  if (!isOpen || !article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan artikel berhasil disalin!');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="badge badge-info">{article.category}</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-sm btn-secondary" onClick={handleShare}>
              <Share2 size={15} /> Bagikan
            </button>
            <button className="modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="modal-body" style={{ padding: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.3, marginBottom: '1rem' }}>
            {article.title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', borderBottom: '1px solid var(--light-border)', paddingBottom: '1rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={15} /> {article.date}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <User size={15} /> {article.author}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Eye size={15} /> {article.views || 100} dibaca
            </span>
          </div>

          <div style={{
            width: '100%',
            height: '340px',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '1.75rem',
            background: '#e2e8f0'
          }}>
            <img
              src={article.image}
              alt={article.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div style={{
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: '#334155',
            whiteSpace: 'pre-line'
          }}>
            <p style={{ fontWeight: 600, color: '#0f172a', marginBottom: '1rem', fontSize: '1.1rem' }}>
              {article.summary}
            </p>
            <p>{article.content}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
