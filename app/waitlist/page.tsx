'use client';

import { useState } from 'react';
import { useLang } from '@/lib/i18n/LanguageContext';

interface Student {
  firstName: string;
  swimLevel: '' | 'seashells' | 'seahorses' | 'sealions';
}

type TimeSlot = 'sunday_6pm' | 'saturday_7pm';

interface FormState {
  parentFirstName: string;
  parentLastName: string;
  email: string;
  students: Student[];
  timeSlots: TimeSlot[];
}

interface FormErrors {
  parentFirstName?: string;
  parentLastName?: string;
  email?: string;
  students?: (Partial<Student> | undefined)[];
  timeSlots?: string;
}

const INITIAL_FORM: FormState = {
  parentFirstName: '',
  parentLastName: '',
  email: '',
  students: [{ firstName: '', swimLevel: '' }],
  timeSlots: [],
};

function SuccessScreen() {
  const { t } = useLang();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}
    >
      {/* Animated checkmark */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        aria-hidden="true"
        style={{ marginBottom: '1.5rem' }}
      >
        <circle
          className="success-circle"
          cx="40"
          cy="40"
          r="36"
          stroke="oklch(0.72 0.18 155)"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="success-check"
          d="M24 40l12 12 20-22"
          stroke="oklch(0.72 0.18 155)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      <div className="success-message">
        <h2
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: '2rem',
            color: 'oklch(0.96 0.01 210)',
            marginBottom: '0.75rem',
          }}
        >
          {t.waitlist.successTitle}
        </h2>
        <p style={{ color: 'oklch(0.72 0.04 210)', fontSize: '1.05rem', maxWidth: '32rem' }}>
          {t.waitlist.successBody}
        </p>
      </div>
    </div>
  );
}

