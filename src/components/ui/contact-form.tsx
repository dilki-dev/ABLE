"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

type Errors = Partial<Record<"name" | "phone" | "email" | "service" | "message", string>>;

export function ContactForm() {
  // TODO: Replace the local validation-only submit flow with a server action,
  // email provider or CRM once the business chooses its enquiry destination.
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "not-connected">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors: Errors = {};
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const service = String(form.get("service") ?? "");
    const message = String(form.get("message") ?? "").trim();

    if (name.length < 2) nextErrors.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{7,}$/.test(phone)) nextErrors.phone = "Enter a valid phone number.";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!service) nextErrors.service = "Please choose a service.";
    if (message.length < 12) nextErrors.message = "Please add a little more detail about the work.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    window.setTimeout(() => setStatus("not-connected"), 450);
  }

  const inputClass = "mt-2 w-full rounded-xl border border-[#d9d9d4] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-stone-400 focus:border-[#38bdf8] focus:ring-4 focus:ring-sky-100";

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl bg-white p-6 shadow-[0_25px_80px_rgba(17,17,17,.12)] sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required error={errors.name} inputClass={inputClass} />
        <Field label="Phone" name="phone" type="tel" required error={errors.phone} inputClass={inputClass} />
        <Field label="Email (optional)" name="email" type="email" error={errors.email} inputClass={inputClass} />
        <label className="text-sm font-bold text-[#292924]">
          Service <span className="text-[#f97316]">*</span>
          <select name="service" defaultValue="" aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined} className={inputClass}>
            <option value="" disabled>Select a service</option>
            <option>Plumbing</option><option>Electrical Work</option><option>Painting & Decorating</option>
            <option>General Repairs</option><option>Bathroom Fitting</option><option>Kitchen Fitting</option>
            <option>Flooring</option><option>Carpentry</option><option>Gardening & Outdoor Maintenance</option>
            <option>Property Refurbishment</option><option>Emergency Repairs</option><option>Landlord Property Maintenance</option>
          </select>
          {errors.service ? <span id="service-error" className="mt-1 block text-xs font-semibold text-red-600">{errors.service}</span> : null}
        </label>
      </div>
      <label className="mt-5 block text-sm font-bold text-[#292924]">
        Project details <span className="text-[#f97316]">*</span>
        <textarea name="message" rows={5} placeholder="Tell us what needs attention, your location and preferred timing." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} className={inputClass} />
        {errors.message ? <span id="message-error" className="mt-1 block text-xs font-semibold text-red-600">{errors.message}</span> : null}
      </label>
      <button type="submit" disabled={status === "submitting"} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f97316] px-5 py-4 text-sm font-extrabold text-white transition hover:bg-[#e9640e] disabled:cursor-wait disabled:opacity-70">
        {status === "submitting" ? "Checking enquiry…" : "Prepare quote request"}<Send aria-hidden="true" className="h-4 w-4" />
      </button>
      {status === "not-connected" ? (
        <div role="status" className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm leading-6 text-sky-950">
          Your details are valid, but online sending is not connected yet. Please call or WhatsApp ABLE to send this enquiry now.
        </div>
      ) : null}
      <p className="mt-4 text-xs leading-5 text-[#777771]">Form delivery placeholder: connect an email service, CRM or server action before launch. No message is currently sent.</p>
    </form>
  );
}

function Field({ label, name, type = "text", required = false, error, inputClass }: { label: string; name: string; type?: string; required?: boolean; error?: string; inputClass: string }) {
  const errorId = `${name}-error`;
  return (
    <label className="text-sm font-bold text-[#292924]">
      {label} {required ? <span className="text-[#f97316]">*</span> : null}
      <input name={name} type={type} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} className={inputClass} />
      {error ? <span id={errorId} className="mt-1 block text-xs font-semibold text-red-600">{error}</span> : null}
    </label>
  );
}
