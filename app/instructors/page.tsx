'use client';

import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { useLang } from '@/lib/i18n/LanguageContext';

export default function InstructorsPage() {
  const { t } = useLang();

  const coaches = [
    {
      num: 6,
      name: t.instructors.donName,
      bio: t.instructors.donBio,
      school: 'UW Seattle',
      major: 'Business Administration',
    },
    {
      num: 7,
      name: t.instructors.arvinName,
      bio: t.instructors.arvinBio,
      school: 'UW Seattle',
      major: 'Informatics',
    },
    {
      num: 8,
      name: t.instructors.takaName,
      bio: t.instructors.takaBio,
      school: 'UW Bothell',
      major: 'Engineering',
    },
  ];

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
            {t.nav.instructors}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: 'oklch(0.96 0.01 210)',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            {t.instructors.pageTitle}
          </h1>
          <p style={{ color: 'oklch(0.72 0.04 210)', fontSize: '1.1rem', maxWidth: '44rem', lineHeight: 1.65 }}>
            {t.instructors.intro}
          </p>
        </div>
      </section>

      {/* Instructor profiles */}
      {coaches.map(({ num, name, bio, school, major }, idx) => (
        <section
          key={name}
          style={{
            backgroundColor: idx % 2 === 0 ? 'oklch(0.33 0.07 178)' : 'oklch(0.35 0.09 143)',
            padding: '5rem 0',
          }}
        >
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '3rem',
                alignItems: 'center',
                direction: idx % 2 === 1 ? 'rtl' : 'ltr',
              }}
            >
              <div style={{ direction: 'ltr' }}>
                <ImagePlaceholder
                  number={num}
                  description={`Portrait photo of ${name} at the pool, friendly and approachable`}
                  height="360px"
                />
              </div>
              <div style={{ direction: 'ltr' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-fraunces)',
                    fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                    color: 'oklch(0.96 0.01 210)',
                    marginBottom: '0.35rem',
                  }}
                >
                  {name}
                </h2>
                <p style={{ color: 'oklch(0.72 0.13 185)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  {school} · {major}
                </p>
                <p style={{ color: 'oklch(0.78 0.03 210)', lineHeight: 1.75, fontSize: '1.05rem' }}>
                  {bio}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Group shot */}
      <section style={{ backgroundColor: 'oklch(0.30 0.07 214)', padding: '5rem 0' }}>
        <div className="container">
          <h2
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              color: 'oklch(0.96 0.01 210)',
              marginBottom: '2rem',
              textAlign: 'center',
            }}
          >
            The whole team
          </h2>
          <ImagePlaceholder
            number={11}
            description="All three coaches together at the pool deck, candid and laughing"
            height="360px"
          />
        </div>
      </section>

      {/* Why we pay well */}
      <section style={{ backgroundColor: 'oklch(0.35 0.09 143)', padding: '4.5rem 0' }}>
        <div className="container" style={{ maxWidth: '52rem', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              color: 'oklch(0.96 0.01 210)',
              marginBottom: '1rem',
            }}
          >
            Why we pay instructors well — on purpose
          </h2>
          <p style={{ color: 'oklch(0.78 0.03 210)', lineHeight: 1.75, fontSize: '1.05rem', marginBottom: '2rem' }}>
            Continuity matters. The best thing we can do for your child is make sure they see the same face every week. That costs more than minimum wage, and it is worth it. Our fees are set to cover real overhead — no games, no fine print.
          </p>
          <Link href="/waitlist" className="btn-cta">
            {t.nav.waitlist}
          </Link>
        </div>
      </section>
    </>
  );
}
