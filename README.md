# DrKartini.net

The official website of **Dr Kartini Farah Rahim, Consultant Dermatologist**, Shah Alam, Malaysia.

It replaces the Wix site at `https://www.drkartini.net` on the same domain, with 301 redirects from every old URL.

- **Stack:** Astro 7, static HTML with almost no JavaScript, Markdown content collections, sharp image pipeline
- **Output:** `dist/`, plain static files
- **Hosting:** Vercel (settings in `vercel.json`)
- **Node:** 24.x

---

## Commands

```bash
npm ci               # install exact versions from package-lock.json
npm run dev          # local dev server at http://localhost:4321
npm run build        # production build to dist/
npm run audit        # SEO, social preview and page-weight audit of dist/
npm run build:audit  # build, then audit (must report 0 errors)
npm run preview      # serve dist/ locally
npm run icons        # regenerate PNG and ICO icons from public/favicon.svg
```

---

## Deploying on Vercel

1. In Vercel, choose **Add New > Project** and import this GitHub repository.
2. Leave the settings as detected. `vercel.json` already sets:
   - Framework: Astro
   - Install command: `npm ci`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Trailing slashes, 301 redirects from the old Wix URLs, security headers and asset caching
3. Optional environment variables (Project Settings > Environment Variables). All are safe to leave empty:

   | Variable | Purpose |
   |---|---|
   | `PUBLIC_GA4_ID` | Google Analytics 4 measurement ID. Enables tracking of WhatsApp, phone, appointment and enquiry clicks. |
   | `PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag token (the `content` value only). |
   | `PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools token. |
   | `PUBLIC_FORM_ENDPOINT` | Form backend URL, for example Formspree. If empty, the enquiry form opens WhatsApp instead. |
   | `PUBLIC_SHOW_DRAFTS` | Set to `true` only on a preview deployment to include draft articles. |

   Redeploy after changing environment variables, because they are read at build time.
4. Deploy, then check the site on the `*.vercel.app` preview URL.

The build downloads Source Sans 3 from Google Fonts and self-hosts it, so the build machine needs internet access (Vercel has it).

### Moving the domain from Wix

1. Add `www.drkartini.net` and `drkartini.net` under Project Settings > Domains, with the apex redirecting to `www`.
2. Update DNS at the domain registrar as Vercel instructs.
3. Keep the Wix plan until DNS has propagated and the new site is live.
4. Test a few old URLs, such as `/profession`, `/clinic-hours` and `/post/mochi-is-for-adoption`. Each should return a 301 to its new page.
5. Submit `https://www.drkartini.net/sitemap-index.xml` in Google Search Console and Bing Webmaster Tools.

---

## Where things live

| What | File |
|---|---|
| **All facts about Dr Kartini:** name variants, registrations, qualifications, career, roles, hospitals, clinic sessions, contacts, social links | `src/data/site.ts` |
| Page titles, meta descriptions and social card text for static pages | `src/data/pages.ts` |
| Press clippings and TV appearances | `src/data/media.ts` |
| Video library (YouTube IDs, titles, descriptions, dates) | `src/data/videos.json` |
| Condition guides, one file each, at `/dermatology/<file>/` | `src/content/conditions/*.md` |
| Articles, one file each, at `/articles/<file>/` | `src/content/articles/*.md` |
| Structured data (JSON-LD) builders | `src/lib/schema.ts` |
| Social card (Open Graph image) renderer | `src/lib/og.ts` |
| SEO head: meta, Open Graph, hreflang, geo, verification, analytics | `src/layouts/BaseLayout.astro` |
| Design system: colours, type, spacing, components | `src/styles/global.css` |
| Images, optimised to AVIF and WebP at build | `src/assets/images/` |
| Redirects, headers and build settings | `vercel.json` |

Change a fact once in `src/data/site.ts`. The pages, JSON-LD, `llms.txt`, footer and press kit all update together, so search engines and AI systems see one consistent entity.

---

## Design rules

The site is deliberately plain and professional. Please keep it that way when adding pages.

- **Typeface:** Source Sans 3 only, for headings, body text and social cards.
- **Colour:** white and `#f5f7f8` backgrounds, one brand colour `#1d4f5e`, and neutral greys. Red is used only for medical emergency notices.
- **Components:** 6px corner radius, hairline borders, no decorative shadows, gradients or badges.
- **Avoid:** uppercase labels above headings, pill tags, icon check-lists, stats strips, floating badges on photos, middle dots or dashes as separators, and photos showing skincare brand logos.
- **Mobile:** check that no page scrolls sideways at 375px wide.

---

## Publishing a new article

Create `src/content/articles/<url-slug>.md`:

