'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useLang } from '@/lib/i18n/LanguageContext';
import { LANGUAGE_LABELS, type Language } from '@/lib/i18n/translations';

const LANGS = Object.entries(LANGUAGE_LABELS) as [Language, string][];

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close lang dropdown on outside click — checks any .lang-dropdown element
  // so both the desktop and mobile instances are treated as "inside".
  useEffect(() => {
    function handler(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest('.lang-dropdown')) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'oklch(0.24 0.07 214 / 0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid oklch(0.40 0.04 210)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: '4rem', gap: '2rem' }}>
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-brand)',
            fontSize: '1.65rem',
            color: 'oklch(0.72 0.13 185)',
            textDecoration: 'none',
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          MoSwimming
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', marginLeft: 'auto', flexWrap: 'nowrap' }}
          className="hidden-mobile"
        >
          <Link href="/approach" className="nav-link">{t.nav.approach}</Link>
          <Link href="/programs" className="nav-link">{t.nav.programs}</Link>
          <Link href="/instructors" className="nav-link">{t.nav.instructors}</Link>
          <Link href="/story" className="nav-link">{t.nav.story}</Link>
          <Link href="/blog" className="nav-link">{t.nav.blog}</Link>

          {/* Language picker */}
          <div className="lang-dropdown" ref={langRef}>
            <button
              className="lang-btn"
              onClick={() => setLangOpen((o) => !o)}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              <span aria-hidden="true">🌐</span>
              {LANGUAGE_LABELS[lang]}
              <span aria-hidden="true" style={{ fontSize: '0.7rem', opacity: 0.6 }}>▾</span>
            </button>
            {langOpen && (
              <ul role="listbox" className="lang-menu" aria-label="Select language">
                {LANGS.map(([code, label]) => (
                  <li key={code}>
                    <button
                      role="option"
                      aria-selected={lang === code}
                      className="lang-option"
                      onClick={() => { setLang(code); setLangOpen(false); }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* CTA */}
          <Link href="/waitlist" className="btn-cta" style={{ whiteSpace: 'nowrap' }}>
            {t.nav.waitlist}
          </Link>
        </nav>

        {/* Mobile: language + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }} className="show-mobile">
          <div className="lang-dropdown">
            <button
              className="lang-btn"
              onClick={() => setLangOpen((o) => !o)}
              aria-expanded={langOpen}
            >
              <span>🌐</span>
              {LANGUAGE_LABELS[lang]}
            </button>
            {langOpen && (
              <ul role="listbox" className="lang-menu">
                {LANGS.map(([code, label]) => (
                  <li key={code}>
                    <button
                      role="option"
                      aria-selected={lang === code}
                      className="lang-option"
                      onClick={() => { setLang(code); setLangOpen(false); }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'oklch(0.85 0.02 210)',
              padding: '0.5rem',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="show-mobile"
          style={{
            borderTop: '1px solid oklch(0.40 0.04 210)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {[
            { href: '/approach', label: t.nav.approach },
            { href: '/programs', label: t.nav.programs },
            { href: '/instructors', label: t.nav.instructors },
            { href: '/story', label: t.nav.story },
            { href: '/blog', label: t.nav.blog },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: '1rem' }}
            >
              {label}
            </Link>
          ))}
          <Link href="/waitlist" className="btn-cta" onClick={() => setMenuOpen(false)} style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            {t.nav.waitlist}
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile   { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
