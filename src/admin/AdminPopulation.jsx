import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Printer, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  X, 
  Save, 
  Building2, 
  Award, 
  ShieldCheck, 
  HeartHandshake, 
  Download, 
  FileText,
  CreditCard,
  Layers,
  ChevronRight,
  Eye
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function AdminPopulation({ profile }) {
  const [activeSubTab, setActiveSubTab] = useState('citizens'); // 'citizens', 'families', 'lembaga', 'dpt'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDusun, setSelectedDusun] = useState('ALL');
  const [selectedGender, setSelectedGender] = useState('ALL');
  const [selectedKtpStatus, setSelectedKtpStatus] = useState('ALL');

  // Datasets
  const [families, setFamilies] = useState(() => StorageService.getFamilies() || []);
  const [citizens, setCitizens] = useState(() => StorageService.getAllCitizens() || []);
  const [lembagaList, setLembagaList] = useState(() => StorageService.getLembagaList() || []);

  // Citizen Modal
  const [citizenModalOpen, setCitizenModalOpen] = useState(false);
  const [editingCitizenId, setEditingCitizenId] = useState(null);
  const [citizenForm, setCitizenForm] = useState({
    familyNoKk: '3204151201010001',
    nik: '',
    name: '',
    gender: 'Laki-laki',
    birthPlace: 'Sumedang',
    birthDate: '1990-01-01',
    religion: 'Islam',
    education: 'SMA / Sederajat',
    job: 'Wiraswasta',
    maritalStatus: 'Kawin',
    relation: 'Kepala Keluarga',
    bloodType: 'O',
    ktpStatus: 'KTP-el Tercetak',
    dusun: 'Dusun Pasirjati',
    rt: '01',
    rw: '01',
    phone: '',
    isVoter: true
  });

  // Citizen Detail Modal
  const [detailCitizen, setDetailCitizen] = useState(null);

  // Lembaga Modal
  const [lembagaModalOpen, setLembagaModalOpen] = useState(false);
  const [lembagaForm, setLembagaForm] = useState({
    name: '',
    code: '',
    leader: '',
    secretary: '',
    membersCount: 10,
    address: 'Balai Desa',
    legalBasis: '',
    description: ''
  });

  // Quick Stats
  const totalCitizens = citizens.length;
  const maleCount = citizens.filter(c => (c.gender || '').toLowerCase().startsWith('l')).length;
  const femaleCount = citizens.filter(c => (c.gender || '').toLowerCase().startsWith('p')).length;
  const totalFamilies = families.length;
  const dptCount = citizens.filter(c => {
    const age = new Date().getFullYear() - parseInt((c.birthDate || '2000').slice(0, 4));
    return age >= 17 || c.maritalStatus === 'Kawin';
  }).length;

  const filteredCitizens = citizens.filter(c => {
    const matchSearch = c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.nik?.includes(searchQuery) ||
                        c.familyNoKk?.includes(searchQuery);
    const matchDusun = selectedDusun === 'ALL' || c.dusun === selectedDusun;
    const matchGender = selectedGender === 'ALL' || (c.gender || '').toLowerCase().startsWith(selectedGender.toLowerCase());
    const matchKtp = selectedKtpStatus === 'ALL' || c.ktpStatus === selectedKtpStatus;
    return matchSearch && matchDusun && matchGender && matchKtp;
  });

  const handleOpenAddCitizen = () => {
    setEditingCitizenId(null);
    setCitizenForm({
      familyNoKk: families[0]?.noKk || '3204151201010001',
      nik: '',
      name: '',
      gender: 'Laki-laki',
      birthPlace: 'Sumedang',
      birthDate: '1995-05-15',
      religion: 'Islam',
      education: 'SMA / Sederajat',
      job: 'Wiraswasta',
      maritalStatus: 'Kawin',
      relation: 'Kepala Keluarga',
      bloodType: 'O',
      ktpStatus: 'KTP-el Tercetak',
      dusun: 'Dusun Pasirjati',
      rt: '01',
      rw: '01',
      phone: '',
      isVoter: true
    });
    setCitizenModalOpen(true);
  };

  const handleOpenEditCitizen = (c) => {
    setEditingCitizenId(c.id);
    setCitizenForm({ ...c });
    setCitizenModalOpen(true);
  };

  const handleSaveCitizen = (e) => {
    e.preventDefault();
    if (!citizenForm.name || !citizenForm.nik) {
      alert('Nama dan NIK wajib diisi!');
      return;
    }

    if (editingCitizenId) {
      StorageService.updateCitizen(editingCitizenId, citizenForm);
    } else {
      StorageService.addCitizen(citizenForm.familyNoKk, citizenForm);
    }

    setCitizens(StorageService.getAllCitizens());
    setFamilies(StorageService.getFamilies());
    setCitizenModalOpen(false);
  };

  const handleDeleteCitizen = (id) => {
    if (window.confirm('Hapus data kependudukan warga ini?')) {
      StorageService.deleteCitizen(id);
      setCitizens(StorageService.getAllCitizens());
      setFamilies(StorageService.getFamilies());
    }
  };

  const handleSaveLembaga = (e) => {
    e.preventDefault();
    StorageService.addLembaga(lembagaForm);
    setLembagaList(StorageService.getLembagaList());
    setLembagaModalOpen(false);
  };

  const handleDeleteLembaga = (id) => {
    if (window.confirm('Hapus data lembaga desa ini?')) {
      StorageService.deleteLembaga(id);
      setLembagaList(StorageService.getLembagaList());
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. Kependudukan Top Stat Infoboxes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', borderLeft: '4px solid #2563eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>TOTAL PENDUDUK</span>
            <Users size={16} color="#2563eb" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', margin: '4px 0' }}>
            {totalCitizens} Jiwa
          </div>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            👦 L: {maleCount} • 👧 P: {femaleCount}
          </span>
        </div>

        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', borderLeft: '4px solid #059669' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>KARTU KELUARGA (KK)</span>
            <CreditCard size={16} color="#059669" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#059669', margin: '4px 0' }}>
            {totalFamilies} KK
          </div>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            Terdaftar di 4 Dusun Desa
          </span>
        </div>

        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', borderLeft: '4px solid #d97706' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>CALON PEMILIH (DPT)</span>
            <ShieldCheck size={16} color="#d97706" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#d97706', margin: '4px 0' }}>
            {dptCount} Hak Pilih
          </div>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            Usia ≥ 17 Tahun / Sudah Kawin
          </span>
        </div>

        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', borderLeft: '4px solid #7c3aed' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>LEMBAGA DESA (LKD)</span>
            <Building2 size={16} color="#7c3aed" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#7c3aed', margin: '4px 0' }}>
            {lembagaList.length} Lembaga
          </div>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            BPD, LPMD, PKK, Karang Taruna
          </span>
        </div>
      </div>

      {/* 2. Sub Menu Tabs Kependudukan */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={`btn btn-sm ${activeSubTab === 'citizens' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('citizens')}
          style={{ fontWeight: 700 }}
        >
          <Users size={14} /> Data Penduduk ({citizens.length})
        </button>
        <button
          type="button"
          className={`btn btn-sm ${activeSubTab === 'families' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('families')}
          style={{ fontWeight: 700 }}
        >
          <CreditCard size={14} /> Kartu Keluarga ({families.length})
        </button>
        <button
          type="button"
          className={`btn btn-sm ${activeSubTab === 'lembaga' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('lembaga')}
          style={{ fontWeight: 700 }}
        >
          <Building2 size={14} /> Lembaga Kemasyarakatan ({lembagaList.length})
        </button>
        <button
          type="button"
          className={`btn btn-sm ${activeSubTab === 'dpt' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('dpt')}
          style={{ fontWeight: 700 }}
        >
          <ShieldCheck size={14} /> Calon Pemilih (DPT) ({dptCount})
        </button>
      </div>

      {/* 3. TAB 1: DATA PENDUDUK */}
      {activeSubTab === 'citizens' && (
        <div className="table-wrapper">
          <div className="table-toolbar" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Users size={18} color="#2563eb" /> Buku Administrasi Kependudukan (Data Kependudukan)
              </h3>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Kelola data NIK, SHDK, pendidikan, pekerjaan, dan rekam KTP-el warga desa.
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', width: '220px' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Cari NIK, KK, Nama..."
                  className="form-control"
                  style={{ paddingLeft: '2rem', height: '34px', fontSize: '0.8rem' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleOpenAddCitizen}
                style={{ fontWeight: 700 }}
              >
                <UserPlus size={14} /> Tambah Penduduk
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--light-border)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', background: 'var(--bg-main)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>Dusun:</span>
            <select
              className="form-control"
              style={{ height: '30px', fontSize: '0.75rem', padding: '0.2rem 0.5rem', width: 'auto' }}
              value={selectedDusun}
              onChange={(e) => setSelectedDusun(e.target.value)}
            >
              <option value="ALL">Semua Dusun</option>
              <option value="Dusun Pasirjati">Dusun Pasirjati</option>
              <option value="Dusun Sukarame">Dusun Sukarame</option>
              <option value="Dusun Cikembar">Dusun Cikembar</option>
              <option value="Dusun Mekar">Dusun Mekar</option>
            </select>

            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginLeft: '0.5rem' }}>Jenis Kelamin:</span>
            <select
              className="form-control"
              style={{ height: '30px', fontSize: '0.75rem', padding: '0.2rem 0.5rem', width: 'auto' }}
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="ALL">Semua</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>

            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginLeft: '0.5rem' }}>Status KTP-el:</span>
            <select
              className="form-control"
              style={{ height: '30px', fontSize: '0.75rem', padding: '0.2rem 0.5rem', width: 'auto' }}
              value={selectedKtpStatus}
              onChange={(e) => setSelectedKtpStatus(e.target.value)}
            >
              <option value="ALL">Semua Status</option>
              <option value="KTP-el Tercetak">KTP-el Tercetak</option>
              <option value="Belum Wajib KTP">Belum Wajib KTP</option>
              <option value="Belum Rekam">Belum Rekam</option>
            </select>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Lengkap & NIK</th>
                  <th>No. KK & SHDK</th>
                  <th>Wilayah RT/RW</th>
                  <th>Pekerjaan & Pendidikan</th>
                  <th>Status KTP-el</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredCitizens.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                      Tidak ada data penduduk yang sesuai filter.
                    </td>
                  </tr>
                ) : (
                  filteredCitizens.map((c, idx) => (
                    <tr key={c.id || idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <strong style={{ fontSize: '0.875rem', color: 'var(--text-main)', display: 'block' }}>
                          {c.name} ({c.gender === 'Laki-laki' || c.gender?.startsWith('L') ? '👦' : '👧'})
                        </strong>
                        <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                          NIK: {c.nik} • Gol: {c.bloodType || 'O'}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>
                          {c.relation || 'Anggota Keluarga'}
                        </span>
                        <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'block' }}>
                          KK: {c.familyNoKk}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {c.dusun || 'Pasirjati'}
                        </span>
                        <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'block' }}>
                          RT {c.rt || '01'} / RW {c.rw || '01'}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block' }}>
                          {c.job || 'Wiraswasta'}
                        </span>
                        <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                          {c.education || 'SMA/Sederajat'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${c.ktpStatus === 'KTP-el Tercetak' ? 'badge-success' : 'badge-neutral'}`} style={{ fontSize: '0.7rem' }}>
                          {c.ktpStatus || 'KTP-el Tercetak'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.25rem 0.45rem' }}
                            title="Detail Biodata Penduduk"
                            onClick={() => setDetailCitizen(c)}
                          >
                            <Eye size={13} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.25rem 0.45rem' }}
                            title="Edit Data Penduduk"
                            onClick={() => handleOpenEditCitizen(c)}
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm"
                            style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '0.25rem 0.45rem' }}
                            title="Hapus Data Penduduk"
                            onClick={() => handleDeleteCitizen(c.id)}
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

      {/* 4. TAB 2: KARTU KELUARGA */}
      {activeSubTab === 'families' && (
        <div className="table-wrapper">
          <div className="table-toolbar">
            <div>
              <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CreditCard size={18} color="#059669" /> Daftar Kartu Keluarga (KK) Terdaftar
              </h3>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Struktur rumah tangga dan anggota keluarga per nomor KK.
              </span>
            </div>
          </div>

          <div style={{ padding: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {families.map((fam) => (
                <div
                  key={fam.id || fam.noKk}
                  style={{
                    background: 'var(--light-surface)',
                    border: '1px solid var(--light-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                      {fam.dusun} (RT {fam.rt} / RW {fam.rw})
                    </span>
                    <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                      {(fam.members || []).length} Anggota Jiwa
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>
                    {fam.headName}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.75rem' }}>
                    No. KK: {fam.noKk}
                  </div>

                  {/* Anggota List */}
                  <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--light-border)', fontSize: '0.75rem' }}>
                    <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>Daftar Anggota Keluarga:</strong>
                    {(fam.members || []).map((m, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', color: 'var(--text-body)' }}>
                        <span>• {m.name} ({m.relation})</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{m.nik}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: LEMBAGA DESA */}
      {activeSubTab === 'lembaga' && (
        <div className="table-wrapper">
          <div className="table-toolbar">
            <div>
              <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Building2 size={18} color="#7c3aed" /> Lembaga Kemasyarakatan Desa (LKD) & Mitra Kerja
              </h3>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Struktur kepengurusan BPD, LPMD, TP-PKK, Karang Taruna, dan Satlinmas.
              </span>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setLembagaModalOpen(true)}
              style={{ fontWeight: 700 }}
            >
              <Building2 size={14} /> Tambah Lembaga Baru
            </button>
          </div>

          <div style={{ padding: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {lembagaList.map((lkd) => (
                <div
                  key={lkd.id}
                  style={{
                    background: 'var(--light-surface)',
                    border: '1px solid var(--light-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>
                        {lkd.code}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm"
                        style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '0.2rem 0.4rem' }}
                        onClick={() => handleDeleteLembaga(lkd.id)}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.35rem 0' }}>
                      {lkd.name}
                    </h4>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-body)', marginBottom: '0.4rem' }}>
                      👤 <strong>Ketua:</strong> {lkd.leader}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-body)', marginBottom: '0.6rem' }}>
                      📝 <strong>Sekretaris:</strong> {lkd.secretary} • 👥 <strong>Anggota:</strong> {lkd.membersCount} Orang
                    </div>

                    <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', margin: '0 0 0.5rem 0', lineHeight: 1.4 }}>
                      {lkd.description}
                    </p>
                  </div>

                  <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, borderTop: '1px solid var(--light-border)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                    Dasar Hukum: {lkd.legalBasis}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 4: CALON PEMILIH DPT */}
      {activeSubTab === 'dpt' && (
        <div className="table-wrapper">
          <div className="table-toolbar">
            <div>
              <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={18} color="#d97706" /> Daftar Pemilih Tetap (DPT) Pilkades / Pemilu
              </h3>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Filter otomatis warga berumur ≥ 17 tahun atau yang sudah menikah memiliki hak suara.
              </span>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => window.print()}
              style={{ fontWeight: 700 }}
            >
              <Printer size={14} /> Cetak Daftar DPT
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Lengkap Pemilih</th>
                  <th>NIK</th>
                  <th>Jenis Kelamin</th>
                  <th>Wilayah TPS / Dusun</th>
                  <th>Status Hak Suara</th>
                </tr>
              </thead>
              <tbody>
                {citizens.filter(c => {
                  const age = new Date().getFullYear() - parseInt((c.birthDate || '2000').slice(0, 4));
                  return age >= 17 || c.maritalStatus === 'Kawin';
                }).map((c, idx) => (
                  <tr key={c.id || idx}>
                    <td>{idx + 1}</td>
                    <td><strong>{c.name}</strong></td>
                    <td>{c.nik}</td>
                    <td>{c.gender}</td>
                    <td>{c.dusun} RT {c.rt} / RW {c.rw}</td>
                    <td><span className="badge badge-success" style={{ fontSize: '0.7rem' }}>✓ Memenuhi Syarat DPT</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. MODAL DETAIL BIODATA PENDUDUK */}
      {detailCitizen && (
        <div className="modal-backdrop open" onClick={() => setDetailCitizen(null)}>
          <div className="modal-content" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                Biodata Lengkap Penduduk 
              </h3>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setDetailCitizen(null)}>
                <X size={14} />
              </button>
            </div>

            <div style={{ padding: '1.25rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  {detailCitizen.gender === 'Laki-laki' || detailCitizen.gender?.startsWith('L') ? '👦' : '👧'}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>
                  {detailCitizen.name}
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 800 }}>
                  NIK: {detailCitizen.nik}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.825rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>NO. KARTU KELUARGA</span>
                  <strong>{detailCitizen.familyNoKk}</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>HUBUNGAN DALAM KK</span>
                  <strong>{detailCitizen.relation || 'Kepala Keluarga'}</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>TEMPAT / TGL LAHIR</span>
                  <strong>{detailCitizen.birthPlace}, {detailCitizen.birthDate}</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>AGAMA / GOL DARAH</span>
                  <strong>{detailCitizen.religion || 'Islam'} / {detailCitizen.bloodType || 'O'}</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>PENDIDIKAN TERAKHIR</span>
                  <strong>{detailCitizen.education || 'SMA / Sederajat'}</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>PEKERJAAN UTAMA</span>
                  <strong>{detailCitizen.job || 'Wiraswasta'}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => setDetailCitizen(null)}>
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. MODAL TAMBAH / EDIT PENDUDUK */}
      {citizenModalOpen && (
        <div className="modal-backdrop open" onClick={() => setCitizenModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                {editingCitizenId ? 'Edit Biodata Penduduk' : 'Input Penduduk Baru '}
              </h3>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setCitizenModalOpen(false)}>
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleSaveCitizen} style={{ padding: '1.25rem' }}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nomor NIK KTP (16 Digit) *</label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="320415..."
                    className="form-control"
                    value={citizenForm.nik}
                    onChange={(e) => setCitizenForm({ ...citizenForm, nik: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nomor Kartu Keluarga (No. KK) *</label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="320415..."
                    className="form-control"
                    value={citizenForm.familyNoKk}
                    onChange={(e) => setCitizenForm({ ...citizenForm, familyNoKk: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Nama Lengkap Warga *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Sesuai KTP"
                  className="form-control"
                  value={citizenForm.name}
                  onChange={(e) => setCitizenForm({ ...citizenForm, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Jenis Kelamin</label>
                  <select
                    className="form-control"
                    value={citizenForm.gender}
                    onChange={(e) => setCitizenForm({ ...citizenForm, gender: e.target.value })}
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Hubungan dalam Keluarga (SHDK)</label>
                  <select
                    className="form-control"
                    value={citizenForm.relation}
                    onChange={(e) => setCitizenForm({ ...citizenForm, relation: e.target.value })}
                  >
                    <option value="Kepala Keluarga">Kepala Keluarga</option>
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
                    placeholder="Kota / Kabupaten"
                    className="form-control"
                    value={citizenForm.birthPlace}
                    onChange={(e) => setCitizenForm({ ...citizenForm, birthPlace: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tanggal Lahir</label>
                  <input
                    type="date"
                    className="form-control"
                    value={citizenForm.birthDate}
                    onChange={(e) => setCitizenForm({ ...citizenForm, birthDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Pendidikan Terakhir</label>
                  <select
                    className="form-control"
                    value={citizenForm.education}
                    onChange={(e) => setCitizenForm({ ...citizenForm, education: e.target.value })}
                  >
                    <option value="Tidak / Belum Sekolah">Tidak / Belum Sekolah</option>
                    <option value="SD / Sederajat">SD / Sederajat</option>
                    <option value="SMP / Sederajat">SMP / Sederajat</option>
                    <option value="SMA / Sederajat">SMA / Sederajat</option>
                    <option value="Diploma I/II/III">Diploma I/II/III</option>
                    <option value="Strata I (S1)">Strata I (S1)</option>
                    <option value="Strata II (S2)">Strata II (S2)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Pekerjaan Utama</label>
                  <input
                    type="text"
                    placeholder="Wiraswasta, Petani, PNS, Buruh, dll."
                    className="form-control"
                    value={citizenForm.job}
                    onChange={(e) => setCitizenForm({ ...citizenForm, job: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Wilayah Dusun</label>
                  <select
                    className="form-control"
                    value={citizenForm.dusun}
                    onChange={(e) => setCitizenForm({ ...citizenForm, dusun: e.target.value })}
                  >
                    <option value="Dusun Pasirjati">Dusun Pasirjati</option>
                    <option value="Dusun Sukarame">Dusun Sukarame</option>
                    <option value="Dusun Cikembar">Dusun Cikembar</option>
                    <option value="Dusun Mekar">Dusun Mekar</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Status KTP-el</label>
                  <select
                    className="form-control"
                    value={citizenForm.ktpStatus}
                    onChange={(e) => setCitizenForm({ ...citizenForm, ktpStatus: e.target.value })}
                  >
                    <option value="KTP-el Tercetak">KTP-el Tercetak</option>
                    <option value="Belum Wajib KTP">Belum Wajib KTP (Anak)</option>
                    <option value="Belum Rekam">Belum Rekam KTP-el</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--light-border)' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setCitizenModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 700 }}>
                  <Save size={13} /> {editingCitizenId ? 'Simpan Perubahan' : 'Simpan Data Penduduk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
