"use client";

import { useActionState, useEffect } from "react";
import { LockKeyhole } from "lucide-react";
import { loginAction } from "@/app/admin/actions";
import { initialActionState } from "./action-state";
import { resetTurnstile, TurnstileWidget } from "@/components/ui/turnstile-widget";

export function AdminLoginForm({ configured, turnstileSiteKey, developmentBypass }: { configured: boolean; turnstileSiteKey: string; developmentBypass: boolean }) {
  const [state, action, pending] = useActionState(loginAction, initialActionState);
  useEffect(() => { if (state.status === "error") resetTurnstile(); }, [state.status]);
  return (
    <form action={action} className="mt-8">
      <label className="text-sm font-bold text-white/75">Admin password
        <input type="password" name="password" autoComplete="current-password" required disabled={!configured} className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-base text-white outline-none focus:border-[#38bdf8] focus:ring-4 focus:ring-sky-400/10" />
      </label>
      <div className="mt-5">{turnstileSiteKey ? <TurnstileWidget siteKey={turnstileSiteKey} action="admin-login" /> : developmentBypass ? null : <p className="rounded-xl border border-amber-300/20 bg-amber-300/10 p-4 text-xs leading-5 text-amber-100">The security check has not been configured.</p>}</div>
      <button disabled={pending || !configured} className="btn btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-45"><LockKeyhole aria-hidden="true" className="h-4 w-4" />{pending ? "Signing in…" : "Sign in"}</button>
      {!configured ? <p className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/10 p-4 text-xs leading-5 text-amber-100">Admin access is safely disabled until the database, password hash, session secret and security check are configured.</p> : null}
      {state.message ? <p role="status" className={`mt-4 text-sm ${state.status === "error" ? "text-red-300" : "text-green-300"}`}>{state.message}</p> : null}
    </form>
  );
}
