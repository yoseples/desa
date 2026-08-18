import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Trash2, X, Calendar } from 'lucide-react';

export default function AdminGallery({ galleryList, onAddGallery, onDeleteGallery }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Kegiatan',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.image) {
      alert('Mohon isi judul foto dan URL gambar!');
      return;
    }

    onAddGallery(formData);
    setFormData({
      title: '',
      category: 'Kegiatan',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
      description: ''
    });
    setModalOpen(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Hapus foto: "${title}"?`)) {
      onDeleteGallery(id);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
          Daftar Foto Galeri Desa ({galleryList.length})
        </h3>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Tambah Foto Galeri
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {galleryList.map((item) => (
          <div key={item.id} className="card">
            <div className="card-img-wrap" style={{ height: '190px', position: 'relative' }}>
              <img src={item.image} alt={item.title} className="card-img" />
              <div className="card-badge-top">
                <span className="badge badge-success">{item.category}</span>
              </div>
            </div>
            <div className="card-body">
              <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>{item.title}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>
                {item.description || 'Tidak ada deskripsi.'}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--light-border)', paddingTop: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.date}</span>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(item.id, item.title)}
                  title="Hapus Foto"
                >
                  <Trash2 size={14} /> Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.2rem' }}>Tambah Foto ke Galeri</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Judul Kegiatan / Foto *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Upacara HUT RI ke-81 di Lapangan Desa"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Kategori *</label>
                  <select
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Pelatihan">Pelatihan</option>
                    <option value="Pembangunan">Pembangunan</option>
                    <option value="Pertanian">Pertanian</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Kebudayaan">Kebudayaan</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">URL Foto / Gambar *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    className="form-control"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Keterangan Singkat Foto</label>
                  <textarea
                    rows={3}
                    placeholder="Ceritakan momen dalam dokumentasi foto ini..."
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
                  Simpan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
