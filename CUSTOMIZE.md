# How to customize the ABLE website

You do not need to understand all of Next.js to change this landing page. Use this guide to find the correct file.

## Change words, links, statistics, or list items

Open:

`src/data/landing-page.ts`

This single file contains the brand name, navigation, hero text, services, process steps, case-study details, testimonial, email address, and social links.

## Change the order of homepage sections

Open:

`src/app/page.tsx`

The components appear in the same order as the sections on the page. Move a component line to move that whole section.

## Change a visible section

Open the matching file in:

`src/components/sections/`

| Website section | Component file | Style file |
| --- | --- | --- |
| Hero and dashboard preview | `hero-section.tsx` | `hero-section.module.css` |
| Client names | `logo-cloud.tsx` | `logo-cloud.module.css` |
| Services | `services-section.tsx` | `services-section.module.css` |
| Three-step process | `process-section.tsx` | `process-section.module.css` |
| Featured project | `project-spotlight.tsx` | `project-spotlight.module.css` |
| Client quote | `testimonial-section.tsx` | `testimonial-section.module.css` |
| Final contact block | `final-cta-section.tsx` | `final-cta-section.module.css` |

## Change the header or footer

Open:

- `src/components/layout/site-header.tsx`
- `src/components/layout/site-footer.tsx`

Their matching `.module.css` files control their appearance.

## Change global colors and sizing

Open `src/app/globals.css` and edit the values under `:root`:

```css
--ink: #101116;
--paper: #f5f1e8;
--lime: #c9ff58;
--violet: #6c5ce7;
--orange: #ff7657;
```

These named color variables are reused throughout the website, so changing one updates every component that uses it.

## Change the browser title and search description

Open `src/app/layout.tsx` and edit the `metadata` object.

## Add images

Place image files in `public/`, then reference them from a component as `/your-image.jpg`. Use the Next.js `Image` component when adding content images.

## Before publishing

Run:

```bash
npm run lint
npm run build
```

Only publish after both commands pass.
