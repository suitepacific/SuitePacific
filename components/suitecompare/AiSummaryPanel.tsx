"use client";

import { useState, useRef } from "react";
import { Sparkles, ChevronDown, ChevronUp, Loader2 } from "lucide-react";

type Mode = "diff" | "left" | "right";

type Deployment = {
  id: string;
  scriptid: string;
  recordtype: string | null;
  isdeployed: string;
  status: string;
  loglevel: string;
};

type Props = {
  left: string;
  right: string;
  leftLabel: string;
  rightLabel: string;
  scriptId: string;
  hasDiff: boolean;
  leftDeployments?: Deployment[];
  rightDeployments?: Deployment[];
};

export function AiSummaryPanel({ left, right, leftLabel, rightLabel, scriptId, hasDiff, leftDeployments = [], rightDeployments = [] }: Props) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("diff");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  async function run(m: Mode) {
    if (loading) {
      abortRef.current?.abort();
      return;
    }
    setMode(m);
    setOutput("");
    setError("");
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/sc/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: m, left, right, leftLabel, rightLabel, leftDeployments, rightDeployments }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const text = await res.text();
        setError(text || "Request failed.");
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) { setLoading(false); return; }

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setOutput((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-3 border border-brand-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-brand-50/60 hover:bg-brand-100/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-semibold text-brand-700">AI Summary</span>
          <span className="text-[10px] text-brand-400 font-normal">Powered by Llama 3.3</span>
        </div>
        {open ? (
          <ChevronUp className="h-3.5 w-3.5 text-brand-400" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 text-brand-400" />
        )}
      </button>

      {open && (
        <div className="px-4 py-3 bg-white">
          <div className="flex flex-wrap gap-2 mb-3">
            {hasDiff && (
              <button
                onClick={() => run("diff")}
                disabled={loading}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                  mode === "diff" && output
                    ? "bg-accent/10 border-accent/30 text-accent"
                    : "border-brand-100 text-brand-600 hover:bg-brand-50 hover:border-brand-200"
                } disabled:opacity-60`}
              >
                {loading && mode === "diff" ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Sparkles className="h-3 w-3" />
                )}
                Explain diff
              </button>
            )}
            {left && (
              <button
                onClick={() => run("left")}
                disabled={loading}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                  mode === "left" && output
                    ? "bg-accent/10 border-accent/30 text-accent"
                    : "border-brand-100 text-brand-600 hover:bg-brand-50 hover:border-brand-200"
                } disabled:opacity-60`}
              >
                {loading && mode === "left" ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Sparkles className="h-3 w-3" />
                )}
                Summarize {scriptId} ({leftLabel})
              </button>
            )}
            {right && (
              <button
                onClick={() => run("right")}
                disabled={loading}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                  mode === "right" && output
                    ? "bg-accent/10 border-accent/30 text-accent"
                    : "border-brand-100 text-brand-600 hover:bg-brand-50 hover:border-brand-200"
                } disabled:opacity-60`}
              >
                {loading && mode === "right" ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Sparkles className="h-3 w-3" />
                )}
                Summarize {scriptId} ({rightLabel})
              </button>
            )}
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {!output && !loading && !error && (
            <p className="text-xs text-brand-300">
              Choose an action above to generate an AI summary.
            </p>
          )}

          {(output || loading) && (
            <div className="text-xs text-brand-800 leading-relaxed space-y-1">
              {output.split("\n").map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed && !loading) return null;
                const isBullet = /^[\*\-\+]\s/.test(trimmed);
                const text = isBullet ? trimmed.slice(2) : trimmed;
                const rendered = text
                  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                  .replace(/`(.+?)`/g, '<code class="bg-brand-50 px-1 rounded font-mono">$1</code>');
                if (isBullet) return (
                  <div key={i} className="flex gap-1.5 items-start">
                    <span className="mt-1 shrink-0 w-1 h-1 rounded-full bg-brand-300" />
                    <span dangerouslySetInnerHTML={{ __html: rendered }} />
                  </div>
                );
                return rendered ? (
                  <p key={i} dangerouslySetInnerHTML={{ __html: rendered }} />
                ) : <div key={i} className="h-1" />;
              })}
              {loading && (
                <span className="inline-block w-1.5 h-3.5 bg-accent/70 animate-pulse ml-0.5 align-middle rounded-sm" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
