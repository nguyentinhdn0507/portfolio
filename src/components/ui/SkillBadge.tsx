'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SkillBadgeProps {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  highlight?: boolean;
}

const levelColors: Record<string, string> = {
  Expert: 'border-emerald-500/40 bg-emerald-500/5 text-emerald-400 dark:text-emerald-300',
  Advanced: 'border-cyan-500/40 bg-cyan-500/5 text-cyan-500 dark:text-cyan-300',
  Intermediate: 'border-violet-500/40 bg-violet-500/5 text-violet-500 dark:text-violet-300',
};

const levelDots: Record<string, string> = {
  Expert: 'bg-emerald-400',
  Advanced: 'bg-cyan-400',
  Intermediate: 'bg-violet-400',
};

export default function SkillBadge({ name, level, highlight }: SkillBadgeProps) {
  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${levelColors[level]} ${highlight ? 'ring-1 ring-[var(--accent-cyan)]/20 shadow-sm shadow-[var(--accent-cyan)]/5' : ''} hover:scale-[1.04] hover:shadow-md`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${levelDots[level]}`} />
      <span className="text-[var(--text-primary)] text-[13px]">{name}</span>
      <span className="text-[10px] font-semibold tracking-wider uppercase opacity-70">{level}</span>
    </motion.div>
  );
}
