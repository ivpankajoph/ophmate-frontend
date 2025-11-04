import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**", // allow all local images
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "phpstack-1522038-5968955.cloudwaysapps.com",
        pathname: "/**", // ✅ allow all paths under this host
      },
    ],
  },
};

export default nextConfig;
