'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center p-1 rounded-xl border border-[var(--border-glass)] bg-[var(--card-bg)] shadow-sm">
      <div className="pl-1.5 pr-1 text-[var(--text-muted)]">
        <Globe className="w-3.5 h-3.5" />
      </div>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
          language === 'en'
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/30'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('vi')}
        className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
          language === 'vi'
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/30'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
        aria-label="Switch to Vietnamese"
      >
        VI
      </button>
    </div>
  );
}
