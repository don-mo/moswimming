'use client';

import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { useLang } from '@/lib/i18n/LanguageContext';

export default function ProgramsPage() {
  const { t } = useLang();

  const programs = [
    {
      num: 5,
      title: t.programs.seashellsTitle,
      sub: t.programs.seashellsSub,
      body: t.programs.seashellsBody,
      accentColor: 'oklch(0.72 0.13 185)',
      imgDesc: 'Seashells class — beginner child floating with instructor support, smiling',
      skills: ['Water comfort', 'Blowing bubbles', 'Floating', 'Kicking with board'],
    },
    {
      num: 9,
      title: t.programs.seahorsesTitle,
      sub: t.programs.seahorsesSub,
      body: t.programs.seahorsesBody,
      accentColor: 'oklch(0.64 0.19 32)',
      imgDesc: 'Seahorses class — child doing backstroke, looking confident',
      skills: ['Freestyle', 'Backstroke', 'Breaststroke', 'Intro to butterfly'],
    },
    {
      num: 10,
      title: t.programs.sealionsTitle,
      sub: t.programs.sealionsSub,
      body: t.programs.sealionsBody,
      accentColor: 'oklch(0.58 0.26 293)',
      imgDesc: 'Sea Lions class — child in full butterfly stroke, competitive form',
      skills: ['All four strokes', 'Flip turns', 'Pacing', 'Race strategy'],
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
            {t.nav.programs}
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
            {t.programs.pageTitle}
          </h1>
          <p style={{ color: 'oklch(0.72 0.04 210)', fontSize: '1.1rem', maxWidth: '42rem' }}>
            {t.programs.intro}
          </p>
        </div>
      </section>

      {/* Meta badges */}
      <section style={{ backgroundColor: 'oklch(0.28 0.07 210)', padding: '1.5rem 0', borderBottom: '1px solid oklch(0.38 0.05 210)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
            {[
              { icon: '🏊', label: t.programs.age },
              { icon: '⏱', label: t.programs.hours },
              { icon: '📍', label: t.programs.pool },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'oklch(0.72 0.04 210)', fontSize: '0.875rem' }}>
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program cards */}
      {programs.map(({ num, title, sub, body, accentColor, imgDesc, skills }, idx) => (
        <section
          key={title}
          style={{
            backgroundColor: idx % 2 === 0 ? 'oklch(0.33 0.07 178)' : 'oklch(0.35 0.09 143)',
            padding: '5rem 0',
          }}
        >
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '3rem',
                alignItems: 'center',
                direction: idx % 2 === 1 ? 'rtl' : 'ltr',
              }}
            >
              <div style={{ direction: 'ltr' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '4px',
                      height: '2.5rem',
                      borderRadius: '2px',
                      backgroundColor: accentColor,
                    }}
                  />
                  <div>
                    <h2
                      style={{
                        fontFamily: 'var(--font-fraunces)',
                        fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                        color: 'oklch(0.96 0.01 210)',
                        margin: 0,
                      }}
                    >
                      {title}
                    </h2>
                    <p style={{ color: accentColor, fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>
                      {sub}
                    </p>
                  </div>
                </div>

                <p style={{ color: 'oklch(0.78 0.03 210)', lineHeight: 1.75, fontSize: '1.05rem', marginBottom: '1.75rem' }}>
                  {body}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {skills.map((s) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ color: accentColor, fontSize: '0.9rem' }}>✓</span>
                      <span style={{ color: 'oklch(0.82 0.02 210)', fontSize: '0.9rem' }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ direction: 'ltr' }}>
                <ImagePlaceholder number={num} description={imgDesc} height="320px" />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{ backgroundColor: 'oklch(0.24 0.06 210)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '36rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              color: 'oklch(0.96 0.01 210)',
              marginBottom: '1rem',
            }}
          >
            Ready when you are.
          </h2>
          <p style={{ color: 'oklch(0.72 0.04 210)', marginBottom: '1.75rem' }}>
            Both classes are full — join the waitlist for first access.
          </p>
          <Link href="/waitlist" className="btn-cta">
            {t.nav.waitlist}
          </Link>
        </div>
      </section>
    </>
  );
}
