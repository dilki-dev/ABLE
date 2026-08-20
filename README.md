# ABLE Property Maintenance website

A premium, modular Next.js website and protected content-management backend for a Sri Lankan property-maintenance business. The site uses the App Router, TypeScript, Tailwind CSS, Lucide icons, Motion, PostgreSQL and optional Vercel Blob storage.

## Start locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```text
src/
|-- app/          Page composition, global CSS, metadata, robots and sitemap
|-- components/
|   |-- layout/   Header, mobile menu, logo and footer
|   |-- sections/ One file for each visible homepage section
|   |-- admin/    CMS editor and enquiry inbox
|   `-- ui/       Reusable cards, icons, form, animation and floating actions
|-- backend/      Database, sessions, content and enquiry access
|-- cms/          Validated CMS content model and public helpers
|-- data/         Editable service and section content
`-- lib/          Business details and links
database/         Reviewable PostgreSQL schema
public/images/    Project-local generated placeholder photography
```

The homepage order is intentionally easy to read in `src/app/page.tsx`. See [CUSTOMIZE.md](./CUSTOMIZE.md) for content editing and [BACKEND_SETUP.md](./BACKEND_SETUP.md) for the production database and CMS connection.

## Quality checks

```bash
npm run lint
npm run build
```

The `main` branch is connected to the Vercel project at `ableksjnvks.vercel.app`. A verified push to `main` triggers the production deployment.
