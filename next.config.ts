import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yukdiorder.web.id",
        pathname: "/wp/raincarnation/wp-content/uploads/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  compress: true,
};

export default nextConfig;