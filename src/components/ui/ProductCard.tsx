'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product, getStockStatus } from '@/lib/types';
import { useQuoteStore } from '@/store/quoteStore';

function StockBadge({ product }: { product: Product }) {
  const status = getStockStatus(product);
  if (status === 'in-stock') return <span className="stock-in">● In Stock</span>;
  if (status === 'low-stock') return <span className="stock-low">▲ Low Stock</span>;
  if (status === 'out-of-stock') return <span className="stock-out">✕ Out of Stock</span>;
  return <span className="stock-pre">◎ Pre-Order</span>;
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useQuoteStore((s) => s.addItem);
  const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`;

  const handleAddToQuote = () => {
    addItem({
      productId: product.id, name: product.name, sku: product.sku, qty: 1,
      unitPrice: product.price,
      specs: [product.gauge, product.grade, product.dimensions].filter(Boolean).join(' · '),
    });
  };

  return (
    <div style={{ background: '#20201F', borderRadius: '0.5rem', border: '1px solid rgba(53,53,53,0.2)', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s' }}>
      <div style={{ position: 'relative', height: '12rem', background: '#1C1B1B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {product.imageUrls[0] ? (
          <Image src={product.imageUrls[0]} alt={product.name} fill style={{ objectFit: 'cover', opacity: 0.8 }} />
        ) : (
          <span style={{ fontSize: '3rem', opacity: 0.3 }}>📦</span>
        )}
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
          <StockBadge product={product} />
        </div>
      </div>

      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#CAC6BE', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{product.sku}</p>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', marginTop: '0.25rem', lineHeight: 1.3 }}>{product.name}</h3>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
          {product.gauge && <span className="spec-badge">Gauge: {product.gauge}</span>}
          {product.grade && <span className="spec-badge">Grade: {product.grade}</span>}
          {product.dimensions && <span className="spec-badge">{product.dimensions}</span>}
        </div>

        <div style={{ marginTop: 'auto' }}>
          <p style={{ fontSize: '1.25rem', fontWeight: 900, color: '#D97706' }}>{fmt(product.price)}</p>
          <p style={{ fontSize: '0.75rem', color: '#CAC6BE' }}>per unit</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <button onClick={handleAddToQuote} className="btn-amber" style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem', padding: '0.5rem 0.75rem' }}>
            + Quote
          </button>
          <Link href={`/products/${product.slug}`} className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem', textDecoration: 'none' }}>
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
