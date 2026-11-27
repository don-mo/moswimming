'use client';

import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { useLang } from '@/lib/i18n/LanguageContext';

export default function HomePage() {
  const { t } = useLang();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'oklch(0.30 0.07 214)',
          padding: '6rem 0 5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-8rem',
            right: '-6rem',
            width: '40rem',
            height: '40rem',
            borderRadius: '50%',
            background: 'oklch(0.58 0.26 293 / 0.08)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ maxWidth: '42rem' }}>
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
                marginBottom: '1.5rem',
              }}
            >
              Kirkland, WA · Est. 2023
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                fontWeight: 900,
                color: 'oklch(0.96 0.01 210)',
                lineHeight: 1.05,
                marginBottom: '1.5rem',
              }}
            >
              {t.hero.headline}
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                color: 'oklch(0.78 0.03 210)',
                lineHeight: 1.65,
                marginBottom: '2.25rem',
                maxWidth: '36rem',
              }}
            >
              {t.hero.sub}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/waitlist" className="btn-cta" style={{ fontSize: '1rem', padding: '0.9rem 2.2rem' }}>
                {t.hero.cta}
              </Link>
              <Link href="/approach" className="btn-ghost">
                {t.nav.approach}
              </Link>
            </div>

            <p
              style={{
                marginTop: '1.75rem',
                fontSize: '0.85rem',
                color: 'oklch(0.58 0.03 210)',
                fontStyle: 'italic',
              }}
            >
              {t.hero.seats}
            </p>
          </div>
        </div>
      </section>

      {/* ── Hero image ───────────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'oklch(0.27 0.07 214)', padding: '0' }}>
        <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <ImagePlaceholder
            number={1}
            description="Hero / mood shot — Don or an instructor on the pool deck with a smiling child mid-lesson"
            height="420px"
          />
        </div>
      </section>

      {/* ── Why us — 3 pillars ───────────────────────────────────────── */}
      <section style={{ backgroundColor: 'oklch(0.33 0.07 178)', padding: '5rem 0' }}>
        <div className="container">
          <h2
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              marginBottom: '0.75rem',
              color: 'oklch(0.96 0.01 210)',
            }}
          >
            Why MoSwimming
          </h2>
          <p style={{ color: 'oklch(0.72 0.04 210)', marginBottom: '3rem', maxWidth: '40rem', fontSize: '1.05rem' }}>
            Three things that are different here — and everything underneath backs them up.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                icon: '⏱',
                title: 'One real hour',
                body: 'We run 60-minute sessions because that\'s how long it takes to build muscle memory, work through the hard moment, and finish with a win.',
              },
              {
                icon: '📋',
                title: 'A written method',
                body: 'Instructors prep each kid before class. We follow a step-by-step progression — first kick through butterfly — not vibes.',
              },
              {
                icon: '🤝',
                title: 'Instructors who stay',
                body: 'We pay well to attract and keep great people. Your child sees the same face every week — not a rotating teenager.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="card">
                <div style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{icon}</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-fraunces)',
                    fontSize: '1.2rem',
                    marginBottom: '0.6rem',
                    color: 'oklch(0.96 0.01 210)',
                  }}
                >
                  {title}
                </h3>
                <p style={{ color: 'oklch(0.75 0.03 210)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programs teaser ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'oklch(0.35 0.09 143)', padding: '5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-fraunces)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                  marginBottom: '1rem',
                  color: 'oklch(0.96 0.01 210)',
                }}
              >
                {t.nav.programs}
              </h2>
              <p style={{ color: 'oklch(0.78 0.03 210)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                {t.programs.intro}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {[
                  { name: t.programs.seashellsTitle, sub: t.programs.seashellsSub, color: 'oklch(0.72 0.13 185)' },
                  { name: t.programs.seahorsesTitle, sub: t.programs.seahorsesSub, color: 'oklch(0.64 0.19 32)' },
                  { name: t.programs.sealionsTitle, sub: t.programs.sealionsSub, color: 'oklch(0.58 0.26 293)' },
                ].map(({ name, sub, color }) => (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '3px', height: '2rem', borderRadius: '2px', backgroundColor: color, flexShrink: 0 }} />
                    <div>
                      <span style={{ color: 'oklch(0.95 0.01 210)', fontWeight: 600 }}>{name}</span>
                      <span style={{ color: 'oklch(0.65 0.03 210)', fontSize: '0.875rem', marginLeft: '0.5rem' }}>— {sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/programs" className="btn-ghost">
                {t.nav.programs} →
              </Link>
            </div>

            <ImagePlaceholder
              number={2}
              description="Programs overview — group class in the pool, multiple kids at different levels"
              height="360px"
            />
          </div>
        </div>
      </section>

      {/* ── Philosophy quote ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'oklch(0.30 0.07 214)', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '52rem' }}>
          <blockquote
            style={{
              margin: 0,
              padding: '2.5rem',
              borderLeft: '4px solid oklch(0.58 0.26 293)',
              borderRadius: '0 1rem 1rem 0',
              backgroundColor: 'oklch(0.36 0.05 210)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
                color: 'oklch(0.96 0.01 210)',
                lineHeight: 1.3,
                margin: 0,
                marginBottom: '1rem',
              }}
            >
              "Fun and fast are not mutually exclusive. A child who loves the water will outswim a child who fears it — every time."
            </p>
            <cite
              style={{
                color: 'oklch(0.65 0.03 210)',
                fontSize: '0.9rem',
                fontStyle: 'normal',
              }}
            >
              — Don, founder
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ── Instructors teaser ───────────────────────────────────────── */}
      <section style={{ backgroundColor: 'oklch(0.33 0.07 178)', padding: '5rem 0' }}>
        <div className="container">
          <h2
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              marginBottom: '0.75rem',
              color: 'oklch(0.96 0.01 210)',
            }}
          >
            {t.nav.instructors}
          </h2>
          <p style={{ color: 'oklch(0.72 0.04 210)', marginBottom: '3rem', maxWidth: '40rem' }}>
            {t.instructors.intro}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              { num: 6, name: t.instructors.donName, school: 'UW Seattle · Business Admin' },
              { num: 7, name: t.instructors.arvinName, school: 'UW Seattle · Informatics' },
              { num: 8, name: t.instructors.takaName, school: 'UW Bothell · Engineering' },
            ].map(({ num, name, school }) => (
              <div key={name} className="card" style={{ textAlign: 'center' }}>
                <ImagePlaceholder number={num} description={`Portrait of ${name}`} height="180px" />
                <h3
                  style={{
                    fontFamily: 'var(--font-fraunces)',
                    fontSize: '1.1rem',
                    marginTop: '1rem',
                    marginBottom: '0.25rem',
                    color: 'oklch(0.96 0.01 210)',
                  }}
                >
                  {name}
                </h3>
                <p style={{ color: 'oklch(0.65 0.03 210)', fontSize: '0.82rem', margin: 0 }}>{school}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <Link href="/instructors" className="btn-ghost">
              Meet the team →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'oklch(0.24 0.06 210)',
          padding: '5rem 0',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '38rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'oklch(0.96 0.01 210)',
              marginBottom: '1rem',
            }}
          >
            Ready when you are.
          </h2>
          <p style={{ color: 'oklch(0.72 0.04 210)', marginBottom: '2rem', fontSize: '1.05rem' }}>
            Both classes are full, but spots open up. Be the first to know.
          </p>
          <Link href="/waitlist" className="btn-cta" style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
            {t.nav.waitlist}
          </Link>
        </div>
      </section>
    </>
  );
}
