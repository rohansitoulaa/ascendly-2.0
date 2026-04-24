import type { Metadata } from "next";
import LandingPage from "@/landingPage/LandingPage";
import JsonLd from "@/components/JsonLd";
import {
  webPageSchema,
  professionalServiceSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({ pathname: "/" });

export default function Home() {
  return (
    <>
      {/*
        Homepage JSON-LD: WebPage + ProfessionalService.
        Organization + WebSite are already injected in the root layout.
        ProfessionalService schema is critical for B2B service discovery in AI answers.
      */}
      <JsonLd
        schema={[
          webPageSchema({
            pathname: "/",
            title:
              "B2B Revenue Systems That Generate & Convert Pipeline | Ascendly",
            description:
              "Ascendly engineers end-to-end B2B revenue systems  inbound capture, outbound pipeline, AI follow-up, and full ROI tracking. Predictable growth, not just activity.",
            dateModified: "2025-07-01",
          }),
          professionalServiceSchema(),
        ]}
      />
      <LandingPage />
    </>
  );
}
