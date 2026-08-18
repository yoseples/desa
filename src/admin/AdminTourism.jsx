import React, { useState } from 'react';
import { Palmtree, Plus, Edit, Trash2, Search, X, MapPin, Ticket } from 'lucide-react';

export default function AdminTourism({ tourismList, onAddTourism, onUpdateTourism, onDeleteTourism }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Wisata Alam',
    ticketPrice: 15000,
    openHours: 'Setiap Hari | 08.00 - 17.00 WIB',
    location: '',
    description: '',
    facilitiesText: 'Spot Foto, Gazebo, Warung Kuliner, Toilet, Parkir',
    image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1000&q=80',
    highlight: 'Favorit Wisatawan'
  });

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const filteredTourism = tourismList.filter(
    (t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
           t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Wisata Alam',
      ticketPrice: 15000,
      openHours: 'Setiap Hari | 08.00 - 17.00 WIB',
      location: '',
      description: '',
      facilitiesText: 'Spot Foto, Gazebo, Warung Kuliner, Toilet, Parkir',
      image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1000&q=80',
      highlight: 'Favorit Wisatawan'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (spot) => {
    setEditingId(spot.id);
    setFormData({
      name: spot.name,
      category: spot.category,
      ticketPrice: spot.ticketPrice,
      openHours: spot.openHours,
      location: spot.location,
      description: spot.description,
      facilitiesText: spot.facilities ? spot.facilities.join(', ') : '',
      image: spot.image,
      highlight: spot.highlight || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location) {
      alert('Mohon lengkapi nama destinasi dan lokasi!');
      return;
    }

    const facilities = formData.facilitiesText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      name: formData.name,
      category: formData.category,
      ticketPrice: Number(formData.ticketPrice),
      openHours: formData.openHours,
      location: formData.location,
      description: formData.description,
      facilities,
      image: formData.image,
      highlight: formData.highlight
    };

    if (editingId) {
      onUpdateTourism(editingId, payload);
    } else {
      onAddTourism(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus destinasi wisata: "${name}"?`)) {
      onDeleteTourism(id);
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
              placeholder="Cari tempat wisata atau lokasi..."
              className="form-control"
              style={{ paddingLeft: '2.5rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={handleOpenAdd}>
            <Plus size={16} /> Tambah Destinasi Wisata
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Destinasi & Foto</th>
                <th>Kategori</th>
                <th>Tiket Masuk</th>
                <th>Jam Operasional & Lokasi</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredTourism.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    Tidak ada data wisata yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredTourism.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '56px', height: '44px', borderRadius: '6px', objectFit: 'cover', background: '#e2e8f0', flexShrink: 0 }}
                        />
                        <div>
                          <strong style={{ display: 'block' }}>{item.name}</strong>
                          {item.highlight && <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>{item.highlight}</span>}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-info">{item.category}</span>
                    </td>
                    <td>
                      <strong style={{ color: '#059669' }}>
                        {item.ticketPrice === 0 ? 'Gratis' : formatRupiah(item.ticketPrice)}
                      </strong>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>
                        <div>{item.openHours}</div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{item.location}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleOpenEdit(item)}
                          title="Edit Wisata"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(item.id, item.name)}
                          title="Hapus Wisata"
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
                {editingId ? 'Edit Destinasi Wisata' : 'Tambah Destinasi Wisata Baru'}
              </h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Nama Destinasi Wisata *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Curug Bening & Agrowisata Buah"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Kategori Wisata *</label>
                    <select
                      className="form-control"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Wisata Alam">Wisata Alam</option>
                      <option value="Pemandangan & Camping">Pemandangan & Camping</option>
                      <option value="Edukasi & Keluarga">Edukasi & Keluarga</option>
                      <option value="Relaksasi & Budaya">Relaksasi & Budaya</option>
                      <option value="Agrowisata">Agrowisata</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Label Sorotan (Highlight)</label>
                    <input
                      type="text"
                      placeholder="Contoh: Spot Sunset Terbaik, Air Terjun Alami"
                      className="form-control"
                      value={formData.highlight}
                      onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Harga Tiket Masuk (Rp, isi 0 jika gratis) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      className="form-control"
                      value={formData.ticketPrice}
                      onChange={(e) => setFormData({ ...formData, ticketPrice: Number(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Jam Operasional *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Setiap Hari | 07.30 - 17.00 WIB"
                      className="form-control"
                      value={formData.openHours}
                      onChange={(e) => setFormData({ ...formData, openHours: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Alamat / Lokasi Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dusun Pasirjati, RW 04 Desa Sukamaju"
                    className="form-control"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Fasilitas Wisata (Pisahkan dengan tanda koma)</label>
                  <input
                    type="text"
                    placeholder="Gazebo, Toilet Bersih, Warung Makan, Area Parkir, Mushola"
                    className="form-control"
                    value={formData.facilitiesText}
                    onChange={(e) => setFormData({ ...formData, facilitiesText: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">URL Foto Wisata</label>
                  <input
                    type="url"
                    className="form-control"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Deskripsi Lengkap Wisata</label>
                  <textarea
                    rows={3}
                    placeholder="Ceritakan keindahan dan daya tarik tempat wisata ini..."
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
                  {editingId ? 'Simpan Perubahan' : 'Tambah Destinasi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
