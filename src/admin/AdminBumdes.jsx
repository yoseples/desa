import React, { useState } from 'react';
import { 
  Building2, 
  Coins, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  CheckCircle2, 
  Users, 
  ArrowUpRight, 
  ShieldCheck, 
  Droplets, 
  Recycle, 
  Store, 
  Palmtree
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function AdminBumdes({ profile }) {
  const [bumdesData, setBumdesData] = useState(() => StorageService.getBumdesData() || { units: [], name: '', director: '', totalCapital: 0, padesContribution: 0 });
  const [unitModalOpen, setUnitModalOpen] = useState(false);
  const [editingUnitId, setEditingUnitId] = useState(null);
  const [unitForm, setUnitForm] = useState({
    name: '',
    category: 'Jasa Air Bersih & Sanitasi',
    customersCount: 100,
    monthlyRevenue: 10000000,
    monthlyExpenses: 5000000,
    status: 'AKTIF_PRODUKTIF',
    description: ''
  });

  const units = bumdesData.units || [];
  const totalRevenue = units.reduce((acc, u) => acc + (u.monthlyRevenue || 0), 0);
  const totalExpenses = units.reduce((acc, u) => acc + (u.monthlyExpenses || 0), 0);
  const totalMonthlyNetProfit = totalRevenue - totalExpenses;

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num || 0);
  };

  const handleOpenAdd = () => {
    setEditingUnitId(null);
    setUnitForm({
      name: '',
      category: 'Jasa Air Bersih & Sanitasi',
      customersCount: 100,
      monthlyRevenue: 10000000,
      monthlyExpenses: 5000000,
      status: 'AKTIF_PRODUKTIF',
      description: ''
    });
    setUnitModalOpen(true);
  };

  const handleOpenEdit = (unit) => {
    setEditingUnitId(unit.id);
    setUnitForm({ ...unit });
    setUnitModalOpen(true);
  };

  const handleSaveUnit = (e) => {
    e.preventDefault();
    if (!unitForm.name) {
      alert('Nama Unit Usaha wajib diisi!');
      return;
    }

    const netProfit = (parseInt(unitForm.monthlyRevenue) || 0) - (parseInt(unitForm.monthlyExpenses) || 0);
    const finalUnit = {
      ...unitForm,
      customersCount: parseInt(unitForm.customersCount) || 0,
      monthlyRevenue: parseInt(unitForm.monthlyRevenue) || 0,
      monthlyExpenses: parseInt(unitForm.monthlyExpenses) || 0,
      netProfit
    };

    if (editingUnitId) {
      StorageService.updateBumdesUnit(editingUnitId, finalUnit);
    } else {
      StorageService.addBumdesUnit(finalUnit);
    }

    setBumdesData(StorageService.getBumdesData());
    setUnitModalOpen(false);
  };

  const handleDeleteUnit = (id) => {
    if (window.confirm('Hapus unit usaha BUMDes ini?')) {
      StorageService.deleteBumdesUnit(id);
      setBumdesData(StorageService.getBumdesData());
    }
  };

  const getUnitIcon = (category) => {
    if (category.includes('Air')) return Droplets;
    if (category.includes('Sampah') || category.includes('Daur')) return Recycle;
    if (category.includes('Wisata')) return Palmtree;
    return Store;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>UNIT USAHA AKTIF</span>
            <Store size={16} color="#059669" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', margin: '4px 0' }}>
            {units.length} Unit Usaha
          </div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
            {bumdesData.name || 'BUMDes Sukamaju Sejahtera'}
          </span>
        </div>

        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>OMSET / PENDAPATAN BULANAN</span>
            <Coins size={16} color="#2563eb" />
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2563eb', margin: '4px 0' }}>
            {formatRupiah(totalRevenue)}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Biaya Operasional: {formatRupiah(totalExpenses)}
          </span>
        </div>

        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>LABA BERSIH BULANAN</span>
            <TrendingUp size={16} color="#16a34a" />
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#16a34a', margin: '4px 0' }}>
            {formatRupiah(totalMonthlyNetProfit)}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Rata-rata Margin Bersih Produktif
          </span>
        </div>

        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>SETORAN PADes KE APBDES</span>
            <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>PADes</span>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#d97706', margin: '4px 0' }}>
            {formatRupiah(bumdesData.padesContribution || 45000000)}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Kontribusi Pendapatan Asli Desa T.A. 2026
          </span>
        </div>
      </div>

      {/* 2. Units List Cards */}
      <div className="table-wrapper">
        <div className="table-toolbar">
          <div>
            <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Building2 size={18} color="#059669" /> Portofolio Unit Usaha Ekonomi BUMDes
            </h3>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              Direktur BUMDes: {bumdesData.director} • Modal Awal: {formatRupiah(bumdesData.totalCapital)}
            </span>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleOpenAdd}
            style={{ fontWeight: 700 }}
          >
            <Plus size={14} /> Tambah Unit Usaha
          </button>
        </div>

        <div style={{ padding: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            {units.map((unit) => {
              const Icon = getUnitIcon(unit.category);
              return (
                <div
                  key={unit.id}
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
                        {unit.category}
                      </span>
                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem' }}
                          onClick={() => handleOpenEdit(unit)}
                          title="Edit Unit Usaha"
                        >
                          <Edit size={12} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm"
                          style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '0.2rem 0.4rem', fontSize: '0.7rem' }}
                          onClick={() => handleDeleteUnit(unit.id)}
                          title="Hapus Unit Usaha"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', margin: '0.35rem 0 0.5rem 0' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={18} />
                      </div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                        {unit.name}
                      </h4>
                    </div>

                    <p style={{ fontSize: '0.775rem', color: 'var(--text-body)', margin: '0 0 0.75rem 0', lineHeight: 1.4 }}>
                      {unit.description}
                    </p>

                    {/* Financial stats */}
                    <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--light-border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem' }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block' }}>Pelanggan / Nasabah:</span>
                        <strong style={{ color: 'var(--text-main)' }}>{unit.customersCount} Pengguna</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block' }}>Laba Bersih / Bulan:</span>
                        <strong style={{ color: '#059669', fontSize: '0.85rem' }}>{formatRupiah(unit.netProfit)}</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.85rem', paddingTop: '0.5rem', borderTop: '1px solid var(--light-border)', fontSize: '0.725rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Status Operasional:</span>
                    <span className="badge badge-success" style={{ fontSize: '0.675rem' }}>
                      ✓ Aktif & Menghasilkan
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. MODAL TAMBAH / EDIT UNIT USAHA */}
      {unitModalOpen && (
        <div className="modal-backdrop open" onClick={() => setUnitModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                {editingUnitId ? 'Edit Unit Usaha BUMDes' : 'Tambah Unit Usaha BUMDes Baru'}
              </h3>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setUnitModalOpen(false)}>
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleSaveUnit} style={{ padding: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Nama Unit Usaha *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Unit Air Bersih Desa (PAMSIMAS)"
                  className="form-control"
                  value={unitForm.name}
                  onChange={(e) => setUnitForm({ ...unitForm, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Kategori Bidang Usaha</label>
                <select
                  className="form-control"
                  value={unitForm.category}
                  onChange={(e) => setUnitForm({ ...unitForm, category: e.target.value })}
                >
                  <option value="Jasa Air Bersih & Sanitasi">Jasa Air Bersih & Sanitasi (PAMSIMAS)</option>
                  <option value="Lingkungan & Daur Ulang">Lingkungan & Pengelolaan Sampah</option>
                  <option value="Perdagangan Saprotan">Perdagangan Sarana Pertanian & Kios Pupuk</option>
                  <option value="Pariwisata & Jasa Sewa">Pariwisata Desa & Sewa Gedung Serbaguna</option>
                  <option value="Jasa Keuangan Mikro">Simpan Pinjam & Keuangan Mikro Desa</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Pendapatan Omset / Bulan (Rp)</label>
                  <input
                    type="number"
                    step="100000"
                    placeholder="15000000"
                    className="form-control"
                    value={unitForm.monthlyRevenue}
                    onChange={(e) => setUnitForm({ ...unitForm, monthlyRevenue: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Biaya Pengeluaran / Bulan (Rp)</label>
                  <input
                    type="number"
                    step="100000"
                    placeholder="6000000"
                    className="form-control"
                    value={unitForm.monthlyExpenses}
                    onChange={(e) => setUnitForm({ ...unitForm, monthlyExpenses: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Jumlah Pelanggan / Pemanfaat Aktif</label>
                <input
                  type="number"
                  placeholder="350"
                  className="form-control"
                  value={unitForm.customersCount}
                  onChange={(e) => setUnitForm({ ...unitForm, customersCount: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Deskripsi Operasional Unit</label>
                <textarea
                  rows={2}
                  placeholder="Jelaskan layanan unit usaha dan manfaat bagi warga..."
                  className="form-control"
                  value={unitForm.description}
                  onChange={(e) => setUnitForm({ ...unitForm, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--light-border)' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setUnitModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 700 }}>
                  <Save size={13} /> {editingUnitId ? 'Simpan Perubahan' : 'Tambahkan Unit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
