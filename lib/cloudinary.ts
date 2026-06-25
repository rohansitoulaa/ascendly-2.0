/**
 * Cloudinary delivery helpers.
 *
 * Client/brand logos are uploaded at full resolution but rendered tiny
 * (~32px tall in the marquee). Serving the originals ships hundreds of KiB of
 * PNG for thumbnails. We inject a Cloudinary transformation segment right after
 * `/upload/` so the CDN returns a resized, modern-format, auto-compressed asset:
 *
 *   .../upload/f_auto,q_auto,h_64,c_limit/v123/logo.png
 *
 *   f_auto   negotiate AVIF/WebP per the request's Accept header
 *   q_auto   perceptual-quality compression
 *   h_64     cap height at 64px (2x the 32px display height for retina)
 *   c_limit  only ever downscale, never upscale — preserves aspect ratio
 */
const UPLOAD_MARKER = "/upload/";

/** Default transform: height-capped (logos render at a fixed height, width auto). */
export const LOGO_TRANSFORM = "f_auto,q_auto,h_64,c_limit";

export function cloudinaryUrl(
  url: string,
  transform: string = LOGO_TRANSFORM,
): string {
  const markerIndex = url.indexOf(UPLOAD_MARKER);
  if (markerIndex === -1) return url;

  const insertAt = markerIndex + UPLOAD_MARKER.length;
  const rest = url.slice(insertAt);

  // Bail out if a transformation segment is already present (idempotent).
  if (/^[a-z]_[^/]+\//i.test(rest)) return url;

  return `${url.slice(0, insertAt)}${transform}/${rest}`;
}
