# SEO Audit Report — Ascendly.one
**Generated:** 2026-04-24  
**Auditor:** Automated SEO implementation pass  
**Framework:** Next.js 15 App Router  

---

## 1. Page Keyword Assignments

| Route | Primary Keyword | LSI Keywords | Search Intent |
|-------|----------------|--------------|---------------|
| `/` | B2B revenue systems | predictable pipeline growth, sales pipeline automation, outbound revenue engine, pipeline conversion system, revenue operations B2B | commercial |
| `/aboutus` | B2B revenue agency | pipeline conversion specialist, revenue systems architect, B2B sales system builder, outbound strategy company, predictable revenue growth partner | informational |
| `/services` | revenue automation service | outbound pipeline engine, B2B lead qualification system, multi-channel sales outreach, CRM pipeline management, deal follow-up automation | transactional |
| `/testimonials` | B2B revenue agency results | pipeline growth case studies, outbound ROI proof, B2B outreach testimonials, revenue system client reviews, sales pipeline success stories | informational |

---

## 2. Metadata Implementation

### Root Layout (`app/layout.tsx`)
- ✅ `metadataBase` set to `https://ascendly.one`
- ✅ `title.template` → `%s | Ascendly` (auto-appends brand to all pages)
- ✅ `robots` → `{ index: true, follow: true }`
- ✅ `openGraph` with `siteName`, `locale: en_US`, OG image
- ✅ `twitter` card with `summary_large_image`
- ✅ `preconnect` to `fonts.googleapis.com`, `fonts.gstatic.com`, `res.cloudinary.com`

### Per-Page Metadata

| Page | Title | Description | Canonical | OG Image | Keywords |
|------|-------|-------------|-----------|----------|----------|
| `/` | ✅ Full keyword-rich title | ✅ | ✅ `/` | `/og/home.png` | ✅ |
| `/aboutus` | ✅ | ✅ | ✅ `/aboutus` | `/og/about.png` | ✅ |
| `/services` | ✅ | ✅ | ✅ `/services` | `/og/services.png` | ✅ |
| `/testimonials` | ✅ | ✅ | ✅ `/testimonials` | `/og/testimonials.png` | ✅ |

---

## 3. Structured Data / Schema Markup Added

### Root Layout (every page inherits)
| Schema Type | File | Purpose |
|-------------|------|---------|
| `Organization` | `lib/seo/schema.ts` → `app/layout.tsx` | Brand identity, E-E-A-T signal |
| `WebSite` | `lib/seo/schema.ts` → `app/layout.tsx` | Sitelinks eligibility |

### Per-Page Schema

| Page | Schema Types |
|------|-------------|
| `/` | `WebPage`, `ProfessionalService` |
| `/aboutus` | `WebPage`, `BreadcrumbList`, `Person` (founder) |
| `/services` | `WebPage`, `BreadcrumbList`, `ProfessionalService`, `FAQPage` |
| `/testimonials` | `WebPage`, `BreadcrumbList`, `ItemList` (reviews) |

---

## 4. AEO / Answer Engine Content Structure

### FAQ Implementation
- **Location:** `/app/services/page.tsx` + `components/FaqSection.tsx`
- **Questions covered:**
  1. What does Ascendly's Revenue Automation System include?
  2. Who is Ascendly's outbound pipeline service designed for?
  3. How long does it take to see results from the revenue system?
  4. What is the difference between Revenue Automation and the Outbound Engine?
  5. Does Ascendly replace our sales team?
- **Schema:** `FAQPage` JSON-LD auto-injected by `<FaqSection />`
- **HTML:** `<dl>/<dt>/<dd>` semantic structure for crawler extraction confidence
- **Deep links:** Every question has an `id` anchor for direct SERP deep-linking

### `FaqSection` Component (`components/FaqSection.tsx`)
- Accepts `faqs: FaqItem[]` prop
- Renders semantic `<dl><dt><dd>` structure
- Auto-generates `FAQPage` JSON-LD via `<JsonLd />`
- Styled to integrate with the dark-theme design system
- Each Q has a `#slug` anchor for Google's rich result deep-links

---

## 5. Technical SEO Infrastructure

### Sitemap (`/app/sitemap.ts` → `/sitemap.xml`)
| URL | Priority | Change Frequency | Last Modified |
|-----|----------|------------------|---------------|
| `https://ascendly.one` | 1.0 | weekly | 2025-07-01 |
| `https://ascendly.one/services` | 0.9 | monthly | 2025-07-01 |
| `https://ascendly.one/aboutus` | 0.8 | monthly | 2025-07-01 |
| `https://ascendly.one/testimonials` | 0.7 | monthly | 2025-07-01 |

### Robots (`/app/robots.ts` → `/robots.txt`)
- ✅ All bots allowed on `/`
- ✅ `CCBot` (Common Crawl training) blocked
- ✅ `GPTBot` (OpenAI training) blocked
- ✅ `Sitemap:` directive pointing to `/sitemap.xml`

### AI Crawler Manifest (`/public/llms.txt`)
- ✅ Page index with 1-sentence descriptions
- ✅ Service descriptions in plain English for AI parsing
- ✅ Key stats for AI-generated answer context
- ✅ Contact information for conversion actions

---

## 6. Missing Metadata Warnings

| Page | Issue | Severity | Action Required |
|------|-------|----------|-----------------|
| All pages | OG images (`/og/*.png`) do not yet exist in `/public/og/` | **HIGH** | Create 1200×630 OG images for home, about, services, testimonials |
| All pages | Logo at `/logo.png` not verified in `/public/` | **MEDIUM** | Add `/public/logo.png` (180×60px) for Organization schema |
| `/` | No `hreflang` tags | LOW | Add if/when non-English pages are created |
| All pages | No `application/manifest+json` (PWA manifest) | LOW | Not critical for B2B, add if mobile app install desired |

