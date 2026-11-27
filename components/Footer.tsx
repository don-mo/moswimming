'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer
      style={{
        backgroundColor: 'oklch(0.20 0.06 214)',
        borderTop: '1px solid oklch(0.35 0.05 210)',
        padding: '3.5rem 0 2rem',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-brand)',
                fontSize: '1.5rem',
                color: 'oklch(0.72 0.13 185)',
                marginBottom: '0.6rem',
              }}
            >
              MoSwimming
            </div>
            <p style={{ color: 'oklch(0.58 0.03 210)', fontSize: '0.85rem', margin: 0 }}>
              {t.footer.tagline}
            </p>
            <p style={{ color: 'oklch(0.58 0.03 210)', fontSize: '0.82rem', marginTop: '0.4rem' }}>
              {t.footer.started}
            </p>
          </div>

          {/* Links */}
          <div>
            <p style={{ color: 'oklch(0.78 0.03 210)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {t.footer.links}
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {[
                { href: '/approach', label: t.nav.approach },
                { href: '/programs', label: t.nav.programs },
                { href: '/instructors', label: t.nav.instructors },
                { href: '/story', label: t.nav.story },
                { href: '/blog', label: t.nav.blog },
                { href: '/waitlist', label: t.nav.waitlist },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{ color: 'oklch(0.65 0.03 210)', fontSize: '0.875rem', textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'oklch(0.85 0.02 210)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'oklch(0.65 0.03 210)')}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p style={{ color: 'oklch(0.78 0.03 210)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Contact
            </p>
            <p style={{ color: 'oklch(0.65 0.03 210)', fontSize: '0.875rem', marginBottom: '0.35rem' }}>
              {t.footer.location}
            </p>
            <a
              href={`mailto:${t.footer.email}`}
              style={{ color: 'oklch(0.72 0.13 185)', fontSize: '0.875rem', textDecoration: 'none' }}
            >
              {t.footer.email}
            </a>
          </div>
        </div>

        <hr className="divider" />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            paddingTop: '1.5rem',
          }}
        >
          <p style={{ color: 'oklch(0.50 0.03 210)', fontSize: '0.8rem', margin: 0 }}>
            © {new Date().getFullYear()} MoSwimming. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <Link
              href="/api/unsubscribe"
              style={{ color: 'oklch(0.50 0.03 210)', fontSize: '0.8rem', textDecoration: 'none' }}
            >
              Unsubscribe
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
