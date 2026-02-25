# Product Requirements Document
## Jing Tong Visa Services — Public Marketing Website

---

## 1. Project Overview

**Company:** Jing Tong Visa Services  
**Location:** Washington D.C. (near the Chinese Consulate)  
**Specialization:** China tourist visa applications (V1 scope — architecture must support future expansion to student, family, and business visa product lines)  
**Goal:** Build a professional, high-converting marketing website that establishes trust, showcases services, and drives contact form submissions.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| Deployment | Vercel |
| Forms | React Hook Form + Resend (or Formspree as fallback) |
| CMS (News) | MDX files (file-based, no external CMS needed to start) |
| i18n | next-intl (English + Simplified Chinese) |
| Fonts | Google Fonts or Fontsource (see design section) |
| Images | next/image with optimization |

---

## 3. Design System

### Visual Identity
- **Primary Color:** Deep Chinese Red `#C0392B` / `#A93226`
- **Accent:** Warm Gold `#D4AC0D`
- **Background:** Near-black `#0D0D0D` with dark charcoal sections `#1A1A1A`
- **Text:** Off-white `#F5F0EB`, muted gray `#9E9E9E` for secondary
- **UI Cards:** Semi-transparent dark panels with subtle red border accents (see reference screenshot)

### Design Language
- **Hero sections:** Full-bleed photography of China (Great Wall, Beijing skyline, Shanghai, Forbidden City) with dark overlay and red tint
- **Cards:** Dark glass-morphism style panels (like the data cards in the reference), rounded corners, subtle border
- **Typography:**
  - Display/Headings: `Playfair Display` or `DM Serif Display` — elegant, editorial
  - Body: `DM Sans` or `Outfit` — clean, readable
- **Motion:** Subtle fade-in on scroll, smooth hover transitions on cards and buttons
- **Layout:** Asymmetric, image-left/content-right panels; generous whitespace; full-width photo breaks between sections

### Tone
Professional, trustworthy, warm. Authoritative but approachable. Conveys deep expertise and local advantage (proximity to the Chinese Consulate in D.C.).

---

## 4. Site Structure & Pages

### 4.1 Navigation
- Logo (left)
- Links: Home, Services, Pricing, Document Checklist, FAQ, News
- Language toggle: EN | 中文
- CTA Button: "Get Started" → links to Contact
- Mobile: Hamburger menu

### 4.2 Pages

#### `/` — Homepage
- **Hero:** Full-bleed China photo, headline ("Your Trusted China Visa Partner in Washington D.C."), subheadline, two CTAs ("View Services", "Contact Us")
- **Trust Bar:** Key stats — e.g., "500+ Visas Approved", "15+ Years Experience", "Located Near Chinese Consulate D.C."
- **Services Overview:** Tourist Visa featured prominently with description, requirements summary, and CTA; placeholder cards for "Coming Soon" services (Student Visa, Family Visa) to signal future expansion
- **Why Choose Us:** 4 highlights (Consulate proximity, fast turnaround, personalized service, document review)
- **Testimonials:** 2–3 inline testimonial quotes (no separate page — embedded in homepage)
- **News Preview:** 3 latest news/blog posts
- **Contact CTA Banner:** Red full-width banner with button to contact section
- **Footer:** Address, phone, email, hours, links, language toggle

#### `/services` — Services
- Hero with page title
- **Tourist Visa** — full detail: requirements, timeline, who it's for, step-by-step process
- "More Services Coming Soon" section — placeholder cards for Student Visa, Family Visa, Business Visa (grayed out, no links) to communicate future roadmap
- Links to document checklist for tourist visa

#### `/pricing` — Pricing
- Clear pricing table per visa type
- Include what's included (document review, application prep, follow-up)
- Note: government/consulate fees listed separately
- Optional: comparison table (Basic vs. Full-Service tiers)

#### `/checklist` — Document Checklist
- Interactive or static checklist for tourist visa
- Downloadable PDF version (optional v2 feature)
- Print-friendly layout

#### `/faq` — FAQ
- Accordion-style Q&A
- Grouped by category: General, Tourist Visa, Fees & Timeline, After Submission
- 15–25 questions to start

#### `/news` — News Index
- Grid of news/article cards (title, date, excerpt, cover image, category tag)
- Categories: Visa Tips, Policy Updates, Travel, Announcements

#### `/news/[slug]` — News Article
- MDX-rendered article
- Author, date, reading time
- Related articles at bottom
- Share buttons

#### `/contact` — Contact
- Contact form: Name, Email, Phone, Visa Type (dropdown), Message
- Office address with embedded Google Map
- Business hours
- Note about proximity to Chinese Consulate

---

## 5. Key Features

| Feature | Priority | Notes |
|---|---|---|
| Contact form with email delivery | P0 | Use Resend or Formspree |
| Mobile responsive design | P0 | Tailwind responsive utilities |
| Chinese language support (EN/ZH) | P0 | next-intl, Simplified Chinese |
| SEO meta tags per page (both languages) | P0 | next/head or metadata API |
| Document checklist — tourist visa | P1 | Interactive checkboxes, print-friendly |
| News section (MDX) | P1 | File-based, no CMS needed |
| FAQ accordion | P1 | Framer Motion or CSS transitions |
| Inline testimonials on homepage | P1 | Static data, no separate page |
| Google Maps embed | P2 | Contact page |
| News categories/filtering | P2 | V2 enhancement |
| Downloadable PDF checklist | P2 | V2 enhancement |
| Additional visa product lines | V2 | Architecture supports expansion from day 1 |

---

## 6. Content Requirements

The following content needs to be provided by the client before or during development:

- [ ] Company logo (SVG preferred)
- [ ] Hero photography (minimum 3 high-res China photos, licensed)
- [ ] Tourist visa service description and pricing
- [ ] Testimonial quotes for homepage (name, review, optional star rating)
- [ ] FAQ answers
- [ ] Office address, phone, email, hours
- [ ] Initial news articles (optional at launch)
- [ ] Chinese (Simplified) translations for all UI strings and page content

Placeholder content (Lorem Ipsum + stock images) will be used during development.

---

## 7. SEO & Performance

- Page titles and meta descriptions for every route
- Open Graph tags for social sharing
- Structured data (LocalBusiness schema) on homepage and contact page
- Image alt text on all images
- Sitemap.xml auto-generated via next-sitemap
- Target Lighthouse score: 90+ across all categories

---

## 8. Deployment & DevOps

- **Repo:** GitHub (private)
- **CI/CD:** Vercel auto-deploys on push to `main`
- **Preview Deployments:** Vercel preview URLs on pull requests
- **Environment Variables:** `RESEND_API_KEY` (or equivalent) for form submissions
- **Domain:** Client to provide custom domain; configure via Vercel dashboard

---

## 9. Project Phases

| Phase | Scope |
|---|---|
| **Phase 1** | Project scaffold, design system, i18n setup (next-intl), layout components, Homepage |
| **Phase 2** | Services, Pricing, Contact pages |
| **Phase 3** | Checklist, FAQ pages |
| **Phase 4** | News section (MDX setup + index + article template) |
| **Phase 5** | Chinese translations for all content and UI strings |
| **Phase 6** | SEO pass (both languages), performance optimization, final polish |
| **Phase 7** | Deployment, domain config, go-live |

---

## 10. Out of Scope (V1)

- Client login / portal
- Online payment processing
- Live chat widget
- Booking/scheduling system
- Additional visa types (architecture ready, content not yet)
- Traditional Chinese (Taiwan) — Simplified Chinese only for V1
