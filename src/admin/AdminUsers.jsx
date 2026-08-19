import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  ShieldAlert, 
  KeyRound, 
  Edit, 
  Trash2, 
  Lock, 
  Unlock, 
  Search, 
  Filter, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  XCircle, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  User, 
  RefreshCw, 
  Check, 
  Copy, 
  Sparkles, 
  X,
  FileText,
  AlertTriangle,
  BadgeCheck,
  Shield,
  Layers,
  Settings,
  Briefcase,
  ExternalLink
} from 'lucide-react';
import { USER_ROLES, AVAILABLE_PERMISSIONS } from '../services/initialData';

export default function AdminUsers({
  usersList = [],
  currentUser,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  onResetPassword,
  onToggleStatus,
  onResetSampleUsers
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals state
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [targetResetUser, setTargetResetUser] = useState(null);
  const [newResetPassword, setNewResetPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [copiedNotice, setCopiedNotice] = useState(false);

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detailUser, setDetailUser] = useState(null);

  // Form state for Add/Edit
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    position: '',
    role: 'OPERATOR_LAYANAN',
    password: '',
    status: 'ACTIVE',
    avatar: '',
    permissions: ['dashboard', 'services', 'citizens']
  });

  const [showFormPassword, setShowFormPassword] = useState(false);
  const [formError, setFormError] = useState('');

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormError('');
    setShowFormPassword(false);
    setFormData({
      name: '',
      username: '',
      email: '',
      phone: '',
      position: 'Operator Layanan Desa',
      role: 'OPERATOR_LAYANAN',
      password: '',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      permissions: ['dashboard', 'services', 'citizens', 'letter-templates']
    });
    setUserModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormError('');
    setShowFormPassword(false);
    setFormData({
      name: user.name || '',
      username: user.username || '',
      email: user.email || '',
      phone: user.phone || '',
      position: user.position || '',
      role: user.role || 'OPERATOR_LAYANAN',
      password: '', // leave empty unless modifying
      status: user.status || 'ACTIVE',
      avatar: user.avatar || '',
      permissions: user.permissions || ['dashboard']
    });
    setUserModalOpen(true);
  };

  // Open Quick Reset Password Modal
  const handleOpenResetModal = (user) => {
    setTargetResetUser(user);
    const generated = generateRandomPassword();
    setNewResetPassword(generated);
    setShowResetPassword(true);
    setCopiedNotice(false);
    setResetModalOpen(true);
  };

  // Open Detail Modal
  const handleOpenDetail = (user) => {
    setDetailUser(user);
    setDetailModalOpen(true);
  };

  // Generate safe random password
  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleApplyGeneratedPassword = () => {
    const pw = generateRandomPassword();
    setFormData(prev => ({ ...prev, password: pw }));
    setShowFormPassword(true);
  };

  const handleCopyPassword = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  // Toggle single permission checkbox
  const handleTogglePermission = (permId) => {
    if (formData.permissions.includes('all')) {
      // If was 'all', convert to individual list excluding the clicked one
      const allIds = AVAILABLE_PERMISSIONS.map(p => p.id).filter(id => id !== permId);
      setFormData(prev => ({ ...prev, permissions: allIds }));
      return;
    }

    if (formData.permissions.includes(permId)) {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(id => id !== permId)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        permissions: [...prev.permissions, permId]
      }));
    }
  };

  // Toggle select all permissions
  const handleSelectAllPermissions = () => {
    if (formData.permissions.includes('all') || formData.permissions.length === AVAILABLE_PERMISSIONS.length) {
      setFormData(prev => ({ ...prev, permissions: ['dashboard'] }));
    } else {
      setFormData(prev => ({ ...prev, permissions: ['all'] }));
    }
  };

  // Handle preset roles changing default permissions
  const handleRoleChange = (newRole) => {
    let defaultPerms = ['dashboard'];
    if (newRole === 'SUPER_ADMIN') {
      defaultPerms = ['all'];
    } else if (newRole === 'OPERATOR_LAYANAN') {
      defaultPerms = ['dashboard', 'services', 'letter-templates', 'citizens', 'complaints'];
    } else if (newRole === 'OPERATOR_MEDIA') {
      defaultPerms = ['dashboard', 'news', 'gallery', 'umkm', 'tourism'];
    } else if (newRole === 'OPERATOR_KEUANGAN') {
      defaultPerms = ['dashboard', 'programs'];
    } else if (newRole === 'STAFF_ADMIN') {
      defaultPerms = ['dashboard', 'services', 'complaints', 'citizens'];
    }

    setFormData(prev => ({
      ...prev,
      role: newRole,
      permissions: defaultPerms
    }));
  };

  // Save Add/Edit User
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setFormError('');

    // Validations
    const cleanUsername = formData.username.trim().toLowerCase().replace(/\s+/g, '');
    const cleanEmail = formData.email.trim().toLowerCase();

    if (!cleanUsername) {
      setFormError('Username tidak boleh kosong.');
      return;
    }

    // Check duplicate username (except current editing user)
    const duplicateUser = usersList.find(u => 
      u.id !== editingUser?.id && (u.username.toLowerCase() === cleanUsername || u.email.toLowerCase() === cleanEmail)
    );

    if (duplicateUser) {
      setFormError('Username atau Email ini sudah digunakan oleh akun lain.');
      return;
    }

    if (!editingUser && !formData.password.trim()) {
      setFormError('Password wajib diisi untuk pengguna baru.');
      return;
    }

    if (formData.password && formData.password.length < 5) {
      setFormError('Password minimal 5 karakter demi keamanan akun.');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      username: cleanUsername,
      email: cleanEmail,
      phone: formData.phone.trim(),
      position: formData.position.trim() || USER_ROLES[formData.role]?.label || 'Staf Desa',
      role: formData.role,
      status: formData.status,
      avatar: formData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      permissions: formData.permissions.length === 0 ? ['dashboard'] : formData.permissions
    };

    if (formData.password.trim()) {
      payload.password = formData.password.trim();
    }

    if (editingUser) {
      onUpdateUser(editingUser.id, payload);
    } else {
      onAddUser(payload);
    }

    setUserModalOpen(false);
  };

  // Submit quick reset password
  const handleSaveResetPassword = () => {
    if (!newResetPassword || newResetPassword.length < 5) {
      alert('Password baru minimal 5 karakter!');
      return;
    }
    onResetPassword(targetResetUser.id, newResetPassword);
    setResetModalOpen(false);
  };

  // Safe delete handler
  const handleDeleteCheck = (user) => {
    if (user.id === currentUser?.id) {
      alert('Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif digunakan.');
      return;
    }

    const superAdminCount = usersList.filter(u => u.role === 'SUPER_ADMIN' && u.status === 'ACTIVE').length;
    if (user.role === 'SUPER_ADMIN' && superAdminCount <= 1) {
      alert('Sistem harus memiliki minimal satu Super Administrator yang aktif.');
      return;
    }

    if (window.confirm(`Apakah Anda yakin ingin menghapus pengguna "${user.name}" (@${user.username}) secara permanen?`)) {
      onDeleteUser(user.id);
    }
  };

  // Safe toggle status handler
  const handleToggleStatusCheck = (user) => {
    if (user.id === currentUser?.id) {
      alert('Anda tidak dapat menonaktifkan akun Anda sendiri.');
      return;
    }
    const superAdminCount = usersList.filter(u => u.role === 'SUPER_ADMIN' && u.status === 'ACTIVE').length;
    if (user.role === 'SUPER_ADMIN' && user.status === 'ACTIVE' && superAdminCount <= 1) {
      alert('Tidak dapat menonaktifkan satu-satunya Super Administrator yang aktif.');
      return;
    }
    onToggleStatus(user.id);
  };

  // Filtered Users List
  const filteredUsers = usersList.filter(user => {
    const q = searchQuery.toLowerCase();
    const matchQuery = !searchQuery || 
      (user.name && user.name.toLowerCase().includes(q)) ||
      (user.username && user.username.toLowerCase().includes(q)) ||
      (user.email && user.email.toLowerCase().includes(q)) ||
      (user.phone && user.phone.includes(q)) ||
      (user.position && user.position.toLowerCase().includes(q));

    const matchRole = roleFilter === 'ALL' || user.role === roleFilter;
    const matchStatus = statusFilter === 'ALL' || user.status === statusFilter;

    return matchQuery && matchRole && matchStatus;
  });

  // Calculate statistics
  const totalCount = usersList.length;
  const superAdminCount = usersList.filter(u => u.role === 'SUPER_ADMIN').length;
  const operatorLayananCount = usersList.filter(u => u.role === 'OPERATOR_LAYANAN').length;
  const otherOperatorsCount = usersList.filter(u => u.role === 'OPERATOR_MEDIA' || u.role === 'OPERATOR_KEUANGAN' || u.role === 'STAFF_ADMIN').length;
  const activeCount = usersList.filter(u => u.status === 'ACTIVE').length;
  const inactiveCount = usersList.filter(u => u.status === 'INACTIVE').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. HEADER & TOP BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem 2rem',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '640px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', background: 'rgba(52, 211, 153, 0.2)', border: '1px solid #34d399', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, color: '#6ee7b7', marginBottom: '0.65rem' }}>
            <ShieldCheck size={14} /> Keamanan & Hak Akses Berjenjang
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.4rem 0', color: '#ffffff' }}>
            Manajemen Pengguna & Operator Desa
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>
            Kelola akun administrator desa, operator pelayanan surat, redaksi media, dan kaur keuangan secara terpusat dengan kontrol hak akses granular.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => {
              if (window.confirm('Reset data pengguna ke akun contoh bawaan (Super Admin, Operator Layanan, Redaksi Media, Kaur Keuangan)?')) {
                onResetSampleUsers();
              }
            }}
            title="Muat ulang akun demo bawaan"
            style={{ background: 'rgba(255, 255, 255, 0.12)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.25)' }}
          >
            <RefreshCw size={14} /> Reset Akun Contoh
          </button>
          
          <button 
            className="btn btn-primary"
            onClick={handleOpenAdd}
            style={{ fontWeight: 700, padding: '0.6rem 1.25rem', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)' }}
          >
            <UserPlus size={16} /> Tambah Pengguna Baru
          </button>
        </div>
      </div>

      {/* 2. STATISTIC METRIC CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        {/* Total Users */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Users size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Pengguna</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.1rem 0 0 0', color: 'var(--text-main)' }}>{totalCount} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>Akun</span></h3>
          </div>
        </div>

        {/* Super Admins */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Super Admin</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.1rem 0 0 0', color: 'var(--text-main)' }}>{superAdminCount}</h3>
          </div>
        </div>

        {/* Operator Layanan */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FileText size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Operator Layanan</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.1rem 0 0 0', color: 'var(--text-main)' }}>{operatorLayananCount}</h3>
          </div>
        </div>

        {/* Operator Media & Keuangan */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Layers size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Operator Khusus</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.1rem 0 0 0', color: 'var(--text-main)' }}>{otherOperatorsCount}</h3>
          </div>
        </div>

        {/* Status Aktif */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: activeCount === totalCount ? '#ecfdf5' : '#fef2f2', color: activeCount === totalCount ? '#10b981' : '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <BadgeCheck size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Status Keaktifan</span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.1rem 0 0 0', color: 'var(--text-main)' }}>
              <span style={{ color: '#10b981' }}>{activeCount} Aktif</span> {inactiveCount > 0 && <span style={{ fontSize: '0.8rem', color: '#ef4444' }}>({inactiveCount} Nonaktif)</span>}
            </h3>
          </div>
        </div>
      </div>

      {/* 3. SEARCH & FILTER BAR */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '460px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Cari berdasarkan nama, username, email, atau jabatan..."
              className="form-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.6rem', height: '42px' }}
            />
          </div>

          {/* Role & Status Filters */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Filter size={15} style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Role:</span>
              <select 
                className="form-control" 
                value={roleFilter} 
                onChange={(e) => setRoleFilter(e.target.value)}
                style={{ height: '40px', padding: '0.2rem 0.75rem', fontSize: '0.85rem' }}
              >
                <option value="ALL">Semua Peran ({usersList.length})</option>
                {Object.keys(USER_ROLES).map(key => (
                  <option key={key} value={key}>{USER_ROLES[key].label}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Status:</span>
              <select 
                className="form-control" 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ height: '40px', padding: '0.2rem 0.75rem', fontSize: '0.85rem' }}
              >
                <option value="ALL">Semua Status</option>
                <option value="ACTIVE">Aktif</option>
                <option value="INACTIVE">Nonaktif / Ditangguhkan</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 4. USERS LIST / TABLE VIEW */}
      {filteredUsers.length === 0 ? (
        <div className="card" style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f1f5f9', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <Users size={32} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.35rem 0' }}>Tidak Ada Pengguna Ditemukan</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 1.25rem 0' }}>
            Tidak ada data akun yang cocok dengan filter atau kata kunci pencarian Anda.
          </p>
          <button className="btn btn-secondary btn-sm" onClick={() => { setSearchQuery(''); setRoleFilter('ALL'); setStatusFilter('ALL'); }}>
            Reset Filter Pencarian
          </button>
        </div>
      ) : (
        <div className="table-wrapper">
          <div className="table-toolbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 className="table-toolbar-title" style={{ fontSize: '1rem', margin: 0 }}>
                <Users size={18} color="#059669" /> Daftar Pengguna & Hak Akses
              </h3>
              <span className="badge badge-neutral" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                {filteredUsers.length} Pengguna
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Klik tombol aksi di sebelah kanan untuk mengelola akun
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>PENGGUNA</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>PERAN & JABATAN</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>KONTAK</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>HAK AKSES</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>STATUS & LOGIN</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', minWidth: '180px' }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const roleInfo = USER_ROLES[user.role] || USER_ROLES.STAFF_ADMIN;
                  const isCurrent = currentUser?.id === user.id;
                  const isActive = user.status === 'ACTIVE';

                  return (
                    <tr 
                      key={user.id}
                      style={{
                        borderBottom: '1px solid var(--border-color)',
                        background: isCurrent ? 'rgba(16, 185, 129, 0.04)' : 'transparent',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      {/* 1. Pengguna */}
                      <td style={{ padding: '0.85rem 1rem', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img 
                            src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                            alt={user.name}
                            style={{
                              width: '42px',
                              height: '42px',
                              borderRadius: '12px',
                              objectFit: 'cover',
                              border: `2px solid ${roleInfo.badgeColor}50`,
                              background: '#e2e8f0',
                              flexShrink: 0
                            }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                              <span style={{ fontWeight: 800, fontSize: '0.925rem', color: 'var(--text-main)' }}>
                                {user.name}
                              </span>
                              {isCurrent && (
                                <span style={{
                                  background: '#10b981',
                                  color: '#fff',
                                  padding: '0.1rem 0.45rem',
                                  borderRadius: '9999px',
                                  fontSize: '0.65rem',
                                  fontWeight: 800
                                }}>
                                  Anda
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '0.775rem', color: 'var(--primary)', fontWeight: 700 }}>
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Peran & Jabatan */}
                      <td style={{ padding: '0.85rem 1rem', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'flex-start' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.15rem 0.55rem',
                            borderRadius: '9999px',
                            fontSize: '0.725rem',
                            fontWeight: 700,
                            background: roleInfo.badgeBg,
                            color: roleInfo.badgeColor,
                            border: `1px solid ${roleInfo.badgeColor}30`
                          }}>
                            <Shield size={11} /> {roleInfo.label}
                          </span>
                          <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                            {user.position || '-'}
                          </span>
                        </div>
                      </td>

                      {/* 3. Kontak */}
                      <td style={{ padding: '0.85rem 1rem', verticalAlign: 'middle' }}>
                        <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-main)' }}>
                            <Mail size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                            <span>{user.email || '-'}</span>
                          </div>
                          {user.phone && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                              <Phone size={13} style={{ flexShrink: 0 }} />
                              <span>{user.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* 4. Hak Akses */}
                      <td style={{ padding: '0.85rem 1rem', verticalAlign: 'middle', maxWidth: '260px' }}>
                        {user.permissions?.includes('all') ? (
                          <span style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontSize: '0.725rem', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: 700 }}>
                            ★ Full Access (Semua Modul)
                          </span>
                        ) : (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                            {(user.permissions || ['dashboard']).slice(0, 3).map(pId => {
                              const permObj = AVAILABLE_PERMISSIONS.find(ap => ap.id === pId);
                              return (
                                <span key={pId} style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.675rem', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>
                                  {permObj?.label?.split(' ')[0] || pId}
                                </span>
                              );
                            })}
                            {(!user.permissions?.includes('all') && (user.permissions || []).length > 3) && (
                              <span style={{ background: '#e2e8f0', color: '#475569', fontSize: '0.675rem', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
                                +{(user.permissions || []).length - 3} lainnya
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* 5. Status & Login */}
                      <td style={{ padding: '0.85rem 1rem', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'flex-start' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '9999px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            background: isActive ? '#ecfdf5' : '#fef2f2',
                            color: isActive ? '#059669' : '#dc2626',
                            border: `1px solid ${isActive ? '#a7f3d0' : '#fecaca'}`
                          }}>
                            {isActive ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                            {isActive ? 'Aktif' : 'Nonaktif'}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {user.lastLogin || 'Belum pernah login'}
                          </span>
                        </div>
                      </td>

                      {/* 6. Aksi */}
                      <td style={{ padding: '0.85rem 1rem', verticalAlign: 'middle', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '0.35rem', alignItems: 'center', justifyContent: 'center' }}>
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleOpenEdit(user)}
                            title="Edit Data Pengguna"
                            style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem' }}
                          >
                            <Edit size={13} /> Edit
                          </button>

                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleOpenResetModal(user)}
                            title="Reset Kata Sandi Akun"
                            style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem' }}
                          >
                            <KeyRound size={13} /> Reset Pass
                          </button>

                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleOpenDetail(user)}
                            title="Lihat Detail Profil & Hak Akses"
                            style={{ padding: '0.3rem 0.45rem', fontSize: '0.75rem' }}
                          >
                            <Eye size={13} />
                          </button>

                          <button 
                            className="btn btn-sm"
                            onClick={() => handleToggleStatusCheck(user)}
                            disabled={isCurrent}
                            title={isActive ? 'Nonaktifkan Akun' : 'Aktifkan Akun'}
                            style={{ 
                              padding: '0.3rem 0.5rem', 
                              fontSize: '0.75rem',
                              background: isActive ? '#fff1f2' : '#f0fdf4',
                              color: isActive ? '#e11d48' : '#16a34a',
                              border: `1px solid ${isActive ? '#fecdd3' : '#bbf7d0'}`,
                              cursor: isCurrent ? 'not-allowed' : 'pointer'
                            }}
                          >
                            {isActive ? <Lock size={13} /> : <Unlock size={13} />}
                          </button>

                          <button 
                            className="btn btn-sm"
                            onClick={() => handleDeleteCheck(user)}
                            disabled={isCurrent}
                            title="Hapus Akun Pengguna"
                            style={{ 
                              padding: '0.3rem 0.5rem', 
                              fontSize: '0.75rem',
                              background: '#fef2f2',
                              color: '#dc2626',
                              border: '1px solid #fecaca',
                              cursor: isCurrent ? 'not-allowed' : 'pointer',
                              opacity: isCurrent ? 0.4 : 1
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL: TAMBAH / EDIT PENGGUNA */}
      {/* ========================================================================= */}
      {userModalOpen && (
        <div className="modal-backdrop open" onClick={() => setUserModalOpen(false)}>
          <div 
            className="modal-card" 
            style={{ maxWidth: '640px', width: '92%', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {editingUser ? <Edit size={20} /> : <UserPlus size={20} />}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                    {editingUser ? 'Edit Data Pengguna' : 'Tambah Pengguna Baru'}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {editingUser ? `Mengubah konfigurasi akun @${editingUser.username}` : 'Daftarkan administrator atau operator baru'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setUserModalOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Error Notice */}
            {formError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '0.75rem 1rem', color: '#991b1b', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={16} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitForm}>
              {/* Profile Image & Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', background: 'var(--bg-main)', padding: '1rem', borderRadius: '12px' }}>
                <img 
                  src={formData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                  alt="Avatar Preview" 
                  style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover', border: '2px solid #10b981', background: '#fff' }}
                />
                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>URL Foto Profil / Avatar</label>
                  <input 
                    type="url"
                    placeholder="https://..."
                    className="form-control"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    style={{ fontSize: '0.85rem', height: '38px' }}
                  />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Gunakan link gambar langsung (Unsplash, Imgur, dsb.)</span>
                </div>
              </div>

              {/* Grid: Nama Lengkap & Jabatan */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Nama Lengkap & Gelar *</label>
                  <input 
                    type="text"
                    required
                    placeholder="contoh: H. Budi Santoso, S.AP"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Jabatan Struktural / Posisi</label>
                  <input 
                    type="text"
                    placeholder="contoh: Kasi Pelayanan Masyarakat"
                    className="form-control"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  />
                </div>
              </div>

              {/* Grid: Username & Email */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Username Login *</label>
                  <input 
                    type="text"
                    required
                    placeholder="contoh: budi_santoso"
                    className="form-control"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Alamat Email *</label>
                  <input 
                    type="email"
                    required
                    placeholder="contoh: budi@desasukamaju.id"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Grid: Role & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Peran Pengguna (Role) *</label>
                  <select 
                    className="form-control"
                    value={formData.role}
                    onChange={(e) => handleRoleChange(e.target.value)}
                  >
                    {Object.keys(USER_ROLES).map(key => (
                      <option key={key} value={key}>{USER_ROLES[key].label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Nomor Telepon / WhatsApp</label>
                  <input 
                    type="text"
                    placeholder="contoh: 0812-3456-7890"
                    className="form-control"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label className="form-label" style={{ margin: 0 }}>
                    {editingUser ? 'Password Baru (Kosongkan jika tidak diubah)' : 'Kata Sandi (Password) *'}
                  </label>
                  <button 
                    type="button"
                    onClick={handleApplyGeneratedPassword}
                    style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <Sparkles size={12} /> Buat Password Acak Kuat
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showFormPassword ? 'text' : 'password'}
                    placeholder={editingUser ? 'Masukkan password baru bila ingin mengganti...' : 'Minimal 5 karakter...'}
                    className="form-control"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    style={{ paddingRight: '2.5rem' }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowFormPassword(!showFormPassword)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    {showFormPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Status Selector */}
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Status Akun</label>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                    <input 
                      type="radio" 
                      name="status" 
                      value="ACTIVE"
                      checked={formData.status === 'ACTIVE'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    />
                    <span style={{ color: '#059669', fontWeight: 700 }}>● Aktif (Bisa Login)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                    <input 
                      type="radio" 
                      name="status" 
                      value="INACTIVE"
                      checked={formData.status === 'INACTIVE'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    />
                    <span style={{ color: '#dc2626', fontWeight: 700 }}>● Nonaktif / Ditangguhkan</span>
                  </label>
                </div>
              </div>

              {/* Granular Permissions Section */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div>
                    <label className="form-label" style={{ margin: 0, fontWeight: 800 }}>Hak Akses Modul (Granular Permissions)</label>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pilih modul yang diizinkan untuk dikelola oleh pengguna ini</div>
                  </div>
                  <button 
                    type="button"
                    onClick={handleSelectAllPermissions}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '0.2rem 0.65rem' }}
                  >
                    {formData.permissions.includes('all') || formData.permissions.length === AVAILABLE_PERMISSIONS.length ? 'Batal Pilih Semua' : 'Pilih Semua Modul'}
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem', background: 'var(--bg-main)', padding: '1rem', borderRadius: '12px' }}>
                  {AVAILABLE_PERMISSIONS.map(perm => {
                    const isChecked = formData.permissions.includes('all') || formData.permissions.includes(perm.id);
                    return (
                      <label 
                        key={perm.id} 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          padding: '0.4rem 0.6rem',
                          borderRadius: '8px',
                          background: isChecked ? 'rgba(16, 185, 129, 0.1)' : 'var(--card-bg)',
                          border: `1px solid ${isChecked ? '#10b981' : 'var(--border-color)'}`,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleTogglePermission(perm.id)}
                        />
                        <span style={{ fontWeight: isChecked ? 700 : 500, color: isChecked ? 'var(--primary)' : 'var(--text-main)' }}>
                          {perm.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Modal Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setUserModalOpen(false)}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ fontWeight: 700 }}
                >
                  {editingUser ? 'Simpan Perubahan' : 'Buat Pengguna'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODAL: RESET PASSWORD CEPAT */}
      {/* ========================================================================= */}
      {resetModalOpen && targetResetUser && (
        <div className="modal-backdrop open" onClick={() => setResetModalOpen(false)}>
          <div 
            className="modal-card" 
            style={{ maxWidth: '440px', width: '90%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                <KeyRound size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: 'var(--text-main)' }}>
                Reset Kata Sandi
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                Pengguna: <strong>{targetResetUser.name}</strong> (@{targetResetUser.username})
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Password Baru</label>
              <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                <input 
                  type={showResetPassword ? 'text' : 'password'}
                  className="form-control"
                  value={newResetPassword}
                  onChange={(e) => setNewResetPassword(e.target.value)}
                  style={{ paddingRight: '5rem', fontWeight: 700, letterSpacing: '0.05em', height: '44px' }}
                />
                <div style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '0.25rem' }}>
                  <button 
                    type="button"
                    onClick={() => setShowResetPassword(!showResetPassword)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                  >
                    {showResetPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleCopyPassword(newResetPassword)}
                    title="Salin Kata Sandi"
                    style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', color: '#334155', cursor: 'pointer', padding: '4px 6px', display: 'flex', alignItems: 'center' }}
                  >
                    {copiedNotice ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {copiedNotice && (
                <div style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700, textAlign: 'center' }}>
                  ✓ Password berhasil disalin ke papan klip!
                </div>
              )}

              <button 
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setNewResetPassword(generateRandomPassword())}
                style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.775rem' }}
              >
                <RefreshCw size={12} /> Hasilkan Password Acak Baru
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button 
                className="btn btn-secondary"
                onClick={() => setResetModalOpen(false)}
              >
                Batal
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSaveResetPassword}
                style={{ fontWeight: 700 }}
              >
                Simpan Password Baru
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MODAL: DETAIL PENGGUNA & HAK AKSES */}
      {/* ========================================================================= */}
      {detailModalOpen && detailUser && (
        <div className="modal-backdrop open" onClick={() => setDetailModalOpen(false)}>
          <div 
            className="modal-card" 
            style={{ maxWidth: '520px', width: '90%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Profil & Hak Akses Akun</h3>
              <button 
                onClick={() => setDetailModalOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
              <img 
                src={detailUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                alt={detailUser.name}
                style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover', border: '2px solid #10b981' }}
              />
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.2rem 0' }}>{detailUser.name}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>@{detailUser.username}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{detailUser.position}</div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-main)', borderRadius: '12px', padding: '1rem', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div><strong>Peran (Role):</strong> {USER_ROLES[detailUser.role]?.label}</div>
              <div><strong>Email:</strong> {detailUser.email}</div>
              <div><strong>Telepon:</strong> {detailUser.phone || '-'}</div>
              <div><strong>Status:</strong> <span style={{ color: detailUser.status === 'ACTIVE' ? '#10b981' : '#ef4444', fontWeight: 700 }}>{detailUser.status === 'ACTIVE' ? 'Aktif' : 'Nonaktif'}</span></div>
              <div><strong>Login Terakhir:</strong> {detailUser.lastLogin || 'Belum pernah login'}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Daftar Modul yang Diizinkan:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                {AVAILABLE_PERMISSIONS.map(perm => {
                  const hasAccess = detailUser.permissions?.includes('all') || detailUser.permissions?.includes(perm.id);
                  return (
                    <div 
                      key={perm.id}
                      style={{
                        fontSize: '0.775rem',
                        padding: '0.35rem 0.5rem',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: hasAccess ? '#ecfdf5' : '#f8fafc',
                        color: hasAccess ? '#065f46' : '#94a3b8',
                        fontWeight: hasAccess ? 700 : 400
                      }}
                    >
                      {hasAccess ? <Check size={14} color="#059669" /> : <X size={14} color="#cbd5e1" />}
                      <span>{perm.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => setDetailModalOpen(false)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
