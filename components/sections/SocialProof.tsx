import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

const CLIENT_LOGOS: { src: string; alt: string }[] = [
  // Drop PNG/SVG files into public/logos/clients/ and list them here.
  // Example: { src: "/logos/clients/acme.svg", alt: "Acme Corp" }
];

const PLACEHOLDER_COUNT = 5;

export function SocialProof() {
  const showPlaceholders = CLIENT_LOGOS.length === 0;

  return (
    <section className="py-10 border-t border-brand-100" data-section="social-proof">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* Clutch review quote */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-start gap-5 rounded-2xl border border-brand-100 bg-brand-50/40 p-5 sm:p-6">
          <div className="shrink-0 flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <Link
              href="https://clutch.co/profile/suitepacific"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-400 hover:text-accent hover:underline transition-colors"
            >
              via Clutch
            </Link>
          </div>
          <div>
            <blockquote className="text-sm sm:text-base font-medium text-brand-900 leading-relaxed">
              &ldquo;We have been very satisfied with SuitePacific&apos;s support and responsiveness.&rdquo;
            </blockquote>
            <p className="mt-2 text-xs text-brand-400">
              Manufacturing company &middot; NetSuite ERP support, SuiteScript development, saved searches, and automation
            </p>
          </div>
        </div>

        {/* Trusted by logo bar */}
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-300 text-center mb-6">
          Trusted by
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
          {showPlaceholders
            ? [...Array(PLACEHOLDER_COUNT)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-28 rounded-md bg-brand-100/60 animate-pulse"
                  aria-hidden="true"
                />
              ))
            : CLIENT_LOGOS.map((logo) => (
                <Image
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  width={112}
                  height={32}
                  className="h-8 w-auto object-contain opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition-all"
                />
              ))}
        </div>
      </div>
    </section>
  );
}
