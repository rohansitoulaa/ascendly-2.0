"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

interface GrainientProps {
  timeSpeed?: number;
  colorBalance?: number;
  warpStrength?: number;
  warpFrequency?: number;
  warpSpeed?: number;
  warpAmplitude?: number;
  blendAngle?: number;
  blendSoftness?: number;
  rotationAmount?: number;
  noiseScale?: number;
  grainAmount?: number;
  grainScale?: number;
  grainAnimated?: boolean;
  contrast?: number;
  gamma?: number;
  saturation?: number;
  centerX?: number;
  centerY?: number;
  zoom?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  className?: string;
}

const DEFAULT_GRAINIENT = {
  // Time multiplier for the shader. Keep between 0.12 and 0.4 so the motion stays atmospheric instead of distracting.
  timeSpeed: 0.18,
  // Bias applied to the diagonal color blend. Keep between -0.2 and 0.2 to avoid flipping the palette balance too aggressively.
  colorBalance: -0.06,
  // Distortion strength for the wave warp. Keep between 0.6 and 1.4 so the background moves without breaking the blend.
  warpStrength: 0.9,
  // Wave density for the warp field. Keep between 3.5 and 7.5 so the movement reads as broad atmosphere rather than tight ripples.
  warpFrequency: 4.6,
  // Wave animation speed. Keep between 1.0 and 2.8 so the field stays calm.
  warpSpeed: 1.45,
  // Divisor for warp displacement. Keep between 40 and 90 so the motion remains subtle in a dark UI.
  warpAmplitude: 72,
  // Diagonal blend angle in degrees. Keep between 8 and 40 so the gradient sweep stays broad.
  blendAngle: 22,
  // Extra softness around the color blend edge. Keep between 0.04 and 0.12 so the palette transitions stay smooth.
  blendSoftness: 0.08,
  // Rotation amount applied to the noise field. Keep between 180 and 480 to preserve slow color drift.
  rotationAmount: 260,
  // Noise scale for the rotation field. Keep between 1.2 and 3.4 so the texture stays broad.
  noiseScale: 1.8,
  // Grain contribution added to the color result. Keep between 0.02 and 0.08 so cards remain readable.
  grainAmount: 0.045,
  // Grain scale used to sample the texture. Keep between 1.2 and 3.2 so the grain stays fine.
  grainScale: 2.2,
  // Contrast lift for the final color. Keep between 1.0 and 1.3 to maintain a dark palette without crushing detail.
  contrast: 1.14,
  // Gamma correction applied to the final output. Keep between 0.9 and 1.1 for predictable dark rendering.
  gamma: 1.0,
  // Saturation multiplier for the palette. Keep between 0.55 and 0.95 so the result never turns neon.
  saturation: 0.72,
  // Camera zoom over the shader plane. Keep between 0.75 and 1.1 so the blend remains broad on large displays.
  zoom: 0.94,
  // Horizontal center offset. Keep between -0.15 and 0.15 so the focal area does not drift off-canvas.
  centerX: 0,
  // Vertical center offset. Keep between -0.15 and 0.15 so the focal area stays balanced behind the cards.
  centerY: 0,
  // Palette swatches used by the shader. Keep these colors dark so the page never flips bright.
  color1: "#12192A",
  color2: "#0C2230",
  color3: "#090B0D",
} as const;

