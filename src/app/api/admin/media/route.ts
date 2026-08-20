import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { hasAdminSession } from "@/backend/session";

export const runtime = "nodejs";

const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export async function POST(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  let validOrigin = false;
  try { validOrigin = Boolean(origin && host && new URL(origin).host === host); } catch { validOrigin = false; }
  if (!validOrigin) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ message: "Media storage is not configured." }, { status: 503 });

  const data = await request.formData();
  const file = data.get("file");
  if (!(file instanceof File)) return NextResponse.json({ message: "Choose an image file." }, { status: 400 });
  if (!acceptedTypes.has(file.type)) return NextResponse.json({ message: "Use a JPG, PNG, WebP or AVIF image." }, { status: 400 });
  if (file.size > 4 * 1024 * 1024) return NextResponse.json({ message: "The image must be smaller than 4 MB." }, { status: 400 });

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  try {
    const blob = await put(`able-cms/${safeName}`, file, { access: "public", addRandomSuffix: true });
    return NextResponse.json({ url: blob.url });
  } catch {
    return NextResponse.json({ message: "The image upload failed." }, { status: 500 });
  }
}
