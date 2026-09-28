# tech-velouralunelle

Website for **Veloura Lunelle Technologies**, a software and AI agency: [tech.velouralunelle.com](https://tech.velouralunelle.com)

Built with Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion and Resend.

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

## Environment variables

See [`.env.example`](.env.example) for all of them.

| Variable                               | Required | Purpose                                                        |
| -------------------------------------- | -------- | -------------------------------------------------------------- |
| `RESEND_API_KEY`                       | Yes      | Sends contact form emails                                      |
| `CONTACT_EMAIL`                        | Yes      | Inbox that receives leads                                      |
| `CONTACT_FROM_EMAIL`                   | No       | Sender address (must be on a domain verified in Resend)        |
| `NEXT_PUBLIC_SITE_URL`                 | Yes      | Public URL, no trailing slash. Used for canonical URLs, sitemap |
| `NEXT_PUBLIC_CALENDLY_URL`             | Yes      | "Book a Call" link                                             |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`          | Yes      | WhatsApp number, digits only (e.g. `15555550123`)              |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No       | Google Search Console ownership code                           |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`   | No       | Bing Webmaster Tools ownership code                            |

## Editing content

All page text lives in [`/content`](content) as TypeScript files, so you can edit copy without touching components:

- `home.ts`, `about.ts`, `contact.ts`, `industries.ts`, `faqs.ts`, `legal.ts`
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
2. Add the environment variables above for the Production environment.
3. Add the custom domain `tech.velouralunelle.com`.
4. In Google Search Console, add the site, verify it (DNS or `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`), and submit `https://tech.velouralunelle.com/sitemap.xml`.

## Project structure

```
app/          Routes, metadata, sitemap, robots, share images
components/   Page sections and layout; components/ui holds shadcn/ui primitives
content/      All editable text
lib/          Site config, SEO helpers, validation, email template
public/       Static images and logo
```
