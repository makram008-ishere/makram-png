'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserSupabase, hasBrowserSupabaseConfig } from '@/lib/browserSupabase';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [supabase, setSupabase] = useState<ReturnType<typeof getBrowserSupabase> | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSupabase(getBrowserSupabase());
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace('/admin/login');
        return;
      }
      setAuthorized(true);
    };
    checkSession();
  }, [router, supabase]);

  if (!hasBrowserSupabaseConfig()) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-28 text-white">
        <p className="text-xl font-semibold">Supabase configuration is missing.</p>
        <p className="mt-3 text-sm text-muted">Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment.</p>
      </div>
    );
  }

  if (!supabase) {
    return <div className="mx-auto max-w-2xl px-6 py-28 text-white">Connecting to Supabase…</div>;
  }

  if (!authorized) {
    return <div className="mx-auto max-w-2xl px-6 py-28 text-white">Checking admin session…</div>;
  }

  return <>{children}</>;
}
