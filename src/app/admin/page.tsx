import { redirect } from "next/navigation";
import { AlertTriangle, BriefcaseBusiness, Clock3, Database, ExternalLink, ImageIcon, Inbox, LogOut } from "lucide-react";
import { getAdminSiteContent } from "@/backend/content-repository";
import { listEnquiries, type Enquiry } from "@/backend/enquiries";
import { hasAdminSession } from "@/backend/session";
import { logoutAction } from "./actions";
import { ContentEditor } from "@/components/admin/content-editor";
import { EnquiriesPanel } from "@/components/admin/enquiries-panel";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default async function AdminPage() {
  if (!(await hasAdminSession())) redirect("/admin/login");
  const adminContent = await getAdminSiteContent();
  const databaseReady = adminContent.databaseReady;
  const mediaReady = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  let enquiries: Enquiry[] = [];
  let enquiriesError: string | null = null;
  if (databaseReady) {
    try {
      enquiries = await listEnquiries();
    } catch (error) {
      console.error("Unable to load CMS enquiries.", error);
      enquiriesError = "The enquiry inbox could not be loaded. Please refresh before making enquiry updates.";
    }
  }
  const newEnquiries = enquiries.filter((enquiry) => enquiry.status === "new").length;
  const publishedLabel = adminContent.updatedAt
    ? new Intl.DateTimeFormat("en-LK", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Colombo" }).format(new Date(adminContent.updatedAt))
    : "Not published yet";

  return (
    <main className="min-h-screen bg-[#f4f4f1] text-[#111111]">
      <header className="border-b border-[#dfdfda] bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#f97316]">ABLE CMS</p><h1 className="mt-1 text-2xl font-black tracking-[-.03em]">Website administration</h1></div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-extrabold ${databaseReady ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-900"}`}><Database aria-hidden="true" className="h-4 w-4" />{databaseReady ? "Database connected" : "Database setup needed"}</span>
            <a href="/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#dfdfda] bg-white px-4 py-2.5 text-sm font-bold hover:border-sky-300">View website <ExternalLink aria-hidden="true" className="h-4 w-4" /></a>
            <ThemeToggle className="w-full sm:w-11" />
            <form action={logoutAction}><button className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#111111] px-4 py-2.5 text-sm font-bold text-white"><LogOut aria-hidden="true" className="h-4 w-4" />Sign out</button></form>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-[1400px] px-4 pt-6 sm:px-8 sm:pt-8">
        <section aria-label="Dashboard summary" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-[#dfdfda] bg-white p-4 shadow-sm"><div className="flex items-center justify-between gap-3"><p className="text-xs font-extrabold uppercase tracking-[.12em] text-[#777771]">Publishing</p><Clock3 aria-hidden="true" className="h-5 w-5 text-[#38bdf8]" /></div><p className="mt-3 text-sm font-black">{publishedLabel}</p><p className="mt-1 text-xs text-[#777771]">Sri Lanka time</p></div>
          <div className="rounded-2xl border border-[#dfdfda] bg-white p-4 shadow-sm"><div className="flex items-center justify-between gap-3"><p className="text-xs font-extrabold uppercase tracking-[.12em] text-[#777771]">Services</p><BriefcaseBusiness aria-hidden="true" className="h-5 w-5 text-[#f97316]" /></div><p className="mt-3 text-2xl font-black">{adminContent.content.services.length}</p><p className="mt-1 text-xs text-[#777771]">Published service cards</p></div>
          <div className="rounded-2xl border border-[#dfdfda] bg-white p-4 shadow-sm"><div className="flex items-center justify-between gap-3"><p className="text-xs font-extrabold uppercase tracking-[.12em] text-[#777771]">Enquiries</p><Inbox aria-hidden="true" className="h-5 w-5 text-[#38bdf8]" /></div><p className="mt-3 text-2xl font-black">{newEnquiries}</p><p className="mt-1 text-xs text-[#777771]">New of {enquiries.length} total</p></div>
          <div className={`rounded-2xl border p-4 shadow-sm ${mediaReady ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`}><div className="flex items-center justify-between gap-3"><p className="text-xs font-extrabold uppercase tracking-[.12em] text-[#777771]">Media</p><ImageIcon aria-hidden="true" className={`h-5 w-5 ${mediaReady ? "text-green-700" : "text-amber-700"}`} /></div><p className="mt-3 text-sm font-black">{mediaReady ? "Uploads connected" : "Setup required"}</p><p className="mt-1 text-xs text-[#777771]">{mediaReady ? "Vercel Blob is ready" : "Redeploy after connecting Blob"}</p></div>
        </section>
      </div>
      <div className="mx-auto grid max-w-[1400px] gap-7 px-4 py-6 sm:px-8 sm:py-8 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="min-w-0">
          {adminContent.error ? <div className="mb-6 flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950"><AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" /><p>{adminContent.error}</p></div> : null}
          <ContentEditor initialContent={adminContent.content} databaseReady={databaseReady} mediaReady={mediaReady} storedContent={adminContent.storedContent} />
        </div>
        <aside className="space-y-7">
          <EnquiriesPanel enquiries={enquiries} databaseReady={databaseReady} error={enquiriesError} />
          <section className="rounded-2xl border border-[#dfdfda] bg-white p-6">
            <h2 className="text-lg font-black">Backend status</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#64645f]">
              <li>Database: {databaseReady ? "connection verified" : "not available"}</li>
              <li>Media uploads: {mediaReady ? "connected" : "redeploy after connecting Blob"}</li>
              <li>Admin session: secure and active</li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
