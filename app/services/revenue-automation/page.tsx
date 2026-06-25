import type { Metadata } from "next";
import RevenueAutomationPage from "@/servicesPage/RevenueAutomationPage";
import JsonLd from "@/components/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  pathname: "/services/revenue-automation",
});

export default function RevenueAutomation() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            pathname: "/services/revenue-automation",
            title: "Revenue Conversion System for B2B Teams | Ascendly",
            description:
              "Turn existing demand into predictable revenue. Inbound capture, lead qualification, AI-powered deal follow-up, and full pipeline visibility for B2B companies.",
            dateModified: "2025-07-01",
          }),
          breadcrumbSchema([
            { name: "Services", pathname: "/services" },
            { name: "Revenue Automation", pathname: "/services/revenue-automation" },
          ]),
        ]}
      />
      <RevenueAutomationPage />
    </>
  );
}
