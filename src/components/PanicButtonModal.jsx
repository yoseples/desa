import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Flame, 
  HeartPulse, 
  ShieldAlert, 
  CloudRain, 
  PhoneCall, 
  MapPin, 
  X, 
  CheckCircle2, 
  Clock,
  Send,
  Sparkles
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function PanicButtonModal({ isOpen, onClose, profile }) {
  const [step, setStep] = useState('SELECT'); // 'SELECT', 'FORM', 'SUCCESS'
  const [selectedType, setSelectedType] = useState(null);
  const [callerName, setCallerName] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const emergencyTypes = [
    {
      id: 'MEDIS_AMBULANS',
      label: 'Medis Darurat & Ambulans',
      icon: HeartPulse,
      color: '#dc2626',
      bg: '#fef2f2',
      border: '#fca5a5',
      desc: 'Warga sakit mendadak, kecelakaan, persalinan darurat, atau butuh mobil siaga desa.'
    },
    {
      id: 'KEBAKARAN',
      label: 'Kebakaran Rumah / Lahan',
      icon: Flame,
      color: '#ea580c',
      bg: '#fff7ed',
      border: '#fdba74',
      desc: 'Kebakaran pemukiman warga, korsleting listrik, atau kebakaran hutan/lahan desa.'
    },
    {
      id: 'BENCANA_ALAM',
      label: 'Bencana Longsor / Banjir',
      icon: CloudRain,
      color: '#0284c7',
      bg: '#f0f9ff',
      border: '#bae6fd',
      desc: 'Tanah longsor, pohon tumbang menutupi akses jalan, atau luapan air sungai.'
    },
    {
      id: 'KAMTIBMAS_MALING',
      label: 'Keamanan / Kamtibmas',
      icon: ShieldAlert,
      color: '#7c3aed',
      bg: '#f5f3ff',
      border: '#ddd6fe',
      desc: 'Pencurian, gangguan ketertiban masyarakat, atau orang mencurigakan di lingkungan.'
    }
  ];

  const handleSelectType = (typeObj) => {
    setSelectedType(typeObj);
    setStep('FORM');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!callerName || !callerPhone || !location) {
      alert('Nama, Nomor Telepon, dan Lokasi Kejadian wajib diisi!');
      return;
    }

    // Save emergency log
    StorageService.addEmergencyLog({
      callerName,
      phone: callerPhone,
      emergencyType: selectedType.id,
      location,
      description: description || `Panggilan darurat untuk kategori ${selectedType.label}`,
      handledBy: 'Tim Siaga Desa & Posko 24 Jam'
    });

    setStep('SUCCESS');
  };

  const handleReset = () => {
    setStep('SELECT');
    setSelectedType(null);
    setCallerName('');
    setCallerPhone('');
    setLocation('');
    setDescription('');
    onClose();
  };

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #991b1b 0%, #450a0a 100%)', color: '#ffffff', borderBottom: 'none' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.6rem', background: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 800, color: '#fef2f2', marginBottom: '0.35rem' }}>
              <AlertTriangle size={12} /> POSKO SIAGA 24 JAM
            </div>
            <h3 className="modal-title" style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>
              Layanan Tanggap Darurat & Bencana Warga
            </h3>
            <span style={{ fontSize: '0.775rem', color: '#fca5a5' }}>
              Tekan tombol kategori untuk mengirimkan alarm peringatan darurat ke tim Linmas & Perangkat Desa.
            </span>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '0.35rem 0.55rem' }}
          >
            <X size={15} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          
          {/* STEP 1: SELECT EMERGENCY CATEGORY */}
          {step === 'SELECT' && (
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                Pilih Jenis Kejadian Darurat:
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {emergencyTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div
                      key={type.id}
                      onClick={() => handleSelectType(type)}
                      style={{
                        background: type.bg,
                        border: `2px solid ${type.border}`,
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.2rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                      className="hover-card"
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ffffff', color: type.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.06)' }}>
                            <Icon size={20} />
                          </div>
                          <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: type.color, margin: 0 }}>
                            {type.label}
                          </h5>
                        </div>
                        <p style={{ fontSize: '0.775rem', color: 'var(--text-body)', margin: 0, lineHeight: 1.4 }}>
                          {type.desc}
                        </p>
                      </div>
                      <div style={{ marginTop: '0.85rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <span className="btn btn-sm" style={{ background: type.color, color: '#fff', fontSize: '0.725rem', fontWeight: 700, padding: '0.3rem 0.75rem' }}>
                          Lapor Segera →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Direct Call Centers */}
              <div style={{ background: 'var(--light-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
                  📞 Kontak Telepon Langsung Petugas Siaga Desa (Bisa Ditelepon 24 Jam):
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  <a href="tel:082133445566" className="btn btn-secondary btn-sm" style={{ justifyContent: 'flex-start', fontSize: '0.775rem', color: '#dc2626' }}>
                    <PhoneCall size={13} /> Mobil Siaga: 0821-3344-5566
                  </a>
                  <a href="tel:081299887766" className="btn btn-secondary btn-sm" style={{ justifyContent: 'flex-start', fontSize: '0.775rem', color: '#059669' }}>
                    <PhoneCall size={13} /> Bidan Desa: 0812-9988-7766
                  </a>
                  <a href="tel:085266778899" className="btn btn-secondary btn-sm" style={{ justifyContent: 'flex-start', fontSize: '0.775rem', color: '#2563eb' }}>
                    <PhoneCall size={13} /> Bhabinkamtibmas: 0852-6677-8899
                  </a>
                  <a href="tel:081311224455" className="btn btn-secondary btn-sm" style={{ justifyContent: 'flex-start', fontSize: '0.775rem', color: '#7c3aed' }}>
                    <PhoneCall size={13} /> Babinsa TNI: 0813-1122-4455
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EMERGENCY REPORT FORM */}
          {step === 'FORM' && (
            <form onSubmit={handleSubmit}>
              <div style={{ background: selectedType.bg, border: `1px solid ${selectedType.border}`, padding: '0.85rem', borderRadius: '8px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <selectedType.icon size={20} color={selectedType.color} />
                  <strong style={{ fontSize: '0.9rem', color: selectedType.color }}>
                    Kategori: {selectedType.label}
                  </strong>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                  onClick={() => setStep('SELECT')}
                >
                  Ganti
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nama Pelapor / Warga *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Lengkap Anda"
                    className="form-control"
                    value={callerName}
                    onChange={(e) => setCallerName(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nomor WhatsApp / HP Aktif *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 081234567890"
                    className="form-control"
                    value={callerPhone}
                    onChange={(e) => setCallerPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Lokasi Kejadian Lengkap (Dusun / RW / RT) *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dusun Pasirjati RW 02 RT 03 (Dekat Masjid Al-Hidayah)"
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Rincian Situasi Kejadian</label>
                <textarea
                  rows={2}
                  placeholder="Jelaskan kondisi pasien, korban, atau situasi darurat secara ringkas..."
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setStep('SELECT')}
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="btn btn-danger"
                  style={{ fontWeight: 800, padding: '0.65rem 1.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Send size={15} /> KIRIM ALARM DARURAT
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION */}
          {step === 'SUCCESS' && (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <CheckCircle2 size={36} />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#166534', margin: '0 0 0.5rem 0' }}>
                Laporan Darurat Berhasil Diteruskan!
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                Alarm telah diterima oleh Posko Siaga Desa. Petugas dan mobil siaga desa sedang berkoordinasi dan akan segera menghubungi Anda di nomor <strong>{callerPhone}</strong>.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleReset}
                  style={{ fontWeight: 700 }}
                >
                  Selesai
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
