'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useQuoteStore } from '@/store/quoteStore';
import { useAuthStore } from '@/store/stores';
import { logout } from '@/lib/auth';
import QuoteDrawer from '@/components/ui/QuoteDrawer';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/catalog', label: 'Catalog' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/quote', label: 'Get Quote' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useQuoteStore((s) => s.items);
  const { user, isAdmin } = useAuthStore();

  return (
    <>
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(47,74,112,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(53,53,53,0.3)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>STARLIGHT</span>
            <span style={{ fontSize: '0.625rem', color: '#D97706', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>de Prince</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'rgba(229,226,225,0.8)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D97706')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(229,226,225,0.8)')}>
                {l.label}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button onClick={() => setDrawerOpen(true)} style={{ position: 'relative', padding: '0.5rem', background: 'none', border: 'none', color: 'rgba(229,226,225,0.7)', cursor: 'pointer' }}>
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {items.length > 0 && (
                <span style={{ position: 'absolute', top: '-0.25rem', right: '-0.25rem', background: '#D97706', color: '#131313', fontSize: '0.625rem', fontWeight: 900, borderRadius: '50%', width: '1rem', height: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {items.length}
                </span>
              )}
            </button>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {isAdmin && <Link href="/admin" style={{ fontSize: '0.75rem', color: '#D97706', fontWeight: 600, textDecoration: 'none' }}>Admin</Link>}
                <button onClick={() => logout()} className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>Logout</button>
              </div>
            ) : (
              <Link href="/login" className="btn-amber" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>Get a Quote</Link>
            )}
          </div>
        </div>
      </nav>
      <QuoteDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
