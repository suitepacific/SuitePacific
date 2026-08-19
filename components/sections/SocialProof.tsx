"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { useRef } from "react";

// Drop PNG/SVG files into public/logos/clients/ and add entries here.
// darkBg: true wraps the logo in a dark pill (use for white logos).
const CLIENT_LOGOS: { src: string; alt: string; width?: number; darkBg?: boolean }[] = [
  { src: "/logos/clients/FreeLetics.png",                  alt: "Freeletics",          width: 120 },
  { src: "/logos/clients/Patriot_Gold_Group_white_Logo.png", alt: "Patriot Gold Group", width: 140, darkBg: true },
];

// How many times to duplicate - keep even, increase for fewer logos.
const PASSES = 4;

export function SocialProof() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Build the full item list (PASSES copies for seamless loop).
  const items = Array.from({ length: PASSES }, (_, pass) =>
    CLIENT_LOGOS.map((logo, i) => ({ ...logo, key: `${pass}-${i}` }))
  ).flat();

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

        {/* Infinite marquee */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
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
            className="flex items-center gap-12 sm:gap-16"
            style={{
              animation: "marquee 18s linear infinite",
              width: "max-content",
            }}
          >
            {items.map((logo) =>
              logo.darkBg ? (
                <div
                  key={logo.key}
                  className="shrink-0 flex items-center justify-center rounded-lg bg-brand-800 px-4 py-2"
                  style={{ width: (logo.width ?? 120) + 32 }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width ?? 120}
                    height={36}
                    className="h-7 w-auto object-contain opacity-60 hover:opacity-90 transition-opacity duration-300"
                  />
                </div>
              ) : (
                <div
                  key={logo.key}
                  className="shrink-0 flex items-center justify-center"
                  style={{ width: logo.width ?? 120 }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width ?? 120}
                    height={36}
                    className="h-7 w-auto object-contain opacity-40 grayscale hover:opacity-75 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              )
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
