import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Plus, 
  Filter, 
  FileText, 
  Printer, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Save, 
  Users, 
  CreditCard,
  MessageCircle,
  Download,
  Calendar
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function AdminBansos({ profile }) {
  const [bansosList, setBansosList] = useState(() => StorageService.getBansosList() || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('ALL');
  const [selectedDesil, setSelectedDesil] = useState('ALL');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nik: '',
    nokk: '',
    name: '',
    dusun: 'Dusun Pasirjati',
    rt: '01',
    rw: '01',
    desil: 'Desil 1 (Sangat Miskin)',
    program: 'BLT Dana Desa (BLT-DD)',
    amount: 300000,
    status: 'TERVERIFIKASI',
    period: 'Tahap 3 (Juli - September 2026)',
    bankAccount: 'Tunai di Balai Desa',
    notes: '',
    phone: ''
  });

  // Print BA / Tanda Terima Modal state
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [printKpm, setPrintKpm] = useState(null);

  const programs = [
    'Semua Program',
    'BLT Dana Desa (BLT-DD)',
    'Program Keluarga Harapan (PKH)',
    'Bantuan Pangan Non Tunai (BPNT / Sembako)',
    'Beras Cadangan Pangan Pemerintah (CPP 10 Kg)',
    'Penerima Bantuan Iuran BPJS (PBI-JK)'
  ];

  const formatRupiah = (num) => {
    if (!num) return 'Natura / Beras 10 Kg';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const filteredList = bansosList.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.nik.includes(searchQuery) ||
                        item.nokk.includes(searchQuery) ||
                        item.dusun.toLowerCase().includes(searchQuery.toLowerCase());
    const matchProg = selectedProgram === 'ALL' || item.program === selectedProgram;
    const matchDesil = selectedDesil === 'ALL' || item.desil.includes(selectedDesil);
    return matchSearch && matchProg && matchDesil;
  });

  // Stats
  const bltDdCount = bansosList.filter(b => b.program.includes('BLT')).length;
  const pkhCount = bansosList.filter(b => b.program.includes('PKH')).length;
  const bpntCount = bansosList.filter(b => b.program.includes('BPNT')).length;
  const totalDanaDisalurkan = bansosList.reduce((acc, b) => acc + (b.amount || 0), 0);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      nik: '',
      nokk: '',
      name: '',
      dusun: 'Dusun Pasirjati',
      rt: '01',
      rw: '01',
      desil: 'Desil 1 (Sangat Miskin)',
      program: 'BLT Dana Desa (BLT-DD)',
      amount: 300000,
      status: 'TERVERIFIKASI',
      period: 'Tahap 3 (Juli - September 2026)',
      bankAccount: 'Tunai di Balai Desa',
      notes: '',
      phone: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setFormData({ ...item });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.nik) {
      alert('Nama dan NIK wajib diisi!');
      return;
    }

    if (editingId) {
      const updated = StorageService.updateBansosKpm(editingId, formData);
      setBansosList(StorageService.getBansosList());
    } else {
      StorageService.addBansosKpm(formData);
      setBansosList(StorageService.getBansosList());
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus penerima bansos ini dari daftar KPM?')) {
      StorageService.deleteBansosKpm(id);
      setBansosList(StorageService.getBansosList());
    }
  };

  const handleSendWhatsApp = (kpm) => {
    if (!kpm.phone) {
      alert('Nomor HP/WhatsApp KPM ini belum tercatat!');
      return;
    }
    const cleanPhone = kpm.phone.replace(/\D/g, '');
    const phoneFormatted = cleanPhone.startsWith('0') ? `62${cleanPhone.slice(1)}` : cleanPhone;
    const msg = `Halo Bpk/Ibu *${kpm.name}*,\n\nKami menginformasikan dari Pemerintah Desa *${profile?.name || 'Sukamaju'}* bahwa Anda terdaftar sebagai penerima program *${kpm.program}* untuk periode *${kpm.period}* sebesar *${formatRupiah(kpm.amount)}*.\n\nPengambilan dapat dilakukan di Balai Desa dengan membawa KTP dan KK Asli. Layanan ini bebas potongan 100%.\n\nTerima kasih.`;
    window.open(`https://wa.me/${phoneFormatted}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handlePrintReceipt = (kpm) => {
    setPrintKpm(kpm);
    setPrintModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. Header & Quick Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>TOTAL KPM TERVERIFIKASI</span>
            <Users size={16} color="#059669" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', margin: '4px 0' }}>
            {bansosList.length} KK
          </div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
            Terdaftar di Database Bansos Desa
          </span>
        </div>

        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>BLT DANA DESA (BLT-DD)</span>
            <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>Desil 1</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#dc2626', margin: '4px 0' }}>
            {bltDdCount} KPM
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Anggaran APBDes Pos DDS T.A. 2026
          </span>
        </div>

        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>PKH & BPNT KEMENSOS</span>
            <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>Pusat</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#d97706', margin: '4px 0' }}>
            {pkhCount + bpntCount} KPM
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Penyaluran via Bank Himbara & Pos
          </span>
        </div>

        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>TOTAL NOMINAL SALUR (TAHAP 3)</span>
            <CreditCard size={16} color="#2563eb" />
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2563eb', margin: '4px 0' }}>
            {formatRupiah(totalDanaDisalurkan)}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Akuntabel & Tepat Sasaran
          </span>
        </div>
      </div>

      {/* 2. Main Content Card */}
      <div className="table-wrapper">
        <div className="table-toolbar" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={18} color="#059669" /> Daftar Keluarga Penerima Manfaat (KPM Bansos)
            </h3>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              Data terpadu verifikasi bansos APBDes & sinkronisasi bansos reguler Kemensos RI.
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
              onClick={handleOpenAdd}
              style={{ fontWeight: 700 }}
            >
              <Plus size={14} /> Tambah Data KPM
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--light-border)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', background: 'var(--bg-main)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>Program:</span>
          <select
            className="form-control"
            style={{ height: '30px', fontSize: '0.75rem', padding: '0.2rem 0.5rem', width: 'auto' }}
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
          >
            <option value="ALL">Semua Program Bansos</option>
            <option value="BLT Dana Desa (BLT-DD)">BLT Dana Desa (BLT-DD)</option>
            <option value="Program Keluarga Harapan (PKH)">Program Keluarga Harapan (PKH)</option>
            <option value="Bantuan Pangan Non Tunai (BPNT / Sembako)">BPNT / Sembako</option>
            <option value="Beras Cadangan Pangan Pemerintah (CPP 10 Kg)">Beras CPP 10 Kg</option>
          </select>

          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginLeft: '0.5rem' }}>Desil DTKS:</span>
          <select
            className="form-control"
            style={{ height: '30px', fontSize: '0.75rem', padding: '0.2rem 0.5rem', width: 'auto' }}
            value={selectedDesil}
            onChange={(e) => setSelectedDesil(e.target.value)}
          >
            <option value="ALL">Semua Desil</option>
            <option value="Desil 1">Desil 1 (Sangat Miskin)</option>
            <option value="Desil 2">Desil 2 (Tidak Mampu)</option>
            <option value="Desil 3">Desil 3 (Kurang Mampu)</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama KPM & NIK / KK</th>
                <th>Wilayah & Desil</th>
                <th>Program Bantuan</th>
                <th>Nominal Salur</th>
                <th>Status Verifikasi</th>
                <th style={{ textAlign: 'center' }}>Aksi & Notifikasi</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    Tidak ada data KPM penerima bansos yang cocok dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredList.map((kpm, idx) => (
                  <tr key={kpm.id}>
                    <td>{idx + 1}</td>
                    <td>
                      <strong style={{ fontSize: '0.875rem', color: 'var(--text-main)', display: 'block' }}>
                        {kpm.name}
                      </strong>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                        NIK: {kpm.nik} • KK: {kpm.nokk}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block' }}>
                        {kpm.dusun} (RT {kpm.rt} / RW {kpm.rw})
                      </span>
                      <span className="badge badge-neutral" style={{ fontSize: '0.675rem' }}>
                        {kpm.desil}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--primary)' }}>
                        {kpm.program}
                      </span>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'block' }}>
                        {kpm.period}
                      </span>
                    </td>
                    <td>
                      <strong style={{ fontSize: '0.875rem', color: '#059669' }}>
                        {formatRupiah(kpm.amount)}
                      </strong>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>
                        {kpm.bankAccount}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                        <CheckCircle2 size={11} /> {kpm.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                        <button
                          type="button"
                          className="btn btn-sm"
                          style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '0.25rem 0.45rem' }}
                          title="Cetak Tanda Terima Salur"
                          onClick={() => handlePrintReceipt(kpm)}
                        >
                          <Printer size={13} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm"
                          style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac', padding: '0.25rem 0.45rem' }}
                          title="Kirim Pesan WhatsApp"
                          onClick={() => handleSendWhatsApp(kpm)}
                        >
                          <MessageCircle size={13} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.25rem 0.45rem' }}
                          title="Edit Data KPM"
                          onClick={() => handleOpenEdit(kpm)}
                        >
                          <Edit size={13} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm"
                          style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '0.25rem 0.45rem' }}
                          title="Hapus KPM"
                          onClick={() => handleDelete(kpm.id)}
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

      {/* 3. MODAL TAMBAH / EDIT KPM */}
      {modalOpen && (
        <div className="modal-backdrop open" onClick={() => setModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                {editingId ? 'Edit Data Keluarga Penerima Manfaat (KPM)' : 'Tambah KPM Bansos Baru'}
              </h3>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setModalOpen(false)}>
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '1.25rem' }}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nomor Induk Kependudukan (NIK) *</label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="16 Digit NIK KTP"
                    className="form-control"
                    value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nomor Kartu Keluarga (No. KK) *</label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="16 Digit No. KK"
                    className="form-control"
                    value={formData.nokk}
                    onChange={(e) => setFormData({ ...formData, nokk: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Nama Lengkap Kepala Keluarga / Penerima *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Wilayah Dusun</label>
                  <select
                    className="form-control"
                    value={formData.dusun}
                    onChange={(e) => setFormData({ ...formData, dusun: e.target.value })}
                  >
                    <option value="Dusun Pasirjati">Dusun Pasirjati</option>
                    <option value="Dusun Sukarame">Dusun Sukarame</option>
                    <option value="Dusun Cikembar">Dusun Cikembar</option>
                    <option value="Dusun Mekar">Dusun Mekar</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">RT / RW</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder="RT 01"
                      className="form-control"
                      value={formData.rt}
                      onChange={(e) => setFormData({ ...formData, rt: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="RW 01"
                      className="form-control"
                      value={formData.rw}
                      onChange={(e) => setFormData({ ...formData, rw: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Klasifikasi Desil DTKS</label>
                  <select
                    className="form-control"
                    value={formData.desil}
                    onChange={(e) => setFormData({ ...formData, desil: e.target.value })}
                  >
                    <option value="Desil 1 (Sangat Miskin)">Desil 1 (Sangat Miskin / Ekstrem)</option>
                    <option value="Desil 2 (Tidak Mampu)">Desil 2 (Tidak Mampu / Miskin)</option>
                    <option value="Desil 3 (Kurang Mampu)">Desil 3 (Kurang Mampu / Rentan)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Program Bantuan *</label>
                  <select
                    className="form-control"
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  >
                    <option value="BLT Dana Desa (BLT-DD)">BLT Dana Desa (BLT-DD)</option>
                    <option value="Program Keluarga Harapan (PKH)">Program Keluarga Harapan (PKH)</option>
                    <option value="Bantuan Pangan Non Tunai (BPNT / Sembako)">BPNT / Sembako</option>
                    <option value="Beras Cadangan Pangan Pemerintah (CPP 10 Kg)">Beras CPP 10 Kg</option>
                    <option value="Penerima Bantuan Iuran BPJS (PBI-JK)">BPJS Kesehatan PBI-JK</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nominal Salur per Tahap (Rp)</label>
                  <input
                    type="number"
                    step="10000"
                    placeholder="300000"
                    className="form-control"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Periode Penyaluran</label>
                  <input
                    type="text"
                    placeholder="Contoh: Tahap 3 (Juli - September 2026)"
                    className="form-control"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nomor WhatsApp Penerima</label>
                  <input
                    type="text"
                    placeholder="Contoh: 081234567890"
                    className="form-control"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Keterangan / Catatan Kelayakan</label>
                  <input
                    type="text"
                    placeholder="Contoh: Lansia tunggal tanpa penghasilan"
                    className="form-control"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--light-border)' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 700 }}>
                  <Save size={13} /> {editingId ? 'Simpan Perubahan' : 'Tambahkan KPM'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. MODAL PRINT TANDA TERIMA / BERITA ACARA SALUR */}
      {printModalOpen && printKpm && (
        <div className="modal-backdrop open" onClick={() => setPrintModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', background: '#ffffff' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1rem', fontWeight: 800 }}>
                Pratinjau Bukti Tanda Terima Penyaluran Bansos
              </h3>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setPrintModalOpen(false)}>
                <X size={14} />
              </button>
            </div>

            {/* Printable Area */}
            <div style={{ padding: '2rem', border: '1px solid #e2e8f0', margin: '1.25rem', borderRadius: '4px', background: '#fff', color: '#000', fontFamily: "'Times New Roman', serif" }}>
              {/* Kop Desa */}
              <div style={{ textAlign: 'center', borderBottom: '3px double #000', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
                <h4 style={{ margin: 0, fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  PEMERINTAH KABUPATEN {profile?.regency || 'SUMEDANG'}
                </h4>
                <h4 style={{ margin: '2px 0', fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  KECAMATAN {profile?.district || 'HARAPAN MAKMUR'}
                </h4>
                <h3 style={{ margin: 0, fontSize: '15pt', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  KANTOR KEPALA DESA {profile?.name || 'SUKAMAJU MANDIRI'}
                </h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '9pt', fontStyle: 'italic' }}>
                  {profile?.contact?.address || 'Jl. Raya Desa No. 01'} • Kode Pos {profile?.zipCode || '45361'} • Email: {profile?.contact?.email || 'pemdes@desa.id'}
                </p>
              </div>

              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <h4 style={{ margin: 0, fontSize: '12pt', fontWeight: 'bold', textDecoration: 'underline' }}>
                  TANDA TERIMA PENYALURAN {printKpm.program.toUpperCase()}
                </h4>
                <span style={{ fontSize: '10pt' }}>
                  Nomor: 460/{printKpm.id.replace('kpm-', '0')}/BA-BANSOS/{new Date().getFullYear()}
                </span>
              </div>

              <p style={{ fontSize: '10.5pt', lineHeight: 1.6, textAlign: 'justify', margin: '0 0 1rem 0' }}>
                Pada hari ini, telah disalurkan bantuan sosial resmi dari Pemerintah Desa kepada Keluarga Penerima Manfaat (KPM) dengan rincian data sebagai berikut:
              </p>

              <table style={{ width: '100%', fontSize: '10.5pt', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '35%', padding: '4px 0' }}>Nama Penerima Manfaat</td>
                    <td style={{ width: '5%' }}>:</td>
                    <td style={{ fontWeight: 'bold' }}>{printKpm.name}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 0' }}>Nomor Induk Kependudukan (NIK)</td>
                    <td>:</td>
                    <td>{printKpm.nik}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 0' }}>Nomor Kartu Keluarga (KK)</td>
                    <td>:</td>
                    <td>{printKpm.nokk}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 0' }}>Alamat Domisili</td>
                    <td>:</td>
                    <td>{printKpm.dusun} RT {printKpm.rt} / RW {printKpm.rw}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 0' }}>Program Bantuan</td>
                    <td>:</td>
                    <td style={{ fontWeight: 'bold' }}>{printKpm.program}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 0' }}>Periode Penyaluran</td>
                    <td>:</td>
                    <td>{printKpm.period}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 0' }}>Jumlah Diterima</td>
                    <td>:</td>
                    <td style={{ fontWeight: 'bold', fontSize: '11.5pt' }}>{formatRupiah(printKpm.amount)}</td>
                  </tr>
                </tbody>
              </table>

              <p style={{ fontSize: '10pt', fontStyle: 'italic', margin: '0 0 1.5rem 0' }}>
                Demikian tanda terima ini dibuat dengan sebenar-benarnya tanpa adanya potongan biaya apapun.
              </p>

              {/* Tanda Tangan */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'center', fontSize: '10.5pt' }}>
                <div>
                  <span>Penerima Manfaat (KPM),</span>
                  <div style={{ height: '55px' }}></div>
                  <strong style={{ textDecoration: 'underline' }}>{printKpm.name}</strong>
                </div>
                <div>
                  <span>Kepala Desa {profile?.name || 'Sukamaju'},</span>
                  <div style={{ height: '55px' }}></div>
                  <strong style={{ textDecoration: 'underline' }}>{profile?.headOfVillage?.name || 'H. Budi Santoso, S.AP'}</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', padding: '1rem 1.25rem', borderTop: '1px solid var(--light-border)' }}>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setPrintModalOpen(false)}>
                Tutup
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => window.print()} style={{ fontWeight: 700 }}>
                <Printer size={14} /> Cetak Lembar Tanda Terima
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
