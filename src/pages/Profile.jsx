import React, { useState } from 'react';
import { 
  Building2, 
  Target, 
  Compass, 
  History, 
  Users, 
  ShieldCheck, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Award,
  Sparkles,
  Search,
  Filter,
  Layers,
  MapPin,
  ExternalLink
} from 'lucide-react';

export default function Profile({ profile }) {
  const [selectedStructureTab, setSelectedStructureTab] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const apparatusList = profile?.apparatus || [];

  const categories = [
    'Semua',
    'Pemerintah Desa',
    'Kepala Dusun (Kadus)',
    'Rukun Warga (RW)',
    'Rukun Tetangga (RT)'
  ];

  const filteredApparatus = apparatusList.filter((person) => {
    const matchesTab = selectedStructureTab === 'Semua' || person.category === selectedStructureTab;
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          person.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (person.area && person.area.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const getCategoryCount = (cat) => {
    if (cat === 'Semua') return apparatusList.length;
    return apparatusList.filter(a => a.category === cat).length;
  };

  return (
    <div>
      {/* 1. Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b, #0f172a)',
        color: '#fff',
        padding: 'clamp(3.5rem, 5vw, 4.5rem) 0 clamp(2.5rem, 4vw, 3.5rem)',
        textAlign: 'center'
      }}>
        <div className="container">
          <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#6ee7b7' }}>
            Tentang Desa Kami
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.85rem)', fontWeight: 800, margin: '0.5rem 0 1rem' }}>
            Profil & Struktur {profile?.name || 'Desa Sukamaju Mandiri'}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', maxWidth: '640px', margin: '0 auto' }}>
            Mengenal sejarah, visi, misi pembangunan berkelanjutan, serta struktur aparatur hingga tingkat RW dan RT.
          </p>
        </div>
      </div>

      {/* 2. Sejarah & Balai Desa Overview */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="section-badge">Asal Usul & Transformasi</span>
              <h2 className="section-title">Sejarah Singkat Desa</h2>
              <p style={{ color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                {profile?.history}
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                <div style={{ background: 'var(--light-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Kode Wilayah</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>{profile?.code}</div>
                </div>
                <div style={{ background: 'var(--light-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Luas Wilayah</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>{profile?.stats?.areaSize}</div>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '4px solid var(--light-surface)'
              }}>
                <img
                  src={profile?.officePhoto || profile?.bannerImage}
                  alt="Kantor Balai Desa"
                  style={{ width: '100%', height: '360px', objectFit: 'cover' }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-1.25rem',
                right: '1.5rem',
                background: 'var(--light-surface)',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--light-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Desa Mandiri 2026</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status IDM Tertinggi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Visi & Misi */}
      <section className="section" style={{ background: 'var(--light-surface)', borderTop: '1px solid var(--light-border)', borderBottom: '1px solid var(--light-border)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-badge">Arah Kebijakan</span>
            <h2 className="section-title">Visi & Misi Pembangunan</h2>
            <p className="section-subtitle">Komitmen terarah untuk mewujudkan kemandirian dan kesejahteraan seluruh warga.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '2rem' }}>
            {/* Visi Card */}
            <div style={{
              background: 'linear-gradient(135deg, #064e3b, #059669)',
              color: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Target size={22} color="#6ee7b7" />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>VISI UTAMA</h3>
              </div>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: '#f0fdf4', fontStyle: 'italic', margin: 0 }}>
                "{profile?.vision}"
              </p>
            </div>

            {/* Misi Card */}
            <div style={{
              background: 'var(--light-bg)',
              border: '1px solid var(--light-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Compass size={22} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>MISI DESA</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {profile?.missions?.map((misi, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: '#059669',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      {idx + 1}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', margin: 0, lineHeight: 1.5 }}>
                      {misi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STRUKTUR LENGKAP: PEMERINTAH DESA, KADUS, 10 RW, 20 RT */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-badge">
              <Users size={14} /> Pelayan Masyarakat
            </span>
            <h2 className="section-title">Struktur Pemerintahan Desa, RW & RT</h2>
            <p className="section-subtitle">
              Jajaran aparatur desa, kepala dusun, ketua rukun warga (10 RW), dan ketua rukun tetangga (20 RT) yang siap melayani masyarakat.
            </p>
          </div>

          {/* Search & Hierarchy Category Filter */}
          <div style={{
            background: 'var(--light-surface)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--light-border)',
            boxShadow: 'var(--shadow-card)',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Cari pengurus berdasarkan nama, jabatan (cth: RW 03, RT 15, Kadus Pasirjati, Sekdes)..."
                className="form-control"
                style={{ paddingLeft: '2.75rem', height: '44px', fontSize: '0.925rem', borderRadius: 'var(--radius-md)' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-tab ${selectedStructureTab === cat ? 'active' : ''}`}
                  onClick={() => setSelectedStructureTab(cat)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <span>{cat}</span>
                  <span style={{
                    background: selectedStructureTab === cat ? 'rgba(255,255,255,0.25)' : '#e2e8f0',
                    color: selectedStructureTab === cat ? '#fff' : '#475569',
                    padding: '0.1rem 0.45rem',
                    borderRadius: '999px',
                    fontSize: '0.725rem',
                    fontWeight: 800
                  }}>
                    {getCategoryCount(cat)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          {filteredApparatus.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--light-border)' }}>
              <Users size={40} color="#94a3b8" style={{ margin: '0 auto 0.75rem' }} />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>Tidak ditemukan pengurus yang cocok</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Coba ubah kata kunci pencarian atau ganti filter kategori.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 270px), 1fr))', gap: '1.5rem' }}>
              {filteredApparatus.map((person) => (
                <div 
                  key={person.id} 
                  className="card" 
                  style={{ textAlign: 'center', overflow: 'hidden' }}
                >
                  <div style={{ height: '220px', background: '#f1f5f9', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={person.photo}
                      alt={person.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                      <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                        {person.category}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.15rem 0 0.35rem' }}>
                        {person.name}
                      </h3>
                      <div style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 700, marginBottom: '0.4rem' }}>
                        {person.position}
                      </div>
                      {person.nip && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 0.25rem 0' }}>
                          {person.nip}
                        </p>
                      )}
                      {person.area && (
                        <p style={{ fontSize: '0.75rem', color: '#475569', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                          <MapPin size={12} color="#059669" /> {person.area}
                        </p>
                      )}
                    </div>

                    {person.phone && (
                      <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--light-border)' }}>
                        <a
                          href={`https://wa.me/${person.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Halo ${person.position} (${person.name}), saya warga Desa Sukamaju ingin berkonsultasi.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-secondary btn-sm"
                          style={{ width: '100%', fontSize: '0.775rem', color: '#059669', borderColor: '#86efac' }}
                        >
                          <Phone size={13} /> Chat WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
