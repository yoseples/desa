import React, { useRef } from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';
import { defaultLetterheadConfig } from '../services/letterTemplatesData';

export default function LetterPrintModal({ isOpen, onClose, request, profile }) {
  if (!isOpen || !request) return null;

  const letterhead = profile?.letterhead || defaultLetterheadConfig;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '820px', width: '95%' }}
      >
        {/* Actions Bar (Screen only, hidden on print) */}
        <div className="modal-header hide-on-print">
          <div>
            <h3 className="modal-title" style={{ fontSize: '1.2rem' }}>
              Cetak Dokumen Resmi Desa
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Kode Resi: <strong>{request.trackingCode}</strong>
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button className="btn btn-primary btn-sm" onClick={handlePrint}>
              <Printer size={16} /> Cetak / Simpan PDF
            </button>
            <button className="modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PRINTABLE PAPER DOCUMENT AREA */}
        <div className="modal-body" style={{ background: '#f1f5f9', padding: '1.5rem', overflowY: 'auto' }}>
          <div 
            className="print-area"
            style={{
              background: '#ffffff',
              padding: '3rem 2.5rem',
              color: '#000000',
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: '11pt',
              lineHeight: 1.5,
              borderRadius: '4px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              margin: '0 auto',
              maxWidth: '700px'
            }}
          >
            {/* KOP SURAT DINAMIS */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              borderBottom: letterhead.lineStyle === 'double' ? '3px double #000000' : '2px solid #000000',
              paddingBottom: '0.75rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ width: '80px', height: '80px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {profile?.logo ? (
                  <img src={profile.logo} alt="Logo" style={{ width: '75px', height: '75px', objectFit: 'contain' }} />
                ) : (
                  <div style={{ width: '65px', height: '65px', borderRadius: '50%', border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    LOGO
                  </div>
                )}
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <h3 style={{ fontSize: '11.5pt', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>
                  {letterhead.regencyName}
                </h3>
                <h4 style={{ fontSize: '11pt', fontWeight: 'bold', margin: '2px 0', textTransform: 'uppercase' }}>
                  {letterhead.districtName}
                </h4>
                <h2 style={{ fontSize: '14.5pt', fontWeight: 'bold', margin: '2px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {letterhead.villageName}
                </h2>
                <p style={{ fontSize: '8.5pt', margin: 0, fontStyle: 'italic', lineHeight: 1.3 }}>
                  Alamat: {letterhead.address} Kode Pos {letterhead.postalCode} | Telp: {letterhead.phone} | Email: {letterhead.email}
                </p>
              </div>
            </div>

            {/* JUDUL SURAT */}
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '12.5pt', fontWeight: 'bold', textTransform: 'uppercase', textDecoration: 'underline', margin: 0 }}>
                {request.letterName || 'SURAT KETERANGAN RESMI'}
              </h3>
              <p style={{ fontSize: '10pt', margin: '3px 0 0 0' }}>
                Nomor: 470 / {request.trackingCode?.replace('DS-', '') || '012'} / DS-SKM / VIII / 2026
              </p>
            </div>

            {/* ISI SURAT */}
            <div style={{ textAlign: 'justify', fontSize: '10.5pt', marginBottom: '1.25rem' }}>
              <p style={{ textIndent: '28px', margin: '0 0 0.75rem 0' }}>
                Yang bertanda tangan di bawah ini Kepala Desa Sukamaju Mandiri, Kecamatan Harapan Makmur, Kabupaten Nusantara, dengan ini menerangkan dengan sebenarnya bahwa:
              </p>

              <table style={{ width: '100%', marginBottom: '0.75rem', borderCollapse: 'collapse', fontSize: '10.5pt' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '180px', padding: '2px 0' }}>Nama Lengkap</td>
                    <td style={{ width: '12px' }}>:</td>
                    <td style={{ fontWeight: 'bold' }}>{request.citizenName}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '2px 0' }}>Nomor Induk Kependudukan (NIK)</td>
                    <td>:</td>
                    <td>{request.nik}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '2px 0' }}>Nomor Telepon / WA</td>
                    <td>:</td>
                    <td>{request.phone || '-'}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '2px 0' }}>Alamat Domisili</td>
                    <td>:</td>
                    <td>{request.address || 'Desa Sukamaju'} ({request.rtRw || 'RT 01 / RW 01'})</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '2px 0' }}>Desa / Kelurahan</td>
                    <td>:</td>
                    <td>Sukamaju Mandiri</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '2px 0' }}>Kecamatan</td>
                    <td>:</td>
                    <td>Harapan Makmur</td>
                  </tr>
                </tbody>
              </table>

              {/* Rincian Khusus Berdasarkan Jenis Surat */}
              {request.businessName && request.businessName !== '-' && (
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.65rem 1rem', marginBottom: '0.75rem' }}>
                  <strong>Rincian Keterangan Usaha:</strong>
                  <table style={{ width: '100%', fontSize: '10pt', marginTop: '4px' }}>
                    <tbody>
                      <tr><td style={{ width: '160px' }}>Nama Usaha</td><td>: {request.businessName}</td></tr>
                      <tr><td>Bidang Usaha</td><td>: {request.businessType || '-'}</td></tr>
                      <tr><td>Lokasi Usaha</td><td>: {request.businessAddress || '-'}</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              <p style={{ textIndent: '28px', margin: '0 0 0.5rem 0' }}>
                Berdasarkan data kependudukan dan surat pengantar pengurus RT/RW setempat, nama tersebut di atas adalah benar-benar warga penduduk Desa Sukamaju Mandiri yang berkelakuan baik.
              </p>

              <p style={{ textIndent: '28px', margin: '0 0 0.5rem 0' }}>
                Surat keterangan ini diterbitkan atas permohonan yang bersangkutan untuk keperluan: <strong>{request.purpose || 'Persyaratan Administrasi Resmi'}</strong>.
              </p>

              <p style={{ textIndent: '28px', margin: '0 0 0.5rem 0' }}>
                Demikian surat keterangan ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.
              </p>
            </div>

            {/* TANDA TANGAN & TTE QR */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '2.5rem', fontSize: '10pt' }}>
              {/* TTE QR Verifier */}
              <div style={{ width: '190px', textAlign: 'center', padding: '0.5rem', border: '1px dashed #64748b', borderRadius: '4px' }}>
                <div style={{ fontSize: '7.5pt', color: '#64748b', marginBottom: '2px' }}>VERIFIKASI KEASLIAN RESMI</div>
                <div style={{ background: '#f8fafc', padding: '5px', border: '1px solid #059669', color: '#059669', fontWeight: 'bold', fontSize: '8pt', borderRadius: '3px' }}>
                  ✓ DITANDATANGANI DIGITAL
                </div>
                <div style={{ fontSize: '7pt', color: '#64748b', marginTop: '3px' }}>
                  Resi: {request.trackingCode}
                </div>
              </div>

              {/* Pejabat Penandatangan */}
              <div style={{ textAlign: 'center', width: '230px' }}>
                <p style={{ margin: 0 }}>Sukamaju, {currentDate}</p>
                <p style={{ margin: '2px 0 0 0', fontWeight: 'bold' }}>{letterhead.signatoryRole}</p>
                <div style={{ height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '8.5pt', color: '#059669', fontStyle: 'italic', fontWeight: 'bold' }}>[ TTE Terverifikasi ]</span>
                </div>
                <p style={{ margin: 0, fontWeight: 'bold', textDecoration: 'underline' }}>
                  {letterhead.signatoryName}
                </p>
                <p style={{ margin: 0, fontSize: '8.5pt' }}>
                  NIP. {letterhead.signatoryNip}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer hide-on-print">
          <button className="btn btn-secondary" onClick={onClose}>
            Tutup
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Printer size={16} /> Cetak Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
