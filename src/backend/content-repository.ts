import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { defaultLegalPages, defaultSiteContent, siteContentSchema, type SiteContent } from "@/cms/content-schema";
import { siteConfig } from "@/lib/site-config";
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

function applyProductionContentPolicy(content: SiteContent): SiteContent {
  const privacySections = content.legal.privacy.sections.map((section) => {
    if (section.heading === "Information we collect" && !/WhatsApp number/i.test(section.body)) return defaultLegalPages.privacy.sections.find((item) => item.heading === section.heading) ?? section;
    if (section.heading === "Service providers and disclosure" && !/Cloudflare Turnstile/i.test(section.body)) return defaultLegalPages.privacy.sections.find((item) => item.heading === section.heading) ?? section;
    return section;
  });
  return {
    ...content,
    business: {
      ...content.business,
      name: siteConfig.name,
      address: siteConfig.address,
      phoneDisplay: siteConfig.phoneDisplay,
      phoneRaw: siteConfig.phoneRaw,
      secondaryPhoneDisplay: "",
      email: siteConfig.email,
      description: /Professional maintenance, repairs and property improvements/i.test(content.business.description) ? siteConfig.description : content.business.description,
      coverage: "Colombo and Greater Colombo, with selected projects island-wide across Sri Lanka",
    },
    hero: { ...content.hero, description: /throughout Sri Lanka/i.test(content.hero.description) ? siteConfig.description : content.hero.description },
    about: /being built/i.test(content.about.description) ? { ...content.about, description: defaultSiteContent.about.description, body: defaultSiteContent.about.body } : content.about,
    projectsSection: /preview|generated|placeholder/i.test(`${content.projectsSection.title} ${content.projectsSection.description}`) ? defaultSiteContent.projectsSection : { ...content.projectsSection, notice: "" },
    projects: [],
    testimonials: /home for verified reviews|intentionally transparent/i.test(`${content.testimonials.title} ${content.testimonials.description}`) ? defaultSiteContent.testimonials : { ...content.testimonials, items: [] },
    areas: /core coverage|nearby areas/i.test(content.areas.description) ? { ...content.areas, title: defaultSiteContent.areas.title, description: defaultSiteContent.areas.description } : content.areas,
    faqs: content.faqs.filter((faq) => !/online form already sending|delivery service still needs/i.test(`${faq.question} ${faq.answer}`)).map((faq) => /is positioned|core service area is Colombo and nearby/i.test(faq.answer) ? (defaultSiteContent.faqs.find((item) => item.question === faq.question) ?? faq) : faq),
    legal: { ...content.legal, privacy: { ...content.legal.privacy, sections: privacySections } },
  };
}

async function readStoredContent(): Promise<StoredContentRecord | null> {
  await ensureDatabaseSchema();
  const sql = getDatabase();
  const rows = await sql`SELECT content, updated_at FROM cms_documents WHERE key = 'site-content' LIMIT 1`;
  if (!rows[0]?.content) return null;
  const parsed = siteContentSchema.safeParse(rows[0].content);
  if (!parsed.success) throw new Error("CMS_CONTENT_INVALID");
  return { content: applyProductionContentPolicy(parsed.data), updatedAt: new Date(String(rows[0].updated_at)).toISOString() };
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
    console.error("Unable to load CMS content for the public website.", { errorType: error instanceof Error ? error.name : "UnknownError" });
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
    console.error("Unable to load CMS content for the admin editor.", { errorType: error instanceof Error ? error.name : "UnknownError" });
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
  const serialized = JSON.stringify(applyProductionContentPolicy(content));
  await sql`
    INSERT INTO cms_documents (key, content, updated_at)
    VALUES ('site-content', ${serialized}::jsonb, NOW())
    ON CONFLICT (key)
    DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
  `;
}
