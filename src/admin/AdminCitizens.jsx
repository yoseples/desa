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
  HeartHandshake,
  MapPin,
  RotateCcw,
  Sparkles,
  Home,
  UserX
} from 'lucide-react';
import AdminImportKKModal from './AdminImportKKModal';

// Master Struktur Wilayah Administrasi Desa: 3 Dusun, 10 RW, 20 RT
export const villageTerritoryStructure = [
  {
    dusunName: "Dusun 1 (Pasirjati)",
    dusunShort: "Dusun Pasirjati",
    description: "Kawasan agraris terpadu & permukiman lereng timur",
    rws: [
      {
        rw: "001",
        rwName: "RW 01 (Pasirjati Timur)",
        chief: "Bpk. H. Sutisna",
        rts: [
          { rt: "001", rtName: "RT 01 / RW 01", chief: "Bpk. Mamat" },
          { rt: "002", rtName: "RT 02 / RW 01", chief: "Bpk. Rohman" }
        ]
      },
      {
        rw: "002",
        rwName: "RW 02 (Pasir Salam)",
        chief: "Bpk. Cecep Hidayat",
        rts: [
          { rt: "003", rtName: "RT 03 / RW 02", chief: "Bpk. Ujang" },
          { rt: "004", rtName: "RT 04 / RW 02", chief: "Bpk. Hendra" }
        ]
      },
      {
        rw: "003",
        rwName: "RW 03 (Pasir Luhur)",
        chief: "Bpk. Dudung Suherman",
        rts: [
          { rt: "005", rtName: "RT 05 / RW 03", chief: "Bpk. Agus" },
          { rt: "006", rtName: "RT 06 / RW 03", chief: "Bpk. Sobari" }
        ]
      }
    ]
  },
  {
    dusunName: "Dusun 2 (Sukamukti)",
    dusunShort: "Dusun Sukamukti",
    description: "Pusat UMKM pengolahan susu, peternakan & perdagangan",
    rws: [
      {
        rw: "04",
        rwName: "RW 04 (Sukamukti Tengah)",
        chief: "Bpk. Nanang Koswara",
        rts: [
          { rt: "007", rtName: "RT 07 / RW 04", chief: "Bpk. Tatang" },
          { rt: "008", rtName: "RT 08 / RW 04", chief: "Bpk. Dayat" }
        ]
      },
      {
        rw: "05",
        rwName: "RW 05 (Sukaluyu)",
        chief: "Bpk. Eko Prasetyo",
        rts: [
          { rt: "009", rtName: "RT 09 / RW 05", chief: "Bpk. Rudi" },
          { rt: "010", rtName: "RT 10 / RW 05", chief: "Bpk. Asep" }
        ]
      },
      {
        rw: "06",
        rwName: "RW 06 (Sukasari)",
        chief: "Bpk. Iwan Setiawan",
        rts: [
          { rt: "011", rtName: "RT 11 / RW 06", chief: "Bpk. Deden" },
          { rt: "012", rtName: "RT 12 / RW 06", chief: "Bpk. Juhana" }
        ]
      }
    ]
  },
  {
    dusunName: "Dusun 3 (Mekarwangi)",
    dusunShort: "Dusun Mekarwangi",
    description: "Kawasan agrowisata kopi, perkebunan teh & kerajinan anyaman",
    rws: [
      {
        rw: "07",
        rwName: "RW 07 (Mekar Jaya)",
        chief: "Bpk. Ujang Saepudin",
        rts: [
          { rt: "013", rtName: "RT 13 / RW 07", chief: "Bpk. Wawan" },
          { rt: "014", rtName: "RT 14 / RW 07", chief: "Bpk. Mulyadi" }
        ]
      },
      {
        rw: "08",
        rwName: "RW 08 (Mekar Bakti)",
        chief: "Bpk. Jajang Nurjaman",
        rts: [
          { rt: "015", rtName: "RT 15 / RW 08", chief: "Bpk. Endang" },
          { rt: "016", rtName: "RT 16 / RW 08", chief: "Bpk. Ade" }
        ]
      },
      {
        rw: "09",
        rwName: "RW 09 (Mekar Asih)",
        chief: "Bpk. Supardi",
        rts: [
          { rt: "017", rtName: "RT 17 / RW 09", chief: "Bpk. Gunawan" },
          { rt: "018", rtName: "RT 18 / RW 09", chief: "Bpk. Sugeng" }
        ]
      },
      {
        rw: "10",
        rwName: "RW 10 (Mekar Wangi)",
        chief: "Bpk. Rohmat Hidayat",
        rts: [
          { rt: "019", rtName: "RT 19 / RW 10", chief: "Bpk. Dedi" },
          { rt: "020", rtName: "RT 20 / RW 10", chief: "Bpk. Anwar" }
        ]
      }
    ]
  }
];

