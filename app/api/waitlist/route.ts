import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendSignupConfirmation } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { parentFirstName, parentLastName, email, students, timeSlots } = body;

    // Basic server-side validation
    if (!parentFirstName || !parentLastName || !email || !students?.length || !timeSlots?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const supabase = createClient();

    // Check unsubscribes
    const { data: unsub } = await supabase
      .from('unsubscribes')
      .select('email')
      .eq('email', email.toLowerCase())
      .maybeSingle();
    // We still allow sign-up even if previously unsubscribed from emails;
    // we just won't send marketing emails. Signup is a fresh consent action.

    // Upsert parent (unique on email)
    const { data: parent, error: parentErr } = await supabase
      .from('parents')
      .upsert(
        { first_name: parentFirstName, last_name: parentLastName, email: email.toLowerCase() },
        { onConflict: 'email', ignoreDuplicates: false },
      )
      .select('parent_id')
      .single();

    if (parentErr || !parent) {
      console.error('Parent upsert error:', parentErr);
      return NextResponse.json({ error: 'Database error (parent)' }, { status: 500 });
    }

    // Create waitlist entry
    const { data: entry, error: entryErr } = await supabase
      .from('waitlist_entries')
      .insert({ parent_id: parent.parent_id })
      .select('entry_id')
      .single();

    if (entryErr || !entry) {
      console.error('Entry insert error:', entryErr);
      return NextResponse.json({ error: 'Database error (entry)' }, { status: 500 });
    }

    // Insert students
    const studentRows = students.map((s: { firstName: string; swimLevel: string }) => ({
      entry_id: entry.entry_id,
      first_name: s.firstName,
      swim_level: s.swimLevel,
    }));
    const { error: studentsErr } = await supabase.from('students').insert(studentRows);
    if (studentsErr) {
      console.error('Students insert error:', studentsErr);
    }

    // Insert time preferences
    const timeRows = (timeSlots as string[]).map((slot) => ({
      entry_id: entry.entry_id,
      slot_key: slot,
    }));
    const { error: timeErr } = await supabase.from('time_preferences').insert(timeRows);
    if (timeErr) {
      console.error('Time preferences insert error:', timeErr);
    }

    // Send confirmation email (non-blocking — don't fail submission if email fails)
    if (!unsub) {
      sendSignupConfirmation(email, parentFirstName).catch((err) =>
        console.error('Confirmation email error:', err),
      );
    }

    return NextResponse.json({ success: true, entryId: entry.entry_id });
  } catch (err) {
    console.error('Waitlist API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
