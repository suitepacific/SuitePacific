"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Clock, AlertTriangle } from "lucide-react";

type Risk = "critical" | "high" | "medium";

interface CheckItem {
  id: string;
  question: string;
  detail: string;
  yesLabel: string;
  noLabel: string;
  risk: Risk;
}

const CHECKLIST: CheckItem[] = [
  {
    id: "c1",
    question: "Have you identified whether the account contains SuiteScript 1.0, 2.0, or 2.x scripts?",
    detail: "Go to Customization > Scripting > Scripts and check the API Version column. Look for scripts showing 1.0, 2.0, or 2.x. This list may not show library files or scripts installed through bundles.",
    yesLabel: "Yes, we have a version list",
    noLabel: "No, we have not checked",
    risk: "critical",
  },
  {
    id: "c2",
    question: "Have you identified which of those scripts are actively deployed to Production?",
    detail: "A script that is not deployed to Production carries lower immediate risk. Use the Deployments column to filter for active Production deployments on legacy-version scripts.",
    yesLabel: "Yes, we know which are active",
    noLabel: "No, we have not checked deployments",
    risk: "critical",
  },
  {
    id: "c3",
    question: "Do you know who owns or originally built each legacy script?",
    detail: "Scripts built by former employees, previous implementation partners, or third-party developers may contain undocumented business logic. Owner identification is required before conversion work can begin.",
    yesLabel: "Yes, ownership is documented",
    noLabel: "No, many scripts have no known owner",
    risk: "high",
  },
  {
    id: "c4",
    question: "Have you reviewed whether any legacy scripts share library files?",
    detail: "A single shared library file referenced by multiple scripts can affect every dependent script if it contains compatibility issues. Library files must be identified and reviewed as part of the migration scope.",
    yesLabel: "Yes, shared libraries are mapped",
    noLabel: "No, library dependencies are unknown",
    risk: "high",
  },
  {
    id: "c5",
    question: "Have you mapped which critical business processes depend on legacy scripts?",
    detail: "Sales order saves, invoice generation, fulfillment, approval routing, batch jobs, and integrations are the highest-risk areas. Scripts controlling these processes must be migrated first.",
    yesLabel: "Yes, critical processes are mapped",
    noLabel: "No, process dependencies are unknown",
    risk: "critical",
  },
  {
    id: "c6",
    question: "Have you identified scripts installed through bundles or third-party SuiteApps?",
    detail: "Scripts distributed through managed bundles may be locked or controlled by the SuiteApp provider. If the files cannot be modified, the provider must release a SuiteScript 2.1-compatible update. Unlocked or unmanaged bundle components should be reviewed separately.",
    yesLabel: "Yes, bundle scripts are separated",
    noLabel: "No, we have not checked for bundle scripts",
    risk: "high",
  },
  {
    id: "c7",
    question: "Does the account have a Sandbox or suitable non-production environment available for testing?",
    detail: "Testing in a Sandbox or suitable non-production environment is strongly recommended before converted scripts are deployed to Production. Without a suitable testing environment, validation may need to happen in Production, creating significant operational risk.",
    yesLabel: "Yes, a test environment is available",
    noLabel: "No, we do not have a test environment",
    risk: "critical",
  },
  {
    id: "c8",
    question: "Do test cases exist for the business processes that legacy scripts support?",
    detail: "Test cases document what must be verified after conversion. Without them, testing relies on memory and may miss edge cases. Critical processes should have documented test scenarios before conversion begins.",
    yesLabel: "Yes, test cases are documented",
    noLabel: "No, test cases do not exist",
    risk: "medium",
  },
  {
    id: "c9",
    question: "Are business process owners available to review and confirm converted scripts before Production deployment?",
    detail: "User acceptance testing by the people who run the processes is the most effective way to confirm a converted script behaves correctly. If business users are unavailable, the migration team cannot confirm business-level accuracy.",
    yesLabel: "Yes, business owners can participate",
    noLabel: "No, we would not have business-owner UAT",
    risk: "medium",
  },
  {
    id: "c10",
    question: "Has a migration timeline been discussed or approved that completes before the 2028.2 upgrade window?",
    detail: "The 2028.2 upgrade typically releases in late 2028. Accounts with large or complex script inventories need to start in 2026 or 2027 to avoid time pressure. A defined timeline ensures the work is planned rather than reactive.",
    yesLabel: "Yes, we have a plan or timeline",
    noLabel: "No, migration has not been planned",
    risk: "high",
  },
];

const CRITICAL_IDS = CHECKLIST.filter((i) => i.risk === "critical").map((i) => i.id);

const RISK_CONFIG = {
  critical: { label: "Critical", badge: "bg-red-50 text-red-700 border border-red-200" },
  high: { label: "High", badge: "bg-amber-50 text-amber-700 border border-amber-200" },
  medium: { label: "Medium", badge: "bg-yellow-50 text-yellow-700 border border-yellow-200" },
};

type Answer = "yes" | "no" | null;

function computeBand(answers: Record<string, Answer>): "ready" | "action" | "start" | null {
  const answered = Object.values(answers).filter((v) => v !== null).length;
  if (answered < 5) return null;
  const yesCount = Object.values(answers).filter((v) => v === "yes").length;
  const criticalGaps = CRITICAL_IDS.filter((id) => answers[id] === "no").length;
  if (yesCount >= 8 && criticalGaps === 0) return "ready";
  if (yesCount >= 5 && criticalGaps <= 1) return "action";
  return "start";
}

