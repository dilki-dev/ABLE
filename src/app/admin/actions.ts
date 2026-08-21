"use server";

import { compare } from "bcryptjs";
import { revalidatePath, updateTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { siteContentSchema } from "@/cms/content-schema";
import { saveSiteContent, SITE_CONTENT_CACHE_TAG } from "@/backend/content-repository";
import { deleteEnquiry, updateEnquiry, type EnquiryStatus } from "@/backend/enquiries";
import { hashRequestAddress } from "@/backend/enquiries";
import { isAdminLoginRateLimited, recordAdminLoginAttempt } from "@/backend/admin-login-rate-limit";
import { isDatabaseConfigured } from "@/backend/database";
import { createAdminSession, deleteAdminSession, hasAdminSession, isAdminConfigured } from "@/backend/session";
import { hasValidRequestOrigin, requestAddress } from "@/backend/request-security";
import { isTurnstileConfigured, verifyTurnstile } from "@/backend/turnstile";
import type { ActionState } from "@/components/admin/action-state";
import { deleteProject, deleteTestimonial, projectInputSchema, PROJECTS_CACHE_TAG, saveProject, saveTestimonial, testimonialInputSchema, TESTIMONIALS_CACHE_TAG } from "@/backend/portfolio";

async function authorizedAdminMutation() {
  const requestHeaders = await headers();
  return hasValidRequestOrigin(requestHeaders) && await hasAdminSession();
}

export async function loginAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  if (!isAdminConfigured() || !isDatabaseConfigured() || !isTurnstileConfigured()) return { status: "error", message: "Admin access is temporarily unavailable." };
  const password = String(formData.get("password") ?? "");
  const turnstileToken = String(formData.get("cf-turnstile-response") ?? "");
  const requestHeaders = await headers();
  if (!hasValidRequestOrigin(requestHeaders)) return { status: "error", message: "Sign-in failed. Please try again." };
  const address = requestAddress(requestHeaders);
  const ipHash = hashRequestAddress(address);
  if (await isAdminLoginRateLimited(ipHash)) return { status: "error", message: "Sign-in is temporarily restricted. Please wait and try again." };
  const antiBotPassed = await verifyTurnstile(turnstileToken, address, "admin-login");
  let passwordPassed = false;
  try { passwordPassed = password.length <= 200 && await compare(password, process.env.ADMIN_PASSWORD_HASH ?? ""); } catch { passwordPassed = false; }
  if (!antiBotPassed || !passwordPassed) {
    await recordAdminLoginAttempt(ipHash, false);
    return { status: "error", message: "Sign-in failed. Check the form and try again." };
  }
  await recordAdminLoginAttempt(ipHash, true);
  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  if (!hasValidRequestOrigin(await headers())) return;
  await deleteAdminSession();
  redirect("/admin/login");
}

export async function saveContentAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await authorizedAdminMutation())) return { status: "error", message: "Your admin session has expired. Sign in again." };
  const raw = String(formData.get("content") ?? "");
  if (!raw || raw.length > 250_000) return { status: "error", message: "The website content is empty or too large to save safely." };

  try {
    const parsed = siteContentSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const field = issue?.path.length ? issue.path.join(" → ") : "website content";
      return { status: "error", message: `Check ${field}: ${issue?.message ?? "the value is invalid."}` };
    }
    await saveSiteContent(parsed.data);
  } catch (error) {
    if (error instanceof SyntaxError) return { status: "error", message: "The content could not be read." };
    console.error("CMS content save failed.", { errorType: error instanceof Error ? error.name : "UnknownError" });
    return { status: "error", message: "The database is not connected or could not save this update." };
  }

  updateTag(SITE_CONTENT_CACHE_TAG);
  revalidatePath("/", "layout");
  revalidatePath("/", "page");
  revalidatePath("/privacy", "page");
  revalidatePath("/terms", "page");
  revalidatePath("/admin", "page");
  return { status: "success", message: "Published successfully. The live website now uses these changes.", completedAt: Date.now() };
}

