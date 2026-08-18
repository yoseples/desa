import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ServiceModal from './components/ServiceModal';
import TrackingModal from './components/TrackingModal';
import NewsDetailModal from './components/NewsDetailModal';
import UmkmDetailModal from './components/UmkmDetailModal';
import LetterPrintModal from './components/LetterPrintModal';
import VillageChatbot from './components/VillageChatbot';

// Public Pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import News from './pages/News';
import Gallery from './pages/Gallery';
import Umkm from './pages/Umkm';
import Tourism from './pages/Tourism';
import Services from './pages/Services';
import Contact from './pages/Contact';

// Admin CMS & Login
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminPrograms from './admin/AdminPrograms';
import AdminCitizens from './admin/AdminCitizens';
import AdminNews from './admin/AdminNews';
import AdminUmkm from './admin/AdminUmkm';
import AdminTourism from './admin/AdminTourism';
import AdminGallery from './admin/AdminGallery';
import AdminServices from './admin/AdminServices';
import AdminLetterTemplates from './admin/AdminLetterTemplates';
import AdminComplaints from './admin/AdminComplaints';
import AdminSettings from './admin/AdminSettings';

import { StorageService } from './services/storageService';

// Helper function to resolve page from pathname
const getPageFromPath = (path) => {
  const cleanPath = path.toLowerCase().replace(/\/$/, '') || '/';
  switch (cleanPath) {
    case '/login':
    case '/admin/login':
      return 'login';
    case '/dashboard':
    case '/admin':
    case '/admin/dashboard':
      return 'dashboard';
    case '/profil':
    case '/profile':
      return 'profile';
    case '/berita':
    case '/news':
      return 'news';
    case '/galeri':
    case '/gallery':
      return 'gallery';
    case '/umkm':
      return 'umkm';
    case '/wisata':
    case '/tourism':
      return 'tourism';
    case '/pelayanan':
    case '/services':
      return 'services';
    case '/kontak':
    case '/contact':
      return 'contact';
    case '/':
    case '/home':
    default:
      return 'home';
  }
};

const getPathFromPage = (page) => {
  switch (page) {
    case 'login': return '/login';
    case 'dashboard': return '/dashboard';
    case 'profile': return '/profil';
    case 'news': return '/berita';
    case 'gallery': return '/galeri';
    case 'umkm': return '/umkm';
    case 'tourism': return '/wisata';
    case 'services': return '/pelayanan';
    case 'contact': return '/kontak';
    case 'home':
    default: return '/';
  }
};

