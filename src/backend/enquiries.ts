import "server-only";
import { createHash } from "node:crypto";
import { z } from "zod";
import { ensureDatabaseSchema, getDatabase } from "./database";

export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{7,}$/).max(40),
  email: z.union([z.literal(""), z.email().max(254)]).optional().default(""),
  service: z.string().trim().min(2).max(120),
  message: z.string().trim().min(12).max(3000),
  company: z.string().max(200).optional().default(""),
});

export type EnquiryStatus = "new" | "contacted" | "quoted" | "closed" | "spam";
export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  message: string;
  status: EnquiryStatus;
  admin_notes: string;
  created_at: string;
  updated_at: string;
};

export function hashRequestAddress(address: string) {
  const secret = process.env.ENQUIRY_HASH_SECRET ?? process.env.SESSION_SECRET;
  if (!secret) throw new Error("ENQUIRY_HASH_SECRET_NOT_CONFIGURED");
  return createHash("sha256").update(`${secret}:${address}`).digest("hex");
}

export async function createEnquiry(input: z.infer<typeof enquirySchema>, ipHash: string) {
  await ensureDatabaseSchema();
  const sql = getDatabase();
  const recent = await sql`
    SELECT COUNT(*)::int AS count
    FROM enquiries
    WHERE ip_hash = ${ipHash} AND created_at > NOW() - INTERVAL '15 minutes'
  `;
  if (Number(recent[0]?.count ?? 0) >= 5) throw new Error("RATE_LIMITED");

  const rows = await sql`
    INSERT INTO enquiries (name, phone, email, service, message, ip_hash)
    VALUES (${input.name}, ${input.phone}, ${input.email || null}, ${input.service}, ${input.message}, ${ipHash})
    RETURNING id
  `;
  return String(rows[0].id);
}

export async function listEnquiries(): Promise<Enquiry[]> {
  await ensureDatabaseSchema();
  const sql = getDatabase();
  const rows = await sql`
    SELECT id, name, phone, email, service, message, status, admin_notes, created_at, updated_at
    FROM enquiries
    ORDER BY created_at DESC
    LIMIT 200
  `;
  return rows as Enquiry[];
}

export async function updateEnquiry(id: string, status: EnquiryStatus, notes: string) {
  await ensureDatabaseSchema();
  const sql = getDatabase();
  await sql`
    UPDATE enquiries
    SET status = ${status}, admin_notes = ${notes}, updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function deleteEnquiry(id: string) {
  await ensureDatabaseSchema();
  const sql = getDatabase();
  const rows = await sql`
    DELETE FROM enquiries
    WHERE id = ${id}
    RETURNING id
  `;
  return rows.length > 0;
}
