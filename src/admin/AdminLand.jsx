import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Printer, 
  Building, 
  CheckCircle2, 
  X, 
  Save, 
  Layers, 
  Sparkles,
  MapPin,
  History,
  Eye
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function AdminLand({ profile }) {
  const [activeSubTab, setActiveSubTab] = useState('letterC'); // 'letterC', 'kasDesa'
  const [searchQuery, setSearchQuery] = useState('');
  
  const [landData, setLandData] = useState(() => StorageService.getLandData() || { letterCList: [], kasDesaList: [] });

  // Modal Letter C
  const [cModalOpen, setCModalOpen] = useState(false);
  const [editingCId, setEditingCId] = useState(null);
  const [cForm, setCForm] = useState({
    kohirNumber: '',
    ownerName: '',
    currentOwner: '',
    persilNumber: '',
    block: 'Blok Pasir 1',
    areaM2: 1000,
    landClass: 'S.I (Sawah Kelas I)',
    taxNumber: '',
    status: 'Hak Milik Adat (Letter C)'
  });

  // Modal Mutasi Tanah
  const [mutationModalOpen, setMutationModalOpen] = useState(false);
  const [selectedCForMutation, setSelectedCForMutation] = useState(null);
  const [mutationForm, setMutationForm] = useState({
    cause: 'Jual Beli ke ...',
    luasM2: 500,
    noBAP: 'AJB No. ...'
  });

  // Modal Kas Desa
  const [tkdModalOpen, setTkdModalOpen] = useState(false);
  const [tkdForm, setTkdForm] = useState({
    name: '',
    location: 'Dusun Pasirjati',
    areaM2: 5000,
    peruntukan: 'Bengkok Kepala Desa',
    certificate: 'Sertifikat Hak Pakai Pemdes',
    annualIncome: 'Rp 10.000.000',
    manager: 'Pemerintah Desa'
  });

  const letterCList = landData.letterCList || [];
  const kasDesaList = landData.kasDesaList || [];

  const totalLuasLetterC = letterCList.reduce((acc, c) => acc + (c.areaM2 || 0), 0);
  const totalLuasTKD = kasDesaList.reduce((acc, t) => acc + (t.areaM2 || 0), 0);

  const filteredLetterC = letterCList.filter(c => 
    c.ownerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.currentOwner?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.kohirNumber?.includes(searchQuery) ||
    c.persilNumber?.includes(searchQuery)
  );

  const handleOpenAddC = () => {
    setEditingCId(null);
    setCForm({
      kohirNumber: `1${Math.floor(100 + Math.random() * 900)}`,
      ownerName: '',
      currentOwner: '',
      persilNumber: `${Math.floor(10 + Math.random() * 90)}`,
      block: 'Blok Pasir 1',
      areaM2: 1500,
      landClass: 'S.I (Sawah Kelas I)',
      taxNumber: '32.04.150...',
      status: 'Hak Milik Adat (Letter C)'
    });
    setCModalOpen(true);
  };

  const handleSaveC = (e) => {
    e.preventDefault();
    if (!cForm.ownerName || !cForm.kohirNumber) {
      alert('Nama Pemilik dan Nomor Kohir wajib diisi!');
      return;
    }

    const payload = {
      ...cForm,
      currentOwner: cForm.currentOwner || cForm.ownerName,
      areaM2: parseInt(cForm.areaM2) || 0
    };

    if (editingCId) {
      StorageService.updateLetterC(editingCId, payload);
    } else {
      StorageService.addLetterC(payload);
    }

    setLandData(StorageService.getLandData());
    setCModalOpen(false);
  };

  const handleDeleteC = (id) => {
    if (window.confirm('Hapus register Buku Letter C ini?')) {
      StorageService.deleteLetterC(id);
      setLandData(StorageService.getLandData());
    }
  };

  const handleOpenMutation = (item) => {
    setSelectedCForMutation(item);
    setMutationForm({
      cause: 'Jual Beli Sebagian',
      luasM2: Math.round(item.areaM2 / 2),
      noBAP: `AJB No. ${Math.floor(10 + Math.random() * 90)}/${new Date().getFullYear()}`
    });
    setMutationModalOpen(true);
  };

  const handleSaveMutation = (e) => {
    e.preventDefault();
    if (selectedCForMutation) {
      StorageService.addLandMutation(selectedCForMutation.id, mutationForm);
      setLandData(StorageService.getLandData());
      setMutationModalOpen(false);
    }
  };

  const handleSaveTkd = (e) => {
    e.preventDefault();
    StorageService.addKasDesa({
      ...tkdForm,
      areaM2: parseInt(tkdForm.areaM2) || 0
    });
    setLandData(StorageService.getLandData());
    setTkdModalOpen(false);
  };

  const handleDeleteTkd = (id) => {
    if (window.confirm('Hapus aset Tanah Kas Desa ini?')) {
      StorageService.deleteKasDesa(id);
      setLandData(StorageService.getLandData());
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', borderLeft: '4px solid #059669' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>REGISTER LETTER C DESA</span>
            <FileText size={16} color="#059669" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', margin: '4px 0' }}>
            {letterCList.length} Kohir
          </div>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            Total Luas: <strong>{(totalLuasLetterC / 10000).toFixed(2)} Ha</strong> ({totalLuasLetterC.toLocaleString('id-ID')} m²)
          </span>
        </div>

        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', borderLeft: '4px solid #2563eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>TANAH KAS DESA (TKD)</span>
            <Building size={16} color="#2563eb" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563eb', margin: '4px 0' }}>
            {kasDesaList.length} Persil Aset
          </div>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            Total Luas: <strong>{(totalLuasTKD / 10000).toFixed(2)} Ha</strong> ({totalLuasTKD.toLocaleString('id-ID')} m²)
          </span>
        </div>
      </div>

      {/* 2. Sub Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={`btn btn-sm ${activeSubTab === 'letterC' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('letterC')}
          style={{ fontWeight: 700 }}
        >
          <FileText size={14} /> Buku Letter C / Kohir Desa ({letterCList.length})
        </button>
        <button
          type="button"
          className={`btn btn-sm ${activeSubTab === 'kasDesa' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('kasDesa')}
          style={{ fontWeight: 700 }}
        >
          <Building size={14} /> Inventaris Tanah Kas Desa & Bengkok ({kasDesaList.length})
        </button>
      </div>

      {/* 3. TAB 1: BUKU LETTER C */}
      {activeSubTab === 'letterC' && (
        <div className="table-wrapper">
          <div className="table-toolbar" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={18} color="#059669" /> Buku Letter C / Daftar Kohir Pertanahan Desa (Buku Tanah Desa)
              </h3>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Kutipan buku C pertanahan, riwayat mutasi peralihan hak (waris, hibah, jual beli).
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ position: 'relative', width: '220px' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Cari Kohir, Nama Pemilik..."
                  className="form-control"
                  style={{ paddingLeft: '2rem', height: '34px', fontSize: '0.8rem' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleOpenAddC}
                style={{ fontWeight: 700 }}
              >
                <Plus size={14} /> Tambah Register C
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>No. Kohir / C</th>
                  <th>Nama Pemilik Awal & Pemilik Sekarang</th>
                  <th>Persil & Blok</th>
                  <th>Kelas & Luas Tanah</th>
                  <th>Status Alas Hak</th>
                  <th>Riwayat Mutasi</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredLetterC.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <span className="badge badge-success" style={{ fontSize: '0.85rem', fontWeight: 900 }}>
                        C. {c.kohirNumber}
                      </span>
                    </td>
                    <td>
                      <strong style={{ fontSize: '0.875rem', color: 'var(--text-main)', display: 'block' }}>
                        {c.ownerName}
                      </strong>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                        Saat ini: {c.currentOwner}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)', display: 'block' }}>
                        Persil {c.persilNumber}
                      </span>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                        {c.block}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)' }}>
                        {c.areaM2.toLocaleString('id-ID')} m²
                      </span>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'block' }}>
                        {c.landClass}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {(c.mutations || []).length} Mutasi
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.25rem 0.45rem', fontSize: '0.7rem' }}
                          title="Tambah Mutasi Peralihan"
                          onClick={() => handleOpenMutation(c)}
                        >
                          <History size={13} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm"
                          style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '0.25rem 0.45rem' }}
                          onClick={() => handleDeleteC(c.id)}
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

      {/* 4. TAB 2: TANAH KAS DESA */}
      {activeSubTab === 'kasDesa' && (
        <div className="table-wrapper">
          <div className="table-toolbar">
            <div>
              <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Building size={18} color="#2563eb" /> Daftar Inventaris Tanah Kas Desa (TKD) & Bengkok
              </h3>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Aset tanah milik pemerintah desa untuk bengkok pamong, fasilitas umum, dan pendapatan desa.
              </span>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setTkdModalOpen(true)}
              style={{ fontWeight: 700 }}
            >
              <Plus size={14} /> Tambah Aset TKD
            </button>
          </div>

          <div style={{ padding: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {kasDesaList.map((tkd) => (
                <div
                  key={tkd.id}
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
                        {tkd.location}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm"
                        style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '0.2rem 0.4rem' }}
                        onClick={() => handleDeleteTkd(tkd.id)}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.35rem 0' }}>
                      {tkd.name}
                    </h4>

                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#059669', marginBottom: '0.4rem' }}>
                      Luas: {tkd.areaM2.toLocaleString('id-ID')} m² ({(tkd.areaM2 / 10000).toFixed(2)} Ha)
                    </div>

                    <p style={{ fontSize: '0.775rem', color: 'var(--text-body)', margin: '0 0 0.5rem 0' }}>
                      📋 <strong>Peruntukan:</strong> {tkd.peruntukan}<br />
                      📜 <strong>Sertifikat:</strong> {tkd.certificate}
                    </p>
                  </div>

                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', borderTop: '1px solid var(--light-border)', paddingTop: '0.5rem' }}>
                    Pengelola: <strong>{tkd.manager}</strong> ({tkd.annualIncome})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL TAMBAH LETTER C */}
      {cModalOpen && (
        <div className="modal-backdrop open" onClick={() => setCModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                Tambah Register Buku Letter C
              </h3>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setCModalOpen(false)}>
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleSaveC} style={{ padding: '1.25rem' }}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nomor Kohir / C *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 1045"
                    className="form-control"
                    value={cForm.kohirNumber}
                    onChange={(e) => setCForm({ ...cForm, kohirNumber: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nomor Persil</label>
                  <input
                    type="text"
                    placeholder="Contoh: 28"
                    className="form-control"
                    value={cForm.persilNumber}
                    onChange={(e) => setCForm({ ...cForm, persilNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Nama Pemilik Awal *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Pemilik Terdaftar di Letter C"
                  className="form-control"
                  value={cForm.ownerName}
                  onChange={(e) => setCForm({ ...cForm, ownerName: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Luas Tanah (m²) *</label>
                  <input
                    type="number"
                    required
                    placeholder="1500"
                    className="form-control"
                    value={cForm.areaM2}
                    onChange={(e) => setCForm({ ...cForm, areaM2: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Kelas Tanah</label>
                  <select
                    className="form-control"
                    value={cForm.landClass}
                    onChange={(e) => setCForm({ ...cForm, landClass: e.target.value })}
                  >
                    <option value="S.I (Sawah Kelas I)">S.I (Sawah Kelas I)</option>
                    <option value="S.II (Sawah Kelas II)">S.II (Sawah Kelas II)</option>
                    <option value="D.I (Darat Kelas I)">D.I (Darat Kelas I / Pekarangan)</option>
                    <option value="D.II (Darat Kelas II)">D.II (Darat Kelas II)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Lokasi Blok Tanah</label>
                <input
                  type="text"
                  placeholder="Contoh: Blok Pasir 1"
                  className="form-control"
                  value={cForm.block}
                  onChange={(e) => setCForm({ ...cForm, block: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--light-border)' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setCModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 700 }}>
                  <Save size={13} /> Simpan Letter C
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL MUTASI TANAH */}
      {mutationModalOpen && selectedCForMutation && (
        <div className="modal-backdrop open" onClick={() => setMutationModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                Tambah Mutasi: Kohir C. {selectedCForMutation.kohirNumber} ({selectedCForMutation.ownerName})
              </h3>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setMutationModalOpen(false)}>
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleSaveMutation} style={{ padding: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Sebab Peralihan / Mutasi</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Jual Beli ke Bpk. Ahmad"
                  className="form-control"
                  value={mutationForm.cause}
                  onChange={(e) => setMutationForm({ ...mutationForm, cause: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Luas Tanah yang Dimutasi (m²)</label>
                <input
                  type="number"
                  required
                  className="form-control"
                  value={mutationForm.luasM2}
                  onChange={(e) => setMutationForm({ ...mutationForm, luasM2: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nomor Dokumen / Akta / BAP</label>
                <input
                  type="text"
                  placeholder="Contoh: AJB PPAT No. 24/2026"
                  className="form-control"
                  value={mutationForm.noBAP}
                  onChange={(e) => setMutationForm({ ...mutationForm, noBAP: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--light-border)' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setMutationModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 700 }}>
                  <Save size={13} /> Simpan Catatan Mutasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. MODAL TKD */}
      {tkdModalOpen && (
        <div className="modal-backdrop open" onClick={() => setTkdModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                Tambah Inventaris Tanah Kas Desa (TKD)
              </h3>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setTkdModalOpen(false)}>
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleSaveTkd} style={{ padding: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Nama / Sebutan Aset TKD *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Tanah Bengkok Sekretaris Desa"
                  className="form-control"
                  value={tkdForm.name}
                  onChange={(e) => setTkdForm({ ...tkdForm, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Luas Aset (m²)</label>
                  <input
                    type="number"
                    required
                    placeholder="10000"
                    className="form-control"
                    value={tkdForm.areaM2}
                    onChange={(e) => setTkdForm({ ...tkdForm, areaM2: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Lokasi Dusun</label>
                  <input
                    type="text"
                    placeholder="Dusun Pasirjati"
                    className="form-control"
                    value={tkdForm.location}
                    onChange={(e) => setTkdForm({ ...tkdForm, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Peruntukan Penggunaan</label>
                <input
                  type="text"
                  placeholder="Bengkok / Fasilitas Umum / Pertanian"
                  className="form-control"
                  value={tkdForm.peruntukan}
                  onChange={(e) => setTkdForm({ ...tkdForm, peruntukan: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--light-border)' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setTkdModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 700 }}>
                  <Save size={13} /> Simpan Aset TKD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
