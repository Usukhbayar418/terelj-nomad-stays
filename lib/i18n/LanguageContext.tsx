"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALES,
  dictionaries,
  type Dict,
  type Locale,
} from "./translations";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "nomad-stays-locale";

function isValidLocale(value: string | null): value is Locale {
  return !!value && (LOCALES as string[]).includes(value);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Hydrate from localStorage on the client only
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isValidLocale(stored)) {
        setLocaleState(stored);
      }
    } catch {
      // ignore (private mode etc.)
    }
  }, []);

  // Reflect on <html lang="..."> for accessibility
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next: Locale = prev === "mn" ? "en" : "mn";
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t: dictionaries[locale],
    }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
