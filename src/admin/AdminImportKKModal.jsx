import React, { useState } from 'react';
import { 
  FileUp, 
  Download, 
  FileText, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Sparkles, 
  Layers,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminImportKKModal({ isOpen, onClose, onImportSuccess }) {
  const [importType, setImportType] = useState('json'); // 'json' or 'csv'
  const [inputText, setInputText] = useState('');
  const [importMode, setImportMode] = useState('append'); // 'append' or 'replace'
  const [parsedData, setParsedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Helper to parse CSV format
  const parseCSVToFamilies = (csvString) => {
    const lines = csvString.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length <= 1) throw new Error('Data CSV kosong atau tidak memiliki baris data!');

    const header = lines[0].split(',').map(h => h.trim().toUpperCase());
    const familiesMap = {};

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.trim());
      if (cols.length < 9) continue;

      const noKk = cols[0];
      const headName = cols[1];
      const address = cols[2];
      const rt = cols[3] || '001';
      const rw = cols[4] || '001';
      const dusun = cols[5] || 'Dusun Sukamaju';
      const economicStatus = cols[6] || 'Menengah';

      if (!familiesMap[noKk]) {
        familiesMap[noKk] = {
          id: `kk-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          noKk,
          headName,
          address,
          rt,
          rw,
          dusun,
          postalCode: '40375',
          economicStatus,
          bpjsStatus: 'Aktif (Mandiri)',
          issueDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          members: []
        };
      }

      // Member data
      const nik = cols[7];
      const name = cols[8];
      const gender = cols[9] || 'Laki-Laki';
      const birthPlace = cols[10] || 'Bandung';
      const birthDate = cols[11] || '01-01-1990';
      const religion = cols[12] || 'Islam';
      const education = cols[13] || 'SMA / Sederajat';
      const occupation = cols[14] || 'Wiraswasta';
      const maritalStatus = cols[15] || 'Kawin';
      const relation = cols[16] || 'Kepala Keluarga';
      const bloodType = cols[17] || 'O';
      const fatherName = cols[18] || '-';
      const motherName = cols[19] || '-';
      const phone = cols[20] || '-';

      if (nik && name) {
        familiesMap[noKk].members.push({
          id: `cit-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          nik,
          name,
          gender,
          birthPlace,
          birthDate,
          religion,
          education,
          occupation,
          maritalStatus,
          relation,
          bloodType,
          fatherName,
          motherName,
          phone
        });
      }
    }

    return Object.values(familiesMap);
  };

  const handleValidate = () => {
    setErrorMsg('');
    setParsedData(null);

    if (!inputText.trim()) {
      setErrorMsg('Mohon tempelkan atau unggah data teks CSV/JSON terlebih dahulu!');
      return;
    }

    try {
      if (importType === 'json') {
        const parsed = JSON.parse(inputText);
        if (!Array.isArray(parsed)) {
          throw new Error('Format JSON harus berupa Array / Daftar Kartu Keluarga: [ { ... } ]');
        }
        // ensure valid structure
        const formatted = parsed.map((item, idx) => ({
          id: item.id || `kk-${Date.now()}-${idx}`,
          noKk: item.noKk || `320415${Date.now()}${idx}`,
          headName: item.headName || 'Kepala Keluarga',
          address: item.address || 'Desa Sukamaju',
          rt: item.rt || '001',
          rw: item.rw || '001',
          dusun: item.dusun || 'Dusun Sukamaju',
          postalCode: item.postalCode || '40375',
          economicStatus: item.economicStatus || 'Menengah',
          bpjsStatus: item.bpjsStatus || 'Aktif',
          issueDate: item.issueDate || '01 Januari 2024',
          members: (item.members || []).map((m, mIdx) => ({
            id: m.id || `cit-${Date.now()}-${idx}-${mIdx}`,
            nik: m.nik || `320415${Date.now()}${mIdx}`,
            name: m.name || 'Nama Anggota',
            gender: m.gender || 'Laki-Laki',
            birthPlace: m.birthPlace || 'Bandung',
            birthDate: m.birthDate || '01-01-1990',
            religion: m.religion || 'Islam',
            education: m.education || 'SMA',
            occupation: m.occupation || 'Wiraswasta',
            maritalStatus: m.maritalStatus || 'Kawin',
            relation: m.relation || 'Kepala Keluarga',
            bloodType: m.bloodType || 'O',
            fatherName: m.fatherName || '-',
            motherName: m.motherName || '-',
            phone: m.phone || '-'
          }))
        }));
        setParsedData(formatted);
      } else {
        // CSV
        const families = parseCSVToFamilies(inputText);
        if (families.length === 0) {
          throw new Error('Tidak ada data Kartu Keluarga yang valid ditemukan dalam teks CSV.');
        }
        setParsedData(families);
      }
    } catch (err) {
      setErrorMsg(`Validasi Gagal: ${err.message}`);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setInputText(content);
      if (file.name.endsWith('.csv')) {
        setImportType('csv');
      } else if (file.name.endsWith('.json')) {
        setImportType('json');
      }
    };
    reader.readAsText(file);
  };

  const handleLoadSample = async () => {
    try {
      const url = importType === 'json' ? '/contoh_import_kartu_keluarga.json' : '/contoh_import_kartu_keluarga.csv';
      const res = await fetch(url);
      const text = await res.text();
      setInputText(text);
      setErrorMsg('');
    } catch (err) {
      // fallback sample
      if (importType === 'json') {
        setInputText(JSON.stringify([
          {
            "noKk": "3204152809180005",
            "headName": "Ahmad Sanusi",
            "address": "Dusun Mekar RT 02 RW 05",
            "rt": "002",
            "rw": "005",
            "dusun": "Dusun Mekar",
            "postalCode": "40375",
            "economicStatus": "Sejahtera",
            "bpjsStatus": "Aktif (Mandiri)",
            "issueDate": "18 September 2021",
            "members": [
              {
                "nik": "3204151406800001",
                "name": "Ahmad Sanusi",
                "gender": "Laki-Laki",
                "birthPlace": "Bandung",
                "birthDate": "14-06-1980",
                "religion": "Islam",
                "education": "Sarjana (S1)",
                "occupation": "Guru / Tenaga Pendidik",
                "maritalStatus": "Kawin",
                "relation": "Kepala Keluarga",
                "bloodType": "A",
                "fatherName": "Sanusi",
                "motherName": "Khadijah",
                "phone": "081233445566"
              }
            ]
          }
        ], null, 2));
      } else {
        setInputText(`NO_KK,KEPALA_KELUARGA,ALAMAT,RT,RW,DUSUN,STATUS_EKONOMI,NIK,NAMA_LENGKAP,JENIS_KELAMIN,TEMPAT_LAHIR,TANGGAL_LAHIR,AGAMA,PENDIDIKAN,PEKERJAAN,STATUS_KAWIN,HUBUNGAN_KELUARGA,GOL_DARAH,NAMA_AYAH,NAMA_IBU,NO_HP\n3204152809180005,Ahmad Sanusi,Dusun Mekar RT 02 RW 05,002,005,Dusun Mekar,Sejahtera,3204151406800001,Ahmad Sanusi,Laki-Laki,Bandung,14-06-1980,Islam,Sarjana (S1),Guru / Tenaga Pendidik,Kawin,Kepala Keluarga,A,Sanusi,Khadijah,081233445566`);
      }
    }
  };

  const handleExecuteImport = () => {
    if (!parsedData || parsedData.length === 0) {
      alert('Mohon lakukan validasi data terlebih dahulu!');
      return;
    }

    onImportSuccess(parsedData, importMode);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (err) {}
    onClose();
  };

  const totalMembers = parsedData ? parsedData.reduce((acc, k) => acc + (k.members?.length || 0), 0) : 0;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: '#d1fae5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileUp size={22} />
            </div>
            <div>
              <h3 className="modal-title" style={{ fontSize: '1.2rem', margin: 0 }}>
                Import Database Kartu Keluarga & Warga
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Unggah berkas JSON atau CSV untuk menambahkan data kependudukan sekaligus
              </p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Format Selector & Sample Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#f8fafc',
            padding: '0.85rem 1.25rem',
            borderRadius: '12px',
            border: '1px solid var(--light-border)',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Format File:</span>
              <button
                type="button"
                className={`btn btn-sm ${importType === 'json' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setImportType('json'); setParsedData(null); }}
              >
                <FileText size={14} /> JSON (.json)
              </button>
              <button
                type="button"
                className={`btn btn-sm ${importType === 'csv' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setImportType('csv'); setParsedData(null); }}
              >
                <FileSpreadsheet size={14} /> CSV / Excel (.csv)
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={handleLoadSample}
                style={{ color: '#059669', borderColor: '#86efac' }}
              >
                <Sparkles size={14} /> Muat Contoh Data (Demo)
              </button>
              <a
                href={importType === 'json' ? '/contoh_import_kartu_keluarga.json' : '/contoh_import_kartu_keluarga.csv'}
                download
                className="btn btn-sm btn-secondary"
                title="Download Template"
              >
                <Download size={14} /> Unduh Template
              </a>
            </div>
          </div>

          {/* Upload File Box */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Unggah File dari Komputer:</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mendukung .json, .csv</span>
            </label>
            <input
              type="file"
              accept=".json,.csv,text/csv,application/json"
              onChange={handleFileUpload}
              className="form-control"
              style={{ padding: '0.5rem' }}
            />
          </div>

          {/* Textarea Paste */}
          <div className="form-group">
            <label className="form-label">Atau Tempel (Paste) Konten Data di Bawah:</label>
            <textarea
              rows={7}
              placeholder={importType === 'json' ? 'Tempel struktur array JSON di sini...' : 'Tempel baris teks CSV di sini...'}
              className="form-control"
              style={{ fontFamily: 'monospace', fontSize: '0.825rem' }}
              value={inputText}
              onChange={(e) => { setInputText(e.target.value); setParsedData(null); }}
            />
          </div>

          {/* Validate Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.25rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleValidate}
              style={{ fontWeight: 700 }}
            >
              Periksa & Validasi Format Data
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '0.85rem 1rem',
              color: '#991b1b',
              fontSize: '0.875rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Validation Result Preview Box */}
          {parsedData && (
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '12px',
              padding: '1.25rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', fontWeight: 800, fontSize: '1rem', marginBottom: '0.75rem' }}>
                <CheckCircle size={20} color="#16a34a" />
                Data Siap Di-Import! Ditemukan {parsedData.length} Kartu Keluarga ({totalMembers} Jiwa Warga)
              </div>

              {/* Mini preview */}
              <div style={{ maxHeight: '140px', overflowY: 'auto', background: '#fff', borderRadius: '8px', border: '1px solid #dcfce7', padding: '0.5rem' }}>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.825rem', color: '#334155' }}>
                  {parsedData.slice(0, 5).map((kk, idx) => (
                    <li key={idx}>
                      No. KK: <strong>{kk.noKk}</strong> - Kepala Keluarga: <strong>{kk.headName}</strong> ({kk.members?.length || 0} Anggota)
                    </li>
                  ))}
                  {parsedData.length > 5 && <li>...dan {parsedData.length - 5} Kartu Keluarga lainnya.</li>}
                </ul>
              </div>

              {/* Import Mode Radio */}
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem', alignItems: 'center', fontSize: '0.85rem' }}>
                <strong style={{ color: '#166534' }}>Opsi Import:</strong>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="importMode"
                    value="append"
                    checked={importMode === 'append'}
                    onChange={() => setImportMode('append')}
                  />
                  <span>Tambahkan ke data yang ada (Append)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="importMode"
                    value="replace"
                    checked={importMode === 'replace'}
                    onChange={() => setImportMode('replace')}
                  />
                  <span style={{ color: '#dc2626', fontWeight: 600 }}>Timpa seluruh data yang ada (Replace All)</span>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Batal
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!parsedData}
            onClick={handleExecuteImport}
          >
            <FileUp size={16} /> Proses & Simpan ke Database
          </button>
        </div>
      </div>
    </div>
  );
}
