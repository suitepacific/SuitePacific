import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://suitepacific.com"),
  title: {
    default: "SuitePacific: Post-Go-Live NetSuite Support & Optimization",
    template: "%s | SuitePacific",
  },
  description:
    "SuitePacific helps companies get more from NetSuite after go-live: SuiteScript development, workflow automation, saved searches & dashboards, advanced PDF templates, and ongoing optimization.",
  alternates: { canonical: "/" },
  keywords: [
    "NetSuite support",
    "SuiteScript development",
    "NetSuite optimization",
    "post go-live NetSuite",
    "NetSuite managed services",
    "NetSuite developer",
  ],
  openGraph: {
    title: "SuitePacific: Post-Go-Live NetSuite Support",
    description:
      "Your dedicated NetSuite team for ongoing enhancements, custom development, workflow automation, and expert support after go-live.",
    url: "https://suitepacific.com",
    siteName: "SuitePacific",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "SuitePacific" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SuitePacific: Post-Go-Live NetSuite Support",
    description:
      "Your dedicated NetSuite team for ongoing enhancements, custom development, workflow automation, and expert support after go-live.",
    images: ["/og-default.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b1f4d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-brand-900">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
