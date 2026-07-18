"use client";

import { useEffect } from "react";
import { RefreshCw, WifiOff } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[SuiteCompare]", error.message);
  }, [error]);

  const isDbError =
    error.message?.includes("db.prisma.io") ||
    error.message?.includes("Can't reach database") ||
    error.message?.includes("database server");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50">
        <WifiOff className="h-7 w-7 text-brand-300" />
      </div>
      <h1 className="text-xl font-semibold text-brand-900 mb-2">
        {isDbError ? "Database temporarily unavailable" : "Something went wrong"}
      </h1>
      <p className="text-sm text-brand-400 max-w-sm mb-6">
        {isDbError
          ? "The connection to the database timed out. This is usually transient — try again in a moment."
          : "An unexpected error occurred. Try refreshing the page."}
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}
