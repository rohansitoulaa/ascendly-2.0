"use client";

import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef, useState } from "react";

export type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

interface LightRaysProps {
  className?: string;
  distortion?: number;
  fadeDistance?: number;
  followMouse?: boolean;
  lightSpread?: number;
  mouseInfluence?: number;
  noiseAmount?: number;
  pulsating?: boolean;
  rayLength?: number;
  raysColor?: string;
  raysOrigin?: RaysOrigin;
  raysSpeed?: number;
  saturation?: number;
}

type Vec2 = [number, number];
type Vec3 = [number, number, number];

interface Uniform<T> {
  value: T;
}

interface LightRaysUniforms {
  distortion: Uniform<number>;
  fadeDistance: Uniform<number>;
  iResolution: Uniform<Vec2>;
  iTime: Uniform<number>;
  lightSpread: Uniform<number>;
  mouseInfluence: Uniform<number>;
  mousePos: Uniform<Vec2>;
  noiseAmount: Uniform<number>;
  pulsating: Uniform<number>;
  rayDir: Uniform<Vec2>;
  rayLength: Uniform<number>;
  rayPos: Uniform<Vec2>;
  raysColor: Uniform<Vec3>;
  raysSpeed: Uniform<number>;
  saturation: Uniform<number>;
}

const DEFAULT_COLOR = "#ffffff";

const hexToRgb = (hex: string): Vec3 => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return match
    ? [
        Number.parseInt(match[1], 16) / 255,
        Number.parseInt(match[2], 16) / 255,
        Number.parseInt(match[3], 16) / 255,
      ]
    : [1, 1, 1];
};

const getAnchorAndDir = (
  origin: RaysOrigin,
  width: number,
  height: number,
): { anchor: Vec2; dir: Vec2 } => {
  const outside = 0.2;

  switch (origin) {
    case "top-left":
      return { anchor: [0, -outside * height], dir: [0, 1] };
    case "top-right":
      return { anchor: [width, -outside * height], dir: [0, 1] };
    case "left":
      return { anchor: [-outside * width, 0.5 * height], dir: [1, 0] };
    case "right":
      return { anchor: [(1 + outside) * width, 0.5 * height], dir: [-1, 0] };
    case "bottom-left":
      return { anchor: [0, (1 + outside) * height], dir: [0, -1] };
    case "bottom-center":
      return { anchor: [0.5 * width, (1 + outside) * height], dir: [0, -1] };
    case "bottom-right":
      return { anchor: [width, (1 + outside) * height], dir: [0, -1] };
    default:
      return { anchor: [0.5 * width, -outside * height], dir: [0, 1] };
  }
};

const vertexShader = `
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragmentShader = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}`;

