import Image from "next/image";
import Link from "next/link";
import { FOOTER_COLUMNS } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-brand-900 text-blue-100/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-10">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo-icon.png" alt="SuitePacific" width={36} height={36} className="rounded-lg" />
              <span className="font-semibold text-white text-lg">SuitePacific</span>
            </Link>
            <p className="mt-4 text-sm max-w-xs">
              Your dedicated NetSuite team for ongoing enhancements, custom
              development, and expert support after go-live.
            </p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SuitePacific on LinkedIn"
              className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </a>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold text-white">{column.title}</h4>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-xs">
          © {new Date().getFullYear()} SuitePacific, LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
