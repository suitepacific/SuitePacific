"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqItem({ q, children }: { q: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
      >
        <p className="text-sm font-semibold text-brand-900">{q}</p>
        <ChevronDown
          className={`h-4 w-4 text-brand-300 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-brand-50 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}
