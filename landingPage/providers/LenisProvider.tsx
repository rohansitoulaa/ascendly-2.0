"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useRef,
} from "react";

gsap.registerPlugin(ScrollTrigger);

export const LenisContext = createContext<{ current: Lenis | null } | null>(
  null,
);

export function LenisProvider({ children }: PropsWithChildren) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip Lenis smooth scroll on mobile — native scroll is better for touch
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      return;
    }

    const instance = new Lenis({
      autoRaf: false,
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.08,
      wheelMultiplier: 0.94,
    });

    const root = document.documentElement;
    const body = document.body;
    const update = (time: number) => {
      instance.raf(time * 1000);
    };
    const detachScrollListener = instance.on("scroll", ScrollTrigger.update);

    lenisRef.current = instance;
    root.classList.add("lenis", "lenis-smooth");
    body.classList.add("lenis");
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
      detachScrollListener();
      root.classList.remove("lenis", "lenis-smooth");
      body.classList.remove("lenis");
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
