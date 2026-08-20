import { redirect } from "next/navigation";
import { Database, ExternalLink, LogOut } from "lucide-react";
import { getSiteContent } from "@/backend/content-repository";
import { isDatabaseConfigured } from "@/backend/database";
import { listEnquiries, type Enquiry } from "@/backend/enquiries";
import { hasAdminSession } from "@/backend/session";
import { logoutAction } from "./actions";
import { ContentEditor } from "@/components/admin/content-editor";
import { EnquiriesPanel } from "@/components/admin/enquiries-panel";

export default async function AdminPage() {
  if (!(await hasAdminSession())) redirect("/admin/login");
  const databaseReady = isDatabaseConfigured();
  const content = await getSiteContent();
  let enquiries: Enquiry[] = [];
  if (databaseReady) {
    try { enquiries = await listEnquiries(); } catch { enquiries = []; }
  }

  return (
    <main className="min-h-screen bg-[#f4f4f1] text-[#111111]">
      <header className="border-b border-[#dfdfda] bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#f97316]">ABLE CMS</p><h1 className="mt-1 text-2xl font-black tracking-[-.03em]">Website administration</h1></div>
          <div className="flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-extrabold ${databaseReady ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-900"}`}><Database aria-hidden="true" className="h-4 w-4" />{databaseReady ? "Database connected" : "Database setup needed"}</span>
            <a href="/" target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-[#dfdfda] bg-white px-4 py-2.5 text-sm font-bold hover:border-sky-300">View website <ExternalLink aria-hidden="true" className="h-4 w-4" /></a>
            <form action={logoutAction}><button className="inline-flex items-center gap-2 rounded-xl bg-[#111111] px-4 py-2.5 text-sm font-bold text-white"><LogOut aria-hidden="true" className="h-4 w-4" />Sign out</button></form>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1400px] gap-7 px-5 py-8 sm:px-8 xl:grid-cols-[1fr_390px]">
        <ContentEditor initialContent={content} databaseReady={databaseReady} mediaReady={Boolean(process.env.BLOB_READ_WRITE_TOKEN)} />
        <aside className="space-y-7">
          <EnquiriesPanel enquiries={enquiries} databaseReady={databaseReady} />
          <section className="rounded-2xl border border-[#dfdfda] bg-white p-6">
            <h2 className="text-lg font-black">Backend status</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#64645f]">
              <li>Database: {databaseReady ? "connected" : "add DATABASE_URL"}</li>
              <li>Media uploads: {process.env.BLOB_READ_WRITE_TOKEN ? "connected" : "add a Vercel Blob store"}</li>
              <li>Admin session: secure and active</li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
