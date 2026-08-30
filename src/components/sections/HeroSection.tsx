'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import SceneContainer from '@/components/3d/SceneContainer';

export default function HeroSection() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent-indigo)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          {/* Left: Content */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Status Badge */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-500 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {h.status}
              </span>
            </div>

            {/* Greeting & Name */}
            <div>
              <p className="text-base text-[var(--text-secondary)] mb-1">{h.greeting}</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text-hero">{h.name}</span>
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] mt-2 flex items-center gap-2 justify-center lg:justify-start">
                <Sparkles className="w-5 h-5 text-[var(--accent-cyan)]" />
                {h.role}
              </p>
            </div>

            {/* Tagline */}
            <p className="text-sm md:text-base text-[var(--accent-indigo)] font-medium">{h.tagline}</p>

            {/* Bio */}
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-lg mx-auto lg:mx-0">
              {h.bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: h.stats.experience, label: h.stats.expLabel },
                { value: h.stats.projects, label: h.stats.projLabel },
                { value: h.stats.certifications, label: h.stats.certLabel },
                { value: h.stats.satisfaction, label: h.stats.satLabel },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass-card rounded-xl p-3 text-center transition-all duration-300 hover:scale-105"
                >
                  <div className="text-xl font-bold gradient-text-hero">{stat.value}</div>
                  <div className="text-[10px] text-[var(--text-muted)] mt-0.5 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="glow-btn-primary px-6 py-2.5 rounded-xl text-white text-sm font-semibold cursor-pointer"
              >
                {h.ctaProjects}
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-glass)] text-[var(--text-primary)] hover:border-[var(--accent-indigo)]/50 hover:bg-[var(--accent-indigo)]/5 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> {h.ctaContact}
              </button>
            </div>
          </div>

          {/* Right: 3D Canvas */}
          <div className="relative w-full h-[380px] md:h-[450px] lg:h-[520px]">
            <SceneContainer />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-5 h-5 text-[var(--text-muted)]" />
        </motion.div>
      </div>
    </section>
  );
}
