"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { useRef } from "react";

// Drop PNG/SVG files into public/logos/clients/ and add entries here.
// Example: { src: "/logos/clients/acme.svg", alt: "Acme Corp", width: 96 }
const CLIENT_LOGOS: { src: string; alt: string; width?: number }[] = [];

// Placeholder slots shown until real logos are uploaded.
const PLACEHOLDERS = [
  { label: "Manufacturing Co.", width: 120 },
  { label: "SaaS Company",      width: 100 },
  { label: "Distribution Inc.", width: 128 },
  { label: "Tech Startup",      width: 96  },
  { label: "E-commerce Co.",    width: 112 },
  { label: "Services Group",    width: 104 },
];

export function SocialProof() {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = CLIENT_LOGOS.length > 0 ? CLIENT_LOGOS : null;

  return (
    <section className="py-10 border-t border-brand-100" data-section="social-proof">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* Review quote */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-start gap-4 rounded-2xl border border-brand-100 bg-brand-50/40 p-5 sm:p-6">
          <div className="shrink-0 flex flex-col items-center gap-1.5 sm:pt-0.5">
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <Link
              href="https://clutch.co/profile/suitepacific"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-300 hover:text-accent hover:underline transition-colors whitespace-nowrap"
            >
              via Clutch
            </Link>
          </div>
          <div>
            <blockquote className="text-sm sm:text-[15px] font-medium text-brand-900 leading-relaxed">
              &ldquo;We have been very satisfied with SuitePacific&apos;s support and responsiveness.&rdquo;
            </blockquote>
            <p className="mt-1.5 text-xs text-brand-400">
              Manufacturing company &middot; NetSuite ERP support, SuiteScript development, saved searches, and automation
            </p>
          </div>
        </div>

        {/* Trusted by */}
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-300 text-center mb-6">
          Trusted by
        </p>

        {/* Marquee */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
          onMouseEnter={() => {
            if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
          }}
          onMouseLeave={() => {
            if (trackRef.current) trackRef.current.style.animationPlayState = "running";
          }}
        >
          <div
            ref={trackRef}
            className="flex items-center gap-10 sm:gap-14"
            style={{ animation: "marquee 22s linear infinite", width: "max-content" }}
          >
            {/* Render items twice for seamless loop */}
            {[0, 1].map((pass) =>
              items
                ? items.map((logo, i) => (
                    <div key={`${pass}-${i}`} className="shrink-0 flex items-center justify-center h-10">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width ?? 112}
                        height={32}
                        className="h-7 w-auto object-contain opacity-40 grayscale hover:opacity-75 hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  ))
                : PLACEHOLDERS.map((p, i) => (
                    <div
                      key={`${pass}-${i}`}
                      className="shrink-0 flex items-center justify-center h-10"
                      style={{ width: p.width }}
                    >
                      <div className="w-full h-6 rounded bg-brand-100/70 flex items-center justify-center">
                        <span className="text-[10px] font-medium text-brand-300 select-none">{p.label}</span>
                      </div>
                    </div>
                  ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
