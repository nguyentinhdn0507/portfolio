'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectModal from '@/components/ui/ProjectModal';
import { ProjectItem } from '@/data/types';

const FILTERS = ['all', 'ecommerce', 'enterprise', 'pwa', 'fullstack'] as const;

export default function ProjectsSection() {
  const { t } = useLanguage();
  const p = t.projects;
  const projects = t.data.projects;

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filterLabels: Record<string, string> = {
    all: p.allFilter,
    ecommerce: p.ecommerceFilter,
    enterprise: p.enterpriseFilter,
    pwa: p.pwaFilter,
    fullstack: p.fullstackFilter,
  };

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((proj) => proj.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 cursor-pointer ${
                activeFilter === f
                  ? 'border-[var(--accent-indigo)] bg-[var(--accent-indigo)]/10 text-[var(--accent-indigo)] shadow-sm shadow-indigo-500/10'
                  : 'border-[var(--border-glass)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent-indigo)]/30'
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={setSelectedProject}
              roleLabel={p.roleLabel}
              companyLabel={p.companyLabel}
              teamSizeLabel={p.teamSizeLabel}
              viewDetailsLabel={p.viewDetails}
              index={i}
            />
          ))}
        </div>

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          labels={{
            roleLabel: p.roleLabel,
            companyLabel: p.companyLabel,
            teamSizeLabel: p.teamSizeLabel,
            techStackLabel: p.techStackLabel,
            feTitle: p.feTitle,
            beTitle: p.beTitle,
            highlightsTitle: p.highlightsTitle,
            closeModal: p.closeModal,
          }}
        />
      </div>
    </section>
  );
}
