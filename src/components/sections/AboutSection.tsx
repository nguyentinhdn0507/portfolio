'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Rocket, Code2, Server, TestTube, Users2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import SectionHeading from '@/components/ui/SectionHeading';

const strengthIcons = [Code2, Server, TestTube, Users2];

export default function AboutSection() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow={a.eyebrow} title={a.title} subtitle={a.subtitle} />

        {/* Intro */}
        <motion.div
          className="glass-card rounded-2xl p-8 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">{a.introTitle}</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{a.introP1}</p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{a.introP2}</p>
        </motion.div>

        {/* Goals */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          <motion.div
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-cyan)]/10 flex items-center justify-center mb-3">
              <Target className="w-5 h-5 text-[var(--accent-cyan)]" />
            </div>
            <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">{a.shortTermGoalTitle}</h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{a.shortTermGoalDesc}</p>
          </motion.div>

          <motion.div
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-indigo)]/10 flex items-center justify-center mb-3">
              <Rocket className="w-5 h-5 text-[var(--accent-indigo)]" />
            </div>
            <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">{a.longTermGoalTitle}</h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{a.longTermGoalDesc}</p>
          </motion.div>
        </div>

        {/* Core Strengths */}
        <motion.h3
          className="text-lg font-bold text-[var(--text-primary)] text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {a.coreStrengthsTitle}
        </motion.h3>

        <div className="grid sm:grid-cols-2 gap-5">
          {a.strengths.map((s, i) => {
            const Icon = strengthIcons[i] || Code2;
            return (
              <motion.div
                key={i}
                className="glass-card rounded-2xl p-6 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="w-9 h-9 rounded-lg bg-[var(--accent-indigo)]/10 flex items-center justify-center mb-3 group-hover:bg-[var(--accent-indigo)]/20 transition-colors">
                  <Icon className="w-4.5 h-4.5 text-[var(--accent-indigo)]" />
                </div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1.5">{s.title}</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
