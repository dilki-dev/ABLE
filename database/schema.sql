CREATE TABLE IF NOT EXISTS cms_documents (
  key TEXT PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Idempotent correction for legacy contact details stored inside CMS JSON.
UPDATE cms_documents
SET content = REPLACE(content::text, 'hello@ablepropertymaintenance.lk', 'hello@ableconstructions.lk')::jsonb,
    updated_at = NOW()
WHERE key = 'site-content'
  AND content::text LIKE '%hello@ablepropertymaintenance.lk%';

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
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'scheduled', 'completed', 'closed', 'spam')),
  admin_notes TEXT NOT NULL DEFAULT '',
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_ip_created_idx ON enquiries (ip_hash, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS enquiries_reference_idx ON enquiries (reference);
CREATE UNIQUE INDEX IF NOT EXISTS enquiries_submission_token_idx ON enquiries (submission_token) WHERE submission_token IS NOT NULL;

CREATE TABLE IF NOT EXISTS admin_login_attempts (
  id BIGSERIAL PRIMARY KEY,
  ip_hash TEXT NOT NULL,
  succeeded BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS admin_login_attempts_ip_created_idx ON admin_login_attempts (ip_hash, created_at DESC);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id_hash TEXT PRIMARY KEY,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS admin_sessions_expires_idx ON admin_sessions (expires_at);

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
);

ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS reference TEXT;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS whatsapp TEXT;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS location TEXT NOT NULL DEFAULT '';
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS additional_message TEXT NOT NULL DEFAULT '';
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS preferred_contact TEXT NOT NULL DEFAULT 'phone';
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS consent BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS submission_token UUID;
UPDATE enquiries SET reference = 'ABLE-' || EXTRACT(YEAR FROM created_at)::int || '-' || UPPER(SUBSTRING(REPLACE(id::text, '-', '') FROM 1 FOR 6)) WHERE reference IS NULL;
ALTER TABLE enquiries ALTER COLUMN reference SET NOT NULL;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'enquiries_status_check' AND pg_get_constraintdef(oid) LIKE '%scheduled%') THEN
    ALTER TABLE enquiries DROP CONSTRAINT IF EXISTS enquiries_status_check;
    ALTER TABLE enquiries ADD CONSTRAINT enquiries_status_check CHECK (status IN ('new', 'contacted', 'quoted', 'scheduled', 'completed', 'closed', 'spam'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS projects_public_idx ON projects (status, featured DESC, created_at DESC);

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
);

CREATE INDEX IF NOT EXISTS testimonials_public_idx ON testimonials (status, featured DESC, created_at DESC);
