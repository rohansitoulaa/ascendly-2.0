/**
 * JSON-LD schema generators for Ascendly.
 *
 * Each function returns a plain object that can be serialised into a
 * <script type="application/ld+json"> tag by the <JsonLd /> component.
 *
 * Reference: https://schema.org  |  https://developers.google.com/search/docs/appearance/structured-data
 *
 * AEO note: structured data is the primary mechanism for Answer Engine
 * Optimisation  it tells AI crawlers (Google SGE, Perplexity, Bing Copilot)
 * exactly what your content means, enabling rich results and direct answers.
 */

const SITE_URL = "https://ascendly.one";
const ORG_NAME = "Ascendly";
const ORG_LOGO = `${SITE_URL}/logo.png`;
const FOUNDER_NAME = "Rosis Sitoula";

// ---------------------------------------------------------------------------
// Shared type helpers
// ---------------------------------------------------------------------------

interface WithContext {
  "@context": "https://schema.org";
  "@type": string;
}

// ---------------------------------------------------------------------------
// Organization  injected on every page; full detail on homepage
// ---------------------------------------------------------------------------

/**
 * Organization schema communicates who Ascendly is to search engines.
 * Used on the homepage for maximum authority signal.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: ORG_LOGO,
      width: 180,
      height: 60,
    },
    description:
      "Ascendly engineers end-to-end B2B revenue systems  inbound capture, outbound pipeline, AI-powered follow-up, and full ROI tracking for high-ticket companies.",
    founder: {
      "@type": "Person",
      name: FOUNDER_NAME,
      jobTitle: "Revenue Systems Architect",
      url: `${SITE_URL}/aboutus`,
    },
    foundingDate: "2022",
    areaServed: "Worldwide",
    serviceType: "B2B Revenue Systems & Pipeline Automation",
    sameAs: [
      "https://www.linkedin.com/company/ascendly",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: "https://calendly.com/ascendly",
      availableLanguage: "English",
    },
  } satisfies WithContext & Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// WebSite  sitelinks searchbox signal (homepage only)
// ---------------------------------------------------------------------------

/** Tells Google about the site's identity and enables Sitelinks. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORG_NAME,
    url: SITE_URL,
    description:
      "Predictable B2B revenue systems  outbound pipeline, inbound capture, AI follow-up, and full ROI tracking.",
  } satisfies WithContext & Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// WebPage  generic, applied to every page
// ---------------------------------------------------------------------------

interface WebPageOptions {
  pathname: string;
  title: string;
  description: string;
  /** ISO 8601 date string, e.g. "2025-01-15" */
  dateModified?: string;
}

/**
 * WebPage schema gives each URL a clear identity in the knowledge graph.
 * dateModified helps Google understand content freshness.
 */
export function webPageSchema({
  pathname,
  title,
  description,
  dateModified = "2025-01-01",
}: WebPageOptions) {
  const url = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url,
    name: title,
    description,
    dateModified,
    isPartOf: {
      "@type": "WebSite",
      url: SITE_URL,
      name: ORG_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      url: SITE_URL,
    },
  } satisfies WithContext & Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// ProfessionalService  used on homepage + services page
// ---------------------------------------------------------------------------

/**
 * ProfessionalService schema is critical for B2B service companies.
 * It directly feeds Google's Local Pack and AI-generated service summaries.
 */
export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: ORG_NAME,
    url: SITE_URL,
    description:
      "End-to-end B2B revenue systems: outbound engine, inbound capture, AI deal follow-up, pipeline visibility, and full revenue attribution.",
    provider: {
      "@type": "Organization",
      name: ORG_NAME,
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Revenue Systems Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Revenue Automation System",
            description:
              "End-to-end pipeline system: inbound capture, enrichment, multi-channel outreach, AI follow-up, and live ROI tracking.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Outbound Pipeline Engine",
            description:
              "Targeted cold email and LinkedIn outreach with ICP-based prospecting, reply handling, and meeting booking.",
          },
        },
      ],
    },
  } satisfies WithContext & Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// BreadcrumbList  inner pages only (not homepage)
// ---------------------------------------------------------------------------

interface BreadcrumbItem {
  name: string;
  pathname: string;
}

/**
 * BreadcrumbList schema enables Google to display breadcrumb rich results.
 * Always include the homepage as item 1.
 */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: item.name,
        item: `${SITE_URL}${item.pathname}`,
      })),
    ],
  } satisfies WithContext & Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// FAQPage  for pages with question-and-answer content
// ---------------------------------------------------------------------------

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQPage schema is the most reliable path to Google Featured Snippets.
 * Each Q&A pair can appear directly in search results  huge AEO signal.
 */
export function faqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } satisfies WithContext & Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Person  founder bio (About Us page)
// ---------------------------------------------------------------------------

/**
 * Person schema for the founder strengthens E-E-A-T signals
 * (Experience, Expertise, Authoritativeness, Trustworthiness).
 */
export function founderPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: FOUNDER_NAME,
    jobTitle: "Revenue Systems Architect",
    worksFor: {
      "@type": "Organization",
      name: ORG_NAME,
      url: SITE_URL,
    },
    url: `${SITE_URL}/aboutus`,
    description:
      "Rosis Sitoula is the founder of Ascendly and a B2B revenue systems architect with 500+ campaigns executed and $50M+ in pipeline generated.",
    knowsAbout: [
      "B2B Revenue Systems",
      "Outbound Pipeline Generation",
      "Sales Automation",
      "Pipeline Conversion",
      "CRM Optimization",
    ],
  } satisfies WithContext & Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// ItemList  for testimonials / review aggregation
// ---------------------------------------------------------------------------

interface ReviewItem {
  name: string;
  position: string;
  company: string;
  reviewBody: string;
}

/**
 * ItemList of reviews provides structured social proof.
 * Combined with AggregateRating it can unlock star snippets in search.
 */
export function reviewListSchema(reviews: ReviewItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Client Testimonials  Ascendly Revenue Systems",
    description:
      "Reviews from B2B clients who used Ascendly's revenue systems and pipeline automation services.",
    numberOfItems: reviews.length,
    itemListElement: reviews.map((r, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Review",
        reviewBody: r.reviewBody.replace(/\*\*/g, ""),
        author: {
          "@type": "Person",
          name: r.name,
          jobTitle: r.position,
          worksFor: {
            "@type": "Organization",
            name: r.company,
          },
        },
        itemReviewed: {
          "@type": "Organization",
          name: ORG_NAME,
          url: SITE_URL,
        },
      },
    })),
  } satisfies WithContext & Record<string, unknown>;
}
