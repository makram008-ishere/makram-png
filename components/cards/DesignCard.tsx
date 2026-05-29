'use client';

import { motion } from 'framer-motion';

interface DesignCardProps {
  title: string;
  image_url?: string | null;
  description: string;
  tags: string[];
}

export function DesignCard({ title, image_url, description, tags }: DesignCardProps) {
  return (
    <motion.article whileHover={{ scale: 1.01 }} className="overflow-hidden rounded-3xl border border-border bg-panel shadow-glow">
      <div className="h-72 overflow-hidden bg-zinc-950">
        <img
          src={image_url ?? 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm leading-6 text-muted">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
