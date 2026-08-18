import {
  initialVillageProfile,
  initialFamiliesList,
  initialNewsList,
  initialUmkmList,
  initialTourismList,
  initialGalleryList,
  initialServiceRequests,
  initialComplaints
} from './initialData';

const STORAGE_KEYS = {
  PROFILE: 'desa_profile_data',
  FAMILIES: 'desa_families_data',
  NEWS: 'desa_news_data',
  UMKM: 'desa_umkm_data',
  TOURISM: 'desa_tourism_data',
  GALLERY: 'desa_gallery_data',
  REQUESTS: 'desa_requests_data',
  COMPLAINTS: 'desa_complaints_data'
};

function getFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item);
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
      // merge or add
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
    const families = this.getFamilies();
    const all = [];
    families.forEach(kk => {
      if (kk.members && Array.isArray(kk.members)) {
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

  // Service Requests (Surat Online)
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

  // Complaints / Aspirations
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

  // Reset to initial
  resetToDefaults() {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.FAMILIES);
    localStorage.removeItem(STORAGE_KEYS.NEWS);
    localStorage.removeItem(STORAGE_KEYS.UMKM);
    localStorage.removeItem(STORAGE_KEYS.TOURISM);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.COMPLAINTS);
    window.location.reload();
  }
};
