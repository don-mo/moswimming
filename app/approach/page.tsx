'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { useLang } from '@/lib/i18n/LanguageContext';

export default function ApproachPage() {
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
            {t.nav.approach}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: 'oklch(0.96 0.01 210)',
              maxWidth: '28rem',
              lineHeight: 1.1,
            }}
          >
            {t.approach.pageTitle}
          </h1>
        </div>
      </section>

      {/* Why 1 hour */}
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
                {t.approach.why1hr}
              </h2>
              <p style={{ color: 'oklch(0.78 0.03 210)', lineHeight: 1.75, fontSize: '1.05rem' }}>
                {t.approach.why1hrBody}
              </p>
            </div>
            <ImagePlaceholder
              number={3}
              description="Approach — child completing a full lap, showing sustained effort over a real lesson"
              height="300px"
            />
          </div>
        </div>
      </section>

      {/* Method */}
      <section style={{ backgroundColor: 'oklch(0.35 0.09 143)', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '52rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              color: 'oklch(0.96 0.01 210)',
              marginBottom: '1.25rem',
            }}
          >
            {t.approach.systemTitle}
          </h2>
          <p style={{ color: 'oklch(0.78 0.03 210)', lineHeight: 1.75, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
            {t.approach.systemBody}
          </p>

          {/* Progression visual */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            {['Kick', 'Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly'].map((step, i, arr) => (
              <>
                <div
                  key={step}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: '9999px',
                    backgroundColor: 'oklch(0.36 0.05 210)',
                    border: '1px solid oklch(0.52 0.06 210)',
                    color: 'oklch(0.95 0.01 210)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  {step}
                </div>
                {i < arr.length - 1 && (
                  <span key={`arrow-${i}`} style={{ color: 'oklch(0.58 0.26 293)', fontWeight: 700 }}>→</span>
                )}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor is the variable */}
      <section style={{ backgroundColor: 'oklch(0.30 0.07 214)', padding: '5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            <ImagePlaceholder
              number={4}
              description="Instructor working 1-on-1 with a child — patient, attentive, on deck"
              height="300px"
            />
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-fraunces)',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                  color: 'oklch(0.96 0.01 210)',
                  marginBottom: '1.25rem',
                }}
              >
                {t.approach.instructorTitle}
              </h2>
              <p style={{ color: 'oklch(0.78 0.03 210)', lineHeight: 1.75, fontSize: '1.05rem' }}>
                {t.approach.instructorBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pool-deck move */}
      <section style={{ backgroundColor: 'oklch(0.33 0.07 178)', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '52rem' }}>
          <div
            style={{
              backgroundColor: 'oklch(0.36 0.05 210)',
              border: '1px solid oklch(0.45 0.05 210)',
              borderRadius: '1rem',
              padding: '2.5rem',
              borderLeft: '4px solid oklch(0.64 0.19 32)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                color: 'oklch(0.96 0.01 210)',
                marginBottom: '1rem',
              }}
            >
              {t.approach.deckTitle}
            </h2>
            <p style={{ color: 'oklch(0.78 0.03 210)', lineHeight: 1.75, fontSize: '1.05rem', margin: 0 }}>
              {t.approach.deckBody}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: 'oklch(0.24 0.06 210)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '36rem' }}>
          <p style={{ color: 'oklch(0.72 0.04 210)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
            See what all this looks like in practice.
          </p>
          <Link href="/waitlist" className="btn-cta" style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}>
            {t.nav.waitlist}
          </Link>
        </div>
      </section>
    </>
  );
}
