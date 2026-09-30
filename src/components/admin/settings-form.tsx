"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2, Save } from "lucide-react";
import { saveSettings } from "@/app/admin/actions";
import { adminInitialState } from "@/lib/form-state";

export default function SettingsForm({ initial }: { initial: Record<string, string> }) {
  const [state, action, pending] = useActionState(saveSettings, adminInitialState);

  return (
    <form action={action} className="space-y-5">
      {state.status === "success" && (
        <p className="flex items-center gap-2.5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200">
          <CheckCircle2 className="h-4.5 w-4.5" />
          {state.message}
        </p>
      )}
      {state.status === "error" && (
        <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 ring-1 ring-rose-200">
          {state.message}
        </p>
      )}

      <div className="rounded-2xl bg-white p-6 ring-1 ring-forest-950/8 sm:p-7">
        <h2 className="font-display text-lg font-medium text-forest-950">Customer-Facing Office</h2>
        <p className="mt-1 text-[12px] leading-relaxed text-ink-500">
          Shown on the Contact page and in the website footer. Update this
          whenever the visiting office changes — no code changes needed.
        </p>
        <div className="mt-5">
          <label htmlFor="customerOffice" className="input-label">Office Address</label>
          <textarea
            id="customerOffice"
            name="customerOffice"
            rows={3}
            defaultValue={initial.customerOffice ?? "F-11, Pratibha Complex"}
            className="input resize-y"
            placeholder="F-11, Pratibha Complex"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="officeMapQuery" className="input-label">Google Maps Search Query</label>
          <input
            id="officeMapQuery"
            name="officeMapQuery"
            defaultValue={initial.officeMapQuery ?? ""}
            className="input"
            placeholder="e.g. Nava Vatva, Ahmedabad, Gujarat 382445"
          />
          <p className="mt-1.5 text-[11px] text-ink-500/80">
            Controls the embedded map on the Contact page. Leave blank to use the registered office address.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 ring-1 ring-forest-950/8 sm:p-7">
        <h2 className="font-display text-lg font-medium text-forest-950">YouTube Channel</h2>
        <p className="mt-1 text-[12px] leading-relaxed text-ink-500">
          Link used on the Videos page. Paste your channel URL when ready.
        </p>
        <div className="mt-5">
          <label htmlFor="youtubeUrl" className="input-label">YouTube URL</label>
          <input
            id="youtubeUrl"
            name="youtubeUrl"
            defaultValue={initial.youtubeUrl ?? ""}
            className="input"
            placeholder="https://www.youtube.com/@yourchannel"
          />
        </div>
      </div>

      <button type="submit" disabled={pending} className="btn-forest disabled:opacity-60">
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {pending ? "Saving…" : "Save Settings"}
      </button>
    </form>
  );
}
