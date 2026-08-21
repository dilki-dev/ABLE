import "server-only";
import type { Enquiry } from "./enquiries";

function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.FROM_EMAIL && process.env.ADMIN_NOTIFICATION_EMAIL);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character] ?? character);
}

export async function sendEnquiryNotification(enquiry: Pick<Enquiry, "reference" | "name" | "phone" | "email" | "whatsapp" | "location" | "service" | "preferred_contact" | "message" | "additional_message">) {
  if (!emailConfigured()) return;
  const replyTo = process.env.REPLY_TO_EMAIL || "hello@ableconstructions.lk";
  const rows = [
    ["Reference", enquiry.reference], ["Name", enquiry.name], ["Phone", enquiry.phone], ["Email", enquiry.email || "Not supplied"], ["WhatsApp", enquiry.whatsapp || "Same as phone / not supplied"],
    ["Location", enquiry.location], ["Service", enquiry.service], ["Preferred contact", enquiry.preferred_contact], ["Work description", enquiry.message], ["Additional message", enquiry.additional_message || "None"],
  ];
  const html = `<h1>New quote enquiry</h1>${rows.map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`).join("")}`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.FROM_EMAIL, to: [process.env.ADMIN_NOTIFICATION_EMAIL], reply_to: enquiry.email || replyTo, subject: `${enquiry.reference} · ${enquiry.service}`, html }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) console.error("Enquiry notification delivery failed.", { status: response.status });
  } catch {
    console.error("Enquiry notification delivery failed.");
  }
}
