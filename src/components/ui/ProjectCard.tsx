'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, ChevronRight } from 'lucide-react';
import { ProjectItem } from '@/data/types';

interface ProjectCardProps {
  project: ProjectItem;
  onViewDetails: (project: ProjectItem) => void;
  roleLabel: string;
  companyLabel: string;
  teamSizeLabel: string;
  viewDetailsLabel: string;
  index: number;
}

const categoryColors: Record<string, string> = {
  ecommerce: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
  enterprise: 'border-blue-500/30 bg-blue-500/10 text-blue-500',
  pwa: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
  fullstack: 'border-violet-500/30 bg-violet-500/10 text-violet-500',
};

export default function ProjectCard({
  project, onViewDetails, roleLabel, companyLabel, teamSizeLabel, viewDetailsLabel, index,
}: ProjectCardProps) {
  return (
    <motion.div
      className="glass-card rounded-2xl p-6 flex flex-col h-full group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => onViewDetails(project)}
    >
      {/* Badge & Period */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        {project.badge && (
          <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${categoryColors[project.category] || 'border-gray-500/30 bg-gray-500/10 text-gray-500'}`}>
            {project.badge}
          </span>
        )}
        {project.period && (
          <span className="text-[11px] text-[var(--text-muted)] font-medium">{project.period}</span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-indigo)] transition-colors leading-tight">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1 line-clamp-3">
        {project.description}
      </p>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-3 text-[11px] text-[var(--text-muted)] mb-4">
        <span>{companyLabel}: <strong className="text-[var(--text-primary)]">{project.company}</strong></span>
        <span>{roleLabel}: <strong className="text-[var(--text-primary)]">{project.role}</strong></span>
        <span className="inline-flex items-center gap-1"><Users className="w-3 h-3" />{teamSizeLabel}: {project.teamSize}</span>
      </div>

      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies.slice(0, 5).map((tech) => (
          <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--accent-indigo)]/10 text-[var(--accent-indigo)] font-medium border border-[var(--accent-indigo)]/20">
            {tech}
          </span>
        ))}
        {project.technologies.length > 5 && (
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--border-glass)] text-[var(--text-muted)] font-medium">
            +{project.technologies.length - 5}
          </span>
        )}
      </div>

      {/* View Details */}
      <button className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-cyan)] group-hover:gap-2 transition-all cursor-pointer">
        {viewDetailsLabel} <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
