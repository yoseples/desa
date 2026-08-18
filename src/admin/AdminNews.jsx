import React, { useState } from 'react';
import { Newspaper, Plus, Edit, Trash2, Search, X, Image, Eye } from 'lucide-react';

export default function AdminNews({ newsList, onAddNews, onUpdateNews, onDeleteNews }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Pemberdayaan',
    author: 'Tim Kominfo Desa',
    summary: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false
  });

  const filteredNews = newsList.filter(
    (n) => n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           n.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Pemberdayaan',
      author: 'Tim Kominfo Desa',
      summary: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80',
      isFeatured: false
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      author: item.author,
      summary: item.summary,
      content: item.content,
      image: item.image,
      isFeatured: !!item.isFeatured
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.summary || !formData.content) {
      alert('Mohon lengkapi judul, ringkasan, dan isi berita!');
      return;
    }

    if (editingId) {
      onUpdateNews(editingId, formData);
    } else {
      onAddNews(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus berita: "${title}"?`)) {
      onDeleteNews(id);
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
              placeholder="Cari judul berita atau kategori..."
              className="form-control"
              style={{ paddingLeft: '2.5rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={handleOpenAdd}>
            <Plus size={16} /> Tulis Berita Baru
          </button>
        </div>

        {/* News Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Thumbnail & Judul</th>
                <th>Kategori</th>
                <th>Penulis & Tanggal</th>
                <th>Dibaca</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    Tidak ada artikel berita yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredNews.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ width: '56px', height: '44px', objectFit: 'cover', borderRadius: '6px', background: '#e2e8f0', flexShrink: 0 }}
                        />
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.95rem' }}>{item.title}</strong>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '380px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.summary}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-info">{item.category}</span>
                    </td>
                    <td>
                      <div>
                        <strong>{item.author}</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.date}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Eye size={13} /> {item.views || 0}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleOpenEdit(item)}
                          title="Edit Berita"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(item.id, item.title)}
                          title="Hapus Berita"
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

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.2rem' }}>
                {editingId ? 'Edit Berita Desa' : 'Buat Berita / Pengumuman Baru'}
              </h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Judul Berita *</label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan judul artikel..."
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                      <option value="Pemberdayaan">Pemberdayaan</option>
                      <option value="Teknologi">Teknologi</option>
                      <option value="Kegiatan">Kegiatan</option>
                      <option value="Pengumuman">Pengumuman</option>
                      <option value="Pembangunan">Pembangunan</option>
                      <option value="Kesehatan">Kesehatan</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nama Penulis *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Tim Kominfo Desa"
                      className="form-control"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">URL Gambar Thumbnail (Foto Berita)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    className="form-control"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Ringkasan Singkat (Lead Paragraf) *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Ringkasan 1-2 kalimat dari berita..."
                    className="form-control"
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Isi Lengkap Berita *</label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Tuliskan isi berita secara detail..."
                    className="form-control"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Simpan Perubahan' : 'Publikasikan Berita'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
