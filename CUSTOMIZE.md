# Managing the ABLE website

Use the protected CMS at `/admin/login` for normal updates. No code editing is required.

## Dashboard sections

- **Enquiries:** search, filter, contact customers, update status and keep private notes.
- **Projects:** create drafts, upload cover/gallery images and publish verified completed work.
- **Testimonials:** save drafts and publish only genuine, permission-approved feedback.
- **Site content:** manage the logo, tagline, section headings, services, map, FAQs and legal copy.

The verified company name, phone, email, address and service-area statement are intentionally locked to prevent accidental production changes.

## Images

Hero and about images are general website presentation imagery. Real completed-project images belong in the Projects editor and require accurate titles, locations and alt text. Vercel Blob stores CMS uploads persistently.

## Publishing rules

- Draft projects and testimonials never appear publicly.
- Do not create customer reviews or completed-project claims without real source material and permission.
- The same navigation/footer logo uses independent size controls in the Site Content editor.
- Save general site-content changes with **Publish changes**.

## Validate before release

```bash
npm run lint
npm run typecheck
npm run build
```
