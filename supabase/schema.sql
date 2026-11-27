-- MoSwimming Supabase Schema
-- Normal form: Boyce-Codd Normal Form (BCNF)
-- Every determinant is a superkey; no partial or transitive dependencies.
-- Run this in your Supabase SQL editor after creating a new project.

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── parents ──────────────────────────────────────────────────────────────────
-- One row per real-world parent/guardian.
-- email is the natural key (unique); parent_id is a surrogate PK.
CREATE TABLE parents (
  parent_id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  email       TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT parents_email_unique UNIQUE (email)
);

-- ── waitlist_entries ─────────────────────────────────────────────────────────
-- One entry per form submission. A parent can submit multiple entries
-- (e.g. for a new expansion round), so parent_id → entry is many-to-many.
-- BCNF: all non-key attributes depend on entry_id only.
CREATE TABLE waitlist_entries (
  entry_id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id          UUID NOT NULL REFERENCES parents(parent_id) ON DELETE CASCADE,
  notes              TEXT,
  wtp_email_sent_at  TIMESTAMPTZ,      -- set once WTP follow-up is sent
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_entries_parent   ON waitlist_entries(parent_id);
CREATE INDEX idx_entries_created  ON waitlist_entries(created_at);
CREATE INDEX idx_entries_wtp_sent ON waitlist_entries(wtp_email_sent_at);

-- ── students ─────────────────────────────────────────────────────────────────
-- A parent may enroll multiple children per entry.
-- BCNF: all attributes depend on student_id only.
CREATE TABLE students (
  student_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id   UUID NOT NULL REFERENCES waitlist_entries(entry_id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  swim_level TEXT NOT NULL CHECK (swim_level IN ('seashells', 'seahorses', 'sealions')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_students_entry ON students(entry_id);
CREATE INDEX idx_students_level ON students(swim_level);

-- ── time_preferences ─────────────────────────────────────────────────────────
-- Which time slots a parent prefers. Many-to-many: one entry → many slots.
-- Natural key: (entry_id, slot_key) — enforced by unique constraint.
-- BCNF: the surrogate preference_id determines all other attributes;
--       the composite (entry_id, slot_key) is also a superkey.
CREATE TABLE time_preferences (
  preference_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id      UUID NOT NULL REFERENCES waitlist_entries(entry_id) ON DELETE CASCADE,
  slot_key      TEXT NOT NULL CHECK (slot_key IN ('sunday_6pm', 'saturday_7pm')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT time_prefs_unique UNIQUE (entry_id, slot_key)
);

CREATE INDEX idx_timeprefs_entry ON time_preferences(entry_id);
CREATE INDEX idx_timeprefs_slot  ON time_preferences(slot_key);

-- ── wtp_responses ────────────────────────────────────────────────────────────
-- One response per waitlist entry (a parent picks one price bucket).
-- BCNF: entry_id is both PK and the sole determinant.
CREATE TABLE wtp_responses (
  entry_id      UUID PRIMARY KEY REFERENCES waitlist_entries(entry_id) ON DELETE CASCADE,
  price_choice  TEXT NOT NULL CHECK (price_choice IN ('$50', '$65', '$80', '$80+')),
  responded_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── blog_posts ───────────────────────────────────────────────────────────────
-- Static content table managed by Don / admin.
-- BCNF: post_id → all; slug is also a superkey (enforced by unique).
CREATE TABLE blog_posts (
  post_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  slug         TEXT NOT NULL,
  excerpt      TEXT,
  content      TEXT NOT NULL,             -- raw markdown or plain text
  content_html TEXT,                      -- optional pre-rendered HTML
  author       TEXT NOT NULL DEFAULT 'Don',
  published_at TIMESTAMPTZ,               -- NULL = draft
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT blog_slug_unique UNIQUE (slug)
);

CREATE INDEX idx_blog_published ON blog_posts(published_at DESC);

-- ── unsubscribes ─────────────────────────────────────────────────────────────
-- Email addresses that have opted out of marketing emails.
-- BCNF: email is the PK and sole determinant.
CREATE TABLE unsubscribes (
  email           TEXT PRIMARY KEY,
  unsubscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────────────────
-- Row Level Security (RLS)
-- Public users: insert only (sign up).
-- Service role (API routes): full access via service-role key.
-- ────────────────────────────────────────────────────────────────────────────

ALTER TABLE parents          ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE students         ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE wtp_responses    ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE unsubscribes     ENABLE ROW LEVEL SECURITY;

-- Blog posts are publicly readable
CREATE POLICY "blog_public_read" ON blog_posts
  FOR SELECT USING (published_at IS NOT NULL AND published_at <= NOW());

-- All other tables: accessible only via service-role key (no anon policies)
-- The API routes use the service-role key, so they bypass RLS entirely.

-- ────────────────────────────────────────────────────────────────────────────
-- Useful views for the weekly recap query
-- ────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE VIEW waitlist_summary AS
SELECT
  e.entry_id,
  e.created_at,
  p.first_name AS parent_first,
  p.last_name  AS parent_last,
  p.email,
  (
    SELECT STRING_AGG(s.first_name || ' (' || s.swim_level || ')', ', ')
    FROM students s WHERE s.entry_id = e.entry_id
  ) AS swimmers,
  (
    SELECT STRING_AGG(
      CASE t.slot_key
        WHEN 'sunday_6pm'   THEN 'Sun 6pm'
        WHEN 'saturday_7pm' THEN 'Sat 7pm'
        ELSE t.slot_key
      END, ', '
    )
    FROM time_preferences t WHERE t.entry_id = e.entry_id
  ) AS time_slots,
  w.price_choice AS wtp
FROM waitlist_entries e
JOIN parents p ON p.parent_id = e.parent_id
LEFT JOIN wtp_responses w ON w.entry_id = e.entry_id
ORDER BY e.created_at DESC;

-- ────────────────────────────────────────────────────────────────────────────
-- Sample blog post (seed data — remove before production if preferred)
-- ────────────────────────────────────────────────────────────────────────────

INSERT INTO blog_posts (title, slug, excerpt, content, content_html, author, published_at)
VALUES (
  'Why we run 1-hour lessons',
  'why-1-hour-lessons',
  'Thirty minutes is not enough. Here is the thinking behind our session length.',
  'Thirty-minute swim lessons are the industry default. They are also not enough time to build anything real.\n\nHere is what actually happens in a well-run hour: the first fifteen minutes are warm-up and technique check. The middle thirty are where the actual learning happens — when a child is tired enough that autopilot switches off and muscle memory starts forming. The last fifteen are where you consolidate the win and finish on a high note.\n\nCut that to thirty minutes and you get the warm-up and the first half of the learning window. The consolidation never comes.\n\nWe run one hour because that is the minimum unit of real progress. Not because it sounds premium.',
  '<p>Thirty-minute swim lessons are the industry default. They are also not enough time to build anything real.</p>
<p>Here is what actually happens in a well-run hour: the first fifteen minutes are warm-up and technique check. The middle thirty are where the actual learning happens — when a child is tired enough that autopilot switches off and muscle memory starts forming. The last fifteen are where you consolidate the win and finish on a high note.</p>
<p>Cut that to thirty minutes and you get the warm-up and the first half of the learning window. The consolidation never comes.</p>
<p>We run one hour because that is the minimum unit of real progress. Not because it sounds premium.</p>',
  'Don',
  NOW() - INTERVAL '7 days'
);
