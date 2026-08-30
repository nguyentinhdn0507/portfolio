'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';

const NAV_SECTIONS = ['about', 'experience', 'projects', 'skills', 'certifications', 'contact'] as const;

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_SECTIONS.map((id) => document.getElementById(id));
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(NAV_SECTIONS[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  }, []);

  const navLabels: Record<string, string> = {
    about: t.nav.about,
    experience: t.nav.experience,
    projects: t.nav.projects,
    skills: t.nav.skills,
    certifications: t.nav.certifications,
    contact: t.nav.contact,
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-2 glass-panel shadow-lg shadow-black/5'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-lg font-bold text-[var(--text-primary)] tracking-tight hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span className="gradient-text-hero">NCT</span>
            <span className="text-[var(--text-muted)] font-normal ml-1 text-sm hidden sm:inline">.dev</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_SECTIONS.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                  activeSection === id
                    ? 'text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-bg)]'
                }`}
              >
                {navLabels[id]}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-[var(--border-glass)] bg-[var(--card-bg)] text-[var(--text-primary)] cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <motion.div
              className="absolute top-16 left-4 right-4 glass-panel rounded-2xl shadow-xl p-4 space-y-1"
              style={{ background: 'var(--bg-primary)' }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {NAV_SECTIONS.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                    activeSection === id
                      ? 'text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-bg)]'
                  }`}
                >
                  {navLabels[id]}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
