import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendWeeklyRecap, type RecapData } from '@/lib/email';

/**
 * Vercel cron job — runs every Friday at 3:00 PM PT (23:00 UTC in winter, 22:00 in summer).
 * Sends a waitlist summary email to Don and Linda.
 */
export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // Total entries
  const { count: totalEntries } = await supabase
    .from('waitlist_entries')
    .select('*', { count: 'exact', head: true });

  // New this week
  const { count: newThisWeek } = await supabase
    .from('waitlist_entries')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo);

  // Time slot breakdown
  const { data: timeData } = await supabase
    .from('time_preferences')
    .select('slot_key');

  const sundayCount = timeData?.filter((r) => r.slot_key === 'sunday_6pm').length ?? 0;
  const saturdayCount = timeData?.filter((r) => r.slot_key === 'saturday_7pm').length ?? 0;

  // Swimmer level breakdown
  const { data: studentData } = await supabase.from('students').select('swim_level');
  const seashellsCount = studentData?.filter((s) => s.swim_level === 'seashells').length ?? 0;
  const seahorsesCount = studentData?.filter((s) => s.swim_level === 'seahorses').length ?? 0;
  const sealionsCount = studentData?.filter((s) => s.swim_level === 'sealions').length ?? 0;

  // WTP breakdown
  const { data: wtpData } = await supabase
    .from('wtp_responses')
    .select('price_choice');

  const wtpMap: Record<string, number> = {};
  for (const r of wtpData ?? []) {
    wtpMap[r.price_choice] = (wtpMap[r.price_choice] ?? 0) + 1;
  }
  const wtpBreakdown = Object.entries(wtpMap)
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([price, count]) => ({ price, count }));

  // Recent entries (last 7 days)
  const { data: recentRaw } = await supabase
    .from('waitlist_entries')
    .select(`
      entry_id,
      created_at,
      parents!inner (first_name, last_name, email),
      students (first_name, swim_level),
      time_preferences (slot_key)
    `)
    .gte('created_at', sevenDaysAgo)
    .order('created_at', { ascending: false });

  const recentEntries = (recentRaw ?? []).map((e) => {
    const parent = Array.isArray(e.parents) ? e.parents[0] : e.parents;
    const students = (e.students ?? []) as { first_name: string; swim_level: string }[];
    const slots = (e.time_preferences ?? []) as { slot_key: string }[];
    return {
      parentName: `${parent?.first_name ?? ''} ${parent?.last_name ?? ''}`.trim(),
      email: parent?.email ?? '',
      students: students.map((s) => `${s.first_name} (${s.swim_level})`).join(', '),
      slots: slots.map((s) => (s.slot_key === 'sunday_6pm' ? 'Sun 6pm' : 'Sat 7pm')).join(', '),
      signedUpAt: new Date(e.created_at).toLocaleDateString('en-US'),
    };
  });

  const recapData: RecapData = {
    totalEntries: totalEntries ?? 0,
    sundayCount,
    saturdayCount,
    seashellsCount,
    seahorsesCount,
    sealionsCount,
    newThisWeek: newThisWeek ?? 0,
    wtpBreakdown,
    recentEntries,
  };

  try {
    await sendWeeklyRecap(recapData);
    return NextResponse.json({ success: true, totalEntries });
  } catch (err) {
    console.error('Weekly recap email error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
