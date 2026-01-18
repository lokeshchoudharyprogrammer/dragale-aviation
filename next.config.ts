import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Tune for typical article widths to avoid generating/downloading overly large variants.
    deviceSizes: [360, 640, 768, 896, 1024, 1280, 1536],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
