'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  github_link?: string | null;
  live_link?: string | null;
  tags: string[];
  image_url?: string | null;
}

export function ProjectCard({ title, description, github_link, live_link, tags, image_url }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-3xl border border-border bg-panel shadow-glow"
    >
      <div className="h-56 overflow-hidden bg-zinc-950">
        <img
          src={image_url ?? 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80'}
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
        <div className="flex flex-wrap gap-3">
          {live_link ? (
            <Link href={live_link} target="_blank" className="text-sm text-accent transition hover:underline">
              Live
            </Link>
          ) : null}
          {github_link ? (
            <Link href={github_link} target="_blank" className="text-sm text-accent transition hover:underline">
              Code
            </Link>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
