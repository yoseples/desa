import React, { useState } from 'react';
import { 
  Tractor, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Calendar, 
  Users, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function AdminAgriculture({ profile }) {
  const [agriData, setAgriData] = useState(() => StorageService.getAgricultureData() || { poktanList: [], marketPrices: [] });
  const [activeSubTab, setActiveSubTab] = useState('poktan'); // 'poktan', 'market'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Poktan Modal
  const [poktanModalOpen, setPoktanModalOpen] = useState(false);
  const [poktanForm, setPoktanForm] = useState({
    name: '',
    leader: '',
    dusun: 'Dusun Pasirjati',
    membersCount: 30,
    areaHectares: 20.0,
    mainCrop: 'Padi Sawah (Inpari 32)',
    fertilizerQuota: {
      urea: '10 Ton',
      npk: '8 Ton',
      organik: '5 Ton'
    },
    phone: ''
  });

  // Market Price Edit Modal
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [editingPriceItem, setEditingPriceItem] = useState(null);
  const [newPriceValue, setNewPriceValue] = useState(0);
  const [priceTrend, setPriceTrend] = useState('stable');

  const poktanList = agriData.poktanList || [];
  const marketPrices = agriData.marketPrices || [];

  const totalLuasLahan = poktanList.reduce((acc, p) => acc + (p.areaHectares || 0), 0);
  const totalAnggotaTani = poktanList.reduce((acc, p) => acc + (p.membersCount || 0), 0);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num || 0);
  };

  const handleSavePoktan = (e) => {
    e.preventDefault();
    if (!poktanForm.name || !poktanForm.leader) {
      alert('Nama Poktan dan Ketua wajib diisi!');
      return;
    }
    StorageService.addPoktan(poktanForm);
    setAgriData(StorageService.getAgricultureData());
    setPoktanModalOpen(false);
  };

  const handleDeletePoktan = (id) => {
    if (window.confirm('Hapus kelompok tani ini?')) {
      StorageService.deletePoktan(id);
      setAgriData(StorageService.getAgricultureData());
    }
  };

  const handleOpenEditPrice = (item) => {
    setEditingPriceItem(item);
    setNewPriceValue(item.price);
    setPriceTrend(item.trend || 'stable');
    setPriceModalOpen(true);
  };

  const handleSavePrice = (e) => {
    e.preventDefault();
    if (editingPriceItem) {
      const diff = newPriceValue - editingPriceItem.price;
      let changeText = 'Rp 0';
      if (diff > 0) changeText = `+Rp ${diff.toLocaleString('id-ID')}`;
      else if (diff < 0) changeText = `-Rp ${Math.abs(diff).toLocaleString('id-ID')}`;

      StorageService.updateMarketPrice(editingPriceItem.id, parseInt(newPriceValue), priceTrend, changeText);
      setAgriData(StorageService.getAgricultureData());
      setPriceModalOpen(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>KELOMPOK TANI (POKTAN)</span>
            <Tractor size={16} color="#059669" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', margin: '4px 0' }}>
            {poktanList.length} Poktan
          </div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
            {totalAnggotaTani} Petani Terdaftar
          </span>
        </div>

        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>TOTAL LAHAN PRODUKTIF</span>
            <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Sawah & Darat</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', margin: '4px 0' }}>
            {totalLuasLahan.toFixed(1)} Ha
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Sentra Padi Ciherang & Hortikultura
          </span>
        </div>

        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>KOMODITAS PASAR TERPANTAU</span>
            <ShoppingBag size={16} color="#d97706" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#d97706', margin: '4px 0' }}>
            {marketPrices.length} Komoditas
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Update Harga Pasar Desa Mingguan
          </span>
        </div>
      </div>

      {/* 2. Sub Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          type="button"
          className={`btn btn-sm ${activeSubTab === 'poktan' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('poktan')}
          style={{ fontWeight: 700 }}
        >
          <Tractor size={14} /> Kelompok Tani & Pupuk Bersubsidi ({poktanList.length})
        </button>
        <button
          type="button"
          className={`btn btn-sm ${activeSubTab === 'market' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSubTab('market')}
          style={{ fontWeight: 700 }}
        >
          <TrendingUp size={14} /> Papan Harga Pasar Desa ({marketPrices.length})
        </button>
      </div>

      {/* 3. TAB 1: POKTAN LIST */}
      {activeSubTab === 'poktan' && (
        <div className="table-wrapper">
          <div className="table-toolbar">
            <div>
              <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Tractor size={18} color="#059669" /> Daftar Kelompok Tani (Poktan & Gapoktan)
              </h3>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Rincian luas lahan garapan, komoditas unggulan, dan alokasi pupuk bersubsidi (e-RDKK).
              </span>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setPoktanModalOpen(true)}
              style={{ fontWeight: 700 }}
            >
              <Plus size={14} /> Tambah Kelompok Tani
            </button>
          </div>

          <div style={{ padding: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {poktanList.map((pok) => (
                <div
                  key={pok.id}
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
                      <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                        {pok.dusun}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm"
                        style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '0.2rem 0.4rem' }}
                        onClick={() => handleDeletePoktan(pok.id)}
                        title="Hapus Poktan"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.35rem 0' }}>
                      {pok.name}
                    </h4>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-body)', marginBottom: '0.5rem' }}>
                      👤 <strong>Ketua:</strong> {pok.leader} • 👥 <strong>Anggota:</strong> {pok.membersCount} Petani
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.75rem' }}>
                      🌾 <strong>Komoditas:</strong> {pok.mainCrop} ({pok.areaHectares} Ha)
                    </div>

                    {/* Pupuk Quota */}
                    <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--light-border)', fontSize: '0.75rem' }}>
                      <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.25rem' }}>📦 Kuota Pupuk Subsidi T.A. 2026:</strong>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                        <span>Urea: <strong>{pok.fertilizerQuota?.urea || '-'}</strong></span>
                        <span>NPK: <strong>{pok.fertilizerQuota?.npk || '-'}</strong></span>
                        <span>Organik: <strong>{pok.fertilizerQuota?.organik || '-'}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '0.75rem', fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    Kontak Poktan: {pok.phone || '-'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 2: MARKET PRICES */}
      {activeSubTab === 'market' && (
        <div className="table-wrapper">
          <div className="table-toolbar">
            <div>
              <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <TrendingUp size={18} color="#059669" /> Papan Informasi Harga Komoditas Pasar Desa
              </h3>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Transparansi harga jual panen petani dan komoditas pangan pokok untuk warga desa.
              </span>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Komoditas Pangan</th>
                  <th>Harga Saat Ini (Rp)</th>
                  <th>Satuan</th>
                  <th>Tren Perubahan</th>
                  <th>Pembaruan Terakhir</th>
                  <th style={{ textAlign: 'center' }}>Perbarui Harga</th>
                </tr>
              </thead>
              <tbody>
                {marketPrices.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{idx + 1}</td>
                    <td>
                      <strong style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>
                        {item.commodity}
                      </strong>
                    </td>
                    <td>
                      <span style={{ fontSize: '1rem', fontWeight: 900, color: '#059669' }}>
                        {formatRupiah(item.price)}
                      </span>
                    </td>
                    <td><span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>/{item.unit}</span></td>
                    <td>
                      {item.trend === 'up' ? (
                        <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                          <TrendingUp size={11} /> Naik ({item.change})
                        </span>
                      ) : item.trend === 'down' ? (
                        <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>
                          <TrendingDown size={11} /> Turun ({item.change})
                        </span>
                      ) : (
                        <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                          Stabil ({item.change})
                        </span>
                      )}
                    </td>
                    <td><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.lastUpdate}</span></td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                        onClick={() => handleOpenEditPrice(item)}
                      >
                        <Edit size={12} /> Ubah Harga
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. MODAL INPUT POKTAN */}
      {poktanModalOpen && (
        <div className="modal-backdrop open" onClick={() => setPoktanModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                Tambah Kelompok Tani Baru
              </h3>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setPoktanModalOpen(false)}>
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleSavePoktan} style={{ padding: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Nama Kelompok Tani *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kelompok Tani 'Mekar Sari'"
                  className="form-control"
                  value={poktanForm.name}
                  onChange={(e) => setPoktanForm({ ...poktanForm, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nama Ketua Poktan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: H. Sukirman"
                    className="form-control"
                    value={poktanForm.leader}
                    onChange={(e) => setPoktanForm({ ...poktanForm, leader: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Wilayah Dusun</label>
                  <select
                    className="form-control"
                    value={poktanForm.dusun}
                    onChange={(e) => setPoktanForm({ ...poktanForm, dusun: e.target.value })}
                  >
                    <option value="Dusun Pasirjati">Dusun Pasirjati</option>
                    <option value="Dusun Sukarame">Dusun Sukarame</option>
                    <option value="Dusun Cikembar">Dusun Cikembar</option>
                    <option value="Dusun Mekar">Dusun Mekar</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Jumlah Anggota Petani</label>
                  <input
                    type="number"
                    placeholder="30"
                    className="form-control"
                    value={poktanForm.membersCount}
                    onChange={(e) => setPoktanForm({ ...poktanForm, membersCount: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Luas Lahan Garapan (Ha)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="25.5"
                    className="form-control"
                    value={poktanForm.areaHectares}
                    onChange={(e) => setPoktanForm({ ...poktanForm, areaHectares: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Komoditas Tanaman Utama</label>
                <input
                  type="text"
                  placeholder="Contoh: Padi Sawah & Hortikultura"
                  className="form-control"
                  value={poktanForm.mainCrop}
                  onChange={(e) => setPoktanForm({ ...poktanForm, mainCrop: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--light-border)' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setPoktanModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 700 }}>
                  <Save size={13} /> Simpan Poktan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL EDIT HARGA PASAR */}
      {priceModalOpen && editingPriceItem && (
        <div className="modal-backdrop open" onClick={() => setPriceModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                Perbarui Harga: {editingPriceItem.commodity}
              </h3>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setPriceModalOpen(false)}>
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleSavePrice} style={{ padding: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Harga Terbaru (Rp per {editingPriceItem.unit}) *</label>
                <input
                  type="number"
                  step="100"
                  required
                  className="form-control"
                  style={{ fontSize: '1.1rem', fontWeight: 800 }}
                  value={newPriceValue}
                  onChange={(e) => setNewPriceValue(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">Kondisi Tren Harga</label>
                <select
                  className="form-control"
                  value={priceTrend}
                  onChange={(e) => setPriceTrend(e.target.value)}
                >
                  <option value="stable">Stabil / Tidak Berubah</option>
                  <option value="up">Mengalami Kenaikan (Naik)</option>
                  <option value="down">Mengalami Penurunan (Turun)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--light-border)' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setPriceModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 700 }}>
                  <Save size={13} /> Terapkan Harga
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
