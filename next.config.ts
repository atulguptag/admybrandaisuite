import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "placeholder.co" },
      { hostname: "cda.academy" },
      { hostname: "antalyze.ai" },
      { hostname: "aisera.com" },
    ],
  },
};

export default nextConfig;
