'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SectionHeading from '@/components/ui/SectionHeading';
import TimelineCard from '@/components/ui/TimelineCard';

export default function ExperienceSection() {
  const { t } = useLanguage();
  const e = t.experience;
  const experiences = t.data.experiences;

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow={e.eyebrow} title={e.title} subtitle={e.subtitle} />

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <TimelineCard
              key={exp.id}
              company={exp.company}
              role={exp.role}
              period={exp.period}
              location={exp.location}
              type={exp.type}
              summary={exp.summary}
              projects={exp.projects}
              index={i}
              viewProjectsLabel={e.viewProjects}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
