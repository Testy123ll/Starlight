'use client';

import { useQuoteStore } from '@/store/quoteStore';
import Link from 'next/link';

export default function QuoteDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQty, subtotal, vatAmount, total } = useQuoteStore();
  const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`;

  return (
    <>
      {open && <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40, backdropFilter: 'blur(4px)' }} />}
      <div style={{ position: 'fixed', top: 0, right: 0, height: '100%', width: '100%', maxWidth: '28rem', background: '#20201F', zIndex: 50, display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', borderBottom: '1px solid #353535' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff' }}>Quote Cart <span style={{ color: '#D97706', marginLeft: '0.5rem' }}>{items.length}</span></h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#CAC6BE', cursor: 'pointer', fontSize: '1.25rem' }}>✕</button>
        </div>

        {items.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#CAC6BE', gap: '0.75rem' }}>
            <p style={{ fontSize: '0.875rem' }}>Your quote cart is empty</p>
            <button onClick={onClose} className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.375rem 1rem' }}>Browse Products</button>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {items.map((item) => (
                <div key={item.productId} className="card-dark" style={{ padding: '0.75rem', display: 'flex', gap: '0.75rem' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#CAC6BE', marginTop: '0.125rem' }}>{item.sku} · {item.specs}</p>
                    <p style={{ fontSize: '0.875rem', color: '#D97706', fontWeight: 700, marginTop: '0.25rem' }}>{fmt(item.unitPrice)}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <button onClick={() => removeItem(item.productId)} style={{ background: 'none', border: 'none', color: '#CAC6BE', cursor: 'pointer', fontSize: '0.75rem' }}>✕</button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: '#353535', borderRadius: '0.25rem', padding: '0.25rem 0.5rem' }}>
                      <button onClick={() => updateQty(item.productId, Math.max(1, item.qty - 1))} style={{ background: 'none', border: 'none', color: '#CAC6BE', cursor: 'pointer', width: '1rem', textAlign: 'center' }}>−</button>
                      <span style={{ color: '#fff', fontSize: '0.75rem', width: '1.5rem', textAlign: 'center' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.productId, item.qty + 1)} style={{ background: 'none', border: 'none', color: '#CAC6BE', cursor: 'pointer', width: '1rem', textAlign: 'center' }}>+</button>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 700 }}>{fmt(item.unitPrice * item.qty)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #353535', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#CAC6BE' }}>
                <span>Subtotal</span><span>{fmt(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#CAC6BE' }}>
                <span>VAT (7.5%)</span><span>{fmt(vatAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 700, color: '#fff', paddingTop: '0.5rem', borderTop: '1px solid rgba(53,53,53,0.5)' }}>
                <span>Estimated Total</span><span style={{ color: '#D97706' }}>{fmt(total)}</span>
              </div>
              <Link href="/quote" onClick={onClose} className="btn-amber" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem', textDecoration: 'none', textAlign: 'center' }}>
                Proceed to Quote Form →
              </Link>
              <p style={{ fontSize: '0.75rem', textAlign: 'center', color: '#CAC6BE' }}>Final price confirmed by our sales team</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
