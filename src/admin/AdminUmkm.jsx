import React, { useState } from 'react';
import { ShoppingBag, Plus, Edit, Trash2, Search, X, Star } from 'lucide-react';

export default function AdminUmkm({ umkmList, onAddUmkm, onUpdateUmkm, onDeleteUmkm }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Minuman',
    price: 25000,
    unit: 'Pcs',
    owner: '',
    phone: '6281234567890',
    description: '',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    badge: 'Produk Baru'
  });

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const filteredUmkm = umkmList.filter(
    (u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           u.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
           u.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Minuman',
      price: 25000,
      unit: 'Pcs',
      owner: '',
      phone: '6281234567890',
      description: '',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      badge: 'Produk Baru'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      unit: product.unit || 'Pcs',
      owner: product.owner,
      phone: product.phone || '6281234567890',
      description: product.description,
      image: product.image,
      badge: product.badge || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.owner || !formData.price) {
      alert('Mohon lengkapi nama produk, nama penjual, dan harga!');
      return;
    }

    if (editingId) {
      onUpdateUmkm(editingId, formData);
    } else {
      onAddUmkm(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus produk UMKM: "${name}"?`)) {
      onDeleteUmkm(id);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Toolbar */}
      <div className="table-wrapper">
        <div className="table-toolbar">
          <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Cari produk UMKM, nama penjual..."
              className="form-control"
              style={{ paddingLeft: '2.5rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={handleOpenAdd}>
            <Plus size={16} /> Tambah Produk UMKM
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Kategori</th>
                <th>Harga & Satuan</th>
                <th>Pemilik & WhatsApp</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUmkm.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    Tidak ada produk UMKM yang cocok.
                  </td>
                </tr>
              ) : (
                filteredUmkm.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover', background: '#e2e8f0', flexShrink: 0 }}
                        />
                        <div>
                          <strong style={{ display: 'block' }}>{p.name}</strong>
                          {p.badge && <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>{p.badge}</span>}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-neutral">{p.category}</span>
                    </td>
                    <td>
                      <strong style={{ color: '#059669' }}>{formatRupiah(p.price)}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>/ {p.unit}</span>
                    </td>
                    <td>
                      <div>
                        <strong>{p.owner}</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.phone}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleOpenEdit(p)}
                          title="Edit Produk"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(p.id, p.name)}
                          title="Hapus Produk"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL ADD / EDIT */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.2rem' }}>
                {editingId ? 'Edit Produk UMKM' : 'Tambah Produk UMKM Baru'}
              </h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Nama Produk UMKM *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kopi Robusta Lereng Desa"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Kategori *</label>
                    <select
                      className="form-control"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Minuman">Minuman</option>
                      <option value="Makanan Ringan">Makanan Ringan</option>
                      <option value="Kesehatan">Kesehatan</option>
                      <option value="Kerajinan">Kerajinan</option>
                      <option value="Pakaian & Tekstil">Pakaian & Tekstil</option>
                      <option value="Bahan Masakan">Bahan Masakan</option>
                      <option value="Pertanian">Hasil Pertanian</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Label Khusus (Badge)</label>
                    <input
                      type="text"
                      placeholder="Contoh: Terlaris, Organik, Eco-Friendly"
                      className="form-control"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Harga Produk (Rp) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      placeholder="45000"
                      className="form-control"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Satuan / Kemasan *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Bungkus 200gr, Botol 500ml, Pcs"
                      className="form-control"
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nama Pelaku Usaha / Pengrajin *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Pak Ujang & Kelompok Tani"
                      className="form-control"
                      value={formData.owner}
                      onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nomor WhatsApp Penjual (Format: 628...)</label>
                    <input
                      type="text"
                      placeholder="6281234567890"
                      className="form-control"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">URL Foto Produk</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    className="form-control"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Deskripsi Lengkap Produk</label>
                  <textarea
                    rows={3}
                    placeholder="Ceritakan keunggulan, bahan olahan, dan keaslian produk ini..."
                    className="form-control"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Simpan Perubahan' : 'Tambah Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
