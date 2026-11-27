import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client.
 * Uses the service-role key so API routes can bypass RLS.
 * Never expose SUPABASE_SERVICE_ROLE_KEY to the browser.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      'Supabase is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local — see .env.local.example.',
    );
  }
  return createSupabaseClient(url, key);
}
