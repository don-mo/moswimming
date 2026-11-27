import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const supabase = createClient();
  await supabase
    .from('unsubscribes')
    .upsert({ email: email.toLowerCase() }, { onConflict: 'email', ignoreDuplicates: true });

  return NextResponse.redirect(new URL('/unsubscribed', req.url));
}
