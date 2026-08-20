import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking — no external site can embed SuitePacific in an iframe
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Force HTTPS for 2 years, include subdomains
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Limit referrer information sent to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable unnecessary browser features
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Content Security Policy — restricts script/style/frame sources
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires unsafe-inline/eval
      "style-src 'self' 'unsafe-inline'",                // Tailwind inline styles
      "img-src 'self' data: https:",                     // logo, og images
      "font-src 'self'",
      "connect-src 'self' https://www.youtube-nocookie.com https://www.youtube.com",
      "frame-src 'none' https://www.youtube-nocookie.com https://www.youtube.com",
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
      {
        source: "/:path+/",
        destination: "/:path+",
        statusCode: 301,
      },
      // Active cannibalization: two posts with identical titles — redirect older to newer
      {
        source: "/blog/netsuite-support-partner-evaluation",
        destination: "/blog/how-to-evaluate-netsuite-support-partner",
        statusCode: 301,
      },
      // Duplicate content: shorter posts redirect to the comprehensive canonical versions
      {
        source: "/blog/netsuite-suiteql-default-sort-change",
        destination: "/blog/netsuite-suiteql-sort-change-2026-2",
        statusCode: 301,
      },
      {
        source: "/blog/netsuite-passkeys-mfa-2026-2",
        destination: "/blog/netsuite-passkey-second-factor-2026-2",
        statusCode: 301,
      },
      // Blog/resource slug duplicates — redirect resource short versions to blog full versions
      {
        source: "/resources/netsuite-user-event-vs-client-script",
        destination: "/blog/netsuite-user-event-vs-client-script",
        statusCode: 301,
      },
      {
        source: "/resources/netsuite-rest-batch-sequential",
        destination: "/blog/netsuite-rest-batch-sequential",
        statusCode: 301,
      },
      {
        source: "/resources/netsuite-suiteql-bound-parameters",
        destination: "/blog/netsuite-suiteql-bound-parameters",
        statusCode: 301,
      },
      {
        source: "/resources/netsuite-sales-order-fulfillment-list",
        destination: "/blog/netsuite-sales-order-fulfillment-list",
        statusCode: 301,
      },
      {
        source: "/resources/netsuite-currency-context-custom-fields",
        destination: "/blog/netsuite-currency-context-custom-fields",
        statusCode: 301,
      },
      {
        source: "/resources/netsuite-suitetax-term-discounts",
        destination: "/blog/netsuite-suitetax-term-discounts",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
