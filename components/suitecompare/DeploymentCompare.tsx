import Link from "next/link";
import { AlertCircle } from "lucide-react";
import type { NsDeployment } from "@/lib/sc-netsuite";

type EnvData =
  | { ok: true; deployments: NsDeployment[] }
  | { ok: false; error?: string; unconfigured?: true };

function badge(label: string, variant: "green" | "amber" | "red" | "gray") {
  const cls = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    red: "bg-red-50 text-red-700 border-red-100",
    gray: "bg-brand-50 text-brand-500 border-brand-100",
  }[variant];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${cls}`}>
      {label}
    </span>
  );
}

function statusBadge(status: string) {
  const s = status?.toUpperCase();
  if (s === "RELEASED") return badge("Released", "green");
  if (s === "TESTING") return badge("Testing", "amber");
  return badge(status ?? "None", "gray");
}

function deployedBadge(val: string) {
  return val === "T" ? badge("Yes", "green") : badge("No", "red");
}

function logBadge(level: string) {
  const l = level?.toUpperCase();
  if (l === "DEBUG") return badge("Debug", "amber");
  if (l === "AUDIT") return badge("Audit", "gray");
  if (l === "ERROR") return badge("Error", "red");
  if (l === "QUIET") return badge("Quiet", "gray");
  return badge(level ?? "None", "gray");
}

function NotConfiguredPane({ label, accountId }: { label: string; accountId: string }) {
  return (
    <div className="flex-1 rounded-xl border border-brand-100 bg-brand-50/40 flex flex-col items-center justify-center py-16 px-6 text-center">
      <AlertCircle className="h-8 w-8 text-brand-200 mb-3" />
      <p className="text-sm font-medium text-brand-700 mb-1">{label} not connected</p>
      <p className="text-xs text-brand-400 mb-4">Configure TBA credentials to see deployment details.</p>
      <Link href={`/suitecompare/accounts/${accountId}`} className="text-xs font-medium text-accent hover:underline">
        Configure credentials →
      </Link>
    </div>
  );
}

function ErrorPane({ label, error }: { label: string; error: string }) {
  return (
    <div className="flex-1 rounded-xl border border-red-100 bg-red-50 p-5">
      <p className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-2">{label}</p>
      <div className="flex gap-2">
        <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
        <p className="text-sm text-red-700">{error}</p>
      </div>
    </div>
  );
}

function DeploymentList({ deployments, otherDeployments, label }: {
  deployments: NsDeployment[];
  otherDeployments: NsDeployment[];
  label: string;
}) {
  if (deployments.length === 0) {
    return (
      <div className="flex-1 rounded-xl border border-brand-100 bg-white p-5">
        <p className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-3">{label}</p>
        <p className="text-sm text-brand-400">No deployments found.</p>
      </div>
    );
  }

  const otherById = new Map(otherDeployments.map((d) => [d.scriptid, d]));

  return (
    <div className="flex-1 min-w-0 space-y-3">
      <p className="text-xs font-semibold text-brand-400 uppercase tracking-wider">{label}: {deployments.length} deployment{deployments.length !== 1 ? "s" : ""}</p>
      {deployments.map((dep) => {
        const other = otherById.get(dep.scriptid);
        function diff(val: string | null | undefined, otherVal: string | null | undefined) {
          return val !== otherVal ? "bg-amber-50 rounded px-1" : "";
        }
        return (
          <div key={dep.id} className="rounded-xl border border-brand-100 bg-white overflow-hidden">
            <div className="px-4 py-2.5 bg-brand-50/60 border-b border-brand-50">
              <p className="text-xs font-mono font-medium text-brand-700">{dep.scriptid}</p>
            </div>
            <table className="w-full text-xs">
              <tbody>
                <tr className="border-b border-brand-50">
                  <td className="px-4 py-2 text-brand-400 w-32 shrink-0">Record type</td>
                  <td className={`px-4 py-2 text-brand-700 font-medium ${diff(dep.recordtype, other?.recordtype)}`}>
                    {dep.recordtype ?? <span className="text-brand-300">None</span>}
                  </td>
                </tr>
                <tr className="border-b border-brand-50">
                  <td className="px-4 py-2 text-brand-400">Status</td>
                  <td className={`px-4 py-2 ${diff(dep.status, other?.status)}`}>{statusBadge(dep.status)}</td>
                </tr>
                <tr className="border-b border-brand-50">
                  <td className="px-4 py-2 text-brand-400">Deployed</td>
                  <td className={`px-4 py-2 ${diff(dep.isdeployed, other?.isdeployed)}`}>{deployedBadge(dep.isdeployed)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-brand-400">Log level</td>
                  <td className={`px-4 py-2 ${diff(dep.loglevel, other?.loglevel)}`}>{logBadge(dep.loglevel)}</td>
                </tr>
              </tbody>
            </table>
            {!other && (
              <div className="px-4 py-2 bg-amber-50 border-t border-amber-100">
                <p className="text-xs text-amber-700">Not found in the other environment</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function DeploymentCompare({
  leftData,
  rightData,
  leftLabel,
  rightLabel,
  accountId,
}: {
  leftData: EnvData;
  rightData: EnvData;
  leftLabel: string;
  rightLabel: string;
  accountId: string;
}) {
  function renderSide(data: EnvData, label: string, other: EnvData) {
    if (!data.ok) {
      if (data.unconfigured) return <NotConfiguredPane label={label} accountId={accountId} />;
      return <ErrorPane label={label} error={data.error ?? "Unknown error"} />;
    }
    return (
      <DeploymentList
        deployments={data.deployments}
        otherDeployments={other.ok ? other.deployments : []}
        label={label}
      />
    );
  }

  return (
    <div className="flex gap-4 items-start">
      {renderSide(leftData, leftLabel, rightData)}
      {renderSide(rightData, rightLabel, leftData)}
    </div>
  );
}
