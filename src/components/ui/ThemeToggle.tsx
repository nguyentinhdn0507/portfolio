'use client';

import React, { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="relative p-2.5 rounded-xl transition-all duration-300 border border-[var(--border-glass)] bg-[var(--card-bg)] hover:border-indigo-500/50 hover:shadow-md hover:shadow-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-[var(--text-primary)] group cursor-pointer"
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <Sun
          className={`w-5 h-5 text-amber-500 transition-all duration-500 transform ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon
          className={`w-5 h-5 text-cyan-400 absolute transition-all duration-500 transform ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
    </button>
  );
}
