'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  id?: string;
}

export default function SectionHeading({ eyebrow, title, subtitle, id }: SectionHeadingProps) {
  return (
    <motion.div
      id={id}
      className="text-center max-w-2xl mx-auto mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="inline-block px-4 py-1.5 mb-4 text-[11px] font-bold tracking-[0.2em] uppercase rounded-full border border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/5 glow-badge">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-[var(--text-secondary)] leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}
