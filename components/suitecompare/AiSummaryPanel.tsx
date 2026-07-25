"use client";

import { useState, useRef } from "react";
import { Sparkles, ChevronDown, ChevronUp, Loader2 } from "lucide-react";

type Deployment = {
  id: string;
  scriptid: string;
  recordtype: string | null;
  isdeployed: string;
  status: string;
  loglevel: string;
};

type Mode =
  | "explain_left"
  | "explain_right"
  | "explain_diff"
  | "risk"
  | "migration"
  | "release_notes"
  | "functional";

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

type Action = {
  mode: Mode;
  label: string;
  description: string;
  requiresDiff?: boolean;
  requiresLeft?: boolean;
  requiresRight?: boolean;
};

const ACTIONS: Action[] = [
  {
    mode: "explain_left",
    label: "Explain Script",
    description: "Plain-English explanation of what this script does",
    requiresLeft: true,
  },
  {
    mode: "explain_right",
    label: "Explain Script",
    description: "Plain-English explanation of what this script does",
    requiresRight: true,
  },
  {
    mode: "functional",
    label: "Explain for Consultants",
    description: "Translate into business language for non-technical stakeholders",
    requiresRight: true,
  },
  {
    mode: "explain_diff",
    label: "Explain Diff",
    description: "Summarize what changed between environments",
    requiresDiff: true,
  },
  {
    mode: "risk",
    label: "Risk Analysis",
    description: "Detect recursive saves, hardcoded IDs, governance issues, and deployment risks",
    requiresDiff: true,
  },
  {
    mode: "migration",
    label: "Migration Summary",
    description: "What will change if Sandbox replaces Production",
    requiresDiff: true,
  },
  {
    mode: "release_notes",
    label: "Generate Release Notes",
    description: "Create release notes from the code changes",
    requiresDiff: true,
  },
];

function ActionButton({
  action,
  envLabel,
  active,
  loading,
  onClick,
}: {
  action: Action;
  envLabel?: string;
  active: boolean;
  loading: boolean;
  onClick: () => void;
}) {
  const label = envLabel ? `${action.label} (${envLabel})` : action.label;
  return (
    <button
      onClick={onClick}
      disabled={loading}
      title={action.description}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
        active
          ? "bg-accent/10 border-accent/30 text-accent"
          : "border-brand-100 text-brand-600 hover:bg-brand-50 hover:border-brand-200"
      } disabled:opacity-50`}
    >
      {loading && active ? (
        <Loader2 className="h-3 w-3 animate-spin shrink-0" />
      ) : (
        <Sparkles className="h-3 w-3 shrink-0" />
      )}
      {label}
    </button>
  );
}

export function AiSummaryPanel({
  left,
  right,
  leftLabel,
  rightLabel,
  hasDiff,
  leftDeployments = [],
  rightDeployments = [],
}: Props) {
  const [open, setOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<Mode | null>(null);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  async function run(mode: Mode) {
    if (loading) {
      abortRef.current?.abort();
      return;
    }
    setActiveMode(mode);
    setOutput("");
    setError("");
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/sc/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          left,
          right,
          leftLabel,
          rightLabel,
          leftDeployments,
          rightDeployments,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        setError((await res.text()) || "Request failed.");
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

  const scriptActions = ACTIONS.filter(
    (a) =>
      (a.requiresLeft && left) ||
      (a.requiresRight && right) ||
      (!a.requiresLeft && !a.requiresRight && !a.requiresDiff)
  );
  const diffActions = ACTIONS.filter((a) => a.requiresDiff);
  const showDiffActions = hasDiff && left && right;

  return (
    <div className="mt-3 border border-brand-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-brand-50/60 hover:bg-brand-100/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-semibold text-brand-700">Understand this script</span>
        </div>
        {open ? (
          <ChevronUp className="h-3.5 w-3.5 text-brand-400" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 text-brand-400" />
        )}
      </button>

      {open && (
        <div className="px-4 py-3 bg-white space-y-4">

          {/* Script actions */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-300 mb-2">Script</p>
            <div className="flex flex-wrap gap-2">
              {left && (
                <>
                  <ActionButton
                    action={ACTIONS[0]}
                    envLabel={leftLabel}
                    active={activeMode === "explain_left"}
                    loading={loading}
                    onClick={() => run("explain_left")}
                  />
                  <ActionButton
                    action={ACTIONS[2]}
                    envLabel={leftLabel}
                    active={activeMode === "functional" && !right}
                    loading={loading}
                    onClick={() => run("functional")}
                  />
                </>
              )}
              {right && (
                <>
                  <ActionButton
                    action={ACTIONS[1]}
                    envLabel={rightLabel}
                    active={activeMode === "explain_right"}
                    loading={loading}
                    onClick={() => run("explain_right")}
                  />
                  <ActionButton
                    action={ACTIONS[2]}
                    envLabel={rightLabel}
                    active={activeMode === "functional" && !!right}
                    loading={loading}
                    onClick={() => run("functional")}
                  />
                </>
              )}
            </div>
          </div>

          {/* Diff actions */}
          {showDiffActions && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-300 mb-2">Compare</p>
              <div className="flex flex-wrap gap-2">
                {diffActions.map((action) => (
                  <ActionButton
                    key={action.mode}
                    action={action}
                    active={activeMode === action.mode}
                    loading={loading}
                    onClick={() => run(action.mode)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Output */}
          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {!output && !loading && !error && (
            <p className="text-xs text-brand-300">Select an action above.</p>
          )}

          {(output || loading) && (
            <div className="text-xs text-brand-800 leading-relaxed space-y-1 pt-1 border-t border-brand-50">
              {output.split("\n").map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return <div key={i} className="h-1" />;
                const isBullet = /^[\*\-\+]\s/.test(trimmed);
                const isNumbered = /^\d+\.\s/.test(trimmed);
                const text = isBullet
                  ? trimmed.slice(2)
                  : isNumbered
                  ? trimmed.replace(/^\d+\.\s/, "")
                  : trimmed;
                const num = isNumbered ? trimmed.match(/^(\d+)\./)?.[1] : null;
                const rendered = text
                  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                  .replace(/`(.+?)`/g, '<code class="bg-brand-50 px-1 rounded font-mono">$1</code>');
                if (isBullet) return (
                  <div key={i} className="flex gap-1.5 items-start">
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-brand-300" />
                    <span dangerouslySetInnerHTML={{ __html: rendered }} />
                  </div>
                );
                if (isNumbered) return (
                  <div key={i} className="flex gap-1.5 items-start">
                    <span className="shrink-0 text-brand-400 font-medium w-4 text-right">{num}.</span>
                    <span dangerouslySetInnerHTML={{ __html: rendered }} />
                  </div>
                );
                return <p key={i} dangerouslySetInnerHTML={{ __html: rendered }} />;
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
