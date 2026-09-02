"use client";

import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export function RefreshButton() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);

  function handleRefresh() {
    setSpinning(true);
    router.refresh();
    setTimeout(() => setSpinning(false), 800);
  }

  return (
    <button
      onClick={handleRefresh}
      className="inline-flex items-center gap-1.5 rounded-lg border border-brand-100 bg-white px-3 py-1.5 text-xs font-medium text-brand-600 shadow-sm hover:bg-brand-50 active:bg-brand-100 transition-colors"
    >
      <RefreshCw className={`h-3.5 w-3.5 ${spinning ? "animate-spin" : ""}`} />
      Refresh
    </button>
  );
}
