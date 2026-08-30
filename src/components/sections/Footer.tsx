'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--border-glass)] py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="text-center sm:text-left">
          <p className="text-sm text-[var(--text-secondary)]">
            © {year} <span className="font-semibold text-[var(--text-primary)]">Nguyen Chi Tinh</span>. {f.rights}
          </p>
        </div>

        {/* Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl border border-[var(--border-glass)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent-indigo)]/40 transition-all cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" /> {f.backToTop}
        </button>
      </div>
    </footer>
  );
}
