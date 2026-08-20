"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { siteContentSchema } from "@/cms/content-schema";
import { saveSiteContent } from "@/backend/content-repository";
import { updateEnquiry, type EnquiryStatus } from "@/backend/enquiries";
import { hashRequestAddress } from "@/backend/enquiries";
import { isAdminLoginRateLimited, recordAdminLoginAttempt } from "@/backend/admin-login-rate-limit";
import { isDatabaseConfigured } from "@/backend/database";
import { createAdminSession, deleteAdminSession, hasAdminSession, isAdminConfigured } from "@/backend/session";
import type { ActionState } from "@/components/admin/action-state";

function passwordsMatch(candidate: string, expected: string) {
  const candidateDigest = createHash("sha256").update(candidate).digest();
  const expectedDigest = createHash("sha256").update(expected).digest();
  return timingSafeEqual(candidateDigest, expectedDigest);
}

export async function loginAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  if (!isAdminConfigured()) return { status: "error", message: "Admin login is not configured yet. Add the required Vercel environment variables." };
  if (!isDatabaseConfigured()) return { status: "error", message: "The database must be connected before admin login is enabled." };
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "";
  const requestHeaders = await headers();
  const address = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  const ipHash = hashRequestAddress(address);
  if (await isAdminLoginRateLimited(ipHash)) return { status: "error", message: "Too many sign-in attempts. Wait 15 minutes and try again." };
  if (!passwordsMatch(password, expected)) {
    await recordAdminLoginAttempt(ipHash, false);
    return { status: "error", message: "The password is incorrect." };
  }
  await recordAdminLoginAttempt(ipHash, true);
  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await deleteAdminSession();
  redirect("/admin/login");
}

export async function saveContentAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await hasAdminSession())) return { status: "error", message: "Your admin session has expired. Sign in again." };
  const raw = String(formData.get("content") ?? "");

  try {
    const parsed = siteContentSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message ?? "The content is invalid." };
    await saveSiteContent(parsed.data);
  } catch (error) {
    if (error instanceof SyntaxError) return { status: "error", message: "The content could not be read." };
    return { status: "error", message: "The database is not connected or could not save this update." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { status: "success", message: "Website content saved successfully." };
}

const enquiryUpdateSchema = z.object({
  id: z.uuid(),
  status: z.enum(["new", "contacted", "quoted", "closed", "spam"]),
  notes: z.string().trim().max(2000),
});

export async function updateEnquiryAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await hasAdminSession())) return { status: "error", message: "Your admin session has expired. Sign in again." };
  const parsed = enquiryUpdateSchema.safeParse({ id: formData.get("id"), status: formData.get("status"), notes: formData.get("notes") });
  if (!parsed.success) return { status: "error", message: "The enquiry update is invalid." };

  try {
    await updateEnquiry(parsed.data.id, parsed.data.status as EnquiryStatus, parsed.data.notes);
    revalidatePath("/admin");
    return { status: "success", message: "Enquiry updated." };
  } catch {
    return { status: "error", message: "The enquiry could not be updated." };
  }
}
