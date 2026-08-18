import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ServiceModal from './components/ServiceModal';
import TrackingModal from './components/TrackingModal';
import NewsDetailModal from './components/NewsDetailModal';
import UmkmDetailModal from './components/UmkmDetailModal';
import LetterPrintModal from './components/LetterPrintModal';

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
import AdminCitizens from './admin/AdminCitizens';
import AdminNews from './admin/AdminNews';
import AdminUmkm from './admin/AdminUmkm';
import AdminTourism from './admin/AdminTourism';
import AdminGallery from './admin/AdminGallery';
import AdminServices from './admin/AdminServices';
import AdminComplaints from './admin/AdminComplaints';
import AdminSettings from './admin/AdminSettings';

import { StorageService } from './services/storageService';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // home, profile, news, gallery, umkm, tourism, services, contact, admin
  const [adminTab, setAdminTab] = useState('dashboard'); // dashboard, citizens, services, complaints, news, umkm, tourism, gallery, settings

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('desa_admin_logged_in') === 'true';
  });

  // Core Village Data State
  const [profile, setProfile] = useState(() => StorageService.getProfile());
  const [familiesList, setFamiliesList] = useState(() => StorageService.getFamilies());
  const [newsList, setNewsList] = useState(() => StorageService.getNews());
  const [umkmList, setUmkmList] = useState(() => StorageService.getUmkm());
  const [tourismList, setTourismList] = useState(() => StorageService.getTourism());
  const [galleryList, setGalleryList] = useState(() => StorageService.getGallery());
  const [requestsList, setRequestsList] = useState(() => StorageService.getRequests());
  const [complaintsList, setComplaintsList] = useState(() => StorageService.getComplaints());

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
    addToast('Selamat datang! Berhasil login ke Dashboard Admin.', 'success');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('desa_admin_logged_in');
    setActivePage('home');
    addToast('Anda telah keluar dari sesi Admin.', 'info');
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

  // Handlers for public letter submission
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

  // Handlers for Admin Operations
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
    addToast('Pengaturan profil desa berhasil disimpan!');
  };

  const pendingRequestsCount = requestsList.filter(
    (r) => r.status === 'MENUNGGU' || r.status === 'DIPROSES'
  ).length;

  const pendingComplaintsCount = complaintsList.filter(
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

      {/* VIEW SWITCHER: ADMIN LOGIN / DASHBOARD OR CITIZEN PORTAL */}
      {activePage === 'admin' ? (
        !isAdminLoggedIn ? (
          <AdminLogin
            profile={profile}
            onLoginSuccess={handleAdminLoginSuccess}
            onBackToHome={() => setActivePage('home')}
          />
        ) : (
          <AdminLayout
            activeTab={adminTab}
            setActiveTab={setAdminTab}
            onBackToPublic={handleAdminLogout}
            profile={profile}
            pendingCount={pendingRequestsCount}
            complaintCount={pendingComplaintsCount}
            familyCount={familiesList.length}
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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Public Navbar */}
          <Navbar
            activePage={activePage}
            setActivePage={setActivePage}
            onOpenTracking={() => setTrackingModalOpen(true)}
            profile={profile}
          />

          {/* Public Page View */}
          <main style={{ flex: 1 }}>
            {activePage === 'home' && (
              <Home
                profile={profile}
                newsList={newsList}
                umkmList={umkmList}
                tourismList={tourismList}
                galleryList={galleryList}
                setActivePage={setActivePage}
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

          {/* Public Footer */}
          <Footer
            profile={profile}
            setActivePage={setActivePage}
            onOpenTracking={() => setTrackingModalOpen(true)}
          />
        </div>
      )}
    </div>
  );
}
