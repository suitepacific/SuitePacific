"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-glass" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between h-18 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-icon.png" alt="SuitePacific" width={36} height={36} className="rounded-lg" priority />
          <span className="font-semibold text-brand-900 text-lg">SuitePacific</span>
        </Link>

        <div className="hidden md:flex items-center gap-8" ref={dropdownRef}>
          {NAV_LINKS.map((link) => {
            if (link.children) {
              const isOpen = openDropdown === link.label;
              return (
                <div key={link.label} className="relative">
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                    className="flex items-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-900 transition-colors"
                  >
                    {link.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl border border-brand-100 bg-white shadow-lg py-1.5 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenDropdown(null)}
                          className="flex flex-col px-4 py-3 hover:bg-brand-50 transition-colors rounded-lg mx-1"
                        >
                          <span className="text-sm font-semibold text-brand-900">{child.label}</span>
                          {child.description && (
                            <span className="text-xs text-brand-400 mt-0.5 leading-relaxed">{child.description}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href!}
                className="text-sm font-medium text-brand-500 hover:text-brand-900 transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <Button href="/#contact" size="md">
            Book a Free Consultation
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="md:hidden text-brand-900"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden glass border-t border-brand-100 px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => {
            if (link.children) {
              return (
                <div key={link.label}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-400 mb-2">{link.label}</p>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-sm font-medium text-brand-700 py-1"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href!}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-brand-700"
              >
                {link.label}
              </Link>
            );
          })}
          <Button href="/#contact" className="w-full justify-center">
            Book a Free Consultation
          </Button>
        </div>
      )}
    </header>
  );
}
