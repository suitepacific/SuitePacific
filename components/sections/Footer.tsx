import Image from "next/image";
import Link from "next/link";
import { FOOTER_COLUMNS } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-brand-900 text-blue-100/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-6 lg:gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo-icon.png" alt="SuitePacific" width={36} height={36} className="rounded-lg" />
              <span className="font-semibold text-white text-lg">SuitePacific</span>
            </Link>
            <p className="mt-4 text-sm max-w-xs">
              Your dedicated NetSuite specialist for ongoing enhancements, custom
              development, and expert support after go-live.
            </p>
            <p className="mt-3 text-xs text-blue-100/60">United States</p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/company/suitepacific"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-100/60 hover:text-white transition-colors"
                aria-label="SuitePacific on LinkedIn"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="text-xs">LinkedIn</span>
              </a>
              <a
                href="tel:+12184800365"
                className="inline-flex items-center gap-2 text-blue-100/60 hover:text-white transition-colors"
                aria-label="Call SuitePacific"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="text-xs">+1 (218) 480-0365</span>
              </a>
              <a
                href="mailto:info@suitepacific.com"
                className="inline-flex items-center gap-2 text-blue-100/60 hover:text-white transition-colors"
                aria-label="Email SuitePacific"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span className="text-xs">info@suitepacific.com</span>
              </a>
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold text-white">{column.title}</h4>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("mailto:") || link.href.startsWith("tel:") ? (
                      <a href={link.href} className="text-sm hover:text-white transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span>© {new Date().getFullYear()} SuitePacific, LLC. All rights reserved.</span>
          <Link href="/privacy" className="text-blue-100/60 hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
