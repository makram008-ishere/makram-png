'use client';

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-t border-border bg-surface px-6 py-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} makram-png. Crafted for modern developer and design portfolios.</p>
        <p>Built with Next.js, Supabase, Tailwind CSS, and Framer Motion.</p>
      </div>
    </motion.footer>
  );
}
