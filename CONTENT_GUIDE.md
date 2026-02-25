# Content Guide — Jing Tong Visa Services

A reference for developers updating content on this site. Covers every editable piece of content, where it lives, and any cross-file dependencies you need to keep in sync.

---

## Quick Map: Content → File

| What you want to change | File(s) to edit |
|---|---|
| Address, phone, email, hours | `messages/en.json` + `messages/zh.json` + `app/[locale]/page.tsx` (JSON-LD) |
| Contact form email recipient | `app/api/contact/route.ts` |
| Hero headline / subheadline | `messages/en.json` → `hero` namespace |
| Trust bar stats (500+ visas, 15+ years) | `messages/en.json` → `trustBar` namespace |
| Pricing ($89 / $149) | `data/pricing.ts` |
| Service descriptions & process steps | `data/services.ts` + `messages/en.json` → `servicesPage` namespace |
| Testimonials | `data/testimonials.ts` |
| Why Choose Us features | `data/whyUs.ts` |
| FAQ questions & answers | `messages/en.json` → `faqPage` namespace |
| Document checklist items | `messages/en.json` → `checklistPage` namespace |
| News articles | `content/news/*.mdx` |
| Hero / section photos | See [Images](#images) section below |
| SEO page titles & descriptions | `generateMetadata()` in each `app/[locale]/*/page.tsx` |
| Activate a new visa type | `data/services.ts` → set `active: true` |

---

## 1. Business Details (Contact Info, Hours)

**⚠️ Contact info lives in three separate places. Update all three or they'll be out of sync.**

### 1a. Footer + Contact page (displayed to users)

File: `messages/en.json` — `footer` namespace

```json
"footer": {
  "address": "1234 Connecticut Ave NW, Washington D.C. 20036",
  "phone": "+1 (202) 555-0123",
  "email": "info@jingtongvisa.com",
  "hours": "Mon – Fri: 9am – 6pm EST"
}
```

File: `messages/zh.json` — same keys, Chinese translation

```json
"footer": {
  "address": "美国华盛顿特区康涅狄格大道西北1234号",
  "phone": "+1 (202) 555-0123",
  "email": "info@jingtongvisa.com",
  "hours": "周一至周五：上午9点 – 下午6点（东部时间）"
}
```

### 1b. JSON-LD structured data (Google / SEO)

File: `app/[locale]/page.tsx` — `jsonLd` object inside `HomePage`

```ts
telephone: "+1-202-555-0123",
email: "info@jingtongvisa.com",
address: {
  streetAddress: "1234 Connecticut Ave NW",
  addressLocality: "Washington",
  addressRegion: "DC",
  postalCode: "20036",
},
openingHoursSpecification: [{
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "09:00",
  closes: "18:00",
}],
```

### 1c. Contact form email recipient

File: `app/api/contact/route.ts`

```ts
to: ["info@jingtongvisa.com"],   // ← recipient
from: "Jing Tong Visa Website <noreply@jingtongvisa.com>",  // ← sender domain
```

The `noreply@` address must be a verified sender domain in your Resend account.

---

## 2. UI Copy (Headings, Labels, CTAs)

All user-facing strings go through `next-intl`. The source of truth is:

- `messages/en.json` — English
- `messages/zh.json` — Chinese (Simplified)

**Always update both files together.** The site will fall back to English if a Chinese key is missing, but it's better to keep them in sync.

### Key namespaces

| Namespace | What it controls |
|---|---|
| `nav` | Navbar link labels, CTA button text, language toggle label |
| `footer` | Footer tagline, contact info, "Quick Links" label, copyright |
| `hero` | Homepage hero: badge, headline, subheadline, CTA button labels |
| `trustBar` | The four stat blocks (values and labels) |
| `services` | Services section labels on homepage |
| `whyUs` | Section title and subtitle above the Why Choose Us cards |
| `testimonials` | Section title and subtitle above testimonial quotes |
| `newsPreview` | Section title, subtitle, "View All News" button |
| `contactCta` | The red full-width CTA banner |
| `servicesPage` | Hero text + all labels on the /services page |
| `pricingPage` | Hero text + labels, government fee note, pricing page copy |
| `checklistPage` | All checklist item text, section headers, notes, "applies if" text |
| `faqPage` | All FAQ question and answer text |
| `contactPage` | Hero text, form labels, placeholders, success/error messages |
| `newsPage` | News index and article page labels |

### Example: changing the hero headline

```json
// messages/en.json
"hero": {
  "headline": "Your Trusted China Visa Partner in Washington D.C."
}

// messages/zh.json
"hero": {
  "headline": "您在华盛顿特区值得信赖的中国签证服务机构"
}
```

---

## 3. Pricing

File: `data/pricing.ts`

Two tiers: **Basic** and **Full Service**. Each tier has:
- `price` — number (e.g. `89`)
- `name` / `nameZh` — display name in English and Chinese
- `description` / `descriptionZh`
- `badge` / `badgeZh` — optional label (used for "Most Popular")
- `recommended` — boolean; controls which tier gets the highlighted card style
- `features[]` — array of `{ text, textZh, included: boolean }`

```ts
{
  id: "full-service",
  price: 149,
  name: "Full Service",
  nameZh: "全程服务",
  recommended: true,
  features: [
    { text: "Document checklist & eligibility review", textZh: "...", included: true },
    { text: "Priority phone support", textZh: "...", included: true },
  ],
}
```

The government fee amount (`~$140`) is in `messages/en.json` → `pricingPage.govFeeAmount`. The longer explanation is in `pricingPage.govFeeText`.

---

## 4. Services

### 4a. Service cards and descriptions

File: `data/services.ts`

Each service object has:
- `id` — slug used internally
- `active: boolean` — `true` = full detail card; `false` = "Coming Soon" placeholder
- `name` / `nameZh`
- `description` / `descriptionZh`
- `timeline` / `timelineZh`
- `requirements[]` / `requirementsZh[]` — bullet list of required docs
- `processSteps[]` — six-step process (each step has `icon`, `title`, `titleZh`, `description`, `descriptionZh`)

**To activate a new visa type** (e.g. Student Visa when ready):
1. Set `active: true` on the relevant service in `data/services.ts`
2. Fill in its `requirements`, `requirementsZh`, and `processSteps`
3. The Services page will automatically render it fully — no template changes needed

### 4b. Services page copy

Longer prose text (overview paragraph, "who it's for" paragraph, timeline note, section headers) lives in:

```
messages/en.json → servicesPage
messages/zh.json → servicesPage
```

---

## 5. Testimonials

File: `data/testimonials.ts`

Array of `Testimonial` objects. Each has:
- `name` — display name
- `location` — city/state
- `text` — the quote
- `rating` — number 1–5

```ts
{
  name: "Sarah M.",
  location: "Washington D.C.",
  text: "Jing Tong made my visa application completely seamless...",
  rating: 5,
}
```

These are displayed only on the homepage (the Testimonials section). Add or reorder as needed.

---

## 6. Why Choose Us

File: `data/whyUs.ts`

Array of `WhyUsFeature` objects. Each has:
- `icon` — emoji or short string
- `title` / `titleZh`
- `description` / `descriptionZh`

Four items are displayed on the homepage. Reorder or replace as needed.

---

## 7. FAQ

The FAQ has two layers:

**Structure** (which questions exist, in what order, in what category):
`data/faq.ts` — array of `FAQItem` objects. Each has an `id`, a `category`, and `question`/`answer` keys that are i18n lookup keys.

**Actual text** (the questions and answers themselves):
`messages/en.json` → `faqPage` namespace
`messages/zh.json` → `faqPage` namespace

The keys are nested by category:

```json
"faqPage": {
  "general": {
    "q1": "Does a U.S. citizen need a visa to visit China?",
    "a1": "Yes. U.S. citizens generally need a visa..."
  },
  "documents": { ... },
  "fees-timeline": { ... },
  "after-submission": { ... }
}
```

**To add a new FAQ question:**
1. Add a new entry to `data/faq.ts`:
   ```ts
   { id: "general-6", category: "general", question: "general.q6", answer: "general.a6" }
   ```
2. Add the text in `messages/en.json` under `faqPage.general.q6` and `faqPage.general.a6`
3. Add the Chinese version in `messages/zh.json`

---

## 8. Document Checklist

Same two-layer pattern as FAQ.

**Structure** (which items exist, grouping, OR separators, notes):
`data/checklist.ts`

**Item text** (what the user reads):
`messages/en.json` → `checklistPage` namespace
`messages/zh.json` → `checklistPage` namespace

The text keys are nested:
```json
"checklistPage": {
  "items": {
    "passport-blank": "Valid passport with at least 2 blank visa pages",
    ...
  },
  "conditionalTitles": { ... },
  "appliesIfText": { ... },
  "notes": { ... }
}
```

**To add a new checklist item:**
1. Add a `ChecklistItem` to the relevant group in `data/checklist.ts`:
   ```ts
   { id: "new-item-id", key: "new-item-key" }
   ```
2. Add the display text in both `messages/en.json` and `messages/zh.json` under `checklistPage.items.new-item-key`

---

## 9. News Articles

News articles are MDX files in `content/news/`. The filename becomes the URL slug.

### Creating a new article

1. Create `content/news/your-article-slug.mdx`
2. Add frontmatter at the top:

```mdx
---
title: "Your Article Title"
date: "2025-03-01"
excerpt: "A one or two sentence summary shown in article cards and meta descriptions."
category: "Visa Tips"
author: "Jing Tong Team"
coverImage: "https://your-image-host.com/image.jpg"
---

Your article content here in Markdown...
```

3. The article appears automatically on `/news` and links are fully functional — no registration or index file needed.

**Valid categories:** `Visa Tips`, `Policy Updates`, `Travel`, `Announcements`
(These map to filter buttons on the news index page. Using a different string will cause it to appear under "All" but not match any filter.)

### Editing an existing article

Open the `.mdx` file in `content/news/` and edit freely — both frontmatter and body. Markdown tables, bold, lists, blockquotes, and headings (h2, h3) all render with the site's dark styling via the `.article-body` CSS class.

### Chinese translations of news articles

Chinese versions of articles live in `content/news/zh/[slug].mdx` — same filename/slug as the English version.

The site automatically falls back to the English article if no Chinese file exists for a given slug, so you can translate articles incrementally without breaking anything.

**To provide a Chinese translation:**

1. Open `content/news/zh/[slug].mdx` (scaffold files already exist for all current articles)
2. Replace the `[待翻译]` placeholder in `title` and `excerpt` with the Chinese translation
3. Replace the placeholder body text with the full translated article

**To add a Chinese version of a new article:**

1. Create the English article at `content/news/[slug].mdx` as usual
2. Create `content/news/zh/[slug].mdx` with translated frontmatter and body (or use the scaffold template below and fill it in later)

Scaffold template:
```mdx
---
title: "[待翻译] Your English Title Here"
date: "YYYY-MM-DD"
excerpt: "[待翻译] Your English excerpt here."
category: "Visa Tips"
author: "精通签证团队"
coverImage: "https://your-image-url/image.jpg"
---

*本文中文版正在翻译中，敬请期待。*

*The Chinese translation of this article is in progress. Please check back soon.*
```

### Cover images

During development, `coverImage` falls back to a picsum.photos placeholder if omitted. For production, provide a real URL — hosted on your CDN, Cloudinary, or added to `public/images/` (use `/images/filename.jpg` as the path).

---

## 10. Images

All current images are placeholder URLs from `picsum.photos`. Replace them with real licensed photography before launch.

| Location | Where to change |
|---|---|
| Homepage hero background | `components/sections/Hero.tsx` — `src` prop on the `<Image>` |
| Homepage full-width photo break | `app/[locale]/page.tsx` — `<PhotoBreak src="..." />` prop |
| Services page hero | `components/layout/PageHero.tsx` generates a picsum URL from the `imageSeed` prop. Replace by passing a real `src` prop instead (you'll need to add that prop). |
| News article cover images | Frontmatter `coverImage` in each `.mdx` file |

For Next.js `<Image>` to load external URLs, the hostname must be listed in `next.config.ts`:

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "your-image-cdn.com" },
  ],
},
```

---

## 11. SEO Metadata

Each page exports a `generateMetadata()` function with its own `title`, `description`, and `openGraph` fields. These are hardcoded (not in `messages/`) because they're primarily for search engines.

Files to check:
```
app/[locale]/page.tsx          ← homepage
app/[locale]/services/page.tsx
app/[locale]/pricing/page.tsx
app/[locale]/contact/page.tsx
app/[locale]/checklist/page.tsx
app/[locale]/faq/page.tsx
app/[locale]/news/page.tsx
app/[locale]/news/[slug]/page.tsx  ← generated from MDX frontmatter
```

The article page (`news/[slug]`) builds its metadata automatically from the MDX frontmatter — no changes needed there.

---

## 12. Activating a New Visa Type

When ready to launch Student, Family, or Business visa services:

1. **`data/services.ts`** — set `active: true` and fill in all fields (`requirements`, `requirementsZh`, `processSteps`, `processStepsZh`)
2. **`messages/en.json`** → `servicesPage` — add any new prose copy specific to that service (overview text, "who it's for" text)
3. **`messages/zh.json`** — same
4. No changes needed to the Services page template — it reads from the data file automatically

---

## 13. Trust Bar Stats

File: `messages/en.json` → `trustBar` namespace

```json
"trustBar": {
  "visasValue": "500+",
  "visasLabel": "Visas Approved",
  "experienceValue": "15+",
  "experienceLabel": "Years of Experience",
  "locationValue": "< 1 Mile",
  "locationLabel": "From Chinese Consulate D.C.",
  "ratingValue": "5★",
  "ratingLabel": "Client Satisfaction"
}
```

Update `visasValue` periodically as the milestone count grows.

---

## Notes

- `data/news.ts` is an orphaned placeholder file — the live site reads from `content/news/*.mdx` via `lib/mdx.ts`. It can be safely deleted.
- Chinese copy in `messages/zh.json` was machine-assisted and should be reviewed by a native speaker before launch.
- The `RESEND_API_KEY` environment variable must be set in Vercel (and in `.env.local` for local testing) for the contact form to deliver emails.
