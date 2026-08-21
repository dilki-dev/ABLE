import "server-only";
import { unstable_cache } from "next/cache";
import { z } from "zod";
import { ensureDatabaseSchema, getDatabase, isDatabaseConfigured } from "./database";
import { requireAdminSession } from "./session";

const imagePath = z.string().trim().min(1).max(600).refine((value) => (value.startsWith("/") && !value.startsWith("//")) || /^https:\/\/[a-zA-Z0-9.-]+\.public\.blob\.vercel-storage\.com\//.test(value), "Use an uploaded image or a local /images path.");
const galleryItemSchema = z.object({ url: imagePath, alt: z.string().trim().min(2).max(180) });

export const projectInputSchema = z.object({
  id: z.union([z.literal(""), z.uuid()]).default(""),
  title: z.string().trim().min(2).max(160),
  slug: z.string().trim().toLowerCase().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120),
  category: z.string().trim().min(2).max(120),
  location: z.string().trim().min(2).max(160),
  shortDescription: z.string().trim().min(12).max(400),
  description: z.string().trim().min(20).max(6000),
  coverImage: imagePath,
  coverAlt: z.string().trim().min(2).max(180),
  gallery: z.array(galleryItemSchema).max(12).default([]),
  completionDate: z.union([z.literal(""), z.iso.date()]).default(""),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]),
  seoTitle: z.string().trim().max(160).default(""),
  seoDescription: z.string().trim().max(300).default(""),
});

export const testimonialInputSchema = z.object({
  id: z.union([z.literal(""), z.uuid()]).default(""),
  customerName: z.string().trim().min(2).max(100),
  location: z.string().trim().max(160).default(""),
  review: z.string().trim().min(12).max(1600),
  rating: z.union([z.null(), z.number().int().min(1).max(5)]).default(null),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]),
});

export type Project = {
  id: string; title: string; slug: string; category: string; location: string; short_description: string; description: string; cover_image: string; cover_alt: string;
  gallery: { url: string; alt: string }[]; completion_date: string | null; featured: boolean; status: "draft" | "published"; seo_title: string; seo_description: string; created_at: string; updated_at: string;
};
export type Testimonial = { id: string; customer_name: string; location: string; review: string; rating: number | null; featured: boolean; status: "draft" | "published"; created_at: string; updated_at: string };

export const PROJECTS_CACHE_TAG = "published-projects";
export const TESTIMONIALS_CACHE_TAG = "published-testimonials";

async function readPublishedProjects(): Promise<Project[]> {
  if (!isDatabaseConfigured()) return [];
  await ensureDatabaseSchema();
  const sql = getDatabase();
  return await sql`SELECT id, title, slug, category, location, short_description, description, cover_image, cover_alt, gallery, completion_date::text, featured, status, seo_title, seo_description, created_at, updated_at FROM projects WHERE status = 'published' ORDER BY featured DESC, completion_date DESC NULLS LAST, created_at DESC` as Project[];
}

async function readPublishedTestimonials(): Promise<Testimonial[]> {
  if (!isDatabaseConfigured()) return [];
  await ensureDatabaseSchema();
  const sql = getDatabase();
  return await sql`SELECT id, customer_name, location, review, rating, featured, status, created_at, updated_at FROM testimonials WHERE status = 'published' ORDER BY featured DESC, created_at DESC` as Testimonial[];
}

export const listPublishedProjects = unstable_cache(readPublishedProjects, [PROJECTS_CACHE_TAG], { tags: [PROJECTS_CACHE_TAG], revalidate: 300 });
export const listPublishedTestimonials = unstable_cache(readPublishedTestimonials, [TESTIMONIALS_CACHE_TAG], { tags: [TESTIMONIALS_CACHE_TAG], revalidate: 300 });

export async function getPublishedProject(slug: string) {
  const projects = await listPublishedProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function listAdminProjects(): Promise<Project[]> {
  await requireAdminSession();
  await ensureDatabaseSchema();
  const sql = getDatabase();
  return await sql`SELECT id, title, slug, category, location, short_description, description, cover_image, cover_alt, gallery, completion_date::text, featured, status, seo_title, seo_description, created_at, updated_at FROM projects ORDER BY updated_at DESC` as Project[];
}

export async function listAdminTestimonials(): Promise<Testimonial[]> {
  await requireAdminSession();
  await ensureDatabaseSchema();
  const sql = getDatabase();
  return await sql`SELECT id, customer_name, location, review, rating, featured, status, created_at, updated_at FROM testimonials ORDER BY updated_at DESC` as Testimonial[];
}

export async function saveProject(input: z.infer<typeof projectInputSchema>) {
  await requireAdminSession();
  await ensureDatabaseSchema();
  const sql = getDatabase();
  const gallery = JSON.stringify(input.gallery);
  if (input.id) {
    const rows = await sql`UPDATE projects SET title=${input.title}, slug=${input.slug}, category=${input.category}, location=${input.location}, short_description=${input.shortDescription}, description=${input.description}, cover_image=${input.coverImage}, cover_alt=${input.coverAlt}, gallery=${gallery}::jsonb, completion_date=${input.completionDate || null}, featured=${input.featured}, status=${input.status}, seo_title=${input.seoTitle}, seo_description=${input.seoDescription}, updated_at=NOW() WHERE id=${input.id} RETURNING id`;
    if (!rows[0]) throw new Error("NOT_FOUND");
    return String(rows[0].id);
  }
  const rows = await sql`INSERT INTO projects (title, slug, category, location, short_description, description, cover_image, cover_alt, gallery, completion_date, featured, status, seo_title, seo_description) VALUES (${input.title}, ${input.slug}, ${input.category}, ${input.location}, ${input.shortDescription}, ${input.description}, ${input.coverImage}, ${input.coverAlt}, ${gallery}::jsonb, ${input.completionDate || null}, ${input.featured}, ${input.status}, ${input.seoTitle}, ${input.seoDescription}) RETURNING id`;
  return String(rows[0].id);
}

export async function deleteProject(id: string) { await requireAdminSession(); await ensureDatabaseSchema(); const sql = getDatabase(); return (await sql`DELETE FROM projects WHERE id=${id} RETURNING id`).length > 0; }

export async function saveTestimonial(input: z.infer<typeof testimonialInputSchema>) {
  await requireAdminSession();
  await ensureDatabaseSchema();
  const sql = getDatabase();
  if (input.id) {
    const rows = await sql`UPDATE testimonials SET customer_name=${input.customerName}, location=${input.location}, review=${input.review}, rating=${input.rating}, featured=${input.featured}, status=${input.status}, updated_at=NOW() WHERE id=${input.id} RETURNING id`;
    if (!rows[0]) throw new Error("NOT_FOUND");
    return String(rows[0].id);
  }
  const rows = await sql`INSERT INTO testimonials (customer_name, location, review, rating, featured, status) VALUES (${input.customerName}, ${input.location}, ${input.review}, ${input.rating}, ${input.featured}, ${input.status}) RETURNING id`;
  return String(rows[0].id);
}

export async function deleteTestimonial(id: string) { await requireAdminSession(); await ensureDatabaseSchema(); const sql = getDatabase(); return (await sql`DELETE FROM testimonials WHERE id=${id} RETURNING id`).length > 0; }