export default function WaitlistPage() {
  const { t } = useLang();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  /* ── Validation ──────────────────────────────────────── */
  function validate(): boolean {
    const errs: FormErrors = {};
    let valid = true;

    if (!form.parentFirstName.trim()) {
      errs.parentFirstName = t.waitlist.fieldRequired;
      valid = false;
    }
    if (!form.parentLastName.trim()) {
      errs.parentLastName = t.waitlist.fieldRequired;
      valid = false;
    }
    if (!form.email.trim()) {
      errs.email = t.waitlist.fieldRequired;
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = t.waitlist.emailInvalid;
      valid = false;
    }

    const studentErrors = form.students.map((s) => {
      const e: Partial<Student> = {};
      if (!s.firstName.trim()) e.firstName = t.waitlist.fieldRequired;
      if (!s.swimLevel) e.swimLevel = t.waitlist.selectLevel as '';
      return Object.keys(e).length ? e : undefined;
    });
    if (studentErrors.some(Boolean)) {
      errs.students = studentErrors;
      valid = false;
    }

    if (form.timeSlots.length === 0) {
      errs.timeSlots = t.waitlist.selectTime;
      valid = false;
    }

    setErrors(errs);
    return valid;
  }

  /* ── Submit ──────────────────────────────────────────── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Server error');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : t.waitlist.errorGeneric);
    }
  }

  /* ── Student helpers ─────────────────────────────────── */
  function addStudent() {
    setForm((f) => ({
      ...f,
      students: [...f.students, { firstName: '', swimLevel: '' }],
    }));
  }
  function removeStudent(idx: number) {
    setForm((f) => ({
      ...f,
      students: f.students.filter((_, i) => i !== idx),
    }));
  }
  function updateStudent(idx: number, field: keyof Student, value: string) {
    setForm((f) => ({
      ...f,
      students: f.students.map((s, i) => (i === idx ? { ...s, [field]: value } : s)),
    }));
  }

  /* ── Time slot toggle ────────────────────────────────── */
  function toggleSlot(slot: TimeSlot) {
    setForm((f) => ({
      ...f,
      timeSlots: f.timeSlots.includes(slot)
        ? f.timeSlots.filter((s) => s !== slot)
        : [...f.timeSlots, slot],
    }));
  }

  if (status === 'success') {
    return (
      <section style={{ backgroundColor: 'oklch(0.30 0.07 214)', minHeight: '70dvh', display: 'flex', alignItems: 'center' }}>
        <div className="container"><SuccessScreen /></div>
      </section>
    );
  }

  const sectionHeadStyle: React.CSSProperties = {
    fontFamily: 'var(--font-fraunces)',
    fontSize: '1.1rem',
    color: 'oklch(0.96 0.01 210)',
    marginBottom: '1.25rem',
    paddingBottom: '0.6rem',
    borderBottom: '1px solid oklch(0.40 0.04 210)',
  };

  return (
    <>
      {/* Page header */}
      <section style={{ backgroundColor: 'oklch(0.30 0.07 214)', padding: '5rem 0 3rem' }}>
        <div className="container" style={{ maxWidth: '42rem' }}>
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
            Waitlist
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              color: 'oklch(0.96 0.01 210)',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            {t.waitlist.pageTitle}
          </h1>
          <p style={{ color: 'oklch(0.72 0.04 210)', fontSize: '1.05rem', lineHeight: 1.65 }}>
            {t.waitlist.intro}
          </p>
        </div>
      </section>

      {/* Form */}
      <section style={{ backgroundColor: 'oklch(0.28 0.07 212)', padding: '3rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: '42rem' }}>
          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* ── Parent info ── */}
            <div
              style={{
                backgroundColor: 'oklch(0.33 0.06 210)',
                border: '1px solid oklch(0.40 0.04 210)',
                borderRadius: '1rem',
                padding: '1.75rem',
              }}
            >
              <h2 style={sectionHeadStyle}>{t.waitlist.parentSection}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label" htmlFor="parent-first">{t.waitlist.firstName} *</label>
                  <input
                    id="parent-first"
                    className="form-input"
                    type="text"
                    autoComplete="given-name"
                    value={form.parentFirstName}
                    onChange={(e) => setForm((f) => ({ ...f, parentFirstName: e.target.value }))}
                    aria-describedby={errors.parentFirstName ? 'err-pfirst' : undefined}
                    aria-invalid={!!errors.parentFirstName}
                  />
                  {errors.parentFirstName && (
                    <p id="err-pfirst" style={{ color: 'oklch(0.65 0.20 25)', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                      {errors.parentFirstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="form-label" htmlFor="parent-last">{t.waitlist.lastName} *</label>
                  <input
                    id="parent-last"
                    className="form-input"
                    type="text"
                    autoComplete="family-name"
                    value={form.parentLastName}
                    onChange={(e) => setForm((f) => ({ ...f, parentLastName: e.target.value }))}
                    aria-describedby={errors.parentLastName ? 'err-plast' : undefined}
                    aria-invalid={!!errors.parentLastName}
                  />
                  {errors.parentLastName && (
                    <p id="err-plast" style={{ color: 'oklch(0.65 0.20 25)', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                      {errors.parentLastName}
                    </p>
                  )}
                </div>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <label className="form-label" htmlFor="email">{t.waitlist.email} *</label>
                <input
                  id="email"
                  className="form-input"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  aria-describedby={errors.email ? 'err-email' : undefined}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p id="err-email" style={{ color: 'oklch(0.65 0.20 25)', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* ── Students ── */}
            <div
              style={{
                backgroundColor: 'oklch(0.33 0.06 210)',
                border: '1px solid oklch(0.40 0.04 210)',
                borderRadius: '1rem',
                padding: '1.75rem',
              }}
            >
              <h2 style={sectionHeadStyle}>{t.waitlist.studentsSection}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {form.students.map((student, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'oklch(0.36 0.05 210)',
                      border: '1px solid oklch(0.42 0.04 210)',
                      borderRadius: '0.75rem',
                      padding: '1.25rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ color: 'oklch(0.72 0.13 185)', fontWeight: 600, fontSize: '0.85rem' }}>
                        Swimmer {idx + 1}
                      </span>
                      {form.students.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStudent(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'oklch(0.58 0.03 210)',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            padding: '0.2rem 0.5rem',
                          }}
                        >
                          {t.waitlist.removeStudent}
                        </button>
                      )}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label className="form-label" htmlFor={`student-name-${idx}`}>{t.waitlist.studentName} *</label>
                        <input
                          id={`student-name-${idx}`}
                          className="form-input"
                          type="text"
                          value={student.firstName}
                          onChange={(e) => updateStudent(idx, 'firstName', e.target.value)}
                          aria-invalid={!!errors.students?.[idx]?.firstName}
                        />
                        {errors.students?.[idx]?.firstName && (
                          <p style={{ color: 'oklch(0.65 0.20 25)', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                            {errors.students[idx]!.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="form-label" htmlFor={`student-level-${idx}`}>{t.waitlist.swimLevel} *</label>
                        <select
                          id={`student-level-${idx}`}
                          className="form-select"
                          value={student.swimLevel}
                          onChange={(e) => updateStudent(idx, 'swimLevel', e.target.value)}
                          aria-invalid={!!errors.students?.[idx]?.swimLevel}
                        >
                          <option value="" disabled>{t.waitlist.levelsLabel}</option>
                          <option value="seashells">{t.waitlist.seashells}</option>
                          <option value="seahorses">{t.waitlist.seahorses}</option>
                          <option value="sealions">{t.waitlist.sealions}</option>
                        </select>
                        {errors.students?.[idx]?.swimLevel && (
                          <p style={{ color: 'oklch(0.65 0.20 25)', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                            {errors.students[idx]!.swimLevel}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addStudent}
                  style={{
                    background: 'none',
                    border: '1.5px dashed oklch(0.52 0.06 210)',
                    borderRadius: '0.75rem',
                    padding: '0.85rem',
                    color: 'oklch(0.72 0.13 185)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'oklch(0.36 0.05 210)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  {t.waitlist.addStudent}
                </button>
              </div>
            </div>

            {/* ── Time slots ── */}
            <div
              style={{
                backgroundColor: 'oklch(0.33 0.06 210)',
                border: '1px solid oklch(0.40 0.04 210)',
                borderRadius: '1rem',
                padding: '1.75rem',
              }}
            >
              <h2 style={sectionHeadStyle}>{t.waitlist.timesSection}</h2>
              <p style={{ color: 'oklch(0.65 0.03 210)', fontSize: '0.875rem', marginBottom: '1.25rem', marginTop: '-0.5rem' }}>
                {t.waitlist.timesNote}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {([
                  { id: 'sunday_6pm' as TimeSlot, label: t.waitlist.sunday },
                  { id: 'saturday_7pm' as TimeSlot, label: t.waitlist.saturday },
                ]).map(({ id, label }) => {
                  const checked = form.timeSlots.includes(id);
                  return (
                    <label
                      key={id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.875rem 1rem',
                        borderRadius: '0.6rem',
                        backgroundColor: checked ? 'oklch(0.38 0.08 293 / 0.25)' : 'oklch(0.36 0.05 210)',
                        border: `1.5px solid ${checked ? 'oklch(0.58 0.26 293)' : 'oklch(0.42 0.04 210)'}`,
                        cursor: 'pointer',
                        transition: 'background 0.15s, border-color 0.15s',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSlot(id)}
                        style={{ accentColor: 'oklch(0.58 0.26 293)', width: '1rem', height: '1rem' }}
                      />
                      <span style={{ color: 'oklch(0.90 0.02 210)', fontWeight: checked ? 600 : 400 }}>
                        {label}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.timeSlots && (
                <p style={{ color: 'oklch(0.65 0.20 25)', fontSize: '0.8rem', marginTop: '0.75rem' }}>
                  {errors.timeSlots}
                </p>
              )}
            </div>

            {/* ── Promise + pricing note ── */}
            <div
              style={{
                backgroundColor: 'oklch(0.36 0.08 293 / 0.15)',
                border: '1px solid oklch(0.52 0.12 293 / 0.4)',
                borderRadius: '0.75rem',
                padding: '1.25rem 1.5rem',
              }}
            >
              <p style={{ color: 'oklch(0.82 0.04 293)', fontStyle: 'italic', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
                {t.waitlist.promise}
              </p>
              <p style={{ color: 'oklch(0.65 0.03 210)', fontSize: '0.82rem', marginTop: '0.6rem', marginBottom: 0 }}>
                {t.waitlist.pricingNote}
              </p>
            </div>

            {/* ── Error ── */}
            {status === 'error' && (
              <div
                style={{
                  backgroundColor: 'oklch(0.25 0.08 25)',
                  border: '1px solid oklch(0.40 0.15 25)',
                  borderRadius: '0.75rem',
                  padding: '1rem 1.25rem',
                  color: 'oklch(0.82 0.12 25)',
                  fontSize: '0.9rem',
                }}
              >
                {errorMsg || t.waitlist.errorGeneric}
              </div>
            )}

            {/* ── Submit ── */}
            <button
              type="submit"
              className="btn-cta"
              disabled={status === 'submitting'}
              style={{ fontSize: '1.05rem', padding: '1rem 2rem', justifyContent: 'center', opacity: status === 'submitting' ? 0.7 : 1 }}
            >
              {status === 'submitting' ? t.waitlist.submitting : t.waitlist.submit}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
