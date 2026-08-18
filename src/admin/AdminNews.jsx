import React, { useState, useRef } from 'react';
import { 
  Newspaper, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  X, 
  Image as ImageIcon, 
  Eye, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Link,
  RefreshCw
} from 'lucide-react';
import { compressAndResizeImage, formatFileSize } from '../utils/imageCompressor';

export default function AdminNews({ newsList = [], onAddNews, onUpdateNews, onDeleteNews }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadMode, setUploadMode] = useState('upload'); // 'upload' | 'url' | 'presets'
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionInfo, setCompressionInfo] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Pemberdayaan',
    author: 'Tim Kominfo Desa',
    summary: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false
  });

  const newsPresets = [
    { label: 'Pertanian & Panen', url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Pembangunan Jalan & Fisik', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f7?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Kesehatan & Posyandu', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Musyawarah & Balai Desa', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80' },
    { label: 'BUMDes & Produk UMKM', url: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1000&q=80' }
  ];

  const filteredNews = newsList.filter(
    (n) => n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           n.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setCompressionInfo(null);
    setUploadError('');
    setUploadMode('upload');
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
    setCompressionInfo(null);
    setUploadError('');
    setUploadMode('upload');
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

  // Handle File Upload & Auto-Compress to Max 2MB
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setIsCompressing(true);

    try {
      // Compress and resize automatically (max 2MB, max 1600px dimension)
      const result = await compressAndResizeImage(file, 2 * 1024 * 1024, 1600);
      
      setFormData(prev => ({
        ...prev,
        image: result.dataUrl
      }));

      setCompressionInfo({
        originalSize: formatFileSize(result.originalSize),
        compressedSize: formatFileSize(result.compressedSize),
        width: result.width,
        height: result.height,
        wasCompressed: result.originalSize > result.compressedSize
      });
    } catch (err) {
      console.error(err);
      setUploadError(err.message || 'Gagal memproses gambar. Pastikan format file berupa JPG/PNG/WebP.');
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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
      <div className="table-wrapper" style={{ background: 'var(--light-surface)', border: '1px solid var(--light-border)', borderRadius: 'var(--radius-xl)' }}>
        <div className="table-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
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
        <div style={{ overflowX: 'auto', padding: '0 1.25rem 1.25rem' }}>
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
                          style={{ width: '64px', height: '48px', objectFit: 'cover', borderRadius: '8px', background: '#e2e8f0', flexShrink: 0, border: '1px solid var(--light-border)' }}
                        />
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)' }}>{item.title}</strong>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
                        <strong style={{ color: 'var(--text-main)', fontSize: '0.85rem' }}>{item.author}</strong>
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

      {/* ADD / EDIT NEWS MODAL WITH SMART 2MB IMAGE COMPRESSOR */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Newspaper size={20} color="var(--primary)" />
                <h3 className="modal-title" style={{ fontSize: '1.2rem' }}>
                  {editingId ? 'Edit Berita Desa' : 'Buat Berita / Pengumuman Baru'}
                </h3>
              </div>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* 1. Judul Berita */}
                <div className="form-group">
                  <label className="form-label">Judul Berita *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Penyaluran Bantuan Bibit Padi Organik dan Pelatihan Pertanian 2026..."
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                {/* 2. Kategori & Penulis */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Kategori Berita *</label>
                    <select
                      className="form-control"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Pemberdayaan">Pemberdayaan Masyarakat</option>
                      <option value="Pembangunan">Pembangunan & Infrastruktur</option>
                      <option value="Kegiatan">Kegiatan Warga</option>
                      <option value="Pengumuman">Pengumuman Resmi</option>
                      <option value="Kesehatan">Kesehatan & Posyandu</option>
                      <option value="Teknologi">Teknologi & Desa Digital</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nama Penulis / Redaksi *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Tim Kominfo Desa Sukamaju"
                      className="form-control"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                  </div>
                </div>

                {/* 3. UPLOAD GAMBAR DENGAN AUTO-COMPRESS (MAX 2MB) */}
                <div style={{
                  background: 'var(--light-bg)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--light-border)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <ImageIcon size={18} color="var(--primary)" />
                      <label className="form-label" style={{ margin: 0, fontWeight: 800 }}>
                        Foto Utama / Thumbnail Berita
                      </label>
                      <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                        ⚡ Maksimal 2MB (Auto-Resize & Kompresi)
                      </span>
                    </div>

                    {/* Mode Selector */}
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button
                        type="button"
                        className={`btn btn-sm ${uploadMode === 'upload' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setUploadMode('upload')}
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}
                      >
                        <Upload size={12} /> Upload File
                      </button>
                      <button
                        type="button"
                        className={`btn btn-sm ${uploadMode === 'presets' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setUploadMode('presets')}
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}
                      >
                        <Sparkles size={12} /> Template Foto
                      </button>
                      <button
                        type="button"
                        className={`btn btn-sm ${uploadMode === 'url' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setUploadMode('url')}
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}
                      >
                        <Link size={12} /> URL Gambar
                      </button>
                    </div>
                  </div>

                  {/* Mode 1: Direct File Upload with Auto-compression */}
                  {uploadMode === 'upload' && (
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />

                      <div
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          border: '2px dashed var(--light-border)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.5rem',
                          textAlign: 'center',
                          cursor: 'pointer',
                          background: 'var(--light-surface)',
                          transition: 'var(--transition)'
                        }}
                      >
                        <Upload size={32} color="var(--primary)" style={{ margin: '0 auto 0.5rem' }} />
                        <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                          {isCompressing ? 'Sedang mengompresi dan menyesuaikan gambar...' : 'Klik untuk Pilih atau Tarik Foto Berita'}
                        </strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Mendukung file kamera resolusi tinggi (JPG, PNG, WebP) hingga &gt; 10MB — otomatis dioptimasi &lt; 2MB!
                        </span>
                      </div>

                      {uploadError && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#dc2626', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                          <AlertCircle size={14} /> {uploadError}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mode 2: Presets */}
                  {uploadMode === 'presets' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
                      {newsPresets.map((p, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, image: p.url }));
                            setCompressionInfo(null);
                          }}
                          style={{
                            borderRadius: '8px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: formData.image === p.url ? '2px solid var(--primary)' : '1px solid var(--light-border)',
                            position: 'relative'
                          }}
                        >
                          <img src={p.url} alt={p.label} style={{ width: '100%', height: '70px', objectFit: 'cover' }} />
                          <span style={{ display: 'block', fontSize: '0.7rem', padding: '0.25rem', textAlign: 'center', fontWeight: 600, background: 'var(--light-surface)', color: 'var(--text-main)' }}>
                            {p.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Mode 3: URL Input */}
                  {uploadMode === 'url' && (
                    <div>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/photo-..."
                        className="form-control"
                        value={formData.image}
                        onChange={(e) => {
                          setFormData({ ...formData, image: e.target.value });
                          setCompressionInfo(null);
                        }}
                      />
                    </div>
                  )}

                  {/* Preview & Compression Badge */}
                  {formData.image && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginTop: '0.85rem',
                      padding: '0.75rem',
                      background: 'var(--light-surface)',
                      borderRadius: '8px',
                      border: '1px solid var(--light-border)'
                    }}>
                      <img
                        src={formData.image}
                        alt="Preview Foto Berita"
                        style={{ width: '90px', height: '65px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--light-border)', flexShrink: 0 }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                          <CheckCircle2 size={16} color="#059669" />
                          <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Foto Siap Digunakan</strong>
                        </div>
                        {compressionInfo ? (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Ukuran asli: <strong>{compressionInfo.originalSize}</strong> ➡️ Disesuaikan: <strong style={{ color: '#059669' }}>{compressionInfo.compressedSize}</strong> ({compressionInfo.width}x{compressionInfo.height}px)
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Ukuran gambar dalam batas aman server &lt; 2MB
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => fileInputRef.current?.click()}
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                      >
                        <RefreshCw size={12} /> Ganti
                      </button>
                    </div>
                  )}
                </div>

                {/* 4. Ringkasan Singkat */}
                <div className="form-group">
                  <label className="form-label">Ringkasan Singkat (Lead Paragraf) *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Tuliskan 1-2 kalimat ringkasan inti berita untuk ditampilkan di kartu depan..."
                    className="form-control"
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  />
                </div>

                {/* 5. Isi Berita */}
                <div className="form-group">
                  <label className="form-label">Isi Lengkap Berita *</label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Tuliskan isi berita secara detail, kronologi kegiatan, kutipan narasumber, dan hasil kegiatan..."
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
                <button type="submit" className="btn btn-primary" disabled={isCompressing}>
                  {editingId ? 'Simpan Perubahan Berita' : 'Publikasikan Berita'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
