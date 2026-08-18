import React from 'react';
import { X, Printer, Download, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function LetterPrintModal({ isOpen, onClose, request, profile }) {
  if (!isOpen || !request) return null;

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
      <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Building2 size={22} color="#059669" />
            <div>
              <h3 className="modal-title" style={{ fontSize: '1.15rem', margin: 0 }}>
                Pratinjau Surat Resmi Desa
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Dokumen Resmi Pelayanan Administrasi Kependudukan
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-primary btn-sm" onClick={handlePrint}>
              <Printer size={16} /> Cetak / Simpan PDF
            </button>
            <button className="modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Official Document Layout */}
        <div className="modal-body" style={{ background: '#f8fafc', padding: '1.5rem' }}>
          <div 
            className="print-area"
            style={{
              background: '#ffffff',
              padding: '3rem 2.5rem',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              fontFamily: '"Times New Roman", Times, serif',
              color: '#000000',
              lineHeight: 1.5,
              border: '1px solid #e2e8f0'
            }}
          >
            {/* Kop Surat Resmi */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '3px double #000',
              paddingBottom: '1rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
              gap: '1.5rem'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                border: '2px solid #000',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                LOGO DESA
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '14pt', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  PEMERINTAH KABUPATEN NUSANTARA
                </h4>
                <h4 style={{ margin: '2px 0', fontSize: '13pt', textTransform: 'uppercase' }}>
                  KECAMATAN HARAPAN MAKMUR
                </h4>
                <h2 style={{ margin: '2px 0', fontSize: '16pt', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  KANTOR KEPALA DESA SUKAMAJU MANDIRI
                </h2>
                <p style={{ margin: 0, fontSize: '9.5pt', fontStyle: 'italic' }}>
                  {profile?.contact?.address || 'Jl. Raya Desa Sukamaju Mandiri No. 01'} | Email: {profile?.contact?.email || 'pemdes@desasukamaju.id'} | Telp: {profile?.contact?.phone || '(022) 8765-4321'}
                </p>
              </div>
            </div>

            {/* Judul Surat */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{
                fontSize: '14pt',
                textDecoration: 'underline',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                margin: 0
              }}>
                {request.letterName}
              </h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '11pt' }}>
                Nomor: 470 / {request.trackingCode.replace('DS-', '')} / Pemdes / {new Date().getFullYear()}
              </p>
            </div>

            {/* Paragraf Pembuka */}
            <p style={{ fontSize: '11pt', textIndent: '30px', textAlign: 'justify', marginBottom: '1rem' }}>
              Yang bertanda tangan di bawah ini Kepala Desa Sukamaju Mandiri, Kecamatan Harapan Makmur, Kabupaten Nusantara, dengan ini menerangkan dengan sebenarnya bahwa:
            </p>

            {/* Data Pemohon */}
            <table style={{ width: '100%', fontSize: '11pt', marginBottom: '1.25rem', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ width: '30%', padding: '4px 0' }}>Nama Lengkap</td>
                  <td style={{ width: '3%' }}>:</td>
                  <td style={{ fontWeight: 'bold' }}>{request.citizenName}</td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0' }}>NIK (No. KTP)</td>
                  <td>:</td>
                  <td>{request.nik}</td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0' }}>Alamat Domisili</td>
                  <td>:</td>
                  <td>{request.address || '-'} ({request.rtRw || 'RT 01 / RW 01'})</td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0' }}>Desa / Kelurahan</td>
                  <td>:</td>
                  <td>Desa Sukamaju Mandiri</td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0' }}>Kecamatan</td>
                  <td>:</td>
                  <td>Harapan Makmur</td>
                </tr>
                {request.businessName && request.businessName !== '-' && (
                  <>
                    <tr>
                      <td style={{ padding: '4px 0' }}>Nama Usaha</td>
                      <td>:</td>
                      <td style={{ fontWeight: 'bold' }}>{request.businessName}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '4px 0' }}>Bidang Usaha</td>
                      <td>:</td>
                      <td>{request.businessType}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '4px 0' }}>Lokasi Usaha</td>
                      <td>:</td>
                      <td>{request.businessAddress}</td>
                    </tr>
                  </>
                )}
                <tr>
                  <td style={{ padding: '4px 0' }}>Keperluan / Tujuan</td>
                  <td>:</td>
                  <td style={{ fontStyle: 'italic' }}>{request.purpose}</td>
                </tr>
              </tbody>
            </table>

            {/* Paragraf Penutup */}
            <p style={{ fontSize: '11pt', textIndent: '30px', textAlign: 'justify', marginBottom: '1.5rem' }}>
              Orang tersebut di atas adalah benar-benar warga yang bertempat tinggal di wilayah Desa Sukamaju Mandiri. Berdasarkan data dan peninjauan kami di lapangan, yang bersangkutan memiliki catatan administrasi yang sah dan tidak sedang bermasalah dengan hukum. Demikian surat keterangan ini kami buat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.
            </p>

            {/* Tanda Tangan & QR Verification */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '2rem' }}>
              {/* QR Code Verification Box */}
              <div style={{
                border: '1px dashed #64748b',
                padding: '0.75rem',
                borderRadius: '6px',
                textAlign: 'center',
                maxWidth: '180px',
                fontSize: '8pt',
                fontFamily: 'sans-serif'
              }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  margin: '0 auto 6px',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '9px',
                  color: '#059669'
                }}>
                  QR VERIFIED<br />{request.trackingCode}
                </div>
                <span>Dokumen Digital Resmi TTE Desa Pintar Sukamaju</span>
              </div>

              {/* Signature Area */}
              <div style={{ textAlign: 'center', minWidth: '220px', fontSize: '11pt' }}>
                <p style={{ margin: 0 }}>Sukamaju, {currentDate}</p>
                <p style={{ margin: '2px 0 0 0', fontWeight: 'bold' }}>Kepala Desa Sukamaju Mandiri,</p>
                <div style={{ height: '65px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#059669', fontSize: '10pt', fontStyle: 'italic', border: '1px solid #10b981', padding: '2px 8px', borderRadius: '4px' }}>
                    [ Tanda Tangan Elektronik Sah ]
                  </span>
                </div>
                <p style={{ margin: 0, fontWeight: 'bold', textDecoration: 'underline' }}>
                  {profile?.headOfVillage?.name || 'H. Budi Santoso, S.AP'}
                </p>
                <p style={{ margin: 0, fontSize: '9pt' }}>NIP. 19780415 200501 1 003</p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Tutup
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Printer size={16} /> Cetak Surat Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
