import Link from 'next/link';

export default function UnsubscribedPage() {
  return (
    <section style={{ backgroundColor: 'oklch(0.30 0.07 214)', minHeight: '70dvh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '36rem', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '2rem', color: 'oklch(0.96 0.01 210)', marginBottom: '0.75rem' }}>
          You've been unsubscribed.
        </h1>
        <p style={{ color: 'oklch(0.72 0.04 210)', fontSize: '1.05rem', marginBottom: '2rem' }}>
          You won't receive any more emails from MoSwimming. Your waitlist spot is still held.
        </p>
        <Link href="/" className="btn-ghost">← Back to home</Link>
      </div>
    </section>
  );
}
