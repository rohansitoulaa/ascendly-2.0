import type { Metadata } from "next";
import OutboundPipelinePage from "@/servicesPage/OutboundPipelinePage";
import JsonLd from "@/components/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  pathname: "/services/outbound-pipeline",
});

export default function OutboundPipeline() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            pathname: "/services/outbound-pipeline",
            title: "Outbound Pipeline System for B2B Companies | Ascendly",
            description:
              "Build qualified B2B pipeline without relying on referrals. ICP-targeted outbound with intent signals, multi-channel engagement, and qualified meeting booking.",
            dateModified: "2025-07-01",
          }),
          breadcrumbSchema([
            { name: "Services", pathname: "/services" },
            { name: "Outbound Pipeline", pathname: "/services/outbound-pipeline" },
          ]),
        ]}
      />
      <OutboundPipelinePage />
    </>
  );
}
