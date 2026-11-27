import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = createClient();

  let post: Record<string, string> | null = null;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .not('published_at', 'is', null)
      .single();
    post = data;
  } catch {
    // Supabase not configured
  }

  if (!post) notFound();

  return (
    <>
      <section style={{ backgroundColor: 'oklch(0.30 0.07 214)', padding: '5rem 0 3rem' }}>
        <div className="container" style={{ maxWidth: '48rem' }}>
          <Link
            href="/blog"
            style={{ color: 'oklch(0.65 0.03 210)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}
          >
            ← Back to blog
          </Link>
          <p style={{ color: 'oklch(0.58 0.03 210)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            {post.published_at
              ? new Date(post.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : ''}
            {post.author ? ` · ${post.author}` : ''}
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: 'oklch(0.96 0.01 210)',
              lineHeight: 1.1,
            }}
          >
            {post.title}
          </h1>
        </div>
      </section>

      <section style={{ backgroundColor: 'oklch(0.28 0.07 212)', padding: '3rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: '48rem' }}>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.content_html ?? post.content }}
          />
        </div>
      </section>
    </>
  );
}
