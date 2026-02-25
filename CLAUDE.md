# CLAUDE.md — Jing Tong Visa Services

This file is read by Claude Code at the start of every session. Follow all instructions here precisely and consistently.

---

## Project Overview

**Project:** Jing Tong Visa Services — Public Marketing Website  
**Stack:** Next.js 14+ (App Router), Tailwind CSS, TypeScript, Vercel  
**Purpose:** Marketing site for a China visa services company based in Washington D.C.

---

## Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev        # → http://localhost:3000

# Build for production
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Deploy (auto via Vercel on push to main, or manually:)
vercel --prod
```

---

## Project Structure

```
/
├── app/
│   └── [locale]/               # next-intl locale wrapper (en, zh)
│       ├── layout.tsx
│       ├── page.tsx             # Homepage
│       ├── services/page.tsx
│       ├── pricing/page.tsx
│       ├── checklist/page.tsx
│       ├── faq/page.tsx
│       ├── news/
│       │   ├── page.tsx         # News index
│       │   └── [slug]/page.tsx  # News article
│       └── contact/page.tsx
├── components/
│   ├── ui/                      # Primitives (Button, Card, Badge, etc.)
│   ├── layout/                  # Navbar, Footer, Section wrappers
│   └── sections/                # Page-specific section components
├── content/
│   └── news/                    # MDX news articles (filename = slug)
├── messages/                    # i18n translation files
│   ├── en.json
│   └── zh.json
├── data/                        # Static data files
│   ├── testimonials.ts          # Used inline on homepage only
│   ├── faq.ts
│   ├── pricing.ts
│   └── services.ts
├── lib/
│   ├── utils.ts
│   └── mdx.ts
├── public/
│   ├── images/
│   └── fonts/
├── styles/
│   └── globals.css
├── i18n.ts                      # next-intl config
└── CLAUDE.md
```

---

## Design System

### Color Palette (CSS Variables in globals.css)

```css
--color-red-primary: #C0392B;
--color-red-dark: #A93226;
--color-gold: #D4AC0D;
--color-bg: #0D0D0D;
--color-surface: #1A1A1A;
--color-surface-elevated: #242424;
--color-text: #F5F0EB;
--color-text-muted: #9E9E9E;
--color-border: rgba(192, 57, 43, 0.3);
```

### Typography

- **Display/Headings:** `Playfair Display` (Google Fonts)
- **Body:** `DM Sans` (Google Fonts)
- Load both via `next/font/google` in `app/layout.tsx`

### Component Conventions

- **Cards:** Dark semi-transparent background (`bg-surface`), subtle red border (`border border-red-primary/30`), rounded-xl, padding p-6
- **Buttons (Primary):** Red background, white text, hover darkens — `bg-red-primary hover:bg-red-dark`
- **Buttons (Secondary):** Transparent with red border, red text
- **Section backgrounds:** Alternate between `bg-bg` and `bg-surface`
- **Hero sections:** Full-bleed image with dark overlay (`bg-black/60`) + red tint overlay (`bg-red-primary/10`)
- **Headings:** Always use `font-display` (Playfair Display)

---

## Coding Conventions

### General
- **TypeScript strictly** — no `any`, no implicit any, no ts-ignore
- Use functional components only, no class components
- Prefer named exports for components; default export only for pages
- All components go in `/components/`; all page logic stays in `/app/`

### Tailwind
- Use Tailwind utility classes exclusively — no custom CSS except for CSS variables in `globals.css`
- Responsive: mobile-first (`sm:`, `md:`, `lg:`, `xl:`)
- Dark theme is the default — do not add light mode unless explicitly requested

### Images
- Always use `next/image` — never plain `<img>` tags
- All images must have descriptive `alt` text
- Hero images: use `priority` prop
- Add `fill` + `object-cover` for full-bleed backgrounds

### Data
- Static data (testimonials, FAQ, pricing, services) lives in `/data/` as typed TypeScript files
- Never hardcode repeated content inline in components — always pull from `/data/`

### i18n
- Use `next-intl` for all internationalization — English (`en`) and Simplified Chinese (`zh`)
- All user-facing strings must use `useTranslations()` hook — no hardcoded English strings in components
- Translation files live in `/messages/en.json` and `/messages/zh.json`
- URLs are locale-prefixed: `/en/services`, `/zh/services`
- Language toggle in Navbar and Footer switches locale
- Chinese font support: load `Noto Sans SC` from Google Fonts as a fallback for Chinese characters

### News
- News articles are MDX files in `/content/news/[slug].mdx`
- Frontmatter fields: `title`, `date`, `excerpt`, `coverImage`, `category`, `author`
- Parse via `gray-matter` + `next-mdx-remote`
- Route: `/[locale]/news` (index) and `/[locale]/news/[slug]` (article)

### Services Architecture
- V1 only has Tourist Visa as an active service
- Services data is in `/data/services.ts` as a typed array — each service has an `active: boolean` flag
- Inactive services render as "Coming Soon" placeholder cards on the Services page
- Never hardcode "tourist visa only" — always read from the data file so adding a new service only requires updating `/data/services.ts`

### Forms
- Use `react-hook-form` for all forms
- Contact form submits to a Next.js API route at `/app/api/contact/route.ts`
- API route uses Resend to send email; API key in env var `RESEND_API_KEY`

---

## SEO

- Every page must export a `metadata` object (Next.js App Router Metadata API)
- Include: `title`, `description`, `openGraph` (title, description, image)
- Homepage must include `LocalBusiness` JSON-LD schema
- Run `npm run build` and check for missing metadata warnings before considering a page done

---

## Environment Variables

```bash
# .env.local (never commit this file)
RESEND_API_KEY=your_key_here
NEXT_PUBLIC_SITE_URL=https://jingtongvisa.com
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

---

## Do Not Modify

- `app/layout.tsx` root layout structure without explicit instruction
- CSS variable names in `globals.css` — reference them by name throughout the codebase
- The `/data/` file structure — always extend, never restructure without asking

---

## Brand Voice

- Tone: Professional, warm, trustworthy, expert
- Avoid: overly corporate jargon, aggressive sales language
- Emphasize: proximity to Chinese Consulate D.C., personalized service, experience
- Target users: tourists applying for China visas (V1); students and families in future phases
- Chinese copy should feel natural and native — not machine-translated; flag any Chinese strings that need human review

---

## Deployment Notes

- Push to `main` branch triggers auto-deploy on Vercel
- Use feature branches + PRs for all changes
- Preview URL is auto-generated per PR by Vercel
- Custom domain configured in Vercel dashboard (not in code)