```yaml
---
title: "Stray Dogs in Malaysia: Can We Protect People Without Losing Our Compassion?"
metaTitle: "Stray Dogs in Malaysia: Humane and Safe | Dr Kartini"      # 60 characters or fewer
metaDescription: "Dermatologist and animal welfare advocate Dr Kartini Farah Rahim on managing stray dogs in Malaysia humanely while keeping children and communities safe."   # 140 to 160 characters
summary: "Two or three sentences that answer the question directly."
keyTakeaways:
  - "One idea per bullet."
category: perspectives   # dermatology | animal-welfare | environment | community | perspectives | press-statements
tags: ["stray dogs", "TNRVM", "child safety"]
lang: en                 # or ms
datePublished: 2026-09-15
medicallyReviewed: false # true only for dermatology content Dr Kartini has approved
heroImage: ../../assets/images/animal-welfare/dr-kartini-with-rescued-dog.jpg
heroAlt: "Describe the photo"
relatedVideos: ["LtPcu9udN6c"]
faqs:
  - q: "Question people search for?"
    a: "An answer of 40 to 90 words."
sources:
  - title: "Source title"
    publisher: "Publisher"
    url: "https://example.com"
targetKeywords: ["stray dogs Malaysia", "Dr Kartini stray dogs"]
draft: false
---

Body in Markdown. Use H2 headings phrased as questions. Do not add an H1; the layout adds it.
```

Run `npm run build:audit`, commit and push. Vercel deploys automatically. The article is added to:

- the articles page and its category page
- the sitemap, with an accurate `lastmod`
- the RSS feed, `/llms.txt` and `/llms-full.txt`
- a generated social card at `/og/articles/<slug>.jpg`
- structured data: BlogPosting, WebPage, BreadcrumbList and FAQPage

`draft: true` hides a file from production builds. It still appears in `npm run dev`.

When you change a static page (for example About or Appointments) in a meaningful way, also update `SITE_LASTMOD` in `astro.config.mjs`. The sitemap uses it as the last-modified date for pages that have no date of their own.

---

## What is built in

### Technical SEO
- Lighthouse (mobile, 14 September 2026): Performance 99 to 100, SEO 100, Accessibility 100, Best Practices 100 on the home, About, condition, article, animal welfare, media, appointments, contact and video pages.
- `npm run audit` checks titles, descriptions, canonicals, robots, hreflang, headings, favicons and manifest icons, Open Graph and Twitter tags, social image size (1200x630, under 300 KB for WhatsApp), image alt text and dimensions, broken links, redirect targets, rich result fields in JSON-LD, sitemap coverage and page weight.
- A unique title and description on every page. The audit enforces length limits and flags duplicates.
- Canonical URLs, consistent trailing slashes, `hreflang` (en-MY and ms-MY) with `x-default`, and correct `lang` attributes on Malay articles.
- XML sitemap with per-URL `lastmod`, plus video sitemap entries for all 19 video pages.
- `robots.txt` that allows search engines and AI crawlers.
- 301 redirects for every old Wix page, post and category.
- Self-hosted, preloaded fonts; responsive AVIF and WebP images with explicit dimensions; YouTube videos that load only when played.
- Semantic HTML, a skip link, visible focus states, breadcrumbs, a 404 page, a web manifest and a favicon set.

### Structured data (one linked `@graph` per page)
- **Person:** name variants, credentials with registration numbers, education, roles, languages and `sameAs` profile links.
- **IndividualPhysician:** specialties, hospital affiliations, services, contact points and coordinates.
- **Hospital** entities for both Avisena hospitals.
- **MedicalWebPage** and **MedicalCondition** on the nine condition guides, with `reviewedBy` and `lastReviewed`.
- **BlogPosting** with citations, **FAQPage**, **VideoObject**, **ProfilePage**, ItemList, CollectionPage, ContactPage and BreadcrumbList.

### AI search
- `/llms.txt`: a fact sheet about Dr Kartini and a map of every page.
- `/llms-full.txt`: the full text of every guide and article, with sources.
- A plain-language summary at the top of each condition guide and a summary list on articles.
- Question-style headings, key-fact tables, FAQs, cited sources, author and reviewer bylines, and published and reviewed dates.

### Conversion tracking
- WhatsApp, phone, email, appointment and adoption clicks, video plays and enquiry submissions push `dataLayer` events, and go to GA4 when `PUBLIC_GA4_ID` is set.
- The enquiry form asks "How did you hear about Dr Kartini?".
- Pre-filled WhatsApp messages include the page they were sent from.

### Compliance
- Content follows Malaysian Medical Council guidance on information for the public: no superlatives, testimonials, before-and-after photos or prices.
- Medical disclaimers and emergency guidance on medical pages, an editorial policy, and a privacy policy (PDPA 2010).

Medical content must be reviewed and approved by Dr Kartini before the site goes live on the main domain.
