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
  // Hanya untuk mode dev: izinkan HP di jaringan lokal memakai hot reload
  allowedDevOrigins: ["192.168.18.11"],
};

export default nextConfig;