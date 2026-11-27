import type { Metadata } from 'next';
import { Caveat, Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK'],
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MoSwimming — Playful but Premium',
    template: '%s | MoSwimming',
  },
  description:
    'Science-backed swim lessons for ages 5–17 at Juanita High School Pool, Kirkland WA. Small groups, 1-hour sessions, instructors who stay. Join the waitlist.',
  keywords: ['swim lessons', 'Kirkland', 'Juanita High School', 'kids swimming', 'swim school', 'Washington'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'MoSwimming',
    title: 'MoSwimming — Playful but Premium',
    description: 'Science-backed swim lessons for ages 5–17 in Kirkland, WA.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${caveat.variable}`}
    >
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
        <LanguageProvider>
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
