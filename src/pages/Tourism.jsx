import React from 'react';
import { Palmtree, MapPin, Clock, Ticket, Star, CheckCircle, Navigation } from 'lucide-react';

export default function Tourism({ tourismList }) {
  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const handleOpenMaps = (spotName) => {
    const query = encodeURIComponent(`${spotName} Sukamaju`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b, #0f172a)',
        color: '#fff',
        padding: '4rem 0 3.5rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#6ee7b7' }}>
            Pesona Nusantara
          </span>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, margin: '0.5rem 0 1rem' }}>
            Destinasi Wisata Desa
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Nikmati keindahan panorama alam yang asri, udara segar perbukitan, dan keramahan agrowisata edukatif.
          </p>
        </div>
      </div>

      <div className="container section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {tourismList.map((spot, index) => (
            <div
              key={spot.id}
              style={{
                background: '#fff',
                borderRadius: '24px',
                border: '1px solid var(--light-border)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                display: 'grid',
                gridTemplateColumns: index % 2 === 0 ? '1.1fr 1fr' : '1fr 1.1fr',
                gap: 0
              }}
            >
              {/* Image Side */}
              <div style={{
                height: '100%',
                minHeight: '340px',
                order: index % 2 === 0 ? 1 : 2,
                position: 'relative',
                background: '#e2e8f0'
              }}>
                <img
                  src={spot.image}
                  alt={spot.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {spot.highlight && (
                  <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
                    <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
                      🌿 {spot.highlight}
                    </span>
                  </div>
                )}
              </div>

              {/* Info Side */}
              <div style={{
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                order: index % 2 === 0 ? 2 : 1
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className="badge badge-info">{spot.category}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700, color: '#d97706' }}>
                      <Star size={16} fill="#d97706" /> {spot.rating} / 5.0
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                    {spot.name}
                  </h2>

                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                    {spot.description}
                  </p>

                  {/* Metadata Chips */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#334155' }}>
                      <MapPin size={16} color="#059669" />
                      <span>{spot.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#334155' }}>
                      <Clock size={16} color="#059669" />
                      <span>{spot.openHours}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#334155' }}>
                      <Ticket size={16} color="#059669" />
                      <span>Tiket Masuk: <strong style={{ color: '#059669' }}>{spot.ticketPrice === 0 ? 'Gratis' : formatRupiah(spot.ticketPrice)}</strong></span>
                    </div>
                  </div>

                  {/* Facilities list */}
                  {spot.facilities && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                        Fasilitas Tersedia:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {spot.facilities.map((fac, fIdx) => (
                          <span
                            key={fIdx}
                            style={{
                              background: '#f1f5f9',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              color: '#475569',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem'
                            }}
                          >
                            <CheckCircle size={12} color="#10b981" /> {fac}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--light-border)' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleOpenMaps(spot.name)}
                    style={{ flex: 1 }}
                  >
                    <Navigation size={16} /> Buka Petunjuk Rute Maps
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
