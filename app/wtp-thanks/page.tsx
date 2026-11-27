import Link from 'next/link';

export default function WtpThanksPage() {
  return (
    <section style={{ backgroundColor: 'oklch(0.30 0.07 214)', minHeight: '70dvh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '36rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🙏</div>
        <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '2rem', color: 'oklch(0.96 0.01 210)', marginBottom: '0.75rem' }}>
          Thanks for the input.
        </h1>
        <p style={{ color: 'oklch(0.72 0.04 210)', fontSize: '1.05rem', marginBottom: '2rem' }}>
          Your response helps us set fair pricing when we expand. We'll be in touch.
        </p>
        <Link href="/" className="btn-ghost">← Back to MoSwimming</Link>
      </div>
    </section>
  );
}
