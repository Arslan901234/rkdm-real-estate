"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole } from "lucide-react";
import { loginAdmin } from "@/app/admin/actions";
import { adminInitialState } from "@/lib/form-state";
import { LogoMark } from "@/components/logo";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAdmin, adminInitialState);
  const router = useRouter();

  useEffect(() => {
    if (state.status === "success") router.refresh();
  }, [state, router]);

  return (
    <div className="grain flex min-h-[80svh] items-center justify-center bg-forest-950 px-5">
      <form
        action={action}
        className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
      >
        <div className="flex flex-col items-center text-center">
          <LogoMark />
          <h1 className="mt-5 font-display text-2xl font-medium text-white">RKDM Admin</h1>
          <p className="mt-1.5 text-[13px] text-sand-100/55">
            Sign in to manage projects, inquiries and settings.
          </p>
        </div>
        <label htmlFor="passcode" className="mt-7 block text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-400">
          Admin Passcode
        </label>
        <input
          id="passcode"
          name="passcode"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Enter passcode"
          className="mt-2 w-full rounded-xl border border-white/15 bg-forest-950/60 px-4 py-3 text-sm text-white placeholder:text-sand-100/35 focus:border-gold-400 focus:outline-none"
        />
        {state.status === "error" && (
          <p role="alert" className="mt-3 rounded-lg bg-rose-500/15 px-3.5 py-2.5 text-[13px] font-semibold text-rose-200 ring-1 ring-rose-400/30">
            {state.message}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="btn-gold mt-5 w-full disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
          {pending ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
