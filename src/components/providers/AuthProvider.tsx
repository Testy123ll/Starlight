'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/stores';
import { isAdminUser } from '@/lib/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setAdmin, setLoading } = useAuthStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const admin = await isAdminUser();
        setAdmin(admin);
      } else {
        setAdmin(false);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [setUser, setAdmin, setLoading]);

  return <>{children}</>;
}
