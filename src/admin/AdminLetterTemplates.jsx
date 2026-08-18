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
  ChevronRight,
  Inbox,
  Send,
  Upload,
  Trash2,
  Calendar,
  X,
  FileDown,
  Handshake
} from 'lucide-react';
import { officialLetterTemplates, defaultLetterheadConfig } from '../services/letterTemplatesData';
import { StorageService } from '../services/storageService';

export default function AdminLetterTemplates({ profile, onUpdateProfile }) {
  const [activeTab, setActiveTab] = useState('generator'); // 'generator', 'outgoing', 'incoming', 'letterhead', 'catalog'

  // Letterhead Configuration State
  const [letterhead, setLetterhead] = useState(() => {
    return profile?.letterhead || defaultLetterheadConfig;
  });

  // Outgoing and Incoming Letters state from StorageService
  const [outgoingLetters, setOutgoingLetters] = useState(() => StorageService.getOutgoingLetters());
  const [incomingLetters, setIncomingLetters] = useState(() => StorageService.getIncomingLetters());

  // Search and Filters
  const [outgoingSearch, setOutgoingSearch] = useState('');
  const [incomingSearch, setIncomingSearch] = useState('');

  // Generator State
  const [selectedTemplateId, setSelectedTemplateId] = useState('SK_JUAL_BELI');
  const [letterNumber, setLetterNumber] = useState(`593/018/DS-SKM/VIII/${new Date().getFullYear()}`);
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
    purpose: 'Persyaratan Pengajuan KUR Bank BRI',
    meetingSubject: 'Undangan Musyawarah Rencana Kerja Pemerintah Desa (Musrenbangdes) T.A. 2027',
    meetingNature: 'Penting / Undangan Resmi',
    meetingAttachment: '1 (Satu) Lembar Susunan Acara',
    meetingRecipient: 'Ketua BPD, Ketua LPMD, Seluruh Ketua RW (01 s.d. 10), Seluruh Ketua RT (01 s.d. 20)',
    meetingDateTime: 'Senin, 25 Agustus 2026 Pukul 08.30 WIB s.d. Selesai',
    meetingLocation: 'Aula Balai Desa Sukamaju Mandiri',
    meetingAgenda: 'Pembahasan Prioritas Dana Desa 2027 & Penetapan Program Ketahanan Pangan',
    meetingNotes: 'Pakaian Batik / Rapi, dimohon hadir 15 menit sebelum acara dimulai',
    sellerName: 'Ujang Suherman',
    sellerNik: '3204151505750001',
    sellerAddress: 'Dusun Sukarame RT 03 RW 02 Desa Sukamaju',
    buyerName: 'Bambang Sudrajat',
    buyerNik: '3204151208850002',
    buyerAddress: 'Kp. Pasir Salam RT 02 RW 03 Desa Sukamaju',
    itemType: 'Sebidang Tanah Kebun Kopi & Tanaman Produktif',
    itemLocation: 'Blok Sukarame Persil No. 24 Kohir No. 118',
    itemSize: 'Luas ± 650 m² (Enam Ratus Lima Puluh Meter Persegi)',
    itemBorders: 'Utara: Tanah Bpk. H. Supriatna | Timur: Jalan Desa | Selatan: Saluran Irigasi | Barat: Tanah Bpk. Hendra',
    transactionPrice: 'Rp 150.000.000,- (Seratus Lima Puluh Juta Rupiah)',
    witnessNames: '1. Drs. Subagja (Ketua RW 02), 2. Ahmad Fauzi, S.Kom'
  });

  const [autofillSuccess, setAutofillSuccess] = useState(false);
  const [saveArchiveNotice, setSaveArchiveNotice] = useState(false);

  // Incoming Letter Modal State
  const [incomingModal, setIncomingModal] = useState(false);
  const [incomingForm, setIncomingForm] = useState({
    agendaNumber: '',
    letterNumber: '',
    letterDate: '',
    receivedDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    sender: '',
    subject: '',
    disposition: '',
    dispositionTo: 'Sekretaris Desa',
    status: 'MENUNGGU',
    scanFile: ''
  });

  // Modal View Scan File
  const [viewScanModal, setViewScanModal] = useState(null);

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
      
      if (selectedTemplateId === 'SK_JUAL_BELI') {
        setDynamicFieldValues(prev => ({
          ...prev,
          sellerName: citizen.name,
          sellerNik: citizen.nik,
          sellerAddress: `${citizen.address} RT ${citizen.rt} RW ${citizen.rw}`
        }));
      }

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

  // Print & Auto-Archive to Outgoing Letters Registry
  const handlePrintDocument = () => {
    let recipient = citizenName || 'Warga Desa';
    if (selectedTemplateId === 'SURAT_UNDANGAN') {
      recipient = dynamicFieldValues.meetingRecipient || 'Tokoh & Lembaga Desa';
    } else if (selectedTemplateId === 'SK_JUAL_BELI') {
      recipient = `${dynamicFieldValues.sellerName || 'Penjual'} & ${dynamicFieldValues.buyerName || 'Pembeli'}`;
    }

    StorageService.addOutgoingLetter({
      letterNumber,
      letterType: selectedTemplateId,
      letterName: currentTemplate.name,
      recipientName: recipient,
      recipientNik: citizenNik || dynamicFieldValues.sellerNik || '-',
      purpose: dynamicFieldValues.itemType || dynamicFieldValues.purpose || dynamicFieldValues.meetingSubject || 'Pelayanan Administrasi',
      signer: letterhead.signatoryName
    });

    setOutgoingLetters(StorageService.getOutgoingLetters());
    setSaveArchiveNotice(true);
    setTimeout(() => setSaveArchiveNotice(false), 4000);

    window.print();
  };

  const handleScanFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file scan maksimal 5 MB!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setIncomingForm(prev => ({ ...prev, scanFile: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveIncomingLetter = (e) => {
    e.preventDefault();
    if (!incomingForm.letterNumber || !incomingForm.sender) {
      alert('Nomor Surat dan Asal Instansi Pengirim wajib diisi!');
      return;
    }

    StorageService.addIncomingLetter(incomingForm);
    setIncomingLetters(StorageService.getIncomingLetters());
    setIncomingModal(false);
    alert('Surat Masuk & Hasil Scan Berhasil Diarsipkan!');
  };

  const handleDeleteIncoming = (id) => {
    if (window.confirm('Hapus arsip surat masuk ini?')) {
      const updated = StorageService.deleteIncomingLetter(id);
      setIncomingLetters(updated);
    }
  };

  const handleDeleteOutgoing = (id) => {
    if (window.confirm('Hapus arsip surat keluar ini?')) {
      const updated = StorageService.deleteOutgoingLetter(id);
      setOutgoingLetters(updated);
    }
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const filteredOutgoing = outgoingLetters.filter(l => 
    l.letterNumber.toLowerCase().includes(outgoingSearch.toLowerCase()) ||
    l.recipientName.toLowerCase().includes(outgoingSearch.toLowerCase()) ||
    l.letterName.toLowerCase().includes(outgoingSearch.toLowerCase())
  );

  const filteredIncoming = incomingLetters.filter(l => 
    l.letterNumber.toLowerCase().includes(incomingSearch.toLowerCase()) ||
    l.sender.toLowerCase().includes(incomingSearch.toLowerCase()) ||
    l.subject.toLowerCase().includes(incomingSearch.toLowerCase())
  );

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
          className={`btn btn-sm ${activeTab === 'outgoing' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('outgoing')}
        >
          <Send size={15} /> 📤 Arsip Surat Keluar ({outgoingLetters.length})
        </button>
        <button
          className={`btn btn-sm ${activeTab === 'incoming' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('incoming')}
        >
          <Inbox size={15} /> 📥 Arsip Surat Masuk & Scan ({incomingLetters.length})
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
          <Layers size={15} /> Katalog Template Resmi
        </button>
      </div>

      {saveArchiveNotice && (
        <div style={{
          background: '#dcfce7',
          border: '1px solid #86efac',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 12px',
          color: '#166534',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle2 size={18} color="#16a34a" />
          Surat berhasil dicetak dan otomatis tercatat di <strong>Buku Agenda Arsip Surat Keluar</strong>!
        </div>
      )}

      {/* 2. TAB 1: GENERATOR & CETAK SURAT */}
      {activeTab === 'generator' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.75rem', alignItems: 'start' }}>
          
          {/* Left Form: Inputs */}
          <div className="table-wrapper" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} color="#059669" /> Formulir Generator Dokumen Desa
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

            {/* If NOT Surat Undangan & NOT Jual Beli, show Standard Citizen Lookup */}
            {selectedTemplateId !== 'SURAT_UNDANGAN' && selectedTemplateId !== 'SK_JUAL_BELI' && (
              <>
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
                </div>

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
              </>
            )}

            {/* Dynamic Specific Fields */}
            <div style={{ borderTop: '1px solid var(--light-border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#059669', marginBottom: '0.75rem' }}>
                Rincian Data Dokumen ({currentTemplate.id}):
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

              {selectedTemplateId !== 'SURAT_UNDANGAN' && selectedTemplateId !== 'SK_JUAL_BELI' && (
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
              )}
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
              onClick={handlePrintDocument}
            >
              <Printer size={16} /> Cetak & Arsipkan Surat Keluar (PDF)
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

              {/* 1. FORMAT KHUSUS SURAT KETERANGAN JUAL BELI */}
              {selectedTemplateId === 'SK_JUAL_BELI' ? (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', textDecoration: 'underline', margin: 0 }}>
                      SURAT KETERANGAN JUAL BELI
                    </h3>
                    <p style={{ fontSize: '10pt', margin: '2px 0 0 0' }}>
                      Nomor: {letterNumber}
                    </p>
                  </div>

                  <div style={{ textAlign: 'justify', fontSize: '10pt', lineHeight: 1.45 }}>
                    <p style={{ textIndent: '24px', margin: '0 0 0.5rem 0' }}>
                      {currentTemplate.openingText}
                    </p>

                    {/* PIHAK I & PIHAK II */}
                    <div style={{ marginBottom: '0.65rem' }}>
                      <div style={{ fontWeight: 'bold' }}>1. PIHAK I (PENJUAL):</div>
                      <table style={{ width: '100%', fontSize: '9.5pt', margin: '2px 0 0 16px' }}>
                        <tbody>
                          <tr><td style={{ width: '150px' }}>Nama Lengkap</td><td style={{ width: '10px' }}>:</td><td style={{ fontWeight: 'bold' }}>{dynamicFieldValues.sellerName || '-'}</td></tr>
                          <tr><td>NIK</td><td>:</td><td>{dynamicFieldValues.sellerNik || '-'}</td></tr>
                          <tr><td>Alamat</td><td>:</td><td>{dynamicFieldValues.sellerAddress || '-'}</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <div style={{ marginBottom: '0.65rem' }}>
                      <div style={{ fontWeight: 'bold' }}>2. PIHAK II (PEMBELI):</div>
                      <table style={{ width: '100%', fontSize: '9.5pt', margin: '2px 0 0 16px' }}>
                        <tbody>
                          <tr><td style={{ width: '150px' }}>Nama Lengkap</td><td style={{ width: '10px' }}>:</td><td style={{ fontWeight: 'bold' }}>{dynamicFieldValues.buyerName || '-'}</td></tr>
                          <tr><td>NIK</td><td>:</td><td>{dynamicFieldValues.buyerNik || '-'}</td></tr>
                          <tr><td>Alamat</td><td>:</td><td>{dynamicFieldValues.buyerAddress || '-'}</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <p style={{ textIndent: '24px', margin: '0.5rem 0' }}>
                      Kedua belah pihak telah bersepakat mengadakan transaksi jual beli atas:
                    </p>

                    {/* RINCIAN OBJEK TANAH/BARANG */}
                    <table style={{ width: '100%', background: '#f8fafc', border: '1px solid #cbd5e1', fontSize: '9.5pt', padding: '4px', margin: '4px 0 0.5rem 0' }}>
                      <tbody>
                        <tr><td style={{ width: '170px', padding: '2px 4px' }}>Objek Transaksi</td><td style={{ width: '10px' }}>:</td><td style={{ fontWeight: 'bold' }}>{dynamicFieldValues.itemType}</td></tr>
                        <tr><td style={{ padding: '2px 4px' }}>Lokasi / Persil / Kohir</td><td>:</td><td>{dynamicFieldValues.itemLocation}</td></tr>
                        <tr><td style={{ padding: '2px 4px' }}>Ukuran / Luas</td><td>:</td><td>{dynamicFieldValues.itemSize}</td></tr>
                        <tr><td style={{ padding: '2px 4px' }}>Batas-Batas Objek</td><td>:</td><td>{dynamicFieldValues.itemBorders}</td></tr>
                        <tr><td style={{ padding: '2px 4px' }}>Harga Kesepakatan (Lunas)</td><td>:</td><td style={{ fontWeight: 'bold' }}>{dynamicFieldValues.transactionPrice}</td></tr>
                      </tbody>
                    </table>

                    <p style={{ textIndent: '24px', margin: '0.4rem 0' }}>
                      {currentTemplate.bodyParagraph}
                    </p>

                    <p style={{ textIndent: '24px', margin: '0.4rem 0' }}>
                      {currentTemplate.closingText}
                    </p>
                  </div>

                  {/* SIGNATURE 3 BLOCKS: PIHAK I, PIHAK II, SAKSI & KADES */}
                  <div style={{ marginTop: '1.25rem', fontSize: '9.5pt' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', textAlign: 'center', marginBottom: '1rem' }}>
                      <div>
                        <div>PIHAK II (PEMBELI)</div>
                        <div style={{ height: '48px' }}></div>
                        <div style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{dynamicFieldValues.buyerName || '(................................)'}</div>
                      </div>
                      <div>
                        <div>PIHAK I (PENJUAL)</div>
                        <div style={{ height: '48px' }}></div>
                        <div style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{dynamicFieldValues.sellerName || '(................................)'}</div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'center', margin: '0.5rem auto 0 auto', width: '250px' }}>
                      <div>Mengetahui,</div>
                      <div style={{ fontWeight: 'bold' }}>{letterhead.signatoryRole}</div>
                      <div style={{ height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '8pt', color: '#059669', fontStyle: 'italic', fontWeight: 'bold' }}>[ TTE Terverifikasi ]</span>
                      </div>
                      <div style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{letterhead.signatoryName}</div>
                      <div style={{ fontSize: '8pt' }}>NIP. {letterhead.signatoryNip}</div>
                    </div>
                  </div>
                </div>
              ) : selectedTemplateId === 'SURAT_UNDANGAN' ? (
                /* 2. FORMAT SURAT UNDANGAN RESMI */
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '10.5pt' }}>
                    <table style={{ width: '58%' }}>
                      <tbody>
                        <tr><td style={{ width: '70px' }}>Nomor</td><td style={{ width: '10px' }}>:</td><td>{letterNumber}</td></tr>
                        <tr><td>Sifat</td><td>:</td><td>{dynamicFieldValues.meetingNature || 'Penting'}</td></tr>
                        <tr><td>Lampiran</td><td>:</td><td>{dynamicFieldValues.meetingAttachment || '-'}</td></tr>
                        <tr><td>Perihal</td><td>:</td><td style={{ fontWeight: 'bold' }}>{dynamicFieldValues.meetingSubject || 'Undangan Musyawarah'}</td></tr>
                      </tbody>
                    </table>

                    <div style={{ textAlign: 'left', width: '38%' }}>
                      <p style={{ margin: 0 }}>Sukamaju, {currentDate}</p>
                      <p style={{ margin: '4px 0 0 0' }}>Kepada Yth.</p>
                      <p style={{ margin: 0, fontWeight: 'bold' }}>{dynamicFieldValues.meetingRecipient || 'Bapak/Ibu Tamu Undangan'}</p>
                      <p style={{ margin: 0 }}>di Tempat</p>
                    </div>
                  </div>

                  <p style={{ textIndent: '28px', margin: '0.75rem 0' }}>
                    {currentTemplate.openingText}
                  </p>

                  <table style={{ width: '100%', margin: '0.5rem 0 0.75rem 28px', fontSize: '10.5pt' }}>
                    <tbody>
                      <tr><td style={{ width: '150px', padding: '2px 0' }}>Hari / Tanggal / Pukul</td><td style={{ width: '10px' }}>:</td><td style={{ fontWeight: 'bold' }}>{dynamicFieldValues.meetingDateTime}</td></tr>
                      <tr><td style={{ padding: '2px 0' }}>Tempat Acara</td><td>:</td><td>{dynamicFieldValues.meetingLocation}</td></tr>
                      <tr><td style={{ padding: '2px 0' }}>Agenda Utama</td><td>:</td><td style={{ fontWeight: 'bold' }}>{dynamicFieldValues.meetingAgenda}</td></tr>
                      {dynamicFieldValues.meetingNotes && (
                        <tr><td style={{ padding: '2px 0' }}>Catatan Khusus</td><td>:</td><td style={{ fontStyle: 'italic' }}>{dynamicFieldValues.meetingNotes}</td></tr>
                      )}
                    </tbody>
                  </table>

                  <p style={{ textIndent: '28px', margin: '0.5rem 0' }}>
                    {currentTemplate.bodyParagraph}
                  </p>

                  <p style={{ textIndent: '28px', margin: '0.5rem 0' }}>
                    {currentTemplate.closingText}
                  </p>

                  {/* TTE PEJABAT */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem', fontSize: '10pt' }}>
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
              ) : (
                /* 3. FORMAT SURAT KETERANGAN UMUM (SKU, SKTM, SKD, DLL) */
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '12.5pt', fontWeight: 'bold', textTransform: 'uppercase', textDecoration: 'underline', margin: 0 }}>
                      {currentTemplate.name}
                    </h3>
                    <p style={{ fontSize: '10pt', margin: '3px 0 0 0' }}>
                      Nomor: {letterNumber}
                    </p>
                  </div>

                  <div style={{ textAlign: 'justify', fontSize: '10.5pt', marginBottom: '1rem' }}>
                    <p style={{ textIndent: '28px', margin: '0 0 0.75rem 0' }}>
                      {currentTemplate.openingText}
                    </p>

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
              )}

            </div>
          </div>

        </div>
      )}

      {/* 3. TAB 2: ARSIP BUKU AGENDA SURAT KELUAR */}
      {activeTab === 'outgoing' && (
        <div className="table-wrapper" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                📤 Buku Agenda Arsip Surat Keluar Desa
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
                Seluruh surat dinas & permohonan warga yang telah dicetak otomatis tercatat dalam basis data arsip desa.
              </p>
            </div>

            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Cari nomor surat, penerima..."
                className="form-control"
                style={{ paddingLeft: '2.25rem', height: '38px', fontSize: '0.85rem' }}
                value={outgoingSearch}
                onChange={(e) => setOutgoingSearch(e.target.value)}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nomor Surat Keluar</th>
                  <th>Jenis Dokumen</th>
                  <th>Nama Penerima / Pemohon</th>
                  <th>Tanggal Terbit</th>
                  <th>Keperluan / Perihal</th>
                  <th>Penandatangan</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredOutgoing.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      Belum ada riwayat surat keluar yang tersimpan.
                    </td>
                  </tr>
                ) : (
                  filteredOutgoing.map((out, idx) => (
                    <tr key={out.id}>
                      <td style={{ fontWeight: 'bold' }}>{idx + 1}</td>
                      <td>
                        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#064e3b' }}>
                          {out.letterNumber}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                          {out.letterType}
                        </span>
                      </td>
                      <td>
                        <strong>{out.recipientName}</strong>
                        {out.recipientNik !== '-' && (
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            NIK: {out.recipientNik}
                          </span>
                        )}
                      </td>
                      <td>{out.date}</td>
                      <td style={{ maxWidth: '240px' }}>{out.purpose}</td>
                      <td>{out.signer}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className="btn btn-sm btn-danger"
                          style={{ padding: '0.25rem 0.5rem' }}
                          onClick={() => handleDeleteOutgoing(out.id)}
                          title="Hapus Arsip"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. TAB 3: ARSIP BUKU AGENDA SURAT MASUK (DENGAN HASIL SCAN & DISPOSISI) */}
      {activeTab === 'incoming' && (
        <div className="table-wrapper" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                📥 Buku Agenda Surat Masuk & Berkas Scan
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
                Pencatatan surat resmi masuk dari Kementerian, Dinas, Kecamatan, Puskesmas, dan Kepolisian beserta file scan dan lembar disposisi Kades.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '240px' }}>
                <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Cari instansi, perihal..."
                  className="form-control"
                  style={{ paddingLeft: '2.25rem', height: '38px', fontSize: '0.85rem' }}
                  value={incomingSearch}
                  onChange={(e) => setIncomingSearch(e.target.value)}
                />
              </div>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setIncomingForm({
                    agendaNumber: `AG-2026-${Math.floor(100 + Math.random() * 899)}`,
                    letterNumber: '',
                    letterDate: '',
                    receivedDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                    sender: '',
                    subject: '',
                    disposition: '',
                    dispositionTo: 'Sekretaris Desa',
                    status: 'MENUNGGU',
                    scanFile: ''
                  });
                  setIncomingModal(true);
                }}
              >
                <Plus size={15} /> Catat Surat Masuk & Upload Scan
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>No. Agenda</th>
                  <th>Nomor & Tanggal Surat</th>
                  <th>Instansi Pengirim</th>
                  <th>Perihal / Ringkasan Isi</th>
                  <th>Tgl Diterima</th>
                  <th>Disposisi & Arahan Kades</th>
                  <th>Berkas Scan</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredIncoming.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      Belum ada data surat masuk tercatat.
                    </td>
                  </tr>
                ) : (
                  filteredIncoming.map((inc) => (
                    <tr key={inc.id}>
                      <td style={{ fontWeight: 800, color: '#059669' }}>{inc.agendaNumber}</td>
                      <td>
                        <strong>{inc.letterNumber}</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Tgl Surat: {inc.letterDate}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{inc.sender}</span>
                      </td>
                      <td style={{ maxWidth: '240px' }}>{inc.subject}</td>
                      <td>{inc.receivedDate}</td>
                      <td style={{ maxWidth: '240px', fontSize: '0.8rem' }}>
                        <div style={{ background: '#f8fafc', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid var(--light-border)' }}>
                          <strong>Kepada:</strong> {inc.dispositionTo}<br />
                          <strong>Instruksi:</strong> {inc.disposition || 'Tindaklanjuti sesuai tupoksi.'}
                        </div>
                      </td>
                      <td>
                        {inc.scanFile ? (
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', color: '#059669', borderColor: '#86efac' }}
                            onClick={() => setViewScanModal(inc)}
                          >
                            <Eye size={13} /> Lihat Scan
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tidak ada berkas</span>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${inc.status === 'SELESAI' ? 'badge-success' : inc.status === 'PROSES' ? 'badge-warning' : 'badge-neutral'}`}>
                          {inc.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className="btn btn-sm btn-danger"
                          style={{ padding: '0.25rem 0.5rem' }}
                          onClick={() => handleDeleteIncoming(inc.id)}
                          title="Hapus"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. TAB 4: PENGATURAN KOP SURAT */}
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
                  placeholder="KEPALA DESA SUKAMAJU MANDIRI"
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

      {/* 6. TAB 5: KATALOG TEMPLATE RESMI */}
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

      {/* MODAL INPUT SURAT MASUK & SCAN */}
      {incomingModal && (
        <div className="modal-backdrop" onClick={() => setIncomingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Catat Surat Masuk & Berkas Scan</h3>
              <button className="modal-close" onClick={() => setIncomingModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveIncomingLetter}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nomor Agenda Desa *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={incomingForm.agendaNumber}
                      onChange={(e) => setIncomingForm({ ...incomingForm, agendaNumber: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nomor Surat Masuk *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 005/312/KEC/2026"
                      className="form-control"
                      value={incomingForm.letterNumber}
                      onChange={(e) => setIncomingForm({ ...incomingForm, letterNumber: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Tanggal Surat Masuk</label>
                    <input
                      type="text"
                      placeholder="18 Agustus 2026"
                      className="form-control"
                      value={incomingForm.letterDate}
                      onChange={(e) => setIncomingForm({ ...incomingForm, letterDate: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tanggal Diterima</label>
                    <input
                      type="text"
                      className="form-control"
                      value={incomingForm.receivedDate}
                      onChange={(e) => setIncomingForm({ ...incomingForm, receivedDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Asal Instansi / Pengirim *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kantor Kecamatan Harapan Makmur / Dinas PMD"
                    className="form-control"
                    value={incomingForm.sender}
                    onChange={(e) => setIncomingForm({ ...incomingForm, sender: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Perihal / Ringkasan Isi Surat *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Contoh: Undangan Rapat Koordinasi Evaluasi Penyaluran Dana Desa..."
                    className="form-control"
                    value={incomingForm.subject}
                    onChange={(e) => setIncomingForm({ ...incomingForm, subject: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Disposisi Diteruskan Kepada</label>
                    <select
                      className="form-control"
                      value={incomingForm.dispositionTo}
                      onChange={(e) => setIncomingForm({ ...incomingForm, dispositionTo: e.target.value })}
                    >
                      <option value="Sekretaris Desa">Sekretaris Desa (Sekdes)</option>
                      <option value="Kasi Pelayanan & TI">Kasi Pelayanan & TI</option>
                      <option value="Kasi Kesejahteraan (Kesra)">Kasi Kesejahteraan (Kesra)</option>
                      <option value="Kaur Perencanaan & Pembangunan">Kaur Perencanaan & Pembangunan</option>
                      <option value="Kaur Keuangan">Kaur Keuangan</option>
                      <option value="Seluruh Kepala Dusun">Seluruh Kepala Dusun (Kadus)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Status Tindak Lanjut</label>
                    <select
                      className="form-control"
                      value={incomingForm.status}
                      onChange={(e) => setIncomingForm({ ...incomingForm, status: e.target.value })}
                    >
                      <option value="MENUNGGU">MENUNGGU</option>
                      <option value="PROSES">PROSES</option>
                      <option value="SELESAI">SELESAI</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Instruksi / Catatan Disposisi Kepala Desa</label>
                  <input
                    type="text"
                    placeholder="Contoh: Hadiri dan buatkan laporan hasil rapat."
                    className="form-control"
                    value={incomingForm.disposition}
                    onChange={(e) => setIncomingForm({ ...incomingForm, disposition: e.target.value })}
                  />
                </div>

                {/* Upload Scan Document */}
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid var(--light-border)' }}>
                  <label className="form-label" style={{ fontWeight: 700 }}>Unggah Berkas Scan Dokumen:</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
                      <Upload size={14} /> Pilih File Gambar / Scan
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleScanFileUpload}
                      />
                    </label>
                    {incomingForm.scanFile && (
                      <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
                        ✓ Berkas scan siap diarsipkan
                      </span>
                    )}
                  </div>
                  <div className="form-group" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                    <input
                      type="url"
                      placeholder="Atau masukkan URL gambar hasil scan..."
                      className="form-control"
                      style={{ fontSize: '0.8rem' }}
                      value={incomingForm.scanFile}
                      onChange={(e) => setIncomingForm({ ...incomingForm, scanFile: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIncomingModal(false)}>Batal</button>
                <button type="submit" className="btn btn-primary">Simpan ke Arsip Surat Masuk</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL VIEW SCAN FILE PREVIEW */}
      {viewScanModal && (
        <div className="modal-backdrop" onClick={() => setViewScanModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px' }}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title" style={{ fontSize: '1.15rem' }}>
                  Berkas Scan Surat Masuk: {viewScanModal.letterNumber}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Pengirim: <strong>{viewScanModal.sender}</strong> ({viewScanModal.receivedDate})
                </span>
              </div>
              <button className="modal-close" onClick={() => setViewScanModal(null)}><X size={20} /></button>
            </div>

            <div className="modal-body" style={{ background: '#f1f5f9', textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ maxHeight: '550px', overflowY: 'auto', background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <img
                  src={viewScanModal.scanFile}
                  alt="Hasil Scan Surat"
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginTop: '1rem', textAlign: 'left', background: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid var(--light-border)' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#059669', margin: '0 0 0.5rem 0' }}>
                  📋 Lembar Disposisi Kepala Desa:
                </h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  • <strong>Diteruskan Kepada:</strong> {viewScanModal.dispositionTo}<br />
                  • <strong>Instruksi / Arahan:</strong> {viewScanModal.disposition || 'Tindaklanjuti sesuai prosedur.'}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setViewScanModal(null)}>Tutup Pratinjau</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
