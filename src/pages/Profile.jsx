import React, { useState } from 'react';
import { 
  Building2, 
  History, 
  Target, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Award, 
  Layers 
} from 'lucide-react';

export default function Profile({ profile }) {
  const [activeTab, setActiveTab] = useState('visimisi'); // visimisi, history, apparatus, demography

  return (
    <div>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b, #0f172a)',
        color: '#fff',
        padding: '4rem 0 3.5rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#6ee7b7' }}>
            Mengenal Lebih Dekat
          </span>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, margin: '0.5rem 0 1rem' }}>
            Profil Pemerintah Desa
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Sejarah, visi misi, struktur kepengurusan aparatur, dan potensi demografi wilayah {profile?.name}.
          </p>
        </div>
      </div>

      {/* Profile Nav Tabs */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--light-border)', position: 'sticky', top: '76px', zIndex: 90 }}>
        <div className="container">
          <div className="filter-tabs" style={{ margin: 0, padding: '1rem 0', justifyContent: 'flex-start' }}>
            <button
              className={`filter-tab ${activeTab === 'visimisi' ? 'active' : ''}`}
              onClick={() => setActiveTab('visimisi')}
            >
              <Target size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              Visi & Misi
            </button>
            <button
              className={`filter-tab ${activeTab === 'apparatus' ? 'active' : ''}`}
              onClick={() => setActiveTab('apparatus')}
            >
              <Users size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              Perangkat Desa
            </button>
            <button
              className={`filter-tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <History size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              Sejarah Desa
            </button>
            <button
              className={`filter-tab ${activeTab === 'demography' ? 'active' : ''}`}
              onClick={() => setActiveTab('demography')}
            >
              <Layers size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              Demografi & Wilayah
            </button>
          </div>
        </div>
      </div>

      <div className="container section">
        {/* TAB 1: VISI & MISI */}
        {activeTab === 'visimisi' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Visi Card */}
            <div style={{
              background: 'linear-gradient(135deg, #059669, #0d9488)',
              color: '#fff',
              borderRadius: '20px',
              padding: '2.5rem',
              marginBottom: '2.5rem',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Target size={28} color="#a7f3d0" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Visi Desa
                </h3>
              </div>
              <blockquote style={{ fontSize: '1.3rem', fontWeight: 600, fontStyle: 'italic', lineHeight: 1.6 }}>
                "{profile?.vision}"
              </blockquote>
            </div>

            {/* Misi Card */}
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '2.5rem',
              border: '1px solid var(--light-border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Award size={28} color="#059669" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                  Misi Pembangunan Desa
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {profile?.missions?.map((misi, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--primary-light)',
                      color: 'var(--primary-dark)',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </div>
                    <p style={{ margin: 0, fontSize: '1.05rem', color: '#334155', lineHeight: 1.6 }}>
                      {misi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APARATUR DESA */}
        {activeTab === 'apparatus' && (
          <div>
            <div className="section-title-wrap">
              <span className="section-badge">Struktur Organisasi</span>
              <h2 className="section-title">Perangkat & Pamong Desa</h2>
              <p className="section-subtitle">Siap melayani masyarakat dengan integritas, profesionalitas, dan keramahan.</p>
            </div>

            <div className="card-grid">
              {profile?.apparatus?.map((app) => (
                <div key={app.id} className="card">
                  <div style={{ height: '280px', overflow: 'hidden', background: '#e2e8f0' }}>
                    <img src={app.photo} alt={app.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="card-body" style={{ textAlign: 'center' }}>
                    <span className="badge badge-success" style={{ alignSelf: 'center', marginBottom: '0.5rem' }}>
                      {app.position}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      {app.name}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      NIP: {app.nip || '-'}
                    </p>
                    <div style={{ borderTop: '1px solid var(--light-border)', paddingTop: '0.75rem', fontSize: '0.85rem', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                      <Phone size={14} /> {app.phone}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SEJARAH DESA */}
        {activeTab === 'history' && (
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ background: '#fff', borderRadius: '20px', padding: '2.5rem', border: '1px solid var(--light-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <History size={28} color="#059669" />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Sejarah Singkat Desa</h3>
              </div>
              <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155' }}>
                <p style={{ marginBottom: '1.5rem' }}>{profile?.history}</p>
                <div style={{
                  background: '#f8fafc',
                  borderLeft: '4px solid var(--primary)',
                  padding: '1.25rem',
                  borderRadius: '0 12px 12px 0'
                }}>
                  <strong style={{ display: 'block', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                    Identitas Wilayah Resmi:
                  </strong>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.925rem', color: 'var(--text-muted)' }}>
                    <li>• Kode Desa Kemendagri: <strong>{profile?.code}</strong></li>
                    <li>• Kecamatan: <strong>{profile?.district}</strong></li>
                    <li>• Kabupaten / Kota: <strong>{profile?.regency}</strong></li>
                    <li>• Provinsi: <strong>{profile?.province}</strong></li>
                    <li>• Kode Pos: <strong>{profile?.postalCode}</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DEMOGRAFI & WILAYAH */}
        {activeTab === 'demography' && (
          <div>
            <div className="section-title-wrap">
              <span className="section-badge">Kependudukan & Wilayah</span>
              <h2 className="section-title">Data Geografis & Demografi</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div className="stat-box">
                <div className="stat-icon"><Users size={28} /></div>
                <div className="stat-data">
                  <h3>{profile?.stats?.malePopulation?.toLocaleString('id-ID')} Jiwa</h3>
                  <p>Laki-Laki</p>
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-icon" style={{ background: '#fce7f3', color: '#db2777' }}><Users size={28} /></div>
                <div className="stat-data">
                  <h3>{profile?.stats?.femalePopulation?.toLocaleString('id-ID')} Jiwa</h3>
                  <p>Perempuan</p>
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-icon" style={{ background: '#e0e7ff', color: '#4338ca' }}><Building2 size={28} /></div>
                <div className="stat-data">
                  <h3>{profile?.stats?.rwCount} RW / {profile?.stats?.rtCount} RT</h3>
                  <p>Wilayah Administratif</p>
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-icon" style={{ background: '#dcfce7', color: '#15803d' }}><MapPin size={28} /></div>
                <div className="stat-data">
                  <h3>{profile?.stats?.areaSize}</h3>
                  <p>Luas Total Wilayah</p>
                </div>
              </div>
            </div>

            {/* Wilayah & Peta Mock */}
            <div style={{ background: '#fff', borderRadius: '20px', padding: '2rem', border: '1px solid var(--light-border)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={20} color="#059669" /> Batas-Batas Wilayah Desa
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.925rem' }}>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Sebelah Utara:</span>
                  <strong>Kecamatan Mekar Wangi</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Sebelah Selatan:</span>
                  <strong>Desa Sindang Asri</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Sebelah Timur:</span>
                  <strong>Hutan Lindung Gunung Hijau</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Sebelah Barat:</span>
                  <strong>Sungai Citarum Hulu</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
