import React, { useState } from 'react';
import { 
  UserCheck, 
  LogIn, 
  X, 
  CreditCard, 
  FileText, 
  ShieldCheck, 
  LogOut, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Users,
  Search,
  Sparkles
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function CitizenSelfServiceModal({ isOpen, onClose, onOpenServiceModal, profile }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nikInput, setNikInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [currentCitizen, setCurrentCitizen] = useState(null);
  const [familyData, setFamilyData] = useState(null);
  const [citizenBansos, setCitizenBansos] = useState(null);
  const [loginError, setLoginError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    const cleanNik = nikInput.trim().replace(/\D/g, '');
    const citizens = StorageService.getAllCitizens() || [];
    const match = citizens.find(c => c.nik === cleanNik || c.name.toLowerCase() === nikInput.toLowerCase().trim());

    if (match) {
      setCurrentCitizen(match);
      // Find family
      const families = StorageService.getFamilies() || [];
      const fam = families.find(f => f.noKk === match.familyNoKk);
      setFamilyData(fam || null);

      // Find bansos
      const bansosList = StorageService.getBansosList() || [];
      const bansos = bansosList.find(b => b.nik === match.nik || b.nokk === match.familyNoKk);
      setCitizenBansos(bansos || null);

      setIsLoggedIn(true);
    } else {
      setLoginError('NIK / Nomor Identitas tidak ditemukan dalam data kependudukan desa.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentCitizen(null);
    setFamilyData(null);
    setCitizenBansos(null);
    setNikInput('');
    setPinInput('');
    setLoginError('');
  };

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)', color: '#ffffff', borderBottom: 'none' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.6rem', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid #3b82f6', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700, color: '#93c5fd', marginBottom: '0.35rem' }}>
              <UserCheck size={12} /> Layanan Mandiri Warga
            </div>
            <h3 className="modal-title" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              Anjungan Pelayanan Mandiri Online
            </h3>
            <span style={{ fontSize: '0.775rem', color: '#94a3b8' }}>
              Akses biodata, Kartu Keluarga digital, riwayat bansos, dan buat surat online mandiri.
            </span>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', padding: '0.35rem 0.55rem' }}
          >
            <X size={15} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          
          {/* VIEW 1: LOGIN FORM */}
          {!isLoggedIn ? (
            <div>
              <form onSubmit={handleLogin} style={{ marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 800 }}>Nomor Induk Kependudukan (NIK) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 3204151208850002"
                    className="form-control"
                    style={{ fontSize: '1rem', fontWeight: 700 }}
                    value={nikInput}
                    onChange={(e) => setNikInput(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 800 }}>PIN / Password Layanan Mandiri *</label>
                  <input
                    type="password"
                    placeholder="Masukkan 6 Digit PIN (Default: 123456)"
                    className="form-control"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                  />
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                    💡 PIN standar awal adalah <strong>123456</strong> atau dapat diperoleh di kantor desa.
                  </span>
                </div>

                {loginError && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '0.75rem', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '1rem' }}>
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.75rem', fontWeight: 800, fontSize: '0.95rem' }}
                >
                  <LogIn size={16} /> Masuk ke Layanan Mandiri
                </button>
              </form>

              {/* Sample Quick Login Buttons */}
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid var(--light-border)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
                  ⚡ Akun Sampel Warga untuk Demo:
                </span>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}
                    onClick={() => { setNikInput('3204151208850002'); setPinInput('123456'); }}
                  >
                    Bambang Sudrajat (Kepala Keluarga)
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}
                    onClick={() => { setNikInput('3204155503920001'); setPinInput('123456'); }}
                  >
                    Iis Aisyah (Ibu Rumah Tangga)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW 2: CITIZEN DASHBOARD */
            <div>
              {/* Profile Card */}
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)',
                border: '1px solid #bae6fd',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                marginBottom: '1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div>
                  <span className="badge badge-success" style={{ fontSize: '0.7rem', fontWeight: 800 }}>
                    ✓ Sesi Warga Terverifikasi
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)', margin: '0.25rem 0' }}>
                    {currentCitizen.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-body)' }}>
                    NIK: <strong>{currentCitizen.nik}</strong> • No. KK: <strong>{currentCitizen.familyNoKk}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleLogout}
                  style={{ color: '#dc2626', borderColor: '#fca5a5' }}
                >
                  <LogOut size={13} /> Keluar
                </button>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: '0.75rem', fontWeight: 800, fontSize: '0.85rem' }}
                  onClick={() => {
                    onClose();
                    if (onOpenServiceModal) onOpenServiceModal('SKU');
                  }}
                >
                  <FileText size={15} /> Buat Permohonan Surat
                </button>
              </div>

              {/* Family Members Card */}
              {familyData && (
                <div style={{ background: '#ffffff', border: '1px solid var(--light-border)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>👨‍👩‍👧‍👦 Anggota Kartu Keluarga:</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{familyData.dusun} RT {familyData.rt}/RW {familyData.rw}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {(familyData.members || []).map((m, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0.5rem', background: '#f8fafc', borderRadius: '4px', fontSize: '0.775rem' }}>
                        <span><strong>{m.name}</strong> ({m.relation})</span>
                        <span style={{ color: 'var(--text-muted)' }}>{m.nik}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bansos Status Card */}
              <div style={{ background: citizenBansos ? '#ecfdf5' : '#f8fafc', border: `1px solid ${citizenBansos ? '#a7f3d0' : 'var(--light-border)'}`, borderRadius: '8px', padding: '1rem' }}>
                <strong style={{ fontSize: '0.85rem', color: citizenBansos ? '#065f46' : 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
                  🛡️ Status Bantuan Sosial (Bansos):
                </strong>
                {citizenBansos ? (
                  <div style={{ fontSize: '0.8rem', color: '#065f46' }}>
                    Anda terdaftar sebagai penerima <strong>{citizenBansos.program}</strong> ({citizenBansos.period}).
                  </div>
                ) : (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Belum terdaftar sebagai penerima bansos aktif periode ini.
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
