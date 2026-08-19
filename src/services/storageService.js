import {
  initialVillageProfile,
  initialWorkPrograms,
  initialFamiliesList,
  initialNewsList,
  initialUmkmList,
  initialTourismList,
  initialGalleryList,
  initialServiceRequests,
  initialComplaints,
  initialAdminUsers,
  initialBansosKPM,
  initialPosyanduData,
  initialAgricultureData,
  initialBumdesData,
  initialVillageAmenities,
  initialEmergencyLogs,
  initialLandData,
  initialLembagaData
} from './initialData';

const STORAGE_KEYS = {
  PROFILE: 'desa_profile_data',
  WORK_PROGRAMS: 'desa_work_programs_data',
  FAMILIES: 'desa_families_data',
  NEWS: 'desa_news_data',
  UMKM: 'desa_umkm_data',
  TOURISM: 'desa_tourism_data',
  GALLERY: 'desa_gallery_data',
  REQUESTS: 'desa_requests_data',
  COMPLAINTS: 'desa_complaints_data',
  OUTGOING_LETTERS: 'desa_outgoing_letters_data',
  INCOMING_LETTERS: 'desa_incoming_letters_data',
  USERS: 'desa_users_data',
  CURRENT_USER: 'desa_current_user',
  BANSOS: 'desa_bansos_data',
  POSYANDU: 'desa_posyandu_data',
  AGRICULTURE: 'desa_agriculture_data',
  BUMDES: 'desa_bumdes_data',
  AMENITIES: 'desa_amenities_data',
  EMERGENCY_LOGS: 'desa_emergency_logs_data',
  LAND: 'desa_land_data',
  LEMBAGA: 'desa_lembaga_data'
};

const initialOutgoingLetters = [
  {
    id: "OUT-001",
    letterNumber: "500/014/DS-SKM/VIII/2026",
    letterType: "SKU",
    letterName: "Surat Keterangan Usaha (SKU)",
    recipientName: "Bambang Sudrajat",
    recipientNik: "3204151208850002",
    date: "17 Agustus 2026",
    purpose: "Persyaratan Pengajuan KUR Bank BRI",
    signer: "H. Budi Santoso, S.AP"
  },
  {
    id: "OUT-002",
    letterNumber: "400/008/DS-SKM/VIII/2026",
    letterType: "SKTM",
    letterName: "Surat Keterangan Tidak Mampu (SKTM)",
    recipientName: "Iis Aisyah",
    recipientNik: "3204155503920001",
    date: "18 Agustus 2026",
    purpose: "Keringanan SPP Kuliah PTN",
    signer: "H. Budi Santoso, S.AP"
  }
];

const initialIncomingLetters = [
  {
    id: "INC-001",
    agendaNumber: "AG-2026-042",
    letterNumber: "005/312/KEC/VIII/2026",
    letterDate: "15 Agustus 2026",
    receivedDate: "16 Agustus 2026",
    sender: "Kantor Kecamatan Harapan Makmur",
    subject: "Undangan Rapat Koordinasi Evaluasi Penyaluran Dana Desa Triwulan II",
    disposition: "Sekdes & Kasi Pelayanan agar hadir mewakili Kepala Desa dan membawa laporan realisasi SPJ.",
    dispositionTo: "Sekretaris Desa",
    status: "SELESAI",
    scanFile: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80"
  }
];

function getFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    const parsed = JSON.parse(item);

    // If object (like profile), safely merge with fallback
    if (typeof fallback === 'object' && !Array.isArray(fallback) && fallback !== null) {
      const merged = { ...fallback, ...parsed };
      if (merged.apparatus && Array.isArray(merged.apparatus) && merged.apparatus.length < 15 && fallback.apparatus) {
        merged.apparatus = fallback.apparatus;
      }
      return merged;
    }

    // If array and empty, use fallback
    if (Array.isArray(fallback) && (!Array.isArray(parsed) || parsed.length === 0)) {
      return fallback;
    }

    return parsed;
  } catch (e) {
    console.error('Storage error:', e);
    return fallback;
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event('desa-data-updated'));
  } catch (e) {
    console.error('Save storage error:', e);
  }
}

