import React from 'react';
import { X, ShoppingBag, Phone, Star, CheckCircle2, MessageCircle } from 'lucide-react';

export default function UmkmDetailModal({ isOpen, onClose, product, profile }) {
  if (!isOpen || !product) return null;

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const handleOrderWhatsApp = () => {
    const phone = product.phone || profile?.contact?.whatsapp || '6281234567890';
    const message = encodeURIComponent(
      `Halo *${product.owner}*, saya melihat produk *${product.name}* di Portal Desa Pintar ${profile?.name || 'Desa'}.\n\nSaya ingin memesan produk tersebut.\n- Produk: ${product.name}\n- Harga: ${formatRupiah(product.price)} / ${product.unit || 'pcs'}\n\nMohon info ketersediaan stok & pengirimannya. Terima kasih!`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShoppingBag size={20} />
            </div>
            <div>
              <h3 className="modal-title" style={{ fontSize: '1.2rem', margin: 0 }}>
                Detail Produk UMKM
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Karya & Hasil Olahan Warga Desa
              </p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '1.5rem' }}>
          <div style={{
            height: '240px',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '1.25rem',
            background: '#e2e8f0',
            position: 'relative'
          }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {product.badge && (
              <span className="badge badge-warning" style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.85rem' }}>
                ★ {product.badge}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div>
              <span className="badge badge-neutral" style={{ marginBottom: '0.35rem' }}>{product.category}</span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {product.name}
              </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>
                {formatRupiah(product.price)}
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ {product.unit || 'item'}</span>
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            {product.description}
          </p>

          <div style={{
            background: '#f8fafc',
            border: '1px solid var(--light-border)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.875rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Pengrajin / Pelaku Usaha:</span>
                <strong>{product.owner}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Rating & Terjual:</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700, color: '#d97706' }}>
                  <Star size={14} fill="#d97706" /> {product.rating || 5.0} ({product.soldCount || 0} terjual)
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              className="btn btn-primary btn-lg"
              style={{ flex: 1, background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
              onClick={handleOrderWhatsApp}
            >
              <MessageCircle size={20} /> Pesan Langsung via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
