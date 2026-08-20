"use client";

import { useActionState, useMemo, useState } from "react";
import { Mail, Phone, Save, Search } from "lucide-react";
import { updateEnquiryAction } from "@/app/admin/actions";
import type { Enquiry } from "@/backend/enquiries";
import { initialActionState } from "./action-state";

export function EnquiriesPanel({ enquiries, databaseReady, error }: { enquiries: Enquiry[]; databaseReady: boolean; error: string | null }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const filteredEnquiries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return enquiries.filter((enquiry) => {
      const matchesStatus = statusFilter === "all" || enquiry.status === statusFilter;
      const matchesQuery = !normalizedQuery || [enquiry.name, enquiry.phone, enquiry.email ?? "", enquiry.service, enquiry.message].some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesStatus && matchesQuery;
    });
  }, [enquiries, query, statusFilter]);

  return (
    <section className="rounded-2xl border border-[#dfdfda] bg-white p-5 sm:p-6">
      <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#38bdf8]">Inbox</p><h2 className="mt-1 text-xl font-black">Quote enquiries</h2></div><span className="rounded-full bg-[#111111] px-3 py-1 text-xs font-black text-white">{filteredEnquiries.length}/{enquiries.length}</span></div>
      {databaseReady && !error && enquiries.length > 0 ? <div className="mt-5 grid gap-2"><label className="relative"><span className="sr-only">Search enquiries</span><Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#888880]" /><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search name, phone or service" className="min-h-11 w-full rounded-xl border border-[#d9d9d4] bg-white py-2.5 pl-10 pr-3 text-base outline-none focus:border-sky-400 sm:text-sm" /></label><label><span className="sr-only">Filter enquiries by status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="min-h-11 w-full rounded-xl border border-[#d9d9d4] bg-white px-3 py-2.5 text-base font-bold outline-none focus:border-sky-400 sm:text-sm"><option value="all">All statuses</option><option value="new">New</option><option value="contacted">Contacted</option><option value="quoted">Quoted</option><option value="closed">Closed</option><option value="spam">Spam</option></select></label></div> : null}
      {!databaseReady ? <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-950">Enquiries will appear after the database is connected.</p> : error ? <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-900">{error}</p> : enquiries.length === 0 ? <p className="mt-5 rounded-xl bg-[#f7f7f5] p-4 text-sm text-[#64645f]">No enquiries yet.</p> : filteredEnquiries.length === 0 ? <p className="mt-5 rounded-xl bg-[#f7f7f5] p-4 text-sm text-[#64645f]">No enquiries match this search or filter.</p> : <div className="mt-5 space-y-4">{filteredEnquiries.map((enquiry) => <EnquiryCard key={enquiry.id} enquiry={enquiry} />)}</div>}
    </section>
  );
}

function EnquiryCard({ enquiry }: { enquiry: Enquiry }) {
  const [state, action, pending] = useActionState(updateEnquiryAction, initialActionState);
  const statusStyles: Record<Enquiry["status"], string> = { new: "bg-sky-100 text-sky-800", contacted: "bg-violet-100 text-violet-800", quoted: "bg-amber-100 text-amber-900", closed: "bg-green-100 text-green-800", spam: "bg-red-100 text-red-800" };
  return (
    <article className="rounded-xl border border-[#e7e7e3] bg-[#fafaf8] p-4">
      <div className="flex flex-wrap items-start justify-between gap-2"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="break-words font-black">{enquiry.name}</h3><span className={`rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-[.08em] ${statusStyles[enquiry.status]}`}>{enquiry.status}</span></div><p className="mt-1 break-words text-xs font-bold text-[#f97316]">{enquiry.service}</p></div><time className="text-[11px] text-[#888880]" dateTime={enquiry.created_at}>{new Date(enquiry.created_at).toLocaleString("en-LK", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Colombo" })}</time></div>
      <div className="mt-3 space-y-1 text-xs text-[#64645f]"><a href={`tel:${enquiry.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 hover:text-black"><Phone aria-hidden="true" className="h-3.5 w-3.5" />{enquiry.phone}</a>{enquiry.email ? <a href={`mailto:${enquiry.email}`} className="flex items-center gap-2 break-all hover:text-black"><Mail aria-hidden="true" className="h-3.5 w-3.5" />{enquiry.email}</a> : null}</div>
      <p className="mt-3 whitespace-pre-wrap rounded-lg bg-white p-3 text-xs leading-5 text-[#4f4f4a]">{enquiry.message}</p>
      <form action={action} className="mt-3 space-y-3">
        <input type="hidden" name="id" value={enquiry.id} />
        <select name="status" defaultValue={enquiry.status} className="min-h-11 w-full rounded-lg border border-[#d9d9d4] bg-white px-3 py-2.5 text-base font-bold sm:text-sm"><option value="new">New</option><option value="contacted">Contacted</option><option value="quoted">Quoted</option><option value="closed">Closed</option><option value="spam">Spam</option></select>
        <textarea name="notes" defaultValue={enquiry.admin_notes} rows={3} placeholder="Private admin notes" className="w-full rounded-lg border border-[#d9d9d4] bg-white px-3 py-2.5 text-base outline-none focus:border-sky-400 sm:text-sm" />
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between"><span role="status" className={`text-xs ${state.status === "error" ? "text-red-700" : "text-green-700"}`}>{state.message}</span><button disabled={pending} className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-[#111111] px-4 py-2 text-sm font-bold text-white disabled:opacity-50"><Save aria-hidden="true" className="h-3.5 w-3.5" />{pending ? "Saving…" : "Update"}</button></div>
      </form>
    </article>
  );
}
