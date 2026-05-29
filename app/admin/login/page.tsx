'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserSupabase } from '@/lib/browserSupabase';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [supabase, setSupabase] = useState<ReturnType<typeof getBrowserSupabase> | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSupabase(getBrowserSupabase());
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push('/admin/dashboard');
  };

  if (!supabase) {
    return <div className="mx-auto max-w-2xl px-6 py-28 text-white">Loading admin login…</div>;
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-28">
      <div className="rounded-[2rem] border border-border bg-panel p-10 shadow-glow">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Admin access</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Login to your admin dashboard.</h1>
        <p className="mt-4 text-base leading-7 text-muted">Use your Supabase account to manage posts, projects, and design uploads.</p>
        <form className="mt-10 space-y-6" onSubmit={handleLogin}>
          <label className="block text-sm text-muted">
            <span className="text-white">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none transition focus:border-accent"
              placeholder="admin@makram-png.dev"
            />
          </label>
          <label className="block text-sm text-muted">
            <span className="text-white">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none transition focus:border-accent"
              placeholder="Enter your password"
            />
          </label>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-black transition hover:bg-[#585fff]"
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
