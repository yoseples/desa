import React, { useState } from 'react';
import { Settings, Save, RefreshCw, Building2, User, Phone, MapPin, Target, AlertTriangle } from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function AdminSettings({ profile, onUpdateProfile }) {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    tagline: profile?.tagline || '',
    district: profile?.district || '',
    regency: profile?.regency || '',
    province: profile?.province || '',
    postalCode: profile?.postalCode || '',
    code: profile?.code || '',
    headName: profile?.headOfVillage?.name || '',
    headTitle: profile?.headOfVillage?.title || '',
    headPeriod: profile?.headOfVillage?.period || '',
    headPhoto: profile?.headOfVillage?.photo || '',
    headSpeech: profile?.headOfVillage?.welcomeSpeech || '',
    history: profile?.history || '',
    vision: profile?.vision || '',
    missionsText: profile?.missions ? profile?.missions.join('\n') : '',
    address: profile?.contact?.address || '',
    phone: profile?.contact?.phone || '',
    email: profile?.contact?.email || '',
    whatsapp: profile?.contact?.whatsapp || '',
    openingHours: profile?.contact?.openingHours || '',
    population: profile?.stats?.population || 4850,
    households: profile?.stats?.households || 1320,
    rtCount: profile?.stats?.rtCount || 24,
    rwCount: profile?.stats?.rwCount || 6,
    areaSize: profile?.stats?.areaSize || '14.8 km²'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProfile = {
      ...profile,
      name: formData.name,
      tagline: formData.tagline,
      district: formData.district,
      regency: formData.regency,
      province: formData.province,
      postalCode: formData.postalCode,
      code: formData.code,
      headOfVillage: {
        ...profile.headOfVillage,
        name: formData.headName,
        title: formData.headTitle,
        period: formData.headPeriod,
        photo: formData.headPhoto,
        welcomeSpeech: formData.headSpeech
      },
      history: formData.history,
      vision: formData.vision,
      missions: formData.missionsText.split('\n').map(s => s.trim()).filter(Boolean),
      contact: {
        ...profile.contact,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        whatsapp: formData.whatsapp,
        openingHours: formData.openingHours
      },
      stats: {
        ...profile.stats,
        population: Number(formData.population),
        households: Number(formData.households),
        rtCount: Number(formData.rtCount),
        rwCount: Number(formData.rwCount),
        areaSize: formData.areaSize
      }
    };

    onUpdateProfile(updatedProfile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleResetDefaults = () => {
    if (window.confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh data aplikasi ke pengaturan awal contoh desa? Semua data baru yang belum diexport akan dikembalikan ke data default.')) {
      StorageService.resetToDefaults();
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <form onSubmit={handleSubmit}>
        {/* 1. INFORMASI UMUM DESA */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', border: '1px solid var(--light-border)', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669' }}>
            <Building2 size={20} /> Identitas & Informasi Umum Desa
          </h3>

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
            <label className="form-label">Motto / Tagline Desa *</label>
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

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Provinsi</label>
              <input
                type="text"
                className="form-control"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Kode Pos</label>
              <input
                type="text"
                className="form-control"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* 2. DATA KEPALA DESA & SAMBUTAN */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', border: '1px solid var(--light-border)', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669' }}>
            <User size={20} /> Data Kepala Desa & Sambutan
          </h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nama Kepala Desa *</label>
              <input
                type="text"
                required
                className="form-control"
                value={formData.headName}
                onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Periode Jabatan</label>
              <input
                type="text"
                placeholder="2021 - 2027"
                className="form-control"
                value={formData.headPeriod}
                onChange={(e) => setFormData({ ...formData, headPeriod: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">URL Foto Kepala Desa</label>
            <input
              type="url"
              className="form-control"
              value={formData.headPhoto}
              onChange={(e) => setFormData({ ...formData, headPhoto: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Pesan / Sambutan Kepala Desa</label>
            <textarea
              rows={4}
              className="form-control"
              value={formData.headSpeech}
              onChange={(e) => setFormData({ ...formData, headSpeech: e.target.value })}
            />
          </div>
        </div>

        {/* 3. VISI & MISI DESA */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', border: '1px solid var(--light-border)', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669' }}>
            <Target size={20} /> Visi, Misi & Sejarah
          </h3>

          <div className="form-group">
            <label className="form-label">Visi Desa *</label>
            <textarea
              rows={2}
              required
              className="form-control"
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Misi Desa (Satu butir per baris baru) *</label>
            <textarea
              rows={5}
              required
              className="form-control"
              value={formData.missionsText}
              onChange={(e) => setFormData({ ...formData, missionsText: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Sejarah Singkat Desa</label>
            <textarea
              rows={4}
              className="form-control"
              value={formData.history}
              onChange={(e) => setFormData({ ...formData, history: e.target.value })}
            />
          </div>
        </div>

        {/* 4. KONTAK & JADWAL KANTOR */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', border: '1px solid var(--light-border)', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669' }}>
            <Phone size={20} /> Kontak Kantor Pemerintah Desa
          </h3>

          <div className="form-group">
            <label className="form-label">Alamat Kantor Desa *</label>
            <input
              type="text"
              required
              className="form-control"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Telepon Kantor</label>
              <input
                type="text"
                className="form-control"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Resmi</label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Jam Operasional Kantor</label>
            <input
              type="text"
              className="form-control"
              value={formData.openingHours}
              onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
            />
          </div>
        </div>

        {/* 5. STATISTIK KEPENDUDUKAN */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', border: '1px solid var(--light-border)', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669' }}>
            <Settings size={20} /> Statistik & Demografi
          </h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Jumlah Penduduk (Jiwa)</label>
              <input
                type="number"
                className="form-control"
                value={formData.population}
                onChange={(e) => setFormData({ ...formData, population: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Jumlah KK (Kepala Keluarga)</label>
              <input
                type="number"
                className="form-control"
                value={formData.households}
                onChange={(e) => setFormData({ ...formData, households: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Jumlah RT</label>
              <input
                type="number"
                className="form-control"
                value={formData.rtCount}
                onChange={(e) => setFormData({ ...formData, rtCount: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Jumlah RW</label>
              <input
                type="number"
                className="form-control"
                value={formData.rwCount}
                onChange={(e) => setFormData({ ...formData, rwCount: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 0' }}>
          <div>
            {savedSuccess && (
              <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.95rem' }}>
                ✓ Pengaturan profil desa berhasil disimpan!
              </span>
            )}
          </div>
          <button type="submit" className="btn btn-primary btn-lg">
            <Save size={18} /> Simpan Pengaturan Profil Desa
          </button>
        </div>
      </form>

      {/* Danger Zone: Reset Data */}
      <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '16px', padding: '2rem', marginTop: '1rem' }}>
        <h4 style={{ color: '#991b1b', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={20} color="#dc2626" /> Reset Data Aplikasi ke Data Awal
        </h4>
        <p style={{ fontSize: '0.875rem', color: '#b91c1c', marginBottom: '1rem' }}>
          Tindakan ini akan mengembalikan seluruh artikel berita, produk UMKM, destinasi wisata, permohonan surat, dan profil desa ke data sampel mula-mula.
        </p>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={handleResetDefaults}
        >
          <RefreshCw size={14} /> Reset ke Data Default
        </button>
      </div>
    </div>
  );
}
