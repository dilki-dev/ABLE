import "server-only";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let schemaPromise: Promise<void> | null = null;

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDatabase(): NeonQueryFunction<false, false> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_NOT_CONFIGURED");
  return neon(connectionString);
}

export async function ensureDatabaseSchema() {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const sql = getDatabase();
      await sql`
        CREATE TABLE IF NOT EXISTS cms_documents (
          key TEXT PRIMARY KEY,
          content JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        UPDATE cms_documents
        SET content = REPLACE(content::text, 'hello@ablepropertymaintenance.lk', 'hello@ableconstructions.lk')::jsonb,
            updated_at = NOW()
        WHERE key = 'site-content'
          AND content::text LIKE '%hello@ablepropertymaintenance.lk%'
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS enquiries (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          reference TEXT UNIQUE,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT,
          whatsapp TEXT,
          location TEXT NOT NULL DEFAULT '',
          service TEXT NOT NULL,
          message TEXT NOT NULL,
          additional_message TEXT NOT NULL DEFAULT '',
          preferred_contact TEXT NOT NULL DEFAULT 'phone',
          consent BOOLEAN NOT NULL DEFAULT FALSE,
          submission_token UUID UNIQUE,
          status TEXT NOT NULL DEFAULT 'new',
          admin_notes TEXT NOT NULL DEFAULT '',
          ip_hash TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS reference TEXT`;
      await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS whatsapp TEXT`;
      await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS location TEXT NOT NULL DEFAULT ''`;
      await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS additional_message TEXT NOT NULL DEFAULT ''`;
      await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS preferred_contact TEXT NOT NULL DEFAULT 'phone'`;
      await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS consent BOOLEAN NOT NULL DEFAULT FALSE`;
      await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS submission_token UUID`;
      await sql`UPDATE enquiries SET reference = 'ABLE-' || EXTRACT(YEAR FROM created_at)::int || '-' || UPPER(SUBSTRING(REPLACE(id::text, '-', '') FROM 1 FOR 6)) WHERE reference IS NULL`;
      await sql`ALTER TABLE enquiries ALTER COLUMN reference SET NOT NULL`;
      await sql`
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_constraint
            WHERE conname = 'enquiries_status_check'
              AND pg_get_constraintdef(oid) LIKE '%scheduled%'
          ) THEN
            ALTER TABLE enquiries DROP CONSTRAINT IF EXISTS enquiries_status_check;
            ALTER TABLE enquiries ADD CONSTRAINT enquiries_status_check CHECK (status IN ('new', 'contacted', 'quoted', 'scheduled', 'completed', 'closed', 'spam'));
          END IF;
        END $$
      `;
      await sql`CREATE UNIQUE INDEX IF NOT EXISTS enquiries_reference_idx ON enquiries (reference)`;
      await sql`CREATE UNIQUE INDEX IF NOT EXISTS enquiries_submission_token_idx ON enquiries (submission_token) WHERE submission_token IS NOT NULL`;
      await sql`CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC)`;
      await sql`CREATE INDEX IF NOT EXISTS enquiries_ip_created_idx ON enquiries (ip_hash, created_at DESC)`;
      await sql`
        CREATE TABLE IF NOT EXISTS admin_login_attempts (
          id BIGSERIAL PRIMARY KEY,
          ip_hash TEXT NOT NULL,
          succeeded BOOLEAN NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS admin_login_attempts_ip_created_idx ON admin_login_attempts (ip_hash, created_at DESC)`;
      await sql`
        CREATE TABLE IF NOT EXISTS projects (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          category TEXT NOT NULL,
          location TEXT NOT NULL,
          short_description TEXT NOT NULL,
          description TEXT NOT NULL,
          cover_image TEXT NOT NULL,
          cover_alt TEXT NOT NULL,
          gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
          completion_date DATE,
          featured BOOLEAN NOT NULL DEFAULT FALSE,
          status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
          seo_title TEXT NOT NULL DEFAULT '',
          seo_description TEXT NOT NULL DEFAULT '',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS projects_public_idx ON projects (status, featured DESC, created_at DESC)`;
      await sql`
        CREATE TABLE IF NOT EXISTS testimonials (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          customer_name TEXT NOT NULL,
          location TEXT NOT NULL DEFAULT '',
          review TEXT NOT NULL,
          rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
          featured BOOLEAN NOT NULL DEFAULT FALSE,
          status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS testimonials_public_idx ON testimonials (status, featured DESC, created_at DESC)`;
    })().catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }
  await schemaPromise;
}
