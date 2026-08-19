import React, { useState } from 'react';
import { 
  PieChart, 
  BarChart2, 
  Users, 
  TrendingUp, 
  Layers, 
  Calendar, 
  Printer, 
  Filter, 
  ShieldCheck, 
  Briefcase, 
  GraduationCap, 
  HeartHandshake,
  Activity
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function AdminStatistics({ profile }) {
  const [activeStatTab, setActiveStatTab] = useState('pyramid'); // 'pyramid', 'education', 'jobs', 'religion', 'dusun'
  
  const citizens = StorageService.getAllCitizens() || [];
  const totalCitizens = citizens.length || 4850;

  // Age Groups for Pyramid
  const ageGroups = [
    { label: '75+ Thn', male: 12, female: 18, pctM: 15, pctF: 22 },
    { label: '70-74 Thn', male: 25, female: 28, pctM: 28, pctF: 32 },
    { label: '65-69 Thn', male: 42, female: 46, pctM: 45, pctF: 50 },
    { label: '60-64 Thn', male: 68, female: 65, pctM: 65, pctF: 62 },
    { label: '55-59 Thn', male: 95, female: 90, pctM: 78, pctF: 75 },
    { label: '50-54 Thn', male: 120, female: 115, pctM: 88, pctF: 84 },
    { label: '45-49 Thn', male: 145, female: 140, pctM: 92, pctF: 90 },
    { label: '40-44 Thn', male: 170, female: 165, pctM: 95, pctF: 92 },
    { label: '35-39 Thn', male: 190, female: 185, pctM: 98, pctF: 96 },
    { label: '30-34 Thn', male: 210, female: 205, pctM: 100, pctF: 98 },
    { label: '25-29 Thn', male: 200, female: 195, pctM: 96, pctF: 94 },
    { label: '20-24 Thn', male: 180, female: 175, pctM: 90, pctF: 88 },
    { label: '15-19 Thn', male: 165, female: 160, pctM: 86, pctF: 84 },
    { label: '10-14 Thn', male: 150, female: 145, pctM: 80, pctF: 78 },
    { label: '5-9 Thn', male: 135, female: 130, pctM: 72, pctF: 70 },
    { label: '0-4 Thn', male: 110, female: 105, pctM: 60, pctF: 58 }
  ];

  // Education Breakdown
  const educationStats = [
    { label: 'SMA / SMK / Sederajat', count: 1850, pct: 38.1, color: '#059669' },
    { label: 'SMP / MTs / Sederajat', count: 1240, pct: 25.6, color: '#0d9488' },
    { label: 'SD / MI / Sederajat', count: 980, pct: 20.2, color: '#2563eb' },
    { label: 'Diploma / Sarjana (D3/S1/S2)', count: 480, pct: 9.9, color: '#7c3aed' },
    { label: 'Belum / Tidak Tamat SD', count: 300, pct: 6.2, color: '#94a3b8' }
  ];

  // Jobs Breakdown
  const jobStats = [
    { label: 'Petani / Pekebun', count: 1620, pct: 33.4, color: '#059669' },
    { label: 'Wiraswasta / Pedagang', count: 1210, pct: 24.9, color: '#d97706' },
    { label: 'Karyawan Swasta / Buruh Pabrik', count: 890, pct: 18.4, color: '#2563eb' },
    { label: 'Ibu Rumah Tangga / Mengurus Rumah', count: 620, pct: 12.8, color: '#db2777' },
    { label: 'PNS / TNI / Polri / Perangkat Desa', count: 180, pct: 3.7, color: '#7c3aed' },
    { label: 'Pelajar / Mahasiswa / Belum Bekerja', count: 330, pct: 6.8, color: '#64748b' }
  ];

  // Dusun Breakdown
  const dusunStats = [
    { name: 'Dusun Pasirjati (RW 01-03)', population: 1500, households: 420, pct: 30.9, color: '#059669' },
    { name: 'Dusun Cikembar (RW 06-08)', population: 1260, households: 350, pct: 26.0, color: '#2563eb' },
    { name: 'Dusun Sukarame (RW 04-05)', population: 1140, households: 310, pct: 23.5, color: '#d97706' },
    { name: 'Dusun Mekar (RW 09-10)', population: 950, households: 240, pct: 19.6, color: '#7c3aed' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. Header Card */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.2rem 0.6rem', background: 'var(--primary-light)', border: '1px solid var(--primary-border)', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>
            <BarChart2 size={12} /> Modul Statistik OpenSID
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            Statistik Demografi & Piramida Kependudukan
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Visualisasi data agregat kependudukan berdasarkan umur, pekerjaan, pendidikan, dan wilayah dusun.
          </span>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => window.print()}
          style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Printer size={15} /> Cetak Laporan Statistik
        </button>
      </div>

      {/* 2. Sub Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={`btn btn-sm ${activeStatTab === 'pyramid' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveStatTab('pyramid')}
          style={{ fontWeight: 700 }}
        >
          <TrendingUp size={14} /> Piramida Penduduk (Umur & Gender)
        </button>
        <button
          type="button"
          className={`btn btn-sm ${activeStatTab === 'education' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveStatTab('education')}
          style={{ fontWeight: 700 }}
        >
          <GraduationCap size={14} /> Tingkat Pendidikan
        </button>
        <button
          type="button"
          className={`btn btn-sm ${activeStatTab === 'jobs' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveStatTab('jobs')}
          style={{ fontWeight: 700 }}
        >
          <Briefcase size={14} /> Mata Pencaharian & Pekerjaan
        </button>
        <button
          type="button"
          className={`btn btn-sm ${activeStatTab === 'dusun' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveStatTab('dusun')}
          style={{ fontWeight: 700 }}
        >
          <Layers size={14} /> Sebaran per Dusun
        </button>
      </div>

      {/* 3. TAB 1: PIRAMIDA PENDUDUK OPENSID */}
      {activeStatTab === 'pyramid' && (
        <div className="table-wrapper">
          <div className="table-toolbar">
            <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <TrendingUp size={18} color="#059669" /> Piramida Struktur Umur Penduduk (Laki-laki vs Perempuan)
            </h3>
          </div>

          <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', fontSize: '0.85rem', fontWeight: 800 }}>
              <span style={{ color: '#2563eb', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '12px', height: '12px', background: '#2563eb', borderRadius: '3px' }}></span> Laki-laki (Total: 2.460 Jiwa)
              </span>
              <span style={{ color: '#db2777', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '12px', height: '12px', background: '#db2777', borderRadius: '3px' }}></span> Perempuan (Total: 2.390 Jiwa)
              </span>
            </div>

            {/* Pyramid Chart Canvas */}
            <div style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {ageGroups.map((grp, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  
                  {/* Left (Male Bar) */}
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 700 }}>{grp.male}</span>
                    <div style={{ width: `${grp.pctM}%`, height: '18px', background: 'linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)', borderRadius: '4px 0 0 4px', transition: 'width 0.4s ease' }}></div>
                  </div>

                  {/* Middle (Age Label) */}
                  <div style={{ width: '80px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', background: 'var(--light-surface)', padding: '2px 0', borderRadius: '4px', border: '1px solid var(--light-border)' }}>
                    {grp.label}
                  </div>

                  {/* Right (Female Bar) */}
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: `${grp.pctF}%`, height: '18px', background: 'linear-gradient(90deg, #ec4899 0%, #db2777 100%)', borderRadius: '0 4px 4px 0', transition: 'width 0.4s ease' }}></div>
                    <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 700 }}>{grp.female}</span>
                  </div>

                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              💡 Tipe Piramida: <strong>Ekspansif Produktif</strong> (Mayoritas penduduk berada pada usia angkatan kerja 15-54 tahun).
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 2: PENDIDIKAN */}
      {activeStatTab === 'education' && (
        <div className="table-wrapper">
          <div className="table-toolbar">
            <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <GraduationCap size={18} color="#059669" /> Statistik Tingkat Pendidikan Penduduk
            </h3>
          </div>

          <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {educationStats.map((item, idx) => (
                <div key={idx} style={{ background: 'var(--light-surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{item.label}</strong>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: item.color }}>{item.pct}%</span>
                  </div>
                  
                  <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden', marginBottom: '0.4rem' }}>
                    <div style={{ width: `${item.pct}%`, height: '100%', background: item.color, borderRadius: '9999px' }}></div>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Jumlah: <strong>{item.count.toLocaleString('id-ID')} Jiwa</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: PEKERJAAN */}
      {activeStatTab === 'jobs' && (
        <div className="table-wrapper">
          <div className="table-toolbar">
            <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Briefcase size={18} color="#059669" /> Komposisi Mata Pencaharian & Profesi Penduduk
            </h3>
          </div>

          <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {jobStats.map((item, idx) => (
                <div key={idx} style={{ background: 'var(--light-surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--light-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{item.label}</strong>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: item.color }}>{item.pct}%</span>
                  </div>
                  
                  <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden', marginBottom: '0.4rem' }}>
                    <div style={{ width: `${item.pct}%`, height: '100%', background: item.color, borderRadius: '9999px' }}></div>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Jumlah: <strong>{item.count.toLocaleString('id-ID')} Orang</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 4: SEBARAN DUSUN */}
      {activeStatTab === 'dusun' && (
        <div className="table-wrapper">
          <div className="table-toolbar">
            <h3 className="table-toolbar-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={18} color="#059669" /> Sebaran Penduduk & Kepadatan per Wilayah Dusun
            </h3>
          </div>

          <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {dusunStats.map((d, idx) => (
                <div key={idx} style={{ background: 'var(--light-surface)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: `2px solid ${d.color}40`, borderTop: `4px solid ${d.color}` }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.5rem 0' }}>
                    {d.name}
                  </h4>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: d.color, marginBottom: '0.25rem' }}>
                    {d.population.toLocaleString('id-ID')} Jiwa
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Jumlah KK: <strong>{d.households} KK</strong> ({d.pct}% dari total desa)
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
