import { Resend } from 'resend';

// Lazily initialised so the module doesn't throw at build time when
// RESEND_API_KEY is not present in the build environment.
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY is not set');
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

export const RECAP_RECIPIENTS = ['donmo99@gmail.com', 'lindaz.finance@gmail.com'];
export const FROM_ADDRESS = 'MoSwimming <noreply@moswimming.com>';

/* ── Confirmation email to parent on signup ──────────────────────────────── */
export async function sendSignupConfirmation(
  parentEmail: string,
  parentFirstName: string,
) {
  await getResend().emails.send({
    from: FROM_ADDRESS,
    to: parentEmail,
    subject: "You're on the MoSwimming waitlist",
    html: `
      <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; color: #1a2b2a;">
        <h2 style="color: #125669; font-size: 1.5rem;">You're on the list, ${parentFirstName}.</h2>
        <p>We'll reach out as soon as a spot opens up at Juanita High School Pool.</p>
        <p>In the meantime, you can read about our approach at <a href="https://moswimming.com/approach" style="color: #125669;">moswimming.com/approach</a>.</p>
        <p style="font-size: 0.85rem; color: #666; margin-top: 2rem;">
          MoSwimming · Juanita High School Pool, Kirkland WA<br/>
          <a href="https://moswimming.com/api/unsubscribe?email=${encodeURIComponent(parentEmail)}" style="color: #999;">Unsubscribe</a>
        </p>
      </div>
    `,
  });
}

/* ── WTP follow-up email (sent 2 days after signup) ─────────────────────── */
export async function sendWtpFollowup(
  parentEmail: string,
  parentFirstName: string,
  entryId: string,
) {
  await getResend().emails.send({
    from: FROM_ADDRESS,
    to: parentEmail,
    subject: "Quick question from MoSwimming",
    html: `
      <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; color: #1a2b2a;">
        <h2 style="color: #125669; font-size: 1.3rem;">Hey ${parentFirstName} — one quick question</h2>
        <p>We're finalising pricing for when we expand, and waitlist families get first say.</p>
        <p><strong>For a 1-hour small-group lesson, which feels right to you?</strong></p>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin: 1.5rem 0;">
          ${['$50', '$65', '$80', '$80+'].map(
            (price) =>
              `<a href="https://moswimming.com/api/wtp?entry=${entryId}&price=${encodeURIComponent(price)}"
                style="display: inline-block; padding: 0.6rem 1.4rem; background: #125669; color: #fff; border-radius: 9999px; text-decoration: none; margin-bottom: 0.5rem; font-size: 0.95rem;">
                ${price} per session
              </a><br/>`
          ).join('')}
        </div>
        <p style="font-size: 0.85rem; color: #666;">This is optional — you can ignore this email if you prefer not to answer.</p>
        <p style="font-size: 0.85rem; color: #666; margin-top: 2rem;">
          MoSwimming · Juanita High School Pool, Kirkland WA<br/>
          <a href="https://moswimming.com/api/unsubscribe?email=${encodeURIComponent(parentEmail)}" style="color: #999;">Unsubscribe</a>
        </p>
      </div>
    `,
  });
}

/* ── Weekly Friday 3pm recap email ──────────────────────────────────────── */
export interface RecapData {
  totalEntries: number;
  sundayCount: number;
  saturdayCount: number;
  seashellsCount: number;
  seahorsesCount: number;
  sealionsCount: number;
  newThisWeek: number;
  wtpBreakdown: { price: string; count: number }[];
  recentEntries: {
    parentName: string;
    email: string;
    students: string;
    slots: string;
    signedUpAt: string;
  }[];
}

export async function sendWeeklyRecap(data: RecapData) {
  const subject = `MoSwimming waitlist recap — ${data.totalEntries} total, ${data.newThisWeek} new this week`;

  const wtpRows = data.wtpBreakdown.length
    ? data.wtpBreakdown.map((r) => `<li><strong>${r.price}</strong>: ${r.count} response${r.count !== 1 ? 's' : ''}</li>`).join('')
    : '<li>No responses yet</li>';

  const entryRows = data.recentEntries
    .map(
      (e) =>
        `<tr>
          <td style="padding:4px 8px;border-bottom:1px solid #eee;">${e.parentName}</td>
          <td style="padding:4px 8px;border-bottom:1px solid #eee;">${e.email}</td>
          <td style="padding:4px 8px;border-bottom:1px solid #eee;">${e.students}</td>
          <td style="padding:4px 8px;border-bottom:1px solid #eee;">${e.slots}</td>
          <td style="padding:4px 8px;border-bottom:1px solid #eee;font-size:0.8rem;color:#666;">${e.signedUpAt}</td>
        </tr>`,
    )
    .join('');

  const html = `
    <div style="font-family: Georgia, serif; max-width: 640px; margin: 0 auto; color: #1a2b2a;">
      <h1 style="color: #125669; font-size: 1.6rem; border-bottom: 2px solid #125669; padding-bottom: 0.5rem;">
        MoSwimming Waitlist Recap
      </h1>
      <p style="color: #666; font-size: 0.85rem;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <h2 style="font-size: 1.1rem; margin-top: 1.5rem;">Executive Summary</h2>
      <ul style="line-height: 1.8;">
        <li><strong>Total waitlist entries:</strong> ${data.totalEntries}</li>
        <li><strong>New this week:</strong> ${data.newThisWeek}</li>
        <li><strong>Sunday 6–7pm interest:</strong> ${data.sundayCount}</li>
        <li><strong>Saturday 7–8pm interest:</strong> ${data.saturdayCount}</li>
      </ul>

      <h2 style="font-size: 1.1rem; margin-top: 1.5rem;">Swimmer levels</h2>
      <ul style="line-height: 1.8;">
        <li>Seashells (beginners): <strong>${data.seashellsCount}</strong></li>
        <li>Seahorses (intermediate): <strong>${data.seahorsesCount}</strong></li>
        <li>Sea Lions (advanced): <strong>${data.sealionsCount}</strong></li>
      </ul>

      <h2 style="font-size: 1.1rem; margin-top: 1.5rem;">Willingness to pay responses</h2>
      <ul style="line-height: 1.8;">${wtpRows}</ul>

      <h2 style="font-size: 1.1rem; margin-top: 1.5rem;">Recent sign-ups (last 7 days)</h2>
      ${data.recentEntries.length === 0 ? '<p style="color:#666;font-style:italic;">None this week.</p>' : `
        <table style="border-collapse: collapse; width: 100%; font-size: 0.875rem;">
          <thead>
            <tr style="background:#f0f4f4;">
              <th style="padding:6px 8px;text-align:left;">Parent</th>
              <th style="padding:6px 8px;text-align:left;">Email</th>
              <th style="padding:6px 8px;text-align:left;">Swimmers</th>
              <th style="padding:6px 8px;text-align:left;">Slots</th>
              <th style="padding:6px 8px;text-align:left;">Signed up</th>
            </tr>
          </thead>
          <tbody>${entryRows}</tbody>
        </table>
      `}

      <p style="font-size: 0.8rem; color: #999; margin-top: 2.5rem; border-top: 1px solid #eee; padding-top: 1rem;">
        This recap is sent every Friday at 3:00 PM PT. — MoSwimming automated reports
      </p>
    </div>
  `;

  await getResend().emails.send({
    from: FROM_ADDRESS,
    to: RECAP_RECIPIENTS,
    subject,
    html,
  });
}
