import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Called when a parent clicks a WTP price link in their follow-up email.
 * Records the response and redirects to a thank-you page.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const entryId = searchParams.get('entry');
  const price = searchParams.get('price');

  const validPrices = ['$50', '$65', '$80', '$80+'];
  if (!entryId || !price || !validPrices.includes(price)) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  const supabase = createClient();

  // Upsert so a parent can change their answer
  await supabase.from('wtp_responses').upsert(
    { entry_id: entryId, price_choice: price },
    { onConflict: 'entry_id' },
  );

  // Redirect to a simple thank-you page
  return NextResponse.redirect(new URL('/wtp-thanks', req.url));
}
