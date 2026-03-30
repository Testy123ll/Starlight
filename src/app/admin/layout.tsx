'use client';

import { useEffect } from 'react';
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

  return (
    <div className="min-h-screen bg-steel-darkest flex">
      {/* Sidebar */}
      <aside className="w-56 bg-steel-dark border-r border-steel-highest/30 flex flex-col">
        <div className="p-5 border-b border-steel-highest/30">
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-base font-black text-white">STARLIGHT</span>
            <span className="text-[10px] text-amber font-semibold tracking-[0.2em]">DE PRINCE</span>
          </Link>
          <span className="inline-block mt-2 text-xs text-amber bg-amber/10 px-2 py-0.5 rounded border border-amber/20 font-semibold">Admin Panel</span>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1">
          {adminLinks.map((l) => {
            const isActive = l.href === '/admin' ? pathname === '/admin' : pathname.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href}
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
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
