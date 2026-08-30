'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Languages } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import SectionHeading from '@/components/ui/SectionHeading';

export default function CertsEducationSection() {
  const { t } = useLanguage();
  const c = t.certifications;
  const education = t.data.education;
  const certs = t.data.certifications;

  return (
    <section id="certifications" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <div>
            <h3 className="flex items-center gap-2 text-base font-bold text-[var(--text-primary)] mb-5">
              <GraduationCap className="w-5 h-5 text-[var(--accent-indigo)]" />
              {c.educationTitle}
            </h3>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  className="glass-card rounded-2xl p-5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">{edu.degree}</h4>
                  <p className="text-xs font-semibold text-[var(--accent-indigo)] mb-1">{edu.institution}</p>
                  <p className="text-[11px] text-[var(--text-muted)] mb-2">{edu.period}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="flex items-center gap-2 text-base font-bold text-[var(--text-primary)] mb-5">
              <Languages className="w-5 h-5 text-[var(--accent-cyan)]" />
              {c.certsTitle}
            </h3>
            <div className="space-y-4">
              {certs.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  className="glass-card rounded-2xl p-5"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Award className="w-4.5 h-4.5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] mb-0.5">{cert.title}</h4>
                      <p className="text-xs text-[var(--accent-indigo)] font-medium">{cert.issuer}</p>
                      <p className="text-[11px] text-[var(--text-muted)] mt-1">{cert.date}</p>
                      <span className="inline-block mt-2 px-2.5 py-0.5 text-[10px] font-bold rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-500">
                        {cert.scoreOrDetail}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
