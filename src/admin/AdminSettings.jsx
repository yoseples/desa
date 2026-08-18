import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Layout, 
  Palette, 
  Type, 
  Save, 
  CheckCircle2, 
  Upload, 
  RefreshCw, 
  Sparkles, 
  Sun, 
  Moon, 
  Maximize2, 
  Sliders, 
  ShieldCheck,
  Eye,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { defaultThemeSettings } from '../services/initialData';
import { applyThemeToDocument } from '../services/themeHelper';

export default function AdminSettings({ profile, onUpdateProfile }) {
  const [activeTab, setActiveTab] = useState('general'); // 'general', 'layout', 'styling', 'typography'
  
  const [formData, setFormData] = useState(() => {
    return {
      ...profile,
      theme: {
        ...defaultThemeSettings,
        ...(profile?.theme || {})
      }
    };
  });

  // Live real-time preview of changes
  useEffect(() => {
    if (formData?.theme) {
      applyThemeToDocument(formData.theme);
    }
  }, [formData?.theme]);

  const [savedNotice, setSavedNotice] = useState(false);

  // File Upload Handlers (Logo, Photo, Banner, Office)
  const handleImageFileChange = (e, fieldPath) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 3.5 * 1024 * 1024) {
      alert('Ukuran file maksimal 3.5 MB!');
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

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3500);
  };

  const handleResetTheme = () => {
    if (window.confirm('Kembalikan pengaturan Layout, Styling, dan Tipografi ke setelan default desa?')) {
      const reset = {
        ...formData,
        theme: defaultThemeSettings
      };
      setFormData(reset);
      onUpdateProfile(reset);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3500);
    }
  };

  const presetColors = [
    { label: 'Emerald Hijau (Bawaan)', hex: '#059669' },
    { label: 'Teal Samudra', hex: '#0d9488' },
    { label: 'Royal Blue Modern', hex: '#2563eb' },
    { label: 'Indigo Elegant', hex: '#4f46e5' },
    { label: 'Forest Deep', hex: '#064e3b' },
    { label: 'Amber Keemasan', hex: '#d97706' },
    { label: 'Crimson Merah', hex: '#dc2626' },
    { label: 'Slate Dark', hex: '#334155' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. TOP SUB-NAV TABS (General, Layout, Styling, Typography) */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        background: '#ffffff',
        padding: '0.65rem 0.85rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--light-border)',
        boxShadow: 'var(--shadow-sm)',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button
            className={`btn btn-sm ${activeTab === 'general' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('general')}
          >
            <Building size={14} /> General (Umum & Media)
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'layout' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('layout')}
          >
            <Layout size={14} /> Layout (Tata Letak)
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'styling' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('styling')}
          >
            <Palette size={14} /> Styling (Tema & Warna)
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'typography' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('typography')}
          >
            <Type size={14} /> Typography (Tipografi)
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleResetTheme}
            title="Reset ke Default"
          >
            <RefreshCw size={13} /> Reset Default
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleSave}
          >
            <Save size={13} /> Simpan Pengaturan
          </button>
        </div>
      </div>

      {savedNotice && (
        <div style={{
          background: '#dcfce7',
          border: '1px solid #86efac',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          color: '#166534',
          fontWeight: 700,
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle2 size={16} color="#16a34a" />
          Pengaturan berhasil disimpan dan langsung diterapkan ke seluruh portal desa!
        </div>
      )}

      {/* 2. FORM BODY */}
      <form onSubmit={handleSave} className="table-wrapper" style={{ padding: '1.75rem' }}>
        
        {/* ====================================================================
            TAB 1: GENERAL (Informasi Dasar, Media, Logo & Kontak)
            ==================================================================== */}
        {activeTab === 'general' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>
                Pengaturan Umum & Identitas Desa
              </h3>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Sesuaikan nama desa, logo resmi, foto aparatur, slogan, dan informasi kontak kantor balai desa.
              </span>
            </div>

            {/* Sub-Section 1: Nama & Slogan */}
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#059669', marginBottom: '1rem' }}>
                1. Informasi Dasar Desa
              </h4>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nama Desa *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Kode Resmi Wilayah Kemendagri</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  />
                </div>
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

              <div className="form-group">
                <label className="form-label">Slogan / Tagline Desa</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                />
              </div>
            </div>

            {/* Sub-Section 2: Upload Logo & Media */}
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#059669', marginBottom: '1rem' }}>
                2. Logo & Media Resmi
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.25rem' }}>
                {/* Logo Desa */}
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid var(--light-border)', textAlign: 'center' }}>
                  <label className="form-label">Logo Desa</label>
                  <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    {formData.logo ? (
                      <img src={formData.logo} alt="Logo" style={{ maxHeight: '65px', objectFit: 'contain' }} />
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Belum ada logo</span>
                    )}
                  </div>
                  <label className="btn btn-secondary btn-sm" style={{ width: '100%', cursor: 'pointer' }}>
                    <Upload size={13} /> Ganti Logo File
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageFileChange(e, 'logo')} />
                  </label>
                </div>

                {/* Foto Kades */}
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid var(--light-border)', textAlign: 'center' }}>
                  <label className="form-label">Foto Kepala Desa</label>
                  <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    {formData.headOfVillage?.photo ? (
                      <img src={formData.headOfVillage.photo} alt="Kades" style={{ height: '65px', width: '65px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Belum ada foto</span>
                    )}
                  </div>
                  <label className="btn btn-secondary btn-sm" style={{ width: '100%', cursor: 'pointer' }}>
                    <Upload size={13} /> Ganti Foto Kades
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageFileChange(e, 'headPhoto')} />
                  </label>
                </div>
              </div>
            </div>

            {/* Sub-Section 3: Kepala Desa & Kontak */}
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#059669', marginBottom: '1rem' }}>
                3. Kepala Desa & Kontak Kantor
              </h4>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nama Kepala Desa</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.headOfVillage?.name || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      headOfVillage: { ...formData.headOfVillage, name: e.target.value }
                    })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Periode Masa Jabatan</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.headOfVillage?.period || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      headOfVillage: { ...formData.headOfVillage, period: e.target.value }
                    })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Kata Sambutan Kepala Desa</label>
                <textarea
                  rows={2}
                  className="form-control"
                  value={formData.headOfVillage?.welcomeSpeech || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    headOfVillage: { ...formData.headOfVillage, welcomeSpeech: e.target.value }
                  })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nomor Telepon Kantor</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.contact?.phone || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, phone: e.target.value }
                    })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Resmi Desa</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.contact?.email || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, email: e.target.value }
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 2: LAYOUT (Tata Letak, Kontainer, Header & Spasi)
            ==================================================================== */}
        {activeTab === 'layout' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>
                Pengaturan Layout & Tata Letak
              </h3>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Atur lebar kontainer layar, perilaku navbar header, tinggi navigasi, dan kepadatan spasi halaman.
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
              
              {/* Kontainer Lebar */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
                <label className="form-label" style={{ fontWeight: 800 }}>Lebar Maksimal Kontainer (Grid Width)</label>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
                  Menentukan batas lebar konten utama di layar lebar / desktop monitor.
                </span>

                <select
                  className="form-control"
                  value={formData.theme?.containerWidth || '1200px'}
                  onChange={(e) => setFormData({
                    ...formData,
                    theme: { ...formData.theme, containerWidth: e.target.value }
                  })}
                >
                  <option value="1140px">1140px (Compact Boxed)</option>
                  <option value="1200px">1200px (Standar Proporsional - Bawaan)</option>
                  <option value="1280px">1280px (Modern Wide)</option>
                  <option value="1360px">1360px (Extra Wide HD)</option>
                  <option value="100%">100% (Full Fluid Width)</option>
                </select>
              </div>

              {/* Posisi Navbar Header */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
                <label className="form-label" style={{ fontWeight: 800 }}>Posisi Navbar Header</label>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
                  Perilaku bar navigasi saat pengguna menggulir (scroll) halaman.
                </span>

                <select
                  className="form-control"
                  value={formData.theme?.navbarPosition || 'sticky'}
                  onChange={(e) => setFormData({
                    ...formData,
                    theme: { ...formData.theme, navbarPosition: e.target.value }
                  })}
                >
                  <option value="sticky">Sticky Glassmorphism (Melekat di Atas Saat Scroll)</option>
                  <option value="static">Static Normal (Tetap di Puncak Halaman Saja)</option>
                </select>
              </div>

              {/* Tinggi Navbar Header */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
                <label className="form-label" style={{ fontWeight: 800 }}>Tinggi Header Navbar</label>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
                  Ketebalan bar navigasi bagian atas.
                </span>

                <select
                  className="form-control"
                  value={formData.theme?.navbarHeight || '60px'}
                  onChange={(e) => setFormData({
                    ...formData,
                    theme: { ...formData.theme, navbarHeight: e.target.value }
                  })}
                >
                  <option value="54px">54px (Ultra Sleek & Slim)</option>
                  <option value="60px">60px (Kompak & Simetris - Bawaan)</option>
                  <option value="66px">66px (Sedang / Balanced)</option>
                  <option value="72px">72px (Spacious / Longgar)</option>
                </select>
              </div>

              {/* Kepadatan Spasi Kartu */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
                <label className="form-label" style={{ fontWeight: 800 }}>Kepadatan Spasi Konten (Spacing Density)</label>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
                  Jarak padding antar-kotak, tabel, dan section.
                </span>

                <select
                  className="form-control"
                  value={formData.theme?.cardDensity || 'comfortable'}
                  onChange={(e) => setFormData({
                    ...formData,
                    theme: { ...formData.theme, cardDensity: e.target.value }
                  })}
                >
                  <option value="compact">Compact (Padat & Ringkas)</option>
                  <option value="comfortable">Comfortable (Nyaman & Seimbang - Bawaan)</option>
                  <option value="spacious">Spacious (Lapang & Lega)</option>
                </select>
              </div>

            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 3: STYLING (Warna Tema, Sudut Kartu & Bayangan)
            ==================================================================== */}
        {activeTab === 'styling' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>
                Pengaturan Styling, Warna & Sudut
              </h3>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Kustomisasi warna identitas desa, bentuk sudut rounded, dan intensitas bayangan elemen.
              </span>
            </div>

            {/* Preset Color Palettes */}
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
              <label className="form-label" style={{ fontWeight: 800 }}>Pilih Palet Warna Aksen Utama (Brand Primary)</label>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1rem' }}>
                Warna tombol utama, ikon aktif, badge status, dan aksen navbar portal desa.
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {presetColors.map((color) => {
                  const isSelected = (formData.theme?.primaryColor || '#059669').toLowerCase() === color.hex.toLowerCase();
                  return (
                    <div
                      key={color.hex}
                      onClick={() => setFormData({
                        ...formData,
                        theme: { ...formData.theme, primaryColor: color.hex }
                      })}
                      style={{
                        background: '#ffffff',
                        border: isSelected ? `2px solid ${color.hex}` : '1px solid var(--light-border)',
                        borderRadius: '10px',
                        padding: '0.65rem 0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: isSelected ? '0 4px 10px rgba(0,0,0,0.1)' : 'none',
                        transition: 'var(--transition)'
                      }}
                    >
                      <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: color.hex, flexShrink: 0 }}></span>
                      <span style={{ fontSize: '0.75rem', fontWeight: isSelected ? 800 : 600, color: 'var(--text-main)' }}>
                        {color.label.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Custom Color Input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--light-border)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Pilih Warna Custom (Hex):</span>
                <input
                  type="color"
                  value={formData.theme?.primaryColor || '#059669'}
                  onChange={(e) => setFormData({
                    ...formData,
                    theme: { ...formData.theme, primaryColor: e.target.value }
                  })}
                  style={{ width: '40px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                />
                <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.9rem', color: formData.theme?.primaryColor || '#059669' }}>
                  {formData.theme?.primaryColor || '#059669'}
                </span>
              </div>
            </div>

            {/* Corner Radius & Shadows */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
              
              {/* Border Radius */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
                <label className="form-label" style={{ fontWeight: 800 }}>Bentuk Kelengkungan Sudut (Border Radius)</label>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
                  Tingkat kebulatan sudut tombol, kartu, dan kotak input.
                </span>

                <select
                  className="form-control"
                  value={formData.theme?.borderRadius || '12px'}
                  onChange={(e) => setFormData({
                    ...formData,
                    theme: { ...formData.theme, borderRadius: e.target.value }
                  })}
                >
                  <option value="4px">4px (Sharp / Tegas Kotak)</option>
                  <option value="8px">8px (Sleek Modern)</option>
                  <option value="12px">12px (Smooth Rounded - Bawaan)</option>
                  <option value="18px">18px (Curved Lembut)</option>
                  <option value="24px">24px (Pill Style Bulat)</option>
                </select>
              </div>

              {/* Shadow Intensity */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
                <label className="form-label" style={{ fontWeight: 800 }}>Intensitas Bayangan (Box Shadow)</label>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
                  Efek kedalaman elevasi kartu dan container.
                </span>

                <select
                  className="form-control"
                  value={formData.theme?.shadowIntensity || 'soft'}
                  onChange={(e) => setFormData({
                    ...formData,
                    theme: { ...formData.theme, shadowIntensity: e.target.value }
                  })}
                >
                  <option value="none">Flat (Tanpa Bayangan)</option>
                  <option value="subtle">Subtle (Bayangan Sangat Tipis)</option>
                  <option value="soft">Soft Modern (Seimbang - Bawaan)</option>
                  <option value="elevated">Elevated (Bayangan Tebal 3D)</option>
                </select>
              </div>

            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 4: TYPOGRAPHY (Jenis Font, Ukuran & Ketebalan Heading)
            ==================================================================== */}
        {activeTab === 'typography' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>
                Pengaturan Tipografi & Huruf
              </h3>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Pilih jenis font Google Fonts resmi, ukuran teks dasar, dan ketebalan huruf judul.
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
              
              {/* Font Family */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
                <label className="form-label" style={{ fontWeight: 800 }}>Jenis Font Utama (Google Fonts)</label>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
                  Karakter huruf untuk seluruh antarmuka portal dan dashboard.
                </span>

                <select
                  className="form-control"
                  value={formData.theme?.fontFamily || "'Plus Jakarta Sans', system-ui, sans-serif"}
                  onChange={(e) => setFormData({
                    ...formData,
                    theme: { ...formData.theme, fontFamily: e.target.value }
                  })}
                  style={{ fontWeight: 700 }}
                >
                  <option value="'Plus Jakarta Sans', system-ui, sans-serif">Plus Jakarta Sans (Modern & Bersih - Bawaan)</option>
                  <option value="'Inter', system-ui, sans-serif">Inter (Presisi & Profesional UI)</option>
                  <option value="'Outfit', system-ui, sans-serif">Outfit (Futuristik & Trendy)</option>
                  <option value="'Poppins', system-ui, sans-serif">Poppins (Geometris & Ramah)</option>
                  <option value="'Roboto', system-ui, sans-serif">Roboto (Standar Android & Universal)</option>
                  <option value="'Montserrat', system-ui, sans-serif">Montserrat (Tegas & Elegan)</option>
                </select>
              </div>

              {/* Base Font Size */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
                <label className="form-label" style={{ fontWeight: 800 }}>Ukuran Font Dasar (Base Size)</label>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
                  Skala ukuran pembacaan teks paragraf.
                </span>

                <select
                  className="form-control"
                  value={formData.theme?.baseFontSize || '16px'}
                  onChange={(e) => setFormData({
                    ...formData,
                    theme: { ...formData.theme, baseFontSize: e.target.value }
                  })}
                >
                  <option value="14px">14px (Kompak / Ringkas)</option>
                  <option value="15px">15px (Sedang)</option>
                  <option value="16px">16px (Standar Nyaman - Bawaan)</option>
                  <option value="17px">17px (Besar & Jelas)</option>
                </select>
              </div>

              {/* Heading Weight */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
                <label className="form-label" style={{ fontWeight: 800 }}>Ketebalan Judul (Heading Weight)</label>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
                  Tingkat ketebalan huruf pada judul halaman dan kartu.
                </span>

                <select
                  className="form-control"
                  value={formData.theme?.headingWeight || '800'}
                  onChange={(e) => setFormData({
                    ...formData,
                    theme: { ...formData.theme, headingWeight: e.target.value }
                  })}
                >
                  <option value="600">600 (Semi-Bold)</option>
                  <option value="700">700 (Bold Standar)</option>
                  <option value="800">800 (Extra-Bold Tegas - Bawaan)</option>
                  <option value="900">900 (Black Tebal Maksimal)</option>
                </select>
              </div>

              {/* Letter Spacing */}
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
                <label className="form-label" style={{ fontWeight: 800 }}>Kerapatan Huruf (Letter Spacing)</label>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
                  Jarak renggang antar-huruf pada teks.
                </span>

                <select
                  className="form-control"
                  value={formData.theme?.letterSpacing || '-0.01em'}
                  onChange={(e) => setFormData({
                    ...formData,
                    theme: { ...formData.theme, letterSpacing: e.target.value }
                  })}
                >
                  <option value="-0.02em">Rapat (-0.02em)</option>
                  <option value="-0.01em">Proporsional (-0.01em - Bawaan)</option>
                  <option value="0px">Normal (0px)</option>
                  <option value="0.02em">Renggang (+0.02em)</option>
                </select>
              </div>

            </div>

            {/* Live Typography Preview Box */}
            <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '2px dashed var(--primary)', marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Pratinjau Langsung Tipografi ({formData.theme?.fontFamily?.split(',')[0]}):
              </div>
              <h2 style={{
                fontFamily: formData.theme?.fontFamily,
                fontWeight: formData.theme?.headingWeight,
                fontSize: '1.5rem',
                margin: '0 0 0.5rem 0',
                color: 'var(--text-main)',
                letterSpacing: formData.theme?.letterSpacing
              }}>
                Pemerintah Desa Sukamaju Mandiri
              </h2>
              <p style={{
                fontFamily: formData.theme?.fontFamily,
                fontSize: formData.theme?.baseFontSize,
                lineHeight: 1.6,
                color: 'var(--text-muted)',
                margin: 0
              }}>
                Platform pelayanan publik mandiri 24 jam dengan transparansi anggaran APBDes dan keterbukaan informasi terpadu.
              </p>
            </div>
          </div>
        )}

        {/* 3. SUBMIT BUTTON FOOTER */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--light-border)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem' }}
          >
            <Save size={16} /> Simpan Seluruh Pengaturan
          </button>
        </div>

      </form>

    </div>
  );
}
