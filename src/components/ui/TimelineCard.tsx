'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

interface TimelineCardProps {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  projects: {
    name: string;
    tech: string[];
    role: string;
    bullets: string[];
  }[];
  index: number;
  viewProjectsLabel: string;
}

export default function TimelineCard({
  company, role, period, location, type, summary, projects, index, viewProjectsLabel,
}: TimelineCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className="relative flex items-start gap-6 md:gap-10 group"
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline Dot */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0">
        <div className="w-4 h-4 rounded-full border-2 border-[var(--accent-indigo)] bg-[var(--bg-primary)] group-hover:bg-[var(--accent-indigo)] transition-colors z-10 shadow-md shadow-indigo-500/20" />
        <div className="w-px flex-1 bg-gradient-to-b from-[var(--accent-indigo)]/50 to-transparent min-h-[40px]" />
      </div>

      {/* Card Content */}
      <div className="flex-1 glass-card rounded-2xl p-6 group-hover:border-indigo-500/30">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{company}</h3>
            <p className="text-sm font-medium text-[var(--accent-indigo)]">{role}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold rounded-full border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/5 text-[var(--accent-cyan)]">
            {type}
          </span>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-xs text-[var(--text-muted)] mb-4">
          <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{period}</span>
          <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{location}</span>
        </div>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{summary}</p>

        {/* Projects Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-indigo)] hover:underline cursor-pointer"
        >
          <Briefcase className="w-3.5 h-3.5" />
          {viewProjectsLabel} ({projects.length})
          <span className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>▾</span>
        </button>

        {/* Expandable Projects */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4 border-t border-[var(--border-glass)] pt-4"
          >
            {projects.map((proj, pi) => (
              <div key={pi} className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-sm text-[var(--text-primary)]">{proj.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--border-glass)] text-[var(--text-muted)]">{proj.role}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--accent-indigo)]/10 text-[var(--accent-indigo)] font-medium">{t}</span>
                  ))}
                </div>
                <ul className="space-y-1 pl-4">
                  {proj.bullets.map((b, bi) => (
                    <li key={bi} className="text-xs text-[var(--text-secondary)] leading-relaxed list-disc">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
