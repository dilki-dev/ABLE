import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { z } from "zod";
import { ensureDatabaseSchema, getDatabase } from "./database";

const phoneNumber = z.string().trim().regex(/^[+\d][\d\s()-]{7,}$/).max(40);

export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: phoneNumber,
  email: z.union([z.literal(""), z.email().max(254)]).default(""),
  whatsapp: z.union([z.literal(""), phoneNumber]).default(""),
  location: z.string().trim().min(2).max(160),
  service: z.string().trim().min(2).max(120),
  preferredContactMethod: z.enum(["phone", "whatsapp", "email"]),
  message: z.string().trim().min(12).max(3000),
  additionalMessage: z.string().trim().max(1500).default(""),
  consent: z.literal(true),
  submissionToken: z.uuid(),
  turnstileToken: z.string().trim().max(2048).default(""),
  company: z.string().max(200).default(""),
}).superRefine((value, context) => {
  if (value.preferredContactMethod === "email" && !value.email) context.addIssue({ code: "custom", path: ["email"], message: "Email is required when email is the preferred contact method." });
});

export type EnquiryStatus = "new" | "contacted" | "quoted" | "scheduled" | "completed" | "closed" | "spam";
export type Enquiry = {
  id: string;
  reference: string;
  name: string;
  phone: string;
  email: string | null;
  whatsapp: string | null;
  location: string;
  service: string;
  preferred_contact: "phone" | "whatsapp" | "email";
  message: string;
  additional_message: string;
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

function createReference() {
  return `ABLE-${new Date().getUTCFullYear()}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function createEnquiry(input: z.infer<typeof enquirySchema>, ipHash: string) {
  await ensureDatabaseSchema();
  const sql = getDatabase();
  const duplicate = await sql`SELECT reference FROM enquiries WHERE submission_token = ${input.submissionToken} LIMIT 1`;
  if (duplicate[0]?.reference) return { reference: String(duplicate[0].reference), created: false };

  const recent = await sql`
    SELECT COUNT(*)::int AS count
    FROM enquiries
    WHERE ip_hash = ${ipHash} AND created_at > NOW() - INTERVAL '15 minutes'
  `;
  if (Number(recent[0]?.count ?? 0) >= 5) throw new Error("RATE_LIMITED");

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const reference = createReference();
    const rows = await sql`
      INSERT INTO enquiries (reference, name, phone, email, whatsapp, location, service, preferred_contact, message, additional_message, consent, submission_token, ip_hash)
      VALUES (${reference}, ${input.name}, ${input.phone}, ${input.email || null}, ${input.whatsapp || null}, ${input.location}, ${input.service}, ${input.preferredContactMethod}, ${input.message}, ${input.additionalMessage}, ${input.consent}, ${input.submissionToken}, ${ipHash})
      ON CONFLICT DO NOTHING
      RETURNING reference
    `;
    if (rows[0]?.reference) return { reference: String(rows[0].reference), created: true };
    const existing = await sql`SELECT reference FROM enquiries WHERE submission_token = ${input.submissionToken} LIMIT 1`;
    if (existing[0]?.reference) return { reference: String(existing[0].reference), created: false };
  }
  throw new Error("REFERENCE_GENERATION_FAILED");
}

export async function listEnquiries(): Promise<Enquiry[]> {
  await ensureDatabaseSchema();
  const sql = getDatabase();
  const rows = await sql`
    SELECT id, reference, name, phone, email, whatsapp, location, service, preferred_contact, message, additional_message, status, admin_notes, created_at, updated_at
    FROM enquiries
    ORDER BY created_at DESC
    LIMIT 300
  `;
  return rows as Enquiry[];
}

export async function updateEnquiry(id: string, status: EnquiryStatus, notes: string) {
  await ensureDatabaseSchema();
  const sql = getDatabase();
  await sql`UPDATE enquiries SET status = ${status}, admin_notes = ${notes}, updated_at = NOW() WHERE id = ${id}`;
}

export async function deleteEnquiry(id: string) {
  await ensureDatabaseSchema();
  const sql = getDatabase();
  const rows = await sql`DELETE FROM enquiries WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}
