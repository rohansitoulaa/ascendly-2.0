/**
 * Keyword infrastructure for Ascendly.
 *
 * Each route entry defines:
 *  - primary   : the single most important keyword (title + H1 focus)
 *  - lsi       : latent-semantic / supporting terms (used in meta description, body copy)
 *  - intent    : search intent type  affects how Google evaluates relevance
 *
 * Keep LSI terms naturally integrated; don't keyword-stuff titles.
 */

export type SearchIntent =
  | "informational"  // user wants to learn
  | "navigational"   // user wants a specific site
  | "commercial"     // user is researching before buying
  | "transactional"; // user wants to take action now

export interface PageKeywords {
  primary: string;
  lsi: [string, string, string, string, string];
  intent: SearchIntent;
}

/**
 * Keyword map keyed by Next.js route pathname.
 * The root layout picks this up to inject <title> and <meta name="description">.
 */
export const keywordMap: Record<string, PageKeywords> = {
  "/": {
    primary: "B2B revenue systems",
    lsi: [
      "predictable pipeline growth",
      "sales pipeline automation",
      "outbound revenue engine",
      "pipeline conversion system",
      "revenue operations B2B",
    ],
    intent: "commercial",
  },
  "/aboutus": {
    primary: "B2B revenue agency",
    lsi: [
      "pipeline conversion specialist",
      "revenue systems architect",
      "B2B sales system builder",
      "outbound strategy company",
      "predictable revenue growth partner",
    ],
    intent: "informational",
  },
  "/services": {
    primary: "revenue automation service",
    lsi: [
      "outbound pipeline engine",
      "B2B lead qualification system",
      "multi-channel sales outreach",
      "CRM pipeline management",
      "deal follow-up automation",
    ],
    intent: "transactional",
  },
  "/testimonials": {
    primary: "B2B revenue agency results",
    lsi: [
      "pipeline growth case studies",
      "outbound ROI proof",
      "B2B outreach testimonials",
      "revenue system client reviews",
      "sales pipeline success stories",
    ],
    intent: "informational",
  },
} as const;

/** Convenience helper  returns keywords for a route or undefined if unmapped. */
export function getKeywords(pathname: string): PageKeywords | undefined {
  return keywordMap[pathname];
}
