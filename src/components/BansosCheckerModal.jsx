import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  FileText, 
  Calendar, 
  User, 
  CreditCard,
  Building,
  ArrowRight
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function BansosCheckerModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const bansosList = StorageService.getBansosList() || [];
    const q = searchQuery.trim().replace(/\D/g, ''); // Digits only

    // Match either NIK or No. KK or full query
    const match = bansosList.find(b => 
      b.nik === q || 
      b.nokk === q ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );

    setSearchResult(match || null);
    setHasSearched(true);
  };

  const formatRupiah = (num) => {
    if (!num) return 'Bantuan Fisik / Natura';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)', color: '#ffffff', borderBottom: 'none' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.6rem', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700, color: '#6ee7b7', marginBottom: '0.35rem' }}>
              <ShieldCheck size={12} /> Transparansi Bansos Desa
            </div>
            <h3 className="modal-title" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
              Cek Kepesertaan Bantuan Sosial (Bansos)
            </h3>
            <span style={{ fontSize: '0.775rem', color: '#94a3b8' }}>
              Pengecekan mandiri BLT Dana Desa (BLT-DD), PKH, BPNT, dan Cadangan Pangan Pemerintah (CPP).
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
          
          {/* Search Form */}
          <form onSubmit={handleSearch} style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" style={{ fontWeight: 800 }}>
              Masukkan 16 Digit Nomor Induk Kependudukan (NIK) atau Nomor KK:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
              <input
                type="text"
                placeholder="Contoh: 3201121504820001"
                className="form-control"
                style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.5px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ fontWeight: 700, whiteSpace: 'nowrap', padding: '0.65rem 1.25rem' }}
              >
                <Search size={16} /> Cek Data
              </button>
            </div>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '0.35rem', display: 'block' }}>
              💡 Tips: Data sinkron dengan penetapan Musdes Khusus BLT-DD dan data DTKS Kemensos RI.
            </span>
          </form>

          {/* Search Results */}
          {hasSearched && (
            <div>
              {searchResult ? (
                <div style={{
                  background: 'var(--light-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid #10b981',
                  padding: '1.35rem',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--light-border)', paddingBottom: '0.75rem' }}>
                    <div>
                      <span className="badge badge-success" style={{ fontSize: '0.725rem', fontWeight: 800 }}>
                        ✓ TERDAFTAR SEBAGAI PENERIMA
                      </span>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-main)', margin: '0.35rem 0 0 0' }}>
                        {searchResult.name}
                      </h4>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>STATUS KELAYAKAN</span>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#059669' }}>
                        {searchResult.desil}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--light-border)' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block' }}>PROGRAM BANTUAN</span>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem' }}>
                        {searchResult.program}
                      </div>
                    </div>

                    <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--light-border)' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block' }}>NOMINAL / BENTUK BANTUAN</span>
                      <div style={{ fontSize: '1rem', fontWeight: 900, color: '#059669', marginTop: '0.2rem' }}>
                        {formatRupiah(searchResult.amount)}
                      </div>
                    </div>

                    <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--light-border)' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block' }}>PERIODE PENYALURAN</span>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                        {searchResult.period}
                      </div>
                    </div>

                    <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--light-border)' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block' }}>MEKANISME PENYALURAN</span>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                        {searchResult.bankAccount}
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '0.85rem', color: '#065f46', fontSize: '0.8rem' }}>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>📋 Syarat Pengambilan Bantuan:</strong>
                    1. Membawa KTP-el Asli dan Kartu Keluarga (KK) Asli.<br />
                    2. Pengambilan tidak boleh diwakilkan kecuali dalam 1 KK dengan surat kuasa.<br />
                    3. Tidak ada potongan biaya apapun (Gratis & Bebas Pungli 100%).
                  </div>
                </div>
              ) : (
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <AlertCircle size={36} color="#dc2626" style={{ margin: '0 auto 0.5rem' }} />
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#991b1b', margin: '0 0 0.35rem 0' }}>
                    Data NIK / KK Tidak Ditemukan dalam Daftar Penerima
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#7f1d1d', margin: 0, lineHeight: 1.5 }}>
                    Nomor identitas tersebut belum terdaftar sebagai Keluarga Penerima Manfaat (KPM) bantuan sosial aktif saat ini.
                  </p>
                  <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#b91c1c' }}>
                    Apabila Anda memenuhi kriteria prasejahtera namun belum terdaftar, Anda dapat mengajukan usulan mandiri melalui Layanan Surat Keterangan Tidak Mampu (SKTM) atau lapor ke RT/RW setempat.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Info Samples */}
          {!hasSearched && (
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid var(--light-border)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
                💡 Contoh NIK Sampel untuk Pengujian Cepat:
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}
                  onClick={() => setSearchQuery('3201121504820001')}
                >
                  Asep Suryana (BLT-DD)
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}
                  onClick={() => setSearchQuery('3201120509800003')}
                >
                  Maman Firmansyah (PKH)
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}
                  onClick={() => setSearchQuery('3201122512880005')}
                >
                  Kosasih (Beras CPP)
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
