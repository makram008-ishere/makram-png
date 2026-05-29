import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getServerSupabase } from '@/lib/serverSupabase';

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const supabase = getServerSupabase();
  if (!supabase) {
    notFound();
  }

  const { data } = await supabase.from('posts').select('*').eq('id', params.id).single();

  if (!data) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 lg:py-16">
      <article className="rounded-[2rem] border border-border bg-panel p-10 shadow-glow">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Blog post</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">{data.title}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {data.tags?.map((tag: string) => (
            <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
        <div className="markdown-body mt-10 space-y-6 text-muted">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
