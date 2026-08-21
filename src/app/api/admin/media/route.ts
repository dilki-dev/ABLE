import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { hasAdminSession } from "@/backend/session";
import { hasValidRequestOrigin } from "@/backend/request-security";

export const runtime = "nodejs";

const acceptedTypes = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif" } as const;
const acceptedExtensions: Record<keyof typeof acceptedTypes, readonly string[]> = { "image/jpeg": ["jpg", "jpeg"], "image/png": ["png"], "image/webp": ["webp"], "image/avif": ["avif"] };

function hasValidSignature(type: keyof typeof acceptedTypes, bytes: Uint8Array) {
  if (bytes.length < 12) return false;
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/png") return bytes.slice(0, 8).every((value, index) => value === [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a][index]);
  if (type === "image/webp") return String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  return String.fromCharCode(...bytes.slice(4, 12)).includes("ftypavif") || String.fromCharCode(...bytes.slice(4, 12)).includes("ftypavis");
}

export async function POST(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  if (!hasValidRequestOrigin(request.headers)) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ message: "Media storage is not configured." }, { status: 503 });
  if (Number(request.headers.get("content-length") ?? 0) > 5 * 1024 * 1024) return NextResponse.json({ message: "The upload is too large." }, { status: 413 });

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("multipart/form-data")) return NextResponse.json({ message: "Use a multipart image upload." }, { status: 415 });
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return NextResponse.json({ message: "The upload request could not be read." }, { status: 400 });
  }
  const file = data.get("file");
  if (!(file instanceof File)) return NextResponse.json({ message: "Choose an image file." }, { status: 400 });
  if (!(file.type in acceptedTypes)) return NextResponse.json({ message: "Use a JPG, PNG, WebP or AVIF image." }, { status: 400 });
  if (file.size > 4 * 1024 * 1024) return NextResponse.json({ message: "The image must be smaller than 4 MB." }, { status: 400 });
  const type = file.type as keyof typeof acceptedTypes;
  const suppliedExtension = file.name.toLowerCase().split(".").pop() ?? "";
  if (!acceptedExtensions[type].includes(suppliedExtension)) return NextResponse.json({ message: "The filename extension does not match the image type." }, { status: 400 });
  const fileBytes = new Uint8Array(await file.arrayBuffer());
  if (!hasValidSignature(type, fileBytes)) return NextResponse.json({ message: "The file contents do not match a supported image format." }, { status: 400 });

  try {
    const blob = await put(`able-cms/${randomUUID()}.${acceptedTypes[type]}`, file, { access: "public", addRandomSuffix: false });
    return NextResponse.json({ url: blob.url });
  } catch {
    return NextResponse.json({ message: "The image upload failed." }, { status: 500 });
  }
}
