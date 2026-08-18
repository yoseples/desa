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
  Share2,
  Globe,
  Search,
  FileCode,
  Image as ImageIcon
} from 'lucide-react';
import { defaultThemeSettings } from '../services/initialData';
import { applyThemeToDocument, applySeoAndFavicon } from '../services/themeHelper';

export default function AdminSettings({ profile, onUpdateProfile }) {
  const [activeTab, setActiveTab] = useState('general'); // 'general', 'seo', 'layout', 'styling', 'typography'
  
  const [formData, setFormData] = useState(() => {
    return {
      ...profile,
      favicon: profile?.favicon || "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23059669' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect width='16' height='20' x='4' y='2' rx='2' ry='2'/><path d='M9 22v-4h6v4'/><path d='M8 6h.01'/><path d='M16 6h.01'/><path d='M8 10h.01'/><path d='M16 10h.01'/><path d='M8 14h.01'/><path d='M16 14h.01'/><path d='M8 18h.01'/><path d='M16 18h.01'/></svg>",
      seo: {
        metaTitle: profile?.seo?.metaTitle || `${profile?.name || 'Desa Sukamaju Mandiri'} - Portal Informasi & Layanan Digital Desa`,
        metaDescription: profile?.seo?.metaDescription || profile?.tagline || "Portal Resmi Desa Sukamaju Mandiri. Layanan permohonan surat online 24 jam, cek resi, direktori UMKM warga, transparansi APBDes, dan pesona wisata desa.",
        metaKeywords: profile?.seo?.metaKeywords || "desa pintar, smart village, sukamaju mandiri, surat online, apbdes, umkm desa, wisata desa",
        author: profile?.seo?.author || `Pemerintah ${profile?.name || 'Desa Sukamaju Mandiri'}`,
        ogTitle: profile?.seo?.ogTitle || `Portal Resmi ${profile?.name || 'Desa Sukamaju Mandiri'}`,
        ogDescription: profile?.seo?.ogDescription || profile?.tagline || "Portal Informasi & Layanan Mandiri 24 Jam Desa Sukamaju Mandiri.",
        ogImage: profile?.seo?.ogImage || profile?.bannerImage || "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
        ogType: profile?.seo?.ogType || "website",
        ...(profile?.seo || {})
      },
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
    if (formData) {
      applySeoAndFavicon(formData);
    }
  }, [formData]);

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
      } else if (fieldPath === 'favicon') {
        setFormData(prev => ({ ...prev, favicon: base64 }));
      } else if (fieldPath === 'kkLogo') {
        setFormData(prev => ({ ...prev, kkLogo: base64 }));
      } else if (fieldPath === 'ogImage') {
        setFormData(prev => ({
          ...prev,
          seo: { ...prev.seo, ogImage: base64 }
        }));
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
            <Building size={14} /> Profil Desa
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'seo' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('seo')}
          >
            <Share2 size={14} /> SEO & Favicon
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'layout' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('layout')}
          >
            <Layout size={14} /> Tata Letak
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'styling' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('styling')}
          >
            <Palette size={14} /> Warna & Tema
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'typography' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('typography')}
          >
            <Type size={14} /> Huruf & Font
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

                {/* Logo Kartu Keluarga (KK) */}
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid var(--light-border)', textAlign: 'center' }}>
                  <label className="form-label">Logo Dokumen KK</label>
                  <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    {formData.kkLogo ? (
                      <img src={formData.kkLogo} alt="Logo KK" style={{ maxHeight: '65px', objectFit: 'contain' }} />
                    ) : (
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, display: 'block' }}>🦅 Garuda Pancasila</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Standar Blangko Resmi</span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    <label className="btn btn-secondary btn-sm" style={{ flex: 1, cursor: 'pointer', fontSize: '0.75rem' }}>
                      <Upload size={12} /> Ganti Logo KK
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageFileChange(e, 'kkLogo')} />
                    </label>
                    {formData.kkLogo && (
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ color: '#dc2626', fontSize: '0.75rem', padding: '0.3rem 0.5rem' }}
                        onClick={() => setFormData(prev => ({ ...prev, kkLogo: '' }))}
                        title="Kembalikan ke Garuda Pancasila"
                      >
                        Reset Garuda
                      </button>
                    )}
                  </div>
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
            </div>

            {/* Sub-Section 4: Kontak & Lokasi Kantor Balai Desa */}
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#059669', marginBottom: '1rem' }}>
                4. Kontak Resmi & Lokasi Pelayanan Kantor Desa
              </h4>

              <div className="form-group">
                <label className="form-label">Alamat Lengkap Kantor Balai Desa</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.contact?.address || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact: { ...formData.contact, address: e.target.value }
                  })}
                  placeholder="Jl. Raya Desa Sukamaju Mandiri No. 01, Kec. Harapan Makmur"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Jam Pelayanan Kantor</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.contact?.openingHours || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, openingHours: e.target.value }
                    })}
                    placeholder="Senin - Jumat: 08.00 - 15.30 WIB"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nomor WhatsApp Resmi (Layanan Warga)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.contact?.whatsapp || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, whatsapp: e.target.value }
                    })}
                    placeholder="6281234567890"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nomor Telepon Kantor Balai Desa</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.contact?.phone || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, phone: e.target.value }
                    })}
                    placeholder="(022) 8765-4321"
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
                    placeholder="pemdes@desasukamaju.id"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '0.5rem' }}>
                <label className="form-label" style={{ fontWeight: 800, color: 'var(--text-main)' }}>
                  Kontak Siaga Darurat 24 Jam (Emergency)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', marginTop: '0.35rem' }}>
                  {(formData.contact?.emergencyContacts || [
                    { role: "Puskesmas / Bidan Desa", name: "Ibu Bidan Nurlaela", phone: "0812-9988-7766" },
                    { role: "Babinsa Desa (TNI)", name: "Sertu Hendra Gunawan", phone: "0813-1122-4455" },
                    { role: "Bhabinkamtibmas (Polri)", name: "Aipda Dedi Prasetyo", phone: "0852-6677-8899" },
                    { role: "Mobil Siaga / Ambulans Desa", name: "Call Center 24 Jam", phone: "0821-3344-5566" }
                  ]).map((em, idx) => (
                    <div key={idx} style={{ background: 'var(--light-surface)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--light-border)' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#dc2626', display: 'block' }}>{em.role}</span>
                      <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.25rem' }}>
                        <input
                          type="text"
                          className="form-control"
                          style={{ fontSize: '0.775rem', height: '32px' }}
                          value={em.name}
                          placeholder="Nama Petugas"
                          onChange={(e) => {
                            const updatedEm = [...(formData.contact?.emergencyContacts || [])];
                            updatedEm[idx] = { ...updatedEm[idx], name: e.target.value };
                            setFormData({ ...formData, contact: { ...formData.contact, emergencyContacts: updatedEm } });
                          }}
                        />
                        <input
                          type="text"
                          className="form-control"
                          style={{ fontSize: '0.775rem', height: '32px' }}
                          value={em.phone}
                          placeholder="Nomor Telepon"
                          onChange={(e) => {
                            const updatedEm = [...(formData.contact?.emergencyContacts || [])];
                            updatedEm[idx] = { ...updatedEm[idx], phone: e.target.value };
                            setFormData({ ...formData, contact: { ...formData.contact, emergencyContacts: updatedEm } });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB: SEO, OPEN GRAPH & FAVICON
            ==================================================================== */}
        {activeTab === 'seo' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>
                Pengaturan SEO, Open Graph & Favicon
              </h3>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Kelola favicon ikon tab browser, meta deskripsi mesin pencari, dan pratinjau thumbnail Open Graph saat website dibagikan di WhatsApp, Facebook, dan media sosial.
              </span>
            </div>

            {/* 1. FAVICON MANAGEMENT & BROWSER TAB SIMULATOR */}
            <div style={{ background: 'var(--light-surface)', padding: '1.35rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--light-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    1. Favicon Ikon Tab Browser
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Ikon kecil yang muncul di sebelah judul website pada tab browser pengunjung.
                  </span>
                </div>
              </div>

              {/* Browser Tab Simulation Box */}
              <div style={{
                background: 'var(--light-bg)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--light-border)',
                marginBottom: '1.25rem'
              }}>
                <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Simulasi Tampilan Tab Browser:
                </span>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--light-surface)',
                  padding: '0.45rem 1rem',
                  borderRadius: '8px 8px 0 0',
                  border: '1px solid var(--light-border)',
                  borderBottom: 'none',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  maxWidth: '320px'
                }}>
                  <img
                    src={formData.favicon || formData.logo}
                    alt="Favicon Preview"
                    style={{ width: '18px', height: '18px', objectFit: 'contain', flexShrink: 0 }}
                  />
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {formData.seo?.metaTitle || formData.name || 'Desa Sukamaju Mandiri'}
                  </span>
                </div>
              </div>

              {/* Preset Favicon SVGs */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                  Pilih Preset Ikon SVG Favicon Cepat:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: '0.65rem' }}>
                  
                  {/* Preset 1: Balai Desa */}
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      favicon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23059669' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect width='16' height='20' x='4' y='2' rx='2' ry='2'/><path d='M9 22v-4h6v4'/><path d='M8 6h.01'/><path d='M16 6h.01'/><path d='M8 10h.01'/><path d='M16 10h.01'/><path d='M8 14h.01'/><path d='M16 14h.01'/><path d='M8 18h.01'/><path d='M16 18h.01'/></svg>"
                    })}
                    className="btn btn-secondary btn-sm"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      justifyContent: 'center',
                      padding: '0.5rem',
                      borderColor: formData.favicon?.includes('%23059669') ? 'var(--primary)' : 'var(--light-border)'
                    }}
                  >
                    <Building size={16} color="#059669" /> <span>Balai Desa</span>
                  </button>

                  {/* Preset 2: Pohon & Alam */}
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      favicon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 10a6 6 0 0 0-6-6H3v2a6 6 0 0 0 6 6h3'/><path d='M12 14a6 6 0 0 1 6-6h3v2a6 6 0 0 1-6 6h-3'/><path d='M12 22V10'/></svg>"
                    })}
                    className="btn btn-secondary btn-sm"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      justifyContent: 'center',
                      padding: '0.5rem',
                      borderColor: formData.favicon?.includes('%2310b981') ? 'var(--primary)' : 'var(--light-border)'
                    }}
                  >
                    <Sparkles size={16} color="#10b981" /> <span>Alam & Hijau</span>
                  </button>

                  {/* Preset 3: Perisai Mandiri */}
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      favicon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/></svg>"
                    })}
                    className="btn btn-secondary btn-sm"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      justifyContent: 'center',
                      padding: '0.5rem',
                      borderColor: formData.favicon?.includes('%233b82f6') ? 'var(--primary)' : 'var(--light-border)'
                    }}
                  >
                    <ShieldCheck size={16} color="#3b82f6" /> <span>Perisai Biru</span>
                  </button>

                  {/* Preset 4: Logo Desa */}
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      favicon: formData.logo
                    })}
                    className="btn btn-secondary btn-sm"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      justifyContent: 'center',
                      padding: '0.5rem',
                      borderColor: formData.favicon === formData.logo ? 'var(--primary)' : 'var(--light-border)'
                    }}
                  >
                    <ImageIcon size={16} color="#d97706" /> <span>Logo Desa</span>
                  </button>
                </div>
              </div>

              {/* Custom Favicon URL & File Upload */}
              <div className="form-row" style={{ alignItems: 'flex-end' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Favicon Custom URL / Base64</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://... atau data:image/..."
                    value={formData.favicon || ''}
                    onChange={(e) => setFormData({ ...formData, favicon: e.target.value })}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer', height: '42px', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Upload size={14} /> Upload Ikon (.ico / .png / .svg)
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageFileChange(e, 'favicon')} />
                  </label>
                </div>
              </div>
            </div>

            {/* 2. OPEN GRAPH & SOCIAL MEDIA SHARING */}
            <div style={{ background: 'var(--light-surface)', padding: '1.35rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--light-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Share2 size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    2. Open Graph & Banner Berbagi (WhatsApp / Facebook / X)
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Informasi gambar dan ringkasan yang otomatis tampil saat link website dikirimkan via WhatsApp atau media sosial.
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1.5rem', alignItems: 'flex-start' }}>
                
                {/* Left: Input Fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div className="form-group">
                    <label className="form-label">Judul Open Graph (og:title) *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.seo?.ogTitle || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        seo: { ...formData.seo, ogTitle: e.target.value }
                      })}
                      placeholder="Portal Resmi Desa Sukamaju Mandiri"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Deskripsi Open Graph (og:description) *</label>
                    <textarea
                      rows={3}
                      className="form-control"
                      value={formData.seo?.ogDescription || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        seo: { ...formData.seo, ogDescription: e.target.value }
                      })}
                      placeholder="Layanan administrasi mandiri 24 jam, cek resi, direktori UMKM, dan transparansi APBDes..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Banner Gambar Open Graph (og:image URL)</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.seo?.ogImage || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          seo: { ...formData.seo, ogImage: e.target.value }
                        })}
                        placeholder="https://images.unsplash.com/..."
                      />
                      <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Upload size={13} /> Upload
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageFileChange(e, 'ogImage')} />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right: Live Social Share Card Mockup */}
                <div>
                  <label className="form-label" style={{ fontWeight: 800, marginBottom: '0.4rem' }}>
                    📱 Live Preview Kartu Tautan (WhatsApp / Facebook):
                  </label>
                  <div style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid var(--light-border)',
                    background: 'var(--light-bg)',
                    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)'
                  }}>
                    <div style={{ height: '170px', background: '#e2e8f0', overflow: 'hidden' }}>
                      <img
                        src={formData.seo?.ogImage || formData.bannerImage}
                        alt="OG Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '0.85rem 1rem' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.2rem' }}>
                        desa.sukamaju.id
                      </span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.35rem 0', lineHeight: 1.3 }}>
                        {formData.seo?.ogTitle || formData.name || 'Portal Resmi Desa Sukamaju'}
                      </h4>
                      <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {formData.seo?.ogDescription || formData.tagline || 'Layanan mandiri surat online 24 jam, transparansi APBDes, dan profil desa.'}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. GENERAL SEARCH ENGINE OPTIMIZATION (SEO) */}
            <div style={{ background: 'var(--light-surface)', padding: '1.35rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--light-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Search size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    3. Meta Tag SEO Mesin Pencari (Google Search Engine)
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Kata kunci dan deskripsi halaman untuk meningkatkan peringkat pencarian website di Google.
                  </span>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Meta Page Title Tag (Judul Halaman Web)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.seo?.metaTitle || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      seo: { ...formData.seo, metaTitle: e.target.value }
                    })}
                    placeholder="Desa Sukamaju Mandiri - Portal Informasi & Layanan Digital Desa"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Penulis / Author Meta</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.seo?.author || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      seo: { ...formData.seo, author: e.target.value }
                    })}
                    placeholder="Pemerintah Desa Sukamaju Mandiri"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Meta Description (Ringkasan Cuplikan Pencarian Google)</label>
                <textarea
                  rows={2}
                  className="form-control"
                  value={formData.seo?.metaDescription || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, metaDescription: e.target.value }
                  })}
                  placeholder="Portal Resmi Desa Sukamaju Mandiri. Layanan permohonan surat mandiri 24 jam, transparansi APBDes, direktori produk UMKM, dan pesona wisata desa."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Meta Keywords (Kata Kunci Pencarian - Pisahkan dengan koma)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.seo?.metaKeywords || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, metaKeywords: e.target.value }
                  })}
                  placeholder="desa pintar, smart village, surat online, apbdes, umkm desa, wisata desa"
                />
              </div>

              {/* Google Search Result Preview Simulation */}
              <div style={{
                background: 'var(--light-bg)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--light-border)',
                marginTop: '1rem'
              }}>
                <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                  🔍 Simulasi Hasil Pencarian Google:
                </span>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#16a34a', display: 'block' }}>https://desa.sukamaju.id › portal</span>
                  <h4 style={{ fontSize: '1rem', color: '#2563eb', margin: '0.2rem 0', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>
                    {formData.seo?.metaTitle || formData.name || 'Desa Sukamaju Mandiri - Portal Informasi & Layanan Digital'}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', margin: 0, lineHeight: 1.4 }}>
                    {formData.seo?.metaDescription || formData.tagline || 'Portal Resmi Desa Sukamaju Mandiri. Layanan permohonan surat mandiri 24 jam, transparansi APBDes, direktori produk UMKM, dan pesona wisata desa.'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ====================================================================
            TAB: LAYOUT (Tata Letak, Kontainer, Header & Spasi)
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
