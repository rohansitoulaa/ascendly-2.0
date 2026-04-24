import type { Metadata } from "next";
import AboutUsPage from "@/aboutusPage/AboutUsPage";
import JsonLd from "@/components/JsonLd";
import {
  webPageSchema,
  breadcrumbSchema,
  founderPersonSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({ pathname: "/aboutus" });

export default function AboutUs() {
  return (
    <>
      {/*
        About page JSON-LD:
        - WebPage: gives this URL a clear identity
        - BreadcrumbList: enables breadcrumb rich result in SERPs
        - Person: E-E-A-T signal for Rosis Sitoula as the expert behind the service
      */}
      <JsonLd
        schema={[
          webPageSchema({
            pathname: "/aboutus",
            title:
              "About Ascendly  The Revenue Systems Agency Built for Conversion",
            description:
              "We don't run campaigns. We build revenue systems. Learn how Ascendly turns pipeline into predictable growth for B2B companies with $30k+ deal sizes.",
            dateModified: "2025-07-01",
          }),
          breadcrumbSchema([{ name: "About Us", pathname: "/aboutus" }]),
          founderPersonSchema(),
        ]}
      />
      {/*
        Internal linking note:
        This page has no links pointing to /services or /testimonials from the
        body copy. Consider adding a "See our services →" link in the Process
        section and a "Read client results →" link at the bottom of the stats section
        to distribute PageRank and reduce orphan risk on those pages.
      */}
      <AboutUsPage />
    </>
  );
}
