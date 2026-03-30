'use client';

import { useEffect, useState } from 'react';
import { getQuotes, updateQuoteStatus } from '@/lib/firestore';
import { Quote } from '@/lib/types';

function StatusBadge({ status }: { status: Quote['status'] }) {
  const map = { pending: 'text-amber bg-amber/10 border-amber/30', reviewed: 'text-blue-400 bg-blue-900/20 border-blue-400/30', approved: 'stock-in', rejected: 'stock-out' };
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${map[status]}`}>{status}</span>;
}

function fmt(n: number) { return `₦${n.toLocaleString('en-NG')}`; }

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Quote | null>(null);

  const load = () => { setLoading(true); getQuotes().then(setQuotes).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const handleStatus = async (quoteId: string, status: Quote['status']) => {
    await updateQuoteStatus(quoteId, status);
    load();
    setSelected(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-black text-white mb-6">Quote Requests</h1>

      {loading ? (
        <div className="space-y-2">{[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-steel-surface rounded animate-pulse" />)}</div>
      ) : (
        <div className="overflow-x-auto rounded border border-steel-highest/30">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>State</th>
                <th>Items</th>
                <th>Est. Total</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id} className="cursor-pointer" onClick={() => setSelected(q)}>
                  <td className="font-mono text-xs text-muted-gold">{(q.id ?? '').slice(0, 8).toUpperCase()}</td>
                  <td className="font-medium text-white">{q.contactInfo.name}</td>
                  <td className="text-muted-gold text-xs">{q.contactInfo.state}</td>
                  <td><span className="spec-badge">{q.items.length} items</span></td>
                  <td className="font-bold text-amber">{fmt(q.total)}</td>
                  <td className="text-muted-gold text-xs">{q.createdAt?.toLocaleDateString('en-NG') ?? '—'}</td>
                  <td><StatusBadge status={q.status} /></td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1">
                      {q.status === 'pending' && <>
                        <button onClick={() => handleStatus(q.id!, 'approved')} className="text-xs text-success-green hover:underline">Approve</button>
                        <span className="text-muted-gold">·</span>
                        <button onClick={() => handleStatus(q.id!, 'rejected')} className="text-xs text-rust hover:underline">Reject</button>
                      </>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-steel-surface rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-5">
              <div>
                <h2 className="text-xl font-black text-white">Quote #{(selected.id ?? '').slice(0, 8).toUpperCase()}</h2>
                <StatusBadge status={selected.status} />
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-gold hover:text-white">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-steel-mid rounded p-3">
                <p className="text-xs text-muted-gold mb-1">Customer</p>
                <p className="text-sm font-bold text-white">{selected.contactInfo.name}</p>
                <p className="text-xs text-muted-gold">{selected.contactInfo.email}</p>
                <p className="text-xs text-muted-gold">{selected.contactInfo.phone}</p>
              </div>
              <div className="bg-steel-mid rounded p-3">
                <p className="text-xs text-muted-gold mb-1">Delivery</p>
                <p className="text-xs text-warm-gray">{selected.deliveryInfo.address}</p>
                <p className="text-xs text-warm-gray">{selected.deliveryInfo.city}, {selected.deliveryInfo.state}</p>
              </div>
            </div>

            <div className="bg-steel-mid rounded p-3 mb-4">
              <p className="text-xs text-muted-gold mb-3">Items</p>
              {selected.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm border-b border-steel-highest/40 py-2">
                  <div>
                    <p className="text-white font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-gold">{item.sku} · {item.specs}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber font-bold">{fmt(item.unitPrice * item.qty)}</p>
                    <p className="text-xs text-muted-gold">x{item.qty}</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-sm font-bold text-white pt-3">
                <span>Total</span>
                <span className="text-amber">{fmt(selected.total)}</span>
              </div>
            </div>

            {selected.status === 'pending' && (
              <div className="flex gap-3">
                <button onClick={() => handleStatus(selected.id!, 'approved')} className="btn-amber flex-1 text-sm py-2 justify-center">✓ Approve</button>
                <button onClick={() => handleStatus(selected.id!, 'rejected')} className="flex-1 py-2 text-sm font-semibold border border-rust text-rust hover:bg-rust hover:text-white rounded transition-colors">✕ Reject</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
