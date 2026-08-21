import { NextResponse } from "next/server";
import { createEnquiry, enquirySchema, hashRequestAddress } from "@/backend/enquiries";
import { isDatabaseConfigured } from "@/backend/database";
import { getSiteContent } from "@/backend/content-repository";
import { sendEnquiryNotification } from "@/backend/notifications";
import { hasValidRequestOrigin, requestAddress } from "@/backend/request-security";
import { isTurnstileConfigured, verifyTurnstile } from "@/backend/turnstile";

export const runtime = "nodejs";
const maximumRequestBytes = 24_000;

async function readBoundedJson(request: Request) {
  if (!request.body) throw new Error("INVALID_BODY");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > maximumRequestBytes) {
      await reader.cancel();
      throw new Error("REQUEST_TOO_LARGE");
    }
    chunks.push(value);
  }
  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body)) as unknown;
}

export async function POST(request: Request) {
  if (!hasValidRequestOrigin(request.headers)) return NextResponse.json({ ok: false, message: "Invalid request origin." }, { status: 403 });
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return NextResponse.json({ ok: false, message: "Use a JSON request body." }, { status: 415 });
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maximumRequestBytes) return NextResponse.json({ ok: false, message: "Request is too large." }, { status: 413 });
  let payload: unknown;
  try {
    payload = await readBoundedJson(request);
  } catch (error) {
    if (error instanceof Error && error.message === "REQUEST_TOO_LARGE") return NextResponse.json({ ok: false, message: "Request is too large." }, { status: 413 });
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the form fields.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const address = requestAddress(request.headers);
  if (!isTurnstileConfigured()) return NextResponse.json({ ok: false, code: "ANTIBOT_NOT_CONFIGURED", message: "Online verification is temporarily unavailable. Please call or WhatsApp ABLE." }, { status: 503 });
  if (!(await verifyTurnstile(parsed.data.turnstileToken, address, "quote"))) return NextResponse.json({ ok: false, code: "ANTIBOT_FAILED", message: "Please complete the security check and try again." }, { status: 400 });
  // Honeypot: after anti-bot verification, report success without storing automated submissions.
  if (parsed.data.company) return NextResponse.json({ ok: true }, { status: 201 });
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, code: "BACKEND_NOT_CONFIGURED", message: "Online enquiries are not connected yet." }, { status: 503 });
  }

  try {
    const content = await getSiteContent();
    if (!content.services.some((service) => service.title === parsed.data.service)) return NextResponse.json({ ok: false, message: "Please choose an available service." }, { status: 400 });
    const saved = await createEnquiry(parsed.data, hashRequestAddress(address));
    if (saved.created) await sendEnquiryNotification({
      reference: saved.reference,
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      whatsapp: parsed.data.whatsapp || null,
      location: parsed.data.location,
      service: parsed.data.service,
      preferred_contact: parsed.data.preferredContactMethod,
      message: parsed.data.message,
      additional_message: parsed.data.additionalMessage,
    });
    return NextResponse.json({ ok: true, reference: saved.reference }, { status: saved.created ? 201 : 200, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof Error && error.message === "RATE_LIMITED") {
      return NextResponse.json({ ok: false, message: "Too many enquiries were sent. Please wait and try again." }, { status: 429 });
    }
    return NextResponse.json({ ok: false, message: "The enquiry could not be saved. Please call or WhatsApp ABLE." }, { status: 500 });
  }
}
