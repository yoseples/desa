import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  FileSpreadsheet, 
  Printer, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  X,
  FileDown,
  Upload,
  UserCheck,
  TrendingDown,
  AlertTriangle,
  Building,
  HeartHandshake
} from 'lucide-react';
import AdminImportKKModal from './AdminImportKKModal';

export default function AdminCitizens({ 
  familiesList, 
  onAddFamily, 
  onUpdateFamily, 
  onDeleteFamily, 
  onAddMember, 
  onDeleteMember, 
  onBatchImport,
  profile 
}) {
  const [activeSubTab, setActiveSubTab] = useState('bps-classification'); // 'bps-classification', 'families-list', 'citizens-list'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEconomic, setFilterEconomic] = useState('Semua');
  const [filterRw, setFilterRw] = useState('Semua');

  // Modals
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [addFamilyModal, setAddFamilyModal] = useState(false);
  const [viewFamilyDetail, setViewFamilyDetail] = useState(null);
  const [addMemberModalKk, setAddMemberModalKk] = useState(null);
  const [editClassificationModal, setEditClassificationModal] = useState(null);

  // New Family Form State
  const [familyForm, setFamilyForm] = useState({
    noKk: '',
    headName: '',
    address: '',
    rt: '001',
    rw: '001',
    dusun: 'Dusun Pasirjati',
    postalCode: '40375',
    economicStatus: 'Desil 2 (Tidak Mampu)',
    bpjsStatus: 'Aktif (PBI Pemerintah)',
    houseOwnership: 'Milik Sendiri',
    electricity: '450 VA (Subsidi)',
    waterSource: 'Mata Air Pegunungan / Sumur Gali',
    sanitation: 'Jamban Sehat Pribadi',
    bansosTypes: ['PKH', 'BPNT', 'BLT Dana Desa'],
    issueDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  });

  // Edit Classification Form State
  const [classificationForm, setClassificationForm] = useState({
    economicStatus: 'Desil 1 (Sangat Tidak Mampu / Ekstrem)',
    bpjsStatus: 'Aktif (PBI Pemerintah)',
    houseOwnership: 'Milik Sendiri',
    electricity: '450 VA (Subsidi)',
    waterSource: 'Mata Air / Sumur',
    sanitation: 'Jamban Pribadi',
    bansosTypes: []
  });

  // New Citizen Member Form State
  const [memberForm, setMemberForm] = useState({
    nik: '',
    name: '',
    gender: 'Laki-Laki',
    birthPlace: '',
    birthDate: '',
    religion: 'Islam',
    education: 'SMA / Sederajat',
    occupation: 'Wiraswasta',
    maritalStatus: 'Kawin',
    relation: 'Kepala Keluarga',
    bloodType: 'O',
    fatherName: '',
    motherName: '',
    phone: ''
  });

  // BPS Socioeconomic Deciles & Status Definitions
  const bpsClassifications = [
    {
      id: 'Desil 1 (Sangat Tidak Mampu / Ekstrem)',
      name: 'Desil 1 (Sangat Tidak Mampu / Ekstrem)',
      label: 'Sangat Tidak Mampu / Miskin Ekstrem',
      badgeClass: 'badge-danger',
      color: '#dc2626',
      bg: '#fee2e2',
      desc: '10% kelompok rumah tangga dengan tingkat kesejahteraan terendah nasional (Prioritas PKH, BPNT, BLT-DD, BPJS PBI)',
      criteria: 'Pendapatan < Rp 600.000/bln/kapita, lantai tanah/bambu, tidak memiliki aset produktif, listrik 450VA bersubsidi'
    },
    {
      id: 'Desil 2 (Tidak Mampu)',
      name: 'Desil 2 (Tidak Mampu)',
      label: 'Tidak Mampu / Miskin',
      badgeClass: 'badge-warning',
      color: '#d97706',
      bg: '#fef3c7',
      desc: '10-20% kelompok rumah tangga miskin nasional (Penerima Program Sembako, KIP Kuliah/Sekolah)',
      criteria: 'Pendapatan Rp 600.000 - Rp 1.000.000/bln/kapita, pekerjaan serabutan/buruh tani, rumah semi permanen'
    },
    {
      id: 'Desil 3 (Kurang Mampu)',
      name: 'Desil 3 (Kurang Mampu)',
      label: 'Kurang Mampu / Hampir Miskin',
      badgeClass: 'badge-info',
      color: '#0284c7',
      bg: '#e0f2fe',
      desc: '20-30% kelompok rumah tangga rentan bergejolak (Prioritas subsidi pupuk, pelatihan UMKM padat karya)',
      criteria: 'Pendapatan Rp 1.000.000 - Rp 1.600.000/bln/kapita, rawan jatuh miskin jika terjadi gagal panen / inflasi'
    },
    {
      id: 'Desil 4 (Rentan Miskin)',
      name: 'Desil 4 (Rentan Miskin)',
      label: 'Rentan Miskin / Menengah Bawah',
      badgeClass: 'badge-neutral',
      color: '#475569',
      bg: '#f1f5f9',
      desc: '30-40% kelompok rumah tangga mendekati batas aman ekonomi',
      criteria: 'Pendapatan pas-pasan, memiliki rumah layak huni sederhana, tidak menerima bantuan reguler'
    },
    {
      id: 'Mampu (Sejahtera)',
      name: 'Mampu (Sejahtera)',
      label: 'Mampu / Menengah ke Atas',
      badgeClass: 'badge-success',
      color: '#16a34a',
      bg: '#dcfce7',
      desc: 'Kelompok masyarakat dengan kemandirian ekonomi mapan (Non-Bansos / Donatur Desa)',
      criteria: 'Memiliki usaha mandiri, pegawai tetap/PNS/BUMN, kendaraan roda 4/aset produktif, BPJS Mandiri'
    }
  ];

  // Helper matching function
  const matchBpsCategory = (familyStatus, targetId) => {
    if (!familyStatus) return targetId.includes('Mampu (Sejahtera)');
    const s = familyStatus.toLowerCase();
    if (targetId.includes('Desil 1') || targetId.includes('Sangat')) {
      return s.includes('desil 1') || s.includes('sangat') || s.includes('ekstrem');
    }
    if (targetId.includes('Desil 2') || targetId.includes('Tidak Mampu')) {
      return (s.includes('desil 2') || s.includes('tidak mampu') || s.includes('dtks') || s.includes('prasejahtera')) && !s.includes('sangat') && !s.includes('kurang');
    }
    if (targetId.includes('Desil 3') || targetId.includes('Kurang Mampu')) {
      return s.includes('desil 3') || s.includes('kurang mampu') || s.includes('hampir');
    }
    if (targetId.includes('Desil 4') || targetId.includes('Rentan')) {
      return s.includes('desil 4') || s.includes('rentan') || s.includes('menengah bawah');
    }
    if (targetId.includes('Mampu') || targetId.includes('Sejahtera')) {
      return s.includes('sejahtera') || s.includes('mampu') || s.includes('menengah') || s.includes('kaya');
    }
    return false;
  };

  // Flatten all citizens
  const allCitizens = [];
  familiesList.forEach((kk) => {
    if (kk.members && Array.isArray(kk.members)) {
      kk.members.forEach((m) => {
        allCitizens.push({
          ...m,
          noKk: kk.noKk,
          rt: kk.rt,
          rw: kk.rw,
          dusun: kk.dusun,
          economicStatus: kk.economicStatus || 'Menengah'
        });
      });
    }
  });

  // Calculate statistics per BPS Category
  const statsByBps = bpsClassifications.map(cat => {
    const families = familiesList.filter(f => matchBpsCategory(f.economicStatus, cat.id));
    const soulsCount = families.reduce((acc, f) => acc + (f.members ? f.members.length : 0), 0);
    const percentage = familiesList.length > 0 ? ((families.length / familiesList.length) * 100).toFixed(1) : 0;
    return {
      ...cat,
      kkCount: families.length,
      soulsCount,
      percentage
    };
  });

  // Filtered Families
  const filteredFamilies = familiesList.filter((kk) => {
    const matchesSearch = kk.noKk.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          kk.headName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (kk.address && kk.address.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesEconomic = filterEconomic === 'Semua' || matchBpsCategory(kk.economicStatus, filterEconomic);
    const matchesRw = filterRw === 'Semua' || kk.rw === filterRw || `RW ${kk.rw}` === filterRw;
    return matchesSearch && matchesEconomic && matchesRw;
  });

  // Filtered Citizens
  const filteredCitizens = allCitizens.filter((c) => {
    const matchesSearch = c.nik.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.noKk.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEconomic = filterEconomic === 'Semua' || matchBpsCategory(c.economicStatus, filterEconomic);
    return matchesSearch && matchesEconomic;
  });

  // Handlers
  const handleOpenEditClassification = (kk) => {
    setEditClassificationModal(kk);
    setClassificationForm({
      economicStatus: kk.economicStatus || 'Desil 2 (Tidak Mampu)',
      bpjsStatus: kk.bpjsStatus || 'Aktif (PBI Pemerintah)',
      houseOwnership: kk.houseOwnership || 'Milik Sendiri',
      electricity: kk.electricity || '450 VA (Subsidi)',
      waterSource: kk.waterSource || 'Mata Air / Sumur',
      sanitation: kk.sanitation || 'Jamban Pribadi',
      bansosTypes: kk.bansosTypes || ['PKH', 'BPNT']
    });
  };

  const handleSaveClassification = (e) => {
    e.preventDefault();
    if (!editClassificationModal) return;
    onUpdateFamily(editClassificationModal.id, classificationForm);
    setEditClassificationModal(null);
  };

  const handleAddFamilySubmit = (e) => {
    e.preventDefault();
    if (!familyForm.noKk || !familyForm.headName) {
      alert('Nomor KK dan Nama Kepala Keluarga wajib diisi!');
      return;
    }
    const newKk = {
      ...familyForm,
      members: [
        {
          id: `cit-${Date.now()}`,
          nik: `${familyForm.noKk.slice(0, 12)}0001`,
          name: familyForm.headName,
          gender: 'Laki-Laki',
          birthPlace: 'Bandung',
          birthDate: '01-01-1980',
          religion: 'Islam',
          education: 'SMA / Sederajat',
          occupation: 'Wiraswasta',
          maritalStatus: 'Kawin',
          relation: 'Kepala Keluarga',
          bloodType: 'O',
          fatherName: '-',
          motherName: '-',
          phone: '081234567890'
        }
      ]
    };
    onAddFamily(newKk);
    setAddFamilyModal(false);
  };

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (!memberForm.nik || !memberForm.name) {
      alert('NIK dan Nama Anggota wajib diisi!');
      return;
    }
    onAddMember(addMemberModalKk.id, memberForm);
    setAddMemberModalKk(null);
  };

  const exportBpsCsv = () => {
    const headers = ['No KK', 'Nama Kepala Keluarga', 'Alamat', 'RT', 'RW', 'Dusun', 'Klasifikasi BPS (DTKS)', 'Status BPJS', 'Daya Listrik', 'Status Rumah', 'Jumlah Jiwa'];
    const rows = filteredFamilies.map(f => [
      `"${f.noKk}"`,
      `"${f.headName}"`,
      `"${f.address}"`,
      `"${f.rt}"`,
      `"${f.rw}"`,
      `"${f.dusun}"`,
      `"${f.economicStatus}"`,
      `"${f.bpjsStatus || '-'}"`,
      `"${f.electricity || '-'}"`,
      `"${f.houseOwnership || '-'}"`,
      f.members ? f.members.length : 0
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Klasifikasi_Ekonomi_BPS_${profile?.name || 'Desa'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. TOP SUB-NAV & ACTIONS */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#ffffff',
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--light-border)',
        boxShadow: 'var(--shadow-sm)',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button
            className={`btn btn-sm ${activeSubTab === 'bps-classification' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveSubTab('bps-classification')}
          >
            <TrendingDown size={15} /> 📊 Klasifikasi Sosial Ekonomi BPS / DTKS
          </button>
          <button
            className={`btn btn-sm ${activeSubTab === 'families-list' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveSubTab('families-list')}
          >
            <Building size={15} /> Daftar Kartu Keluarga (KK) ({familiesList.length})
          </button>
          <button
            className={`btn btn-sm ${activeSubTab === 'citizens-list' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveSubTab('citizens-list')}
          >
            <Users size={15} /> Seluruh Warga ({allCitizens.length} Jiwa)
          </button>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={exportBpsCsv}
            title="Download Rekap CSV / Excel"
          >
            <FileDown size={14} /> Ekspor Data CSV
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setImportModalOpen(true)}
            style={{ color: '#059669', borderColor: '#86efac' }}
          >
            <Upload size={14} /> Import Data KK
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setFamilyForm({
                noKk: '',
                headName: '',
                address: '',
                rt: '001',
                rw: '001',
                dusun: 'Dusun Pasirjati',
                postalCode: '40375',
                economicStatus: 'Desil 2 (Tidak Mampu)',
                bpjsStatus: 'Aktif (PBI Pemerintah)',
                houseOwnership: 'Milik Sendiri',
                electricity: '450 VA (Subsidi)',
                waterSource: 'Mata Air Pegunungan / Sumur Gali',
                sanitation: 'Jamban Sehat Pribadi',
                bansosTypes: ['PKH', 'BPNT'],
                issueDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
              });
              setAddFamilyModal(true);
            }}
          >
            <Plus size={14} /> Tambah KK Baru
          </button>
        </div>
      </div>

      {/* 2. STATISTIK DISTRIBUSI STATUS EKONOMI BPS (5 DESIL) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '1rem' }}>
        {statsByBps.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setFilterEconomic(cat.id === filterEconomic ? 'Semua' : cat.id)}
            style={{
              background: '#ffffff',
              border: filterEconomic === cat.id ? `2px solid ${cat.color}` : '1px solid var(--light-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.15rem',
              boxShadow: filterEconomic === cat.id ? '0 10px 20px -5px rgba(0,0,0,0.1)' : 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'var(--transition)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: cat.color }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: cat.color, textTransform: 'uppercase' }}>
                {cat.label.split('/')[0]}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, background: cat.bg, color: cat.color, padding: '0.15rem 0.45rem', borderRadius: '999px' }}>
                {cat.percentage}%
              </span>
            </div>

            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)' }}>
              {cat.kkCount} <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>KK</span>
            </div>

            <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Populasi: <strong>{cat.soulsCount} Jiwa</strong>
            </div>
          </div>
        ))}
      </div>

      {/* 3. FILTER TOOLBAR */}
      <div style={{
        background: '#ffffff',
        padding: '1rem 1.25rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--light-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Cari Nomor KK, NIK, Nama Warga, atau Alamat..."
            className="form-control"
            style={{ paddingLeft: '2.4rem', height: '40px', fontSize: '0.875rem' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Klasifikasi BPS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Status BPS:</span>
          <select
            className="form-control"
            style={{ height: '40px', fontSize: '0.85rem', minWidth: '170px' }}
            value={filterEconomic}
            onChange={(e) => setFilterEconomic(e.target.value)}
          >
            <option value="Semua">Semua Klasifikasi ({familiesList.length} KK)</option>
            {bpsClassifications.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Filter RW */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Wilayah RW:</span>
          <select
            className="form-control"
            style={{ height: '40px', fontSize: '0.85rem', minWidth: '120px' }}
            value={filterRw}
            onChange={(e) => setFilterRw(e.target.value)}
          >
            <option value="Semua">Semua RW</option>
            {[...Array(10)].map((_, i) => {
              const rwNum = String(i + 1).padStart(2, '0');
              return <option key={rwNum} value={rwNum}>RW {rwNum}</option>;
            })}
          </select>
        </div>

        {filterEconomic !== 'Semua' && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setFilterEconomic('Semua')}
            style={{ height: '38px', fontSize: '0.75rem' }}
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* 4. MAIN DATA TABLE (BERDASARKAN TAB AKTIF) */}
      <div className="table-wrapper" style={{ padding: '1.25rem' }}>
        
        {/* VIEW 1: KLASIFIKASI SOSIAL EKONOMI BPS & DTKS */}
        {activeSubTab === 'bps-classification' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Data Penerima Manfaat & Status Kesejahteraan Warga (Standar BPS & DTKS)
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Menampilkan <strong>{filteredFamilies.length}</strong> Kartu Keluarga
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nomor KK & Kepala Keluarga</th>
                    <th>Alamat & RT/RW</th>
                    <th>Klasifikasi BPS / DTKS</th>
                    <th>Kondisi Rumah & Fasilitas</th>
                    <th>Jaminan Kesehatan (BPJS)</th>
                    <th>Anggota Jiwa</th>
                    <th style={{ textAlign: 'center' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFamilies.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                        Tidak ditemukan data keluarga dengan filter yang dipilih.
                      </td>
                    </tr>
                  ) : (
                    filteredFamilies.map((kk, idx) => (
                      <tr key={kk.id}>
                        <td style={{ fontWeight: 'bold' }}>{idx + 1}</td>
                        <td>
                          <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#064e3b', display: 'block' }}>
                            {kk.noKk}
                          </span>
                          <strong style={{ fontSize: '0.95rem' }}>{kk.headName}</strong>
                        </td>
                        <td>
                          <span style={{ display: 'block', fontSize: '0.85rem' }}>{kk.address}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            RT {kk.rt} / RW {kk.rw} • {kk.dusun}
                          </span>
                        </td>
                        <td>
                          <span 
                            className="badge"
                            style={{
                              background: kk.economicStatus?.includes('Desil 1') || kk.economicStatus?.includes('Sangat') ? '#fee2e2' :
                                         kk.economicStatus?.includes('Desil 2') || kk.economicStatus?.includes('Tidak Mampu') ? '#fef3c7' :
                                         kk.economicStatus?.includes('Desil 3') || kk.economicStatus?.includes('Kurang') ? '#e0f2fe' : '#dcfce7',
                              color: kk.economicStatus?.includes('Desil 1') || kk.economicStatus?.includes('Sangat') ? '#dc2626' :
                                     kk.economicStatus?.includes('Desil 2') || kk.economicStatus?.includes('Tidak Mampu') ? '#d97706' :
                                     kk.economicStatus?.includes('Desil 3') || kk.economicStatus?.includes('Kurang') ? '#0284c7' : '#16a34a',
                              fontWeight: 800,
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.6rem'
                            }}
                          >
                            {kk.economicStatus || 'Mampu (Sejahtera)'}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.775rem', color: '#475569' }}>
                          <div>• Rumah: <strong>{kk.houseOwnership || 'Milik Sendiri'}</strong></div>
                          <div>• Listrik: <strong>{kk.electricity || '450 VA'}</strong></div>
                        </td>
                        <td>
                          <span className={`badge ${kk.bpjsStatus?.includes('PBI') ? 'badge-info' : 'badge-neutral'}`} style={{ fontSize: '0.725rem' }}>
                            {kk.bpjsStatus || 'Aktif'}
                          </span>
                        </td>
                        <td style={{ fontWeight: 800, color: '#059669', textAlign: 'center' }}>
                          {kk.members ? kk.members.length : 0} Jiwa
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem' }}>
                            <button
                              className="btn btn-sm btn-primary"
                              style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}
                              onClick={() => handleOpenEditClassification(kk)}
                              title="Ubah Klasifikasi BPS & Bansos"
                            >
                              <Edit size={13} /> Update Status
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              style={{ fontSize: '0.75rem', padding: '0.25rem 0.45rem' }}
                              onClick={() => setViewFamilyDetail(kk)}
                              title="Lihat Detail Kartu Keluarga"
                            >
                              <Eye size={13} />
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
        )}

        {/* VIEW 2: DAFTAR LENGKAP KARTU KELUARGA (KK) */}
        {activeSubTab === 'families-list' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Data Registrasi Kartu Keluarga (KK)
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Total: <strong>{filteredFamilies.length}</strong> KK
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nomor Kartu Keluarga</th>
                    <th>Kepala Keluarga</th>
                    <th>Alamat Lengkap</th>
                    <th>RT / RW</th>
                    <th>Dusun</th>
                    <th>Status Ekonomi</th>
                    <th>Jumlah Jiwa</th>
                    <th style={{ textAlign: 'center' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFamilies.map((kk, idx) => (
                    <tr key={kk.id}>
                      <td style={{ fontWeight: 'bold' }}>{idx + 1}</td>
                      <td>
                        <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#064e3b' }}>
                          {kk.noKk}
                        </span>
                      </td>
                      <td><strong>{kk.headName}</strong></td>
                      <td>{kk.address}</td>
                      <td>RT {kk.rt} / RW {kk.rw}</td>
                      <td>{kk.dusun}</td>
                      <td>
                        <span className="badge badge-neutral" style={{ fontSize: '0.75rem' }}>
                          {kk.economicStatus}
                        </span>
                      </td>
                      <td style={{ fontWeight: 800, textAlign: 'center' }}>
                        {kk.members ? kk.members.length : 0}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem' }}>
                          <button
                            className="btn btn-sm btn-secondary"
                            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                            onClick={() => setViewFamilyDetail(kk)}
                          >
                            <Eye size={13} /> Format KK
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            style={{ padding: '0.25rem 0.45rem' }}
                            onClick={() => {
                              if (window.confirm(`Hapus data Kartu Keluarga No. ${kk.noKk}?`)) {
                                onDeleteFamily(kk.id);
                              }
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 3: DAFTAR SELURUH WARGA INDIVIDU (NIK) */}
        {activeSubTab === 'citizens-list' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Data Penduduk Individu (Berdasarkan NIK)
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Total: <strong>{filteredCitizens.length}</strong> Jiwa
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nomor Induk Kependudukan (NIK)</th>
                    <th>Nama Lengkap</th>
                    <th>Jenis Kelamin</th>
                    <th>Tempat, Tanggal Lahir</th>
                    <th>Hubungan Keluarga</th>
                    <th>Pekerjaan</th>
                    <th>Pendidikan</th>
                    <th>No. KK</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCitizens.map((cit, idx) => (
                    <tr key={cit.id || idx}>
                      <td style={{ fontWeight: 'bold' }}>{idx + 1}</td>
                      <td>
                        <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#064e3b' }}>
                          {cit.nik}
                        </span>
                      </td>
                      <td><strong>{cit.name}</strong></td>
                      <td>{cit.gender}</td>
                      <td>{cit.birthPlace}, {cit.birthDate}</td>
                      <td>
                        <span className="badge badge-info" style={{ fontSize: '0.725rem' }}>
                          {cit.relation}
                        </span>
                      </td>
                      <td>{cit.occupation}</td>
                      <td>{cit.education}</td>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{cit.noKk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: UPDATE KLASIFIKASI BPS / DTKS */}
      {editClassificationModal && (
        <div className="modal-backdrop" onClick={() => setEditClassificationModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title" style={{ fontSize: '1.15rem' }}>
                  Update Klasifikasi Kesejahteraan BPS / DTKS
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  No. KK: <strong>{editClassificationModal.noKk}</strong> - Kepala: {editClassificationModal.headName}
                </span>
              </div>
              <button className="modal-close" onClick={() => setEditClassificationModal(null)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveClassification}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Klasifikasi Status Sosial Ekonomi BPS / DTKS *</label>
                  <select
                    className="form-control"
                    value={classificationForm.economicStatus}
                    onChange={(e) => setClassificationForm({ ...classificationForm, economicStatus: e.target.value })}
                    style={{ fontWeight: 800, color: '#064e3b' }}
                  >
                    {bpsClassifications.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                    {bpsClassifications.find(c => c.name === classificationForm.economicStatus)?.desc}
                  </span>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Status Kepemilikan Rumah</label>
                    <select
                      className="form-control"
                      value={classificationForm.houseOwnership}
                      onChange={(e) => setClassificationForm({ ...classificationForm, houseOwnership: e.target.value })}
                    >
                      <option value="Milik Sendiri">Milik Sendiri</option>
                      <option value="Sewa / Kontrak">Sewa / Kontrak</option>
                      <option value="Menumpang / Rumah Keluarga">Menumpang / Rumah Keluarga</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Daya Listrik Terpasang</label>
                    <select
                      className="form-control"
                      value={classificationForm.electricity}
                      onChange={(e) => setClassificationForm({ ...classificationForm, electricity: e.target.value })}
                    >
                      <option value="450 VA (Subsidi)">450 VA (Subsidi Pemerintah)</option>
                      <option value="900 VA (Subsidi/Non)">900 VA</option>
                      <option value="1300 VA (Non Subsidi)">1300 VA (Non Subsidi)</option>
                      <option value="2200 VA+">2200 VA ke atas</option>
                      <option value="Tidak Berlistrik / Numpang">Tidak Berlistrik / Numpang Tetangga</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Jaminan Kesehatan (BPJS / KIS)</label>
                    <select
                      className="form-control"
                      value={classificationForm.bpjsStatus}
                      onChange={(e) => setClassificationForm({ ...classificationForm, bpjsStatus: e.target.value })}
                    >
                      <option value="Aktif (PBI Pemerintah / KIS)">Aktif (PBI Pemerintah / KIS)</option>
                      <option value="Aktif (Mandiri Kelas 1/2/3)">Aktif (Mandiri Kelas 1/2/3)</option>
                      <option value="Aktif (Pekerja / Perusahaan)">Aktif (Pekerja / Perusahaan)</option>
                      <option value="Belum Memiliki BPJS">Belum Memiliki BPJS</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fasilitas Sanitasi / Jamban</label>
                    <select
                      className="form-control"
                      value={classificationForm.sanitation}
                      onChange={(e) => setClassificationForm({ ...classificationForm, sanitation: e.target.value })}
                    >
                      <option value="Jamban Sehat Pribadi (Septic Tank)">Jamban Sehat Pribadi (Septic Tank)</option>
                      <option value="MCK Umum / Bersama">MCK Umum / Bersama</option>
                      <option value="Non-Jamban">Non-Jamban</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditClassificationModal(null)}>Batal</button>
                <button type="submit" className="btn btn-primary">Simpan Klasifikasi BPS</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DETAIL KARTU KELUARGA (FORMAT DISDUKCAPIL) */}
      {viewFamilyDetail && (
        <div className="modal-backdrop" onClick={() => setViewFamilyDetail(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '920px', width: '96%' }}>
            <div className="modal-header hide-on-print">
              <div>
                <h3 className="modal-title">Format Resmi Kartu Keluarga Republik Indonesia</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nomor KK: <strong>{viewFamilyDetail.noKk}</strong></span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button className="btn btn-primary btn-sm" onClick={() => window.print()}>
                  <Printer size={15} /> Cetak KK
                </button>
                <button className="modal-close" onClick={() => setViewFamilyDetail(null)}><X size={20} /></button>
              </div>
            </div>

            <div className="modal-body" style={{ background: '#f8fafc', padding: '1.5rem', overflowY: 'auto' }}>
              <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', color: '#000', fontFamily: 'Arial, sans-serif' }}>
                
                {/* Header KK */}
                <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
                  <h2 style={{ fontSize: '16pt', fontWeight: 'bold', margin: 0, letterSpacing: '1px' }}>KARTU KELUARGA</h2>
                  <h3 style={{ fontSize: '13pt', fontWeight: 'bold', margin: '4px 0 0 0', letterSpacing: '2px' }}>No. {viewFamilyDetail.noKk}</h3>
                </div>

                {/* Atribut Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', fontSize: '9pt', marginBottom: '1rem' }}>
                  <div>
                    <div><strong>Nama Kepala Keluarga:</strong> {viewFamilyDetail.headName}</div>
                    <div><strong>Alamat:</strong> {viewFamilyDetail.address}</div>
                    <div><strong>RT / RW:</strong> {viewFamilyDetail.rt} / {viewFamilyDetail.rw}</div>
                    <div><strong>Desa / Kelurahan:</strong> Sukamaju Mandiri</div>
                  </div>
                  <div>
                    <div><strong>Kecamatan:</strong> Harapan Makmur</div>
                    <div><strong>Kabupaten / Kota:</strong> Kabupaten Nusantara</div>
                    <div><strong>Kode Pos:</strong> {viewFamilyDetail.postalCode || '40375'}</div>
                    <div><strong>Provinsi:</strong> Jawa Barat</div>
                  </div>
                </div>

                {/* TABEL I: ANGGOTA KELUARGA */}
                <h4 style={{ fontSize: '9.5pt', fontWeight: 'bold', margin: '1rem 0 0.4rem 0' }}>I. DATA ANGGOTA KELUARGA</h4>
                <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8.5pt', border: '1px solid #000' }}>
                    <thead>
                      <tr style={{ background: '#e2e8f0', textAlign: 'center' }}>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>No</th>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>Nama Lengkap</th>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>NIK</th>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>Jenis Kelamin</th>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>Tempat Lahir</th>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>Tanggal Lahir</th>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>Agama</th>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>Pendidikan</th>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>Jenis Pekerjaan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewFamilyDetail.members?.map((m, mIdx) => (
                        <tr key={m.id || mIdx}>
                          <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>{mIdx + 1}</td>
                          <td style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold' }}>{m.name}</td>
                          <td style={{ border: '1px solid #000', padding: '4px', fontFamily: 'monospace' }}>{m.nik}</td>
                          <td style={{ border: '1px solid #000', padding: '4px' }}>{m.gender}</td>
                          <td style={{ border: '1px solid #000', padding: '4px' }}>{m.birthPlace}</td>
                          <td style={{ border: '1px solid #000', padding: '4px' }}>{m.birthDate}</td>
                          <td style={{ border: '1px solid #000', padding: '4px' }}>{m.religion}</td>
                          <td style={{ border: '1px solid #000', padding: '4px' }}>{m.education}</td>
                          <td style={{ border: '1px solid #000', padding: '4px' }}>{m.occupation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* TABEL II: STATUS HUBUNGAN & ORANG TUA */}
                <h4 style={{ fontSize: '9.5pt', fontWeight: 'bold', margin: '1rem 0 0.4rem 0' }}>II. STATUS PERKAWINAN & HUBUNGAN DALAM KELUARGA</h4>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8.5pt', border: '1px solid #000' }}>
                    <thead>
                      <tr style={{ background: '#e2e8f0', textAlign: 'center' }}>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>No</th>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>Status Perkawinan</th>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>Status Hubungan</th>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>Gol. Darah</th>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>Nama Ayah</th>
                        <th style={{ border: '1px solid #000', padding: '4px' }}>Nama Ibu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewFamilyDetail.members?.map((m, mIdx) => (
                        <tr key={m.id || mIdx}>
                          <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>{mIdx + 1}</td>
                          <td style={{ border: '1px solid #000', padding: '4px' }}>{m.maritalStatus}</td>
                          <td style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold' }}>{m.relation}</td>
                          <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>{m.bloodType || 'O'}</td>
                          <td style={{ border: '1px solid #000', padding: '4px' }}>{m.fatherName || '-'}</td>
                          <td style={{ border: '1px solid #000', padding: '4px' }}>{m.motherName || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary hide-on-print"
                    onClick={() => {
                      setAddMemberModalKk(viewFamilyDetail);
                    }}
                  >
                    <Plus size={14} /> Tambah Anggota Keluarga Baru
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: TAMBAH KK BARU */}
      {addFamilyModal && (
        <div className="modal-backdrop" onClick={() => setAddFamilyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Tambah Data Kartu Keluarga Baru</h3>
              <button className="modal-close" onClick={() => setAddFamilyModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleAddFamilySubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nomor Kartu Keluarga (16 Digit) *</label>
                    <input
                      type="text"
                      required
                      placeholder="320415..."
                      className="form-control"
                      value={familyForm.noKk}
                      onChange={(e) => setFamilyForm({ ...familyForm, noKk: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nama Kepala Keluarga *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama lengkap..."
                      className="form-control"
                      value={familyForm.headName}
                      onChange={(e) => setFamilyForm({ ...familyForm, headName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Alamat Rumah *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kp. Pasir Salam No. 14"
                    className="form-control"
                    value={familyForm.address}
                    onChange={(e) => setFamilyForm({ ...familyForm, address: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">RT</label>
                    <input
                      type="text"
                      className="form-control"
                      value={familyForm.rt}
                      onChange={(e) => setFamilyForm({ ...familyForm, rt: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">RW</label>
                    <input
                      type="text"
                      className="form-control"
                      value={familyForm.rw}
                      onChange={(e) => setFamilyForm({ ...familyForm, rw: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Dusun</label>
                    <input
                      type="text"
                      className="form-control"
                      value={familyForm.dusun}
                      onChange={(e) => setFamilyForm({ ...familyForm, dusun: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Klasifikasi Status Ekonomi BPS *</label>
                  <select
                    className="form-control"
                    value={familyForm.economicStatus}
                    onChange={(e) => setFamilyForm({ ...familyForm, economicStatus: e.target.value })}
                  >
                    {bpsClassifications.map(c => (
                      <option key={c.id} value={c.name}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setAddFamilyModal(false)}>Batal</button>
                <button type="submit" className="btn btn-primary">Simpan Kartu Keluarga</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: TAMBAH ANGGOTA KELUARGA BARU */}
      {addMemberModalKk && (
        <div className="modal-backdrop" onClick={() => setAddMemberModalKk(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Tambah Anggota ke KK: {addMemberModalKk.noKk}</h3>
              <button className="modal-close" onClick={() => setAddMemberModalKk(null)}><X size={20} /></button>
            </div>

            <form onSubmit={handleAddMemberSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">NIK (16 Digit) *</label>
                    <input
                      type="text"
                      required
                      placeholder="320415..."
                      className="form-control"
                      value={memberForm.nik}
                      onChange={(e) => setMemberForm({ ...memberForm, nik: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={memberForm.name}
                      onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Jenis Kelamin</label>
                    <select
                      className="form-control"
                      value={memberForm.gender}
                      onChange={(e) => setMemberForm({ ...memberForm, gender: e.target.value })}
                    >
                      <option value="Laki-Laki">Laki-Laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hubungan dalam Keluarga</label>
                    <select
                      className="form-control"
                      value={memberForm.relation}
                      onChange={(e) => setMemberForm({ ...memberForm, relation: e.target.value })}
                    >
                      <option value="Istri">Istri</option>
                      <option value="Anak">Anak</option>
                      <option value="Orang Tua">Orang Tua</option>
                      <option value="Mertua">Mertua</option>
                      <option value="Famili Lain">Famili Lain</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Tempat Lahir</label>
                    <input
                      type="text"
                      className="form-control"
                      value={memberForm.birthPlace}
                      onChange={(e) => setMemberForm({ ...memberForm, birthPlace: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tanggal Lahir (DD-MM-YYYY)</label>
                    <input
                      type="text"
                      placeholder="15-08-2005"
                      className="form-control"
                      value={memberForm.birthDate}
                      onChange={(e) => setMemberForm({ ...memberForm, birthDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Pendidikan Terakhir</label>
                    <input
                      type="text"
                      className="form-control"
                      value={memberForm.education}
                      onChange={(e) => setMemberForm({ ...memberForm, education: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pekerjaan</label>
                    <input
                      type="text"
                      className="form-control"
                      value={memberForm.occupation}
                      onChange={(e) => setMemberForm({ ...memberForm, occupation: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setAddMemberModalKk(null)}>Batal</button>
                <button type="submit" className="btn btn-primary">Simpan Anggota</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: IMPORT KK (CSV & JSON) */}
      <AdminImportKKModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onImportSuccess={onBatchImport}
      />

    </div>
  );
}
