"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitInquiry } from "@/lib/actions";
import { initialFormState } from "@/lib/form-state";
import { BRAND } from "@/lib/brand";
import { WhatsAppIcon } from "@/components/social-icons";
import { PROJECT_TYPES } from "@/lib/utils";

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitInquiry, initialFormState);

  if (state.status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-white p-10 text-center ring-1 ring-forest-950/8">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-800 text-gold-300">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-medium text-forest-950">
          Enquiry received
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-500">{state.message}</p>
        <a
          href={BRAND.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="btn-whatsapp mt-7 !px-5 !py-2.5 text-[13px]"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-2xl bg-white p-6 ring-1 ring-forest-950/8 sm:p-8">
      <input type="hidden" name="type" value="contact" />
      <h2 className="font-display text-2xl font-medium text-forest-950">Send us an enquiry</h2>
      <p className="mt-2 text-sm text-ink-500">
        We usually respond the same day during working hours.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="input-label">Full Name *</label>
          <input id="cf-name" name="name" required minLength={2} maxLength={80} className="input" placeholder="Your name" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="cf-phone" className="input-label">Phone *</label>
          <input id="cf-phone" name="phone" required type="tel" inputMode="tel" className="input" placeholder="10-digit mobile number" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="cf-email" className="input-label">Email (optional)</label>
          <input id="cf-email" name="email" type="email" className="input" placeholder="you@example.com" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="cf-interest" className="input-label">I&apos;m interested in</label>
          <select id="cf-interest" name="projectName" className="input" defaultValue="">
            <option value="">General Enquiry</option>
            {Object.values(PROJECT_TYPES).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="input-label">Message</label>
          <textarea id="cf-message" name="message" rows={4} className="input resize-none" placeholder="Tell us what you're looking for — location, budget, plot size…" />
        </div>
      </div>

      {state.status === "error" && (
        <p role="alert" className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 ring-1 ring-rose-200">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn-forest mt-6 w-full disabled:opacity-60">
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {pending ? "Sending…" : "Submit Enquiry"}
      </button>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-500/80">
        By submitting, you agree to be contacted by RKDM Real Estate regarding
        your enquiry.
      </p>
    </form>
  );
}
