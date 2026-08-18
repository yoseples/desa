import React, { useState } from 'react';
import { Image as ImageIcon, Calendar, X, ZoomIn } from 'lucide-react';

export default function Gallery({ galleryList }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activePhoto, setActivePhoto] = useState(null);

  const categories = ['Semua', 'Kegiatan', 'Pelatihan', 'Pembangunan', 'Pertanian', 'Kesehatan', 'Kebudayaan'];

  const filteredGallery = galleryList.filter(
    (item) => selectedCategory === 'Semua' || item.category === selectedCategory
  );

  return (
    <div>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b, #0f172a)',
        color: '#fff',
        padding: '4rem 0 3.5rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#6ee7b7' }}>
            Dokumentasi & Memori
          </span>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, margin: '0.5rem 0 1rem' }}>
            Galeri Kegiatan Desa
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Kumpulan potret momen gotong royong, pembangunan fisik, seni budaya, dan kehangatan warga desa.
          </p>
        </div>
      </div>

      <div className="container section">
        {/* Category Filters */}
        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="card-grid">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="card"
              onClick={() => setActivePhoto(item)}
              style={{ cursor: 'pointer', overflow: 'hidden' }}
            >
              <div className="card-img-wrap" style={{ height: '260px', position: 'relative' }}>
                <img src={item.image} alt={item.title} className="card-img" />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.25rem'
                }}>
                  <div>
                    <span className="badge badge-success" style={{ marginBottom: '0.35rem' }}>{item.category}</span>
                    <h3 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700, margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {activePhoto && (
        <div className="modal-backdrop" onClick={() => setActivePhoto(null)}>
          <div
            className="modal-content modal-content-lg"
            onClick={(e) => e.stopPropagation()}
            style={{ background: '#0f172a', color: '#fff', border: '1px solid #334155' }}
          >
            <div className="modal-header" style={{ background: '#0f172a', borderBottom: '1px solid #334155', color: '#fff' }}>
              <div>
                <span className="badge badge-success">{activePhoto.category}</span>
                <h3 className="modal-title" style={{ color: '#fff', fontSize: '1.2rem', marginTop: '0.35rem' }}>
                  {activePhoto.title}
                </h3>
              </div>
              <button
                className="modal-close"
                onClick={() => setActivePhoto(null)}
                style={{ background: '#334155', color: '#fff' }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body" style={{ padding: '1.5rem' }}>
              <div style={{ maxHeight: '520px', overflow: 'hidden', borderRadius: '12px', marginBottom: '1.25rem' }}>
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain', margin: '0 auto', display: 'block' }}
                />
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {activePhoto.description}
              </p>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} /> Tanggal Dokumentasi: {activePhoto.date}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
