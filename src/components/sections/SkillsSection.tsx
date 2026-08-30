'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Wrench, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import SectionHeading from '@/components/ui/SectionHeading';
import SkillBadge from '@/components/ui/SkillBadge';

const categoryIcons: Record<string, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  'testing-tools': Wrench,
};

export default function SkillsSection() {
  const { t } = useLanguage();
  const s = t.skills;
  const skillCategories = t.data.skills;

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

        <div className="space-y-8">
          {skillCategories.map((cat, ci) => {
            const Icon = categoryIcons[cat.id] || Code2;
            return (
              <motion.div
                key={cat.id}
                className="glass-card rounded-2xl p-6 md:p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-indigo)]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[var(--accent-indigo)]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">{cat.name}</h3>
                    <p className="text-xs text-[var(--text-muted)]">{cat.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) => (
                    <SkillBadge
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      highlight={skill.highlight}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
