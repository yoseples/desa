import React, { useState } from 'react';
import { 
  Save, 
  RefreshCw, 
  Upload, 
  Image as ImageIcon, 
  User, 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  X, 
  Sparkles,
  Layers,
  Camera,
  Plus,
  Trash2,
  Edit,
  Search,
  Filter
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function AdminSettings({ profile, onUpdateProfile }) {
  const [formData, setFormData] = useState({ ...profile });
  const [activeSettingsTab, setActiveSettingsTab] = useState('branding'); // branding, general, vision, apparatus, contact
  const [savedNotice, setSavedNotice] = useState(false);

  // Apparatus Filter & Search
  const [appCategoryFilter, setAppCategoryFilter] = useState('Semua');
  const [appSearch, setAppSearch] = useState('');

  // Modal Tambah / Edit Aparatur
  const [apparatusModal, setApparatusModal] = useState(false);
  const [editingAppIndex, setEditingAppIndex] = useState(null);
  const [appForm, setAppForm] = useState({
    category: 'Pemerintah Desa',
    name: '',
    position: '',
    nip: '',
    phone: '',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    area: ''
  });

  // File Upload Handlers (converts local image files to base64 DataURL for instant local preview and persistence)
  const handleImageFileChange = (e, fieldPath) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 3.5 * 1024 * 1024) {
      alert('Ukuran file terlalu besar! Silakan gunakan gambar berukuran di bawah 3.5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      if (fieldPath === 'logo') {
        setFormData(prev => ({ ...prev, logo: base64 }));
      } else if (fieldPath === 'headPhoto') {
        setFormData(prev => ({
          ...prev,
          headOfVillage: { ...prev.headOfVillage, photo: base64 }
        }));
      } else if (fieldPath === 'bannerImage') {
        setFormData(prev => ({ ...prev, bannerImage: base64 }));
      } else if (fieldPath === 'officePhoto') {
        setFormData(prev => ({ ...prev, officePhoto: base64 }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAppModalPhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setAppForm(prev => ({ ...prev, photo: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAddApparatus = () => {
    setEditingAppIndex(null);
    setAppForm({
      category: appCategoryFilter !== 'Semua' ? appCategoryFilter : 'Pemerintah Desa',
      name: '',
      position: '',
      nip: '',
      phone: '',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      area: ''
    });
    setApparatusModal(true);
  };

  const handleOpenEditApparatus = (app, originalIndex) => {
    setEditingAppIndex(originalIndex);
    setAppForm({
      category: app.category || 'Pemerintah Desa',
      name: app.name || '',
      position: app.position || '',
      nip: app.nip || '',
      phone: app.phone || '',
      photo: app.photo || '',
      area: app.area || ''
    });
    setApparatusModal(true);
  };

  const handleSaveApparatus = (e) => {
    e.preventDefault();
    if (!appForm.name || !appForm.position) {
      alert('Nama dan Jabatan wajib diisi!');
      return;
    }

    const currentList = [...(formData.apparatus || [])];
    if (editingAppIndex !== null) {
      currentList[editingAppIndex] = {
        ...currentList[editingAppIndex],
        ...appForm
      };
    } else {
      currentList.push({
        id: `app-${Date.now()}`,
        ...appForm
      });
    }

    const updated = { ...formData, apparatus: currentList };
    setFormData(updated);
    onUpdateProfile(updated);
    setApparatusModal(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleDeleteApparatus = (originalIndex, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data pengurus/aparatur "${name}"?`)) {
      const currentList = [...(formData.apparatus || [])];
      currentList.splice(originalIndex, 1);
      const updated = { ...formData, apparatus: currentList };
      setFormData(updated);
      onUpdateProfile(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 4000);
  };

  const handleResetDefaults = () => {
    if (window.confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh data website desa ke pengaturan awal pabrik?')) {
      StorageService.resetToDefaults();
    }
  };

  // Filtered apparatus list with preserved original indexes
  const apparatusWithIndex = (formData.apparatus || []).map((app, idx) => ({ ...app, originalIndex: idx }));
  const filteredApparatus = apparatusWithIndex.filter((app) => {
    const matchesCategory = appCategoryFilter === 'Semua' || app.category === appCategoryFilter;
    const matchesSearch = app.name.toLowerCase().includes(appSearch.toLowerCase()) ||
                          app.position.toLowerCase().includes(appSearch.toLowerCase()) ||
                          (app.area && app.area.toLowerCase().includes(appSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Settings Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        background: '#ffffff',
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--light-border)',
        boxShadow: 'var(--shadow-sm)',
        overflowX: 'auto',
        flexWrap: 'wrap'
      }}>
        <button
          type="button"
          className={`btn btn-sm ${activeSettingsTab === 'branding' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSettingsTab('branding')}
        >
          <Camera size={15} /> Upload Logo & Foto Desa
        </button>
        <button
          type="button"
          className={`btn btn-sm ${activeSettingsTab === 'apparatus' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSettingsTab('apparatus')}
        >
          <User size={15} /> Struktur Aparatur, RW & RT ({formData.apparatus?.length || 0})
        </button>
        <button
          type="button"
          className={`btn btn-sm ${activeSettingsTab === 'general' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSettingsTab('general')}
        >
          <Building size={15} /> Identitas & Sambutan Kades
        </button>
        <button
          type="button"
          className={`btn btn-sm ${activeSettingsTab === 'vision' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSettingsTab('vision')}
        >
          <Sparkles size={15} /> Visi, Misi & Sejarah
        </button>
        <button
          type="button"
          className={`btn btn-sm ${activeSettingsTab === 'contact' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSettingsTab('contact')}
        >
          <Phone size={15} /> Kontak & Peta Kantor
        </button>
      </div>

      {/* Success Alert */}
      {savedNotice && (
        <div style={{
          background: '#dcfce7',
          border: '1px solid #86efac',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.25rem',
          color: '#166534',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem'
        }}>
          <CheckCircle2 size={20} color="#16a34a" />
          Perubahan profil, struktur aparatur, dan media desa berhasil disimpan secara permanen!
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="table-wrapper" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
        
        {/* 1. BRANDING & IMAGE UPLOAD TAB */}
        {activeSettingsTab === 'branding' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                Pengaturan Logo & Media Visual Desa
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
                Unggah logo resmi dan foto desa. Gambar yang diunggah akan otomatis diperbarui di seluruh portal publik, kop surat resmi, dan panel admin.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1.75rem' }}>
              
              {/* Box 1: LOGO DESA */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid var(--light-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ImageIcon size={18} color="#059669" /> Logo Resmi Desa
                  </h4>
                  <span className="badge badge-info">PNG / JPG / SVG</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: 'var(--radius-md)',
                    background: '#ffffff',
                    border: '2px dashed #059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    flexShrink: 0,
                    padding: '4px'
                  }}>
                    {formData.logo ? (
                      <img src={formData.logo} alt="Logo Desa" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                      <Building size={32} color="#94a3b8" />
                    )}
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer', alignSelf: 'flex-start' }}>
                      <Upload size={14} /> Pilih Logo dari Komputer
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageFileChange(e, 'logo')}
                      />
                    </label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rekomendasi rasio 1:1, latar transparan (PNG).</span>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Atau Masukkan URL Gambar Logo:</label>
                  <input
                    type="url"
                    placeholder="https://domain.com/logo-desa.png"
                    className="form-control"
                    style={{ fontSize: '0.85rem' }}
                    value={formData.logo || ''}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  />
                </div>
              </div>

              {/* Box 2: FOTO KEPALA DESA */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid var(--light-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={18} color="#059669" /> Foto Kepala Desa
                  </h4>
                  <span className="badge badge-success">Portret Resmi</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '3px solid #059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}>
                    <img
                      src={formData.headOfVillage?.photo}
                      alt="Kepala Desa"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer', alignSelf: 'flex-start' }}>
                      <Upload size={14} /> Ganti Foto Kades
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageFileChange(e, 'headPhoto')}
                      />
                    </label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Foto profil berseragam dinas atau formal.</span>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Atau Masukkan URL Foto Kades:</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    className="form-control"
                    style={{ fontSize: '0.85rem' }}
                    value={formData.headOfVillage?.photo || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      headOfVillage: { ...formData.headOfVillage, photo: e.target.value }
                    })}
                  />
                </div>
              </div>

              {/* Box 3: FOTO BANNER HERO DESA */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid var(--light-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ImageIcon size={18} color="#059669" /> Banner / Wallpaper Desa
                  </h4>
                  <span className="badge badge-neutral">Landscape (16:9)</span>
                </div>

                <div style={{ height: '110px', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#e2e8f0', position: 'relative' }}>
                  <img
                    src={formData.bannerImage || formData.officePhoto}
                    alt="Banner Desa"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
                    <Upload size={14} /> Upload Banner Baru
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageFileChange(e, 'bannerImage')}
                    />
                  </label>
                </div>
              </div>

              {/* Box 4: FOTO KANTOR / BALAI DESA */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid var(--light-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Building size={18} color="#059669" /> Foto Gedung Balai Desa
                  </h4>
                  <span className="badge badge-neutral">Tampak Depan</span>
                </div>

                <div style={{ height: '110px', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#e2e8f0' }}>
                  <img
                    src={formData.officePhoto}
                    alt="Kantor Desa"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
                    <Upload size={14} /> Upload Foto Kantor
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageFileChange(e, 'officePhoto')}
                    />
                  </label>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. APPARATUS STRUCTURE MANAGEMENT TAB (DESA, KADUS, RW, RT) */}
        {activeSettingsTab === 'apparatus' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  Kelola Struktur Aparatur, Kepala Dusun, RW, & RT
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
                  Total terdata: {formData.apparatus?.length || 0} Pengurus & Aparatur (Termasuk 10 RW & 20 RT)
                </p>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleOpenAddApparatus}
              >
                <Plus size={15} /> Tambah Pengurus / Aparatur Baru
              </button>
            </div>

            {/* Filter Toolbar */}
            <div style={{
              background: '#f8fafc',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--light-border)',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
                <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Cari nama, jabatan (cth: RW 05, RT 12, Sekdes)..."
                  className="form-control"
                  style={{ paddingLeft: '2.25rem', height: '36px', fontSize: '0.85rem' }}
                  value={appSearch}
                  onChange={(e) => setAppSearch(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {['Semua', 'Pemerintah Desa', 'Kepala Dusun (Kadus)', 'Rukun Warga (RW)', 'Rukun Tetangga (RT)'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`btn btn-sm ${appCategoryFilter === cat ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
                    onClick={() => setAppCategoryFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Apparatus Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '1.25rem' }}>
              {filteredApparatus.map((app) => (
                <div
                  key={app.id || app.originalIndex}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid var(--light-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.15rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
                      <div style={{ width: '54px', height: '54px', borderRadius: '50%', overflow: 'hidden', background: '#e2e8f0', flexShrink: 0, border: '2px solid #059669' }}>
                        <img src={app.photo} alt={app.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span className="badge badge-success" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', marginBottom: '0.2rem' }}>
                          {app.category}
                        </span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.15rem 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {app.name}
                        </h4>
                        <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>
                          {app.position}
                        </span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {app.nip && <div><strong>SK/NIP:</strong> {app.nip}</div>}
                      {app.area && <div><strong>Wilayah:</strong> {app.area}</div>}
                      {app.phone && (
                        <div>
                          <strong>WhatsApp:</strong> <a href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" style={{ color: '#059669', fontWeight: 600 }}>{app.phone}</a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem', borderTop: '1px solid var(--light-border)', paddingTop: '0.65rem' }}>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                      onClick={() => handleOpenEditApparatus(app, app.originalIndex)}
                    >
                      <Edit size={13} /> Edit / Ganti Foto
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                      onClick={() => handleDeleteApparatus(app.originalIndex, app.name)}
                      title="Hapus"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. GENERAL & SPEECH TAB */}
        {activeSettingsTab === 'general' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Identitas Desa & Sambutan Kepala Desa
            </h3>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Nama Resmi Desa *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Kode Wilayah Desa</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Slogan / Tagline Desa *</label>
              <input
                type="text"
                required
                className="form-control"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Kecamatan</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Kabupaten / Kota</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.regency}
                  onChange={(e) => setFormData({ ...formData, regency: e.target.value })}
                />
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--light-border)', paddingTop: '1.25rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', color: '#059669' }}>
                Profil & Sambutan Kepala Desa
              </h4>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nama Lengkap & Gelar Kades</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.headOfVillage?.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      headOfVillage: { ...formData.headOfVillage, name: e.target.value }
                    })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Masa Jabatan / Periode</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.headOfVillage?.period}
                    onChange={(e) => setFormData({
                      ...formData,
                      headOfVillage: { ...formData.headOfVillage, period: e.target.value }
                    })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Naskah Sambutan Kepala Desa</label>
                <textarea
                  rows={4}
                  className="form-control"
                  value={formData.headOfVillage?.welcomeSpeech}
                  onChange={(e) => setFormData({
                    ...formData,
                    headOfVillage: { ...formData.headOfVillage, welcomeSpeech: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. VISION, MISSION, HISTORY TAB */}
        {activeSettingsTab === 'vision' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Visi, Misi & Sejarah Desa
            </h3>

            <div className="form-group">
              <label className="form-label">Visi Desa Sukamaju</label>
              <textarea
                rows={3}
                className="form-control"
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Misi Pembangunan Desa (Satu poin per baris)</label>
              <textarea
                rows={6}
                className="form-control"
                value={formData.missions ? formData.missions.join('\n') : ''}
                onChange={(e) => setFormData({
                  ...formData,
                  missions: e.target.value.split('\n').filter(Boolean)
                })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Ringkasan Sejarah & Asal-usul Desa</label>
              <textarea
                rows={5}
                className="form-control"
                value={formData.history}
                onChange={(e) => setFormData({ ...formData, history: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* 5. CONTACT & EMERGENCY TAB */}
        {activeSettingsTab === 'contact' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Informasi Kontak & Jam Operasional
            </h3>

            <div className="form-group">
              <label className="form-label">Alamat Kantor Desa</label>
              <input
                type="text"
                className="form-control"
                value={formData.contact?.address}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, address: e.target.value }
                })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Resmi Desa</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.contact?.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact: { ...formData.contact, email: e.target.value }
                  })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Nomor Telepon Kantor</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.contact?.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact: { ...formData.contact, phone: e.target.value }
                  })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Jam Pelayanan Kantor</label>
              <input
                type="text"
                className="form-control"
                value={formData.contact?.openingHours}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, openingHours: e.target.value }
                })}
              />
            </div>
          </div>
        )}

        {/* Bottom Actions Bar */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--light-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleResetDefaults}
            style={{ color: '#dc2626', borderColor: '#fca5a5' }}
          >
            <RefreshCw size={14} /> Reset ke Pengaturan Default
          </button>

          <button type="submit" className="btn btn-primary">
            <Save size={16} /> Simpan Seluruh Pengaturan Profil
          </button>
        </div>

      </form>

      {/* MODAL TAMBAH / EDIT APARATUR / RW / RT */}
      {apparatusModal && (
        <div className="modal-backdrop" onClick={() => setApparatusModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.15rem' }}>
                {editingAppIndex !== null ? 'Edit Pengurus / Aparatur' : 'Tambah Pengurus / Aparatur Baru'}
              </h3>
              <button className="modal-close" onClick={() => setApparatusModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveApparatus}>
              <div className="modal-body">
                {/* Photo Preview & Upload */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.25rem', background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid var(--light-border)' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', background: '#e2e8f0', flexShrink: 0, border: '2px solid #059669' }}>
                    <img src={appForm.photo} alt="Foto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer', marginBottom: '0.25rem' }}>
                      <Upload size={13} /> Unggah Foto dari Komputer
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleAppModalPhotoChange}
                      />
                    </label>
                    <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'block' }}>Format JPG/PNG portret</span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Tingkatan / Kategori Struktur *</label>
                  <select
                    className="form-control"
                    value={appForm.category}
                    onChange={(e) => setAppForm({ ...appForm, category: e.target.value })}
                  >
                    <option value="Pemerintah Desa">Pemerintah Desa (Kades / Sekdes / Kasi / Kaur)</option>
                    <option value="Kepala Dusun (Kadus)">Kepala Dusun (Kadus)</option>
                    <option value="Rukun Warga (RW)">Rukun Warga (Ketua RW)</option>
                    <option value="Rukun Tetangga (RT)">Rukun Tetangga (Ketua RT)</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nama Lengkap & Gelar *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Bpk. Dadang Kusnadi"
                      className="form-control"
                      value={appForm.name}
                      onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Jabatan Struktural *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ketua RT 01 / Ketua RW 02"
                      className="form-control"
                      value={appForm.position}
                      onChange={(e) => setAppForm({ ...appForm, position: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nomor SK / NIP</label>
                    <input
                      type="text"
                      placeholder="SK. RT 01/2023 atau NIP"
                      className="form-control"
                      value={appForm.nip}
                      onChange={(e) => setAppForm({ ...appForm, nip: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nomor WhatsApp Aktif</label>
                    <input
                      type="tel"
                      placeholder="Contoh: 081234567890"
                      className="form-control"
                      value={appForm.phone}
                      onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Cakupan Wilayah / Alamat</label>
                  <input
                    type="text"
                    placeholder="Contoh: Dusun Pasirjati (RW 01, RW 02)"
                    className="form-control"
                    value={appForm.area}
                    onChange={(e) => setAppForm({ ...appForm, area: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Atau URL Foto Langsung:</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    className="form-control"
                    style={{ fontSize: '0.85rem' }}
                    value={appForm.photo}
                    onChange={(e) => setAppForm({ ...appForm, photo: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setApparatusModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingAppIndex !== null ? 'Simpan Perubahan' : 'Tambah Pengurus'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