export function ChecklistWithScore() {
  const initialAnswers: Record<string, Answer> = Object.fromEntries(
    CHECKLIST.map((i) => [i.id, null])
  );
  const [answers, setAnswers] = useState<Record<string, Answer>>(initialAnswers);

  const yesCount = Object.values(answers).filter((v) => v === "yes").length;
  const answeredCount = Object.values(answers).filter((v) => v !== null).length;
  const criticalGaps = CRITICAL_IDS.filter((id) => answers[id] === "no").length;
  const band = computeBand(answers);

  function setAnswer(id: string, value: "yes" | "no") {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <div>
      {/* Live score banner - shows once 5+ items answered */}
      {answeredCount >= 5 && (
        <div
          className={`mb-6 rounded-2xl border p-4 ${
            band === "ready"
              ? "bg-emerald-50 border-emerald-200"
              : band === "action"
              ? "bg-amber-50 border-amber-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            {band === "ready" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : band === "action" ? (
              <Clock className="h-4 w-4 text-amber-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-600" />
            )}
            <p
              className={`text-sm font-semibold ${
                band === "ready"
                  ? "text-emerald-800"
                  : band === "action"
                  ? "text-amber-800"
                  : "text-red-800"
              }`}
            >
              {band === "ready"
                ? "Ready to plan"
                : band === "action"
                ? "Action needed"
                : "Start now"}
            </p>
          </div>
          <p
            className={`text-xs ${
              band === "ready"
                ? "text-emerald-700"
                : band === "action"
                ? "text-amber-700"
                : "text-red-700"
            }`}
          >
            {yesCount} yes
            {answeredCount < CHECKLIST.length
              ? `, ${CHECKLIST.length - answeredCount} unanswered`
              : ""}
            {criticalGaps > 0
              ? `, ${criticalGaps} critical gap${criticalGaps > 1 ? "s" : ""}`
              : ""}
            {band === "ready" && " · No critical gaps identified"}
            {band === "action" && criticalGaps === 1 && " · One critical gap to resolve"}
            {band === "start" && criticalGaps >= 2 && " · Two or more critical gaps"}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {CHECKLIST.map((item, i) => {
          const risk = RISK_CONFIG[item.risk];
          const answer = answers[item.id];
          return (
            <div key={item.id} className="rounded-2xl border border-brand-100 bg-white p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-brand-50 text-brand-400 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <p className="text-sm font-semibold text-brand-900 leading-snug">{item.question}</p>
                    <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${risk.badge}`}>
                      {risk.label}
                    </span>
                  </div>
                  <p className="text-xs text-brand-400 leading-relaxed">{item.detail}</p>
                </div>
              </div>
              <div className="ml-9 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAnswer(item.id, "yes")}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors border ${
                    answer === "yes"
                      ? "bg-emerald-100 border-emerald-300"
                      : "bg-emerald-50 border-emerald-100 hover:bg-emerald-100"
                  }`}
                >
                  <CheckCircle2
                    className={`h-4 w-4 shrink-0 ${answer === "yes" ? "text-emerald-700" : "text-emerald-500"}`}
                  />
                  <span className={`text-xs font-medium ${answer === "yes" ? "text-emerald-800" : "text-emerald-700"}`}>
                    {item.yesLabel}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setAnswer(item.id, "no")}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors border ${
                    answer === "no"
                      ? "bg-red-100 border-red-300"
                      : "bg-red-50 border-red-100 hover:bg-red-100"
                  }`}
                >
                  <XCircle
                    className={`h-4 w-4 shrink-0 ${answer === "no" ? "text-red-600" : "text-red-400"}`}
                  />
                  <span className={`text-xs font-medium ${answer === "no" ? "text-red-800" : "text-red-700"}`}>
                    {item.noLabel}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Final result - shown once all answered */}
      {answeredCount === CHECKLIST.length && (
        <div
          className={`mt-6 rounded-2xl border-2 p-5 ${
            band === "ready"
              ? "border-emerald-300 bg-emerald-50"
              : band === "action"
              ? "border-amber-300 bg-amber-50"
              : "border-red-300 bg-red-50"
          }`}
        >
          <p
            className={`text-sm font-bold mb-1 ${
              band === "ready" ? "text-emerald-900" : band === "action" ? "text-amber-900" : "text-red-900"
            }`}
          >
            {band === "ready"
              ? "Your account is ready to plan the migration."
              : band === "action"
              ? "Action needed before the migration can begin safely."
              : "The migration audit should begin now."}
          </p>
          <p
            className={`text-xs leading-relaxed ${
              band === "ready" ? "text-emerald-800" : band === "action" ? "text-amber-800" : "text-red-800"
            }`}
          >
            {band === "ready" &&
              "Good foundational readiness. The next step is completing the formal script inventory and risk classification to confirm the migration scope and timeline before conversion work begins."}
            {band === "action" &&
              `There ${criticalGaps === 1 ? "is one critical gap" : "are gaps"} to close before the migration can start safely. Focus first on the critical items marked above. ${criticalGaps === 1 ? "One critical gap" : "Critical gaps"} left unresolved create the most operational risk after the 2028.2 upgrade.`}
            {band === "start" &&
              "Without a script inventory you do not know the scope. Without process mapping you cannot prioritize. Without a testing environment you cannot validate safely. Starting the audit now creates the visibility needed to plan the rest of the work."}
          </p>
        </div>
      )}
    </div>
  );
}
