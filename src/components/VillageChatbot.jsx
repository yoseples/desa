import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  FileText, 
  Search, 
  Building, 
  ShieldAlert, 
  ShoppingBag, 
  Sparkles, 
  ExternalLink,
  Bot,
  User,
  HeartHandshake
} from 'lucide-react';

export default function VillageChatbot({ profile, onOpenServiceModal, onOpenTracking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Sampurasun / Halo Warga ${profile?.name || 'Desa Sukamaju'}! 👋\nSaya **Si Pintar**, Asisten Virtual Desa siap membantu Anda mendapatkan informasi layanan mandiri atau menghubungkan Anda langsung ke staf/departemen desa via WhatsApp.`,
      time: 'Baru saja'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-open chatbot after 1 minute (60,000 ms) of visitor session
  useEffect(() => {
    const autoOpenTimer = setTimeout(() => {
      setIsOpen(true);
      setUnreadBadge(false);
    }, 60000); // 1 menit

    return () => clearTimeout(autoOpenTimer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setUnreadBadge(false);
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  // Village Staff Department Contacts for WhatsApp Routing
  const departments = [
    {
      id: 'dept-pelayanan',
      title: 'Loket Pelayanan & Surat (Kasi Pelayanan)',
      staffName: 'Ahmad Fauzi, S.Kom',
      phone: '6285211223344',
      icon: FileText,
      desc: 'Pembuatan SKU, SKTM, Domisili, SKCK, & Pengantar Kependudukan'
    },
    {
      id: 'dept-kesra',
      title: 'Bansos & Kesejahteraan (Kasi Kesra)',
      staffName: 'Dewi Lestari, S.Sos',
      phone: '6289677889900',
      icon: HeartHandshake,
      desc: 'Info DTKS, Bansos PKH/BPNT, BPJS PBI, & Kesehatan Desa'
    },
    {
      id: 'dept-sekretariat',
      title: 'Sekretariat & Pembangunan (Sekdes)',
      staffName: 'Rahmat Hidayat, S.IP',
      phone: '6281398765432',
      icon: Building,
      desc: 'Kerjasama, BUMDes, Perizinan, & Administrasi Desa'
    },
    {
      id: 'dept-keamanan',
      title: 'Siaga Darurat & Keamanan (Babinsa/Bhabinkamtibmas)',
      staffName: 'Posko Siaga Desa',
      phone: '6282133445566',
      icon: ShieldAlert,
      desc: 'Ambulans desa, bencana alam, & ketertiban lingkungan'
    }
  ];

  const handleOpenWhatsapp = (dept) => {
    const text = encodeURIComponent(`Halo ${dept.staffName} (${dept.title}), saya warga Desa Sukamaju ingin berkonsultasi mengenai layanan.`);
    window.open(`https://wa.me/${dept.phone}?text=${text}`, '_blank');
  };

  const handleQuickAction = (actionKey) => {
    if (actionKey === 'surat') {
      addBotResponse(`Untuk membuat surat online secara mandiri tanpa antre, silakan gunakan menu Pelayanan Surat Mandiri. Anda cukup menyiapkan NIK 16 digit. Ingin buka formulir sekarang?`, [
        { label: '📝 Buka Formulir Surat', action: () => onOpenServiceModal('SKU') },
        { label: '💬 Chat WA Staf Pelayanan', action: () => handleOpenWhatsapp(departments[0]) }
      ]);
    } else if (actionKey === 'lacak') {
      addBotResponse(`Anda bisa memeriksa status pengajuan surat dengan memasukkan Nomor Resi Tracking Code (contoh: DS-SKU-9821).`, [
        { label: '🔍 Buka Pelacak Resi', action: () => onOpenTracking() }
      ]);
    } else if (actionKey === 'kontak') {
      addBotResponse(`Berikut adalah departemen & kontak WhatsApp staf pemerintah desa yang siap Anda hubungi secara langsung:`, departments.map(d => ({
        label: `📱 ${d.title}`,
        action: () => handleOpenWhatsapp(d)
      })));
    } else if (actionKey === 'jadwal') {
      addBotResponse(`🕒 **Jam Pelayanan Kantor Desa Sukamaju:**\n• **Senin - Jumat**: 08.00 - 15.30 WIB\n• **Sabtu - Minggu / Libur Nasional**: Tutup\n\n*Catatan: Layanan pengajuan surat online mandiri di website tetap aktif 24 jam nonstop.*`);
    } else if (actionKey === 'bansos') {
      addBotResponse(`Untuk informasi pengecekan data bantuan sosial (DTKS / PKH / BPNT / BLT Dana Desa), Anda bisa langsung berkonsultasi dengan Kasi Kesejahteraan Rakyat.`, [
        { label: '💬 Chat WA Kasi Kesra', action: () => handleOpenWhatsapp(departments[1]) }
      ]);
    }
  };

  const addBotResponse = (text, actions = null) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text,
          actions,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const newMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputValue('');

    // Natural Language Matching
    const lower = userText.toLowerCase();
    if (lower.includes('surat') || lower.includes('sku') || lower.includes('sktm') || lower.includes('domisili') || lower.includes('ktp') || lower.includes('kk')) {
      addBotResponse('Untuk pengajuan surat mandiri online (SKU, SKTM, Domisili, SKCK, dll.), sistem kami melayani 24 jam. Apakah Anda ingin langsung mengisi formulir atau berkonsultasi dengan petugas loket via WhatsApp?', [
        { label: '📝 Buka Formulir Surat Online', action: () => onOpenServiceModal('SKU') },
        { label: '💬 Chat WA Staf Pelayanan', action: () => handleOpenWhatsapp(departments[0]) }
      ]);
    } else if (lower.includes('lacak') || lower.includes('resi') || lower.includes('status') || lower.includes('cek')) {
      addBotResponse('Silakan buka menu Pelacak Resi untuk melihat status surat Anda secara langsung.', [
        { label: '🔍 Buka Pelacak Resi', action: () => onOpenTracking() }
      ]);
    } else if (lower.includes('wa') || lower.includes('whatsapp') || lower.includes('kontak') || lower.includes('telepon') || lower.includes('hubungi')) {
      addBotResponse('Silakan pilih departemen/staf yang ingin Anda hubungi via WhatsApp:', departments.map(d => ({
        label: `📱 ${d.title}`,
        action: () => handleOpenWhatsapp(d)
      })));
    } else if (lower.includes('bansos') || lower.includes('bantuan') || lower.includes('dtks') || lower.includes('pkh') || lower.includes('blt')) {
      addBotResponse('Untuk pengecekan data bantuan sosial, Anda dapat terhubung langsung ke staf Kesejahteraan Rakyat (Kasi Kesra).', [
        { label: '💬 Chat WA Kasi Kesra', action: () => handleOpenWhatsapp(departments[1]) }
      ]);
    } else if (lower.includes('darurat') || lower.includes('ambulans') || lower.includes('bencana') || lower.includes('polisi') || lower.includes('maling')) {
      addBotResponse('🚨 **Panggilan Darurat Desa 24 Jam:**\nSegera hubungi tim siaga darurat melalui WhatsApp / Telepon berikut:', [
        { label: '🚑 Panggil Ambulans Desa', action: () => window.open(`tel:082133445566`, '_self') },
        { label: '🛡️ Hubungi Babinsa / Bhabinkamtibmas', action: () => handleOpenWhatsapp(departments[3]) }
      ]);
    } else if (lower.includes('jam') || lower.includes('buka') || lower.includes('jadwal') || lower.includes('tutup') || lower.includes('kantor')) {
      addBotResponse(`🕒 Kantor Balai Desa buka **Senin - Jumat pukul 08.00 - 15.30 WIB**. Layanan surat online mandiri di website tetap aktif 24 jam.`);
    } else {
      addBotResponse(`Terima kasih atas pertanyaannya. Agar lebih spesifik, silakan pilih salah satu opsi bantuan berikut atau hubungi staf kami langsung di WhatsApp:`, [
        { label: '📝 Buat Surat Online', action: () => onOpenServiceModal('SKU') },
        { label: '🔍 Cek Status Resi', action: () => onOpenTracking() },
        { label: '📱 Hubungi WhatsApp Staf Desa', action: () => handleQuickAction('kontak') }
      ]);
    }
  };

  return (
    <>
      {/* 1. FLOATING CHAT TRIGGER BUTTON */}
      <div 
        style={{
          position: 'fixed',
          bottom: '1.75rem',
          right: '1.75rem',
          zIndex: 1500,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.5rem'
        }}
      >
        {!isOpen && unreadBadge && (
          <div 
            onClick={() => setIsOpen(true)}
            style={{
              background: 'var(--light-surface)',
              color: 'var(--text-main)',
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
              border: '1px solid var(--primary-border)',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              animation: 'slideInRight 0.3s ease'
            }}
          >
            <Sparkles size={15} color="#059669" />
            <span>Tanya Asisten Desa Pintar 👋</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #059669, #047857)',
            color: '#ffffff',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 8px 25px rgba(5, 150, 105, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isOpen ? 'rotate(90deg) scale(0.95)' : 'scale(1)'
          }}
          aria-label="Buka Chatbot Desa"
        >
          {isOpen ? <X size={26} /> : <MessageCircle size={28} />}
        </button>
      </div>

      {/* 2. CHATBOT WINDOW DIALOG */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '5.8rem',
            right: '1.5rem',
            width: 'min(92vw, 390px)',
            height: 'min(82vh, 580px)',
            background: 'var(--light-surface)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--light-border)',
            zIndex: 1500,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #044332, #059669)',
            color: '#ffffff',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid #6ee7b7'
              }}>
                <Bot size={22} color="#a7f3d0" />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                  Si Pintar (Asisten Desa)
                </h3>
                <span style={{ fontSize: '0.725rem', color: '#a7f3d0', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span className="pulsing-dot" style={{ width: '6px', height: '6px' }}></span> Online Siaga 24 Jam
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: '#fff',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Routing Chips Toolbar */}
          <div style={{
            background: 'var(--light-bg)',
            padding: '0.65rem 0.85rem',
            borderBottom: '1px solid var(--light-border)',
            display: 'flex',
            gap: '0.4rem',
            overflowX: 'auto'
          }}>
            <button
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', flexShrink: 0 }}
              onClick={() => handleQuickAction('surat')}
            >
              <FileText size={12} /> Buat Surat
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', flexShrink: 0 }}
              onClick={() => handleQuickAction('lacak')}
            >
              <Search size={12} /> Lacak Resi
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', flexShrink: 0, color: 'var(--primary)', borderColor: 'var(--primary-border)' }}
              onClick={() => handleQuickAction('kontak')}
            >
              <Phone size={12} /> WA Staf
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', flexShrink: 0 }}
              onClick={() => handleQuickAction('jadwal')}
            >
              🕒 Jam Kantor
            </button>
          </div>

          {/* Messages Body */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            background: 'var(--light-bg)'
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, #059669, #047857)' : 'var(--light-surface)',
                  color: msg.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                  padding: '0.75rem 0.95rem',
                  borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--light-border)',
                  fontSize: '0.85rem',
                  lineHeight: 1.55,
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.text}

                  {/* Interactive Action Buttons */}
                  {msg.actions && (
                    <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {msg.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={act.action}
                          style={{
                            background: 'rgba(16, 185, 129, 0.12)',
                            border: '1px solid rgba(16, 185, 129, 0.35)',
                            color: 'var(--primary)',
                            padding: '0.45rem 0.75rem',
                            borderRadius: '8px',
                            fontSize: '0.775rem',
                            fontWeight: 700,
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'var(--transition)'
                          }}
                        >
                          <span>{act.label}</span>
                          <ExternalLink size={12} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)', marginTop: '2px', padding: '0 4px' }}>
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--light-surface)', padding: '0.5rem 0.85rem', borderRadius: '12px', width: 'fit-content', border: '1px solid var(--light-border)' }}>
                <Bot size={14} color="#059669" />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Si Pintar sedang mengetik...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} style={{
            padding: '0.75rem 1rem',
            background: 'var(--light-surface)',
            borderTop: '1px solid var(--light-border)',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder="Ketik pertanyaan (cth: buat surat, bansos, wa)..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="form-input"
              style={{
                fontSize: '0.85rem',
                padding: '0.55rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--light-bg)',
                color: 'var(--text-main)',
                border: '1px solid var(--light-border)',
                flex: 1
              }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: inputValue.trim() ? '#059669' : 'var(--light-border)',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputValue.trim() ? 'pointer' : 'default',
                transition: 'var(--transition)',
                flexShrink: 0
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
