import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
  remotePatterns: [
    {
      protocol: "http",
      hostname: "localhost",
      port: "8000",
      pathname: "/**", // ✅ allow all paths
    },
    {
      protocol: "https",
      hostname: "flagcdn.com",
      pathname: "/**",
    },
  ],
},

};

export default nextConfig;
