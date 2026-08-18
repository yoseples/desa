import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Settings, 
  Search, 
  User, 
  CheckCircle2, 
  Sparkles, 
  Building, 
  ShieldCheck, 
  Eye, 
  Layers, 
  Edit, 
  Plus, 
  Download,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { officialLetterTemplates, defaultLetterheadConfig } from '../services/letterTemplatesData';
import { StorageService } from '../services/storageService';

export default function AdminLetterTemplates({ profile, onUpdateProfile }) {
  const [activeTab, setActiveTab] = useState('generator'); // 'generator', 'letterhead', 'catalog'

  // Letterhead Configuration State
  const [letterhead, setLetterhead] = useState(() => {
    return profile?.letterhead || defaultLetterheadConfig;
  });

  // Generator State
  const [selectedTemplateId, setSelectedTemplateId] = useState('SKU');
  const [letterNumber, setLetterNumber] = useState(`500/014/DS-SKM/VIII/${new Date().getFullYear()}`);
  const [citizenNik, setCitizenNik] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [citizenAddress, setCitizenAddress] = useState('');
  const [citizenRtRw, setCitizenRtRw] = useState('RT 01 / RW 01');
  const [citizenPhone, setCitizenPhone] = useState('');
  const [citizenJob, setCitizenJob] = useState('Wiraswasta');

  // Dynamic template fields state
  const [dynamicFieldValues, setDynamicFieldValues] = useState({
    businessName: 'Warung Kopi Sunda Rasa Raos',
    businessType: 'Kuliner & Warung Kopi',
    businessAddress: 'Jl. Raya Desa Sukamaju No. 45',
    businessDuration: 'Sejak Tahun 2019',
    purpose: 'Persyaratan Pengajuan KUR Bank BRI'
  });

  const [autofillSuccess, setAutofillSuccess] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);

  const currentTemplate = officialLetterTemplates.find(t => t.id === selectedTemplateId) || officialLetterTemplates[0];

  const handleLookupCitizen = (nik) => {
    if (!nik) return;
    const citizen = StorageService.findCitizenByNik(nik);
    if (citizen) {
      setCitizenName(citizen.name);
      setCitizenAddress(citizen.address || 'Desa Sukamaju');
      setCitizenRtRw(`RT ${citizen.rt} / RW ${citizen.rw}`);
      setCitizenPhone(citizen.phone !== '-' ? citizen.phone : '081234567890');
      setCitizenJob(citizen.occupation || 'Wiraswasta');
      setAutofillSuccess(true);
      setTimeout(() => setAutofillSuccess(false), 3000);
    } else {
      alert(`Data dengan NIK ${nik} tidak ditemukan dalam database kependudukan desa.`);
    }
  };

  const handleSaveLetterhead = (e) => {
    e.preventDefault();
    const updated = {
      ...profile,
      letterhead
    };
    onUpdateProfile(updated);
    alert('Pengaturan Kop Surat & Template Berhasil Disimpan!');
  };

  const handlePrintDocument = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. TOP SUB-NAV TABS */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        background: '#ffffff',
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--light-border)',
        boxShadow: 'var(--shadow-sm)',
        flexWrap: 'wrap'
      }}>
        <button
          className={`btn btn-sm ${activeTab === 'generator' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('generator')}
        >
          <FileText size={15} /> Buat & Cetak Surat Cepat
        </button>
        <button
          className={`btn btn-sm ${activeTab === 'letterhead' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('letterhead')}
        >
          <Settings size={15} /> Pengaturan Kop Surat & TTE
        </button>
        <button
          className={`btn btn-sm ${activeTab === 'catalog' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('catalog')}
        >
          <Layers size={15} /> Katalog 11 Template Resmi Desa
        </button>
      </div>

      {/* 2. TAB 1: GENERATOR & CETAK SURAT */}
      {activeTab === 'generator' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.75rem', alignItems: 'start' }}>
          
          {/* Left Form: Inputs */}
          <div className="table-wrapper" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} color="#059669" /> Formulir Generator Surat
            </h3>

            {/* Template Selector */}
            <div className="form-group">
              <label className="form-label">Pilih Jenis Template Surat Resmi *</label>
              <select
                className="form-control"
                value={selectedTemplateId}
                onChange={(e) => {
                  setSelectedTemplateId(e.target.value);
                  const selected = officialLetterTemplates.find(t => t.id === e.target.value);
                  setLetterNumber(`${selected?.code || '500'}/0${Math.floor(10 + Math.random() * 89)}/DS-SKM/VIII/${new Date().getFullYear()}`);
                }}
                style={{ fontWeight: 700, color: '#064e3b' }}
              >
                {officialLetterTemplates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.category})
                  </option>
                ))}
              </select>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {currentTemplate.description}
              </span>
            </div>

            {/* Register Number */}
            <div className="form-group">
              <label className="form-label">Nomor Register Surat Keluar *</label>
              <input
                type="text"
                className="form-control"
                value={letterNumber}
                onChange={(e) => setLetterNumber(e.target.value)}
                style={{ fontFamily: 'monospace', fontWeight: 700 }}
              />
            </div>

            {/* NIK Auto-Fill from Village DB */}
            <div className="form-group" style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid var(--light-border)' }}>
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Cari Warga dari Database Desa:</span>
                <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>Otomatis Terisi</span>
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Ketik NIK 16 Digit..."
                  className="form-control"
                  value={citizenNik}
                  onChange={(e) => setCitizenNik(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleLookupCitizen(citizenNik)}
                  style={{ flexShrink: 0 }}
                >
                  <Search size={14} /> Cek NIK
                </button>
              </div>
              {autofillSuccess && (
                <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, display: 'block', marginTop: '4px' }}>
                  ✓ Data warga berhasil ditemukan dan disalin!
                </span>
              )}
            </div>

            {/* Citizen Data Inputs */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Nama Pemohon *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bambang Sudrajat"
                  className="form-control"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Pekerjaan</label>
                <input
                  type="text"
                  placeholder="Wiraswasta"
                  className="form-control"
                  value={citizenJob}
                  onChange={(e) => setCitizenJob(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">RT / RW</label>
                <input
                  type="text"
                  placeholder="RT 02 / RW 03"
                  className="form-control"
                  value={citizenRtRw}
                  onChange={(e) => setCitizenRtRw(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Alamat Rumah</label>
                <input
                  type="text"
                  placeholder="Kp. Pasir Salam No. 14"
                  className="form-control"
                  value={citizenAddress}
                  onChange={(e) => setCitizenAddress(e.target.value)}
                />
              </div>
            </div>

            {/* Dynamic Specific Fields */}
            <div style={{ borderTop: '1px solid var(--light-border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#059669', marginBottom: '0.75rem' }}>
                Rincian Khusus Template ({currentTemplate.id}):
              </h4>
              {currentTemplate.fields.map((field) => (
                <div className="form-group" key={field.key}>
                  <label className="form-label">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="form-control"
                    value={dynamicFieldValues[field.key] || ''}
                    onChange={(e) => setDynamicFieldValues({
                      ...dynamicFieldValues,
                      [field.key]: e.target.value
                    })}
                  />
                </div>
              ))}

              <div className="form-group">
                <label className="form-label">Keperluan / Keterangan Tambahan *</label>
                <textarea
                  rows={2}
                  className="form-control"
                  placeholder="Jelaskan tujuan penerbitan surat..."
                  value={dynamicFieldValues.purpose || ''}
                  onChange={(e) => setDynamicFieldValues({
                    ...dynamicFieldValues,
                    purpose: e.target.value
                  })}
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
              onClick={handlePrintDocument}
            >
              <Printer size={16} /> Cetak / Unduh Dokumen Resmi (PDF)
            </button>
          </div>

          {/* Right Preview: Live Printable Paper */}
          <div style={{ background: '#64748b', padding: '1.25rem', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            <div
              className="print-area"
              style={{
                background: '#ffffff',
                padding: '2.5rem 2.25rem',
                borderRadius: '6px',
                color: '#000000',
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '11pt',
                lineHeight: 1.5,
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                minHeight: '650px'
              }}
            >
              {/* KOP SURAT DINAMIS */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.15rem',
                borderBottom: letterhead.lineStyle === 'double' ? '3px double #000000' : '2px solid #000000',
                paddingBottom: '0.75rem',
                marginBottom: '1.25rem'
              }}>
                <div style={{ width: '75px', height: '75px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {profile?.logo ? (
                    <img src={profile.logo} alt="Logo" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
                  ) : (
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '9pt' }}>
                      LOGO
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <h3 style={{ fontSize: '11.5pt', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>
                    {letterhead.regencyName}
                  </h3>
                  <h4 style={{ fontSize: '11pt', fontWeight: 'bold', margin: '2px 0', textTransform: 'uppercase' }}>
                    {letterhead.districtName}
                  </h4>
                  <h2 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '2px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {letterhead.villageName}
                  </h2>
                  <p style={{ fontSize: '8.5pt', margin: 0, fontStyle: 'italic', lineHeight: 1.3 }}>
                    Alamat: {letterhead.address} Kode Pos {letterhead.postalCode} | Telp: {letterhead.phone} | Email: {letterhead.email}
                  </p>
                </div>
              </div>

              {/* JUDUL & NOMOR SURAT */}
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '12.5pt', fontWeight: 'bold', textTransform: 'uppercase', textDecoration: 'underline', margin: 0 }}>
                  {currentTemplate.name}
                </h3>
                <p style={{ fontSize: '10pt', margin: '3px 0 0 0' }}>
                  Nomor: {letterNumber}
                </p>
              </div>

              {/* ISI DRAF SURAT */}
              <div style={{ textAlign: 'justify', fontSize: '10.5pt', marginBottom: '1rem' }}>
                <p style={{ textIndent: '28px', margin: '0 0 0.75rem 0' }}>
                  {currentTemplate.openingText}
                </p>

                {/* IDENTITAS WARGA */}
                <table style={{ width: '100%', marginBottom: '0.75rem', borderCollapse: 'collapse', fontSize: '10.5pt' }}>
                  <tbody>
                    <tr><td style={{ width: '180px', padding: '2px 0' }}>Nama Lengkap</td><td style={{ width: '12px' }}>:</td><td style={{ fontWeight: 'bold' }}>{citizenName || '...........................................'}</td></tr>
                    <tr><td style={{ padding: '2px 0' }}>NIK</td><td>:</td><td>{citizenNik || '...........................................'}</td></tr>
                    <tr><td style={{ padding: '2px 0' }}>Pekerjaan</td><td>:</td><td>{citizenJob || '...........................................'}</td></tr>
                    <tr><td style={{ padding: '2px 0' }}>Alamat Domisili</td><td>:</td><td>{citizenAddress || '...........................................'} ({citizenRtRw})</td></tr>
                    <tr><td style={{ padding: '2px 0' }}>Desa / Kecamatan</td><td>:</td><td>Sukamaju Mandiri / Harapan Makmur</td></tr>
                  </tbody>
                </table>

                <p style={{ textIndent: '28px', margin: '0 0 0.5rem 0' }}>
                  {currentTemplate.bodyParagraph}
                </p>

                {/* RINCIAN KHUSUS */}
                {currentTemplate.fields.map(f => (
                  <div key={f.key} style={{ paddingLeft: '28px', margin: '2px 0' }}>
                    • <strong>{f.label}:</strong> {dynamicFieldValues[f.key] || '-'}
                  </div>
                ))}

                <p style={{ textIndent: '28px', marginTop: '0.75rem' }}>
                  {currentTemplate.closingText}
                </p>
              </div>

              {/* TANDA TANGAN & TTE QR */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '2rem', fontSize: '10pt' }}>
                {letterhead.showQrVerification && (
                  <div style={{ width: '180px', textAlign: 'center', padding: '0.5rem', border: '1px dashed #64748b', borderRadius: '4px' }}>
                    <div style={{ fontSize: '7.5pt', color: '#64748b', marginBottom: '2px' }}>VERIFIKASI DIGITAL DESA</div>
                    <div style={{ background: '#f8fafc', padding: '4px', border: '1px solid #059669', color: '#059669', fontWeight: 'bold', fontSize: '8pt', borderRadius: '3px' }}>
                      ✓ TTE TERVERIFIKASI
                    </div>
                    <div style={{ fontSize: '7pt', color: '#64748b', marginTop: '3px' }}>
                      Dokumen Resmi Elektronik
                    </div>
                  </div>
                )}

                <div style={{ textAlign: 'center', width: '220px' }}>
                  <p style={{ margin: 0 }}>Sukamaju, {currentDate}</p>
                  <p style={{ margin: '2px 0 0 0', fontWeight: 'bold' }}>{letterhead.signatoryRole}</p>
                  <div style={{ height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '8.5pt', color: '#059669', fontStyle: 'italic', fontWeight: 'bold' }}>[ TTE Terverifikasi ]</span>
                  </div>
                  <p style={{ margin: 0, fontWeight: 'bold', textDecoration: 'underline' }}>{letterhead.signatoryName}</p>
                  <p style={{ margin: 0, fontSize: '8.5pt' }}>NIP. {letterhead.signatoryNip}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* 3. TAB 2: PENGATURAN KOP SURAT */}
      {activeTab === 'letterhead' && (
        <form onSubmit={handleSaveLetterhead} className="table-wrapper" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Pengaturan Format Kop Surat Resmi & Penandatangan
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Sesuaikan nama pemerintah daerah, logo, alamat instansi, dan pejabat berwenang penandatangan surat.
          </p>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Pemerintah Kabupaten / Kota *</label>
              <input
                type="text"
                required
                className="form-control"
                value={letterhead.regencyName}
                onChange={(e) => setLetterhead({ ...letterhead, regencyName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Kecamatan *</label>
              <input
                type="text"
                required
                className="form-control"
                value={letterhead.districtName}
                onChange={(e) => setLetterhead({ ...letterhead, districtName: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Nama Instansi / Kantor Desa *</label>
            <input
              type="text"
              required
              className="form-control"
              value={letterhead.villageName}
              onChange={(e) => setLetterhead({ ...letterhead, villageName: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Alamat Kantor Desa</label>
              <input
                type="text"
                className="form-control"
                value={letterhead.address}
                onChange={(e) => setLetterhead({ ...letterhead, address: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Kode Pos</label>
              <input
                type="text"
                className="form-control"
                value={letterhead.postalCode}
                onChange={(e) => setLetterhead({ ...letterhead, postalCode: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nomor Telepon Kantor</label>
              <input
                type="text"
                className="form-control"
                value={letterhead.phone}
                onChange={(e) => setLetterhead({ ...letterhead, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Resmi Instansi</label>
              <input
                type="email"
                className="form-control"
                value={letterhead.email}
                onChange={(e) => setLetterhead({ ...letterhead, email: e.target.value })}
              />
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--light-border)', paddingTop: '1.25rem', marginTop: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#059669', marginBottom: '1rem' }}>
              Pejabat Penandatangan Resmi (TTE)
            </h4>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Jabatan Penandatangan *</label>
                <input
                  type="text"
                  required
                  placeholder="KEPALA DESA SUKAMAJU MANDIRI atau a.n. KEPALA DESA, SEKRETARIS DESA"
                  className="form-control"
                  value={letterhead.signatoryRole}
                  onChange={(e) => setLetterhead({ ...letterhead, signatoryRole: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Nama Pejabat Penandatangan *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={letterhead.signatoryName}
                  onChange={(e) => setLetterhead({ ...letterhead, signatoryName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">NIP Pejabat</label>
              <input
                type="text"
                className="form-control"
                value={letterhead.signatoryNip}
                onChange={(e) => setLetterhead({ ...letterhead, signatoryNip: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary">
              Simpan Pengaturan Kop Surat
            </button>
          </div>
        </form>
      )}

      {/* 4. TAB 3: KATALOG 11 TEMPLATE RESMI DESA */}
      {activeTab === 'catalog' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '1.25rem' }}>
          {officialLetterTemplates.map((template) => (
            <div
              key={template.id}
              className="card"
              style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="badge badge-neutral">{template.category}</span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#059669', fontWeight: 700 }}>
                    {template.code}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0 0.5rem' }}>
                  {template.name}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {template.description}
                </p>

                <div style={{ fontSize: '0.775rem', color: '#334155', background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '8px', marginBottom: '1rem' }}>
                  <strong>Rincian Data:</strong> {template.fields.map(f => f.label).join(', ')}
                </div>
              </div>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSelectedTemplateId(template.id);
                  setActiveTab('generator');
                }}
                style={{ width: '100%' }}
              >
                Gunakan Template Ini <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
