'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/stores';
import Link from 'next/link';

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/inventory', label: 'Inventory', icon: '📦' },
  { href: '/admin/quotes', label: 'Quotes', icon: '📋' },
  { href: '/admin/products/new', label: 'Add Product', icon: '➕' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/login?redirect=/admin');
    }
  }, [user, isAdmin, loading, router]);

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen bg-steel-darkest flex items-center justify-center">
        <div className="text-muted-gold animate-pulse">Verifying access...</div>
      </div>
    );
  }

  const SidebarContent = () => (
    <>
      <div className="p-5 border-b border-steel-highest/30 flex justify-between items-center">
        <div>
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-base font-black text-white">STARLIGHT</span>
            <span className="text-[10px] text-amber font-semibold tracking-[0.2em]">DE PRINCE</span>
          </Link>
          <span className="inline-block mt-2 text-xs text-amber bg-amber/10 px-2 py-0.5 rounded border border-amber/20 font-semibold">Admin Panel</span>
        </div>
        {/* Mobile close button */}
        <button className="md:hidden text-muted-gold" onClick={() => setMobileMenuOpen(false)}>✕</button>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1">
        {adminLinks.map((l) => {
          const isActive = l.href === '/admin' ? pathname === '/admin' : pathname.startsWith(l.href);
          return (
            <Link key={l.href} href={l.href} onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded transition-colors ${
                isActive
                  ? 'bg-amber/15 text-amber border border-amber/20 font-semibold'
                  : 'text-warm-gray/70 hover:bg-steel-surface hover:text-amber'
              }`}>
              <span>{l.icon}</span>
              <span>{l.label}</span>
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-steel-highest/30">
        <p className="text-xs text-muted-gold/60 px-3 pb-1 truncate">{user?.email}</p>
        <Link href="/" className="flex items-center gap-3 px-3 py-2 text-xs text-muted-gold hover:text-rust">
          ← Back to site
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-steel-darkest flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-steel-highest/30 bg-steel-dark">
        <span className="text-sm font-bold text-amber bg-amber/10 px-2 py-1 rounded">Admin</span>
        <button onClick={() => setMobileMenuOpen(true)} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="w-56 bg-steel-dark border-r border-steel-highest/30 hidden md:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
          <aside className="w-64 bg-steel-dark border-r border-steel-highest/30 flex flex-col relative z-50">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
