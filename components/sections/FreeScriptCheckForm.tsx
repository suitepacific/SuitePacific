"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { FORMSUBMIT_ENDPOINT } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

interface Props {
  source?: string;
}

export function FreeScriptCheckForm({ source = "" }: Props) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("sourcePage", window.location.href);
    formData.set("_subject", "Free SuiteScript 2.1 Readiness Check Request");

    const scriptCount = formData.get("scriptCount") ?? "Not specified";
    const warningVisible = formData.get("warningVisible") ?? "Not specified";
    const helpNeeded = formData.get("helpNeeded") ?? "Not specified";
    const sourceLabel = source ? `Form: ${source} | ` : "";
    formData.set(
      "message",
      `${sourceLabel}Scripts: ${scriptCount} | 2028.2 warning visible: ${warningVisible} | Help needed: ${helpNeeded}`
    );

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
      <div role="status" aria-live="polite" className="text-center py-8">
        <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
        <p className="mt-4 text-sm text-brand-700 max-w-sm mx-auto leading-relaxed">
          Thank you. We will review your information and contact you within one business day to discuss your SuiteScript situation and the next step.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fsc-name" className="block text-sm font-medium text-brand-700 mb-1.5">
            Full name
          </label>
          <input
            id="fsc-name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="fsc-company" className="block text-sm font-medium text-brand-700 mb-1.5">
            Company
          </label>
          <input
            id="fsc-company"
            name="company"
            type="text"
            required
            placeholder="Acme Inc."
            className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="fsc-email" className="block text-sm font-medium text-brand-700 mb-1.5">
          Work email
        </label>
        <input
          id="fsc-email"
          name="email"
          type="email"
          required
          placeholder="jane@acme.com"
          className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fsc-warning" className="block text-sm font-medium text-brand-700 mb-1.5">
            Is the NetSuite 2028.2 warning visible in your account?
          </label>
          <select
            id="fsc-warning"
            name="warningVisible"
            required
            className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent bg-white"
          >
            <option value="" disabled>Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Not sure">Not sure</option>
          </select>
        </div>
        <div>
          <label htmlFor="fsc-scripts" className="block text-sm font-medium text-brand-700 mb-1.5">
            Approximate number of custom scripts
          </label>
          <select
            id="fsc-scripts"
            name="scriptCount"
            required
            className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent bg-white"
          >
            <option value="" disabled>Select range</option>
            <option value="Fewer than 10">Fewer than 10</option>
            <option value="10-25">10 to 25</option>
            <option value="26-50">26 to 50</option>
            <option value="More than 50">More than 50</option>
            <option value="Not sure">Not sure</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="fsc-need" className="block text-sm font-medium text-brand-700 mb-1.5">
          What do you need help with?
        </label>
        <select
          id="fsc-need"
          name="helpNeeded"
          required
          className="w-full rounded-lg border border-brand-100 px-3.5 py-2.5 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent bg-white"
        >
          <option value="" disabled>Select</option>
          <option value="Checking whether affected">Checking whether my scripts are affected</option>
          <option value="Understanding requirements">Understanding the migration requirements</option>
          <option value="Converting scripts">Converting scripts to SuiteScript 2.1</option>
          <option value="Complete audit and migration">Complete audit and migration</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-semibold px-6 py-3 text-sm shadow-soft hover:bg-accent/90 transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Request My Free Check"
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
        No obligation. We will discuss your situation before requesting any account access.
      </p>
    </form>
  );
}
