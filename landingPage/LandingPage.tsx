"use client";

import dynamic from "next/dynamic";
import { ScrollProgress } from "@/animations/ScrollProgress";
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";

const Brands = dynamic(() => import("./sections/Brands").then((m) => m.Brands));
const Features = dynamic(() => import("./sections/Features").then((m) => m.Features), { ssr: false });
const Services = dynamic(() => import("./sections/Services").then((m) => m.Services));
const Process = dynamic(() => import("./sections/Process").then((m) => m.Process));
const Testimonials = dynamic(() => import("./sections/Testimonials").then((m) => m.Testimonials));
const Industries = dynamic(() => import("./sections/Industries").then((m) => m.Industries));
const WhyUs = dynamic(() => import("./sections/WhyUs").then((m) => m.WhyUs));
const CTA = dynamic(() => import("./sections/CTA").then((m) => m.CTA));
const Footer = dynamic(() => import("./sections/Footer").then((m) => m.Footer));

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05060A] text-white">
      <ScrollProgress gradient />

      <Navbar />

      <Hero />
      <Brands />
      <Features />
      <Services />
      <Process />
      <Testimonials />
      <Industries />
      <WhyUs />
      <CTA />
      <Footer />
    </main>
  );
}
