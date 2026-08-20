# ABLE Property Maintenance website

A premium, modular Next.js landing page for a Sri Lankan property-maintenance business. The site uses the App Router, TypeScript, Tailwind CSS, Lucide icons, Motion animations and local image assets.

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
|   `-- ui/       Reusable cards, icons, form, animation and floating actions
|-- data/         Editable service and section content
`-- lib/          Business details and links
public/images/    Project-local generated placeholder photography
```

The homepage order is intentionally easy to read in `src/app/page.tsx`. See [CUSTOMIZE.md](./CUSTOMIZE.md) for the exact file to edit for each website element.

## Quality checks

```bash
npm run lint
npm run build
```

The `main` branch is connected to the Vercel project at `ableksjnvks.vercel.app`. A verified push to `main` triggers the production deployment.
