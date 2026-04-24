import type { NextConfig } from "next";

// Restrict external image optimization to this project's Cloudinary uploads.
const cloudinaryImageRemotePattern = {
  protocol: "https",
  hostname: "res.cloudinary.com",
  port: "",
  pathname: "/dzsiqzfub/image/upload/**",
  search: "",
} as const;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [cloudinaryImageRemotePattern],
  },
};

export default nextConfig;