const hexToRgb = (hex: string): [number, number, number] => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!match) {
    return [1, 1, 1];
  }

  return [
    Number.parseInt(match[1], 16) / 255,
    Number.parseInt(match[2], 16) / 255,
    Number.parseInt(match[3], 16) / 255,
  ];
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);

  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;

  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));

  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);}
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;

  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);

  o=vec4(col,1.0);
}
void main(){
  vec4 o=vec4(0.0);
  mainImage(o,gl_FragCoord.xy);
  fragColor=o;
}
`;

export default function Grainient({
  timeSpeed = DEFAULT_GRAINIENT.timeSpeed,
  colorBalance = DEFAULT_GRAINIENT.colorBalance,
  warpStrength = DEFAULT_GRAINIENT.warpStrength,
  warpFrequency = DEFAULT_GRAINIENT.warpFrequency,
  warpSpeed = DEFAULT_GRAINIENT.warpSpeed,
  warpAmplitude = DEFAULT_GRAINIENT.warpAmplitude,
  blendAngle = DEFAULT_GRAINIENT.blendAngle,
  blendSoftness = DEFAULT_GRAINIENT.blendSoftness,
  rotationAmount = DEFAULT_GRAINIENT.rotationAmount,
  noiseScale = DEFAULT_GRAINIENT.noiseScale,
  grainAmount = DEFAULT_GRAINIENT.grainAmount,
  grainScale = DEFAULT_GRAINIENT.grainScale,
  grainAnimated = false,
  contrast = DEFAULT_GRAINIENT.contrast,
  gamma = DEFAULT_GRAINIENT.gamma,
  saturation = DEFAULT_GRAINIENT.saturation,
  centerX = DEFAULT_GRAINIENT.centerX,
  centerY = DEFAULT_GRAINIENT.centerY,
  zoom = DEFAULT_GRAINIENT.zoom,
  color1 = DEFAULT_GRAINIENT.color1,
  color2 = DEFAULT_GRAINIENT.color2,
  color3 = DEFAULT_GRAINIENT.color3,
  className = "",
}: GrainientProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || typeof window === "undefined") {
      return;
    }

    let renderer: Renderer;

    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });
    } catch {
      return;
    }

    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uTimeSpeed: { value: timeSpeed },
        uColorBalance: { value: colorBalance },
        uWarpStrength: { value: warpStrength },
        uWarpFrequency: { value: warpFrequency },
        uWarpSpeed: { value: warpSpeed },
        uWarpAmplitude: { value: warpAmplitude },
        uBlendAngle: { value: blendAngle },
        uBlendSoftness: { value: blendSoftness },
        uRotationAmount: { value: rotationAmount },
        uNoiseScale: { value: noiseScale },
        uGrainAmount: { value: grainAmount },
        uGrainScale: { value: grainScale },
        uGrainAnimated: { value: grainAnimated ? 1 : 0 },
        uContrast: { value: contrast },
        uGamma: { value: gamma },
        uSaturation: { value: saturation },
        uCenterOffset: { value: new Float32Array([centerX, centerY]) },
        uZoom: { value: zoom },
        uColor1: { value: new Float32Array(hexToRgb(color1)) },
        uColor2: { value: new Float32Array(hexToRgb(color2)) },
        uColor3: { value: new Float32Array(hexToRgb(color3)) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

      renderer.setSize(width, height);

      const resolution = (program.uniforms.iResolution as {
        value: Float32Array;
      }).value;

      resolution[0] = gl.drawingBufferWidth;
      resolution[1] = gl.drawingBufferHeight;

      renderer.render({ scene: mesh });
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(setSize)
        : null;

    resizeObserver?.observe(container);
    setSize();

    let frameId = 0;
    const startTime = performance.now();

    const render = (timestamp: number) => {
      (program.uniforms.iTime as { value: number }).value =
        (timestamp - startTime) * 0.001;
      renderer.render({ scene: mesh });
      frameId = window.requestAnimationFrame(render);
    };

    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();

      try {
        container.removeChild(canvas);
      } catch {
        // Ignore DOM cleanup failures during teardown.
      }
    };
  }, [
    blendAngle,
    blendSoftness,
    centerX,
    centerY,
    color1,
    color2,
    color3,
    colorBalance,
    contrast,
    gamma,
    grainAmount,
    grainAnimated,
    grainScale,
    noiseScale,
    rotationAmount,
    saturation,
    timeSpeed,
    warpAmplitude,
    warpFrequency,
    warpSpeed,
    warpStrength,
    zoom,
  ]);

  return (
    <div
      ref={containerRef}
      className={[
        "relative h-full w-full overflow-hidden bg-[#090B0D]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
