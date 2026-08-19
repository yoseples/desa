import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Users, 
  Building, 
  Calendar, 
  CheckCircle2, 
  Layers, 
  Coins, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function AdminReports({ profile }) {
  const [selectedReport, setSelectedReport] = useState('BUKU_INDUK'); // 'BUKU_INDUK', 'BUKU_MUTASI', 'REKAP_BULANAN', 'BANNER_APBDES'
  
  const families = StorageService.getFamilies() || [];
  const citizens = StorageService.getAllCitizens() || [];
  const programs = StorageService.getWorkPrograms() || [];
  const bansosList = StorageService.getBansosList() || [];

  const totalCitizens = citizens.length;
  const maleCount = citizens.filter(c => (c.gender || '').toLowerCase().startsWith('l')).length;
  const femaleCount = citizens.filter(c => (c.gender || '').toLowerCase().startsWith('p')).length;

  const totalApbdes = programs.reduce((acc, p) => acc + (p.budget || 0), 0);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num || 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. Header Toolbar */}
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
            <BookOpen size={12} /> Standar Permendagri No. 47 Tahun 2016
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            Cetak Buku Administrasi Desa & Infografis APBDes
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Ekspor dan cetak buku registrasi kependudukan dan laporan realisasi anggaran resmi siap arsip.
          </span>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handlePrint}
          style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Printer size={16} /> Cetak Lembar Dokumen
        </button>
      </div>

      {/* 2. Report Selector Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={`btn btn-sm ${selectedReport === 'BUKU_INDUK' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setSelectedReport('BUKU_INDUK')}
          style={{ fontWeight: 700 }}
        >
          <Users size={14} /> Buku Induk Penduduk (Model A.1)
        </button>
        <button
          type="button"
          className={`btn btn-sm ${selectedReport === 'REKAP_BULANAN' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setSelectedReport('REKAP_BULANAN')}
          style={{ fontWeight: 700 }}
        >
          <Calendar size={14} /> Buku Rekapitulasi Penduduk Akhir Bulan (Model A.4)
        </button>
        <button
          type="button"
          className={`btn btn-sm ${selectedReport === 'BANNER_APBDES' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setSelectedReport('BANNER_APBDES')}
          style={{ fontWeight: 700 }}
        >
          <Coins size={14} /> Infografis Transparansi APBDes Siap Cetak
        </button>
      </div>

      {/* 3. PRINTABLE REPORT CANVAS */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-md)',
        color: '#000000',
        fontFamily: "'Times New Roman', serif"
      }}>
        
        {/* KOP RESMI DESA */}
        <div style={{ textAlign: 'center', borderBottom: '3px double #000000', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
          <h4 style={{ margin: 0, fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase' }}>
            PEMERINTAH KABUPATEN {profile?.regency || 'SUMEDANG'}
          </h4>
          <h4 style={{ margin: '2px 0', fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase' }}>
            KECAMATAN {profile?.district || 'HARAPAN MAKMUR'}
          </h4>
          <h3 style={{ margin: 0, fontSize: '15pt', fontWeight: 'bold', textTransform: 'uppercase' }}>
            KANTOR KEPALA DESA {profile?.name || 'SUKAMAJU MANDIRI'}
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '9pt', fontStyle: 'italic' }}>
            {profile?.contact?.address || 'Jl. Raya Desa No. 01'} • Kode Pos {profile?.zipCode || '45361'} • Email: {profile?.contact?.email || 'pemdes@desa.id'}
          </p>
        </div>

        {/* ========================================================
            REPORT 1: BUKU INDUK PENDUDUK (MODEL A.1)
            ======================================================== */}
        {selectedReport === 'BUKU_INDUK' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase' }}>
                BUKU INDUK PENDUDUK DESA
              </h3>
              <span style={{ fontSize: '10pt', fontStyle: 'italic' }}>
                Lampiran Keputusan Menteri Dalam Negeri No. 47 Tahun 2016 (Format Model A.1)
              </span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9.5pt', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', textAlign: 'center' }}>
                  <th style={{ border: '1px solid #000', padding: '6px' }}>NO</th>
                  <th style={{ border: '1px solid #000', padding: '6px' }}>NAMA LENGKAP</th>
                  <th style={{ border: '1px solid #000', padding: '6px' }}>NIK / NO. KK</th>
                  <th style={{ border: '1px solid #000', padding: '6px' }}>JENIS KELAMIN</th>
                  <th style={{ border: '1px solid #000', padding: '6px' }}>TEMPAT / TGL LAHIR</th>
                  <th style={{ border: '1px solid #000', padding: '6px' }}>AGAMA / PENDIDIKAN</th>
                  <th style={{ border: '1px solid #000', padding: '6px' }}>PEKERJAAN</th>
                  <th style={{ border: '1px solid #000', padding: '6px' }}>ALAMAT DUSUN / RT</th>
                </tr>
              </thead>
              <tbody>
                {citizens.slice(0, 15).map((c, idx) => (
                  <tr key={idx}>
                    <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>{idx + 1}</td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold' }}>{c.name}</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>{c.nik}<br /><span style={{ fontSize: '8pt', color: '#475569' }}>KK: {c.familyNoKk || '-'}</span></td>
                    <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>{c.gender}</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>{c.birthPlace}, {c.birthDate}</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>{c.religion || 'Islam'} / {c.education || 'SMA/Sederajat'}</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>{c.job || 'Wiraswasta'}</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>{c.dusun || 'Pasirjati'} RT {c.rt || '01'} / RW {c.rw || '01'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ========================================================
            REPORT 2: BUKU REKAPITULASI PENDUDUK AKHIR BULAN (MODEL A.4)
            ======================================================== */}
        {selectedReport === 'REKAP_BULANAN' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase' }}>
                BUKU REKAPITULASI JUMLAH PENDUDUK AKHIR BULAN
              </h3>
              <span style={{ fontSize: '10pt', fontStyle: 'italic' }}>
                Bulan: Agustus {new Date().getFullYear()} • Format Model A.4 Permendagri 47/2016
              </span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10pt', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', textAlign: 'center' }}>
                  <th style={{ border: '1px solid #000', padding: '6px' }} rowSpan={2}>NO</th>
                  <th style={{ border: '1px solid #000', padding: '6px' }} rowSpan={2}>NAMA DUSUN / WILAYAH</th>
                  <th style={{ border: '1px solid #000', padding: '6px' }} rowSpan={2}>JUMLAH KK</th>
                  <th style={{ border: '1px solid #000', padding: '6px' }} colSpan={2}>JENIS KELAMIN</th>
                  <th style={{ border: '1px solid #000', padding: '6px' }} rowSpan={2}>TOTAL JIWA</th>
                  <th style={{ border: '1px solid #000', padding: '6px' }} rowSpan={2}>DESIL 1 (EKSTREM)</th>
                </tr>
                <tr style={{ background: '#f1f5f9', textAlign: 'center' }}>
                  <th style={{ border: '1px solid #000', padding: '4px' }}>LAKI-LAKI</th>
                  <th style={{ border: '1px solid #000', padding: '4px' }}>PEREMPUAN</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>1</td>
                  <td style={{ border: '1px solid #000', padding: '6px' }}>Dusun Pasirjati (RW 01, 02, 03)</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>420 KK</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>760 Jiwa</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>740 Jiwa</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center', fontWeight: 'bold' }}>1.500 Jiwa</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>12 KK</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>2</td>
                  <td style={{ border: '1px solid #000', padding: '6px' }}>Dusun Sukarame (RW 04, 05)</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>310 KK</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>580 Jiwa</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>560 Jiwa</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center', fontWeight: 'bold' }}>1.140 Jiwa</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>8 KK</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>3</td>
                  <td style={{ border: '1px solid #000', padding: '6px' }}>Dusun Cikembar (RW 06, 07, 08)</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>350 KK</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>640 Jiwa</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>620 Jiwa</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center', fontWeight: 'bold' }}>1.260 Jiwa</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>9 KK</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>4</td>
                  <td style={{ border: '1px solid #000', padding: '6px' }}>Dusun Mekar (RW 09, 10)</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>240 KK</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>480 Jiwa</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>470 Jiwa</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center', fontWeight: 'bold' }}>950 Jiwa</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>6 KK</td>
                </tr>
                <tr style={{ background: '#f1f5f9', fontWeight: 'bold' }}>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }} colSpan={2}>TOTAL KESELURUHAN DESA</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>1.320 KK</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>2.460 Jiwa</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>2.390 Jiwa</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>4.850 Jiwa</td>
                  <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'center' }}>35 KK</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* ========================================================
            REPORT 3: INFOGRAFIS TRANSPARANSI APBDES
            ======================================================== */}
        {selectedReport === 'BANNER_APBDES' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '14pt', fontWeight: 'bold', textTransform: 'uppercase' }}>
                LAPORAN PERTANGGUNGJAWABAN REALISASI APBDES T.A. {new Date().getFullYear()}
              </h3>
              <span style={{ fontSize: '10pt', fontStyle: 'italic' }}>
                Transparansi Anggaran Pendapatan dan Belanja Desa Berdasarkan Pos Sumber Dana Resmi
              </span>
            </div>

            <div style={{ border: '2px solid #000', padding: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '12pt', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>
                TOTAL PAGU BELANJA RAPBDES: {formatRupiah(totalApbdes)}
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9.5pt' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9' }}>
                    <th style={{ border: '1px solid #000', padding: '5px' }}>BIDANG KEGIATAN</th>
                    <th style={{ border: '1px solid #000', padding: '5px' }}>NAMA PROGRAM / KEGIATAN</th>
                    <th style={{ border: '1px solid #000', padding: '5px' }}>SUMBER DANA</th>
                    <th style={{ border: '1px solid #000', padding: '5px' }}>PAGU ANGGARAN</th>
                    <th style={{ border: '1px solid #000', padding: '5px' }}>OUTPUT & STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((p, idx) => (
                    <tr key={idx}>
                      <td style={{ border: '1px solid #000', padding: '5px' }}>{p.category}</td>
                      <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold' }}>{p.title}</td>
                      <td style={{ border: '1px solid #000', padding: '5px' }}>{p.fundingSource}</td>
                      <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold' }}>{formatRupiah(p.budget)}</td>
                      <td style={{ border: '1px solid #000', padding: '5px' }}>{p.output} ({p.status})</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TANDA TANGAN PENGESAHAN */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', textAlign: 'center', fontSize: '10.5pt', marginTop: '2rem' }}>
          <div>
            <span>Mengetahui,</span><br />
            <span>Sekretaris Desa {profile?.name || 'Sukamaju'}</span>
            <div style={{ height: '65px' }}></div>
            <strong style={{ textDecoration: 'underline' }}>Rahmat Hidayat, S.IP</strong><br />
            <span>NIP. 19830820 200902 1 002</span>
          </div>
          <div>
            <span>Ditetapkan di {profile?.name || 'Sukamaju'},</span><br />
            <span>Kepala Desa {profile?.name || 'Sukamaju'}</span>
            <div style={{ height: '65px' }}></div>
            <strong style={{ textDecoration: 'underline' }}>{profile?.headOfVillage?.name || 'H. Budi Santoso, S.AP'}</strong><br />
            <span>NIP. {profile?.headOfVillage?.nip || '19780415 200501 1 003'}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
