import React from 'react';
import { X, Printer, CheckCircle, ShieldCheck, FileText, Download } from 'lucide-react';

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
      <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '840px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText size={22} color="#059669" />
            <div>
              <h3 className="modal-title" style={{ fontSize: '1.2rem', margin: 0 }}>
                Pratinjau Surat Keterangan Resmi Desa
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Nomor Resi: <strong>{request.trackingCode}</strong>
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-primary btn-sm" onClick={handlePrint}>
              <Printer size={16} /> Cetak / Unduh PDF
            </button>
            <button className="modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PRINTABLE LETTER PAPER */}
        <div className="modal-body" style={{ background: '#f1f5f9', padding: '1.5rem' }}>
          <div
            className="print-area"
            style={{
              background: '#ffffff',
              padding: '3rem 2.75rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              fontFamily: '"Times New Roman", Times, serif',
              color: '#000000',
              lineHeight: 1.6,
              position: 'relative'
            }}
          >
            {/* KOP SURAT RESMI */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderBottom: '3px double #000000', paddingBottom: '0.85rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '80px', height: '80px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {profile?.logo ? (
                  <img
                    src={profile.logo}
                    alt="Logo Pemda"
                    style={{ width: '75px', height: '75px', objectFit: 'contain' }}
                  />
                ) : (
                  <div style={{ width: '65px', height: '65px', borderRadius: '50%', border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '10pt' }}>
                    PEMDA
                  </div>
                )}
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <h3 style={{ fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>
                  PEMERINTAH KABUPATEN NUSANTARA
                </h3>
                <h4 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', margin: '2px 0' }}>
                  KECAMATAN HARAPAN MAKMUR
                </h4>
                <h2 style={{ fontSize: '15pt', fontWeight: 'bold', textTransform: 'uppercase', margin: '2px 0', letterSpacing: '1px' }}>
                  KANTOR KEPALA DESA SUKAMAJU MANDIRI
                </h2>
                <p style={{ fontSize: '9pt', margin: 0, fontStyle: 'italic' }}>
                  {profile?.contact?.address || 'Jl. Raya Sukamaju No. 01'} | Telp: {profile?.contact?.phone || '(022) 8765-4321'} | Email: {profile?.contact?.email || 'pemdes@desasukamaju.id'}
                </p>
              </div>
            </div>

            {/* JUDUL SURAT & NOMOR */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase', textDecoration: 'underline', margin: 0 }}>
                {request.letterName || 'SURAT KETERANGAN USAHA'}
              </h3>
              <p style={{ fontSize: '10.5pt', margin: '3px 0 0 0' }}>
                Nomor: 500 / {request.letterType || 'SKU'} / DS-SKM / {new Date().getFullYear()}
              </p>
            </div>

            {/* ISI SURAT */}
            <div style={{ fontSize: '11pt', textAlign: 'justify', marginBottom: '1rem' }}>
              <p style={{ textIndent: '30px', margin: '0 0 1rem 0' }}>
                Yang bertanda tangan di bawah ini, Kepala Desa Sukamaju Mandiri, Kecamatan Harapan Makmur, Kabupaten Nusantara, dengan ini menerangkan dengan sebenarnya bahwa:
              </p>

              {/* TABEL DATA PEMOHON */}
              <table style={{ width: '100%', marginBottom: '1rem', borderCollapse: 'collapse', fontSize: '11pt' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '220px', padding: '3px 0' }}>Nama Lengkap</td>
                    <td style={{ width: '15px' }}>:</td>
                    <td style={{ fontWeight: 'bold' }}>{request.citizenName}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0' }}>Nomor Induk Kependudukan (NIK)</td>
                    <td>:</td>
                    <td>{request.nik}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0' }}>Alamat Domisili</td>
                    <td>:</td>
                    <td>{request.address || '-'} ({request.rtRw || 'RT 01 / RW 01'})</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0' }}>Desa / Kelurahan</td>
                    <td>:</td>
                    <td>Sukamaju Mandiri</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0' }}>Kecamatan</td>
                    <td>:</td>
                    <td>Harapan Makmur</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 0' }}>Nomor WhatsApp / Telepon</td>
                    <td>:</td>
                    <td>{request.phone}</td>
                  </tr>

                  {/* KHUSUS SKU */}
                  {request.letterType === 'SKU' && request.businessName && request.businessName !== '-' && (
                    <>
                      <tr>
                        <td style={{ padding: '3px 0' }}>Nama Usaha</td>
                        <td>:</td>
                        <td style={{ fontWeight: 'bold' }}>{request.businessName}</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '3px 0' }}>Bidang / Jenis Usaha</td>
                        <td>:</td>
                        <td>{request.businessType}</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '3px 0' }}>Alamat Usaha</td>
                        <td>:</td>
                        <td>{request.businessAddress}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>

              <p style={{ textIndent: '30px', margin: '0 0 1rem 0' }}>
                Bahwa nama tersebut di atas benar-benar adalah warga penduduk Desa Sukamaju Mandiri dan berdasarkan pengamatan kami hingga saat ini memiliki rekam jejak yang baik. Surat keterangan ini diterbitkan untuk keperluan: <strong>"{request.purpose}"</strong>.
              </p>

              <p style={{ textIndent: '30px', margin: 0 }}>
                Demikian surat keterangan ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya oleh yang bersangkutan.
              </p>
            </div>

            {/* TANDA TANGAN KADES & BARCODE VERIFIKASI */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '2.5rem', fontSize: '11pt' }}>
              {/* Barcode & TTE Seal */}
              <div style={{ width: '220px', textAlign: 'center', padding: '0.75rem', border: '1px dashed #64748b', borderRadius: '6px' }}>
                <div style={{ fontSize: '8pt', color: '#64748b', marginBottom: '4px' }}>VERIFIKASI DOKUMEN ELEKTRONIK</div>
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #059669',
                  padding: '6px',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#059669',
                  fontWeight: 'bold',
                  fontSize: '9pt'
                }}>
                  <ShieldCheck size={18} /> TTE RESMI TERVERIFIKASI
                </div>
                <div style={{ fontSize: '7.5pt', color: '#64748b', marginTop: '4px' }}>
                  Resi: {request.trackingCode}<br />
                  Sistem Informasi Desa Pintar
                </div>
              </div>

              {/* TTD Kades */}
              <div style={{ textAlign: 'center', width: '240px' }}>
                <p style={{ margin: 0 }}>Sukamaju, {currentDate}</p>
                <p style={{ margin: '2px 0 0 0', fontWeight: 'bold' }}>
                  KEPALA DESA SUKAMAJU MANDIRI,
                </p>
                
                {/* Tanda tangan elektronik visual */}
                <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{
                    border: '1.5px solid #059669',
                    borderRadius: '50px',
                    padding: '4px 14px',
                    color: '#059669',
                    fontSize: '9pt',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    transform: 'rotate(-3deg)'
                  }}>
                    [ TTE Sah Kepala Desa ]
                  </div>
                </div>

                <p style={{ margin: 0, fontWeight: 'bold', textDecoration: 'underline' }}>
                  {profile?.headOfVillage?.name || 'H. Budi Santoso, S.AP'}
                </p>
                <p style={{ margin: 0, fontSize: '9pt' }}>
                  NIP. 19780415 200501 1 003
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
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
