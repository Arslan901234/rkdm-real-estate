"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatusSelect({
  id,
  value,
  options,
  onChangeAction,
}: {
  id: number;
  value: string;
  options: { value: string; label: string }[];
  onChangeAction: (id: number, status: string) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      aria-label="Change status"
      value={value}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value;
        startTransition(async () => {
          await onChangeAction(id, next);
        });
      }}
      className={cn(
        "cursor-pointer rounded-lg border border-forest-900/15 bg-sand-50 px-2.5 py-1.5 text-[12px] font-bold text-forest-900 transition focus:border-gold-500 focus:outline-none disabled:opacity-50",
        value === "sold" && "bg-rose-50 text-rose-700",
        value === "limited" && "bg-amber-50 text-amber-800",
        value === "available" && "bg-emerald-50 text-emerald-800",
        value === "new" && "bg-gold-100 text-gold-800",
        value === "contacted" && "bg-sky-50 text-sky-800",
        value === "closed" && "bg-forest-100 text-forest-800"
      )}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {pending && o.value === value ? `${o.label} …` : o.label}
        </option>
      ))}
    </select>
  );
}

export function ConfirmDelete({
  action,
  id,
  what = "this project",
}: {
  action: (formData: FormData) => Promise<void>;
  id: number;
  what?: string;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (window.confirm(`Permanently delete ${what}? This cannot be undone.`)) {
          startTransition(async () => {
            await action(new FormData(e.currentTarget));
          });
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={pending}
        aria-label={`Delete ${what}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-100 disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  );
}
