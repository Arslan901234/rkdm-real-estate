"use client";

import { useActionState } from "react";
import { CalendarCheck, CheckCircle2, Loader2 } from "lucide-react";
import { submitInquiry } from "@/lib/actions";
import { initialFormState } from "@/lib/form-state";
import { BRAND } from "@/lib/brand";

export default function SiteVisitForm({
  projects,
  defaultProject = "",
}: {
  projects: { name: string; location: string }[];
  defaultProject?: string;
}) {
  const [state, action, pending] = useActionState(submitInquiry, initialFormState);
  const today = new Date().toISOString().split("T")[0];

  if (state.status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-white p-10 text-center ring-1 ring-forest-950/8">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-800 text-gold-300">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-medium text-forest-950">
          Visit request received
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-500">{state.message}</p>
        <p className="mt-4 text-[12px] text-ink-500/80">
          Need to reach us sooner? Call{" "}
          <a href={BRAND.tel} className="font-bold text-forest-800 underline-offset-2 hover:underline">
            {BRAND.phone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-2xl bg-white p-6 ring-1 ring-forest-950/8 sm:p-8">
      <input type="hidden" name="type" value="site-visit" />
      <h2 className="font-display text-2xl font-medium text-forest-950">Book a site visit</h2>
      <p className="mt-2 text-sm text-ink-500">
        Fields marked * are required. We&apos;ll call to confirm your slot.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="sv-project" className="input-label">Project / Property</label>
          <select id="sv-project" name="projectName" className="input" defaultValue={defaultProject}>
            <option value="">Not sure yet — suggest options for me</option>
            {projects.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name} — {p.location}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sv-name" className="input-label">Full Name *</label>
          <input id="sv-name" name="name" required minLength={2} maxLength={80} className="input" placeholder="Your name" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="sv-phone" className="input-label">Phone *</label>
          <input id="sv-phone" name="phone" required type="tel" inputMode="tel" className="input" placeholder="10-digit mobile number" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="sv-email" className="input-label">Email (optional)</label>
          <input id="sv-email" name="email" type="email" className="input" placeholder="you@example.com" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="sv-date" className="input-label">Preferred Date *</label>
          <input id="sv-date" name="preferredDate" required type="date" min={today} className="input" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="sv-time" className="input-label">Preferred Time</label>
          <select id="sv-time" name="preferredTime" className="input" defaultValue="Morning">
            <option>Morning (9 AM – 12 PM)</option>
            <option>Afternoon (12 PM – 3 PM)</option>
            <option>Evening (3 PM – 6 PM)</option>
            <option>Flexible — call me to plan</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="sv-message" className="input-label">Anything we should know?</label>
          <textarea id="sv-message" name="message" rows={3} className="input resize-none" placeholder="Number of visitors, pickup point, specific questions…" />
        </div>
      </div>

      {state.status === "error" && (
        <p role="alert" className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 ring-1 ring-rose-200">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn-gold mt-6 w-full disabled:opacity-60">
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
        {pending ? "Submitting…" : "Request Site Visit"}
      </button>
    </form>
  );
}
