'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { loginWithGoogle } from '@/lib/auth';

import { Suspense } from 'react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParams = searchParams ? searchParams.get('redirect') : null;
  const redirect = redirectParams || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(redirect);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true); setError('');
    try {
      await loginWithGoogle();
      router.push(redirect);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: '#131313' }}>
      <div className="card-dark" style={{ width: '100%', maxWidth: '24rem', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>STARLIGHT</h1>
          <p style={{ fontSize: '0.75rem', color: '#D97706', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '0.25rem' }}>de Prince</p>
        </div>

        {error && <div style={{ background: 'rgba(194,65,12,0.1)', border: '1px solid #C2410C', color: '#FFB77D', padding: '0.75rem', borderRadius: '0.25rem', fontSize: '0.875rem', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: '#CAC6BE', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' }}>Email</label>
            <input type="email" required className="input-dark" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: '#CAC6BE', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input type="password" required className="input-dark" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" disabled={loading} className="btn-amber" style={{ justifyContent: 'center', padding: '0.75rem', marginTop: '0.5rem' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0', color: '#353535' }}>
          <div style={{ flex: 1, height: '1px', background: '#353535' }} />
          <span style={{ fontSize: '0.75rem', color: '#CAC6BE', margin: '0 1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#353535' }} />
        </div>

        <button onClick={handleGoogleLogin} disabled={loading} className="btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
          <svg style={{ width: '1.25rem', height: '1.25rem' }} viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#131313', color: '#D97706' }}>Loading login...</div>}>
      <LoginContent />
    </Suspense>
  );
}
