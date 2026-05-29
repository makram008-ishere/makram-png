'use client';

import { useEffect, useState } from 'react';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { getBrowserSupabase } from '@/lib/browserSupabase';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ posts: 0, projects: 0, designs: 0 });
  const [supabase, setSupabase] = useState<ReturnType<typeof getBrowserSupabase> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSupabase(getBrowserSupabase());
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const loadStats = async () => {
      const [posts, projects, designs] = await Promise.all([
        supabase.from('posts').select('id', { count: 'exact' }),
        supabase.from('projects').select('id', { count: 'exact' }),
        supabase.from('designs').select('id', { count: 'exact' }),
      ]);
      setStats({
        posts: posts.count ?? 0,
        projects: projects.count ?? 0,
        designs: designs.count ?? 0,
      });
    };
    loadStats();
  }, [supabase]);

  if (!supabase) {
    return (
      <AdminGuard>
        <div className="mx-auto max-w-2xl px-6 py-28 text-white">Loading dashboard…</div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="space-y-8 rounded-[2rem] border border-border bg-panel p-10 shadow-glow">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Admin dashboard</p>
          <h1 className="text-4xl font-semibold text-white">Overview</h1>
          <p className="max-w-2xl text-base leading-7 text-muted">
            Manage blog posts, projects, and design uploads from a unified admin portal.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-surface p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Posts</p>
            <p className="mt-6 text-4xl font-semibold text-white">{stats.posts}</p>
          </div>
          <div className="rounded-3xl border border-border bg-surface p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Projects</p>
            <p className="mt-6 text-4xl font-semibold text-white">{stats.projects}</p>
          </div>
          <div className="rounded-3xl border border-border bg-surface p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Designs</p>
            <p className="mt-6 text-4xl font-semibold text-white">{stats.designs}</p>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
