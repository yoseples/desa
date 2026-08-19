import React, { useState } from 'react';
import { 
  HeartPulse, 
  Plus, 
  Search, 
  Calendar, 
  Users, 
  Baby, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Trash2, 
  Edit, 
  X, 
  Save, 
  Printer, 
  ArrowRight,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function AdminHealth({ profile }) {
  const [posyanduData, setPosyanduData] = useState(() => StorageService.getPosyanduData() || { toddlers: [], schedules: [], pregnantMothers: [] });
  const [activeSubTab, setActiveSubTab] = useState('toddlers'); // 'toddlers', 'schedules', 'pregnant'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Toddler Modal state
  const [toddlerModalOpen, setToddlerModalOpen] = useState(false);
  const [editingToddlerId, setEditingToddlerId] = useState(null);
  const [toddlerForm, setToddlerForm] = useState({
    nik: '',
    name: '',
    gender: 'Laki-laki',
    birthDate: '2024-01-01',
    parentName: '',
    dusun: 'Dusun Pasirjati',
    rt: '01',
    rw: '01',
    weight: 10.0,
    height: 80.0,
    headCircumference: 45.0,
    status: 'GIZI_BAIK',
    vitA: true,
    immunization: 'Lengkap',
    notes: ''
  });

  // Schedule Modal state
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    posyanduName: 'Posyandu Melati 1',
    dusun: 'Dusun Pasirjati (RW 01 & RW 02)',
    date: new Date().toISOString().split('T')[0],
    time: '08:30 - 11:30 WIB',
    location: 'Balai RW 01',
    agenda: 'Penimbangan BB/TB Balita & Imunisasi Rutin',
    cadreLeader: '',
    phone: ''
  });

  const toddlers = posyanduData.toddlers || [];
  const schedules = posyanduData.schedules || [];
  const pregnantMothers = posyanduData.pregnantMothers || [];

  // Stunting calculation helpers (Simulated WHO Z-score logic)
  const stuntingCount = toddlers.filter(t => t.status === 'STUNTING' || t.status === 'BERISIKO_STUNTING').length;
  const giziBaikCount = toddlers.filter(t => t.status === 'GIZI_BAIK').length;
  const normalRate = toddlers.length > 0 ? Math.round((giziBaikCount / toddlers.length) * 100) : 100;

  const calculateGiziStatus = (w, h) => {
    const bmi = w / ((h / 100) * (h / 100));
    if (h < 75 && w < 9.0) return 'BERISIKO_STUNTING';
    if (h < 70) return 'STUNTING';
    if (bmi > 19) return 'GIZI_LEBIH';
    return 'GIZI_BAIK';
  };

  const filteredToddlers = toddlers.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.nik.includes(searchQuery) ||
    t.dusun.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAddToddler = () => {
    setEditingToddlerId(null);
    setToddlerForm({
      nik: '',
      name: '',
      gender: 'Laki-laki',
      birthDate: '2024-01-01',
      parentName: '',
      dusun: 'Dusun Pasirjati',
      rt: '01',
      rw: '01',
      weight: 10.5,
      height: 82.0,
      headCircumference: 46.0,
      status: 'GIZI_BAIK',
      vitA: true,
      immunization: 'Lengkap',
      notes: ''
    });
    setToddlerModalOpen(true);
  };

  const handleOpenEditToddler = (item) => {
    setEditingToddlerId(item.id);
    setToddlerForm({ ...item });
    setToddlerModalOpen(true);
  };

  const handleSaveToddler = (e) => {
    e.preventDefault();
    if (!toddlerForm.name) {
      alert('Nama balita wajib diisi!');
      return;
    }

    // Auto classify status based on weight and height
    const autoStatus = calculateGiziStatus(parseFloat(toddlerForm.weight), parseFloat(toddlerForm.height));
    const finalData = {
      ...toddlerForm,
      weight: parseFloat(toddlerForm.weight),
      height: parseFloat(toddlerForm.height),
      headCircumference: parseFloat(toddlerForm.headCircumference) || 45,
      status: autoStatus,
      lastCheck: new Date().toISOString().split('T')[0]
    };

    if (editingToddlerId) {
      StorageService.updateToddler(editingToddlerId, finalData);
    } else {
      StorageService.addToddler(finalData);
    }

    setPosyanduData(StorageService.getPosyanduData());
    setToddlerModalOpen(false);
  };

  const handleDeleteToddler = (id) => {
    if (window.confirm('Hapus data balita ini?')) {
      StorageService.deleteToddler(id);
      setPosyanduData(StorageService.getPosyanduData());
    }
  };

  const handleSaveSchedule = (e) => {
    e.preventDefault();
    StorageService.addSchedule(scheduleForm);
    setPosyanduData(StorageService.getPosyanduData());
    setScheduleModalOpen(false);
  };

  const handleDeleteSchedule = (id) => {
    if (window.confirm('Hapus jadwal posyandu ini?')) {
      StorageService.deleteSchedule(id);
      setPosyanduData(StorageService.getPosyanduData());
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>TOTAL BALITA TERPANTAU</span>
            <Baby size={16} color="#059669" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', margin: '4px 0' }}>
            {toddlers.length} Anak
          </div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
            {normalRate}% Status Gizi Baik
          </span>
        </div>

        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>BERISIKO / STUNTING</span>
            <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>Prioritas PMT</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#d97706', margin: '4px 0' }}>
            {stuntingCount} Anak
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Intervensi PMT Telur & Susu Rutin
          </span>
        </div>

        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>IBU HAMIL TERDATA</span>
            <HeartPulse size={16} color="#db2777" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#db2777', margin: '4px 0' }}>
            {pregnantMothers.length} Orang
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Pendampingan Bidan & Tablet TTD
          </span>
        </div>

        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>JADWAL POSYANDU BULAN INI</span>
            <Calendar size={16} color="#2563eb" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563eb', margin: '4px 0' }}>
            {schedules.length} Titik
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Meliputi 4 Wilayah Dusun Desa
          </span>
        </div>
      </div>

      {/* 2. Sub Nav Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={`btn btn-sm ${activeSubTab === 'toddlers' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('toddlers')}
          style={{ fontWeight: 700 }}
        >
          <Baby size={14} /> Data Balita & Pemantauan Stunting ({toddlers.length})
        </button>
        <button
          type="button"
          className={`btn btn-sm ${activeSubTab === 'schedules' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('schedules')}
          style={{ fontWeight: 700 }}
        >
          <Calendar size={14} /> Kalender Jadwal Posyandu ({schedules.length})
        </button>
        <button
          type="button"
          className={`btn btn-sm ${activeSubTab === 'pregnant' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('pregnant')}
          style={{ fontWeight: 700 }}
        >
          <HeartPulse size={14} /> Pemantauan Ibu Hamil & Lansia ({pregnantMothers.length})
        </button>
      </div>

      {/* 3. TAB 1: TODDLERS & STUNTING */}
      {activeSubTab === 'toddlers' && (
        <div className="table-wrapper">
          <div className="table-toolbar" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Baby size={18} color="#059669" /> Buku Tumbuh Kembang Balita & Deteksi Dini Stunting
              </h3>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Standar kurva pertumbuhan antropometri Kementerian Kesehatan RI & WHO.
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ position: 'relative', width: '220px' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Cari nama balita / orang tua..."
                  className="form-control"
                  style={{ paddingLeft: '2rem', height: '34px', fontSize: '0.8rem' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleOpenAddToddler}
                style={{ fontWeight: 700 }}
              >
                <Plus size={14} /> Input Balita Baru
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Balita & Orang Tua</th>
                  <th>Usia / Tgl Lahir</th>
                  <th>Berat & Tinggi Badan</th>
                  <th>Status Gizi & Stunting</th>
                  <th>Imunisasi & Vit A</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredToddlers.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      Belum ada data balita yang tersimpan.
                    </td>
                  </tr>
                ) : (
                  filteredToddlers.map((tod, idx) => (
                    <tr key={tod.id}>
                      <td>{idx + 1}</td>
                      <td>
                        <strong style={{ fontSize: '0.875rem', color: 'var(--text-main)', display: 'block' }}>
                          {tod.name} ({tod.gender === 'Laki-laki' ? '👦' : '👧'})
                        </strong>
                        <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                          Ortu: {tod.parentName} • {tod.dusun}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {tod.birthDate}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--primary)' }}>
                          BB: {tod.weight} kg • TB: {tod.height} cm
                        </div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          Lingkar Kepala: {tod.headCircumference || 45} cm
                        </span>
                      </td>
                      <td>
                        {tod.status === 'GIZI_BAIK' ? (
                          <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                            ✓ Normal (Gizi Baik)
                          </span>
                        ) : tod.status === 'BERISIKO_STUNTING' ? (
                          <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
                            ⚠️ Berisiko Stunting
                          </span>
                        ) : (
                          <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>
                            🚨 Stunting (Pendek)
                          </span>
                        )}
                      </td>
                      <td>
                        <span style={{ fontSize: '0.775rem', color: 'var(--text-body)', fontWeight: 600 }}>
                          {tod.immunization} • {tod.vitA ? '💊 Vit A (+)' : 'Belum Vit A'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.25rem 0.45rem' }}
                            onClick={() => handleOpenEditToddler(tod)}
                            title="Edit Data Pertumbuhan"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm"
                            style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '0.25rem 0.45rem' }}
                            onClick={() => handleDeleteToddler(tod.id)}
                            title="Hapus Balita"
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

      {/* 4. TAB 2: SCHEDULES */}
      {activeSubTab === 'schedules' && (
        <div className="table-wrapper">
          <div className="table-toolbar">
            <div>
              <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={18} color="#2563eb" /> Agenda & Jadwal Pelayanan Posyandu
              </h3>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Jadwal penimbangan balita dan pelayanan kesehatan ibu hamil di seluruh dusun.
              </span>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setScheduleModalOpen(true)}
              style={{ fontWeight: 700 }}
            >
              <Plus size={14} /> Tambah Jadwal Posyandu
            </button>
          </div>

          <div style={{ padding: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {schedules.map((sch) => (
                <div
                  key={sch.id}
                  style={{
                    background: 'var(--light-surface)',
                    border: '1px solid var(--light-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>
                      {sch.dusun}
                    </span>
                    <button
                      type="button"
                      className="btn btn-sm"
                      style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '0.2rem 0.4rem' }}
                      onClick={() => handleDeleteSchedule(sch.id)}
                      title="Hapus Jadwal"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.4rem 0' }}>
                    {sch.posyanduName}
                  </h4>

                  <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 700, marginBottom: '0.35rem' }}>
                    🗓️ {sch.date} • ⏰ {sch.time}
                  </div>

                  <div style={{ fontSize: '0.775rem', color: 'var(--text-body)', marginBottom: '0.5rem' }}>
                    📍 <strong>Lokasi:</strong> {sch.location}
                  </div>

                  <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', margin: '0 0 0.5rem 0', lineHeight: 1.4 }}>
                    📋 <strong>Agenda:</strong> {sch.agenda}
                  </p>

                  <div style={{ fontSize: '0.725rem', color: '#059669', fontWeight: 700, borderTop: '1px solid var(--light-border)', paddingTop: '0.5rem' }}>
                    Koordinator: {sch.cadreLeader || 'Kader Posyandu Desa'} ({sch.phone || '-'})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: PREGNANT MOTHERS */}
      {activeSubTab === 'pregnant' && (
        <div className="table-wrapper">
          <div className="table-toolbar">
            <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <HeartPulse size={18} color="#db2777" /> Pemantauan Ibu Hamil Berisiko Tinggi & Lansia
            </h3>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              Deteksi dini anemia ibu hamil, Kurang Energi Kronis (KEK), dan pendampingan bidan desa.
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Ibu Hamil & Suami</th>
                  <th>Wilayah Dusun</th>
                  <th>Usia Kehamilan</th>
                  <th>Kadar Hemoglobin (Hb)</th>
                  <th>Status Risiko</th>
                  <th>No. HP Bidan / Ibu</th>
                </tr>
              </thead>
              <tbody>
                {pregnantMothers.map((p, idx) => (
                  <tr key={p.id}>
                    <td>{idx + 1}</td>
                    <td>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'block' }}>
                        {p.name}
                      </strong>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                        Suami: {p.husbandName}
                      </span>
                    </td>
                    <td>{p.dusun}</td>
                    <td><span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>{p.gestationalAge}</span></td>
                    <td><strong>{p.hbLevel}</strong></td>
                    <td>
                      {p.riskStatus === 'NORMAL' ? (
                        <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Normal</span>
                      ) : (
                        <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>⚠️ Risiko Tinggi (RESTI)</span>
                      )}
                    </td>
                    <td>{p.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. MODAL INPUT BALITA */}
      {toddlerModalOpen && (
        <div className="modal-backdrop open" onClick={() => setToddlerModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                {editingToddlerId ? 'Edit Data Balita' : 'Input Data Balita Baru (e-Posyandu)'}
              </h3>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setToddlerModalOpen(false)}>
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleSaveToddler} style={{ padding: '1.25rem' }}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nama Lengkap Balita *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muhammad Rizky"
                    className="form-control"
                    value={toddlerForm.name}
                    onChange={(e) => setToddlerForm({ ...toddlerForm, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Jenis Kelamin</label>
                  <select
                    className="form-control"
                    value={toddlerForm.gender}
                    onChange={(e) => setToddlerForm({ ...toddlerForm, gender: e.target.value })}
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Tanggal Lahir</label>
                  <input
                    type="date"
                    className="form-control"
                    value={toddlerForm.birthDate}
                    onChange={(e) => setToddlerForm({ ...toddlerForm, birthDate: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nama Orang Tua (Ayah / Ibu)</label>
                  <input
                    type="text"
                    placeholder="Contoh: Asep & Nurhasanah"
                    className="form-control"
                    value={toddlerForm.parentName}
                    onChange={(e) => setToddlerForm({ ...toddlerForm, parentName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Berat Badan (Kg) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="Contoh: 11.5"
                    className="form-control"
                    value={toddlerForm.weight}
                    onChange={(e) => setToddlerForm({ ...toddlerForm, weight: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tinggi / Panjang Badan (Cm) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="Contoh: 84.0"
                    className="form-control"
                    value={toddlerForm.height}
                    onChange={(e) => setToddlerForm({ ...toddlerForm, height: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Wilayah Dusun</label>
                  <select
                    className="form-control"
                    value={toddlerForm.dusun}
                    onChange={(e) => setToddlerForm({ ...toddlerForm, dusun: e.target.value })}
                  >
                    <option value="Dusun Pasirjati">Dusun Pasirjati</option>
                    <option value="Dusun Sukarame">Dusun Sukarame</option>
                    <option value="Dusun Cikembar">Dusun Cikembar</option>
                    <option value="Dusun Mekar">Dusun Mekar</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Status Imunisasi</label>
                  <select
                    className="form-control"
                    value={toddlerForm.immunization}
                    onChange={(e) => setToddlerForm({ ...toddlerForm, immunization: e.target.value })}
                  >
                    <option value="Lengkap">Lengkap Sesuai Usia</option>
                    <option value="Belum Lengkap">Belum Lengkap</option>
                    <option value="Imunisasi Dasar">Imunisasi Dasar</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--light-border)' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setToddlerModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 700 }}>
                  <Save size={13} /> {editingToddlerId ? 'Simpan Perubahan' : 'Simpan Data Balita'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. MODAL JADWAL POSYANDU */}
      {scheduleModalOpen && (
        <div className="modal-backdrop open" onClick={() => setScheduleModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                Tambah Agenda Jadwal Posyandu
              </h3>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setScheduleModalOpen(false)}>
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleSaveSchedule} style={{ padding: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Nama Posyandu *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Posyandu Melati 1"
                  className="form-control"
                  value={scheduleForm.posyanduName}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, posyanduName: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Tanggal Pelaksanaan</label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    value={scheduleForm.date}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Waktu / Jam</label>
                  <input
                    type="text"
                    placeholder="08:30 - 11:30 WIB"
                    className="form-control"
                    value={scheduleForm.time}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Lokasi / Tempat Posyandu</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Balai RW 01 Pasirjati"
                  className="form-control"
                  value={scheduleForm.location}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Agenda Kegiatan</label>
                <input
                  type="text"
                  placeholder="Penimbangan Balita, Imunisasi, & PMT"
                  className="form-control"
                  value={scheduleForm.agenda}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, agenda: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--light-border)' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setScheduleModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 700 }}>
                  <Save size={13} /> Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
