"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import { resetTurnstile, TurnstileWidget } from "./turnstile-widget";

type FieldName = "name" | "phone" | "email" | "whatsapp" | "location" | "service" | "preferredContactMethod" | "message" | "additionalMessage" | "consent" | "turnstileToken";
type Errors = Partial<Record<FieldName, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm({ services, turnstileSiteKey, antiBotReady }: { services: readonly string[]; turnstileSiteKey: string; antiBotReady: boolean }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const submissionToken = useRef("");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    if (!requested || !services.includes(requested)) return;
    const timer = window.setTimeout(() => setSelectedService(requested), 0);
    return () => window.clearTimeout(timer);
  }, [services]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const values = {
      name: String(form.get("name") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      whatsapp: String(form.get("whatsapp") ?? "").trim(),
      location: String(form.get("location") ?? "").trim(),
      service: String(form.get("service") ?? ""),
      preferredContactMethod: String(form.get("preferredContactMethod") ?? "phone"),
      message: String(form.get("message") ?? "").trim(),
      additionalMessage: String(form.get("additionalMessage") ?? "").trim(),
      consent: form.get("consent") === "on",
      turnstileToken: String(form.get("cf-turnstile-response") ?? ""),
      company: String(form.get("company") ?? ""),
    };
    const nextErrors: Errors = {};
    if (values.name.length < 2) nextErrors.name = "Please enter your full name.";
    if (!/^[+\d][\d\s()-]{7,}$/.test(values.phone)) nextErrors.phone = "Enter a valid phone number.";
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = "Enter a valid email address.";
    if (values.whatsapp && !/^[+\d][\d\s()-]{7,}$/.test(values.whatsapp)) nextErrors.whatsapp = "Enter a valid WhatsApp number or leave it blank.";
    if (values.preferredContactMethod === "email" && !values.email) nextErrors.email = "Email is required when email is your preferred contact method.";
    if (values.location.length < 2) nextErrors.location = "Enter the property location.";
    if (!services.includes(values.service)) nextErrors.service = "Please choose a service.";
    if (!(["phone", "whatsapp", "email"] as string[]).includes(values.preferredContactMethod)) nextErrors.preferredContactMethod = "Choose a preferred contact method.";
    if (values.message.length < 12) nextErrors.message = "Please add a little more detail about the work.";
    if (!values.consent) nextErrors.consent = "Please confirm that we may use these details to respond to your enquiry.";
    if (!values.turnstileToken && turnstileSiteKey) nextErrors.turnstileToken = "Please complete the security check.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) { setStatus("idle"); return; }
    if (!submissionToken.current) submissionToken.current = crypto.randomUUID();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, submissionToken: submissionToken.current }),
      });
      const result = await response.json() as { reference?: string; message?: string; errors?: Record<string, string[]> };
      if (response.ok && result.reference) {
        formElement.reset();
        setSelectedService("");
        submissionToken.current = "";
        setReference(result.reference);
        setMessage("Thank you. Your quotation enquiry has been received and saved securely.");
        setStatus("success");
        resetTurnstile();
        return;
      }
      if (result.errors) setErrors(Object.fromEntries(Object.entries(result.errors).map(([key, value]) => [key, value[0]])) as Errors);
      setMessage(result.message || "The enquiry could not be sent. Please call or WhatsApp ABLE instead.");
      setStatus("error");
      resetTurnstile();
    } catch {
      setMessage("The enquiry could not be sent. Your entries have been kept so you can try again, or contact ABLE by phone or WhatsApp.");
      setStatus("error");
      resetTurnstile();
    }
  }

  const inputClass = "mt-2 min-h-12 w-full min-w-0 rounded-xl border border-[var(--line)] bg-[var(--canvas)] px-4 py-3.5 text-base text-[var(--ink)] outline-none transition placeholder:text-stone-400 focus:border-[var(--orange)] focus:ring-4 focus:ring-orange-100/70";
  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={status === "submitting"} className="min-w-0 rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[var(--shadow-lg)] sm:rounded-[1.75rem] sm:p-8 lg:p-10">
      <div className="mb-7 border-b border-[var(--line)] pb-6">
        <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[var(--orange)]">Tell us what you need</p>
        <h3 className="mt-2 text-2xl font-black tracking-[-.03em] text-[var(--ink)]">Request a quotation</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Share the essentials below. We will review your enquiry and contact you using your preferred method.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" autoComplete="name" required error={errors.name} inputClass={inputClass} />
        <Field label="Phone number" name="phone" type="tel" autoComplete="tel" required error={errors.phone} inputClass={inputClass} />
        <Field label="Email address (optional)" name="email" type="email" autoComplete="email" error={errors.email} inputClass={inputClass} />
        <Field label="WhatsApp number if different" name="whatsapp" type="tel" autoComplete="tel" error={errors.whatsapp} inputClass={inputClass} />
        <Field label="Property location" name="location" autoComplete="street-address" required error={errors.location} inputClass={inputClass} />
        <SelectField label="Service required" name="service" required error={errors.service} inputClass={inputClass} defaultValue="" value={selectedService} onChange={setSelectedService} options={services.map((service) => ({ value: service, label: service }))} placeholder="Select a service" />
        <SelectField label="Preferred contact method" name="preferredContactMethod" required error={errors.preferredContactMethod} inputClass={inputClass} defaultValue="phone" options={[{ value: "phone", label: "Phone call" }, { value: "whatsapp", label: "WhatsApp" }, { value: "email", label: "Email" }]} />
      </div>
      <label className="mt-5 block text-sm font-bold text-[#292924]">Description of work <span className="text-[#f97316]">*</span><textarea name="message" rows={5} placeholder="Describe what needs attention and include any useful measurements or preferred timing." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} className={inputClass} />{errors.message ? <span id="message-error" className="mt-1 block text-xs font-semibold text-red-600">{errors.message}</span> : null}</label>
      <label className="mt-5 block text-sm font-bold text-[#292924]">Additional message (optional)<textarea name="additionalMessage" rows={3} placeholder="Add access details or anything else that may help us review the enquiry." className={inputClass} /></label>
      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-[#4f4f4a]"><input name="consent" type="checkbox" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} className="mt-1 h-5 w-5 shrink-0 accent-[#f97316]" /><span>I agree that ABLE Property Maintenance may use these details to respond to my enquiry. See the <Link href="/privacy" className="font-bold text-sky-700 underline">Privacy Policy</Link>. <span className="text-[#f97316]">*</span>{errors.consent ? <span id="consent-error" className="mt-1 block text-xs font-semibold text-red-600">{errors.consent}</span> : null}</span></label>
      <label className="absolute -left-[9999px]" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      <div className="mt-6 min-w-0 rounded-xl border border-[var(--line)] bg-[var(--soft)] p-3 sm:p-4">{turnstileSiteKey ? <TurnstileWidget siteKey={turnstileSiteKey} action="quote" /> : antiBotReady ? null : <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-950">The security check is not configured. Please use the phone or WhatsApp contact option.</p>}{errors.turnstileToken ? <p className="mt-1 text-xs font-semibold text-red-600">{errors.turnstileToken}</p> : null}</div>
      <button type="submit" disabled={status === "submitting" || !antiBotReady} className="btn btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60">{status === "submitting" ? "Sending enquiry…" : "Request a quotation"}<Send aria-hidden="true" className="h-4 w-4" /></button>
      {status === "success" ? <div role="status" className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-900"><p className="font-extrabold">Enquiry received</p><p>{message}</p><p className="mt-2 font-black">Reference: {reference}</p></div> : null}
      {status === "error" ? <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-900">{message}</div> : null}
    </form>
  );
}

function Field({ label, name, type = "text", autoComplete, required = false, error, inputClass }: { label: string; name: string; type?: string; autoComplete?: string; required?: boolean; error?: string; inputClass: string }) {
  const errorId = `${name}-error`;
  return <label className="min-w-0 text-sm font-bold text-[#292924]">{label} {required ? <span className="text-[#f97316]">*</span> : null}<input name={name} type={type} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} className={inputClass} />{error ? <span id={errorId} className="mt-1 block text-xs font-semibold text-red-600">{error}</span> : null}</label>;
}

function SelectField({ label, name, required = false, error, inputClass, defaultValue, value, onChange, options, placeholder }: { label: string; name: string; required?: boolean; error?: string; inputClass: string; defaultValue: string; value?: string; onChange?: (value: string) => void; options: { value: string; label: string }[]; placeholder?: string }) {
  const errorId = `${name}-error`;
  return <label className="min-w-0 text-sm font-bold text-[#292924]">{label} {required ? <span className="text-[#f97316]">*</span> : null}<select name={name} defaultValue={value === undefined ? defaultValue : undefined} value={value} onChange={onChange ? (event) => onChange(event.target.value) : undefined} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} className={inputClass}>{placeholder ? <option value="" disabled>{placeholder}</option> : null}{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{error ? <span id={errorId} className="mt-1 block text-xs font-semibold text-red-600">{error}</span> : null}</label>;
}
