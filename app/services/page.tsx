import type { Metadata } from "next";
import ServicesPage from "@/servicesPage/ServicesPage";

export const metadata: Metadata = {
  title: "Services | Ascendly — Revenue Systems That Convert",
  description:
    "We build end-to-end revenue systems — from outbound engine to CRM optimization to AI follow-ups. Pipeline that converts, not just campaigns that generate noise.",
};

export default function Services() {
  return <ServicesPage />;
}
