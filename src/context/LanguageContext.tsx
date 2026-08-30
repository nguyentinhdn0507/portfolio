'use client';

import { createContext, useContext, useSyncExternalStore, ReactNode } from 'react';
import { Language, TranslationDictionary } from '../data/types';
import { enDictionary } from '../data/locales/en';
import { viDictionary } from '../data/locales/vi';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const subscribe = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('languagechange_custom', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('languagechange_custom', callback);
  };
};

const getSnapshot = (): Language => {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('portfolio_lang');
  return stored === 'vi' ? 'vi' : 'en';
};

const getServerSnapshot = (): Language => 'en';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLanguage = (lang: Language) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_lang', lang);
      window.dispatchEvent(new Event('languagechange_custom'));
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'vi' : 'en';
    setLanguage(nextLang);
  };

  const t = language === 'vi' ? viDictionary : enDictionary;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
