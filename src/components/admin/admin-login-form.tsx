"use client";

import { useActionState } from "react";
import { LockKeyhole } from "lucide-react";
import { loginAction } from "@/app/admin/actions";
import { initialActionState } from "./action-state";

export function AdminLoginForm({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState(loginAction, initialActionState);
  return (
    <form action={action} className="mt-8">
      <label className="text-sm font-bold text-white/75">Admin password
        <input type="password" name="password" autoComplete="current-password" required disabled={!configured} className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-white outline-none focus:border-[#38bdf8] focus:ring-4 focus:ring-sky-400/10" />
      </label>
      <button disabled={pending || !configured} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f97316] px-5 py-4 text-sm font-extrabold transition hover:bg-[#e9640e] disabled:cursor-not-allowed disabled:opacity-45"><LockKeyhole aria-hidden="true" className="h-4 w-4" />{pending ? "Signing in…" : "Sign in"}</button>
      {!configured ? <p className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/10 p-4 text-xs leading-5 text-amber-100">Admin access is safely disabled until `DATABASE_URL`, `ADMIN_PASSWORD` and a 32+ character `SESSION_SECRET` are added in Vercel.</p> : null}
      {state.message ? <p role="status" className={`mt-4 text-sm ${state.status === "error" ? "text-red-300" : "text-green-300"}`}>{state.message}</p> : null}
    </form>
  );
}
