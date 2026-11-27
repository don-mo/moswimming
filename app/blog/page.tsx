import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  let posts: { post_id: string; title: string; slug: string; excerpt: string | null; author: string; published_at: string }[] | null = null;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('blog_posts')
      .select('post_id, title, slug, excerpt, author, published_at')
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false });
    posts = data;
  } catch {
    // Supabase not yet configured — show empty state
  }

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
            Blog
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: 'oklch(0.96 0.01 210)',
              lineHeight: 1.1,
            }}
          >
            From the pool deck
          </h1>
        </div>
      </section>

      {/* Posts */}
      <section style={{ backgroundColor: 'oklch(0.28 0.07 212)', padding: '4rem 0 6rem' }}>
        <div className="container">
          {!posts || posts.length === 0 ? (
            <p style={{ color: 'oklch(0.58 0.03 210)', fontSize: '1.05rem', fontStyle: 'italic' }}>
              No posts yet. Check back soon.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {posts.map((post) => (
                <article
                  key={post.post_id}
                  className="card"
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                >
                  <p style={{ color: 'oklch(0.58 0.03 210)', fontSize: '0.8rem', margin: 0 }}>
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : ''}
                    {post.author ? ` · ${post.author}` : ''}
                  </p>
                  <h2
                    style={{
                      fontFamily: 'var(--font-fraunces)',
                      fontSize: '1.25rem',
                      color: 'oklch(0.96 0.01 210)',
                      margin: 0,
                      lineHeight: 1.25,
                    }}
                  >
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p style={{ color: 'oklch(0.72 0.04 210)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
                      {post.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      marginTop: 'auto',
                      paddingTop: '0.5rem',
                      color: 'oklch(0.72 0.13 185)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                    }}
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
