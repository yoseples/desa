import React, { useState } from 'react';
import { 
  Users, 
  Home, 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Printer, 
  X, 
  UserPlus, 
  FileUp,
  Download,
  HeartHandshake, 
  CheckCircle2
} from 'lucide-react';
import { StorageService } from '../services/storageService';
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
  const [viewMode, setViewMode] = useState('families'); // 'families' or 'citizens'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRt, setFilterRt] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterGender, setFilterGender] = useState('Semua');

  // Modals
  const [detailKkModal, setDetailKkModal] = useState(null);
  const [formKkModal, setFormKkModal] = useState(false);
  const [editingKkId, setEditingKkId] = useState(null);
  const [formMemberModal, setFormMemberModal] = useState(null); // holds kkId
  const [importModalOpen, setImportModalOpen] = useState(false);

  // KK Form State
  const [kkFormData, setKkFormData] = useState({
    noKk: '',
    headName: '',
    address: '',
    rt: '001',
    rw: '001',
    dusun: 'Dusun Pasirjati',
    postalCode: '40375',
    economicStatus: 'Menengah',
    bpjsStatus: 'Aktif (Mandiri)',
    issueDate: '01 Januari 2024'
  });

  // Member Form State
  const [memberFormData, setMemberFormData] = useState({
    nik: '',
    name: '',
    gender: 'Laki-Laki',
    birthPlace: 'Bandung',
    birthDate: '01-01-1990',
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

  // Filtered Families
  const filteredFamilies = familiesList.filter((kk) => {
    const matchesSearch = kk.noKk.includes(searchQuery) ||
                          kk.headName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          kk.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRt = filterRt === 'Semua' || kk.rt === filterRt;
    const matchesStatus = filterStatus === 'Semua' || kk.economicStatus === filterStatus;
    return matchesSearch && matchesRt && matchesStatus;
  });

  // All Citizens computed
  const allCitizens = StorageService.getAllCitizens();
  const filteredCitizens = allCitizens.filter((c) => {
    const matchesSearch = c.nik.includes(searchQuery) ||
                          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.noKk.includes(searchQuery);
    const matchesRt = filterRt === 'Semua' || c.rt === filterRt;
    const matchesGender = filterGender === 'Semua' || c.gender === filterGender;
    return matchesSearch && matchesRt && matchesGender;
  });

  // Total Counts
  const totalKK = familiesList.length;
  const totalCitizens = allCitizens.length;
  const totalMale = allCitizens.filter(c => c.gender === 'Laki-Laki').length;
  const totalFemale = allCitizens.filter(c => c.gender === 'Perempuan').length;
  const totalDtks = familiesList.filter(f => f.economicStatus.includes('DTKS') || f.economicStatus === 'Prasejahtera (DTKS)').length;

  const handleOpenAddKk = () => {
    setEditingKkId(null);
    setKkFormData({
      noKk: '',
      headName: '',
      address: '',
      rt: '001',
      rw: '001',
      dusun: 'Dusun Pasirjati',
      postalCode: '40375',
      economicStatus: 'Menengah',
      bpjsStatus: 'Aktif (Mandiri)',
      issueDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    });
    setFormKkModal(true);
  };

  const handleOpenEditKk = (kk) => {
    setEditingKkId(kk.id);
    setKkFormData({
      noKk: kk.noKk,
      headName: kk.headName,
      address: kk.address,
      rt: kk.rt || '001',
      rw: kk.rw || '001',
      dusun: kk.dusun || 'Dusun Pasirjati',
      postalCode: kk.postalCode || '40375',
      economicStatus: kk.economicStatus || 'Menengah',
      bpjsStatus: kk.bpjsStatus || 'Aktif',
      issueDate: kk.issueDate || ''
    });
    setFormKkModal(true);
  };

  const handleSubmitKk = (e) => {
    e.preventDefault();
    if (!kkFormData.noKk || !kkFormData.headName) {
      alert('Nomor KK dan Nama Kepala Keluarga wajib diisi!');
      return;
    }

    if (editingKkId) {
      onUpdateFamily(editingKkId, kkFormData);
    } else {
      onAddFamily(kkFormData);
    }
    setFormKkModal(false);
  };

  const handleDeleteKk = (id, noKk, headName) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data Kartu Keluarga No. ${noKk} a.n. ${headName}? Seluruh data anggota keluarga di dalamnya juga akan terhapus.`)) {
      onDeleteFamily(id);
      if (detailKkModal && detailKkModal.id === id) {
        setDetailKkModal(null);
      }
    }
  };

  const handleOpenAddMember = (kk) => {
    setFormMemberModal(kk);
    setMemberFormData({
      nik: '',
      name: '',
      gender: 'Laki-Laki',
      birthPlace: 'Bandung',
      birthDate: '01-01-1995',
      religion: 'Islam',
      education: 'SMA / Sederajat',
      occupation: 'Wiraswasta',
      maritalStatus: 'Kawin',
      relation: 'Anak',
      bloodType: 'O',
      fatherName: kk.headName,
      motherName: '',
      phone: ''
    });
  };

  const handleSubmitMember = (e) => {
    e.preventDefault();
    if (!memberFormData.nik || !memberFormData.name) {
      alert('NIK dan Nama Anggota Keluarga wajib diisi!');
      return;
    }

    onAddMember(formMemberModal.id, memberFormData);
    setFormMemberModal(null);
    if (detailKkModal) {
      const updatedList = StorageService.getFamilies();
      const updatedTarget = updatedList.find(k => k.id === detailKkModal.id);
      setDetailKkModal(updatedTarget || null);
    }
  };

  const handleDeleteMember = (kkId, memberId, memberName) => {
    if (window.confirm(`Hapus anggota keluarga "${memberName}" dari Kartu Keluarga ini?`)) {
      onDeleteMember(kkId, memberId);
      if (detailKkModal) {
        const updatedList = StorageService.getFamilies();
        const updatedTarget = updatedList.find(k => k.id === detailKkModal.id);
        setDetailKkModal(updatedTarget || null);
      }
    }
  };

  const handlePrintKk = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* IMPORT MODAL */}
      <AdminImportKKModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onImportSuccess={onBatchImport}
      />

      {/* 1. TOP STATS BAR */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div className="stat-box" style={{ padding: '1.25rem' }}>
          <div className="stat-icon" style={{ width: '48px', height: '48px', background: '#d1fae5', color: '#059669' }}>
            <Home size={22} />
          </div>
          <div className="stat-data">
            <h3 style={{ fontSize: '1.4rem' }}>{totalKK}</h3>
            <p style={{ fontSize: '0.8rem' }}>Kepala Keluarga (KK)</p>
          </div>
        </div>

        <div className="stat-box" style={{ padding: '1.25rem' }}>
          <div className="stat-icon" style={{ width: '48px', height: '48px', background: '#e0e7ff', color: '#4338ca' }}>
            <Users size={22} />
          </div>
          <div className="stat-data">
            <h3 style={{ fontSize: '1.4rem' }}>{totalCitizens}</h3>
            <p style={{ fontSize: '0.8rem' }}>Total Warga Terdata</p>
          </div>
        </div>

        <div className="stat-box" style={{ padding: '1.25rem' }}>
          <div className="stat-icon" style={{ width: '48px', height: '48px', background: '#ccfbf1', color: '#0f766e' }}>
            <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>L/P</span>
          </div>
          <div className="stat-data">
            <h3 style={{ fontSize: '1.2rem' }}>{totalMale} / {totalFemale}</h3>
            <p style={{ fontSize: '0.8rem' }}>Laki-laki / Perempuan</p>
          </div>
        </div>

        <div className="stat-box" style={{ padding: '1.25rem' }}>
          <div className="stat-icon" style={{ width: '48px', height: '48px', background: '#fef3c7', color: '#d97706' }}>
            <HeartHandshake size={22} />
          </div>
          <div className="stat-data">
            <h3 style={{ fontSize: '1.4rem' }}>{totalDtks}</h3>
            <p style={{ fontSize: '0.8rem' }}>KK DTKS / Bansos</p>
          </div>
        </div>
      </div>

      {/* 2. VIEW MODE TOGGLE & TOOLBAR */}
      <div className="table-wrapper">
        <div className="table-toolbar">
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className={`btn btn-sm ${viewMode === 'families' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('families')}
            >
              <Home size={15} /> Data Kartu Keluarga ({totalKK})
            </button>
            <button
              className={`btn btn-sm ${viewMode === 'citizens' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('citizens')}
            >
              <Users size={15} /> Data Seluruh Penduduk ({totalCitizens})
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setImportModalOpen(true)}
              style={{ color: '#059669', borderColor: '#86efac', fontWeight: 700 }}
            >
              <FileUp size={15} /> Import Data KK (CSV / JSON)
            </button>

            {viewMode === 'families' && (
              <button className="btn btn-primary btn-sm" onClick={handleOpenAddKk}>
                <Plus size={15} /> Tambah KK Baru
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div style={{ padding: '1rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid var(--light-border)', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder={viewMode === 'families' ? "Cari No. KK / Kepala Keluarga..." : "Cari NIK / Nama Penduduk..."}
              className="form-control"
              style={{ paddingLeft: '2.5rem', height: '38px', fontSize: '0.875rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="form-control"
            style={{ width: 'auto', height: '38px', fontSize: '0.875rem' }}
            value={filterRt}
            onChange={(e) => setFilterRt(e.target.value)}
          >
            <option value="Semua">Semua RT</option>
            <option value="001">RT 001</option>
            <option value="002">RT 002</option>
            <option value="003">RT 003</option>
            <option value="004">RT 004</option>
            <option value="005">RT 005</option>
          </select>

          {viewMode === 'families' ? (
            <select
              className="form-control"
              style={{ width: 'auto', height: '38px', fontSize: '0.875rem' }}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Semua">Semua Status Ekonomi</option>
              <option value="Sejahtera">Sejahtera</option>
              <option value="Menengah">Menengah</option>
              <option value="Prasejahtera (DTKS)">Prasejahtera (DTKS)</option>
            </select>
          ) : (
            <select
              className="form-control"
              style={{ width: 'auto', height: '38px', fontSize: '0.875rem' }}
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
            >
              <option value="Semua">Semua Jenis Kelamin</option>
              <option value="Laki-Laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          )}
        </div>

        {/* 3. TABLE VIEW */}
        {viewMode === 'families' ? (
          /* FAMILIES TABLE */
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nomor Kartu Keluarga</th>
                  <th>Kepala Keluarga</th>
                  <th>Alamat & RT/RW</th>
                  <th>Jumlah Anggota</th>
                  <th>Status Ekonomi</th>
                  <th style={{ textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredFamilies.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      Tidak ada data Kartu Keluarga yang cocok.
                    </td>
                  </tr>
                ) : (
                  filteredFamilies.map((kk) => (
                    <tr key={kk.id}>
                      <td>
                        <strong style={{ color: '#059669', fontSize: '0.95rem' }}>{kk.noKk}</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Terbit: {kk.issueDate}
                        </span>
                      </td>
                      <td>
                        <strong style={{ display: 'block', fontSize: '0.95rem' }}>{kk.headName}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{kk.dusun || 'Desa Sukamaju'}</span>
                      </td>
                      <td>
                        <div>{kk.address}</div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RT {kk.rt} / RW {kk.rw}</span>
                      </td>
                      <td>
                        <span className="badge badge-info">
                          {kk.members?.length || 0} Jiwa
                        </span>
                      </td>
                      <td>
                        {kk.economicStatus?.includes('DTKS') ? (
                          <span className="badge badge-warning">★ DTKS / Bansos</span>
                        ) : (
                          <span className="badge badge-neutral">{kk.economicStatus}</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => setDetailKkModal(kk)}
                            title="Lihat & Cetak Format Kartu Keluarga Lengkap"
                          >
                            <Eye size={14} /> Detail KK
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => handleOpenAddMember(kk)}
                            title="Tambah Anggota Keluarga"
                          >
                            <UserPlus size={14} />
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => handleOpenEditKk(kk)}
                            title="Edit Data KK"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteKk(kk.id, kk.noKk, kk.headName)}
                            title="Hapus KK"
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
        ) : (
          /* CITIZENS / INDIVIDUAL TABLE */
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>NIK & Nama Lengkap</th>
                  <th>L/P & Tgl Lahir</th>
                  <th>Hubungan Keluarga</th>
                  <th>Pekerjaan & Pendidikan</th>
                  <th>Alamat & RT</th>
                  <th>No. Kartu Keluarga</th>
                </tr>
              </thead>
              <tbody>
                {filteredCitizens.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      Tidak ada data warga yang cocok.
                    </td>
                  </tr>
                ) : (
                  filteredCitizens.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <strong style={{ color: 'var(--text-main)', display: 'block' }}>{c.name}</strong>
                        <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>NIK: {c.nik}</span>
                      </td>
                      <td>
                        <span className={c.gender === 'Laki-Laki' ? 'badge badge-info' : 'badge badge-warning'}>
                          {c.gender}
                        </span>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {c.birthPlace}, {c.birthDate}
                        </span>
                      </td>
                      <td>
                        <strong>{c.relation}</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Status: {c.maritalStatus}
                        </span>
                      </td>
                      <td>
                        <div>{c.occupation}</div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.education}</span>
                      </td>
                      <td>
                        <div>{c.address}</div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RT {c.rt} / RW {c.rw}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem', color: '#0f766e', fontWeight: 600 }}>{c.noKk}</span>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>KK: {c.headName}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. MODAL DETAIL KARTU KELUARGA (OFFICIAL INDONESIA KK FORMAT) */}
      {detailKkModal && (
        <div className="modal-backdrop" onClick={() => setDetailKkModal(null)}>
          <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '980px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Home size={22} color="#059669" />
                <div>
                  <h3 className="modal-title" style={{ fontSize: '1.2rem', margin: 0 }}>
                    Kartu Keluarga No. {detailKkModal.noKk}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    Kepala Keluarga: <strong>{detailKkModal.headName}</strong> | Terbit: {detailKkModal.issueDate}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleOpenAddMember(detailKkModal)}
                >
                  <UserPlus size={15} /> Tambah Anggota
                </button>
                <button
                  className="btn btn-sm btn-accent"
                  onClick={handlePrintKk}
                >
                  <Printer size={15} /> Cetak Format KK
                </button>
                <button className="modal-close" onClick={() => setDetailKkModal(null)}>
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Printable KK Layout */}
            <div className="modal-body" style={{ background: '#f8fafc', padding: '1.5rem' }}>
              <div
                className="print-area"
                style={{
                  background: '#ffffff',
                  padding: '2.5rem 2rem',
                  borderRadius: '8px',
                  border: '2px solid #000000',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontFamily: 'Arial, sans-serif',
                  color: '#000000',
                  lineHeight: 1.4
                }}
              >
                {/* Header KK */}
                <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <h2 style={{ fontSize: '18pt', fontWeight: 'bold', textTransform: 'uppercase', margin: 0, letterSpacing: '2px' }}>
                    KARTU KELUARGA
                  </h2>
                  <h3 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '4px 0 0 0', letterSpacing: '1px' }}>
                    No. {detailKkModal.noKk}
                  </h3>
                </div>

                {/* Info Wilayah KK */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '9pt', marginBottom: '1.25rem' }}>
                  <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        <tr><td style={{ width: '35%', padding: '2px 0' }}>Nama Kepala Keluarga</td><td>: <strong>{detailKkModal.headName}</strong></td></tr>
                        <tr><td style={{ padding: '2px 0' }}>Alamat</td><td>: {detailKkModal.address}</td></tr>
                        <tr><td style={{ padding: '2px 0' }}>RT / RW</td><td>: {detailKkModal.rt} / {detailKkModal.rw}</td></tr>
                        <tr><td style={{ padding: '2px 0' }}>Dusun / Kampung</td><td>: {detailKkModal.dusun || 'Dusun Sukamaju'}</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        <tr><td style={{ width: '35%', padding: '2px 0' }}>Desa / Kelurahan</td><td>: Sukamaju Mandiri</td></tr>
                        <tr><td style={{ padding: '2px 0' }}>Kecamatan</td><td>: Harapan Makmur</td></tr>
                        <tr><td style={{ padding: '2px 0' }}>Kabupaten / Kota</td><td>: Kabupaten Nusantara</td></tr>
                        <tr><td style={{ padding: '2px 0' }}>Kode Pos / Provinsi</td><td>: {detailKkModal.postalCode} / Jawa Barat</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Tabel Anggota KK Bagian 1 */}
                <div style={{ marginBottom: '1rem', overflowX: 'auto' }}>
                  <div style={{ fontSize: '8.5pt', fontWeight: 'bold', marginBottom: '4px' }}>I. IDENTITAS ANGGOTA KELUARGA</div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8.5pt', border: '1px solid #000' }}>
                    <thead>
                      <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #000' }}>
                        <th style={{ border: '1px solid #000', padding: '6px 4px', width: '30px', textAlign: 'center' }}>No</th>
                        <th style={{ border: '1px solid #000', padding: '6px 4px' }}>Nama Lengkap</th>
                        <th style={{ border: '1px solid #000', padding: '6px 4px' }}>NIK</th>
                        <th style={{ border: '1px solid #000', padding: '6px 4px' }}>Jenis Kelamin</th>
                        <th style={{ border: '1px solid #000', padding: '6px 4px' }}>Tempat Lahir</th>
                        <th style={{ border: '1px solid #000', padding: '6px 4px' }}>Tgl Lahir</th>
                        <th style={{ border: '1px solid #000', padding: '6px 4px' }}>Agama</th>
                        <th style={{ border: '1px solid #000', padding: '6px 4px' }}>Pendidikan</th>
                        <th style={{ border: '1px solid #000', padding: '6px 4px' }}>Jenis Pekerjaan</th>
                        <th style={{ border: '1px solid #000', padding: '6px 4px', width: '35px', textAlign: 'center' }}>Gol</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailKkModal.members?.map((m, idx) => (
                        <tr key={m.id}>
                          <td style={{ border: '1px solid #000', padding: '6px 4px', textAlign: 'center' }}>{idx + 1}</td>
                          <td style={{ border: '1px solid #000', padding: '6px 4px', fontWeight: 'bold' }}>{m.name}</td>
                          <td style={{ border: '1px solid #000', padding: '6px 4px' }}>{m.nik}</td>
                          <td style={{ border: '1px solid #000', padding: '6px 4px' }}>{m.gender}</td>
                          <td style={{ border: '1px solid #000', padding: '6px 4px' }}>{m.birthPlace}</td>
                          <td style={{ border: '1px solid #000', padding: '6px 4px' }}>{m.birthDate}</td>
                          <td style={{ border: '1px solid #000', padding: '6px 4px' }}>{m.religion}</td>
                          <td style={{ border: '1px solid #000', padding: '6px 4px' }}>{m.education}</td>
                          <td style={{ border: '1px solid #000', padding: '6px 4px' }}>{m.occupation}</td>
                          <td style={{ border: '1px solid #000', padding: '6px 4px', textAlign: 'center' }}>{m.bloodType || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Tabel Anggota KK Bagian 2 */}
                <div style={{ marginBottom: '1.5rem', overflowX: 'auto' }}>
                  <div style={{ fontSize: '8.5pt', fontWeight: 'bold', marginBottom: '4px' }}>II. STATUS PERNIKAHAN & HUBUNGAN KELUARGA</div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8.5pt', border: '1px solid #000' }}>
                    <thead>
                      <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #000' }}>
                        <th style={{ border: '1px solid #000', padding: '6px 4px', width: '30px', textAlign: 'center' }}>No</th>
                        <th style={{ border: '1px solid #000', padding: '6px 4px' }}>Status Perkawinan</th>
                        <th style={{ border: '1px solid #000', padding: '6px 4px' }}>Hubungan Dalam Keluarga</th>
                        <th style={{ border: '1px solid #000', padding: '6px 4px' }}>Kewarganegaraan</th>
                        <th style={{ border: '1px solid #000', padding: '6px 4px' }}>Nama Ayah</th>
                        <th style={{ border: '1px solid #000', padding: '6px 4px' }}>Nama Ibu</th>
                        <th style={{ border: '1px solid #000', padding: '6px 4px', textAlign: 'center' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailKkModal.members?.map((m, idx) => (
                        <tr key={m.id}>
                          <td style={{ border: '1px solid #000', padding: '6px 4px', textAlign: 'center' }}>{idx + 1}</td>
                          <td style={{ border: '1px solid #000', padding: '6px 4px' }}>{m.maritalStatus}</td>
                          <td style={{ border: '1px solid #000', padding: '6px 4px', fontWeight: 'bold' }}>{m.relation}</td>
                          <td style={{ border: '1px solid #000', padding: '6px 4px' }}>WNI</td>
                          <td style={{ border: '1px solid #000', padding: '6px 4px' }}>{m.fatherName || '-'}</td>
                          <td style={{ border: '1px solid #000', padding: '6px 4px' }}>{m.motherName || '-'}</td>
                          <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>
                            <button
                              className="btn btn-sm btn-danger"
                              style={{ padding: '2px 6px', fontSize: '0.75rem' }}
                              onClick={() => handleDeleteMember(detailKkModal.id, m.id, m.name)}
                              title="Hapus Anggota"
                            >
                              <Trash2 size={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer Tanda Tangan KK */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9pt', marginTop: '1.5rem', textAlign: 'center' }}>
                  <div style={{ width: '220px' }}>
                    <p style={{ margin: 0 }}>KEPALA KELUARGA,</p>
                    <div style={{ height: '55px' }}></div>
                    <p style={{ margin: 0, fontWeight: 'bold', textDecoration: 'underline' }}>{detailKkModal.headName}</p>
                  </div>

                  <div style={{ width: '220px' }}>
                    <p style={{ margin: 0 }}>Dikeluarkan di: Sukamaju</p>
                    <p style={{ margin: '2px 0 0 0' }}>Pada Tanggal: {detailKkModal.issueDate}</p>
                    <p style={{ margin: '2px 0 0 0', fontWeight: 'bold' }}>KEPALA DESA SUKAMAJU MANDIRI</p>
                    <div style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '8pt', color: '#059669', fontStyle: 'italic' }}>[ TTE Terverifikasi ]</span>
                    </div>
                    <p style={{ margin: 0, fontWeight: 'bold', textDecoration: 'underline' }}>
                      {profile?.headOfVillage?.name || 'H. Budi Santoso, S.AP'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDetailKkModal(null)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL TAMBAH / EDIT KARTU KELUARGA */}
      {formKkModal && (
        <div className="modal-backdrop" onClick={() => setFormKkModal(false)}>
          <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.2rem' }}>
                {editingKkId ? 'Edit Data Kartu Keluarga' : 'Tambah Kartu Keluarga Baru'}
              </h3>
              <button className="modal-close" onClick={() => setFormKkModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmitKk}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nomor Kartu Keluarga (16 Digit) *</label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      placeholder="Contoh: 3204150801120001"
                      className="form-control"
                      value={kkFormData.noKk}
                      onChange={(e) => setKkFormData({ ...kkFormData, noKk: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nama Kepala Keluarga *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Bambang Sudrajat"
                      className="form-control"
                      value={kkFormData.headName}
                      onChange={(e) => setKkFormData({ ...kkFormData, headName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Alamat Lengkap Rumah *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kp. Pasir Salam No. 14"
                    className="form-control"
                    value={kkFormData.address}
                    onChange={(e) => setKkFormData({ ...kkFormData, address: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">RT (3 Digit)</label>
                    <input
                      type="text"
                      placeholder="001"
                      className="form-control"
                      value={kkFormData.rt}
                      onChange={(e) => setKkFormData({ ...kkFormData, rt: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">RW (3 Digit)</label>
                    <input
                      type="text"
                      placeholder="001"
                      className="form-control"
                      value={kkFormData.rw}
                      onChange={(e) => setKkFormData({ ...kkFormData, rw: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nama Dusun / Wilayah</label>
                    <input
                      type="text"
                      placeholder="Contoh: Dusun Pasirjati"
                      className="form-control"
                      value={kkFormData.dusun}
                      onChange={(e) => setKkFormData({ ...kkFormData, dusun: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status Ekonomi / DTKS *</label>
                    <select
                      className="form-control"
                      value={kkFormData.economicStatus}
                      onChange={(e) => setKkFormData({ ...kkFormData, economicStatus: e.target.value })}
                    >
                      <option value="Sejahtera">Sejahtera</option>
                      <option value="Menengah">Menengah</option>
                      <option value="Prasejahtera (DTKS)">Prasejahtera (Penerima DTKS/Bansos)</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Status Jaminan BPJS</label>
                    <input
                      type="text"
                      placeholder="Aktif (Mandiri / PBI APBD)"
                      className="form-control"
                      value={kkFormData.bpjsStatus}
                      onChange={(e) => setKkFormData({ ...kkFormData, bpjsStatus: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tanggal Penerbitan KK</label>
                    <input
                      type="text"
                      placeholder="12 Januari 2024"
                      className="form-control"
                      value={kkFormData.issueDate}
                      onChange={(e) => setKkFormData({ ...kkFormData, issueDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setFormKkModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingKkId ? 'Simpan Perubahan KK' : 'Tambah Kartu Keluarga'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL TAMBAH ANGGOTA KELUARGA */}
      {formMemberModal && (
        <div className="modal-backdrop" onClick={() => setFormMemberModal(null)}>
          <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.2rem' }}>
                Tambah Anggota ke KK No. {formMemberModal.noKk}
              </h3>
              <button className="modal-close" onClick={() => setFormMemberModal(null)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmitMember}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">NIK Anggota (16 Digit) *</label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      placeholder="Contoh: 3204151208850002"
                      className="form-control"
                      value={memberFormData.nik}
                      onChange={(e) => setMemberFormData({ ...memberFormData, nik: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama lengkap sesuai akta/KTP"
                      className="form-control"
                      value={memberFormData.name}
                      onChange={(e) => setMemberFormData({ ...memberFormData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Jenis Kelamin *</label>
                    <select
                      className="form-control"
                      value={memberFormData.gender}
                      onChange={(e) => setMemberFormData({ ...memberFormData, gender: e.target.value })}
                    >
                      <option value="Laki-Laki">Laki-Laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hubungan Dalam Keluarga *</label>
                    <select
                      className="form-control"
                      value={memberFormData.relation}
                      onChange={(e) => setMemberFormData({ ...memberFormData, relation: e.target.value })}
                    >
                      <option value="Kepala Keluarga">Kepala Keluarga</option>
                      <option value="Istri">Istri</option>
                      <option value="Anak">Anak</option>
                      <option value="Orang Tua">Orang Tua</option>
                      <option value="Famili Lain">Famili Lain</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Tempat Lahir</label>
                    <input
                      type="text"
                      placeholder="Bandung"
                      className="form-control"
                      value={memberFormData.birthPlace}
                      onChange={(e) => setMemberFormData({ ...memberFormData, birthPlace: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tanggal Lahir (DD-MM-YYYY)</label>
                    <input
                      type="text"
                      placeholder="12-08-1990"
                      className="form-control"
                      value={memberFormData.birthDate}
                      onChange={(e) => setMemberFormData({ ...memberFormData, birthDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Agama</label>
                    <select
                      className="form-control"
                      value={memberFormData.religion}
                      onChange={(e) => setMemberFormData({ ...memberFormData, religion: e.target.value })}
                    >
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen Protestan</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Buddha">Buddha</option>
                      <option value="Konghucu">Konghucu</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pendidikan Terakhir</label>
                    <select
                      className="form-control"
                      value={memberFormData.education}
                      onChange={(e) => setMemberFormData({ ...memberFormData, education: e.target.value })}
                    >
                      <option value="Belum Sekolah">Belum Sekolah</option>
                      <option value="SD / Sederajat">SD / Sederajat</option>
                      <option value="SMP / Sederajat">SMP / Sederajat</option>
                      <option value="SMA / Sederajat">SMA / Sederajat</option>
                      <option value="Diploma (D3)">Diploma (D3)</option>
                      <option value="Sarjana (S1)">Sarjana (S1)</option>
                      <option value="Magister (S2)">Magister (S2)</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Jenis Pekerjaan</label>
                    <input
                      type="text"
                      placeholder="Petani, Wiraswasta, Karyawan, Pelajar, dll."
                      className="form-control"
                      value={memberFormData.occupation}
                      onChange={(e) => setMemberFormData({ ...memberFormData, occupation: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status Perkawinan</label>
                    <select
                      className="form-control"
                      value={memberFormData.maritalStatus}
                      onChange={(e) => setMemberFormData({ ...memberFormData, maritalStatus: e.target.value })}
                    >
                      <option value="Belum Kawin">Belum Kawin</option>
                      <option value="Kawin">Kawin</option>
                      <option value="Cerai Hidup">Cerai Hidup</option>
                      <option value="Cerai Mati">Cerai Mati</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nama Ayah Kandung</label>
                    <input
                      type="text"
                      placeholder="Nama ayah"
                      className="form-control"
                      value={memberFormData.fatherName}
                      onChange={(e) => setMemberFormData({ ...memberFormData, fatherName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nama Ibu Kandung</label>
                    <input
                      type="text"
                      placeholder="Nama ibu"
                      className="form-control"
                      value={memberFormData.motherName}
                      onChange={(e) => setMemberFormData({ ...memberFormData, motherName: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setFormMemberModal(null)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Simpan Anggota Keluarga
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
