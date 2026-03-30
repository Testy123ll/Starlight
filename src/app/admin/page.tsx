'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/stores';
import { getProducts, getQuotes } from '@/lib/firestore';
import { getStockStatus } from '@/lib/types';

interface KPI {
  label: string;
  value: string | number;
  sub: string;
  icon: string;
  color: string;
  href: string;
}

export default function AdminDashboardPage() {
  const { user } = useAuthStore();
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loadingKpis, setLoadingKpis] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [products, quotes] = await Promise.all([
          getProducts({ pageLimit: 200 }),
          getQuotes(),
        ]);

        const totalProducts = products.length;
        const lowStock = products.filter(p => getStockStatus(p) === 'low-stock').length;
        const outOfStock = products.filter(p => getStockStatus(p) === 'out-of-stock').length;
        const pendingQuotes = quotes.filter(q => q.status === 'pending').length;
        const totalQuoteValue = quotes
          .filter(q => q.status === 'approved')
          .reduce((sum, q) => sum + (q.total ?? 0), 0);

        setKpis([
          {
            label: 'Total Products',
            value: totalProducts,
            sub: `${products.filter(p => p.status === 'active').length} active listings`,
            icon: '📦',
            color: 'border-amber/30 hover:border-amber/60',
            href: '/admin/inventory',
          },
          {
            label: 'Pending Quotes',
            value: pendingQuotes,
            sub: `${quotes.length} total submissions`,
            icon: '📋',
            color: pendingQuotes > 0 ? 'border-amber/50 hover:border-amber/80' : 'border-steel-highest/30 hover:border-steel-highest/60',
            href: '/admin/quotes',
          },
          {
            label: 'Low / Out of Stock',
            value: `${lowStock} / ${outOfStock}`,
            sub: 'items need attention',
            icon: lowStock + outOfStock > 0 ? '⚠️' : '✅',
            color: lowStock + outOfStock > 0 ? 'border-rust/40 hover:border-rust/70' : 'border-success-green/30 hover:border-success-green/50',
            href: '/admin/inventory',
          },
          {
            label: 'Approved Quote Value',
            value: `₦${totalQuoteValue.toLocaleString('en-NG')}`,
            sub: `${quotes.filter(q => q.status === 'approved').length} approved orders`,
            icon: '💰',
            color: 'border-steel-blue/40 hover:border-steel-blue/70',
            href: '/admin/quotes',
          },
        ]);
      } catch {
        // silently fail — KPIs are non-critical
      } finally {
        setLoadingKpis(false);
      }
    }
    fetchStats();
  }, []);

  const tiles = [
    { label: 'Inventory', desc: 'Manage stock levels and product listings', href: '/admin/inventory', icon: '📦' },
    { label: 'Quote Requests', desc: 'Review and approve bulk quote submissions', href: '/admin/quotes', icon: '📋' },
    { label: 'Add Product', desc: 'Create a new product listing', href: '/admin/products/new', icon: '➕' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
        <p className="text-muted-gold mt-1">Welcome back, <span className="text-amber">{user?.email}</span></p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {loadingKpis
          ? [...Array(4)].map((_, i) => (
              <div key={i} className="card-dark rounded-xl p-5 animate-pulse">
                <div className="h-4 w-24 bg-steel-surface rounded mb-3" />
                <div className="h-8 w-16 bg-steel-surface rounded mb-2" />
                <div className="h-3 w-32 bg-steel-surface rounded" />
              </div>
            ))
          : kpis.map((k) => (
              <Link key={k.label} href={k.href}
                className={`card-dark rounded-xl p-5 border transition-all hover:shadow-ambient group ${k.color}`}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold text-muted-gold uppercase tracking-wider">{k.label}</span>
                  <span className="text-2xl">{k.icon}</span>
                </div>
                <p className="text-3xl font-black text-white mb-1 group-hover:text-amber transition-colors">{k.value}</p>
                <p className="text-xs text-muted-gold/70">{k.sub}</p>
              </Link>
            ))
        }
      </div>

      {/* Quick Action Tiles */}
      <h2 className="text-sm font-bold text-muted-gold uppercase tracking-wider mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {tiles.map((t) => (
          <Link key={t.label} href={t.href}
            className="card group border border-steel-highest/30 hover:border-amber/30 hover:shadow-ambient flex flex-col gap-3 transition-all">
            <span className="text-3xl">{t.icon}</span>
            <div>
              <h2 className="text-lg font-bold text-white group-hover:text-amber transition-colors">{t.label}</h2>
              <p className="text-sm text-muted-gold mt-1">{t.desc}</p>
            </div>
            <span className="text-amber text-sm font-semibold mt-auto group-hover:translate-x-1 transition-transform">Go →</span>
          </Link>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="card-dark rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-3">Quick Tips</h3>
        <ul className="space-y-1.5 text-xs text-muted-gold list-disc list-inside">
          <li>Double-click any cell in the Inventory table to edit inline</li>
          <li>Upload product images directly from the Inventory page</li>
          <li>Quote status updates notify the customer automatically</li>
          <li>Low-stock items are flagged in amber in the inventory view</li>
        </ul>
      </div>
    </div>
  );
}
