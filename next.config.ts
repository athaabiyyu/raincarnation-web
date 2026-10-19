import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "yukdiorder.web.id",
      },
      {
        protocol: "https",
        hostname: "yukdiorder.web.id",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  compress: true,
};

export default nextConfig;