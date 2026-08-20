# How to customize the ABLE website

After the backend is connected, use the protected CMS at `/admin/login` for normal content updates. You do not need to edit code or understand Next.js.

## Most common changes

- Default fallback content and validation rules: `src/cms/content-schema.ts`
- CMS-managed business details, services, projects, process, areas and FAQs: `/admin`
- Homepage section order: `src/app/page.tsx`
- Global colours and shared sizing: `src/app/globals.css`
- Search title, description and social sharing settings: `src/app/layout.tsx`

## Visible sections

| Website area | File |
| --- | --- |
| Header | `src/components/layout/header.tsx` |
| Mobile menu | `src/components/layout/mobile-menu.tsx` |
| Logo placeholder | `src/components/layout/logo.tsx` |
| Hero | `src/components/sections/hero.tsx` |
| Trust bar | `src/components/sections/trust-bar.tsx` |
| Services | `src/components/sections/services.tsx` |
| About | `src/components/sections/about.tsx` |
| Why choose us | `src/components/sections/why-choose-us.tsx` |
| Project gallery | `src/components/sections/projects.tsx` |
| Process | `src/components/sections/process.tsx` |
| Testimonials placeholder | `src/components/sections/testimonials.tsx` |
| Service areas | `src/components/sections/service-areas.tsx` |
| FAQ | `src/components/sections/faq.tsx` |
| Map | `src/components/sections/map-section.tsx` |
| Quote/contact | `src/components/sections/contact.tsx` |
| Final call to action | `src/components/sections/final-cta.tsx` |
| Footer | `src/components/layout/footer.tsx` |

## Images

The current generated placeholders are in `public/images/`. Keep the filenames when replacing them and the website will update automatically.

- `hero-property-maintenance.png`
- `about-able-team.png`
- `project-bathroom-fitting.png`
- `project-exterior-painting.png`
- `project-kitchen-carpentry.png`

Use real ABLE project photos only with permission. Upload them through the CMS and update the matching project title, service and location at the same time.

## Important launch replacements

1. Replace the CSS logo mark in `src/components/layout/logo.tsx` with the final logo asset.
2. Verify the secondary number `+713422304`; it is deliberately not a clickable call link because its international format is unclear.
3. Connect PostgreSQL so the quote form can store enquiries in the CMS inbox. See `BACKEND_SETUP.md`.
4. Replace project placeholders with verified project photos and facts.
5. Add only genuine, permission-approved customer reviews.
6. Set `NEXT_PUBLIC_SITE_URL` to the final custom domain in Vercel after the domain is connected.
7. Add real social profile links in the footer when they are available.

## Check before publishing

```bash
npm run lint
npm run build
```
