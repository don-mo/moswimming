import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendWtpFollowup } from '@/lib/email';

/**
 * Vercel cron job — runs every hour.
 * Finds waitlist entries older than 2 days with no WTP email sent,
 * and sends the willingness-to-pay follow-up.
 */
export async function GET(req: Request) {
  // Verify cron secret to prevent public triggering
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();

  // Find entries older than 2 days, no WTP email sent, parent not unsubscribed
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();

  const { data: entries, error } = await supabase
    .from('waitlist_entries')
    .select(`
      entry_id,
      parents!inner (first_name, email)
    `)
    .is('wtp_email_sent_at', null)
    .lte('created_at', twoDaysAgo)
    .limit(50); // process in batches

  if (error) {
    console.error('WTP cron query error:', error);
    return NextResponse.json({ error: 'Query error' }, { status: 500 });
  }

  if (!entries || entries.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  let sent = 0;
  const errors: string[] = [];

  for (const entry of entries) {
    const parent = Array.isArray(entry.parents) ? entry.parents[0] : entry.parents;
    if (!parent?.email) continue;

    // Check unsubscribes
    const { data: unsub } = await supabase
      .from('unsubscribes')
      .select('email')
      .eq('email', parent.email)
      .maybeSingle();
    if (unsub) {
      // Mark as sent so we don't retry
      await supabase
        .from('waitlist_entries')
        .update({ wtp_email_sent_at: new Date().toISOString() })
        .eq('entry_id', entry.entry_id);
      continue;
    }

    try {
      await sendWtpFollowup(parent.email, parent.first_name, entry.entry_id);
      await supabase
        .from('waitlist_entries')
        .update({ wtp_email_sent_at: new Date().toISOString() })
        .eq('entry_id', entry.entry_id);
      sent++;
    } catch (err) {
      errors.push(`${entry.entry_id}: ${err}`);
    }
  }

  return NextResponse.json({ sent, errors });
}
