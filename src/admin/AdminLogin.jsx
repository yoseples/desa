import React, { useState } from 'react';
import { 
  Building2, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ShieldCheck, 
  KeyRound, 
  AlertCircle,
  Sparkles,
  Shield,
  FileText,
  Newspaper,
  Layers
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function AdminLogin({ profile, onLoginSuccess, onBackToHome }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const authResult = StorageService.authenticateUser(username, password);
      if (authResult && authResult.success) {
        setIsLoading(false);
        onLoginSuccess(authResult.user);
      } else {
        setIsLoading(false);
        setErrorMsg(authResult?.message || 'Username atau Password yang Anda masukkan salah. Silakan coba lagi.');
      }
    }, 400);
  };

  const handleFillDemoRole = (demoUser, demoPass) => {
    setUsername(demoUser);
    setPassword(demoPass);
    setErrorMsg('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 20% 20%, #064e3b 0%, #065f46 40%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      position: 'relative'
    }}>
      {/* Background Grid Accent */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none'
      }}></div>

      <div style={{ width: '100%', maxWidth: '460px', position: 'relative', zIndex: 2 }}>
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#e2e8f0',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
        >
          <ArrowLeft size={16} /> Kembali ke Portal Warga
        </button>

        {/* Login Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          padding: '2.75rem 2.25rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(16px)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #059669, #0d9488)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 8px 16px rgba(5, 150, 105, 0.35)'
            }}>
              <ShieldCheck size={32} />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.35rem 0' }}>
              Login Administrator
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
              Sistem Manajemen Terpadu {profile?.name || 'Desa Pintar'}
            </p>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: '#991b1b',
              fontSize: '0.85rem'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Username / Email */}
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Username atau Email Admin</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  required
                  placeholder="admin atau email..."
                  className="form-control"
                  style={{ paddingLeft: '2.75rem', height: '48px' }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-label" style={{ margin: 0 }}>Password</label>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Masukkan password..."
                  className="form-control"
                  style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem', height: '48px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.25rem'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', height: '48px', fontSize: '1rem', marginBottom: '1.25rem' }}
            >
              {isLoading ? (
                <span>Memverifikasi...</span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <KeyRound size={18} /> Masuk ke Panel Admin
                </span>
              )}
            </button>
          </form>

          {/* Quick Demo Hint Box */}
          <div style={{
            background: '#f0fdf4',
            border: '1px dashed #86efac',
            borderRadius: '14px',
            padding: '1rem',
            fontSize: '0.825rem',
            color: '#166534'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong>Kredensial Demo Pengujian:</strong>
              <span style={{ fontSize: '0.725rem', color: '#15803d', fontWeight: 600 }}>Pilih peran untuk auto-fill:</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginBottom: '0.65rem' }}>
              <button
                type="button"
                onClick={() => handleFillDemoRole('admin', 'admin123')}
                style={{
                  background: username === 'admin' ? '#10b981' : '#dcfce7',
                  color: username === 'admin' ? '#fff' : '#15803d',
                  border: '1px solid #86efac',
                  borderRadius: '6px',
                  padding: '0.35rem 0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Shield size={12} /> Super Admin
              </button>

              <button
                type="button"
                onClick={() => handleFillDemoRole('pelayanan', 'pelayanan123')}
                style={{
                  background: username === 'pelayanan' ? '#2563eb' : '#dbeafe',
                  color: username === 'pelayanan' ? '#fff' : '#1d4ed8',
                  border: '1px solid #93c5fd',
                  borderRadius: '6px',
                  padding: '0.35rem 0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <FileText size={12} /> Op. Layanan
              </button>

              <button
                type="button"
                onClick={() => handleFillDemoRole('redaksi', 'redaksi123')}
                style={{
                  background: username === 'redaksi' ? '#059669' : '#d1fae5',
                  color: username === 'redaksi' ? '#fff' : '#047857',
                  border: '1px solid #6ee7b7',
                  borderRadius: '6px',
                  padding: '0.35rem 0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Newspaper size={12} /> Redaksi Media
              </button>

              <button
                type="button"
                onClick={() => handleFillDemoRole('keuangan', 'keuangan123')}
                style={{
                  background: username === 'keuangan' ? '#d97706' : '#fef3c7',
                  color: username === 'keuangan' ? '#fff' : '#b45309',
                  border: '1px solid #fde68a',
                  borderRadius: '6px',
                  padding: '0.35rem 0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Layers size={12} /> Kaur Keuangan
              </button>
            </div>

            <div style={{ fontSize: '0.75rem', color: '#14532d', background: 'rgba(255,255,255,0.6)', padding: '0.35rem 0.5rem', borderRadius: '6px' }}>
              Username: <code>{username}</code> | Password: <code>{password}</code>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#cbd5e1', marginTop: '1.5rem' }}>
          🔒 Akses Terenkripsi & Dilindungi Sistem Keamanan Desa Pintar
        </p>
      </div>
    </div>
  );
}
