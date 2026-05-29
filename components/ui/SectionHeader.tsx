'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  description: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-3"
    >
      <p className="text-sm uppercase tracking-[0.3em] text-accent">{title}</p>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">{description}</h2>
    </motion.div>
  );
}
