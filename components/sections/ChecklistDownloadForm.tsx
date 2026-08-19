"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Loader2, Download } from "lucide-react";
import { FORMSUBMIT_ENDPOINT } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const NETSUITE_ROLES = [
  "NetSuite Administrator",
  "Developer / Technical Consultant",
  "IT",
  "Finance / Accounting",
  "Operations",
  "Project Manager",
  "Other",
];

export function ChecklistDownloadForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Submission failed");

      fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      }).catch(() => {});

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="text-center py-6">
        <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
        <h3 className="mt-4 font-semibold text-brand-900 text-lg">Your workbook is ready.</h3>
        <p className="mt-2 text-sm text-brand-400 max-w-xs mx-auto">
          Download the Excel checklist below. We&apos;ll also be in touch if we can help with your 2026.2 readiness.
        </p>
        <a
          href="/downloads/SuitePacific-NetSuite-2026.2-Release-Readiness-Checklist.xlsx"
          download
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand text-white font-medium px-6 py-3 text-sm shadow-soft hover:bg-brand-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          Download Excel Workbook
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="_subject" value="2026.2 Release Readiness Checklist Download" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dl-name" className="block text-sm font-medium text-brand-700 mb-1.5">
            Full Name
          </label>
          <input
            id="dl-name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="dl-company" className="block text-sm font-medium text-brand-700 mb-1.5">
            Company
          </label>
          <input
            id="dl-company"
            name="company"
            type="text"
            required
            placeholder="Acme Inc."
            className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="dl-email" className="block text-sm font-medium text-brand-700 mb-1.5">
          Work Email
        </label>
        <input
          id="dl-email"
          name="email"
          type="email"
          required
          placeholder="jane@acme.com"
          className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="dl-role" className="block text-sm font-medium text-brand-700 mb-1.5">
          Your Role
        </label>
        <select
          id="dl-role"
          name="role"
          required
          className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent bg-white"
        >
          <option value="" disabled>Select your role</option>
          {NETSUITE_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white font-medium px-6 py-3 text-sm shadow-soft hover:bg-brand-700 transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Preparing download...
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Download Excel Workbook
          </>
        )}
      </button>

      {status === "error" && (
        <p role="status" aria-live="polite" className="text-sm text-red-500 text-center">
          Something went wrong. Email us at{" "}
          <a href="mailto:info@suitepacific.com" className="underline">
            info@suitepacific.com
          </a>
          .
        </p>
      )}

      <p className="text-xs text-brand-400 text-center">
        We respect your privacy. No spam, no automated sequences.
      </p>
    </form>
  );
}
