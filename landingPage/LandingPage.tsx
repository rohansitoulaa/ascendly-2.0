"use client";

import { ScrollProgress } from "@/animations/ScrollProgress";
import { SpotlightCursor } from "@/animations/SpotlightCursor";
import { NoiseOverlay } from "@/animations/NoiseOverlay";
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { Brands } from "./sections/Brands";
import { Bento } from "./sections/Bento";
import { Process } from "./sections/Process";
import { Testimonials } from "./sections/Testimonials";
import { Industries } from "./sections/Industries";
import { WhyUs } from "./sections/WhyUs";
import { CTA } from "./sections/CTA";
import { Footer } from "./sections/Footer";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05060A] text-white">
      <ScrollProgress gradient />
      <SpotlightCursor size={520} color="rgba(125,211,252,0.14)" />
      <NoiseOverlay opacity={0.05} blend="overlay" />

      <Navbar />

      <Hero />
      <Brands />
      <Bento />
      <Process />
      <Testimonials />
      <Industries />
      <WhyUs />
      <CTA />
      <Footer />
    </main>
  );
}
