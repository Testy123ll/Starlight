'use client';

import { useState } from 'react';
import { useQuoteStore } from '@/store/quoteStore';
import { createQuote } from '@/lib/firestore';
import { useRouter } from 'next/navigation';

const NIGERIAN_STATES = ['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT - Abuja','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'];

export default function QuotePage() {
  const router = useRouter();
  const { items, subtotal, vatAmount, total, removeItem, updateQty, clearQuote } = useQuoteStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`;

  const [contact, setContact] = useState({ name: '', email: '', phone: '', company: '', state: 'Lagos' });
  const [delivery, setDelivery] = useState({ address: '', city: '', state: 'Lagos', notes: '' });

  const submit = async () => {
    setLoading(true);
    try {
      await createQuote({ contactInfo: contact, items, deliveryInfo: delivery, subtotal, vatAmount, total, status: 'pending' });
      clearQuote();
      setStep(4);
    } catch (err) {
      console.error(err);
      alert('Failed to submit quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && step !== 4) {
    return (
      <div style={{ maxWidth: '40rem', margin: '5rem auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#fff' }}>Your Quote is Empty</h1>
        <p style={{ color: '#CAC6BE', marginTop: '1rem', marginBottom: '2rem' }}>Add products from the catalog or calculator to request a bulk quote.</p>
        <button onClick={() => router.push('/products')} className="btn-amber">Browse Catalog</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '3rem 1rem' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#fff', textAlign: 'center', marginBottom: '2rem' }}>Request Bulk Quote</h1>
      
      {/* PROGRESS BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: '#353535', zIndex: 0, transform: 'translateY(-50%)' }} />
        {['Contact', 'Items', 'Delivery', 'Done'].map((lbl, i) => {
          const s = i + 1;
          const active = step >= s;
          return (
            <div key={s} style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: active ? '#D97706' : '#20201F', border: `2px solid ${active ? '#D97706' : '#353535'}`, color: active ? '#131313' : '#CAC6BE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem' }}>
                {s}
              </div>
              <span style={{ fontSize: '0.75rem', color: active ? '#fff' : '#CAC6BE', fontWeight: active ? 600 : 400 }}>{lbl}</span>
            </div>
          );
        })}
      </div>

      <div className="card-dark" style={{ padding: '2rem' }}>
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', borderBottom: '1px solid #353535', paddingBottom: '0.75rem' }}>1. Contact Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div><label style={{ fontSize: '0.75rem', color: '#CAC6BE', display: 'block', marginBottom: '0.25rem' }}>Full Name *</label><input required className="input-dark" value={contact.name} onChange={(e) => setContact({...contact, name: e.target.value})} /></div>
              <div><label style={{ fontSize: '0.75rem', color: '#CAC6BE', display: 'block', marginBottom: '0.25rem' }}>Company (Optional)</label><input className="input-dark" value={contact.company} onChange={(e) => setContact({...contact, company: e.target.value})} /></div>
              <div><label style={{ fontSize: '0.75rem', color: '#CAC6BE', display: 'block', marginBottom: '0.25rem' }}>Email *</label><input type="email" required className="input-dark" value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} /></div>
              <div><label style={{ fontSize: '0.75rem', color: '#CAC6BE', display: 'block', marginBottom: '0.25rem' }}>Phone *</label><input type="tel" required className="input-dark" value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} /></div>
              <div style={{ gridColumn: '1 / -1' }}><label style={{ fontSize: '0.75rem', color: '#CAC6BE', display: 'block', marginBottom: '0.25rem' }}>State *</label><select className="input-dark" value={contact.state} onChange={(e) => setContact({...contact, state: e.target.value})}>{NIGERIAN_STATES.map(s => <option key={s}>{s}</option>)}</select></div>
            </div>
            <button onClick={() => { if (contact.name && contact.email && contact.phone) setStep(2); else alert('Fill required fields'); }} className="btn-amber" style={{ alignSelf: 'flex-end', marginTop: '1rem' }}>Next: Review Items →</button>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', borderBottom: '1px solid #353535', paddingBottom: '0.75rem' }}>2. Requested Items</h2>
            <div style={{ border: '1px solid #353535', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <table className="admin-table">
                <thead><tr><th>Product</th><th>Qty</th><th>Unit Price</th><th>Total</th><th></th></tr></thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.productId}>
                      <td><p style={{ fontWeight: 600, color: '#fff' }}>{it.name}</p><p style={{ fontSize: '0.75rem', color: '#CAC6BE' }}>{it.sku} · {it.specs}</p></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#353535', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', width: 'fit-content' }}>
                          <button onClick={() => updateQty(it.productId, Math.max(1, it.qty - 1))} style={{ background: 'none', border: 'none', color: '#CAC6BE', cursor: 'pointer' }}>-</button>
                          <span style={{ color: '#fff', width: '2rem', textAlign: 'center' }}>{it.qty}</span>
                          <button onClick={() => updateQty(it.productId, it.qty + 1)} style={{ background: 'none', border: 'none', color: '#CAC6BE', cursor: 'pointer' }}>+</button>
                        </div>
                      </td>
                      <td>{fmt(it.unitPrice)}</td>
                      <td style={{ fontWeight: 700, color: '#fff' }}>{fmt(it.unitPrice * it.qty)}</td>
                      <td><button onClick={() => removeItem(it.productId)} style={{ background: 'none', border: 'none', color: '#C2410C', cursor: 'pointer' }}>Remove</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ background: '#1C1B1B', padding: '1rem', borderTop: '1px solid #353535', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: '#CAC6BE' }}><span style={{ width: '6rem' }}>Subtotal:</span><span>{fmt(subtotal)}</span></div>
                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: '#CAC6BE' }}><span style={{ width: '6rem' }}>VAT (7.5%):</span><span>{fmt(vatAmount)}</span></div>
                <div style={{ display: 'flex', gap: '2rem', fontSize: '1.125rem', color: '#D97706', fontWeight: 900, marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #353535' }}><span style={{ width: '6rem' }}>Total:</span><span>{fmt(total)}</span></div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <button onClick={() => setStep(1)} className="btn-ghost">← Back</button>
              <button onClick={() => setStep(3)} className="btn-amber">Next: Delivery Info →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', borderBottom: '1px solid #353535', paddingBottom: '0.75rem' }}>3. Delivery Details</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div><label style={{ fontSize: '0.75rem', color: '#CAC6BE', display: 'block', marginBottom: '0.25rem' }}>Site Address *</label><input required className="input-dark" value={delivery.address} onChange={(e) => setDelivery({...delivery, address: e.target.value})} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={{ fontSize: '0.75rem', color: '#CAC6BE', display: 'block', marginBottom: '0.25rem' }}>City *</label><input required className="input-dark" value={delivery.city} onChange={(e) => setDelivery({...delivery, city: e.target.value})} /></div>
                <div><label style={{ fontSize: '0.75rem', color: '#CAC6BE', display: 'block', marginBottom: '0.25rem' }}>State *</label><select className="input-dark" value={delivery.state} onChange={(e) => setDelivery({...delivery, state: e.target.value})}>{NIGERIAN_STATES.map(s => <option key={s}>{s}</option>)}</select></div>
              </div>
              <div><label style={{ fontSize: '0.75rem', color: '#CAC6BE', display: 'block', marginBottom: '0.25rem' }}>Special Instructions / Delivery Notes</label><textarea className="input-dark" rows={3} value={delivery.notes} onChange={(e) => setDelivery({...delivery, notes: e.target.value})} /></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <button onClick={() => setStep(2)} className="btn-ghost">← Back</button>
              <button onClick={submit} disabled={loading} className="btn-amber">{loading ? 'Submitting...' : 'Submit Quote Request ✓'}</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: '1rem' }}>Quote Request Received</h2>
            <p style={{ color: '#CAC6BE', marginBottom: '2rem', lineHeight: 1.6, maxWidth: '28rem', margin: '0 auto 2rem' }}>
              Thank you, {contact.name}. We have received your request and will prepare an official invoice including delivery logistics.<br/><br/>
              Our sales team will contact you at <strong>{contact.email}</strong> within 24 hours.
            </p>
            <button onClick={() => router.push('/')} className="btn-amber">Return Home</button>
          </div>
        )}
      </div>
    </div>
  );
}
