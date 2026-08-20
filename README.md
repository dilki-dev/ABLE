# ABLE website

A modular Next.js landing page built so each visible part of the website is easy to find and edit.

## Start locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```text
src/
├── app/
│   ├── globals.css          Global colors, spacing, and base styles
│   ├── layout.tsx           SEO title, description, and page shell
│   └── page.tsx             Homepage section order only
├── components/
│   ├── layout/              Header and footer
│   ├── sections/            One file per visible landing-page section
│   └── ui/                  Small reusable elements such as buttons
└── data/
    └── landing-page.ts      All editable text, links, stats, and lists
```

Each component has a matching `.module.css` file beside it. For example:

- `hero-section.tsx` contains the hero markup.
- `hero-section.module.css` contains only the hero styles.
- `landing-page.ts` contains the hero text.

See [CUSTOMIZE.md](./CUSTOMIZE.md) for a beginner-friendly editing guide.

## Quality checks

```bash
npm run lint
npm run build
```

The `main` branch is connected to Vercel. Pushing a verified commit to `main` triggers a production deployment.
