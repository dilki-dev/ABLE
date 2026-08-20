# ABLE backend and CMS setup

The backend code is included in the same Next.js project. The public website continues to use its current built-in content until the database is connected, so a missing service cannot break the landing page.

## What is included

- Password-protected CMS at `/admin/login`
- Structured editors for business details and every public website section
- PostgreSQL storage for CMS content and quote enquiries
- Enquiry validation, honeypot spam protection and per-address rate limiting
- Private enquiry statuses and admin notes
- Optional image uploads through Vercel Blob
- Signed, HTTP-only 12-hour admin sessions
- Automatic fallback to the current website content if the database is unavailable

## 1. Connect PostgreSQL in Vercel

Open the `ableksjnvks` project in Vercel and select **Storage**. Create or connect a Neon PostgreSQL database. Make sure Vercel adds its connection string as:

```text
DATABASE_URL
```

The application creates the required tables automatically on the first database request. The same SQL is available in `database/schema.sql` for manual review.

## 2. Add the admin secrets

In **Vercel → Project Settings → Environment Variables**, add these private variables to Production, Preview and Development:

```text
ADMIN_PASSWORD=<a strong password used only for this CMS>
SESSION_SECRET=<at least 32 random characters>
ENQUIRY_HASH_SECRET=<another long random value>
```

Never prefix these values with `NEXT_PUBLIC_`, and never commit their real values to Git.

## 3. Connect media uploads (recommended)

In Vercel Storage, create a public Blob store named `Images`. Vercel will add:

```text
BLOB_READ_WRITE_TOKEN
```

Without Blob, content editing and enquiries still work; only the CMS image-upload button remains disabled. Image URL fields can still use existing `/images/...` assets.

## 4. Redeploy and sign in

Environment-variable changes require a fresh deployment. After redeploying, open:

```text
https://ableksjnvks.vercel.app/admin/login
```

Sign in with `ADMIN_PASSWORD`. The dashboard will show green status labels for the connected database and media storage.

## Local development

Copy `.env.example` to `.env.local`, replace every placeholder locally, then run:

```bash
npm run dev
```

Do not commit `.env.local`.

## Enquiry behavior

The public quote form stores valid submissions in PostgreSQL. They appear in the CMS inbox, where an admin can mark them as new, contacted, quoted, closed or spam and add private notes.

The system stores only a one-way hash of the submitting network address for rate limiting. It does not store the raw address.

## Backups and future upgrades

- Enable backups in the selected PostgreSQL provider.
- Add transactional email notifications later if ABLE wants instant email alerts in addition to the CMS inbox.
- A second administrator or role system should use a full authentication provider rather than sharing the single admin password.
