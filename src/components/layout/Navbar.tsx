'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useQuoteStore } from '@/store/quoteStore';
import { useAuthStore } from '@/store/stores';
import { logout } from '@/lib/auth';
import QuoteDrawer from '@/components/ui/QuoteDrawer';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/quote', label: 'Get Quote' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const items = useQuoteStore((s) => s.items);
  const { user, isAdmin } = useAuthStore();
  const pathname = usePathname();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-steel-dark/95 backdrop-blur-md border-b border-steel-highest/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none z-50">
            <span className="text-xl font-black text-white tracking-tight">STARLIGHT</span>
            <span className="text-[10px] text-amber font-semibold tracking-[0.2em] uppercase">de Prince</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}
                className={`text-sm font-medium transition-colors hover:text-amber ${
                  pathname === l.href || pathname.startsWith(l.href + '/')
                    ? 'text-amber'
                    : 'text-warm-gray/80'
                }`}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-4 z-50">
            {/* Quote Cart Button */}
            <button onClick={() => setDrawerOpen(true)} className="relative p-2 text-warm-gray/80 hover:text-amber transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-amber text-steel-darkest text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                  {items.length}
                </span>
              )}
            </button>

            {/* Desktop Auth/Admin */}
            <div className="hidden md:flex flex-row items-center gap-2">
              {user ? (
                <>
                  {isAdmin && <Link href="/admin" className="text-xs font-semibold text-amber hover:underline px-2">Admin</Link>}
                  <button onClick={() => logout()} className="text-xs text-rust hover:text-rust/80 px-2">Logout</button>
                </>
              ) : (
                <Link href="/login" className="btn-amber text-xs px-4 py-1.5 hidden lg:block">Log In</Link>
              )}
            </div>

            {/* Mobile Nav Toggle */}
            <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-steel-darkest border-b border-steel-highest/30 shadow-ambient flex flex-col p-4 z-40">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 border-b border-steel-highest/10 text-warm-gray/80 hover:text-amber text-sm font-medium">
                {l.label}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-4 py-4 px-4 mt-2">
                {isAdmin && <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-amber bg-amber/10 px-3 py-1.5 rounded">Admin Dashboard</Link>}
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-sm font-semibold text-rust">Logout</button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="mx-4 mt-4 btn-amber text-center py-2 text-sm">Log In / Request Quote</Link>
            )}
          </div>
        )}
      </nav>

      <QuoteDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
