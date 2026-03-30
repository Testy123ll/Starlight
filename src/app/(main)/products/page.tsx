import { getProducts } from '@/lib/firestore';
import ProductBrowser from './ProductBrowser';

import Image from 'next/image';

export const revalidate = 60; // SSG/ISR cache revalidates every 60 seconds maximum speed
export const metadata = { title: 'Products & Catalog' };

export default async function ProductsPage() {
  // Fetch products on the server for instant page load and zero layout shift
  const products = await getProducts();
  
  return (
    <>
      <ProductBrowser initialProducts={products} />
      
      {/* Catalog Download Section */}
      <div style={{ maxWidth: '80rem', margin: '4rem auto 8rem', padding: '0 1rem', textAlign: 'center' }}>
        <h2 className="text-gradient-amber" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>2026 Material Catalog</h2>
        <p style={{ color: '#CAC6BE', marginBottom: '3rem', maxWidth: '30rem', margin: '0 auto 4rem', fontSize: '1.125rem' }}>Get our complete 2026 Material Catalog featuring all 50+ variants of premium MDF, HDF, Blockboard, and Plywood.</p>
        
        <div className="card-dark" style={{ maxWidth: '56rem', margin: '0 auto', padding: '3rem', display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', textAlign: 'left', borderRadius: '1rem' }}>
          <div style={{ position: 'relative', width: '280px', height: '380px', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <Image src="/images/catalog_wood_boards.png" alt="2026 Catalog Cover" fill sizes="(max-width: 768px) 100vw, 280px" quality={60} style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <span style={{ fontSize: '0.75rem', color: '#D97706', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Digital Download</span>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0 1.5rem' }}>Starlight Edition Vol. 4</h3>
            <ul style={{ color: '#CAC6BE', lineHeight: 2.2, marginBottom: '2.5rem', listStyle: 'none', padding: 0 }}>
              <li><span style={{ color: '#D97706', marginRight: '0.5rem' }}>✓</span> Comprehensive technical specifications</li>
              <li><span style={{ color: '#D97706', marginRight: '0.5rem' }}>✓</span> Visual grading system explained</li>
              <li><span style={{ color: '#D97706', marginRight: '0.5rem' }}>✓</span> Wholesale and bulk pricing tiers</li>
              <li><span style={{ color: '#D97706', marginRight: '0.5rem' }}>✓</span> State-by-state logistics and delivery</li>
            </ul>
            <button className="btn-amber" style={{ padding: '1rem 2.5rem', fontSize: '0.875rem' }}>Download PDF (12MB) ↓</button>
          </div>
        </div>
      </div>
    </>
  );
}
