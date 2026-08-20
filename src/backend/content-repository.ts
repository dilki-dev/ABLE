import "server-only";
import { cache } from "react";
import { defaultSiteContent, siteContentSchema, type SiteContent } from "@/cms/content-schema";
import { ensureDatabaseSchema, getDatabase, isDatabaseConfigured } from "./database";

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!isDatabaseConfigured()) return defaultSiteContent;

  try {
    await ensureDatabaseSchema();
    const sql = getDatabase();
    const rows = await sql`SELECT content FROM cms_documents WHERE key = 'site-content' LIMIT 1`;
    if (!rows[0]?.content) return defaultSiteContent;
    const parsed = siteContentSchema.safeParse(rows[0].content);
    return parsed.success ? parsed.data : defaultSiteContent;
  } catch {
    return defaultSiteContent;
  }
});

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
