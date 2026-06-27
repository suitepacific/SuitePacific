import Image from "next/image";
import Link from "next/link";
import { FOOTER_COLUMNS } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-brand-900 text-blue-100/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo-icon.png" alt="SuitePacific" width={36} height={36} className="rounded-lg" />
              <span className="font-semibold text-white text-lg">SuitePacific</span>
            </Link>
            <p className="mt-4 text-sm max-w-xs">
              Your dedicated NetSuite team for ongoing enhancements, custom
              development, and expert support after go-live.
            </p>
            <p className="mt-3 text-xs text-blue-100/60">Wyoming, USA</p>
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
