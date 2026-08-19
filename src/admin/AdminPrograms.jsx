import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  DollarSign, 
  X,
  Layers,
  ArrowRight,
  TrendingUp,
  Percent,
  Wallet
} from 'lucide-react';
import { APBDES_FUNDING_SOURCES } from '../services/initialData';

export default function AdminPrograms({ 
  programsList = [], 
  onAddProgram, 
  onUpdateProgram, 
  onDeleteProgram 
}) {
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL', 'PRIORITAS', 'SEDANG_BERJALAN', 'WAKTU_DEKAT', 'RENCANA_SELANJUTNYA'
  const [fundingSourceFilter, setFundingSourceFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Infrastruktur & Pertanian',
    budget: '',
    fundingSource: 'Sumber APBDes (Dana Desa / DDS)',
    location: '',
    schedule: '',
    status: 'PRIORITAS',
    progress: 0,
    pic: '',
    description: ''
  });

  const handleOpenAdd = () => {
    setEditingProgram(null);
    setFormData({
      title: '',
      category: 'Infrastruktur & Pertanian',
      budget: '',
      fundingSource: 'Sumber APBDes (Dana Desa / DDS)',
      location: 'Dusun Pasirjati',
      schedule: 'Agustus - Oktober 2026',
      status: 'PRIORITAS',
      progress: 0,
      pic: 'Kaur Pembangunan (TPK)',
      description: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (prog) => {
    setEditingProgram(prog);
    setFormData({
      title: prog.title || '',
      category: prog.category || 'Infrastruktur & Pertanian',
      budget: prog.budget || '',
      fundingSource: prog.fundingSource || 'Dana Desa (DDS) T.A. 2026',
      location: prog.location || '',
      schedule: prog.schedule || '',
      status: prog.status || 'PRIORITAS',
      progress: prog.progress || 0,
      pic: prog.pic || '',
      description: prog.description || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.budget) {
      alert('Nama Program dan Anggaran wajib diisi!');
      return;
    }

    const payload = {
      ...formData,
      budget: parseInt(formData.budget, 10),
      progress: parseInt(formData.progress || 0, 10)
    };

    if (editingProgram) {
      onUpdateProgram(editingProgram.id, payload);
    } else {
      onAddProgram(payload);
    }

    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus program kerja ini dari database desa?')) {
      onDeleteProgram(id);
    }
  };

  // Calculations
  const totalBudget = programsList.reduce((acc, p) => acc + (p.budget || 0), 0);
  const prioritasCount = programsList.filter(p => p.status === 'PRIORITAS').length;
  const sedangBerjalanCount = programsList.filter(p => p.status === 'SEDANG_BERJALAN').length;
  const waktuDekatCount = programsList.filter(p => p.status === 'WAKTU_DEKAT').length;
  const rencanaNantiCount = programsList.filter(p => p.status === 'RENCANA_SELANJUTNYA').length;

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num || 0);
  };

  const filteredPrograms = programsList.filter(p => {
    const matchFilter = activeFilter === 'ALL' || p.status === activeFilter;
    const matchSource = fundingSourceFilter === 'ALL' || p.fundingSource === fundingSourceFilter;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.fundingSource || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSource && matchSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PRIORITAS':
        return <span className="badge badge-danger">🌟 Prioritas Utama</span>;
      case 'SEDANG_BERJALAN':
        return <span className="badge badge-success">⏳ Sedang Dikerjakan</span>;
      case 'WAKTU_DEKAT':
        return <span className="badge badge-warning">🗓️ Waktu Dekat</span>;
      case 'RENCANA_SELANJUTNYA':
      default:
        return <span className="badge badge-neutral">📋 Rencana Selanjutnya</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. TOP STATS APBDes & SUMMARY */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1.25rem' }}>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Alokasi Anggaran</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#064e3b' }}>
              {formatRupiah(totalBudget)}
            </div>
            <span style={{ fontSize: '0.725rem', color: '#059669', fontWeight: 700 }}>
              {programsList.length} Program Kerja
            </span>
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveFilter('PRIORITAS')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: '#fee2e2', color: '#dc2626' }}>
            <AlertCircle size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Prioritas Mendesak</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#dc2626' }}>
              {prioritasCount} Program
            </div>
            <span style={{ fontSize: '0.725rem', color: '#dc2626', fontWeight: 700 }}>Segera Dilaksanakan</span>
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveFilter('SEDANG_BERJALAN')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>
            <Clock size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Sedang Dikerjakan</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#16a34a' }}>
              {sedangBerjalanCount} Program
            </div>
            <span style={{ fontSize: '0.725rem', color: '#16a34a', fontWeight: 700 }}>Dalam Tahap Realisasi</span>
          </div>
        </div>

        <div className="stat-card" onClick={() => setActiveFilter('WAKTU_DEKAT')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            <Calendar size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Waktu Dekat (Q3/Q4)</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#d97706' }}>
              {waktuDekatCount} Program
            </div>
            <span style={{ fontSize: '0.725rem', color: '#d97706', fontWeight: 700 }}>Jadwal Triwulan Berjalan</span>
          </div>
        </div>

      </div>

      {/* 2. TABLE & CONTROLS */}
      <div className="table-wrapper" style={{ padding: '1.5rem' }}>
        
        {/* Header & Filter Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase size={20} color="#059669" /> Rencana Anggaran & Transparansi RAPBDes
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Rencana pembangunan fisik, pemberdayaan ekonomi, dan alokasi dana desa.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '240px' }}>
              <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Cari kegiatan RAPBDes..."
                className="form-control"
                style={{ paddingLeft: '2.25rem', height: '36px', fontSize: '0.825rem' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary btn-sm"
              onClick={handleOpenAdd}
            >
              <Plus size={14} /> Tambah Kegiatan RAPBDes
            </button>
          </div>
        </div>

        {/* Filter Pills & Funding Source Selector */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem', flexWrap: 'wrap' }}>
            <button
              className={`btn btn-sm ${activeFilter === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveFilter('ALL')}
            >
              Semua ({programsList.length})
            </button>
            <button
              className={`btn btn-sm ${activeFilter === 'PRIORITAS' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveFilter('PRIORITAS')}
            >
              🌟 Prioritas Utama ({prioritasCount})
            </button>
            <button
              className={`btn btn-sm ${activeFilter === 'SEDANG_BERJALAN' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveFilter('SEDANG_BERJALAN')}
            >
              ⏳ Sedang Dikerjakan ({sedangBerjalanCount})
            </button>
            <button
              className={`btn btn-sm ${activeFilter === 'WAKTU_DEKAT' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveFilter('WAKTU_DEKAT')}
            >
              🗓️ Waktu Dekat ({waktuDekatCount})
            </button>
            <button
              className={`btn btn-sm ${activeFilter === 'RENCANA_SELANJUTNYA' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveFilter('RENCANA_SELANJUTNYA')}
            >
              📋 Rencana Selanjutnya ({rencanaNantiCount})
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Wallet size={14} color="#059669" />
            <select
              className="form-control"
              value={fundingSourceFilter}
              onChange={(e) => setFundingSourceFilter(e.target.value)}
              style={{ height: '34px', fontSize: '0.8rem', padding: '0.2rem 0.65rem', minWidth: '220px' }}
            >
              <option value="ALL">Semua Sumber Dana APBDes</option>
              {APBDES_FUNDING_SOURCES.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Programs Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Program & Bidang</th>
                <th>Anggaran & Sumber Dana</th>
                <th>Lokasi / Wilayah</th>
                <th>Rencana Pelaksanaan</th>
                <th>Status & Progres Fisik</th>
                <th>Pelaksana (TPK)</th>
                <th style={{ textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrograms.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    Tidak ada program kerja yang sesuai dengan filter ini.
                  </td>
                </tr>
              ) : (
                filteredPrograms.map((prog, idx) => (
                  <tr key={prog.id}>
                    <td style={{ fontWeight: 'bold' }}>{idx + 1}</td>
                    <td>
                      <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                        {prog.title}
                      </div>
                      <span className="badge badge-neutral" style={{ fontSize: '0.7rem', marginTop: '3px' }}>
                        {prog.category}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 800, color: '#064e3b', fontSize: '0.9rem' }}>
                        {formatRupiah(prog.budget)}
                      </div>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'block' }}>
                        {prog.fundingSource}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.825rem' }}>
                        <MapPin size={13} color="#059669" /> {prog.location}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.825rem' }}>
                        <Calendar size={13} color="#2563eb" /> {prog.schedule}
                      </div>
                    </td>
                    <td>
                      <div style={{ marginBottom: '4px' }}>
                        {getStatusBadge(prog.status)}
                      </div>
                      {prog.status === 'SEDANG_BERJALAN' || prog.progress > 0 ? (
                        <div style={{ width: '120px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 700, marginBottom: '2px' }}>
                            <span>Fisik:</span>
                            <span>{prog.progress}%</span>
                          </div>
                          <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${prog.progress}%`, height: '100%', background: '#10b981', borderRadius: '3px' }}></div>
                          </div>
                        </div>
                      ) : null}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-body)', maxWidth: '160px' }}>
                      {prog.pic}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center' }}>
                        <button
                          className="btn btn-sm btn-secondary"
                          style={{ padding: '0.25rem 0.5rem' }}
                          onClick={() => handleOpenEdit(prog)}
                          title="Edit Program"
                        >
                          <Edit size={13} />
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          style={{ padding: '0.25rem 0.5rem' }}
                          onClick={() => handleDelete(prog.id)}
                          title="Hapus Program"
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

      {/* 3. MODAL TAMBAH / EDIT PROGRAM */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingProgram ? 'Edit Program Kerja & Anggaran' : 'Tambah Program Kerja Pemerintah Desa'}
              </h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                
                <div className="form-group">
                  <label className="form-label">Nama Program Kerja / Kegiatan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pengecoran Jalan Usaha Tani Dusun Sukarame"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Bidang / Kategori *</label>
                    <select
                      className="form-control"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Infrastruktur & Pertanian">Infrastruktur & Pertanian</option>
                      <option value="Fasilitas Publik & Keamanan">Fasilitas Publik & Keamanan</option>
                      <option value="Pemberdayaan & Kemasyarakatan">Pemberdayaan & Kemasyarakatan</option>
                      <option value="Ekonomi Kreatif & BUMDes">Ekonomi Kreatif & BUMDes</option>
                      <option value="Sanitasi & Kesehatan Lingkungan">Sanitasi & Kesehatan Lingkungan</option>
                      <option value="Pariwisata & Lingkungan">Pariwisata & Lingkungan</option>
                      <option value="Pendidikan & Digitalisasi">Pendidikan & Digitalisasi</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Alokasi Anggaran (Rp) *</label>
                    <input
                      type="number"
                      required
                      placeholder="Contoh: 185000000"
                      className="form-control"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Sumber Dana APBDes *</label>
                    <select
                      className="form-control"
                      value={formData.fundingSource}
                      onChange={(e) => setFormData({ ...formData, fundingSource: e.target.value })}
                    >
                      {APBDES_FUNDING_SOURCES.map((source) => (
                        <option key={source} value={source}>
                          {source}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Lokasi / Wilayah Pelaksanaan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Dusun Sukarame (RW 04 & RW 05)"
                      className="form-control"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Rencana Jadwal Pelaksanaan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Agustus - Oktober 2026"
                      className="form-control"
                      value={formData.schedule}
                      onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Status Pelaksanaan Warga *</label>
                    <select
                      className="form-control"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="PRIORITAS">🌟 Prioritas Utama (Mendesak)</option>
                      <option value="SEDANG_BERJALAN">⏳ Sedang Dikerjakan (In Progress)</option>
                      <option value="WAKTU_DEKAT">🗓️ Akan Dikerjakan Dalam Waktu Dekat</option>
                      <option value="RENCANA_SELANJUTNYA">📋 Rencana Selanjutnya (Tahun Depan)</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Realisasi Progres Fisik (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0 - 100"
                      className="form-control"
                      value={formData.progress}
                      onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Penanggung Jawab / TPK</label>
                    <input
                      type="text"
                      placeholder="Contoh: Kaur Pembangunan & Ketua RW"
                      className="form-control"
                      value={formData.pic}
                      onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Keterangan / Manfaat Program Bagi Warga</label>
                  <textarea
                    rows={2}
                    placeholder="Uraikan manfaat dan rincian teknis program kerja..."
                    className="form-control"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Batal</button>
                <button type="submit" className="btn btn-primary">
                  {editingProgram ? 'Simpan Perubahan' : 'Terbitkan Program Kerja'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
