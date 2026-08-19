import React, { useState } from 'react';
import { 
  MapPin, 
  Building, 
  HeartPulse, 
  GraduationCap, 
  Moon, 
  ShoppingBag, 
  Palmtree, 
  ShieldCheck, 
  RefreshCw, 
  Award,
  Layers, 
  X, 
  Filter, 
  Compass,
  Info
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export default function VillageMapModal({ isOpen, onClose, profile }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDusun, setSelectedDusun] = useState('ALL');
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  if (!isOpen) return null;

  const amenities = StorageService.getAmenities() || [];

  const categories = [
    { id: 'ALL', label: 'Semua Fasilitas', icon: Layers },
    { id: 'Pemerintahan', label: 'Pemerintahan', icon: Building, color: '#059669' },
    { id: 'Kesehatan', label: 'Kesehatan & Pustu', icon: HeartPulse, color: '#dc2626' },
    { id: 'Pendidikan', label: 'Sekolah & Pendidikan', icon: GraduationCap, color: '#2563eb' },
    { id: 'Ibadah', label: 'Tempat Ibadah', icon: Moon, color: '#0d9488' },
    { id: 'Ekonomi', label: 'Pasar & BUMDes', icon: ShoppingBag, color: '#d97706' },
    { id: 'Wisata', label: 'Objek Wisata', icon: Palmtree, color: '#059669' },
    { id: 'Keamanan', label: 'Pos Kamling', icon: ShieldCheck, color: '#7c3aed' }
  ];

  const dusunList = [
    { id: 'ALL', name: 'Seluruh Wilayah Desa' },
    { id: 'Dusun Pasirjati', name: 'Dusun Pasirjati (RW 01, RW 02, RW 03)' },
    { id: 'Dusun Sukarame', name: 'Dusun Sukarame (RW 04, RW 05)' },
    { id: 'Dusun Cikembar', name: 'Dusun Cikembar (RW 06, RW 07, RW 08)' },
    { id: 'Dusun Mekar', name: 'Dusun Mekar (RW 09, RW 10)' }
  ];

  const filteredAmenities = amenities.filter((item) => {
    const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchDusun = selectedDusun === 'ALL' || item.dusun === selectedDusun;
    return matchCat && matchDusun;
  });

  const getIconComponent = (cat) => {
    switch (cat) {
      case 'Pemerintahan': return Building;
      case 'Kesehatan': return HeartPulse;
      case 'Pendidikan': return GraduationCap;
      case 'Ibadah': return Moon;
      case 'Ekonomi': return ShoppingBag;
      case 'Wisata': return Palmtree;
      case 'Keamanan': return ShieldCheck;
      default: return MapPin;
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Pemerintahan': return '#059669';
      case 'Kesehatan': return '#dc2626';
      case 'Pendidikan': return '#2563eb';
      case 'Ibadah': return '#0d9488';
      case 'Ekonomi': return '#d97706';
      case 'Wisata': return '#10b981';
      case 'Keamanan': return '#7c3aed';
      default: return '#0284c7';
    }
  };

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '960px', maxHeight: '92vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)', color: '#ffffff', borderBottom: 'none' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.6rem', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700, color: '#6ee7b7', marginBottom: '0.35rem' }}>
              <Compass size={12} /> WebGIS & Pemetaan Wilayah
            </div>
            <h3 className="modal-title" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              Peta Digital & Sebaran Fasilitas {profile?.name || 'Desa Sukamaju'}
            </h3>
            <span style={{ fontSize: '0.775rem', color: '#94a3b8' }}>
              Informasi geospasial fasilitas pemerintahan, kesehatan, pendidikan, sarana ibadah, dan potensi ekonomi desa.
            </span>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', padding: '0.35rem 0.55rem' }}
          >
            <X size={15} />
          </button>
        </div>

        <div style={{ padding: '1.25rem 1.5rem' }}>
          
          {/* Top Filter Bar */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.25rem', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <cat.icon size={13} /> {cat.label}
                </button>
              ))}
            </div>

            {/* Dusun Selector */}
            <div style={{ minWidth: '220px' }}>
              <select
                className="form-control"
                style={{ fontSize: '0.8rem', height: '34px', padding: '0.2rem 0.6rem' }}
                value={selectedDusun}
                onChange={(e) => setSelectedDusun(e.target.value)}
              >
                {dusunList.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Interactive WebGIS Canvas Simulator */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '380px',
            background: '#e0f2fe',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid #bae6fd',
            overflow: 'hidden',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06)',
            marginBottom: '1.25rem'
          }}>
            {/* SVG Topographical & Dusun Boundary Layer */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              {/* Rivers */}
              <path d="M 0,220 Q 200,180 450,260 T 960,200" fill="none" stroke="#7dd3fc" strokeWidth="18" opacity="0.6" />
              <path d="M 0,220 Q 200,180 450,260 T 960,200" fill="none" stroke="#38bdf8" strokeWidth="6" opacity="0.8" />
              
              {/* Main Village Roads */}
              <path d="M 480,0 L 520,380" fill="none" stroke="#fef08a" strokeWidth="10" />
              <path d="M 480,0 L 520,380" fill="none" stroke="#ca8a04" strokeWidth="2" strokeDasharray="6,6" />
              <path d="M 0,160 Q 400,200 960,140" fill="none" stroke="#fef08a" strokeWidth="8" />
              
              {/* Dusun Boundary Polygons */}
              <rect x="20" y="20" width="420" height="150" rx="15" fill="#dcfce7" opacity="0.45" stroke="#86efac" strokeWidth="1.5" strokeDasharray="4,4" />
              <text x="35" y="45" fill="#166534" fontSize="11" fontWeight="800">Dusun Pasirjati (RW 01-03)</text>

              <rect x="470" y="20" width="460" height="150" rx="15" fill="#fef3c7" opacity="0.45" stroke="#fde68a" strokeWidth="1.5" strokeDasharray="4,4" />
              <text x="485" y="45" fill="#92400e" fontSize="11" fontWeight="800">Dusun Sukarame (RW 04-05)</text>

              <rect x="470" y="190" width="460" height="170" rx="15" fill="#f3e8ff" opacity="0.45" stroke="#e9d5ff" strokeWidth="1.5" strokeDasharray="4,4" />
              <text x="485" y="215" fill="#6b21a8" fontSize="11" fontWeight="800">Dusun Cikembar (RW 06-08)</text>

              <rect x="20" y="190" width="420" height="170" rx="15" fill="#f1f5f9" opacity="0.5" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,4" />
              <text x="35" y="215" fill="#475569" fontSize="11" fontWeight="800">Dusun Mekar (RW 09-10)</text>
            </svg>

            {/* Amenity Interactive Pins */}
            {filteredAmenities.map((item) => {
              const Icon = getIconComponent(item.category);
              const color = getCategoryColor(item.category);
              const isSelected = selectedAmenity?.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedAmenity(item)}
                  style={{
                    position: 'absolute',
                    top: `${item.y}%`,
                    left: `${item.x}%`,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    zIndex: isSelected ? 20 : 10,
                    transition: 'all 0.2s ease'
                  }}
                  title={item.name}
                >
                  <div style={{
                    width: isSelected ? '42px' : '32px',
                    height: isSelected ? '42px' : '32px',
                    borderRadius: '50%',
                    background: color,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isSelected ? '0 0 0 4px rgba(255,255,255,0.9), 0 4px 12px rgba(0,0,0,0.3)' : '0 2px 6px rgba(0,0,0,0.25)',
                    border: '2px solid #ffffff'
                  }}>
                    <Icon size={isSelected ? 20 : 16} />
                  </div>
                  
                  {/* Pin Title Pill */}
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(15, 23, 42, 0.88)',
                    color: '#ffffff',
                    fontSize: '0.675rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    marginTop: '3px',
                    pointerEvents: 'none',
                    backdropFilter: 'blur(4px)'
                  }}>
                    {item.name.split(' ')[0]} {item.name.split(' ')[1] || ''}
                  </div>
                </div>
              );
            })}

            {/* Map Legend Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              background: 'rgba(255, 255, 255, 0.92)',
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              fontSize: '0.7rem',
              color: 'var(--text-main)',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center',
              backdropFilter: 'blur(4px)'
            }}>
              <span><strong>Total Titik:</strong> {filteredAmenities.length} Lokasi</span>
              <span>•</span>
              <span>Klik ikon untuk rincian fasilitas</span>
            </div>
          </div>

          {/* Selected Amenity Detail Card */}
          {selectedAmenity && (
            <div style={{
              background: 'var(--light-surface)',
              borderRadius: 'var(--radius-lg)',
              border: `2px solid ${getCategoryColor(selectedAmenity.category)}`,
              padding: '1rem 1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge" style={{ background: getCategoryColor(selectedAmenity.category), color: '#fff', fontSize: '0.7rem' }}>
                    {selectedAmenity.category}
                  </span>
                  <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    {selectedAmenity.dusun}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0' }}>
                  {selectedAmenity.name}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', margin: 0 }}>
                  {selectedAmenity.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedAmenity.name + ' ' + (profile?.name || 'Desa Sukamaju'))}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: '0.75rem', fontWeight: 700 }}
                >
                  <MapPin size={13} /> Buka di Google Maps
                </a>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSelectedAmenity(null)}
                >
                  Tutup Rincian
                </button>
              </div>
            </div>
          )}

          {/* Facilities List Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
            {filteredAmenities.slice(0, 6).map((item) => {
              const Icon = getIconComponent(item.category);
              const color = getCategoryColor(item.category);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedAmenity(item)}
                  style={{
                    background: selectedAmenity?.id === item.id ? '#f0fdf4' : '#ffffff',
                    border: `1px solid ${selectedAmenity?.id === item.id ? '#86efac' : 'var(--light-border)'}`,
                    borderRadius: '8px',
                    padding: '0.75rem 0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                  className="hover-card"
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${color}15`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h5 style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </h5>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {item.dusun} • {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
