import type { Metadata } from "next";
import RevenueAutomationPage from "@/servicesPage/RevenueAutomationPage";

export const metadata: Metadata = {
  title: "Revenue Conversion System | Ascendly",
  description:
    "Turn existing demand into predictable revenue. Inbound capture, lead qualification, deal progression, and AI-powered follow-up. Built for B2B companies with $15k+ LTV.",
};

export default function RevenueAutomation() {
  return <RevenueAutomationPage />;
}