export default function LightRays({
  raysOrigin = "top-center",
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1,
  saturation = 1,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0,
  distortion = 0,
  className = "",
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const uniformsRef = useRef<LightRaysUniforms | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0]?.isIntersecting ?? false);
      },
      { threshold: 0.1 },
    );

    observerRef.current.observe(container);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!isVisible || !container) {
      return;
    }

    // Skip WebGL on mobile — saves GPU and battery
    if (window.innerWidth < 768) {
      return;
    }

    cleanupRef.current?.();
    cleanupRef.current = null;

    let cancelled = false;

    const initializeWebGl = async () => {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 10);
      });

      if (cancelled || !containerRef.current) {
        return;
      }

      try {
        const renderer = new Renderer({
          alpha: true,
          dpr: Math.min(window.devicePixelRatio || 1, 2),
        });

        rendererRef.current = renderer;

        const gl = renderer.gl;
        gl.canvas.style.width = "100%";
        gl.canvas.style.height = "100%";

        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }

        containerRef.current.appendChild(gl.canvas);

        const uniforms: LightRaysUniforms = {
          distortion: { value: distortion },
          fadeDistance: { value: fadeDistance },
          iResolution: { value: [1, 1] },
          iTime: { value: 0 },
          lightSpread: { value: lightSpread },
          mouseInfluence: { value: mouseInfluence },
          mousePos: { value: [0.5, 0.5] },
          noiseAmount: { value: noiseAmount },
          pulsating: { value: pulsating ? 1 : 0 },
          rayDir: { value: [0, 1] },
          rayLength: { value: rayLength },
          rayPos: { value: [0, 0] },
          raysColor: { value: hexToRgb(raysColor) },
          raysSpeed: { value: raysSpeed },
          saturation: { value: saturation },
        };

        uniformsRef.current = uniforms;

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
          fragment: fragmentShader,
          uniforms,
          vertex: vertexShader,
        });

        const mesh = new Mesh(gl, { geometry, program });
        meshRef.current = mesh;

        const updatePlacement = () => {
          if (!containerRef.current || !rendererRef.current || !uniformsRef.current) {
            return;
          }

          rendererRef.current.dpr = Math.min(window.devicePixelRatio || 1, 2);

          const { clientHeight, clientWidth } = containerRef.current;
          rendererRef.current.setSize(clientWidth, clientHeight);

          const dpr = rendererRef.current.dpr;
          const width = clientWidth * dpr;
          const height = clientHeight * dpr;

          uniformsRef.current.iResolution.value = [width, height];

          const { anchor, dir } = getAnchorAndDir(raysOrigin, width, height);
          uniformsRef.current.rayPos.value = anchor;
          uniformsRef.current.rayDir.value = dir;
        };

        const loop = (time: number) => {
          if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {
            return;
          }

          uniformsRef.current.iTime.value = time * 0.001;

          if (followMouse && mouseInfluence > 0) {
            const smoothing = 0.92;

            smoothMouseRef.current.x =
              smoothMouseRef.current.x * smoothing +
              mouseRef.current.x * (1 - smoothing);
            smoothMouseRef.current.y =
              smoothMouseRef.current.y * smoothing +
              mouseRef.current.y * (1 - smoothing);

            uniformsRef.current.mousePos.value = [
              smoothMouseRef.current.x,
              smoothMouseRef.current.y,
            ];
          }

          try {
            rendererRef.current.render({ scene: meshRef.current });
            animationIdRef.current = window.requestAnimationFrame(loop);
          } catch (error) {
            console.warn("WebGL rendering error:", error);
          }
        };

        window.addEventListener("resize", updatePlacement);
        updatePlacement();
        animationIdRef.current = window.requestAnimationFrame(loop);

        cleanupRef.current = () => {
          if (animationIdRef.current !== null) {
            window.cancelAnimationFrame(animationIdRef.current);
            animationIdRef.current = null;
          }

          window.removeEventListener("resize", updatePlacement);

          try {
            const activeRenderer = rendererRef.current;
            if (activeRenderer) {
              const canvas = activeRenderer.gl.canvas;
              activeRenderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
              canvas.parentNode?.removeChild(canvas);
            }
          } catch (error) {
            console.warn("Error during WebGL cleanup:", error);
          }

          rendererRef.current = null;
          uniformsRef.current = null;
          meshRef.current = null;
        };
      } catch (error) {
        console.warn("WebGL initialization error:", error);
      }
    };

    void initializeWebGl();

    return () => {
      cancelled = true;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [
    distortion,
    fadeDistance,
    followMouse,
    isVisible,
    lightSpread,
    mouseInfluence,
    noiseAmount,
    pulsating,
    rayLength,
    raysColor,
    raysOrigin,
    raysSpeed,
    saturation,
  ]);

  useEffect(() => {
    if (!uniformsRef.current || !containerRef.current || !rendererRef.current) {
      return;
    }

    uniformsRef.current.raysColor.value = hexToRgb(raysColor);
    uniformsRef.current.raysSpeed.value = raysSpeed;
    uniformsRef.current.lightSpread.value = lightSpread;
    uniformsRef.current.rayLength.value = rayLength;
    uniformsRef.current.pulsating.value = pulsating ? 1 : 0;
    uniformsRef.current.fadeDistance.value = fadeDistance;
    uniformsRef.current.saturation.value = saturation;
    uniformsRef.current.mouseInfluence.value = mouseInfluence;
    uniformsRef.current.noiseAmount.value = noiseAmount;
    uniformsRef.current.distortion.value = distortion;

    const { clientHeight, clientWidth } = containerRef.current;
    const dpr = rendererRef.current.dpr;
    const { anchor, dir } = getAnchorAndDir(
      raysOrigin,
      clientWidth * dpr,
      clientHeight * dpr,
    );

    uniformsRef.current.rayPos.value = anchor;
    uniformsRef.current.rayDir.value = dir;
  }, [
    distortion,
    fadeDistance,
    lightSpread,
    mouseInfluence,
    noiseAmount,
    pulsating,
    rayLength,
    raysColor,
    raysOrigin,
    raysSpeed,
    saturation,
  ]);

  useEffect(() => {
    if (!followMouse) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [followMouse]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none relative h-full w-full overflow-hidden ${className}`.trim()}
    />
  );
}
