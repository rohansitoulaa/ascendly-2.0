"use client";

import gsap from "gsap";
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type HTMLAttributes,
} from "react";

const DEG_TO_RAD = Math.PI / 180;

export interface SparkleEmission {
  angle: number;
  intensity?: number;
  x: number;
  y: number;
}

export interface PlaneSparkleTrailHandle {
  clear: () => void;
  emit: (emission: SparkleEmission) => void;
}

type PlaneSparkleTrailProps = HTMLAttributes<HTMLDivElement>;

export const PlaneSparkleTrail = forwardRef<
  PlaneSparkleTrailHandle,
  PlaneSparkleTrailProps
>(function PlaneSparkleTrail({ className = "", ...props }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    clear() {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      Array.from(container.children).forEach((child) => {
        gsap.killTweensOf(child);
        child.remove();
      });
    },
    emit(emission) {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      // Skip sparkle emissions on mobile
      if (window.innerWidth < 768) {
        return;
      }

      const count = Math.random() > 0.4 ? 2 : 1;
      const forwardAngle = emission.angle * DEG_TO_RAD;
      const forward = {
        x: Math.cos(forwardAngle),
        y: Math.sin(forwardAngle),
      };
      const normal = {
        x: -forward.y,
        y: forward.x,
      };
      const intensity = emission.intensity ?? 1;

      for (let index = 0; index < count; index += 1) {
        const sparkle = document.createElement("span");
        const size = gsap.utils.random(4, 8, 0.5) * intensity;
        const drift = gsap.utils.random(18, 34) * intensity;
        const lateralDrift = gsap.utils.random(-12, 12) * intensity;
        const verticalLift = gsap.utils.random(-8, 10) * intensity;
        const duration = gsap.utils.random(2.05, 2.85, 0.05);
        const opacity = gsap.utils.random(0.42, 0.78, 0.02);
        const blur = gsap.utils.random(0.4, 1.1, 0.1);

        sparkle.className =
          "pointer-events-none absolute left-0 top-0 will-change-transform";
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.borderRadius = Math.random() > 0.45 ? "9999px" : "36%";
        sparkle.style.background =
          "radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(223,236,255,0.88) 30%, rgba(187,212,246,0.42) 65%, rgba(187,212,246,0) 100%)";
        sparkle.style.boxShadow = "0 0 18px rgba(228,241,255,0.3)";
        sparkle.style.filter = `blur(${blur}px)`;
        sparkle.style.mixBlendMode = "screen";

        container.appendChild(sparkle);

        const destination = {
          x:
            emission.x -
            forward.x * drift +
            normal.x * lateralDrift +
            gsap.utils.random(-3, 3),
          y:
            emission.y -
            forward.y * drift +
            normal.y * lateralDrift +
            verticalLift,
        };

        gsap.set(sparkle, {
          autoAlpha: 0,
          rotation: gsap.utils.random(-18, 18),
          scale: 0.22,
          x: emission.x,
          xPercent: -50,
          y: emission.y,
          yPercent: -50,
        });

        gsap
          .timeline({
            onComplete: () => {
              sparkle.remove();
            },
          })
          .to(sparkle, {
            autoAlpha: opacity,
            duration: 0.16,
            ease: "power1.out",
            scale: 1,
          })
          .to(
            sparkle,
            {
              autoAlpha: 0,
              duration,
              ease: "power1.out",
              scale: 0.36,
              x: destination.x,
              y: destination.y,
            },
            0,
          );
      }
    },
  }));

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 z-[55] overflow-hidden ${className}`}
      {...props}
    />
  );
});

PlaneSparkleTrail.displayName = "PlaneSparkleTrail";
