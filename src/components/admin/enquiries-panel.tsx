"use client";

import { useActionState } from "react";
import { Mail, Phone, Save } from "lucide-react";
import { updateEnquiryAction } from "@/app/admin/actions";
import type { Enquiry } from "@/backend/enquiries";
import { initialActionState } from "./action-state";

export function EnquiriesPanel({ enquiries, databaseReady }: { enquiries: Enquiry[]; databaseReady: boolean }) {
  return (
    <section className="rounded-2xl border border-[#dfdfda] bg-white p-5 sm:p-6">
      <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#38bdf8]">Inbox</p><h2 className="mt-1 text-xl font-black">Quote enquiries</h2></div><span className="rounded-full bg-[#111111] px-3 py-1 text-xs font-black text-white">{enquiries.length}</span></div>
      {!databaseReady ? <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-950">Enquiries will appear after the database is connected.</p> : enquiries.length === 0 ? <p className="mt-5 rounded-xl bg-[#f7f7f5] p-4 text-sm text-[#64645f]">No enquiries yet.</p> : <div className="mt-5 space-y-4">{enquiries.map((enquiry) => <EnquiryCard key={enquiry.id} enquiry={enquiry} />)}</div>}
    </section>
  );
}

function EnquiryCard({ enquiry }: { enquiry: Enquiry }) {
  const [state, action, pending] = useActionState(updateEnquiryAction, initialActionState);
  return (
    <article className="rounded-xl border border-[#e7e7e3] bg-[#fafaf8] p-4">
      <div className="flex flex-wrap items-start justify-between gap-2"><div><h3 className="font-black">{enquiry.name}</h3><p className="mt-1 text-xs font-bold text-[#f97316]">{enquiry.service}</p></div><time className="text-[11px] text-[#888880]" dateTime={enquiry.created_at}>{new Date(enquiry.created_at).toLocaleString("en-LK")}</time></div>
      <div className="mt-3 space-y-1 text-xs text-[#64645f]"><a href={`tel:${enquiry.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 hover:text-black"><Phone aria-hidden="true" className="h-3.5 w-3.5" />{enquiry.phone}</a>{enquiry.email ? <a href={`mailto:${enquiry.email}`} className="flex items-center gap-2 break-all hover:text-black"><Mail aria-hidden="true" className="h-3.5 w-3.5" />{enquiry.email}</a> : null}</div>
      <p className="mt-3 whitespace-pre-wrap rounded-lg bg-white p-3 text-xs leading-5 text-[#4f4f4a]">{enquiry.message}</p>
      <form action={action} className="mt-3 space-y-3">
        <input type="hidden" name="id" value={enquiry.id} />
        <select name="status" defaultValue={enquiry.status} className="w-full rounded-lg border border-[#d9d9d4] bg-white px-3 py-2.5 text-xs font-bold"><option value="new">New</option><option value="contacted">Contacted</option><option value="quoted">Quoted</option><option value="closed">Closed</option><option value="spam">Spam</option></select>
        <textarea name="notes" defaultValue={enquiry.admin_notes} rows={2} placeholder="Private admin notes" className="w-full rounded-lg border border-[#d9d9d4] bg-white px-3 py-2.5 text-xs outline-none focus:border-sky-400" />
        <div className="flex items-center justify-between gap-2"><span className={`text-[11px] ${state.status === "error" ? "text-red-700" : "text-green-700"}`}>{state.message}</span><button disabled={pending} className="inline-flex items-center gap-1.5 rounded-lg bg-[#111111] px-3 py-2 text-xs font-bold text-white"><Save aria-hidden="true" className="h-3.5 w-3.5" />{pending ? "Saving…" : "Update"}</button></div>
      </form>
    </article>
  );
}
