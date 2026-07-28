import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking — no external site can embed SuitePacific in an iframe
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Force HTTPS for 2 years, include subdomains
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Limit referrer information sent to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable unnecessary browser features
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Prevent XSS via reflected content (legacy browsers)
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Content Security Policy — restricts script/style/frame sources
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires unsafe-inline/eval
      "style-src 'self' 'unsafe-inline'",                // Tailwind inline styles
      "img-src 'self' data: https:",                     // logo, og images
      "font-src 'self'",
      "connect-src 'self'",
      "frame-src 'none'",
      "frame-ancestors 'none'",                          // stronger than X-Frame-Options
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.suitepacific.com" }],
        destination: "https://suitepacific.com/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
