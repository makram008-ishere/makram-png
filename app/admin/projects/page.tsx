'use client';

import { useEffect, useState } from 'react';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { getBrowserSupabase } from '@/lib/browserSupabase';

interface ProjectRecord {
  id: string;
  title: string;
  description: string;
  github_link: string | null;
  live_link: string | null;
  tags: string[];
  image_url: string | null;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [supabase, setSupabase] = useState<ReturnType<typeof getBrowserSupabase> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSupabase(getBrowserSupabase());
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const loadProjects = async () => {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      setProjects(data ?? []);
    };
    loadProjects();
  }, [supabase]);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true);
    await supabase.from('projects').insert({
      title,
      description,
      github_link: githubLink || null,
      live_link: liveLink || null,
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      image_url: imageUrl || null,
    });
    setTitle('');
    setDescription('');
    setGithubLink('');
    setLiveLink('');
    setTags('');
    setImageUrl('');
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    setProjects(data ?? []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    await supabase.from('projects').delete().eq('id', id);
    setProjects(projects.filter((project) => project.id !== id));
  };

  if (!supabase) {
    return (
      <AdminGuard>
        <div className="mx-auto max-w-2xl px-6 py-28 text-white">Loading projects manager…</div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="space-y-8 rounded-[2rem] border border-border bg-panel p-10 shadow-glow">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Projects manager</p>
          <h1 className="text-4xl font-semibold text-white">Manage portfolio projects.</h1>
          <p className="max-w-2xl text-base leading-7 text-muted">
            Add development and product showcase items with live links, GitHub references, and visual assets.
          </p>
        </div>

        <form onSubmit={handleCreate} className="grid gap-6 rounded-3xl border border-border bg-surface p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="block text-sm text-muted">
              <span className="text-white">Title</span>
              <input value={title} onChange={(event) => setTitle(event.target.value)} className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none focus:border-accent" required />
            </label>
            <label className="block text-sm text-muted">
              <span className="text-white">Tags</span>
              <input value={tags} onChange={(event) => setTags(event.target.value)} className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none focus:border-accent" placeholder="web, branding" />
            </label>
          </div>
          <label className="block text-sm text-muted">
            <span className="text-white">Description</span>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={4} className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none focus:border-accent" required />
          </label>
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="block text-sm text-muted">
              <span className="text-white">Live URL</span>
              <input value={liveLink} onChange={(event) => setLiveLink(event.target.value)} className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none focus:border-accent" placeholder="https://" />
            </label>
            <label className="block text-sm text-muted">
              <span className="text-white">GitHub URL</span>
              <input value={githubLink} onChange={(event) => setGithubLink(event.target.value)} className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none focus:border-accent" placeholder="https://github.com/" />
            </label>
          </div>
          <label className="block text-sm text-muted">
            <span className="text-white">Image URL</span>
            <input value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none focus:border-accent" placeholder="https://" />
          </label>
          <button disabled={loading} className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-black transition hover:bg-[#585fff]">
            {loading ? 'Saving…' : 'Add project'}
          </button>
        </form>

        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="rounded-3xl border border-border bg-surface p-6 text-muted">No projects available yet.</div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{project.title}</p>
                  <p className="mt-2 text-sm text-muted">{project.tags?.join(', ')}</p>
                </div>
                <button onClick={() => handleDelete(project.id)} className="rounded-full border border-red-500 px-5 py-2 text-sm text-red-400 transition hover:bg-red-500/10">
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
