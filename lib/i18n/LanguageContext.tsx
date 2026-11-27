'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { translations, type Language, type Translations } from './translations';

interface LanguageContextValue {
  lang: Language;
  t: Translations;
  setLang: (l: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = l;
    }
  }, []);

  const t = translations[lang] as unknown as Translations;

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
