'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Building2, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '@/data/types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  labels: {
    roleLabel: string;
    companyLabel: string;
    teamSizeLabel: string;
    techStackLabel: string;
    feTitle: string;
    beTitle: string;
    highlightsTitle: string;
    closeModal: string;
  };
}

export default function ProjectModal({ project, onClose, labels }: ProjectModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl glass-panel border border-[var(--border-glass)] shadow-2xl p-6 md:p-8 z-10"
            style={{ background: 'var(--bg-primary)' }}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl border border-[var(--border-glass)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-red-500/30 hover:bg-red-500/5 transition-all cursor-pointer"
              aria-label={labels.closeModal}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Title & Badge */}
            <div className="mb-5 pr-10">
              {project.badge && (
                <span className="inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/5 text-[var(--accent-cyan)] mb-2">
                  {project.badge}
                </span>
              )}
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">{project.title}</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">{project.description}</p>
            </div>

            {/* Meta Row */}
            <div className="flex flex-wrap gap-4 text-xs text-[var(--text-muted)] mb-6 pb-5 border-b border-[var(--border-glass)]">
              <span className="inline-flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" />{labels.companyLabel}: <strong className="text-[var(--text-primary)]">{project.company}</strong></span>
              <span>{labels.roleLabel}: <strong className="text-[var(--text-primary)]">{project.role}</strong></span>
              <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" />{labels.teamSizeLabel}: {project.teamSize}</span>
              {project.period && <span>{project.period}</span>}
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">{labels.techStackLabel}</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span key={tech} className="text-[11px] px-2.5 py-1 rounded-lg bg-[var(--accent-indigo)]/10 text-[var(--accent-indigo)] font-medium border border-[var(--accent-indigo)]/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* FE Responsibilities */}
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-cyan)] mb-3">{labels.feTitle}</h4>
              <ul className="space-y-2">
                {project.feResponsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* BE Responsibilities (optional) */}
            {project.beResponsibilities && project.beResponsibilities.length > 0 && (
              <div className="mb-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-indigo)] mb-3">{labels.beTitle}</h4>
                <ul className="space-y-2">
                  {project.beResponsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent-indigo)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Highlights */}
            <div className="pt-4 border-t border-[var(--border-glass)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-3">{labels.highlightsTitle}</h4>
              <ul className="space-y-2">
                {project.keyHighlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
