'use client';

import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { useLang } from '@/lib/i18n/LanguageContext';

export default function StoryPage() {
  const { t } = useLang();

  return (
    <>
      {/* Page header */}
      <section style={{ backgroundColor: 'oklch(0.30 0.07 214)', padding: '5rem 0 3.5rem' }}>
        <div className="container">
          <span
            style={{
              display: 'inline-block',
              padding: '0.3rem 0.9rem',
              borderRadius: '9999px',
              backgroundColor: 'oklch(0.36 0.05 210)',
              border: '1px solid oklch(0.45 0.05 210)',
              color: 'oklch(0.72 0.13 185)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            {t.nav.story}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: 'oklch(0.96 0.01 210)',
              lineHeight: 1.1,
            }}
          >
            {t.story.pageTitle}
          </h1>
        </div>
      </section>

      {/* Origin */}
      <section style={{ backgroundColor: 'oklch(0.33 0.07 178)', padding: '5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-fraunces)',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                  color: 'oklch(0.96 0.01 210)',
                  marginBottom: '1.25rem',
                }}
              >
                {t.story.origin}
              </h2>
              <p style={{ color: 'oklch(0.78 0.03 210)', lineHeight: 1.75, fontSize: '1.05rem' }}>
                {t.story.originBody}
              </p>
            </div>
            <ImagePlaceholder
              number={12}
              description="Don in an early teaching moment — informal, with a small group of kids, energy high"
              height="320px"
            />
          </div>
        </div>
      </section>

      {/* Suffered */}
      <section style={{ backgroundColor: 'oklch(0.35 0.09 143)', padding: '5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
              direction: 'rtl',
            }}
          >
            <div style={{ direction: 'ltr' }}>
              <ImagePlaceholder
                number={13}
                description="Don at the pool deck, serious and focused — the weight of knowing what hard training feels like"
                height="320px"
              />
            </div>
            <div style={{ direction: 'ltr' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-fraunces)',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                  color: 'oklch(0.96 0.01 210)',
                  marginBottom: '1.25rem',
                }}
              >
                {t.story.suffered}
              </h2>
              <p style={{ color: 'oklch(0.78 0.03 210)', lineHeight: 1.75, fontSize: '1.05rem' }}>
                {t.story.sufferedBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{ backgroundColor: 'oklch(0.30 0.07 214)', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '52rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              color: 'oklch(0.96 0.01 210)',
              marginBottom: '1.25rem',
            }}
          >
            {t.story.philosophy}
          </h2>
          <blockquote
            style={{
              margin: 0,
              padding: '2rem 2.5rem',
              borderLeft: '4px solid oklch(0.64 0.19 32)',
              borderRadius: '0 1rem 1rem 0',
              backgroundColor: 'oklch(0.36 0.05 210)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: 'clamp(1.3rem, 3vw, 1.75rem)',
                color: 'oklch(0.96 0.01 210)',
                lineHeight: 1.3,
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              {t.story.philosophyBody}
            </p>
          </blockquote>
        </div>
      </section>

      {/* Today */}
      <section style={{ backgroundColor: 'oklch(0.33 0.07 178)', padding: '5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-fraunces)',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                  color: 'oklch(0.96 0.01 210)',
                  marginBottom: '1.25rem',
                }}
              >
                {t.story.today}
              </h2>
              <p style={{ color: 'oklch(0.78 0.03 210)', lineHeight: 1.75, fontSize: '1.05rem', marginBottom: '2rem' }}>
                {t.story.todayBody}
              </p>
              <Link href="/waitlist" className="btn-cta">
                {t.nav.waitlist}
              </Link>
            </div>
            <ImagePlaceholder
              number={14}
              description="Current MoSwimming class in action — full group, Juanita High School Pool, energy and focus"
              height="320px"
            />
          </div>
        </div>
      </section>
    </>
  );
}
