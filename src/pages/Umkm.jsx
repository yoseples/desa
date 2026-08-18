import React, { useState } from 'react';
import { Search, ShoppingBag, Star, MessageCircle, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function Umkm({ umkmList, onSelectUmkm }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('featured'); // featured, price-low, price-high

  const categories = ['Semua', 'Minuman', 'Kesehatan', 'Makanan Ringan', 'Kerajinan', 'Pakaian & Tekstil', 'Bahan Masakan'];

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const filteredUmkm = umkmList.filter((item) => {
    const matchesCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
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
            Ekonomi Kreatif Warga
          </span>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, margin: '0.5rem 0 1rem' }}>
            Etalase Produk UMKM Desa
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Temukan produk olahan pangan alami, kerajinan tangan khas, dan karya kreatif asli warga Desa Sukamaju Mandiri.
          </p>
        </div>
      </div>

      <div className="container section">
        {/* Search & Sort Controls */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Cari nama produk atau penjual..."
              className="form-control"
              style={{ paddingLeft: '2.75rem', borderRadius: 'var(--radius-full)' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowUpDown size={16} color="var(--text-muted)" />
            <select
              className="form-control"
              style={{ width: 'auto', borderRadius: 'var(--radius-full)' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Urutkan: Rekomendasi</option>
              <option value="price-low">Harga: Termurah ke Tertinggi</option>
              <option value="price-high">Harga: Tertinggi ke Termurah</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="filter-tabs" style={{ justifyContent: 'flex-start' }}>
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

        {/* UMKM Grid */}
        {filteredUmkm.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <h3>Tidak ada produk yang sesuai dengan kriteria.</h3>
            <p>Silakan coba kata kunci atau kategori lainnya.</p>
          </div>
        ) : (
          <div className="card-grid">
            {filteredUmkm.map((product) => (
              <div key={product.id} className="card" onClick={() => onSelectUmkm(product)} style={{ cursor: 'pointer' }}>
                <div className="card-img-wrap">
                  <img src={product.image} alt={product.name} className="card-img" />
                  {product.badge && (
                    <div className="card-badge-top">
                      <span className="badge badge-warning">★ {product.badge}</span>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge badge-neutral">{product.category}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 700, fontSize: '0.85rem', color: '#d97706' }}>
                      <Star size={14} fill="#d97706" /> {product.rating || 5.0}
                    </span>
                  </div>

                  <h3 className="card-title">{product.name}</h3>
                  <p className="card-desc">{product.description}</p>
                  
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    Pelaku Usaha: <strong>{product.owner}</strong>
                  </div>

                  <div className="card-footer">
                    <div className="price-tag">
                      {formatRupiah(product.price)}
                      <span>/{product.unit || 'pcs'}</span>
                    </div>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={(e) => { e.stopPropagation(); onSelectUmkm(product); }}
                    >
                      Pesan WhatsApp
                    </button>
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
