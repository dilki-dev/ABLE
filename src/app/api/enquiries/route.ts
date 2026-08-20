import { NextResponse } from "next/server";
import { createEnquiry, enquirySchema, hashRequestAddress } from "@/backend/enquiries";
import { isDatabaseConfigured } from "@/backend/database";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 16_000) return NextResponse.json({ ok: false, message: "Request is too large." }, { status: 413 });
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the form fields.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Honeypot: report success to automated form fillers without storing anything.
  if (parsed.data.company) return NextResponse.json({ ok: true }, { status: 201 });
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, code: "BACKEND_NOT_CONFIGURED", message: "Online enquiries are not connected yet." }, { status: 503 });
  }

  try {
    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const address = forwarded || request.headers.get("x-real-ip") || "unknown";
    const id = await createEnquiry(parsed.data, hashRequestAddress(address));
    return NextResponse.json({ ok: true, id }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof Error && error.message === "RATE_LIMITED") {
      return NextResponse.json({ ok: false, message: "Too many enquiries were sent. Please wait and try again." }, { status: 429 });
    }
    return NextResponse.json({ ok: false, message: "The enquiry could not be saved. Please call or WhatsApp ABLE." }, { status: 500 });
  }
}
