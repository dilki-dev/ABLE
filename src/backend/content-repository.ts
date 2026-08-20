import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { defaultSiteContent, siteContentSchema, type SiteContent } from "@/cms/content-schema";
import { ensureDatabaseSchema, getDatabase, isDatabaseConfigured } from "./database";

export const SITE_CONTENT_CACHE_TAG = "site-content";

type AdminContentResult = {
  content: SiteContent;
  databaseReady: boolean;
  storedContent: boolean;
  updatedAt: string | null;
  error: string | null;
};

type StoredContentRecord = { content: SiteContent; updatedAt: string };

async function readStoredContent(): Promise<StoredContentRecord | null> {
  await ensureDatabaseSchema();
  const sql = getDatabase();
  const rows = await sql`SELECT content, updated_at FROM cms_documents WHERE key = 'site-content' LIMIT 1`;
  if (!rows[0]?.content) return null;
  const parsed = siteContentSchema.safeParse(rows[0].content);
  if (!parsed.success) throw new Error("CMS_CONTENT_INVALID");
  return { content: parsed.data, updatedAt: new Date(String(rows[0].updated_at)).toISOString() };
}

const getCachedStoredContent = unstable_cache(readStoredContent, [SITE_CONTENT_CACHE_TAG], {
  tags: [SITE_CONTENT_CACHE_TAG],
  revalidate: 300,
});

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!isDatabaseConfigured()) return defaultSiteContent;

  try {
    return (await getCachedStoredContent())?.content ?? defaultSiteContent;
  } catch (error) {
    console.error("Unable to load CMS content for the public website.", error);
    return defaultSiteContent;
  }
});

export async function getAdminSiteContent(): Promise<AdminContentResult> {
  if (!isDatabaseConfigured()) {
    return { content: defaultSiteContent, databaseReady: false, storedContent: false, updatedAt: null, error: "DATABASE_URL is not available in this deployment." };
  }

  try {
    const record = await readStoredContent();
    return { content: record?.content ?? defaultSiteContent, databaseReady: true, storedContent: Boolean(record), updatedAt: record?.updatedAt ?? null, error: null };
  } catch (error) {
    console.error("Unable to load CMS content for the admin editor.", error);
    return {
      content: defaultSiteContent,
      databaseReady: false,
      storedContent: false,
      updatedAt: null,
      error: "The database could not be reached or its saved content is invalid. Editing is disabled to protect existing content.",
    };
  }
}

export async function saveSiteContent(content: SiteContent) {
  await ensureDatabaseSchema();
  const sql = getDatabase();
  const serialized = JSON.stringify(content);
  await sql`
    INSERT INTO cms_documents (key, content, updated_at)
    VALUES ('site-content', ${serialized}::jsonb, NOW())
    ON CONFLICT (key)
    DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
  `;
}
