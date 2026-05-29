'use client';

import { useEffect, useState } from 'react';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { getBrowserSupabase } from '@/lib/browserSupabase';

interface DesignRecord {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image_url: string | null;
}

export default function AdminDesignsPage() {
  const [designs, setDesigns] = useState<DesignRecord[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [supabase, setSupabase] = useState<ReturnType<typeof getBrowserSupabase> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSupabase(getBrowserSupabase());
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const loadDesigns = async () => {
      const { data } = await supabase.from('designs').select('*').order('created_at', { ascending: false });
      setDesigns(data ?? []);
    };
    loadDesigns();
  }, [supabase]);

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setStatus('Saving design...');

    let uploadedUrl = imageUrl;

    if (uploadFile) {
      const filePath = `designs/${Date.now()}-${uploadFile.name}`;
      const { error: uploadError } = await supabase.storage.from('designs').upload(filePath, uploadFile, {
        cacheControl: '3600',
        upsert: false,
      });
      if (uploadError) {
        setStatus(`Upload failed: ${uploadError.message}`);
        return;
      }
      const { data } = supabase.storage.from('designs').getPublicUrl(filePath);
      uploadedUrl = data.publicUrl;
    }

    await supabase.from('designs').insert({
      title,
      description,
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      image_url: uploadedUrl || null,
    });

    setTitle('');
    setDescription('');
    setTags('');
    setImageUrl('');
    setUploadFile(null);
    setStatus('Design published successfully. Refresh to see the latest list.');
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    await supabase.from('designs').delete().eq('id', id);
    setDesigns(designs.filter((design) => design.id !== id));
  };

  if (!supabase) {
    return (
      <AdminGuard>
        <div className="mx-auto max-w-2xl px-6 py-28 text-white">Loading designs manager…</div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="space-y-8 rounded-[2rem] border border-border bg-panel p-10 shadow-glow">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Design uploads</p>
          <h1 className="text-4xl font-semibold text-white">Add graphic work and portfolio assets.</h1>
          <p className="max-w-2xl text-base leading-7 text-muted">
            Upload a file or paste a public image URL, then describe the design for the gallery.
          </p>
        </div>

        <form onSubmit={handleUpload} className="grid gap-6 rounded-3xl border border-border bg-surface p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="block text-sm text-muted">
              <span className="text-white">Title</span>
              <input value={title} onChange={(event) => setTitle(event.target.value)} className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none focus:border-accent" required />
            </label>
            <label className="block text-sm text-muted">
              <span className="text-white">Tags</span>
              <input value={tags} onChange={(event) => setTags(event.target.value)} className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none focus:border-accent" placeholder="branding, ui" />
            </label>
          </div>
          <label className="block text-sm text-muted">
            <span className="text-white">Description</span>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={4} className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none focus:border-accent" required />
          </label>
          <label className="block text-sm text-muted">
            <span className="text-white">Image URL</span>
            <input value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none focus:border-accent" placeholder="https://" />
          </label>
          <label className="block text-sm text-muted">
            <span className="text-white">Upload file</span>
            <input type="file" accept="image/*" onChange={(event) => setUploadFile(event.target.files?.[0] ?? null)} className="mt-3 w-full rounded-3xl border border-border bg-surface px-4 py-3 text-white outline-none focus:border-accent" />
          </label>
          <button className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-black transition hover:bg-[#585fff]">
            Publish design
          </button>
          {status ? <p className="text-sm text-muted">{status}</p> : null}
        </form>

        <div className="space-y-4">
          {designs.length === 0 ? (
            <div className="rounded-3xl border border-border bg-surface p-6 text-muted">No designs uploaded yet.</div>
          ) : (
            designs.map((design) => (
              <div key={design.id} className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{design.title}</p>
                  <p className="mt-2 text-sm text-muted">{design.tags?.join(', ')}</p>
                </div>
                <button onClick={() => handleDelete(design.id)} className="rounded-full border border-red-500 px-5 py-2 text-sm text-red-400 transition hover:bg-red-500/10">
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
