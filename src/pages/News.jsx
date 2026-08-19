import React, { useState } from 'react';
import { Search, Calendar, User, Eye, ArrowRight, Tag } from 'lucide-react';

export const slug = '/berita';
export default function News({ newsList, onSelectNews }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Pemberdayaan', 'Teknologi', 'Kegiatan', 'Pengumuman', 'Pembangunan'];

  const filteredNews = newsList.filter((item) => {
    const matchesCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
            Kabar Desa Pintar
          </span>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, margin: '0.5rem 0 1rem' }}>
            Berita & Pengumuman Resmi
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Informasi terkini seputar kegiatan masyarakat, transparansi pembangunan, dan agenda desa.
          </p>
        </div>
      </div>

      <div className="container section">
        {/* Search & Filter Bar */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Cari berita atau pengumuman..."
              className="form-control"
              style={{ paddingLeft: '2.75rem', borderRadius: 'var(--radius-full)' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter Pills */}
          <div className="filter-tabs" style={{ marginBottom: 0 }}>
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
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <h3>Tidak ada berita yang sesuai dengan pencarian.</h3>
            <p>Silakan coba kata kunci atau filter kategori lainnya.</p>
          </div>
        ) : (
          <div className="card-grid">
            {filteredNews.map((item) => (
              <div key={item.id} className="card" onClick={() => onSelectNews(item)} style={{ cursor: 'pointer' }}>
                <div className="card-img-wrap">
                  <img src={item.image} alt={item.title} className="card-img" />
                  <div className="card-badge-top">
                    <span className="badge badge-info">{item.category}</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-meta">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={14} /> {item.date}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Eye size={14} /> {item.views || 50}
                    </span>
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.summary}</p>
                  
                  <div className="card-footer" style={{ border: 'none', padding: 0 }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      Baca Lengkap <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
