"use client";

import Silk from "@/animations/Silk";
import { ClientProofSection } from "@/landingPage/components/ClientProofSection";
import Hero from "@/landingPage/components/Hero";
import Navbar from "@/landingPage/components/Navbar";
import { PaperPlane } from "@/landingPage/components/PaperPlane";
import {
  PlaneSparkleTrail,
  type PlaneSparkleTrailHandle,
} from "@/landingPage/components/PlaneSparkleTrail";
import { PrimaryFeaturesSection } from "@/landingPage/components/PrimaryFeaturesSection";
import { HowItWorksSection } from "@/landingPage/components/HowItWorksSection";
import { IndustriesSection } from "@/landingPage/components/IndustriesSection";
import { RevenueSystemsSection } from "@/landingPage/components/RevenueSystemsSection";
import { WhyChooseSection } from "@/landingPage/components/WhyChooseSection";
import { PipelineReviewSection } from "@/landingPage/components/PipelineReviewSection";
import { usePlaneFlight } from "@/landingPage/hooks/usePlaneFlight";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const startAnchorRef = useRef<HTMLSpanElement>(null);
  const endAnchorRef = useRef<HTMLSpanElement>(null);
  const heroCtaPlaneVisualRef = useRef<HTMLSpanElement>(null);
  const sparkleTrailRef = useRef<PlaneSparkleTrailHandle>(null);
  const themeTriggerRef = useRef<HTMLElement | null>(null);
  const { overlayRef, planeRef, planeSwingRef, phase } = usePlaneFlight({
    startRef: startAnchorRef,
    endRef: endAnchorRef,
    launchDelay: 0.8,
    planeSize: 34,
    sparkleTrailRef,
  });

  useEffect(() => {
    const triggerElement = themeTriggerRef.current;
    const root = document.documentElement;
    if (!triggerElement) {
      return;
    }

    const applyMatteTheme = (nextValue: boolean) => {
      if (nextValue) {
        root.dataset.siteTheme = "matte";
        return;
      }

      root.removeAttribute("data-site-theme");
    };

    // Use matchMedia to separate desktop/mobile behavior
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const triggerThreshold =
        triggerElement.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight * 0.68;

      applyMatteTheme(window.scrollY >= triggerThreshold);

      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 68%",
        onEnter: () => applyMatteTheme(true),
        onEnterBack: () => applyMatteTheme(true),
        onLeaveBack: () => applyMatteTheme(false),
      });
    });

    // Mobile: apply static theme based on scroll position (no ScrollTrigger)
    mm.add("(max-width: 767px)", () => {
      const handleScroll = () => {
        const rect = triggerElement.getBoundingClientRect();
        const threshold = window.innerHeight * 0.68;
        applyMatteTheme(rect.top < threshold);
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    });

    return () => {
      mm.revert();
      root.removeAttribute("data-site-theme");
    };
  }, []);

  return (
    <main
      id="top"
      className="relative isolate min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_top,rgba(134,146,153,0.16),transparent_20%),linear-gradient(180deg,#0c0e10_0%,#090b0d_44%,#050608_100%)]"
    >
      <div className="relative isolate overflow-hidden bg-[#090b0d]">
        <Silk
          speed={2.8}
          scale={1}
          color="#869299"
          noiseIntensity={1.15}
        />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(134,146,153,0.22),transparent_24%),radial-gradient(circle_at_78%_14%,rgba(255,255,255,0.08),transparent_18%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-[-14rem] z-0 h-[32rem] bg-[radial-gradient(circle_at_center,rgba(134,146,153,0.22),transparent_62%)]" />

        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar
            planeAnchorRef={startAnchorRef}
            showStartPlane={phase === "idle"}
          />
          <Hero
            ctaPlaneAnchorRef={endAnchorRef}
            isPlaneDocked={phase === "landed"}
            planeVisualRef={heroCtaPlaneVisualRef}
          />
        </div>
      </div>

      <PrimaryFeaturesSection />
      <ClientProofSection />
      <RevenueSystemsSection ref={themeTriggerRef} />

      <HowItWorksSection />
      <IndustriesSection />
      <WhyChooseSection />
      <PipelineReviewSection />

      <PlaneSparkleTrail ref={sparkleTrailRef} />

      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[60] hidden opacity-0 md:block"
      >
        <div ref={planeRef} className="absolute left-0 top-0 will-change-transform">
          <div
            ref={planeSwingRef}
            className="[transform-style:preserve-3d] will-change-transform"
          >
            <PaperPlane size={34} />
          </div>
        </div>
      </div>
    </main>
  );
}
