import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Flex } from "next/font/google";
import { LenisProvider } from "@/landingPage/providers/LenisProvider";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, webSiteSchema } from "@/lib/seo/schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
});

const SITE_URL = "https://ascendly.one";

/**
 * Root-level metadata  applies to every page as the fallback.
 * Individual page.tsx files override title/description/openGraph via
 * their own exported `metadata` constant (built with buildMetadata()).
 *
 * The title.template here means any page that exports only a string title
 * will get " | Ascendly" appended automatically.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "B2B Revenue Systems That Generate & Convert Pipeline | Ascendly",
    template: "%s | Ascendly",
  },
  description:
    "Ascendly engineers end-to-end B2B revenue systems  inbound capture, outbound pipeline, AI follow-up, and full ROI tracking. Predictable growth, not just activity.",
  keywords: [
    "B2B revenue systems",
    "predictable pipeline growth",
    "sales pipeline automation",
    "outbound revenue engine",
    "pipeline conversion system",
    "revenue operations B2B",
  ],
  authors: [{ name: "Ascendly", url: SITE_URL }],
  creator: "Ascendly",
  publisher: "Ascendly",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Ascendly",
    title: "B2B Revenue Systems That Generate & Convert Pipeline | Ascendly",
    description:
      "Ascendly engineers end-to-end B2B revenue systems  inbound capture, outbound pipeline, AI follow-up, and full ROI tracking.",
    images: [
      {
        url: `${SITE_URL}/og/home.png`,
        width: 1200,
        height: 630,
        alt: "Ascendly  Predictable B2B Revenue Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AscendlyHQ",
    creator: "@AscendlyHQ",
    title: "B2B Revenue Systems That Generate & Convert Pipeline | Ascendly",
    description:
      "Ascendly engineers end-to-end B2B revenue systems  inbound capture, outbound pipeline, AI follow-up, and full ROI tracking.",
    images: [`${SITE_URL}/og/home.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${robotoFlex.variable} h-full antialiased`}
    >
      <head>
        {/*
          Preconnect to Google Fonts CDN  eliminates the DNS+TCP+TLS
          round-trip latency before the first font byte loads.
          Critical for LCP (Largest Contentful Paint) score.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Preconnect to Cloudinary for founder/client images */}
        <link rel="preconnect" href="https://res.cloudinary.com" />

        {/*
          Site-wide JSON-LD: Organization + WebSite schemas.
          These are injected once at the root so every page inherits them.
          Page-specific schemas (WebPage, Breadcrumb, FAQ) are added per-page.
        */}
        <JsonLd schema={[organizationSchema(), webSiteSchema()]} />
      </head>
      <body className="flex min-h-full flex-col bg-(--page-bg) text-white">
        <LenisProvider>{children}</LenisProvider>
      </body>

    </html>
  );
}
