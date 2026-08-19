import React from 'react';
import { Palmtree, MapPin, Clock, Ticket, Star, CheckCircle, Navigation } from 'lucide-react';

export const slug = '/wisata';
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
        padding: 'clamp(3rem, 5vw, 4rem) 0 clamp(2.5rem, 4vw, 3.5rem)',
        textAlign: 'center'
      }}>
        <div className="container">
          <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#6ee7b7' }}>
            Pesona Nusantara
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, margin: '0.5rem 0 1rem' }}>
            Destinasi Wisata Desa
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', maxWidth: '600px', margin: '0 auto' }}>
            Nikmati keindahan panorama alam yang asri, udara segar perbukitan, dan keramahan agrowisata edukatif.
          </p>
        </div>
      </div>

      <div className="container section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {tourismList.map((spot) => (
            <div
              key={spot.id}
              className="card"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
                gap: 0,
                overflow: 'hidden'
              }}
            >
              {/* Image */}
              <div style={{
                position: 'relative',
                minHeight: '260px',
                height: '100%',
                background: '#f1f5f9'
              }}>
                <img
                  src={spot.image}
                  alt={spot.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {spot.highlight && (
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                    <span className="badge badge-success" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
                      🌿 {spot.highlight}
                    </span>
                  </div>
                )}
              </div>

              {/* Info Body */}
              <div style={{
                padding: 'clamp(1.25rem, 3vw, 2rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <span className="badge badge-info">{spot.category}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700, fontSize: '0.85rem', color: '#d97706' }}>
                      <Star size={14} fill="#d97706" /> {spot.rating} / 5.0
                    </span>
                  </div>

                  <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.55rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem' }}>
                    {spot.name}
                  </h2>

                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                    {spot.description}
                  </p>

                  {/* Metadata */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-body)' }}>
                      <MapPin size={15} color="#059669" style={{ flexShrink: 0 }} />
                      <span>{spot.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-body)' }}>
                      <Clock size={15} color="#059669" style={{ flexShrink: 0 }} />
                      <span>{spot.openHours}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-body)' }}>
                      <Ticket size={15} color="#059669" style={{ flexShrink: 0 }} />
                      <span>Tiket Masuk: <strong style={{ color: 'var(--primary)' }}>{spot.ticketPrice === 0 ? 'Gratis' : formatRupiah(spot.ticketPrice)}</strong></span>
                    </div>
                  </div>

                  {/* Facilities */}
                  {spot.facilities && (
                    <div style={{ marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                        Fasilitas:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {spot.facilities.map((fac, fIdx) => (
                          <span
                            key={fIdx}
                            style={{
                              background: 'var(--light-border)',
                              padding: '0.2rem 0.55rem',
                              borderRadius: '6px',
                              fontSize: '0.775rem',
                              color: 'var(--text-body)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem'
                            }}
                          >
                            <CheckCircle size={11} color="#10b981" /> {fac}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--light-border)' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleOpenMaps(spot.name)}
                    style={{ width: '100%' }}
                  >
                    <Navigation size={15} /> Buka Petunjuk Rute Maps
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
