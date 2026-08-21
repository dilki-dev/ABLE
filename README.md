# ABLE Property Maintenance website

Production Next.js website and protected CMS for **ABLE Property Maintenance (Pvt) Ltd**.

- Canonical website: `https://www.ableconstructions.lk`
- Admin: `https://www.ableconstructions.lk/admin/login`
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Neon PostgreSQL and Vercel Blob

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and add local-only values. Never commit real secrets.

## Project structure

```text
src/app/          Pages, Route Handlers, metadata, robots and sitemap
src/backend/      Server-only database, auth, security and notification code
src/cms/          Validated general site-content model
src/components/   Public sections, shared UI and admin editors
database/         Reviewable additive PostgreSQL schema
public/images/    General website imagery (not claimed as completed projects)
```

Projects and testimonials are separate draft/published PostgreSQL records. Only published records appear publicly. Enquiries are validated, anti-bot checked and saved before any optional notification email is attempted.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

See `BACKEND_SETUP.md` for environment variables and `CUSTOMIZE.md` for everyday CMS use.