---

## 7. Internal Link Analysis

### Pages with No Inbound Internal Links (Orphan Risk)

| Page | Inbound Links Found | Risk Level | Recommendation |
|------|---------------------|------------|----------------|
| `/testimonials` | Only from Navbar | **HIGH** | Add "Read client results →" CTA in Hero, Services CTA section, and About Us stats block |
| `/aboutus` | Only from Navbar | **MEDIUM** | Add "Meet the team behind the system →" in Services page Operating Principles |
| `/services` | Navbar + Hero CTA ("Book a pipeline audit") | LOW | Healthy — maintain |

### Pages with No Outbound Body Links

| Page | Internal Body Links | Issue |
|------|---------------------|-------|
| `/aboutus` | None in body | Leaks PageRank, creates dead ends for crawlers |
| `/testimonials` | None in body | Users have nowhere to go after reading reviews |
| `/services` | None in body | Users can't navigate to proof (testimonials) |

### Recommended Internal Link Additions (Code Comments Added In-File)

1. **`/aboutus`** → Add link to `/services` in the "Two Gears" section  
2. **`/aboutus`** → Add link to `/testimonials` in the stats section  
3. **`/services`** → Add link to `/testimonials` in the CTA  
4. **`/testimonials`** → Add link to `/services` below the review wall  

---

## 8. Performance Audit (Core Web Vitals)

### Images
| Component | `alt` | `width`/`height` | `priority` | `loading` | Issue |
|-----------|-------|------------------|------------|-----------|-------|
| Founder image (AboutUs) | ✅ | Assumed via component | Unknown | Unknown | Verify `priority` on LCP image |
| Client headshots (Testimonials) | ✅ (name-based) | Unknown | `loading="lazy"` ✅ | ✅ | OK |
| Brand logos (Marquee) | Unknown | Unknown | — | — | Audit `alt` text on logos |

**Action required:** Verify the Cloudinary founder image in `AboutUsPage.tsx` has `priority` prop set (it's the LCP element on the About page).

### Scripts
- No render-blocking third-party scripts detected
- GSAP, Three.js, Framer Motion load via npm (bundled) — no `<script>` tags to lazy-load
- Calendly embed (if present): use `<Script strategy="lazyOnload">` if added in future

### Fonts
- ✅ `preconnect` added to `fonts.googleapis.com` and `fonts.gstatic.com` in layout
- ✅ All fonts loaded via `next/font/google` (optimised, no layout shift)
- ✅ Cloudinary `preconnect` added for image CDN

---

## 9. Backlink-Worthy Content Recommendations

These are content gaps where a dedicated page would attract natural backlinks and direct AI-cited answers:

### High-Priority Content to Create

| Content Piece | Target Keyword | Backlink Angle |
|---------------|----------------|----------------|
| "B2B Pipeline Conversion Rate Benchmarks 2025" | pipeline conversion rate B2B | Data-driven — journalists cite stats |
| "The B2B Revenue System Stack: Tools & Workflow" | B2B revenue tech stack | Resource page links from SaaS tools |
| "Why Your Pipeline Isn't Converting (And How to Fix It)" | pipeline not converting | Answer Engine fodder — direct featured snippet target |
| "Outbound Email vs LinkedIn: What Actually Works in 2025" | outbound channel comparison | Contrarian angle = shares + links |
| "Case Study: How [Client] Grew Pipeline 3× in 90 Days" | B2B pipeline case study | Industry publication syndication |

### Authority-Building Actions

1. **Submit to Product Hunt / G2 / Clutch** — generates do-follow backlinks automatically
2. **Guest post on RevOps / Sales Hacker blogs** — target "predictable revenue" topic
3. **LinkedIn articles by Rosis** — drives direct referral traffic + E-E-A-T signals
4. **Podcast appearances** — show notes reliably link back to guest's site
5. **Get listed on "best B2B revenue agencies" roundup posts** — commercial intent, high conversion

---

## 10. Files Created / Modified

### New Files
| File | Purpose |
|------|---------|
| `lib/seo/keywords.ts` | Keyword map — primary + LSI per route |
| `lib/seo/metadata.ts` | `buildMetadata()` factory for all pages |
| `lib/seo/schema.ts` | JSON-LD generators (Organization, WebPage, FAQ, etc.) |
| `components/JsonLd.tsx` | Schema injection component |
| `components/FaqSection.tsx` | Semantic FAQ with auto FAQPage schema |
| `app/sitemap.ts` | Dynamic sitemap served at `/sitemap.xml` |
| `app/robots.ts` | robots.txt served at `/robots.txt` |
| `public/llms.txt` | AI crawler manifest (Claude, Perplexity, GPT Search) |

### Modified Files
| File | Changes |
|------|---------|
| `app/layout.tsx` | metadataBase, title.template, full OG/Twitter, preconnect, JsonLd |
| `app/page.tsx` | `buildMetadata()` + WebPage + ProfessionalService schema |
| `app/aboutus/page.tsx` | `buildMetadata()` + WebPage + Breadcrumb + Person schema |
| `app/services/page.tsx` | `buildMetadata()` + WebPage + Breadcrumb + Service + FaqSection |
| `app/testimonials/page.tsx` | `buildMetadata()` + WebPage + Breadcrumb + ReviewList schema |
