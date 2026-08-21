import { redirect } from "next/navigation";
import { hasAdminSession, isAdminConfigured } from "@/backend/session";
import { isDatabaseConfigured } from "@/backend/database";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { isTurnstileConfigured } from "@/backend/turnstile";

export default async function AdminLoginPage() {
  if (await hasAdminSession()) redirect("/admin");
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111310] p-5 text-white">
      <div className="architectural-grid absolute inset-0 opacity-15" />
      <div className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
      <ThemeToggle className="absolute right-5 top-5 border-white/20 bg-[#191919] text-white" />
      <div className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-[#1b1d1a]/95 p-7 shadow-2xl backdrop-blur sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f97316] text-xl font-black shadow-[inset_-8px_0_0_#38bdf8]">A</div>
        <p className="mt-8 text-xs font-extrabold uppercase tracking-[.18em] text-[#38bdf8]">ABLE Property Maintenance</p>
        <h1 className="mt-3 text-3xl font-black tracking-[-.04em]">Content management</h1>
        <p className="mt-3 text-sm leading-6 text-white/55">Sign in to update website content, upload project images and manage quote enquiries.</p>
        <AdminLoginForm configured={isAdminConfigured() && isDatabaseConfigured() && isTurnstileConfigured()} turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""} developmentBypass={process.env.NODE_ENV !== "production" && process.env.TURNSTILE_DEV_BYPASS === "true"} />
      </div>
    </main>
  );
}
