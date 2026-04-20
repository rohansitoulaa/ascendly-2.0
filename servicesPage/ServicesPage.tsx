"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles from "@/animations/Particles";
import Navbar from "@/landingPage/components/Navbar";
import { useRef } from "react";
import ServicesHero from "@/servicesPage/components/ServicesHero";
import ProblemReframe from "@/servicesPage/components/ProblemReframe";
import RevenueAutomationExplainer from "@/servicesPage/components/RevenueAutomationExplainer";
import CoreSystem from "@/servicesPage/components/CoreSystem";
import WhatWeBuild from "@/servicesPage/components/WhatWeBuild";
import HowItWorks from "@/servicesPage/components/HowItWorks";
import ProofSection from "@/servicesPage/components/ProofSection";
import WhoThisIsFor from "@/servicesPage/components/WhoThisIsFor";
import WhyUs from "@/servicesPage/components/WhyUs";
import ServicesFAQ from "@/servicesPage/components/ServicesFAQ";
import ServicesCTA from "@/servicesPage/components/ServicesCTA";

gsap.registerPlugin(ScrollTrigger);

const SERVICES_PARTICLE_COLORS = ["#f8fafc", "#7dd3fc", "#a7f3d0"];

export default function ServicesPage() {
  const startAnchorRef = useRef<HTMLSpanElement>(null);

  return (
    <main
      id="top"
      className="relative isolate min-h-screen overflow-x-clip bg-[#090b0d]"
    >
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <Particles
          alphaParticles
          cameraDistance={18}
          className="h-full w-full opacity-[0.55]"
          moveParticlesOnHover
          particleBaseSize={90}
          particleColors={SERVICES_PARTICLE_COLORS}
          particleCount={180}
          particleHoverFactor={0.35}
          particleSpread={12}
          pixelRatio={1.1}
          sizeRandomness={0.7}
          speed={0.06}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.08),transparent_36%),radial-gradient(circle_at_20%_28%,rgba(167,243,208,0.06),transparent_24%),linear-gradient(180deg,rgba(9,11,13,0.16)_0%,rgba(9,11,13,0.44)_100%)]" />
      </div>

      {/* Top ambient light */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(134,146,153,0.12),transparent_55%)]" />
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar planeAnchorRef={startAnchorRef} showStartPlane={false} />
      </div>

      {/* Sections */}
      <div className="relative z-10">
        <ServicesHero />

        {/* Subtle separator */}
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        <ProblemReframe />
        <RevenueAutomationExplainer />

        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        <CoreSystem />
        <WhatWeBuild />

        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        <HowItWorks />
        <ProofSection />
        <WhoThisIsFor />
        <WhyUs />
        <ServicesFAQ />
        <ServicesCTA />
      </div>
    </main>
  );
}
