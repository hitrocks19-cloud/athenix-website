# Athenix Website

Next.js 16 (App Router) + TypeScript + Tailwind CSS site for **Athenix
Learning** (AI/Data training for individuals) and **Athenix Consultancy**
(AI/automation for businesses), with a cinematic-video architecture.

## Project setup

Requires **Node.js 18.18+** (Node.js was not found on the machine this was
built on — install it from [nodejs.org](https://nodejs.org) first).

```bash
cd athenix-website
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

Open http://localhost:3000.

## Environment variables

Set these in `.env.local` (never commit real values — `.env.local` is
git-ignored). See `.env.example` for the full list.

| Variable | Required for | Notes |
|---|---|---|
| `GOOGLE_SHEETS_WEBHOOK_URL` | Lead delivery | URL of an Apps Script Web App (or similar) that appends a row per submission. |
| `LEAD_NOTIFICATION_EMAIL` | Lead delivery | Where new-lead emails are sent. |
| `EMAIL_PROVIDER_API_KEY`, `EMAIL_FROM` | Lead delivery | Credentials for the email provider used in `src/lib/leadDelivery.ts` (wired for Resend's API by default — swap the fetch call for your provider). |

If any of these are missing, the corresponding feature degrades
gracefully instead of crashing: that delivery channel is skipped and
logged; the other still runs; the form still shows success once
validation + rate-limiting pass.

## Cinematic video assets

Videos are produced separately (not generated per-visitor) and dropped
into `/public/videos`. Register each one in `src/content/videos.ts`
(`cinematicVideos`) — nothing else in the app hardcodes a video path.
Until an `mp4` path is set, `<CinematicVideo>` shows the poster image
only (no broken video, no wasted request).

## Images

See `public/images/MANIFEST.md` for the exact checklist of real photos
still needed and where they go. Every image in the site goes through
`SmartImage` (`src/components/ui/SmartImage.tsx`), which falls back to a
labeled placeholder if the file isn't there yet — nothing ever renders
broken.

## Google Sheets configuration

`scripts/google-sheets-webhook.gs` is a ready-to-paste Apps Script that
matches the payload `src/lib/leadDelivery.ts` already sends — it writes
each lead type to its own tab (creating the tab and bold header row
automatically the first time that form type comes in).

1. Create a new Google Sheet (any name — this becomes your leads sheet).
2. **Extensions → Apps Script**. Delete the placeholder code and paste in
   the full contents of `scripts/google-sheets-webhook.gs`.
3. **Deploy → New deployment**. Click the gear icon next to "Select type"
   and choose **Web app**.
4. Set:
   - **Execute as**: Me
   - **Who has access**: Anyone
   (This makes the URL a shared secret — anyone with the link can post
   rows, but they can't read the sheet or discover the URL from the
   website, since it's only ever called server-side.)
5. Click **Deploy**, authorize the script when prompted (it needs
   permission to edit the spreadsheet), and copy the **Web app URL** —
   it looks like `https://script.google.com/macros/s/AKfycb.../exec`.
6. Put that URL in `GOOGLE_SHEETS_WEBHOOK_URL` in `.env.local` and
   restart the dev server.
7. Submit a test form — three tabs will appear as each lead type is
   first received: **Webinar Leads**, **Corporate Training Leads**,
   **Consultancy Leads**, each with its own header row:

   | Tab | Columns |
   |---|---|
   | Webinar Leads | Timestamp, Full Name, Email, WhatsApp, Date of Birth, Occupation, Course Interest, Webinar, Consent |
   | Corporate Training Leads | Timestamp, Full Name, Work Email, Phone, Company, Designation, Team Size, Training Requirement, Preferred Format, Message |
   | Consultancy Leads | Timestamp, Full Name, Business Email, Phone, Company, Industry, Business Size, Improvement Goal, Current Challenges, Preferred Contact |

If you'd rather set the headers up yourself instead of letting the
script create them, just add that exact header row to each tab (using
those exact tab names) before testing — the script only inserts headers
into a tab it finds empty.

Redeploying after editing the script: **Deploy → Manage deployments →
edit (pencil) → Version: New version → Deploy** — the URL stays the
same, so you don't need to update `.env.local` again.

## Local development

```bash
npm run dev      # start dev server
npm run lint      # lint
npm run build     # production build
npm run start     # run the production build locally
```

## Production build & deployment

```bash
npm run build
npm run start
```

This is a standard Next.js app — deploy it anywhere Next.js is supported
(Vercel, or any Node host / Lovable-connected custom domain). Set the
environment variables above in your hosting provider's dashboard; none of
them are baked into the build.

## Custom domain setup

1. Deploy the app to your host.
2. Point your domain's DNS at the host per its instructions.
3. Update `siteUrl` in `src/app/layout.tsx`, `src/app/sitemap.ts` and
   `src/app/robots.ts` to the final domain.

## Architecture notes

- **Content is data, not markup.** Courses, trainers, testimonials,
  corporate clients, services, webinars, FAQs, nav and image/video
  registries all live in `src/content/*.ts`. Update content there, not
  inside components.
- **No pricing beyond the two public webinars** (₹199 Excel Webinar,
  ₹499 Mastery in Claude) is shown anywhere on the site, per the brand's
  positioning — course pages intentionally omit pricing and full
  curricula.
- **No internal funnel logic** is anywhere in this codebase.