export default function App() {
  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('desa_admin_logged_in') === 'true';
  });

  // URL Path & Router State
  const [activePage, setActivePageState] = useState(() => {
    return getPageFromPath(window.location.pathname);
  });

  const [adminTab, setAdminTab] = useState('dashboard'); // dashboard, programs, citizens, services, letter-templates, complaints, news, umkm, tourism, gallery, settings

  const navigateTo = (page, shouldPush = true) => {
    setActivePageState(page);
    const newPath = getPathFromPage(page);
    if (shouldPush && window.location.pathname !== newPath) {
      window.history.pushState({ page }, '', newPath);
    }
  };

  // Listen to browser Back / Forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromPath(window.location.pathname);
      setActivePageState(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Core Village Data State
  const [profile, setProfile] = useState(() => StorageService.getProfile());
  const [workProgramsList, setWorkProgramsList] = useState(() => StorageService.getWorkPrograms());
  const [familiesList, setFamiliesList] = useState(() => StorageService.getFamilies());
  const [newsList, setNewsList] = useState(() => StorageService.getNews());
  const [umkmList, setUmkmList] = useState(() => StorageService.getUmkm());
  const [tourismList, setTourismList] = useState(() => StorageService.getTourism());
  const [galleryList, setGalleryList] = useState(() => StorageService.getGallery());
  const [requestsList, setRequestsList] = useState(() => StorageService.getRequests());
  const [complaintsList, setComplaintsList] = useState(() => StorageService.getComplaints());

  // Dynamic Theme & CSS Variables Application
  useEffect(() => {
    const theme = profile?.theme;
    if (!theme) return;

    const root = document.documentElement;

    // 1. Primary & Theme Colors
    if (theme.primaryColor) {
      root.style.setProperty('--primary', theme.primaryColor);
      root.style.setProperty('--primary-hover', theme.primaryColor);
      root.style.setProperty('--primary-light', `${theme.primaryColor}18`);
      root.style.setProperty('--primary-border', `${theme.primaryColor}35`);
    }

    // 2. Typography
    if (theme.fontFamily) {
      root.style.setProperty('--font-main', theme.fontFamily);
    }
    if (theme.baseFontSize) {
      root.style.fontSize = theme.baseFontSize;
    }
    if (theme.letterSpacing) {
      root.style.letterSpacing = theme.letterSpacing;
    }

    // 3. Layout & Radius
    if (theme.borderRadius) {
      root.style.setProperty('--radius-md', theme.borderRadius);
      root.style.setProperty('--radius-lg', `calc(${theme.borderRadius} * 1.3)`);
    }

  }, [profile?.theme]);

  // Modals
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [selectedLetterType, setSelectedLetterType] = useState('SKU');
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedUmkm, setSelectedUmkm] = useState(null);
  const [printLetterReq, setPrintLetterReq] = useState(null);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync listener on updates
  useEffect(() => {
    const handleDataUpdate = () => {
      setProfile(StorageService.getProfile());
      setWorkProgramsList(StorageService.getWorkPrograms());
      setFamiliesList(StorageService.getFamilies());
      setNewsList(StorageService.getNews());
      setUmkmList(StorageService.getUmkm());
      setTourismList(StorageService.getTourism());
      setGalleryList(StorageService.getGallery());
      setRequestsList(StorageService.getRequests());
      setComplaintsList(StorageService.getComplaints());
    };

    window.addEventListener('desa-data-updated', handleDataUpdate);
    return () => window.removeEventListener('desa-data-updated', handleDataUpdate);
  }, []);

  // Admin Auth Handlers
  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('desa_admin_logged_in', 'true');
    navigateTo('dashboard');
    addToast('Selamat datang! Berhasil login ke Dashboard Admin.', 'success');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('desa_admin_logged_in');
    navigateTo('home');
    addToast('Anda telah keluar dari sesi Admin.', 'info');
  };

  // Work Programs Handlers
  const handleAddWorkProgram = (item) => {
    StorageService.addWorkProgram(item);
    addToast(`Program kerja "${item.title}" berhasil ditambahkan!`, 'success');
  };

  const handleUpdateWorkProgram = (id, fields) => {
    StorageService.updateWorkProgram(id, fields);
    addToast('Program kerja berhasil diperbarui!');
  };

  const handleDeleteWorkProgram = (id) => {
    StorageService.deleteWorkProgram(id);
    addToast('Program kerja berhasil dihapus.', 'info');
  };

  // Family (KK) Handlers
  const handleAddFamily = (familyData) => {
    StorageService.addFamily(familyData);
    addToast(`Kartu Keluarga No. ${familyData.noKk} berhasil ditambahkan!`);
  };

  const handleUpdateFamily = (id, fields) => {
    StorageService.updateFamily(id, fields);
    addToast('Data Kartu Keluarga berhasil diperbarui!');
  };

  const handleDeleteFamily = (id) => {
    StorageService.deleteFamily(id);
    addToast('Data Kartu Keluarga berhasil dihapus!', 'info');
  };

  const handleAddMember = (kkId, memberData) => {
    StorageService.addFamilyMember(kkId, memberData);
    addToast(`Anggota keluarga ${memberData.name} berhasil ditambahkan!`);
  };

  const handleDeleteMember = (kkId, memberId) => {
    StorageService.deleteFamilyMember(kkId, memberId);
    addToast('Anggota keluarga berhasil dihapus!', 'info');
  };

  const handleBatchImportFamilies = (importedList, mode) => {
    StorageService.batchImportFamilies(importedList, mode);
    addToast(`Berhasil mengimpor ${importedList.length} data Kartu Keluarga!`, 'success');
  };

  // Public letter submission
  const handleOpenServiceModal = (type = 'SKU') => {
    setSelectedLetterType(type);
    setServiceModalOpen(true);
  };

  const handleSubmitServiceRequest = (newReq) => {
    const created = StorageService.createRequest(newReq);
    addToast(`Pengajuan surat ${created.trackingCode} berhasil dikirim!`, 'success');
    return created;
  };

  const handleSubmitComplaint = (data) => {
    const created = StorageService.createComplaint(data);
    addToast('Laporan / aspirasi Anda berhasil dikirim ke Pemdes!', 'success');
    return created;
  };

  // Admin Operations
  const handleAddNews = (item) => {
    StorageService.addNews(item);
    addToast('Berita desa baru berhasil dipublikasikan!');
  };
  const handleUpdateNews = (id, fields) => {
    StorageService.updateNews(id, fields);
    addToast('Perubahan berita berhasil disimpan!');
  };
  const handleDeleteNews = (id) => {
    StorageService.deleteNews(id);
    addToast('Berita berhasil dihapus!', 'info');
  };

  const handleAddUmkm = (item) => {
    StorageService.addUmkm(item);
    addToast('Produk UMKM berhasil ditambahkan ke etalase!');
  };
  const handleUpdateUmkm = (id, fields) => {
    StorageService.updateUmkm(id, fields);
    addToast('Data produk UMKM berhasil diperbarui!');
  };
  const handleDeleteUmkm = (id) => {
    StorageService.deleteUmkm(id);
    addToast('Produk UMKM berhasil dihapus!', 'info');
  };

  const handleAddTourism = (item) => {
    StorageService.addTourism(item);
    addToast('Destinasi wisata baru berhasil ditambahkan!');
  };
  const handleUpdateTourism = (id, fields) => {
    StorageService.updateTourism(id, fields);
    addToast('Informasi wisata berhasil diperbarui!');
  };
  const handleDeleteTourism = (id) => {
    StorageService.deleteTourism(id);
    addToast('Destinasi wisata berhasil dihapus!', 'info');
  };

  const handleAddGallery = (item) => {
    StorageService.addGallery(item);
    addToast('Foto baru berhasil diunggah ke galeri!');
  };
  const handleDeleteGallery = (id) => {
    StorageService.deleteGallery(id);
    addToast('Foto galeri berhasil dihapus!', 'info');
  };

  const handleUpdateRequestStatus = (id, status, notes) => {
    StorageService.updateRequestStatus(id, status, notes);
    addToast(`Status permohonan surat diperbarui menjadi: ${status}`);
  };

  const handleUpdateComplaintStatus = (id, status, response) => {
    StorageService.updateComplaint(id, status, response);
    addToast('Tanggapan pengaduan berhasil dikirim!');
  };

  const handleUpdateProfile = (updatedProfile) => {
    StorageService.saveProfile(updatedProfile);
    addToast('Pengaturan profil & tema desa berhasil disimpan!');
  };

  const pendingRequestsCount = (requestsList || []).filter(
    (r) => r.status === 'MENUNGGU' || r.status === 'DIPROSES'
  ).length;

  const pendingComplaintsCount = (complaintsList || []).filter(
    (c) => c.status === 'MASUK'
  ).length;

  return (
    <div className="app-root">
      {/* TOAST NOTIFICATIONS */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* MODALS */}
      <ServiceModal
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        selectedLetterType={selectedLetterType}
        onSubmitSuccess={handleSubmitServiceRequest}
      />

      <TrackingModal
        isOpen={trackingModalOpen}
        onClose={() => setTrackingModalOpen(false)}
        onPrintLetter={(req) => setPrintLetterReq(req)}
      />

      <NewsDetailModal
        isOpen={!!selectedNews}
        onClose={() => setSelectedNews(null)}
        article={selectedNews}
        profile={profile}
      />

      <UmkmDetailModal
        isOpen={!!selectedUmkm}
        onClose={() => setSelectedUmkm(null)}
        product={selectedUmkm}
        profile={profile}
      />

      <LetterPrintModal
        isOpen={!!printLetterReq}
        onClose={() => setPrintLetterReq(null)}
        request={printLetterReq}
        profile={profile}
      />

      {/* VIEW 1: SPECIFIC LOGIN PAGE SLUG (/login) */}
      {activePage === 'login' ? (
        <AdminLogin
          profile={profile}
          onLoginSuccess={handleAdminLoginSuccess}
          onBackToHome={() => navigateTo('home')}
        />
      ) : activePage === 'dashboard' ? (
        /* VIEW 2: SPECIFIC ADMIN DASHBOARD SLUG (/dashboard) */
        !isAdminLoggedIn ? (
          <AdminLogin
            profile={profile}
            onLoginSuccess={handleAdminLoginSuccess}
            onBackToHome={() => navigateTo('home')}
          />
        ) : (
          <AdminLayout
            activeTab={adminTab}
            setActiveTab={setAdminTab}
            onBackToPublic={handleAdminLogout}
            profile={profile}
            pendingCount={pendingRequestsCount}
            complaintCount={pendingComplaintsCount}
            familyCount={(familiesList || []).length}
            programCount={(workProgramsList || []).length}
          >
            {adminTab === 'dashboard' && (
              <AdminDashboard
                profile={profile}
                newsList={newsList}
                umkmList={umkmList}
                tourismList={tourismList}
                requestsList={requestsList}
                complaintsList={complaintsList}
                familiesList={familiesList}
                setActiveTab={setAdminTab}
                onSelectRequestToPrint={(req) => setPrintLetterReq(req)}
              />
            )}

            {adminTab === 'programs' && (
              <AdminPrograms
                programsList={workProgramsList}
                onAddProgram={handleAddWorkProgram}
                onUpdateProgram={handleUpdateWorkProgram}
                onDeleteProgram={handleDeleteWorkProgram}
              />
            )}

            {adminTab === 'citizens' && (
              <AdminCitizens
                familiesList={familiesList}
                onAddFamily={handleAddFamily}
                onUpdateFamily={handleUpdateFamily}
                onDeleteFamily={handleDeleteFamily}
                onAddMember={handleAddMember}
                onDeleteMember={handleDeleteMember}
                onBatchImport={handleBatchImportFamilies}
                profile={profile}
              />
            )}

            {adminTab === 'services' && (
              <AdminServices
                requestsList={requestsList}
                onUpdateStatus={handleUpdateRequestStatus}
                onSelectPrint={(req) => setPrintLetterReq(req)}
              />
            )}

            {adminTab === 'letter-templates' && (
              <AdminLetterTemplates
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
              />
            )}

            {adminTab === 'complaints' && (
              <AdminComplaints
                complaintsList={complaintsList}
                onUpdateComplaint={handleUpdateComplaintStatus}
              />
            )}

            {adminTab === 'news' && (
              <AdminNews
                newsList={newsList}
                onAddNews={handleAddNews}
                onUpdateNews={handleUpdateNews}
                onDeleteNews={handleDeleteNews}
              />
            )}

            {adminTab === 'umkm' && (
              <AdminUmkm
                umkmList={umkmList}
                onAddUmkm={handleAddUmkm}
                onUpdateUmkm={handleUpdateUmkm}
                onDeleteUmkm={handleDeleteUmkm}
              />
            )}

            {adminTab === 'tourism' && (
              <AdminTourism
                tourismList={tourismList}
                onAddTourism={handleAddTourism}
                onUpdateTourism={handleUpdateTourism}
                onDeleteTourism={handleDeleteTourism}
              />
            )}

            {adminTab === 'gallery' && (
              <AdminGallery
                galleryList={galleryList}
                onAddGallery={handleAddGallery}
                onDeleteGallery={handleDeleteGallery}
              />
            )}

            {adminTab === 'settings' && (
              <AdminSettings
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
              />
            )}
          </AdminLayout>
        )
      ) : (
        /* VIEW 3: CITIZEN PUBLIC PORTAL */
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Public Navbar */}
          <Navbar
            activePage={activePage}
            setActivePage={(page) => navigateTo(page)}
            onOpenTracking={() => setTrackingModalOpen(true)}
            profile={profile}
          />

          {/* Public Page View */}
          <main style={{ flex: 1 }}>
            {activePage === 'home' && (
              <Home
                profile={profile}
                workProgramsList={workProgramsList}
                newsList={newsList}
                umkmList={umkmList}
                tourismList={tourismList}
                galleryList={galleryList}
                setActivePage={(page) => navigateTo(page)}
                onOpenServiceModal={handleOpenServiceModal}
                onOpenTracking={() => setTrackingModalOpen(true)}
                onSelectNews={(news) => setSelectedNews(news)}
                onSelectUmkm={(umkm) => setSelectedUmkm(umkm)}
              />
            )}

            {activePage === 'profile' && (
              <Profile profile={profile} />
            )}

            {activePage === 'news' && (
              <News
                newsList={newsList}
                onSelectNews={(news) => setSelectedNews(news)}
              />
            )}

            {activePage === 'gallery' && (
              <Gallery galleryList={galleryList} />
            )}

            {activePage === 'umkm' && (
              <Umkm
                umkmList={umkmList}
                onSelectUmkm={(umkm) => setSelectedUmkm(umkm)}
              />
            )}

            {activePage === 'tourism' && (
              <Tourism tourismList={tourismList} />
            )}

            {activePage === 'services' && (
              <Services
                onOpenServiceModal={handleOpenServiceModal}
                onOpenTracking={() => setTrackingModalOpen(true)}
                onSubmitComplaint={handleSubmitComplaint}
              />
            )}

            {activePage === 'contact' && (
              <Contact
                profile={profile}
                onSubmitComplaint={handleSubmitComplaint}
              />
            )}
          </main>

          {/* Interactive Village AI Chatbot */}
          <VillageChatbot
            profile={profile}
            onOpenServiceModal={handleOpenServiceModal}
            onOpenTracking={() => setTrackingModalOpen(true)}
          />

          {/* Public Footer */}
          <Footer
            profile={profile}
            setActivePage={(page) => navigateTo(page)}
            onOpenTracking={() => setTrackingModalOpen(true)}
          />
        </div>
      )}
    </div>
  );
}
