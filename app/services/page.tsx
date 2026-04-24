import type { Metadata } from "next";
import ServicesPage from "@/servicesPage/ServicesPage";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";
import {
  webPageSchema,
  breadcrumbSchema,
  professionalServiceSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({ pathname: "/services" });

/**
 * FAQs for the services page.
 * These are real buyer questions  each answer targets a search query.
 * The FaqSection component auto-generates FAQPage JSON-LD for Featured Snippets.
 */
const servicesFaqs = [
  {
    question: "What does Ascendly's Revenue Automation System include?",
    answer:
      "The Revenue Automation System is an end-to-end pipeline engine: inbound lead capture, lead enrichment and qualification, multi-channel outbound (email + LinkedIn), AI-powered deal follow-up after every call, stale deal reactivation, and live pipeline visibility with full revenue attribution. It covers every stage from first touch to closed deal.",
  },
  {
    question: "Who is Ascendly's outbound pipeline service designed for?",
    answer:
      "Ascendly works with B2B companies that have $30,000+ customer lifetime values and multi-step sales cycles. This includes tech, SaaS, advisory firms, industrial companies, and any high-ticket service business that generates pipeline but struggles to convert it consistently.",
  },
  {
    question: "How long does it take to see results from the revenue system?",
    answer:
      "Most clients see qualified opportunities booked within the first 30 days. The system is designed to validate pipeline before scaling  a three-week diagnostic followed by a six-week build phase. Typical pipeline growth of 3–6× is observed within the first 120 days.",
  },
  {
    question: "What is the difference between Revenue Automation and the Outbound Engine?",
    answer:
      "The Revenue Automation System is a full-funnel solution: it generates pipeline AND manages every opportunity through to close. The Outbound Engine (Standalone) focuses only on generating meetings via cold email and LinkedIn  it does not include conversion follow-up, CRM management, or deal tracking. Choose Outbound Engine if you have a strong internal closer; choose Revenue Automation if you need the entire loop.",
  },
  {
    question: "Does Ascendly replace our sales team?",
    answer:
      "No. Ascendly operates as a revenue systems layer that sits alongside your existing team. We handle the system infrastructure  prospecting, routing, follow-up automation, and tracking  so your closers focus on conversations that are already qualified and warmed up.",
  },
];

export default function Services() {
  return (
    <>
      {/*
        Services page JSON-LD:
        - WebPage + BreadcrumbList: standard page identity signals
        - ProfessionalService: service-level schema used by Google for service cards
        - FAQPage: injected automatically by <FaqSection /> below
      */}
      <JsonLd
        schema={[
          webPageSchema({
            pathname: "/services",
            title:
              "Revenue Automation & Outbound Pipeline Services | Ascendly",
            description:
              "End-to-end revenue automation: outbound engine, inbound capture, AI-powered deal follow-up, and live pipeline visibility. Built for B2B teams that need pipeline that converts.",
            dateModified: "2025-07-01",
          }),
          breadcrumbSchema([{ name: "Services", pathname: "/services" }]),
          professionalServiceSchema(),
        ]}
      />
      <ServicesPage />

      {/*
        FAQ section appended below the main page content.
        FaqSection auto-generates FAQPage JSON-LD  no extra schema call needed.
        Positioned here so it appears on the page (required for Google to validate it)
        but can be styled to integrate with the page design.

        Internal link note: this page currently has no body links to /aboutus or
        /testimonials. Add a "See client results →" link in the CTA section and
        a "Meet the team →" link near the Operating Principles block.
      */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <FaqSection
          heading="Common questions about revenue automation"
          ariaLabel="Revenue automation service frequently asked questions"
          faqs={servicesFaqs}
        />
      </section>
    </>
  );
}
