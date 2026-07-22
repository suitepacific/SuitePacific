"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CodePane({
  content,
  label,
  type,
}: {
  content: string;
  label: string;
  type: string;
}) {
  const [copied, setCopied] = useState(false);
  const lines = content.split("\n");

  function handleCopy() {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="flex-1 min-w-0 rounded-xl border border-brand-100 bg-white overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-brand-50 bg-brand-50/60 shrink-0">
        <span className="text-xs font-semibold text-brand-700">{label}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-brand-400">{lines.length} lines</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-700 transition-colors"
          >
            {copied ? (
              <><Check className="h-3.5 w-3.5 text-emerald-500" /><span className="text-emerald-500">Copied</span></>
            ) : (
              <><Copy className="h-3.5 w-3.5" />Copy</>
            )}
          </button>
        </div>
      </div>
      <div className="overflow-auto flex-1">
        <table className="w-full border-collapse text-xs font-mono leading-relaxed">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-brand-50/40">
                <td className="select-none text-right text-brand-300 px-3 py-px w-10 border-r border-brand-50 align-top">
                  {i + 1}
                </td>
                <td className="px-4 py-px text-brand-700 whitespace-pre align-top">{line || " "}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
