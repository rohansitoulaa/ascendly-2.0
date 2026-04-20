import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export interface PlanePoint {
  x: number;
  y: number;
}

export interface PlaneFlightSample extends PlanePoint {
  angle: number;
  rotation: number;
}

export interface PlaneFlightDefinition {
  autoRotate: number;
  bankAngle: number;
  distance: number;
  duration: number;
  ease: string;
  endPoint: PlanePoint;
  landingRotation: number;
  path: string;
  pitchAngle: number;
  rawPath: ReturnType<typeof MotionPathPlugin.getRawPath>;
  sparkleCadenceMs: number;
  sparkleIntensity: number;
  startPoint: PlanePoint;
  startRotation: number;
  tailOffset: number;
  yawAngle: number;
}

const PLANE_NOSE_BASE_ANGLE = -40;
const AUTO_ROTATE_OFFSET = -PLANE_NOSE_BASE_ANGLE;
const DEG_TO_RAD = Math.PI / 180;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const vectorFromAngle = (angle: number) => {
  const radians = angle * DEG_TO_RAD;

  return {
    x: Math.cos(radians),
    y: Math.sin(radians),
  };
};

const toPlaneRotation = (angle: number) => angle + AUTO_ROTATE_OFFSET;

export function samplePlaneFlight(
  rawPath: ReturnType<typeof MotionPathPlugin.getRawPath>,
  progress: number,
): PlaneFlightSample {
  const sample = MotionPathPlugin.getPositionOnPath(
    rawPath,
    progress,
    true,
  ) as gsap.plugins.getRelativePositionObject;

  return {
    angle: sample.angle,
    rotation: toPlaneRotation(sample.angle),
    x: sample.x,
    y: sample.y,
  };
}

export function getPlaneTrailPoint(sample: PlaneFlightSample, tailOffset: number) {
  const forward = vectorFromAngle(sample.angle);

  return {
    x: sample.x - forward.x * tailOffset,
    y: sample.y - forward.y * tailOffset,
  };
}

export function createPlaneFlightDefinition(
  start: PlanePoint,
  end: PlanePoint,
  planeSize = 34,
): PlaneFlightDefinition {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.hypot(dx, dy);
  const direction = dx >= 0 ? 1 : -1;
  const glideAngle = direction === 1 ? -40 : -140;
  const glideVector = vectorFromAngle(glideAngle);
  const startHandle = clamp(distance * 0.2, 56, 146);
  const endHandle = clamp(distance * 0.16, 44, 108);
  const startLift = clamp(distance * 0.06, 6, 18);
  const landingLift = clamp(distance * 0.03 + Math.max(dy, 0) * 0.04, 8, 26);

  const cp1 = {
    x: start.x + glideVector.x * startHandle,
    y: start.y + glideVector.y * startHandle - startLift,
  };
  const cp2 = {
    x: end.x - glideVector.x * endHandle,
    y: end.y - glideVector.y * endHandle + landingLift,
  };
  const path = `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
  const rawPath = MotionPathPlugin.getRawPath(path);

  MotionPathPlugin.cacheRawPathMeasurements(rawPath);

  const startSample = samplePlaneFlight(rawPath, 0.001);
  const endSample = samplePlaneFlight(rawPath, 0.999);

  return {
    autoRotate: AUTO_ROTATE_OFFSET,
    bankAngle: clamp(distance / 105, 3.2, 7.4),
    distance,
    duration: clamp(distance / 395, 1.35, 2.25),
    ease: "power2.inOut",
    endPoint: end,
    landingRotation: endSample.rotation,
    path,
    pitchAngle: clamp(distance / 210, 1.6, 4.2),
    rawPath,
    sparkleCadenceMs: clamp(84 - distance * 0.045, 48, 74),
    sparkleIntensity: clamp(distance / 520, 0.9, 1.18),
    startPoint: start,
    startRotation: startSample.rotation,
    tailOffset: clamp(planeSize * 0.42, 10, 16),
    yawAngle: clamp(distance / 165, 2.4, 5.1),
  };
}
