'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/firestore';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ui/ProductCard';
import { useFilterStore } from '@/store/stores';

const CATEGORIES = [
  { value: '', label: 'All Products' },
  { value: 'mdf', label: 'MDF Boards' },
  { value: 'hdf', label: 'HDF Boards' },
  { value: 'blockboard', label: 'Blockboards' },
  { value: 'plywood', label: 'Premium Plywood' },
];
const GAUGES = ['', '3mm', '6mm', '9mm', '12mm', '15mm', '18mm'];
const GRADES = ['', 'Commercial', 'Standard', 'Premium', 'Marine'];

export default function ProductsPage() {
  const { category, gauge, grade, searchQuery, setFilter, resetFilters } = useFilterStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    // Only show hard loading skeleton if we don't have products yet
    if (products.length === 0) setLoading(true);
    else setIsFiltering(true);

    getProducts({ category, gauge, grade, searchQuery })
      .then(setProducts)
      .finally(() => {
        setLoading(false);
        setIsFiltering(false);
      });
  }, [category, gauge, grade, searchQuery]);

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem 1rem' }}>
      <nav style={{ fontSize: '0.75rem', color: '#CAC6BE', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
        <a href="/" style={{ color: '#CAC6BE', textDecoration: 'none' }}>Home</a>
        <span>/</span>
        <span style={{ color: '#E5E2E1' }}>Products</span>
      </nav>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Sidebar */}
        <aside style={{ width: '16rem', flexShrink: 0, display: 'none' }} className="md-sidebar">
          <div className="card-dark">
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Filters</h3>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#CAC6BE', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Category</p>
              {CATEGORIES.map((c) => (
                <button key={c.value} onClick={() => setFilter('category', c.value)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.875rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', marginBottom: '0.25rem', background: category === c.value ? 'rgba(217,119,6,0.2)' : 'transparent', color: category === c.value ? '#D97706' : 'rgba(229,226,225,0.7)', fontWeight: category === c.value ? 600 : 400 }}>
                  {c.label}
                </button>
              ))}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#CAC6BE', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Thickness</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {GAUGES.map((g) => (
                  <button key={g} onClick={() => setFilter('gauge', g)}
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', border: `1px solid ${gauge === g ? '#D97706' : '#353535'}`, background: gauge === g ? '#D97706' : 'transparent', color: gauge === g ? '#131313' : '#CAC6BE', cursor: 'pointer', fontWeight: gauge === g ? 700 : 400 }}>
                    {g || 'All'}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#CAC6BE', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Grade</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {GRADES.map((g) => (
                  <button key={g} onClick={() => setFilter('grade', g)}
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', border: `1px solid ${grade === g ? '#D97706' : '#353535'}`, background: grade === g ? '#D97706' : 'transparent', color: grade === g ? '#131313' : '#CAC6BE', cursor: 'pointer', fontWeight: grade === g ? 700 : 400 }}>
                    {g || 'All'}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={resetFilters} className="btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem', padding: '0.5rem' }}>Reset Filters</button>
          </div>
        </aside>

        {/* Main */}
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <input type="text" placeholder="Search by name, SKU, category..." value={searchQuery}
              onChange={(e) => setFilter('searchQuery', e.target.value)} className="input-dark" />
          </div>
          <p style={{ fontSize: '0.875rem', color: '#CAC6BE', marginBottom: '1.25rem' }}>
            {loading ? 'Loading...' : `${products.length} products`}
          </p>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.25rem' }}>
              {[...Array(6)].map((_, i) => <div key={i} style={{ height: '18rem', background: '#20201F', borderRadius: '0.5rem', animation: 'pulse 1.5s ease-in-out infinite' }} />)}
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <p style={{ color: '#CAC6BE', marginBottom: '1rem' }}>No products found</p>
              <button onClick={resetFilters} className="btn-amber" style={{ fontSize: '0.875rem' }}>Clear Filters</button>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
              gap: '1.25rem',
              opacity: isFiltering ? 0.6 : 1,
              transition: 'opacity 0.2s ease-in-out'
            }}>
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
