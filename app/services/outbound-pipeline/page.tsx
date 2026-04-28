import type { Metadata } from "next";
import OutboundPipelinePage from "@/servicesPage/OutboundPipelinePage";

export const metadata: Metadata = {
  title: "Outbound Pipeline System | Ascendly",
  description:
    "Build qualified pipeline without relying on referrals. Structured outbound built around ICP, intent signals, and multi-channel engagement. For B2B companies with $15k+ LTV.",
};

export default function OutboundPipeline() {
  return <OutboundPipelinePage />;
}
