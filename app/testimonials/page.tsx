import type { Metadata } from "next";
import TestimonialsPage from "@/testimonialsPage/TestimonialsPage";
import JsonLd from "@/components/JsonLd";
import {
  webPageSchema,
  breadcrumbSchema,
  reviewListSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import clientReviews from "@/landingPage/lib/clientReviews";

export const metadata: Metadata = buildMetadata({ pathname: "/testimonials" });

export default function Testimonials() {
  return (
    <>
      {/*
        Testimonials page JSON-LD:
        - WebPage + BreadcrumbList: standard identity signals
        - ItemList of Reviews: structured social proof  can trigger star snippets
          when Google has enough signals to compute an AggregateRating

        Internal link note: no links from this page to /services or /aboutus.
        Consider adding "Ready to build your system? →" at the bottom of the
        review wall pointing to /services.
      */}
      <JsonLd
        schema={[
          webPageSchema({
            pathname: "/testimonials",
            title: "Client Testimonials  Real Pipeline Results | Ascendly",
            description:
              "Read what clients say after their pipeline starts converting. Featured reviews from Matt Leta, Michael Won, Steve Paganelli, Peter Brand, and more B2B revenue leaders.",
            dateModified: "2025-07-01",
          }),
          breadcrumbSchema([
            { name: "Testimonials", pathname: "/testimonials" },
          ]),
          reviewListSchema(
            clientReviews.map((r) => ({
              name: r.name,
              position: r.position,
              company: r.company,
              reviewBody: r.review,
            }))
          ),
        ]}
      />
      <TestimonialsPage />
    </>
  );
}
