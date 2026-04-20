"use client";

import {
  useCallback,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import type { PlaneSparkleTrailHandle } from "@/landingPage/components/PlaneSparkleTrail";
import { useElementPosition } from "@/landingPage/hooks/useElementPosition";
import {
  createPlaneFlightDefinition,
  getPlaneTrailPoint,
  samplePlaneFlight,
} from "@/landingPage/lib/planeFlight";

gsap.registerPlugin(MotionPathPlugin);

type PlaneFlightPhase = "idle" | "flying" | "landed";

interface UsePlaneFlightOptions {
  endRef: RefObject<HTMLElement | null>;
  launchDelay?: number;
  planeSize?: number;
  sparkleTrailRef?: RefObject<PlaneSparkleTrailHandle | null>;
  startRef: RefObject<HTMLElement | null>;
}

const waitForWindowLoad = async () => {
  if (document.readyState === "complete") {
    return;
  }

  await new Promise<void>((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
};

const waitForNextPaint = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });

export function usePlaneFlight({
  startRef,
  endRef,
  launchDelay = 0.75,
  planeSize = 34,
  sparkleTrailRef,
}: UsePlaneFlightOptions) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const planeSwingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const introTimeoutRef = useRef<number | null>(null);
  const runTokenRef = useRef(0);
  const [phase, setPhase] = useState<PlaneFlightPhase>("idle");
  const { measure: measureStart } = useElementPosition(startRef);
  const { measure: measureEnd } = useElementPosition(endRef);

  const clearIntroTimeout = useCallback(() => {
    if (introTimeoutRef.current !== null) {
      window.clearTimeout(introTimeoutRef.current);
      introTimeoutRef.current = null;
    }
  }, []);

  const clearTimeline = useCallback(() => {
    timelineRef.current?.kill();
    timelineRef.current = null;
  }, []);

  const hideOverlay = useCallback(() => {
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { autoAlpha: 0 });
    }
  }, []);

  const clearSparkles = useCallback(() => {
    sparkleTrailRef?.current?.clear();
  }, [sparkleTrailRef]);

  const seedFlightPosition = useCallback(
    (x: number, y: number, rotation: number) => {
      const plane = planeRef.current;
      const planeSwing = planeSwingRef.current;

      if (!plane || !planeSwing) {
        return;
      }

      gsap.set(plane, {
        autoAlpha: 1,
        force3D: true,
        rotation,
        transformOrigin: "50% 50%",
        x,
        xPercent: -50,
        y,
        yPercent: -50,
      });

      gsap.set(planeSwing, {
        force3D: true,
        rotation: 0,
        rotationX: 1.6,
        rotationY: -2.4,
        scale: 0.98,
        transformOrigin: "50% 50%",
        transformPerspective: 900,
        y: 0,
      });
    },
    [],
  );

  const playFlight = useCallback(async () => {
    const plane = planeRef.current;
    const planeSwing = planeSwingRef.current;
    const overlay = overlayRef.current;
    const startBox = measureStart();
    const endBox = measureEnd();

    if (!plane || !planeSwing || !overlay || !startBox || !endBox) {
      return;
    }

    const flight = createPlaneFlightDefinition(
      { x: startBox.centerX, y: startBox.centerY },
      { x: endBox.centerX, y: endBox.centerY },
      planeSize,
    );
    const progressState = { value: 0 };
    let lastSparkleAt = 0;

    clearTimeline();
    seedFlightPosition(
      flight.startPoint.x,
      flight.startPoint.y,
      flight.startRotation,
    );
    setPhase("flying");
    gsap.set(overlay, { autoAlpha: 1 });

    const timeline = gsap.timeline({
      defaults: {
        ease: flight.ease,
      },
      onComplete: () => {
        gsap.set(plane, {
          rotation: flight.landingRotation,
          x: flight.endPoint.x,
          y: flight.endPoint.y,
        });

        flushSync(() => {
          setPhase("landed");
        });

        gsap.to(overlay, {
          autoAlpha: 0,
          duration: 0.1,
          ease: "power2.out",
        });
      },
    });

    timelineRef.current = timeline;

    timeline
      .to(
        plane,
        {
          duration: flight.duration,
          force3D: true,
          motionPath: {
            alignOrigin: [0.5, 0.5],
            autoRotate: flight.autoRotate,
            path: flight.path,
          },
        },
        0,
      )
      .to(
        progressState,
        {
          duration: flight.duration,
          ease: flight.ease,
          onUpdate: () => {
            if (!sparkleTrailRef?.current || progressState.value >= 0.92) {
              return;
            }

            const now = performance.now();

            if (now - lastSparkleAt < flight.sparkleCadenceMs) {
              return;
            }

            lastSparkleAt = now;

            const sample = samplePlaneFlight(flight.rawPath, progressState.value);
            const emissionPoint = getPlaneTrailPoint(sample, flight.tailOffset);

            sparkleTrailRef.current.emit({
              angle: sample.angle,
              intensity: flight.sparkleIntensity,
              x: emissionPoint.x,
              y: emissionPoint.y,
            });
          },
          value: 1,
        },
        0,
      )
      .to(
        planeSwing,
        {
          duration: flight.duration * 0.36,
          rotation: flight.bankAngle,
          rotationX: flight.pitchAngle,
          rotationY: -flight.yawAngle,
          scale: 1,
          y: -1.4,
        },
        0,
      )
      .to(
        planeSwing,
        {
          duration: flight.duration * 0.3,
          rotation: -flight.bankAngle * 0.46,
          rotationX: flight.pitchAngle * 0.52,
          rotationY: flight.yawAngle * 0.5,
          y: -0.6,
        },
        flight.duration * 0.36,
      )
      .to(
        planeSwing,
        {
          duration: flight.duration * 0.22,
          ease: "power2.out",
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          y: 0,
        },
        flight.duration * 0.78,
      );
  }, [
    clearTimeline,
    measureEnd,
    measureStart,
    planeSize,
    seedFlightPosition,
    sparkleTrailRef,
  ]);

  const scheduleFlight = useCallback(async (delaySeconds: number) => {
    const token = ++runTokenRef.current;

    clearIntroTimeout();
    clearTimeline();
    clearSparkles();
    hideOverlay();

    await waitForWindowLoad();

    if (token !== runTokenRef.current) {
      return;
    }

    if ("fonts" in document) {
      await document.fonts.ready;
    }

    if (token !== runTokenRef.current) {
      return;
    }

    await waitForNextPaint();

    if (token !== runTokenRef.current) {
      return;
    }

    introTimeoutRef.current = window.setTimeout(() => {
      if (token !== runTokenRef.current) {
        return;
      }

      void playFlight();
    }, delaySeconds * 1000);
  }, [clearIntroTimeout, clearSparkles, clearTimeline, hideOverlay, playFlight]);

  useEffect(() => {
    // On mobile, skip the plane flight entirely and show the plane icon statically
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setPhase("landed");
      return;
    }

    void scheduleFlight(launchDelay);

    return () => {
      runTokenRef.current += 1;
      clearIntroTimeout();
      clearTimeline();
      clearSparkles();
    };
  }, [
    clearIntroTimeout,
    clearSparkles,
    clearTimeline,
    launchDelay,
    scheduleFlight,
  ]);

  useEffect(() => {
    // Skip resize-triggered reflight on mobile
    if (window.innerWidth < 768) {
      return;
    }

    const handleResize = () => {
      if (phase === "landed") {
        return;
      }

      setPhase("idle");
      void scheduleFlight(0.1);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [phase, scheduleFlight]);

  return {
    overlayRef,
    phase,
    planeRef,
    planeSwingRef,
  };
}
