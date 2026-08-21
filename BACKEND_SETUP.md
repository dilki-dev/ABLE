# ABLE production backend setup

The application uses the existing Neon PostgreSQL database and Vercel Blob store. Schema upgrades are additive and idempotent; existing CMS content and enquiries are preserved.

## Required Vercel environment variables

Add these to Production and Preview, then redeploy:

```text
DATABASE_URL=<existing Neon connection string>
ADMIN_PASSWORD_HASH=<bcrypt hash>
SESSION_SECRET=<random value of at least 32 characters>
ENQUIRY_HASH_SECRET=<separate long random value>
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<Cloudflare Turnstile site key>
TURNSTILE_SECRET_KEY=<Cloudflare Turnstile secret key>
BLOB_READ_WRITE_TOKEN=<existing Vercel Blob token>
```

Generate the password hash locally without printing the password:

```bash
npm run hash-admin-password
```

Copy only the resulting bcrypt hash into `ADMIN_PASSWORD_HASH`. Remove the legacy plaintext `ADMIN_PASSWORD` variable after the hash is installed. Never prefix secrets with `NEXT_PUBLIC_`.

## Cloudflare Turnstile

Create one Turnstile widget for `ableconstructions.lk` and `www.ableconstructions.lk`, then add its site and secret keys above. Production quote submission and admin login deliberately remain disabled if Turnstile is missing. Local development can explicitly set `TURNSTILE_DEV_BYPASS=true`; never enable that variable in Production or Preview.

## Optional Resend notifications

Cloudflare Email Routing handles incoming mail only. It is not outbound SMTP. To send optional admin notifications after an enquiry is safely stored, configure:

```text
RESEND_API_KEY=
FROM_EMAIL=<a sender verified in Resend>
ADMIN_NOTIFICATION_EMAIL=<notification destination>
REPLY_TO_EMAIL=hello@ableconstructions.lk
```

If these variables are absent or delivery fails, the saved enquiry remains available in the admin dashboard.

## Optional Search Console verification

```text
GOOGLE_SITE_VERIFICATION=<verification token only>
```

## Database and media

The app creates and upgrades its required tables on the first database-backed request. `database/schema.sql` is available for review. Admin JWTs contain a random session identifier whose HMAC is stored in Neon, allowing logout to revoke the server-side session immediately. Changing the session format or `SESSION_SECRET` intentionally requires a fresh admin sign-in. CMS images are validated and stored in the connected public Vercel Blob store; the Vercel filesystem is never used for persistent uploads.
