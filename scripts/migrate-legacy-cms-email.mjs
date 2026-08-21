import nextEnv from "@next/env";
import { neon } from "@neondatabase/serverless";

const legacyEmail = "hello@ablepropertymaintenance.lk";
const productionEmail = "hello@ableconstructions.lk";

nextEnv.loadEnvConfig(process.cwd());
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured.");

const sql = neon(process.env.DATABASE_URL);
const searchPattern = `%${legacyEmail}%`;
const before = await sql`
  SELECT key,
    ((LENGTH(content::text) - LENGTH(REPLACE(content::text, ${legacyEmail}, ''))) / LENGTH(${legacyEmail}))::int AS occurrences
  FROM cms_documents
  WHERE content::text LIKE ${searchPattern}
  ORDER BY key
`;

const updated = await sql`
  UPDATE cms_documents
  SET content = REPLACE(content::text, ${legacyEmail}, ${productionEmail})::jsonb,
      updated_at = NOW()
  WHERE key = 'site-content'
    AND content::text LIKE ${searchPattern}
  RETURNING key
`;

const after = await sql`
  SELECT COUNT(*)::int AS records,
    COALESCE(SUM((LENGTH(content::text) - LENGTH(REPLACE(content::text, ${legacyEmail}, ''))) / LENGTH(${legacyEmail})), 0)::int AS occurrences
  FROM cms_documents
  WHERE content::text LIKE ${searchPattern}
`;

const remainingOccurrences = Number(after[0]?.occurrences ?? 0);
console.log(JSON.stringify({ before, updatedKeys: updated.map((row) => row.key), remainingOccurrences }));
if (remainingOccurrences !== 0) throw new Error("Legacy CMS email remains after migration.");
