"use client";

import { useEffect, useRef } from "react";
import { Camera, Geometry, Mesh, Program, Renderer } from "ogl";

interface ParticlesProps {
  alphaParticles?: boolean;
  cameraDistance?: number;
  className?: string;
  disableRotation?: boolean;
  moveParticlesOnHover?: boolean;
  particleBaseSize?: number;
  particleColors?: string[];
  particleCount?: number;
  particleHoverFactor?: number;
  particleSpread?: number;
  pixelRatio?: number;
  sizeRandomness?: number;
  speed?: number;
}

const DEFAULT_COLORS = ["#ffffff", "#ffffff", "#ffffff"];

const hexToRgb = (hex: string): [number, number, number] => {
  const normalizedHex = hex.replace(/^#/, "");
  const expandedHex =
    normalizedHex.length === 3
      ? normalizedHex
          .split("")
          .map((character) => character + character)
          .join("")
      : normalizedHex;

  if (!/^[\da-fA-F]{6}$/.test(expandedHex)) {
    return [1, 1, 1];
  }

  const int = Number.parseInt(expandedHex, 16);
  return [
    ((int >> 16) & 255) / 255,
    ((int >> 8) & 255) / 255,
    (int & 255) / 255,
  ];
};

const vertexShader = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;

  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor = color;

    vec3 pos = position * uSpread;
    pos.z *= 10.0;

    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

    vec4 mvPos = viewMatrix * mPos;
    float sizeOffset = 1.0 + uSizeRandomness * (random.x - 0.5);
    gl_PointSize = (uBaseSize * max(sizeOffset, 0.1)) / max(length(mvPos.xyz), 0.001);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAlphaParticles;

  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    vec3 glow = vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28);

    if (uAlphaParticles < 0.5) {
      if (d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(glow, 1.0);
      return;
    }

    float circle = smoothstep(0.5, 0.16, d) * 0.8;
    gl_FragColor = vec4(glow, circle);
  }
`;

export default function Particles({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  pixelRatio = 1,
  className = "",
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const paletteKey = (particleColors?.length ? particleColors : DEFAULT_COLORS).join("|");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const renderer = new Renderer({
      alpha: true,
      antialias: false,
      depth: false,
      dpr: Math.min(Math.max(pixelRatio, 0.75), 2),
    });
    const gl = renderer.gl;
    gl.canvas.style.display = "block";
    gl.canvas.style.height = "100%";
    gl.canvas.style.width = "100%";
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const palette = paletteKey.split("|");
    const positions = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount * 4);
    const colors = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      let x = 0;
      let y = 0;
      let z = 0;
      let length = 0;

      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        length = x * x + y * y + z * z;
      } while (length > 1 || length === 0);

      const radius = Math.cbrt(Math.random());
      positions.set([x * radius, y * radius, z * radius], index * 3);
      randoms.set(
        [Math.random(), Math.random(), Math.random(), Math.random()],
        index * 4,
      );
      colors.set(
        hexToRgb(palette[Math.floor(Math.random() * palette.length)] ?? DEFAULT_COLORS[0]),
        index * 3,
      );
    }

    const geometry = new Geometry(gl, {
      color: { data: colors, size: 3 },
      position: { data: positions, size: 3 },
      random: { data: randoms, size: 4 },
    });

    const program = new Program(gl, {
      depthTest: false,
      fragment: fragmentShader,
      transparent: true,
      uniforms: {
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
        uBaseSize: { value: particleBaseSize * renderer.dpr },
        uSizeRandomness: { value: sizeRandomness },
        uSpread: { value: particleSpread },
        uTime: { value: 0 },
      },
      vertex: vertexShader,
    });

    const particles = new Mesh(gl, {
      geometry,
      mode: gl.POINTS,
      program,
    });

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) {
        return;
      }

      renderer.setSize(width, height);
      camera.perspective({ aspect: width / height });
      program.uniforms.uBaseSize.value = particleBaseSize * renderer.dpr;
    };

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            resize();
          });

    resizeObserver?.observe(container);
    window.addEventListener("resize", resize);
    resize();

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }

      mouseRef.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
      };
    };

    if (moveParticlesOnHover) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    let animationFrameId = 0;
    let elapsed = 0;
    let lastTime = performance.now();

    const update = (time: number) => {
      animationFrameId = window.requestAnimationFrame(update);
      const delta = time - lastTime;
      lastTime = time;
      elapsed += delta * speed;

      program.uniforms.uTime.value = elapsed * 0.001;

      if (moveParticlesOnHover) {
        particles.position.x = -mouseRef.current.x * particleHoverFactor;
        particles.position.y = -mouseRef.current.y * particleHoverFactor;
      } else {
        particles.position.x = 0;
        particles.position.y = 0;
      }

      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        particles.rotation.z += 0.01 * speed;
      }

      renderer.render({ camera, scene: particles });
    };

    animationFrameId = window.requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      resizeObserver?.disconnect();

      if (moveParticlesOnHover) {
        window.removeEventListener("pointermove", handlePointerMove);
      }

      window.cancelAnimationFrame(animationFrameId);

      try {
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      } catch (error) {
        console.warn("Particles WebGL cleanup error:", error);
      }

      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [
    alphaParticles,
    cameraDistance,
    disableRotation,
    moveParticlesOnHover,
    paletteKey,
    particleBaseSize,
    particleCount,
    particleHoverFactor,
    particleSpread,
    pixelRatio,
    sizeRandomness,
    speed,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative h-full w-full ${className}`.trim()}
    />
  );
}
