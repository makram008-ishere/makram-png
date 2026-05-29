'use client';

import { useEffect, useState } from 'react';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { getBrowserSupabase } from '@/lib/browserSupabase';

interface PostRecord {
  id: string;
  title: string;
  content: string;
  tags: string[];
  cover_image: string | null;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [supabase, setSupabase] = useState<ReturnType<typeof getBrowserSupabase> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSupabase(getBrowserSupabase());
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const loadPosts = async () => {
      const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      setPosts(data ?? []);
    };
    loadPosts();
  }, [supabase]);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true);
    await supabase.from('posts').insert({
      title,
      content,
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      cover_image: coverImage || null,
    });
    setTitle('');
    setContent('');
    setTags('');
    setCoverImage('');
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    await supabase.from('posts').delete().eq('id', id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  if (!supabase) {
    return (
      <AdminGuard>
        <div className="mx-auto max-w-2xl px-6 py-28 text-white">Loading posts manager…</div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="space-y-8 rounded-[2rem] border border-border bg-panel p-10 shadow-glow">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Posts manager</p>
          <h1 className="text-4xl font-semibold text-white">Create, edit, and remove blog posts.</h1>
          <p className="max-w-2xl text-base leading-7 text-muted">
            Use markdown in the content field and provide a cover image URL for polished blog entries.
          </p>
        </div>

        <form onSubmit={handleCreate} className="grid gap-6 rounded-3xl border border-border bg-surface p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="block text-sm text-muted">
              <span className="text-white">Title</span>
              <input value={title} onChange={(event) => setTitle(event.target.value)} className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none focus:border-accent" placeholder="Post title" required />
            </label>
            <label className="block text-sm text-muted">
              <span className="text-white">Cover image URL</span>
              <input value={coverImage} onChange={(event) => setCoverImage(event.target.value)} className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none focus:border-accent" placeholder="https://..." />
            </label>
          </div>
          <label className="block text-sm text-muted">
            <span className="text-white">Tags (comma-separated)</span>
            <input value={tags} onChange={(event) => setTags(event.target.value)} className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none focus:border-accent" placeholder="dev, design, notes" />
          </label>
          <label className="block text-sm text-muted">
            <span className="text-white">Markdown content</span>
            <textarea value={content} onChange={(event) => setContent(event.target.value)} rows={8} className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none focus:border-accent" placeholder="Write your post in markdown..." required />
          </label>
          <button disabled={loading} className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-black transition hover:bg-[#585fff]">
            {loading ? 'Publishing…' : 'Publish post'}
          </button>
        </form>

        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="rounded-3xl border border-border bg-surface p-6 text-muted">No posts created yet.</div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{post.title}</p>
                  <p className="mt-2 text-sm text-muted">{post.tags?.join(', ')}</p>
                </div>
                <button onClick={() => handleDelete(post.id)} className="rounded-full border border-red-500 px-5 py-2 text-sm text-red-400 transition hover:bg-red-500/10">
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
