# tech-velouralunelle

Website for **Veloura Lunelle Technologies**, a software and AI agency: [tech.velouralunelle.com](https://tech.velouralunelle.com)

Built with Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion and Resend, plus a built-in call scheduler (Postgres + Google Calendar).

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Script              | What it does                   |
| ------------------- | ------------------------------ |
| `npm run dev`       | Start the dev server           |
| `npm run build`     | Production build               |
| `npm run start`     | Serve the production build     |
| `npm run lint`      | ESLint                         |
| `npm run typecheck` | TypeScript check               |
| `npm run google:auth` | Connect Google Calendar (one-time, see below) |

## Environment variables

See [`.env.example`](.env.example) for all of them.

| Variable                               | Required | Purpose                                                        |
| -------------------------------------- | -------- | -------------------------------------------------------------- |
| `RESEND_API_KEY`                       | Yes      | Sends contact form emails                                      |
| `CONTACT_EMAIL`                        | Yes      | Inbox that receives leads                                      |
| `CONTACT_FROM_EMAIL`                   | No       | Sender address (must be on a domain verified in Resend)        |
| `NEXT_PUBLIC_SITE_URL`                 | Yes      | Public URL, no trailing slash. Used for canonical URLs, sitemap |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`          | Yes      | WhatsApp number, digits only (e.g. `15555550123`)              |
| `DATABASE_URL`                         | Yes      | Postgres for bookings (Neon via Vercel works well)             |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `GOOGLE_REFRESH_TOKEN` | Recommended | Google Calendar sync and Meet links for bookings |
| `GOOGLE_CALENDAR_ID`                   | No       | Calendar to use (default `primary`)                            |
| `ADMIN_PASSWORD`                       | Yes      | Password for `/admin/bookings` (username `admin`)              |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No       | Google Search Console ownership code                           |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`   | No       | Bing Webmaster Tools ownership code                            |

## Booking system

Visitors book a free call at [`/book`](app/book/page.tsx), Calendly-style: pick a day, pick a time (shown in their own time zone), add their details, done.

**What happens on a booking**

1. The slot is re-checked against working hours, other bookings and your Google Calendar. The database also refuses overlapping bookings, so double booking is impossible.
2. A Google Calendar event is created with a Google Meet link, and Google emails the guest an invite.
3. The guest gets a confirmation email with **Reschedule** and **Cancel** links (private page at `/book/manage/…`), and you get a notification. Reply to it to email the guest.

Without Google connected, bookings still work: emails include a calendar file (.ics) instead, with no Meet link.

**Settings** (hours, time zone, meeting length, buffer, notice, holidays) live in [`content/booking.ts`](content/booking.ts). Working hours are US Eastern by default; visitors always see times in their own zone.

**See and cancel bookings** at `/admin/bookings` (username `admin`, password `ADMIN_PASSWORD`). Cancel from there (or the guest's link), not directly in Google Calendar, so the booking record stays in sync.

### 1. Database (required)

In Vercel: **Storage → Create Database → Neon (Serverless Postgres)** and connect it to this project. It adds `DATABASE_URL` automatically. The bookings table is created on the first request; there's nothing else to run. For local development, copy `DATABASE_URL` into `.env.local`.

### 2. Google Calendar (recommended, ~10 minutes)

1. Open [Google Cloud Console](https://console.cloud.google.com/), create a project (e.g. "Veloura Bookings").
2. **APIs & Services → Library**: enable **Google Calendar API**.
3. **Google Auth Platform → Branding**: fill in the app name and your email. Under **Audience** choose **External**, then click **Publish app** ("In production"). *In "Testing" mode the connection expires after 7 days.*
4. **Clients → Create client → Desktop app**. Copy the client ID and secret into `.env.local` as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
5. Run `npm run google:auth`, open the link, and sign in with the Google account whose calendar should take bookings. Google will warn that the app isn't verified; that's expected for your own app: click **Advanced → Go to …**.
6. Copy the printed `GOOGLE_REFRESH_TOKEN`, then add all three `GOOGLE_*` values to Vercel.

The app only asks for permission to manage events and see free/busy times, not to read your other events' details.

### 3. Email

Booking emails use Resend, like the contact form. **Set `CONTACT_FROM_EMAIL` to an address on a domain verified in Resend**; with Resend's test sender, emails only reach your own Resend account, so guests would not get their confirmations.

## Editing content

All page text lives in [`/content`](content) as TypeScript files, so you can edit copy without touching components:

- `home.ts`, `about.ts`, `contact.ts`, `industries.ts`, `faqs.ts`, `legal.ts`
- `booking.ts`: scheduler settings (hours, time zone, meeting length) and the /book page text
- `services/*.ts`: one file per service page (add a file and register it in `services/index.ts`)
- `projects.ts`, `testimonials.ts`: portfolio and reviews (currently placeholders)

Site-wide settings (name, email, socials, booking link) are in [`lib/site.ts`](lib/site.ts). After changing page content, update `contentUpdated` there so the sitemap's dates stay accurate.

Colours, shadows and gradients are named tokens in [`tailwind.config.ts`](tailwind.config.ts). Components use only these tokens, never raw hex values.

## SEO

- Per-page title, description, canonical URL, Open Graph and Twitter tags via `createMetadata` in [`lib/metadata.ts`](lib/metadata.ts)
- Generated share images for the site and each service
- `/sitemap.xml` (with lastmod and image entries) and `/robots.txt`
- JSON-LD: Organization and WebSite on the home page, Service on service pages, FAQPage wherever FAQs appear, BreadcrumbList on inner pages

## Deploying to Vercel

1. Import this repository in Vercel (framework preset: Next.js).
2. Add the environment variables above for the Production environment, and create the Neon database (see [Booking system](#booking-system)).
3. Add the custom domain `tech.velouralunelle.com`.
4. In Google Search Console, add the site, verify it (DNS or `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`), and submit `https://tech.velouralunelle.com/sitemap.xml`.

## Project structure

```
app/          Routes, metadata, sitemap, robots, share images, server actions
components/   Page sections and layout; components/ui holds shadcn/ui primitives
content/      All editable text
lib/          Site config, SEO helpers, validation, emails, booking logic (lib/booking)
scripts/      One-time setup scripts (Google Calendar connection)
public/       Static images and logo
```