const enquiryUpdateSchema = z.object({
  id: z.uuid(),
  status: z.enum(["new", "contacted", "quoted", "scheduled", "completed", "closed", "spam"]),
  notes: z.string().trim().max(2000),
});

export async function updateEnquiryAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await authorizedAdminMutation())) return { status: "error", message: "Your admin session has expired. Sign in again." };
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

const enquiryDeleteSchema = z.object({ id: z.uuid() });

export async function deleteEnquiryAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await authorizedAdminMutation())) return { status: "error", message: "Your admin session has expired. Sign in again." };
  const parsed = enquiryDeleteSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) return { status: "error", message: "The enquiry could not be identified." };

  try {
    const deleted = await deleteEnquiry(parsed.data.id);
    if (!deleted) return { status: "error", message: "This enquiry no longer exists." };
    revalidatePath("/admin");
    return { status: "success", message: "Enquiry deleted." };
  } catch {
    return { status: "error", message: "The enquiry could not be deleted." };
  }
}

export async function saveProjectAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await authorizedAdminMutation())) return { status: "error", message: "Your admin session has expired. Sign in again." };
  try {
    const parsed = projectInputSchema.safeParse(JSON.parse(String(formData.get("project") ?? "")));
    if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message || "Check the project fields." };
    await saveProject(parsed.data);
    updateTag(PROJECTS_CACHE_TAG);
    revalidatePath("/", "page");
    revalidatePath("/projects", "layout");
    revalidatePath("/admin", "page");
    revalidatePath("/sitemap.xml", "page");
    return { status: "success", message: parsed.data.status === "published" ? "Project published." : "Project draft saved.", completedAt: Date.now() };
  } catch (error) {
    if (error instanceof SyntaxError) return { status: "error", message: "The project data could not be read." };
    return { status: "error", message: "The project could not be saved. Check that its slug is unique." };
  }
}

export async function deleteProjectAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await authorizedAdminMutation())) return { status: "error", message: "Your admin session has expired. Sign in again." };
  const parsed = z.uuid().safeParse(formData.get("id"));
  if (!parsed.success) return { status: "error", message: "The project could not be identified." };
  try {
    if (!(await deleteProject(parsed.data))) return { status: "error", message: "This project no longer exists." };
    updateTag(PROJECTS_CACHE_TAG); revalidatePath("/", "page"); revalidatePath("/projects", "layout"); revalidatePath("/admin", "page"); revalidatePath("/sitemap.xml", "page");
    return { status: "success", message: "Project deleted.", completedAt: Date.now() };
  } catch { return { status: "error", message: "The project could not be deleted." }; }
}

export async function saveTestimonialAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await authorizedAdminMutation())) return { status: "error", message: "Your admin session has expired. Sign in again." };
  try {
    const parsed = testimonialInputSchema.safeParse(JSON.parse(String(formData.get("testimonial") ?? "")));
    if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message || "Check the testimonial fields." };
    await saveTestimonial(parsed.data);
    updateTag(TESTIMONIALS_CACHE_TAG); revalidatePath("/", "page"); revalidatePath("/admin", "page");
    return { status: "success", message: parsed.data.status === "published" ? "Testimonial published." : "Testimonial draft saved.", completedAt: Date.now() };
  } catch (error) {
    if (error instanceof SyntaxError) return { status: "error", message: "The testimonial data could not be read." };
    return { status: "error", message: "The testimonial could not be saved." };
  }
}

export async function deleteTestimonialAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await authorizedAdminMutation())) return { status: "error", message: "Your admin session has expired. Sign in again." };
  const parsed = z.uuid().safeParse(formData.get("id"));
  if (!parsed.success) return { status: "error", message: "The testimonial could not be identified." };
  try {
    if (!(await deleteTestimonial(parsed.data))) return { status: "error", message: "This testimonial no longer exists." };
    updateTag(TESTIMONIALS_CACHE_TAG); revalidatePath("/", "page"); revalidatePath("/admin", "page");
    return { status: "success", message: "Testimonial deleted.", completedAt: Date.now() };
  } catch { return { status: "error", message: "The testimonial could not be deleted." }; }
}
