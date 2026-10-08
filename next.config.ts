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
};

export default nextConfig;