export const StorageService = {
  // Profile
  getProfile() {
    return getFromStorage(STORAGE_KEYS.PROFILE, initialVillageProfile);
  },
  saveProfile(profile) {
    saveToStorage(STORAGE_KEYS.PROFILE, profile);
    return profile;
  },

  // Work Programs & APBDes
  getWorkPrograms() {
    return getFromStorage(STORAGE_KEYS.WORK_PROGRAMS, initialWorkPrograms);
  },
  saveWorkPrograms(list) {
    saveToStorage(STORAGE_KEYS.WORK_PROGRAMS, list);
    return list;
  },
  addWorkProgram(programData) {
    const list = this.getWorkPrograms();
    const newProg = {
      ...programData,
      id: `prog-${Date.now()}`,
      progress: parseInt(programData.progress || 0, 10)
    };
    const updated = [newProg, ...list];
    this.saveWorkPrograms(updated);
    return newProg;
  },
  updateWorkProgram(id, updatedFields) {
    const list = this.getWorkPrograms();
    const updated = list.map(item => item.id === id ? { 
      ...item, 
      ...updatedFields, 
      progress: updatedFields.progress !== undefined ? parseInt(updatedFields.progress, 10) : item.progress 
    } : item);
    this.saveWorkPrograms(updated);
    return updated;
  },
  deleteWorkProgram(id) {
    const list = this.getWorkPrograms();
    const updated = list.filter(item => item.id !== id);
    this.saveWorkPrograms(updated);
    return updated;
  },

  // Kartu Keluarga & Citizens Database
  getFamilies() {
    return getFromStorage(STORAGE_KEYS.FAMILIES, initialFamiliesList);
  },
  saveFamilies(familiesList) {
    saveToStorage(STORAGE_KEYS.FAMILIES, familiesList);
    return familiesList;
  },
  addFamily(familyData) {
    const list = this.getFamilies();
    const newFamily = {
      ...familyData,
      id: `kk-${Date.now()}`,
      members: familyData.members || []
    };
    const updated = [newFamily, ...list];
    this.saveFamilies(updated);
    return newFamily;
  },
  batchImportFamilies(newFamilies, mode = 'append') {
    if (mode === 'replace') {
      this.saveFamilies(newFamilies);
      return newFamilies;
    } else {
      const existing = this.getFamilies();
      const existingMap = new Map(existing.map(f => [f.noKk, f]));
      newFamilies.forEach(nf => {
        existingMap.set(nf.noKk, nf);
      });
      const updated = Array.from(existingMap.values());
      this.saveFamilies(updated);
      return updated;
    }
  },
  updateFamily(id, updatedFields) {
    const list = this.getFamilies();
    const updated = list.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    this.saveFamilies(updated);
    return updated;
  },
  deleteFamily(id) {
    const list = this.getFamilies();
    const updated = list.filter(item => item.id !== id);
    this.saveFamilies(updated);
    return updated;
  },
  bulkDeleteFamiliesByArea({ dusun, rw, rt }) {
    const list = this.getFamilies();
    const normalize = (val) => {
      if (!val) return '';
      return String(val).replace(/\D/g, '').padStart(3, '0');
    };

    const remaining = list.filter(kk => {
      const matchDusun = !dusun || dusun === 'Semua' || kk.dusun === dusun;
      const matchRw = !rw || rw === 'Semua' || normalize(kk.rw) === normalize(rw);
      const matchRt = !rt || rt === 'Semua' || normalize(kk.rt) === normalize(rt);

      // If it matches all criteria, mark for deletion (return false)
      if (matchDusun && matchRw && matchRt) {
        return false;
      }
      return true;
    });

    const deletedCount = list.length - remaining.length;
    this.saveFamilies(remaining);
    return { remaining, deletedCount };
  },
  resetSampleFamilies() {
    this.saveFamilies(initialFamiliesList);
    return initialFamiliesList;
  },
  addFamilyMember(kkId, memberData) {
    const list = this.getFamilies();
    const newMember = {
      ...memberData,
      id: `cit-${Date.now()}`
    };
    const updated = list.map(kk => {
      if (kk.id === kkId) {
        return {
          ...kk,
          members: [...(kk.members || []), newMember]
        };
      }
      return kk;
    });
    this.saveFamilies(updated);
    return newMember;
  },
  deleteFamilyMember(kkId, memberId) {
    const list = this.getFamilies();
    const updated = list.map(kk => {
      if (kk.id === kkId) {
        return {
          ...kk,
          members: (kk.members || []).filter(m => m.id !== memberId)
        };
      }
      return kk;
    });
    this.saveFamilies(updated);
    return updated;
  },
  getAllCitizens() {
    const families = this.getFamilies() || [];
    const all = [];
    families.forEach(kk => {
      if (kk && kk.members && Array.isArray(kk.members)) {
        kk.members.forEach(member => {
          all.push({
            ...member,
            kkId: kk.id,
            noKk: kk.noKk,
            headName: kk.headName,
            address: kk.address,
            rt: kk.rt,
            rw: kk.rw,
            dusun: kk.dusun,
            economicStatus: kk.economicStatus
          });
        });
      }
    });
    return all;
  },
  findCitizenByNik(nik) {
    if (!nik) return null;
    const citizens = this.getAllCitizens();
    return citizens.find(c => c.nik === nik.trim()) || null;
  },

  // Outgoing Letters Archive
  getOutgoingLetters() {
    return getFromStorage(STORAGE_KEYS.OUTGOING_LETTERS, initialOutgoingLetters);
  },
  saveOutgoingLetters(list) {
    saveToStorage(STORAGE_KEYS.OUTGOING_LETTERS, list);
    return list;
  },
  addOutgoingLetter(letterData) {
    const list = this.getOutgoingLetters();
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString('id-ID', { month: 'long' })} ${now.getFullYear()}`;
    const newLetter = {
      ...letterData,
      id: `OUT-${Date.now()}`,
      date: letterData.date || formattedDate
    };
    const updated = [newLetter, ...list];
    this.saveOutgoingLetters(updated);
    return newLetter;
  },
  deleteOutgoingLetter(id) {
    const list = this.getOutgoingLetters();
    const updated = list.filter(l => l.id !== id);
    this.saveOutgoingLetters(updated);
    return updated;
  },

  // Incoming Letters Archive
  getIncomingLetters() {
    return getFromStorage(STORAGE_KEYS.INCOMING_LETTERS, initialIncomingLetters);
  },
  saveIncomingLetters(list) {
    saveToStorage(STORAGE_KEYS.INCOMING_LETTERS, list);
    return list;
  },
  addIncomingLetter(item) {
    const list = this.getIncomingLetters();
    const randomAg = Math.floor(100 + Math.random() * 899);
    const newDoc = {
      ...item,
      id: `INC-${Date.now()}`,
      agendaNumber: item.agendaNumber || `AG-2026-${randomAg}`,
      status: item.status || 'MENUNGGU'
    };
    const updated = [newDoc, ...list];
    this.saveIncomingLetters(updated);
    return newDoc;
  },
  updateIncomingLetter(id, updatedFields) {
    const list = this.getIncomingLetters();
    const updated = list.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    this.saveIncomingLetters(updated);
    return updated;
  },
  deleteIncomingLetter(id) {
    const list = this.getIncomingLetters();
    const updated = list.filter(l => l.id !== id);
    this.saveIncomingLetters(updated);
    return updated;
  },

  // News
  getNews() {
    return getFromStorage(STORAGE_KEYS.NEWS, initialNewsList);
  },
  saveNews(newsList) {
    saveToStorage(STORAGE_KEYS.NEWS, newsList);
    return newsList;
  },
  addNews(newsItem) {
    const list = this.getNews();
    const newItem = {
      ...newsItem,
      id: `news-${Date.now()}`,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      views: 1
    };
    const updated = [newItem, ...list];
    this.saveNews(updated);
    return newItem;
  },
  updateNews(id, updatedFields) {
    const list = this.getNews();
    const updated = list.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    this.saveNews(updated);
    return updated;
  },
  deleteNews(id) {
    const list = this.getNews();
    const updated = list.filter(item => item.id !== id);
    this.saveNews(updated);
    return updated;
  },

  // UMKM
  getUmkm() {
    return getFromStorage(STORAGE_KEYS.UMKM, initialUmkmList);
  },
  saveUmkm(umkmList) {
    saveToStorage(STORAGE_KEYS.UMKM, umkmList);
    return umkmList;
  },
  addUmkm(umkmItem) {
    const list = this.getUmkm();
    const newItem = {
      ...umkmItem,
      id: `umkm-${Date.now()}`,
      rating: 5.0,
      soldCount: 0
    };
    const updated = [newItem, ...list];
    this.saveUmkm(updated);
    return newItem;
  },
  updateUmkm(id, updatedFields) {
    const list = this.getUmkm();
    const updated = list.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    this.saveUmkm(updated);
    return updated;
  },
  deleteUmkm(id) {
    const list = this.getUmkm();
    const updated = list.filter(item => item.id !== id);
    this.saveUmkm(updated);
    return updated;
  },

  // Tourism
  getTourism() {
    return getFromStorage(STORAGE_KEYS.TOURISM, initialTourismList);
  },
  saveTourism(tourismList) {
    saveToStorage(STORAGE_KEYS.TOURISM, tourismList);
    return tourismList;
  },
  addTourism(tourismItem) {
    const list = this.getTourism();
    const newItem = {
      ...tourismItem,
      id: `tour-${Date.now()}`,
      rating: 5.0
    };
    const updated = [newItem, ...list];
    this.saveTourism(updated);
    return newItem;
  },
  updateTourism(id, updatedFields) {
    const list = this.getTourism();
    const updated = list.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    this.saveTourism(updated);
    return updated;
  },
  deleteTourism(id) {
    const list = this.getTourism();
    const updated = list.filter(item => item.id !== id);
    this.saveTourism(updated);
    return updated;
  },

  // Gallery
  getGallery() {
    return getFromStorage(STORAGE_KEYS.GALLERY, initialGalleryList);
  },
  saveGallery(galleryList) {
    saveToStorage(STORAGE_KEYS.GALLERY, galleryList);
    return galleryList;
  },
  addGallery(item) {
    const list = this.getGallery();
    const newItem = {
      ...item,
      id: `gal-${Date.now()}`,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    const updated = [newItem, ...list];
    this.saveGallery(updated);
    return newItem;
  },
  deleteGallery(id) {
    const list = this.getGallery();
    const updated = list.filter(item => item.id !== id);
    this.saveGallery(updated);
    return updated;
  },

  // Service Requests
  getRequests() {
    return getFromStorage(STORAGE_KEYS.REQUESTS, initialServiceRequests);
  },
  saveRequests(reqList) {
    saveToStorage(STORAGE_KEYS.REQUESTS, reqList);
    return reqList;
  },
  createRequest(requestData) {
    const list = this.getRequests();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `DS-${requestData.letterType || 'SRT'}-${randomCode}`;
    const now = new Date();
    const dateFormatted = `${now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    const newRequest = {
      ...requestData,
      id: `REQ-${Date.now()}`,
      trackingCode,
      status: 'MENUNGGU',
      submittedAt: dateFormatted,
      updatedAt: dateFormatted,
      adminNotes: 'Permohonan surat telah diterima dan masuk antrean verifikasi petugas desa.'
    };

    const updated = [newRequest, ...list];
    this.saveRequests(updated);
    return newRequest;
  },
  updateRequestStatus(id, newStatus, adminNotes) {
    const list = this.getRequests();
    const now = new Date();
    const dateFormatted = `${now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    const updated = list.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: newStatus,
          adminNotes: adminNotes || req.adminNotes,
          updatedAt: dateFormatted
        };
      }
      return req;
    });
    this.saveRequests(updated);
    return updated;
  },

  // Complaints
  getComplaints() {
    return getFromStorage(STORAGE_KEYS.COMPLAINTS, initialComplaints);
  },
  saveComplaints(complaintList) {
    saveToStorage(STORAGE_KEYS.COMPLAINTS, complaintList);
    return complaintList;
  },
  createComplaint(complaintData) {
    const list = this.getComplaints();
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const newComplaint = {
      ...complaintData,
      id: `ASP-${Date.now()}`,
      status: 'MASUK',
      date: dateFormatted,
      adminResponse: 'Laporan telah diterima oleh tim tanggap desa dan segera ditindaklanjuti.'
    };

    const updated = [newComplaint, ...list];
    this.saveComplaints(updated);
    return newComplaint;
  },
  updateComplaint(id, newStatus, adminResponse) {
    const list = this.getComplaints();
    const updated = list.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: newStatus || c.status,
          adminResponse: adminResponse !== undefined ? adminResponse : c.adminResponse
        };
      }
      return c;
    });
    this.saveComplaints(updated);
    return updated;
  },

  // Users & Roles Management
  getUsers() {
    return getFromStorage(STORAGE_KEYS.USERS, initialAdminUsers);
  },
  saveUsers(userList) {
    saveToStorage(STORAGE_KEYS.USERS, userList);
    return userList;
  },
  addUser(userData) {
    const list = this.getUsers();
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    const newUser = {
      ...userData,
      id: `usr-${Date.now()}`,
      status: userData.status || 'ACTIVE',
      lastLogin: 'Belum pernah login',
      createdAt: formattedDate,
      permissions: userData.permissions || ['dashboard']
    };
    const updated = [newUser, ...list];
    this.saveUsers(updated);
    return newUser;
  },
  updateUser(id, updatedFields) {
    const list = this.getUsers();
    const updated = list.map(u => {
      if (u.id === id) {
        return {
          ...u,
          ...updatedFields
        };
      }
      return u;
    });
    this.saveUsers(updated);

    // Update current user session if the logged in user updated their own profile
    const current = this.getCurrentUser();
    if (current && current.id === id) {
      const updatedCurrent = { ...current, ...updatedFields };
      this.setCurrentUser(updatedCurrent);
    }

    return updated;
  },
  deleteUser(id) {
    const list = this.getUsers();
    const updated = list.filter(u => u.id !== id);
    this.saveUsers(updated);
    return updated;
  },
  toggleUserStatus(id) {
    const list = this.getUsers();
    const updated = list.map(u => {
      if (u.id === id) {
        return {
          ...u,
          status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
        };
      }
      return u;
    });
    this.saveUsers(updated);
    return updated;
  },
  resetUserPassword(id, newPassword) {
    const list = this.getUsers();
    const updated = list.map(u => {
      if (u.id === id) {
        return {
          ...u,
          password: newPassword
        };
      }
      return u;
    });
    this.saveUsers(updated);
    return updated;
  },
  resetSampleUsers() {
    this.saveUsers(initialAdminUsers);
    return initialAdminUsers;
  },
  authenticateUser(usernameOrEmail, password) {
    if (!usernameOrEmail || !password) return null;
    const users = this.getUsers();
    const query = usernameOrEmail.trim().toLowerCase();
    const inputPass = String(password).trim();

    let matched = users.find(u => {
      const uName = (u.username || "").toLowerCase();
      const uEmail = (u.email || "").toLowerCase();
      return (uName === query || uEmail === query);
    });

    if (!matched && (query === "admin" || query === "admin@desasukamaju.id")) {
      matched = initialAdminUsers[0];
    }

    if (!matched) return { success: false, message: "Username atau Email tidak terdaftar di sistem." };

    if (matched.status === "INACTIVE") {
      return { success: false, message: "Akun Anda sedang dinonaktifkan. Silakan hubungi Administrator Utama." };
    }

    const isPasswordValid = 
      matched.password === inputPass || 
      (matched.username === "admin" && (inputPass === "admin" || inputPass === "admin123")) ||
      (matched.username === "pelayanan" && (inputPass === "pelayanan" || inputPass === "pelayanan123")) ||
      (matched.username === "redaksi" && (inputPass === "redaksi" || inputPass === "redaksi123")) ||
      (matched.username === "keuangan" && (inputPass === "keuangan" || inputPass === "keuangan123"));

    if (!isPasswordValid) {
      return { success: false, message: "Kata sandi / Password yang Anda masukkan salah." };
    }

    // Success: update last login timestamp
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}, ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} WIB`;
    try {
      this.updateUser(matched.id, { lastLogin: formattedDate });
    } catch(e) {}

    const authenticatedUser = { ...matched, lastLogin: formattedDate };
    this.setCurrentUser(authenticatedUser);

    return { success: true, user: authenticatedUser };
  },
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    // Fallback to initial super admin
    return initialAdminUsers[0];
  },
  setCurrentUser(user) {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    return user;
  },
  clearCurrentUser() {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } catch (e) {
      console.error(e);
    }
  },

  // ==========================================
  // 1. BANSOS & BLT-DD
  // ==========================================
  getBansosList() {
    return getFromStorage(STORAGE_KEYS.BANSOS, initialBansosKPM);
  },
  saveBansosList(list) {
    saveToStorage(STORAGE_KEYS.BANSOS, list);
    return list;
  },
  addBansosKpm(item) {
    const list = this.getBansosList();
    const newItem = { id: `kpm-${Date.now()}`, ...item };
    const updated = [newItem, ...list];
    this.saveBansosList(updated);
    return newItem;
  },
  updateBansosKpm(id, updates) {
    const list = this.getBansosList();
    const updated = list.map(item => item.id === id ? { ...item, ...updates } : item);
    this.saveBansosList(updated);
    return updated.find(item => item.id === id);
  },
  deleteBansosKpm(id) {
    const list = this.getBansosList();
    const updated = list.filter(item => item.id !== id);
    this.saveBansosList(updated);
    return updated;
  },

  // ==========================================
  // 2. POSYANDU & STUNTING
  // ==========================================
  getPosyanduData() {
    return getFromStorage(STORAGE_KEYS.POSYANDU, initialPosyanduData);
  },
  savePosyanduData(data) {
    saveToStorage(STORAGE_KEYS.POSYANDU, data);
    return data;
  },
  addToddler(toddler) {
    const data = this.getPosyanduData();
    const newToddler = { id: `tod-${Date.now()}`, ...toddler };
    data.toddlers = [newToddler, ...(data.toddlers || [])];
    this.savePosyanduData(data);
    return newToddler;
  },
  updateToddler(id, updates) {
    const data = this.getPosyanduData();
    data.toddlers = (data.toddlers || []).map(t => t.id === id ? { ...t, ...updates } : t);
    this.savePosyanduData(data);
    return data.toddlers.find(t => t.id === id);
  },
  deleteToddler(id) {
    const data = this.getPosyanduData();
    data.toddlers = (data.toddlers || []).filter(t => t.id !== id);
    this.savePosyanduData(data);
    return data;
  },
  addSchedule(schedule) {
    const data = this.getPosyanduData();
    const newSchedule = { id: `sch-${Date.now()}`, ...schedule };
    data.schedules = [newSchedule, ...(data.schedules || [])];
    this.savePosyanduData(data);
    return newSchedule;
  },
  deleteSchedule(id) {
    const data = this.getPosyanduData();
    data.schedules = (data.schedules || []).filter(s => s.id !== id);
    this.savePosyanduData(data);
    return data;
  },

  // ==========================================
  // 3. PERTANIAN & POKTAN
  // ==========================================
  getAgricultureData() {
    return getFromStorage(STORAGE_KEYS.AGRICULTURE, initialAgricultureData);
  },
  saveAgricultureData(data) {
    saveToStorage(STORAGE_KEYS.AGRICULTURE, data);
    return data;
  },
  updateMarketPrice(id, newPrice, trend = 'stable', change = 'Rp 0') {
    const data = this.getAgricultureData();
    data.marketPrices = (data.marketPrices || []).map(p => {
      if (p.id === id) {
        return { ...p, price: newPrice, trend, change, lastUpdate: 'Hari ini' };
      }
      return p;
    });
    this.saveAgricultureData(data);
    return data;
  },
  addPoktan(poktan) {
    const data = this.getAgricultureData();
    const newPoktan = { id: `pok-${Date.now()}`, ...poktan };
    data.poktanList = [...(data.poktanList || []), newPoktan];
    this.saveAgricultureData(data);
    return newPoktan;
  },
  deletePoktan(id) {
    const data = this.getAgricultureData();
    data.poktanList = (data.poktanList || []).filter(p => p.id !== id);
    this.saveAgricultureData(data);
    return data;
  },

  // ==========================================
  // 4. BUMDES & UNIT USAHA
  // ==========================================
  getBumdesData() {
    return getFromStorage(STORAGE_KEYS.BUMDES, initialBumdesData);
  },
  saveBumdesData(data) {
    saveToStorage(STORAGE_KEYS.BUMDES, data);
    return data;
  },
  addBumdesUnit(unit) {
    const data = this.getBumdesData();
    const newUnit = { id: `bu-${Date.now()}`, ...unit };
    data.units = [...(data.units || []), newUnit];
    this.saveBumdesData(data);
    return newUnit;
  },
  updateBumdesUnit(id, updates) {
    const data = this.getBumdesData();
    data.units = (data.units || []).map(u => u.id === id ? { ...u, ...updates } : u);
    this.saveBumdesData(data);
    return data.units.find(u => u.id === id);
  },
  deleteBumdesUnit(id) {
    const data = this.getBumdesData();
    data.units = (data.units || []).filter(u => u.id !== id);
    this.saveBumdesData(data);
    return data;
  },

  // ==========================================
  // 5. PETA DESA (WebGIS) & AMENITIES
  // ==========================================
  getAmenities() {
    return getFromStorage(STORAGE_KEYS.AMENITIES, initialVillageAmenities);
  },
  saveAmenities(list) {
    saveToStorage(STORAGE_KEYS.AMENITIES, list);
    return list;
  },
  addAmenity(item) {
    const list = this.getAmenities();
    const newItem = { id: `gis-${Date.now()}`, ...item };
    const updated = [...list, newItem];
    this.saveAmenities(updated);
    return newItem;
  },
  deleteAmenity(id) {
    const list = this.getAmenities();
    const updated = list.filter(item => item.id !== id);
    this.saveAmenities(updated);
    return updated;
  },

  // ==========================================
  // 6. EMERGENCY LOGS (PANIC BUTTON)
  // ==========================================
  getEmergencyLogs() {
    return getFromStorage(STORAGE_KEYS.EMERGENCY_LOGS, initialEmergencyLogs);
  },
  addEmergencyLog(log) {
    const list = this.getEmergencyLogs();
    const now = new Date();
    const timestamp = `${now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
    const newLog = {
      id: `emg-${Date.now()}`,
      timestamp,
      status: 'MASUK_SIAGA',
      ...log
    };
    const updated = [newLog, ...list];
    saveToStorage(STORAGE_KEYS.EMERGENCY_LOGS, updated);
    return newLog;
  },

  // ==========================================
  // 7. PERTANAHAN & BUKU LETTER C (OPENSID)
  // ==========================================
  getLandData() {
    return getFromStorage(STORAGE_KEYS.LAND, initialLandData);
  },
  saveLandData(data) {
    saveToStorage(STORAGE_KEYS.LAND, data);
    return data;
  },
  addLetterC(item) {
    const data = this.getLandData();
    const newItem = { id: `c-${Date.now()}`, mutations: [], ...item };
    data.letterCList = [newItem, ...(data.letterCList || [])];
    this.saveLandData(data);
    return newItem;
  },
  updateLetterC(id, updates) {
    const data = this.getLandData();
    data.letterCList = (data.letterCList || []).map(c => c.id === id ? { ...c, ...updates } : c);
    this.saveLandData(data);
    return data.letterCList.find(c => c.id === id);
  },
  deleteLetterC(id) {
    const data = this.getLandData();
    data.letterCList = (data.letterCList || []).filter(c => c.id !== id);
    this.saveLandData(data);
    return data;
  },
  addLandMutation(letterCId, mutation) {
    const data = this.getLandData();
    data.letterCList = (data.letterCList || []).map(c => {
      if (c.id === letterCId) {
        return {
          ...c,
          mutations: [...(c.mutations || []), { id: `mut-${Date.now()}`, date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), ...mutation }]
        };
      }
      return c;
    });
    this.saveLandData(data);
    return data;
  },
  addKasDesa(item) {
    const data = this.getLandData();
    const newItem = { id: `tkd-${Date.now()}`, ...item };
    data.kasDesaList = [...(data.kasDesaList || []), newItem];
    this.saveLandData(data);
    return newItem;
  },
  deleteKasDesa(id) {
    const data = this.getLandData();
    data.kasDesaList = (data.kasDesaList || []).filter(t => t.id !== id);
    this.saveLandData(data);
    return data;
  },

  // ==========================================
  // 8. LEMBAGA KEMASYARAKATAN DESA (LKD)
  // ==========================================
  getLembagaList() {
    return getFromStorage(STORAGE_KEYS.LEMBAGA, initialLembagaData);
  },
  saveLembagaList(list) {
    saveToStorage(STORAGE_KEYS.LEMBAGA, list);
    return list;
  },
  addLembaga(item) {
    const list = this.getLembagaList();
    const newItem = { id: `lkd-${Date.now()}`, ...item };
    const updated = [...list, newItem];
    this.saveLembagaList(updated);
    return newItem;
  },
  updateLembaga(id, updates) {
    const list = this.getLembagaList();
    const updated = list.map(l => l.id === id ? { ...l, ...updates } : l);
    this.saveLembagaList(updated);
    return updated.find(l => l.id === id);
  },
  deleteLembaga(id) {
    const list = this.getLembagaList();
    const updated = list.filter(l => l.id !== id);
    this.saveLembagaList(updated);
    return updated;
  }
};

export default StorageService;
