import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.suitepacific.com" }],
        destination: "https://suitepacific.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