export default function AdminCitizens({ 
  familiesList = [], 
  onAddFamily, 
  onUpdateFamily, 
  onDeleteFamily, 
  onAddMember, 
  onDeleteMember, 
  onBatchImport,
  onBulkDeleteFamilies,
  onResetSampleFamilies,
  profile 
}) {
  const [activeSubTab, setActiveSubTab] = useState('citizens-list'); // 'citizens-list', 'families-list', 'area-classification', 'bps-classification'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEconomic, setFilterEconomic] = useState('Semua');
  const [filterDusun, setFilterDusun] = useState('Semua');
  const [filterRw, setFilterRw] = useState('Semua');
  const [filterRt, setFilterRt] = useState('Semua');

  // Modals
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [addFamilyModal, setAddFamilyModal] = useState(false);
  const [viewFamilyDetail, setViewFamilyDetail] = useState(null);
  const [addMemberModalKk, setAddMemberModalKk] = useState(null);
  const [editClassificationModal, setEditClassificationModal] = useState(null);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);

  // Bulk Delete Filter Target
  const [bulkDeleteTarget, setBulkDeleteTarget] = useState({
    dusun: 'Semua',
    rw: 'Semua',
    rt: 'Semua'
  });

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

  // Helper matching function for RT / RW normalization
  const normalizeArea = (val) => {
    if (!val) return '';
    const num = String(val).replace(/\D/g, '');
    if (!num) return String(val).trim().toLowerCase();
    return String(parseInt(num, 10));
  };

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
          kkId: kk.id,
          noKk: kk.noKk,
          rt: kk.rt,
          rw: kk.rw,
          dusun: kk.dusun,
          address: kk.address,
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

  // RT & RW Stats Calculator
  const getRtStats = (rwNum, rtNum) => {
    const normRw = normalizeArea(rwNum);
    const normRt = normalizeArea(rtNum);

    const matchedFamilies = familiesList.filter(f => 
      normalizeArea(f.rw) === normRw && normalizeArea(f.rt) === normRt
    );

    const kkCount = matchedFamilies.length;
    let totalSouls = 0;
    let maleCount = 0;
    let femaleCount = 0;
    let dtksCount = 0;

    matchedFamilies.forEach(f => {
      if (f.economicStatus && (f.economicStatus.toLowerCase().includes('desil 1') || f.economicStatus.toLowerCase().includes('desil 2') || f.economicStatus.toLowerCase().includes('tidak mampu'))) {
        dtksCount++;
      }
      if (f.members && Array.isArray(f.members)) {
        totalSouls += f.members.length;
        f.members.forEach(m => {
          if (m.gender === 'Laki-Laki') maleCount++;
          else if (m.gender === 'Perempuan') femaleCount++;
        });
      }
    });

    return {
      kkCount,
      totalSouls,
      maleCount,
      femaleCount,
      dtksCount,
      families: matchedFamilies
    };
  };

  const getRwStats = (rwNum) => {
    const normRw = normalizeArea(rwNum);
    const matchedFamilies = familiesList.filter(f => normalizeArea(f.rw) === normRw);
    const kkCount = matchedFamilies.length;
    let totalSouls = 0;
    let dtksCount = 0;
    matchedFamilies.forEach(f => {
      if (f.economicStatus && (f.economicStatus.toLowerCase().includes('desil 1') || f.economicStatus.toLowerCase().includes('desil 2') || f.economicStatus.toLowerCase().includes('tidak mampu'))) {
        dtksCount++;
      }
      if (f.members && Array.isArray(f.members)) {
        totalSouls += f.members.length;
      }
    });
    return { kkCount, totalSouls, dtksCount };
  };

  const getDusunStats = (dusunName) => {
    const matchedFamilies = familiesList.filter(f => 
      f.dusun?.toLowerCase().includes(dusunName.toLowerCase()) || dusunName.toLowerCase().includes(f.dusun?.toLowerCase())
    );
    const kkCount = matchedFamilies.length;
    let totalSouls = 0;
    matchedFamilies.forEach(f => {
      if (f.members && Array.isArray(f.members)) {
        totalSouls += f.members.length;
      }
    });
    return { kkCount, totalSouls };
  };

  // Filtered Families for Lists
  const filteredFamilies = familiesList.filter((kk) => {
    const matchesSearch = kk.noKk.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          kk.headName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (kk.address && kk.address.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesEconomic = filterEconomic === 'Semua' || matchBpsCategory(kk.economicStatus, filterEconomic);
    const matchesDusun = filterDusun === 'Semua' || kk.dusun?.toLowerCase().includes(filterDusun.toLowerCase());
    const matchesRw = filterRw === 'Semua' || normalizeArea(kk.rw) === normalizeArea(filterRw);
    const matchesRt = filterRt === 'Semua' || normalizeArea(kk.rt) === normalizeArea(filterRt);
    return matchesSearch && matchesEconomic && matchesDusun && matchesRw && matchesRt;
  });

  // Filtered Citizens for Lists
  const filteredCitizens = allCitizens.filter((c) => {
    const matchesSearch = c.nik.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.noKk.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.occupation && c.occupation.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesEconomic = filterEconomic === 'Semua' || matchBpsCategory(c.economicStatus, filterEconomic);
    const matchesDusun = filterDusun === 'Semua' || c.dusun?.toLowerCase().includes(filterDusun.toLowerCase());
    const matchesRw = filterRw === 'Semua' || normalizeArea(c.rw) === normalizeArea(filterRw);
    const matchesRt = filterRt === 'Semua' || normalizeArea(c.rt) === normalizeArea(filterRt);
    return matchesSearch && matchesEconomic && matchesDusun && matchesRw && matchesRt;
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

  // Bulk Delete Live Calculation
  const getMatchingForDeletion = () => {
    return familiesList.filter(kk => {
      const matchDusun = !bulkDeleteTarget.dusun || bulkDeleteTarget.dusun === 'Semua' || kk.dusun?.toLowerCase().includes(bulkDeleteTarget.dusun.toLowerCase());
      const matchRw = !bulkDeleteTarget.rw || bulkDeleteTarget.rw === 'Semua' || normalizeArea(kk.rw) === normalizeArea(bulkDeleteTarget.rw);
      const matchRt = !bulkDeleteTarget.rt || bulkDeleteTarget.rt === 'Semua' || normalizeArea(kk.rt) === normalizeArea(bulkDeleteTarget.rt);
      return matchDusun && matchRw && matchRt;
    });
  };

  const matchingDeleteList = getMatchingForDeletion();
  const matchingDeleteSouls = matchingDeleteList.reduce((acc, f) => acc + (f.members ? f.members.length : 0), 0);

  const handleConfirmBulkDelete = () => {
    if (matchingDeleteList.length === 0) {
      alert('Tidak ada data Kartu Keluarga / Warga yang cocok dengan filter penghapusan.');
      return;
    }
    if (window.confirm(`PERINGATAN: Anda yakin ingin MENGHAPUS SEMUA ${matchingDeleteList.length} Kartu Keluarga (${matchingDeleteSouls} Jiwa) pada wilayah tersebut? Tindakan ini tidak dapat dibatalkan!`)) {
      if (onBulkDeleteFamilies) {
        onBulkDeleteFamilies(bulkDeleteTarget);
      }
      setBulkDeleteModalOpen(false);
    }
  };

  const handleTriggerResetSample = () => {
    if (window.confirm('Muat ulang seluruh contoh data warga lengkap untuk 10 RW & 20 RT (3 Dusun)? Data saat ini akan digantikan dengan master contoh data lengkap.')) {
      if (onResetSampleFamilies) {
        onResetSampleFamilies();
      }
    }
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
    link.setAttribute('download', `Rekap_Warga_RTRW_${profile?.name || 'Desa'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. TOP SUB-NAV & ACTION TOOLBAR */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        background: 'var(--light-surface)',
        padding: '1rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--light-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Row 1: Sub-Tabs Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <button
              className={`btn btn-sm ${activeSubTab === 'citizens-list' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveSubTab('citizens-list')}
              style={{ fontWeight: 700 }}
            >
              <Users size={14} /> Data Warga ({allCitizens.length})
            </button>
            <button
              className={`btn btn-sm ${activeSubTab === 'families-list' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveSubTab('families-list')}
              style={{ fontWeight: 700 }}
            >
              <Building size={14} /> Kartu Keluarga ({familiesList.length})
            </button>
            <button
              className={`btn btn-sm ${activeSubTab === 'area-classification' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveSubTab('area-classification')}
              style={{ fontWeight: 700 }}
            >
              <MapPin size={14} /> Wilayah (RT/RW)
            </button>
            <button
              className={`btn btn-sm ${activeSubTab === 'bps-classification' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveSubTab('bps-classification')}
              style={{ fontWeight: 700 }}
            >
              <TrendingDown size={14} /> Status Sosial (BPS)
            </button>
          </div>

          {/* Primary Action Button */}
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
            style={{ fontWeight: 700, padding: '0.45rem 0.9rem' }}
          >
            <Plus size={15} /> Tambah KK Baru
          </button>
        </div>

        {/* Row 2: Secondary Quick Actions & Data Management Tools */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--light-border)',
          flexWrap: 'wrap',
          gap: '0.5rem',
          fontSize: '0.8rem'
        }}>
          <span style={{ color: 'var(--text-muted)' }}>
            Manajemen Data: <strong style={{ color: 'var(--text-main)' }}>{familiesList.length} KK</strong> • <strong style={{ color: 'var(--primary)' }}>{allCitizens.length} Jiwa</strong> di 3 Dusun, 10 RW, 20 RT
          </span>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setImportModalOpen(true)}
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
              title="Import Data dari file Excel atau CSV"
            >
              <Upload size={13} /> Impor KK
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={exportBpsCsv}
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
              title="Download Data Kependudukan Format CSV / Excel"
            >
              <FileDown size={13} /> Ekspor CSV
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleTriggerResetSample}
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', color: '#059669', borderColor: '#a7f3d0' }}
              title="Muat Ulang Contoh Data Lengkap 20 RT & 10 RW"
            >
              <RotateCcw size={13} /> Muat Contoh Data
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setBulkDeleteTarget({ dusun: 'Semua', rw: 'Semua', rt: 'Semua' });
                setBulkDeleteModalOpen(true);
              }}
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', color: '#dc2626', borderColor: '#fca5a5' }}
              title="Hapus massal data per RT / RW tertentu"
            >
              <UserX size={13} /> Hapus per RT/RW
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SUBTAB 1: KLASIFIKASI WILAYAH BERDASARKAN 3 DUSUN, 10 RW, 20 RT
          ========================================================================= */}
      {activeSubTab === 'area-classification' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Territory Summary Hero Card */}
          <div style={{
            background: 'linear-gradient(135deg, #064e3b, #0f172a)',
            color: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#6ee7b7' }}>
                  Struktur Teritorial Desa
                </span>
                <span style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>
                  Total 3 Dusun • 10 RW • 20 RT
                </span>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                Klasifikasi Kependudukan Berdasarkan RT & RW
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#cbd5e1', margin: '0.35rem 0 0 0', maxWidth: '680px' }}>
                Pantau sebaran Kartu Keluarga, total jiwa penduduk, perbandingan gender, dan penerima DTKS secara presisi di setiap rukun tetangga.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div 
                onClick={() => {
                  setFilterDusun('Semua');
                  setFilterRw('Semua');
                  setFilterRt('Semua');
                  setFilterEconomic('Semua');
                  setActiveSubTab('families-list');
                }}
                style={{ background: 'rgba(255,255,255,0.12)', padding: '0.65rem 1rem', borderRadius: '10px', textAlign: 'center', minWidth: '95px', cursor: 'pointer', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.15)' }}
                title="Klik untuk membuka daftar seluruh Kartu Keluarga"
              >
                <span style={{ fontSize: '0.725rem', color: '#a7f3d0', display: 'block', fontWeight: 600 }}>Total KK ↗</span>
                <strong style={{ fontSize: '1.4rem', color: '#ffffff' }}>{familiesList.length}</strong>
              </div>
              <div 
                onClick={() => {
                  setFilterDusun('Semua');
                  setFilterRw('Semua');
                  setFilterRt('Semua');
                  setFilterEconomic('Semua');
                  setActiveSubTab('citizens-list');
                }}
                style={{ background: 'rgba(255,255,255,0.12)', padding: '0.65rem 1rem', borderRadius: '10px', textAlign: 'center', minWidth: '95px', cursor: 'pointer', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.15)' }}
                title="Klik untuk membuka daftar seluruh Jiwa Warga"
              >
                <span style={{ fontSize: '0.725rem', color: '#a7f3d0', display: 'block', fontWeight: 600 }}>Total Jiwa ↗</span>
                <strong style={{ fontSize: '1.4rem', color: '#ffffff' }}>{allCitizens.length}</strong>
              </div>
            </div>
          </div>

          {/* Iteration Over 3 Dusun */}
          {villageTerritoryStructure.map((dusun, dIdx) => {
            const dStats = getDusunStats(dusun.dusunShort);
            return (
              <div 
                key={dIdx}
                style={{
                  background: 'var(--light-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--light-border)',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-card)'
                }}
              >
                {/* Dusun Header Bar */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '1rem',
                  marginBottom: '1.25rem',
                  borderBottom: '1px solid var(--light-border)',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                        Dusun {dIdx + 1}
                      </span>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                        {dusun.dusunName}
                      </h3>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {dusun.description}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button
                        onClick={() => {
                          setFilterDusun(dusun.dusunShort);
                          setFilterRw('Semua');
                          setFilterRt('Semua');
                          setActiveSubTab('families-list');
                        }}
                        className="badge badge-neutral"
                        style={{ cursor: 'pointer', border: '1px solid var(--light-border)', padding: '0.35rem 0.6rem', fontSize: '0.775rem' }}
                        title={`Klik untuk melihat ${dStats.kkCount} Kartu Keluarga di ${dusun.dusunName}`}
                      >
                        📂 <strong>{dStats.kkCount} KK</strong> ↗
                      </button>
                      <button
                        onClick={() => {
                          setFilterDusun(dusun.dusunShort);
                          setFilterRw('Semua');
                          setFilterRt('Semua');
                          setActiveSubTab('citizens-list');
                        }}
                        className="badge badge-neutral"
                        style={{ cursor: 'pointer', border: '1px solid var(--light-border)', padding: '0.35rem 0.6rem', fontSize: '0.775rem' }}
                        title={`Klik untuk melihat ${dStats.totalSouls} Jiwa di ${dusun.dusunName}`}
                      >
                        👥 <strong>{dStats.totalSouls} Jiwa</strong> ↗
                      </button>
                    </div>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setBulkDeleteTarget({ dusun: dusun.dusunShort, rw: 'Semua', rt: 'Semua' });
                        setBulkDeleteModalOpen(true);
                      }}
                      style={{ color: '#dc2626', borderColor: '#fca5a5', fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                      title={`Hapus seluruh KK di ${dusun.dusunName}`}
                    >
                      <Trash2 size={12} /> Hapus Dusun
                    </button>
                  </div>
                </div>

                {/* RW Blocks within Dusun */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {dusun.rws.map((rwObj) => {
                    const rwStats = getRwStats(rwObj.rw);
                    return (
                      <div
                        key={rwObj.rw}
                        style={{
                          background: 'var(--light-bg)',
                          borderRadius: 'var(--radius-lg)',
                          padding: '1.15rem',
                          border: '1px solid var(--light-border)'
                        }}
                      >
                        {/* RW Header Row */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '1rem',
                          flexWrap: 'wrap',
                          gap: '0.5rem'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <span style={{
                              background: 'var(--primary)',
                              color: '#ffffff',
                              fontWeight: 900,
                              fontSize: '0.85rem',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '6px'
                            }}>
                              RW {rwObj.rw}
                            </span>
                            <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>
                              {rwObj.rwName}
                            </strong>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              (Ketua: {rwObj.chief})
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button
                              onClick={() => {
                                setFilterDusun(dusun.dusunShort);
                                setFilterRw(rwObj.rw);
                                setFilterRt('Semua');
                                setActiveSubTab('families-list');
                              }}
                              className="btn btn-secondary btn-sm"
                              style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem', height: '28px', color: 'var(--text-main)' }}
                              title={`Buka ${rwStats.kkCount} Kartu Keluarga di RW ${rwObj.rw}`}
                            >
                              📂 <strong>{rwStats.kkCount} KK</strong> ↗
                            </button>
                            <button
                              onClick={() => {
                                setFilterDusun(dusun.dusunShort);
                                setFilterRw(rwObj.rw);
                                setFilterRt('Semua');
                                setActiveSubTab('citizens-list');
                              }}
                              className="btn btn-secondary btn-sm"
                              style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem', height: '28px', color: 'var(--primary)' }}
                              title={`Buka ${rwStats.totalSouls} Jiwa Warga di RW ${rwObj.rw}`}
                            >
                              👥 <strong>{rwStats.totalSouls} Jiwa</strong> ↗
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => {
                                setBulkDeleteTarget({ dusun: dusun.dusunShort, rw: rwObj.rw, rt: 'Semua' });
                                setBulkDeleteModalOpen(true);
                              }}
                              style={{ color: '#dc2626', borderColor: '#fca5a5', fontSize: '0.725rem', padding: '0.25rem 0.5rem' }}
                              title={`Hapus seluruh warga di RW ${rwObj.rw}`}
                            >
                              <Trash2 size={11} /> Hapus RW {rwObj.rw}
                            </button>
                          </div>
                        </div>

                        {/* RT Grid Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '0.85rem' }}>
                          {rwObj.rts.map((rtObj) => {
                            const rtStats = getRtStats(rwObj.rw, rtObj.rt);
                            return (
                              <div
                                key={rtObj.rt}
                                style={{
                                  background: 'var(--light-surface)',
                                  borderRadius: 'var(--radius-md)',
                                  padding: '1rem',
                                  border: '1px solid var(--light-border)',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'space-between',
                                  gap: '0.75rem',
                                  transition: 'var(--transition)'
                                }}
                              >
                                <div>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                                    <span style={{
                                      background: 'rgba(5, 150, 105, 0.12)',
                                      color: 'var(--primary)',
                                      fontWeight: 800,
                                      fontSize: '0.8rem',
                                      padding: '0.15rem 0.5rem',
                                      borderRadius: '4px',
                                      border: '1px solid rgba(5, 150, 105, 0.25)'
                                    }}>
                                      RT {rtObj.rt}
                                    </span>
                                    <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                                      Ketua: {rtObj.chief}
                                    </span>
                                  </div>

                                  {/* RT Data Counters (Clickable) */}
                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', margin: '0.65rem 0' }}>
                                    <div 
                                      onClick={() => {
                                        setFilterDusun(dusun.dusunShort);
                                        setFilterRw(rwObj.rw);
                                        setFilterRt(rtObj.rt);
                                        setActiveSubTab('families-list');
                                      }}
                                      style={{ background: 'var(--light-bg)', padding: '0.5rem 0.65rem', borderRadius: '6px', cursor: 'pointer', border: '1px solid transparent', transition: 'all 0.2s' }}
                                      title={`Klik untuk membuka ${rtStats.kkCount} Kartu Keluarga di RT ${rtObj.rt}`}
                                    >
                                      <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)', display: 'block' }}>Kartu Keluarga ↗</span>
                                      <strong style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>{rtStats.kkCount}</strong>
                                    </div>
                                    <div 
                                      onClick={() => {
                                        setFilterDusun(dusun.dusunShort);
                                        setFilterRw(rwObj.rw);
                                        setFilterRt(rtObj.rt);
                                        setActiveSubTab('citizens-list');
                                      }}
                                      style={{ background: 'var(--light-bg)', padding: '0.5rem 0.65rem', borderRadius: '6px', cursor: 'pointer', border: '1px solid transparent', transition: 'all 0.2s' }}
                                      title={`Klik untuk membuka ${rtStats.totalSouls} Jiwa Warga di RT ${rtObj.rt}`}
                                    >
                                      <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)', display: 'block' }}>Total Jiwa ↗</span>
                                      <strong style={{ fontSize: '1.15rem', color: 'var(--primary)' }}>{rtStats.totalSouls}</strong>
                                    </div>
                                  </div>

                                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                                    <span 
                                      onClick={() => {
                                        setFilterDusun(dusun.dusunShort);
                                        setFilterRw(rwObj.rw);
                                        setFilterRt(rtObj.rt);
                                        setActiveSubTab('citizens-list');
                                      }}
                                      style={{ cursor: 'pointer' }}
                                      title="Klik untuk membuka daftar warga RT ini"
                                    >
                                      Laki: <strong>{rtStats.maleCount}</strong> • Pr: <strong>{rtStats.femaleCount}</strong>
                                    </span>
                                    <span 
                                      onClick={() => {
                                        setFilterDusun(dusun.dusunShort);
                                        setFilterRw(rwObj.rw);
                                        setFilterRt(rtObj.rt);
                                        setFilterEconomic('Desil 2 (Tidak Mampu)');
                                        setActiveSubTab('families-list');
                                      }}
                                      style={{ cursor: 'pointer' }}
                                      title="Klik untuk membuka data DTKS RT ini"
                                    >
                                      DTKS: <strong style={{ color: '#d97706', textDecoration: 'underline' }}>{rtStats.dtksCount} KK</strong>
                                    </span>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div style={{
                                  display: 'flex',
                                  gap: '0.4rem',
                                  paddingTop: '0.65rem',
                                  borderTop: '1px solid var(--light-border)'
                                }}>
                                  <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => {
                                      setFilterDusun(dusun.dusunShort);
                                      setFilterRw(rwObj.rw);
                                      setFilterRt(rtObj.rt);
                                      setActiveSubTab('citizens-list');
                                    }}
                                    style={{ flex: 1, fontSize: '0.75rem', padding: '0.3rem 0.5rem', justifyContent: 'center' }}
                                    title={`Lihat warga di RT ${rtObj.rt} / RW ${rwObj.rw}`}
                                  >
                                    <Users size={12} /> Warga ({rtStats.totalSouls})
                                  </button>
                                  <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => {
                                      setBulkDeleteTarget({ dusun: dusun.dusunShort, rw: rwObj.rw, rt: rtObj.rt });
                                      setBulkDeleteModalOpen(true);
                                    }}
                                    style={{ color: '#dc2626', borderColor: '#fca5a5', padding: '0.3rem 0.55rem' }}
                                    title={`Hapus seluruh warga di RT ${rtObj.rt}`}
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* =========================================================================
          SUBTAB 2: KLASIFIKASI SOSIAL EKONOMI BPS & DTKS
          ========================================================================= */}
      {activeSubTab === 'bps-classification' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* STATISTIK DISTRIBUSI STATUS EKONOMI BPS (5 DESIL) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '1rem' }}>
            {statsByBps.map((cat) => (
              <div
                key={cat.id}
                style={{
                  background: 'var(--light-surface)',
                  border: filterEconomic === cat.id ? `2px solid ${cat.color}` : '1px solid var(--light-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.15rem',
                  boxShadow: filterEconomic === cat.id ? '0 10px 20px -5px rgba(0,0,0,0.1)' : 'var(--shadow-sm)',
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

                <div 
                  onClick={() => {
                    setFilterEconomic(cat.id);
                    setActiveSubTab('families-list');
                  }}
                  style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', cursor: 'pointer' }}
                  title={`Klik untuk membuka ${cat.kkCount} KK ${cat.label}`}
                >
                  {cat.kkCount} <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>KK ↗</span>
                </div>

                <div 
                  onClick={() => {
                    setFilterEconomic(cat.id);
                    setActiveSubTab('citizens-list');
                  }}
                  style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.25rem', cursor: 'pointer' }}
                  title={`Klik untuk membuka ${cat.soulsCount} Jiwa ${cat.label}`}
                >
                  Populasi: <strong style={{ color: 'var(--primary)' }}>{cat.soulsCount} Jiwa ↗</strong>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* FILTER TOOLBAR FOR FAMILIES, CITIZENS & BPS TABLES */}
      {activeSubTab !== 'area-classification' && (
        <div style={{
          background: 'var(--light-surface)',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--light-border)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
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

          {/* Filter Dusun */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Dusun:</span>
            <select
              className="form-control"
              style={{ height: '40px', fontSize: '0.825rem', minWidth: '130px' }}
              value={filterDusun}
              onChange={(e) => setFilterDusun(e.target.value)}
            >
              <option value="Semua">Semua Dusun</option>
              <option value="Pasirjati">Dusun 1 Pasirjati</option>
              <option value="Sukamukti">Dusun 2 Sukamukti</option>
              <option value="Mekarwangi">Dusun 3 Mekarwangi</option>
            </select>
          </div>

          {/* Filter RW */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>RW:</span>
            <select
              className="form-control"
              style={{ height: '40px', fontSize: '0.825rem', minWidth: '100px' }}
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

          {/* Filter RT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>RT:</span>
            <select
              className="form-control"
              style={{ height: '40px', fontSize: '0.825rem', minWidth: '100px' }}
              value={filterRt}
              onChange={(e) => setFilterRt(e.target.value)}
            >
              <option value="Semua">Semua RT</option>
              {[...Array(20)].map((_, i) => {
                const rtNum = String(i + 1).padStart(3, '0');
                return <option key={rtNum} value={rtNum}>RT {String(i + 1).padStart(2, '0')}</option>;
              })}
            </select>
          </div>

          {/* Filter Klasifikasi BPS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>BPS:</span>
            <select
              className="form-control"
              style={{ height: '40px', fontSize: '0.825rem', minWidth: '150px' }}
              value={filterEconomic}
              onChange={(e) => setFilterEconomic(e.target.value)}
            >
              <option value="Semua">Semua Status</option>
              {bpsClassifications.map(c => (
                <option key={c.id} value={c.id}>{c.label.split('/')[0]}</option>
              ))}
            </select>
          </div>

          {(filterEconomic !== 'Semua' || filterDusun !== 'Semua' || filterRw !== 'Semua' || filterRt !== 'Semua' || searchQuery) && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setFilterEconomic('Semua');
                setFilterDusun('Semua');
                setFilterRw('Semua');
                setFilterRt('Semua');
                setSearchQuery('');
              }}
              style={{ height: '38px', fontSize: '0.75rem' }}
            >
              Reset Filter
            </button>
          )}
        </div>
      )}

      {/* =========================================================================
          MAIN DATA TABLE (BERDASARKAN TAB AKTIF)
          ========================================================================= */}
      {activeSubTab !== 'area-classification' && (
        <div className="table-wrapper" style={{ padding: '1.25rem', background: 'var(--light-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--light-border)' }}>
          
          {/* VIEW: KLASIFIKASI BPS / DTKS */}
          {activeSubTab === 'bps-classification' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
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
                      <th>Kondisi Rumah & Listrik</th>
                      <th>Jaminan BPJS</th>
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
                            <span 
                              onClick={() => setViewFamilyDetail(kk)}
                              style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--primary)', display: 'block', cursor: 'pointer' }}
                              title="Klik untuk membuka Kartu Keluarga Layar Penuh"
                            >
                              {kk.noKk} ↗
                            </span>
                            <strong 
                              onClick={() => setViewFamilyDetail(kk)}
                              style={{ fontSize: '0.95rem', color: 'var(--text-main)', cursor: 'pointer' }}
                              title="Klik untuk membuka Kartu Keluarga Layar Penuh"
                            >
                              {kk.headName}
                            </strong>
                          </td>
                          <td>
                            <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-main)' }}>{kk.address}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              RT {kk.rt} / RW {kk.rw} • {kk.dusun}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${
                              kk.economicStatus?.includes('Desil 1') ? 'badge-danger' :
                              kk.economicStatus?.includes('Desil 2') ? 'badge-warning' :
                              kk.economicStatus?.includes('Desil 3') ? 'badge-info' :
                              kk.economicStatus?.includes('Desil 4') ? 'badge-neutral' : 'badge-success'
                            }`} style={{ fontSize: '0.775rem' }}>
                              {kk.economicStatus || 'Menengah'}
                            </span>
                            {kk.bansosTypes && kk.bansosTypes.length > 0 && (
                              <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                                {kk.bansosTypes.map((b, bIdx) => (
                                  <span key={bIdx} style={{ fontSize: '0.65rem', background: '#dcfce7', color: '#166534', padding: '0.1rem 0.35rem', borderRadius: '3px', fontWeight: 700 }}>
                                    {b}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-body)' }}>
                            <div>🏠 {kk.houseOwnership || 'Milik Sendiri'}</div>
                            <div>⚡ {kk.electricity || '450 VA (Subsidi)'}</div>
                          </td>
                          <td>
                            <span className="badge badge-success" style={{ fontSize: '0.725rem' }}>
                              {kk.bpjsStatus || 'PBI Pemerintah'}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-secondary btn-sm"
                              style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}
                              onClick={() => setViewFamilyDetail(kk)}
                              title="Buka Kartu Keluarga Layar Penuh"
                            >
                              <Users size={12} /> {kk.members ? kk.members.length : 0} Jiwa ↗
                            </button>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center' }}>
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => handleOpenEditClassification(kk)}
                                title="Ubah Status Kesejahteraan / Desil"
                                style={{ padding: '0.35rem', color: 'var(--primary)' }}
                              >
                                <Edit size={13} />
                              </button>
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => {
                                  if (window.confirm(`Hapus data Kartu Keluarga ${kk.headName} (${kk.noKk})?`)) {
                                    onDeleteFamily(kk.id);
                                  }
                                }}
                                title="Hapus KK"
                                style={{ padding: '0.35rem', color: '#dc2626' }}
                              >
                                <Trash2 size={13} />
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

          {/* VIEW: DAFTAR KARTU KELUARGA (KK) */}
          {activeSubTab === 'families-list' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  Daftar Master Kartu Keluarga (KK)
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Total <strong>{filteredFamilies.length}</strong> KK Terdaftar
                </span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nomor KK</th>
                      <th>Kepala Keluarga</th>
                      <th>Alamat & RT/RW</th>
                      <th>Dusun</th>
                      <th>Status Ekonomi</th>
                      <th>Anggota Keluarga</th>
                      <th style={{ textAlign: 'center' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFamilies.length === 0 ? (
                      <tr>
                        <td colSpan={8} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                          Tidak ditemukan data Kartu Keluarga.
                        </td>
                      </tr>
                    ) : (
                      filteredFamilies.map((kk, idx) => (
                        <tr key={kk.id}>
                          <td style={{ fontWeight: 'bold' }}>{idx + 1}</td>
                          <td>
                            <strong 
                              onClick={() => setViewFamilyDetail(kk)}
                              style={{ fontFamily: 'monospace', color: 'var(--primary)', cursor: 'pointer' }}
                              title="Klik untuk membuka Kartu Keluarga Layar Penuh"
                            >
                              {kk.noKk} ↗
                            </strong>
                          </td>
                          <td>
                            <strong 
                              onClick={() => setViewFamilyDetail(kk)}
                              style={{ color: 'var(--text-main)', cursor: 'pointer' }}
                              title="Klik untuk membuka Kartu Keluarga Layar Penuh"
                            >
                              {kk.headName}
                            </strong>
                          </td>
                          <td style={{ fontSize: '0.85rem' }}>
                            <div>{kk.address}</div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              RT {kk.rt} / RW {kk.rw}
                            </span>
                          </td>
                          <td>
                            <span className="badge badge-neutral" style={{ fontSize: '0.725rem' }}>
                              {kk.dusun}
                            </span>
                          </td>
                          <td>
                            <span className="badge badge-success" style={{ fontSize: '0.725rem' }}>
                              {kk.economicStatus || 'Menengah'}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => setViewFamilyDetail(kk)}
                              style={{ fontSize: '0.775rem' }}
                            >
                              <Eye size={12} /> {kk.members ? kk.members.length : 0} Jiwa
                            </button>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center' }}>
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => setAddMemberModalKk(kk)}
                                title="Tambah Anggota Keluarga"
                                style={{ padding: '0.35rem', color: '#059669' }}
                              >
                                <Plus size={13} />
                              </button>
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => {
                                  if (window.confirm(`Hapus KK ${kk.headName}?`)) {
                                    onDeleteFamily(kk.id);
                                  }
                                }}
                                title="Hapus KK"
                                style={{ padding: '0.35rem', color: '#dc2626' }}
                              >
                                <Trash2 size={13} />
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

          {/* VIEW: DAFTAR SELURUH JIWA WARGA */}
          {activeSubTab === 'citizens-list' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  Daftar Seluruh Jiwa Penduduk Terdata
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Total <strong>{filteredCitizens.length}</strong> Jiwa
                </span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>NIK & Nama Lengkap</th>
                      <th>Gender</th>
                      <th>Tempat, Tanggal Lahir</th>
                      <th>Hubungan KK</th>
                      <th>Pendidikan & Pekerjaan</th>
                      <th>RT / RW</th>
                      <th>No. KK Terkait</th>
                      <th style={{ textAlign: 'center' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCitizens.length === 0 ? (
                      <tr>
                        <td colSpan={9} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                          Tidak ditemukan data warga.
                        </td>
                      </tr>
                    ) : (
                      filteredCitizens.map((cit, idx) => {
                        const citizenFamily = familiesList.find(f => f.id === cit.kkId || f.noKk === cit.noKk);
                        return (
                          <tr key={cit.id || idx}>
                            <td style={{ fontWeight: 'bold' }}>{idx + 1}</td>
                            <td>
                              <div
                                onClick={() => {
                                  if (citizenFamily) setViewFamilyDetail(citizenFamily);
                                }}
                                style={{ cursor: 'pointer' }}
                                title="Klik untuk membuka detail Kartu Keluarga (KK)"
                              >
                                <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--primary)', display: 'block', fontSize: '0.825rem' }}>
                                  {cit.nik}
                                </span>
                                <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)', textDecoration: 'underline', textDecorationColor: 'rgba(5,150,105,0.4)', textUnderlineOffset: '3px' }}>
                                  {cit.name}
                                </strong>
                              </div>
                            </td>
                            <td>
                              <span className={`badge ${cit.gender === 'Laki-Laki' ? 'badge-info' : 'badge-warning'}`} style={{ fontSize: '0.725rem' }}>
                                {cit.gender}
                              </span>
                            </td>
                            <td style={{ fontSize: '0.825rem', color: 'var(--text-body)' }}>
                              {cit.birthPlace ? `${cit.birthPlace}, ` : ''}{cit.birthDate || '-'}
                            </td>
                            <td>
                              <span className={`badge ${cit.relation === 'Kepala Keluarga' ? 'badge-success' : 'badge-neutral'}`} style={{ fontSize: '0.725rem' }}>
                                {cit.relation}
                              </span>
                            </td>
                            <td style={{ fontSize: '0.825rem', color: 'var(--text-body)' }}>
                              <div>{cit.education || '-'}</div>
                              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{cit.occupation || '-'}</span>
                            </td>
                            <td>
                              <span className="badge badge-neutral" style={{ fontSize: '0.725rem' }}>
                                RT {cit.rt} / RW {cit.rw}
                              </span>
                            </td>
                            <td>
                              <span 
                                onClick={() => {
                                  if (citizenFamily) setViewFamilyDetail(citizenFamily);
                                }}
                                style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
                                title="Klik untuk membuka Kartu Keluarga ini"
                              >
                                {cit.noKk}
                              </span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => {
                                  if (citizenFamily) setViewFamilyDetail(citizenFamily);
                                }}
                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary)' }}
                                title="Lihat Kartu Keluarga Lengkap"
                              >
                                <Eye size={12} /> Detail KK
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

      {/* =========================================================================
          MODALS
          ========================================================================= */}

      {/* MODAL 1: HAPUS MASSAL PER RT / RW */}
      {bulkDeleteModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '520px' }}>
            <div className="modal-header" style={{ background: '#fef2f2', borderBottom: '1px solid #fecaca' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626' }}>
                <UserX size={20} />
                <h3 className="modal-title" style={{ color: '#991b1b', fontSize: '1.05rem' }}>
                  Hapus Massal Seluruh Warga per RT / RW
                </h3>
              </div>
              <button className="modal-close" onClick={() => setBulkDeleteModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ background: '#fef2f2', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #fecaca', fontSize: '0.825rem', color: '#991b1b', lineHeight: 1.5 }}>
                ⚠️ <strong>Perhatian:</strong> Fitur ini akan menghapus seluruh data Kartu Keluarga beserta anggota jiwa warga yang berdomisili di RT / RW yang Anda pilih.
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 800 }}>1. Pilih Wilayah Dusun</label>
                <select
                  className="form-control"
                  value={bulkDeleteTarget.dusun}
                  onChange={(e) => setBulkDeleteTarget({ ...bulkDeleteTarget, dusun: e.target.value })}
                >
                  <option value="Semua">Semua Dusun</option>
                  <option value="Pasirjati">Dusun 1 (Pasirjati)</option>
                  <option value="Sukamukti">Dusun 2 (Sukamukti)</option>
                  <option value="Mekarwangi">Dusun 3 (Mekarwangi)</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 800 }}>2. Pilih RW Target</label>
                  <select
                    className="form-control"
                    value={bulkDeleteTarget.rw}
                    onChange={(e) => setBulkDeleteTarget({ ...bulkDeleteTarget, rw: e.target.value })}
                  >
                    <option value="Semua">Semua RW</option>
                    {[...Array(10)].map((_, i) => {
                      const rwNum = String(i + 1).padStart(2, '0');
                      return <option key={rwNum} value={rwNum}>RW {rwNum}</option>;
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 800 }}>3. Pilih RT Target</label>
                  <select
                    className="form-control"
                    value={bulkDeleteTarget.rt}
                    onChange={(e) => setBulkDeleteTarget({ ...bulkDeleteTarget, rt: e.target.value })}
                  >
                    <option value="Semua">Semua RT di RW ini</option>
                    {[...Array(20)].map((_, i) => {
                      const rtNum = String(i + 1).padStart(3, '0');
                      return <option key={rtNum} value={rtNum}>RT {String(i + 1).padStart(2, '0')}</option>;
                    })}
                  </select>
                </div>
              </div>

              {/* Real-time Calculation Box */}
              <div style={{
                background: 'var(--light-bg)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--light-border)',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                  Target Data yang Ditemukan:
                </span>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: matchingDeleteList.length > 0 ? '#dc2626' : 'var(--text-main)', margin: '0.25rem 0' }}>
                  {matchingDeleteList.length} Kartu Keluarga <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>({matchingDeleteSouls} Jiwa)</span>
                </div>
                <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                  Filter: Dusun {bulkDeleteTarget.dusun} • RW {bulkDeleteTarget.rw} • RT {bulkDeleteTarget.rt}
                </span>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setBulkDeleteModalOpen(false)}>
                Batal
              </button>
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={handleConfirmBulkDelete}
                disabled={matchingDeleteList.length === 0}
              >
                <Trash2 size={14} /> Hapus {matchingDeleteList.length} KK Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: TAMBAH KK BARU */}
      {addFamilyModal && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Tambah Kartu Keluarga (KK) Baru</h3>
              <button className="modal-close" onClick={() => setAddFamilyModal(false)}>
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleAddFamilySubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nomor Kartu Keluarga (16 Digit) *</label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      className="form-control"
                      value={familyForm.noKk}
                      onChange={(e) => setFamilyForm({ ...familyForm, noKk: e.target.value })}
                      placeholder="3204150801120001"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nama Lengkap Kepala Keluarga *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={familyForm.headName}
                      onChange={(e) => setFamilyForm({ ...familyForm, headName: e.target.value })}
                      placeholder="Bambang Sudrajat"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Alamat Domisili</label>
                  <input
                    type="text"
                    className="form-control"
                    value={familyForm.address}
                    onChange={(e) => setFamilyForm({ ...familyForm, address: e.target.value })}
                    placeholder="Kp. Pasirjati No. 12"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Dusun</label>
                    <select
                      className="form-control"
                      value={familyForm.dusun}
                      onChange={(e) => setFamilyForm({ ...familyForm, dusun: e.target.value })}
                    >
                      <option value="Dusun Pasirjati">Dusun 1 Pasirjati</option>
                      <option value="Dusun Sukamukti">Dusun 2 Sukamukti</option>
                      <option value="Dusun Mekarwangi">Dusun 3 Mekarwangi</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">RW</label>
                    <select
                      className="form-control"
                      value={familyForm.rw}
                      onChange={(e) => setFamilyForm({ ...familyForm, rw: e.target.value })}
                    >
                      {[...Array(10)].map((_, i) => {
                        const rwNum = String(i + 1).padStart(2, '0');
                        return <option key={rwNum} value={rwNum}>RW {rwNum}</option>;
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">RT</label>
                    <select
                      className="form-control"
                      value={familyForm.rt}
                      onChange={(e) => setFamilyForm({ ...familyForm, rt: e.target.value })}
                    >
                      {[...Array(20)].map((_, i) => {
                        const rtNum = String(i + 1).padStart(3, '0');
                        return <option key={rtNum} value={rtNum}>RT {String(i + 1).padStart(2, '0')}</option>;
                      })}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Status Kesejahteraan (BPS / DTKS)</label>
                    <select
                      className="form-control"
                      value={familyForm.economicStatus}
                      onChange={(e) => setFamilyForm({ ...familyForm, economicStatus: e.target.value })}
                    >
                      {bpsClassifications.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status BPJS Kesehatan</label>
                    <select
                      className="form-control"
                      value={familyForm.bpjsStatus}
                      onChange={(e) => setFamilyForm({ ...familyForm, bpjsStatus: e.target.value })}
                    >
                      <option value="Aktif (PBI Pemerintah)">Aktif (PBI Pemerintah)</option>
                      <option value="Aktif (Mandiri)">Aktif (Mandiri)</option>
                      <option value="Aktif (Pekerja / Perusahaan)">Aktif (Pekerja / Perusahaan)</option>
                      <option value="Tidak Memiliki BPJS">Tidak Memiliki BPJS</option>
                    </select>
                  </div>
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

      {/* MODAL 3: DOKUMEN RESMI KARTU KELUARGA (KK) SESUAI STANDAR NASIONAL */}
      {viewFamilyDetail && (
        <div className="modal-backdrop" style={{ zIndex: 9999, padding: '1rem' }} onClick={() => setViewFamilyDetail(null)}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              maxWidth: '1200px', 
              width: '98vw', 
              maxHeight: '94vh', 
              height: '94vh',
              display: 'flex', 
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Top Modal Action Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 1.5rem',
              background: 'var(--light-surface)',
              borderBottom: '1px solid var(--light-border)',
              flexShrink: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                  Dokumen Kependudukan Resmi
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Format Resmi Kartu Keluarga (KK) — {viewFamilyDetail.headName}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => window.print()}
                  style={{ fontSize: '0.775rem', gap: '0.35rem' }}
                  title="Cetak Dokumen Kartu Keluarga"
                >
                  <Printer size={14} /> Cetak Dokumen
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setAddMemberModalKk(viewFamilyDetail);
                    setMemberForm({
                      nik: '',
                      name: '',
                      gender: 'Laki-Laki',
                      birthPlace: '',
                      birthDate: '',
                      religion: 'Islam',
                      education: 'SMA / Sederajat',
                      occupation: 'Wiraswasta',
                      maritalStatus: 'Kawin',
                      relation: 'Istri',
                      bloodType: 'O',
                      fatherName: '',
                      motherName: '',
                      phone: ''
                    });
                  }}
                  style={{ fontSize: '0.775rem', gap: '0.35rem' }}
                >
                  <Plus size={14} /> Tambah Anggota
                </button>
                <button 
                  className="modal-close" 
                  onClick={() => setViewFamilyDetail(null)}
                  style={{ marginLeft: '0.5rem' }}
                  title="Tutup Layar Penuh"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Document Printable Viewport */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: 'clamp(1rem, 2vw, 2rem)',
              background: '#525659',
              display: 'flex',
              justifyContent: 'center'
            }}>
              {/* Paper Canvas (A4 / Folio Landscape Sheet) */}
              <div style={{
                background: '#ffffff',
                color: '#000000',
                width: '100%',
                maxWidth: '1100px',
                padding: '2.5rem 3rem',
                border: '1px solid #1e293b',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                fontFamily: "'Arial', 'Helvetica', sans-serif"
              }}>
                
                {/* 1. KOP KARTU KELUARGA: GARUDA, JUDUL & REGISTER CODE */}
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 180px', alignItems: 'center', marginBottom: '0.5rem' }}>
                  {/* Garuda Pancasila Emblem */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <svg width="72" height="72" viewBox="0 0 100 100">
                      <g fill="#d97706" stroke="#b45309" strokeWidth="0.8">
                        {/* Garuda Wings & Head Body */}
                        <path d="M50,12 C54,8 64,10 67,16 C71,23 77,33 87,36 C79,40 74,48 71,58 C67,53 61,50 57,53 C53,56 49,63 49,73 C49,63 45,56 41,53 C37,50 31,53 27,58 C24,48 19,40 11,36 C21,33 27,23 31,16 C34,10 44,8 48,12 Z" fill="#eab308" />
                        <path d="M49,10 L51,10 L52,14 L50,17 L48,14 Z" fill="#ca8a04" />
                        {/* Shield */}
                        <path d="M38,32 L62,32 L60,56 L50,64 L40,56 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
                        <path d="M38,32 L50,32 L50,46 L38,46 Z" fill="#dc2626" />
                        <path d="M50,32 L62,32 L62,46 L50,46 Z" fill="#ffffff" />
                        <path d="M38,46 L50,46 L50,59 L40,56 Z" fill="#ffffff" />
                        <path d="M50,46 L62,46 L60,56 L50,59 Z" fill="#dc2626" />
                        <circle cx="50" cy="45" r="3.5" fill="#facc15" stroke="#000" strokeWidth="0.5" />
                        {/* Banner */}
                        <rect x="22" y="75" width="56" height="8" rx="1.5" fill="#ffffff" stroke="#000000" strokeWidth="0.8" />
                        <text x="50" y="81" fontSize="4.2" fontWeight="bold" textAnchor="middle" fill="#000000">BHINNEKA TUNGGAL IKA</text>
                      </g>
                    </svg>
                  </div>

                  {/* Header Title */}
                  <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '1.85rem', fontWeight: 900, letterSpacing: '2px', margin: 0, color: '#000000', textTransform: 'uppercase' }}>
                      KARTU KELUARGA
                    </h1>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 900, letterSpacing: '3px', margin: '0.25rem 0 0 0', color: '#000000' }}>
                      No. {viewFamilyDetail.noKk || '3204010101230001'}
                    </h2>
                  </div>

                  {/* Right Serial Box */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{
                      border: '1.5px solid #16a34a',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '4px',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      fontFamily: 'monospace',
                      color: '#15803d',
                      letterSpacing: '1px'
                    }}>
                      K {viewFamilyDetail.noKk ? viewFamilyDetail.noKk.slice(-10) : '0123456789'}
                    </div>
                  </div>
                </div>

                {/* 2. METADATA INFORMASI WILAYAH & KEPALA KELUARGA (2 KOLOM STRICT) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', fontSize: '0.8rem', color: '#000000', lineHeight: 1.4 }}>
                  {/* Kolom Kiri */}
                  <div style={{ display: 'grid', gridTemplateColumns: '160px 12px 1fr', rowGap: '2px' }}>
                    <span>Nama Kepala Keluarga</span><span>:</span><strong style={{ textTransform: 'uppercase' }}>{viewFamilyDetail.headName}</strong>
                    <span>Alamat</span><span>:</span><span>{viewFamilyDetail.address || '-'}</span>
                    <span>RT/RW</span><span>:</span><span>{viewFamilyDetail.rt} / {viewFamilyDetail.rw}</span>
                    <span>Kode Pos</span><span>:</span><span>{viewFamilyDetail.postalCode || '40375'}</span>
                  </div>

                  {/* Kolom Kanan */}
                  <div style={{ display: 'grid', gridTemplateColumns: '140px 12px 1fr', rowGap: '2px' }}>
                    <span>Desa/Kelurahan</span><span>:</span><span style={{ textTransform: 'uppercase' }}>{profile?.name || 'Sukamaju'}</span>
                    <span>Kecamatan</span><span>:</span><span style={{ textTransform: 'uppercase' }}>{profile?.district || 'Harapan Makmur'}</span>
                    <span>Kabupaten/Kota</span><span>:</span><span style={{ textTransform: 'uppercase' }}>{profile?.regency || 'Bandung'}</span>
                    <span>Provinsi</span><span>:</span><span>JAWA BARAT</span>
                  </div>
                </div>

                {/* 3. TABEL I: DATA ANGGOTA KELUARGA (10 BARIS STANDAR RESMI) */}
                <div style={{ overflowX: 'auto', border: '1.5px solid #000000' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', color: '#000000', textAlign: 'center' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', fontWeight: 800 }}>
                        <th style={{ border: '1px solid #000000', padding: '4px 6px', width: '32px' }}>No.</th>
                        <th style={{ border: '1px solid #000000', padding: '4px 6px' }}>Nama Lengkap</th>
                        <th style={{ border: '1px solid #000000', padding: '4px 6px', width: '150px' }}>NIK</th>
                        <th style={{ border: '1px solid #000000', padding: '4px 6px', width: '95px' }}>Jenis Kelamin</th>
                        <th style={{ border: '1px solid #000000', padding: '4px 6px', width: '110px' }}>Tempat Lahir</th>
                        <th style={{ border: '1px solid #000000', padding: '4px 6px', width: '95px' }}>Tanggal Lahir</th>
                        <th style={{ border: '1px solid #000000', padding: '4px 6px', width: '80px' }}>Agama</th>
                        <th style={{ border: '1px solid #000000', padding: '4px 6px', width: '115px' }}>Pendidikan</th>
                        <th style={{ border: '1px solid #000000', padding: '4px 6px', width: '120px' }}>Jenis Pekerjaan</th>
                      </tr>
                      {/* Sub-Header Indices (1) s/d (8) */}
                      <tr style={{ background: '#e2e8f0', fontSize: '0.7rem', fontWeight: 700 }}>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}></th>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}>(1)</th>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}>(2)</th>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}>(3)</th>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}>(4)</th>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}>(5)</th>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}>(6)</th>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}>(7)</th>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}>(8)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(10)].map((_, i) => {
                        const m = (viewFamilyDetail.members || [])[i];
                        return (
                          <tr key={i} style={{ height: '23px' }}>
                            <td style={{ border: '1px solid #000000', padding: '3px 4px', fontWeight: 700 }}>{i + 1}</td>
                            <td style={{ border: '1px solid #000000', padding: '3px 6px', textAlign: 'left', fontWeight: m ? 700 : 400, textTransform: 'uppercase' }}>
                              {m ? m.name : ''}
                            </td>
                            <td style={{ border: '1px solid #000000', padding: '3px 4px', fontFamily: 'monospace', fontWeight: 700 }}>
                              {m ? m.nik : ''}
                            </td>
                            <td style={{ border: '1px solid #000000', padding: '3px 4px' }}>
                              {m ? m.gender : ''}
                            </td>
                            <td style={{ border: '1px solid #000000', padding: '3px 4px', textTransform: 'uppercase' }}>
                              {m ? (m.birthPlace || 'BANDUNG') : ''}
                            </td>
                            <td style={{ border: '1px solid #000000', padding: '3px 4px' }}>
                              {m ? (m.birthDate || '-') : ''}
                            </td>
                            <td style={{ border: '1px solid #000000', padding: '3px 4px', textTransform: 'uppercase' }}>
                              {m ? (m.religion || 'ISLAM') : ''}
                            </td>
                            <td style={{ border: '1px solid #000000', padding: '3px 4px', textTransform: 'uppercase' }}>
                              {m ? (m.education || 'SMA / SEDERAJAT') : ''}
                            </td>
                            <td style={{ border: '1px solid #000000', padding: '3px 4px', textTransform: 'uppercase' }}>
                              {m ? (m.occupation || '-') : ''}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* 4. TABEL II: STATUS PERKAWINAN, HUBUNGAN KELUARGA & NAMA ORANG TUA (10 BARIS STANDAR RESMI) */}
                <div style={{ overflowX: 'auto', border: '1.5px solid #000000' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', color: '#000000', textAlign: 'center' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', fontWeight: 800 }}>
                        <th rowSpan={2} style={{ border: '1px solid #000000', padding: '4px 6px', width: '32px' }}>No.</th>
                        <th rowSpan={2} style={{ border: '1px solid #000000', padding: '4px 6px', width: '110px' }}>Status Perkawinan</th>
                        <th rowSpan={2} style={{ border: '1px solid #000000', padding: '4px 6px', width: '130px' }}>Status Hubungan Dalam Keluarga</th>
                        <th rowSpan={2} style={{ border: '1px solid #000000', padding: '4px 6px', width: '110px' }}>Kewarganegaraan</th>
                        <th colSpan={2} style={{ border: '1px solid #000000', padding: '4px 6px' }}>Dokumen Imigrasi</th>
                        <th colSpan={2} style={{ border: '1px solid #000000', padding: '4px 6px' }}>Nama Orang Tua</th>
                        <th rowSpan={2} style={{ border: '1px solid #000000', padding: '4px 6px', width: '45px' }}>Aksi</th>
                      </tr>
                      <tr style={{ background: '#f8fafc', fontWeight: 800 }}>
                        <th style={{ border: '1px solid #000000', padding: '3px 6px', width: '90px' }}>No. Paspor</th>
                        <th style={{ border: '1px solid #000000', padding: '3px 6px', width: '90px' }}>No. KITAS/KITAP</th>
                        <th style={{ border: '1px solid #000000', padding: '3px 6px' }}>Ayah</th>
                        <th style={{ border: '1px solid #000000', padding: '3px 6px' }}>Ibu</th>
                      </tr>
                      {/* Sub-Header Indices (9) s/d (15) */}
                      <tr style={{ background: '#e2e8f0', fontSize: '0.7rem', fontWeight: 700 }}>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}></th>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}>(9)</th>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}>(10)</th>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}>(11)</th>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}>(12)</th>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}>(13)</th>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}>(14)</th>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}>(15)</th>
                        <th style={{ border: '1px solid #000000', padding: '2px' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(10)].map((_, i) => {
                        const m = (viewFamilyDetail.members || [])[i];
                        return (
                          <tr key={i} style={{ height: '23px' }}>
                            <td style={{ border: '1px solid #000000', padding: '3px 4px', fontWeight: 700 }}>{i + 1}</td>
                            <td style={{ border: '1px solid #000000', padding: '3px 4px', textTransform: 'uppercase' }}>
                              {m ? (m.maritalStatus || 'KAWIN') : (i >= (viewFamilyDetail.members?.length || 0) ? '-' : '')}
                            </td>
                            <td style={{ border: '1px solid #000000', padding: '3px 4px', textTransform: 'uppercase', fontWeight: 600 }}>
                              {m ? (m.relation || '-') : (i >= (viewFamilyDetail.members?.length || 0) ? '-' : '')}
                            </td>
                            <td style={{ border: '1px solid #000000', padding: '3px 4px' }}>
                              {m ? 'WNI' : (i >= (viewFamilyDetail.members?.length || 0) ? '-' : '')}
                            </td>
                            <td style={{ border: '1px solid #000000', padding: '3px 4px' }}>
                              -
                            </td>
                            <td style={{ border: '1px solid #000000', padding: '3px 4px' }}>
                              -
                            </td>
                            <td style={{ border: '1px solid #000000', padding: '3px 6px', textAlign: 'left', textTransform: 'uppercase' }}>
                              {m ? (m.fatherName || '-') : (i >= (viewFamilyDetail.members?.length || 0) ? '-' : '')}
                            </td>
                            <td style={{ border: '1px solid #000000', padding: '3px 6px', textAlign: 'left', textTransform: 'uppercase' }}>
                              {m ? (m.motherName || '-') : (i >= (viewFamilyDetail.members?.length || 0) ? '-' : '')}
                            </td>
                            <td style={{ border: '1px solid #000000', padding: '2px', textAlign: 'center' }}>
                              {m && (
                                <button
                                  className="btn btn-secondary btn-sm"
                                  style={{ color: '#dc2626', padding: '0.1rem 0.35rem', fontSize: '0.65rem' }}
                                  onClick={() => {
                                    if (window.confirm(`Hapus data anggota ${m.name}?`)) {
                                      onDeleteMember(viewFamilyDetail.id, m.id);
                                      setViewFamilyDetail(prev => ({
                                        ...prev,
                                        members: prev.members.filter(mem => mem.id !== m.id)
                                      }));
                                    }
                                  }}
                                  title="Hapus Anggota"
                                >
                                  <Trash2 size={11} />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* 5. FOOTER: LEMBAR PENERIMA & TANDA TANGAN RESMI DUKCAPIL */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '260px 1fr 300px',
                  alignItems: 'flex-start',
                  marginTop: '0.75rem',
                  fontSize: '0.775rem',
                  color: '#000000',
                  lineHeight: 1.35
                }}>
                  {/* Kolom Kiri: Tanggal Pengeluaran & Lembar */}
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 10px 1fr', marginBottom: '0.25rem' }}>
                      <span>Dikeluarkan Tanggal</span><span>:</span><strong>{viewFamilyDetail.issueDate || '14-08-2023'}</strong>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 10px 1fr' }}>
                      <span>Lembar</span><span>:</span>
                      <div>
                        <div>I. Kepala Keluarga</div>
                        <div>II. RT</div>
                        <div>III. Desa / Kelurahan</div>
                        <div>IV. Kecamatan</div>
                      </div>
                    </div>
                  </div>

                  {/* Kolom Tengah: Tanda Tangan Kepala Keluarga */}
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 800, display: 'block', marginBottom: '0.5rem' }}>
                      KEPALA KELUARGA
                    </span>
                    <div style={{ height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontStyle: 'italic', color: '#64748b' }}>
                      ( Tanda Tangan )
                    </div>
                    <strong style={{ display: 'block', textDecoration: 'underline', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                      {viewFamilyDetail.headName}
                    </strong>
                    <span style={{ fontSize: '0.7rem' }}>Tanda Tangan / Cap Jempol</span>
                  </div>

                  {/* Kolom Kanan: Tanda Tangan Kepala Dinas Dukcapil */}
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 800, display: 'block' }}>
                      KEPALA DINAS KEPENDUDUKAN DAN PENCATATAN SIPIL
                    </span>
                    <span style={{ fontWeight: 800, display: 'block', textTransform: 'uppercase' }}>
                      {profile?.regency ? profile.regency.toUpperCase() : 'KABUPATEN BANDUNG'}
                    </span>
                    <div style={{ height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontStyle: 'italic', color: '#059669', fontWeight: 800 }}>
                      [ CAP & TTD ELEKTRONIK ]
                    </div>
                    <strong style={{ display: 'block', textDecoration: 'underline', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                      {profile?.headOfVillage?.name || 'Drs. H. TATANG SUPRIATNA, M.Si'}
                    </strong>
                    <span style={{ fontSize: '0.725rem' }}>
                      NIP. {profile?.headOfVillage?.nip || '19680514 199403 1 002'}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Footer Modal Bar */}
            <div className="modal-footer" style={{ borderTop: '1px solid var(--light-border)', background: 'var(--light-surface)', padding: '0.75rem 1.5rem', flexShrink: 0 }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: 'auto' }}>
                Status Ekonomi: <strong style={{ color: 'var(--primary)' }}>{viewFamilyDetail.economicStatus || 'Menengah'}</strong> • Listrik: {viewFamilyDetail.electricity || '450 VA'} • Sanitasi: {viewFamilyDetail.sanitation || 'Jamban Pribadi'}
              </span>
              <button type="button" className="btn btn-secondary" onClick={() => setViewFamilyDetail(null)}>
                Tutup Layar Penuh
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 4: TAMBAH ANGGOTA KELUARGA KE KK */}
      {addMemberModalKk && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Tambah Anggota ke KK: {addMemberModalKk.headName}</h3>
              <button className="modal-close" onClick={() => setAddMemberModalKk(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMemberSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">NIK (16 Digit) *</label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      className="form-control"
                      value={memberForm.nik}
                      onChange={(e) => setMemberForm({ ...memberForm, nik: e.target.value })}
                      placeholder="320415..."
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
