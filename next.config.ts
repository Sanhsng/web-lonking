import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: "https",
        hostname: "lonkingsanh365.infinityfreeapp.com",
        pathname: "/wp-content/uploads/**",
      }
    ],
    localPatterns: [
      {
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
