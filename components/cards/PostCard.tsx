'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface PostCardProps {
  id: string;
  title: string;
  cover_image?: string | null;
  tags: string[];
  excerpt: string;
}

export function PostCard({ id, title, cover_image, tags, excerpt }: PostCardProps) {
  return (
    <motion.article whileHover={{ y: -5 }} className="overflow-hidden rounded-3xl border border-border bg-panel shadow-glow">
      <div className="h-52 overflow-hidden bg-zinc-950">
        <img
          src={cover_image ?? 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80'}
          alt={title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-accent">Blog post</p>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm leading-6 text-muted">{excerpt}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/blog/${id}`} className="text-sm font-semibold text-accent transition hover:text-white">
          Read article →
        </Link>
      </div>
    </motion.article>
  );
}
