import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getServerSupabase } from '@/lib/serverSupabase';

async function getPosts() {
  const supabase = getServerSupabase();
  if (!supabase) {
    return [];
  }

  const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
      <SectionHeader title="Blog" description="Thoughts on design, code, and growth." />
      <p className="mt-5 max-w-2xl text-base text-muted">
        Read dev logs, design breakdowns, and project case studies from the portfolio journey.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.length === 0 ? (
          <div className="rounded-3xl border border-border bg-panel p-10 text-muted">No posts have been published yet.</div>
        ) : (
          posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group overflow-hidden rounded-3xl border border-border bg-panel p-6 transition hover:border-accent/50 hover:bg-surface">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.24em] text-accent">Article</p>
                <h3 className="text-2xl font-semibold text-white">{post.title}</h3>
                <p className="text-sm leading-7 text-muted">{post.content.slice(0, 160)}...</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag: string) => (
                    <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
